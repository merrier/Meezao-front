/**
 * Created by Administrator on 2016/5/26.
 */

$(function(){

    //--------------------------点击附属图片显示卡券详情----------------------
    $(".table_body").delegate("img","click",function(){
        var activity_name=$(this).parents("tr").find("td").eq(2).text();
        $(".modal_subsidiary").modal("show").find("h4").text(activity_name);
    });
    //--------------------------点击附属图片显示卡券详情----------------------

    //--------------------------点击备注栏显示备注详情----------------------
    $('.table_body').delegate(".remark_td","click",function(e){
        e.stopPropagation();
        var remark_text=$(this).attr("data-name");
        $(".remark_div").text(remark_text).css({"top":e.pageY+20}).show();
    });
    //--------------------------点击备注栏显示备注详情----------------------

    $(".fa-navicon").each(function(){
        var child_length=$(this).parents(".table").find(".child_activity_tr").length;
        if(child_length==0){
            $(this).addClass("unclickable");
        }else{

        }
    });

    $(".operation").delegate(".fa-navicon","click",function(){
        var child_activity=$(this).parents(".table").find(".child_activity_tr");
        child_activity.each(function(i){
            console.log($(this).css("display"));
            if($(this).css("display")=="none"){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    });

    //--------------------------点击页面其它地方关闭备注弹框----------------------
    $(document).click(function(){
        $(".remark_div").hide();
    });
    //--------------------------点击页面其它地方关闭备注弹框----------------------

    //--------------------------备注省略显示------------------------------------
    $(".remark_td").each(function(i){
        var remark_text=$(this).attr("data-name");         //备注详细内容放置在其属性"data-name"里
        if(remark_text.length>10){
            var new_remark_text=remark_text.substring(0,9)+"...";
            $(this).text(new_remark_text);
        }else{
            $(this).text(remark_text);
        }
    })
    //--------------------------备注省略显示------------------------------------

    //-------------------------多选框的联动活动-------------------
    $(".nav_bottom").delegate(".checkAll_checkbox","click",function(){
        $(".create_time_checkbox").prop("checked",this.checked);
    });

    $(".create_time").delegate(".create_time_checkbox","click",function(){
        var flag=true;
        $(".create_time_checkbox").each(function(){
            if(!this.checked){
                flag=false;
            }
        });
        $(".checkAll_checkbox").prop("checked",flag);
    });
    //-------------------------多选框的联动活动-------------------

    //-------------------------删除选中活动-------------------
    $(".nav_bottom").delegate(".btn_delete","click",function(){
        $(".modal-activity-delete").addClass("modal-activity-delete-all").removeClass(".modal-activity-delete-single").modal("show");
    });

    $(".modal-activity-delete").delegate(".btn_confirm","click",function(){
        var par=$(this).parents(".modal-activity-delete");
        if(par.hasClass("modal-activity-delete-all")){
            if($(".checkAll_checkbox").prop("checked")){
                $(".table").remove();
            }else{
                $(".create_time_checkbox").each(function(){
                    if($(this).prop("checked")){
                        $(this).parents(".table").remove();
                    }
                })
            };
        }else{
            console.log($(this).parents(".modal-activity-delete").attr("data-id"));
        }
        $(".modal-activity-delete").modal("hide");
    });
    //-------------------------删除选中活动-------------------

    //-------------------------搜索-------------------
    $(".nav_bottom").delegate(".btn_search","click",function() {
        console.log($(this).nextAll(".form-group").find(".search_input").val());
    });
    //-------------------------搜索-------------------

    //$(".modal_create_main_activity").modal("show").find("h4").text("创建主活动");

    //------------------------------开始时间选择--------------------
    $("#from").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        minDate: 'Today',
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
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
        }
    });
    //------------------------------结束时间选择--------------------

    //------------------------------删除子活动---------------------
    $(".btn-group").delegate(".btn_delete_child","click",function(){
        $(".modal-activity-delete").addClass("modal-activity-delete-single").removeClass(".modal-activity-delete-all").modal("show");
        $(".modal-activity-delete").attr("data-id",$(this).parents("tr").attr("data-id"));
    });

    //$(".modal-activity-delete-single").delegate(".btn_confirm","click",function(){
    //    console.log($(this).parents(".modal-activity-delete-single").attr("data-id"));
    //});
    //------------------------------删除子活动---------------------

    //------------------------------活动群组选择----------------------------------
    $(".dropdown-menu li").delegate("a","click",function(){
        var group_id=$(this).attr("data-id");
        $(this).parents(".dropdown").attr("data-id",group_id);
        $(this).parents(".dropdown").find("span").eq(0).text($(this).text());
        if(group_id==1){            //改变活动群组选择的数据源
            multipleAuto(".activity_group_input",test1);
        }else if(group_id==2){
            multipleAuto(".activity_group_input",test2);
        }else if(group_id==3){
            multipleAuto(".activity_group_input",test3);
        }else{
            multipleAuto(".activity_group_input",test4);
        }
    });
    //------------------------------活动群组选择------------------------------------------

    //--------------------------创建主活动------------------------------------------------
    $(".nav_bottom").delegate(".btn_crate_main_activity","click",function(){
        var modal_now=$(".modal_activity");
        modal_now.addClass("modal_create_main_activity")
            .removeClass("modal_edit_main_activity")
            .removeClass("modal_create_child_activity")
            .removeClass("modal_edit_child_activity");
        modal_now.find("h4").text("创建主活动");
        createActivity(modal_now);
    });

    //--------------------------创建主活动------------------------------------------------

    //--------------------------编辑主活动------------------------------------------------
    $('.main_activity_tr').delegate(".btn_edit_main","click",function(){
        var par=$(this).parents(".main_activity_tr");
        var main_id=par.attr("data-id");
        var act_name=par.find("td").eq(2).text();
        var start_time=par.find("td").eq(3).text().substring(0,10);
        var end_time=par.find("td").eq(3).text().substring(11,21);
        var remark_text=par.find("td").eq(5).attr("data-name");
        console.log(remark_text);
        var modal_now=$(".modal_activity");
        modal_now.attr("data-id",main_id).addClass("modal_edit_main_activity")
            .removeClass("modal_create_main_activity")
            .removeClass("modal_create_child_activity")
            .removeClass("modal_edit_child_activity");;
        modal_now.find("h4").text("编辑主活动");
        var act_group=[["1","action"],["2","beauty"]];
        var coupon_message=[["1","plMx1jiP重百群发券C"],["2","plMx1jalx双安群发券"]];
        editActivity(modal_now,act_group,coupon_message,act_name,start_time,end_time,remark_text);

    });
    //--------------------------编辑主活动------------------------------------------------

    //--------------------------创建子活动------------------------------------------------
    $('.main_activity_tr').delegate(".btn_create_child","click",function(){
        var par=$(this).parents(".main_activity_tr");
        var main_id=par.attr("data-id");
        var modal_now=$(".modal_activity");
        modal_now.attr("data-id",main_id).addClass("modal_create_child_activity")
            .removeClass("modal_create_main_activity")
            .removeClass("modal_edit_main_activity")
            .removeClass("modal_edit_child_activity");
        modal_now.find("h4").text("创建子活动");
        createActivity(modal_now);
    });
    //--------------------------创建子活动------------------------------------------------

    //--------------------------编辑子活动------------------------------------------------
    $('.child_activity_tr').delegate(".btn_edit_child","click",function(){
        var par=$(this).parents(".child_activity_tr");
        var main_id=par.attr("data-id");
        var act_name=par.find("td").eq(2).text();
        var start_time=par.find("td").eq(3).text().substring(0,10);
        var end_time=par.find("td").eq(3).text().substring(11,21);
        var remark_text=par.find("td").eq(5).attr("data-name");
        console.log(act_name);
        var modal_now=$(".modal_activity");
        modal_now.attr("data-id",main_id).addClass(".modal_edit_child_activity")
            .removeClass("modal_edit_main_activity")
            .removeClass("modal_create_main_activity")
            .removeClass("modal_create_child_activity");
        modal_now.find("h4").text("编辑子活动");

        var act_group=[["1","aaaaaaaaa"],["2","bbbbbbbbbbb"]];
        var coupon_message=[["1","plMx1jiP重百群发券C"],["2","plMx1jalx双安群发券"]];
        editActivity(modal_now,act_group,coupon_message,act_name,start_time,end_time,remark_text);
    });
    //--------------------------编辑主活动------------------------------------------------

    $(".modal_activity").delegate(".btn_save","click",function(){
        var error_length=validateForm();
        var par=$(this).parents(".modal_activity");
        console.log(error_length);
        if(error_length==0){
            if(par.hasClass("modal_create_main_activity")){
                alert("a");
                saveMessage();
            }else if(par.hasClass("modal_edit_main_activity")){
                alert("b");
                saveMessage();
                console.log(par.attr("data-id"));
            }else if(par.hasClass("modal_create_child_activity")){
                alert("c");
                saveMessage();
                console.log(par.attr("data-id"));
            }else if(par.hasClass("modal_edit_child_activity")){
                alert("d");
                saveMessage();
                console.log(par.attr("data-id"));
            }
        }else{

        }

    })

    //--------------------自动完成数据源---------------------------
    var test1 = [
        {
            value: 1,
            label: "ActionScriptaaaaaaaaaaaaaaaaaa"
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
        },
        {
            value: 7,
            label: "全部"
        }
    ];

    var test2 = [
        {
            value: 1,
            label: "Appppppppsssssssssssssss"
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
            label: "微信群组"
        },
        {
            value: 6,
            label: "Action"
        },
        {
            value: 7,
            label: "全部"
        }
    ];

    var test3 = [
        {
            value: 1,
            label: "Crowd bbbbbbbbb"
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
        },
        {
            value: 7,
            label: "全部"
        }
    ];
    var test4 = [
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
        },
        {
            value: 7,
            label: "全部"
        }
    ];
    var test5 = [
        {
            value: 1,
            label: "plMx1jiP 重百群发券C"
        },
        {
            value: 2,
            label: "plMx1jalx 双安群发券"
        },
        {
            value: 3,
            label: "plMx1juY5 重百群发券B"
        }
    ];
    //--------------------自动完成数据源---------------------------

    //--------------------多选自动完成调用------------------------
    multipleAuto(".activity_group_input",test1);
    multipleAuto(".coupon_input",test5);
    //--------------------多选自动完成调用------------------------

    //--------------------自动完成搜索多选-------------------
    function multipleAuto(input,source){
        $(input).autocomplete({
            source: source,
            _renderItem:function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function( event, ui ) {
                var span=$("<span class='brand_span'><i class='fa fa-close float_right_multiple'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_multiple'></i>");
                span.attr("data-id",ui.item.value);
                if(ui.item.label=="全部"){
                    //选择全部时移除其它选项并禁止选择
                    $(this).parent().find("span").each(function(i){
                        $(this).remove();
                    });
                    $(this).parent().append(span);
                    $(this).val("").attr("disabled",true);
                    $(this).parents(".brand_input_div").css("height","68px");
                    $(this).parents(".form-group").next(".error_show").hide();
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
                        var p_height=parseInt($(this).parents(".brand_input_div").css("height"))+32;
                        $(this).parents(".brand_input_div").css("height",p_height+"px");
                        $(this).parents(".form-group").next(".error_show").hide();
                    }
                }
                return false;
            }
        });
    }
    //--------------------自动完成搜索多选-------------------

    //-------------自动完成删除选项------------------------------------
    $(document).on("click",".float_right_multiple",function(){
        var span=$(this).parent();
        span.prevAll('.brand_input').attr("disabled",false);
        var p_height=parseInt($(this).parents(".brand_input_div").css("height"))-32;
        console.log(p_height);
        $(this).parents(".brand_input_div").css("height",p_height+"px");
        span.remove();
    });

})

