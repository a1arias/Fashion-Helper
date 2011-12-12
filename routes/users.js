/**
 * dependencies
 */

var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Users model
var Users = sequelize.import(__dirname + "/../models/User");
var Roles = sequelize.import(__dirname + "/../models/Role");
Users.hasMany(Roles);
Roles.hasMany(Users);

// Sync association logic and create the schema if necessary
Users.sync();
Roles.sync();

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
 * GET /users['.json' || '.xml']
 */
exports.index = function(req, res){
	Users.findAll().on('success', function(users){

		switch(req.format){
			case 'json':
				var recs = mapCollection(articles, ['id', 'username', 'password', 'active']);
				res.json({
					success: true,
					'data': recs
					}, 200);
				break;
			
			case 'xml':
				res.send('<users>' + users.map(function(u){
					return '<user>' + u.username + '</user>';
				}).join('') + '</users>');
				break;

			default:
				res.render('users', {
					locals: {
						title: 'Users',
						data: users
					}
				});	
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
 * POST /users
 *
 * TODO: require admin here
 */
exports.create = function(req, res){
	var post = Users.build({
		username: req.body.username,
		password: req.body.password,
	});
	debugger;
	post.save().on('success', function(id){
		debugger;
		var rec = {
			'id': id.id,
			'username': id.username,
			'password': id.password,
			'active': id.active
		};
		res.json({
			success: true,
			data: rec
		}, 200);
	}).on('failure', function(err){
		debugger;
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};

/**
 * GET /users/:id
 */
exports.show = function(req, res){
	var userId = parseInt(req.params.user);

	Users.find(userId).on('success', function(user){
		switch(req.format){
			case 'json':
				if(!user){
					res.json({
						success: false,
						msg: 'The requested resource could not be found'
					}, 404);
				} else {
					var rec = {
						'id': user.id,
						'username': user.username,
						'password': user.password,
						'visible': user.active
					};
					res.json({
						success: true,
						user: rec
					});
				}
				break;

			case 'xml':
				res.send('<user>' + user.username + '</user>');
				break;

			default:
				if(!user){
					res.render('404', {
						locals: {
							title: '404 - Not Found',
							desc: 'The requested resource could not be found'
						},
						status: 404
					});
				} else {
					res.render('user_show', {
						locals: {
							title: 'Display User',
							data: {
								'user': user
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
 * GET /users/:id/edit
 */
exports.edit = function(req, res){
	var userId = parseInt(req.params.user);
	Users.find(userId).on('success', function(rec){
		res.render('user_edit', {
			id: rec.id,
			title: 'Edit user: ' + rec.username,
			username: rec.username
		});
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
 * PUT /users/:id
 */
 exports.update = function(req, res){
 	if(req.body){
 		var userId = parseInt(req.params.user);
 		Users.find(userId).on('success', function(rec){
 			rec.updateAttributes({
 				username: req.body.username,
 				password: req.body.password,
 				active: req.body.active
 			}).on('success', function(id){
 				res.json({
					success: true
				}, 200);
 			}).on('failure', function(err){
 				res.json({
					success: false,
					msg: err
				}, 500);
 			});
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
 * DELETE /users/:id
 *
 * TODO: add authorization here
 */
exports.destroy = function(req, res){
	var userId = parseInt(req.params.user);
	Users.find(userId).on('success', function(rec){
		rec.destroy().on('success', function(foo){
			res.json({
				success: true,
			}, 200);
		}).on('failure', function(err){
			res.json({
				success: false,
				msg: err
			}, 500);
		});
	}).on('failure', function(err){
		res.json({
			success: false,
			msg: err
		}, 500);
	});
};