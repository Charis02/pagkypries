

fetch("data/bases_data.json")
.then(response => {
    return response.json();
})
.then(function (jsondata) {
    let header = ["Σχολή Επιτυχίας","Ελάχιστη Βαθμολογία"];
    let rows = [];

    for(let area in jsondata)
    {
        let row = [];
        row.push(area);
        row.push(jsondata[area]);
        rows.push(row);
    }

    createHeader(header);
    constructTable(rows,header.length);
});