var classie = require('desandro-classie');

// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
NodeList.prototype.forEach = Array.prototype.forEach;

module.exports = {

	// Class manipulation
	hasClass: classie.has,
	addClass: classie.add,
	removeClass: classie.remove,
	toggleClass: classie.toggle,

	// Get element(s) by CSS selector:
	qs: function(selector, scope) {
		return (scope || document).querySelector(selector);
	},
	qsa: function(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	},

	// addEventListener wrapper:
	on: function(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	},

	// Attach a handler to event for all elements that match the selector,
	// now or in the future, based on a root element
	delegate: function(target, selector, type, handler) {
		var _this = this;

		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = _this.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		this.on(target, type, dispatchEvent, useCapture);
	},

	/**
	 * Call once after timeout
	 * @param  {Number}   seconds  Number of seconds to wait
	 * @param  {Function} callback Callback function
	 */
	onceAfterTimeout: function (seconds, callback) {
		var counter = 0;
		var time = window.setInterval( function () {
			counter++;
			if ( counter >= seconds ) {
				callback();
				window.clearInterval( time );
			}
		}, 300 );
	}

};
