var PESection = React.createClass({
    render: function(){
        return(
            <div>
                <img id="acetop" src="../image/home.jpg" ></img>
                <img id="walmart" src="../image/walmart.jpg" ></img>
            </div>
        )
    }
    
});

React.render(
    <PESection id="testID"/>, document.getElementById('description')                        
);

$("#acetop").hide();
$("#walmart").hide();
