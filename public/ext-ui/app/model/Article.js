Ext.define('FashionHelper.model.Article', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [{
		name: 'id',
		type: 'int'
	}, {
		name: 'article_type',
		type: 'string'
	}, {
		name: 'visible',
		type: 'boolean',
		defaultValue: true
	}]
});