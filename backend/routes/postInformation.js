const express = require('express');
const router = express.Router();
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { DynamoDBClient, QueryCommand, GetItemCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { awsConfig, s3AwsConfig, dynamoTableName } = require('../config');
const multer = require('multer');
const multerS3 = require('multer-s3');
const ddbClient = new DynamoDBClient(awsConfig);
const s3Client = new S3Client(s3AwsConfig);
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



const s3BucketName = 'imgsandcontent';
const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: s3BucketName,
      key: async (req, file, cb) => {
        const username = req.session.username;
        const params = {
          TableName: dynamoTableName,
          Key: {
              PK: {
                  S: username
              },
              SK: {
                  S: 'count'
              }
          }
        };
        let postNum = 0
        try {
          const response = await ddbClient.send(new GetItemCommand(params));
          postNum = +response.Item["post#"].N
        } catch (error) {
          console.log(error)
        }
      
        const updateParams = {
          TableName: dynamoTableName,
          Key: {
              PK: {
                  S: username
              },
              SK: {
                  S: "count"
              }
          },
          UpdateExpression: "ADD #post :inc",
          ExpressionAttributeNames: {
              "#post": "post#"  // Use a placeholder for attribute names
          },
          ExpressionAttributeValues: {
              ":inc": { N: "1" },         // Increment value
          }
        }
        try {
          await ddbClient.send(new UpdateItemCommand(updateParams));
        } catch (err) {
          console.log(err)
        }

        const fileName = `${username}_post${postNum}`;
        cb(null, fileName);
      }
    })
});

router.get('/getPostNum/:user', async (req, res) => {
  if (!req.session.username) {
    return res.status(401).send("Need to login");
  }
  const username = req.params["user"];
  const params = {
    TableName: dynamoTableName,
    Key: {
        PK: {
            S: username
        },
        SK: {
            S: 'count'
        }
    }
  };
  try {
    const response = await ddbClient.send(new GetItemCommand(params));
    const postNum = +response.Item["post#"].N
    res.send({ "postNum": postNum });
  } catch (error) {
    res.send("Error: " + error);
  }
});


router.get('/getPost/:userID/:num', async (req, res) => {
  if (!req.session.username) {
      return res.status(400).send("User must be logged in");
  }
  const getCommand = new GetObjectCommand({
      Bucket: 'imgsandcontent',
      Key: `${req.params["userID"]}_post${req.params['num']}`
  });
  try {
      const signedUrl = await getSignedUrl(s3Client, getCommand, {
          expiresIn: 900
      })
      res.send(signedUrl)
  } catch (error) {
      res.status(500).send("Some error: " + error)
  }
});


router.post('/creatingPost', upload.single('image'), async (req, res) => {
  if (!req.session.username) {
      return res.status(401).send("Need to login");
  }
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  try {
      res.send({"uploadStatus": true});
  } catch (error) {
      res.send("Error occured while updating bio: " + err);
  }
});


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
  const { postImg } = req.body
  const timeUploaded = Math.floor(Date.now() / 1000);
  const timStr = timeUploaded.toString()
  const params = {
    TableName: dynamoTableName,
    Item: {
      PK: {
        S: username + "#posts"
      },
      SK: {
        S: "post#time:" + timStr
      },
      content: {
        S: postBio
      },
      imgS3: {
        S: postImg
      },
      timeUploaded: {
        N: timeUploaded.toString()
      }
    }
  };
  await ddbClient.send(new PutItemCommand(params)).then((result) => {
    return res.send("Successfully created post");
  }).catch(error => {
    return res.status(500).send(error);
  });
});

router.post('/removePost', async (req, res) => {
  if (!req.session.username) {
    return res.status(403).send("Need to login before deleting post");
  }
  const { postTimeSK } = req.body
  const username = req.session.username;
  const params = {
    TableName: dynamoTableName,
    Key: {
      PK: {
        S: username + "#posts"
      },
      SK: {
        S: postTimeSK
      }
    }
  }
  let postExists = false
  try {
    await ddbClient.send(new GetItemCommand(params)).then((result) => {
      if (result.Item) postExists = true;
      else return res.status(403).send("Post doesn't exist");
    }).catch(error => {
      return res.status(500).send(error);
    })
  } catch {}
  if (postExists) {
    await ddbClient.send(new DeleteItemCommand(params)).then((result) => {
      return res.send("Post successfully deleted");
    }).catch(error => {
      return res.status(500).send("Some internal error occured");
    });
  }
});

module.exports = router;