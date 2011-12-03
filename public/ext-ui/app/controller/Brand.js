Ext.define('FashionHelper.controller.Brand', {
	extend: 'Ext.app.Controller',
	views: ['Brands'],
	stores: ['Brands'],
	
	refs:[{
		ref: 'brandsgrid',
		selector: 'brandcomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'brandcomp button[action=add]': {
				click: this.createItem
			}, 'brandcomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	createItem: function(button){
		var store = this.getBrandsStore();
		store.insert(0, store.model.create());
		
		var x = this.getBrandsgrid().editingPlugin;
		x.startEdit(0, 0);
	},

	deleteItem: function(button){
		var selection = this.getBrandsgrid().getSelectionModel().getSelection()[0];
		var store = this.getBrandsStore();
		if(selection){
			store.destroy({'id': selection.data.id});
		}

		store.load();
	}
});