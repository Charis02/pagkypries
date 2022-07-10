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

async function selectHandler(filename)
{
    await fetch(filename)
    .then(response => response.json())
    .then((data) => {
        let lessons_names = get_lesson_names(data);
        createSelect(lessons_names);
    });
}

async function rank_by_lesson(){
    let year = localStorage.getItem('chosen_year');
    let filename = 'data/' + year + '/lessons_data.json';
    await selectHandler(filename);
    let lesson = $( "#lesson-selector" ).val();

    localStorage.setItem('elements', JSON.stringify({'data':['code','rank','grade']}));
    localStorage.setItem('field', lesson);
    localStorage.setItem('filename', filename);
    
    $('#table tbody').empty();

    window.ias = new InfiniteAjaxScroll('#table tbody', {
        item: '.row',
        next: nextHandler(filename, ['code','rank','grade'], lesson),
        pagination: false,
        negativeMargin: 400,
        prefill: true,
    });
}

async function select_lesson(){
    console.log("select_lesson");
    let year = localStorage.getItem('chosen_year');
    let filename = 'data/' + year + '/lessons_data.json';

    let lesson = $( "#lesson-selector" ).val();

    localStorage.setItem('elements', JSON.stringify({'data':['code','rank','grade']}));
    localStorage.setItem('field', lesson);
    localStorage.setItem('filename', filename);
    localStorage.setItem('lesson', lesson);
    
    $('#table tbody').empty();

    // destroy other ias instance
    
    if(window.ias)
        window.ias.unbind();

    window.ias = new InfiniteAjaxScroll('#table tbody', {
        item: '.row',
        next: nextHandler(filename, ['code','rank','grade'], lesson),
        pagination: false,
        negativeMargin: 400
    });
}