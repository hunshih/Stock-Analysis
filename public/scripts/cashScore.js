var cashScore = React.createClass({
    render: function(){
        return(
            <div>
                <img src="../image/walmart.jpg"></img>
            </div>
        )
    }
    
});

React.render(
    <cashScore />, document.getElementById('cashDescription')                        
);