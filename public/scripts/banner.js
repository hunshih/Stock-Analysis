var Banner = React.createClass({
    render: function(){
        return(
            <ul>
                <a href="#ratio">Ratio</a>
                <a href="#cash">Cash Flow</a>
                <a href="#ownership">Ownership</a>
                <a href="#credits">Credits</a>
            </ul>
        );
    }
});


React.render(
<Banner />, document.getElementById('header')
);

$('a').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 2000, "easeInOutQuart");
    //alert($(this).attr('href'));
    return false;
});