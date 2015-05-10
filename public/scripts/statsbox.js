var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <li>ticker: {ticker}</li>
                <li><button id="peButton">PE Score: {peScore}</button></li>
                <li><button id="pbButton">PB Score: {pbScore}</button></li>
                <li><button id="eyButton">EY Score: {eyScore}</button></li>
                <li><button id="payoutButton">Payout Score: {payoutScore}</button></li>
                <li><button id="ratioButton">Quick Score: {quickScore}</button></li>
                <li><button id="roicButton">ROIC Score: {roic}</button></li>
                <li><button id="capButton">Size Score: {marketCap}</button></li>
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

$("#pbButton").click(function(){
    $( "#acetop" ).hide();
    if ($("#walmart").is(":hidden")) {
        $( "#walmart" ).fadeToggle("slow", "linear");
    }
    
});
