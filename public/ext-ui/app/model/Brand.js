Ext.define('FashionHelper.model.Brand', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'brand',
		type: 'string'
	}, {
		name: 'visible',
		type: 'boolean',
		defaultValue: true
	}]
});