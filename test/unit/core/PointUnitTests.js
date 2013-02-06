test("new JAI.Point without parameters SHOULD init the Point at (0, 0)", function() {
	var point = new JAI.Point();

	equal(point.x, 0);
	equal(point.y, 0);
	ok(!point.block);
});

test("new JAI.Point SHOULD initialize a good Point object", function() {
	var point = new JAI.Point(-1, 6);

	equal(point.x, -1);
	equal(point.y, 6);
});

test("JAI.Point.equalTo SHOULD throw an exception if parameter is not a JAI.Point", function() {
	var point = new JAI.Point();

	throws(
		function() {
			point.equalTo(null);
		},
		/parameter is not a JAI.Point/
 	);

	throws(
		function() {
			point.equalTo(new Object());
		},
		/parameter is not a JAI.Point/
  	);
});

test("JAI.Point.equalTo SHOULD be true for the same point", function() {
	var point = new JAI.Point(2, 6);
	var same_point = new JAI.Point(2, 6);

	ok(point.equalTo(point));
	ok(point.equalTo(same_point));
});

test("JAI.Point SHOULD be a block", function() {
	var point = new JAI.Point(-1, 6, true);
	ok(point.block);
});

test("JAI.Point.setBlock SHOULD make a block point", function() {
	var point = new JAI.Point();
	ok(!point.block);
	point.setBlock();
	ok(point.block);
});
