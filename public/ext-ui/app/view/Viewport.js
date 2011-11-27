Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',
	alias: 'widget.viewportcomp',
	layout: 'anchor',
        id: "viewport",        
        layout: {
            type: 'vbox',
            align: 'center'
        },
        height: 500,
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
                    autoRender: true,
                    autoShow: false,
                    autoDestroy: false,
                    id: 'globalTable',
                    xtype: 'container',
                    title: 'Default Table',
                    width: '100%',
                    height: 200
                },
                {
                    autoRender: true,
                    autoShow: false,
                    autoDestroy: false,
                    id: 'globalForm',
                    xtype: 'container',
                    title: 'Default Form',
                    width: '100%',
                    height: 100
                }
	],

	initComponent: function() {
		
		// Generates error
		// this.down('#globalTable').hide();
		// this.down('#globalForm').hide();
		this.callParent(arguments);
	}
});