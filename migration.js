const { dynamoClient } = require('./config/aws');
const data = require('./migration-data');
const OVERALL_STATS_TABLE_NAME = 'codefiction-stats-overall';

for (let i = 0; i < data.length; i++) {
  const params = {
    TableName: OVERALL_STATS_TABLE_NAME,
    Item: data[i],
  };
  dynamoClient.put(params, (error, result) => {
    if (error) {
      console.log(`ERROR!!!! \r\n ${JSON.stringify(error)}\r\n`);
    }
    console.log(`INFORMATION!!!! \r\n ${JSON.stringify(result)}\r\n`);
  });
}
