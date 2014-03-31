var initializeTabulate = function () {
	window.tabulate = (function ($wrapper) {
		var $tbody = $wrapper.find('tbody');

		return function (x, y, r, result) {
			$wrapper.show();

			var $row = document.createElement('tr');
			var $x = document.createElement('td');
				$x.innerText = x;
				$row.appendChild($x);

			var $y = document.createElement('td');
				$y.innerText = y;
				$row.appendChild($y);

			var $r = document.createElement('td');
				$r.innerText = r;
				$row.appendChild($r);

			var $result = document.createElement('td');
				$result.innerText = result;
				$row.appendChild($result);

			$tbody.prepend($($row));
		}
	})($('#result-wrapper'));
};

var execute = function ($form, $log, $result) {
	var problems = new ProblemLine($log);

	var url = $form.attr('action');

	var $xValidation = $form.find('#position_y');

	var YValidator = new TextValidator({
		$field: $xValidation,
		min: -5,
		max: 3,
		message: {
			NotANumber: 'It\'s not a number!',
			ExceedsLimit: 'Y position is above acceptable bounds (3)',
			SubseedsLimit: 'Y position is below acceptable bounds (-5)'
		},
		onValid: function () {
			problems.removeMessage('position_y');
			problems.removeMessage('radius');
		}
	}).enable();

	var $submits = $('#position_x').find('input');

	function checkValidation () {
		var isValid = YValidator.validate() == YValidator.status.EverythingOK;

		$submits.prop('disabled', !isValid);
	}

	$xValidation.on('change', checkValidation);


	$form.find('input + label').on('click', function (evt) {
		$target = $(evt.target);

		var $checkbox = $target.siblings('input');
		var isChecked = $checkbox.prop('checked');

		if ($checkbox.is('[type=radio]') && isChecked) {
			return;
		}

		$checkbox.prop('checked', !isChecked);
	});

	$form.find('input[type=submit]').on('click', function (evt) {
		var validY = YValidator.validate();

		evt.preventDefault();

		if (validY != YValidator.status.EverythingOK) {
			problems.addMessage('position_y', YValidator.getMessage());
			problems.addMessage('radius', 'Resolve problems above first.');
			return;
		}

		var data = $form.serialize();
		data['position_x'] = evt.target.value;

		var promise = $.jsonp({
			url: url,
			data: data,
			action: 'tabulate'
		})
	});
};

$(document).ready(function () {
	execute($('#duck_form'), $('#errors'), $('#result-wrapper'));
	initializeTabulate();
});