//------------------输入框计数显示--------------------------
/*
函数功能:输入框计数
参数：tag:输入框的id，max:最大长度，name:显示字数的标签的id
 */
function count(tag,max,name){
    var text=document.getElementById(tag).value.length;
    var max=max;
    var show=text+"/"+max;
    document.getElementById(name).innerText=show;
}

/*
 函数功能:创建活动的初始化
 参数：modal_now为模态框的选择器，如$(".")
 */
function createActivity(modal_now){
    modal_now.find(".activity_name_input").val("").attr("disabled",false).trigger("keyup");   //活动名称清空
    $("#from").val("");    //开始时间清空
    $("#to").val("");          //结束时间清空
    $(".brand_input_div").find("span").each(function(){ //活动群组和卡券信息清空
        $(this).remove();
    });
    modal_now.find(".brand_input_div").css("height","35px");   //高度初始化
    modal_now.find("textarea").val("").trigger("keyup");       //备注清空
    modal_now.find(".error_show").hide();
    modal_now.modal("show");
}

/*
 函数功能:编辑活动的初始化
 参数：modal_now为模态框的选择器，如$(".")；array1为活动群组的回填信息；
 array2为卡券的回填信息；act_name为活动名称；start_time为开始时间;end_time为结束时间；remark_text为备注信息
 */
