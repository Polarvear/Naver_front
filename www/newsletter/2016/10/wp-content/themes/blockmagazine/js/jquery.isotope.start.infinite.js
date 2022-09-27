jQuery(window).load(function(){

	(function($){
		var $container = $('.isotope'),
			$containerProxy = $container.clone().empty().css({ visibility: 'hidden' });	// create a clone that will be used for measuring container width

		$container.after( $containerProxy );

		// get the first item to use for measuring columnWidth
		var $item = $container.find('.item').eq(0);
		$container.imagesLoaded(function(){
			$(window).smartresize( function() {

		  		// calculate columnWidth
		  		var colWidth = Math.floor( $containerProxy.width() / 8 ); // Change this number to your desired amount of columns

				var screenSize	= colWidth * 8;

				// screen size is suitable for Tablet and PC
				if(screenSize > 768) {
					// set width of container based on columnWidth
					$container.css({
						//width: colWidth * 8 // Change this number to your desired amount of columns
						width: screenSize // Change this number to your desired amount of columns
					})
					.isotope({
					  // disable automatic resizing when window is resized
					  resizable: true,

					  // set columnWidth option for masonry
					  masonry: {
						columnWidth: colWidth
					  }
					});
				}
				// screen size is suitable for Mobile
				else {
					// set width of container based on columnWidth
					$container.css({
						//width: colWidth * 8 // Change this number to your desired amount of columns
						width: screenSize // Change this number to your desired amount of columns
					})
					.isotope({
					  // disable automatic resizing when window is resized
					  resizable: true,
					  getSortData: {
						  number: function(item) {
							  return parseInt(item.find('.number').text());
						  }
					  },
					  sortBy: 'number',
					  //category: '[data-mobile-order]',
					  //sortBy: 'number'
					  // set columnWidth option for masonry
					  masonry: {
						columnWidth: colWidth,
						//layoutMode: 'cellsByColumn'
					  }
					});
				}

		  // trigger smartresize for first time
		}).smartresize();
		 });

		$container.show()// show whole container

		// filter items when filter link is clicked
		$('#filters a').click(function(){
		$('#filters a.active').removeClass('active');
		var selector = $(this).attr('data-filter');
		$container.isotope({ filter: selector, animationEngine : "css" });
		$(this).addClass('active');
		return false;

		});


      $container.infinitescroll({
        navSelector  : '.nav-previous',    // selector for the paged navigation
        nextSelector : '.nav-previous a',  // selector for the NEXT link (to page 2)
        itemSelector : '.item',     // selector for all items you'll retrieve
        loading: {
            finishedMsg: 'No more pages to load.',
            img: 'http://i.imgur.com/qkKy8.gif'
          }
        },
        // call Isotope as a callback
		function(newElements) {
		  var $newElems = $(newElements).css({zIndex : 0, });
		  $newElems.imagesLoaded(function(){
			$container.isotope('appended', $newElems );
		  });
		}
      );

	//kill scroll binding
		$(window).unbind('.infscr');
		$('.nav-previous a').click(function(){$container.infinitescroll('retrieve');return false;});
	// remove this "kill" code to automatic infinite scroll

	})(jQuery);
});
