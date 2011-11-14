Ext.define('FashionHelper.view.Brand', {
	extend: 'Ext.container.Container',
	alias: 'widget.brand-comp',
	width: 500,
	height: 400,
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
	autoRender: true,
	autoShow: true,
	autoDestroy: true,

	initComponent: function(){
		
		this.items = [{
			xtype: 'component',
			autoEl: {
				tag: 'p',
				html: 'Here we will load the brand grid/form component'
			}
		}];

		this.callParent(arguments);
	}
});