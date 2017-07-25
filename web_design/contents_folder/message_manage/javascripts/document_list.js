/**
 * Created by Yangyue on 2016/7/8.
 */

$(document).ready(function(){

    var par=".document_list";

    $(par+" .navbar-right").delegate(".btn_search","click",function(){
        console.log($(this).parents(".navbar-right").find(".search_input").val());
    });

    //------------------------------对象模态框-------------------
    $(par+" .table_body").delegate(".object_td","click",function(e){
        var d_id=$(this).parents("tr").attr("data-id");
        var object_array=["新世界望京店","新世界崇文店","新世界大望路店","新世界燕郊店","新世界金桥路店"];
        $.each(object_array,function(index,value){
            var li=$("<li></li>");
            li.text(object_array[index]);
            li.appendTo(".modal_object ul");
        });
        $(".modal_object").modal("show");
    });
    //------------------------------对象模态框-------------------

    //------------------------------删除模态框-------------------
    $(par+" .btn-group").delegate(".btn_delete","click",function(){
        var d_id=$(this).parents("tr").attr("data-id");
        $(".modal_delete").attr("data-id",d_id).modal("show");
    });

    //------------------------------删除操作确认-------------------
    $(par+" .modal_delete").delegate(".btn_confirm","click",function(){
        $(".modal_delete").modal("hide");
        console.log($(this).parents(".modal").attr("data-id"));
    });
    //------------------------------删除操作确认-------------------
    //------------------------------删除模态框-------------------

});

