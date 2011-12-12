

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Roles', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: 3
			}
		},
		enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1
		}
	}, {
		underscored: true,
		freezeTableName: true
	});
};
