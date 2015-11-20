var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <li><button id="peButton">P/E Ratio: {peRatio}</button></li>
                <li><button id="pbButton">P/B Ratio: {priceBook}</button></li>
                <li><button id="eyButton">Earnings Yield: {earningYield}%</button></li>
                <li><button id="payoutButton">Payout Ratio: {payoutRatio}</button></li>
                <li><button id="quickButton">Quick Ratio: {quickRatio}</button></li>
                <li><button id="roicButton">ROIC: {roic}</button></li>
                <li><button id="capButton">Market Cap: {marketCapDesc}</button></li>
            </ul>
        );
    }
});


React.render(
<SearchBox />, document.getElementById('searchBox')
);

var buttonIDs = ["#PriceEarnings","#PriceToBook", "#EarningsYield", "#PayoutRatios", "#QuickRatios", "#ReturnOnIC", "#MarketCapital"];

function showSection(sectionID, inputArray){
    renderDescription();
    if ($(sectionID).is(":hidden")) {
        $( sectionID ).fadeToggle("slow", "linear");
    }
    for(var i in inputArray){
        if(inputArray[i] !== sectionID){
            $(inputArray[i]).hide(); 
        }
    }
};



$("#peButton").click(function(){
    showSection("#PriceEarnings", buttonIDs);
});

$("#pbButton").click(function(){
    showSection("#PriceToBook", buttonIDs);
});

$("#eyButton").click(function(){
    showSection("#EarningsYield", buttonIDs);
});

$("#payoutButton").click(function(){
    showSection("#PayoutRatios", buttonIDs);
});

$("#quickButton").click(function(){
    showSection("#QuickRatios", buttonIDs);
});

$("#roicButton").click(function(){
    showSection("#ReturnOnIC", buttonIDs);
});

$("#capButton").click(function(){
    showSection("#MarketCapital", buttonIDs);
});

