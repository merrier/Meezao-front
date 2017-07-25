/**
 * Created by Yangyue on 2016/7/11.
 */

$(document).ready(function(){

    var par=".account_list";

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
        var d_id=$(this).parents(".modal_delete").attr("data-id");
        $("tr").each(function(){
            if($(this).attr("data-id")==d_id){
                $(this).remove();
            }
        });
    });
    //----------------------------删除模态框确认----------------------------------------

    //----------------------------解绑----------------------------------------
    $(par+" .btn-group").delegate(".btn_unbinding","click",function(){
        $(this).text("已解绑").attr("disabled",true);
        $(this).removeClass("btn_unbinding").addClass("btn_unbinding_already");
    });
    //----------------------------解绑----------------------------------------

    //----------------------------停用启用切换----------------------------------------
    $(par+" .btn-group").delegate(".btn_use","click",function(){
        if($(this).hasClass("btn_start_use")){
            $(this).removeClass("btn_start_use").addClass("btn_stop_use");
            $(this).text("停用");
        }else{
            $(this).removeClass("btn_stop_use").addClass("btn_start_use");
            $(this).text("启用");
        }
    })

});