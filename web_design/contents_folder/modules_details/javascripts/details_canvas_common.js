/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/8/4>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {

    //---------------------------配置菜单样式初始化--------------------------
    //(function configureBoxInit(){
    //    var configure_h = $(".form_details_configure").outerHeight(),
    //        top_h = $(".form_details_configure .form_configure_top").outerHeight(),
    //        bottom_h = $(".form_details_configure .form_configure_bottom").outerHeight(),
    //        item_h = $(".form_configure_list>li:not('.config_item_now')").eq(0).outerHeight(),
    //        item_len = $(".form_configure_list>li").length,
    //        item_now_h = top_h - item_h * item_len + item_h;
    //
    //        console.info("top:" + top_h);
    //    $(".form_configure_list .config_item_now").css("height",item_now_h + "px");
    //}());


    //---------------------------下拉菜单改变文字-----------------------
    $(".dropdown-menu li a").click(function dropDownCommon() {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
    });


    //---------------------------配置菜单弹出和隐藏----------------------------
    $(".navbar-default").delegate(".nav_btn_configure","click",function(){
        var config = $(".form_details_configure");
        config.slideToggle("fast");
    });


    //----------------------------配置菜单中的列表点击--------------------------
    $(".config_item_hascon").delegate(".config_list_title", "click", function () {
        var item_con = $(this).parents(".config_item_hascon");
        if (item_con.hasClass("config_item_now")) {
            item_con.removeClass("config_item_now");
        } else {
            item_con.addClass("config_item_now").siblings("li").removeClass("config_item_now");
        }

    });


    //---------------------------设为默认按钮点击-------------------------
    $(".form_details_configure").delegate(".btn_set_default","click",function(){
        var modules_name = $.trim($(".details_modules_name").val());
        if(modules_name == "" || modules_name == undefined){
            alertShow("danger",3,"模块名称不能为空!");
            return false;
        }else{
            alertShow("success",3,"设为默认成功!");
        }
    });


    //---------------------------恢复默认按钮点击-------------------------
    $(".form_details_configure").delegate(".btn_restore_default","click",function(){
        location.reload();
    });

});
