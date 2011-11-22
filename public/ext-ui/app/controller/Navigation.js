Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	refs: [{
		ref: 'navigationView',
		selector: 'navigationcomp'
	}, {
		ref: 'portalView',
		selector: 'portalcomp'
	}, {
		ref: 'brandView',
		selector: 'brandcomp'
	}, {
		ref: 'homeView',
		selector: 'homecomp'
	}, {
		ref: 'table',
		selector: '#globalTable'
	}, {
		ref: 'grid',
		selector: '#globalTable localeList'
	}],

	init: function(application){
		console.log('controller init');
		//var me = this;
		this.control({
			'navigationcomp': {
				'gohome':this.goHome,
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

	goHome: function(link){
		console.log('home clicked');
		// var homeview = this.getHomeView();
		var homeview = Ext.widget('homecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(homeview);
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
		console.log('brand clicked');
		var brandView = Ext.widget('brandcomp');
		var portalview = this.getPortalView();
		// window.location.hash = '!/brands'
		portalview.removeAll();
		portalview.add(brandView);
		// portal.doLayout();
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
	cleanUpTable: function(){
		var panels = this.getTable().down('panel');
		if(panels){
			panels.hide();
		}
	}
});
