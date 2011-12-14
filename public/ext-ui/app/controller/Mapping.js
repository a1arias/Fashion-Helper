Ext.define('FashionHelper.controller.Mapping', {
	extend: 'Ext.app.Controller',

	views: ['Mappings'],
		
	stores: ['Profiles', 'Sizes'],
	
	refs:[{
		ref: 'portal',
		selector: '#globalPortal'
	},{
		ref: 'mappingsgrid',
		selector: 'mappingcomp gridpanel'
	}],

	init: function(){
		this.callParent();
		this.control({
			'mappingcomp combobox' : {
				select: this.mapItem
			}
		});
	},

	mapItem: function(combo, records){
		var mgs = this.getMappingsgrid().store;
		mgs.clearFilter();
		mgs.filter([{
			property: "gender_id",
			value: combo.valueModels[0].data.gender_id
		}]);
		
		mgs.filter([{
			fn: function(item){
				debugger;
				return (item.get("age_min") >= combo.valueModels[0].data.age || !item.get("age_min"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("age_max") <= combo.valueModels[0].data.age || !item.get("age_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("weight_min") >= combo.valueModels[0].data.weight || !item.get("weight_min") || item.get("weight_max") <= combo.valueModels[0].data.weight || !item.get("weight_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("chest_min") >= combo.valueModels[0].data.chest || !item.get("chest_min") || item.get("chest_max") <= combo.valueModels[0].data.chest || !item.get("chest_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("waist_min") >= combo.valueModels[0].data.waist || !item.get("waist_min") || item.get("waist_max") <= combo.valueModels[0].data.waist || !item.get("waist_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("seat_min") >= combo.valueModels[0].data.seat || !item.get("seat_min") || item.get("seat_max") <= combo.valueModels[0].data.seat || !item.get("seat_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("inside_leg_min") >= combo.valueModels[0].data.inside_leg || !item.get("inside_leg_min") || item.get("inside_leg_max") <= combo.valueModels[0].data.inside_leg || !item.get("inside_leg_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("shoulder_min") >= item.data.shoulder || !item.get("shoulder_min") || item.get("shoulder_max") <= combo.valueModels[0].data.shoulder || !item.get("shoulder_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("arm_min") >= item.data.arm_min || !item.get("arm_min") || item.get("arm_max") <= combo.valueModels[0].data.arm || !item.get("arm_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("height_min") >= item.data.height_min || !item.get("height_min") || item.get("height_max") <= combo.valueModels[0].data.height || !item.get("height_max"));
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("heal_toe") == item.data.heal_toe || !item.get("heal_toe"));
			}
		}]);
	}
});