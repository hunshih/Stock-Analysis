var PESection = React.createClass({
    render: function(){
        return(
            <div>
                <h2 id="peLetter">{roic}</h2>
                <h2 id="pbLetter">B</h2>
                <h2 id="eyLetter">B+</h2>
                <h2 id="payoutLetter">A-</h2>
                <h2 id="quickLetter">A</h2>
                <h2 id="roicLetter">B+</h2>
                <h2 id="capLetter">B</h2>
            </div>
        )
    }
    
});

React.render(
    <PESection />, document.getElementById('description')                        
);

$("#peLetter").hide();
$("#pbLetter").hide();
$("#eyLetter").hide();
$("#payoutLetter").hide();
$("#quickLetter").hide();
$("#roicLetter").hide();
$("#capLetter").hide();