/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/11 10:08>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

//------------------回车事件------------------------
function keyEnter(dataname) {
    if (event.keyCode == 13)  //回车键的键值为13
        $(dataname).click(); //调用元素的点击事件
}


//----------------省略字数--------------------
//设置class为displayPart，
//设置自定义属性，displayLength可显示长度（不包含...），双字节字符，长度 *2，
$.fn.extend({
    displayPart: function () {
        var displayLength = 100;
        displayLength = this.attr("displayLength") || displayLength;
        var text = this.text();
        if (!text) return "";

        var result = "";
        var count = 0;
        for (var i = 0; i < displayLength; i++) {
            var _char = text.charAt(i);
            if (count >= displayLength) break;
            if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文

            result += _char;
            count++;
        }
        if (result.length < text.length) {
            result += "...";
        }
        this.text(result);
    }
});

$(".displayPart").each(function () {
    $(this).displayPart();
});


//--------------------------省略字数方法(单一字符和数组)--------------------
function testDisplayPart(val, len) {
    var result = "",
        count = 0;
    var displayLength = 10;
    displayLength = len || displayLength;
    for (var i = 0; i < displayLength; i++) {
        var _char = val.charAt(i);
        if (count >= displayLength) break;
        if (/[^x00-xff]/.test(_char)) count++; //双字节字符，[u4e00-u9fa5]中文
        result += _char;
        count++;
    }
    if (result.length < val.length) {
        result += "...";
    }
    return result;
}

function arrayDisplayPart(arr, len) {
    var arr_new = [],
        item_new = '';
    var displayLength = 10;
    displayLength = len || displayLength;
    $.each(arr, function (index, value) {
        item_new = testDisplayPart(value, displayLength);
        arr_new.push(item_new);
    });
    return arr_new;
}


//------------------正则表达式验证-----------------
function regularExpression(type, val) {
    var test_type = type,
        val = val,
        test_rule;
    switch (test_type) {
        case "positive_integers":
            test_rule = /^[0-9]*[1-9][0-9]*$/;    //正整数
            break;
        case "positive_integers_zero":
            test_rule = /^[0-9]*[0-9][0-9]*$/;    //正整数(包括0)
            break;
        case "phone_number":
            test_rule = /^1[35847][0-9][0-9]{8}$/;  //手机号
            break;
        case "email":
            test_rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;  //邮箱
            break;
    }
    var result = test_rule.test(val);
    return result;
}
