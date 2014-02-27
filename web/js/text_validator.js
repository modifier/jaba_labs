var TextValidator = function (params) {
	this.$field = params.$field;
	this.min = params.min;
	this.max = params.max;
	this.onValid = params.onValid || $.noop;
	this.message = params.message || {};
};

TextValidator.prototype = {
	min: 0,
	max: 0,

	status: {
		EverythingOK: 0,
		NotANumber: 1,
		ExceedsLimit: 2,
		SubseedsLimit: 3
	},

	message: {},

	validate: function () {
		var value = this.$field.val();

		if (!/^(-|)(\d+|\d+\.\d+|\.\d+)$/.test(value)) {
			return this.status.NotANumber;
		}

		if (value > this.max) {
			return this.status.ExceedsLimit;
		}

		if (value < this.min) {
			return this.status.SubseedsLimit;
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
		this.$field.on('change', $.proxy(this.validate, this));
		return this;
	}
};