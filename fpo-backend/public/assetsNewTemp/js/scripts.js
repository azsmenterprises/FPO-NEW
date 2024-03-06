/*+++++++++++++++++++++
=====================================
 Company Name : Aashdit Technologies LLP
 Author Name : Kishore Kumar Jena
 Version : 1.1
===============================
+++++++++++++++++++*/

jQuery(function($){

'use strict';

    // ----------------------------------------------
    // Preloader
    // ----------------------------------------------
    (function () {
        $(window).load(function() {
            getSize();
            $('#pre-status').fadeOut();
            $('#st-preloader').delay(350).fadeOut('slow');
        });
    }());

    /***************Overflow Nav Focus***************/
    window.onresize = navigationResize;
        navigationResize();

        function navigationResize(navItemWidth) {  
          $('#mainNavCon li.more').before($('#overflow > li'));
          
          var $navItemMore = $('#mainNavCon > li.more'),
                $navItems = $('#mainNavCon > li:not(.more)'),
              navItemMoreWidth = navItemWidth = $navItemMore.width(),
              windowWidth = ($('#st-navbar-collapse').width())-10,
              navItemMoreLeft, offset, navOverflowWidth;
          
          $navItems.each(function() {
            navItemWidth += $(this).width();
          });
          
          navItemWidth > windowWidth ? $navItemMore.show() : $navItemMore.hide();
            
          while (navItemWidth > windowWidth) {
            navItemWidth -= $navItems.last().width();
            $navItems.last().prependTo('#overflow>ul');
            $navItems.splice(-1,1);
          }
          
          navItemMoreLeft = $('#mainNavCon .more');
          navOverflowWidth = $('#overflow').width();  
          offset = navItemMoreLeft + navItemMoreWidth - navOverflowWidth;
        }


        $("#btn_overflowMenuHide").click(function(){
            $("#mainNavCon>li.more #overflow").toggleClass("overflowMenuHide");
        });

    /***************Overflow Nav Focus***************/
    /***************Top Nav Focus***************/
      $('#accessibilityNav').find('li').each(function(index, element) {
            $(this).children('a').focus(function(e) {
                $(this).parent('li').addClass('menuActive');
            });
        });

        $('#accessibilityNav>li>a').focusin(function(e) {
            $('#accessibilityNav').find('li').each(function(index, element) {
                $(this).removeClass('menuActive');
            });
            $(this).addClass('menuActive');

        });

        $("#accessibilityNav>li:last-child ul li:last-child").focusout(function(e) {
            $("#accessibilityNav>li:last-child").removeClass("menuActive")
        });

        $('#accessibilityNav>li>a').click(function(e) {
            $(this).addClass('menuActive');
            $(this).next('ul').addClass('visible');
        });

         $("#accessibilityNav>li>a").mouseout(function(){
          $('#accessibilityNav>li').removeClass('open menuActive');
        });
    /***************Top Nav Focus***************/

    /***************Main Nav Focus***************/
      $('#mainNavCon').find('li').each(function(index, element) {
            $(this).children('a').focus(function(e) {
                $(this).parent('li').addClass('mainMenuActive');
            });
        });

        $('#mainNavCon>li>a').focusin(function(e) {
            $('#mainNavCon').find('li').each(function(index, element) {
                $(this).removeClass('mainMenuActive');
            });
            $(this).addClass('mainMenuActive');
        });

        $("#mainNavCon>li:last-child ul li:last-child").focusout(function(e) {
            $("#mainNavCon>li:last-child").removeClass("mainMenuActive")
        });

        $("#mainNavCon>li>ul>li>ul>li:last-child").focusout(function(e) {
            $("#mainNavCon>li>ul>li").removeClass("mainMenuActive")
        });

        $('#mainNavCon>li>a').click(function(e) {
            $(this).addClass('mainMenuActive');
            $(this).next('ul').addClass('visible');
        });

        $("#mainNavCon>li>a").mouseout(function(){
          $('#mainNavCon>li').removeClass('mainMenuActive');
        });

        /***************Main Nav Focus End***************/



        $('body>.content_body').click(function(e) {
            $('#mainNavCon>li').removeClass('mainMenuActive');
            $("#mainNavCon>li.more #overflow").addClass("overflowMenuHide");
        });

        $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
               $('#mainNavCon>li').removeClass('mainMenuActive');
               $("#mainNavCon>li.more #overflow").addClass("overflowMenuHide");
            }
        });        
    
       
    
		
    $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
    });

    $('.scroll-up a').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
	
    $('#btn_SkipToContent a[href*="#"]:not([href="#"])').click(function() {
        var skipTo="#"+this.href.split('#')[1];
            $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
                $(this).removeAttr('tabindex');
        }).focus(); 
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 600);
            return false;
          }
        }

      });

    $('[data-toggle="tooltip"]').tooltip(); 
    $('[data-toggle="popover"]').popover(); 

    $('#bodyBlack').click(function(){
        $('html').toggleClass('bodyBlackTheme');
    });
    $('#bodyDefault').click(function(){
        $('html').removeClass('bodyBlackTheme');
    });

    $('.documents_tab .nav-tabs>li>a').focus(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

});

/******************NAV MENU************************/

function getSize(){
var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(w>991)
        {
            $('#overflow>ul>li>a').focusin(function(e) {
                $('#overflow>ul').find('li').each(function(index, element) {
                    $(this).removeClass('mainMenuActive');
                });
                $(this).addClass('mainMenuActive');
            });

        $("#overflow>ul>li:last-child ul li:last-child").focusout(function(e) {
            $("#overflow>ul>li:last-child").removeClass("mainMenuActive");
            $("#mainNavCon>li.more #overflow").addClass("overflowMenuHide");
        });
            $("#mainNavCon>li.more>button").focus(function(){
                $("#mainNavCon>li.more #overflow").toggleClass("overflowMenuHide");
            });

            /*var homeSliderHeight = ($(window).height()) - 170;
            $('#slider').height(homeSliderHeight);*/
        }
    else if(w<992){

        $("#mainNavCon>li.more>button").click(function(){
            $("#mainNavCon>li.more #overflow").toggleClass("overflowMenuHide");
        });
        $('#overflow>ul>li>a').click(function(e) {
                $('#overflow>ul').find('li').each(function(index, element) {
                    $(this).removeClass('mainMenuActive');
                });
                $(this).addClass('mainMenuActive');
            });
            /*var ResponsiveHomeSliderHeight = w / 2.969;
            $('#slider').height(ResponsiveHomeSliderHeight);*/
    }
}

