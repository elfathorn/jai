JAI.Astar = function(map) {
	if (!(map instanceof JAI.Map)) 
		throw "new instance of JAI.Astar needs a JAI.Map";

	this.map = map;
	this.open_list = new JAI.List();
	this.close_list = new JAI.List();
	this.start = 0;
	this.end = 0;
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
			
		this.start = this.map.find(start_x, start_y);
		this.end = this.map.find(end_x, end_y);
		
		var starting_node = new JAI.Node(0, JAI.Astar.getDistance(this.start, this.end), false);
		this.close_list.add(starting_node, this.start.x, this.start.y);
	},
	
	treatNeighboringNodes: function(x, y) {
		var count = 0;
		for (var i = (x-1); i <= (x+1); i++) {
			for (var j = (y-1); j <= (y+1); j++) {
				var neighboring_point = this.map.find(i, j);
				if (neighboring_point !== false && !(i == x && j == y) && !(this.close_list.find(i, j) !== false)) {
					var parent_index = this.close_list.find(x, y);
					var parent_node = this.close_list.content[parent_index][2];
					var node = new JAI.Node(
						parent_node.cost_g + JAI.Astar.getDistance(neighboring_point, this.map.find(this.close_list.content[parent_index][0], this.close_list.content[parent_index][1])), 
						JAI.Astar.getDistance(neighboring_point, this.end), 
						'x' + x + ':y' + y
					);
					this.open_list.add(node, i, j);
					count++;
				};
			};
		};
		return count;
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

