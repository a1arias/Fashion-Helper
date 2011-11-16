
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Locale', {
		locale: DataTypes.TEXT
	});
};
