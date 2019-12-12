// //create variables
// var $submitBtn = $('#submit');


// // The API object contains methods for each kind of request we'll make
// var API = {
// 	saveNewUse: function(user) {
// 		return $.ajax({
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			type: 'POST',
// 			url: 'users/register',
// 			data: JSON.stringify(user)
// 		});
// 	}
// } 

// var handleFormSubmit = function(event) {
// 	event.preventDefault();

// 	var userData = {
// 		name: $('#name').val().trim(),
// 		email: $('#email').val().trim(),
// 		password: $('#password').val().trim()
// 	};

// 	if (!(userData.name && userData.email && userData.password)) {
// 		alert('You must fill out all fields!');
// 		return;
// 	}

// 	API.saveNewUse(userData).then(function() {
// 		console.log(userData);
// 		// refreshExamples();
// 	});
// 	// clear the fields
// 	$('name').val('');
// 	$('email').val('');
// 	$('password').val('');
// 	$('password2').val('');
// };



// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);