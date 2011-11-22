Ext.define('FashionHelper.view.Navigation', {
	extend: 'Ext.Container',
	alias: 'widget.navigationcomp',
	height: 70,
	autoRender: true,
	autoShow: true,

	emitNavAction: function(e, target){
		return this.fireEvent(target.id, this, e, target);
	},
	
	initComponent: function(){

		this.layout = {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		};

		this.listeners = {
			click: {
				fn: this.emitNavAction,
				element: 'el',
				delegate: 'a',
				scope: this,
				preventDefault: true
			}
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
				id: 'gohome',
				autoEl: {
					tag: 'a',
					href: '/',
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
				id: 'golocale',
				autoEl: {
					tag: 'a',
					href: '#!/locale',
					html: 'Locale'
				},
				action: 'locale'
			}, {
				xtype: 'component',
				flex: 1,
				id: 'gobrand',
				autoEl: {
					tag: 'a',
					href: '#!/brand',
					html: 'Brand'
				}
			}, {
				xtype: 'component',
				flex: 1,
				id: 'gosize',
				autoEl: {
					tag: 'a',
					href: '#!/size',
					html: 'Size'
				}
			}, {
				xtype: 'component',
				flex: 1,
				id: 'goarticle',
				autoEl: {
					tag: 'a',
					href: '#!/article',
					html: 'Article'
				}
			}, {
				xtype: 'component',
				flex: 1,
				id: 'gogender',
				autoEl: {
					tag: 'a',
					href: '#!/gender',
					html: 'Gender'
				}
			}, {
				xtype: 'component',
				flex: 1,
				id: 'goprofile',
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