Ext.define('FashionHelper.view.UniversalHead', {
	extend: 'Ext.Container',
	alias: 'widget.universalhead',
	height: 70,

	initComponent: function(){
		this.layout = {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		};

		this.items = {
			xtype: 'container',
			height: 30,
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			},
			items: [{
				xtype: 'component',
				autoEl: {
					tag: 'h1'
				},
				html: 'FashionHelper'
			}, {
				xtype: 'component',
				autoEl: {
					tag: 'a',
					href: '#!/home'
				},
				html: 'Home',
				action: 'home'
			}]
		};

		this.callParent(arguments);
	}
});