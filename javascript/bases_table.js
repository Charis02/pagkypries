function sortFunc(a,b){
    if(a[1] < b[1]){
      return 1;
    }
    else if(a[1] > b[1]){
      return -1;
    }
    return 0;
}

function bases(){
  let year = localStorage.getItem('chosen_year');
  fetch("data/" + year + "/bases_data.json")
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

      rows.sort(sortFunc);

      createHeader(header);
      constructTable(rows,header.length);
      
      $("#table td.col0").css("text-align","left");
  });
}