Ext.define('FashionHelper.model.Locale', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'locale',
		type: 'string'
	}, {
		name: 'visible',
		type: 'boolean',
		defaultValue: true
	}]
});