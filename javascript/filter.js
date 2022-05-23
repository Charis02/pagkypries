$(document).ready(function(){

    let inp = $("#filter-input-text");
    inp.keyup(function(e){
        let rows = $("#table tr").not(".header");
        let val = inp.val().toString();
        
        if(val.length > 0)
        {
            rows.hide();
            rows.filter(function(){
                return $(this).find(".col0").text().indexOf(val) > -1;
            }).show();
        }
        else
            rows.show();
    });
});

jQuery('.numbersOnly').keyup(function () { 
    this.value = this.value.replace(/[^0-9\.]/g,'');
});