const express = require("express");
const cors = require("cors")

const app = express();
const fft = require('fft-js').fft
const bodyParser = require("body-parser");
app.use(cors())
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.post('/',(req,res) => {
  console.log(req.body)
  req.body.data.length = Math.pow(2, Math.ceil(Math.log(req.body.data.length)/Math.log(2)))
  console.log('req body length = ',req.body.data.length)
  req.body.data = Array.from(req.body.data, item => item || 0);
  console.log('data = ',req.body.data)
  console.log('starting')
  let dataFFT = fft(req.body.data).map(e => Math.sqrt(e[0]*e[0] + e[1]*e[1]))
  console.log('dataFFt = ',dataFFT)
  res.send(dataFFT)
  //res.send('halo')
})
app.get('/',(req,res) => {
  res.send("hello")
})
app.listen(3000)