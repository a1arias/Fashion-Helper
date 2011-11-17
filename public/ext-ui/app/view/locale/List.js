Ext.define('FashionHelper.view.locale.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.localeList',

    title : 'All Locales',

    store: 'Locale',
    
    columns: [
         {header: 'Name',  dataIndex: 'locale',  flex: 1},
         {header: 'Visible',  dataIndex: 'visible',  flex: 1}
    ],
    initComponent: function() {
        this.callParent(arguments);
    }
    
});