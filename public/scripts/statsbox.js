var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <li>ticker: {ticker}</li>
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

var buttonIDs = ["#peLetter","#pbLetter", "#eyLetter", "#payoutLetter", "#quickLetter", "#roicLetter", "#capLetter"];

function showSection(sectionID){
    if ($(sectionID).is(":hidden")) {
        $( sectionID ).fadeToggle("slow", "linear");
    }
    for(var i in buttonIDs){
        if(buttonIDs[i] !== sectionID){
            $(buttonIDs[i]).hide(); 
        }
    }
};

$("#peButton").click(function(){
    showSection("#peLetter");
});

$("#pbButton").click(function(){
    showSection("#pbLetter");
});

$("#eyButton").click(function(){
    showSection("#eyLetter");
});

$("#payoutButton").click(function(){
    showSection("#payoutLetter");
});

$("#quickButton").click(function(){
    showSection("#quickLetter");
});

$("#roicButton").click(function(){
    showSection("#roicLetter");
});

$("#capButton").click(function(){
    showSection("#capLetter");
});

