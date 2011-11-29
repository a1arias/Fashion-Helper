Ext.define('FashionHelper.controller.Brand', {
	extend: 'Ext.app.Controller',

	views: ['Brands'],
		
	stores: ['Brands'],
	
	refs:[{
		ref: 'table',
		selector: '#globalTable'
	},{
		ref: 'form',
		selector: '#globalForm'
	},{
		ref: 'portal',
		selector: '#globalPortal'
	},{
		ref: 'brandsgrid',
		selector: 'brandcomp gridpanel'
	},{
		ref: 'brandform',
		selector: 'form'
	}],

	init: function(){
		this.callParent();
		this.control({
			'brandcomp gridpanel' : {
				itemclick: this.editItem
			}, 'brandcomp button[action=save]': {
				click: this.updateItem
			}, 'brandcomp button[action=new]': {
				click: this.createItem
			}, 'brandcomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	editItem: function(grid, record){
		this.getBrandsgrid().up('form').getForm().loadRecord(record);
	},
	updateItem: function(button){
		var form = this.getBrandsgrid().up('form'),
			record = form.getRecord(),
			values = form.getValues();

		if(record.data.id){
			console.log('update');
			record.set(values);
		} else {
			console.log('add');
			this.getBrandsStore().add(values);
		}
		this.getBrandsStore().sync();
	},
	createItem: function(button){
		console.log('createItem');
		//Default values there.
		var x = this.getBrandsStore().model.create();
		this.getBrandsgrid().up('form').loadRecord(x);
	},
	deleteItem: function(button){
		var x = this.getBrandsgrid().up('form').getRecord();
		this.getBrandsStore().destroy({'id': x.data.id});
		
		this.getBrandsStore().load();
	}
});