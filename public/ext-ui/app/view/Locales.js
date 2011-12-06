Ext.define('FashionHelper.view.Locales', {
	extend: 'Ext.container.Container',
	alias: 'widget.localecomp',
	layout: 'anchor',
	
	buildItems: function(){
		return [{
			xtype: 'gridpanel',
			anchor: '50%',
			title: 'Locales List',
			store: 'Locales',
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
				editor: 'textfield'
			}, {
				header: 'Locale',
				sortable: true,
				dataIndex: 'locale',
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
							editor.store.sync({
								callback: function(){
									this.grid.store.load();
								},
								scope: this
							});
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