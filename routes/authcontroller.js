var exports = module.exports = {}
 
exports.register = function(req, res) {
 
    res.render('register');
 
}

exports.login = function(req, res) {
 
    res.render('login');
 
}

exports.favorites = function(req, res) {
 
    res.render('favorites');
 
}

exports.submit = function(req, res) {
 
    res.render('submit');
 
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}