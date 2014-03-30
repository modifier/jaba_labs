var ProblemLine = function ($object) {
	this.$object = $object;
	this._messages = {};
};

ProblemLine.prototype = {
	_messages: {},

	_refreshContent: function () {
		var messagesCount = Object.keys(this._messages).length;
		if (0 == messagesCount) {
			return this._hide();
		}

		if (1 == messagesCount) {
			var $container = this.$object;
			for (var i in this._messages) {
				$container.html(this._messages[i]);
			}
		} else {
			this.$object.empty();
			var $container = $('<ul>').appendTo(this.$object);
			for (var i in this._messages) {
				$container.append($('<li>').html(this._messages[i]));
			}
		}

		return this._show();
	},

	addMessage: function (name, content) {
		if (!content) {
			return;
		}

		this._messages[name] = content;
		this._refreshContent();
	},

	removeMessage: function (name) {
		delete this._messages[name];
		this._refreshContent();
	},

	_show: function () {
		this.$object.show();
	},

	_hide: function () {
		this.$object.hide();
	}
};