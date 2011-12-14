/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Import models
var Genders = sequelize.import(__dirname + "/../models/Gender");
var Profiles = sequelize.import(__dirname + "/../models/Profile");

// Define associations
Profiles.belongsTo(Genders);

// Create schema if necessary
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
	// debugger;
	return recs.map(function(row){
		var result = {};
		fields.forEach(function(field){
			result[field] = row[field]
		});
		return result;
	});
};

/**
 * GET /profiles
 */
exports.index = function(req, res){
	
	Profiles.findAll().on('success', function(profiles){
		
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

/**
 * GET /profiles/:id
 */
exports.show = function(req, res){
	var profileId = parseInt(req.params.profile);

	Profiles.find(profileId).on('success', function(profile){
		switch(req.format){
			case 'json':
				if(!gender){
					res.json({
						success: false,
						msg: 'The requested resource could not be found'
					}, 404);
				} else {
					var rec = {
						'id': profile.id,
						'gender': profile.profile,
						'visible': profile.visible
					};
					res.json({
						success: true,
						article: rec
					});
				}
				break;

			case 'xml':
				res.send('<profile>' + profile.profile + '</profile>');
				break;

			default:
				if(!profile){
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							desc: 'The requested resource could not be found'
						},
						status: 404
					});
				} else {
					res.render('profile_show', {
						locals: {
							title: 'Display Profile',
							data: {
								'profile': profile
							}
						}
					});
				}
		};
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

/**
 * GET /profiles/new
 */
exports.new = function(req, res){
	Genders.findAll().on('success', function(genders){
		res.render('profiles_new', {
			locals: {
				title: 'New Profile',
				data: {
					'genders': genders
				}
			}
		});
	}).on('failure', function(err){
		res.render('500', {
			locals: {
				title: '500 - Internal Server Error',
				desc: err
			},
			status: 500
		});
	});
};

/**
 * POST /profiles
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Profiles.build({
		name: req.body.name,
		gender_id: req.body.gender_id,
		age: req.body.age,
		weight: req.body.weight,
		height: req.body.height,
		chest: req.body.chest,
		waist: req.body.waist,
		seat: req.body.seat,
		inside_leg: req.body.inside_leg,
		shoulder: req.body.shoulder,
		arm: req.body.arm
	});
	post.save().on('success', function(id){
		res.json({
			success: true
		}, 200);
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * GET /profiles/:id
 */
exports.show = function(req, res){
	var profileId = parseInt(req.params.profile);
		
	Profiles.find(profileId).on('success', function(profile){
		switch(req.format){
			case 'json':
				debugger;
				// TODO: handle error in session middleware instead
				if(!profile){
					debugger;
					res.json({
						success: false,
						msg: 'No matching records found'
					}, 404);
				} else {
					debugger;
					var rec = {
						id: profile.id,
						name: profile.name,
						gender_id: profile.gender_id,
						age: profile.age,
						weight: profile.weight,
						height: profile.height,
						chest: profile.chest,
						waist: profile.waist,
						seat: profile.seat,
						inside_leg: profile.inside_leg,
						shoulder: profile.shoulder,
						arm: profile.arm
					};
					res.json(rec);	
				}
				break;

			case 'xml':
				res.send('<profile>' + profile.name + '</profile>');
				break;

			default:
				// debugger;
				// TODO: handle error in session middleware instead
				if(!profile){
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							desc: 'The requested resource could not be found'
						},
						status: 404
					});
				} else {
					res.render('profiles_show', {
						locals: {
							title: 'Display Profile',
							data: {
								'profile': profile
							}
						}
					});
				}
		};
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

/**
 * GET /profiles/:id/edit
 */
exports.edit = function(req, res){
	
	var profileId = parseInt(req.params.profile);

	Profiles.find(profileId).on('success', function(profile){
		// debugger;
		Genders.findAll().on('success', function(genders){
			res.render('profiles_edit', {
				id: profile.id,
				title: 'Edit profile' + profile.id + ' - ' + profile.name,
				data: {
					'p': profile,
					'genders': genders
				}
			});
		}).on('failure', function(err){
			res.json({
				success: false,
				msg: err
			}, 500);
		});
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * PUT /profiles/:id
 */
exports.update = function(req, res){
	var profileId = parseInt(req.params.profile);
	Profiles.find(profileId).on('success', function(profile){
		profile.updateAttributes({
				name: req.body.name,
				age: req.body.age,
				gender_id: req.body.gender_id,
				weight: req.body.weight,
				height: req.body.height,
				chest: req.body.chest,
				waist: req.body.waist,
				seat: req.body.seat,
				inside_leg: req.body.inside_leg,
				shoulder: req.body.shoulder,
				arm: req.body.arm,
				visible: req.body.visible,
			}).on('success', function(id){
				// debugger;
				res.json({
					success: true,
				}, 200);
			}).on('failure', function(error){
				res.json({
					success: false,
					msg: err
				}, 500);
			});
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * DELETE /profiles/:id
 */
exports.destroy = function(req, res){
	var profileId = parseInt(req.params.profile);
	Profiles.find(profileId).on('success', function(profile){
		profile.destroy().on('success', function(poo){
			res.json({
				success: true,
			}, 200);
		}).on('failure', function(error){
			res.json({
				success: false,
				msg: err
			}, 500);
		});
	}).on('failure', function(error){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};