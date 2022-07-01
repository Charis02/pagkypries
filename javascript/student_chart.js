let border_colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

function takes_lesson(lesson_data,student){
    for (let i = 0; i < lesson_data.length; i++) {
        if(lesson_data[i].code == student){
            return true;
        }
    }

    return false;
}

function customRadius(student)
  {
    function fn(context){
        let index = context.dataIndex;
        let code = context.dataset.codes[index];

        return (code == student) ? 10: 4.5;
    }

    return fn;
  }

function customStyle(student)
{
    function fn(context){
        let index = context.dataIndex;
        let code = context.dataset.codes[index];

        return (code == student) ? 'circle': 'star';
    }
    
    return fn;
}

function changeData(chart, labels, datasets)
{
    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
}

function get_student_data(student,jsondata)
{
    let lessons = [];

    for (let lesson in jsondata) {
        if (takes_lesson(jsondata[lesson], student)) {
            lessons.push(lesson);
        }
    }

    let lesson_data= {};
    let lesson_codes = {};

    let labels = [];

    let wanted_percentiles = [0.0,0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,1.0];

    let max_len = 0;
    for (let i = 0; i < lessons.length; i++) {
        let data = [];
        let codes = [];
        let next_percentile = 0;

        for (let j = jsondata[lessons[i]].length-1;j>=0; j--) {
            let current_percentile = (jsondata[lessons[i]].length-j) / jsondata[lessons[i]].length;
            if (next_percentile < wanted_percentiles.length
                && current_percentile >= wanted_percentiles[next_percentile]){
                codes.push(jsondata[lessons[i]][j].code);
                data.push({x: wanted_percentiles[next_percentile], y: jsondata[lessons[i]][j].grade});
                labels.push(wanted_percentiles[next_percentile]);
                next_percentile++;
            }
            else if(jsondata[lessons[i]][j].code == student){
                codes.push(jsondata[lessons[i]][j].code);
                data.push({x: current_percentile, y: jsondata[lessons[i]][j].grade});
            }
        }

        lesson_data[lessons[i]] = data;
        lesson_codes[lessons[i]] = codes;
        max_len = Math.max(max_len, data.length);
    }

    // remove duplicate elements in labels

    let unique_labels = [];
    for (let i = 0; i < labels.length; i++) {
        if (unique_labels.indexOf(labels[i]) == -1) {
            unique_labels.push(labels[i]);
        }
    }
    labels = unique_labels;

    let datasets = [];


        labels.push('');
        for (let i = 0; i < lessons.length; i++) {
            let data_set = {};

            data_set['label'] = lessons[i];
            data_set['data'] = lesson_data[lessons[i]];
            data_set['codes'] = lesson_codes[lessons[i]];
            data_set['borderColor'] = border_colors[i];
            data_set['backgroundColor'] = border_colors[i];
            data_set['tension'] = 0.2

            datasets.push(data_set);
        }

    return {
        labels: labels,
        datasets: datasets
    };
}

function student_chart(){

let config = {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      elements: {
        point: {
            radius: 1,
            display: true
        }
      },
      scales: {
        yAxes: {
            type: 'linear',
            ticks: {
                callback(value){
                    if(value != 21)
                        return value;
                }
            },
            max: 21,
        },
        xAxes: {
            type: 'linear',
            ticks: {
                callback(value){
                    if(value != 1.1)
                        return value*100 + '%';
                }
            },
            max: 1.1,
            }
        }
        ,
        plugins:{
            tooltip: {
                callbacks: {
                title: (items) => {
                    // x value to 1 decimal place + %
                    let val = items[0].parsed.x*100
                    return val.toFixed(1) + '%';
                }
                }
            }
        }
    }
  };

  const ctx = $('#myChart');

  if (window.chart)
    window.chart.destroy();

  window.chart = new Chart(ctx, config);
}

$('#filter-input-text').on( 'keyup', function (e) {
    this.value = this.value.replace(/[^0-9]/g,''); // only allow numbers
    if (e.keyCode == 13) {
        $('#filter-input-button').click();
    }
});


$('#filter-input-button').click(function(){
    let year = localStorage.getItem('chosen_year');
    let student = $('#filter-input-text').val().toString();
    fetch("data/" + year + "/lessons_data.json")
    .then(response => {
        return response.json();
    })
    .then(function (jsondata) {
    //    const ctx = document.getElementById('myChart');
        ret = get_student_data(student,jsondata);

        changeData(window.chart, ret.labels, ret.datasets);
        window.chart.options.elements.point.radius = customRadius(student);
        window.chart.update();
        window.chart.options.elements.point.pointStyle = customStyle(student);
        window.chart.update();
    });
});