module.exports = function(sequelize, DataTypes) {
	var wordsOfTheWeek= sequelize.define('wordsOfTheWeek', {
		word_itself: DataTypes.STRING,
		word_Type: DataTypes.STRING,
		word_Definition: DataTypes.TEXT,
		example_Use: DataTypes.TEXT
	});
	return wordsOfTheWeek;
};