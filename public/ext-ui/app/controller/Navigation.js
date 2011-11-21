Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	refs : [{
                    ref: 'navigationView',
                    selector: 'navigation'
                }, {
                        ref: 'portalView',
                        selector: 'portal'
                }, {
                        ref: 'brandView',
                        selector: 'brand-comp'
                }, {
                        ref: 'homeView',
                        selector: 'home'
                },
                {
                    ref: 'table',
                    selector: '#globalTable'
                },
                {
                    ref: 'grid',
                    selector: '#globalTable localeList'
                }
        ],

	init: function(application){
		console.log('controller init');
                var me = this;
		this.control({
			'navigation': {
				'golocale': this.goLocale,
				'gobrand': this.goBrand,
				'gosize': this.goSize,
				'goarticle': this.goArticle,
				'gogender': this.goGender,
				'goprofile': this.goProfile,
				scope: this
			}
		});
	},

	goLocale: function(link){
            //console.log(link);
            var me = this;
            console.log(me);
            me.application.getController('Navigation').cleanUpTable();
            
            me.application.getController('Locale').LocaleStart();
            
            this.getTable().show();
	},

	goBrand: function(link){
		var portal = this.getPortalView();
		var brandView = this.getBrandView();
		portal.removeAll(true);
		portal.add(brandView);
	},

	goSize: function(link){
		console.log('size clicked');
	},

	goArticle: function(link){
		console.log('article clicked');
	},

	goGender: function(link){
		console.log('gender clicked');
	},
	
	goProfile: function(link){
		console.log('profile clicked');
	},
        cleanUpTable: function()
        {
            var panels = this.getTable().down('panel');
            if(panels)
            {
                panels.hide();
            }
        }
});