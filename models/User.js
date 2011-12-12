

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Users', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: 3
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: 6
			}
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1
		}
	}, {
		underscored: true,
		freezeTableName: true
	});
};
