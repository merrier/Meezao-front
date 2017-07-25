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


//------------------获取图片url地址---------------
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
};


//---------------背景图上传------------
//获取图片大小的方法:this.files[0].size
function bgImageUpload(showclass, picurl, filesize, size) {
    var showclass = showclass;
    var picurl = picurl;
    var filesize = filesize;
    var size = size;
    var limitsize = size * 1024 * 1000;
    if (filesize > limitsize) {
        alertShow("danger", 3, "图片不能大于" + size + "M!");
    } else {
        $(showclass).show().attr("src", picurl);
        $(showclass).siblings(".upload_img_hideinput").val(picurl);
        alertShow("success", 3, "图片上传成功!");
    }
}


//------------------字数统计-------------------
$(".input_word_limit").keyup(function () {
    var len = $(this).val().length;
    var numbox = $(this).siblings(".input_num_box");
    numbox.children(".input_num").text(len);
});


//-----------------返回字符串长度，中文为两个字节，英文为一个字节-----------------
function getStrlen(str) {
    var myLen = 0,
        i = 0;
    for (; i < str.length; i++) {
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
            myLen++;
        else
            myLen += 2;
    }
    return myLen;
}


//-----------------删除标签------------------
$("body").delegate(".tag_deletion_box i", "click", function () {
    $(this).parents(".tag_deletion_box").remove();
});


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
        case "positive_floating_zero":
            test_rule = /^\d+(\.\d+)?$/;    //非负浮点数(包括0)
            break;
        case "positive_integers_zero_two_decimal":
            test_rule = /^\d+(\.\d{1,2})?$/;        //非负数(小数点后最多有两位，包括0)
            break;
        case "phone_number":
            test_rule = /^1[35847][0-9][0-9]{8}$/;  //手机号
            break;
        case "fixed_telephone_number":
            test_rule = /^([0-9]{3,4}-)?[0-9]{7,8}$/;  //固话号
            break;
        case "email":
            test_rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;  //邮箱
            break;
    }
    var result = test_rule.test(val);
    return result;
}


//--------------------自动完成搜索-------------------

function singleAuto(input, source) {
    //input:模糊搜索的input标识,必须为字符串格式,即用""包起来;
    //source:模糊搜索的数据源,即下拉列表项;

    $(input).autocomplete({
        source: source,

        select: function (event, ui) {
            var span = $("<span class='singleauto_choose_span'><i class='fa fa-close singleauto_choose_delete'></i></span>");
            if (ui.item.label.length > 20) {
                var brand_name = ui.item.label.substring(0, 19);
                span.html(brand_name + "<i class='fa fa-close singleauto_choose_delete'></i>");
            } else {
                span.html(ui.item.label + "<i class='fa fa-close singleauto_choose_delete'></i>");
            }
            span.attr("name", ui.item.label);
            $(this).parent().append(span);
            $(this).val("").hide();
            var choose_input = $(this).parents(".form-group").nextAll(".singleauto_choose_hideinput");
            choose_input.val(ui.item.value);
            $(this).parents(".form-group").next(".error_show").find("label").remove();
            return false;
        }
    });
}
//--------------------自动完成搜索-------------------


//--------------------自动完成选择项删除-------------------
$("body").delegate(".singleauto_choose_delete", "click", function () {
    $(this).parents(".form-group").nextAll(".singleauto_choose_hideinput").find("input").val("");
    $(this).parent().prevAll(".ui-autocomplete-input").val("").css("display", "block");
    $(this).parent().remove();
});
//--------------------自动完成选择项删除-------------------

/*
 函数名称：fileChange
 参数：js原生选择器
 功能：限制图片上传格式为jpg或者png,大小不得超过40kb
 */
function fileChange(target) {
    var name = target.value;
    var fileType = name.substring(name.lastIndexOf(".") + 1).toLowerCase();     //获取文件格式
    var fileArr = name.split("\\");
    var fileName = fileArr[fileArr.length - 1];     //获取文件名称
    if (fileType != "jpg" && fileType != "png") {
        alert("请选择jpg或者png格式图片文件上传！");
        target.value = "";
        return false;
    } else {
        var fileSize = target.files[0].size / 1024;           //获取文件大小，单位为kb
        console.log(fileSize);
        if (fileSize > 40) {
            alert("图片文件大小不得超过40kb!");
            target.value = "";
            return false;
        } else {
            var url = getObjectURL(target.files[0]);           //获取图片url
            $(".modal-brand .upload_img").attr("src", url);      //显示上传图片
            $(".modal-brand .img_name p").text(fileName);          //显示上传图片文件名
        }
    }
}


//-------------------------javaseript获取url中的参数------------------------
//* 用法：
//* var args = getArgs( ); // 从 URL 解析出参数
//* var q = args.q || ""; // 如果定义了某参数，则使用其值，否则给它一个默认值
//* var n = args.n ? parseInt(args.n) : 10;
//*/
var getArgs = function () {
    var args = new Object(); //声明一个空对象
    var query = window.location.search.substring(1); // 取查询字符串，如从 http://www.snowpeak.org/testjs.htm?a1=v1&a2=&a3=v3#anchor 中截出 a1=v1&a2=&a3=v3。
    var pairs = query.split("&"); // 以 & 符分开成数组
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); // 查找 "name=value" 对
        if (pos == -1) continue; // 若不成对，则跳出循环继续下一对
        var argname = pairs[i].substring(0, pos); // 取参数名
        var value = pairs[i].substring(pos + 1); // 取参数值
        value = decodeURIComponent(value); // 若需要，则解码
        args[argname] = value; // 存成对象的一个属性
    }
    return args; // 返回此对象
};