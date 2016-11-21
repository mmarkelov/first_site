$( document ).ready(function() {

  smoothScroll(400);
  workBelt();
  workLoad();
  interestStuff();

  $("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
  $(".biglink").fitText(1.5);

});

function workLoad() {
	$.ajaxSetup({ cache: true });
	$('.unit').click(function() {

		var $this = $(this),
			newTitle = $this.find('strong').text(),
			newFolder = $this.data('folder'),
			spinner = '<div class="loader">Loading...</div>',
			newHTML = 'https://mmarkelov.github.io/first_site/work/' + newFolder + '.html';
		$('.project-load').html(spinner).load(newHTML);
		$('.project-title').text(newTitle);
	});
};

function workBelt() {
	$('.unit').click(function() {
		$('.work-belt').css('left', '-100%');
		$('.work-container').show();
	});

	$('.work-return').click(function() {
		$('.work-belt').css('left', '0%');
		$('.work-container').hide(800);
	});
};

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
};

function interestStuff() {
	$('.interest-unit').first().addClass('active-interest');
	$('.interest-logo').first().addClass('active-interest');
	$('.mobile-nav span').first().addClass('active-interest');

	$('.interest-logo, .mobile-nav span').click(function() {
		var $this = $(this),
			$siblings = $this.parent().children(),
			position = $siblings.index($this);
		$('.interest-unit').removeClass('active-interest').eq(position).addClass('active-interest');
		$siblings.removeClass('active-interest');
		$this.addClass('active-interest');
	});

	$('.control-next, .control-prev').click(function() {
		var $this = $(this),
			curActiveInterest = $('.interests-belt').find('.active-interest'),
			position = $('.interests-belt').children().index(curActiveInterest)
			interestNum = $('.interest-unit').length;

		if ($this.hasClass('control-next')) {
			if (position < interestNum - 1) {
				$('.active-interest').removeClass('active-interest').next().addClass('active-interest');
			} else {
				$('.interest-unit').removeClass('active-interest').first().addClass('active-interest');
				$('.interest-logo').removeClass('active-interest').first().addClass('active-interest');
			}
		} else {
			if (position === 0) {
				$('.interest-unit').removeClass('active-interest').last().addClass('active-interest');
				$('.interest-logo').removeClass('active-interest').last().addClass('active-interest');
			} else {
				$('.active-interest').removeClass('active-interest').prev().addClass('active-interest');
			}

		}
	});
}

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );