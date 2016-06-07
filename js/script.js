//Page Preloader
$(window).load(function() {
	$("#intro-loader").delay(500).fadeOut();
	$(".mask").delay(1000).fadeOut("slow");
});

$(document).ready(function() {

	 
	

	//Elements Appear from left
	$('.item_left').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				left : "0px"
			}, 1000);
		});
	});
	 $('.intro-flexslider').flexslider({
			animation : "fade",
			touch: false,
			directionNav : false,
			controlNav : false,
			slideshowSpeed : 5000,
			animationSpeed : 600,
		});
		
		
		$('.nav a.int-collapse-menu').click(function() {
		$(".navbar-collapse").collapse("hide")
	});

	$('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
		e.stopPropagation();
	});
	
	
		
	
	 
	
	//Elements Appear from right
	$('.item_right').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				right : "0px"
			}, 1000);
		});
	});

	//Elements Appear in fadeIn effect
	$('.item_fade_in').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				right : "0px"
			}, 1000);
		});
	});

	

	$(".container").fitVids();

	$('a.external').click(function() {
		var url = $(this).attr('href');
		$('.mask').fadeIn(250, function() {
			document.location.href = url;
		});
		$("#intro-loader").fadeIn("slow");
		return false;
	});

	


	// Radial progress bar
	$('.cart').appear(function() {
		var easy_pie_chart = {};
		$('.circular-item').removeClass("hidden");
		$('.circular-pie').each(function() {
			var text_span = $(this).children('span');
			$(this).easyPieChart($.extend(true, {}, easy_pie_chart, {
				size : 250,
				animate : 2000,
				lineWidth : 6,
				lineCap : 'square',
				barColor : $(this).data('color'),
				lineWidth : 20,
				trackColor : '#2B2925',
				scaleColor : false,
				onStep : function(value) {
					text_span.text(parseInt(value, 10) + 1 + '%');
				}
			}));
		});
	});

	// Portfolio Isotope
	var container = $('#portfolio-wrap');
	container.isotope({
		animationEngine : 'best-available',
		animationOptions : {
			duration : 200,
			queue : false
		},
	});
	$('#filters a').click(function() {
		$('#filters a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		container.isotope({
			filter : selector
		});
		setProjects();
		return false;
	});
	function splitColumns() {
		var winWidth = $(window).width() + 15, columnNumb = 1;
		if (winWidth > 1200) {
			columnNumb = 4;
		} else if (winWidth > 992) {
			columnNumb = 2;
		} else if (winWidth > 767) {
			columnNumb = 2;
		} else if (winWidth < 767) {
			columnNumb = 1;
		}
		return columnNumb;
	}

	function setColumns() {
		var winWidth = $(window).width(), columnNumb = splitColumns(), postWidth = Math.floor(winWidth / columnNumb);
		container.find('.portfolio-item').each(function() {
			$(this).css({
				width : postWidth + 'px'
			});
		});
	}

	function setProjects() {
		setColumns();
		container.isotope('reLayout');
	}


	container.imagesLoaded(function() {
		setColumns();
	});
	$(window).bind('resize', function() {
		setProjects();
	});
	$('#portfolio-wrap .portfolio-item .portfolio').each(function() {
		$(this).hoverdir();
	});

	//Navigation Scrolling
	$(function() {
		
	});

	//Navigation Dropdown
	
	var onMobile = false;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	  if (jQuery(window).width() < 1200) {
	    onMobile = true;
	  }
	}

	//Back To Top
	$(window).scroll(function() {
		if ($(window).scrollTop() > 400) {
			$("#back-top").fadeIn(200);
		} else {
			$("#back-top").fadeOut(200);
		}
	});
	$('#back-top').click(function() {
		$('html, body').stop().animate({
			scrollTop : 0
		}, 1500, 'easeInOutExpo');
	});

	if ((onMobile === false ) && ($('.parallax-slider').length )) {
		skrollr.init({
			edgeStrategy : 'set',
			smoothScrolling : false,
			forceHeight : false
		});

	}

});

//FullScreen Slider

//Parallax

 