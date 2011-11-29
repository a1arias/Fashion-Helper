/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Locale model
var Brands = sequelize.import(__dirname + "/../models/Brand");

// Create the schema if necessary
Brands.sync();

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
 * GET /brands
 */
exports.index = function(req, res){
	
	Brands.findAll().on('success', function(brands){
		
		var recs = mapCollection(brands, ['id', 'brand', 'visible'])

		switch(req.format){
			case 'json':
				// debugger;
				res.json({
					success: true,
					'data': recs
					}, 200);
				break;
			
			case 'xml':
				res.send('<brands>' + brands.map(function(b){
					return '<brand>' + b.brand + '</brand>';
				}).join('') + '</brands>');
				break;

			default:
				// debugger;
				res.render('brands', {
					locals: {
						title: 'Brands',
						data: brands
					}
				});	
		}		
	}).on('failure', function(err){
		debugger;
		throw new Error(err)
	});
};

/**
 * GET /brands/new
 */
exports.new = function(req, res){
	res.render('brands_new', {
		locals: {
			title: 'New Brand'
		}
	});
};

/**
 * POST /brands
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Brands.build({
		brand: req.body.brand
	});
	post.save().on('success', function(foo){
		res.json({
			success: true,
		}, 200);
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * GET /brands/:id/edit
 */
exports.edit = function(req, res){
	var brandId = parseInt(req.params.brand);
	Brands.find(brandId).on('success', function(rec){
		res.render('brand_edit', {
			id: rec.id,
			title: 'Edit brand: ' + rec.brand,
			name: rec.brand
		});
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * PUT /brands/:id
 */
exports.update = function(req, res){
	debugger;
	if(req.body.brand){
		var brandId = parseInt(req.params.brand);
		Brands.find(brandId).on('success', function(rec){
			rec.updateAttributes({
				brand: req.body.brand,
				visible: req.body.visible
			}).on('success', function(id){
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
	} else {
		throw new Error('Data not provided');
	}
};

/**
 * DELETE /brands/:id
 */
exports.destroy = function(req, res){
	var brandId = parseInt(req.params.brand);
	Brands.find(brandId).on('success', function(rec){
		rec.destroy().on('success', function(foo){
			res.json({
				success: true,
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