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
// Brands.sync();

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

		switch(req.format){
			case 'json':
				if(brands){
					var recs = mapCollection(brands, ['id', 'brand', 'visible']);
					res.json({
						success: true,
						'data': recs
					}, 200);	
				} else {
					res.json({
						success: false,
						msg: 'The requested resource could not be found.'
					}, 404);
				}
				break;
			
			case 'xml':
				res.send('<brands>' + brands.map(function(b){
					return '<brand>' + b.brand + '</brand>';
				}).join('') + '</brands>');
				break;

			default:
				if(brands){
					res.render('brands', {
						locals: {
							title: 'Brands',
							data: brands
						}
					});
				} else {
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							msg: 'The requested resource could not be found.'
						}
					});
				}
		}		
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
		brand: req.body.brand,
		visible: req.body.visible || 0
	});
	post.save().on('success', function(foo){
		res.json({
			success: true,
			data: {
				'id': foo.id,
				'brand': foo.brand,
				'visible': foo.visible,
			}
		}, 200);
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * GET /brands/:id
 */
exports.show = function(req, res){
	var brandId = parseInt(req.params.brand);

	Brands.find(brandId).on('success', function(brand){
		switch(req.format){
			case 'json':
				if(!brand){
					res.json({
						success: false,
						msg: 'The requested resource could not be found'
					}, 404);
				} else {
					var rec = {
						'id': brand.id,
						'brand': brand.brand,
						'visible': brand.visible
					};
					res.json({
						success: true,
						locale: rec
					});
				}
				break;

			case 'xml':
				res.send('<brand>' + brand.name + '</brand>');
				break;

			default:
				if(!brand){
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							desc: 'The requested resource could not be found'
						},
						status: 404
					});
				} else {
					res.render('brand_show', {
						locals: {
							title: 'Display Locale',
							data: {
								'brand': brand
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
 * GET /brands/:id/edit
 */
exports.edit = function(req, res){
	var brandId = parseInt(req.params.brand);
	Brands.find(brandId).on('success', function(rec){
		if(rec){
			res.render('brand_edit', {
				id: rec.id,
				title: 'Edit brand: ' + rec.brand,
				name: rec.brand
			});
		} else {
			res.render('404', {
				locals: {
					title: '404 - Not Found',
					desc: 'The requested resource could not be found'
				},
				status: 404
			});
		}
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
 * PUT /brands/:id
 */
exports.update = function(req, res){
	if(req.body.brand){
		var brandId = parseInt(req.params.brand);
		Brands.find(brandId).on('success', function(rec){
			if(rec){
				rec.updateAttributes({
					brand: req.body.brand,
					visible: req.body.visible || 0
				}).on('success', function(foo){
					res.json({
						success: true,
						data: {
							'id': foo.id,
							'brand': foo.brand,
							'visible': foo.visible,
						}
					}, 200);
				}).on('failure', function(err){
					res.json({
						success: false,
						msg: err
					}, 500);
				});
			} else {
				res.json({
					success: false,
					msg: 'The requested resource could not be found'
				}, 404);
			}
		}).on('failure', function(err){
			res.json({
				success: false,
				msg: err
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
 * DELETE /brands/:id
 */
exports.destroy = function(req, res){
	var brandId = parseInt(req.params.brand);
	Brands.find(brandId).on('success', function(rec){
		if(rec){
			rec.destroy().on('success', function(foo){
				res.json({
					success: true,
					data: {
						'id': foo.id,
						'id': foo.brand,
						'id': foo.visible,
					}
				}, 200);
			}).on('failure', function(err){
				res.json({
					success: false,
					msg: err
				}, 500);
			});	
		} else {
			res.json({
				success: false,
				msg: 'The requested resource could not be found'
			}, 404);
		}
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};