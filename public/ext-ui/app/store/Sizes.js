Ext.define('FashionHelper.store.Sizes', {
	extend: 'Ext.data.Store',
	model: 'FashionHelper.model.Size',
	autoLoad: true,
	// autoSync: true,

	proxy: {
		// format: 'json',
		type: 'rest',
		api: {
			read: 'sizes.json',
			update: 'sizes',
			create: 'sizes',
			destroy: 'sizes'
		},
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		},
		writer: {
			type: 'json',
			// root: 'data',
			successProperty: 'success'
		}
	}
});