Ext.define('FashionHelper.view.locale.Edit', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.localeEdit',

    title : 'Locale form',
    layout: 'fit',

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'locale',
                        fieldLabel: 'Locale'
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'visible',
                        fieldLabel: 'Is verified'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'New',
                action: 'new'
            },            
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Delete',
                action: 'delete'
            }
            
        ];

        this.callParent(arguments);
    }
});