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

        return (code == student) ? 10: 5;
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

    let lesson_ranks = {};
    let lesson_codes = {};

    let wanted_percentiles = [0.0,0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,1.0];

    let max_len = 0;
    for (let i = 0; i < lessons.length; i++) {
        lesson_ranks[lessons[i]] = [];
        lesson_codes[lessons[i]] = [];
        let next_percentile = 0;

        for (let j = 0; j < jsondata[lessons[i]].length; j++) {
            let current_percentile = (j+1) / jsondata[lessons[i]].length;
            if (next_percentile < wanted_percentiles.length
                && current_percentile > wanted_percentiles[next_percentile]){
                lesson_codes[lessons[i]].push(jsondata[lessons[i]][j].code);
                lesson_ranks[lessons[i]].push(jsondata[lessons[i]][j].grade);
                next_percentile++;
            }
            else if(jsondata[lessons[i]][j].code == student){
                lesson_codes[lessons[i]].push(jsondata[lessons[i]][j].code);
                lesson_ranks[lessons[i]].push(jsondata[lessons[i]][j].grade);
            }
        }

        max_len = Math.max(max_len, lesson_ranks[lessons[i]].length);
    }

    let datasets = [];
        let labels = [];

        for (let i = 0; i < wanted_percentiles.length; i++) {
            labels.push((wanted_percentiles[i]*100));
        }

        for (let i = 0; i < lessons.length; i++) {
            let data_set = {};

            data_set['label'] = lessons[i];
            data_set['data'] = lesson_ranks[lessons[i]].reverse();
            data_set['codes'] = lesson_codes[lessons[i]].reverse();
            data_set['borderColor'] = border_colors[i];
            data_set['tension'] = 0.1;

            datasets.push(data_set);
        }

    return {
        labels: labels,
        datasets: datasets
    };
}

$(document).ready(function(){

let config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Student 1',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.1
            }
        ]
    },
    options: {
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
        y: {
            ticks: {
                callback(value){
                    if(value != 21)
                        return value;
                }
            },
            max: 21,
        }
    }
    }
  };

  const ctx = $('#myChart');
  window.chart = new Chart(ctx, config);
});

$('#filter-input-button').click(function(){
    let year = localStorage.getItem('chosen_year');
    let student = $('#filter-input-text').val().toString();
    console.log(student);
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
    });
});