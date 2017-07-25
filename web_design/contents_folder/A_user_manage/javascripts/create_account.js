/**
 * Created by Administrator on 2016/7/11.
 */

$(document).ready(function(){

    var par=".create_account";

    var test1= [
        {
            value: 1,
            label: "Delighted"
        },
        {
            value: 2,
            label: "AppleScript"
        },
        {
            value: 3,
            label: "BASIC"
        },
        {
            value: 4,
            label: "Groovy"
        },
        {
            value: 5,
            label: "拉夏贝尔"
        },
        {
            value: 6,
            label: "Action"
        }
    ];

    var test2= [
        {
            value: 1,
            label: "Cool"
        },
        {
            value: 2,
            label: "AppleScript"
        },
        {
            value: 3,
            label: "BASIC"
        },
        {
            value: 4,
            label: "Groovy"
        },
        {
            value: 5,
            label: "Funny"
        },
        {
            value: 6,
            label: "Action"
        }
    ];

    singleAuto(par+" .form_left .form_input",test1);
    singleAuto(par+" .form_right .form_input",test2);

    //--------------------自动完成搜索单选-------------------
    function singleAuto(input,source){
        $(input).autocomplete({
            source: source,
            _renderItem:function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function( event, ui ) {
                var span=$("<span class='brand_span'><i class='fa fa-close float_right_single'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_single'></i>");
                span.attr("data-id",ui.item.value);
                $(this).parent().append(span);
                $(this).val(ui.item.label).hide();
                console.log($(this).val());
                return false;
            }
        });
    }
    //--------------------自动完成搜索单选-------------------

    //-------------自动完成删除选项------------------------------------
    $(document).on("click",par+" .float_right_single",function(){
        var span=$(this).parent();
        span.prevAll('.brand_input').attr("disabled",false).val("").show();
        span.remove();
    });
    //-------------自动完成删除选项------------------------------------

    //--------------------加密模式选择------------------------------------
    $(".dropdown-menu").delegate("li a","click",function(){
        var text=$(this).text();
        var d_id=$(this).attr("data-id");
        $(this).parents(".dropdown").attr("data-id",d_id);
        $(this).parents(".dropdown").find(".choose_span").text(text);
        $(this).parents(".dropdown").prev(".code_pattern_input").val(text);
    });
    //--------------------加密模式选择------------------------------------

    //------------------------------开始时间选择--------------------
    $(par+" #from").datetimepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            $("#to").parents(".datimepicker").next(".error_tips").hide();
        }
    });
    //------------------------------开始时间选择--------------------

    //------------------------------结束时间选择--------------------
    $(par+" #to").datetimepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        regional:'zh-CN',
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
            $("#from").parents(".datimepicker").next(".error_tips").hide();
        }
    });
    //------------------------------结束时间选择--------------------

});