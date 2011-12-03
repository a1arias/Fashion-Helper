Ext.define('FashionHelper.controller.Size', {
	extend: 'Ext.app.Controller',
	views: ['Sizes'],
	stores: ['Sizes'],
	
	refs:[{
		ref: 'sizesgrid',
		selector: 'sizecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'sizecomp button[action=add]': {
				click: this.addItem
			}, 'sizecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},
	
	addItem: function(button){
		var store = this.getSizesStore();
		store.insert(0, store.model.create());
		
		var x = this.getSizesgrid().editingPlugin;
		x.startEdit(0, 0);
	},

	deleteItem: function(button){
		var selection = this.getSizesgrid().getSelectionModel().getSelection()[0];
		var store = this.getSizesStore();
		if(selection){
			store.destroy({'id': selection.data.id});
		}

		store.load();
	}
});