var PESection = React.createClass({
    render: function(){
        return(
            <div>
                <div id="PriceEarnings">
                    <h2>Price-Earnings</h2>
                    <p>{companyName}: {peRatio}</p>
                    <p>Industry Average: {industryPE}</p>
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