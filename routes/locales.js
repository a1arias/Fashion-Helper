/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);
//debugger;

// Locale model
var Locales = sequelize.import(__dirname + "/../models/Locale");
//debugger;

// Create the schema if necessary
Locales.sync();

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
 * GET /locales
 */
exports.index = function(req, res) {

	Locales.findAll().on('success', function(locales){

		switch (req.format) {

			case 'json':
				// debugger;
				var recs = mapCollection(locales, [
					'id',
					'locale',
					'visible'
				]);
				res.json({
					success: true,
					locales: recs
				});
				break;

			case 'xml':
				res.send('<locales>' + locales.map(function(locale) {
					return '<locale>' + locale.locale + '</locale>';
				}).join('') + '</locales>');
				break;

			default:
				// debugger;
				res.render('locales', {
					locals: {
						title: 'Locales',
						locs: locales
					}
				});
		}
	}).on('failure', function(err){
		// debugger;
		throw new Error(err);
	});
};

/**
 * GET /locales/new
 */
exports.new = function(req, res){
	res.render('locale_new', {
		locals: {
			title: 'New Locale'
		}
	});
};

/**
 * POST /locales
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Locales.build({
		locale: req.body.name
	});
	post.save().on('success', function(){
		res.json({
			success: true,
			// locale: {
			// 	name: req.body.name,
			// }
		}, 200);
	}).on('failure', function(error){
		// debugger;
		throw new Error(error);
	});
};

/**
 * GET /locales/:id
 */
exports.show = function(req, res){
	var localeId = parseInt(req.params.ig);

	Locales.find(localeId).on('success', function(locale){
		switch(req.format){
			case 'json':
				if(!locale){
					res.json({
						success: false,
						msg: 'The requested resource could not be found'
					}, 404);
				} else {
					var rec = {
						'id': locale.id,
						'locale': locale.locale,
						'visible': locale.visible
					};
					res.json({
						success: true,
						locale: rec
					});
				}
				break;

			case 'xml':
				res.send('<profile>' + profile.name + '</profile>');
				break;

			default:
				if(!locale){
					res.rener('404', {
						locals: {
							title: '404 - Not Found',
							desc: 'The requested resource could not be found'
						},
					status: 404
					});
				} else {
					res.render('locales_show', {
						locals: {
							title: 'Display Locale',
							data: {
								'locale': locale
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
 * GET /locale/:id/edit
 */
exports.edit = function(req, res){
	
	var localeId = parseInt(req.params.locale);
	// debugger;
	Locales.find(localeId).on('success', function(rec){
		// debugger;
		res.render('locale_edit', {
			id: rec.id,
			title: 'Edit locale: ' + rec.locale,
			name: rec.locale,
		});
	}).on('failure', function(error){
		// debugger;
		throw new Error(error);
	});
};

/**
 * PUT /locale/:id
 */
exports.update = function(req, res){
	if(req.body.name){
		var localeId = parseInt(req.params.locale);
		Locales.find(localeId).on('success', function(loc){
			loc.updateAttributes({
				locale: req.body.name
			}).on('success', function(id){
				// debugger;
				res.json({
					success: true,
					// locale: {
					// 	name: req.body.name,
					// }
				}, 200);
			}).on('failure', function(error){
				// debugger;
				throw new Error(error);
			});
		}).on('failure', function(error){
			// debugger;
			throw new Error(error);
		});
	} else {
		throw new Error('Data not provided')
	}
};

/**
 * DELETE /locale/:id
 */
exports.destroy = function(req, res){
	var localeId = parseInt(req.params.locale);
	Locales.find(localeId).on('success', function(loc){
		loc.destroy().on('success', function(poo){
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