Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',
	alias: 'widget.viewport-comp',

	requires: [
		'FashionHelper.view.Navigation',
		'FashionHelper.view.Portal'
	],

	initComponent: function() {
		this.items = [{
			xtype: 'navigation'
		}, {
			xtype: 'portal'
		}];
		
		this.callParent(arguments);
	}
});