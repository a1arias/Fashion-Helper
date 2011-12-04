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
		var portalview = this.getPortalView();
		portalview.removeAll(true);
		portalview.add(Ext.widget('brandcomp'));
	},

	goSize: function(link){
		var portalview = this.getPortalView();
		portalview.removeAll(true);
		portalview.add(Ext.widget('sizecomp'));
	},

	goArticle: function(link){
		var portalview = this.getPortalView();
		portalview.removeAll(true);
		portalview.add(Ext.widget('articlecomp'));
	},

	goGender: function(link){
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(Ext.widget('gendercomp'));
	},
	
	goProfile: function(link){
		var profileView = Ext.widget('profilecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(profileView);
	}
});