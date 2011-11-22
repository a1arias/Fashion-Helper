Ext.define('FashionHelper.view.Brands', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.brandcomp',
	title: 'Brands',
	autoRender: true,
	autoShow: true,
	autoDestroy: true,
	width: 500,
	height: 400,

	selType: 'rowmodel',
	rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToEdit: 2
	}),

	store: ['Brands'],

	columns: [{
		header: 'Id',
		dataIndex: 'id',
		sortable: true,
		flex: 1
	}, {
		header: 'Brand',
		dataIndex: 'brand',
		editor: {
			xtype: 'textfield',
			allowBlank: false
		},
		flex: 4
	}, {
		header: 'Visible',
		dataIndex: 'visible',
		editor: {
			xtype: 'checkbox',
		},
		flex: 1
	}],

	onRender: function(){
		// this.store = Ext.apply({}, this.store);
		// this.columns = Ext.apply({}, this.columns);
		this.plugins = [this.rowEditor];
		this.callParent(arguments);
		this.el.on('load', this.onLoad, this);
	},

	onLoad: function(){
		this.fireEvent('load', this);
	},
});