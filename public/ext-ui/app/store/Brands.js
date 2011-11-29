Ext.define('FashionHelper.store.Brands', {
	extend: 'Ext.data.Store',
	storeId: 'brandsStore',
	model: 'FashionHelper.model.Brand',
	autoLoad: true,
	// autoSync: true,
	// fields: ['id', 'brand', 'visible'],

	proxy: {
		// format: 'json',
		type: 'rest',
		api: {
			read: 'brands.json',
			update: 'brands',
			create: 'brands/new',
			destroy: 'brands'
		},
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
	}
});