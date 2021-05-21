const express = require("express");
const cors = require("cors")

const app = express();
const dft = require('fft-js').dft
const bodyParser = require("body-parser");
app.use(cors())
app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));

app.post('/',(req,res) => {
  console.log(req.body)
  res.send(dft(req.body.data))
  //res.send('halo')
})
app.get('/',(req,res) => {
  res.send("hello")
})
app.listen(3000)