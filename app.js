const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
})
app.use(routes);

mongoose
  .connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@url-shortener-8fnbq.mongodb.net/url?retryWrites=true`, {useNewUrlParser: true})
  .then(res => {
    console.log('server running..');
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => console.log(err))