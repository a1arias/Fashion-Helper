Ext.define('FashionHelper.controller.Size', {
	extend: 'Ext.app.Controller',

	views: ['Sizes'],
		
	stores: ['Sizes'],
	
	refs:[{
		ref: 'portal',
		selector: '#globalPortal'
	},{
		ref: 'sizesgrid',
		selector: 'sizecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'sizecomp gridpanel' : {
				itemclick: this.editItem
			}, 'sizecomp button[action=save]': {
				click: this.updateItem
			}, 'sizecomp button[action=new]': {
				click: this.createItem
			}, 'sizecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	editItem: function(grid, record){
		this.getSizesgrid().up('form').getForm().loadRecord(record);
	},
	updateItem: function(button){
		var form = this.getSizesgrid().up('form'),
			record = form.getRecord(),
			values = form.getValues();

		if(record.data.id){
			console.log('update');
			record.set(values);
		} else {
			console.log('add');
			this.getSizesStore().add(values);
		}
		this.getSizesStore().sync();
	},
	createItem: function(button){
		console.log('createItem');
		//Default values there.
		var x = this.getSizesStore().model.create();
		this.getSizesgrid().up('form').loadRecord(x);
	},
	deleteItem: function(button){
		var x = this.getSizessgrid().up('form').getRecord();
		this.getSizesStore().destroy({'id': x.data.id});
		
		this.getSizesStore().load();
	}
});