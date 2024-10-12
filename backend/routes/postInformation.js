/* const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const dynamoDB = AWS.DynamoDB.DocumentClient();
const dynamoTableName = 'users';

router.get('/:userIDPost/:postID', async (req, res) => {
    const params = {
        TableName: dynamoTableName,
        ExpressionAttributeValues: {
            "PK": req.params["userIDPost"] + "#post",
            "SK": req.params["postID"]
        },
        Select: "ALL_ATTRIBUTES"
    };
    await dynamoDB.query(params).promise().then(response => {
        res.send(response);
    }).catch(error => {
        console.error('Result error was: '+ error);
        res.status(500).send(error);
    })
}); */