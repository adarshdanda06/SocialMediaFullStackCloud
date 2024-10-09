const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const dynamoDB = AWS.DynamoDB.DocumentClient();
const dynamoTableName = 'users';

router.get('/:userID/countAttrs', async (req, res) => {
    const params = {
        TableName: dynamoTableName,
        ExpressionAttributeValues: {
            "PK": req.params["userID"],
            "SK": "count"
        },
        Select: "ALL_ATTRIBUTES"
    }
    await dynamoDB.query(params).promise().then(response => {
        res.send(response);
    }).catch(error => {
        console.error('Result error was:' + error);
        res.status(500).send(error);
    });
});


router.get('/:userID/infoAttrs', async (req, res) => {
    const params = {
        TableName: dynamoTableName,
        ExpressionAttributeValues: {
            "PK": req.params["userID"],
            "SK": "info"
        }
    };
    await dynamoDB.query(params).promise().then(response => {
        res.send(response);
    }).catch(error => {
        console.error('Result error was:' + error);
        res.status(500).send(error);
    });
});


router.post('/createAccount', async (req, res) => {
    const reqBody = req.body;
    const resKeys = Object.keys(reqBody);
    const validKeys = ["userName", "name", "bio"]
    if (resKeys.length === 3 && resKeys.every((key, index) => key === validKeys[index])) {
    } else {
        console.error('You can have and only have a user name and name and bio.')
        res.status(400).send('Bad input request') // check if you can do this
    }
    // next check if you can this user name already exists
    const params = {
        TableName: dynamoTableName,
        Item: reqBody
    }
});