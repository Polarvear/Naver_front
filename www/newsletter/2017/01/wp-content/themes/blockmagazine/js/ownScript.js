jQuery(document).ready(function(){
/*global jQuery:false */
/*jshint devel:true, laxcomma:true, smarttabs:true */
"use strict";

		jQuery('ul.medpost>li:nth-child(2n)').next().css({'clear': 'both'});

		// hide .scrollTo_top first
			jQuery(".scrollTo_top").hide();
		// fade in .scrollTo_top
		jQuery(function () {
			jQuery(window).scroll(function () {
				if (jQuery(this).scrollTop() > 100) {
					jQuery('.scrollTo_top').fadeIn();
				} else {
					jQuery('.scrollTo_top').fadeOut();
				}
			});
	
			// scroll body to 0px on click
		jQuery('.scrollTo_top a').click(function(){
			jQuery('html, body').animate({scrollTop:0}, 500 );
			return false;
		});
		});




	// trigger + show menu on fire
	  
        jQuery('a#navtrigger').click(function(){ 
                jQuery('#navigation').toggleClass('shownav'); 
                jQuery(this).toggleClass('active'); 
                return false; 
        });
		
		jQuery('a#navtrigger-sec').click(function(){ 
                jQuery('#topnav').toggleClass('shownav'); 
                jQuery(this).toggleClass('active'); 
                return false; 
        });




	/* Tooltips */
	jQuery("body").prepend('<div class="tooltip"><p></p></div>');
	var tt = jQuery("div.tooltip");
	
	jQuery("#topnav ul.social-menu li a").hover(function() {								
		var btn = jQuery(this);
		
		tt.children("p").text(btn.attr("title"));								
					
		var t = Math.floor(tt.outerWidth(true)/2),
			b = Math.floor(btn.outerWidth(true)/2),							
			y = btn.offset().top - -35,
			x = btn.offset().left - (t-b);
					
		tt.css({"top" : y+"px", "left" : x+"px", "display" : "block"});			
		   
	}, function() {		
		tt.hide();			
	});



	function lightbox() {
		// Apply PrettyPhoto to find the relation with our portfolio item
		jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			// Parameters for PrettyPhoto styling
			animationSpeed:'fast',
			slideshow:5000,
			theme:'pp_default',
			show_title:false,
			overlay_gallery: false,
			social_tools: false
		});
	}
	
	if(jQuery().prettyPhoto) {
		lightbox();
	}

});