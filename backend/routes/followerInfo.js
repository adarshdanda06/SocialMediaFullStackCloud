const express = require('express');
const router = express.Router();
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
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



module.exports = router;