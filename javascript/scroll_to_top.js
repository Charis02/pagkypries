$(document).ready(function(){
    let btn = $("#top-button");
    let header = $("#header");
    let mobile_header = $("#mobile-header");

    header.css("position", "sticky");
    header.css("top", "0");
    mobile_header.css("position", "sticky");
    mobile_header.css("top", "0");

    $(window).scroll(function(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.css('display', 'flex');
        value = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

      btn.css('opacity',Math.min(1,(value)/10000));

      if(document.body.scrollTop > 8000 || document.documentElement.scrollTop > 8000){
          header.fadeOut(200);
            mobile_header.fadeOut(200);
      }
      else
        {
            header.fadeIn(200);
            mobile_header.fadeIn(200);
        }

      header.css('opacity',Math.max(0,(10000-value)/10000));
      mobile_header.css('opacity',Math.max(0,(10000-value)/10000));
    } 
    else {
        btn.css('display', 'none');
        btn.css('opacity',0);

        header.show();
        header.css('opacity',1);

        mobile_header.show();
        mobile_header.css('opacity',1);
    }});


    btn.click( function() {
        $("html, body").animate({scrollTop:0}, 600);
    });
});