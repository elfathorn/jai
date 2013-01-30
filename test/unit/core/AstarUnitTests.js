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
			JAI.Astar.getDistance(new JAI.Point(), new JAI.Astar());
		},
		/getDistance needs JAI.Point parameters/
	);

	throws(
		function() {
			JAI.Astar.getDistance(new JAI.Astar(), new JAI.Point());
		},
		/getDistance needs JAI.Point parameters/
	);
});