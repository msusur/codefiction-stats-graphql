const moment = require('moment');
const { dynamoClient } = require('../../config/aws');

const OVERALL_STATS_TABLE_NAME = 'codefiction-stats-overall';

const fixCharLengthToTwo = number => {
  return number < 10 ? `0${number}` : number;
};

class OverallStatsClient {
  createOverallRecord({ twitter, youtube, podcast }) {
    return new Promise((resolve, reject) => {
      // The whole idea is to allow creating the data only once for each day.
      const now = new Date();
      const day = fixCharLengthToTwo(now.getDate());
      const month = fixCharLengthToTwo(now.getMonth() + 1);
      const createdOn = `${day}.${month}.${now.getFullYear()}`;
      this.getTodaysOverall(createdOn).then(result => {
        if (result.length > 0) {
          return resolve(result[0]);
        }
        const params = {
          TableName: OVERALL_STATS_TABLE_NAME,
          Item: {
            twitter,
            youtube,
            podcast,
            createdOn,
          },
        };
        return dynamoClient.put(params, error => {
          if (error) {
            return reject(error);
          }
          return resolve({
            twitter,
            youtube,
            podcast,
            createdOn,
          });
        });
      });
    });
  }

  getTodaysOverall(today) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: OVERALL_STATS_TABLE_NAME,
        FilterExpression: '#createdOn = :createdOn',
        ExpressionAttributeNames: {
          '#createdOn': 'createdOn',
        },
        ExpressionAttributeValues: {
          ':createdOn': today,
        },
      };
      return dynamoClient.scan(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data.Items);
      });
    });
  }

  getOverallRecords() {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: OVERALL_STATS_TABLE_NAME,
      };
      return dynamoClient.scan(params, (error, result) => {
        if (error) {
          return reject(error);
        }
        const response = [];
        result.Items.forEach(item => {
          const calcItem = item;

          calcItem.createdOnMoment = moment(item.createdOn, 'DD.MM.YYYY');
          response.push(item);
        });
        response.sort((a, b) => {
          return b.createdOnMoment.format('X') - a.createdOnMoment.format('X');
        });
        return resolve(response.reverse());
      });
    });
  }
}

module.exports = OverallStatsClient;
