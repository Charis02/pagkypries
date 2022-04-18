function sortFunc(a,b){
    if(a[2] < b[2]){
      return 1;
    }
    else if(a[2] > b[2]){
      return -1;
    }
    return 0;
  }

function f(x) {
    // 1 <= x <= 200

    x *= 10;
    return Math.log10(x/(201.0-x));
}

function filter_grades(grades,codes) {
    let filtered_grades = [];
    let filtered_codes = [];

    for(let i = 0;i < grades.length;i++)
    {
        if(grades[i] == "" || grades[i] == "ΑΠΟΥΣΙΑ")
            continue;

        let gra = parseFloat(grades[i]);

        if(gra == 0)
            continue;

        filtered_grades.push(gra);
        filtered_codes.push(codes[i]);
    }

    return [filtered_grades,filtered_codes];
}

function get_mean(grades) {
    let sum = 0.0;
    let count = 0;

    for(let i = 0;i < grades.length;i++)
    {
        if(grades[i] == "" || grades[i] == "ΑΠΟΥΣΙΑ")
            continue;

        sum += grades[i];
        count++;
    }

    return sum/count;
}

function get_stdev(grades) {
    let mean = get_mean(grades);
    let sum = 0.0;

    for(let i = 0;i < grades.length;i++)
    {
        sum += (grades[i] - mean) * (grades[i] - mean);
    }
    
    return Math.sqrt(sum/(grades.length));
}

function get_final_grades(gra,codes) 
{
    [grades,filtered_codes] = filter_grades(gra,codes);
    f_grades = grades.map(f);

    console.log(f_grades[744]);

    let mean = get_mean(f_grades);
    let stdev = get_stdev(f_grades);

    console.log("mean: " + mean);
    console.log("stdev: " + stdev);

    console.log(10+3*(f_grades[744]-mean)/stdev);

    return [grades.map(function(grade) {
        return 10 + 3*(grade - mean)/stdev;
    }),filtered_codes];
}

function split_lesson_data(data) {
    let grades = [];
    let codes = [];

    for(let code in data)
    {
        codes.push(code);
        grades.push(data[code]);
    }

    return [codes,grades];
}

function get_final_ranking(data,plaisio) {

    let student_grade = {};
    let student_count = {};

    for(let i = 0;i < plaisio.length;i++)
    {
        let lesson = plaisio[i];
        console.log("current lesson: " + lesson);

        let [first_codes,grades] = split_lesson_data(data[lesson]);
        let [final_grades,codes] = get_final_grades(grades,first_codes);

        console.log(final_grades[744]);

        for(let j = 0;j < codes.length;j++)
        {
            let code = codes[j];
            let grade = final_grades[j];

            if(student_grade[code] == undefined)
            {
                student_grade[code] = 0.0;
                student_count[code] = 0;
            }

            student_grade[code] += grade;

            if(code == "763")
                console.log(lesson + " " + grade);

            student_count[code]++;
        }
    }

    for(let code in student_count)
    {
        if(student_count[code] != plaisio.length){
            delete student_grade[code];
            continue;
    }
        student_grade[code] /= plaisio.length;
    }

    return student_grade;
}

function sort_ranking(ranking) {
    let sorted_ranking = [];

    for(let code in ranking)
    {
        sorted_ranking.push([code,0,ranking[code]]);
    }

    sorted_ranking.sort(sortFunc);

    for(let i = 0;i < sorted_ranking.length;i++)
    {
        sorted_ranking[i][1] = i + 1;
    }

    return sorted_ranking;
}

fetch("data/lessons_data.json")
.then(response => {
    return response.json();
}).then(function(data){
    plaisio_codes = ["Νέα Ελληνικά [1]","Φυσική [38]","Βιολογία [21]","Χημεία [19]"];

    let final_ranking = get_final_ranking(data,plaisio_codes);
    let sorted_ranking = sort_ranking(final_ranking);

    createHeader(["Κωδικός Υποψηφίου","Κατάταξη","Βαθμολογία"]);
    constructTable(sorted_ranking,3);
});