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

router.get('/:userID/:postID/posts', async (req, res) => {
  const params = {
    TableName: dynamoTableName,
    Key: {
        PK: {
            S: req.params["userID"] + "#posts"
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


router.post('/createPost', async (req, res) => {
  if (!req.session.username) {
    return res.status(403).send("Need to login before creating post");
  }
  const username = req.session.username;
  const { postBio, postImg } = req.body
  const timeUploaded = Math.floor(Date.now() / 1000);
  const params = {
    TableName: dynamoTableName,
    Item: {
      PK: {
        S: username + "#posts"
      },
      SK: {
        S: "post#time:" + timeUploaded
      },
      content: {
        S: postBio
      },
      imgS3: {
        S: postImg
      },
      timeUploaded: {
        N: timeUploaded
      }
    }
  };
  res.send(params);
});


module.exports = router;