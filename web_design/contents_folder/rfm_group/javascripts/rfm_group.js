/* Js rfm_group */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2017/3/20 10:27>
 // +--------------------------------------------------------------------------*/

$(".modal_search_result").modal("show");

//-----------------------用于给客户展示的data---------------------
var modal_opt_front;

//-----------------------发送给后台的data---------------------
var modal_opt_back;

//-----------------------用于测试的假数组--------------------
var data_source_all = [{
    "id": "1",
    "name": "商城",
    "en_name": "market_group",
    "data_sources": [{"id": "16", "name": "zi"}, {"id": "17", "name": "aafa"}]
}, {
    "id": "2",
    "name": "类目",
    "en_name": "category_group",
    "data_sources": [{"id": "1", "name": "全部微信会员"}, {"id": "2", "name": "30天内新注册微信会员"}, {
        "id": "3",
        "name": "7天内新注册微信会员"
    }, {"id": "4", "name": "骨灰粉丝"}, {"id": "5", "name": "忠诚粉丝"}, {"id": "6", "name": "唤醒粉丝"}, {
        "id": "7",
        "name": "待唤醒粉丝"
    }, {"id": "8", "name": "僵尸粉丝"}]
}, {
    "id": "3",
    "name": "品牌",
    "en_name": "brand_group",
    "data_sources": [{"id": "9", "name": "全部电子会员"}, {"id": "10", "name": "30天内新注册电子会员"}, {
        "id": "11",
        "name": "7天内新注册电子会员"
    }]
}];


//-----------------------ajax拉取下拉列表数据--------------------
function data_source_alls(data) {
    $.ajax({
        type: 'POST',
        url: '/DataCenter/TableCell/data_group_all',
        data: data,
        dataType: 'json',
        async: false
    }).done(function (data) {
        data_source_all = (data);
    });
}


//---------------------模糊搜索点击添加到隐藏input中--------------------
function dataAddHideInput(type, data_id, value) {
    var group_hideinputbox = $(".singauto_hideinputbox");
    var group_input_id = type + "__" + value;

    $(".singauto_range_hideinputnew").eq(0).clone(true).appendTo(group_hideinputbox).addClass("singauto_range_hideinput")
        .removeClass("singauto_range_hideinputnew").attr("name", "source").attr("id", group_input_id).val(group_input_id);

}


//--------------------自动完成搜索单选-------------------
function singleAuto(input, source, data_id) {
    // console.info(source);
    $(input).autocomplete({
        source: source,
        minLength: 0,
        autoFocus: true,
        _renderItem: function (ul, item) {
            return $("<li></li>")
                .append(item.label)
                .appendTo(ul);
        },
        select: function (event, ui) {
            var maxlength = 10,
                value = ui.item.value,
                span = $("<span class='singauto_span'><i class='fa fa-close float_right_single'></i></span>"),
                label = ui.item.label.length<maxlength ? ui.item.label : ui.item.label.substr(0,maxlength-3) + "..."

            $(".singauto_input_box").find(".singauto_span").remove();
            $(".singauto_range_hideinput").remove();

            span.html(label + "<i class='fa fa-close float_right_single' title='删除'></i>");
            span.attr("data-id", ui.item.value).attr("data-label",ui.item.label);

            $(".rfm_group_item1").find(".rfm_group_tips").show().text(ui.item.remark);
            $(this).parents(".singauto_input_box").prepend(span);
            dataAddHideInput("source", data_id, value);
            $(this).val("").css("opacity",0);
            return false;
        }
    });
}


//--------------------遍历数组给全局变量赋值-----------------
function groupDataAssignment(data_id) {
    var array_ajax = [];
    console.info(data_source_all);

    $.each(data_source_all, function (index, item) {

        if (item.id == data_id) {
            $.each(item.data_sources, function (i, data_item) {
                var value = data_item.id;
                var label = data_item.name;
                var push_item = {
                    value: value,
                    label: label
                };
                array_ajax.push(push_item);
            });
        }
    });
    return array_ajax;
}


//-----------------获得上一年在昨天这一天的日期------------------
function getLastYearYestdy(date){
    var strYear = date.getFullYear() - 1,
        strDay = date.getDate(),
        strMonth = date.getMonth()+1,
        yestdy_str = strYear+"-"+strMonth+"-"+strDay;
    return yestdy_str;
}


//------------获得今天的日期（格式为YYYY-M-D）------------
function getToday(date){
    var strYear = date.getFullYear(),
        strDay = date.getDate(),
        strMonth = date.getMonth() + 1,
        today_str = strYear+"-"+strMonth+"-"+strDay;
    return today_str;
}


