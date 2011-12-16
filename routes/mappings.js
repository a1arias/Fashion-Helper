/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize'),
	chainer = new Sequelize.Utils.QueryChainer;

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Import models
var Genders = sequelize.import(__dirname + "/../models/Gender");
var Profiles = sequelize.import(__dirname + "/../models/Profile");

// Define associations
Profiles.belongsTo(Genders);

// Create the schema if necessary
Genders.sync();
Profiles.sync();

/**
 * takes an Array of records
 * and and Array of fields and returns 
 * a collection.
 *
 * 
 * @param {Array} recs
 * @param {Array} fields
 * @return {Array}
 * @api public
 */
function mapCollection(recs, fields){
	return recs.map(function(row){
		var result = {};
		fields.forEach(function(field){
			result[field] = row[field]
		});
		return result;
	});
};

/**
 * GET /mappings
 */
exports.index = function(req, res){
	
	Profiles.findAll({}).on('success', function(profiles){

		var chainer = new Sequelize.Utils.QueryChainer,
			_profiles  = [];

		profiles.forEach(function(p) {
			var emitter = new Sequelize.Utils.CustomEventEmitter(function(){
				p.getGender().on('success', function(x){
					_profiles.push({
						profile: p,
						gender: x
					});
					emitter.emit('success')
				});
			});
			chainer.add(emitter.run());
		});

		chainer.run().on('success', function(){

			switch(req.format){
				case 'json':
					debugger;
					var fields = [
						'id',
						'name',
						'gender_id',
						'gender',
						'age',
						'weight',
						'height',
						'chest',
						'waist',
						'seat',
						'inside_leg',
						'shoulder',
						'arm'
					];
					var recs = _profiles.map(function(row){
						var result = {};
						fields.forEach(function(field){
							if(field == 'gender'){
								result[field] = row.gender[field];
							} else {
								result[field] = row.profile[field];
							}
						});
						return result;
					});
					debugger;
					res.json({
						success: true,
						'data': recs
					}, 200);
					break;
				
				case 'xml':
					res.send('<profiles>' + profiles.map(function(p){
						return '<profile>' + s.name + '</profile>';
					}).join('') + '</profiles>');
					break;

				default:
					debugger;
					res.render('mappings', {
						locals: {
							title: 'Profile-Size Mappings',
							data: {
								'profiles': profiles,
							}
						}
					});
			};
		});
	}).on('failure', function(err){
		switch(req.format){
			case 'json':
				res.json({
					success: false,
					msg: err
				}, 500);

			// TODO: add xml res

			default:
				res.render('500', {
					locals: {
						title: '500 - Internal Server Error',
						desc: err
					},
					status: 500
				});
		};
	});
};