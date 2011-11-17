exports.routes = [
	{
		match: '/',
		name: 'home',
		enabled: true
	},
	{
		match: '/locales',
		name: 'locales',
		enabled: true
	},
	{
		match: '/brands',
		name: 'brands',
		enabled: true
	},
	{
		match: '/articles',
		name: 'articles',
		enabled: true
	}
];

exports.dbconfig = {
	host: '127.0.0.1',
	port: '3306',
	database: 'fashion_helper_dev',
	username: 'fdh',
	password: 'jjSD23#x'
}
