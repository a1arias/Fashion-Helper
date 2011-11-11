Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	views: ['Navigation'],

	init: function(){
		console.log('controller rendered');
		this.control({
			'navigation a': {
				click: this.goLocale
			}
		});
	},

	goLocale: function(link){
		console.log('locale clicked');
	}
});