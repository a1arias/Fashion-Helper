Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	// Create references to views
	refs: [{
		ref: 'universalHead',
		selector: 'universalhead'
	}],

	// TODO reference stores

	init: function(){
		console.log('controller rendered');
	}
});