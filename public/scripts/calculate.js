function calculate()
{
    $(this).attr('disabled', true);
    ticker = document.getElementById('ticker').value;
    var httpLink = getInustryLink(ticker);
    //This merely gets the industry category
    //alert("getting industry link");
    $.ajax({url: getInustryLink(ticker), async:false, success: function(result){
        industryLink = result.results[0].industry;
    }});
    //error handle here
    
    //Use industry from prev call to get average
    //alert("getting industry average");
    $.ajax({url: getIndustryAverage(industryLink), async:false, success: function(response){
        industryPE = response.results[0].pe;
        industryEY = (1/industryPE).toPrecision(3);
        industryNetMargin = response.results[0].netprofitmargin;
        industryRoe = response.results[0].roe;
        industryPriceBook = response.results[0].pbook;
    }});
    //error handle here.
    //besides failed ajax, check for bad value
    //alert("getting M Cap");
    $.ajax({url: getMarketCap(ticker), async: false, success: function(response){
        companyName = response.query.results.quote.Name;
        //alert(companyName);
        sharePrice = response.query.results.quote.LastTradePriceOnly;
        marketCapString = response.query.results.quote.MarketCapitalization;
        marketCap = convertMarketCap(marketCapString);
        
    }});
    //alert("getting Qtr Data");
    $.ajax({url:getQtrData(ticker), async: false, success: function(response){
            longTermInvestment = parseString(response.results[9].value_3);
            totalEquity = parseString(response.results[38].value_3);
            totalQtrAssets = parseString(response.results[16].value_3);
            currentAssets = parseString(response.results[8].value_3);
            currentInventories = parseString(response.results[6].value_3);
            currentLiabilities = parseString(response.results[22].value_3);
            cashEquivalents = parseString(response.results[3].value_3);
            excessCash = cashEquivalents + longTermInvestment - currentLiabilities;
            totalCapital = totalQtrAssets - excessCash;
            quickRatio = ((currentAssets - currentInventories)/currentLiabilities).toPrecision(3);
    }});
    //alert("getting Income Statement");
    $.ajax({url: getIncomeStatement(ticker), async: false, success: function(response){
            for( var i = 0; i < 3; i++){
                revenue[i] = parseString(response.results[0].revenue[i+1]);
            }
        }
    });
    //alert("getting Anual Data");
    $.ajax({url:getAnlData(ticker), async: false, success: function(response){
            longTermDebt = jsonToAry(response.results[23], false);
            shortTermDebt = jsonToAry(response.results[20], false);
            totalLiabilities = jsonToAry(response.results[28], false);
            totalAnnualEquity = jsonToAry(response.results[38], false);
            totalAnnualAssets = jsonToAry(response.results[16], false);
            for( var indexting = 0; indexting < 3; indexting++){
                debtequityRatio[indexting] = (totalLiabilities[indexting] / totalAnnualEquity[indexting]).toFixed(2);
                assetsTurnoverRatios[indexting] = (revenue[indexting] / totalAnnualAssets[indexting]).toFixed(2);
            };
    }});
    //alert("getting Roic");
    $.ajax({url: getRoic(ticker), async: false, success: function(response){
                netIncome = parseString(response.results[1].sep272014_value);
                dividendPaid = convertDividend(response.results[16].sep272014_value);
                roic = ((netIncome - dividendPaid)*100/totalCapital).toPrecision(4);
                annualCashOps = jsonToAry(response.results[9], true);
                annualCapEx = jsonToAry(response.results[11], true);
                for(var index = 0; index < annualCashOps.length; index++){
                    annualFreeCash[index] = annualCashOps[index] + annualCapEx[index]; //capex is negative
                    //alert(annualFreeCash[index]);
                    //alert(annualCapEx[index]);
                }
    }});
    //alert("getting Ratios");
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
    renderDescription();
    skillsChart.update();
    updateFreeCashChart();
    updateDEChart();
    updateATChart();
    $(this).attr('disabled', false);
}