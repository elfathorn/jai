JAI.Map = function(min_x, max_x, min_y, max_y) {
	this.min_x = min_x;
	this.max_x = max_x;
	this.min_y = min_y;
	this.max_y = max_y;
	this.length = 0;

	this.points = new Object();
	for (var x = min_x; x <= max_x; x++) {
		for (var y = min_y; y <= max_y; y++) {
			this.points['x' + x + ':y' + y] = new JAI.Point(x, y);
			this.length++;
		};
	};
};

JAI.Map.prototype = {
	constructor: JAI.Map,
	
	find: function(x, y) {
		return (this.points['x' + x + ':y' + y] == undefined ? false : this.points['x' + x + ':y' + y]);
	}
};

