test("JAI.Astar.getDistance between the same point SHOULD be 0", function() {
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, 0)), 0);
});

test("JAI.Astar.getDistance between two points by default SHOULD return the Euclidean distance", function() {
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, 1)), 1);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, -5)), 5);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(3, 0)), 3);
	equal(JAI.Astar.getDistance(new JAI.Point(-2, -1), new JAI.Point(3, -1)), 5);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(3, 2)), Math.sqrt(2));
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(4, 3)), 2 * Math.sqrt(2));
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(0, -1)), 2 * Math.sqrt(2));
	equal(JAI.Astar.getDistance(new JAI.Point(-1, 3), new JAI.Point(5, 1)), Math.sqrt(40));
});

test("JAI.Astar.getDistance between two points with square type SHOULD return the squared Euclidean distance", function() {
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, 1), 'square'), 1);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, -5), 'square'), 25);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(3, 0), 'square'), 9);
	equal(JAI.Astar.getDistance(new JAI.Point(-2, -1), new JAI.Point(3, -1), 'square'), 25);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(3, 2), 'square'), 2);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(4, 3), 'square'), 8);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(0, -1), 'square'), 8);
	equal(JAI.Astar.getDistance(new JAI.Point(-1, 3), new JAI.Point(5, 1), 'square'), 40);
});

test("JAI.Astar.getDistance between two points with Manhattan type SHOULD return the distance associated with the standard 1", function() {
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, 1), 'manhattan'), 1);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, -5), 'manhattan'), 5);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(3, 0), 'manhattan'), 3);
	equal(JAI.Astar.getDistance(new JAI.Point(-2, -1), new JAI.Point(3, -1), 'manhattan'), 5);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(3, 2), 'manhattan'), 2);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(4, 3), 'manhattan'), 4);
	equal(JAI.Astar.getDistance(new JAI.Point(2, 1), new JAI.Point(0, -1), 'manhattan'), 4);
	equal(JAI.Astar.getDistance(new JAI.Point(-1, 3), new JAI.Point(5, 1), 'manhattan'), 8);
});

test("JAI.Astar.getDistance SHOULD throw an exception if start and/or end is not a JAI.Point", function() {
	var point = new JAI.Point();

	throws(
		function() {
			JAI.Astar.getDistance(null, null);
		},
		/getDistance needs JAI.Point parameters/
	);

	throws(
		function() {
			JAI.Astar.getDistance(new JAI.Point(), new Object());
		},
		/getDistance needs JAI.Point parameters/
	);

	throws(
		function() {
			JAI.Astar.getDistance(new Object(), new JAI.Point());
		},
		/getDistance needs JAI.Point parameters/
	);
});

test("new JAI.Astar SHOULD be init with a JAI.Map not empty", function() {
	throws(
		function() {
			new JAI.Astar(null);
		},
		/new instance of JAI.Astar needs a JAI.Map/
	);

	throws(
		function() {
			new JAI.Astar(new Object());
		},
		/new instance of JAI.Astar needs a JAI.Map/
	);

	var map = new JAI.Map(-1, 1, -1, 1);
	var astar = new JAI.Astar(map);
	equal(astar.map, map);
	ok(astar.open_list instanceof JAI.List);
	ok(astar.close_list instanceof JAI.List);
});

test("new JAI.Astar SHOULD be init with 0 starting and ending points", function() {
	var map = new JAI.Map(-1, 1, -1, 1);
	var astar = new JAI.Astar(map);
	equal(astar.start, 0);
	equal(astar.end, 0);
});

test("JAI.Astar.init SHOULD throw an exception if start and/or end are not points in the Map", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	throws(
		function() {
			astar.init(-2, 1, 0, 0);
		},
		/start should be in the map/
	);
	
	throws(
		function() {
			astar.init(-2, 1, 3, -4);
		},
		/start and end should be in the map/
	);
	
	throws(
		function() {
			astar.init(-1, 1, 3, -4);
		},
		/end should be in the map/
	);
});

test("JAI.Astar.init SHOULD set start and end points and put the starting node in the close list", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	ok(astar.start instanceof JAI.Point);
	ok(astar.end instanceof JAI.Point);
	equal(astar.start, astar.map.find(-1, -1));
	equal(astar.end, astar.map.find(1, 1));
	var index = astar.close_list.find(-1, -1);
	equal(index, 0);
	var element = astar.close_list.content[0];
	equal(element[0], -1);
	equal(element[1], -1);
	var node = element[2];
	equal(node.cost_g, 0);
	equal(node.cost_h, 2 * Math.sqrt(2));
	equal(node.cost_f, 2 * Math.sqrt(2));
	equal(node.parent_key, false);
});

test("JAI.Astar.treatNeighboringNodes SHOULD return 0 if no nodes is added", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	equal(astar.treatNeighboringNodes(3, 3), 0);
});

test("JAI.Astar.treatNeighboringNodes SHOULD put all neighboring nodes in the open list if not current node and not in close list", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	astar.close_list.add(new JAI.Node(0, 0, 'x-1:y-1'), 0, 0);
	equal(astar.treatNeighboringNodes(0, 0), 7);
});

test("JAI.Astar.treatNeighboringNodes SHOULD put only nodes where coordinates are in the map", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	equal(astar.treatNeighboringNodes(-1, -1), 3);
});

test("JAI.Astar.treatNeighboringNodes SHOULD update open list with good nodes", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	equal(astar.treatNeighboringNodes(-1, -1), 3);

	var index_10 = astar.open_list.find(-1, 0);
	equal(index_10, 0);
	var element_10 = astar.open_list.content[0];
	equal(element_10[0], -1);
	equal(element_10[1], 0);
	var node_10 = element_10[2];
	equal(node_10.cost_g, 1);
	equal(node_10.cost_h, Math.sqrt(5));
	equal(node_10.cost_f, 1 + Math.sqrt(5));
	equal(node_10.parent_key, 'x-1:y-1');

	var index0_1 = astar.open_list.find(0, -1);
	equal(index0_1, 1);
	var element0_1 = astar.open_list.content[1];
	equal(element0_1[0], 0);
	equal(element0_1[1], -1);
	var node0_1 = element0_1[2];
	equal(node0_1.cost_g, 1);
	equal(node0_1.cost_h, Math.sqrt(5));
	equal(node0_1.cost_f, 1 + Math.sqrt(5));
	equal(node0_1.parent_key, 'x-1:y-1');

	var index00 = astar.open_list.find(0, 0);
	equal(index00, 2);
	var element00 = astar.open_list.content[2];
	equal(element00[0], 0);
	equal(element00[1], 0);
	var node00 = element00[2];
	equal(node00.cost_g, Math.sqrt(2));
	equal(node00.cost_h, Math.sqrt(2));
	equal(node00.cost_f, 2 * Math.sqrt(2));
	equal(node00.parent_key, 'x-1:y-1');
});

test("JAI.Astar.run SHOULD throw an exception if no init", function() {
	throws(
		function() {
			var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
			astar.run();
		},
		/call init before run/
	);
});

test("JAI.Astar.run SHOULD return true when path is found", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	ok(astar.run());
	ok(astar.close_list.find(1, 1));
});

test("JAI.Astar.treatNeighboringNodes SHOULD not treat block points", function() {
	var astar = new JAI.Astar(new JAI.Map(-1, 1, -1, 1));
	astar.init(-1, -1, 1, 1);
	astar.map.find(0, 0).setBlock();
	equal(astar.treatNeighboringNodes(-1, -1), 2);

	var index00 = astar.open_list.find(0, 0);
	equal(index00, false);
});
