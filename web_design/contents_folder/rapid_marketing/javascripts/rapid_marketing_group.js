/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function () {


    // //-------------------判断是否开通营销通道---------------------
    // (function hideTagMarketing(){
    //     var modal = $(".modal_open_service"),
    //         tag = $("content_mb_subject").find(".hide_tag_marketing").text();
    //
    //     tag == 0 ? modal.modal("show") : modal.modal("hide");
    // })();




    //-----------------------组类别选择点击-----------------------
    $(".content_new_title ul").delegate("li", "click", function () {
        var id = $(this).attr("data-id");
        $(this).addClass("group_level1_active").siblings().removeClass("group_level1_active");
        $(".rapid_marketing_box[data-box-id=" + id + "]").show().siblings(".rapid_marketing_box").hide();
    });


    //--------------------精确计算分组方式点击----------------------
    $(".marketing_calculate_type").delegate("span", "click", function () {
        var id = $(this).attr("data-id");
        var box = $(this).parents(".rapid_marketing_box");
        $(this).addClass("group_level2_active").siblings().removeClass("group_level2_active");

        if (!box.hasClass("marketing_box_animated")) {
            box.find(".marketing_group_item1 .line").slideDown("100");

            setTimeout(function () {
                box.find(".marketing_group_item2").fadeIn().find(".dot").fadeIn();
            }, 100);
        }

        box.find(".marketing_detail_type").find("li").hide().end().find("li[data-tag-id= " + id + "]").show();
    });


    //--------------------精确营销方式列表鼠标悬停显示全部名称---------------------
    $(".marketing_detail_type").delegate("li","mouseover",function(){
        var name = $(this).find("p");
        name.attr("data-subtitle",name.text()).text(name.attr("data-title"));
    });

    $(".marketing_detail_type").delegate("li","mouseout",function(){
        var name = $(this).find("p");
        name.text(name.attr("data-subtitle"));
    });


    //---------------------精确营销方式选择动态添加链接---------------------
    function marketingTypeAddLink(target,id,bool){
        var url_prefix = location.origin,
            url_sms_prefix = "/RapidMarketing/RapidMarketing/rapid_marketing_management?data_source_id=",
            url_wx_prefix = "/RapidMarketing/RapidMarketing/create_coupon?data_source_id=",
            url_sms,
            url_wx;

        if(bool){
            target.find(".btn_send_message").attr("href",url_prefix + url_sms_prefix + id);
            target.find(".btn_send_weixin").attr("href",url_prefix + url_wx_prefix + id);
        }else{
            target.find(".btn_send_message").attr("href","javascript:void(0)");
            target.find(".btn_send_weixin").attr("href","javascript:void(0)");
        }
    }


    //--------------------精确营销方式列表鼠标左键点击---------------------
    $(".marketing_detail_type").delegate("li","click",function(e){
        e.stopPropagation();

        var id = $(this).attr("data-id"),
            number = parseInt($(this).find("span").text()),
            box = $(this).parents(".rapid_marketing_box"),
            oprbox = box.find(".marketing_detail_oprbox"),
            pos_top = parseInt($(this).position().top),     //相对于父级的top值
            pos_left = parseInt($(this).position().left),   //相对于父级的left值
            off_top = parseInt($(this).offset().top),       //绝对位置中的top值
            off_left = parseInt($(this).offset().left),     //绝对位置中的left值
            win_height = $(window).height(),    //浏览器当前可视区域高度
            win_width = $(window).width(),      //浏览器当前可视区域宽度
            href_bool = true,
            oprbox_left,
            oprbox_top,
            cost_each = 0.01,   //精确营销每个人的成本
            profit_each = 14,   //回店用户每个人创造的利润
            cost = (cost_each * number).toFixed(2),      //精确营销所需总成本
            people = parseInt(cost/profit_each);    //回收成本回店用户数

        oprbox.find("a").not(".btn_online_service").removeClass("btn_new_disable");     //按钮样式初始化

        if(off_left + 135 + 280 >= win_width){
            oprbox_left = pos_left - 255;
        }else{
            oprbox_left = pos_left + 165;
        }

        if(off_top + 300 >= win_height){
            oprbox_top = pos_top - 160;
        }else{
            oprbox_top = pos_top;
        }

        if(number == 0){
            oprbox.find("a").not(".btn_online_service").addClass("btn_new_disable");
            href_bool = false;
        }

        marketingTypeAddLink(oprbox,id,href_bool);  //给按钮动态添加链接

        $(this).addClass("group_level3_active").siblings().removeClass("group_level3_active");
        oprbox.show().attr("data-id",id).css({
            "top":oprbox_top + "px",
            "left":oprbox_left + "px"
        }).find(".oprbox_cost span").text(cost).end().find(".oprbox_people span").text(people);

    });


    //---------------------营销操作框取消按钮点击--------------------
    $(".marketing_detail_oprbox").delegate(".btn_modal_close","click",function(){
        $(".marketing_detail_oprbox").hide();
    });


    //---------------------点击空白处隐藏营销操作框--------------------
    $(document).bind("click",function(e){
        var target = $(e.target);
        if(target.closest(".marketing_detail_oprbox").length == 0){
            $(".marketing_detail_oprbox").hide();
        }
    });


});

