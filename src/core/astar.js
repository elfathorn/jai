var JAI = JAI || { REVISION: '1' };

JAI.Point.prototype = {
	constructor: function(x, y) {
    	this.x = x;
		this.y = y;
  	},

	equalTo: function(point) {
		return (this.x == point.x && this.y == point.y);
	}
};

JAI.Astar.prototype = {
	constructor: function() {
		
	}, 
	
	getDistance: function(start, end) {
		return (start.equalTo(end) ? 0 : 1);
	}
};