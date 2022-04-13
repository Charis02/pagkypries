function getJSON(data)
{
    let json = data.Candidates;
    /*
    Returns an array.
    Its first row is the header row, which is an array of strings.
    Its other rows are the data rows
    */

    // The result
    window.data = [];

    // The header row
    let header = ["code", "Lesson1", "Lesson2","Lesson3","Lesson4","Lesson5","Lesson6","Lesson7","Lesson8"];
    window.data.push(header);

    // The data rows
    
    for(let i = 0; i < json.length; i++)
    {
        let row = [];

        for (let j = 0; j < header.length; j++)
        {
            if (typeof json[i][header[j]] !== "undefined")
                row.push(json[i][header[j]]); 
        }

        window.data.push(row);
    }

    return window.data;
};

async function getData()
{
    let data = await fetch("data/raw_data.json")
        .then(response => {
            return response.json();
        })
        .then(function (jasondata) {
            return getJSON(jasondata);
        });
    
    return data;
}

window.getData = getData;