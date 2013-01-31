test("new JAI.Map SHOULD be initialize with limits of the map", function() {
	var map = new JAI.Map(-2, 3, -4, 6);
	equal(map.min_x, -2);
	equal(map.max_x, 3);
	equal(map.min_y, -4);
	equal(map.max_y, 6);
});

test("new JAI.Map SHOULD create the necessary list of JAI.Point", function() {
	var map = new JAI.Map(-2, 3, -4, 6);
	equal(map.length, 66);
	for (var x = -2; x < 4; x++) {
		for (var y = -4; y < 7; y++) {
			var point = map.points['x' + x + ':y' + y];
			ok(point instanceof JAI.Point)
			equal(point.x, x);
			equal(point.y, y);
		};
	};
});