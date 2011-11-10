Ext.define('FashionHelper.view.Viewport', {
	extent: 'Ext.container.Viewport',
	layout: 'fit',

	requires: [
		'FashionHelper.view.UniversalHead',
		'FashionHelper.view.Navigation'
	],

	initComponent: function(){
		
		this.items = {
			dockedItems: [{
				dock: 'top',
				xtype: 'container',
				height: 80,
				items: [{
					xtype: 'universalhead',
					width: '100%'
				}, {
					xtype: 'navigation',
					width: '100%'
				}]
			}],
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'component',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'component',
					html: '<p>some text</p>'
				}, {
					xtype: 'component',
					html: '<p>more text</p>'
				}]
			}]
		};

		this.callParent();
	}
});