function createRowItem(rowData, elements) {
  let row = document.createElement("tr");
  row.classList.add("row");

  for (let i = 0; i < elements.length; i++) {
    let col = document.createElement("td");
    col.classList.add("col"+i);
    col.innerHTML = rowData[elements[i]];
    row.appendChild(col);
  }
  
  return row;
}

function nextHandler(filename, elements) {
  return function(pageIndex){
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
          let item = createRowItem(row,elements);

          frag.appendChild(item);
        }

        let hasNextPage = pageIndex < totalPages - 1;

        return this.append(Array.from(frag.childNodes))
          // indicate that there is a next page to load
          .then(() => hasNextPage);
      });
  };
}
