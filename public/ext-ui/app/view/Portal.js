Ext.define('FashionHelper.view.Portal', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.portal',
	autoRender: true,
	autoShow: true,
	autoDestroy: true,
	title: 'Admin Portal',

	requires: [,
		'FashionHelper.view.Home'
	],

	initComponent: function(){
		
		this.items = [{
			xtype: 'home'
		}];

		this.callParent(arguments);
	}
});