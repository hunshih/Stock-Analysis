var CashLineChart;
var lineData;
var lineOptions;
var flag = 0;
google.setOnLoadCallback(drawChart);

      function drawChart() {
        var LineData = google.visualization.arrayToDataTable([
        ['AuditPeriod', 'Audit Count', 'Fail Percentage'],
        ['02-11-2012',  0,      0],
        ['02-18-2012',  0,      0],
        ['02-25-2012',  0,      0],
        ['07-21-2012',  1476,   .233062],
        ['07-28-2012',  1651,   .253180],
        ['08-04-2012',  2217,   .210645]
    ]);

    var LineOptions = {
        vAxes: {0: {format: '#,###'}, 1: {format: '#%'}},
        hAxis: { title: "Week", format: 'm/d/y'},
        series: {
            0:{ type: "bars", targetAxisIndex: 0 },
            1: { type: "line", targetAxisIndex: 1}
            }
        };

        CashLineChart = new google.visualization.ComboChart(document.getElementById('lineChart'));
        CashLineChart.draw(LineData, LineOptions);
      };