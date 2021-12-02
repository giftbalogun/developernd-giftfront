let projectChart = document.getElementById('projectChart').getContext('2d');
let usersChart = document.getElementById('usersChart').getContext('2d');

let getChart = (usersPerMonthObject) => {
    console.log(usersPerMonthObject);
    document.querySelector('#getting-project-chart').style.display = 'none'
    document.querySelector('#getting-users-chart').style.display = 'none'
    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontFamily = '#777';

    let massPopChart = new Chart(projectChart, {
        type: 'doughnut', //bar, horizontal, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['Completed Projects', 'Projects in Progress', 'Abandoned Progress'],
            datasets: [{
                label: 'Milestones',
                data: [
                    totalCompleted,
                    totalInProgress,
                    totalAbandoned
                ],
                // backgroundColor:'green'
                backgroundColor: [
                    '#1F78B4',
                    '#A6CEE3',
                    'red'
                ],
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: '3',
                hoverBorderColor: '#000'


            }]
        },
        options: {
            // title:{
            //     display:true,
            //     text:'Largest cities in Masachusetts',
            //     fontSize: 25
            // },
            cutoutPercentage: 80,
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#343a40',
                    boxWidth: 20
                }
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled: true
            }
        }
    })

    let usersStatChart = new Chart(usersChart, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Total Users',
                backgroundColor: 'black',
				borderColor: 'black',
                data: [
                    usersPerMonthObject[0],
                    usersPerMonthObject[1],
                    usersPerMonthObject[2],
                    usersPerMonthObject[3],
                    usersPerMonthObject[4],
                    usersPerMonthObject[5],
                    usersPerMonthObject[6]
                ],
                fill: false,

            }, {
                label: 'Active Users',
					fill: false,
					backgroundColor: '#54D0ED',
					borderColor: '#54D0ED',
					data: [
                    usersPerMonthObject[0],
                    usersPerMonthObject[1],
                    usersPerMonthObject[2],
                    usersPerMonthObject[3],
                    usersPerMonthObject[4],
                    usersPerMonthObject[5],
                    usersPerMonthObject[6]
					],
            }]
        },
        options: {
            // title:{
            //     display:true,
            //     text:'Largest cities in Masachusetts',
            //     fontSize: 25
            // },
            cutoutPercentage: 80,
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#343a40',
                    boxWidth: 20
                }
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled: true,
                mode: 'index',
				intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    })
}