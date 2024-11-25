const express = require('express');
const session = require('express-session');
const router = express.Router();
const { awsConfig, s3AwsConfig, dynamoTableName } = require('../config');
const { DynamoDBClient, GetItemCommand, PutItemCommand, TransactWriteItemsCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const bcrypt = require('bcryptjs');
const e = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');




const ddbClient = new DynamoDBClient(awsConfig);
const s3Client = new S3Client(s3AwsConfig);
const s3BucketName = 'imgsandcontent';
const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: s3BucketName,
      key: (req, file, cb) => {
        const fileName = `profilePicture_${req.session.username}`;
        cb(null, fileName);
      }
    })
});


router.post('/creatingProfile', upload.single('image'), async (req, res) => {
    if (!req.session.username) {
        return res.status(401).send("Need to login");
    }
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    const { bio } = req.body
    const username = req.session.username
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
        },
        ExpressionAttributeValues: {
            ":val": {
                S: bio
            },

        },
        UpdateExpression: "SET #attr = :val"
    };
    
    try {
        const response = await ddbClient.send(new UpdateItemCommand(params))
        res.send("Successfully updated bio and uploaded profilePic")
    } catch (error) {
        res.send("Error occured while updating bio: " + err);
    }
});


router.get('/getProfilePic/:userID', async (req, res) => {
    if (!req.session.username) {
        return res.status(400).send("User must be logged in");
    }
    const getCommand = new GetObjectCommand({
        Bucket: 'imgsandcontent',
        Key: `profilePicture_${req.params['userID']}`,
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
                req.session.username = username
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
    } else {
        const s3params = {
            Bucket: s3BucketName,
            Key: profileImg.name,
            Body: file,
            ContentType: file.type
        }

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