/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var model = require('./model');

/* GET users listing. */
router.post('/:srv', function(req, res, next) {
	var srv = req.params.srv
	try {		
		var state = model[srv]()	
		console.log(state)
		res.send(state)
	} catch (e) {
		var error = new Error(e)
		error.status = 500
		error.error = e
		next(error)
	}
});

module.exports = router;