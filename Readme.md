# Fashion Helper

Fashion Helper is a simple web application for managing fashion-related data sets. The back-end server code is a RESTful api, that does content negotiation based on the request format, written NodeJS.

Server side Node modules include:

* Express - HTTP server framework
* Express-resource - RESTful resources for Express framework
* Sequelize - MySQL Object Relational Mapping
* Jade - Server-side templating

The templates are rendered server-side for all pages except the portal. This page contains a JavaScript application created with ExtJS. The non-javascript pages can also be used to input and review data.

The application runs on an HTTP server. Currently the application uses Basic 401 header authentication and authorization that is backed us a users table in mysql. There is no user management widget however, users can be added to the database manually. Since the server is not using SSL, 401 header auth is prefered because is provides some layer of obsfuction as credentials are base64 encoded and not POSTed in plain text.

## Implementation
The following packages and their dependencies are required:

* nodejs
* mysql-server

### Setup database
First, setup the database. Database connection options can be configured in:

> fashion-helper/config.js

Login to mysql and create a user:

	GRANT ALL PRIVILEGES ON fashion_helper.* to 'user'@localhost IDENTIFIED BY 'password';
	FLUSH PRIVILEGES;

Logout as root and login as the new user. Then create the database.

	CREATE DATABASE fashion_helper;
	
Logout of mysql and import the schema into the database:

	cat fashion-helper/sql/schema.sql | mysql -uuser -p fashion_helper

**Note:** Sequelize ORM will automaticall create the tables if they do not exist. The only catch is it will not create the foreign key contraints. That is why we import the schema manually.

### Application setup

Next, install the node module dependencies. The node package manager (npm) can install these for you automatically.

Change into the project directory and run npm install:

	cd fashion-helper && npm install

Finally, start server:

	node app.js
