/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize'),
	chainer = new Sequelize.Utils.QueryChainer;

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Locale model
var Locales = sequelize.import(__dirname + "/../models/Locale");

// Brand model
var Brands = sequelize.import(__dirname + "/../models/Brand");

// Article model
var Articles = sequelize.import(__dirname + "/../models/Article");

// Gender model
var Genders = sequelize.import(__dirname + "/../models/Gender");

// Size model
var Sizes = sequelize.import(__dirname + "/../models/Size");

// Define associations
Locales.hasMany(Sizes, {foreignKey: 'locale_id'});

Brands.hasOne(Sizes, {foreignKey: 'brand_id'});

Articles.hasOne(Sizes, {foreignKey: 'article_type_id'});

Genders.hasOne(Sizes, {foreignKey: 'gender_id'});

// Create the schema if necessary
Sizes.sync();

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
 * GET /sizes
 */
exports.index = function(req, res){
	
	Sizes.findAll({fetchAssociations: true}).on('success', function(sizes){

		switch(req.format){
			case 'json':
				// debugger;
				var sizes = mapCollection(sizes, [
					'id',
					'brand_id',
					'locale_id',
					'article_type_id',
					'size',
					'age_min',
					'age_max',
					'weight_min',
					'weight_max',
					'chest_min',
					'chest_max',
					'waist_min',
					'waist_max',
					'seat_min',
					'seat_max',
					'inside_leg_min',
					'inside_leg_max',
					'shoulder_min',
					'shoulder_max',
					'arm_min',
					'arm_max',
					'height_min',
					'height_max',
					'heel_toe',
				]);
				res.json(recs);
				break;
			
			case 'xml':
				res.send('<sizes>' + sizes.map(function(s){
					return '<size>' + s.sizes + '</size>';
				}).join('') + '</sizes>');
				break;

			default:
				debugger;
				res.render('sizes', {
					locals: {
						title: 'Sizes',
						data: {
							'sizes': sizes,
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
 * GET /sizes/new
 */
exports.new = function(req, res){
	Brands.findAll().on('success', function(brandrecs){
		var brands = mapCollection(brandrecs, ['id', 'brand']);
		Locales.findAll().on('success', function(localerecs){
			var locales = mapCollection(localerecs, ['id', 'locale']);
			Genders.findAll().on('success', function(genderrecs){
				var genders = mapCollection(genderrecs, ['id', 'gender']);
				Articles.findAll().on('success', function(articlerecs){
					// debugger;
					var articles = mapCollection(articlerecs, ['id', 'article_type']);
					res.render('sizes_new', {
						locals: {
							title: 'New Size',
							data: {
								'brands': brands,
								'locales': locales,
								'genders': genders,
								'articles': articles
							}
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
 * POST /genders
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Sizes.build({
		brand_id: req.body.brand,
		locale_id: req.body.locale,
		gender_id: req.body.gender,
		article_type_id: req.body.article,
		size: req.body.size,
		age_min: req.body.age_min,
		age_max: req.body.age_max,
		weight_min: req.body.weight_min,
		weight_max: req.body.weight_max,
		chest_min: req.body.chest_min,
		chest_max: req.body.chest_max,
		waist_min: req.body.waist_min,
		waist_max: req.body.waist_max,
		seat_min: req.body.seat_min,
		seat_max: req.body.seat_max,
		inside_leg_min: req.body.inside_leg_min,
		inside_leg_max: req.body.inside_leg_max,
		shoulder_min: req.body.shoulder_min,
		shoulder_max: req.body.shoulder_max,
		arm_min: req.body.arm_min,
		arm_max: req.body.arm_max,
		height_min: req.body.height_min,
		height_max: req.body.heiht_max,
		heal_toe: req.body.heal_toe
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