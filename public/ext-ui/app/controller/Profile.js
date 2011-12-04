Ext.define('FashionHelper.controller.Profile', {
	extend: 'Ext.app.Controller',
	views: ['Profiles'],
	stores: ['Profiles'],
	
	refs:[{
		ref: 'profilesgrid',
		selector: 'profilecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'profilecomp button[action=add]': {
				click: this.addItem
			}, 'profilecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},
	
	addItem: function(button){
		var store = this.getProfilesStore();
		store.insert(0, store.model.create());
		
		var x = this.getProfilesgrid().editingPlugin;
		x.startEdit(0, 0);
	},

	deleteItem: function(button){
		var selection = this.getProfilesgrid().getSelectionModel().getSelection()[0];
		var store = this.getProfilesStore();
		if(selection){
			store.destroy({'id': selection.data.id});
		}

		store.load();
	}
});