Ext.Loader.setConfig({enabled:true});
Ext.application({
    name: 'FashionHelper',
    appFolder: '/ext-ui/app',
    autoCreateViewport: true,

    data: {},
    
    setData: function(key, value)
    {
        this.data.key = value;
    },
    getData: function(key)
    {
        return this.data.key;
    },
    hasData: function(key)
    {
        return typeof this.data.key != "undefined";
    },
    
    controllers: ['Navigation', 'Locale', 'Brand', 'Size']
});