// mySql module in (modles/mysql.js)
var mysql = require('mysql');


exports.getConnection = function(callback){
  var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'todo'
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to todoDb');
      return callback(err);
    }
    callback(err, con);
  });
};
