var numberToChinese = require('./index.js')

var case1Index = 0;
var case1 = function(){
    case1Index++;
    console.log(case1Index + ' : ' + arguments[0] + '  ---  ' + numberToChinese.mixChinese.apply(null,arguments))
}

case1(99000)
case1(99900)
case1(100000000000 - 1)

case1(0)
case1(0.1)
case1(10000)
case1(11111)
case1(1101111111)
case1(111)
case1(801.001,2,[1000,10000,100000000],false)
case1(10010,2,[10000,100000000],false)
case1(1)
case1(1110,2,[100,100000],true)
case1(803000)
