var eaQuery = (function () {
	var eaQuery = function (selector) {
		var result = { items: [] };
		result.prototype = this.prototype;

		if (selector instanceof Array) {
			return result.flatten(selector);
		} if (selector instanceof HTMLElement) {
			return result.add(selector);
		} else if (typeof selector == 'string') {
			if (/^<\w+>$/.test(selector)) {
				return eaQuery(this.createElement(selector));
			} else {
				return eaQuery(document.body).find(selector);
			}
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

		createElement: function (tag) {
			var res = tag.match(/^<(\w+)>$/);
			if (res && res[1]) {
				var element = document.createElement(res[1]);
			}
			return element;
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

		html: function (html) {
			this.items[0].innerHTML = html;
			return this;
		},

		append: function ($element) {
			for (var i = 0, l = $element.length(); i < l; i++) {
				this.items[0].appendChild($element.get(i));
			}
			return this;
		},

		appendTo: function ($element) {
			$element.append(this);
			return this;
		},

		remove: function () {
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].remove();
			}
		},

		empty: function () {
			for (var i = 0; i < this.items.length; i++) {
				$(this.items[i]).children().remove();
			}

			return this;
		},

		is: function (selector) {
			return matchesSelector(this.items[0], selector);
		},

		children: function (selector) {
			var $result = $();
			for (var i = 0; i < this.items.length; i++) {
				$result.flatten(this.items[i].childNodes);
			}
			return $result.filter(selector);
		},

		siblings: function (selector) {
			var parent = this.items[0].parentNode;
			var $result = $(parent).children(selector);
		},

		filter: function (selector) {
			if (!selector) {
				return this;
			}

			var $result = $();
			for (var i = 0; i < this.items.length; i++) {
				if (matchesSelector(this.items[i], selector)) {
					$result.add(this.items[i]);
				}
			}
			return $result;
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

			// TODO: get rid of recursion if possible
			for (var i = 0; i < children.length; i++) {
				if (matchesSelector(children[i], selector)) {
					$result.add(children[i]);
				}
				$result.eaFlatten(children[i].find(selector));
			}
			return $result;
		},

		attr: function (attributeName) {
			return this.items[0].getAttribute(attributeName);
		},

		prop: function (propName, value) {
			if (!value) {
				return this.items[0][propName];
			}

			this.items[0][propName] = value;
		},

		on: function (eventName, callback) {
			for (var i = 0; i < this.length(); i++) {
				this.items[i].addEventListener(eventName, callback);
			}
		},

		show: function () {
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].style.display = '';
			}
			return this;
		},

		hide: function () {
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].style.display = 'none';
			}
			return this;
		}
	};

	eaQuery.Deferred = function () {
		this.failCallbacks = [];
		this.doneCallbacks = [];
	};

	eaQuery.Deferred.prototype = {
		fail: function (callback) {
			this.failCallbacks.push(callback);
		},
		reject: function () {
			for (var i = 0; i < this.failCallbacks.length; i++) {
				this.failCallbacks[i].apply(this, arguments);
			}
		},
		done: function (callback) {
			this.doneCallbacks.push(callback);
		},
		resolve: function () {
			for (var i = 0; i < this.doneCallbacks.length; i++) {
				this.doneCallbacks[i].apply(this, arguments);
			}
		}
	};

	eaQuery.ajax = function (options) {
		var $dfd = new eaQuery.Deferred();

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					$dfd.resolve(xhr.responseText);
				} else {
					$dfd.reject(xhr.statusText);
				}
			}
		}
		xhr.open(options.type || 'GET', options.url, true);
		xhr.send(options.data || null);
		
		return $dfd;
	};

	eaQuery.proxy = function (foo, context) {
		return function () {
			foo.apply(context, arguments);
		};
	};

	eaQuery.noop  = function () {

	};

	return eaQuery;
})();