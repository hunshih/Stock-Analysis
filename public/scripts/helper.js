var parseString = function(value){
    var isPositive = true;
    var temp = value;
    if(value.indexOf('(') !== -1)
    {
        temp = temp.substring(1, value.length - 1);
        isPositive = false;
    }
    temp = temp.replace(/,/g, "");
    temp = temp.replace(/-/g, "0");
    if(isPositive){
        temp = parseFloat(temp);
    }
    else{
        temp = -1*parseFloat(temp);
    }
    return temp;
};

var getPeBase = function(value){
        if(value <= 15){
            return 5
        }
        else{
            return (75/value);
        }
};

var getPeBonus = function(value, average){
        if(value < (0.5*average)){
           return 5;
        }
        else if(value <= average ){
            var slope = (-2/(0.5*average));
            return (slope * value + 7);
        }
        else{
            return (3 * average)/value;   
        }
};

var peScaling = function(value, average){
    var result = 0;
    var base = getPeBase(value);
    var bonus = getPeBonus(value, average);
    result = base + bonus;
    return result;
};

var pbScaling = function(value){
    var result = 0;
    if(value < 1){
        result = 9;
    }
    else if(value < 3){
        result = 8;
    }
    else if(value < 5){
        result = 7;
    }
    else if(value < 8){
        result = 6;
    }
    else{
        result = 5;
    }
    return result;
};

var eyScaling = function(value){
    var result = 0;
    if(value > 10){
        result = 10;
    }
    else{
        result = 5;
    }
    return result;
};

var payoutScaling = function(value){
    var result = 0;
    if(value > 100 || value < 10){
        result = 3;
    }
    else if(value > 70){
        result = 5;
    }
    else if(value > 30){
        result = 7;
    }
    else{
        result = 8;
    }
    return result;
}

var quickScaling = function(value){
    var result = 0;
    if(value < 0.5){
        result = 2;
    }
    else if(value < 0.7){
        result = 3;
    }
    else if(value < 0.8){
        result = 4;
    }
    else if(value < 1){
        result = 5;
    }
    else if(value < 1.1){
        result = 6;
    }
    else if(value < 1.5){
        result = 7;
    }
    else if(value < 2){
        result = 8;
    }
    else{
        result = 9;
    }
    return result;
}

var roicScaling = function(value){
    var result = 0;
    if(value < 5){
        result = 3;
    }
    else if(value < 10){
        result = 4;
    }
    else if(value < 15){
        result = 5;
    }
    else if(value < 20){
        result = 6;
    }
    else if(value < 25){
        result = 7;
    }
    else if(value < 30){
        result = 8;
    }
    else{
        result = 9;
    }
    return result;
}

var capScaling = function(value){
    var result = 0;
    if(value < 1217*1.0e+6){
        result = 5;
        marketCapDesc = "Small"
    }
    else if(value < 3789*1.0e+6){
        result = 6;
        marketCapDesc = "Medium"
    }
    else if(value < 16621*1.0e+6){
        result = 7;
        marketCapDesc = "Medium"
    }
    else{
        result = 8;
        marketCapDesc = "Large"
    }
    return result;
}

//Stats box and description fade animation
$(window).scroll(function() {
    var st = $(this).scrollTop();
    if (st > 400) {
        $("#searchBox").css({ 'opacity' : 1 - st/600 });
        $("#description").css({ 'opacity' : 1 - st/600 });
        if(st > 600){
            $("#searchBox").css({'display': 'none'});
            $("#description").css({'display': 'none'});
        }
    }
    else{
        $("#searchBox").css({'display': 'inline'});
        $("#searchBox").css({ 'opacity' : 1 });
        $("#description").css({'display': 'inline'});
        $("#description").css({ 'opacity' : 1 });
    }
});

function renderDescription() {
    React.render(
        <PESection />, document.getElementById('description')                      
    );
}

var cashMap = {};
cashMap["AssetTurnoverChart"] = "Assets Turnover Ratio";
cashMap["lineChart"] = "Debt to Equity Ratio";
cashMap["FreeCashFlow"] = "Free Cash Flow";
function graphSelect(obj) {
    var clicked = obj;
    $(obj).css('transform', 'scale(1.05)');
    $(obj).css({ 'opacity' : 1 });
    cashHeader = cashMap[obj.id];
    $('#cashView').children().children().each(function () {
        if(clicked != this && this.id != 'cashDescription'){
            $(this).css('transform', 'scale(1.00)');
            $(this).css({ 'opacity' : 0.4 });
            //$(this).on("click");
        }
    });
    React.render(
        <CashSection />, document.getElementById('cashDescription')  
    );    
    $("#cashDescription").hide();
    $("#cashDescription").fadeIn(700);
}
//////////////////////Load File of Public Companies/////
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var result = allText.split('\n');
                for(var company in result)
                {
                    companyList.push(result[company]);
                    //alert(result[company]);   
                }
                //alert(companyList.length);
            }
        }
    }
    rawFile.send(null);
}

window.onload()
{
    readTextFile("../pages/companies.csv");   
}