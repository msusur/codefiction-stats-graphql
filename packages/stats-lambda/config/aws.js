const AWS = require('aws-sdk');

const SERVICE_NAME = 'dynamodb';
const REGION = 'eu-west-1';
const configuration = {
  region: REGION,
  endpoint: `https://${SERVICE_NAME}.${REGION}.amazonaws.com`,
  accessKeyId: process.env.AMAZON_AWS_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_AWS_ACCESS_SECRET_KEY,
};

console.log(`DynamoDb endpoint is: ${configuration.endpoint}`);
AWS.config.update(configuration);
module.exports = {
  dynamoClient: new AWS.DynamoDB.DocumentClient(),
};
