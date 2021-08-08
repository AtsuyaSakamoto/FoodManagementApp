const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var createError = require('http-errors');
var path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function (req, res) {
  res.send({
    message: 'テスト',
  });
});

app.listen(process.env.PORT || 3000);

// mongoDBとの接続
const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://user1:sakamo51@cluster0.kop3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db('test').collection('devices');

  console.log('Connected successfully to server');
  const documents = [{ a: 7 }, { b: 8 }, { c: 9 }];

  collection.insertMany(documents, (err, result) => {
    console.log('Inserted 3 documents into the collection');
    console.log(result);
    client.close();
  });
});

// mongoose.connect(
//   'mongodb + srv://user1:sakamo51@cluster0.kop3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// );
// mongoose.connection.once('open', () => {
//   console.log('db connected');
// });

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   res.render('error');
// });

// module.exports = app;
