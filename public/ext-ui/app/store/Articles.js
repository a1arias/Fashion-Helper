Ext.define('FashionHelper.store.Articles', {
	extend: 'Ext.data.Store',
	model: 'FashionHelper.model.Article',
	autoLoad: true,
	// autoSync: true,
	proxy: {
		// format: 'json',
		type: 'rest',
		api: {
			read: 'articles.json',
			update: 'articles',
			create: 'articles',
			destroy: 'articles'
		},
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		},
		writer: {
			type: 'json'
		}
	}
});