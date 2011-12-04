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
	},
	{
		match: '/genders',
		name: 'genders',
		enabled: true
	},
	{
		match: '/sizes',
		name: 'sizes',
		enabled: true
	},
	{
		match: '/profiles',
		name: 'profiles',
		enabled: true
	},
	{
		match: '/mappings',
		name: 'mappings',
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
