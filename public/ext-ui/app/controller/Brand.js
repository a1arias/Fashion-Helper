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
	}],

	init: function(){
		this.callParent();
	}
});