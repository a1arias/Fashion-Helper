Ext.define('FashionHelper.controller.Locale', {
	extend: 'Ext.app.Controller',

	views: ['locale.List', 'locale.Edit'],
        
        stores: ['Locale'],
        
        refs:[
            {
                ref: 'list',
                selector: '#globalTable localeList'
            },
            {
                ref: 'table',
                selector: '#globalTable'
            },
            {
                ref: 'form',
                selector: '#globalForm'
            },
            {
                ref: 'portal',
                selector: '#globalPortal'
            }
            
            
        ],

	init: function(){
            

	},
        LocaleStart: function(){

            this.getPortal().hide();
            this.getTable().show();
            this.getForm().show();
            
            if(this.application.hasData('isLocaleLoaded')==false)
            {
                this.application.setData('isLocaleLoaded', true);
                this.getTable().add({xtype:'localeList'});
                this.getForm().add({xtype:'localeEdit'});

                this.control({
                    'localeList': {
                        itemclick: this.editItem
                    },
                    'localeEdit  button[action=save]':
                    {
                        click: this.updateItem
                    },
                    'localeEdit  button[action=new]':
                    {
                        click: this.createItem
                    },
                    'localeEdit  button[action=delete]':
                    {
                        click: this.deleteItem
                    }
                });
                
            }else
            {
                this.getList().show();    
                this.getForm().show();
            }
        },
        editItem: function(grid, record){
            this.getForm().down('form').loadRecord(record);
        },
        updateItem: function(button) {
            
            var form    = button.up('localeEdit').down("form"),
                record = form.getRecord(),
                values = form.getValues();
                
                
                
            if(record.data.id)
            {
                console.log('update');
                record.set(values);
            }else
            {
                console.log('add');
                this.getLocaleStore().add(values);
            }
            this.getLocaleStore().sync();
            
        },
        createItem: function(button)
        {
            console.log('createItem');
             //Default values there.
             var x = this.getLocaleStore().model.create();
             this.getForm().down('form').loadRecord(x);
        },
        deleteItem: function(button)
        {
            var x = this.getForm().down('form').getRecord();
            this.getLocaleStore().destroy({'id': x.data.id});
            
            
            this.getLocaleStore().load();
        }
        
});