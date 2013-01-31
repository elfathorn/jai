var JAI = JAI || { REVISION: '1' };

JAI.Point = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

JAI.Point.prototype = {
	constructor: JAI.Point,

	equalTo: function(point) {
		if (!(point instanceof JAI.Point))
			throw "parameter is not a JAI.Point";

		return (this.x == point.x && this.y == point.y);
	}
};

JAI.Node = function(cost_g, cost_h, parent_key) {
	this.cost_g = cost_g;
	this.cost_h = cost_h;
	this.cost_f = cost_g + cost_h;
	this.parent_key = parent_key;
};

JAI.Node.prototype = {
	constructor: JAI.Node
};

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
	constructor: JAI.Map
};

JAI.Astar = function(map) {
	if (!(map instanceof JAI.Map)) 
		throw "new instance of JAI.Astar needs a JAI.Map";

	this.map = map;
};

JAI.Astar.prototype = {
	constructor: JAI.Astar
};

JAI.Astar.getDistance = function(start, end, kind) {
	if (!(start instanceof JAI.Point) || !(end instanceof JAI.Point))
		throw "getDistance needs JAI.Point parameters";

	if (kind == 'manhattan') {
		var distance = Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
	} else {
		var distance = (start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y);
	};
	return (kind == undefined ? Math.sqrt(distance) : distance);
}

