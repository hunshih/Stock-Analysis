var comboData;
var comboOption;
var CashComboChart;
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {
  // Some raw data (not necessarily accurate)
  comboData = google.visualization.arrayToDataTable([
    ['Year', 'Cash From Operation', 'Capital Expenditures', 'Free Cash'],
    ['2012',  0,      0,      0],
    ['2013',  0,      0,      0],
    ['2014',  0,      0,      0]
  ]);

  comboOption = {
    title : 'Free Cash Flow',
    vAxis: {title: "$"},
    hAxis: {title: "Year"},
    seriesType: "bars",
    series: {2: {type: "line"}},
    animation:{
        duration: 1000,
        easing: 'out',
    }
  };

  CashComboChart = new google.visualization.ComboChart(document.getElementById('comboChart'));
  CashComboChart.draw(comboData, comboOption);
}

function updateComboChart(){
    comboData.setValue(0,1,annualCashOps[2]);
    comboData.setValue(0,2,-annualCapEx[2]);
    comboData.setValue(0,3,annualFreeCash[2]);
    comboData.setValue(1,1,annualCashOps[1]);
    comboData.setValue(1,2,-annualCapEx[1]);
    comboData.setValue(1,3,annualFreeCash[1]);
    comboData.setValue(2,1,annualCashOps[0]);
    comboData.setValue(2,2,-annualCapEx[0]);
    comboData.setValue(2,3,annualFreeCash[0]);
    CashComboChart.draw(comboData, comboOption);
}