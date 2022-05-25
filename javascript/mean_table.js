function createRowItem(rowData) {
  let row = document.createElement("tr");
  row.classList.add("row");

  let col0 = document.createElement("td");
  col0.innerHTML = rowData['code'];
  row.appendChild(col0);
  
  let col1 = document.createElement("td");
  col1.innerHTML = rowData['rank'];
  row.appendChild(col1);

  let col2 = document.createElement("td");
  col2.innerHTML = rowData['grade'];
  row.appendChild(col2);
      
  return row;
}

function nextHandler(pageIndex) {
  let year = localStorage.getItem('chosen_year');
  let filename = 'data/' + year + '/means_data.json';
  return fetch(filename)
    .then(response => response.json())
    .then((jsondata) => {
      let data = jsondata.data;
      let frag = document.createDocumentFragment();

      let itemsPerPage = 8;
      let totalPages = Math.ceil(data.length / itemsPerPage);
      let offset = pageIndex * itemsPerPage;

      // walk over the movie items for the current page and add them to the fragment
      for (let i = offset, len = offset + itemsPerPage; i < len; i++) {
        let row = data[i];
        let item = createRowItem(row);

        frag.appendChild(item);
      }

      let hasNextPage = pageIndex < totalPages - 1;

      return this.append(Array.from(frag.childNodes))
        // indicate that there is a next page to load
        .then(() => hasNextPage);
    });
}

function mean()
{
  $('#table tbody').empty();

  window.ias = new InfiniteAjaxScroll('#table tbody', {
    item: '.row',
    next: nextHandler,
    pagination: false,
    negativeMargin: 400,
    prefill: true,
  });
}
