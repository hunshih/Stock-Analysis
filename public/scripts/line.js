var CashLineChart;
var lineData;
var lineOptions;
var flag = 0;
google.setOnLoadCallback(drawChart);

      function drawChart() {
        lineData = google.visualization.arrayToDataTable([
          ['Year', 'Cash/Share'],
          ['2012',  2],
          ['2013',  3],
          ['2014',  5.5]
        ]);

        lineOptions = {
          title: 'Cashflow Per Share',
          curveType: 'function',
          legend: { position: 'bottom' },
          animation:{
            duration: 1000,
            easing: 'out',
          },
          vAxis: {minValue:0, maxValue:10},
            backgroundColor: { fill:'transparent' }
        };

        CashLineChart = new google.visualization.LineChart(document.getElementById('lineChart'));
        
        CashLineChart.draw(lineData, lineOptions);
};

function updateLineChart(){
    if(flag == 0){
        lineData.setValue(0,1,3);
        lineData.setValue(1,1,4.5);
        lineData.setValue(2,1,5.1);
        flag = 1;
    }
    else
    {
        lineData.setValue(0,1,4);
        lineData.setValue(1,1,3);
        lineData.setValue(2,1,2);
        flag = 0;
    }
        CashLineChart.draw(lineData, lineOptions);
}
