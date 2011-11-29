Ext.define('FashionHelper.view.Locales', {
	extend: 'Ext.form.Panel',
	alias: 'widget.localecomp',
	
	frame: true,
	
	items: [{
		xtype: 'gridpanel',
		title: 'Locale List',
		store: 'Locales',
		columns: [{
			header: 'Id',
			sortable: true,
			dataIndex: 'id',
			flex: 1
		}, {
			header: 'Locale',
			sortable: true,
			dataIndex: 'locale',
			flex: 2
		}, {
			header: 'Visible',
			sortable: true,
			dataIndex: 'visible',
			flex: 1
		}],
		// listeners: {
		// 	selectionchange: function(model, records) {
		// 		if (records[0]) {
		// 			this.up('form').getForm().loadRecord(records[0]);
		// 		}
		// 	}
		// }
	}, {
		xtype: 'fieldset',
		title: 'Locale Details',
		defaults: {
			width: 240,
			labelWidth: 90
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Locale',
			name: 'locale'
		}, {
			xtype: 'checkbox',
			fieldLabel: 'Visible',
			name: 'visible',
			inputValue: '1'
		}]
	}],

	buttons: [{
		text: 'New',
		action: 'new'
	}, {
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
		// console.dir(Ext.data.StoreManager.lookup('Brands'));
		Ext.data.StoreManager.lookup('Locales').load();
	}
});