
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Profile', {
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
					msg: 'A minimux of 2 characters is required'
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
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		chest: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		waist: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		seat: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		inside_leg: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		shoulder: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		arm: {
			type: DataTypes.INTEGER,
			allowNull: true,
		}
	});
};