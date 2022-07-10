let indicator = document.getElementById("year_indicator");
let DEFAULT_YEAR=2020;
let MIN_YEAR = 2019;
let MAX_YEAR = 2022;
let YEAR_DIFF = MAX_YEAR - MIN_YEAR+1;

function set_year(year)
{
    localStorage.setItem('chosen_year', year);

    $('.year_div').not('.'+String(year)).removeClass('is_active');
    $('.'+String(year)).addClass('is_active');

    let pos = (year - MIN_YEAR) / YEAR_DIFF*100 + '%';
    let wid = 100/YEAR_DIFF + '%';

    indicator.style.left = pos;
    indicator.style.width = wid;

    $('#year-label h2').text("Χρονιά: "+ year);
    
    initialize_page();
}


$(window).on("load",function() 
{
    if(localStorage.getItem('chosen_year')==null)
        set_year(DEFAULT_YEAR);
    else
        set_year(localStorage.getItem('chosen_year'));
});