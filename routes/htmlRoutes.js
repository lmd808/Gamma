var db = require('../models');


module.exports = function(app) {

// // Welcome Page
// app.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
app.get('/', function(req, res) {

	res.render('dashboard'); 

	});


// Load submit words page
app.get('/submit', function(req, res) {
		db.Word.findAll({}).then(function(dbExamples) {
			res.render('submit', {
				words: dbExamples
			});
		});
	});

	// Load Contact Page
	app.get('/contact', function(req, res) {
		db.Word.findAll({}).then(function(dbExamples) {
			res.render('contact', {
				words: dbExamples
			});
		});
	});
	// Load example page and pass in an example by id
	app.get('/example/:id', function(req, res) {
		db.Word.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
			res.render('example', {
				word: dbExample
			});
		});
	});

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
