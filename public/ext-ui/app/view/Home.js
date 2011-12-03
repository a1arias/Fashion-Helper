Ext.define('FashionHelper.view.Home', {
	extend: 'Ext.Component',
	alias: 'widget.homecomp',
	layout: 'anchor',
	anchor: '70%',
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
	},

	initComponent: function(){
		config = Ext.apply({}, {anchor: '70%', autoEl: this.autoEl});
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent();
	}
});