var db = require('../models');

module.exports = function(app, passport) {
	// register route 
	app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
 
        failureRedirect: '/register'
    }
 
));
//  login route 
app.post('/login', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signup'
    }
 
));
  //get word of the day from word of the day table 
	app.get('/api/dailyWord', function(req, res) {
		db.WordOfDay.findOne({}).then((dbExample) => {
			// single random from DB
			res.json(dbExample);
		});
	});
	// Delete an daily word
	app.delete('/api/dailyWord', function(req, res) {
		db.WordOfDay.destroy({}).then(function(dbExample) {
			res.json(dbExample);
		});
	});
	// Create a new example
	app.post('/api/examples', function(req, res) {
		db.Word.create(req.body).then(function(dbExample) {
			res.json(dbExample);
		});
	});

	// Delete an example by id
	app.delete('/api/examples/:id', function(req, res) {
		db.Word.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
			res.json(dbExample);
		});
	});
};
