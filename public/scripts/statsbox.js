var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <li>ticker: {ticker}</li>
                <li><button id="peButton">PE Score: {presentPE}</button></li>
                <li><button id="industryPEButton">industryPE: {priceBook}</button></li>
                <li><button id="eyButton">industryEY: {earningYield}</button></li>
                <li><button id="marginButton">industryNetMargin: {payoutRatio}</button></li>
                <li><button id="ratioButton">quick ratio: {quickRatio}</button></li>
                <li><button id="roicButton">ROIC: {roic}</button></li>
                <li><button id="capButton">Market Cap: {marketCap}</button></li>
            </ul>
        );
    }
});


React.render(
<SearchBox />, document.getElementById('searchBox')
);

$("#peButton").click(function(){
    if ($("#acetop").is(":hidden")) {
        $( "#acetop" ).fadeToggle("slow", "linear");
    }
    $( "#walmart" ).hide();
});

$("#industryPEButton").click(function(){
    $( "#acetop" ).hide();
    if ($("#walmart").is(":hidden")) {
        $( "#walmart" ).fadeToggle("slow", "linear");
    }
    
});
