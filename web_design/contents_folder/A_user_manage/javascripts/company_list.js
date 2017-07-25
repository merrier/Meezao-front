/**
 * Created by Yangyue on 2016/7/11.
 */

$(document).ready(function(){

    var par=".company_list";

    //----------------------------查询输入内容----------------------------------------------
    $(par+" .navbar-form").delegate(".btn_search","click",function(){
        console.log("搜索框输入内容："+$(this).parents(".navbar-form").find(".search_input").val());
    });
    //----------------------------查询输入内容----------------------------------------------

    //----------------------------创建公司模态框----------------------------------------
    $(par+" .navbar-default").delegate(".btn_create_company","click",function(){
        var modal_now=$(".modal_create_company");
        modal_now.find(".company_name").val("");
        modal_now.find("label.error_tips").hide();
        modal_now.modal("show");
    });
    //----------------------------创建公司模态框----------------------------------------

    //----------------------------创建公司模态框表单验证----------------------------------------
    $(par+" .create_company_form").validate({
        debug:true,
        rules:{
            company_name:{
                required:true
            }
        },
        messages:{
            company_name:{
                required:"*请输入公司名称"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){
            var com_name=$(form).find(".company_name").val();       //创建公司名称输入
            console.log("公司名称："+com_name);
            $(form).parents(".modal").modal("hide");
        }
    });
    //----------------------------创建公司模态框表单验证----------------------------------------

    //----------------------------编辑公司模态框----------------------------------------
    $(par+" .btn-group").delegate(".btn_edit","click",function(){
        var modal_now=$(".modal_edit_company");
        var com_name=$(this).parents("tr").find("td").eq(1).text();
        var d_id=$(this).parents("tr").attr("data-id");
        modal_now.find(".company_name").val(com_name);
        modal_now.find("label.error_tips").hide();
        modal_now.modal("show").attr("data-id",d_id);
    });
    //----------------------------编辑公司模态框----------------------------------------

    //----------------------------编辑公司模态框表单验证----------------------------------------
    $(par+" .edit_company_form").validate({
        debug:true,
        rules:{
            company_name:{
                required:true
            }
        },
        messages:{
            company_name:{
                required:"*请输入公司名称"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){
            var com_name=$(form).find(".company_name").val();       //编辑公司名称输入
            var d_id=$(form).parents(".modal").attr("data-id");       //编辑公司id
            console.log("公司名称："+com_name);
            console.log("公司id："+d_id);
            $(form).parents(".modal").modal("hide");
        }
    });
    //----------------------------编辑公司模态框表单验证----------------------------------------

    //----------------------------删除模态框----------------------------------------
    $(par+" .btn-group").delegate(".btn_delete","click",function(){
        var d_id=$(this).parents("tr").attr("data-id");
        $(".modal_delete").attr("data-id",d_id).modal("show");
    });
    //----------------------------删除模态框----------------------------------------

    //----------------------------删除模态框确认----------------------------------------
    $(par+" .modal_delete").delegate(".btn_confirm","click",function(){
        console.log($(this).parents(".modal_delete").attr("data-id"));
        $(this).parents(".modal_delete").modal("hide");
    });
    //----------------------------删除模态框确认----------------------------------------



});