var numMap = {
    "0" : ["零","零"],
    "1" : ["一","壹"],
    "2" : ["二","贰"],
    "3" : ["三","叁"],
    "4" : ["四","肆"],
    "5" : ["五","伍"],
    "6" : ["六","陆"],
    "7" : ["七","柒"],
    "8" : ["八","捌"],
    "9" : ["九","玖"]
};

var powMap = {
    "1" : [""],
    "10" : ["十"],
    "100" : ["百"],
    "1000" : ["千"],
    "10000" : ["万"],
    "100000" : ["十万"],
    "1000000" : ["百万"],
    "10000000" : ["千万"],
    "100000000" : ["亿"]
};

// CASE 1 :
// 10000 => 1万
// 15000 => 1.5万
// 100000 => 10万
// 101111 => 10万、10.1万、10.11万、10.111万（可以设置位数）
// 1000 => 1千
// 1100 => 1.1
// 10000000 => 1000万
// 11110000 => 1111万

// number : 待转换数字
// power : 幂，哪些位显示汉字位，传入数组，默认为 [4,8] (万、亿)，即所有数字显示为 n[0-3].mm 万 或者 n[0-3].mm 亿
// size : 小数点后几位
// miss : 是否忽略纯0情况


var mixChinese = function(number,size,power,miss){

    if(!number){
        return number;
    }

    "undefined" === typeof size && (size = 2);
    "[object Array]" !== Object.prototype.toString.call(power) && (power=[1000,10000,100000000]);
    "undefined" === typeof miss && (miss = false);

    var _power = power.sort(function(a,b){
        return (+b) - (+a)
    });
    var pow = _power.filter(function(item){
        return number >= item
    });

    pow = pow[0] || _power[_power.length-1];

    if(number < pow) return number;
    var divided = number/pow
    var left = Math.floor(divided),
        right = divided - left,
        middle = '';

    if(right){
        middle = '.'
        right = right.toString().match(/\d+/g)[1].slice(0,2);

        var isAllZeroReg = new RegExp("0{" + size + "}",'g');
        var isAllZero = right.match(isAllZeroReg);

        var isLastZeroReg = new RegExp('0+^','g');
        var isLastZero = right.match(isLastZeroReg);

        if(isAllZero && miss){
            right = '';
            middle = '';
        }else if(isAllZero && !miss){
            right = ('0').repeat(size-1) + '1';
        }
        right = right.replace(/0+$/,'');

    }else{
        right = ''
    }
    var num = left + middle + right;
    if(+num){
        return num + powMap[pow];
    }else{
        return num;
    }
}


module.exports = {
    "mixChinese" : mixChinese, //混合数字+中文，见case1
    "pureSimplifiedChiese" : function(){}, //纯汉字
    "pureComplexChinese" : function(){} //纯繁体字
}
