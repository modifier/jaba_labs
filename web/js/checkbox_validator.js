var CheckboxValidator = function (params) {
	this.$fields = params.$fields;
	this.message = params.message || {};
	this.onValid = params.onValid || $.noop;
};

CheckboxValidator.prototype = {
	status: {
		EverythingOK: 0,
		NoneChecked: 1
	},

	message: {},

	validate: function () {
		if (!this.$fields.filter(':checked').length) {
			return this.status.NoneChecked;
		}

		this.onValid();
		return this.status.EverythingOK;
	},

	getMessage: function () {
		var index = this.validate();

		for (var i in this.status) {
			if (index == this.status[i]) {
				var key = i;
			}
		}

		return this.message[key];
	},

	enable: function () {
		this.$fields.on('change', $.proxy(this.validate, this));
		return this;
	}
};