const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
require('events').EventEmitter.defaultMaxListeners = 15;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log(`Server started on port: ${port}`);