const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
require('events').EventEmitter.defaultMaxListeners = 15;

// app.use(express.static(__dirname));
// app.get('/', (req, res) => {
//     console.log("req",req);
//     console.log("dirname", __dirname);
//     console.log("path",path.resolve(__dirname, 'public/index.html'));
//     res.sendFile(path.resolve(__dirname, 'build/index.html'));
// });

app.use(express.static(path.join(__dirname, 'build')));
//-app.get('/', function (req, res) {
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log(`Server started on port: ${port}`);