function editActivity(modal_now,array1,array2,act_name,start_time,end_time,remark_text){
    modal_now.find(".activity_name_input").val(act_name).attr("disabled",true).trigger("keyup");
    $("#from").val(start_time);
    $("#to").val(end_time);
    $(".brand_input_div").find("span").each(function(){
        $(this).remove();
    });
    modal_now.find(".brand_input_div").css("height","35px");
    modal_now.find(".error_show").hide();
    //活动群组信息回填
    //var act_group=[["1","action"],["2","beauty"]];
    for (var i=0;i<array1.length;i++){
        var span=$("<span class='brand_span'></span>");
        span.html(array1[i][1]+"<i class='fa fa-close float_right_multiple'></i>");
        span.attr("data-id",array1[i][0]);
        modal_now.find(".activity_group_div").append(span);
        var p_height1=parseInt(modal_now.find(".activity_group_div").css("height"))+32;
        modal_now.find(".activity_group_div").css("height",p_height1+"px");
    }
    //卡券信息回填
    //var coupon_message=[["1","plMx1jiP重百群发券C"],["2","plMx1jalx双安群发券"]];
    for (var i=0;i<array2.length;i++){
        var span=$("<span class='brand_span'></span>");
        span.html(array2[i][1]+"<i class='fa fa-close float_right_multiple'></i>");
        span.attr("data-id",array2[i][0]);
        modal_now.find(".coupon_div").append(span);
        var p_height2=parseInt(modal_now.find(".coupon_div").css("height"))+32;
        modal_now.find(".coupon_div").css("height",p_height2+"px");
    }
    $("#remark_textarea").val(remark_text).trigger("keyup");
    modal_now.modal("show");
}

