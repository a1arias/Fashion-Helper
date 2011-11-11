
/**
 * Module dependencies.
 */

var express = require('express'),
    resource = require('express-resource'),
    routes = require('./config.js').routes,
    sequelize = require('./lib/MysqlConnectionFactory.js').sequelize,

    // create global app object that contains all modules and routes
    app = module.exports = express.createServer();

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

// app.get('/poo', function(req, res){
//  debugger;
//  res.render('index', { title: 'Express' });
// });

if(!module.parent){
    app.listen(3000);
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}

