Ext.define('FashionHelper.view.locale.Test' ,{

    extend: 'Ext.grid.Panel',
    alias : 'widget.localelist',

    title : 'All Locales',

    store: 'Users',
    
    initComponent: function() {
console.log('Init Test');


    }
});