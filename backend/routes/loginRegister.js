const express = require('express');
const session = require('express-session');
const router = express.Router();
const { awsConfig } = require('../config');
const { DynamoDBClient, GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ddbClient = new DynamoDBClient(awsConfig);
const dynamoTableName = 'Social';

// next -- > 
// 1. create postgre table: Users: cols --> users, passwords (hashed) --> adding to social table instead
// check below for user auth and protected routes
// 2. https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e

//register fully works
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const userAccount = username + "#account"
    const params = {
        TableName: dynamoTableName,
        Key: {
            PK: {
                S: userAccount
            },
            SK: {
                S: "authentication"
            }
        }
    };
    try {
        const result = await ddbClient.send(new GetItemCommand(params)) // checking if user exists
        if (!result.Item) {
            const encryptedPass = await bcrypt.hash(password, 10);
            const addUserParams = {
                TableName: dynamoTableName,
                Item: {
                    PK: {
                        S: userAccount
                    },
                    SK: {
                        S: "authentication"
                    },
                    password: {
                        S: encryptedPass
                    }
                }
            }

            await ddbClient.send(new PutItemCommand(addUserParams)).then((result) => {
                res.send("Successfully created user")
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.send("User already exists")
        }

    } catch (error) {
        res.status(500).send("Getting item failed")
    }
  });



router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userAccount = username + "#account"
    const params = {
        TableName: dynamoTableName,
        Key: {
            PK: {
                S: userAccount
            },
            SK: {
                S: "authentication"
            }
        }
    };
    let userExists = false;
    let encryptedPass;
    try {
        const result = await ddbClient.send(new GetItemCommand(params))
        if (result.Item) {
            userExists = true;
            encryptedPass = result.Item.password.S;
        }
        //res.send(userExists);
    } catch (error) {
        return res.status(500).send(error);
    }
    let comparePassword = false;

    
    // Need to change this later to compare actual hashed password to current
    // testing user5 as username and hello as password
    if (userExists) {
        const result = await bcrypt.compare(password, encryptedPass); // not allowing me to compare string to string, need hash
        if (result) {
            req.session.username = username
            return res.send("User successfully logged in");            
        }
        return res.send("User credentials invalid");

    }  
    return res.send("user doesn't exist")
        
    /*
    if (userExists && password == encryptedPass) {
        req.session.username = username;
        return res.send(req.session)
    }
    else {
        return res.send("Invalid credentials");
    }*/

});


//logout fully works
router.post('/logout', async (req, res) => {
    if (!req.session.username) {
        return res.status(400).send("User needs to login");
    }
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Problem destroying session" + error);
        }
        return res.send("Logout successful");
    })
});


/*
router.post('/login', async (req, res) => {
    const { username, passowrd } = req.body
    const userAccount = username + "account"
    const userObj = {
        "username": username
    }

    const params = {
        TableName: dynamoTableName,
        Key: {
            PK: {
                S: userAccount
            },
            SK: {
                S: "authentication"
            }
        }
    };
    await ddbClient.send(new GetItemCommand(params)).then(result => {
        res.send(result)
    }).catch(error => {
        res.status(500).send("hello")
    })

    
    let userExists = false;
    await ddbClient.send(new GetItemCommand(params)).then(result => {
        userExists = true;
        res.send(result)
    }).catch(error => {
        return res.send("user doesn't exist, make sure to create user");
    }) // checking if user exists *
    /*let hashedPassword;
    await ddbClient.send(new )


    if (userExists ) {

    } else {
        
    } 

});*/


module.exports = router;