$(document).ready(function () {

	setTimeout(function () {
		$('body').addClass('loaded');
		$('h1').css('color', '#222222');
	}, 2000);

});

(function ($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			'global': { range: '*', href: 'assets/css/style.css', containers: 1400, grid: { gutters: 40 }, viewport: { scalable: false } },
			'wide': { range: '961-1880', href: 'assets/css/style-wide.css', containers: 1200, grid: { gutters: 40 } },
			'normal': { range: '961-1620', href: 'assets/css/style-normal.css', containers: 960, grid: { gutters: 40 } },
			'narrow': { range: '961-1320', href: 'assets/css/style-narrow.css', containers: '100%', grid: { gutters: 20 } },
			'narrower': { range: '-960', href: 'assets/css/style-narrower.css', containers: '100%', grid: { gutters: 15 } },
			'mobile': { range: '-640', href: 'assets/css/style-mobile.css', grid: { collapse: true } }
		}
	}, {
		layers: {
			layers: {
				sidePanel: {
					hidden: true,
					breakpoints: 'narrower',
					position: 'top-left',
					side: 'left',
					animation: 'pushX',
					width: 240,
					height: '100%',
					clickToClose: true,
					html: '<div data-action="moveElement" data-args="header"></div>',
					orientation: 'vertical'
				},
				sidePanelToggle: {
					breakpoints: 'narrower',
					position: 'top-left',
					side: 'top',
					height: '4em',
					width: '5em',
					html: '<div data-action="toggleLayer" data-args="sidePanel" class="toggle"></div>'
				}
			}
		}
	});

	var TxtType = function (el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	};

	TxtType.prototype.tick = function () {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) { delta /= 2; }

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	};

	window.onresize = function () {
		document.querySelector('#top').style.height = window.innerHeight + 'px';
	}

	window.onload = function () {
		
		var elements = document.getElementsByClassName('typewrite');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		document.body.appendChild(css);		
	}

	$(function () {
		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			$body.show();
			particles();
			$body.removeClass('is-loading');
		});

		// CSS polyfills (IE<9).
		if (skel.vars.IEVersion < 9)
			$(':last-child').addClass('last-child');

		// Forms (IE<10).
		var $form = $('form');
		if ($form.length > 0) {

			$form.find('.form-button-submit')
				.on('click', function () {
					$(this).parents('form').submit();
					return false;
				});

			if (skel.vars.IEVersion < 10) {
				$.fn.n33_formerize = function () { var _fakes = new Array(), _form = $(this); _form.find('input[type=text],textarea').each(function () { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function () { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function () { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function () { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function (event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function (event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function (event) { event.preventDefault(); x.val(''); }); }); _form.submit(function () { $(this).find('input[type=text],input[type=password],textarea').each(function (event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function (event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function () { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function () { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
				$form.n33_formerize();
			}

		}

		// Scrolly links.
		$('.scrolly').scrolly();

		// Nav.
		var $nav_a = $('.nav-internal a');
		// Scrolly-fy links.
		$nav_a.scrolly().on('click', function (e) {
			var t = $(this),
				href = t.attr('href');

			if (href[0] != '#')
				return;
			e.preventDefault();
			// Clear active and lock scrollzer until scrolling has stopped
			$nav_a
				.removeClass('active')
				.addClass('scrollzer-locked');
			// Set this link to active
			t.addClass('active');
		});

		// Initialize scrollzer.
		var ids = [];
		$nav_a.each(function () {
			var href = $(this).attr('href');
			if (href[0] != '#')
				return;
			ids.push(href.substring(1));
		});
		$.scrollzer(ids, { pad: 200, lastHack: true });
	});
})(jQuery);

var particles = function particles() {
	/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
	particlesJS('top',
		{
			"particles": {
				"number": {
					"value": 40,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#000000"
					},
					"polygon": {
						"nb_sides": 6
					},
					"image": {
						"src": "assets/images/svg/brand-logo.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 0.5,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 1,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 5,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 1,
						"size_min": 1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 150,
					"color": "#ffffff",
					"opacity": 0.4,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 6,
					"direction": "none",
					"random": false,
					"straight": false,
					"out_mode": "out",
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": true,
						"mode": "grab"
					},
					"onclick": {
						"enable": true,
						"mode": "push"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 400,
						"line_linked": {
							"opacity": 1
						}
					},
					"bubble": {
						"distance": 400,
						"size": 40,
						"duration": 2,
						"opacity": 8,
						"speed": 3
					},
					"repulse": {
						"distance": 200
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true,
			"config_demo": {
				"hide_card": false,
				"background_color": "",
				"background_image": "",
				"background_position": "50% 50%",
				"background_repeat": "no-repeat",
				"background_size": "cover"
			}
		}

	);
}