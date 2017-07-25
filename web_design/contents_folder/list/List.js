$(function () {

    //-----------------------------------模版列表----------------------------------------

    //----------------------创建互动和编辑互动模态框--------------------
    $("body").delegate(".btn_create_interaction", "click", function () {
        var content = $(".modal_interaction").find(".modal-content");

        content.find(".modal-title").text("创建互动");
        content.find(".temlistmodal_plugin_namemask").hide();
        content.find("input").val("");
        content.find(".input_num").text("0");
        $(".modal_interaction").modal("show");
    });

    $(".common_table").delegate(".btn_edit", "click", function () {
        var content = $(".modal_interaction").find(".modal-content");
        var tr = $(this).parents("tr");
        var activity_name = tr.children("td").eq(0).text();
        var plugin_name = tr.children("td").eq(1).text();
        var activity_time = tr.children("td").eq(5).text();
        var start_time = activity_time.slice(0,19);
        var end_time = activity_time.slice(-19);
        content.find(".modal-title").text("编辑互动");
        content.find(".temlistmodal_plugin_namemask").show();
        content.find(".temlistmodal_plugin_input").val(plugin_name);
        content.find(".plugin_hideinput").val(plugin_name);
        content.find(".temlistmodal_activity_input").val(activity_name).trigger("keyup");
        content.find("#from").val(start_time);
        content.find("#to").val(end_time);
        $(".modal_interaction").modal("show");
    });

    //--------------------创建互动表单验证--------------------
    $(".modal_interaction_form").validate({
        debug:true,
        rules:{
            plugin_hideinput:{
                required:true
            },
            temlistmodal_activity_input:{
                required:true
            },
            datetime:{
                required:true
            },
            datetime_end:{
                required:true
            }
        },
        messages:{
            plugin_hideinput:{
                required:"*请选择插件名称"
            },
            temlistmodal_activity_input:{
                required:"*请输入活动名称"
            },
            datetime:{
                required:"*请选择活动起始时间"
            },
            datetime_end:{
                required:"*请选择活动截止时间"
            }
        },
        errorPlacement : function(error, element) {
            error.appendTo(element.siblings(".error_show"));
        },
        errorClass:"error_tips",
        errorElement: "label"
    });



    //---------------------活动时间选择(插件)----------------------
    $('#from').datepicker({
        duration: '',
        showTime: true,
        constrainInput: false
    });
    $('#to').datepicker({
        duration: '',
        showTime: true,
        constrainInput: false
    });

    //---------------------链接点击--------------------
    $(".template_list_table").delegate(".btn_link","click",function(event){
        event.stopPropagation();
        var tr = $(this).parents("tr");
        tr.find(".btn_link_box").show();
    });

    //--------------------链接可复制--------------------
    $(".template_list_table").delegate(".btn_link_box","click",function(event){
        event.stopPropagation();

    });

    //----------------------点击其他地方让链接隐藏------------------
    $("body").delegate(".content","click",function(){
        $(".template_list_table .btn_link_box").hide();
    });



    //---------------------删除--------------------
    $(".template_list_table").delegate(".btn_delete","click",function(event){
        event.stopPropagation();
        var tr = $(this).parents("tr");
        tr.remove();
    });


    //-----------------------插件名称模糊搜索------------------------

    //--------------------自动完成搜索数据源-------------------
    var test1 = [
        {
            value: 1,
            label: "ActionScriptaaaaaaaaaaaaa"
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

    var test2 = [
        {
            value: 1,
            label: "Applebbbbbbbbbbbbbbbbbbbbbbb"
        },
        {
            value: 2,
            label: "Banana"
        },
        {
            value: 3,
            label: "Color"
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
            label: "艾格"
        }
    ];
    //--------------------自动完成搜索数据源-------------------

    singleAuto(".temlistmodal_plugin_input",test1);




    //---------------------模态框-平台模版弹出--------------------
    $(".library_platform_module").delegate(".col-md-3","click",function(){
        var title=$(this).find(".title").text();
        $(".modal_platform_module").find("h4").text(title);
        $(".modal_platform_module").find("img").attr("src",$(this).find("img").attr("src"));
        $(".modal_platform_module").modal("show");
    });


    //-----------------------------游戏核销----------------------------------

    //--------------------模态框-是否核销/删除点击弹出--------------------
    $('.game_check_table').delegate(".table_btn_group .btn","click",function(){
        var text = $(this).text();
        var tr = $(this).parents("tr");
        var state = $(this).attr("disabled");

        $('.game_check_table').find("tbody").children("tr").removeClass("tr_chosen");

        if(state == "disabled" || state == "true"){
            return false;
        }else{
            tr.addClass("tr_chosen");
            $('.modal_game_check').find(".modal-body").text("是否确认" + text + "?");
            $(".modal_game_check").modal("show");
        }

    });


    //--------------------模态框-是否核销/删除确认-----------------------
    $('.modal_game_check').delegate(".modal-footer .modal_btn_confirm","click",function(){
        var text = $(this).parents(".modal_game_check").find(".modal-body").text();
        var td_check =  $(".tr_chosen").children("td").eq(3);
        var td_btn_check = $(".tr_chosen").children("td").eq(5).find(".btn_check");

        if(text == "是否确认核销?"){
            td_check.text("已核销");
            td_btn_check.attr("disabled","disabled");
            $('.game_check_table').find("tbody").children("tr").removeClass("tr_chosen");
        }else if(text == "是否确认删除?"){
            $(".tr_chosen").remove();
        }

        $(".modal_game_check").modal("hide");
    });

    //--------------------页面加载判断是否核销----------------------
    window.onload=function(){
        var tr = $(".game_check_table").find("tbody").children("tr");
        tr.each(function(){
            var td_check = $(this).children("td").eq(3).text();
            var td_btn_check = $(this).children("td").eq(5).find(".btn_check");

            console.log(td_check);
            if(td_check == "未核销"){
                td_btn_check.removeAttr("disabled");
            }else if(td_check == "已核销"){
                td_btn_check.attr("disabled","disabled");
            }
        })
    }

});