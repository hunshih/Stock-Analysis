onmessage = function(e) {
    calculate(e.data);
    console.log('onmessage');
    postMessage([
                     _industryLink,
                     _industryPE,
                     _industryEY,
                     _industryNetMargin,
                     _industryRoe,
                     _industryPriceBook,
                     _companyName,
                     _sharePrice,
                     _marketCapString,
                     _marketCap,
                     _longTermInvestment,
                     _totalEquity,
                     _totalQtrAssets,
                     _currentAssets,
                     _currentInventories,
                     _currentLiabilities,
                     _cashEquivalents,
                     _excessCash,
                     _totalCapital,
                     _quickRatio,
                     _revenue,
                     _longTermDebt,
                     _shortTermDebt,
                     _totalLiabilities,
                     _totalAnnualEquity,
                     _totalAnnualAssets,
                     _debtequityRatio,
                     _assetsTurnoverRatios,
                     _netIncome,
                     _dividendPaid,
                     _roic,
                     _annualCashOps,
                     _annualCapEx,
                     _annualFreeCash,
                     _peRatio,
                     _earningYield,
                     _earningYield,
                     _operationMargin,
                     _priceBook,
                     _payoutRatio
                ]);
};

var _industryLink;
var _industryPE;
var _industryEY;
var _industryNetMargin;
var _industryRoe;
var _industryPriceBook;
var _companyName;
var _sharePrice;
var _marketCapString;
var _marketCap;
var _longTermInvestment;
var _totalEquity;
var _totalQtrAssets;
var _currentAssets;
var _currentInventories;
var _currentLiabilities;
var _cashEquivalents;
var _excessCash;
var _totalCapital;
var _quickRatio;
var _revenue = [];
var _longTermDebt = [];
var _shortTermDebt = [];
var _totalLiabilities = [];
var _totalAnnualEquity = [];
var _totalAnnualAssets = [];
var _debtequityRatio = [];
var _assetsTurnoverRatios = [];
var _netIncome;
var _dividendPaid;
var _roic;
var _annualCashOps = [];
var _annualCapEx = [];
var _annualFreeCash = [];
var _peRatio;
var _earningYield;
var _earningYield;
var _operationMargin;
var _priceBook;
var _payoutRatio;

function calculate(_ticker)
{
    var httpLink = getInustryLink(_ticker);
    var xhttp = new XMLHttpRequest();
    //This merely gets the industry category
    xhttp.open("GET", getInustryLink(_ticker), false);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var industryJson = JSON.parse(xhttp.responseText);
            _industryLink = industryJson.results[0].industry;
        }
    };
    xhttp.send();
    
    //Use industry from prev call to get average
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("GET", getIndustryAverage(_industryLink), false);
    xhttp2.onreadystatechange = function() {
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            var industryAvgJson = JSON.parse(xhttp2.responseText);
            _industryPE = industryAvgJson.results[0].pe;
            _industryEY = (1/_industryPE).toPrecision(3);
            _industryNetMargin = industryAvgJson.results[0].netprofitmargin;
            _industryRoe = industryAvgJson.results[0].roe;
            _industryPriceBook = industryAvgJson.results[0].pbook;
        }
    };
    xhttp2.send();
    
    //Market Cap
    var xhttp3 = new XMLHttpRequest();
    xhttp3.open("GET", getMarketCap(_ticker), false);
    xhttp3.onreadystatechange = function() {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
            var markteJson = JSON.parse(xhttp3.responseText);
            _companyName = markteJson.query.results.quote.Name;
            _sharePrice = markteJson.query.results.quote.LastTradePriceOnly;
            _marketCapString =
                markteJson.query.results.quote.MarketCapitalization;
            _marketCap = convertMarketCap(_marketCapString);
        }
    };
    xhttp3.send();
    
    //Qtr Data
    var xhttp4 = new XMLHttpRequest();
    xhttp4.open("GET", getQtrData(_ticker), false);
    xhttp4.onreadystatechange = function() {
        if (xhttp4.readyState == 4 && xhttp4.status == 200) {
            var qtrJson = JSON.parse(xhttp4.responseText);
            _longTermInvestment = parseString(qtrJson.results[9].value_3);
            _totalEquity = parseString(qtrJson.results[38].value_3);
            _totalQtrAssets = parseString(qtrJson.results[16].value_3);
            _currentAssets = parseString(qtrJson.results[8].value_3);
            _currentInventories = parseString(qtrJson.results[6].value_3);
            _currentLiabilities = parseString(qtrJson.results[22].value_3);
            _cashEquivalents = parseString(qtrJson.results[3].value_3);
            _excessCash = _cashEquivalents + _longTermInvestment - _currentLiabilities;
            _totalCapital = _totalQtrAssets - _excessCash;
            _quickRatio = ((_currentAssets - _currentInventories)/_currentLiabilities).toPrecision(3);
        }
    };
    
    xhttp4.send();
    
    //Income Statement
    var xhttp5 = new XMLHttpRequest();
    xhttp5.open("GET", getIncomeStatement(_ticker), false);
    xhttp5.onreadystatechange = function() {
        if (xhttp5.readyState == 4 && xhttp5.status == 200) {
            var incomeJson = JSON.parse(xhttp5.responseText);
            for( var i = 0; i < 3; i++){
                _revenue[i] = parseString(incomeJson.results[0].revenue[i+1]);
            }
        }
    };
    
    xhttp5.send();
    
    //Annual Data
    var xhttp6 = new XMLHttpRequest();
    xhttp6.open("GET", getAnlData(_ticker), false);
    xhttp6.onreadystatechange = function() {
        if (xhttp6.readyState == 4 && xhttp6.status == 200) {
            var annualJson = JSON.parse(xhttp6.responseText);
            _longTermDebt = jsonToAry(annualJson.results[23], false);
            _shortTermDebt = jsonToAry(annualJson.results[20], false);
            _totalLiabilities = jsonToAry(annualJson.results[28], false);
            _totalAnnualEquity = jsonToAry(annualJson.results[38], false);
            _totalAnnualAssets = jsonToAry(annualJson.results[16], false);
            for( var indexting = 0; indexting < 3; indexting++){
                _debtequityRatio[indexting] = (_totalLiabilities[indexting] / _totalAnnualEquity[indexting]).toFixed(2);
                _assetsTurnoverRatios[indexting] = (_revenue[indexting] / _totalAnnualAssets[indexting]).toFixed(2);
            }
        }
    };
    
    xhttp6.send();
    
    //ROIC
    var xhttp7 = new XMLHttpRequest();
    xhttp7.open("GET", getRoic(_ticker), false);
    xhttp7.onreadystatechange = function() {
        if (xhttp7.readyState == 4 && xhttp7.status == 200) {
            var roicJson = JSON.parse(xhttp7.responseText);
            _netIncome = parseString(roicJson.results[1].sep272014_value);
            _dividendPaid = convertDividend(roicJson.results[16].sep272014_value);
            _roic = ((_netIncome -
                      _dividendPaid)*100/_totalCapital).toPrecision(4);
            _annualCashOps = jsonToAry(roicJson.results[9], true);
            _annualCapEx = jsonToAry(roicJson.results[11], true);
            for(var index = 0; index < _annualCashOps.length; index++){
                _annualFreeCash[index] = 
                    _annualCashOps[index] + _annualCapEx[index]; 
            }
        }
    };
    
    xhttp7.send();
    
    //Key Ratios
    var xhttp8 = new XMLHttpRequest();
    xhttp8.open("GET", getRatios(_ticker), false);
    xhttp8.onreadystatechange = function() {
        if (xhttp8.readyState == 4 && xhttp8.status == 200) {
            var ratioJson = JSON.parse(xhttp8.responseText);
            _peRatio = ratioJson.results[0].pe;
            _earningYield = (1/_peRatio).toPrecision(3);
            _earningYield = (_earningYield*100).toPrecision(3);
            _operationMargin = ratioJson.results[0].operationmargin;
            _priceBook = ratioJson.results[0].pbook;
            _payoutRatio = ratioJson.results[0].payout;
        }
    };
    
    xhttp8.send();
}

