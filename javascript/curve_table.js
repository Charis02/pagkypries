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
        result.push([code,0,parseFloat(data[code]).toFixed(2)]);

    result.sort(sortFunc);

    for(let i = 0;i < result.length;i++)
        result[i][1] = i+1;

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