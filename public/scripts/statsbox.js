var SearchBox = React.createClass({
    render: function(){
        return(
            <ul>
                <p>{ticker}</p>
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

function showSection(sectionID, inputArray){
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
    showSection("#peLetter", buttonIDs);
});

$("#pbButton").click(function(){
    showSection("#pbLetter", buttonIDs);
});

$("#eyButton").click(function(){
    showSection("#eyLetter", buttonIDs);
});

$("#payoutButton").click(function(){
    showSection("#payoutLetter", buttonIDs);
});

$("#quickButton").click(function(){
    showSection("#quickLetter", buttonIDs);
});

$("#roicButton").click(function(){
    showSection("#roicLetter", buttonIDs);
});

$("#capButton").click(function(){
    showSection("#capLetter", buttonIDs);
});

