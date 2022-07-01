const BINS = 40;

function getBin(value,min,max)
{
    let bin = Math.floor(BINS*value/(max-min));
    if(bin == BINS)
        bin--;
    return bin;
}

function getReverseBin(value,min,max)
{
    let res = (max-min)*value/BINS;
    return res;
}

function getNormalPoint(x,mu,sigma)
{
    return Math.exp(-(Math.pow(x-mu,2)/(2*Math.pow(sigma,2))))/(Math.sqrt(2*Math.PI)*sigma);
}

function getCurve(data)
{
    let total = data.length;
    let values = [];
    
    for(let i = 0; i < data.length; i++)
    {
        let tmp=data[i].grade*10;
        if(tmp == 0)
            continue;
        values.push(Math.log(tmp/(201-tmp)));
    }
    let mu = values.reduce((a,b) => a+b,0)/values.length;
    let sigma = Math.sqrt(values.reduce((a,b) => a+Math.pow(b-mu,2),0)/values.length);

    let curvePoints = {};

    for(let x = 0;x < BINS;x++)
    {
        x = getReverseBin(x,0,20);
        let tmp = x*10;
        tmp = Math.log(tmp/(201-tmp));

        let y = getNormalPoint(tmp,mu,sigma);
        curvePoints[x] = y*total;
    }

    return curvePoints;
}

function updateHistogram(data)
{
    let frequency = {};

    for(let i = 0; i < data.length; i++)
    {
        let value = getBin(data[i].grade,0,20);

        if(!frequency[value])
            frequency[value] = 1;
        else
            frequency[value]++;
    }

  //  let curvePoints = getCurve(data);

    window.chart.data.datasets = [{
        type: 'bar',
        label: 'Υποψήφιοι',
        data: Object.values(frequency),
        backgroundColor: '#14213d',
        borderColor: '#14213d',
        borderWidth: 1
    }
];

    window.chart.data.labels = Object.keys(frequency).map(function(key) { return 20*(parseFloat(key)+0.5)/BINS; });
    window.chart.update();
}

$("#lesson-selector").change(function() {
    let lesson = $( "#lesson-selector" ).val();
    let year = localStorage.getItem('chosen_year');
    
    let filename = 'data/' + year + '/lessons_data.json';

    fetch(filename)
    .then(response => {
        return response.json();
    })
    .then(function(jsondata) {
        let data = jsondata[lesson];
        updateHistogram(data);
    })
});

function lesson_histograms()
{
    if (window.chart) {
        window.chart.destroy();
    }
    const ctx = $('#histChart');
    const chart = new Chart(ctx, {
        data: {
            labels: [1,3,4,5],
            datasets: [{
                type: 'bar',
                data: [14,25,23,6]
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    offset: false,
                    grid: {
                    offset: false
                    },
                    ticks: {
                    stepSize: 1
                    },
                    title: {
                    display: true,
                    text: 'Βαθμολογίες',
                    fontSize: 20
                    }
                },
            },
            plugins:{
                tooltip: {
                    callbacks: {
                    title: (items) => {
                        if (!items.length) {
                        return '';
                        }
                        const item = items[0];
                        const x = item.parsed.x;
                        const min = x - 0.25;
                        const max = x + 0.25;
                        return `Βαθμολογίες: ${min} - ${max}`;
                    }
                    }
                }
            }
        },
    });

    window.chart = chart;

    let lesson_selector = $('#lesson-selector');
    let year = localStorage.getItem('chosen_year');
    let second_lesson = 'Μαθηματικά Κατεύθυνσης [37]';

    fetch("data/" + year + "/lessons_data.json")
    .then(response => { return response.json();})
    .then(function (jsondata) {
        for(let lesson in jsondata){
            lesson_selector.append($('<option>', {
                value: lesson,
                text: lesson
                }));
        }

        lesson_selector.val(second_lesson).change();
    });
}