var getInustryLink = function(symbol){
    return "https://api.import.io/store/data/02134541-f2f4-4526-82ca-df3fa62307f6/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fin%3Fs%3D" + symbol + "%2BIndustry&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";
}

var getIndustryAverage = function(industry){
    return "https://api.import.io/store/data/3fd67b00-2b9b-4a23-9b0f-eafa74f90d0f/_query?input/webpage/url=" + industry + "&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7%3A8DLVNS8YsLcDmGnMp3Ne9XK4oWk30YKsoZRG8KWRUyXzPFCqYPlKBGHSE5rm1%2Bd121AIN8eZU6TQZIXwrkqenA%3D%3D";  
}

var getQtrData = function(symbol){
    return "https://api.import.io/store/data/8fb81fdf-edd5-47db-b30c-26a520ad9af7/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fbs%3Fs%3D" + symbol + "&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd390723ed45f586f569e5b8a4c9e7f032d5352f18b0b7039869cca7735ef572b8a16937d182aca19446f0a5915325f33c50aa60f94a0461d2139ae6d7e775db500837c79953a4d06485f0ae4a9e9c";    
}

var getAnlData = function(symbol){
    return "https://api.import.io/store/data/e8ff2eb8-53b3-474c-9811-a45d271bfc53/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fbs%3Fs%3D" + symbol + "%2BBalance%2BSheet%26annual&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd390723ed45f586f569e5b8a4c9e7f032d5352f18b0b7039869cca7735ef572b8a16937d182aca19446f0a5915325f33c50aa60f94a0461d2139ae6d7e775db500837c79953a4d06485f0ae4a9e9c";    
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

var getIncomeStatement = function(symbol){
    return "https://api.import.io/store/data/a84f0510-14fb-47e2-8014-24602a26f65b/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fis%3Fs%3D" + symbol + "%2BIncome%2BStatement%26annual&_user=bebd3907-23ed-45f5-86f5-69e5b8a4c9e7&_apikey=bebd390723ed45f586f569e5b8a4c9e7f032d5352f18b0b7039869cca7735ef572b8a16937d182aca19446f0a5915325f33c50aa60f94a0461d2139ae6d7e775db500837c79953a4d06485f0ae4a9e9c";
}

var convertMarketCap = function(value){
    if(value == null) return 0;
    var decimalValue = parseString(value.substring(0, value.length - 1));
    if(value.slice(-1) == 'M'){
        return (decimalValue*1.0e+6);
    }
    else return (decimalValue*(1.0e+9));
};


var parseString = function(value){
    var isPositive = true;
    var temp = value;
    if(value.indexOf('(') !== -1)
    {
        temp = temp.substring(1, value.length - 1);
        isPositive = false;
    }
    temp = temp.replace(/,/g, "");
    temp = temp.replace(/-/g, "0");
    if(isPositive){
        temp = parseFloat(temp);
    }
    else{
        temp = -1*parseFloat(temp);
    }
    return temp;
};
    
    
var jsonToAry = function(jsonObj){
    return [parseString(jsonObj.sep272014_value), parseString(jsonObj.sep282013_value), parseString(jsonObj.sep292012_value)];    
}

var convertDividend = function(value){
    if(value.length <= 1) return 0;
    else {
        return parseString(value);
    }
};