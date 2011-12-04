Ext.define('FashionHelper.view.Brands', {
	extend: 'Ext.container.Container',
	alias: 'widget.brandcomp',
	layout: 'anchor',
	
	buildItems: function(){
		return [{
			xtype: 'gridpanel',
			anchor: '50%',
			title: 'Brands List',
			store: 'Brands',
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
				header: 'Brand',
				sortable: true,
				dataIndex: 'brand',
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