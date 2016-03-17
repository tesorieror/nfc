/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET users listing. */
router.get('/:tagid', function(req, res, next) {	
	
	var tagid = req.params.tagid
	
	fs.readFile('../public/json/map.json', 'utf8', function(err, data) {
		if (err) {
			var error = new Error(err)
			error.status = 500
			error.error = err
			next(error)
		} else {
			var map = JSON.parse(data);
			console.log(map);
			console.log(tagid);
			console.log(map[tagid]);
			res.send(map[tagid]);
		}
	});
	
});

module.exports = router;