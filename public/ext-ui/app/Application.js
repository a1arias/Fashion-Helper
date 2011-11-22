Ext.Loader.setConfig({enabled:true});
Ext.application({
    name: 'FashionHelper',
    appFolder: '/ext-ui/app',
    autoCreateViewport: true,

    controllers: ['Navigation']
});