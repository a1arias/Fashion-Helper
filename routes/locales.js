/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);
//debugger;

// Locale model
var Locale = sequelize.import(__dirname + "/../models/Locale");
//debugger;

// Create the schema if necessary
Locale.sync();

/**
 * Locale resource actions
 */
exports.index = function(req, res) {

	debugger;
	var locales = Locale.findAll().on('success', function(locales){
		debugger;
		switch (req.format) {

			case 'json':
				debugger;
				res.json(locales);
				break;

			case 'xml':
				res.send('<locales>' + locales.map(function(locale) {
					return '<locale>' + locale.title + '</locale>';
				}).join('') + '</locales>');
				break;

			default:
				//res.send(articles);
				res.render('locales', {
					locals: {
						title: 'Locales',
						articles: locales
					}
				});
		}
	}).on('failure', function(error){
		debugger;
		console.dir(error);
	});
};