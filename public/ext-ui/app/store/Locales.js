Ext.define('FashionHelper.store.Locales', {
    extend: 'Ext.data.Store',
    model: 'FashionHelper.model.Locale',
    autoLoad: true,

    proxy: {
        // format: 'json',
        type: 'rest',
        api: {
            read: 'locales.json',
            update: 'locales',
            create: 'locales',
            destroy: 'locales'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});