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
        const result = await ddbClient.send(new GetItemCommand(params))
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
  
module.exports = router;