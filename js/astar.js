var Point = Class.create({
	initialize: function(x, y) {
    	this.x = x;
		this.y = y;
  	},
	equalTo: function(point) {
		return (this.x == point.x && this.y == point.y);
	}
});

var Astar = Class.create({
	initialize: function() {
		
	}
});

Astar.getDistance = function(start, end) {
	return (start.equalTo(end) ? 0 : 1);
}