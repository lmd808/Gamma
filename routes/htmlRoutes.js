var db = require('../models');
var authController = require('./authcontroller.js');


module.exports = function(app) {
// register route 
app.get('/register', authController.register); 

// login route 
app.get('/login', authController.login);


// Dashboard
app.get('/', function(req, res) {
		db.WordOfDay.findOne({}).then(function(data) {
			res.render('dashboard');
			console.log(data); 
		});
	});

//load dictionary in it's entirity. For more info look at files dictionary.handlebars and dictionary.js 
app.get('/dictionary', function(req, res) {
		db.Word.findAll({order: [
      ['word_itself', 'ASC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
]}).then(function(dbExamples) {
			res.render('dictionary', {
				words: dbExamples
			});
		});
	});

// load words of the week table 
app.get('/wordOfWeek', function (req, res){
	db.wordsOfTheWeek.findAll({order: [
      ['word_itself', 'ASC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
]}).then(function(dbExamples) {
			res.render('wordOfWeek', {
				words: dbExamples
			});
		});
}) 
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
		res.render('error');
	});
};
