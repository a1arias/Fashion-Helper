Ext.define('FashionHelper.controller.Profile', {
	extend: 'Ext.app.Controller',

	views: ['Profiles'],
		
	stores: ['Profiles'],
	
	refs:[{
		ref: 'portal',
		selector: '#globalPortal'
	},{
		ref: 'profilesgrid',
		selector: 'profilecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'profilecomp gridpanel' : {
				itemclick: this.editItem
			}, 'profilecomp button[action=save]': {
				click: this.updateItem
			}, 'profilecomp button[action=new]': {
				click: this.createItem
			}, 'profilecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	editItem: function(grid, record){
		this.getProfilesgrid().up('form').getForm().loadRecord(record);
	},
	updateItem: function(button){
		var form = this.getProfilesgrid().up('form'),
			record = form.getRecord(),
			values = form.getValues();

		if(record.data.id){
			console.log('update');
			record.set(values);
		} else {
			console.log('add');
			this.getProfilesStore().add(values);
		}
		this.getProfilesStore().sync();
		this.getProfilesStore().load();
	},
	createItem: function(button){
		console.log('createItem');
		//Default values there.
		var x = this.getProfilesStore().model.create();
		this.getProfilesgrid().up('form').loadRecord(x);
	},
	deleteItem: function(button){
		var x = this.getProfilesgrid().up('form').getRecord();
		this.getProfilesStore().destroy({'id': x.data.id});
		
		this.getProfilesStore().load();
	}
});