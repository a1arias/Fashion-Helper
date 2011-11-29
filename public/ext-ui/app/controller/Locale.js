Ext.define('FashionHelper.controller.Locale', {
    extend: 'Ext.app.Controller',

    views: ['Locales'],
        
    stores: ['Locales'],
    
    refs:[{
        ref: 'portal',
        selector: '#globalPortal'
    }, {
        ref: 'localesgrid',
        selector: 'localecomp gridpanel'
    }],

    init: function(){
        this.callParent();
        this.control({
            'localecomp gridpanel' : {
                itemclick: this.editItem
            }, 'localecomp button[action=save]': {
                click: this.updateItem
            }, 'localecomp button[action=new]': {
                click: this.createItem
            }, 'localecomp button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    editItem: function(grid, record){
        this.getLocalesgrid().up('form').getForm().loadRecord(record);
    },
    updateItem: function(button){
        var form = this.getLocalesgrid().up('form'),
            record = form.getRecord(),
            values = form.getValues();

        if(record.data.id){
            console.log('update');
            record.set(values);
        } else {
            console.log('add');
            this.getLocalesStore().add(values);
        }
        this.getLocalesStore().sync();
        this.getLocalesStore().load();
    },
    createItem: function(button){
        console.log('createItem');
        //Default values there.
        var x = this.getLocalesStore().model.create();
        this.getLocalesgrid().up('form').loadRecord(x);
    },
    deleteItem: function(button){
        var x = this.getLocalesgrid().up('form').getRecord();
        this.getLocalesStore().destroy({'id': x.data.id});
        
        this.getLocalesStore().load();
    }
});