/*
    Twenty by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    skel.breakpoints({
        wide: '(max-width: 1680px)',
        normal: '(max-width: 1280px)',
        narrow: '(max-width: 980px)',
        narrower: '(max-width: 840px)',
        mobile: '(max-width: 736px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Disable animations/transitions until the page has loaded.
            $body.addClass('is-loading');

            $window.on('load', function() {
                $body.removeClass('is-loading');
            });

        // CSS polyfills (IE<9).
            if (skel.vars.IEVersion < 9)
                $(':last-child').addClass('last-child');

        // Fix: Placeholder polyfill.
            $('form').placeholder();

        // Prioritize "important" elements on narrower.
            skel.on('+narrower -narrower', function() {
                $.prioritize(
                    '.important\\28 narrower\\29',
                    skel.breakpoint('narrower').active
                );
            });

        // Scrolly links.
            $('.scrolly').scrolly({
                speed: 1000,
                offset: -10
            });

        // Dropdowns.
            $('#nav > ul').dropotron({
                mode: 'fade',
                noOpenerFade: true,
                expandMode: (skel.vars.touch ? 'click' : 'hover')
            });

        // Off-Canvas Navigation.

            // Navigation Button.
                $(
                    '<div id="navButton">' +
                        '<a href="#navPanel" class="toggle"></a>' +
                    '</div>'
                )
                    .appendTo($body);

            // Navigation Panel.
                $(
                    '<div id="navPanel">' +
                        '<nav>' +
                            $('#nav').navList() +
                        '</nav>' +
                    '</div>'
                )
                    .appendTo($body)
                    .panel({
                        delay: 500,
                        hideOnClick: true,
                        hideOnSwipe: true,
                        resetScroll: true,
                        resetForms: true,
                        side: 'left',
                        target: $body,
                        visibleClass: 'navPanel-visible'
                    });

            // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
                if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
                    $('#navButton, #navPanel, #page-wrapper')
                        .css('transition', 'none');

        // Header.
        // If the header is using "alt" styling and #banner is present, use scrollwatch
        // to revert it back to normal styling once the user scrolls past the banner.
        // Note: This is disabled on mobile devices.
            if (!skel.vars.mobile
            &&  $header.hasClass('alt')
            &&  $banner.length > 0) {

                $window.on('load', function() {

                    $banner.scrollwatch({
                        delay:      0,
                        range:      1,
                        anchor:     'top',
                        on:         function() { $header.addClass('alt reveal'); },
                        off:        function() { $header.removeClass('alt'); }
                    });

                });

            }


            // $("#some_tag").on("click", function(e){
            //     $('html, body').animate({
            //         scrollTop: $("#specific_place").offset().top  // 只需修改此處
            //     }, 750);  // 750是滑動的時間，單位為毫秒
            //     e.preventDefault();
            // });

            // 幫 a.abgne_gotoheader 加上 click 事件
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $('#nav a').on('click', function(){
                $(this).parent().addClass('current').siblings().removeClass('current');
                $body.animate({
                    scrollTop: $( $(this).attr('href') ).offset().top - 200,
                }, 1000, 'easeInOutCubic');
         
                return false;
            });

            $('#logo a').on('click', function(){
                $body.animate({ scrollTop: 0 }, 1000, 'easeInOutCubic');
                return false;
            });
    });
})(jQuery);