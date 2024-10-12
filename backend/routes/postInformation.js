/* const express = require('express');
const router = express.Router();
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { awsConfig } = require('../config');


const ddbClient = new DynamoDBClient(awsConfig);
const dynamoTableName = 'Social';

router.get('/:userID/following', async (req, res) => {
    const params = {
      TableName: dynamoTableName,
      Key: {
          PK: {
              S: req.params["userID"] + "#following"
          },
          SK: {
              S: 'count'
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