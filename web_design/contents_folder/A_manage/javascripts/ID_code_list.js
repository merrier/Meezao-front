/**
 * Created by Yangyue on 2016/7/19.
 */

$(document).ready(function(){

    var par=".ID_code_list";

    //--------------------------------创建标识码模态框-------------------------------
    $(par).delegate(".btn_create_ID_code","click",function(){
        var modal_now=$(".modal_ID_code");
        modal_now.addClass("modal_ID_code_create").removeClass("modal_ID_code_edit");
        modal_now.find(".modal-title").text("创建标识码");
        modal_now.find(".name_input").val("");
        modal_now.find(".url_input").val("");
        modal_now.find(".ID_code_input").val("");
        modal_now.modal("show");
    });
    //--------------------------------创建标识码模态框-------------------------------

    //--------------------------------编辑标识码模态框-------------------------------
    $(par).delegate(".btn_edit","click",function(){
        var modal_now=$(".modal_ID_code");
        var par=$(this).parents("tr");
        var d_id=par.attr("data-id");
        modal_now.attr("data-id",d_id);
        modal_now.addClass("modal_ID_code_edit").removeClass("modal_ID_code_create");
        modal_now.find(".modal-title").text("编辑标识码");
        var name=par.find("td").eq(2).text();
        var ID_code=par.find("td").eq(1).text();
        var url=par.find("td").eq(3).text();
        modal_now.find(".name_input").val(name);
        modal_now.find(".url_input").val(url);
        modal_now.find(".ID_code_input").val(ID_code);
        modal_now.modal("show");
    });
    //--------------------------------创建标识码模态框-------------------------------


    $(".modal_ID_code").delegate(".btn-primary","click",function(){
        var info={
            name:'',
            URL:'',
            ID_code:''
        };
        info.name=$(".modal_ID_code .name_input").val();
        info.URL=$(".modal_ID_code .url_input").val().trim();
        info.ID_code=$(".modal_ID_code .ID_code_input").val().trim();
        console.log("名称："+info.name);
        console.log("URL："+info.URL);
        console.log("标识码："+info.ID_code);

        var par=$(this).parents(".modal_ID_code");
        if(par.hasClass("modal_ID_code_create")){           //确认创建标识码

        }else{                                                 //确认编辑标识码

        }
        par.modal("hide");
    });

    //--------------------------------删除模态框-------------------------------
    $(par).delegate(".btn_delete","click",function(){
        var modal_now=$(".modal_delete");
        var d_id=$(this).parents("tr").attr("data-id");
        modal_now.attr("data-id",d_id).modal("show");
    });
    //--------------------------------删除模态框-------------------------------

    //--------------------------------删除确认-------------------------------
    $(par).delegate(".modal_delete .btn_confirm","click",function(){
        var modal_now=$(".modal_delete");
        console.log(modal_now.attr("data-id"));
        modal_now.modal("hide");
    });
    //--------------------------------删除确认-------------------------------

});