Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	refs: [{
		ref: 'navigationView',
		selector: 'navigationcomp'
	}, {
		ref: 'portalView',
		selector: 'portalcomp'
	}],

	init: function(application){
		console.log('controller init');
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
		var portalview = this.getPortalView();

		portalview.removeAll(true);
		portalview.add(Ext.widget('homecomp'));
	},

	goLocale: function(link){
		var portalview = this.getPortalView();
		portalview.removeAll(true);
		portalview.add(Ext.widget('localecomp'));
	},

	goBrand: function(link){
		var brandView = Ext.widget('brandcomp');
		var portalview = this.getPortalView();
		portalview.removeAll(true);
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