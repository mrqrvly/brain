module.exports = (sample) => {
  let convertedSample = [],
      min, max;
  sample.forEach((value, i) => {
    if (i === 0) { min = -191295;  max = 675586  };
    if (i === 1) { min = -1269405; max = 632541  };
    if (i === 2) { min = -984392;  max = 1417554 };
    if (i === 3) { min = -723764;  max = 412630  };
    let convertedValue = (((value - min) * (100 - 0)) / (max - min)) + 0

  });
}