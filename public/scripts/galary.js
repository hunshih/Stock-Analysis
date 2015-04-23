var Galary = React.createClass({
    render: function(){
        return (
            <div class="item"><img src='../image/mountain.jpg'/></div>
            <div class="item"><img src='../image/valley.jpg'/></div>
        );
    }
});

React.render(
<Galary />, document.getElementById('galary')  
);

$(document).ready(function() {
 
  $("#galary").owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
 
  });
 
});