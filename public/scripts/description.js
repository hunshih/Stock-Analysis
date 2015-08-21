var PESection = React.createClass({
    render: function(){
        return(
            <div>
                <h2 id="peLetter">{peRatio}</h2>
                <h2 id="pbLetter">{priceBook}</h2>
                <h2 id="eyLetter">{earningYield}</h2>
                <h2 id="payoutLetter">{payoutRatio}</h2>
                <h2 id="quickLetter">{quickRatio}</h2>
                <h2 id="roicLetter">{roic}</h2>
                <h2 id="capLetter">{marketCap}</h2>
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