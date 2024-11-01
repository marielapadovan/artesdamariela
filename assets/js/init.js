let mainProgressBar = document.querySelector(
	".progress-bar--primary .progress-bar__fill"
);
let mainPosts = document.querySelectorAll(".main-post");
let posts = document.querySelectorAll(".post");

let i = 0;
let postIndex = 0;
let currentPost = posts[postIndex];
let currentMainPost = mainPosts[postIndex];
let progressInterval = setInterval(progress, 100);

$(document).ready(function () {
	setTimeout(function () {
		loadPosts();
		$('body').addClass('loaded');
		$('h1').css('color', '#222222');
	}, 2000);
});

loadPosts = () => {
	mainPosts = document.querySelectorAll(".main-post");
	posts = document.querySelectorAll(".post");
	mainProgressBar = document.querySelector(
		".progress-bar--primary .progress-bar__fill"
	);
	currentPost = posts[postIndex];
	currentMainPost = mainPosts[postIndex];
	progressInterval = setInterval(progress, 100);
}

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

	$(function () {
		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			$body.show();
			carrousel();
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

posts.forEach((post, index) => {
	post.addEventListener("click", () => {
		disablePostsTemporarily();
		i = 0; // Reset the progress bar
		postIndex = index;
		updatePosts();
	});
});

function progress() {
	if (i === 100) {
		i = -5;
		// reset progress bar
		currentPost.querySelector(".progress-bar__fill").style.width = 0;
		mainProgressBar.style.width = 0;
		currentPost.classList.remove("post--active");

		postIndex++;

		currentMainPost.classList.add("main-post--not-active");
		currentMainPost.classList.remove("main-post--active");

		// reset postIndex to loop over the slides again
		if (postIndex === posts.length) {
			postIndex = 0;
		}

		currentPost = posts[postIndex];
		currentMainPost = mainPosts[postIndex];
	} else {
		if (currentPost == undefined) {
			loadPosts();
		}

		i++;
		currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
		mainProgressBar.style.width = `${i}%`;
		currentPost.classList.add("post--active");

		currentMainPost.classList.add("main-post--active");
		currentMainPost.classList.remove("main-post--not-active");
	}
}



function disablePostsTemporarily() {
	// Disable pointer events on all posts
	posts.forEach((post) => {
		post.classList.add("post--disabled");
	});

	// Re-enable pointer events after 2 1/2 seconds
	setTimeout(() => {
		posts.forEach((post) => {
			post.classList.remove("post--disabled");
		});
	}, 2500);
}

function updatePosts() {
	// Reset all progress bars and classes
	posts.forEach((post) => {
		post.querySelector(".progress-bar__fill").style.width = 0;
		post.classList.remove("post--active");
	});

	mainPosts.forEach((mainPost) => {
		mainPost.classList.add("main-post--not-active");
		mainPost.classList.remove("main-post--active");
	});

	// Update the current post and main post
	currentPost = posts[postIndex];
	currentMainPost = mainPosts[postIndex];

	currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
	mainProgressBar.style.width = `${i}%`;
	currentPost.classList.add("post--active");

	currentMainPost.classList.add("main-post--active");
	currentMainPost.classList.remove("main-post--not-active");
}