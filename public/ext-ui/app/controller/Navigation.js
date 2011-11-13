Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	views: ['Navigation'],

	refs : [{
		ref: 'navigationView',
		selector: 'navigation'
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
		console.log('brand clicked');
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