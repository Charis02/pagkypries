function getLessonsJSON(json)
{
    /*
    Returns an array.
    Its first row is the header row, which is an array of strings.
    Its other rows are the data rows
    */

    // The result
    window.data = [];

    // The header row
    let header = ["Lesson","Candidate","Grade"];
    window.data.push(header);

    // The data rows
    
    for(let lesson_name in json)
    {
        let lesson = json[lesson_name];

        for(let candidate_code in lesson)
        {
            let candidate_grade = lesson[candidate_code];
            let row = [lesson_name,candidate_code,candidate_grade];

            window.data.push(row);
        }
    }

    return window.data;
};

async function getLessonsData()
{
    let data = await fetch("data/lessons_data.json")
        .then(response => {
            return response.json();
        })
        .then(function (jasondata) {
            return getLessonsJSON(jasondata);
        });
    
    return data;
}

window.getLessonsData = getLessonsData;