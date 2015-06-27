//////////////////Global Variable////////////////
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
var totalEquity;
var totalCapital;
var totalAssets;
var currentAssets;
var currentInventories;
var currentLiabilities;
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
var payoutScore;
var quickScore;
var marketCap;
var sharePrice;
//////////////////Banner////////////////
var Banner = React.createClass({
    render: function(){
        return(
            <ul>
                <a href="#ratio">Ratio</a>
                <a href="#cash">Cash Flow</a>
                <a href="#report">Report Card</a>
                <a href="#credits">Credits</a>
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
$("#cashView").hide();
$("#reportView").hide();
$("#creditView").hide();
$('a[href="#ratio"]').click(function(){
  showSection("#ratioView", viewIDs);
    //context = document.getElementById('radarChart').getContext('2d');
    //skillsChart = new Chart(context).Radar(radarData);
}); 
$('a[href="#cash"]').click(function(){
  showSection("#cashView", viewIDs);
}); 
$('a[href="#report"]').click(function(){
  showSection("#reportView", viewIDs);
}); 
$('a[href="#credits"]').click(function(){
  showSection("#creditView", viewIDs);
}); 
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

$("#searchButton").click(function(){
    $(this).attr('disabled', true);
    ticker = document.getElementById('ticker').value;
    var httpLink = getInustryLink(ticker);
    $.ajax({url: getInustryLink(ticker), async:false, success: function(result){
        industryLink = result.results[0].industry;
    }});
    $.ajax({url: getIndustryAverage(industryLink), async:false, success: function(response){
        industryPE = response.results[0].pe;
        industryEY = (1/industryPE).toPrecision(3);
        industryNetMargin = response.results[0].netprofitmargin;
        industryRoe = response.results[0].roe;
        industryPriceBook = response.results[0].pbook;
    }});
    $.ajax({url: getMarketCap(ticker), async: false, success: function(response){
        sharePrice = response.query.results.quote.LastTradePriceOnly;
        marketCap = response.query.results.quote.MarketCapitalization;
        marketCap = convertMarketCap(marketCap);     
    }});
    $.ajax({url:getQuickRatio(ticker), async: false, success: function(response){
            longTermDebt = parseString(response.results[23].value_3);
            longTermInvestment = parseString(response.results[9].value_3);
            totalEquity = parseString(response.results[38].value_3);
            totalAssets = parseString(response.results[16].value_3);
            currentAssets = parseString(response.results[8].value_3);
            currentInventories = parseString(response.results[6].value_3);
            currentLiabilities = parseString(response.results[22].value_3);
            cashEquivalents = parseString(response.results[3].value_3);
            excessCash = cashEquivalents + longTermInvestment - currentLiabilities;
            totalCapital = totalAssets - excessCash;
            quickRatio = ((currentAssets - currentInventories)/currentLiabilities).toPrecision(3);
    }});  
    $.ajax({url: getRoic(ticker), async: false, success: function(response){
                netIncome = parseString(response.results[1].sep272014_value);
                dividendPaid = convertDividend(response.results[16].sep272014_value);
                //alert(netIncome);alert(dividendPaid);alert(totalCapital);
                roic = ((netIncome - dividendPaid)*100/totalCapital).toPrecision(4);
        //alert(totalCapital);
        //alert(response.results[1].sep272014_value);
        //alert(dividendPaid);
    }});
    $.ajax({url:getRatios(ticker), async: false, success: function(response){
          peRatio = response.results[0].pe;
          earningYield = (1/peRatio).toPrecision(3);
          earningYield = (earningYield*100).toPrecision(3);
          operationMargin = response.results[0].operationmargin;
          priceBook = response.results[0].pbook;
          payoutRatio = response.results[0].payout;
    }});
    peScore = peScaling(peRatio, industryPE).toPrecision(3);
    pbScore = pbScaling(priceBook);
    eyScore = eyScaling(earningYield);
    payoutScore = payoutScaling(payoutRatio);
    quickScore = quickScaling(quickRatio);
    roicScore = roicScaling(roic);
    marketCapScore = capScaling(marketCap);
    var ChartData = [peScore, earningYield, priceBook, roic, 5, payoutRatio, quickRatio];
    React.render(
        <SearchBox />, document.getElementById('searchBox')
    );
    //skillsChart = new Chart(context).Radar(radarData);
    skillsChart.datasets[0].points[0].value = peScore;
    skillsChart.datasets[0].points[1].value = eyScore;
    skillsChart.datasets[0].points[2].value = pbScore;
    skillsChart.datasets[0].points[3].value = roicScore;
    skillsChart.datasets[0].points[4].value = marketCapScore;
    skillsChart.datasets[0].points[5].value = payoutScore;
    skillsChart.datasets[0].points[6].value = quickScore;
    //skillsChart.datasets[0].data = ChartData.slice();
    //alert(skillsChart.datasets[0].data);
    //alert(ChartData.slice());
    skillsChart.update();
    updateLineChart();
    $(this).attr('disabled', false);
});

var getInustryLink = function(symbol){
    return "https://api.import.io/store/data/02134541-f2f4-4526-82ca-df3fa62307f6/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fin%3Fs%3D" + symbol + "%2BIndustry&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";
}

var getIndustryAverage = function(industry){
    return "https://api.import.io/store/data/3fd67b00-2b9b-4a23-9b0f-eafa74f90d0f/_query?input/webpage/url=" + industry + "&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";  
}

var getQuickRatio = function(symbol){
    return "https://api.import.io/store/data/8fb81fdf-edd5-47db-b30c-26a520ad9af7/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fbs%3Fs%3D" + symbol + "&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";    
}

var getRoic = function(symbol){
    return "https://api.import.io/store/data/c7ce718a-6756-4c73-b885-0d688e996635/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fcf%3Fs%3D" + symbol + "%26annual&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";  
}

var getRatios = function(symbol){
    return "https://api.import.io/store/data/d53a442a-94ef-45b8-acd7-d2bcac37b007/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fks%3Fs%3D" + symbol + "%2BKey%2BStatistics&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D"
}

var getMarketCap = function(symbol){
    return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + symbol + "%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
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
        }/*
        ,
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
        */
    ]
};
var context = document.getElementById('radarChart').getContext('2d');
var skillsChart = new Chart(context).Radar(radarData);