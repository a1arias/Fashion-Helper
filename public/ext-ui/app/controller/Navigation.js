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
		var homeview = Ext.widget('homecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(homeview);
	},

	goLocale: function(link){
		var localeView = Ext.widget('localecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(localeView);
	},

	goBrand: function(link){
		var brandView = Ext.widget('brandcomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(brandView);
	},

	goSize: function(link){
		var sizeView = Ext.widget('sizecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(sizeView);
	},

	goArticle: function(link){
		var articleView = Ext.widget('articlecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(articleView);
	},

	goGender: function(link){
		var genderView = Ext.widget('gendercomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(genderView);
	},
	
	goProfile: function(link){
		var profileView = Ext.widget('profilecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(profileView);
	}
});