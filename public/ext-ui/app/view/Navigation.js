Ext.define('FashionHelper.view.Navigation', {
	extend: 'Ext.Container',
	alias: 'widget.navigation',
	height: 70,

	initComponent: function(){
		this.layout = {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		};

		this.items = [{
			xtype: 'container',
			defaultType: 'button',
			height: 30,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				text: 'Locale',
				action: 'locale'
			}, {
				text: 'Brand',
				action: 'brand'
			}, {
				text: 'Article',
				action: 'article'
			}, {
				text: 'Gender',
				action: 'gender'
			}, {
				text: 'Profile',
				action: 'profile'
			}]
		}, {
			xtype: 'container',
			defaultType: 'button',
			height: 30,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				text: 'Mapping',
				action: 'mapping'
			}]
		}];
	}
});