module.exports = () => {
  const osc = require ('osc'),
        udpPort = new osc.UDPPort({
          localAddress: "localhost",
          localPort: 8081,
          metadata: true
        });

  // open port for communications;
  udpPort.open();

  // monitor oscPort traffic;
  udpPort.on("message", (oscMsg) => {
    console.log("oscPort traffic: " + oscMsg);
  });

  udpPort.on("bundle", (oscBundle, timeTag, info) => {
    console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
    console.log("Remote info is: ", info);
});

  // TEST ONLY ;
  // define possible commands to send via osc;
  // const oscCmnds = [
  //   { address: "/medias/black.mov/select"},
  //   { address: "/medias/black.mov/play_forward"},
  //   { address: "/medias/Blurred Bokeh Video.mp4/select" },
  //   { address: "/medias/Blurred Bokeh Video.mp4/play_forward" },
  //   { address: "/surfaces/Quad-2/select" },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 5 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 10 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 15 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 20 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 25 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 30 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 35 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 40 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 45 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 50 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 55 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 60 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 65 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 70 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 75 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 80 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 85 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 90 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 95 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 100 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 95 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 90 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 85 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 80 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 75 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 70 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 65 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 60 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 55 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 50 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 45 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 40 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 35 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 30 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 25 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 20 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 15 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 10 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 5 }] },
  //   { address: "/surfaces/Quad-2/opacity/", args: [{ type: "i", value: 0 }] },
  //   { address: "/medias/black.mov/select" },
  //   { address: "/medias/black.mov/pause" },
  //   { address: "/medias/Blurred Bokeh Video.mp4/select" },
  //   { address: "/medias/Blurred Bokeh Video.mp4/pause" }
  // ];

  udpPort.on("ready", () => {
    oscCmnds.forEach((command, i) => {
      setTimeout(() => {
        console.log("trying to send " + JSON.stringify(command));
        // send the osc command;
        udpPort.send(command, "localhost", 8010);
        if (i === oscCmnds.length -1) {
          setTimeout(() => {
            udpPort.close();
          }, 250);
        }
      }, 250 * (i + 1));
    });
  });
}