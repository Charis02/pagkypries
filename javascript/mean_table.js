function sortFunc(a,b){
  if(a[1] > b[1]){
    return 1;
  }
  else if(a[1] < b[1]){
    return -1;
  }
  return 0;
}

function mean(){
    let year = localStorage.getItem('chosen_year');
    fetch("data/" + year + "/means_data.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
    let header = ["Κωδικός Υποψηφίου","Κατάταξη","Μέσος Όρος"];
    let rows = jsondata['Candidates'];
    rows.sort(sortFunc);
    createHeader(header);
    constructTable(rows,header.length);
  });
}