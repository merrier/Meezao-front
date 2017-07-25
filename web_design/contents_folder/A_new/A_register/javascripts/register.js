/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function(){

    //----------------------查看服务协议模态框----------------------
    $(".reg_agreement").delegate(".btn_service_agreement","click",function(){
        $(".modal_service_agreement").modal("show");
    });

    //----------------------查看服务协议模态框----------------------
    $(".reg_agreement").delegate(".btn_secret_agreement","click",function(){
        $(".modal_secret_agreement").modal("show");
    });


    //---------------------30s倒计时-------------------
    function countDownCode(countdown) {
        if (countdown == 0) {
            $(".btn_get_code").removeClass("btn_new_disabled").text("获取验证码");
            countdown = 30;
            return false;
        } else {
            $(".btn_get_code").addClass("btn_new_disabled").text("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function () {
            countDownCode(countdown)
        }, 1000)
    }

    //----------------------获取验证码按钮点击-------------------
    $(".reg_right_form").delegate(".btn_get_code","click",function(){
         if($(this).hasClass("btn_new_disabled")){
             alert("验证码正在发送中，请稍后再尝试!");
         }else{
             var result = phoneNumberVer();

             if(result){
                 countDownCode(30);
                 $("#reg_phone_number").siblings(".form_tips").hide();
                 $.ajax({
                     url:"",
                     dataType:"json",
                     data:$.trim($("#reg_phone_number").val()),
                     success:function(data){

                     },error:function(data){

                     },always:function(data){

                     }
                 });
             }else{
                 return false;
             }

         }
    });


    //-----------------------发送验证码前验证手机号--------------------
    function phoneNumberVer(){
        var val = $.trim($("#reg_phone_number").val());

        if(val == "" || val == undefined){
            $("#reg_phone_number").focus().siblings(".form_tips").show().find("span").text("请输入手机号");
            return false;
        }else{
            var result = regularExpression("phone_number",val);

            if(result){
                return true;
            }else{
                $("#reg_phone_number").focus().siblings(".form_tips").show().find("span").text("请输入正确的手机号");
                return false;
            }
        }
    }


    //----------------------提交前的表单验证----------------------
    $(".reg_right_form").delegate(".btn_register","click",function(){
        var form = $(this).parents(".reg_right_form"),
            flag = true;

        form.find("input").each(function(){
            var val = $.trim($(this).val());
            if(val == "" || val == undefined){
                var placeholder = $(this).attr("placeholder");

                $(this).focus();
                $(this).siblings(".form_tips").show().find("span").text(placeholder);
                flag = false;
                return false;
            }else{
                var type = $(this).attr("data-reg-type"),
                    result = regularExpression(type,val);

                if(result){
                    $(this).siblings(".form_tips").hide();
                    return true;
                }else{
                    var error = $(this).attr("data-error");

                    $(this).focus();
                    $(this).siblings(".form_tips").show().find("span").text(error);
                    flag = false;
                    return false;
                }
            }
        });


        //-------验证验证码是否正确-------
        if(flag){
            $.ajax({
                url:"",
                dataType:"json",
                data: $.trim($("#reg_code").val()),
                success:function(data){
                    var state = data.state;
                    flag = !!state;
                },error:function(){

                },always:function(){

                }
            });
        }else{
            flag = false;
        }


        if(flag){
            $(".form_tips").hide();
            form.find(".reg_form_submit").trigger("click");
        }else{
            return false;
        }



    });
});

