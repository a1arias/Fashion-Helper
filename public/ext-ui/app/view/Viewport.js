Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',
	alias: 'widget.viewportcomp',
	layout: 'anchor',

	requires: [
		'FashionHelper.view.Navigation',
		'FashionHelper.view.Portal'
	],
	refs: [
		{
			ref: 'table'
		}
		
	],
	items: [
		{
			xtype: 'container',
			anchor: '100%',
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			},
			items: [{
				xtype: 'navigationcomp',
				flex: 1,
				id: 'navigation',
				width: '100%'
			}, {
				xtype: 'portalcomp',
				flex: 4,
				id: 'globalPortal',
				// width: '100%',
			}]
			
		},
		{
			id: 'globalTable',
			xtype: 'container',
			title: 'Default Table',
			width: '100%',
			flex: 2
		},
		{
			id: 'globalForm',
			xtype: 'container',
			title: 'Default Form',
			width: '100%',
			flex: 1
		},
	],

	initComponent: function() {
		
		// Generates error
		// this.down('#globalTable').hide();
		// this.down('#globalForm').hide();
		this.callParent(arguments);
	}
});