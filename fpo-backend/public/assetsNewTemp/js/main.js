(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
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
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
	
	// font size

		jQuery(document).ready(function(){
		var $affectedElements = jQuery("p,body,a"); // Can be extended, ex. $("div, p, span.someClass")
			// Storing the original size in a data attribute so size can be reset
			$affectedElements.each( function(){
			  var $this = jQuery(this);
			  $this.data("orig-size", $this.css("font-size") );
			});

			jQuery("#btn-increase").click(function(){
			  changeFontSize(1);
			})

			jQuery("#btn-decrease").click(function(){
			  changeFontSize(-1);
			})

			jQuery("#btn-orig").click(function(){
			  $affectedElements.each( function(){
					var $this = jQuery(this);
					$this.css( "font-size" , $this.data("orig-size") );
			   });
			});

			function changeFontSize(direction){
				$affectedElements.each( function(){
					var $this = jQuery(this);
					$this.css( "font-size" , parseInt($this.css("font-size"))+direction );
				});
			}
});
		
	
	
	// countto figure
		(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }

});
		
		$(function(){
    $('.owl-carousel').owlCarousel({
        items: 3,
        loop: false,
        nav: false,
        margin: 0
    });
    // this code below enables drag and drop vertically. Unfortunately I was unable to disable horizontal drag and drop so it will remain active, but we already have something now =D
    $('.owl-carousel').data('owl.carousel').difference = function(first, second) {
    return {
        x: first.x - second.x + (first.y - second.y),
        y: first.y - second.y
    };
};
});

		
		// verticalCarousel
	$(".verticalCarousel").verticalCarousel({
                currentItem: 1,
                showItems: 3,
				autoplay: 1,
				loop: true,
            });
	
	
	// videos
	$(document).ready(function(){

            $('.videos video').click(function(){

                $(this).addClass('active').siblings().removeClass('active');

                var src = $(this).attr('src');
                $('.main-video video').attr('src',src);
            });
        });
	
	// schemes2
	 $(document).ready(function(){
			$("#schemes2").hide();
			$('#schemesOptions').on('change', function() {
				
              if ( this.value == 'option-1')
                {
                 $("#schemes").show();
				 $("#schemes2").hide();
                }
             if(this.value == 'option-2')
               {
               $("#schemes2").show();
			   $("#schemes").hide();
      }
    });
             $("schemesOptions").addClass('active');
         });
	 
	 
	// map_canvas

jQuery(function($) {
        <!-- Asynchronously Load the map API  -->
        var script = document.createElement('script');
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
        document.body.appendChild(script);
    });
    function initialize() {
        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            mapTypeId: 'roadmap'
        };
                        
        <!-- Display a map on the page -->
        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        map.setTilt(45);
            
        <!-- Multiple Markers -->
        var markers = [
            ['Bondi Beach', -33.890542, 151.274856, 4],
            ['Coogee Beach', -33.923036, 151.259052, 5],
            ['Cronulla Beach', -34.028249, 151.157507, 3],
            ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
            ['Maroubra Beach', -33.950198, 151.259302, 1]
        ];
                            
        <!-- Info Window Content -->
        var infoWindowContent = [
            ['<div class="info_content">' +
            '<h3>Bondi Beach</h3>' +
            '</div>'],
            ['<div class="info_content">' +
            '<h3>Coogee Beach</h3>' +
            '</div>'],
            ['<div class="info_content">' +
            '<h3>Cronulla Beach</h3>' +
            '</div>'],
            ['<div class="info_content">' +
            '<h3>Manly Beach</h3>' +
            '</div>'],
            ['<div class="info_content">' +
            '<h3>Maroubra Beach</h3>' +
            '</div>']
        ];
            
        <!-- Display multiple markers on a map -->
        var infoWindow = new google.maps.InfoWindow(), marker, i;
        
        <!-- Loop through our array of markers & place each one on the map   -->
        for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });
            
            <!-- Allow each marker to have an info window     -->
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            <!-- Automatically center the map fitting all markers on the screen -->
            map.fitBounds(bounds);
        }

        <!-- Override our map zoom level once our fitBounds function runs (Make sure it only runs once) -->
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(10);
            google.maps.event.removeListener(boundsListener);
        });
        
    }

	// map_canvas

// testimonial Slider
function testimonialSlider() {
    if ($('.testimonials-carousel').length) {
        $('.testimonials-carousel').owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            dots: true,
            autoplayHoverPause:false,
            autoplay: 6000,
            smartSpeed: 700,
            navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
            responsive:{
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1001: {
                    items: 3
                }
            }
        })
    }
}


// DOM ready function
jQuery(document).on('ready', function() {
    (function($) {
        
        testimonialSlider();
        
    })(jQuery);
});




    // Tranding carousel
    $(".tranding-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ]
    });

// Carousel item 1
    $(".carousel-item-0").owlCarousel({
        loop: true,
        autoplay: true,
        items: 3,
        nav: true,
        autoplayHoverPause: true,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp'
});
    // Carousel item 1
    $(".carousel-item-1").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });

    // Carousel item 2
    $(".carousel-item-2").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            750:{
                items:1
            },
            970:{
                items:2
            }
        }
    });


    // Carousel item 3
    $(".carousel-item-3").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            750:{
                items:1
            },
            970:{
                items:2
            },
            1170:{
                items:3
            }
        }
    });
    

    // Carousel item 4
    $(".carousel-item-4").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 15,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            750:{
                items:1
            },
            970:{
                items:2
            },
            1170:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });
    
})(jQuery);

