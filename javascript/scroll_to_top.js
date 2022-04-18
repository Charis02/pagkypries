$(document).ready(function(){
    let btn = $("#top-button");

    $(window).scroll(function(){
        
        let limit = Math.min(10000,$(document).height() - $(window).height());

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btn.css('display', 'flex');
            value = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

            btn.css('opacity',Math.min(1,(value)/limit));
        } 
        else {
            btn.css('display', 'none');
            btn.css('opacity',0);
    }});


    btn.click( function() {
        $("html, body").animate({scrollTop:0}, 600);
    });
});