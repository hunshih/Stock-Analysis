var PESection = React.createClass({
    render: function(){
        return(
            <div>
                <p id="peLetter">A+</p>
                <p id="pbLetter">B</p>
                <p id="eyLetter">B+</p>
                <p id="payoutLetter">A-</p>
                <p id="quickLetter">A</p>
                <p id="roicLetter">B+</p>
                <p id="capLetter">B</p>
            </div>
        )
    }
    
});

React.render(
    <PESection id="testID"/>, document.getElementById('description')                        
);

$("#peLetter").hide();
$("#pbLetter").hide();
$("#eyLetter").hide();
$("#payoutLetter").hide();
$("#quickLetter").hide();
$("#roicLetter").hide();
$("#capLetter").hide();