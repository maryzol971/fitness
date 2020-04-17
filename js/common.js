 $(document).ready(function(){

    // Header

 	 $(".header_title_nav a").on("click", function(event){
    	event.preventDefault();

    	var scrollTo = $(this).data("scrollto"); // .services
    	var scrollTop = $(scrollTo).offset().top; // 1080 number

    	$("body, html").animate({
    		scrollTop: scrollTop
    	}, 2000);
    });


    $(".header_body_inf a").on("click", function(event){
    	event.preventDefault();

        var scrollTo = $(this).data("scrollto"); 
    	var scrollTop = $(scrollTo).offset().top; 

    	$("body, html").animate({
    		scrollTop: scrollTop
    	}, 2000);
    });

  //  DATA-SCROLLTO без вызова по ID
    // $("[data-scrollto]").on("click",function(e){
    //     e.preventDefault();

    //     var st = $($(this).data("scrollto")).offset().top;

    //     $("body,html").animate({
    //         scrollTop: st
    //     }, 1500);
    //     console.log(st);

    // });


    //При клике на любое место экрана сворачивается выпадающее окно
    $("body, html").on("click",function(e){
        e.stopPropagation();
        $(".burger").removeClass("is-active");
        $(".header_title_nav").removeClass("is-show")
    });

    //При клике на burger он становится активным и
    // появляется выпадающее окно
    $(".burger").on("click",function(e){
        e.stopPropagation();
        $(this).toggleClass("is-active");
        $(".header_title_nav").toggleClass("is-show");
    });

    
    //Для активации "Услуги"
    $(".header_title_nav li").on("click",function(e){
        e.preventDefault();
        $(".header_title_nav li").removeClass("is-active");
        $(this).addClass("is-active");
    });                                  



    // Services

    $(".services_item").on("mouseover", function(){

        var text = $(this).data("text");
        var ind = $(this).index();

        $(".services_descr").addClass("to-left");
        setTimeout(function(){
           $(".services_descr").text(text);
           $(".services_descr").removeClass("to-left");
           $(".services_descr").attr("data-label","lab_"+ind);
        }, 300);
    });

    
    // Для активации первой строки
    $(".services_item").on("click",function(){
    $(".services_item").removeClass("is-active");
    $(this).addClass("is-active");
    });                             



       // Couches

    var couchesSlider = $(".couches_slider");
    couchesSlider.owlCarousel({
    	items: 3,
    	dots: false, 
    	nav: true,
    	navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
    	'<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    	responsive:{
    		0:{
    			items:1
    		},
    		768:{
    			items:2
    		},
    		1025:{
    			items:3
    		}
    	}

    });
     	


    //  Cards

 	var cardsSlider = $(".cards_slider");
 	cardsSlider.owlCarousel({
 		items: 4,
 		dots: false,
 		nav: true,
 		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
    	'<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    	responsive:{
    		0:{
    			items:1
    		},
    		768:{
    			items:2
    			// loop: true
    		},
    		769:{
    			items:3
    		},
    		1366:{
    			items:4
    		}
    	}

 		// onInitialized: function(item){
 		// 	console.log("Has been initialized", item);
 		// },
 		// onTranslated: function(item){
 		// 	console.log("Has been translated", item.item);
 		// }
    });


    function setControll(e) {

        return function(e) {
            var controll = $("#" + $(e.currentTarget).data("controll")).find("input");
            var count = e.item.count - e.page.size;

            $(controll).attr("min",0);
            $(controll).attr("max",count);
            $(controll).val(0);

            $(controll).on("input change", function(){
                var val = $(this).val();
                $(e.currentTarget).trigger("to.owl.carousel",[val,600]);
            });

            return controll;
        }
    }


    // Promo

    var promoSlider = $(".promo_slider");
    promoSlider.owlCarousel({
    	items: 3,
    	loop: true,
    	dots: false,
    	nav: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive : {
            0 : {
                items: 1
            },
            768 : {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });


    // Gallery

// Автоматическое изменение margin-bottom в зависимости от размера margin-right
//и авт. изменение height в зависимости от ширины блока .gallery_elem
    var mr = $(".gallery_body .gallery_elem").eq(0).css("marginRight");

    $(".gallery_body .gallery_elem").each(function(){
        var h = $(this).width() * 0.65;
        console.log($('h'));
        $(this).height(h).css("marginBottom", mr)
        var bg = $(this).css("backgroundImage").split('url(')[1];
        console.log($('bg'));
        console.log($('bg.length'));
        bg = bg.slice(0, bg.length - 2);
        bg = bg.slice(1, bg.length);

        if(!$(this).hasClass("js-link")) {
            $(this).attr("href",bg);
        }
    });




    $('.gallery_title_navigat li').on('click', function(e){

        e.preventDefault();
        e.stopPropagation();

        $('.gallery_title_navigat li').removeClass('is-active');
        $(this).addClass('is-active');
   

        var sort = $(this).text();
        $('.gallery_body .gallery_elem').each(function() {
            $(this).data('sort') != sort ? $(this).fadeOut(0) : $(this).fadeIn(200);
        })
    });

    $('body, html').on('click', function(e) {
        e.preventDefault();
        $('.gallery_body .gallery_elem').fadeIn(200);
    })



    $('.gallery_container').magnificPopup({
        // delegate: 'a:not(.js-link)',
        // type: 'image',
        // tLoading: 'Loading image #%curr%...',
        // mainClass: 'mfp-img-mobile',
        // gallery: {
        //     enabled: true,
        //     navigateByImgClick: true,
        //     preload: [0,1]     Will preload 0 - before current, and 1 after the current image
        // },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title');
            }
        }
    });    



    // JS-Modal

    $('.js-modal').magnificPopup();


    $(".modal_form").on("submit",function(e){

        e.preventDefault();
        //console.log( $(this).serialize());

        var serData = $(this).serialize();
        var that = this;

        $.post("/action.php",serData,function(data){
            $(".send_state").html(data);
            that.reset();
            setTimeout(function() {
            $(".send_state").fadeIn(500);
            }, 300);
       })
    });



    if($(window).width() <= 1024){
    // Mobile version

        $(".slide_item").on("touchstart", function(){
            $(this).toggleClass("hovered");
        });
    }

    else {
        $(".slide_item").on("mouseover", function(){
            $(this).addClass("hovered");
        });

    $(".slide_item").on("mouseleave", function(){
        $(this).removeClass("hovered");
    });

    }

     // var bg = $(this).css("backgroundImage").split('url(')[1];

});



