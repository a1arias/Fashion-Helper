Ext.Loader.setConfig({enabled:true});
Ext.application({
    name: 'Pandora',
    appFolder: '/ext-ui/mvc_example_v3/app',
    
    autoCreateViewport: true,
    
    models: ['Station', 'Song'],    
    stores: ['Stations', 'RecentSongs', 'SearchResults'],
    controllers: ['Station', 'Song']
});