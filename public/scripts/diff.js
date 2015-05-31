  google.load("visualization", '1.1', {packages:['corechart']});
  google.setOnLoadCallback(drawChart);
  function drawChart() {
    var oldData = google.visualization.arrayToDataTable([
      ['Name', 'Popularity'],
      ['Cesar', 250],
      ['Rachel', 4200],
      ['Patrick', 2900],
      ['Eric', 8200]
    ]);

    var newData = google.visualization.arrayToDataTable([
      ['Name', 'Popularity'],
      ['Cesar', 370],
      ['Rachel', 600],
      ['Patrick', 700],
      ['Eric', 1500]
    ]);
    var colChartDiff = new google.visualization.ColumnChart(document.getElementById('colchart_diff'));

    var options = { legend: { position: 'top' } };


    var diffData = colChartDiff.computeDiff(oldData, newData);
    colChartDiff.draw(diffData, options);
  }