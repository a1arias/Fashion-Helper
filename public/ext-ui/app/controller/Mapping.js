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
				var age = combo.valueModels[0].data.age;
				var age_min = item.get('age_min');
				var age_max = item.get('age_max');
				if(age && age_min && age_max){
					if(age_min <= age && age_max >= age){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var weight = combo.valueModels[0].data.weight;
				var weight_min = item.get('weight_min');
				var weight_max = item.get('weight_max');
				if(weight && weight_min && weight_max){
					if(weight_min >= weight && weight_max <= weight){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var chest = combo.valueModels[0].data.chest;
				var chest_min = item.get('chest_min');
				var chest_max = item.get('chest_max');
				if(chest && chest_min && chest_max){
					if(chest_min <= chest && chest_max >= chest){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var waist = combo.valueModels[0].data.waist;
				var waist_min = item.get('waist_min');
				var waist_max = item.get('waist_max');
				if(waist && waist_min && waist_max){
					if(waist_min <= waist && waist_max >= waist){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var seat = combo.valueModels[0].data.seat;
				var seat_min = item.get('seat_min');
				var seat_max = item.get('seat_max');
				if(seat && seat_min && seat_max){
					if(seat_min <= seat && seat_max >= seat){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var inside_leg = combo.valueModels[0].data.inside_leg;
				var inside_leg_min = item.get('inside_leg_min');
				var inside_leg_max = item.get('inside_leg_max');
				if(inside_leg && inside_leg_min && inside_leg_max){
					if(inside_leg_min <= inside_leg && inside_leg_max >= inside_leg){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var shoulder = combo.valueModels[0].data.shoulder;
				var shoulder_min = item.get('shoulder_min');
				var shoulder_max = item.get('shoulder_max');
				if(shoulder && shoulder_min && shoulder_max){
					if(shoulder_min <= shoulder && shoulder_max >= shoulder){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var arm = combo.valueModels[0].data.arm;
				var arm_min = item.get('arm_min');
				var arm_max = item.get('arm_max');
				if(arm && arm_min && arm_max){
					if(arm_min <= arm && arm_max >= arm){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				var height = combo.valueModels[0].data.height;
				var height_min = item.get('height_min');
				var height_max = item.get('height_max');
				if(height && height_min && height_max){
					if(height_min <= height && height_max >= height){
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		}, {
			fn: function(item){
				debugger;
				return (item.get("heal_toe") == item.data.heal_toe || !item.get("heal_toe"));
			}
		}]);
	}
});