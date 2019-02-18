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
      }),
      osc = require ('osc'),
        udpPort = new osc.UDPPort({
          localAddress: "localhost",
          localPort: 8081,
          metadata: true
        });

// start;
lib.log("starting");

// routing;
app.get('/', (req, res) => {
  res.send('OBLSK Brain is awakening...');
  // when home route is selected, search for a Ganglion;
  // ganglion.searchStart();
});

// start up the express server;
app.listen(port, () => {
  lib.log("The OBLSK brain is listening on port 12019");
});

// monitor oscPort traffic;
udpPort.on("message", (oscMsg) => {
  console.log("oscPort traffic: " + oscMsg);
});

// when a udp connection completes;
udpPort.on("bundle", (oscBundle, timeTag, info) => {
  console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
  console.log("Remote info is: ", info);
});

// Ganglion event triggers;
ganglion.once('ganglionFound', (peripheral) => {
  // stop searching for BLE devices once a ganglion is found.
  ganglion.searchStop();
  // when a data sample is received from Ganglion;
  ganglion.on('sample', (sample) => {
    // lib.log(JSON.stringify(sample));
    let eegConverted = lib.convertEegInts(sample.channelDataCounts);
    console.log(eegConverted);
    // send message via udp(osc) to madmapper/modulate;

    //
  });
  // when Ganglion is ready to offer up the fruits of the psychic organ;
  ganglion.once('ready', () => {
    // open port for communications;
    udpPort.open();
    ganglion.streamStart();
  });
  // connect Ganglion to the PC etc;
  ganglion.connect(peripheral);
});

ganglion.searchStart();