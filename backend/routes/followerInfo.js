const express = require('express');
const router = express.Router();
const { DynamoDBClient, QueryCommand, TransactWriteItemsCommand, PutItemCommand, ReturnValue } = require("@aws-sdk/client-dynamodb");
const { awsConfig } = require('../config');


const ddbClient = new DynamoDBClient(awsConfig);
const dynamoTableName = 'Social';

router.get('/:userID/following', async (req, res) => {
    const params = {
        TableName: dynamoTableName,
        ExpressionAttributeValues: {
            ":pk": {
                S: req.params["userID"] + "#following"
            }
        },
        KeyConditionExpression: "PK = :pk",
        ProjectionExpression: "SK"
    };
    await ddbClient.send(new QueryCommand(params)).then(result => {
        res.send(result.Items)
    }).catch(error => {
        res.status(500).send(error)
    });
});
  

router.get('/:userID/followers', async (req, res) => {
    const params = {
        TableName: dynamoTableName,
        ExpressionAttributeValues: {
            ":pk": {
                S: req.params["userID"] + "#followers"
            }
        },
        KeyConditionExpression: "PK = :pk",
        ProjectionExpression: "SK"
    };
    await ddbClient.send(new QueryCommand(params)).then(result => {
        return res.send(result.Items)
    }).catch(error => {
        return res.status(500).send(error)
    });
});


router.post('/user/follow', async (req, res) => {
    if (!req.session.username) {
        return res.status(403).send("User must be logged in to follow");
    }
    const username = req.session.username;
    const { followingThisUser } = req.body;
    // may need to add a can't follow again implmentation
    const checkFollowing = {
        TableName: dynamoTableName,

    };


    const params = {
        TransactItems: [
            {
                Put: {
                    TableName: dynamoTableName,
                    Item: {
                        PK: {
                            S: username + "#following"
                        },
                        SK: {
                            S: followingThisUser
                        }
                    }
                }
            }, 
            {
                Put: {
                    TableName: dynamoTableName,
                    Item: {
                        PK: {
                            S: followingThisUser + "#followers"
                        },
                        SK: {
                            S: username
                        }
                    }
                }
            },
            {
                Update: {
                    TableName: dynamoTableName,
                    Key: {
                        PK: {
                            S: username
                        },
                        SK: {
                            S: "count"
                        }
                    },
                    UpdateExpression: "ADD #following :inc",
                    ExpressionAttributeNames: {
                        "#following": "following#"  // Use a placeholder for attribute names
                    },
                    ExpressionAttributeValues: {
                        ":inc": { N: "1" },         // Increment value
                    },
                }
            },
            {
                Update: {
                    TableName: dynamoTableName,
                    Key: {
                        PK: {
                            S: followingThisUser
                        },
                        SK: {
                            S: "count"
                        }
                    },
                    UpdateExpression: "ADD #follower :inc",
                    ExpressionAttributeNames: {
                        "#follower": "follower#"    // Use a placeholder for attribute names
                    },
                    ExpressionAttributeValues: {
                        ":inc": { N: "1" },         // Increment value
                    },
                }
            }
        ]
    };

    await ddbClient.send(new TransactWriteItemsCommand(params)).then((result) => {
        return res.send(`Succesfully followed ${followingThisUser}`);
    }).catch(error => {
        return res.send(`An error occured: ${error}`);
    });
});


module.exports = router;