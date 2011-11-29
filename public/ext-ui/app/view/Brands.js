Ext.define('FashionHelper.view.Brands', {
	extend: 'Ext.form.Panel',
	alias: 'widget.brandcomp',
	id: 'brands-gridform',
	frame: true,
	
	items: [{
		xtype: 'gridpanel',
		store: Ext.data.StoreManager.lookup('brandsStore'),
		columns: [{
			text: 'Id',
			sortable: true,
			dataIndex: 'id',
			flex: 1
		}, {
			text: 'Brand',
			sortable: true,
			dataIndex: 'brand',
			flex: 4
		}]
	}, {
		xtype: 'fieldset',
		title: 'Brand Details',
		defaults: {
			width: 240,
			labelWidth: 90
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Brand',
			name: 'brand'
		}]
	}]

});