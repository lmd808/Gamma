module.exports = function(sequelize, DataTypes) {
	var Word = sequelize.define('Word', {
		word_itself: DataTypes.STRING,
		word_Type: DataTypes.STRING,
		word_Definition: DataTypes.TEXT,
		example_Use: DataTypes.TEXT
	});
	return Word;
};
