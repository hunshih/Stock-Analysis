var free_cash_data;
var fc_options;
var FreeCashChart;
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  // Some raw data (not necessarily accurate)
  free_cash_data = google.visualization.arrayToDataTable([
    ['Year', 'Cash From Operation', 'Capital Expenditures', 'Free Cash'],
    ['2012',  0,      0,      0],
    ['2013',  0,      0,      0],
    ['2014',  0,      0,      0]
  ]);

  fc_options = {
    title : 'Free Cash Flow',
    vAxis: {title: "Thousand"},
    hAxis: {title: "Year"},
    seriesType: "bars",
    series: {
        0: {color:'#000000'},
        1: {color:'#FF2400'},
        2: {type: "line"}
    },
    animation:{
        duration: 1000,
        easing: 'out',
    },
    backgroundColor: { fill:'transparent' },
    width:400
  };

  FreeCashChart = new google.visualization.ComboChart(document.getElementById('FreeCashFlow'));
  FreeCashChart.draw(free_cash_data, fc_options);
}

function updateFreeCashChart(){
    free_cash_data.setValue(0,1,annualCashOps[2]/1000);
    free_cash_data.setValue(0,2,-annualCapEx[2]/1000);
    free_cash_data.setValue(0,3,annualFreeCash[2]/1000);
    free_cash_data.setValue(1,1,annualCashOps[1]/1000);
    free_cash_data.setValue(1,2,-annualCapEx[1]/1000);
    free_cash_data.setValue(1,3,annualFreeCash[1]/1000);
    free_cash_data.setValue(2,1,annualCashOps[0]/1000);
    free_cash_data.setValue(2,2,-annualCapEx[0]/1000);
    free_cash_data.setValue(2,3,annualFreeCash[0]/1000);
    FreeCashChart.draw(free_cash_data, fc_options);
}

function resizeFC(wid, hi){
    fc_options.width = wid;
    fc_options.height = hi;
    FreeCashChart.draw(free_cash_data, fc_options);
}