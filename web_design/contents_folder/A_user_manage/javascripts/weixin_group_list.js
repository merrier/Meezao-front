/**
 * Created by Yangyue on 2016/7/11.
 */

$(document).ready(function(){

    var par=".weixin_group_list";

    //----------------------------查询输入内容----------------------------------------------
    $(par+" .navbar-form").delegate(".btn_search","click",function(){
        console.log("搜索框输入内容："+$(this).parents(".navbar-form").find(".search_input").val());
    });
    //----------------------------查询输入内容----------------------------------------------

    //----------------------------创建群组模态框----------------------------------------
    $(par+" .navbar-default").delegate(".btn_create_group","click",function(){
        var modal_now=$(".modal_group");
        modal_now.addClass("modal_create_group").removeClass("modal_edit_group");
        modal_now.find(".group_name").val("");
        modal_now.attr("data-id","");
        modal_now.find("label.error_tips").hide();
        modal_now.modal("show");
    });
    //----------------------------创建群组模态框----------------------------------------

    //----------------------------编辑群组模态框----------------------------------------
    $(par+" .btn-group").delegate(".btn_edit","click",function(){
        var modal_now=$(".modal_group");
        modal_now.addClass("modal_edit_group").removeClass("modal_create_group");
        var com_name=$(this).parents("tr").find("td").eq(1).text();
        var d_id=$(this).parents("tr").attr("data-id");
        modal_now.find(".group_name").val(com_name);
        modal_now.attr("data-id",d_id);
        modal_now.find("label.error_tips").hide();
        modal_now.modal("show");
    });
    //----------------------------编辑群组模态框----------------------------------------

    //----------------------------群组模态框表单验证----------------------------------------
    $(par+" .group_form").validate({
        debug:true,
        rules:{
            group_name:{
                required:true
            }
        },
        messages:{
            group_name:{
                required:"*请输入公司名称"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){
            var modal=$(form).parents(".modal_group");
            if(modal.hasClass("modal_create_group")){          //创建群组

            }else{                                               //编辑群组
                var d_id=$(form).parents(".modal").attr("data-id");       //编辑群组id
                console.log("群组id："+d_id);
            }
            var com_name=$(form).find(".group_name").val();       //创建群组名称输入
            console.log("群组名称："+com_name);
            $(form).parents(".modal").modal("hide");
        }
    });
    //----------------------------群组模态框表单验证----------------------------------------

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