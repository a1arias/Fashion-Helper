Ext.define('FashionHelper.view.Mappings', {
	extend: 'Ext.form.Panel',
	alias: 'widget.mappingcomp',
	
	frame: true,
	
	buildItems: function(){
		return [{
			xtype: 'combobox',
			fieldLabel: 'Choose a Profile',
		    store: 'Profiles',
		    // queryMode: 'remote',
		    displayField: 'name',
		    valueField: 'id'
		}, {
			xtype: 'gridpanel',
			title: 'Sizes List',
			store: 'Sizes',
			autoload: false,
			columns: [{
				header: 'Id',
				sortable: true,
				dataIndex: 'id',
				flex: 1
			}, {
				header: 'Brand',
				sortable: true,
				dataIndex: 'brand_id',
				flex: 2,
				renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
					return view.store.data.items[rowIndex].data.brand;
				}
			}, {
				header: 'Locale',
				sortable: true,
				dataIndex: 'locale_id',
				flex: 1,
				renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
					return view.store.data.items[rowIndex].data.locale;
				}
			}, {
				header: 'Gender',
				sortable: true,
				dataIndex: 'gender_id',
				flex: 2,
				renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
					// debugger;
					return view.store.data.items[rowIndex].data.gender;
				}
			}, {
				header: 'Article',
				sortable: true,
				dataIndex: 'article_type_id',
				flex: 2,
				renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
					return view.store.data.items[rowIndex].data.article_type;
				}
			}, {
				header: 'Size',
				sortable: true,
				dataIndex: 'size',
				flex: 2
			}, {
				header: 'Age',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'age_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'age_max',
					width: 35
				}]
			}, {
				header: 'Weight',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'weight_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'weight_max',
					width: 35
				}]
			}, {
				header: 'Chest',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'chest_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'chest_max',
					width: 35
				}]
			}, {
				header: 'Waist',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'waist_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'waist_max',
					width: 35
				}]
			}, {
				header: 'Seat',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'seat_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'seat_max',
					width: 35
				}]
			}, {
				header: 'Inside Leg',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'inside_leg_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'inside_leg_max',
					width: 35
				}]
			}, {
				header: 'Shoulder',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'shoulder_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'shoulder_max',
					width: 35
				}]
			}, {
				header: 'Arm',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'arm_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'arm_max',
					width: 35
				}]
			}, {
				header: 'Height',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'height_min',
					width: 35
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'height_max',
					width: 35
				}]
			}, {
				header: 'Heal2Toe',
				sortable: true,
				dataIndex: 'heal_toe',
				flex: 1.5
			}, {
				header: 'Visible',
				sortable: true,
				dataIndex: 'visible',
				flex: 1
			}]
		}]

		// listeners: {
		// 	selectionchange: function(model, records) {
		// 		if (records[0]) {
		// 			this.up('form').getForm().loadRecord(records[0]);
		// 		}
		// 	}
		// }
	},
	
	initComponent: function(){
		config = Ext.apply({}, {items: this.buildItems()});
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent();
	}
});