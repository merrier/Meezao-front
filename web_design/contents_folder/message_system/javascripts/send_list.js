/**
 * Created by Yangyue on 2016/6/23.
 */

$(function(){

    //------------------------------开始时间选择--------------------
    $("#from").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            if($("#from").val()!="" && $("#to").val()!=""){
                $(".btn_check").attr("disabled",false);
            }
        }
    });
    //------------------------------开始时间选择--------------------

    //------------------------------结束时间选择--------------------
    $("#to").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
            if($("#from").val()!="" && $("#to").val()!=""){
                $(".btn_check").attr("disabled",false);
            }
        }
    });
    //------------------------------结束时间选择--------------------

    //------------------------------点击查看按钮以后才可点击下载按钮--------------------
    $(".navbar").delegate(".btn_check","click",function(){
        $(".btn_download").attr("disabled",false);
    });
    //------------------------------点击查看按钮以后才可点击下载按钮--------------------

    //------------------------------下拉菜单选择--------------------
    $(".group_send .dropdown-menu li").delegate("a","click",function(){
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id")).find("span").eq(0).text($(this).text());
    });
    //------------------------------下拉菜单选择--------------------

    //------------------------------内容文字缩略显示-------------------
    $(".table_body tr").find(".content_td").each(function(){
        var content_text=$(this).attr("data-name");
        if(content_text.length>20){
            content_text=content_text.substring(0,20);
        }else{

        }
        $(this).find("p").text(content_text);
    });
    //------------------------------内容文字缩略显示-------------------

    //------------------------------内容弹框显示与隐藏-------------------
    $(".table_body").delegate(".content_td","click",function(e){
        e.stopPropagation();
        $(this).find(".content_detail p").text($(this).attr("data-name"));
        var div=$(this).find(".content_detail");
        if(div.is(":visible")){
            div.hide();
        }else{
            $(".content_detail").hide();
            div.show();
        }
    });

    $(document).click(function(){
        $(".content_detail").hide();
    });
    //------------------------------内容弹框显示与隐藏-------------------

    //------------------------------创建短信模态框显示-------------------
    $(".navbar-default").delegate(".btn_create_message","click",function(){
        string_header="[蜜枣网]";
        $("#send_count_textarea").val(string_header+"回复退订").trigger("keyup");
        var file_name=$("#modal_input_import").val();
        var span_length=$(".brand_input_div").find(".brand_span").remove();
        $(".modal_filter_box .input-group").css("height","34px");
        $(".modal_filter_box").find("span").eq(0).text("请选择群组");
        $("error_tips").hide();
        $(".modal_create_message").modal("show");
    });
    //------------------------------创建短信模态框显示-------------------

    //-----------------导入文件格式限制--------------
    $(".modal_import_box").delegate("#modal_input_import", "change", function () {
        var url = getObjectURL(this.files[0]);
        var filetype = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toUpperCase();
        var filename = $(this).val().replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1");
        if (url) {
            if (filetype == "TXT") {
                $(".modal_import_name").text(filename).show();
            }else{
                alert("请选择txt格式文件上传！");
            }
        }
    });
    //-----------------导入文件格式限制---------------

    //--------------------------示例框显示-----------------------------
    $(".btn-group").delegate(".btn_show_example","click",function(e){
        e.stopPropagation();
        if($(".show_example_div").is(":hidden")){
            $(".show_example_div").show();
        }else{
            $(".show_example_div").hide();
        }
    });

    $(document).click(function(){
        $(".show_example_div").hide();
    });
    //--------------------------示例框显示-----------------------------

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
        multipleAutoMerrier(".modal_create_message .group_range_input", data_group, data_id);
    });

    //---------------------模糊搜索点击添加到隐藏input中--------------------
    function dataAddHideInput(type, data_id, value) {
        var group_hideinputbox = $(".group_range_hideinputbox");
        var actions_hideinput = $(".modal_create_message").find(".filter_actions_hideinput");
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

    //--------------------------选择组发送选择-----------------------------
    $(".form-group").delegate(".choose_group_input","click",function(){
        $(".leading_in_div").hide();
        $("#modal_input_import").val("");
        $(".modal_import_name").hide();
        $(".modal_filter_box").show();
    });
    //--------------------------选择组发送选择-----------------------------

    //--------------------------导入格式选择-----------------------------
    $(".form-group").delegate(".leading_input","click",function(){
        $(".leading_in_div").show();
        $(".modal_filter_box").hide();
        var span_length=$(".brand_input_div").find(".brand_span").remove();
        $(".modal_filter_box .input-group").css("height","34px");
    });
    //--------------------------导入格式选择-----------------------------

    //--------------------------点击发送进行表单验证-----------------------------
    $(".modal_create_message").delegate(".btn_send","click",function(){
        var string=$("#send_count_textarea").val();
        var first_string=string.substring(0,string_header.length);
        var s_length=string.length;
        var last_string=string.substring(s_length-4,s_length);
        if(first_string==string_header && last_string=="回复退订"){
            $(".error_tips").eq(0).hide();
            var file_name=$("#modal_input_import").val();
            var span_length=$(".brand_input_div").find(".brand_span").length;
            if(file_name=="" && span_length<=0){
                $(".error_tips").eq(1).show();
            }else{
                $(".error_tips").eq(1).hide();
                console.log("短信内容："+string+" "+"短信字数："+$("#send_count_span").text());
                $(".modal_create_message").modal("hide");
            }
        }else{
            $(".error_tips").eq(0).show();
        }
    });
    //--------------------------点击发送进行表单验证-----------------------------

});

//------------------输入框计数显示--------------------------
function countText(tag,name){
    var text=document.getElementById(tag).value.length;
    var show=text;
    document.getElementById(name).innerText=show;
}
