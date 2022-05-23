$(document).ready(function(){
    let inp = $("#filter-input-text");

    inp.keyup(function(e){
        let val = inp.val().toString();
        
        if(val.length > 0)
        {
            $("#table tr").hide();
            $("#table tr:contains('"+val+"')").show();
        }
        else 
        {
            $("#table tr").show();
        }
    });
});
    
$('.numbersOnly').keyup(function () { 
    this.value = this.value.replace(/[^0-9\.]/g,'');
});