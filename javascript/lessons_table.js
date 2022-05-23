function sortFunc(a,b){
    if(a[2] < b[2]){
      return 1;
    }
    else if(a[2] > b[2]){
      return -1;
    }
    return 0;
  }
  

function prepareData(lesson_grades) {
    let result = [];
    let classes = [];
    let lesson_names = [];
    let lesson_codes = [];

    let lesson_grades_sorted = {};

    for(let i = 1;i < lesson_grades.length;i++)
    {
        let lesson_name = lesson_grades[i][0].split("[")[0];
        let lesson_code = lesson_grades[i][0].split("[")[1].split("]")[0];
        let candidate_code = lesson_grades[i][1]
        let grade = lesson_grades[i][2];

        if(grade == "")
            continue;
        else if(grade == "ΑΠΟΥΣΙΑ")
            grade = 0;
        else
            grade = parseFloat(grade);

        if(!lesson_names.includes(lesson_name))
        {
            lesson_names.push(lesson_name);
            lesson_codes.push(lesson_code);
        }

        if(!lesson_grades_sorted[lesson_code])
        {
            lesson_grades_sorted[lesson_code] = [];
        }

        lesson_grades_sorted[lesson_code].push([candidate_code,0,grade]);
    }

    for(lesson in lesson_grades_sorted)
    {
        lesson_grades_sorted[lesson].sort(sortFunc);
        let temp_classes = [];

        for(let i = 0;i < lesson_grades_sorted[lesson].length;i++)
        {
            lesson_grades_sorted[lesson][i][1] = i + 1;
            temp_classes.push("lesson-" + lesson);
        }

        result = result.concat(lesson_grades_sorted[lesson]);
        classes = classes.concat(temp_classes);
    }

    return [result,classes,lesson_names,lesson_codes];
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

function rank_by_lesson(){
    getLessonsData().then(function(data){
        let header = ["Κωδικός Υποψηφίου","Κατάταξη","Βαθμολογία"];
        let rows = data.slice(1);

        let [table,classes,lesson_names,lesson_codes] = prepareData(rows);
            
        createSelect(lesson_names,lesson_codes);
        createHeader(header);
        constructTable(table,header.length,classes);

        change_lesson();
    });
}
  