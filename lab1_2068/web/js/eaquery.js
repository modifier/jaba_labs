var $ = (function () {
	var eaQuery = function (selector) {
		return new eaQuery.prototype.init(selector);
	};

	var matchAll = function (string, reg) {
		var globalReg = new RegExp(reg, 'g');
		var localReg = new RegExp(reg);

		var regs = string.match(globalReg);
		if (!regs) {
			return null;
		}

		var result = [];
		for (var i = 0; i < regs.length; i++) {
			result[i] = regs[i].match(localReg);
		}

		return result;
	};

	var matchesSelector = function (node, selector) {
		// In this project we use only + selector, so let's not bother.
		var divisorSymbols = '+';
		var parts = selector.split(divisorSymbols).map(function (o) {
			return o.trim();
		});

		if (parts.length == 1) {
			return matchesSingleSelector(node, selector);
		}

		// Moreover, it's commutative, that's wrong
		return eaQuery(node).is(parts[1]) && eaQuery(node).siblings(parts[0]).length != 0;
	};

	var matchesSingleSelector = function (node, selector) {
		if (!(node instanceof HTMLElement)) {
			return false;
		}

		var tagRegex = /^([\d\w\-]+)/;
		var idRegex = /#([\d\w\-_]+)/;
		var classRegex = "\\.([\\d\\w\\-_]+)";
		var pseudoClassRegex = ":([\\d\\w\\-_]+)";
		var propRegex = "\\[([\\d\\w\\-]+)=([\\d\\w\\-]+)\\]";

		var tags = (selector.match(tagRegex) || []).map(function (item) { return item.toLowerCase(); });
		var ids = (selector.match(idRegex) || []).map(function (item) { return item.toLowerCase(); });
		var classes = matchAll(selector, classRegex) || [];
		var pseudoClasses = matchAll(selector, pseudoClassRegex) || [];
		var attrs = matchAll(selector, propRegex) || [];

		if (tags.length > 1 || tags[1] ? tags[1] != node.tagName.toLowerCase() : false) {
			return false;
		}

		if (ids.length > 1 || ids[1] ? ids[1] != node.id.toLowerCase() : false) {
			return false;
		}

		for (var i = 0; i < classes.length; i++) {
			var specificClassReg = new RegExp('(^| )' + classes[i][1] + '($| )');
			if (!specificClassReg.toLowerCase().test(node.className.toLowerCase())) {
				return false;
			}
		}

		for (var i = 0; i < pseudoClasses.length; i++) {
			switch (pseudoClasses[i][1]) {
				case 'checked':
					if (!eaQuery(node).prop('checked')) {
						return false;
					}
					break;
				default:
					return false;
			}
		}

		for (var i = 0; i < attrs.length; i++) {
			if (!node.getAttribute(attrs[i][1]) || node.getAttribute(attrs[i][1]).toLowerCase() != attrs[i][2]) {
				return false;
			}
		}

		return true;
	};

	eaQuery.prototype = {
		constructor: eaQuery,

		items: [],

		length: 0,

		_oldDisplay: '',

		init: function (selector) {
			this.items = [];

			if (selector instanceof Document) {
				return {
					ready: function (callback) {
						selector.addEventListener('DOMContentLoaded', callback);
					}
				};
			} if (selector instanceof Array) {
				return this.flatten(selector);
			} if (selector instanceof HTMLElement) {
				return this.add(selector);
			} else if (typeof selector == 'string') {
				if (/^<\w+>$/.test(selector)) {
					return eaQuery(this.createElement(selector));
				} else {
					return eaQuery(document.body).find(selector);
				}
			}
		},

		createElement: function (tag) {
			var res = tag.match(/^<(\w+)>$/);
			if (res && res[1]) {
				var element = document.createElement(res[1]);
			}
			return element;
		},

		get: function (index) {
			return this.items[index];
		},

		add: function (DOMElement) {
			if (!(DOMElement instanceof HTMLElement)) {
				return;
			}

			this.length++;
			this.items.push(DOMElement);
			return this;
		},

		each: function (callback) {
			for (var i = 0; i < this.length; i++) {
				callback.call(this, eaQuery(this.get(i)));
			}
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

		text: function (text) {
			this.items[0].innerText = text;
			return this;
		},

		html: function (html) {
			this.items[0].innerHTML = html;
			return this;
		},

		append: function ($element) {
			for (var i = 0, l = $element.length; i < l; i++) {
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
			return $(parent).children(selector);
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
				if (!(children[i] instanceof HTMLElement)) {
					continue;
				}

				$result.eaFlatten(eaQuery(children[i]).find(selector));
			}
			return $result;
		},

		attr: function (attributeName, value) {
			if (typeof value == 'undefined') {
				return this.items[0].getAttribute(attributeName);
			}

			if (this.length > 1) {
				this.each(function ($el) {
					$el.attr(attributeName, value);
				});
				return;
			}

			var oldValue = this.items[0].getAttribute(attributeName);
			this.items[0].setAttribute(attributeName, value);

			if (oldValue != value) {
				var event = new Event('change');
				this.items[0].dispatchEvent(event);
			}
		},

		prop: function (propName, value) {
			if (typeof value == 'undefined') {
				return this.items[0][propName];
			}

			if (this.length > 1) {
				this.each(function ($el) {
					$el.prop(propName, value);
				});
				return;
			}

			var oldValue = this.items[0][propName];
			this.items[0][propName] = value;

			if (oldValue != value) {
				var event = new Event('change');
				this.items[0].dispatchEvent(event);
			}
		},

		val: function () {
			return this.prop('value');
		},

		on: function (eventName, callback) {
			for (var i = 0; i < this.length; i++) {
				this.items[i].addEventListener(eventName, callback);
			}
		},

		show: function () {
			for (var i = 0; i < this.items.length; i++) {
				var oldDisplay = this.items[i].getAttribute('data-old-display') || 'block';
				this.items[i].style.display = 'block';
			}
			return this;
		},

		hide: function () {
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].setAttribute('data-old-display', this.items[i].style.display);
				this.items[i].style.display = 'none';
			}
			return this;
		},

		serialize: function () {
			var $inputs = this.find('input');
			var result = {};
			for (var i = 0; i < $inputs.items.length; i++) {
				var $item = eaQuery($inputs.items[i]);
				var name = $item.attr('name');
				if ($item.is('[type=submit]')) {
					continue;
				}
				if (($item.is('[type=checkbox]') || $item.is('[type=radio]')) && !$item.prop('checked')) {
					continue;
				}
				if (result[name]) {
					if (!(result[name] instanceof Array)) {
						result[name] = [result[name]];
					}
					result[name].push($item.val());
				} else {
					result[name] = $item.val();
				}
			}
			return result;
		}
	};

	eaQuery.prototype.init.prototype = eaQuery.prototype;

	eaQuery.Deferred = function () {
		this.failCallbacks = [];
		this.doneCallbacks = [];
	};

	eaQuery.Deferred.prototype = {
		fail: function (callback) {
			this.failCallbacks.push(callback);
			return this;
		},
		reject: function () {
			for (var i = 0; i < this.failCallbacks.length; i++) {
				this.failCallbacks[i].apply(this, arguments);
			}
		},
		done: function (callback) {
			this.doneCallbacks.push(callback);
			return this;
		},
		resolve: function () {
			for (var i = 0; i < this.doneCallbacks.length; i++) {
				this.doneCallbacks[i].apply(this, arguments);
			}
		}
	};

	var formUrl = function (object) {
		var tokens = [];
		for (var i in object) {
			if (object[i] instanceof Array) {
				for (var j = 0; j < object[i].length; j++) {
					tokens.push(i + '=' + object[i][j]);
				}
			} else {
				tokens.push(i + '=' + object[i]);
			}
		}
		return tokens.join('&');
	};

	eaQuery.ajax = function (options) {
		var $dfd = new eaQuery.Deferred();

		options.type = options.type || 'GET';
		var formedUrl = options.url;
		if (options.type.toLowerCase() == 'get' && options.data) {
			formedUrl += '?' + formUrl(options.data);
		}

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
		xhr.open(options.type, formedUrl, true);
		xhr.send(options.type.toLowerCase() == 'post' ? options.data : null);

		return $dfd;
	};

	eaQuery.jsonp = function (options) {
		var urlParams = options.data ? options.data : [];
		if (options.action) {
			urlParams['action'] = options.action;
		}

		var formedUrl = options.url + '?' + formUrl(urlParams);

		var script = document.createElement('script');
		script.src = formedUrl;

		document.body.appendChild(script);
	}

	eaQuery.proxy = function (foo, context) {
		return function () {
			foo.apply(context, arguments);
		};
	};

	eaQuery.noop  = function () { };

	return eaQuery;
})();