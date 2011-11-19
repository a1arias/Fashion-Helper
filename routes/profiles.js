/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Genders model
var Genders = sequelize.import(__dirname + "/../models/Gender");

// Profile model
var Profiles = sequelize.import(__dirname + "/../models/Profile");

// define associations
Genders.hasOne(Profiles);

// Create the schema if necessary
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
		
		switch(req.format){
			case 'json':
				var recs = mapCollection(profiles, [
					'id',
					'name',
					'gender_id',
					'age',
					'weight',
					'height',
					'chest',
					'waist',
					'seat',
					'inside_leg',
					'shoulder',
					'arm'
				]);
				res.json(recs);
				break;

			case 'xml':
				res.send('<profiles>' + profiles.map(function(p){
					return '<profile>' + p.profile + '</profile>';
				}).join('') + '</profiles>');
				break;

			default:
				// debugger;
				res.render('profiles', {
					locals: {
						title: 'Profiles',
						data: {
							'profiles': profiles
						}
					}
				});
		};
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
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
		debugger;
		throw new Error(err);
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
		gender_id: req.body.gender,
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
		debugger;
		throw new Error(err);
	});
};

/**
 * GET /profiles/:id
 */
exports.show = function(req, res){
	var profileId = parseInt(req.params.profile);
	debugger;
		
	Profiles.find(profileId).on('success', function(profile){
		switch(req.format){
			case 'json':
				// debugger;
				if(typeof profile === 'undefined'){
					res.json({
						success: false,
						msg: 'No matching records found'
					});
				} else {
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
				res.render('profiles_show', {
					locals: {
						title: 'Display Profile',
						data: {
							'profile': profile
						}
					}
				});
		};
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
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
			debugger;
			throw new Error(err);
		});
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
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
			// debugger;
			throw new Error(error);
		});
	}).on('failure', function(error){
		// debugger;
		throw new Error(error);
	});
};