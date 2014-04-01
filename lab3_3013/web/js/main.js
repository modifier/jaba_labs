var initializeTabulate = function () {
	window.tabulate = (function ($wrapper) {
		var $tbody = $wrapper.find('tbody');

		return function (x, y, r, result) {
			$wrapper.show();

			var $row = document.createElement('tr');
			var $x = document.createElement('td');
				$x.textContent = x;
				$row.appendChild($x);

			var $y = document.createElement('td');
				$y.textContent = y;
				$row.appendChild($y);

			var $r = document.createElement('td');
				$r.textContent = r;
				$row.appendChild($r);

			var $result = document.createElement('td');
				$result.textContent = result;
				$row.appendChild($result);

			$tbody.prepend($($row));
		}
	})($('#result-wrapper'));
};

var execute = function ($form, $log, $svg) {
	var problems = new ProblemLine($log);

	var $submits = $('#position_x').find('input');

	function convertPoint (evt) {
		var svg = $svg.get(0);
		var ctm = svg.getScreenCTM();

		var point = svg.createSVGPoint();
		point.x = evt.clientX;
		point.y = evt.clientY;

		var result = point.matrixTransform(ctm.inverse());

		var offsets = [result.x, result.y];

		var center = 250;
		var radius = 200;
		return [
			(offsets[0] - center) / radius,
			-(offsets[1] - center) / radius
		];
	}

	var $yValidation = $form.find('#position_y');

	function checkValidation () {
		var val = $yValidation.val();
		var isValid = !isNaN(val) && val < 3 && val > -5;

		$submits.prop('disabled', !isValid);
	}

	$yValidation.on('keyup', checkValidation);

	var url = $form.attr('action');

	$svg.on('click', function (evt) {
		var offsets = convertPoint(evt);

		var radius = $form.find('[name=radius]').val();

		var data = {
			position_x: offsets[0] * radius,
			position_y: offsets[1] * radius,
			radius: radius
		};

		$.jsonp({
			url: url,
			data: data,
			action: 'tabulate'
		});
	});

	$form.find('input + label').on('click', function (evt) {
		$target = $(evt.target);

		var $checkbox = $target.siblings('input');
		var isChecked = $checkbox.prop('checked');

		if ($checkbox.is('[type=radio]') && isChecked) {
			return;
		}

		$checkbox.prop('checked', !isChecked);
	});

	$submits.on('click', function (evt) {
		evt.preventDefault();

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
	execute($('#duck_form'), $('#errors'), $('#svg_map'));
	initializeTabulate();
});