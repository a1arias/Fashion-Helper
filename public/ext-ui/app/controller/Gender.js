Ext.define('FashionHelper.controller.Gender', {
	extend: 'Ext.app.Controller',

	views: ['Genders'],
		
	stores: ['Genders'],
	
	refs:[{
		ref: 'portal',
		selector: '#globalPortal'
	},{
		ref: 'gendersgrid',
		selector: 'gendercomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'gendercomp gridpanel' : {
				itemclick: this.editItem
			}, 'gendercomp button[action=save]': {
				click: this.updateItem
			}, 'gendercomp button[action=new]': {
				click: this.createItem
			}, 'gendercomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	editItem: function(grid, record){
		this.getGendersgrid().up('form').getForm().loadRecord(record);
	},
	updateItem: function(button){
		var form = this.getGendersgrid().up('form'),
			record = form.getRecord(),
			values = form.getValues();

		if(record.data.id){
			console.log('update');
			record.set(values);
		} else {
			console.log('add');
			this.getGendersStore().add(values);
		}
		this.getGendersStore().sync();
	},
	createItem: function(button){
		console.log('createItem');
		//Default values there.
		var x = this.getGendersStore().model.create();
		this.getGendersgrid().up('form').loadRecord(x);
	},
	deleteItem: function(button){
		var x = this.getGendersgrid().up('form').getRecord();
		this.getArticlesStore().destroy({'id': x.data.id});
		
		this.getGendersStore().load();
	}
});