function sortFunc(a,b){
    if(a[2] == "ΑΠΟΥΣΙΑ")
        return 1;
    if(b[2] == "ΑΠΟΥΣΙΑ")
        return -1;
    if(a[2] < b[2]){
      return 1;
    }
    else if(a[2] > b[2]){
      return -1;
    }
    return 0;
  }
  
function change_lesson(data){
    let lesson = $( "#lesson-selector" ).val();

    let candidates = data[lesson];

    let rows = [];
    for(let code in candidates)
    {
        let row = [];
        row.push(code);
        row.push(0);

        let grade = candidates[code];

        if(grade != "ΑΠΟΥΣΙΑ")
            grade = parseFloat(grade);

        row.push(grade);
        rows.push(row);
    }

    rows.sort(sortFunc);

    for(let i = 0;i < rows.length;i++){
        rows[i][1] = i + 1;
    }

    return rows;
}

function createSelect(lessons_names) {
    let select = document.getElementById("lesson-selector");

    for(let i = 0;i < lessons_names.length;i++)
    {
        let option = document.createElement("option");
        option.value = lessons_names[i];
        option.innerHTML = lessons_names[i];
        select.appendChild(option);
    }
}

function get_lesson_names(data){
    let lesson_names = [];
    for(let lesson in data){
        lesson_names.push(lesson);
    }
    return lesson_names;
}

function rank_by_lesson(){
    let year = localStorage.getItem('chosen_year');
    
    fetch("data/" + year + "/lessons_data.json")
    .then(response => {
            return response.json();
    })
    .then(function(data){

        createSelect(get_lesson_names(data));
        let lesson = $( "#lesson-selector" ).val();
        let table  = $('#table').DataTable();
        table.clear();
        console.log(lesson);
        table.rows.add(data[lesson]).draw();
    });

}

$(document).ready( function () {
    $('#table').DataTable(
        {
            "columns": [
                { "data": "code" },
                { "data": "rank" },
                { "data": "grade" }
            ],
            "order": [[ 2, "desc" ]],
        }
    );
} );


$('#filter-input-text').on( 'keyup', function () {
    this.value = this.value.replace(/[^0-9\.]/g,'');
    let table = $('#table').DataTable();

	table
		.columns(0)
		.search(this.value)
		.draw();
} );