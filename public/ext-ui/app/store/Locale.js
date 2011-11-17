Ext.define('FashionHelper.store.Locale', {
    extend: 'Ext.data.Store',
    model: 'FashionHelper.model.Locale',
    autoLoad: true,    
    proxy: {
        type: 'rest',
        api: {
            read: 'data/locale/list.json',
            update: 'data/locale/update.json',
            create: 'data/locale/create.json',
            destroy: 'data/locale/delete.json'
        },
        reader: {
            type: 'json',
            root: 'locales',
            successProperty: 'success'
        }
    }
});

/*Ext.define('FashionHelper.store.Locale', {
    extend: 'Ext.data.Store',
    fields: ['locale', 'visible'],
    data: [
        {id: 1, locale: 'Ed', visible: true},
        {id: 2, locale: 'Tommy', visible: false}
    ]
});*/
