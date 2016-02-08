function liquidityAnimation() {
    for(var a = 0; a < 1000; a++)
    {
        $('#liquidityIcon').hide( "slide", {
                direction: "down",
                easing: "easeInQuint"
            }, 1250 );
        $('#liquidityIcon').show( "fade", 1500 );
    }
};

function stopLiquidityAnimation() {
    $('#liquidityIcon').stop( true, true );
    $('#liquidityIcon').show( "fade", 2000 );
};

function stopEfficiencyAnimation()
{
    $(".spinning").css("-webkit-animation-play-state", "paused");
    $(".spinning").css("-moz-animation-play-state", "paused");
    $(".spinning").css("animation-play-state", "paused");
}

function startEfficiencyAnimation()
{
    $(".spinning").css("-webkit-animation-play-state", "running");
    $(".spinning").css("-moz-animation-play-state", "running");
    $(".spinning").css("animation-play-state", "running");
}

$( document ).ready(stopEfficiencyAnimation());
/////////////////Callback function on item switch/////////////////
function fliperCallback(currentItem, previousItem){
    selectedReport = reportMap[currentItem.id];
    refresh(selectedReport);
    if(currentItem.id.localeCompare("liquidity") == 0)
    {
        liquidityAnimation();
        stopEfficiencyAnimation();  
    }
    else if(currentItem.id.localeCompare("efficiency") == 0)
    {
        startEfficiencyAnimation();
        //stop animation
        stopLiquidityAnimation();
    }
    else
    {
        stopEfficiencyAnimation();  
        stopLiquidityAnimation();
    }
}

/////////////////////Flipster Scripts//////////////////
$('.reportFlipster').flipster({
    itemContainer: 'ul',
    // [string|object]
    // Selector for the container of the flippin' items.

    itemSelector: 'li',
    // [string|object]
    // Selector for children of `itemContainer` to flip

    start: 'center',
    // ['center'|number]
    // Zero based index of the starting item, or use 'center' to start in the middle

    fadeIn: 400,
    // [milliseconds]
    // Speed of the fade in animation after items have been setup

    loop: false,
    // [true|false]
    // Loop around when the start or end is reached

    autoplay: false,
    // [false|milliseconds]
    // If a positive number, Flipster will automatically advance to next item after that number of milliseconds

    pauseOnHover: true,
    // [true|false]
    // If true, autoplay advancement will pause when Flipster is hovered

    style: 'coverflow',
    // [coverflow|carousel|flat|...]
    // Adds a class (e.g. flipster--coverflow) to the flipster element to switch between display styles
    // Create your own theme in CSS and use this setting to have Flipster add the custom class

    spacing: -0.3,
    // [number]
    // Space between items relative to each item's width. 0 for no spacing, negative values to overlap

    click: true,
    // [true|false]
    // Clicking an item switches to that item

    keyboard: true,
    // [true|false]
    // Enable left/right arrow navigation

    scrollwheel: true,
    // [true|false]
    // Enable mousewheel/trackpad navigation; up/left = previous, down/right = next

    touch: true,
    // [true|false]
    // Enable swipe navigation for touch devices

    nav: false,
    // [true|false|'before'|'after']
    // If not false, Flipster will build an unordered list of the items
    // Values true or 'before' will insert the navigation before the items, 'after' will append the navigation after the items

    buttons: true,
    // [true|false|'custom']
    // If true, Flipster will insert Previous / Next buttons with SVG arrows
    // If 'custom', Flipster will not insert the arrows and will instead use the values of `buttonPrev` and `buttonNext`

    buttonPrev: 'Previous',
    // [text|html]
    // Changes the text for the Previous button

    buttonNext: 'Next',
    // [text|html]
    // Changes the text for the Next button

    onItemSwitch: fliperCallback
    // [function]
    // Callback function when items are switched
    // Arguments received: [currentItem, previousItem]
});