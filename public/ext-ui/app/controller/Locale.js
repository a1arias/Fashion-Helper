Ext.define('FashionHelper.controller.Locale', {
	extend: 'Ext.app.Controller',
	views: ['Locales'],
	stores: ['Locales'],
	
	refs:[{
		ref: 'localesgrid',
		selector: 'localecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'localecomp button[action=add]': {
				click: this.createItem
			}, 'localecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	createItem: function(button){
		console.log('createItem');
		var store = this.getLocalesStore();
		store.insert(0, store.model.create());
		
		var x = this.getLocalesgrid().editingPlugin;
		x.startEdit(0, 0);
	},

	deleteItem: function(button){
		console.log('deleteItem');

		var selection = this.getLocalesgrid().getSelectionModel().getSelection()[0];
		var store = this.getLocalesStore();
		if(selection){
			store.destroy({'id': selection.data.id});
		}

		store.load();
	}
});