const express = require('express');
const session = require('express-session');
const router = express.Router();
const { awsConfig } = require('../config');
const { DynamoDBClient, GetItemCommand, PutItemCommand, TransactWriteItemsCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const bcrypt = require('bcryptjs');
const e = require('express');

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
                                },
                                "post#": {
                                    N: "0"
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
                                    S: "info"
                                },
                                "bio": {
                                    S: ""
                                },
                                "profilePic": {
                                    S: ""
                                }
                            }
                        }
                    }
                ]
            }

            await ddbClient.send(new TransactWriteItemsCommand(addUserParams)).then((result) => {
                return res.send({"userCreated": true})
            }).catch(error => {
                res.status(500).send(error)
            })
        } else {
            res.send({"userCreated": false})
        }

    } catch (error) {
        res.status(500).send({"userCreated": false, "error": error})
    }
  });

router.get('/getUsername', (req, res) => {
    if (req.session.username) {
        return res.send(req.session.username);
    } else {
        return res.status(401).send('Not authenticated');
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
            return res.send({
                "userStatus": true,
                "userExists": true
            });            
        }
        return res.send({
            "userStatus": false,
            "userExists": true
        });

    }  
    return res.send({
        "userStatus": false,
        "userExists": false
    })
});


//logout fully works
router.post('/logout', async (req, res) => {
    if (!req.session.username) {
        return res.status(400).send("User needs to login");
    }
    const username = req.session.username;
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Problem destroying session" + err);
        }
        return res.send(`Logged ${username} out successfully`);
    })
});


router.post('/createProfile', async (req, res) => {
    if (!req.session.username) {
        return res.status(403).send("User needs to login");
    }
    const username = req.session.username;
    const { bio } = req.body;
    let { profileImg } = req.body;
    if (profileImg == "") {
        profileImg = "default s3 profile pic";
    }
    const params = {
        TableName: dynamoTableName,
        Key: {
            PK: {
                S: username
            },
            SK: {
                S: "info"
            }
        },
        ExpressionAttributeNames: {
            "#attr": "bio",
            "#attr1": "profilePic"
        },
        ExpressionAttributeValues: {
            ":val": {
                S: bio
            },
            ":val1": {
                S: profileImg
            }
        },
        UpdateExpression: "SET #attr = :val, #attr1 = :val1"
    };
    await ddbClient.send(new UpdateItemCommand(params)).then(result => {
        return res.send("Sucessfully updated bio and profilePic")
    }).catch(err => {
        return res.send("Error occured while updating: " + err);
    });
});

module.exports = router;