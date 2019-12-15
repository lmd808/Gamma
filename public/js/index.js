var word_itself = $('#word_itself'); 
var word_definition = $('#word_definition'); 
var example_use = $('#example_use'); 
var API = {
	getRandom: function() {
		return $.ajax({
			url: '/api/dailyWord',
			type: 'GET'
		});
	}
};

function getDailyword(){
API.getRandom().then(function(data) {
	// console.log(data);
	word_itself.text(`${data.word_itself}:    ${data.word_Type}`); 
	word_definition.text(` Definition: ${data.word_Definition}`); 
	example_use.text(`Example Use: ${data.example_Use}`); 
});
}
getDailyword(); 




