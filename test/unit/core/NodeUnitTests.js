test("new JAI.Node SHOULD be init with cost_g, cost_h, parent_key", function() {
	var node = new JAI.Node(10, 25, 'x-1:y2');
	equal(node.cost_g, 10);
	equal(node.cost_h, 25);
	equal(node.cost_f, 35);
	equal(node.parent_key, 'x-1:y2');
});