Ext.define('FashionHelper.view.Profiles', {
	extend: 'Ext.form.Panel',
	alias: 'widget.profilecomp',
	
	frame: true,
	
	items: [{
		xtype: 'gridpanel',
		title: 'Profiles List',
		store: 'Profiles',
		columns: [{
			header: 'Id',
			sortable: true,
			dataIndex: 'id',
			flex: 1
		}, {
			header: 'Name',
			sortable: true,
			dataIndex: 'name',
			flex: 2
		}, {
			header: 'Gender',
			sortable: true,
			dataIndex: 'gender',
			flex: 1
		}, {
			header: 'Age',
			sortable: true,
			dataIndex: 'age',
			flex: 1
		}, {
			header: 'Weight',
			sortable: true,
			dataIndex: 'weight',
			flex: 1
		}, {
			header: 'Height',
			sortable: true,
			dataIndex: 'height',
			flex: 1
		}, {
			header: 'Chest',
			sortable: true,
			dataIndex: 'chest',
			flex: 1
		}, {
			header: 'Seat',
			sortable: true,
			dataIndex: 'seat',
			flex: 1
		}, {
			header: 'Inside Leg',
			sortable: true,
			dataIndex: 'inside_leg',
			flex: 1
		}, {
			header: 'Shoulder',
			sortable: true,
			dataIndex: 'shoulder',
			flex: 1
		}, {
			header: 'Arm',
			sortable: true,
			dataIndex: 'arm',
			flex: 1
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
		title: 'Profile Details',
		defaults: {
			width: 240,
			labelWidth: 90
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Name',
			name: 'name'
		}, {
			xtype: 'pickerfield',
			fieldLabel: 'Gender',
			name: 'gender'
		}, {
			fieldLabel: 'Age',
			name: 'age'
		}, {
			fieldLabel: 'Weight',
			name: 'weight'
		}, {
			fieldLabel: 'Height',
			name: 'height'
		}, {
			fieldLabel: 'Chest',
			name: 'chest'
		}, {
			fieldLabel: 'Waist',
			name: 'waist'
		}, {
			fieldLabel: 'Seat',
			name: 'seat'
		}, {
			fieldLabel: 'Inside Leg',
			name: 'inside_leg'
		}, {
			fieldLabel: 'Shoulder',
			name: 'shoulder'
		}, {
			fieldLabel: 'Arm',
			name: 'arm'
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
		Ext.data.StoreManager.lookup('Profiles').load();
	}
});