//////////////////Global Variable////////////////
var companyName;
var industryLink;
var ticker;
var industryPE;
var industryEY;
var industryNetMargin;
var industryRoe;
var industryPriceBook;
var netIncome;
var dividendPaid;
var excessCash;
var cashEquivalents;
var longTermInvestment;
var roic;
var roicScore;
var longTermDebt;
var shortTermDebt;
var totalEquity;
var totalAnnualEquity;
var totalCapital;
var totalQtrAssets;
var totalAnnualAssets;
var revenue;
var currentAssets;
var currentInventories;
var currentLiabilities;
var totalLiabilities;
var quickRatio;
var peRatio;
var earningYield;
var operationMargin;
var priceBook;
var payoutRatio;
var peScore;
var pbScore;
var eyScore;
var marketCapScore;
var marketCapDesc;
var payoutScore;
var quickScore;
var marketCap;
var marketCapString;
var sharePrice;
var annualCashOps;
var annualCapEx;
var annualFreeCash;
var debtequityRatio;
var assetsTurnoverRatios;
//////////////////Banner////////////////
var Banner = React.createClass({
    render: function(){
        return(
            <ul>
                <a href="#ratioView">Ratio</a>
                <a href="#cashView">Cash Flow</a>
                <a href="#reportView">Report Card</a>
                <a href="#creditView">Credits</a>
                <input type="text" placeholder="Ticker" id="ticker"></input>
                <button id="searchButton">Search</button>
            </ul>
        );
    }
});


React.render(
<Banner />, document.getElementById('header')
);
///////////////////Initial Views///////////////////////////
var viewIDs = ["#ratioView", "#cashView","#reportView", "#creditView"];

//////////////////////////////

$('#ticker').bind("enterKey",function(e){
    $( "#searchButton" ).trigger( "click" );
});
$('#ticker').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

var worker = new Worker('../scripts/calc.js');

//fire all requests, but make all calculation after return
$("#searchButton").click(function(){
    $("#loader").fadeIn(1000);
    $("#overlay-back").fadeIn(500);
    ticker = document.getElementById('ticker').value;
    $(this).attr('disabled', true);
    worker.postMessage(ticker);
});

worker.onmessage = function(e){
    $("#searchButton").attr('disabled', false);
    fillData(e);
    $("#loader").fadeOut(500);;
    $("#overlay-back").fadeOut(500);
    renderall();
}

function renderall(){
    peScore = peScaling(peRatio, industryPE).toPrecision(3);
    pbScore = pbScaling(priceBook);
    eyScore = eyScaling(earningYield);
    payoutScore = payoutScaling(payoutRatio);
    quickScore = quickScaling(quickRatio);
    roicScore = roicScaling(roic);
    marketCapScore = capScaling(marketCap);

    React.render(
        <SearchBox />, document.getElementById('searchBox')
    );
    
    skillsChart.datasets[0].points[0].value = peScore;
    skillsChart.datasets[0].points[1].value = eyScore;
    skillsChart.datasets[0].points[2].value = pbScore;
    skillsChart.datasets[0].points[3].value = roicScore;
    skillsChart.datasets[0].points[4].value = marketCapScore;
    skillsChart.datasets[0].points[5].value = payoutScore;
    skillsChart.datasets[0].points[6].value = quickScore;
    
    renderDescription();
    skillsChart.update();
    updateFreeCashChart();
    updateDEChart();
    updateATChart();
    
    
}

//////////////////Radar Graph////////////////
var radarData = {
    labels: ["peScore", "earningYield", "priceBook", "roic", "Market Cap", "payoutRatio", "quickRatio"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
};
var context = document.getElementById('radarChart').getContext('2d');
var skillsChart = new Chart(context).Radar(radarData);

/////////////////Easing/////////////////
//except for credit, need additional popup page
$('a').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1300, "easeOutQuart");
    return false;
});

function fillData(e){
    industryLink = e.data[0];
    industryPE = e.data[1];
    industryEY = e.data[2];
    industryNetMargin = e.data[3];
    industryRoe = e.data[4];
    industryPriceBook = e.data[5];
    companyName = e.data[6];
    sharePrice = e.data[7];
    marketCapString = e.data[8];
    marketCap = e.data[9];
    longTermInvestment = e.data[10];
    totalEquity = e.data[11];
    totalQtrAssets = e.data[12];
    currentAssets = e.data[13];
    currentInventories = e.data[14];
    currentLiabilities = e.data[15];
    cashEquivalents = e.data[16];
    excessCash = e.data[17];
    totalCapital = e.data[18];
    quickRatio = e.data[19];
    revenue = e.data[20];
    longTermDebt = e.data[21];
    shortTermDebt = e.data[22];
    totalLiabilities = e.data[23];
    totalAnnualEquity = e.data[24];
    totalAnnualAssets = e.data[25];
    debtequityRatio = e.data[26];
    assetsTurnoverRatios = e.data[27];
    netIncome = e.data[28];
    dividendPaid = e.data[29];
    roic = e.data[30];
    annualCashOps = e.data[31];
    annualCapEx = e.data[32];
    annualFreeCash = e.data[33];
    peRatio = e.data[34];
    earningYield = e.data[35];
    earningYield = e.data[36];
    operationMargin = e.data[37];
    priceBook = e.data[38];
    payoutRatio = e.data[39];
}