(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
																 || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
			};

	if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
			};
}());

const TWEEN = require('@tweenjs/tween.js')

export default class Animation {

  constructor (opts) {

		const {
			ox,
			dx,
			updateCb
		} = opts

		this.updateCb = updateCb
		this.opts = opts

		this.init(ox, dx)
		this.animate()
	}

	init (ox, dx) {

		const tween = new TWEEN.Tween({
				x: ox
			})
			.to({
				x: dx
			}, 500)
			.easing( TWEEN.Easing.Quartic.Out )
			.onUpdate(obj => {
				// dom.style.transform = 'translateX(' + object.x + 'px)'
				this.updateCb(obj)
				// console.log(obj)

			})
			.start()
			
	}

	animate (time) {
		requestAnimationFrame(this.animate.bind(this))
		TWEEN.update(time)
	}
}