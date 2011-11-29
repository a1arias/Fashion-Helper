Ext.define('FashionHelper.view.Sizes', {
	extend: 'Ext.form.Panel',
	alias: 'widget.sizecomp',
	id: 'sizes-gridform',
	frame: true,
	
	items: [{
		xtype: 'gridpanel',
		title: 'Sizes List',
		store: 'Sizes',
		columns: [{
			header: 'Id',
			sortable: true,
			dataIndex: 'id',
			flex: 1
		}, {
			header: 'Brand',
			sortable: true,
			dataIndex: 'brand',
			flex: 2
		}, {
			header: 'Locale',
			sortable: true,
			dataIndex: 'locale',
			flex: 1
		}, {
			header: 'Gender',
			sortable: true,
			dataIndex: 'gender',
			flex: 1
		}, {
			header: 'Article',
			sortable: true,
			dataIndex: 'article',
			flex: 1
		}, {
			header: 'Size',
			sortable: true,
			dataIndex: 'size',
			flex: 1
		}, {
			header: 'Age',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'age_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'age_max',
				width: 30
			}]
		}, {
			header: 'Weight',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'weight_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'weight_max',
				width: 30
			}]
		}, {
			header: 'Chest',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'chest_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'chest_max',
				width: 30
			}]
		}, {
			header: 'Waist',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'waist_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'waist_max',
				width: 30
			}]
		}, {
			header: 'Seat',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'seat_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'seat_max',
				width: 30
			}]
		}, {
			header: 'Inside Leg',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'inside_leg_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'inside_leg_max',
				width: 30
			}]
		}, {
			header: 'Shoulder',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'shoulder_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'shoulder_max',
				width: 30
			}]
		}, {
			header: 'Arm',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'arm_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'arm_max',
				width: 30
			}]
		}, {
			header: 'Height',
			columns: [{
				header: 'min',
				sortable: true,
				dataIndex: 'height_min',
				width: 30
			}, {
				header: 'max',
				sortable: true,
				dataIndex: 'height_max',
				width: 30
			}]
		}, {
			header: 'Heal2Toe',
			sortable: true,
			dataIndex: 'heal_toe',
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
		title: 'Size Details',
		defaults: {
			width: 240,
			labelWidth: 90
		},
		defaultType: 'textfield',
		items: [{
			xtype: 'pickerfield',
			fieldLabel: 'Brand',
			name: 'brand'
		}, { 
			xtype: 'pickerfield',
			fieldLabel: 'Locale',
			name: 'locale'
		}, { 
			xtype: 'pickerfield',
			fieldLabel: 'Gender',
			name: 'gender'
		}, { 
			xtype: 'pickerfield',
			fieldLabel: 'Article',
			name: 'article'
		}, {
			fieldLabel: 'Size',
			name: 'size'
		}, {
			fieldLabel: 'Age Min',
			name: 'age_min',
		}, {
			fieldLabel: 'Age Max',
			name: 'age_min',
		}, {
			fieldLabel: 'Weight Min',
			name: 'weight_min',
		}, {
			fieldLabel: 'Chest Min',
			name: 'chest_min',
		}, {
			fieldLabel: 'Chest Max',
			name: 'chest_max',
		}, {
			fieldLabel: 'Waist Min',
			name: 'waist_min',
		}, {
			fieldLabel: 'Waist Max',
			name: 'waist_max',
		}, {
			fieldLabel: 'Seat Min',
			name: 'seat_min',
		}, {
			fieldLabel: 'Seat Max',
			name: 'seat_max',
		}, {
			fieldLabel: 'Inside Leg Min',
			name: 'inside_leg_min',
		}, {
			fieldLabel: 'Inside Leg Max',
			name: 'inside_leg_max',
		}, {
			fieldLabel: 'Shoulder Min',
			name: 'shoulder_min',
		}, {
			fieldLabel: 'Shoulder Max',
			name: 'shoulder_max',
		}, {
			fieldLabel: 'Arm Min',
			name: 'arm_min',
		}, {
			fieldLabel: 'Arm Max',
			name: 'arm_max',
		}, {
			fieldLabel: 'Height Min',
			name: 'height_min',
		}, {
			fieldLabel: 'Height Max',
			name: 'height_max',
		}, {
			fieldLabel: 'Heal2Toe',
			name: 'heal_toe',
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
		Ext.data.StoreManager.lookup('Sizes').load();
	}
});