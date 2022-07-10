function createSelect(plaisio_names) {
    let select = document.getElementById("plaisio-selector");

    // clear the select
    while (select.options.length > 0) {
        select.remove(0);
    }

    for(let i = 0;i < plaisio_names.length;i++)
    {
        let option = document.createElement("option");
        option.value = plaisio_names[i];
        option.innerHTML = plaisio_names[i];
        select.appendChild(option);
    }
}

function get_plaisio_names(data)
{
    let plaisio_names = [];
    for(let plaisio in data)
        plaisio_names.push(plaisio);
    return plaisio_names;
}

async function selectHandler(filename)
{
    await fetch(filename)
    .then(response => response.json())
    .then((data) => {
        let plaisio_names = get_plaisio_names(data);
        createSelect(plaisio_names);
    });
}

async function cyprus_curved(){
    let year = localStorage.getItem('chosen_year');
    let filename = 'data/' + year + '/plaisia_data.json';
    await selectHandler(filename);
    let plaisio = $( "#plaisio-selector" ).val();

    localStorage.setItem('elements', JSON.stringify({'data':['code','rank','grade']}));
    localStorage.setItem('field', plaisio);
    localStorage.setItem('filename', filename);
    
    $('#table tbody').empty();

    window.ias = new InfiniteAjaxScroll('#table tbody', {
        item: '.row',
        next: nextHandler(filename, ['code','rank','grade'], plaisio),
        pagination: false,
        negativeMargin: 400,
        prefill: true,
    });
}