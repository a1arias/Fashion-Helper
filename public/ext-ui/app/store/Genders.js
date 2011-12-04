Ext.define('FashionHelper.store.Genders', {
	extend: 'Ext.data.Store',
	model: 'FashionHelper.model.Gender',
	autoLoad: true,
	// autoSync: true,
	proxy: {
		// format: 'json',
		type: 'rest',
		api: {
			read: 'genders.json',
			update: 'genders',
			create: 'genders',
			destroy: 'genders'
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