/**
 * Created by Yangyue on 2016/7/13.
 */

$(document).ready(function(){

    var par=".mould_list";
    var par1=".content_mould_list";
    var par2=".content_edit_B";
    var par3=".content_edit_C";

    //--------------------模板列表删除--------------------------------------------------
    $(par1+" .btn-group").delegate(".btn_delete","click",function(){
        var d_id=$(this).parents("tr").attr("data-id");
        $(".modal_delete_mould_list").attr("data-id",d_id).modal("show");
    });

    $(par+" .modal_delete_mould_list").delegate(".btn_confirm","click",function(){
        console.log($(this).parents(".modal").attr("data-id"));
        $(this).parents(".modal").modal("hide");
    });
    //--------------------模板列表删除--------------------------------------------------

    //--------------------编辑模板----------------------------------------
    $(par1+" .btn-group").delegate(".btn_edit","click",function(){
        var kind=$(this).parents("tr").find("td").eq(1).text();
        var name=$(this).parents("tr").find("td").eq(2).text();
        console.log(kind);
        console.log(name);
        if(kind=="B端模板"){                   //编辑B端模板
            $(".content_mb_title").text("编辑-"+name);
            $(".content_mould_list").hide();
            $(".content_edit_B").show().find(".mould_name").val(name).trigger("input");
            $(".content_edit_C").hide();
            var menuB={
                "data":[
                    {
                        "text":"文案系统",
                        "character":"1",
                        "url":"http://www.baidu.com",
                        "order":"1",
                        "level":"1",
                        "clone_father_ID":"aaaaaaaa",
                        "access_file":"bbbbbbb"

                    },
                    {
                        "text":"创建文案",
                        "character":"1_1",
                        "url":"http://www.baidu.com",
                        "order":"1",
                        "level":"2",
                        "clone_father_ID":"ccccccccc",
                        "access_file":"dddddddddd"
                    },
                    {
                        "text":"创建文案列表",
                        "character":"1_1_2",
                        "url":"http://www.baidu.com",
                        "order":"2",
                        "level":"3",
                        "clone_father_ID":"eeeeeeeee",
                        "access_file":"fffffffff"
                    },
                    {
                        "text":"文案管理",
                        "character":"1_2",
                        "url":"http://www.baidu.com",
                        "order":"2",
                        "level":"2",
                        "clone_father_ID":"ccccccccc",
                        "access_file":"dddddddddd"
                    },
                    {
                        "text":"多文案列表",
                        "character":"1_2_2",
                        "url":"http://www.baidu.com",
                        "order":"2",
                        "level":"3",
                        "clone_father_ID":"ccccccccc",
                        "access_file":"dddddddddd"
                    },
                    {
                        "text":"发送列表",
                        "character":"1_2_4",
                        "url":"http://www.baidu.com",
                        "order":"4",
                        "level":"3",
                        "clone_father_ID":"ccccccccc",
                        "access_file":"dddddddddd"
                    },
                    {
                        "text":"单文案列表",
                        "character":"1_2_1",
                        "url":"http://www.baidu.com",
                        "order":"1",
                        "level":"3",
                        "clone_father_ID":"ccccccccc",
                        "access_file":"dddddddddd"
                    }
                ]
            };
            initialTableB(menuB);
        }else if(kind=="C端模板"){            //编辑C端模板
            $(".content_mb_title").text("编辑-"+name);
            $(".content_mould_list").hide();
            $(".content_edit_B").hide();
            $(".content_edit_C").show().find(".mould_name").val(name).trigger("input");
            var menuC={
                "data":[
                    {
                        "text":"有折有饭",
                        "character":"1",
                        "url":"http://www.baidu.com",
                        "order":"1",
                        "level":"1",
                        "clone_father_ID":"aaaaaaaa",
                        "access_file":"bbbbbbb"

                    },
                    {
                        "text":"最新资讯",
                        "character":"1_1",
                        "url":"http://www.baidu.com",
                        "order":"1",
                        "level":"2",
                        "clone_father_ID":"ccccccccc",
                        "access_file":"dddddddddd"
                    },
                    {
                        "text": "最新活动",
                        "character": "1_2",
                        "url": "http://www.baidu.com",
                        "order": "2",
                        "level": "2",
                        "clone_father_ID": "ccccccccc",
                        "access_file": "dddddddddd"
                    }
                ]
            };
            initialTableC(menuC);
        }else{

        }
    });
    //--------------------编辑模板----------------------------------------

    //--------------------B端模板初始化--------------------
    function initialTableB(menu){
        for(var i=0;i<menu.data.length;i++){
            switch (menu.data[i].level){
                case "1":
                    initialMenuLevel1(par2,menu,i);
                    break;
                case "2":
                    var tr=$('<tr class="menu_level2" title="menu">'+
                        '<td></td>'+
                        '<td>'+
                        '<div class="btn-group" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default btn_add_level3">新增三级</button>'+
                        '<button type="button" class="btn btn-default btn_edit">编辑</button>'+
                        '<button type="button" class="btn btn-default btn_delete">删除</button>'+
                        '</div>'+
                        '</td>'+
                        '</tr>');
                    initialMenuLevel2(par2,tr,menu,i);
                    break;
                case "3":
                    initialMenuLevel3(par2,menu,i);
                    break;
                default:
                    break;
            }
        }
    }
    //--------------------B端模板初始化--------------------

    //--------------------C端模板初始化--------------------
    function initialTableC(menu){
        for(var i=0;i<menu.data.length;i++){
            switch (menu.data[i].level){
                case "1":
                    initialMenuLevel1(par3,menu,i);
                    break;
                case "2":
                    var tr=$('<tr class="menu_level2" title="menu">'+
                        '<td></td>'+
                        '<td>'+
                        '<div class="btn-group" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default btn_edit">编辑</button>'+
                        '<button type="button" class="btn btn-default btn_delete">删除</button>'+
                        '</div>'+
                        '</td>'+
                        '</tr>');
                    initialMenuLevel2(par3,tr,menu,i);
                    break;
                default:
                    break;
            }
        }
    }
    //--------------------C端模板初始化--------------------

    //-------------------B端模板名称有输入时才可点击保存------------------------
    $(par2+" .mould_name").bind('input',function(){               //文本框输入后立即触发事件
        saveMenu($(this));
    });
    //-------------------B端模板名称有输入时才可点击保存------------------------

    //-------------------B端模板新增一级菜单------------------------
    $(par2+" .navbar-right").delegate(".btn_add_level1","click",function(){
        var modal_now=$(".modal_add_menu_B");
        $("label.error_tips").hide();
        modal_now.addClass("modal_add_level1").removeClass("modal_add_level2").removeClass("modal_add_level3");
        modal_now.attr("data-character","");
        modal_now.find(".modal-title").text("新增一级菜单");
        modal_now.find(".level").val("1");
        initialMenuModal(modal_now,$(this));
    });
    //-------------------B端模板新增一级菜单------------------------

    //-------------------B端模板新增二级菜单------------------------
    $(par2).on("click",".btn-group .btn_add_level2",function(){
        var modal_now=$(".modal_add_menu_B");
        $("label.error_tips").hide();
        modal_now.addClass("modal_add_level2").removeClass("modal_add_level1").removeClass("modal_add_level3");
        modal_now.attr("data-character",$(this).parents("tr").attr("data-character"));
        modal_now.find(".modal-title").text("新增二级菜单");
        modal_now.find(".level").val("2");
        initialMenuModal(modal_now,$(this));
    });
    //-------------------B端模板新增二级菜单------------------------

    //-------------------B端模板新增三级菜单------------------------
    $(par2).on("click",".btn-group .btn_add_level3",function(){
        var modal_now=$(".modal_add_menu_B");
        $("label.error_tips").hide();
        modal_now.addClass("modal_add_level3").removeClass("modal_add_level1").removeClass("modal_add_level2");
        modal_now.attr("data-character",$(this).parents("tr").attr("data-character"));
        modal_now.find(".modal-title").text("新增三级菜单");
        modal_now.find(".level").val("3");
        initialMenuModal(modal_now,$(this));
    });
    //-------------------B端模板新增三级菜单------------------------

    //------------------B端模板编辑模态框----------------------------------------
    $(par2).on("click",".btn-group .btn_edit",function(){
        var par=$(this).parents("tr");
        var d_index=$(this).parents("tr").index();
        var modal_now=$(".modal_edit_menu_B");
        $("label.error_tips").hide();
        modal_now.attr("data-id",d_index);
        modal_now.attr("data-character",par.attr("data-character"));
        console.log(modal_now.attr("data-id"));
        modal_now.find(".menu_name").val(par.find("td").eq(0).text());
        modal_now.find(".url").val(par.attr("data-url"));
        modal_now.find(".order").val(par.attr("data-order"));
        modal_now.find(".level").val(par.attr("data-level"));
        modal_now.find(".clone_father_ID").val(par.attr("data-clone_father_ID"));
        modal_now.find(".access_file").val(par.attr("data-access_file"));
        modal_now.modal("show");
    });
    //------------------B端模板编辑模态框----------------------------------------

    //---------------------B端模板新增菜单表单验证--------------------------------------
    $(par+" .modal_add_menu_B .modal_add_level_form").validate({
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
                var modal_now=$(".modal_add_menu_B");
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
                tr.find("td").eq(0).text(modal_now.find(".menu_name").val());
                tr.attr("data-character",modal_now.find(".order").val());
                tr.attr("data-url",modal_now.find(".url").val());
                tr.attr("data-order",modal_now.find(".order").val());
                tr.attr("data-level",modal_now.find(".level").val());
                tr.attr("data-clone_father_ID",modal_now.find(".clone_father_ID").val());
                tr.attr("data-access_file",modal_now.find(".access_file").val());

                var order=Number(modal_now.find(".order").val());
                if($(par2+" .menu_level1").length>0){
                    var flag=1;
                    $(par2+" .menu_level1").each(function(){
                        var order_now=Number($(this).attr("data-order"));
                        if(order<order_now){
                            $(this).after(tr);
                            flag=0;
                        }
                    });
                    if(flag){
                        tr.prependTo(par2+" .table_body");
                    }
                }else{
                    tr.prependTo(par2+" .table_body");
                }
                par.modal("hide");
            }else if(par.hasClass("modal_add_level2")){
                //form.submit();

                var modal_now=$(".modal_add_menu_B");
                var tr=$('<tr class="menu_level2" title="menu">'+
                    '<td></td>'+
                    '<td>'+
                    '<div class="btn-group" role="group" aria-label="...">'+
                    '<button type="button" class="btn btn-default btn_add_level3">新增三级</button>'+
                    '<button type="button" class="btn btn-default btn_edit">编辑</button>'+
                    '<button type="button" class="btn btn-default btn_delete">删除</button>'+
                    '</div>'+
                    '</td>'+
                    '</tr>');
                tr.find("td").eq(0).text(modal_now.find(".menu_name").val());
                var d_ch=modal_now.attr("data-character")+"_"+modal_now.find(".order").val();
                tr.attr("data-character",d_ch);
                tr.attr("data-url",modal_now.find(".url").val());
                tr.attr("data-order",modal_now.find(".order").val());
                tr.attr("data-level",modal_now.find(".level").val());
                tr.attr("data-clone_father_ID",modal_now.find(".clone_father_ID").val());
                tr.attr("data-access_file",modal_now.find(".access_file").val());
                var order=Number(modal_now.find(".order").val());
                var flag1=1;
                var index_now=modal_now.attr("data-id");
                console.log(index_now);
                $(par2+" tr.menu_level2").each(function(){
                    var d_ch_now=$(this).attr("data-character");
                    if(d_ch_now.substring(0,1)==d_ch.substring(0,1)){
                        console.log($(this).prevAll("tr.menu_level1").eq(0).index());
                        if($(this).prevAll("tr.menu_level1").eq(0).index()==index_now){
                            var order_now=Number($(this).attr("data-order"));
                            if(order<order_now){
                                $(this).after(tr);
                                flag1=0;
                            }
                        }
                    }
                });
                if(flag1){
                    $(par2+" tr.menu_level1").each(function(){
                        if($(this).index()==modal_now.attr("data-id")){
                            console.log($(this).index());
                            $(this).after(tr);
                        }
                    })
                }
                par.modal("hide");

            }else{
                //form.submit();
                var modal_now=$(".modal_add_menu_B");
                var tr=$('<tr class="menu_level3" title="menu">'+
                    '<td></td>'+
                    '<td>'+
                    '<div class="btn-group" role="group" aria-label="...">'+
                    '<button type="button" class="btn btn-default btn_edit">编辑</button>'+
                    '<button type="button" class="btn btn-default btn_delete">删除</button>'+
                    '</div>'+
                    '</td>'+
                    '</tr>');
                tr.find("td").eq(0).text(modal_now.find(".menu_name").val());
                var d_ch=modal_now.attr("data-character")+"_"+modal_now.find(".order").val();
                tr.attr("data-character",d_ch);
                tr.attr("data-url",modal_now.find(".url").val());
                tr.attr("data-order",modal_now.find(".order").val());
                tr.attr("data-level",modal_now.find(".level").val());
                tr.attr("data-clone_father_ID",modal_now.find(".clone_father_ID").val());
                tr.attr("data-access_file",modal_now.find(".access_file").val());
                var order=Number(modal_now.find(".order").val());
                var flag1=1;
                var index_now=modal_now.attr("data-id");
                console.log(index_now);
                $(par2+" tr.menu_level3").each(function(){
                    var d_ch_now=$(this).attr("data-character");
                    if(d_ch_now.substring(0,3)==d_ch.substring(0,3)){
                        console.log($(this).prevAll("tr.menu_level3").eq(0).index());
                        if($(this).prevAll("tr.menu_level2").eq(0).index()==index_now){
                            var order_now=Number($(this).attr("data-order"));
                            if(order<order_now){
                                $(this).after(tr);
                                flag1=0;
                            }
                        }
                    }
                });
                if(flag1){
                    $(par2+" tr.menu_level2").each(function(){
                        if($(this).index()==modal_now.attr("data-id")){
                            console.log($(this).index());
                            $(this).after(tr);
                        }
                    })
                }
                par.modal("hide");
            }
        }
    });
    //---------------------B端模板新增菜单表单验证--------------------------------------

    //---------------------B端模板编辑菜单表单验证--------------------------------------
    $(par+" .modal_edit_menu_B .modal_edit_menu_form").validate({
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
    //---------------------B端模板编辑菜单表单验证--------------------------------------

    //------------------删除模态框-------------------------------------------
    $(par2).on("click",".btn-group .btn_delete",function(){
        var modal_now=$(".modal_delete_mould_B");
        deleteModal($(this),modal_now);
    });
    //------------------删除模态框-------------------------------------------

    //------------------删除确认-------------------------------------------
    $(par+" .modal_delete_mould_B").delegate(".btn-primary","click",function(){
        var modal_now=$(".modal_delete_mould_B");
        deleteMenu(modal_now,par2,"menu_delete_B");
    });
    //------------------删除确认-------------------------------------------

    //---------------------由编辑B端模板回到模板列表页面--------------------------------------
    $(par2+" .navbar-form").delegate(".btn_back","click",function(){
        $(".content_mb_title").text("模板列表");
        $(".content_mould_list").show();
        $(".content_edit_B").find(".table_body tr").remove().end().hide();
        $(".content_edit_C").hide();
    });
    //---------------------由编辑B端模板回到模板列表页面--------------------------------------


    //-------------------C端模板名称有输入时才可点击保存------------------------
    $(par3+" .mould_name").bind('input',function(){               //文本框输入后立即触发事件
        saveMenu($(this));
    });
    //-------------------C端模板名称有输入时才可点击保存------------------------

    //-------------------C端模板新增一级菜单------------------------
    $(par3+" .navbar-right").delegate(".btn_add_level1","click",function(){
        var modal_now=$(".modal_add_menu_C");
        $("label.error_tips").hide();
        modal_now.addClass("modal_add_level1").removeClass("modal_add_level2").removeClass("modal_add_level3");
        modal_now.attr("data-character","");
        modal_now.find(".modal-title").text("新增一级菜单");
        modal_now.find(".level").val("1");
        initialMenuModal(modal_now,$(this));
    });
    //-------------------C端模板新增一级菜单------------------------

    //-------------------C端模板新增二级菜单------------------------
    $(par3).on("click",".btn-group .btn_add_level2",function(){
        var modal_now=$(".modal_add_menu_C");
        $("label.error_tips").hide();
        modal_now.addClass("modal_add_level2").removeClass("modal_add_level1").removeClass("modal_add_level3");
        modal_now.attr("data-character",$(this).parents("tr").attr("data-character"));
        modal_now.find(".modal-title").text("新增二级菜单");
        modal_now.find(".level").val("2");
        initialMenuModal(modal_now,$(this));
    });
    //-------------------C端模板新增二级菜单------------------------

    //---------------------C端模板新增菜单表单验证--------------------------------------
    $(par+" .modal_add_menu_C .modal_add_level_form").validate({
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
                var modal_now=$(".modal_add_menu_C");
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
                tr.find("td").eq(0).text(modal_now.find(".menu_name").val());
                tr.attr("data-character",modal_now.find(".order").val());
                tr.attr("data-url",modal_now.find(".url").val());
                tr.attr("data-order",modal_now.find(".order").val());
                tr.attr("data-level",modal_now.find(".level").val());
                tr.attr("data-clone_father_ID",modal_now.find(".clone_father_ID").val());
                tr.attr("data-access_file",modal_now.find(".access_file").val());
                var order=Number(modal_now.find(".order").val());
                if($(par3+" .menu_level1").length>0){
                    var flag=1;
                    $(par3+" .menu_level1").each(function(){
                        var order_now=Number($(this).attr("data-order"));
                        if(order<order_now){
                            $(this).after(tr);
                            flag=0;
                        }
                    });
                    if(flag){
                        tr.prependTo(par3+" .table_body");
                    }
                }else{
                    tr.prependTo(par3+" .table_body");
                }
                par.modal("hide");
            }else if(par.hasClass("modal_add_level2")) {
                //form.submit();

                var modal_now = $(".modal_add_menu_C");
                var tr = $('<tr class="menu_level2" title="menu">' +
                    '<td></td>' +
                    '<td>' +
                    '<div class="btn-group" role="group" aria-label="...">' +
                    '<button type="button" class="btn btn-default btn_edit">编辑</button>' +
                    '<button type="button" class="btn btn-default btn_delete">删除</button>' +
                    '</div>' +
                    '</td>' +
                    '</tr>');
                tr.find("td").eq(0).text(modal_now.find(".menu_name").val());
                var d_ch = modal_now.attr("data-character") + "_" + modal_now.find(".order").val();
                tr.attr("data-character", d_ch);
                tr.attr("data-url", modal_now.find(".url").val());
                tr.attr("data-order", modal_now.find(".order").val());
                tr.attr("data-level", modal_now.find(".level").val());
                tr.attr("data-clone_father_ID", modal_now.find(".clone_father_ID").val());
                tr.attr("data-access_file", modal_now.find(".access_file").val());
                var order = Number(modal_now.find(".order").val());
                var flag1 = 1;
                var index_now = modal_now.attr("data-id");
                console.log(index_now);
                $(par3+" tr.menu_level2").each(function () {
                    var d_ch_now = $(this).attr("data-character");
                    if (d_ch_now.substring(0,1) == d_ch.substring(0,1)) {
                        console.log($(this).prevAll("tr.menu_level1").eq(0).index());
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
                    $(par3+" tr.menu_level1").each(function () {
                        if ($(this).index() == modal_now.attr("data-id")) {
                            console.log($(this).index());
                            $(this).after(tr);
                        }
                    })
                }
                par.modal("hide");
            }
        }
    });
    //---------------------C端模板新增菜单表单验证--------------------------------------

    //------------------C端模板编辑模态框----------------------------------------
    $(par3).on("click",".btn-group .btn_edit",function(){
        var par=$(this).parents("tr");
        var d_index=$(this).parents("tr").index();
        var modal_now=$(".modal_edit_menu_C");
        $("label.error_tips").hide();
        modal_now.attr("data-id",d_index);
        modal_now.attr("data-character",par.attr("data-character"));
        console.log(modal_now.attr("data-id"));
        modal_now.find(".menu_name").val(par.find("td").eq(0).text());
        modal_now.find(".url").val(par.attr("data-url"));
        modal_now.find(".order").val(par.attr("data-order"));
        modal_now.find(".level").val(par.attr("data-level"));
        modal_now.find(".clone_father_ID").val(par.attr("data-clone_father_ID"));
        modal_now.find(".access_file").val(par.attr("data-access_file"));
        modal_now.modal("show");
    });
    //------------------C端模板编辑模态框----------------------------------------

    //---------------------C端模板编辑菜单表单验证--------------------------------------
    $(par+" .modal_edit_menu_C .modal_edit_menu_form").validate({
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
    $(par3).on("click",".btn-group .btn_delete",function(){
        var modal_now=$(".modal_delete_mould_C");
        deleteModal($(this),modal_now);
    });
    //------------------删除模态框-------------------------------------------

    //------------------删除确认-------------------------------------------
    $(par+" .modal_delete_mould_C").delegate(".btn-primary","click",function(){
        var modal_now=$(".modal_delete_mould_C");
        deleteMenu(modal_now,par3,"menu_delete_C");
    });
    //------------------删除确认-------------------------------------------

    //---------------------由编辑C端模板回到模板列表页面--------------------------------------
    $(par3+" .navbar-form").delegate(".btn_back","click",function(){
        $(".content_mb_title").text("模板列表");
        $(".content_mould_list").show();
        $(".content_edit_B").hide();
        $(".content_edit_C").find(".table_body tr").remove().end().hide();
    });
    //---------------------由编辑C端模板回到模板列表页面--------------------------------------



    function initialMenuLevel1(par,menu,i){
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
        initialTr(tr,menu,i);
        var order=Number(menu.data[i].order);        //一级菜单顺序
        if($(par+" .menu_level1").length>0){          //已有一级菜单
            var flag=1;
            $(par+" .menu_level1").each(function(){
                var order_now=Number($(this).attr("data-order"));       //排序
                if(order<order_now){
                    $(this).after(tr);             //将当前菜单插入
                    flag=0;
                }
            });
            if(flag){
                tr.prependTo(par+" .table_body");
            }
        }else{             //没有一级菜单
            tr.prependTo(par+" .table_body");
        }
    }

    function initialMenuLevel2(par,tr,menu,i){
        initialTr(tr,menu,i);
        var order=Number(menu.data[i].order);       //二级菜单顺序
        var d_ch=menu.data[i].character;
        var flag1=1;
        var index_now=menu.data[i].character.substring(0,1);
        $(par+" tr.menu_level2").each(function(){            //已有二级菜单
            var d_ch_now=$(this).attr("data-character");
            if(d_ch_now.substring(0,1)==d_ch.substring(0,1)){            //判断二级菜单所属一级菜单
                if($(this).prevAll("tr.menu_level1").attr("data-character")==index_now){
                    var order_now=Number($(this).attr("data-order"));
                    if(order<order_now){                    //排序
                        $(this).after(tr);                 //将当前菜单插入
                        flag1=0;
                    }
                }
            }
        });
        if(flag1){                            //没有二级菜单
            $(par+" tr.menu_level1").each(function(){
                if($(this).attr("data-character")==menu.data[i].character.substring(0,1)){      //判断二级菜单所属一级菜单
                    $(this).after(tr);              //将当前菜单插入
                }
            })
        }
    }

    function initialMenuLevel3(par,menu,i){
        var tr=$('<tr class="menu_level3" title="menu">'+
            '<td></td>'+
            '<td>'+
            '<div class="btn-group" role="group" aria-label="...">'+
            '<button type="button" class="btn btn-default btn_edit">编辑</button>'+
            '<button type="button" class="btn btn-default btn_delete">删除</button>'+
            '</div>'+
            '</td>'+
            '</tr>');
        initialTr(tr,menu,i);
        var order=Number(menu.data[i].order);            //三级菜单顺序
        var d_ch=menu.data[i].character;
        var flag1=1;
        var index_now=menu.data[i].character.substring(0,3);
        console.log(index_now);
        $(par+" tr.menu_level3").each(function(){          //已有三级菜单遍历
            var d_ch_now=$(this).attr("data-character");
            if(d_ch_now.substring(0,3)==d_ch.substring(0,3)){
                if($(this).prevAll("tr.menu_level2").eq(0).attr("data-character")==index_now){    //有相同所属二级菜单的三级菜单
                    var order_now=Number($(this).attr("data-order"));
                    if(order<order_now){                    //排序
                        $(this).after(tr);                   //将当前菜单插入
                        flag1=0;
                    }
                }
            }
        });
        if(flag1){                   //没有相同所属二级菜单的三级菜单
            $(par+" tr.menu_level2").each(function(){
                if($(this).attr("data-character")==index_now){          //所属二级菜单
                    $(this).after(tr);             //将当前菜单插入
                }
            })
        }
    }

    function initialTr(tr,menu,i){              //回填信息
        tr.find("td").eq(0).text(menu.data[i].text);
        tr.attr("data-character",menu.data[i].character);
        tr.attr("data-url",menu.data[i].url);
        tr.attr("data-order",menu.data[i].order);
        tr.attr("data-level",menu.data[i].level);
        tr.attr("data-clone_father_ID",menu.data[i].clone_father_ID);
        tr.attr("data-access_file",menu.data[i].access_file);
    }

    function saveMenu(target){
        var text=target.val();
        if(text!=""){
            target.parent(".form-group").nextAll(".btn_save").attr("disabled",false);
        }else{
            target.parent(".form-group").nextAll(".btn_save").attr("disabled",true);
        }
    }

    function initialMenuModal(modal_now,target){          //清空信息
        modal_now.attr("data-id",target.parents("tr").index());
        modal_now.find(".menu_name").val("");
        modal_now.find(".url").val("");
        modal_now.find(".order").val("");
        modal_now.find(".clone_father_ID").val("");
        modal_now.find(".access_file").val("");
        modal_now.modal("show")
    }

    function deleteModal(target,modal_now){           //删除模态框初始化
        var par=target.parents("tr");
        var c_Name=par.attr("class");
        var d_index_start=par.index();
        var d_index_stop=par.nextAll("."+c_Name).eq(0).index();
        var d_character=par.attr("data-character");
        modal_now.attr("data-index-start",d_index_start);
        modal_now.attr("data-index-stop",d_index_stop);
        modal_now.attr("data-character",d_character);
        modal_now.modal("show");
    }

    function deleteMenu(modal_now,par,className){           //删除菜单
        modal_now.modal("hide");
        var d_index_start=modal_now.attr("data-index-start");
        var d_index_stop=modal_now.attr("data-index-stop");
        var d_character_now=modal_now.attr("data-character");
        $(par+" tr[title=menu]").each(function(){
            var d_index_now=$(this).index();
            if(d_index_stop<0){
                if(d_index_now>=d_index_start){
                    if($(this).attr("data-character").indexOf(d_character_now)>=0){
                        $(this).addClass(className);
                    }
                }
            }else{
                if(d_index_now>=d_index_start&&d_index_now<d_index_stop){
                    if($(this).attr("data-character").indexOf(d_character_now)>=0){
                        $(this).addClass(className);
                    }
                }
            }
        });
        $("."+className).remove();
    }

});