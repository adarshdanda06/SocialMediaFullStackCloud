const express = require('express');
const session = require('express-session');
const router = express.Router();
const { awsConfig } = require('../config');
const { DynamoDBClient, GetItemCommand, PutItemCommand, TransactWriteItemsCommand } = require('@aws-sdk/client-dynamodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ddbClient = new DynamoDBClient(awsConfig);
const dynamoTableName = 'Social';


// after this, user should be redirected to create profile page thru frontend
// create profile should include the bio and name and optional profile pic
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
                TransactItems: [
                    {
                        Put: {
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
                    },
                    {
                        Put: {
                            TableName: dynamoTableName,
                            Item: {
                                PK: {
                                    S: username
                                },
                                SK: {
                                    S: "count"
                                },
                                "follower#": {
                                    N: "0"
                                },
                                "following#": {
                                    N: "0"
                                }
                            }
                        }
                    }
                ]
            }

            await ddbClient.send(new TransactWriteItemsCommand(addUserParams)).then((result) => {
                return res.send("Successfully created user")
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


// user 5 hello
// user 7 byebye
// above are test accounts
router.post('/login', async (req, res) => {
    if (req.session.username) {
        return res.send(`${req.session.username} already logged in`);
    }
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

    
    if (userExists) {
        const result = await bcrypt.compare(password, encryptedPass);
        if (result) {
            req.session.username = username
            return res.send("User successfully logged in");            
        }
        return res.send("User credentials invalid");

    }  
    return res.send("user doesn't exist")
});


//logout fully works
router.post('/logout', async (req, res) => {
    if (!req.session.username) {
        return res.status(400).send("User needs to login");
    }
    const username = req.session.username;
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Problem destroying session" + error);
        }
        return res.send(`Logged ${username} out successfully`);
    })
});


module.exports = router;