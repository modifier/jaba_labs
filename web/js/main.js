var execute = function ($form, $log, $result) {
	var problems = new ProblemLine($log);

	var url = $form.attr('action');

	var $hidden = $form.find('#radius_hidden');

	var XValidator = new CheckboxValidator({
		$fields: $form.find('#position_x').find('input[type=checkbox]'),
		message: {
			NoneChecked: 'Please check at least one checkbox.'
		},
		onValid: function () {
			problems.removeMessage('position_x');
			problems.removeMessage('radius');
		}
	}).enable();

	var YValidator = new TextValidator({
		$field: $form.find('#position_y'),
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

	$form.find('input[type=checkbox] + label').on('click', function (evt) {
		$target = $(evt.target);

		var $checkbox = $target.siblings('input[type=checkbox]');
		var isChecked = $checkbox.prop('checked');
		$checkbox.prop('checked', !isChecked);
	});

	$form.find('input[type=submit]').on('click', function (evt) {
		var validX = XValidator.validate();
		var validY = XValidator.validate();

		evt.preventDefault();

		if (validX == XValidator.status.EverythingOK || validY == YValidator.status.EverythingOK) {
			$hidden.val($(this).val());
			var data = $form.serialize();

			var promise = $.ajax({
				url: url,
				data: data,
				type: 'GET'
			}).done(function (response) {
				$result.html(response);
			}).fail(function (response) {
				var status = Math.floor(response.status / 100);
				var text = status == 5 ?
					'There are some problems processing request on the server. Please try later.' :
					'Some shit happened. Probably our developer was drunk and has broken client-side entirely. Please try later.';
				$result.empty().text(text)
			});

			return;
		}

		problems.addMessage('position_x', XValidator.getMessage());
		problems.addMessage('position_y', YValidator.getMessage());
		problems.addMessage('radius', 'Resolve problems above first.');
	});
};

$(document).ready(function () {
	execute($('#duck_form'), $('#errors'), $('#result-wrapper'));
});