
var dbconfig = require('../config.js').dbconfig,
	Sequelize = require('sequelize'),
	env = process.env;

exports.sequelize = function(){
	if(typeof env.NODE_ENV == 'undefined' || env.NODE_ENV == 'development'){
	    var DB_HOST = dbconfig.development.host,
	        DB_PORT = dbconfig.development.port,
	        DB_DATABASE = dbconfig.development.database,
	        DB_USER = dbconfig.development.username,
	        DB_PASS = dbconfig.development.password;

	    var sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
	        host: DB_HOST,
	        port: DB_PORT
	    });
	    console.dir(sequelize);
	    console.log('dev selected');
	    return sequelize;
	} else {
		var DB_HOST = dbconfig.production.host,
	        DB_PORT = dbconfig.production.port,
	        DB_DATABASE = dbconfig.production.database,
	        DB_USER = dbconfig.production.username,
	        DB_PASS = dbconfig.production.password;

	    var sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
	        host: DB_HOST,
	        port: DB_PORT
	    });
	    console.dir(sequelize);
	    console.log('prod selected');
	    return sequelize;
	}
}