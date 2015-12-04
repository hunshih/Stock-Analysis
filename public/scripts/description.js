var PESection = React.createClass({
    render: function(){
        return(
            <div>
                <div id="PriceEarnings">
                    <h2>Price-Earnings</h2>
                    <p id="content">In essence, the price-earnings ratio indicates the dollar amount an investor can expect to invest in a company in order to receive one dollar of that company’s earnings. <span>{companyName}</span> has the pe ratio of  <span>{peRatio}</span>, whereas the industry average is <span>{industryPE}</span></p>
                </div>
                <div id="PriceToBook">
                    <h2 >Price-To-Book</h2>
                    <p>{companyName}: {priceBook}</p>
                    <p>Industry Average: {industryPriceBook}</p>
                </div>
                <div id="EarningsYield">
                    <h2>Earnings Yield</h2>
                    <p>{companyName}: {earningYield}</p>
                    <p>Industry Average: {industryEY}</p>
                </div>
                <div id="PayoutRatios">
                    <h2>Payout Ratio</h2>
                    <p>{companyName}: {payoutRatio}</p>
                </div>
                <div id="QuickRatios">
                    <h2>Quick Ratio</h2>
                    <p>{companyName}: {quickRatio}</p>
                </div>
                <div id="ReturnOnIC">
                    <h2>Return on Invested Capital</h2>
                    <p>{companyName}: {roic}</p>
                </div>
                <div id="MarketCapital">
                    <h2>Market Capitalization</h2>
                    <p>{companyName}: {marketCapString}</p>
                </div>
            </div>
        )
    }
    
});

React.render(
    <PESection />, document.getElementById('description')                        
);

$("#PriceEarnings").hide();
$("#PriceToBook").hide();
$("#EarningsYield").hide();
$("#PayoutRatios").hide();
$("#QuickRatios").hide();
$("#ReturnOnIC").hide();
$("#MarketCapital").hide();

///////////////Render Cash Description///////////////////
var cashHeader;
var cashContent;
var CashSection = React.createClass({
    render: function(){
        return(
            <div>
                <h2>{cashHeader}</h2>
                <p>{cashContent}</p>
            </div>
        )
    }
});

React.render(
    <CashSection />, document.getElementById('cashDescription')                
);

//////////////Report Description////////////
var liquidityReport = "Liquidity describes the degree to which an asset or security can be quickly bought or sold in the market without affecting the asset's price.";

var profitabilityReport = "A class of financial metrics that are used to assess a business's ability to generate earnings as compared to its expenses and other relevant costs incurred during a specific period of time."

var efficiencyReport = "Efficiency signifies a level of performance that describes a process that uses the lowest amount of inputs to create the greatest amount of outputs.";

var selectedReport;

var reportMap = {};
reportMap["liquidity"] = liquidityReport;
reportMap["profitability"] = profitabilityReport;
reportMap["efficiency"] = efficiencyReport;

var ReportDesc = React.createClass({
    render: function(){
        return(
            <div>
                <p>{selectedReport}</p>
            </div>
        );
    }
});

React.render(
<ReportDesc />, document.getElementById('reportDescription')
);

function refresh(){
    React.render(
        <ReportDesc />, document.getElementById('reportDescription')
    );
}