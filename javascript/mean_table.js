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
    .then(function(data){
        let table  = $('#table').DataTable();
        table.clear();
        table.rows.add(data['Candidates']).draw();
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