function validateForm(){
    var act_name=$(".activity_name_input").val();
    var start_time=$("#from").val();
    var end_time=$("#to").val();
    var span_length=$(".activity_group_div").find("span").length;
    var error_length=0;
    if(act_name==""){
        $(".modal_activity").find(".error_show").eq(0).show();
        error_length++;
    }else{
        $(".modal_activity").find(".error_show").eq(0).hide();
    }
    if(start_time==""||end_time==""){
        $(".modal_activity").find(".error_show").eq(1).show();
        error_length++;
    }else{
        $(".modal_activity").find(".error_show").eq(1).hide();
    }
    if(span_length==0){
        $(".modal_activity").find(".error_show").eq(2).show();
        error_length++;
    }else{
        $(".modal_activity").find(".error_show").eq(2).hide();
    }
    return error_length;
}

function saveMessage(){
    var act_name=$(".activity_name_input").val();
    var start_time=$("#from").val();
    var end_time=$("#to").val();
    var activity_message={
        act_name:"",
        start_time:"",
        end_time:"",
        act_group:new Array(),
        coupon_list:new Array(),
        remark_text:""
    };
    activity_message.act_name=$(".activity_name_input").val();
    activity_message.start_time=$("#from").val();
    activity_message.end_time=$("#to").val();
    $(".activity_group_div").find("span").each(function(i){
        activity_message.act_group[i]=$(this).attr("data-id");
    });
    $(".coupon_div").find("span").each(function(i){
        activity_message.coupon_list[i]=$(this).attr("data-id");
    });
    activity_message.remark_text=$("#remark_textarea").val();
    console.log(activity_message);
}
