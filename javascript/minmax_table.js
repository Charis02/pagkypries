function prepareData(candidates) {
    let result = [];
    let mean_values = {};
    let cand_taking = {};
    let mins = {};
    let maxs = {};

    for(let i = 0;i < candidates.length;i++)
    {
        for(let j = 1;j < candidates[i].length;j++)
        {
            if(candidates[i][j] == "")
                continue;
            
            value = candidates[i][j].split(":")[1];
            if (value == "")
                continue;
            else if (value == ' ΑΠΟΥΣΙΑ')
                value = 0.0;
            else
                value = parseFloat(value);

            let lesson = candidates[i][j].split(":")[0];

            if(cand_taking[lesson] == undefined)
            {
                cand_taking[lesson] = 1;
                mean_values[lesson] = value;
                mins[lesson] = value;
                maxs[lesson] = value;
            }
            else
            {
                cand_taking[lesson] += 1;
                mean_values[lesson] += value;
                mins[lesson] = Math.min(mins[lesson],value);
                maxs[lesson] = Math.max(maxs[lesson],value);
            }
        }
    }

    for(let lesson in mean_values)
    {
        mean_values[lesson] = mean_values[lesson] / cand_taking[lesson];
        mean_values[lesson] = mean_values[lesson].toFixed(3);

        result.push([lesson,mins[lesson],maxs[lesson],mean_values[lesson]]);
    }

    return result;
}

getRawData().then(function(data){
    let header = ["Μάθημα","Ελάχιστη Βαθμολογία","Μέγιστη Βαθμολογία","Μέσος Όρος"];
    let rows = data.slice(1);

    let table = prepareData(rows);
        
    createHeader(header);
    constructTable(table,header.length);
});
  