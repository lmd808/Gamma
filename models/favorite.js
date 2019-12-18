module.exports = function(sequelize, DataTypes) {
	var Favorite = sequelize.define('Favorite', {
		   
	});

Favorite.associate = function (models){
Favorite.belongsTo(models.Word); 
Favorite.belongsTo(models.User);
}; 
	
	return Favorite;
};