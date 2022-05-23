function sortFunc(a,b){
  if(a[2] < b[2]){
    return 1;
  }
  else if(a[2] > b[2]){
    return -1;
  }
  return 0;
}

function get_means(data){
  let result = [];

  for(let i = 0;i < data.length;i++)
  {
    let mean = 0.0;
    let count = 0;

    for(let j = 1;j < data[i].length;j++)
    {
      if(data[i][j] == "")
        continue;

      value = data[i][j].split(":")[1];
      count++;
      
      if (value == "")
        continue;
      else if (value == ' ΑΠΟΥΣΙΑ')
        value = 0.0;
      else
        value = parseFloat(value);

      mean += parseFloat(value);
    }

    mean = mean/count;
    result.push([parseInt(data[i][0]),i,mean]);
  }

  result.sort(sortFunc);

  for(let i = 0;i < result.length;i++)
  {
    result[i][1] = i+1;
    result[i][2] = result[i][2].toFixed(3);
  }

  return result;
}

function mean(){
  getRawData().then(function(data){
    let header = ["Κωδικός Υποψηφίου","Κατάταξη","Μέσος Όρος"];
    let rows = data.slice(1);
    let processed_rows = get_means(rows);
    createHeader(header);
    constructTable(processed_rows,header.length);
  });
}