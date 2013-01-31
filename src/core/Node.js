JAI.Node = function(cost_g, cost_h, parent_key) {
	this.cost_g = cost_g;
	this.cost_h = cost_h;
	this.cost_f = cost_g + cost_h;
	this.parent_key = parent_key;
};

JAI.Node.prototype = {
	constructor: JAI.Node
};

