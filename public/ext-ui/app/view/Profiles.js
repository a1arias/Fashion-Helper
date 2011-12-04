Ext.define('FashionHelper.view.Profiles', {
	extend: 'Ext.container.Container',
	alias: 'widget.profilecomp',
	layout: 'anchor',
	
	// colRenderer: function(value, metadata, record, rowIndex, colIndex, store) {
	// 	var idx = this.columns[colIndex].field.store.find('brand_id', value);
	// 	return idx !== -1 ? this.columns[colIndex].field.store.getAt(idx).get('status_name') : '';
	// },

	buildItems: function(){
		return [{
			xtype: 'gridpanel',
			anchor: '100%',
			title: 'Profiles List',
			store: 'Profiles',
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
				flex: 1,
				editor: 'textfield',
				disabled: true
			}, {
				header: 'Name',
				sortable: true,
				dataIndex: 'name',
				flex: 2,
				editor: 'textfield'
			}, {
				header: 'Gender',
				sortable: true,
				dataIndex: 'gender_id',
				flex: 2,
				renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
					return view.store.data.items[rowIndex].data.gender;
				},
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
				header: 'Age',
				sortable: true,
				dataIndex: 'age',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Weight',
				sortable: true,
				dataIndex: 'weight',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Height',
				sortable: true,
				dataIndex: 'height',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Chest',
				sortable: true,
				dataIndex: 'chest',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Seat',
				sortable: true,
				dataIndex: 'seat',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Waist',
				sortable: true,
				dataIndex: 'waist',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Inside Leg',
				sortable: true,
				dataIndex: 'inside_leg',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Shoulder',
				sortable: true,
				dataIndex: 'shoulder',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Arm',
				sortable: true,
				dataIndex: 'arm',
				flex: 1,
				editor: 'textfield'
			}, {
				header: 'Visible',
				sortable: true,
				dataIndex: 'visible',
				flex: 1,
				editor: 'checkbox'
			}],
			
			selType: 'rowmodel',
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: 2,
					listeners: {
						edit: function(editor, e, opt){
							var values = editor.newValues;
							debugger;
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