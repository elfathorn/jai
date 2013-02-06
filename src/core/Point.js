JAI.Point = function(x, y, block) {
	this.x = x || 0;
	this.y = y || 0;

	this.block = block == undefined ? false : block;
};

JAI.Point.prototype = {
	constructor: JAI.Point,

	equalTo: function(point) {
		if (!(point instanceof JAI.Point))
			throw "parameter is not a JAI.Point";

		return (this.x == point.x && this.y == point.y);
	},

	setBlock: function() {
		this.block = true;
	}
	
};

