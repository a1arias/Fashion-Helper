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
// Locales.sync();

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
				if(locales){
					var recs = mapCollection(locales, [
						'id',
						'locale',
						'visible'
					]);
					res.json({
						success: true,
						data: recs
					}, 200);
				} else {
					res.json({
						success: false,
						msg: 'The requested resource could not be found.'
					}, 404);
				}
				break;

			case 'xml':
				res.send('<locales>' + locales.map(function(locale) {
					return '<locale>' + locale.locale + '</locale>';
				}).join('') + '</locales>');
				break;

			default:
				if(!locales){
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							msg: 'The requested resource could not be found.'
						}
					});
				} else {
					res.render('locales', {
						locals: {
							title: 'Locales',
							locs: locales
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
		locale: req.body.locale
	});
	post.save().on('success', function(){
		res.json({
			success: true
		}, 200);
	}).on('failure', function(error){
		res.json({
			success: false,
			msg: error
		}, 500);
	});
};

/**
 * GET /locales/:id
 */
exports.show = function(req, res){
	var localeId = parseInt(req.params.locale);

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
					res.render('404', {
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
 * GET /locales/:id/edit
 */
exports.edit = function(req, res){
	
	var localeId = parseInt(req.params.locale);
	Locales.find(localeId).on('success', function(rec){
		res.render('locale_edit', {
			id: rec.id,
			title: 'Edit locale: ' + rec.locale,
			name: rec.locale,
		});
	}).on('failure', function(error){
		res.render('500', {
			locals: {
				title: '500 - Internal Server Error',
				desc: error
			},
			status: 500
		});
	});
};

/**
 * PUT /locales/:id
 */
exports.update = function(req, res){
	if(req.body.locale){
		var localeId = parseInt(req.params.locale);
		Locales.find(localeId).on('success', function(loc){
			loc.updateAttributes({
				locale: req.body.locale
			}).on('success', function(id){
				res.json({
					success: true,
				}, 200);
			}).on('failure', function(error){
				res.json({
					success: false,
					msg: error
				}, 500);
			});
		}).on('failure', function(error){
			res.json({
				success: false,
				msg: error
			}, 500);
		});
	} else {
		res.json({
			success: false,
			msg: 'Data not provided'
		}, 500);
	}
};

/**
 * DELETE /locales/:id
 */
exports.destroy = function(req, res){
	var localeId = parseInt(req.params.locale);
	Locales.find(localeId).on('success', function(loc){
		loc.destroy().on('success', function(poo){
			res.json({
				success: true,
			}, 200);
		}).on('failure', function(error){
			res.json({
				success: false,
				msg: error
			}, 500);
		});
	}).on('failure', function(error){
		res.json({
			success: false,
			msg: error
		}, 500);
	});
};