Ext.define('FashionHelper.view.Genders', {
	extend: 'Ext.container.Container',
	alias: 'widget.gendercomp',
	layout: 'anchor',
	
	buildItems: function(){
		return [{
			xtype: 'gridpanel',
			anchor: '50%',
			title: 'Genders List',
			store: 'Genders',
			iconCls: 'icon-user',
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
				header: 'Gender',
				sortable: true,
				dataIndex: 'gender',
				flex: 6,
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
							values = editor.newValues;
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