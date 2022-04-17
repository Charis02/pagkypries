function createHeader(header){
    let row = document.createElement("tr");
    for(let i = 0;i < header.length;i++)
    {
      let col = document.createElement("th");
      col.innerHTML = header[i];
      row.appendChild(col);
    }
    document.getElementById("table").appendChild(row);
  }
  
  function constructTable(list,max_cols,classes={}){
  
    for(let i = 0;i < list.length;i++)
    {
      let row = document.createElement("tr");

      if(classes[i] != undefined)
        row.classList.add(classes[i]);
      
      let col_length = Math.min(list[i].length,max_cols);
  
      for(let j = 0;j < col_length;j++)
      {
        let col = document.createElement("td");
        col.innerHTML = list[i][j];
        row.appendChild(col);
      }
  
      for(let j = col_length;j < max_cols;j++)
      {
        let col = document.createElement("td");
        row.appendChild(col);
      }
  
      document.getElementById("table").appendChild(row);
    }
  }

  