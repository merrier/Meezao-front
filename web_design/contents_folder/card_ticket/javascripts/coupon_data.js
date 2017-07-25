/**
 * Created by Administrator on 2016/5/23.
 */

$(function(){

    //---------------------下拉菜单改变文字------------------
    $(".navbar .dropdown-menu li a").click(function(){
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));

    });

    $(".btn_search").click(function(){
        var search_input = $(this).prevAll(".form-group").find(".search_input").val();
        console.log("搜索框输入内容：" + search_input);        //搜索框输入内容
        var time=$(".dropdown").eq(1).attr("data-id");
        console.log("时间："+time);  //时间，最近7天1，最近15天2，最近30天3，最近60天4
        var card_name=$(".dropdown").eq(0).attr("data-id");
        console.log("卡券方式："+card_name);  //卡券方式，卡券名称1，卡券ID2
        choose_show();
    });

    $(".common_table .dropdown-menu li a").click(function(){
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));
        choose_show();
    });
})

function choose_show(){
    var kind = $(".kind").find(".dropdown").attr("data-id");
    console.log("类型:" + kind);           //类型选择，未选择0，全部1，通用券2，代金券3，团购券4，折扣券5，礼品券6
    var provide_way = $(".provide_way").find(".dropdown").attr("data-id");
    console.log("发放方式:" + provide_way);       //发放方式，未选择0，全部1，群发2，定向3
}