Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',

	requires: [
		'FashionHelper.view.Navigation'
	],

	initComponent: function() {
		this.items = [{
			xtype: 'navigation'
		}]
		
		this.callParent();
	}
});