/**
 * Created by Yangyue on 2017/3/6.
 */
$(function(){

    $( "#datepicker" ).datepicker({
        altField: "#actualDate",
        altFormat:"dd-mm-yy",
        changeYear: true,
        showButtonPanel:true,
        closeText:"ok",
        constrainInput: true,
        defaultDate: 2,
        duration: "slow",
        firstDay: 1,
        gotoCurrent: true,
        //isRTL: true,
        minDate: new Date(2015, 1 - 1, 1),
        //navigationAsDateFormat: true,
        nextText: "Later",
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        onChangeMonthYear: function (year,month) {
            console.log(year+":"+month);
        },
        //selectOtherMonths: false,
        showOtherMonths:true,
        showAnim:"slideDown",
        //showMonthAfterYear: true,
        //showWeek:true,
        //stepMonths:2,
        //yearRange: "2012:2022",
        autoSize: true
        //changeMonth:true
    });

    //------------------------------开始时间选择--------------------
    $("#from").datetimepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        appendText: "(yyyy-mm-dd)",
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            $("#to").parents(".datimepicker").next(".error_tips").hide();
        }
    });
    //------------------------------开始时间选择--------------------

    //------------------------------结束时间选择--------------------
    $("#to").datetimepicker({
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

    //------------------------------开始时间选择--------------------
    $("#from1").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
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