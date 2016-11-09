$(document).ready(function(){

	function fix(){
		//$('.body-top-section').css({'min-height':$(window).height()+'px'});

		var navbar_pos = $('.navbar.main').offset();

		$(window).bind('scroll', function() {
			if ($(window).scrollTop() > navbar_pos.top) {
				$('.navbar.main').addClass('navbar-fixed-top');
				$('.container.main').css({'padding-top':'130px'});
			}else {
				$('.navbar.main').removeClass('navbar-fixed-top');
				$('.container.main').css({'padding-top':'0'});

			}
		});

	};

	fix();

	$(window).resize(fix);
	var $sidebar   = $("#sidebar"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 130;


    $(window).bind('scroll', function() {


        // if ($window.scrollTop() > offset.top) {
        //     $sidebar.stop().animate({
        //         marginTop: $window.scrollTop() - offset.top + topPadding
        //     });
        // } else {
        //     $sidebar.stop().animate({
        //         marginTop: 0
        //     });
        // }

    });


    /******************************************************/
    $('.featured-post ul.action li.mug a').click(function(e){
    	e.preventDefault();
    	$(this).parent().parent().toggleClass('child-expanded');
    	$('.featured-post ul.social-share-links').slideToggle();
    });

	$('a.btn-explore').click(function(e){
    	e.preventDefault();
    	$('body').stop().animate({scrollTop:$('div.container.main').offset().top-90}, 1000, 'swing');


    });

	/**********************************************************/
    var madness = [
    	'Unexpecting the expected',
    	'Lorem ipsum Dolor sit is a dummy',
    	'Here is a dummy mad text'
    ];
    var mad_counter = 2;

    function changeMadText(index){
    	console.log('mad_text '+index);
    	$('.body-top-section h2.madness').slideUp(function(){
    		$(this).html(madness[index-1]).slideDown();

    	});

    	setTimeout(function(){
	    	if(mad_counter>madness.length){
	    		mad_counter=1;
	    	}

	    	changeMadText(mad_counter++);


	    },3000);

    }

    changeMadText(1);

    /************************************************************************/
    var total_img =3;
    var img_counter =1;

    function changeMadImage(index){
    	console.log('nxt_img '+index);

    	$('.body-top-section img.mad-koffee').attr('src','images/home-mad-koffe/'+index+'.png');

    	setTimeout(function(){
	    	if(img_counter>total_img){
	    		img_counter=1;
	    	}

	    	changeMadImage(img_counter++);


	    },500);

    }

    changeMadImage(img_counter);

    /************************************************************************/



});
