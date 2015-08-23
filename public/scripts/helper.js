var convertMarketCap = function(value){
    if(value == null) return 0;
    var decimalValue = parseString(value.substring(0, value.length - 1));
    if(value.slice(-1) == 'M'){
        return (decimalValue*1.0e+6);
    }
    else return (decimalValue*(1.0e+9));
};

var convertDividend = function(value){
    if(value.length <= 1) return 0;
    else {
        return parseString(value);
    }
};

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
    }
    else if(value < 3789*1.0e+6){
        result = 6;
    }
    else if(value < 16621*1.0e+6){
        result = 7;
    }
    else{
        result = 8;
    }
    return result;
}

var jsonToAry = function(jsonObj){
    return [parseString(jsonObj.sep272014_value), parseString(jsonObj.sep282013_value), parseString(jsonObj.sep292012_value)];    
}

//Search box fade animation
$(window).scroll(function() {
    var st = $(this).scrollTop();
    if (st > 400) {
        $("#searchBox").css({ 'opacity' : 1 - st/700 });
    }
    else{
        $("#searchBox").css({ 'opacity' : 1 });
    }
});