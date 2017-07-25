/* Js coupon_member_card */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2017/4/10 10:27>
 // +--------------------------------------------------------------------------*/

//------------------获取图片url地址---------------
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

//----------------时间选择初始化------------------
function timePickerInit(){
    $(".meezao_time_range_new").eq(0).clone(true).appendTo(".js_hour_range_list").removeClass("meezao_time_range_new");

    var that = $(".js_hour_range").eq($(".js_hour_range").length - 1),
        startTimeTextBox = that.find('.js_hour_start'),
        endTimeTextBox = that.find('.js_hour_end');

    $.timepicker.timeRange(
        startTimeTextBox,
        endTimeTextBox,
        {
            minInterval: (1000*60*60), // 1hr
            timeFormat: 'HH:mm',
            start: {}, // start picker options
            end: {} // end picker options
        }
    );
}


//------------自定义入口循环赋值-----------
function entranceInit(){
    var id = ["一","二","三"];
    $(".js_appmsg_url_item").each(function(){
        if(!$(this).hasClass("meezao_js_appmsg_url_item_new")){
            var that = $(this);
            var index = that.index(".js_appmsg_url_item") - 1;

            that.attr("data-idx",index);
            that.find(".js_appmsg_url_intro").text("入口" + id[index]);   //入口数
            that.find(".js_custom_url_name").attr("target",".js_url_title_" + index)
                .parents(".frm_input_box").next(".tips").find("span").removeClass().addClass("js_url_title_" + index);   //入口名称
            that.find(".js_custom_url_desc").attr("target",".js_url_desc_" + index)
                .parents(".frm_input_box").next(".tips").find("span").removeClass().addClass("js_url_desc_" + index);   //引导语
            that.find(".frm_vertical_lh .frm_radio_label").each(function(ind,val){
                $(this).attr("for","checkbox" + (36+4*index+ind));
                $(this).find("input[type='radio']").attr("name","js_jump_url_" + index).attr("id","checkbox" + (36+4*index+ind));
            });
        }
    })
}

//------------------通用表单验证提示错误-----------------
function validationErrorTips(text,top){
    var scroll_top = top || 0;

    $('html, body').animate({
        scrollTop: scroll_top
    }, 500);
    alertShow("danger",3,text);
}

//------------------通用表单验证类名添加/删除------------------
function validationClassToggle(parents,type){
    var box = $(parents);

    if(type == "add"){
        box.find("input").addClass("meezao_input_validate").end().find("textarea").addClass("meezao_input_validate");
    }else{
        box.find("input").removeClass("meezao_input_validate").end().find("textarea").removeClass("meezao_input_validate");
    }
}


//------------------第一页中需要额外处理的表单验证部分----------------
function firstPageExtraValidation(){
    var radio_cover = $("#checkbox1");    //卡券封面选择图片
    var img_cover = $("#rt_rt").find("input").val(); //卡券封面图片路径
    var valid_time_from = $("#js_dateRangeTitle0_from").val();  //有效期固定日期开始时间
    var valid_time_to = $("#js_dateRangeTitle0_to").val();  //有效期固定日期结束时间
    var radio_part_time = $("#checkbox17");    //可用时段-部分时段
    var part_time = $(".meezao_part_time").find("input:checked");   //可用时段-部分时段的input
    var input_part_time = $(".js_hour_range").eq(1).find("input").eq(0).val();  //时间的第一个input框

    if(radio_cover.is(":checked") && img_cover == "" || img_cover == undefined){
        validationErrorTips("请上传卡券封面图片！");
        return false;
    }else if(!(valid_time_from&&valid_time_to)){
        validationErrorTips("请选择有效期的开始时间和结束时间！");
        return false;
    }else if(radio_part_time.is(":checked") && part_time.length == 0 || input_part_time == ""){
        validationErrorTips("请选择可用时段的时间段范围！");
        return false;
    }else{
        return true;
    }
}

//------------------第二页中需要额外处理的表单验证部分----------------
function secondPageExtraValidation(){
    var end_time = $('#js_dateRangeTitle0');

    if(end_time.is(":visible") && end_time.val() == ""){
        validationErrorTips("请选择消息通知截止日期！");
        return false;
    }else{
        return true;
    }
}


//------------------第一页的表单验证------------------
function firstPageValidation(){
    $(".js_card_information").find(".meezao_input_validate:visible").trigger("keyup");

    var len = $(".js_card_information").find(".frm_msg.fail:visible").length;

    if(len){
        var first_error = $(".js_card_information").find(".frm_msg.fail:visible").eq(0);
        var offset_top = first_error.offset().top - 200;

        validationErrorTips(first_error.find("span").text(),offset_top);
        return false;
    }else{
        return firstPageExtraValidation();
    }
}

