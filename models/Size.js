
module.exports = function(sequelize, DataTypes){
	debugger;
	return sequelize.define('Sizes', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		brand_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null
		},
		locale_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null
		},
		gender_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null
		},
		article_type_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null
		},
		size: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len:{
					args: 2,
					msg: "A minimum of 2 characters is required"
				}
			}
		},
		age_min: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		age_max: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		weight_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		weight_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		chest_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		chest_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		waist_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		waist_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		seat_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		seat_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		inside_leg_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		inside_leg_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		shoulder_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		shoulder_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		arm_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		arm_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		height_min: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		height_max: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		heal_toe: {
			type: DataTypes.FLOAT,
			allowNull: true,
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
