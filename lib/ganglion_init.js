const Ganglion = require('openbci-ganglion');
const ganglion = new Ganglion({
      verbose: true,                // explore our possibilities within the options object;
      sendCounts: true              // sendCounts provides shorter brain wave data integers;
});
ganglion.once('ganglionFound', (peripheral) => {
  // Stop searching for BLE devices once a ganglion is found.
  ganglion.searchStop();
  ganglion.on('sample', (sample) => {
    /** Work with sample */
    console.log(sample);
    for (let i = 0; i < ganglion.numberOfChannels(); i++) {
    //   console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
    }
  });
  ganglion.once('ready', () => {
    ganglion.streamStart();
  });
  ganglion.connect(peripheral);
});
// Start scanning for BLE devices
ganglion.searchStart();