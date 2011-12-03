Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',
	alias: 'widget.viewportcomp',
	layout: 'anchor',
        
	requires: [
		'FashionHelper.view.Navigation',
		'FashionHelper.view.Portal'
	],

	items: [{
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
	}],

	initComponent: function() {
		this.callParent(arguments);
	}
});