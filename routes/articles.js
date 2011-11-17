/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Locale model
var Articles = sequelize.import(__dirname + "/../models/Article");

// Create the schema if necessary
Articles.sync();

/**
 * Function returns an array of records
 */
function recs2Array(recs){
	for(var c = 0; c < recs.length; c++){
		var collection = [];
		(function(c){
			var data = {
				id: recs[c]['id'],
				brand: recs[c]['locale']
			};
			collection.push(data);
			// debugger;
		})(c);
	};
	return collection;
};

/**
 * GET /articles
 */
exports.index = function(req, res){
	Articles.findAll().on('success', function(articles){

		var recs = recs2Array(articles);

		switch(req.format){
			case 'json':
				// debugger;
				res.json(recs);
				break;
			
			case 'xml':
				res.send('<articles>' + articles.map(function(a){
					return '<article>' + a.article_type + '</article>';
				}).join('') + '</article>');
				break;

			default:
				debugger;
				res.render('articles', {
					locals: {
						title: 'Articles',
						data: articles
					}
				});	
		}
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * GET /articles/new
 */
exports.new = function(req, res){
	res.render('articles_new', {
		locals: {
			title: 'New Article'
		}
	});
};


/**
 * POST /articles
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Articles.build({
		article_type: req.body.type
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
 * GET /articles/:id/edit
 */
exports.edit = function(req, res){
	var articleId = parseInt(req.params.article);
	Articles.find(articleId).on('success', function(rec){
		res.render('article_edit', {
			id: rec.id,
			title: 'Edit article: ' + rec.article_type,
			type: rec.article_type
		});
	}).on('failure', function(err){
		debugger;
		throw new Error(err);
	});
};

/**
 * PUT /articles/:id
 */
 exports.update = function(req, res){
 	if(req.body.type){
 		var articleId = parseInt(req.params.article);
 		Articles.find(articleId).on('success', function(rec){
 			rec.updateAttributes({
 				article_type: req.body.type
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
 * DELETE /articles/:id
 */
exports.destroy = function(req, res){
	var articleId = parseInt(req.params.article);
	Articles.find(articleId).on('success', function(rec){
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