/**
 * Created by Yangyue on 2016/6/24.
 */

$(function() {

    //----------------点击搜索按钮传递搜索输入内容-----------------------
    $(".nav_top").delegate(".btn_search","click",function(){
        console.log("搜索输入："+$(this).next(".search_input").val());
    });
    //----------------点击搜索按钮传递搜索输入内容-----------------------

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
            if ($("#from").val() != "" && $("#to").val() != "") {   //开始和结束时间都选择以后才可点击查看按钮
                $(".btn_check").attr("disabled", false);
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
            if ($("#from").val() != "" && $("#to").val() != "") {          //开始和结束时间都选择以后才可点击查看按钮
                $(".btn_check").attr("disabled", false);
            }
        }
    });
    //------------------------------结束时间选择--------------------

    //------------------------------点击查看按钮以后才可点击下载按钮--------------------
    $(".navbar").delegate(".btn_check", "click", function () {
        $(".btn_download").attr("disabled", false);
        var time={
            start_time:"",
            end_time:""
        };
        time.start_time=$("#from").val();
        time.end_time=$("#to").val();
        console.log("开始时间："+time.start_time+" "+"结束时间："+time.end_time);
    });
    //------------------------------点击查看按钮以后才可点击下载按钮--------------------

    $("td").find(".btn_cancel").each(function(){
        var string=$(this).parents("tr").find("td").eq(2).text();
        if(string=="已撤销"){
            $(this).attr("disabled",true);
        }
    });

});