/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/7/4>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {

    //--------------------------------报表相关------------------------------------


    //----------------------表格中添加群组按钮点击---------------------
    $(".table_group_area").delegate(".caret","click",function(){
        var tr_id = $(this).parents("tr").attr("data-id");

        $(".modal_add_group").modal("show").attr("data-id",tr_id);


    });



    //----------------------添加群组模态框中新建群组相关---------------------

    //------------------添加群组模态框中添加群组----------------
    function modalAddGroup(id,name){
        $(".modal_checkbox_box").find(".checkbox_new").eq(0).clone(true).appendTo(".modal_checkbox_box").addClass("checkbox")
            .removeClass("checkbox_new").find("input").attr({
            "name":id,
            "value":id,
            "id":"checkbox_" + id,
            "checked":"checked"
        }).siblings("span").text(name);
    }

    //--------------------新建群组按钮点击-------------------
    $(".modal_add_group").delegate(".btn_modal_group","click",function(){
        var modal = $(this).parents(".modal_add_group");

        $(this).hide();
        modal.find(".modal_input_box").show();
    });


    //---------------------取消按钮点击--------------------
    $(".modal_input_box").delegate(".inputbox_btn_cancel","click",function(){
        var box = $(this).parents(".modal_input_box");

        box.hide().find(".modal_input_group").val("");
        box.siblings(".error_tips").hide().siblings(".btn_modal_group").show();
    });


    //---------------------输入框中的keyup事件--------------------
    $(".modal").delegate(".modal_input_group","keyup",function(){
        var modal = $(this).parents(".modal"),
            val = $.trim($(this).val()),
            len = getStrlen(val);

        if(len >12){
            modal.find(".error_tips").text("不能超过6个汉字或12个字符").show();
            return false;
        }
    });

    //---------------------添加按钮点击-------------------
    $(".modal-content").delegate(".inputbox_btn_add","click",function(){
        var modal = $(this).parents(".modal"),
            tips = modal.find(".error_tips"),
            val = $.trim(modal.find(".modal_input_group").val());

        if(val == ""){
            tips.text("请输入标签名称").show();
            return false;
        }else if(!groupNameCheck(val)){
            tips.text("该群组名称已存在，请重新输入").show();
        }else{
            modalAddGroup(val);
        }
    });

    //---------------------检测添加的群组名称是否已存在------------------
    function groupNameCheck(val){
        var flag = true;
        $(".group_box .inner_menu_item").each(function(){
            var name = $(this).find("strong").text();

            console.info(name);
            if(val == name){
                flag = false;
                return flag;
            }else{
                return true;
            }
        });
        return flag;
    }

    //--------------------返回已有群组项的最大id值--------------------
    function gropIdMax(){
        var id_array = [];
        $(".group_box .inner_menu_item").each(function(){

        });

    }


    //-----------------------导航栏中的搜索按钮-----------------------
    $(".navbar-form").delegate(".btn_search", "click", function () {
        var val = $.trim($(this).parents(".navbar-form").find(".search_input").val());
        console.log(val);
    });


    //-------------------------创建报表按钮----------------------
    $(".navbar-default").delegate(".btn_create_form", "click", function () {
        var modal_create = $(".modal_form_create");

        modal_create.find(".create_number_input").val("").trigger("keyup");
        modal_create.find(".create_name_input").val("").end().modal("show");
    });


    //------------------------创建报表表单验证----------------------------
    $(".create_group_name_form").validate({
        debug: true,
        rules: {
            create_name_input: {
                required: true
            },
            create_number_input: {
                required: true,
                digits: true
            }
        },
        messages: {
            create_name_input: {
                required: "*请输入您要创建的报表名称"
            },
            create_number_input: {
                required: "*请输入序号",
                digits: "*请输入整数"
            }
        },
        submitHandler: function (form) {
            formCreateSubmit();
        }
    });


    //---------------------------创建报表成功----------------------------
    function formCreateSubmit() {
        var modal_create = $(".modal_form_create");
        var order = modal_create.find(".create_number_input").val();
        var name = $.trim(modal_create.find(".create_name_input").val());

        $.ajax({
            url: '/Simian/Auth/Login/send.html',
            type: "POST",
            dataType: 'json',
            data: {
                order: order,
                name: name
            },

            done: function (data) {
                alertShow("danger", 3, "创建失败!")
            },
            fail: function (data) {
                $(".modal_form_create").modal("hide");
                location.reload();
            }, always: function () {

            }, complete: function () {

            }
        });
    }


    //------------------------设为首页按钮----------------------
    $(".form_center_table").delegate(".btn_setindex", "click", function () {
        var text = $(this).text();
        if (text == "已设为首页") {
            $(this).addClass("btn-default").removeClass("btn-primary").text("设为首页");
        } else if (text == "设为首页") {
            $(".btn_setindex").removeClass("btn-primary").addClass("btn-default").text("设为首页");
            $(this).addClass("btn-primary").removeClass("btn-default").text("已设为首页");
        }
    });


    //------------------------详细按钮---------------------------
    $(".form_center_table").delegate(".btn_details", "click", function () {
        var tr = $(this).parents("tr");
        var form_name = tr.find("td").eq(1).text();
        var img_src = tr.find(".form_details_img").attr("src");

        $(".modal_form_details").find(".modal-title").text(form_name).end().find(".modal_details_img").attr("src", img_src).end().modal("show");
    });


    //-------------------------编辑按钮----------------------
    $(".form_center_table").delegate(".btn_edit", "click", function () {
        var tr = $(this).parents("tr");
        var modal_edit = $(".modal_form_edit");
        var data_id = tr.attr("data-id");
        var order = tr.find("td").eq(0).text();
        var form_name = tr.find("td").eq(1).text();


        modal_edit.find(".modal-title").text(form_name).end().find("#change_name_input").val(form_name).trigger("keyup");
        modal_edit.find(".order_number_input").val(order).end().attr("data-id", data_id).modal("show");
    });


    //-----------------------编辑组表单验证----------------------------
    $(".edit_group_name_form").validate({
        debug: true,
        rules: {
            change_name_input: {
                required: true
            },
            order_number_input: {
                required: true,
                digits: true
            }
        },
        messages: {
            change_name_input: {
                required: "*请输入您要修改的名称"
            },
            order_number_input: {
                required: "*请输入序号",
                digits: "*请输入整数"
            }
        },
        submitHandler: function (form) {
            formEditSubmit()
        }
    });


    //----------------------------编辑报表成功------------------------
    function formEditSubmit() {
        var modal_edit = $(".modal_form_edit");
        var data_id = modal_edit.attr("data-id");
        var order = modal_edit.find(".order_number_input").val();
        var name = $.trim(modal_edit.find("#change_name_input").val());

        $.ajax({
            url: '/Simian/Auth/Login/send.html',
            type: "POST",
            dataType: 'json',
            data: {
                id: data_id,
                order: order,
                name: name
            },

            done: function (data) {

            },
            fail: function (data) {
                formEditShow(data_id, order, name);
            }, always: function () {

            }, complete: function () {

            }
        });
    }


    //--------------------------表格编辑-------------------------
    function formEditShow(data_id, order, name) {
        var tr = $(".form_center_table").find("tbody>tr[data-id=" + data_id + "]");
        tr.find("td").eq(0).text(order).end().find(".td_name").text(name);
        $(".modal_form_edit").modal("hide");
        alertShow("success", 3, "编辑成功!");
    }


    //-------------------------删除按钮----------------------
    $(".form_center_table").delegate(".btn_delete", "click", function () {
        var tr = $(this).parents("tr");
        var data_id = tr.attr("data-id");

        $(".modal_form_delete").attr("data-id", data_id).modal("show");
    });


    //-----------------------删除操作确认----------------------------
    $(".modal_form_delete").delegate(".btn-primary", "click", function () {
        var data_id = $(".modal_form_delete").attr("data-id");

        $.ajax({
            url: '/Simian/Auth/Login/send.html',
            type: "POST",
            dataType: 'json',
            data: {
                id: data_id
            },

            done: function (data) {

            },
            fail: function (data) {
                $(".form_center_table").find("tbody>tr[data-id=" + data_id + "]").remove();
                $(".modal_form_delete").modal("hide");
                alertShow("success", 3, "删除成功!");
            },
            always:function(){

            },
            complete:function(){

            }
        });
    });


});