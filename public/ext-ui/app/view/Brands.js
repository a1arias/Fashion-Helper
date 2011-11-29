Ext.define('FashionHelper.view.Brands', {
	extend: 'Ext.form.Panel',
	alias: 'widget.brandcomp',
	id: 'brands-gridform',
	frame: true,
	
	items: [{
		xtype: 'gridpanel',
		title: 'Brand List',
		store: 'Brands',
		columns: [{
			header: 'Id',
			sortable: true,
			dataIndex: 'id',
			flex: 1
		}, {
			header: 'Brand',
			sortable: true,
			dataIndex: 'brand',
			flex: 4
		}, {
			header: 'Visible',
			sortable: true,
			dataIndex: 'visible',
			flex: 1
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
		}, {
			xtype: 'checkbox',
			fieldLabel: 'Visible',
			name: 'visible'
		}]
	}],

	buttons: [{
		text: 'Save',
        action: 'save'
	}, {
		text: 'Delete',
		action: 'delete'
	}],
	
	// initComponent: function() {
	// 	this.callParent();
	// }
	onRender: function(){
		this.callParent(arguments);
		console.dir(Ext.data.StoreManager.lookup('Brands'));
		Ext.data.StoreManager.lookup('Brands').load();
	}
});