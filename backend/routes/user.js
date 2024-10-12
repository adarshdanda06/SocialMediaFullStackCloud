const express = require('express');
const router = express.Router();
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { awsConfig } = require('../config');


const ddbClient = new DynamoDBClient(awsConfig);
const dynamoTableName = 'Social';

router.get('/', (req, res) => {
  res.send("Hi");
});

router.get('/:userID/count', async (req, res) => {
  const params = {
    TableName: dynamoTableName,
    Key: {
        PK: {
            S: req.params["userID"]
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

router.get('/:userID/info', async (req, res) => {
  const params = {
    TableName: dynamoTableName,
    Key: {
        PK: {
            S: req.params["userID"]
        },
        SK: {
            S: 'info'
        }
    }
  };
  await ddbClient.send(new GetItemCommand(params)).then(result => {
      res.send(result.Item)
    }).catch(error => {
      res.status(500).send(error)
    })
});

module.exports = router