/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function(){

    //---------------------下拉菜单改变文字------------------
    $(".navbar").delegate(".dropdown-menu li a","click",function(){
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));

    });


    //----------------------表格下拉菜单改变文字-----------------
    $(".common_table thead").delegate(".dropdown-menu li a","click",function(){
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));

    });

    //--------------------自动完成-------------------
    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $( "#tags" ).autocomplete({
        source: availableTags
    });

    singleAuto(".auto_single_input",availableTags);
    multipleAuto(".auto_multiple_input",availableTags);

    //--------------------自动完成搜索单选-------------------
    function singleAuto(input,source){
        $(input).autocomplete({
            source: source,
            minLength: 0,
            autoFocus: true
        });
    }
    //--------------------自动完成搜索-单选------------------

    //--------------------自动完成搜索多选-------------------
    function multipleAuto(input,source){
        $(input).autocomplete({
            source: source,
            minLength: 0,
            autoFocus: true,
            _renderItem:function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function( event, ui ) {
                var span=$("<span class='auto_span'><i class='fa fa-close float_right_multiple'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_multiple'></i>");
                span.attr("data-id",ui.item.value);
                if(ui.item.label=="全部"){
                    //选择全部时移除其它选项并禁止选择
                    $(this).parent().find("span").each(function(i){
                        $(this).remove();
                    });
                    $(this).parent().append(span);
                    $(this).val("").attr("disabled",true);
                    $(this).parents(".auto_input_div").css("height","68px");
                }else{
                    //不允许重复添加
                    var flag=0;
                    $(this).parent().find("span").each(function(i){
                        if(ui.item.label==$(this).text()){
                            flag=1;
                        }
                    });
                    if(flag){
                        alert("不允许重复添加选项！");
                        $(this).val("");
                    }else{
                        $(this).parent().append(span);
                        $(this).val("");
                        var p_height=parseInt($(this).parents(".auto_input_div").css("height"))+34;
                        $(this).parents(".auto_input_div").css("height",p_height+"px");
                    }
                }
                return false;
            }
        });
    }
    //--------------------自动完成搜索多选-------------------

    //--------------------展开所有选项-----------------------
    $('.dropdown_menu_div').on('click', function() {
        var auto_input=$(this).prev("div").children(".auto_input");
        if (auto_input.autocomplete("widget").is(":visible")) {
            auto_input.autocomplete("close");
            return;
        }
        $(this).blur();
        auto_input.autocomplete('search', '');
        auto_input.focus();
    });
    //--------------------展开所有选项-----------------------

    //-------------自动完成多选删除选项------------------------------------
    $(document).on("click",".float_right_multiple",function(){
        var span=$(this).parent();
        span.prevAll('.auto_input').attr("disabled",false);
        var p_height=parseInt($(this).parents(".auto_input_div").css("height"))-34;
        $(this).parents(".auto_input_div").css("height",p_height+"px");
        span.remove();
    });
    //-------------自动完成多选删除选项------------------------------------

    //--------------------自动完成-------------------

    //--------------------表单验证--------------------
    $(".validate_form").validate({
        debug:true,
        rules:{
            category_name:{
                required:true
            },
            order:{
                required:true,
                digits:true
            },
            level:{
                required:true
            },
            zipCode:{
                required:true,
                isZipCode:""
            }
        },
        messages:{
            category_name:{
                required:"*请输入品类名称"
            },
            order:{
                required:"*请输入顺序",
                digits:"*请输入正整数"
            },
            level:{
                required:"*请输入级别"
            },
            zipCode:{
                required:"*请输入邮编"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){

        }
    });

    jQuery.validator.addMethod("isZipCode", function(value, element) {
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的邮政编码");
    //--------------------表单验证--------------------

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

