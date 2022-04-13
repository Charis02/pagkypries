$(document).ready(function() {
    let ison = false;

    $(document).click(function(event) {
        console.log(event.target);
        if ($(event.target).hasClass("dropdown-related") == false)
        {
            if (ison) {
                $(".mobile-header-dropdown-content").hide(1000);
                ison = false;
            }
        }
    });

    $(document).on('click',".mobile-header-dropdown",function() {
        
        if (ison) {
            $(".mobile-header-dropdown-content").hide(1000);
            ison = false;
        } else {
            $(".mobile-header-dropdown-content").show(1000);
            ison = true;
        }
    });

});