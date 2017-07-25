/**
 * Created by Yangyue on 2016/7/21.
 */

$(document).ready(function(){

    var par=".publish_list";

    $(par).delegate(".btn_open","click",function(){
        var par=$(this).parents("tr").find("td");
        var kind=par.eq(1).text();
        var name=par.eq(2).text();
        var user=par.eq(3).text();
        $(".content_mb_title").text("开通");
        $(".open_content_button").html(kind+"<span class='caret'></span>");
        $(".open_content_input").val(name);
        $(".open_object").val(user);
        $(".content_mb_subject").hide().eq(1).show();
    });

    //----------------------撤回模态框显示-----------------------------
    $(par).delegate(".btn_withdraw","click",function(){
        var d_id=$(this).parents("tr").attr("data-id");
        $(".modal_withdraw").modal("show").attr("data-id",d_id);
    });
    //----------------------撤回模态框显示-----------------------------

    //----------------------撤回操作确认-----------------------------
    $(par).delegate(".modal_withdraw .btn_confirm","click",function(){
        var d_id=$(this).parents(".modal_withdraw").attr("data-id");
        $("tr").each(function(){
            if($(this).attr("data-id")==d_id){
                $(this).remove();
            }
        });
        $(this).parents(".modal_withdraw").modal("hide");
    });
    //----------------------撤回操作确认-----------------------------

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

    //------------------------------开始时间选择--------------------
    $("#from1").datepicker({
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
    $("#to1").datepicker({
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

    $(par).delegate(".btn_open_submit","click",function(){
        $(".content_mb_title").text("发布列表");
        $(".content_mb_subject").hide().eq(0).show();
    });

    $(par).delegate(".btn_back","click",function(){
        $(".content_mb_title").text("发布列表");
        $(".content_mb_subject").hide().eq(0).show();
    });

    $(par).delegate(".btn_publish","click",function(){
        $(".content_mb_title").text("发布");
        $(".content_mb_subject").hide().eq(2).show();
    });

    $(par).delegate(".modal_filter_box input:radio","click",function(){
       if($(this).hasClass("choose_publish_input")){
           $(".choose_publish").show();
           $(".collect_bag").hide();
           $(".float_right_multiple").trigger("click");
           $(".group_range_choosediv span").eq(0).text("请选择");
           $(".group_range_choosediv .dropdown").attr("data-id","");
       } else{
           $(".choose_publish").hide();
           var par=$(".collect_bag");
           par.attr("data-id","0");
           par.find("span").eq(0).text("");
           par.show();
       }
    });

    var data_group_all = [{
        "id": "1",
        "name": "定制化游戏",
        "en_name": "own_group",
        "data_sources": [{"id": "16", "name": "zi"}, {"id": "17", "name": "aafa"}]
    }, {
        "id": "2",
        "name": "模板化游戏",
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
        "name": "功能",
        "en_name": "electronic_group",
        "data_sources": [{"id": "9", "name": "全部电子会员"}, {"id": "10", "name": "30天内新注册电子会员"}, {
            "id": "11",
            "name": "7天内新注册电子会员"
        }]
    }, {
        "id": "4",
        "name": "报表",
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
    $(par+" .group_range_choosediv").delegate(".dropdown-menu>li>a", "click", function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
        var data_id = $(this).attr("data-id");
        var data_name = $(this).attr("data-name");
        var array_group = groupDataAssignment(data_id);
        eval(data_name + "=array_group");
        eval("data_group" + "=" + data_name);
        multipleAutoMerrier(".group_range_input", data_group, data_id);
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
    $(par+" .group_range_inputdiv").on("click", ".float_right_multiple", function () {
        var span = $(this).parent();
        var data_id = span.attr("data-id");
        var p_height = parseInt($(this).parents(".group_range_inputdiv").css("height")) - 30;
        span.prevAll('.brand_input').attr("disabled", false);
        $(this).parents(".group_range_inputdiv").css("height", p_height + "px");
        span.remove();
        $(".group_range_hideinput[id=" + data_id + "]").remove();
    });

    //-----------------------------组名、用户名选择----------------------------------
    $(par+" .input-group-btn").delegate(".dropdown-menu a","click",function(){
        var data_id=$(this).attr("data-id");
        var text=$(this).text();
        $(this).parents(".dropdown").attr("data-id",data_id).find("span").eq(0).text(text);
    });
    //-----------------------------组名、用户名选择----------------------------------

    $(par+" .content_right_header").delegate(".search","click",function(){
        var searchMessage={
            search_id:"",
            search_input:""
        };
        searchMessage.search_id=$(".dropdown").attr("data-id");
        searchMessage.search_input=($(".search_input").val());
        console.log("data-id:"+searchMessage.search_id);
        console.log("input:"+searchMessage.search_input);

        if(searchMessage.search_id=="1"){
            $(".content_item_title").find(".checkAll_p").each(function(){
                if($(this).text().indexOf(searchMessage.search_input)>=0){
                    $(this).parents(".content_item").show();
                    $(this).parents(".content_item").find(".content_item_div").show();
                    $(this).parents(".content_item_title").find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
                } else{
                    $(this).parents(".content_item").hide();
                }
            });
        }else{
            $(".content_item").hide();
            $(".content_item").each(function(){
                $(this).find(".content_item_child").hide();
                $(this).find(".content_item_div .checkAll_p").each(function() {
                    if($(this).text().indexOf(searchMessage.search_input)>=0){
                        console.log($(this).text());
                        $(this).parents(".content_item").show();
                        $(this).parents(".content_item_div").show();
                        $(this).parents(".content_item_div").prev(".content_item_title").find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
                        $(this).parents(".content_item_child").show();
                    } else{
                    }
                });
            });
        }
    });

    //-------------------------下拉选项的显示与隐藏-------------------
    $(document).on("click",par+" .content_item i",function(){
        var ct_div=$(this).parents(".content_item_title").next(".content_item_div");
        if(ct_div.is(":visible")){
            ct_div.hide();
            $(this).removeClass("fa-caret-up").addClass("fa-caret-down");   //隐藏
        }else{
            ct_div.show();
            $(this).removeClass("fa-caret-down").addClass("fa-caret-up");   //显示
        }
    });
    //-------------------------下拉选项的显示与隐藏-------------------

    //-------------------------多选框的联动活动-------------------
    //-------------------------一级全选/全不选-------------------
    $(par+" .content_right_header").delegate(".checkAll_checkbox","click",function(){
        $(".check_item").prop("checked",this.checked);
        $(".check_item_child").prop("checked",this.checked);
        addChoices();
    });
    //-------------------------一级全选/全不选-------------------

    //-------------------------二级全选/全不选-------------------
    $(document).on("click",par+" .content_item_title .check_item",function(){
        console.log("1");
        var par=$(this).parents(".content_item");
        par.find(".check_item_child").prop("checked",this.checked);
        var flag=true;
        $(".check_item").each(function(){
            if(!this.checked){
                flag=false;
            }
        });
        $(".checkAll_checkbox").prop("checked",flag);        //改变一级复选框的状态
        addChoices();
    });
    //-------------------------二级全选/全不选-------------------

    //-------------------------三级复选框选择-------------------
    $(document).on("click",par+" .content_item_child .check_item_child",function(){
        var flag_1=true;
        var par=$(this).parents(".content_item_div");
        par.find(".check_item_child").each(function(){
            if(!this.checked){
                flag_1=false;
            }
        });
        $(this).parents(".content_item").find(".check_item").prop("checked",flag_1);      //改变二级复选框状态
        var flag_2=true;
        $(".check_item").each(function(){
            if(!this.checked){
                flag_2=false;
            }
        });
        $(".checkAll_checkbox").prop("checked",flag_2);     //改变一级复选框状态
        addChoices();
    });
    //-------------------------三级复选框选择-------------------
    //-------------------------多选框的联动活动-------------------

    //-------------------------左侧充值对象删除-------------------
    $(document).on("click",par+" .fa-close",function(){
        var data_id=Number($(this).parents(".object_div_item").attr("data-id"))-1;     //获取被删除对象的顺序信息
        $(".content_right_middle").find(".check_item_child").eq(data_id).trigger("click");      //触发相应选项的点击事件
    });
    //-------------------------左侧充值对象删除-------------------

    initial();

    /*
     函数功能：添加充值对象
     函数名称：addChoices
     */

    function addChoices(){
        $(par+" .object_div").find(".object_div_item").remove();
        $(par+" .object_input").val("");
        $(par+" .check_item_child").each(function(){
            if(this.checked){
                var new_div=$("<div class='object_div_item'><i class='fa fa-close'></i></div>");
                new_div.html($(this).next(".checkAll_p").text()+"<i class='fa fa-close'></i>");
                new_div.attr("data-id",$(this).attr("data-id"));
                new_div.appendTo(par+" .object_div");
                $(par+" .object_input").val("1");
            }
        });
    }

    /*
     函数功能：菜单初始化
     */
    function initial(){
        var object_array={
            "group_name":["新世界北方区","王府井","重庆百货"],
            "user_name":[
                ["新世界望京店","新世界崇文店","新世界顺义店"],
                ["王府井一店","王府井二店","王府井三店","王府井四店"],
                ["重庆百货一店","重庆百货二店","重庆百货三店","重庆百货四店"]
            ]
        };
        var s=0;
        for(var i=0;i<object_array.group_name.length;i++){
            var div=$('<div class="content_item">'+
                '<div class="content_item_title">'+
                '<input type="checkbox" name="checkAll" class="check_item">'+
                '<div class="checkAll_p"></div>'+
                '<i class="fa fa-caret-down fa-2x"></i>'+
                '</div>'+
                '<div class="content_item_div">'+
                '</div>'+
                '</div>');
            div.find(".checkAll_p").text(object_array.group_name[i]);
            var div_par=div.find(".content_item_div");
            for(var j=0;j<object_array.user_name[i].length;j++){
                var div_child=$('<div class="content_item_child">'+
                    '<input type="checkbox" name="checkAll" class="check_item_child">'+
                    '<div class="checkAll_p"></div>'+
                    '</div>');
                s++;
                div_child.find(".check_item_child").attr("data-id", s.toString());
                div_child.find(".checkAll_p").text(object_array.user_name[i][j]);
                div_child.appendTo(div_par);
            }
            div.appendTo(par+" .content_right_middle");
        }
    }

    $(par).delegate(".form_submit .btn-primary","click",function(){
        $(".content_mb_title").text("发布列表");
        $(".content_mb_subject").hide().eq(0).show();
    });

    $(par).delegate(".form_submit .btn_back","click",function(){
        $(".content_mb_title").text("发布列表");
        $(".content_mb_subject").hide().eq(0).show();
    });

    $(par).delegate(".collect_bag a","click",function(){
        var d_id=$(this).attr("data-id");
        var text=$(this).text();
        var par=$(".collect_bag");
        par.attr("data-id",d_id);
        par.find("span").eq(0).text(text);
    });

    $(par).delegate(".open_input","click",function(){
        $(".open_time").show();
    });

    $(par).delegate(".publish_input","click",function(){
        $(".open_time").find("input").each(function(){
            $(this).prop("checked",false);
        });
        $("#from1").val("");
        $("#to1").val("");
        $(".open_time").hide();
    });
});