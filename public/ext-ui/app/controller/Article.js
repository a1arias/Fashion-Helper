Ext.define('FashionHelper.controller.Article', {
	extend: 'Ext.app.Controller',
	views: ['Articles'],
	stores: ['Articles'],
	
	refs:[{
		ref: 'articlesgrid',
		selector: 'articlecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'articlecomp button[action=add]': {
				click: this.createItem
			}, 'articlecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	createItem: function(button){
		console.log('createItem');
		var store = this.getArticlesStore();
		store.insert(0, store.model.create());
		
		var x = this.getArticlesgrid().editingPlugin;
		x.startEdit(0, 0);
	},

	deleteItem: function(button){
		console.log('deleteItem');

		var selection = this.getArticlesgrid().getSelectionModel().getSelection()[0];
		var store = this.getArticlesStore();
		if(selection){
			store.destroy({'id': selection.data.id});
		}

		store.load();
	}
});