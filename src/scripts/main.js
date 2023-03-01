$(document).ready(function () {
    $(document).on('click', '.js-disclaimer-close', function () {
        $(this).parents('.js-disclaimer').slideUp();
    });

    $('.navbar-toggle').on('click', function(){
        $('.cd-menu-icon').toggleClass('is-clicked');
        $('.header').toggleClass('menu-is-open');

        if( $('.main_menu').hasClass('is-visible') ) {
            $('.main_menu').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('.main_menu').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                $('body').addClass('overflow-hidden');
            });
        }
    });

    const headerHeight = $('.header').height() + 'px';

    $(window).scroll(function () {
        $(window).resize(function () {
            if ($(window).width() >= 1170) {

                "use strict";
                const b = $(window).scrollTop();


                if (b > 60 && !$(".fix-menu").hasClass("header-fixed")) {
                    $(".fix-menu").addClass("header-fixed");
                    $(".header").addClass("header-fixed-wrap");
                    $('body').css('padding-top', headerHeight);
                } else if (b <= 60 && $(".fix-menu").hasClass("header-fixed")) {
                    $(".fix-menu").removeClass("header-fixed");
                    $(".header").removeClass("header-fixed-wrap");
                    $('body').css('padding-top', '0');
                }

            }
            else if ($(window).width() < 1170) {
                $(".fix-menu").removeClass("header-fixed");
                $(".header").removeClass("header-fixed-wrap");
            }

        }).resize();

    });

    let div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    if (screen.width <= 767) {
        $('.js-inter-map-layer').addClass('js-open-modal');
    }

    let renderClickableBG = (isDark, elementToClose, renderParent=$('body'), map=false) => {
        renderParent.append('<div class="clickable-bg"></div>');
        if (isDark) {
            $('.clickable-bg').addClass('clickable-bg--dark').fadeOut(1).fadeIn(400);
        }
        $('.clickable-bg').on('click', function () {
            $(this).remove();
            if (elementToClose) {
                elementToClose.removeClass('opened');
                if (!map) {
                    $('body').removeClass('modal-opened').css('padding-right', 0);
                }
            }
        })
    }

    $('.js-open-modal').on('click', function (e) {
        e.preventDefault();
        const modalId = $(this).attr('data-modal');
        const modalToOpen = $(`#${modalId}`)
        modalToOpen.addClass('opened');
        $('body').addClass('modal-opened').css('padding-right', scrollWidth);
        renderClickableBG(true, modalToOpen, modalId !== 'modal-map' ? modalToOpen : $('body'))
    })

    $('.js-close-modal').on('click', function () {
        $(this).parents('.modal').removeClass('opened');
        $(this).siblings('.modal-map').removeClass('opened');
        $('body').removeClass('modal-opened').css('padding-right', 0);
        $('.clickable-bg').remove();
    })

    $('.js-open-modal[data-modal="modal-map"]').on('click', function () {
        $('.modal-map').scrollLeft($('.modal-map').width() / 2);
    })

    if (screen.width <= 767) {
        $('.map-point__marker').removeAttr('href');
        $('.modal-map .map-point').on('click', function () {
            renderClickableBG(false, $('.map-point'), $('.inter-map__pic'), true)
            $('.modal-map .map-point').removeClass('opened')
            $(this).addClass('opened')
        });
        $('.js-main-map .map-point').on('click', function () {
            renderClickableBG(false, $('.map-point'), $('body'), true)
            $('.js-main-map .map-point').removeClass('opened')
            $(this).addClass('opened')
        })
    }

    const mainSlider = new Swiper('.js-main-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.arrow--next',
            prevEl: '.arrow--prev',
        },
        breakpoints: {
            1200: {
                slidesPerView: 2,
                spaceBetween: 30
            },
        }
    });

    const itemsImagesSlider = new Swiper('.js-item-img-slider', {
        loop: true,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
        },
    });

    const foodSlider = new Swiper('.js-food-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoHeight: true,
        lazy: true,
        navigation: {
            nextEl: '.arrow--next',
            prevEl: '.arrow--prev',
        },
        breakpoints: {
            991: {
                slidesPerView: 4,
                spaceBetween: 5,
            },
            600: {
                slidesPerView: 3,
            },
            420: {
                slidesPerView: 2,
            },
        }
    });

    const api = $('#gallery').unitegallery({
        gallery_theme: "grid",
        theme_panel_position: "bottom",
        gallery_height:504,
        slider_control_swipe: true,
        slider_control_zoom:false,
        slider_enable_arrows: true,
        slider_enable_progress_indicator: true,
        slider_enable_play_button: false,
        slider_enable_fullscreen_button: false,
        slider_enable_zoom_panel: false,

        gridpanel_enable_handle: false,
        grid_num_rows: 1,
        gridpanel_vertical_scroll:false,
        gridpanel_padding_border_top: 22,
        gridpanel_padding_border_bottom: 22,
        grid_space_between_cols: 22,

    });

    $('body').on('click','.ug-slider-wrapper', function(){
        api.nextItem();
    });



    let initialBtnText;
    let initialStartHeight;
    $(document).on('click', '.js-read-more-toggle', function () {
        let initHeight = $(this).prev('.js-read-more').find($('.js-read-more-container')).height();
        if (!$(this).hasClass('opened')) {
            initialBtnText = $(this).text();
            initialStartHeight = $(this).prev('.js-read-more').height();
            $(this).prev('.js-read-more').animate({
                height: initHeight
            }, 300);
            $(this).addClass('opened');
            $(this).find('.read-more-toggle-text').text('Скрыть');
            $(this).prev('.js-read-more').addClass('opened')
        } else {
            $(this).prev('.js-read-more').animate({
                height: initialStartHeight,
            }, 300);
            $(this).removeClass('opened');
            $(this).find('.read-more-toggle-text').text(initialBtnText);
            $(this).prev('.js-read-more').removeClass('opened')
        }
    });

    if (screen.width > 768) {
        $('.js-dropdown-toggle').on('mouseover', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).find('.js-dropdown').addClass('dropdown-opened');
            }
        });

        $('.js-dropdown-toggle').on('mouseout', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('.js-dropdown').removeClass('dropdown-opened');
            }
        });
    }
    if (screen.width < 768) {
        $('.js-mobile-dropdown-toggle').on('click', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $(this).siblings('.js-dropdown').slideDown();
            }
            else {
                $(this).removeClass('active');
                $(this).siblings('.js-dropdown').slideUp();

            }
        });
    }


    $('#ReviewsForm_date_from').datepicker({
        minDate: new Date(),
        autoClose: true,
        onSelect: function(formattedDate, date, inst){
            console.log(123);
            datepickerTo.update('minDate', date)
        },
    })

    const datepickerTo = $('#ReviewsForm_date_to').datepicker({
        minDate: new Date(),
        autoClose: true,
    }).data('datepicker');

    $('.slide_head').click(function(e){
        e.preventDefault();
        $(this).parent().find('.slide_text').slideToggle();
        $(this).parent().toggleClass('active');
    });

});


