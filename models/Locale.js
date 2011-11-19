
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Locale', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		locale: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: 2
			}
		},
		visible: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1
		}
	}, {
		underscored: true
	});
};
