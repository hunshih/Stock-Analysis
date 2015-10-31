var DEChart;
var debt_equity_data;
var DEOptions;
google.setOnLoadCallback(drawChart);

      function drawChart() {
        debt_equity_data = google.visualization.arrayToDataTable([
            ['Year', 'Debt', 'Equity','Ratio'],
            ['2012',  0,      0,    0],
            ['2013',  0,      0,    0],
            ['2014',  0,      0,    0]
        ]);

        DEOptions = {
            title: 'Debt to Equity',
            vAxes: {0: {format: '#,###'}, 1: {format: '#.##'}},
            hAxis: { title: "Year"},
            series: {
                0:{ type: "bars", color: '#00274c',targetAxisIndex: 0 },
                1: { type: "bars", color: '#ffcb05',targetAxisIndex: 0},
                2: { type: "line", color: '#FF0000',targetAxisIndex: 1}
                },
            animation:{
                duration: 1000,
                easing: 'out',
            },
            width:400
        };

        DEChart = new google.visualization.ComboChart(document.getElementById('lineChart'));
        DEChart.draw(debt_equity_data, DEOptions);
      };
function updateDEChart(){
    debt_equity_data.setValue(0,1,totalLiabilities[2]/1000);
    debt_equity_data.setValue(0,2,totalAnnualEquity[2]/1000);
    debt_equity_data.setValue(0,3,debtequityRatio[2]);
    debt_equity_data.setValue(1,1,totalLiabilities[1]/1000);
    debt_equity_data.setValue(1,2,totalAnnualEquity[1]/1000);
    debt_equity_data.setValue(1,3,debtequityRatio[1]);
    debt_equity_data.setValue(2,1,totalLiabilities[0]/1000);
    debt_equity_data.setValue(2,2,totalAnnualEquity[0]/1000);
    debt_equity_data.setValue(2,3,debtequityRatio[0]);
    DEChart.draw(debt_equity_data, DEOptions);
}