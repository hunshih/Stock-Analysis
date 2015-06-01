var cashDescription = React.createClass({
    render: function(){
        return(
            <ul>
                <a href="#ratio">Ratio</a>
                <a href="#cash">Cash Flow</a>
                <a href="#report">Report Card</a>
                <a href="#credits">Credits</a>
                <input type="text" placeholder="Ticker" id="ticker"></input>
                <button id="searchButton">Search</button>
            </ul>
        )
    }
    
});

React.render(
<cashDescription />, document.getElementById('cashDescription')
);