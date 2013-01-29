JAI.Astar = function() {

};

JAI.Astar.prototype = {
	constructor: JAI.Astar
};

JAI.Astar.getDistance = function(start, end) {
	return (start.equalTo(end) ? 0 : 1);
}

