
/**
 * Module dependencies.
 */

var express = require('express'),
	resource = require('express-resource'),
	routes = require('./config.js').routes,
	dbconfig = require('./config.js').dbconfig,
	Sequelize = require('sequelize'),
	Crypto = require('crypto');

// Initialize database connection
var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password);

// Users model
var Users = sequelize.import(__dirname + "/./models/User");
var Roles = sequelize.import(__dirname + "/./models/Role");
Users.hasMany(Roles);
Roles.hasMany(Users);

// Sync association logic and create the schema if necessary
Users.sync();
Roles.sync();

// create global app object that contains all modules and routes
var	app = module.exports = express.createServer();

function requiresAuth(req, res, next){
	debugger;
	if(!req.session.isAuthed){
		if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0){
			// fetch login and password
			var authString = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString();
			var username = authString.split(':')[0];
			var password = authString.split(':')[1];
			if(username && password){
				debugger;
				var digest = Crypto.createHash('md5').update(password).digest('hex');
				debugger;
				Users.find({ where: {'username': username} }).on('success', function(user){
					if(user && user.password == digest){
						
						// TODO: get associations

						// TODO: set session data (roles and isAuthed)

						req.session.isAuthed = true;
						
						next();
						return;
					} else {
						res.header('WWW-Authenticate', 'Basic realm="Admin Area"');
						if (req.headers.authorization){
							setTimeout(function (){
								res.send('Authentication required', 401);
							}, 5000);
						} else {
							res.send('Authentication required', 401);
						}
					}
				});	
			} else {
				res.header('WWW-Authenticate', 'Basic realm="Admin Area"');
				if (req.headers.authorization){
					setTimeout(function (){
						res.send('Authentication required', 401);
					}, 5000);
				} else {
					res.send('Authentication required', 401);
				}
			}
		} else {
			res.header('WWW-Authenticate', 'Basic realm="Admin Area"');
			if (req.headers.authorization){
				setTimeout(function (){
					res.send('Authentication required', 401);
				}, 5000);
			} else {
				res.send('Authentication required', 401);
			}
			// res.render('401', {
			// 	locals: {
			// 		title: '401 - Authentication required',
			// 		desc: 'Please login'
			// 	},
			// 	status: 401
			// });
		}
	} else if(req.session.isAuthed){
		// user is already authenticated
		debugger;
		next();
		return;
	}
	
}

/*
 * Global Express requestion middleware configuration
 */
app.configure(function(){
	app.use(express.logger());
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'Work hard code munky!' }));
	app.use(requiresAuth);
	app.use(express.favicon());
	app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
	app.use(express.directory(__dirname + '/public'));
});

/*
 * ENV=development
 * Development Configuration
 */
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*
 * ENV=production
 * Production Configuration
 */
app.configure('production', function(){
	app.use(express.errorHandler());
});

/**
 * Custom error handler must be last middleware
 */
app.configure(function(){
	app.use(function(err, req, res, next){
		res.send(500, {error: err.message});
	});
	app.use(function(req, res) {
		res.render('404', {
			locals: {
				title: '404 - Not Found',
				desc: 'The requested resource could not be found'
			},
			status: 404
		});
	});
});

// Routes handler
routes.forEach(function(e) {
	if (e.enabled === true) {
		if(e.match == '/'){
			app.resource(require('./routes/' + e.name));
		} else {
			app.resource(e.name, require('./routes/' + e.name));
		}
	}
});

/**
 * Static Routes
 */

app.get('/portal', function(req, res){
	res.render('portal', { title: 'Portal' });
});

if(!module.parent){
	var port = process.env.PORT || 3000;
	app.listen(port);
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
}

