$(document).ready(function(){

    let inp = $("#filter-input-text");
    inp.keyup(function(e){
        let table = $("#mean-table");
        let rows = table.find("tr");
        let val = inp.val();
        
        if(val.length > 0)
        {
            for (let i = 1;i < rows.length;i++)
            {
                let row = rows[i];
                let cells = row.children;
                let code = cells[0].innerHTML;

                if(code != val)
                {
                    row.style.display = "none";
                }
                else
                {
                    row.style.display = "table-row";
                }
            }
        }
        else {
            for(let i =1;i < rows.length;i++)
            {
                rows[i].style.display = "table-row";
            }
        }
    });
});

jQuery('.numbersOnly').keyup(function () { 
    this.value = this.value.replace(/[^0-9\.]/g,'');
});