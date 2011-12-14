
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Profiles', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: 3,
					msg: 'A minimum of 2 characters is required'
				}
			}
		},
		gender_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		weight: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		height: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		chest: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		waist: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		seat: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		inside_leg: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		shoulder: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		arm: {
			type: DataTypes.FLOAT,
			allowNull: true,
		}
	}, {
		underscored: true,
		freezeTableName: true
	});
};