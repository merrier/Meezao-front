/**
 * Created by Yangyue on 2016/7/25.
 */

$(document).ready(function(){

    var par=".open_delay";

    //------------------------状态下拉选项选择---------------------------------
    $(par).delegate(".dropdown-menu li a","click",function(){
        var d_id=$(this).attr("data-id");           // 未选择/全部：1；已开通：2；已过期：3
        var text=$(this).text();
        $(this).parents(".dropdown").attr("data-id",d_id);
        $(this).parents(".dropdown").find("span").eq(0).text(text);
        console.log($(this).parents(".dropdown").attr("data-id"));
    });
    //------------------------状态下拉选项选择---------------------------------

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

    $(par).delegate(".btn_delay","click",function(){
        var par=$(this).parents("tr");
        var d_id=par.attr("data-id");
        var name=par.find("td").eq(2).text();
        var time=par.find("td").eq(4).text();
        var modal_now=$(".modal_delay");
        if(time=="永久"){
            modal_now.find("input[type='radio']").eq(0).prop("checked",true);
            modal_now.find("input[type='radio']").eq(1).prop("checked",false);
            modal_now.find("#from").val("");
            modal_now.find("#to").val("");
        }else{
            modal_now.find("input[type='radio']").eq(1).prop("checked",true);
            modal_now.find("input[type='radio']").eq(0).prop("checked",false);
            modal_now.find("#from").val(time.substring(0,10));
            modal_now.find("#to").val(time.substring(11,21));
        }
        modal_now.find(".modal-title").text(name);
        modal_now.attr("data-id",d_id);
        modal_now.modal("show");
    });

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

    $(par).delegate(".modal_delay .btn_confirm","click",function(){
        var modal_now=$(".modal_delay");
        var start_time;
        var end_time;
        if(modal_now.find("input[type='radio']").eq(0).prop("checked")){
            console.log("永久");
        }else if( modal_now.find("input[type='radio']").eq(1).prop("checked")){
            start_time=modal_now.find("#from").val();
            end_time=modal_now.find("#to").val();
            console.log("开始时间:"+start_time+" 结束时间："+end_time);
        }
        modal_now.modal("hide");
    });

});