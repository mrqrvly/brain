// OBLSK INTERACTIVE BRAIN 2019;
////////////////////////////////
const lib = require('../lib/lib'),
      express = require('express'),
      app = express(),
      port = 12019//,
      Ganglion = require('@openbci/ganglion'),
      ganglion = new Ganglion({
        verbose: true,
        sendCounts: true
      }),
      osc = require ('osc'),
      udpPort = new osc.UDPPort({
        localAddress: "localhost",
        localPort: 8081,
        metadata: true
      }),
      utils = require('@openbci/utilities');

// start;
console.log("starting");

// Ganglion event triggers;
ganglion.once('ganglionFound', (peripheral) => {
  // stop searching for BLE devices once a ganglion is found.
  ganglion.searchStop();
  // when a data sample is received from Ganglion;
  ganglion.on('sample', (sample) => {
    if (sample.sampleNumber === 1) {
      let eegConverted = lib.convertEegInts(sample.channelDataCounts);
      console.log(eegConverted);
      // send message via udp(osc) to madmapper/modulate;
      eegConverted.forEach((value, index) => {
        setTimeout(() => {
          let quad = index + 2,
              opacity = value,
              quadCmd = { address: `/surfaces/Quad-${quad}/select` },
              opacityCmd = { address: `/surfaces/Quad-${quad}/opacity`, args: [{ type: "i", value: opacity }]};
          udpPort.send(quadCmd, "localhost", 8010);
          console.log("sending " + JSON.stringify(quadCmd));
          udpPort.send(opacityCmd, "localhost", 8010);
          console.log("sending " + JSON.stringify(opacityCmd));
        }, 250 * index);
      });
    }
  });

  // when Ganglion is ready to offer up the fruits of the psychic organ;
  ganglion.once('ready', () => {
    // open port for communications;
    console.log("Ganglion ready, opening udpPort connection for osc communication");
    udpPort.open();
    // start Ganglion data stream //
    ganglion.streamStart();
    // check state of Ganglion //
    console.log("Ganglion options at init:\n" + JSON.stringify(ganglion.options));
  });
  // connect Ganglion to the PC etc;
  ganglion.connect(peripheral);
});

ganglion.searchStart();







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEST ONLY // FAKE BRAIN // TEST ONLY // FAKE BRAIN // TEST ONLY // FAKE BRAIN // TEST ONLY // FAKE BRAIN // TEST ONLY //
// spin up the udpPort communication //
// console.log("open udpPort");
// udpPort.open();
//
// for (var i = 1; i < 1000000; i++) {
//   setTimeout(() => {
//     console.log(`index: ${i}`);
//     let sample = lib.rng();
//     console.log(sample);
//     sample.forEach((value, index) => {
//       setTimeout(() => {
//         let quad = index + 2,
//             opacity = value,
//             quadCmd = { address: `/surfaces/Quad-${quad}/select` },
//             opacityCmd = { address: `/surfaces/Quad-${quad}/opacity`, args: [{ type: "i", value: value }]};
//         udpPort.send(quadCmd, "localhost", 8010);
//         console.log("sending " + JSON.stringify(quadCmd));
//         udpPort.send(opacityCmd, "localhost", 8010);
//         console.log("sending " + JSON.stringify(opacityCmd));
//       }, 250 * index);
//     });
//   }, 1000 * i);
// }