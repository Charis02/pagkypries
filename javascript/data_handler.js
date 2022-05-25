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

function nextHandler(filename, elements, field) {
  return async function(pageIndex){
    return fetch(filename)
      .then(response => response.json())
      .then((jsondata) => {
        let data = jsondata[field];
        console.log(data);
        let frag = document.createDocumentFragment();

        let itemsPerPage = 250;

        let totalPages = Math.ceil(data.length / itemsPerPage);
        let offset = pageIndex * itemsPerPage;

        for (let i = offset, len = Math.min(offset + itemsPerPage,data.length); i < len; i++) {
          let row = data[i];

          frag.appendChild(createRowItem(row, elements));
        }

        let hasNextPage = pageIndex < totalPages - 1;

        return this.append(Array.from(frag.childNodes))
          // indicate that there is a next page to load
          .then(() => hasNextPage);
      });
  };
}

async function filterDataHandler(filename,elements,field,code)
{
  return fetch(filename)
  .then(response => response.json())
  .then((jsondata) => {
    let data = jsondata[field];
    let table = document.getElementById("table-body");
    let tbody = table.getElementsByTagName("tbody")[0];
    
    for (let i = 0, len = data.length; i < len; i++) 
        if(data[i].code == code)
          table.appendChild(createRowItem(data[i], elements));

    return;
  });
}