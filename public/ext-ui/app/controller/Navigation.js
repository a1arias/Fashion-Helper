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
	}],

	init: function(application){
		console.log('controller init');
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
		console.log('locale clicked');
		console.dir(link);
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
	}
});