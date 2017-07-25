/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/8/4>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {


    //---------------------------配置菜单样式初始化--------------------------
    (function configureBoxInit(){
        var data_box = $(".details_config_data"),
            cn_name = data_box.attr("data-cn_name"),
            finance_date = data_box.attr("data-finance_date");

        $(".details_modules_name").val(cn_name).trigger("keyup");

    }());


    //---------------------------下拉菜单改变文字-----------------------
    $(".dropdown-menu li a").click(function dropDownCommon() {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
    });

    //---------------------------时间段下拉选择--------------------------
    $(".dropdown_timesection_from").delegate(".dropdown-menu li a","click",function(){
        var data_box = $(".details_config_data"),
            year_from = +($(this).text()),
            finance_date = +data_box.attr("data-finance_date"),
            date_to = dateToCompute(year_from,finance_date);

        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text(year_from + "-" + finance_date + "-1");
        $(".dropdown_timesection_to").find(".btn-dropdown").find("span").text(date_to);
    });


    //---------------------------获取结束时间----------------------------
    function dateToCompute(year,month)
    {
        var new_year = year + 1;    //取下一年的年份
        var new_month = month - 1;//取下一年的上个月的第一天，方便计算（最后一天不固定）
        if(month == 1)            //如果当前为1月，则年份转到当前年份
        {
            new_month = 12;        //月份设为12
            new_year --;            //年份设为当前年份
        }
        var new_date = new Date(new_year,new_month,1),                //取当年当月中的第一天
            date_count =   (new Date(new_date.getTime()-1000*60*60*24)).getDate(),//获取当月的天数
            date_to = (new Date(new_date.getTime()-1000*60*60*24)).toLocaleDateString().replace(/\//g,'-');

        return date_to;
    }




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
