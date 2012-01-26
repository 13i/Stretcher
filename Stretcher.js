/**
 * Stretches an element to fit into an other element keeping proportions
 * 
 * @see https://github.com/13i/Stretcher
 */
var Stretcher = new Class({
	Implements: [Events, Options],
	size: {x: 0, y: 0},
	options: {
		parent: null,
		auto: false
	},
	initialize: function(element, options, setup){
		this.element = document.id(element);
		this.setOptions(options);
		this.element.store('stretcher', this);
		var setup = [setup, true].pick();
		if(setup) this.setup();
	},
	setup: function(options){
		if(options) this.setOptions(options);
		this.size = this.element.getSize();
		if(this.options.auto) this.stretch();
	},
	stretch: function(){
		this.fireEvent('beforeStretch');
		
		var o = this.options,
			el = this.element,
			size = this.size,
			parentSize = o.parent ? o.parent.getSize() : el.getParent.getSize(),
			ratio = size.y / size.x,
			newSize = {x: 0, y: 0},
			property = 'left',
			offset = 0,
			styles = {};
		
		newSize.x = parentSize.x;
		newSize.y = Math.round(newSize.x * ratio);
		offset = newSize.x - parentSize.x;
			
		if(newSize.y < parentSize.y){
			newSize.y = parentSize.y;
			newSize.x = Math.round(newSize.y / ratio);
			property = 'top';
			offset = newSize.y - parentSize.y;
		}
		
		styles.width = newSize.x;
		styles.height = newSize.y;
		styles[property] = offset;
		
		el.setStyles(styles);
		
		this.fireEvent('afterStretch');
	}
});

Element.Properties.stretcher = {
	set: function(options){
		this.get('stretcher').setup(options);
		return this;
	},
	get: function(){
		var instance = this.retrieve('stretcher');
		if (!instance){
			instance = new Stretcher(this, {}, false);
		}
		return instance;
	}
};

Element.implement({
	stretch: function(options){
		this.get('stretch').setup(options).stretch();
		return this;
	}
});
