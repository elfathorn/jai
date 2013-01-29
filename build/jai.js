var JAI = JAI || { REVISION: '1' };

JAI.Point = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

JAI.Point.prototype = {
	constructor: JAI.Point,

	equalTo: function(point) {
		if (!(point instanceof JAI.Point)) {
			throw "parameter is not a JAI.Point";
		};

		return (this.x == point.x && this.y == point.y);
	}
};

JAI.Astar = function() {

};

JAI.Astar.prototype = {
	constructor: JAI.Astar
};

JAI.Astar.getDistance = function(start, end) {
	return (start.equalTo(end) ? 0 : 1);
}

