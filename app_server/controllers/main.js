
var mysql = require('../models/mysql.js');

var bodyParser = require('body-parser')


module.exports.index = function(req,res){

  res.render("index");
};

//page renders and stuff
module.exports.image = function(req,res){
  imageId = req.params.imageId;
  res.render("test",{thing:'stuff'});
};
//TODO testing getItem function to get an item from the sql stuff
module.exports.getItem = function(req, res){
  var idNumber = '"'+req.params.number+'"';
  mysql.getConnection(function(err, con){
    con.query('SELECT * FROM list WHERE id = '+ idNumber, function(err, rows){
        if(err) throw err;
        console.log(rows[0].item);
        res.render('test', { sqldata: rows[0].item });
        //print rows
    });
  });
};

module.exports.getAllItems = function(req, res){
  mysql.getConnection(function(err, con){
    con.query('SELECT * FROM list', function(err, rows){
        if(err) throw err;
        // console.log(rows);
        res.render('testArray', { sqlArray: rows});
        //print rows
    });
  });
};


//code for a get request
module.exports.index = function(req, res){
    mysql.getConnection(function(err, con){
      con.query('Select * from list', function(err, rows){
          if(err) throw err;
          res.render('index', { title : 'Express Todo App', list: rows });
          //print rows
      });
    });
};


module.exports.index = function(req, res){
    mysql.getConnection(function(err, con){
      con.query('Select * from list', function(err, rows){
          if(err) throw err;
          res.render('index', { sqlArray: rows });
          //print rows
      });
    });
};


//thing to update form
module.exports.updateToDoList = function(req, res){
  console.log("UPDATE FORM");
  //req.body has the json thingy
  console.log(req.body);
  console.log(req.body.id);
  id = req.body.id;
  console.log(req.body.item);
  newItem = req.body.item;

  mysql.getConnection(function(err,con){
    con.query('UPDATE list SET item = "'+ newItem +'" WHERE id = ' + id);
  });


  res.redirect("todo");
};


module.exports.addThings = function(req,res){
  console.log("Add tacos");
  console.log(req.body.itemToAdd);
  var itemToAdd = req.body.itemToAdd;
  // res.redirect("todo");
  mysql.getConnection(function(err,con){
    con.query('INSERT INTO list (item) VALUES ("'+itemToAdd+'")');
  });
  res.redirect("/todo");
};

module.exports.deleteFromToDoList = function(req, res){
  console.log("DELETE FORM");
  console.log(req.body);
  console.log(req.body.idToDelete);
  id = req.body.idToDelete;
  mysql.getConnection(function(err,con){
    con.query('DELETE FROM list WHERE id = ' + id);
  });

    res.redirect("todo");
};



//code for a post request
module.exports.create = function(req, res){
    var content = req.body.content;
    mysql.getConnection(function(err, con){
      con.query('INSERT INTO todos (content) VALUES ("' + content + '")');
    });
    res.redirect('/');
};
