const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const request = require('request');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/post-trains', (req, res) => {
  console.log('REQUEST<<<<<<<<<<,');
  request({
    url: "https://booking.uz.gov.ua/train_search/",
    method: "POST",
  	headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    },
    json: true,
    body: req.body.params
  }, function (error, response, body){
    console.log('>>>>>>>>>>>>>');
    console.log(error);
    console.log('------------');
    console.log(response && response.body && response.body.data);
    console.log('------***------');
    console.log(body);
    console.log('<<<<<<<<<<<<<');
    if (response.body.error)  return res.send(response.body);
    let available = response.body.data.list.filter(i => i.types.length);
    res.send(available);
  });
})

app.listen(process.env.PORT || 8081)
