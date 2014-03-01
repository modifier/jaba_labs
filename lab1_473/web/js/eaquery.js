var eaQuery = (function () {
	var eaQuery = function (selector) {

	};

	var matchAll = function (string, selector) {

	};

	var matchesSelector = function (node, selector) {
		var tagRegex = /^([\d\w\-]+)/;
		var idRegex = /#([\d\w\-_]+)/;
		var classRegex = /\.([\d\w\-_]+)/g;
		var propRegex = /\[([\d\w\-]+)=([\d\w\-]+)\]/;

		var tags = selector.match(tagRegex).map(function (item) { return item.toLowerCase(); });
		var ids = selector.match(idRegex).map(function (item) { return item.toLowerCase(); });
		var classes = selector.match(classRegex).map(function (item) { return item.toLowerCase(); });
		var attrs = selector.match(propRegex).map(function (item) { return item.toLowerCase(); });

		if (tags.length > 2 || tags[1] != node.tagName.toLowerCase()) {
			return false;
		}

		if (ids.length > 2 || ids[1] != node.id.toLowerCase()) {
			return false;
		}

		for (var i = 1; i < classes.length; i++) {
			var specificClassReg = new RegExp('(^| )' + classes[i] + '($| )');
			if (!specificClassReg.toLowerCase().test(node.className)) {
				return false;
			}
		}

		for (var i = 1; i < attrs.length; i++) {
			if (node.getAttribute(attrs[i][0]) == attrs[i][1]) {

			}
		}
	};

	eaQuery.prototype = {
		constructor: euQuery,

		length: 0,

		toArray: function () {
			slice.call(this);
		},

		find: function (selector) {

		}
	};
	return eaQuery;
})();