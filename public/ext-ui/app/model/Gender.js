Ext.define('FashionHelper.model.Gender', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'gender',
		type: 'string'
	}, {
		name: 'visible',
		type: 'boolean',
		defaultValue: true
	}]
});