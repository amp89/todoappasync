var express = require('express');
var router = express.Router();
var controller = require('../controllers/main.js');

//routes
router.get('/',controller.index);


router.get('/todo/',controller.getAllItems);


// router.get('/todo/:number',controller.getItem);

router.post('/addStuff',controller.addThings);

router.post('/modify',controller.updateToDoList);

router.post('/delete',controller.deleteFromToDoList);

//export router
module.exports = router;
