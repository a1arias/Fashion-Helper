Ext.define('FashionHelper.controller.Gender', {
	extend: 'Ext.app.Controller',
	views: ['Genders'],
	stores: ['Genders'],
	
	refs:[{
		ref: 'gendersgrid',
		selector: 'gendercomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'gendercomp button[action=add]': {
				click: this.createItem
			}, 'gendercomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	createItem: function(button){
		console.log('createItem');
		var store = this.getGendersStore();
		store.insert(0, store.model.create());
		
		var x = this.getGendersgrid().editingPlugin;
		x.startEdit(0, 0);
	},

	deleteItem: function(button){
		console.log('deleteItem');

		var selection = this.getGendersgrid().getSelectionModel().getSelection()[0];
		var store = this.getGendersStore();
		if(selection){
			store.destroy({'id': selection.data.id});
		}

		store.load();
	}
});