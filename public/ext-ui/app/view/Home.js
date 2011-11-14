Ext.define('FashionHelper.view.Home', {
	extend: 'Ext.container.Container',
	alias: 'widget.home',
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
				html: 'Lorem Ipsum is simply dummy text of the \
				printing and typesetting industry. Lorem Ipsum \
				has been the industry standard dummy text \
				ever since the 1500s, when an unknown printer \
				took a galley of type and scrambled it to make \
				a type specimen book. It has survived not only \
				five centuries, but also the leap into electronic \
				typesetting, remaining essentially unchanged. \
				It was popularised in the 1960s with the release \
				of Letraset sheets containing Lorem Ipsum passages, \
				and more recently with desktop publishing software \
				like Aldus PageMaker including versions of Lorem Ipsum.'
			}
		}];

		this.callParent(arguments);
	}
});