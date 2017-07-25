/**
 * Created by Yangyue on 2016/8/22.
 */

$(function(){

    var par=$(".check_collection");

    //-----------------------创建分组模态框---------------------------
    $(par).delegate(".btn_create_group","click",function(){
        $(".modal_create_group").modal("show");
    });
    //-----------------------创建分组模态框---------------------------

    //-----------------------创建分组确认---------------------------
    $(par).delegate(".modal_create_group .btn-primary","click",function(){
        var modal_now=$(this).parents(".modal_create_group");
        var g_name=modal_now.find(".group_name_input").val().trim();
        console.log(g_name);
        modal_now.modal("hide");
    });
    //-----------------------创建分组确认---------------------------

    //-----------------------查看模态框---------------------------
    $(par).delegate(".btn_check","click",function(){
        var tr=$(this).parents("tr");
        var g_name=tr.find("td").eq(1).text();
        var d_id=tr.attr("data-id");
        var modal_now=$(".modal_check");
        modal_now.find(".modal-title").text(g_name);
        modal_now.attr("data-id",d_id);
        modal_now.modal("show");
    });
    //-----------------------查看模态框---------------------------

    //------------------------删除详情---------------------------------
    $(par).delegate(".collection_detail .btn_delete","click",function(){
        $(this).parents(".collection_detail").remove();
    });
    //------------------------删除详情---------------------------------

    //-------------------------编辑分组模态框--------------------------
    $(par).delegate(".btn_edit","click",function(){
        var tr=$(this).parents("tr");
        var g_name=tr.find("td").eq(1).text();
        var d_id=tr.attr("data-id");
        var modal_now=$(".modal_edit");
        modal_now.attr("data-id",d_id);
        modal_now.find(".group_name_input").val(g_name);
        modal_now.modal("show");
    });
    //-------------------------编辑分组模态框--------------------------

    //-------------------------编辑分组确认--------------------------
    $(par).delegate(".modal_edit .btn-primary","click",function(){
        var modal_now=$(".modal_edit");
        var d_id=modal_now.attr("data-id");
        var g_name=modal_now.find(".group_name_input").val().trim();
        $(".table_body tr").each(function(){
           if($(this).attr("data-id")==d_id){
               $(this).find("td").eq(1).text(g_name);
           }
        });
        console.log(g_name);
        modal_now.modal("hide");
    });
    //-------------------------编辑分组确认--------------------------

    //-------------------------删除模态框--------------------------
    $(par).delegate(".btn_delete","click",function(){
        var tr=$(this).parents("tr");
        var d_id=tr.attr("data-id");
        var modal_now=$(".modal_delete");
        modal_now.attr("data-id",d_id);
        modal_now.modal("show");
    });
    //-------------------------删除模态框--------------------------

    //-------------------------删除确认--------------------------
    $(par).delegate(".modal_delete .btn-primary","click",function(){
        var modal_now=$(".modal_delete");
        var d_id=modal_now.attr("data-id");
        $(".table_body tr").each(function(){
            if($(this).attr("data-id")==d_id){
                $(this).remove();
            }
        });
        console.log("删除项的data-id："+d_id);
        modal_now.modal("hide");
    });
    //-------------------------删除确认--------------------------

});