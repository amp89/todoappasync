var express = require('express');

var app = express();

var path = require('path');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('views',path.join(__dirname,'app_server','views'));

var handlebars = require('express-handlebars').create({defaultLayout:'../../app_server/views/layouts/main'});

app.engine('handlebars',handlebars.engine)
app.set('view engine','handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/',require('./app_server/routes/index.js'));


app.use(function(req,res){
  res.status(404);
  res.send("Page not found");
});

app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500);
  res.send('Server error');
});

app.listen(3000,function(){
  console.log("PROJECT listening on port 3000, ctrl+c to stop");
});
