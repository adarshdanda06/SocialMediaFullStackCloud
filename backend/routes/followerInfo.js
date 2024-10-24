const express = require('express');
const router = express.Router();
const { DynamoDBClient, QueryCommand, TransactWriteItemsCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
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
        res.send(result.Items)
    }).catch(error => {
        res.status(500).send(error)
    });
});


router.post('/user/follow', async (req, res) => {
    if (!req.session.username) {
        return res.status(403).send("User must be logged in to follow");
    }
    const username = req.session.username;
    const { followThem } = req.body;

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
                            S: followThem
                        }
                    }
                }
            }, 
            {
                Put: {
                    TableName: dynamoTableName,
                    Item: {
                        PK: {
                            S: followThem + "#followers"
                        },
                        SK: {
                            S: username
                        }
                    }
                }
            }
        ]
    };
    //return res.send(params);

    await ddbClient.send(new TransactWriteItemsCommand(params)).then((result) => {
        return res.send(`Succesfully followed ${followThem}`);
    }).catch(error => {
        return res.send(error);
    });
});


module.exports = router;