const fs = require('fs'),
      moment = require('moment'),
      date = moment().format('YYYYMMDD');

module.exports = msg => {
  let timestamp = moment().format('YYYYMMDD.hh.mm.ss.A');
  console.log(msg);
  fs.appendFileSync('../logs/' + date + '.LOG', msg + "\n");
}