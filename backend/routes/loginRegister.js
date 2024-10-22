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

    /*
    Need to change this later to compare actual hashed password to current
    
    if (userExists) {
        const result = await bcrypt.compare(password, encryptedPass); // not allowing me to compare string to string, need hash
        res.send(encryptedPass);
    }  
        
    */
    if (userExists && password == encryptedPass) {
        //res.send("Credentials are valid")
        req.session.username = username;
        if (!req.session) {
            return res.status(500).send("Session isn't initialized");
        }
        res.send("Set credentials")
    }
    else {
        return res.send("Invalid credentials");
    }

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