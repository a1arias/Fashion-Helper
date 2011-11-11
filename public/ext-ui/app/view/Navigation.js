Ext.define('FashionHelper.view.Navigation', {
	extend: 'Ext.Container',
	alias: 'widget.navigation',
	height: 70,

	autoRender: true,
	autoShow: true,

	initComponent: function(){

		this.layout = {
			type: 'vbox',
			align: 'center',
			pack: 'center',
		};

		this.items = [{
			xtype: 'container',
			width: '100%',
			height: 50,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'h1',
					html: 'Fashion Helper'
				},
				action: 'locale'
			}, {
				xtype: 'component',
				flex: 2,
				autoEl: {
					tag: 'a',
					href: '#!/home',
					html: 'Home'
				},
				action: 'home'
			}]
		}, {
			xtype: 'container',
			width: '100%',
			height: 50,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'a',
					href: '#!/locale',
					html: 'Locale'
				}
			}, {
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'a',
					href: '#!/brand',
					html: 'Brand'
				}
			}, {
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'a',
					href: '#!/size',
					html: 'Size'
				}
			}, {
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'a',
					href: '#!/article',
					html: 'Article'
				}
			}, {
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'a',
					href: '#!/gender',
					html: 'Gender'
				}
			}, {
				xtype: 'component',
				flex: 1,
				autoEl: {
					tag: 'a',
					href: '#!/profile',
					html: 'Profile'
				}
			}]
		}];

		this.callParent(arguments);
	}
});