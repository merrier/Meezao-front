$(function () {

    //--------------表单验证开始-------------------------
    $(".login_form").validate({
        debug:true,
        rules: {
            login_username: {
                required: true
            },
            login_password: {
                required: {
                    depends: function (element) {
                        return $(".login_username").is(":filled");
                    }
                }
            }
        },
        messages: {
            login_username: {
                required: '*请输入用户名'
            },
            login_password: {
                required: '*请输入密码'
            }
        },
        errorClass:"error_tips",
        errorContainer: ".tips_box",
        errorLabelContainer: ".tips_box",
        errorElement: "label"
    });

    $(".password_retrieve_form").validate({
        submitHandler: function() {
            $('.modal_retrieve_password_success').modal('show');
            $('.modal_retrieve_password').modal('hide');
        },

        rules:{
            retrievepassword_username:{
                required: true,
            },
            retrievepassword_phone_number:{
                phonenumber:""
            }
        },

        messages:{
            retrievepassword_username:{
                required: '*请输入用户名'
            }
        },

        errorClass:"error_tips",


    });

    $.validator.addMethod("phonenumber", function(value, element, params){
        //value:input的输入值
        //element:
        var phonenumber = /^1[35847][0-9][0-9]{8}$/;
        return this.optional(element) || (phonenumber.test(value));
    }, $.validator.format("*请确认输入的是手机号！"));

    //--------------表单验证结束-------------------------

    //---------------回车登录------------------
    $("body").keydown=keyEnter(".login_right_part btn-info");

    //---------------找回密码模态框弹出---------------
    $(".login_retrieve_password").click(function(){
        $('.modal_retrieve_password').modal('show');
    });

    var state=0;
    $(".btn-info").click(function(){
        if(state == 0){
            var error_label=$("<label class='error_tips'>*用户名或者密码错误！</label>");
            error_label.show();
            $(this).after(error_label);
        }else{
            $(this).next("label").remove();
        }
    });
});