test("JAI.Astar.getDistance between the same point SHOULD be 0", function() {
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, 0)), 0);
});

test("JAI.Astar.getDistance between one point and his neighbour SHOULD be 1", function() {
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(0, 1)), 1);
	equal(JAI.Astar.getDistance(new JAI.Point(0, 0), new JAI.Point(1, 0)), 1);
	equal(JAI.Astar.getDistance(new JAI.Point(-1, 4), new JAI.Point(-2, 4)), 1);
	equal(JAI.Astar.getDistance(new JAI.Point(-3, -2), new JAI.Point(-3, -1)), 1);
});