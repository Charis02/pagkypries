function process_data(data)
{
    let result = [];

    for(let i = 0;i < data.length;i++)
    {
        result.push([data[i][0],i+1,parseFloat(data[i][1])]);
    }

    return result;
}

fetch("data/curves/iatriki.json")
.then(response => {
    return response.json();
}).then(function(data){
    rows = process_data(data);
    createHeader(["Κωδικός Υποψηφίου","Κατάταξη","Βαθμολογία"]);
    constructTable(rows,3);
});