JAI.Astar = function(map) {
	if (!(map instanceof JAI.Map)) 
		throw "new instance of JAI.Astar needs a JAI.Map";

	this.map = map;
	this.open_list = new JAI.List();
	this.close_list = new JAI.List();
};

JAI.Astar.prototype = {
	constructor: JAI.Astar,
	
	init: function(start_x, start_y, end_x, end_y) {
		var error = '';
		if (this.map.find(start_x, start_y) == false)
			error += 'start';
			
		if (this.map.find(end_x, end_y) == false)
			error += (error == '' ? 'end' : ' and end');
		
		if (error != '')
			throw error + " should be in the map";
	},
	
	treatNeighboringNodes: function(x, y) {
		return 0;
	}
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

