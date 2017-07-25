/**
 * Created by Yangyue on 2016/6/23.
 */

$(function(){
    //
    // $(".modal").modal({
    //     "keyboard":false,
    //     "show":false
    // });

    //-----------------------群组模态框初始化------------------------
    function modalGroupInit(){
        var modal = $(".modal_group");
        modal.find("input").val("");
        modal.find(".group_range_choosediv .btn-dropdown span").text("请选择群组");
        modal.find(".brand_span").remove();
    }


    //---------------------创建群组模态框显示-------------------
    $(".navbar-default").delegate(".btn_create_group","click",function(){
        modalGroupInit();
        $(".modal_group").modal("show").find(".modal-title").text("创建");
    });


    //---------------------编辑群组模态框显示-------------------
    $(".common_table").delegate(".btn_edit","click",function(){
        var tr = $(this).parents("tr"),
            data_id = tr.attr("data-id"),
            URL = tr.find("td:visible").eq(1).text(),
            list = $(this).parents("tr").find(".tr_hidden_list");

        modalGroupInit();
        list.find("li").each(function () {
            var id = $(this).attr("data-id"),
                label = $(this).text(),
                span = $("<span class='brand_span'><i class='fa fa-close float_right_multiple'></i></span>");

            span.html(label + "<i class='fa fa-close float_right_multiple'></i>");
            span.attr("data-id", "group_" + id);
            $(".brand_input_div").append(span);
            dataAddHideInput("group", id, label);

        });

        $(".modal_group").modal("show").attr("data-id",data_id).find("#input_URL").val(URL).end().find(".modal-title").text("编辑");
    });


    //---------------------群组模态框-保存按钮点击------------------
    $(".modal_group").delegate(".btn_save","click",function(){

    });


    //---------------------删除按钮点击-------------------
    $(".common_table").delegate(".btn_delete","click",function(){
        var id = $(this).parents("tr").attr("data-id");
        $(".modal_delete_confirm").attr("data-id",id).modal("show");
    });


    //---------------------删除操作模态框确认按钮点击-------------------
    $(".modal_delete_confirm").delegate(".btn_confirm","click",function () {
        var id = $(".modal_delete_confirm").attr("data-id");
        $(".modal_delete_confirm").modal("hide");
        $(".common_table tbody").find("tr[data-id=" + id + "]").remove();
    });

    //---------------------查看按钮点击---------------------
    $(".common_table").delegate(".btn_check","click",function(){
        var list = $(this).parents("tr").find(".tr_hidden_list"),
            modal = $(".modal_check_group"),
            ul = modal.find(".modal-body ul");

        modal.find(".modal_group_item").remove();

        list.find("li").each(function(){
            var name = $(this).text();
            $(".modal_group_item_new").eq(0).clone(true).appendTo(ul).addClass("modal_group_item")
                .removeClass("modal_group_item_new").text(name);
        });

        modal.modal("show");
    });


    //-----------------------用于测试的假数组--------------------
    var data_group_all = [{
        "id": "1",
        "name": "自设群组",
        "en_name": "own_group",
        "data_sources": [{"id": "16", "name": "zi"}, {"id": "17", "name": "aafa"}]
    }, {
        "id": "2",
        "name": "微信群组",
        "en_name": "wx_group",
        "data_sources": [{"id": "1", "name": "全部微信会员"}, {"id": "2", "name": "30天内新注册微信会员"}, {
            "id": "3",
            "name": "7天内新注册微信会员"
        }, {"id": "4", "name": "骨灰粉丝"}, {"id": "5", "name": "忠诚粉丝"}, {"id": "6", "name": "唤醒粉丝"}, {
            "id": "7",
            "name": "待唤醒粉丝"
        }, {"id": "8", "name": "僵尸粉丝"}]
    }, {
        "id": "3",
        "name": "电子会员",
        "en_name": "electronic_group",
        "data_sources": [{"id": "9", "name": "全部电子会员"}, {"id": "10", "name": "30天内新注册电子会员"}, {
            "id": "11",
            "name": "7天内新注册电子会员"
        }]
    }, {
        "id": "4",
        "name": "CRM会员",
        "en_name": "CRM_group",
        "data_sources": [{"id": "12", "name": "全部CRM会员"}, {"id": "13", "name": "30天内新注册CRM会员"}, {
            "id": "14",
            "name": "7天内新注册CRM会员"
        }]
    }, {"id": "5", "name": "黑名单", "en_name": "blacklist_group", "data_sources": []}];



    //--------------------遍历数组给全局变量赋值-----------------
    function groupDataAssignment(data_id){
        var array_ajax = [];
        $.each(data_group_all,function(index,item){
            if(item.id == data_id){
                $.each(item.data_sources,function(i,data_item){
                    var value = data_item.id;
                    var label = data_item.name;
                    var push_item = {
                        value:value,
                        label:label
                    };
                    array_ajax.push(push_item);
                });
            }
        });
        return array_ajax;
    }


    //---------------------群组名字点击----------------------
    $(".group_range_choosediv").delegate(".dropdown-menu>li>a", "click", function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
        var data_id = $(this).attr("data-id");
        var data_name = $(this).attr("data-name");
        var array_group = groupDataAssignment(data_id);
        eval(data_name + "=array_group");
        eval("data_group" + "=" + data_name);
        multipleAutoMerrier(".modal_group .group_range_input", data_group, data_id);
    });


    //---------------------模糊搜索点击添加到隐藏input中--------------------
    function dataAddHideInput(type, data_id, value) {
        var group_hideinputbox = $(".group_range_hideinputbox");
        var actions_hideinput = $(".modal_group").find(".filter_actions_hideinput");
        var actions_input_id = data_id + "_" + value;
        var group_input_id = type + "_" + value;
        if (type == "group") {
            $(".group_range_hideinputnew").eq(0).clone(true).appendTo(group_hideinputbox).addClass("group_range_hideinput")
                .removeClass("group_range_hideinputnew").attr("name", "groups[]").attr("id", group_input_id).val(group_input_id);
        } else if (type == "actions") {
            actions_hideinput.val(actions_input_id);
        }
    }


    //--------------------自动完成搜索多选-------------------
    function multipleAutoMerrier(input, source, data_id) {
        $(input).autocomplete({
            source: source,
            _renderItem: function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function (event, ui) {
                var span = $("<span class='brand_span'><i class='fa fa-close float_right_multiple'></i></span>");
                span.html(ui.item.label + "<i class='fa fa-close float_right_multiple'></i>");
                span.attr("data-id", "group_" + ui.item.value);
                //不允许重复添加
                var flag = 0;
                var value = ui.item.value;
                $(this).parent().find("span").each(function (i) {
                    if ("group_"+ui.item.value == $(this).attr("data-id")) {
                        flag = 1;
                    }
                });
                if (flag) {
                    alert("不允许重复添加选项！");
                    $(this).val("");
                } else {
                    $(this).parent().append(span);
                    $(this).val("");
                    var p_height = parseInt($(this).parents(".group_range_inputdiv").css("height")) + 30;
                    $(this).parents(".group_range_inputdiv").css("height", p_height + "px");
                    $(this).parents(".input-group").next(".error_tips").hide();
                    dataAddHideInput("group", data_id, value)
                }
                return false;
            }
        });
    }

    //---------------群组自动完成多选删除选项----------------
    $(".group_range_inputdiv").on("click", ".float_right_multiple", function () {
        var span = $(this).parent();
        var data_id = span.attr("data-id");
        var p_height = parseInt($(this).parents(".group_range_inputdiv").css("height")) - 30;
        span.prevAll('.brand_input').attr("disabled", false);
        $(this).parents(".group_range_inputdiv").css("height", p_height + "px");
        span.remove();
        $(".group_range_hideinput[id=" + data_id + "]").remove();
    });


});

