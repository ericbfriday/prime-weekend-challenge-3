var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 5000;
var toDoList = require('./routes/toDoList');
var indexRouter = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
app.use('/', indexRouter);
app.use('/toDoList', toDoList);

app.listen(port, function() {
  console.log('listening on port ', port);
});
