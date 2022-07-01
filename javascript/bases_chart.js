
function bases_chart()
{
    let tooltip_mapper = {};

    let config = {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks:{
                        label: function(context) {
                            return context.formattedValue;
                        },
                        title: function(context) {
                            return tooltip_mapper[context[0].label];
                        }
                    }
                },
                legend: {
                    display: false,
                }
            }
        },
        plugins: [lollipopChart]
    };

    let year = localStorage.getItem('chosen_year');
    let filename = "data/" + year + "/bases_data.json"
    
    fetch(filename)
    .then(response => response.json())
    .then(function (jsondata) {
        let pairs = [];
        let labels = [];
        let data = [];

        for (let lesson in jsondata) {
            pairs.push([lesson, jsondata[lesson]]);
        }

        // sort pairs by second element
        pairs.sort(function(a, b) {
            return b[1] - a[1];
        });

        for (let i = 0; i < pairs.length; i++) {
            
            // split pairs[i][0] up to - and get the first part
            let lesson = pairs[i][0].split("-")[0];

            if (lesson.length > 40)
                lesson = lesson.substring(0, 40) + "...";

            lesson = lesson.split('] ')[1];
            tooltip_mapper[lesson] = pairs[i][0];
            labels.push(lesson);
            data.push(pairs[i][1]);
        }

        let datasets = [
            {
                label: 'Βάσεις',
                backgroundColor: '#14213d',
                borderColor: '#14213d',
                data: data,
                barThickness: 3.4,
                indexAxis: 'y',
            }
        ];
        
        window.chart.data.datasets = datasets;
        window.chart.data.labels = labels;
        window.chart.update();
    });
    
    const ctx = $('#myChart');
    
    if (window.chart) {
        window.chart.destroy();
    }

    window.chart = new Chart(ctx, config);
}