/**
 * Created by Yangyue on 2017/3/8.
 */
$(function(){

    $( "#datepicker" ).datepicker();

    //------------------------------开始时间选择--------------------
    $("#from1").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 2,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to1").datepicker("option", "minDate", selectedDate);
            $("#to1").parents(".datimepicker").next(".error_tips").hide();
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
        regional:'zh-CN',
        onClose: function (selectedDate) {
            $("#from1").datepicker("option", "maxDate", selectedDate);
            $("#from1").parents(".datimepicker").next(".error_tips").hide();
        }
    });
    //------------------------------结束时间选择--------------------
});