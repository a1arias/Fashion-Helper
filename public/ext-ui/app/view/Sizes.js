Ext.define('FashionHelper.view.Sizes', {
	extend: 'Ext.container.Container',
	alias: 'widget.sizecomp',
	
	// colRenderer: function(value, metadata, record, rowIndex, colIndex, store) {
	// 	var idx = this.columns[colIndex].field.store.find('brand_id', value);
	// 	return idx !== -1 ? this.columns[colIndex].field.store.getAt(idx).get('status_name') : '';
	// },

	buildItems: function(){
		return [{
			xtype: 'gridpanel',
			anchor: '50%',
			title: 'Sizes List',
			store: 'Sizes',
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: 'Add',
					action: 'add',
					iconCls: 'icon-add',
				}, '-', {
					itemId: 'delete',
					text: 'Delete',
					action: 'delete',
					iconCls: 'icon-delete',
				}]
			}],

			columns: [{
				header: 'Id',
				sortable: true,
				dataIndex: 'id',
				flex: 1
			}, {
				header: 'Brand',
				sortable: true,
				dataIndex: 'brand_id',
				flex: 6,
				renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
					return record.get('brand_id');
				},
				editor: {
					xtype: 'combobox',
					fieldLabel: 'Choose Brand',
					store: 'Brands',
					queryMode: 'remote',
					displayField: 'brand',
					valueField: 'id',
					forceSelection: true
				}
			}, {
				header: 'Locale',
				sortable: true,
				dataIndex: 'locale',
				flex: 2,
				editor: {
					xtype: 'combobox',
					// fieldLabel: 'Choose Locale',
					store: 'Locales',
					queryMode: 'remote',
					displayField: 'locale',
					valueField: 'id',
					forceSelection: true
				}
			}, {
				header: 'Gender',
				sortable: true,
				dataIndex: 'gender',
				flex: 2,
				editor: {
					xtype: 'combobox',
					// fieldLabel: 'Choose Gender',
					store: 'Genders',
					queryMode: 'remote',
					displayField: 'gender',
					valueField: 'id',
					forceSelection: true
				}
			}, {
				header: 'Article',
				sortable: true,
				dataIndex: 'article',
				flex: 2,
				editor: {
					xtype: 'combobox',
					// fieldLabel: 'Choose Article',
					store: 'Articles',
					queryMode: 'remote',
					displayField: 'article_type',
					valueField: 'id',
					forceSelection: true
				}
			}, {
				header: 'Size',
				sortable: true,
				dataIndex: 'size',
				flex: 2,
				editor: 'textfield'
			}, {
				header: 'Age',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'age_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'age_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Weight',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'weight_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'weight_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Chest',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'chest_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'chest_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Waist',
				flex: 2,
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'waist_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'waist_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Seat',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'seat_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'seat_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Inside Leg',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'inside_leg_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'inside_leg_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Shoulder',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'shoulder_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'shoulder_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Arm',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'arm_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'arm_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Height',
				columns: [{
					header: 'min',
					sortable: true,
					dataIndex: 'height_min',
					width: 30,
					editor: 'textfield'
				}, {
					header: 'max',
					sortable: true,
					dataIndex: 'height_max',
					width: 30,
					editor: 'textfield'
				}]
			}, {
				header: 'Heal2Toe',
				sortable: true,
				dataIndex: 'heal_toe',
				flex: 2,
				editor: 'textfield'
			}, {
				header: 'Visible',
				sortable: true,
				dataIndex: 'visible',
				flex: 2,
				editor: 'textfield'
			}],
			
			selType: 'rowmodel',
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: 2,
					listeners: {
						edit: function(editor, e, opt){
							var values = editor.newValues;
							if(values.id){
								editor.record.set(values);
							} else {
								editor.store.add(values);
							}
							editor.store.sync();
							editor.store.load();
						}
					}
				})
			],
		}];
	},

	initComponent: function(){
		config = Ext.apply({}, {items: this.buildItems()});
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent();
	}
});