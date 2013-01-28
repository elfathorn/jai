JAI.Point = function(x, y) {
	this.x = x;
	this.y = y;
};

JAI.Point.prototype = {
	constructor: JAI.Point,

	equalTo: function(point) {
		return (this.x == point.x && this.y == point.y);
	}
};