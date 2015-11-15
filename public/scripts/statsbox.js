var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <li><button id="peButton">PE Score: {peScore}</button></li>
                <li><button id="pbButton">PB Score: {pbScore}</button></li>
                <li><button id="eyButton">EY Score: {eyScore}</button></li>
                <li><button id="payoutButton">Payout Score: {payoutScore}</button></li>
                <li><button id="quickButton">Quick Score: {quickScore}</button></li>
                <li><button id="roicButton">ROIC Score: {roicScore}</button></li>
                <li><button id="capButton">Size Score: {marketCapScore}</button></li>
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

