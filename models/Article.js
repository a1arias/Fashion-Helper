

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Articles', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		article_type: {
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
		underscored: true,
		freezeTableName: true
	});
};
