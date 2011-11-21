Ext.define('FashionHelper.view.Brand', {
	extend: 'Ext.Component',
	alias: 'widget.brandcomp',
	layout: 'anchor',
	anchor: '70%',
	autoRender: true,
	autoShow: true,
	autoDestroy: true,
	autoEl: {
		tag: 'p',
		html: 'Here we will load the brand grid/form component'
	},

	onRender: function(){
		this.autoEl = Ext.apply({}, this.initialConfig, this.autoEl);
		this.callParent(arguments);
		this.el.on('load', this.onLoad, this);
	},

	onLoad: function(){
		this.fireEvent('load', this);
	},
});