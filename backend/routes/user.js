const express = require('express');
const router = express.Router();
const { DynamoDBClient, GetItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { awsConfig, dynamoTableName } = require('../config');


const ddbClient = new DynamoDBClient(awsConfig);

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
    var items = {
      "followers": result.Item["follower#"]["N"] ?? '0',
      "following": result.Item["following#"]["N"] ?? '0',
      "posts": result.Item["post#"]["N"] ?? '0'
    }
    res.send(items)
    }).catch(error => {
      res.status(500).send(error)
    })
});

router.get('/:userID/getOtherUsers', async (req, res) => {
  let users = new Set();

  const scanParams = {
    TableName: dynamoTableName,
    ProjectionExpression: "PK",
  }

  const command = new ScanCommand(scanParams);
  await ddbClient.send(command).then(result => {
    for (let i = 0; i < result.Items.length; i++) {
      if (!(result.Items[i]["PK"]["S"]).includes("#")) {
        users.add(result.Items[i]["PK"]["S"])
      }
    }
    if (users.has(req.params["userID"])) {
      users.delete(req.params["userID"])
    }
    const myUsers = Array.from(users);
    res.send(myUsers);
  }).catch(error => {
    res.status(400).send("error" + error)
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