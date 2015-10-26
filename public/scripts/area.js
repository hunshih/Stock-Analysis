var ATChart;
var asset_turnover_data;
var ATOptions;
google.setOnLoadCallback(drawChart);

      function drawChart() {
        asset_turnover_data = google.visualization.arrayToDataTable([
            ['Year', 'Assets', 'Revenue','Ratio'],
            ['2012',  0,      0,    0],
            ['2013',  0,      0,    0],
            ['2014',  0,      0,    0]
        ]);

        ATOptions = {
            title: 'Assets Turnover',
            vAxes: {0: {format: '#,###'}, 1: {format: '#.#'}},
            hAxis: { title: "Year"},
            series: {
                0:{ type: "bars", color: '#00274c',targetAxisIndex: 0 },
                1: { type: "bars", color: '#ffcb05',targetAxisIndex: 0},
                2: { type: "line", color: '#FF0000',targetAxisIndex: 1}
                },
            animation:{
                duration: 1000,
                easing: 'out',
            }
        };

        ATChart = new google.visualization.ComboChart(document.getElementById('AssetTurnoverChart'));
        ATChart.draw(asset_turnover_data, ATOptions);
      };
function updateATChart(){
    asset_turnover_data.setValue(0,1,totalLiabilities[2]/1000);
    asset_turnover_data.setValue(0,2,totalAnnualEquity[2]/1000);
    asset_turnover_data.setValue(0,3,debtequityRatio[2]);
    asset_turnover_data.setValue(1,1,totalLiabilities[1]/1000);
    asset_turnover_data.setValue(1,2,totalAnnualEquity[1]/1000);
    asset_turnover_data.setValue(1,3,debtequityRatio[1]);
    asset_turnover_data.setValue(2,1,totalLiabilities[0]/1000);
    asset_turnover_data.setValue(2,2,totalAnnualEquity[0]/1000);
    asset_turnover_data.setValue(2,3,debtequityRatio[0]);
    ATChart.draw(asset_turnover_data, ATOptions);
}
