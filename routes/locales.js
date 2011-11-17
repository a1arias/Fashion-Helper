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
 * Function returns an array of 
 */
function recs2Array(recs){
	for(var c = 0; c < recs.length; c++){
		var collection = [];
		(function(c){
			var data = {
				id: recs[c]['id'],
				locale: recs[c]['locale']
			};
			collection.push(data);
			debugger;
		})(c);
	};
	return collection;
};

/**
 * GET /locales
 */
exports.index = function(req, res) {

	var locales = Locales.findAll().on('success', function(locales){
		
		var recs = recs2Array(locales);

		switch (req.format) {

			case 'json':
				debugger;
				res.json(recs);
				break;

			case 'xml':
				res.send('<locales>' + locales.map(function(locale) {
					return '<locale>' + locale.title + '</locale>';
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
	}).on('failure', function(error){
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