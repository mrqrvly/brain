const express = require('express'),
      app = express(),
      port = 12019;

app.get('/', (req, res) => {
  res.send('OBLSK Brain Project Data will go here...');
});

app.listen(port, () => {
  console.log("The OBLSK brain is listening on port 12019.");
});