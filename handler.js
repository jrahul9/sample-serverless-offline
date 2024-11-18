const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ endpoint: 'http://localhost:9324' }); // Local SQS endpoint

module.exports.sendMessage = async (event) => {
  const params = {
    MessageBody: JSON.stringify({ message: 'Hello from SQS!' }),
    QueueUrl: 'http://localhost:9324/000000000000/myQueue', // LocalStack URL for the SQS queue
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent', result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send message', error }),
    };
  }
};

module.exports.processMessage = async (event) => {
  console.log('Received SQS message:', JSON.stringify(event));

  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log('Processing message:', message);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message processed' }),
  };
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};

// handler.js
