/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function(){

    //$(".modal_message_send_fail").modal("show");


    //----------------------页面初始化--------------------
    (function init(){
        var name_len = $(".edit_company_name").text().length,
            foot_len = $(".edit_company_foot").text().length,
            number = $(".number_send_message").text();

        $(".rapid_manage_tipsbox").find(".number_message_word").text(name_len + foot_len).attr("data-len",name_len + foot_len);
        if(number == 0){
            sendMessageErrorBoxShow("当前短信发送人数为0，请重新选择发送人群！");  //发送失败：短信内容为空
        }
    })();


    //----------------------字数统计----------------------
    $(".rapid_manage_edit").delegate("textarea","keyup",function(){
        var text_len = $(this).val().length,
            data_len = +$(".rapid_manage_tipsbox").find(".number_message_word").attr("data-len");

        $(".rapid_manage_tipsbox").find(".number_message_word").text(text_len + data_len).end()
            .find(".message_number").text(Math.ceil((data_len + text_len)/70));

        var bool = messageSendValidation();

        if(bool){
            $(".rapid_manage_edit").find(".message_error_box").hide();
        }else{
            sendMessageErrorBoxShow("您当前需要发送的短信条数已超过剩余条数，请您联系客服为您充值！");
        }
    });


    //---------------------发送前短信数量验证---------------------
    function messageSendValidation(){
        var person_num = +$(".rapid_manage_oprbox").find(".number_send_message").text(),
            len = +$(".rapid_manage_tipsbox").find(".number_message_word").text(),
            total_num = +$(".rapid_manage_title").find("span").text(),
            message_num = Math.ceil(len/70);

        if(person_num * message_num > total_num){
            return false;
        }else{
            return true;
        }
    }


    //------------------------发送短信错误信息展示通用-----------------------
    function sendMessageErrorBoxShow(text){
        $(".rapid_manage_edit").find(".message_error_box").show().find("span").text(text);
        return false;
    }


    //-------------------------完成并发送按钮点击--------------------------
    $(".rapid_manage_oprbox").delegate(".btn_send","click",function(){
        var bool = messageSendValidation(),
            number = $(".number_send_message").text(),
            textarea_val = $.trim($(".rapid_manage_edit").find("textarea").val()),
            message_num = $(".rapid_manage_title").find("span").text();

        if(message_num == 0){
            sendMessageErrorBoxShow("发送失败：剩余短信条数为0，请您联系客服为您充值！");  //发送失败：发送人数为0
            return false;
        }else if(textarea_val == "" || textarea_val == undefined) {
            sendMessageErrorBoxShow("发送失败：短信内容为空，请编辑短信后再发送！");  //发送失败：短信内容为空
            return false;
        }else if(number == 0){
            sendMessageErrorBoxShow("发送失败：发送人数为0，请重新选择发送人群！");  //发送失败：短信内容为空
            return false;
        }else if(!bool){
            sendMessageErrorBoxShow("发送失败：短信条数不足，请您联系客服为您充值！"); //发送失败：短信条数不足
            return false;
        }else if($(this).hasClass("btn_already_send")){
            sendMessageErrorBoxShow("短信正在发送中，请不要重复点击！"); //发送失败：正在发送中
        }else{
            var message_final = $.trim($(".edit_company_name").text()) + textarea_val + $.trim($(".edit_company_foot").text());

            $(this).addClass("btn_already_send").css("cursor","not-allowed").text("发送中...");    //发送中：改变发送状态
            $(".rapid_manage_edit").find("textarea").attr("disabled","disabled");


            //发送成功，跳转页面
            $(".modal_message_success").modal("show");

            setTimeout(function(){
                location.href = location.origin + "/RapidMarketing/RapidMarketing/rapid_marketing_group";
            },2000)

        }
    });


    //------------------------短信发送失败蒙版关闭按钮------------------------
    $(".message_error_box").delegate(".fa-times","click",function(){
        $(".message_error_box").fadeOut();
    });


    //-------------------------短信样例模态框展示----------------------
    $(".message_strategy_bottom").delegate(".btn_view_example","click",function(){
        var text=$(this).attr("data-content");
        $(".modal_message_example").modal("show").find(".message_VIP").text(text);
    });


    ////-------------------------短信条数刷新按钮------------------------
    //$(".rapid_manage_tipsbox").delegate(".fa-refresh","click",function(){
    //    alert('刷新');
    //    $(this).addClass("fa-spin");
    //});


});

