function createConfig1(data){ //Horizontal Bar
    var len = Object.keys(data[0].Confirmed).length - 1;
    var color = Chart.helpers.color;
    var horizontalBarChartData = {
        datasets: [
            {
                label: '',
                backgroundColor: [
                    color('blue').alpha(0.5).rgbString(), 
                    color('red').alpha(0.5).rgbString(), 
                    color('green').alpha(0.5).rgbString()
                ],
                borderWidth: 1,
                data: [
                    data[0].Confirmed[len].Cases,
                    data[0].Deaths[len].Cases,
                    data[0].Recovered[len].Cases
                ]
            },
        ],

        labels: ['Cases', 'Deaths', 'Recovered']

    };
    return {
        type: 'horizontalBar',
        data: horizontalBarChartData,
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0.9)",
                        lineWidth: 2,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0.9)",
                        lineWidth: 2,
                    }   
                }]
            },
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Cases, Deaths and Recovered'
            },
            tooltips: {
                borderColor: '#dcf0ef',
                borderWidth: 1
            },

        }

    };
}



function createConfig2(data) { //

    var len = Object.keys(data[0].Confirmed).length - 1;
    var monthLabels = [''];
    var casesData = [];
    var deathsData = [];
    var recoveredData = [];

    for(let i=0; i < len; i++){
        let date = formatDate(data[0].Confirmed[i].Date);
        let month = date[1] + date[2] + date[3];
        let day = date[5] + date[6];
        if(day === '29' && month === 'Feb'){
            monthLabels += month;

            casesData.push(data[0].Confirmed[i].Cases);
            deathsData.push(data[0].Deaths[i].Cases);
            recoveredData.push(data[0].Recovered[i].Cases);
        }
        else if(day === '30' && (month === 'Apr' || month === 'Jun' || month === 'Sep' || month === 'Nov')){
            monthLabels += month;
    
            casesData.push(data[0].Confirmed[i].Cases);
            deathsData.push(data[0].Deaths[i].Cases);
            recoveredData.push(data[0].Recovered[i].Cases);
        }
        else if(day === '31'){
            monthLabels += month;

            casesData.push(data[0].Confirmed[i].Cases);
            deathsData.push(data[0].Deaths[i].Cases);
            recoveredData.push(data[0].Recovered[i].Cases);
        }


    }

    var labels = [];
    var month = "";

    for(let i=0;i < monthLabels.length;i++){
        month += monthLabels[i];
        if((i+1) % 3 === 0){
            labels.push(month);
            month = "";
        }

    }


    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    /*label: 'Cases',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: casesData,
                    fill: false,*/
                    label: 'Cases',
                    borderColor: 'rgba(0, 0, 250, 0.2)',
                    backgroundColor: 'rgba(0, 0, 250, 0.2)',
                    data: casesData,
                    fill: false,
                }, {
                    label: 'Deaths',
                    borderColor: 'rgba(250, 0, 0, 0.2)',
                    backgroundColor: 'rgba(250, 0, 0, 0.2)',
                    data: deathsData,
                    fill: false,
                }, {
                    label: 'Recovered',
                    borderColor: 'rgba(0, 250, 0, 0.2)',
                    backgroundColor: 'rgba(0, 259, 0, 0.2)',
                    data: recoveredData,
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0.9)",
                        lineWidth: 2,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0.9)",
                        lineWidth: 2,
                    }   
                }]
            },

            responsive: true,
            title: {
                display: true,
                text: 'Totals at the end of every month'
            },
            tooltips: {
                position: 'nearest',
                mode: 'point',
                intersect: true,
                yPadding: 10,
                xPadding: 10,
                caretSize: 8,
                borderColor: '#dcf0ef',
                borderWidth: 1
            },
        }
    };
}


function createConfigGlobal(data) {

    let numCountries = Object.keys(data.Countries).length;
    let chartData = [{}];
    let count = 0;

    let highest = 0;
    var highID;

    for (i=0;i<numCountries;i++){
        let y = (data.Countries[i].TotalConfirmed/data.Global.TotalConfirmed) * 100;
        y = y.toFixed(1);

        let num = numberWithCommas(data.Countries[i].TotalConfirmed);


        if(y > '0'){
            if(highest < data.Countries[i].TotalConfirmed){
                highest = data.Countries[i].TotalConfirmed;
                highID = count;
            }
            chartData[count] = { 
                name: data.Countries[i].Country,
                y: data.Countries[i].TotalConfirmed,
                num: num
            };
            count++;
    
        }

    }

    let temp = chartData[highID];
    chartData[highID] = {
        sliced: true,
        selected: true,
        name: temp.name,
        y: temp.y,
        num: temp.num

    }


    Highcharts.chart('globalStatisticsGraph', {
        chart: {
            style: {
                fontFamily: 'serif'
            },    
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            style: {
                color: 'rgb(139, 148, 155)',
                fontSize: '30px',
                fontWeight: 'bold'
            },
            text: 'Cases around the world',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.num} ({point.percentage:.2f}%)</b>'
        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Cases',
            colorByPoint: true,
            data: chartData
        }]
    });

}

