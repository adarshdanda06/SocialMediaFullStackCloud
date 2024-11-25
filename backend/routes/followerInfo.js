const express = require('express');
const router = express.Router();
const { DynamoDBClient, QueryCommand, TransactWriteItemsCommand, GetItemCommand, ReturnValue } = require("@aws-sdk/client-dynamodb");
const { awsConfig, dynamoTableName } = require('../config');


const ddbClient = new DynamoDBClient(awsConfig);

async function getFollowingList(req, res, userID) {
    let followList = []
    const params = {
        TableName: dynamoTableName,
        ExpressionAttributeValues: {
            ":pk": {
                S: userID + "#following"
            }
        },
        KeyConditionExpression: "PK = :pk",
        ProjectionExpression: "SK"
    };
    result = await ddbClient.send(new QueryCommand(params)).then(result => {
        const listOfUsers = result.Items;
        for (let i = 0; i < listOfUsers.length; i++) {
            followList.push(listOfUsers[i]["SK"]["S"]);
        } // maybe change the follow List to a set here
        return followList;
    }).catch(error => {
        throw error;
    });
    return result;
}

router.get('/:userID/following', async (req, res) => {
    try {
        const result = await getFollowingList(req, res, req.params["userID"]);
        res.send(result);
    }
    catch (error) {
        res.status(500).send("Some error occured:" + error);
    }
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
        var users = []
        for (let i = 0; i < result.Items.length; i++) {
            users.push(result.Items[i]["SK"]["S"])
        }
        return res.send(users)
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
    try {
        const followingList = await getFollowingList(req, res, username);
        const followingSet = new Set(followingList)
        if (followingSet.has(followingThisUser)) {
            return res.send("You already follow this user.")
        }
    }
    catch (error) {
        res.status(500).send("Some error occured:" + error);
    }

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


router.post('/user/unfollow', async (req, res) => {
    if (!req.session.username) {
        return res.status(403).send("User must be logged in to follow");
    }
    const username = req.session.username;
    const { unfollowThisUser } = req.body;
    // may need to add a can't follow again implmentation
    try {
        const followingList = await getFollowingList(req, res, username);
        const followingSet = new Set(followingList)
        if (!followingSet.has(unfollowThisUser)) {
            return res.send("You don't follow this user.");
        }
    }
    catch (error) {
        res.status(500).send("Some error occured:" + error);
    }

    const params = {
        TransactItems: [
            {
                Delete: {
                    TableName: dynamoTableName,
                    Key: {
                        PK: {
                            S: username + "#following"
                        },
                        SK: {
                            S: unfollowThisUser
                        }
                    }
                }
            }, 
            {
                Delete: {
                    TableName: dynamoTableName,
                    Key: {
                        PK: {
                            S: unfollowThisUser + "#followers"
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
                        ":inc": { N: "-1" },         // Increment value
                    },
                }
            },
            {
                Update: {
                    TableName: dynamoTableName,
                    Key: {
                        PK: {
                            S: unfollowThisUser
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
                        ":inc": { N: "-1" },         // Increment value
                    },
                }
            }
        ]
    };
    await ddbClient.send(new TransactWriteItemsCommand(params)).then((result) => {
        return res.send(`Succesfully unfollowed ${unfollowThisUser}`);
    }).catch(error => {
        return res.send(`An error occured: ${error}`);
    });
});


module.exports = router;