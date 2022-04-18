function sortFunc(a,b){
    if(a[2] < b[2]){
      return 1;
    }
    else if(a[2] > b[2]){
      return -1;
    }
    return 0;
  }
  

function prepareData(candidates) {
    let result = [];
    let classes = {};
    let lessons_names = [];
    let lesson_codes = [];

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

            result.push([parseInt(candidates[i][0]),i,value,candidates[i][j].split(":")[0]]);
        }
    }

    result.sort(sortFunc);
    count_classes = {};

    for(let i = 0;i < result.length;i++)
    {
        if(!(result[i][3] in count_classes))
            count_classes[result[i][3]] = 1;
        else
            count_classes[result[i][3]] += 1;
        
        result[i][2] = result[i][2].toFixed(3);
        result[i][1] = count_classes[result[i][3]];

        let lesson_code = result[i][3].split("[")[1].split("]")[0];
        let lesson_name = result[i][3].split("[")[0];

        classes[i] = "lesson-"+lesson_code;

        if (!lessons_names.includes(lesson_name)){
            lessons_names.push(lesson_name);
            lesson_codes.push(lesson_code)
        }

        result[i].pop();
    }

    return [result,classes,lessons_names,lesson_codes];
}

function createSelect(lessons_names,lesson_codes) {
    let select = document.getElementById("lesson-selector");

    for(let i = 0;i < lessons_names.length;i++)
    {
        let option = document.createElement("option");
        option.value = lesson_codes[i];
        option.innerHTML = lessons_names[i];
        select.appendChild(option);
    }
}

getData().then(function(data){
    let header = ["Κωδικός Υποψηφίου","Κατάταξη","Βαθμολογία"];
    let rows = data.slice(1);

    let [table,classes,lesson_names,lesson_codes] = prepareData(rows);
        
    createSelect(lesson_names,lesson_codes);
    createHeader(header);
    constructTable(table,header.length,classes);

    change_lesson();
});
  