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
var roic;
var longTermDebt;
var totalEquity;
var totalCapital;
var currentAssets;
var currentInventories;
var currentLiabilities;
var quickRatio;
//////////////////Banner////////////////
var Banner = React.createClass({
    render: function(){
        return(
            <ul>
                <a href="#ratio">Ratio</a>
                <a href="#cash">Cash Flow</a>
                <a href="#ownership">Report Card</a>
                <a href="#credits">Credits</a>
                <input type="text" placeholder="Ticker" id="ticker"></input>
                <button type="button">Search</button>
            </ul>
        );
    }
});


React.render(
<Banner />, document.getElementById('header')
);

$('a').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 2000, "easeInOutQuart");
    return false;
});


$("button").click(function(){
    ticker = document.getElementById('ticker').value;
    var httpLink = getInustryLink(ticker);
    $.ajax({url: getInustryLink(ticker), success: function(result){
        industryLink = result.results[0].industry;
        $.ajax({url: getIndustryAverage(industryLink), success: function(response){
            industryPE = response.results[0].pe;
            industryEY = (1/industryPE).toPrecision(3);
            industryNetMargin = response.results[0].netprofitmargin;
            industryRoe = response.results[0].roe;
            industryPriceBook = response.results[0].pbook;
            React.render(
            <SearchBox />, document.getElementById('searchBox')
            );
        }});
    }});
    $.ajax({url:getQuickRatio(ticker), success: function(response){
            longTermDebt = parseString(response.results[23].value_3);
            totalEquity = parseString(response.results[38].value_3);
            totalCapital = longTermDebt + totalEquity;
            currentAssets = parseString(response.results[8].value_3);
            currentInventories = parseString(response.results[6].value_3);
            currentLiabilities = parseString(response.results[22].value_3);
            quickRatio = ((currentAssets - currentInventories)/currentLiabilities).toPrecision(3);
            $.ajax({url: getRoic(ticker), success: function(response){
                netIncome = parseString(response.results[1].sep272014_value);
                dividendPaid = convertDividend(response.results[16].sep272014_value);
                //alert(netIncome);alert(dividendPaid);alert(totalCapital);
                roic = ((netIncome - dividendPaid)*100/totalCapital).toPrecision(4);          
                React.render(
                <SearchBox />, document.getElementById('searchBox')
                );
            }});
    }});    
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
//////////////////Search Box////////////////
var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <li>industry: {industryLink}</li>
                <li>ticker: {ticker}</li>
                <li>industryPE: {industryPE}</li>
                <li>industryEY: {industryEY}</li>
                <li>industryNetMargin: {industryNetMargin}</li>
                <li>industryPriceBook: {industryPriceBook}</li>
                <li>quick ratio: {quickRatio}</li>
                <li>ROIC: {roic}</li>
            </ul>
        );
    }
});


React.render(
<SearchBox />, document.getElementById('searchBox')
);

//////////////////Radar Graph////////////////
var radarData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
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
    ]
};
var context = document.getElementById('radarChart').getContext('2d');
var skillsChart = new Chart(context).Radar(radarData);
//////////////////Helper Function////////////////
var convertMarketCap = function(value){
    if(value == null) return 0;
    var decimalValue = parseString(value.substring(0, value.length - 1));
    if(value.slice(-1) == 'M'){
        return (decimalValue*1.0e+6);
    }
    else return (decimalValue*(1.0e+9));
};
var convertDividend = function(value){
    if(value.length <= 1) return 0;
    else {
        var parsedValue = value.substring(1, value.length - 1);
        return parseString(parsedValue);
    }
};

var parseString = function(value){
    var temp = value;
    temp = temp.replace(/,/g, "");
    return parseFloat(temp);
};