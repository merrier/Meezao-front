/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/7/13>
 // +--------------------------------------------------------------------------*/
// JavaScript Document


$(function () {


    var rand = randomImport();

    var en_name = "different_repurchase_times_kpi";

    autoUpdateSize(en_name, rand, "barPlusLine");


    //-------------------------对表格进行排序----------------------





    // //----------------------对表格进行排序-------------------
    // var sortIndex = -1;
    //
    // $(".different_repurchase_times_kpi_table thead th").each(function () {//遍历thead的tr下的th
    //     //----------------------对表格进行排序-------------------
    //     var tableObject = $(this).parents('.different_repurchase_times_kpi_table'); //获取table对象
    //     var tbHead = tableObject.find('thead'); //获取table对象下的thead
    //     var tbHeadTh = tbHead.find('tr th'); //获取thead下的tr下的th
    //     var tbBody = tableObject.find('tbody'); //获取table对象下的tbody
    //     var tbBodyTr = tbBody.find('tr'); //获取tbody下的tr
    //     var thisIndex = tbHeadTh.index($(this)); //获取th所在的列号
    //
    //
    //     //给表态th增加鼠标位于上方时发生的事件
    //     $(this).mouseover(function () {
    //         tbBodyTr.each(function () {//遍历tbody下的tr
    //
    //             if ($(this).find("td").eq(0).hasClass("td_red")) {
    //                 return true;
    //             } else {
    //                 var tds = $(this).find("td"); //获取列号为参数index的td对象集合
    //                 $(tds[thisIndex]).addClass("td_hover");//给列号为参数index的td对象添加样式
    //             }
    //
    //         });
    //     }).mouseout(function () {//给表头th增加鼠标离开时的事件
    //         tbBodyTr.each(function () {
    //
    //             if ($(this).find("td").eq(0).hasClass("td_red")) {
    //                 return true;
    //             } else {
    //                 var tds = $(this).find("td"); //获取列号为参数index的td对象集合
    //                 $(tds[thisIndex]).removeClass("td_hover");//给列号为参数index的td对象添加样式
    //             }
    //         });
    //     });
    //
    //     $(this).click(function () {//给当前表头th增加点击事件
    //         var dataType = $(this).attr("data-type");//点击时获取当前th的type属性值
    //         checkColumnValue(thisIndex, dataType, tableObject);
    //     });
    // });
    //
    //
    // //对表格排序
    // function checkColumnValue(index, type, tableObject) {
    //     var trsValue = [],
    //         value1,
    //         value2;
    //     var tbBody = tableObject.find('tbody'); //获取table对象下的tbody
    //     var tbBodyTr = tbBody.find('tr'); //获取tbody下的tr
    //     tbBodyTr.find("td").removeClass("td_hover");
    //
    //
    //     tbBodyTr.each(function () {
    //         var tds = $(this).find('td');
    //         //获取行号为index列的某一行的单元格内容与该单元格所在行的行内容添加到数组trsValue中
    //         trsValue.push(type + ".separator" + $(tds[index]).html() + ".separator" + $(this).html());
    //         $(this).html("");
    //     });
    //
    //     var len = trsValue.length;
    //
    //     if (index == sortIndex) {
    //         //如果已经排序了则直接倒序
    //         trsValue.reverse();
    //     } else {
    //         for (var i = 0; i < len; i++) {
    //             //split() 方法用于把一个字符串分割成字符串数组
    //             //获取每行分割后数组的第一个值,即此列的数组类型,定义了字符串\数字\Ip
    //             type = trsValue[i].split(".separator")[0];
    //             for (var j = i + 1; j < len; j++) {
    //                 //获取每行分割后数组的第二个值,即文本值
    //                 value1 = trsValue[i].split(".separator")[1];
    //                 //获取下一行分割后数组的第二个值,即文本值
    //                 value2 = trsValue[j].split(".separator")[1];
    //                 //接下来是数字\字符串等的比较
    //                 if (type == "number") {
    //                     value1 = value1 == "" ? 0 : value1;
    //                     value2 = value2 == "" ? 0 : value2;
    //                     if (parseFloat(value1) > parseFloat(value2)) {
    //                         var temp = trsValue[j];
    //                         trsValue[j] = trsValue[i];
    //                         trsValue[i] = temp;
    //                     }
    //                 }
    //                 // else if (type == "ip") {
    //                 //     if (ip2int(value1) > ip2int(value2)) {
    //                 //         var temp = trsValue[j];
    //                 //         trsValue[j] = trsValue[i];
    //                 //         trsValue[i] = temp;
    //                 //     }
    //                 // }
    //                 else {
    //                     if (value1.localeCompare(value2) > 0) {//该方法不兼容谷歌浏览器
    //                         var temp = trsValue[j];
    //                         trsValue[j] = trsValue[i];
    //                         trsValue[i] = temp;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //
    //     for (var i = 0; i < len; i++) {
    //         tableObject.find("tbody tr:eq(" + i + ")").html(trsValue[i].split(".separator")[2]);
    //     }
    //
    //     sortIndex = index;
    // }
});


