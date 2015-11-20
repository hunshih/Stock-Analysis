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
            vAxes: {0: {format: '#,###'}, 1: {format: '#.##'}},
            hAxis: { title: "Year"},
            series: {
                0:{ type: "bars", color: '#4E2A84',targetAxisIndex: 0 },
                1: { type: "bars", color: '#716C6B',targetAxisIndex: 0},
                2: { type: "line", color: '#FF0000',targetAxisIndex: 1}
                },
            animation:{
                duration: 1000,
                easing: 'out',
            },
            width:600
        };

        ATChart = new google.visualization.ComboChart(document.getElementById('AssetTurnoverChart'));
        ATChart.draw(asset_turnover_data, ATOptions);
      };
function updateATChart(){ 
    asset_turnover_data.setValue(0,1,totalAnnualAssets[2]/1000);   
    asset_turnover_data.setValue(0,2,revenue[2]/1000);
    asset_turnover_data.setValue(0,3,assetsTurnoverRatios[2]);
    asset_turnover_data.setValue(1,1,totalAnnualAssets[1]/1000);
    asset_turnover_data.setValue(1,2,revenue[1]/1000);
    asset_turnover_data.setValue(1,3,assetsTurnoverRatios[1]);
    asset_turnover_data.setValue(2,1,totalAnnualAssets[0]/1000);
    asset_turnover_data.setValue(2,2,revenue[0]/1000);
    asset_turnover_data.setValue(2,3,assetsTurnoverRatios[0]);
    ATChart.draw(asset_turnover_data, ATOptions);
};

function resizeAT(wid, hi){
    ATOptions.width = wid;
    ATOptions.height = hi;
    ATChart.draw(asset_turnover_data, ATOptions);
}