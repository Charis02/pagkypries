
getData().then(function(data){
    let header = ["Κωδικός Υποψηφίου","Κατάταξη","Βαθμολογία"];
    let rows = data.slice(1);

    let [table,classes,lesson_names,lesson_codes] = prepareData(rows);
        
    createSelect(lesson_names,lesson_codes);
    createHeader(header);
    constructTable(table,header.length,classes);

    change_lesson();
});
  