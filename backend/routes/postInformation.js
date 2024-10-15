const express = require('express');
const router = express.Router();
const { DynamoDBClient, QueryCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { awsConfig } = require('../config');


const ddbClient = new DynamoDBClient(awsConfig);
const dynamoTableName = 'Social';

router.get('/:postID/likelist', async (req, res) => {
  const params = {
      TableName: dynamoTableName,
      ExpressionAttributeValues: {
          ":pk": {
              S: req.params["postID"] + "#likelist"
          }
      },
      KeyConditionExpression: "PK = :pk",
      ProjectionExpression: "SK"
  };
  await ddbClient.send(new QueryCommand(params)).then(result => {
      res.send(result.Items)
    }).catch(error => {
      res.status(500).send(error)
    })
});
/*
Route below is currently not working, fix soon
router.get('/:userID/:postID/posts', async (req, res) => {
  const params = {
    TableName: dynamoTableName,
    Key: {
        PK: {
            S: req.params["userID"] + "#post"
        },
        SK: {
            S: req.params["postID"]
        }
    }
  };
  await ddbClient.send(new GetItemCommand(params)).then(result => {
      res.send(result.Item)
    }).catch(error => {
      res.status(500).send(error)
    })
});
*/ 
module.exports = router