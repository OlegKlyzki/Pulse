$(document).ready(function(){
	  $('.carousel__slider').slick({
		speed: 1200,
		accessibility: true,
		arrows: true,
		dots: false,
		dotsClass: 'slick-dots',
		prevArrow:
		'<button type="button" data-role="none" class="slick-prev"><img src="../img/carousel/prev_arrow.svg" alt="prev_arrow"></button>',
		nextArrow:
		'<button type="button" data-role="none" class="slick-next"><img src="../img/carousel/next_arrow.svg" alt="next_arrow"></button>',

		responsive: [{

			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				dots: true,
				arrows: false,
				infinite: true
			}
		
		  }, {
		
			breakpoint: 576,
			settings: {
				slidesToShow: 1,
				dots: true,
				arrows: false
			}
		
		  }, {

			breakpoint: 426,
			settings: {
				slidesToShow: 1,
				arrows: false,
				dots: true
			}

		  }, {

			breakpoint: 321,
			settings: {
				slidesToShow: 1,
				arrows: false,
				dots: true
			}

		  }, {
		
			breakpoint: 300,
			settings: "unslick" // destroys slick
		
		  }]
	  });
	});
	

(function($) {
	$(function() {
	  
		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
			$(this)
				.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
				.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
				.eq($(this).index())
				.addClass('catalog__content_active');
			});
		
		function toggleSlide(item) {
			$(item).each(function(i) {
				$(this).on('click', function(e) {
					e.preventDefault();
					$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
					$('.catalog-item__menu .catalog-item__list').eq(i).toggleClass('catalog-item__menu_active .catalog-item__list_active');
					$('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
				});
			});
		}

		toggleSlide('.catalog-item__link');
		toggleSlide('.catalog-item__back');

		// Modal

		$('[data-modal=consultation]').on('click', function() {
			$('.overlay, #consultation').fadeIn('slow');
		});
		$('.modal__close').on('click', function() {
			$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
		});
		
		$('.button_mini').each(function(i) {
			$(this).on('click', function() {
				$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
				$('.overlay, #order').fadeIn('slow');
			});
		});

		function validateForms(form) {
			$(form).validate({
				rules: {
					name: "required",
					phone: "required",
					email: {
						required: true,
						email: true
					}
				},
				messages: {
				   name: "Пожалуйста, введите ваше имя",
				   phone: "Пожалуйста, введите ваш номер телефона",
				   email: {
					required: "Пожалуйста, введите вашу почту",
					email: "Неправильно введен адрес почты"
				   }
				}
			});
		}

		validateForms('#consultation-form');
		validateForms('#consultation form');
		validateForms('#order form');

	   $('input[name=phone]').mask('+7 (999) 999-99-99');

	   $('form').submit(function(e) {
			e.preventDefault();

			if (!$(this).valid()) {
				return;
			}

			$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
			}).done(function() {
				$(this).find("input").val("");
				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn('slow');
				$('form').trigger('reset');
			});
			return false;
	   });

	   // Smooth scroll and page up
	   $(window).scroll(function() {
			if ($(this).scrollTop() > 1600) {
				$('.pageup').fadeIn();
			} else {
				$('.pageup').fadeOut();
			}
	   });

	   $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    	});
	});
	})(jQuery);
