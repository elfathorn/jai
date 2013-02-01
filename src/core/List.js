JAI.List = function() {
	this.content = new Array();
};

JAI.List.prototype = {
	constructor: JAI.List,

	add: function(node, x, y) {
		if (!(node instanceof JAI.Node))
			throw "parameter is not a JAI.Node";

		x = x == null ? 0 : x;
		y = y == null ? 0 : y;

		var add = true;
		var find = this.find(x, y);

		if (find !== false) {
			add = false;
			if (node.cost_f < this.content[find][2].cost_f )
				this.content[find][2] = node;
		};

		if (add) 
			this.content.push(new Array(x, y, node));
	},

	find: function(x, y) {
		var present = false;
		this.content.forEach(function(element, index, array) {
			if (element[0] == x && element[1] == y) {
				present = index;
			};
		});

		return present;
	},

	getBetter: function() {
		var better = false;
		if (this.content.length > 0) {
			better = 0;
			this.content.forEach(function(element, index, array) {
				if (element[2].cost_f < array[better][2].cost_f) {
					better = index;
				};
			});
		};
		return (better === false ? false : this.content[better]);
	}
};

