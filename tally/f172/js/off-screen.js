document.addEventListener("DOMContentLoaded", (event) => {
	function move_offscreen_if_on_left(window_width, tooltip_left, tooltip_width, element) {
		var tooltip_left_edge = tooltip_left + tooltip_width;
		if( tooltip_left_edge > window_width ) {
			var move_tooltip = tooltip_left_edge - window_width;

			element.style.left = '-' + move_tooltip + 'px';
			document.head.innerHTML += '<style type="text/css">.move_right::after { left:90%; }</style>';
			element.classList.add( 'move_right' );
		}
	}

	function move_offscreen_if_on_right(element) {
		if (element === null || element.length == 0) {
			return;
		}

		var tooltip_left = element.getBoundingClientRect().left;
		if ( tooltip_left !== undefined ) {
			var window_width = window.innerWidth;
			if( Math.sign(tooltip_left) === -1 ) {
				if( ( window_width/2 ) < Math.abs( tooltip_left ) ) {
					document.head.innerHTML += '<style type="text/css">.move_left::after { left:10%; }</style>';
					element.classList.add( 'move_left' );
				}

				var left = Math.abs(tooltip_left);
				element.style.left = left + 'px';
				// In this way it is recalculated
				element.style.left = left + Math.abs(element.getBoundingClientRect().left) + 'px';
			}
		}
	}

	function move_offscreen( element ) {
		if (element === null || element.length == 0) {
			return;
		}

		var move_tooltip = '';
		var tooltip_left = element.getBoundingClientRect().left;
		// Workaround to let JS to parse also the transform values for the position
		element.style.transform = 'translateZ(0)';
		// Reset tooltip position to avoid issue on resize
		if( typeof element.dataset.original_left === 'undefined' ) {
			element.dataset.original_left = tooltip_left;
		} else {
			element.style.left = element.dataset.original_left;
		}
		var tooltip_width = element.getBoundingClientRect().width;
		var window_width = window.innerWidth;

		move_offscreen_if_on_left(window_width, tooltip_left, tooltip_width, element);
	}

	function fix_all_tooltips() {
		var selector = document.querySelectorAll('.glossary-tooltip-content');
		if (selector.length > 0) {
			selector.forEach(element => {
				move_offscreen( element );
			});
		}
	}

	if ( window.matchMedia( "(any-hover: hover)") ) {
		fix_all_tooltips();
		window.addEventListener('resize', function() {
			fix_all_tooltips();
		});
		selector = document.querySelectorAll('.glossary-tooltip');
		if (selector.length > 0) {
			selector.forEach(element => {
				element.addEventListener('mouseover', function() {
					move_offscreen_if_on_right( element.querySelector('.glossary-tooltip-content') );
				}, { once: true });
			});
		}
	}
});
