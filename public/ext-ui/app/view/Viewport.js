Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',

	requires: [
		'FashionHelper.view.Navigation',
		'FashionHelper.view.Home'
	],

	initComponent: function() {
		this.items = [{
			xtype: 'navigation'
		}, {
			xtype: 'home'
		}];
		
		this.callParent(arguments);
	}
});