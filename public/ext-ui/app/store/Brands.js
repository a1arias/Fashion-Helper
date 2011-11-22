Ext.define('FashionHelper.store.Brands', {
	extend: 'Ext.data.Store',

	autoLoad: true,
	// autoSync: true,
	fields: ['id', 'brand', 'visible'],

	proxy: {
		// format: 'json',
		type: 'rest',
		url: '/brands',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
	}
});