/**
 * Created by Yangyue on 2016/7/18.
 */

$(document).ready(function(){

    var par=".create_C_mould";

    //-------------------名称有输入时才可点击保存------------------------
    $(par+" .mould_name_input").bind('input',function(){               //文本框输入后立即触发事件
        var text=$(this).val();
        if(text!=""){
            $(this).next(".btn_save").attr("disabled",false);
        }else{
            $(this).next(".btn_save").attr("disabled",true);
        }
    });
    //-------------------名称有输入时才可点击保存------------------------

    //-------------------新增一级菜单------------------------
    $(par+" .navbar-right").delegate(".btn_add_level1","click",function(){
        var modal_now=$(".modal_add_menu");
        modal_now.addClass("modal_add_level1").removeClass("modal_add_level2");
        modal_now.attr("data-character","");
        modal_now.find(".modal-title").text("新增一级菜单");
        modal_now.find(".level").val("1");
        initialAddMenuModal(modal_now,$(this));
    });

    //-------------------新增二级菜单------------------------
    $(par).on("click",".btn-group .btn_add_level2",function(){
        var modal_now=$(".modal_add_menu");
        modal_now.addClass("modal_add_level2").removeClass("modal_add_level1");
        modal_now.attr("data-character",$(this).parents("tr").attr("data-character"));
        modal_now.find(".modal-title").text("新增二级菜单");
        modal_now.find(".level").val("2");
        initialAddMenuModal(modal_now,$(this));
    });

    //---------------------C端模板新增菜单表单验证--------------------------------------
    $(par+" .modal_add_level_form").validate({
        debug:true,
        rules:{
            menu_name:{
                required:true
            },
            url:{
                required:true
            },
            order:{
                required:true,
                digits:true
            },
            level:{
                required:true
            },
            clone_father_ID:{
                required:true
            },
            access_file:{
                required:true
            }
        },
        messages:{
            menu_name:{
                required:"*请输入菜单名称"
            },
            url:{
                required:"*请输入url"
            },
            order:{
                required:"*请输入顺序",
                digits:"*请输入正整数"
            },
            level:{
                required:"*请输入级别"
            },
            clone_father_ID:{
                required:"*请输入克隆父ID"
            },
            access_file:{
                required:"*请输入入口文件"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){
            var par=$(form).parents(".modal");
            if(par.hasClass("modal_add_level1")){
                //form.submit();
                var modal_now=$(".modal_add_menu");
                var tr=$('<tr class="menu_level1" title="menu">'+
                    '<td></td>'+
                    '<td>'+
                    '<div class="btn-group" role="group" aria-label="...">'+
                    '<button type="button" class="btn btn-default btn_add_level2">新增二级</button>'+
                    '<button type="button" class="btn btn-default btn_edit">编辑</button>'+
                    '<button type="button" class="btn btn-default btn_delete">删除</button>'+
                    '</div>'+
                    '</td>'+
                    '</tr>');
                initialTr(tr,modal_now);
                tr.attr("data-character",modal_now.find(".order").val());
                var order=Number(modal_now.find(".order").val());
                if($(".menu_level1").length>0){
                    var flag=1;
                    $(".menu_level1").each(function(){
                        var order_now=Number($(this).attr("data-order"));
                        if(order<order_now){
                            $(this).after(tr);
                            flag=0;
                        }
                    });
                    if(flag){
                        tr.prependTo(".table_body");
                    }
                }else{
                    tr.prependTo(".table_body");
                }
                modal_now.modal("hide");
            }else if(par.hasClass("modal_add_level2")) {
                //form.submit();

                var modal_now = $(".modal_add_menu");
                var tr = $('<tr class="menu_level2" title="menu">' +
                    '<td></td>' +
                    '<td>' +
                    '<div class="btn-group" role="group" aria-label="...">' +
                    '<button type="button" class="btn btn-default btn_edit">编辑</button>' +
                    '<button type="button" class="btn btn-default btn_delete">删除</button>' +
                    '</div>' +
                    '</td>' +
                    '</tr>');
                initialTr(tr,modal_now);
                var d_ch = modal_now.attr("data-character") + "_" + modal_now.find(".order").val();
                tr.attr("data-character", d_ch);
                var order = Number(modal_now.find(".order").val());
                var flag1 = 1;
                var index_now = modal_now.attr("data-id");
                $("tr.menu_level2").each(function () {
                    var d_ch_now = $(this).attr("data-character");
                    if (d_ch_now.substring(0,1) == d_ch.substring(0,1)) {
                        if ($(this).prevAll("tr.menu_level1").eq(0).index() == index_now) {
                            var order_now = Number($(this).attr("data-order"));
                            if (order < order_now) {
                                $(this).after(tr);
                                flag1 = 0;
                            }
                        }
                    }
                });
                if (flag1) {
                    $("tr.menu_level1").each(function () {
                        if ($(this).index() == modal_now.attr("data-id")) {
                            $(this).after(tr);
                        }
                    })
                }
                modal_now.modal("hide");
            }
        }
    });
    //---------------------C端模板新增菜单表单验证--------------------------------------

    //------------------编辑模态框----------------------------------------
    $(par).on("click",".btn-group .btn_edit",function(){
        var par=$(this).parents("tr");
        var d_index=$(this).parents("tr").index();
        var modal_now=$(".modal_edit_menu");
        $("label.error_tips").hide();
        modal_now.attr("data-id",d_index);
        modal_now.attr("data-character",par.attr("data-character"));
        modal_now.find(".menu_name").val(par.find("td").eq(0).text());
        modal_now.find(".url").val(par.attr("data-url"));
        modal_now.find(".order").val(par.attr("data-order"));
        modal_now.find(".level").val(par.attr("data-level"));
        modal_now.find(".clone_father_ID").val(par.attr("data-clone_father_ID"));
        modal_now.find(".access_file").val(par.attr("data-access_file"));
        modal_now.modal("show");
    });
    //------------------编辑模态框----------------------------------------

    //---------------------C端模板编辑菜单表单验证--------------------------------------
    $(par+" .modal_edit_menu_form").validate({
        debug: true,
        rules: {
            menu_name: {
                required: true
            },
            url: {
                required: true
            },
            order: {
                required: true,
                digits: true
            },
            level: {
                required: true
            },
            clone_father_ID: {
                required: true
            },
            access_file: {
                required: true
            }
        },
        messages: {
            menu_name: {
                required: "*请输入菜单名称"
            },
            url: {
                required: "*请输入url"
            },
            order: {
                required: "*请输入顺序",
                digits: "*请输入正整数"
            },
            level: {
                required: "*请输入级别"
            },
            clone_father_ID: {
                required: "*请输入克隆父ID"
            },
            access_file: {
                required: "*请输入入口文件"
            }
        },
        errorClass: "error_tips",
        submitHandler:function(form) {
            //form.submit();
        }
    });
    //---------------------C端模板编辑菜单表单验证--------------------------------------

    //------------------删除模态框-------------------------------------------
    $(par).on("click",".btn-group .btn_delete",function(){
        var c_Name=$(this).parents("tr").attr("class");
        var d_index_start=$(this).parents("tr").index();
        var d_index_stop=$(this).parents("tr").nextAll("."+c_Name).eq(0).index();
        var d_character=$(this).parents("tr").attr("data-character");
        var modal_now=$(".modal_delete");
        modal_now.attr("data-index-start",d_index_start);
        modal_now.attr("data-index-stop",d_index_stop);
        modal_now.attr("data-character",d_character);
        modal_now.modal("show");
    });
    //------------------删除模态框-------------------------------------------

    //------------------删除确认-------------------------------------------
    $(par+" .modal_delete").delegate(".btn-primary","click",function(){
        var modal_now=$(".modal_delete");
        modal_now.modal("hide");
        var d_index_start=modal_now.attr("data-index-start");
        var d_index_stop=modal_now.attr("data-index-stop");
        var d_character_now=modal_now.attr("data-character");
        $("tr[title=menu]").each(function(){
            var d_index_now=$(this).index();
            if(d_index_stop<0){
                if(d_index_now>=d_index_start){
                    if($(this).attr("data-character").indexOf(d_character_now)>=0){
                        $(this).addClass("menu_delete");
                    }
                }
            }else{
                if(d_index_now>=d_index_start&&d_index_now<d_index_stop){
                    if($(this).attr("data-character").indexOf(d_character_now)>=0){
                        $(this).addClass("menu_delete");
                    }
                }
            }
        });
        $(".menu_delete").remove();
    });
    //------------------删除确认-------------------------------------------

    function initialAddMenuModal(modal_now,target){
        $("label.error_tips").hide();
        modal_now.attr("data-id",target.parents("tr").index());
        modal_now.find(".menu_name").val("");
        modal_now.find(".url").val("");
        modal_now.find(".order").val("");
        modal_now.find(".clone_father_ID").val("");
        modal_now.find(".access_file").val("");
        modal_now.modal("show")
    }

    function initialTr(tr,modal_now){
        tr.find("td").eq(0).text(modal_now.find(".menu_name").val());
        tr.attr("data-url",modal_now.find(".url").val());
        tr.attr("data-order",modal_now.find(".order").val());
        tr.attr("data-level",modal_now.find(".level").val());
        tr.attr("data-clone_father_ID",modal_now.find(".clone_father_ID").val());
        tr.attr("data-access_file",modal_now.find(".access_file").val());
    }

});

/*
 函数名称：fileChange
 参数：js原生选择器
 功能：限制图片上传格式为jpg或者png
 */
function iconUpload(target) {
    var name=target.value;
    var fileType = name.substring(name.lastIndexOf(".")+1).toLowerCase();     //获取文件格式
    var fileArr=name.split("\\");
    var fileName=fileArr[fileArr.length-1];     //获取文件名称
    if(fileType !="jpg" && fileType !="png"){
        alert("请选择jpg或者png格式图片文件上传！");
        target.value="";
        return false;
    }else{
        var fileSize = target.files[0].size/1024;           //获取文件大小，单位为kb
        var url=getObjectURL(target.files[0]);           //获取图片url
        $(".upload_img").attr("src",url);      //显示上传图片
        $(".img_name p").text(fileName);          //显示上传图片文件名
    }
}