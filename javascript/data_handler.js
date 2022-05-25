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

function nextHandler(filename, elements,code = "") {
  return function(pageIndex){
    return fetch(filename)
      .then(response => response.json())
      .then((jsondata) => {
        let data = jsondata.data;
        let frag = document.createDocumentFragment();

        let itemsPerPage = 250;

        if (code.length != 0) itemsPerPage = 9999;

        let totalPages = Math.ceil(data.length / itemsPerPage);
        let offset = pageIndex * itemsPerPage;

        for (let i = offset, len = Math.min(offset + itemsPerPage,data.length); i < len; i++) {
          let row = data[i];

          if (code.length == 0 || row.code == code){
            console.log("adding row");
            frag.appendChild(createRowItem(row, elements));
          }
        }

        let hasNextPage = pageIndex < totalPages - 1;
        
        if (frag.children.length == 0) {
          let row = document.createElement("tr");
          row.classList.add("row");
          row.classList.add("invisible");
          row.innerHTML = "<td colspan='" + elements.length + "'>No results found</td>";
          frag.appendChild(row);
        }

        return this.append(Array.from(frag.childNodes))
          // indicate that there is a next page to load
          .then(() => hasNextPage);
      });
  };
}
