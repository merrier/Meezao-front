/**
 * Created by Yangyue on 2016/6/23.
 */

$(function(){

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
            if($("#from").val()!="" && $("#to").val()!=""){   //开始和结束时间都选择以后才可点击查看按钮
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
            if($("#from").val()!="" && $("#to").val()!=""){          //开始和结束时间都选择以后才可点击查看按钮
                $(".btn_check").attr("disabled",false);
            }
        }
    });
    //------------------------------结束时间选择--------------------

    //------------------------------点击查看按钮以后才可点击下载按钮--------------------
    $(".navbar").delegate(".btn_check","click",function(){
        $(".btn_download").attr("disabled",false);
        var time={
            start_time:"",
            end_time:""
        };
        time.start_time=$("#from").val();
        time.end_time=$("#to").val();
        console.log("开始时间："+time.start_time+" "+"结束时间："+time.end_time);
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

});