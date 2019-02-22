// OBLSK INTERACTIVE BRAIN 2019;
////////////////////////////////
const lib = require('../lib/lib'),
      express = require('express'),
      app = express(),
      port = 12019//,
      // Ganglion = require('openbci-ganglion'),
      // ganglion = new Ganglion({
      //   verbose: true,
      //   sendCounts: true
      // }),
      osc = require ('osc'),
        udpPort = new osc.UDPPort({
          localAddress: "localhost",
          localPort: 8081,
          metadata: true
        });

// start;
lib.log("starting");

// routing;
// app.get('/', (req, res) => {
//   res.send('OBLSK Brain is awakening...');
//   // when home route is selected, search for a Ganglion;
//   // ganglion.searchStart();
// });

// start up the express server;
// app.listen(port, () => {
//   lib.log("The OBLSK brain is listening on port 12019");
// });

// monitor oscPort traffic;
// this doesn't seem to work as of 2019.02.19;
// udpPort.on("message", (oscMsg) => {
//   console.log("oscPort traffic: " + oscMsg);
// });

// when a udp connection completes;
// this one doesn't seem to work either, again as of 2019.02.19 //
// udpPort.on("bundle", (oscBundle, timeTag, info) => {
//   console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
//   console.log("Remote info is: ", info);
// });

// Ganglion event triggers;
// ganglion.once('ganglionFound', (peripheral) => {
//   // stop searching for BLE devices once a ganglion is found.
//   ganglion.searchStop();
//   // when a data sample is received from Ganglion;
//   ganglion.on('sample', (sample) => {
//     // lib.log(JSON.stringify(sample));
//     let eegConverted = lib.convertEegInts(sample.channelDataCounts);
//     console.log(eegConverted);
//     // send message via udp(osc) to madmapper/modulate;

//     //
//   });
//   // when Ganglion is ready to offer up the fruits of the psychic organ;
//   ganglion.once('ready', () => {
//     // open port for communications;
//     udpPort.open();
//     ganglion.streamStart();
//   });
//   // connect Ganglion to the PC etc;
//   ganglion.connect(peripheral);
// });

// ganglion.searchStart();

// spin up the udpPort communication //
console.log("open udpPort");
udpPort.open();

for (var i = 1; i < 1000000; i++) {
  setTimeout(() => {
    console.log(`index: ${i}`);
    let sample = lib.rng();
    console.log(sample);
    sample.forEach((value, index) => {
      setTimeout(() => {
        let quad = index + 2,
            opacity = value,
            quadCmd = { address: `/surfaces/Quad-${quad}/select` },
            opacityCmd = { address: `/surfaces/Quad-${quad}/opacity`, args: [{ type: "i", value: value }]};
        udpPort.send(quadCmd, "localhost", 8010);
        console.log("sending " + JSON.stringify(quadCmd));
        udpPort.send(opacityCmd, "localhost", 8010);
        console.log("sending " + JSON.stringify(opacityCmd));
      }, 250 * index);
    });
  }, 1000 * i);
}

