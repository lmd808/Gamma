// Get references to page elements
var $exampleText = $('#example-text');
var $exampleType = $('#example-type');
var $exampleDescription = $('#example-description');
var $exampleUse = $('#example-use');
var $submitBtn = $('#submit');
var $exampleList = $('#example-list');

// The API object contains methods for each kind of request we'll make
var API = {
	saveFavorite: function(example) {
		return $.ajax({
			headers: {
				'Content-Type': 'application/json'
			},
			type: 'POST',
			url: 'api/favorites',
			data: JSON.stringify(example)
		});
	},
	getFavorite: function() {
		return $.ajax({
			url: 'api/favorites',
			type: 'GET'
		});
	},
	deleteFavorite: function(id) {
		return $.ajax({
			url: 'api/favorites/' + id,
			type: 'DELETE'
		});
	}
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshFavorite = function() {
	API.getFavorite().then(function(data) {
		console.log(data);
		var $examples = data.map(function(word) {
			var $a = $('<a>').text(`${word.word_itself}: ${word.word_Definition}`).attr('href', '/example/' + word.id);

			var $li = $('<li>')
				.attr({
					class: 'list-group-item',
					'data-id': word.id
				})
				.append($a);

			var $button = $('<button>').addClass('btn btn-danger float-right delete').text('ｘ');

			$li.append($button);

			return $li;
		});

		$exampleList.empty();
		$exampleList.append($examples);
	});
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
	event.preventDefault();

	var example = {
		word_itself: $exampleText.val().trim(),
		word_Definition: $exampleDescription.val().trim(),
		word_Type: $exampleType.val().trim(),
		example_Use: $exampleUse.val().trim(),
		used: false
	};

	if (!(example.word_itself && example.word_Definition && example.word_Type && example.example_Use)) {
		alert('You must fill out all fields!');
		return;
	}

	API.saveExample(example).then(function() {
		console.log(example);
		refreshExamples();
	});
	// clear the fields
	$exampleText.val('');
	$exampleDescription.val('');
	$exampleType.val('');
	$exampleUse.val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
	var idToDelete = $(this).parent().attr('data-id');

	API.deleteExample(idToDelete).then(function() {
		refreshExamples();
	});
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$exampleList.on('click', '.delete', handleDeleteBtnClick);
