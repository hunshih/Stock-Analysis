var divStyle = {
    position: 'relative',
    WebkitTransition: 'all', // note the capital 'W' here
    msTransition: 'all', // 'ms' is the only lowercase vendor prefix
    height: '750',
    top: '50'
};

var bgStyle = {
    backgroundImage: 'url(../image/home.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '700',
    opacity: '.4'
};

var contentStyle = {
    color: 'black',
    position: 'absolute',
    top: '100',
    left: '200',
    right: '200',
    background: 'rgba(255, 255, 255, 0.75)',
    boxShadow: '10 2 5 rgba(0, 0, 0, 0.9)',
    borderRadius: '5',
    fontSize: '20',
    padding: '10',
    lineHeight: '1.5'
}

var About = React.createClass({
    render: function(){
        return (
            <div style={divStyle}>
                <div style={bgStyle}></div>
                <div style={contentStyle}>
                    <p>
            Acetop International Inc. was established in 1990 in Taipei, Taiwan as a company    exporting creatively designed items. In 2001, in order to provide our customers with even more competitive prices and better quality of products, we set up our own factory at Jiangxi Province, China. Our factory is specialized in producing high quality poly-resin, cold-cast bronze and fine porcelain items.
                    </p>
            With over 800 employees, including R&D and QA departments, our company missions are:
<li>Top creative design.</li>
<li>Top quality product with top quality package. </li>
<li>Top quality service.</li>
<li>Most competitive price in the market.</li> 
                    <p>
            Besides our available designs that you can find from this web site, we can provide OEM/ODM service based on client's individual ideas and also design for their needs with our strong design team in free of charge. In the long run, customers will find that it is exceptionally reliable and valuable to buy from Acetop International Inc.
                    </p>
                </div>
            </div>
        );
    }
});

React.render(
    <About />,
    document.getElementById('about')
);
