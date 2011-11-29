Ext.define('FashionHelper.controller.Article', {
	extend: 'Ext.app.Controller',

	views: ['Articles'],
		
	stores: ['Articles'],
	
	refs:[{
		ref: 'portal',
		selector: '#globalPortal'
	},{
		ref: 'articlesgrid',
		selector: 'articlecomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'articlecomp gridpanel' : {
				itemclick: this.editItem
			}, 'articlecomp button[action=save]': {
				click: this.updateItem
			}, 'articlecomp button[action=new]': {
				click: this.createItem
			}, 'articlecomp button[action=delete]': {
				click: this.deleteItem
			}
		});
	},

	editItem: function(grid, record){
		this.getArticlesgrid().up('form').getForm().loadRecord(record);
	},
	updateItem: function(button){
		var form = this.getArticlesgrid().up('form'),
			record = form.getRecord(),
			values = form.getValues();

		if(record.data.id){
			console.log('update');
			record.set(values);
		} else {
			console.log('add');
			this.getArticlesStore().add(values);
		}
		this.getArticlesStore().sync();
	},
	createItem: function(button){
		console.log('createItem');
		//Default values there.
		var x = this.getArticlesStore().model.create();
		this.getArticlesgrid().up('form').loadRecord(x);
	},
	deleteItem: function(button){
		var x = this.getArticlesgrid().up('form').getRecord();
		this.getArticlesStore().destroy({'id': x.data.id});
		
		this.getArticlesStore().load();
	}
});