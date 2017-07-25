/**
 * Created by Yangyue on 2017/3/1.
 */

$(function(){
    $(".main").validate({
        debug:true,
        rules:{
            category_name:{
                required:true
            },
            order:{
                required:true,
                digits:true
            },
            level:{
                required:true
            },
            zipCode:{
                required:true,
                isZipCode:""
            }
        },
        messages:{
            category_name:{
                required:"*请输入品类名称"
            },
            order:{
                required:"*请输入顺序",
                digits:"*请输入正整数"
            },
            level:{
                required:"*请输入级别"
            },
            zipCode:{
                required:"*请输入邮编"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){

        }
    });

    jQuery.validator.addMethod("isZipCode", function(value, element) {
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的邮政编码");

});
