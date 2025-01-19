require('dotenv').config();

const accessKey = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY

let awsConfig = {
    'region': 'us-east-2',
    credentials: {
        'accessKeyId': accessKey,
        'secretAccessKey': secretAccessKey
    }
};

let s3AwsConfig = {
    'region': 'us-east-2',
    credentials: {
        'accessKeyId': accessKey,
        'secretAccessKey': secretAccessKey
    },
}

let dynamoTableName = "dynamoSocialSchema";

module.exports = {
    awsConfig,
    s3AwsConfig,
    dynamoTableName
}