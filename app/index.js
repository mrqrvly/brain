// OBLSK INTERACTIVE BRAIN 2019;
////////////////////////////////
const lib = require('../lib/lib'),
      express = require('express'),
      app = express(),
      port = 12019//,
      Ganglion = require('openbci-ganglion'),
      ganglion = new Ganglion({
        verbose: true,
        sendCounts: true
      });

// start;
lib.log("starting");

// routing;
app.get('/', (req, res) => {
  res.send('OBLSK Brain is awakening...');
  // when home route is selected, search for a Ganglion;
  ganglion.searchStart();
});

// start up the express server;
app.listen(port, () => {
  lib.log("The OBLSK brain is listening on port 12019");
});

// TEST ONLY;
// test osc communication with madmapper;
// lib.oscTest();

// TEST ONLY;
// find lowest and highest in range;
// let highest0 = 0, lowest0 = 0,
//     highest1 = 0, lowest1 = 0,
//     highest2 = 0, lowest2 = 0,
//     highest3 = 0, lowest3 = 0;
// function findRange(sample) {
//   if (sample[0] > highest0) highest0 = sample[0];
//   if (sample[0] < lowest0) lowest0 = sample[0];
//   if (sample[1] > highest1) highest1 = sample[1];
//   if (sample[1] < lowest1) lowest1 = sample[1];
//   if (sample[2] > highest2) highest2 = sample[2];
//   if (sample[2] < lowest2) lowest2 = sample[2];
//   if (sample[3] > highest3) highest3 = sample[3];
//   if (sample[3] < lowest3) lowest3 = sample[3];
//   console.log("upper range: " + [highest0, highest1, highest2, highest3]);
//   console.log("lower range: " + [lowest0, lowest1, lowest2, lowest3]);
// }

// Ganglion event triggers;
ganglion.once('ganglionFound', (peripheral) => {
  // stop searching for BLE devices once a ganglion is found.
  ganglion.searchStop();
  // when a data sample is received from Ganglion;
  ganglion.on('sample', (sample) => {
    lib.log(JSON.stringify(sample));
    findRange(sample.channelDataCounts);
  });
  // when Ganglion is ready to offer up the fruits of the psychic organ;
  ganglion.once('ready', () => {
    ganglion.streamStart();
  });
  // connect Ganglion to the PC etc;
  ganglion.connect(peripheral);
});
