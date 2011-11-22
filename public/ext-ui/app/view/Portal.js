Ext.define('FashionHelper.view.Portal', {
	extend: 'Ext.container.Container',
	alias: 'widget.portalcomp',
	autoRender: true,
	autoShow: true,
	autoDestroy: true,
	title: 'Admin Portal',
	layout: 'anchor',

	requires: [,
		'FashionHelper.view.Home',
		'FashionHelper.view.Brands'
	],

	items: [{
		xtype: 'homecomp',
		anchor: '100%'
	}],

	onRender: function(){
		//this.items = Ext.apply({}, this.initialConfig,this.items);
		this.callParent(arguments);
	},

	// initComponent: function(){
	// 	console.log('portal initialized');
	// }
});