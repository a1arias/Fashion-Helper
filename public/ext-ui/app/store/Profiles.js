Ext.define('FashionHelper.store.Profiles', {
	extend: 'Ext.data.Store',
	model: 'FashionHelper.model.Profile',
	autoLoad: true,

	proxy: {
		// format: 'json',
		type: 'rest',
		api: {
			read: 'profiles.json',
			update: 'profiles',
			create: 'profiles',
			destroy: 'profiles'
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