//---------------------域值字符串生成--------------------
function domainStr(box){
    var str,
        text = box.find(".domain_text").val(),
        left_num = box.find(".domain_left_number").val(),
        right_num = box.find(".domain_right_number").val(),
        left_signal = box.find(".domain_left_signal").text(),
        right_signal = box.find(".domain_right_signal").text();

    if(!right_num&&left_num){
        left_signal = (left_signal == "<") ? ">" : "≥";

        str = text + left_signal + left_num;
    }else if(right_num&&!left_num){
        str = text + right_signal + right_num;
    }else{
        str = left_num + left_signal + text + right_signal + right_num;
    }

    return str;
}

//-----------------------模态框-查询范围展示内容填充-------------------
function searchOrigin(opt){
    var modal = $(".modal_search_origin");

    modal.modal("show").find(".modal_search_show").hide();

    modal.find(".modal_search_show").each(function () {
        var name = $(this).attr("data-name");

        if(opt[name]){
            $(this).show().find("span").text(opt[name]);
        }else{
            return true;
        }
    })
}


//---------------------轮询发ajax-------------------
function ajaxInterval(data) {

    var modal = $(".modal_searching");

    $.ajax({
        dataType: "json",
        url: "/DataCenter/TableCell/ajaxInterval",
        type: "POST",
        data: data,
        async: false,

        success: function (data) {
            var code = data.code;
            if (code == 200) {
                var status = data.status,
                    width_total = parseInt(modal.find(".progress").css("width")),
                    width_now = parseInt(modal.find(".progress-bar").css("width")),
                    width_radio = width_now / width_total;

                if (status == 2) {    //发生错误
                    modal.modal("hide");
                    alertShow("danger", 3, data.msg);

                } else if (status == 0) {  //正在处理中
                    if (width_radio > 0.94) {
                        return true;
                    } else {
                        modal.find(".progress-bar").css("width", (width_radio + 0.05) * width_total + "px");
                        modal.find(".progress-bar").text((width_radio + 0.05) * 100 + "%");
                    }

                } else if (status == 1) {  //处理完成

                    var item = data.item;
                    clearInterval(timer);
                    modal.find(".modal-body p").text("系统已查询完毕，即将为您展示查询结果");

                    setTimeout(function(){
                        modal.modal("hide");
                        $(".modal_search_result").modal("show").find("input").val("").end().find("li").remove();
                        for(var i = 0,n=item.length;i<n;i++){
                            var html = "<li>" + item[i] + "</li>";
                            $(".modal_search_result").find("ul").append(html);
                        }
                    },1000);

                } else {
                    alert("网络连接错误！");
                }
            } else {
                alertShow("danger", 3, data.msg);
            }

        },
        error: function (data) {

            console.log("网络连接错误！");
        },
        always: function (data) {
        }
    })
}


