/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize'),
	chainer = new Sequelize.Utils.QueryChainer;

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Import models
var Locales = sequelize.import(__dirname + "/../models/Locale");
var Brands = sequelize.import(__dirname + "/../models/Brand");
var Articles = sequelize.import(__dirname + "/../models/Article");
var Genders = sequelize.import(__dirname + "/../models/Gender");
var Sizes = sequelize.import(__dirname + "/../models/Size");

// Define associations
Sizes.belongsTo(Locales);
Sizes.belongsTo(Brands);
Sizes.belongsTo(Articles, {foreignKey: 'article_type_id'});
Sizes.belongsTo(Genders);

// Create the schema if necessary
Locales.sync();
Brands.sync();
Articles.sync();
Genders.sync();
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

		var chainer = new Sequelize.Utils.QueryChainer,
			_sizes = [];

		sizes.forEach(function(s){
			var emitter = new Sequelize.Utils.CustomEventEmitter(function(){
				s.getBrand().on('success', function(b){
					s.getGender().on('success', function(g){
						s.getLocale().on('success', function(l){
							s.getArticle().on('success', function(a){
								_sizes.push({
									size: s,
									brand: b,
									gender: g,
									locale: l,
									article: a,
								});
								emitter.emit('success');	
							});
						});
					});
				});
			});
			chainer.add(emitter.run());
		});

		chainer.run().on('success', function(){
			switch(req.format){
				case 'json':
					
					var fields = [
						'id',
						'brand_id',
						'brand',
						'gender_id',
						'gender',
						'locale_id',
						'locale',
						'article_type_id',
						'article_type',
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
					];

					var recs = _sizes.map(function(row){
						var result = {};
						// debugger;
						fields.forEach(function(field){
							if(field == 'brand' && row.brand){
								result[field] = row.brand[field];
							} else if(field == 'locale' && row.locale){
								result[field] = row.locale[field];
							} else if(field == 'gender' && row.gender){
								result[field] = row.gender[field];
							} else if(field == 'article_type' && row.article){
								result[field] = row.article[field];
							} else {
								result[field] = row.size[field];
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
		});
		
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
 * POST /sizes
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Sizes.build({
		brand_id: req.body.brand_id,
		locale_id: req.body.locale_id,
		gender_id: req.body.gender_id,
		article_type_id: req.body.article_type_id,
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
		var rec = {
			'id': id.id,
			'brand_id': id.brand_id,
			'locale_id': id.locale_id,
			'gender_id': id.gender_id,
			'article_type_id': id.article_type_id,
			'size': id.size,
			'age_min': id.age_min,
			'age_max': id.age_max,
			'weight_min': id.weight_min,
			'weight_max': id.weight_max,
			'chest_min': id.chest_min,
			'chest_max': id.chest_max,
			'waist_min': id.waist_min,
			'waist_max': id.waist_max,
			'seat_min': id.seat_min,
			'seat_max': id.seat_max,
			'inside_leg_min': id.inside_leg_min,
			'inside_leg_max': id.inside_leg_max,
			'shoulder_min': id.shoulder_min,
			'shoulder_max': id.shoulder_max,
			'arm_min': id.arm_min,
			'arm_max': id.arm_max,
			'height_min': id.height_min,
			'height_max': id.height_max,
			'heal_toe': id.heal_toe,
		};
		debugger;
		res.json({
			success: true,
			data: rec
		}, 200);
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * GET /sizes/:id
 */
exports.show = function(req, res){
	var sizeId = parseInt(req.params.size);

	Sizes.find(sizeId).on('success', function(size){
		switch(req.format){
			case 'json':
				if(!size){
					res.json({
						success: false,
						msg: 'The requested resource could not be found'
					}, 404);
				} else{
					var rec = {
						'id': size.id,
						'brand_id': size.brand_id,
						'locale_id': size.locale_id,
						'gender_id': size.gender_id,
						'article_type_id': size.article_type_id,
						'size': size.size,
						'age_min': size.age_min,
						'age_max': size.age_max,
						'weight_min': size.weight_min,
						'weight_max': size.weight_max,
						'chest_min': size.chest_min,
						'chest_max': size.chest_max,
						'waist_min': size.waist_min,
						'waist_max': size.waist_max,
						'seat_min': size.seat_min,
						'seat_max': size.seat_max,
						'inside_leg_min': size.inside_leg_min,
						'inside_leg_max': size.inside_leg_max,
						'shoulder_min': size.shoulder_min,
						'shoulder_max': size.shoulder_max,
						'arm_min': size.arm_min,
						'arm_max': size.arm_max,
						'height_min': size.height_min,
						'height_max': size.height_max,
						'heal_toe': size.heal_toe,
					};
					res.json(rec);
				}
				break;
		
				case 'xml':
					res.send('<size>' + size.name + '</size>');
					break;

				default:
					if(!size){
						res.render('404', {
							locals: {
								title: '404 - Not Found',
								desc: 'The requested resource could not be found'
							},
							status: 404
						});
					} else {
						res.render('sizes_show', {
							locals: {
								title: 'Display Size',
								data: {
									'size': size
								}
							}
						});
					}
		};
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * GET /sizes/:id/edit
 */
exports.edit = function(req, res){
	var sizeId = parseInt(req.params.size);
	Brands.findAll().on('success', function(brandrecs){
		var brands = mapCollection(brandrecs, ['id', 'brand']);
		Locales.findAll().on('success', function(localerecs){
			var locales = mapCollection(localerecs, ['id', 'locale']);
			Genders.findAll().on('success', function(genderrecs){
				var genders = mapCollection(genderrecs, ['id', 'gender']);
				Articles.findAll().on('success', function(articlerecs){
					// debugger;
					var articles = mapCollection(articlerecs, ['id', 'article_type']);

					Sizes.find(sizeId).on('success', function(size){
						res.render('sizes_edit', {
							id: size.id,
							title: 'Edit size' + size.id + ' - ' + size.size,
							data: {
								'b': brands,
								'l': locales,
								'g': genders,
								'a': articles,
								's': size
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
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * PUT /sizes/:id
 */
exports.update = function(req, res){
	var sizeId = parseInt(req.params.size);

	Sizes.find(sizeId).on('success', function(size){
		size.updateAttributes({
			brand_id: req.body.brand_id,
			locale_id: req.body.locale_id,
			gender_id: req.body.gender_id,
			article_type_id: req.body.article_type_id,
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
			height_max: req.body.height_max,
			heal_toe: req.body.heal_toe
		}).on('success', function(foo){
			res.json({
				success: true
			}, 200);
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
 * DELETE /sizes/:id
 */
exports.destroy = function(req, res){
	var sizeId = parseInt(req.params.size);
	Sizes.find(sizeId).on('success', function(size){
		size.destroy().on('success', function(foo){
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