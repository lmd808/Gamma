// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// Load User model
const db = require('../models');
// const { forwardAuthenticated } = require('../config/auth');

module.exports = function(app) {
// 	// Login Page
//  app.get('/users/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
//   app.get('/users/register', forwardAuthenticated, (req, res) => res.render('register'));
// 	// Get all examples
// 	app.get('/api/words', function(req, res) {
// 		db.Word.findAll({}).then(function(dbExamples) {
// 			res.json(dbExamples);
// 		});
// 	});

// app.post('/users/register', (req, res) => {
// 	db.User.create(req.body).then((user)=> {
// 			console.log(user); 
//       res.json(user);
//       console.log(); 
//       res.redirect('/users/login');
// 		})
// })

// app.post('/users/register', passport.authenticate('local-signup', {
//         successRedirect: '/dashboard',
 
//         failureRedirect: '/register'
//     }
 
// ));
// app.post('/users/login', (req, res, next) => {
// 	passport.authenticate('local', {
// 		successRedirect: '/dashboard',
// 		failureRedirect: '/users/login',
// 		failureFlash: true
// 	})(req, res, next);
// });


	// get random word
	// app.get('/api/examples', function(req, res) {
	// 	db.Word.findOne({ order: [ db.Sequelize.fn('RAND') ] }).then((dbExample) => {
	// 		// single random from DB
	// 		res.json(dbExample);
	// 	});
	// });
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