$(function () {


    //-------------------数据回填+初始化-------------------
    (function(){
        var date = new Date(),
            today = getToday(date),
            yestdy = getLastYearYestdy(date);

        $("#to").val(today);
        $("#from").val(yestdy);

    })();


    //-----------------------组类别选择点击-----------------------
    $(".content_new_title ul").delegate("li", "click", function () {
        var id = $(this).attr("data-id");
        $(this).addClass("group_level1_active").siblings().removeClass("group_level1_active");
        $(".rfm_group_box[data-box-id=" + id + "]").show().siblings(".rfm_group_box").hide();
    });


    //--------------------选择域值多选框点击------------------
    $(".rfm_domain_box").delegate(".rfm_checkbox","click",function () {
        var box = $(this).parents(".rfm_domain_box"),
            left_num = +box.find(".domain_left_number").val(),
            right_num = +box.find(".domain_right_number").val(),
            status = true,
            text;

        if($(this).hasClass("fa-square-o")){    //没有选中时点击

            if(left_num == "" && right_num == ""){
                status = false;
                text = "请输入域值！";
            }else if(left_num&&right_num){

                if(left_num >= right_num) {
                    status=false;
                    text = "请调整域值大小！";
                }
            }

            if(status){
                $(this).addClass("fa-check-square").removeClass("fa-square-o");
                box.addClass("rfm_domain_checked");
            }else{
                alert(text);
                return false;
            }

        }else{  //已选中后点击
            box.removeClass("rfm_domain_checked");
            $(this).addClass("fa-square-o").removeClass("fa-check-square");
        }
    });

    //---------------------------下拉菜单改变文字-----------------------
    $(".dropdown-menu").delegate("li a", "click", function() {

        $(this).parents("ul").parents(".btn-dropdown").find(".btn-default").eq(0).text($(this).text());

    });


    //--------------------选择域值的下拉菜单点击------------------
    $(".rfm_group_details").delegate(".dropdown-menu li a","click",function () {
        var box = $(this).parents(".rfm_domain_box"),
            mask = box.find(".domain_mask"),
            left_num = box.find(".domain_left_number");

        if($(this).text() == "="){
            mask.show();
            left_num.val("");
        }else{
            mask.hide();
        }
    });


    //---------------------开始查询按钮点击--------------------
    $(".rfm_btn_box").delegate(".btn_search","click",function () {
        var singauto_input = $(".singauto_range_hideinput").val(),
            singauto_label = $(".singauto_span").attr("data-label"),
            date_from = $("#from").val(),
            date_to = $("#to").val(),
            domain_len = $(".rfm_group_item3").find(".rfm_domain_checked").length;

        if(!singauto_input){
            $(".rfm_error_tips").text("请选择数据源！").show();
            return false;
        }else if(!date_from || !date_to){
            $(".rfm_error_tips").text("请选择数据时间段！").show();
            return false;
        }else if(domain_len == 0){
            $(".rfm_error_tips").text("请至少选择一项域值！").show();
            return false;
        }else{
            $(".rfm_error_tips").hide();

            modal_opt_front={
                "singauto_input_value":singauto_input,
                "singauto_label":singauto_label,
                "date_from":date_from,
                "date_to":date_to,
                "date":date_from + "至" + date_to
            };

            modal_opt_back = {
                "singauto_input_value":singauto_input,
                "singauto_label":singauto_label,
                "date_from":date_from,
                "date_to":date_to,
                "singauto_category":$(".rfm_group_details").find(".singauto_dropdown").attr("data-id")
            };

            $(".rfm_domain_box").each(function(){
                var that = $(this),
                    left_num = that.find(".domain_left_number").val(),
                    left_signal = that.find(".domain_left_signal").text(),
                    domain_label = "domain_" + that.find(".domain_text").val(),
                    right_num = that.find(".domain_right_number").val(),
                    right_signal = that.find(".domain_right_signal").text();

                modal_opt_back[domain_label] = [left_num,left_signal,that.find(".domain_text").val(),right_signal,right_num];

                if($(this).hasClass("rfm_domain_checked")){
                    var domain_str = domainStr(that);
                    modal_opt_front[domain_label] = domain_str;
                }

            });

            console.info(modal_opt_front);
            console.info(modal_opt_back);

            searchOrigin(modal_opt_front);
        }
    });


    //---------------------查询范围确认按钮点击------------------
    $(".modal_search_origin").delegate(".btn-primary","click",function () {
        $(".modal_search_origin").modal("hide");
        $(".modal_searching").modal("show");

        timer = setInterval(ajaxInterval(modal_opt_back),3000);
    });


    //---------------------查询结果确认生成按钮点击--------------------
    $(".modal_search_result").delegate(".btn-primary","click",function(){
        var val = $.trim($(".modal_search_result").find(".search_result").val());

        if(val == '' || val == undefined){
            alert("请输入组名称！");
            return false;
        }
    });

    //---------------------开始时间选择--------------------
    $("#from").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            $(".config_item_timeperiod .error_message").hide();
        }
    });

    //------------------------------结束时间选择--------------------
    $("#to").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        minDate: 'Today',
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
            $(".config_item_timeperiod .error_message").hide();
        }
    });


    //---------------------时间选择下拉点击--------------------
    $(".btn_date_group").delegate(".dropdown-toggle", "click", function () {
        var input = $(this).parents(".btn_date_group").find("input");

        input.focus();
    });


    //---------------------下拉框数据源选择----------------------
    $(".singauto_dropdown").delegate(".dropdown-menu>li>a", "click", function () {

        var id_old = $(this).parents("ul").parents(".btn-dropdown").attr("data-id"),
            id_new = $(this).attr("data-id"),
            array_group = groupDataAssignment(id_new);

        if(id_old != id_new && $(".single_autocomplete_dropdown .singauto_span").is(":visible")) {
            $(".single_autocomplete_dropdown .singauto_span").find(".float_right_single").trigger("click");
        }

        $(this).parents("ul").parents(".btn-dropdown").attr("data-id",id_new)
            .find(".btn-default").eq(0).text($(this).text());
        eval("data_group" + "=array_group");

        singleAuto(".singauto_input_box .singauto_input", data_group, id_new);
    });


    //----------------------模糊搜索展示全部结果---------------------
    $(".singauto_input_box").delegate(".dropdown-toggle", "click", function (e) {
        var auto_input = $(this).parents(".singauto_input_box").find(".singauto_input");

        e.stopPropagation();
        $(this).blur();

            auto_input.autocomplete('search', '');
            auto_input.focus();

    });


    //--------------------自动完成搜索删除已选项-------------------
    $(document).on("click", ".float_right_single", function () {
        var span = $(this).parents(".singauto_span");

        $(".singauto_range_hideinput").remove();

        $(this).parents(".singauto_input_box").find('.singauto_input').attr("disabled", false).css("opacity",1);

        span.remove();

    });


});

