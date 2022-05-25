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

      let table = document.getElementById("table-body");
      table.innerHTML = "";
      for(let i = 0; i < rows.length; i++)
      {
          let row = rows[i];
          let tr = document.createElement("tr");
          tr.className = "row";
          for(let j = 0; j < row.length; j++)
          {

              let td = document.createElement("td");
              td.innerHTML = row[j];
              td.classList.add("col"+j);
              tr.appendChild(td);
          }
          table.appendChild(tr);
      }
      
      $("#table td.col0").css("text-align","left");
  });
}