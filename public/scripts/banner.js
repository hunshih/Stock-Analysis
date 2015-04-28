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
    //alert($(this).attr('href'));
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
    $.ajax({url: getRoic(ticker), success: function(response){
            netIncome = parseFloat(response.results[1].sep272014_value);
            dividendPaid = convertDividend(response.results[16].sep272014_value);
            roic = ((netIncome - dividendPaid)*100/totalCapital).toPrecision(4);          
            React.render(
            <SearchBox />, document.getElementById('searchBox')
        );
    }});
});

var getInustryLink = function(symbol){
    return "https://api.import.io/store/data/02134541-f2f4-4526-82ca-df3fa62307f6/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fin%3Fs%3D" + symbol + "%2BIndustry&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";
}

var getIndustryAverage = function(industry){
    return "https://api.import.io/store/data/3fd67b00-2b9b-4a23-9b0f-eafa74f90d0f/_query?input/webpage/url=" + industry + "&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";  
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
    var decimalValue = parseFloat(value.substring(0, value.length - 1));
    if(value.slice(-1) == 'M'){
        return (decimalValue*1.0e+6);
    }
    else return (decimalValue*(1.0e+9));
};
var convertDividend = function(value){
            alert(parseInt(value.substring(1, 10), 10));
    if(value.length <= 1) return 0;
    else return parseFloat(value.substring(1, value.length - 1));
};