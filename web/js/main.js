$(document).ready(function () {
	var statuses = {
		position_x: false,
		position_y: false
	};

	var problems = new ProblemLine($('#errors'));

	var XValidator = new CheckboxValidator({
		$fields: $('#position_x input[type=checkbox]'),
		message: {
			NoneChecked: 'Please check at least one checkbox.'
		},
		onValid: function () {
			problems.removeMessage('position_x');
			problems.removeMessage('radius');
		}
	}).enable();

	var YValidator = new TextValidator({
		$field: $('#position_y'),
		min: -5,
		max: 5,
		message: {
			NotANumber: 'It\'s not a number!',
			ExceedsLimit: 'Y position is below acceptable bounds (5)',
			SubseedsLimit: 'Y position is below acceptable bounds (-5)'
		},
		onValid: function () {
			problems.removeMessage('position_y');
			problems.removeMessage('radius');
		}
	}).enable();

	$('input[type=checkbox] + label').on('click', function (evt) {
		$target = $(evt.target);

		var $checkbox = $target.siblings('input[type=checkbox]');
		var isChecked = $checkbox.prop('checked');
		$checkbox.prop('checked', !isChecked);
	});

	$('input[type=submit]').on('click', function (evt) {
		var validX = XValidator.validate();
		var validY = XValidator.validate();

		if (validX == XValidator.status.EverythingOK || validY == YValidator.status.EverythingOK) {
			return;
		}

		problems.addMessage('position_x', XValidator.getMessage());
		problems.addMessage('position_y', YValidator.getMessage());

		evt.preventDefault();
		problems.addMessage('radius', 'Resolve problems above first.');
	});
});