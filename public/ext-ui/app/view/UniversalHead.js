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
				type: 'component',
				html: '<h1>FashionHelper</h1>'
			}, {
				type: 'component',
				html: '<a href="#!/home">Home</a>',
				action: 'home'
			}]
		};
	}
});