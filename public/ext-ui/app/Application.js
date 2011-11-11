Ext.Loader.setConfig({enabled:true});
Ext.application({
    name: 'FashionHelper',
    appFolder: '/ext-ui/app',
    autoCreateViewport: true,

    controllers: ['Navigation'],

    // launch: function(){
    // 	Ext.create('Ext.container.Viewport', {
    // 		renderTo: Ext.getBody(),
    // 		items: {
    // 			xtype: 'navigation'
    // 		}
    // 	});
    // }
});