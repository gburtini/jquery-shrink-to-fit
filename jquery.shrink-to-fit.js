/*
 * jQuery.shrinkToFit
 *
 * Causes text within an input to be shrunk to fit within the available area.
 *
 * Example Use:
 * jQuery("#input").keyUp(function() {
 * 	jQuery("#input").shrinkToFit();
 * });
 *
 * Options include gap (the fixed offset required before shrink starts), scalar (how much to scale per keypress)
 * and minSize (the minimum size a font will go).
 */
(function($) {
	var measure = function(txt, font) {
		var id = 'text-width-tester',
			$tag = $('#' + id);
		if (!$tag.length) {
			$tag = $('<span id="' + id + '" style="display:none;font:' + font + ';">').text(txt); //+ '</span>');
			$('body').append($tag);
		} else {
			$tag.css({font:font}).text(txt);
		}
		return {
			width: $tag.width(),
			height: $tag.height()
		}
	};

	var method = function(options) {
		var defaults = {
			gap: -70,
			scalar: 0.95,
			minSize: 8,
			height: undefined
		};
		var settings = $.extend({}, defaults, options);

		var gap = settings.gap;
		var scalar = settings.scalar;
		var minSize = settings.minSize;
		var height = settings.height;

		var $input = $(this),
			txt = $input.val(),
			maxWidth = $input.width() + gap;

		if($input.data("original-font-size") == undefined) {
			var fontSize = parseFloat($input.css("font-size"));
			$input.data("original-font-size", fontSize);
		} else {
			var fontSize = $input.data("original-font-size");
		}
		var fontWeight = $input.css("font-weight");
		var fontFamily = $input.css("font-family");


		if(height != undefined)
			$input.css("height", height);

		var font = fontWeight + " " + fontSize + "px " + fontFamily;
		var textWidth = measure(txt, font).width;   // .replace(/\</g, "&lt;").replace(/\&/g, "&amp;")

		if (textWidth > maxWidth) {
			fontSize = fontSize * maxWidth / textWidth * scalar;
			//console.log(fontSize, "new size");
			if(fontSize < minSize) return;

			font = fontWeight + " " + fontSize + "px " + fontFamily;
			$input.css({font:font});
		} else {
			//console.log(font, "old size");
			$input.css({font:font});
		}
	};


	$.fn.shrinkToFit = method;
})(jQuery);
