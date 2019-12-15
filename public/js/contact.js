
var submitButton = $('#submit'); 

submitButton.on('click', sendEmail);
 
function sendEmail (event){
  event.preventDefault(); 
  var contactEmail = $('#contact_email').val().trim(); 
  var emailBody = $('#email_body').val().trim(); 
  email(contactEmail, emailBody);
  var contactEmail = $('#contact_email').val(''); 
  var emailBody = $('#email_body').val('');  

} 


// automatically sends an email
function email(contactEmail, emailBody) {
	// remove later - using for class demo
	console.log(contactEmail);
	// template params
	var templateParams = {
		// who is the email going to?
		to: 'lditom808@gmail.com',
		// subject
		subject: `Gamma Contact request from ${contactEmail}`,
		// body
		html: 
    `
    <p>${emailBody}</p>
		`
	};

	// send - takes three arguments
	// gmail, template, tmplate params from above
	emailjs.send('default_service', 'template_3bDgeTFE', templateParams).then(
		// promise function
		function(response) {
			// log sucess
			console.log('SUCCESS!', response.status, response.text);
		},
		function(error) {
			console.log('FAILED...', error);
		}
	);
}