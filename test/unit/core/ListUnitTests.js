test("new JAI.List SHOULD have a zero length", function() {
	var list = new JAI.List();
	ok(list.content instanceof Array);
	equal(list.content.length, 0);
});

test("JAI.List.add SHOULD throw an exception if node is not a JAI.Node", function() {
	var list = new JAI.List();
	throws(
		function() {
			list.add(null);
		},
		/parameter is not a JAI.Node/
	);
	
	throws(
		function() {
			list.add(new Object());
		},
		/parameter is not a JAI.Node/
	);
	
});

test("JAI.List.add SHOULD add the Node in the content property at default position", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node);
	equal(list.content.length, 1);
	ok(list.content[0] instanceof Array);
	equal(list.content[0][0], 0);
	equal(list.content[0][1], 0);
	equal(list.content[0][2], node);
});

test("JAI.List.add SHOULD add the node at the great coordinates", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node, 4, -6);
	equal(list.content.length, 1);
	ok(list.content[0] instanceof Array);
	equal(list.content[0][0], 4);
	equal(list.content[0][1], -6);
	equal(list.content[0][2], node);
});

test("JAI.List.add SHOULD NOT add the node if a better node is at the same coordinates", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	var better_node = new JAI.Node(10, 5, 'x2:y1');
	list.add(better_node);
	list.add(node);
	equal(list.content.length, 1);
	ok(list.content[0] instanceof Array);
	equal(list.content[0][0], 0);
	equal(list.content[0][1], 0);
	equal(list.content[0][2], better_node);
});


test("JAI.List.add SHOULD update the node if a better node is added at the same coordinates", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	var better_node = new JAI.Node(10, 5, 'x2:y1');
	list.add(node);
	list.add(better_node);
	equal(list.content.length, 1);
	ok(list.content[0] instanceof Array);
	equal(list.content[0][0], 0);
	equal(list.content[0][1], 0);
	equal(list.content[0][2], better_node);
});

test("JAI.List.find SHOULD return false if no node is present at the examinated coordinates", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node);
	list.add(node, 1, 3);
	list.add(node, -4, 6);
	list.add(node, -1, -2);
	ok(!list.find(0, 1));
	ok(!list.find(2, -4));
	ok(!list.find(-1, -1));
});

test("JAI.List.find SHOULD return the index in content array where examinated coordinates corresponding", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node);
	list.add(node, 1, 3);
	list.add(node, -4, 6);
	list.add(node, -1, -2);
	equal(list.find(0, 0), 0);
	equal(list.find(1, 3), 1);
	equal(list.find(-4, 6), 2);
	equal(list.find(-1, -2), 3);
});

test("JAI.List.getBetter SHOULD return false if no node in the list", function() {
	var list = new JAI.List();
	equal(list.getBetter(), false);
});

test("JAI.List.getBetter SHOULD return the first node if only one node in the list", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node);
	var element = list.getBetter();
	equal(element[2], node);
});

test("JAI.List.getBetter SHOULD return the better node", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	var better_node = new JAI.Node(10, 5, 'x2:y1');
	list.add(node, 1, 3);
	list.add(better_node);
	list.add(node, -4, 6);
	list.add(node, -1, -2);
	var element = list.getBetter();
	equal(element[2], better_node);
});

test("JAI.List.delete SHOULD return false if no element to erase", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node, 1, 3);

	equal(list.delete(2, 5), false);
});

test("JAI.List.delete SHOULD return true if element deleted", function() {
	var list = new JAI.List();
	var node = new JAI.Node(10, 25, 'x-1:y2');
	list.add(node, 1, 3);
	list.add(node, -4, 6);
	list.add(node, -1, -2);
	list.add(node, 5, -6);

	var element = list.delete(-1, -2);
	equal(element[0], -1);
	equal(element[1], -2);
	equal(element[2], node);
	equal(list.content.length, 3);
	equal(list.content[2][0], 5);
	equal(list.content[2][1], -6);
});
