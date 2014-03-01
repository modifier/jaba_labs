var eaQuery = (function () {
	var eaQuery = function (selector) {
		var result = { items: [] };
		result.prototype = this.prototype;

		if (selector instanceof Array) {
			return result.flatten(selector);
		} if (selector instanceof HTMLElement) {
			return result.add(selector);
		} else if (typeof selector == 'string') {
			return eaQuery(document.body).find(selector);
		}

		return result;
	};

	var matchAll = function (string, reg) {
		var globalReg = new RegExp(reg, 'g');
		var localReg = new RegExp(reg);

		var regs = string.match(globalReg);
		var result = [];
		for (var i = 0; i < regs.length; i++) {
			result[i] = regs[i].match(localReg);
		}

		return result;
	};

	var matchesSelector = function (node, selector) {
		var tagRegex = /^([\d\w\-]+)/;
		var idRegex = /#([\d\w\-_]+)/;
		var classRegex = "\\.([\\d\\w\\-_]+)";
		var propRegex = "\\[([\\d\\w\\-]+)=([\\d\\w\\-]+)\\]";

		var tags = selector.match(tagRegex).map(function (item) { return item.toLowerCase(); });
		var ids = selector.match(idRegex).map(function (item) { return item.toLowerCase(); });
		var classes = matchAll(selector, classRegex);
		var attrs = matchAll(selector, propRegex);

		if (tags.length > 2 || tags[1] != node.tagName.toLowerCase()) {
			return false;
		}

		if (ids.length > 2 || ids[1] != node.id.toLowerCase()) {
			return false;
		}

		for (var i = 1; i < classes.length; i++) {
			var specificClassReg = new RegExp('(^| )' + classes[i][1] + '($| )');
			if (!specificClassReg.toLowerCase().test(node.className.toLowerCase())) {
				return false;
			}
		}

		for (var i = 1; i < attrs.length; i++) {
			if (!node.getAttribute(attrs[i][1]) || node.getAttribute(attrs[i][1]).toLowerCase() != attrs[i][2]) {
				return false;
			}
		}

		return true;
	};

	eaQuery.prototype = {
		constructor: eaQuery,

		items: [],

		length: function () {
			return this.items.length;
		},

		get: function (index) {
			return this.item[index];
		},

		add: function (DOMElement) {
			if (!(DOMElement instanceof HTMLElement)) {
				throw new Error('That\'s not DOM Element! Please cope with it.');
			}

			this.items.push(DOMElement);
			return this;
		},

		eaFlatten: function ($elements) {
			this.flatten($elements.items);
		},

		flatten: function (elements) {
			for (var i = 0; i < elements.length; i++) {
				this.add(elements[i]);
			}
			return this;
		},

		children: function () {
			var result = $();
			for (var i = 0; i < this.items.length; i++) {
				result.flatten(this.items[i].childNodes);
			}
			return result;
		},

		find: function (selector) {
			if (this.items.length > 1) {
				var $found = eaQuery();
				for (var i = 0; i < this.items.length; i++) {
					$found.eaFlatten(eaQuery(this.items[i]).find(selector));
				}
				return $found;
			}

			var $result = $();
			var children = this.items[0].childNodes;

			if (children.length == 0) {
				return $result;
			}

			for (var i = 0; i < children.length; i++) {
				if (matchesSelector(children[i], selector)) {
					$result.add(children[i]);
				}
				$result.eaFlatten(children[i].find(selector));
			}
			return $result;
		}
	};
	return eaQuery;
})();