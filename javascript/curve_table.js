function sortFunc(a,b){
    if(a[2] < b[2]){
      return 1;
    }
    else if(a[2] > b[2]){
      return -1;
    }
    return 0;
  }

function process_data(data)
{
    let result = [];
    
    for(let code in data)
        result.push([parseInt(code),0,parseFloat(data[code])]);

    result.sort(sortFunc);

    for(let i = 0;i < result.length;i++){
        result[i][1] = i+1;
        result[i][2] = result[i][2].toFixed(3);
    }

    return result;
}

function createSelect(plaisio_names) {
    let select = document.getElementById("plaisio-selector");

    for(let i = 0;i < plaisio_names.length;i++)
    {
        let option = document.createElement("option");
        option.value = plaisio_names[i];
        option.innerHTML = plaisio_names[i];
        select.appendChild(option);
    }
}

async function initialize_table(firstTime=false)
{
    fetch("data/plaisia_data.json")
    .then(response => {
        return response.json();
    }).then(function(data){
        if(firstTime)
            createSelect(Object.keys(data));

        let plaisio = $("#plaisio-selector").val();
        rows = process_data(data[plaisio]);
        
        createHeader(["Κωδικός Υποψηφίου","Κατάταξη","Βαθμολογία"]);
        constructTable(rows,3);
    });
}

initialize_table(true);