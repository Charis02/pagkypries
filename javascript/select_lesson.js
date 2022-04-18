function change_lesson() 
{
    let table = $("#table");
    let rows = table.find("tr");
    let code = "lesson-"+$("#lesson-selector").val();

    // set input valute to empty
    $("#filter-input-text").val("");

    for (let i = 1;i < rows.length;i++)
    {
        let row = rows[i];

        if(!row.classList.contains(code))
        {
            row.style.display = "none";
        }
        else
        {
            row.style.display = "table-row";
        }
    }
}

$(document).ready(function(){
    let inp = $("#filter-input-text");

    inp.keyup(function(e){
        let table = $("#table");
        let rows = table.find("tr");
        let val = inp.val();
        let lesson_code = "lesson-"+$("#lesson-selector").val();
        
        if(val.length > 0)
        {
            console.log("here");
            for (let i = 1;i < rows.length;i++)
            {
                let row = rows[i];
                let cells = row.children;
                let code = cells[0].innerHTML;

                if(code != val || !row.classList.contains(lesson_code))
                {
                    row.style.display = "none";
                }
                else
                {
                    row.style.display = "table-row";
                }
            }
        }
        else 
        {
            for(let i =1;i < rows.length;i++)
            {
                if(rows[i].classList.contains(lesson_code))
                    rows[i].style.display = "table-row";
                else
                    rows[i].style.display = "none";
            }
        }
    });
});
    
$('.numbersOnly').keyup(function () { 
    this.value = this.value.replace(/[^0-9\.]/g,'');
});