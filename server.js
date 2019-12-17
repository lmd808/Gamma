require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;
// passport 
var passport   = require('passport')
var session    = require('express-session')
// end passport 

// passport middleware 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret 
app.use(passport.initialize()); 
app.use(passport.session());
// end passport middleware

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app);
var syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

//load passport strategies
require('./config/passport.js')(passport, db.User);

// welcome to the fuckening 

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// cron job daily 
var cron = require('node-cron');
// varuables to hold my sql data as I shift it arounf 
var returnOBJ;
var word_itself; 
var word_id; 
var word_Type;
var word_Definition;
var example_Use;

// cron job scheduled for ever min for testing 
cron.schedule('* * * * *', function() {
  allUsers(); 
  // randomly select a word from my database. that word will then be sent out to my word of the day table 
    db.Word.findOne({ order: [ db.Sequelize.fn('RAND') ] }).then((dbExample) => {
    returnOBJ = dbExample; 
    // set the values to my global variables do that I can use them later. It will make moving the data easier and risk less typos 
    word_id = returnOBJ.dataValues.id; 
    word_itself = returnOBJ.dataValues.word_itself; 
    word_Type = returnOBJ.dataValues.word_Type; 
    word_Definition = returnOBJ.dataValues.word_Definition; 
    example_Use = returnOBJ.dataValues.example_Use; 
    // console log to double check that the data being sent out is correct 
    // console.log(`${word_id} \n ${word_itself} \n ${word_Type} \n ${word_Definition} \n ${example_Use}`); 
    // return returnOBJ; 
    // call back function with my variables as params!!!!
    WordOfTheDayTableFunction(word_itself, word_Type, word_Definition, example_Use, word_id); 
 
    })
    //  the big Kahoona!!! this function pushed my data to my wordOfDay table!!!!!!!!!!!!
    function WordOfTheDayTableFunction(word, type, def, exampleUse, word_id){
      // destroy all contents in the word of day table 
      db.WordOfDay.destroy({where:{}}).then(function (){
        console.log(`Table Cleared`)
      // then add a word (repeate this process daily via cron)
      db.WordOfDay.create({
        word_itself: word, 
        word_Type: type, 
        word_Definition: def, 
        example_Use: exampleUse 
      }).then(function(dbWordOfDay) {
        // this calls the function that pushes my words of the day to the words of the week table 
        wordsOfTheWeek(); 
        // this calls my email function that allows me to send me word of the day to my clients 
        // Automatically 
        email(dbWordOfDay, userString); 
			})})
    // currently works 
    }      
});

// all users function grabs all of my users from my user DB and joins them as a string seperated by a comma 
var usersArray = [];
var userString; 
function allUsers (){
  db.User.findAll({
    attributes: ['email']
  }).then(function (data){
    for(var i = 0; i< data.length; i++){
    usersArray.push(data[i].dataValues.email); 
    }
    console.log(usersArray); 
  userString = usersArray.toString(); 
  console.log(userString);
  })
}



// call words of the week table 
// working- creates data for my wordsOfTheWeek Model 
function wordsOfTheWeek(){ 
  db.wordsOfTheWeek.create({
    word_itself: word_itself, 
    word_Type: word_Type,
    word_Definition: word_Definition,
    example_Use: example_Use
  }).then(function(data){
  })

}
// cron scheduler set to ever 6 minutes. this clears my words of the week table 
cron.schedule('*/7 * * * *', function() {
  db.wordsOfTheWeek.destroy({where:{}}).then(function(data){
    console.log(`Table Cleared`)
  })
})

// Email ///////////////////////////////////////////////////////////////////////
// require node mailer 
var nodemailer = require('nodemailer');
// connection function to mailtrap 
let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: 'f521b68a29c22c',
       pass: 'fb6117285914a4'
    }
});

// email function called in initial cron job (send an email with every word of the day update)
function email(dbWordOfDay){
const message = {
    from: 'safetrek001@gmail.com', // Sender address
    to: userString,         // List of recipients
    subject: 'Gamma- Word Of the Day', // Subject line
    html: `<br>
      <h2>The word of the day is:  ${dbWordOfDay.dataValues.word_itself} </h2>
      <br>
      Definition: ${dbWordOfDay.dataValues.word_Definition} 
      <br>
      Learn more about ${dbWordOfDay.dataValues.word_itself} <a href="http://localhost:3000/">HERE</a>`
};
// execution of email and confirming 
transport.sendMail(message, function(err, info) {
    if (err) {
      // console.log(err)
    } else {
      // currently working so we will get rid of the console logs for now 
      // console.log(info);
    }
});
}
// end email ////////////////////////////////////////////////////////////////////////////////////////
// export app 
module.exports = app; 
