//  Ivan Eremeev - 2020
//  Skype: ivan.eremeev_1
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

	// Брэйкпоинты js
	var	breakXl = 1440,
			breakLg = 1200,
			breakMd = 1025,
			breakSm = 769,
			breakXs = 500;

	// Отмена перехода по ссылкам
	$('a[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Мобильное меню
	function myMenu(menu) {
		var menuBtn = menu.find('#menu-btn'),
				over = menu.find('#menu-over'),
				close = menu.find('#menu-close'),
				html = $('html'),
				scrollbarWidth;
		menuBtn.on('click', function () {
			if ($(this).hasClass('is-active')) {
				menuClose();
			}else {
				menuOpen();
			}
		});
		over.on('click', menuClose);
		close.on('click', menuClose);
		function menuOpen() {
			html.addClass('lock').css('padding-right',scrollbarWidth);
			menu.addClass('open');
			menuBtn.addClass('is-active');
		}
		function menuClose() {
			html.removeClass('lock').css('padding-right',0);
			menu.removeClass('open');
			menuBtn.removeClass('is-active');
		}
		function scrollbarWidthCalc() {
			var documentWidth = parseInt(document.documentElement.clientWidth),
					windowsWidth = parseInt(window.innerWidth);
			scrollbarWidth = windowsWidth - documentWidth;
		}
		scrollbarWidthCalc();
		$(window).resize(scrollbarWidthCalc);
	};
	myMenu($('#menu'));

	// JQueryScrollbar
	function scrollbar(block) {
		if (block.length) {
			block.scrollbar();
		}
	}
	scrollbar($('#scrollbar'));

	// AOS | Анимация при скролле
	AOS.init();

	// Запуск и остановка видео html5
	function videoControll(videoConteiner) {
		if (videoConteiner.length) {
			videoConteiner.each(function () {
				var container = $(this),
						video = container.find('video'),
						playing = true;
				container.click(function () {
					if (playing) {
						video.trigger('play').attr('controls', '');
						container.addClass('play');
						playing = false;
					}
				});
			});	
		}
	};
	videoControll($('.js-video'));

	// Выпадайки в roadmap
	function Drop(block) {
		if (block.length) {
			block.each(function () {
				var $this = $(this),
						trigger = $this.find('.roadmap__trigger span'),
						drop = $this.find('.roadmap__drop');
				drop.hide();
				trigger.on('click', function () {
					drop.stop().slideToggle();
					trigger.toggleClass('active');
				})
			})
		}
	}
	Drop($('.roadmap__body'));

	// Паралакс относительно курсора мыши
	function parallaxMove(parallax) {
		if (parallax.length) {
			parallax.each(function () {
				var $window = $(window),
						$this = $(this),
					direction = $this.data('direction'),
					intensity = $this.data('intensity'),
					speed = $this.data('speed'),
					revers = $this.data('revers');
				if (!direction) {
					direction = 'xy';
				}
				if (!intensity) {
					intensity = 3;
				}
				if (!speed) {
					speed = 100;
				}
				if (!revers) {
					revers = false;
				}
				$this.css({ transition: (speed / 1000) + 's' });
				$window.mousemove(function (event) {
					var left = event.clientX,
						top = event.clientY,
						windowWidth = $window.width(),
						windowHeight = $window.height();
					if (revers) {
						moveX = ((left - windowWidth / 2) * intensity / 100 * -1).toFixed(),
							moveY = ((top - windowHeight / 2) * intensity / 100 * -1).toFixed();
					} else {
						moveX = ((left - windowWidth / 2) * intensity / 100).toFixed(),
							moveY = ((top - windowHeight / 2) * intensity / 100).toFixed();
					}
					inVisible($this);
					function inVisible(element) {
						var topScroll = $(document).scrollTop(),
							screenHeight = $(window).height(),
							bottomScroll = topScroll + screenHeight,
							elementHeight = element.height(),
							elementTop = element.offset().top,
							elementBottom = elementTop + elementHeight;
						if (elementTop < bottomScroll && elementBottom > topScroll) {
							if (direction == 'xy') {
								$this.css({ transform: 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)' });
							}
							else if (direction == 'x') {
								$this.css({ transform: 'translateX(' + moveX + 'px)' });
							}
							else if (direction == 'y') {
								$this.css({ transform: 'translateY(' + moveY + 'px)' });
							}
						}
					};
				});
			});
		}
	};
	parallaxMove($('.js-parallaxMouse'));

	// Анимация в блоке token
	function animateSkills(block) {
		var row = block.find('.js-token-row');
		row.each(function () {
			var scrollTop = false,
				countNumberStatus = true,
				countNum = $(this).find('.token__percent'),
				line = $(this).find('.token__line'),
				blockPosition = countNum.offset().top,
				value = countNum.data('value'),
				valDuration = countNum.data('duration');
			countNum.html(0);
			animate();
			$(window).scroll(function () {
				animate();
			});
			function animate() {
				scrollTop = $(window).scrollTop() + $(window).height();
				if (scrollTop > blockPosition && countNumberStatus) {
					block.addClass('active');
					$({ numberValue: 0 }).animate({ numberValue: value }, {
						duration: valDuration,
						easing: "swing",
						step: function (val) {
							countNum.html(Math.ceil(val) + ' %');
						}
					});
					line.animate({
						height: value + '%'
					}, valDuration);
					countNumberStatus = false;
				}
			}
		});
	};
	animateSkills($(".token__table"));

	// Присвоение класса при скролле
	function addClassForScroll(block) {
		if (block.length) {
			block.each(function () {
				var $this = $(this),
						scrollTop = false,
						countNumberStatus = true,
						blockPosition = $this.offset().top;
				addClass();
				$(window).scroll(function () {
					addClass();
				})
				function addClass() {
					scrollTop = $(window).scrollTop() + $(window).height();
					if (scrollTop > blockPosition && countNumberStatus) {
						$this.addClass('active');
						countNumberStatus = false;
					}
				}
			})
		}
	}
	addClassForScroll($('.js-addClassScroll'));

	// Вращение планеты при скролле
	function planetRotate(block) {
		block.each(function () {
			var $this = $(this),
					img = $this.find('img'),
					persent = false,
					$window = $(window);
			$window.scroll(function () {
			persent = parseInt($window.scrollTop() / 7);
			img.css('transform','rotate('+ persent + 'deg' +')')
			})
		})
	}
	planetRotate($('.js-rotateForScroll'));
	
});