//-----------------第二页的表单验证-----------------
function secondPageValidation(){
    $(".js_function_setting").find(".meezao_input_validate:visible").trigger("keyup");

    var len = $(".js_function_setting").find(".frm_msg.fail:visible").length;

    if(len){
        var first_error = $(".js_function_setting").find(".frm_msg.fail:visible").eq(0);
        var offset_top = first_error.offset().top - 200;

        validationErrorTips(first_error.find("span").text(),offset_top);
        return false;
    }else{
        return secondPageExtraValidation();
    }
}


$(function () {

    //------------tooltip初始化-------------
    $('[data-toggle="tooltip"]').tooltip();

    var dom = {
        preview: $(".js_color_bg_preview"),
        logo: $("#js_logo_url_preview"),
        brand_name: $("#js_brand_name_preview"),
        card_name: $("#js_title_preview"),
        qrcode:$(".js_background_pic_url_preview").find(".qrcode"),
        msg_area:$(".js_color_bg_preview").find(".msg_area")
    };


    //------------------------填写会员卡信息开始-------------------------

    //-------------左侧展示滚动监听---------------
    $(window).scroll(function(){
        var area = $(".card_preview_area.member_card"),
            offset_top = area.attr("data-offset-top"),
            offset_bottom = area.attr("data-offset-bottom"),
            top = $(window).scrollTop(),
            bottom = $(document).height() - $(window).height() - $(window).scrollTop();

        if(top<offset_top){
            area.removeClass("affix").addClass("affix-top");
        }else if(top>=offset_top && bottom>offset_bottom){
            area.removeClass("affix-top affix-bottom").addClass("affix").css("top",'');
        }else if(bottom <= offset_bottom){
            area.removeClass("affix").addClass("affix-bottom");
            area.css("top",$(document).height() - area.height() - offset_bottom + "px");
        }
    });


    //-----------点击空白处隐藏某些div-----------
    $(document).click(function(e){
         $(".dropdown_data_container").hide();
    });

    //-----------卡券封面单选框点击-------------
    $(".meezao_coupon_bg").delegate(".frm_radio_label","click",function(){
        var box = $(".meezao_coupon_bg"),
            index = $(this).find("input[type=radio]").val();
        $(this).addClass("selected").find("input[type=radio]").attr("checked","checked");
        $(this).siblings(".frm_radio_label").removeClass("selected").find("input[type=radio]").attr("checked",false);
        box.find(".js_add_cover_type_" + index).css("display","table-cell").siblings(".input_submsg").hide();

        if(index == 1){ //图片
            var picurl = $("#js_background_pic_url_preview").find("img").attr("src");
            if(picurl){
                dom.preview.css("background-image","url(" + picurl + ")");
            }
        }else{  //颜色
            var color = $("#js_colorpicker").find(".jsBtLabel").text();
            dom.preview.css({
                "background-color": color,
                "background-image": ""
            });
        }
    });


    //-----------卡券封面颜色选择下拉框----------
    $("#js_colorpicker").delegate(".dropdown_switch","click",function(e){
        e.stopPropagation();
        $(this).next(".dropdown_data_container").show();
    });

    //------------卡券封面颜色列表点击-----------
    $("#js_colorpicker").delegate(".dropdown_data_list li a","click",function(){
        var color = $(this).attr("data-value");

        $("#js_colorpicker").find(".jsBtLabel").text(color).css("background-color",color);
        dom.preview.css("background-color",color);
        $("#js_background_type").val(color);
    });

    //------------卡券封面上传图片按钮点击-----------
    $("#rt_rt").delegate("label","click",function(){
        $("#rt_rt").find("input").trigger("click");
    });

    //---------------背景图上传------------
    $("#rt_rt").find("input").change(function(){
        var picurl = getObjectURL(this.files[0]);
        if(picurl){
            $("#js_background_pic_url_preview").show().find("img").attr("src",picurl);
            dom.preview.css("background-image","url(" + picurl + ")");
        }
    });

    //-------------input通用字数统计-------------
    $(".frm_input_box").delegate("input","keyup",function(){
        var len = Math.ceil(getStrlen($.trim($(this).val()))/2),
            target = $(this).attr("target"),
            maxlength= $(this).attr('data-maxlength');

        $(target).text(len);
        if(maxlength && len>maxlength || ($(this).hasClass("meezao_input_must") && len == 0)){
            $(this).parents(".frm_input_box").nextAll(".frm_msg.fail").show();
        }else{
            $(this).parents(".frm_input_box").nextAll(".frm_msg.fail").hide();
        }
    });


    //-------------textarea通用字数统计-------------
    $(".frm_textarea_box.with_counter").delegate("textarea","keyup",function(){
        var len = Math.ceil(getStrlen($.trim($(this).val()))/2),
            numbox = $(this).siblings(".frm_counter"),
            maxlength= $(this).attr('data-maxlength');
        numbox.find("span").text(len);

        if(maxlength && len>maxlength){
            $(this).parents(".textarea_item").find(".frm_msg.fail").show();
        }else{
            $(this).parents(".textarea_item").find(".frm_msg.fail").hide();
        }
    });

    //-------------会员卡标题input框-------------
    $("#meezao_card_name").keyup(function(){
        var val = $.trim($(this).val());
        var parents = $(this).parents(".js_card_input_item");

        $("#js_title_preview").text(val);
        if(!val.length){
            // alert("11");
            $(this).parents(".frm_input_box").nextAll(".frm_msg.fail").show();
        }
    });


    //-------------通用单选框点击------------
    $(".frm_vertical_lh").delegate(".frm_radio_label","click",function(){
        var that = $(this),
            id = that.attr("for"),
            parents = that.parents(".frm_vertical_lh");

        that.addClass("selected").find("input[type=radio]").attr("checked","checked");
        that.parents(".radio_control_group").siblings().find(".frm_radio_label").removeClass("selected").find("input[type=radio]").attr("checked",false);


        if(parents.hasClass("meezao_validity_time")){   //有效期
            if(id == "checkbox35"){ //永久有效
                $( "#js_dateRangeTitle0_from" ).datepicker( "option", "disabled", true );
                $( "#js_dateRangeTitle0_to" ).datepicker( "option", "disabled", true );
            }else{
                $( "#js_dateRangeTitle0_from" ).datepicker( "option", "disabled", false );
                $( "#js_dateRangeTitle0_to" ).datepicker( "option", "disabled", false );
            }
        }else if(parents.hasClass("meezao_available_time")){ //可用时段
            if(id == "checkbox16"){ //全部时段
                $(".js_discount_select").hide();
            }else{
                $(".js_discount_select").css("display","table-cell");
            }
        }
    });

    //---------------通用多选框点击--------------
    $(".meezao_checkbox_box").delegate(".frm_checkbox_label","click",function(){
        var that = $(this),
            id = that.attr("for");
        if(that.hasClass("selected")){  //当前多选框为已选中状态
            that.removeClass("selected");
            that.find("input[type=checkbox]").attr("checked",false);
            if(id == "js_supply_bonus"){    //积分优惠
                $("#js_bonus_rule_detail").hide();
                validationClassToggle("#js_bonus_rule_detail","del");
            }else if(id == "js_supply_discount"){   //折扣优惠
                $("#js_discount_item").hide();
                validationClassToggle("#js_discount_item","del");
            }
            return false;
        }else{  //当前多选框为未选中状态
            that.addClass("selected");
            that.find("input[type=checkbox]").attr("checked","checked");
            if(id == "js_supply_bonus"){    //积分优惠
                $("#js_bonus_rule_detail").show();
                validationClassToggle("#js_bonus_rule_detail","add");
            }else if(id == "js_supply_discount"){   //折扣优惠
                $("#js_discount_item").show();
                validationClassToggle("#js_discount_item","add");
            }
            return false;
        }
    });

    //--------------------有效期中的固定日期时间选择---------------

    //-----------------通用按钮点击显示时间选择----------------
    $(".ta_date").delegate(".opt_sel","click",function(){
        $(this).parents(".ta_date").find("input").datepicker("show");
    });


    //------------------------------开始时间选择--------------------
    $("#js_dateRangeTitle0_from").datepicker({
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        minDate:'today',
        onClose: function (selectedDate) {
            $("#js_dateRangeTitle0_to").datepicker("option", "minDate", selectedDate);
        }
    });

    //------------------------------结束时间选择--------------------
    $("#js_dateRangeTitle0_to").datepicker({
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#js_dateRangeTitle0_from").datepicker("option", "maxDate", selectedDate);
        }
    });


    //--------------可用时段中的第一个添加时间段点击-------------
    $(".meezao_available_date").delegate(".js_add_time_period_first","click",function(){
        $(this).hide();
        $(".js_hour_range_container").show();
        timePickerInit();
    });

    //--------------可用时段中的第二个添加时间段点击---------------
    $(".js_hour_range_container").delegate(".js_add_time_period","click",function(){
         $(this).hide();
         timePickerInit();
    });

    //--------------可用时段中的删除时间段点击--------------
    $(".js_hour_range_container").delegate(".js_del_time_period","click",function(){
        if($(".js_add_time_period").is(":visible")) {    //当前只有一个时间段
            $(".js_hour_range_container").hide();
            $(".js_add_time_period_first").show();
        }
        $(".js_hour_range").eq($(".js_hour_range").length - 1).remove();
        $(".js_add_time_period").show();
    });

    //--------------消费送积分输入框--------------
    $(".meezao_consumption_points").delegate(".frm_input","keyup",function(){
         var parents = $(this).parents(".js_card_input_item");
         var money = +$.trim(parents.find("input[name='cost_money_unit']").val());
         var point = +$.trim(parents.find("input[name='increase_bonus']").val());

         if(regularExpression("positive_integers_zero",money)&&regularExpression("positive_integers_zero",point)&&money&&point){
             $(".meezao_consumption_points_show").show().find("span").eq(0).text(money).next("span").text(point);
             parents.find(".frm_msg").hide();
         }else{
             $(".meezao_consumption_points_show").hide();
             parents.find(".frm_msg").show();
         }
    });

    //-------------单次上限输入框-------------
    $(".meezao_single_upper_limit").delegate(".frm_input","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var point = +$.trim(parents.find("input[name='max_increase_bonus']").val());
        var increase = +$.trim($("#js_increase_bonus").val());

        if(regularExpression("positive_integers",point)&&(point >= increase)){
            $(".meezao_single_upper_limit_show").show().find("span").eq(0).text(point);
            parents.find(".frm_msg").hide();
        }else{
            $(".meezao_single_upper_limit_show").hide();
            if($.trim(parents.find("input[name='max_increase_bonus']").val()) === ""){
                parents.find(".frm_msg").hide();
            }else{
                parents.find(".frm_msg").show();
            }
        }
    });

    //-------------激活送积分输入框-------------
    $(".meezao_activation_integral").delegate(".frm_input","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var point = +$.trim(parents.find("input[name='init_bonus']").val());

        if(regularExpression("positive_integers",point)){
            $(".meezao_activation_integral_show").show().find("span").eq(0).text(point);
            parents.find(".frm_msg").hide();
        }else{
            $(".meezao_activation_integral_show").hide();
            if($.trim(parents.find("input[name='init_bonus']").val()) === ""){
                parents.find(".frm_msg").hide();
            }else{
                parents.find(".frm_msg").show();
            }
        }
    });

    //--------------积分抵扣输入框--------------
    $(".meezao_integral_deduction").delegate(".frm_input","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var point = +$.trim(parents.find("input[name='cost_bonus_unit']").val());
        var money = +$.trim(parents.find("input[name='reduce_money']").val());

        if(regularExpression("positive_integers_zero_two_decimal",money)&&regularExpression("positive_integers",point)&&money>0&&point){
            $(".meezao_integral_deduction_show").show().find("span").eq(0).text(point).next("span").text(money);
            parents.find(".frm_msg").hide();
        }else{
            $(".meezao_integral_deduction_show").hide();
            parents.find(".frm_msg").show();
        }
    });

    //-------------抵扣条件输入框---------------
    $(".meezao_deduction_condition").delegate(".frm_input","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var money = +$.trim(parents.find("input[name='least_money_to_use_bonus']").val());
        var point = +$.trim(parents.find("input[name='max_reduce_bonus']").val());

        if($.trim(parents.find("input[name='least_money_to_use_bonus']").val()) === "" && $.trim(parents.find("input[name='max_reduce_bonus']").val()) == ""){
            $(".meezao_deduction_condition_show").hide();
            parents.find(".frm_msg").hide();
        }else if(regularExpression("positive_integers_zero_two_decimal",money)&&regularExpression("positive_integers",point)&&money>0){
            $(".meezao_deduction_condition_show").show().find("i").text(point);
            parents.find(".frm_msg").hide();
        }else{
            $(".meezao_deduction_condition_show").hide();
            parents.find(".frm_msg").show();
        }
    });

    //----------------享受折扣---------------
    $("#js_discount_item").delegate("#js_discount","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var discount = +$.trim($(this).val());

        if(discount>1 && discount<10){
            parents.find(".frm_msg").hide();
            return true;
        }else{
            parents.find(".frm_msg").show();
            return false;
        }
    });


    //----------------特权说明----------------
    $(".meezao_privilege_specification").delegate("textarea","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var des = +$.trim($(this).val());

        if(des != ""){
            parents.find(".frm_msg").hide();
        }else{
            parents.find(".frm_msg").show();
        }
    });

    //---------------商户介绍收起/展开按钮--------------
    $(".meezao_merchant_introduction").delegate(".editor_collapsor","click",function(){
        var parents = $(".meezao_merchant_introduction"),
            status = parents.find(".js_editor_collapsor").attr("data-open");

        if(status == 1){    //当前状态为收起状态，需要将其展开
            $(this).text("展开");
            parents.find(".js_editor_collapse").show();
            parents.find(".js_editor_collapsor").attr("data-open",0);
            return false;
        }else{  //当前状态为展开状态，需要将其收起
            $(this).text("收起");
            parents.find(".js_editor_collapse").hide();
            parents.find(".js_editor_collapsor").attr("data-open",1);
            return false;
        }
    });

    //-------------商户介绍-电话输入框-------------
    $(".meezao_phone_number").delegate(".frm_input","keyup",function(){
        var parents = $(this).parents(".js_card_input_item");
        var number = +$.trim(parents.find("input[name='service_phone']").val());

        if($.trim(parents.find("input[name='service_phone']").val()) == "" || regularExpression("phone_number",number) || regularExpression("fixed_telephone_number",number)){
            parents.find(".frm_msg").hide();
        }else{
            parents.find(".frm_msg").show();
        }
    });


    //-------------添加自定义入口按钮点击-------------
    $("#js_add_config_url").on("click",function(){
        var num = $("#js_config_url_p").find(".js_appmsg_url_item").length - 1;   //当前入口个数

        if(num>=3){ //当前已有3个自定义入口
            alertShow("danger",3,"最多只能添加3个自定义入口！");
            return false;
        }else{
            $(".meezao_js_appmsg_url_item_new").eq(0).clone(true).appendTo("#js_config_url_p").removeClass("meezao_js_appmsg_url_item_new");
            entranceInit();
            if(num >0){
                $(".meezao_msg_card_section_new").eq(0).clone(true).appendTo("#js_custom_url_preview").removeClass("meezao_msg_card_section_new");
                if(num ==2){  //当前已有两个入口，需要改变按钮样式
                    $(this).addClass("btn_disabled");
                }
            }
        }
    });

    //------------删除入口按钮点击-------------
    $("#js_config_url_p").delegate(".js_delete_item","click",function(){
        var num = $("#js_config_url_p").find(".js_appmsg_url_item").length,   //当前入口个数
            index = $(this).parents(".js_appmsg_url_item").index(".js_appmsg_url_item") - 1;

        if(num>=4){
            $("#js_add_config_url").removeClass("btn_disabled");
        }
        $(this).parents(".js_appmsg_url_item").remove();
        $("#js_custom_url_preview").find(".msg_card_section").eq(index).remove();
        entranceInit();
    });

    //-----------------入口名称输入框-----------------
    $(".js_custom_url_name").on("keyup",function(){
        var index = $(this).parents(".js_appmsg_url_item").index(".js_appmsg_url_item") - 1,
            name = $.trim($(this).val()).slice(0,5);

        if(name.length == 0){
            $("#js_custom_url_preview").find(".msg_card_section").eq(index + 1).find(".js_custom_url_name_pre").text("自定义入口(选填)");
            $(this).parents(".frm_input_box").nextAll(".frm_msg.fail").show().find("span").text("自定义入口名称不能为空");
        }else{
            $("#js_custom_url_preview").find(".msg_card_section").eq(index + 1).find(".js_custom_url_name_pre").text(name);
            $(this).parents(".frm_input_box").nextAll(".frm_msg.fail").find("span").text("自定义入口名称最多只能输入5个中文");
        }
    });

    //-----------------引导语输入框-----------------
    $(".js_custom_url_desc").on("keyup",function(){
        var index = $(this).parents(".js_appmsg_url_item").index(".js_appmsg_url_item") - 1,
            name = $.trim($(this).val()).slice(0,6);

        $("#js_custom_url_preview").find(".msg_card_section").eq(index + 1).find(".js_custom_url_tips_pre").text(name);

    });

    //-----------------网页链接输入框-----------------
    $(".js_appmsg_edit_item_p").delegate(".js_link_url","keyup",function(){
        var parents = $(this).parents(".js_appmsg_edit_item_p");
        var number = +$.trim($(this).val());

        if($.trim($(this).val()) == ""){
            parents.find(".frm_msg").show();
        }else{
            parents.find(".frm_msg").hide();
        }
    });




    //-----------------下一步按钮点击-----------------
    $("#js_nextstep").on("click",function(){
        var status = firstPageValidation();

        if(status){
            $(".js_tab_content").eq(0).hide().siblings().show();
            $("#js_add_step_head").find(".grid_item").eq(0).removeClass("current").addClass("prev");
            $("#js_add_step_head").find(".grid_item").eq(1).removeClass("next").addClass("current");
        }
    });



    //-------------------------功能设置开始------------------------

    //--------------------------------用户分享/激活选择---------------------------------------------------------
    $(".js_function_setting #js_share_type").delegate(".frm_checkbox_label","click",function(event){
        event.preventDefault();           //阻止label的默认行为防止click事件触发两次
        var icon=$(this).children(".icon_checkbox").eq(0);
        var input=$(this).children("input").eq(0);
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            input.attr("checked",false);
            if($(this).index() == 1){
                $("#js_active_container").hide();
            }
        }else{
            $(this).addClass("selected");
            input.attr("checked",true);
            if($(this).index() == 1){
                $("#js_active_container").show();
            }
        }
    });
    //--------------------------------用户分享/激活选择---------------------------------------------------------

    //--------------------------------核销方式选择-------------------------------------------------------------------
    $(".js_function_setting #js_adv_dispose_method").delegate(".radio_control_group","click",function(event){
        event.preventDefault();           //阻止label的默认行为防止click事件触发两次
        var divs=$(this).siblings("div");
        $(this).children("label").addClass("selected");
        $(this).find("input").eq(0).attr("checked",true);
        divs.each(function(){
            $(this).children("label").removeClass("selected");
            $(this).find("input").eq(0).attr("checked",false);
        });
    });
    //--------------------------------核销方式选择-------------------------------------------------------------------

    //-------------------------------无指定门店选择----------------------------------------------------------------
    $(".js_function_setting .last_radio_control_group").delegate(".frm_radio_db","click",function(event){
        event.preventDefault();           //阻止label的默认行为防止click事件触发两次
        var icon=$(this).children(".icon_radio").eq(0);
        var input=$(this).children("input").eq(0);
        var sib=$(this).siblings("label");
        $(this).addClass("selected");
        sib.removeClass("selected");
        sib.find(".icon_radio").attr("checked",false);
        input.attr("checked",true);
        if($(this).index() == 1){
            $(this).nextAll(".js_noshop_sub").eq(0).show();
        }else{
            $(this).nextAll(".js_noshop_sub").eq(0).hide();
        }
    });
    //-------------------------------无指定门店选择----------------------------------------------------------------

    //-------------------------------删除指定门店--------------------------------------------------------------
    $(".js_function_setting .store_oper").delegate(".js_delete_shop","click",function(){
        var tb=$(this).parents("tbody").eq(0);
        var tr_len=tb.children("tr").length;
        if(tr_len==1){
            $(this).parents("table").eq(0).remove();
        }else{
            $(this).parents("tr").eq(0).remove();
        }
    });
    //-------------------------------删除指定门店--------------------------------------------------------------

    //------------------------------设置激活信息-------------------------------------
    $(".js_function_setting #js_select_keywords").click(function(){
        var text="";
        var level;
        $(".modal_setting_active").modal("show");
        $(".first_msg_row .msg_row_content span").each(function(){
            text= $.trim($(this).text());
            console.log(text);
            $(".sub_scope_list .jsLevel2").each(function(){
                if($(this).text()==text){

                    $(this).addClass("selected");
                }
            });
        });
        $(".modal_setting_active .opr_btn .jsNecessary").trigger("click");
        //----------------------修改----------------------------------------------
        $(".last_msg_row .msg_row_content span").each(function(){
            text= $.trim($(this).text());
            console.log(text);
            var span_self=true;
            $(".sub_scope_list .jsLevel2").each(function(){
                if($(this).text()==text){
                    $(this).addClass("selected");
                    span_self=false;
                }
            });
            if(span_self){
                var li=$('<li class="selected_scope_item jsItem " data-name="" data-id="" data-desc="" data-key="" data-label="selfDefine">'+
                    '<span class="item_name"></span>'+
                    '<a href="javascript:;" class="as_scope_del jsClose" data-id="" data-name="" data-key=""></a>'
                    +'</li>');
                console.log(text);
                li.attr("data-id","______self________"+text);
                li.attr("data-name",text);
                li.attr("data-key",text);
                li.find("span").text(text);
                li.find("a").attr("data-id",text);
                li.find("a").attr("data-name",text);
                li.find("a").attr("data-key",text);
                li.find("a").text(text);
                li.appendTo(".selected_scope_list.jsToList.jsToSelect");
                selfInforCount++;
            }
        });
        //----------------------修改----------------------------------------------
        $(".modal_setting_active .opr_btn .jsSelect").trigger("click");
    });
    //------------------------------设置激活信息-------------------------------------

    //------------------------------激活信息选择-----------------------------------------------
    $(".modal_setting_active .sub_scope_list").delegate(".jsLevel2","click",function(){
        if($(this).hasClass("disabled")){
            return;
        }
        if($(this).hasClass("selected")){
            $(this).removeClass("selected")
        }else{
            $(this).addClass("selected");
        }
    });
    //------------------------------激活信息选择-----------------------------------------------

    //------------------------------一级激活信息点击-------------------------------------------
    $(".modal_setting_active .js_dd_list").delegate(".jsLevel1","click",function(){
        var icon=$(this).children(".sub_icon").eq(0);
        if(icon.hasClass("hide_sub_icon")){
            icon.removeClass("hide_sub_icon");
            $(this).next("ul").hide();
        }else{
            icon.addClass("hide_sub_icon");
            $(this).next("ul").show();
        }
    });
    //------------------------------一级激活信息点击-------------------------------------------

    //------------------------------------删除激活信息-------------------------------------------------------
    $(".modal_setting_active .selected_scope_list").delegate(".jsClose","click", function (){
        var li_par=$(this).parent(".selected_scope_item");
        var data_id=$(this).attr("data-id");
        var data_name=$(this).attr("data-name");
        $(".sub_scope_list .jsLevel2").each(function(){
            if($(this).attr("data-id")==data_id){
                $(this).removeClass("disabled");
                $(this).text(data_name);
            }
        });
        li_par.remove();
        if(li_par.attr("data-label")=="selfDefine"){
            selfInforCount--;
            console.log(selfInforCount);
        }
    });
    //------------------------------------删除激活信息-------------------------------------------------------

    //----------------------------------模态框选填/必填信息-------------------------------------------
    $(".modal_setting_active .opr_btn").delegate(".btn","click",function(){
        var text="";
        var par="";
        var necessary=true;
        if($(this).hasClass("jsNecessary")){
            par=".selected_scope_list.jsToList.jsToNecessary";
        }else{
            necessary=false;
            par=".selected_scope_list.jsToList.jsToSelect";
        }
        $(".sub_scope_list .jsLevel2.selected").each(function(){
            if(necessary){
                text=$(this).text()+"(必填)";
            }else{
                text=$(this).text()+"(选填)";
            }
            var data_id=$(this).attr("data-id");
            var data_key=$(this).attr("data-key");
            var data_name=$(this).attr("data-name");
            var li=$('<li class="selected_scope_item jsItem " data-name="" data-id="" data-desc="">'+
                '<span class="item_name"></span>'+
                '<a href="javascript:void(0);" class="as_scope_del jsClose" data-id="" data-name=""></a>'
                +'</li>');
            $(this).removeClass("selected");
            $(this).addClass("disabled");
            $(this).text(text);
            if(data_id === "手机号"){
                li.children("a").eq(0).remove();
            }
            console.log(data_id);
            li.attr("data-id",data_id);
            li.attr("data-name",data_name);
            li.attr("data-key",data_key);
            li.find("span").text(data_name);
            li.find("a").attr("data-id",data_id);
            li.find("a").attr("data-name",data_name);
            li.find("a").attr("data-key",data_key);
            li.find("a").text(text);
            li.appendTo(par);
        });
    });
    //----------------------------------模态框选填/必填信息-------------------------------------------

    //---------------------------------手动添加--------------------------------------------
    $(".modal_setting_active .scope_hd").delegate(".add_active","click",function(e){
        if($(".pos_center").css("display")=="none"){
            $(".pos_center").show().find("input.js_name").val("").trigger("keyup");
        }
    });
    //---------------------------------手动添加--------------------------------------------

    //----------------------------自定义信息输入确定-------------------------------------------------
    var selfInforCount=0;
    $(".modal_setting_active .popover_bar").delegate(".btn","click",function(){
        if($(this).hasClass("btn_primary")){
            var input=$(this).parent().prev(".popover_content").find("input.js_name");
            var len= parseInt($("#js_active_name_0").text());
            var max_len=parseInt(input.attr("data-maxlength"));
            if(len>max_len){
                $(".js_wrong_tips").text("自定义信息的名称长度不超过"+max_len+"个汉字或"+max_len*2+"个英文字母/数字").show();
                setTimeout(function(){
                    $(".js_wrong_tips").hide();
                },2000);
            }else if(len==0) {
                $(".js_wrong_tips").text("请输入自定义名称的信息").show();
                setTimeout(function(){
                    $(".js_wrong_tips").hide();
                },2000);
            }else if(parseInt(selfInforCount) >= 5){
                $(".js_wrong_tips").text("最多可添加5个自定义信息").show();
                setTimeout(function(){
                    $(".js_wrong_tips").hide();
                },2000);
            }else{
                var text= $.trim($(this).parents(".pos_center").find(".js_name").val());
                var repeat=false;
                $(".sub_scope_list .jsLevel2").each(function(){
                    if($.trim($(this).attr("data-id"))=== text){
                        repeat=true;
                    }
                });
                $(".jsToSelect .jsItem").each(function(){
                    if($.trim($(this).attr("data-name")) === text){
                        repeat=true;
                    }
                });
                if(repeat){
                    $(".js_wrong_tips").text("不允许添加重复的自定义信息").show();
                    setTimeout(function(){
                        $(".js_wrong_tips").hide();
                    },2000);
                    return;
                }
                var data_id="______self________"+text;
                var li=$('<li class="selected_scope_item jsItem " data-name="" data-id="" data-desc="" data-key="" data-label="selfDefine">'+
                    '<span class="item_name"></span>'+
                    '<a href="javascript:;" class="as_scope_del jsClose" data-id="" data-name="" data-key=""></a>'
                    +'</li>');
                li.attr("data-id",data_id);
                li.attr("data-name",text);
                li.find("span").text(text);
                li.find("a").attr("data-id",data_id);
                li.find("a").attr("data-name",text);
                li.find("a").text("x");
                li.appendTo(".selected_scope_list.jsToSelect");
                $(this).parents(".pos_center").hide();
                selfInforCount++;
            }
        }else{
            $(this).parents(".pos_center").hide();
        }
    });
    //----------------------------自定义信息输入确定-------------------------------------------------

    //-------------------允许用户自主修改以上信息---------------------------------------
    $(".modal_setting_active .selector_extend .frm_checkbox_label").click(function(){
        event.preventDefault();           //阻止label的默认行为防止click事件触发两次
        var input=$(this).children("input").eq(0);
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            input.attr("checked",false);
        }else{
            $(this).addClass("selected");
            input.attr("checked",true);
        }
    });
    //-------------------允许用户自主修改以上信息---------------------------------------

    //-------------------设置激活信息确认---------------------------------------------------------
    $(".modal_setting_active").delegate(".btn_input_active","click",function(){
        var necInfor="",selInfor="";
        $(".modal_setting_active").modal("hide");
        $(".first_msg_row .msg_row_content").html("");
        $(".last_msg_row .msg_row_content").html("");
        $(".modal_setting_active .jsToNecessary").find(".jsItem").each(function(index){
            var text=$(this).children("span").eq(0).text();
            var span=$("<span></span>");
            span.text(text);
            span.appendTo(".first_msg_row .msg_row_content");
            if(necInfor==""){
                necInfor+=$(this).attr("data-key");
            }else{
                necInfor+=","+$(this).attr("data-key");
            }
        });
        $(".modal_setting_active .jsToSelect").find(".jsItem").each(function(index){
            var text=$(this).children("span").eq(0).text();
            var span=$("<span></span>");
            span.text(text);
            span.appendTo(".last_msg_row .msg_row_content");
            if(selInfor==""){
                selInfor+=$(this).attr("data-key");
            }else{
                selInfor+=","+$(this).attr("data-key");
            }
        });
        $("#activeInformationNecessary").text(necInfor);
        $("#activeInformationSelect").text(selInfor);
        if($("input[name='can_modify']").attr("checked")){
            $(".js_keywords .frm_control").text("允许用户自主修改以上信息");
        }else{
            $(".js_keywords .frm_control").text("不允许用户自主修改以上信息");
        }
    });
    //-------------------设置激活信息确认---------------------------------------------------------

    //------------------内容设置选择-------------------------------------------------
    $("#js_msg_operate_contenttype").delegate(".frm_radio_label","click",function(){
        $(this).addClass("selected");
        $(this).children("input").eq(0).attr("checked",true);
        $(this).siblings(".frm_radio_label").removeClass("selected");
        $(this).siblings(".frm_radio_label").children("input").attr("checked",false);
        var index = $(this).find("input").val();
        // var divs=$("#js_msg_operate_content").children("div");
        // divs.each(function(){
        //     $(this).hide();
        // });
        // alert(index);
        $(".js_msg_operate_content_item").hide().find("input").removeClass("meezao_input_validate");
        if(index == 0){ //不设置，需要隐藏通知截止日期
            $("#js_msg_operate_endtime_container").hide();
        }else{
            $("#js_msg_operate_endtime_container").show();
            $(".js_msg_operate_content_item.js_" + index + "_show").show().find("input").addClass("meezao_input_validate");
        }
        // switch(index){
        //     case 0:
        //         break;
        //     case 1:
        //         divs.eq(1).show();
        //         divs.eq(4).show();
        //         $("#js_msg_operate_endtime_container").show();
        //         break;
        //     case 2:
        //         break;
        //     case 3:
        //         break;
        //     case 4:
        //         $("#js_msg_operate_endtime_container").hide();
        //         break;
        //     default:
        //         break;
        // }
    });
    //------------------内容设置选择-------------------------------------------------

    //-------------------通知截止日期-----------------
    $("#js_dateRangeTitle0").datepicker({
        numberOfMonths: 2,
        defaultDate: $("#js_dateRangeTitle0").val(),
        dateFormat: "yy-mm-dd",
        minDate:'today'
    });
    //-------------------通知截止日期-----------------

    //------------------上一步按钮点击-----------------
    $("#js_prevstep").on("click",function(){
        $(".js_tab_content").eq(1).hide().siblings().show();
        $("#js_add_step_head").find(".grid_item").eq(0).removeClass("prev").addClass("current");
        $("#js_add_step_head").find(".grid_item").eq(1).removeClass("current").addClass("next");
    });


    //-------------------提交审核按钮点击-------------------
    $("#js_submit").on("click",function(){
        var status = secondPageValidation();

        if(status){
            $(".js_editform").submit();
        }
    });
});

