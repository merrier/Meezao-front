/**
 * Created by Merrier on 2017/1/4.
 */

$(function() {

    function cardSelectedNum(){
        var num = $(".common_table tbody tr").find("input:checkbox:checked").length;
        if(num > 0){
            $(".btn_download").attr("disabled", false);
        }else{
            $(".btn_download").attr("disabled", true);
        }
    }


    //----------------------表格中的内容选择-----------------
    $(".common_table tbody").delegate("tr","click",function (e) {
       $(this).find("input").trigger("click");
       cardSelectedNum();
    });

    $(".common_table tr").delegate("input","click",function (e) {
        e.stopPropagation();
        cardSelectedNum();
    });

    //------------------------------开始时间选择--------------------
    $("#from").datepicker({
        autoSize:true,
        duration: '',
        defaultDate: "-1d",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        maxDate:'-1d',
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
        },
        beforeShow:function () {
            $("#from").datepicker("option", "maxDate", '-1d');
        }
    });

    //------------------------------结束时间选择--------------------
    $("#to").datepicker({
        autoSize:true,
        duration: '',
        defaultDate: "-1d",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        maxDate:'-1d',
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        }
    });

    //-----------------------查看按钮点击--------------------
    $(".navbar").delegate(".btn_check", "click", function () {

        if ($("#from").val() != "" && $("#to").val() != "") {
            $(".btn_download").attr("disabled", false);
        }else{
            alertShow("danger",2,"请选择时间段！");
            return false;
        }

    });

});
