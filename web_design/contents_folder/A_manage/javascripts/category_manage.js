/**
 * Created by Yangyue on 2016/7/25.
 */

$(document).ready(function(){

    var par=".category_manage";

    //-----------------------------------增加一级品类模态框--------------------------------------
    $(par).delegate(".btn_add_level1","click",function(){
        var modal_now=$(".modal_add_menu");
        modal_now.addClass("modal_add_level1").removeClass("modal_add_level2");
        modal_now.attr("data-character","");
        modal_now.find(".modal-title").text("增加一级品类");
        modal_now.find(".level").val("1");
        initialAddMenuModal(modal_now,$(this));
    });
    //-----------------------------------增加一级品类模态框--------------------------------------

    //-----------------------------------增加二级品类模态框--------------------------------------
    $(par).delegate(".btn_add_level2","click",function(){
        var d_id=$(this).parents("tr").attr("data-id");
        var modal_now=$(".modal_add_menu");
        modal_now.removeClass("modal_add_level1").addClass("modal_add_level2");
        modal_now.attr("data-character",$(this).parents("tr").attr("data-character"));
        modal_now.find(".modal-title").text("增加二级品类");
        modal_now.find(".level").val("2");
        initialAddMenuModal(modal_now,$(this));
    });
    //-----------------------------------增加二级品类模态框--------------------------------------

    //---------------------新增品类表单验证--------------------------------------
    $(par+" .modal_add_level_form").validate({
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
    //---------------------新增品类表单验证--------------------------------------

    //-----------------------------------编辑品类模态框--------------------------------------
    $(par).delegate(".btn_edit","click",function(){
        var tr=$(this).parents("tr");
        var d_index=tr.index();
        var name=tr.find("td").eq(0).text();
        var modal_now=$(".modal_edit_menu");
        modal_now.attr("data-character",tr.attr("data-character"));
        modal_now.attr("data-id",d_index);
        modal_now.find(".input_word_limit").val(name).trigger("keyup");
        modal_now.find(".order").val(tr.attr("data-order"));
        if(tr.hasClass("menu_level1")){
            modal_now.find(".modal-title").text("编辑一级品类");
            modal_now.find(".level").val("1");
        }else{
            modal_now.find(".modal-title").text("编辑二级品类");
            modal_now.find(".level").val("2");
        }
        modal_now.modal("show");
    });
    //-----------------------------------编辑品类模态框--------------------------------------

    //---------------------编辑品类表单验证--------------------------------------
    $(par+" .modal_edit_menu_form").validate({
        debug: true,
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
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form) {
            //form.submit();
        }
    });
    //---------------------编辑品类表单验证--------------------------------------


    function initialAddMenuModal(modal_now,target){
        $("label.error_tips").hide();
        modal_now.attr("data-id",target.parents("tr").index());
        modal_now.find(".category_name").val("").trigger("keyup");
        modal_now.find(".order").val("");
        modal_now.modal("show")
    }

    function initialTr(tr,modal_now){
        tr.find("td").eq(0).text(modal_now.find(".category_name").val());
        tr.attr("data-order",modal_now.find(".order").val());
        tr.attr("data-level",modal_now.find(".level").val());
    }

});