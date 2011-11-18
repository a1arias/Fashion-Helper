Ext.define('FashionHelper.view.Viewport', {
	extend: 'Ext.Panel',
	alias: 'widget.viewport-comp',

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
                xtype: 'navigation'
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
            {
                xtype: 'portal',
                id: 'globalPortal'
            }
        ],

	initComponent: function() {
            
            this.callParent(arguments);
            
            this.down('#globalTable').hide();
            this.down('#globalForm').hide();
	}
});