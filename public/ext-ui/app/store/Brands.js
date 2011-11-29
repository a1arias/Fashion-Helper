Ext.define('FashionHelper.store.Brands', {
	extend: 'Ext.data.Store',
	storeId: 'brandsFuStore',
	model: 'FashionHelper.model.Brand',
	autoLoad: true,
	// autoSync: true,
	// fields: ['id', 'brand'],

	proxy: {
		// format: 'json',
		type: 'rest',
		api: {
			read: 'brands.json',
			update: 'brands',
			create: 'brands',
			destroy: 'brands'
		},
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		},
		listeners : {
			load : function(store, records, success) {
				alert(records.length + " rows");

				// var items = Enumerable.From(records).Select("r => r.data").ToArray(); // LINQ library
				// alert(Ext.encode(items));
			}
		}
	}
});