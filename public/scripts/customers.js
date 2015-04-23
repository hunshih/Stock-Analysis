var Customers = React.createClass({
    render: function(){
        return(
            <div>
                <img src='../image/walmart.jpg' />
            <img src='../image/spencers.jpg' />
            </div>
        );
    }
}); 

React.render(
  <Customers />, document.getElementById("customer")  
);