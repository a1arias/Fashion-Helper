Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',
	alias: 'widget.viewport-comp',        
        id: "viewport",
        
	requires: [
		'FashionHelper.view.Navigation',
		'FashionHelper.view.Portal'
	],        
        layout: {
            type: 'vbox',
            align: 'center'
        },
        height: 500,
//        renderTo: document.body,
        items: [
           
            {
                xtype: 'navigation'
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
            },
            {
                xtype: 'portal',
                id: 'globalPortal'
            }
        ],

	initComponent: function() {
            
            this.callParent(arguments);
            
//            this.down('#globalTable').hide();
//            this.down('#globalForm').hide();
	}
});
