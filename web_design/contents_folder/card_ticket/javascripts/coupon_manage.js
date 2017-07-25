/**
 * Created by Administrator on 2016/5/22.
 */

$(function(){

    //--------------------------点击搜索按钮传送选择项----------------------------------
    $(".navbar-right").delegate(".btn_search","click",function(){
        var search_input = $(this).prevAll(".form-group").find(".search_input").val();
        console.log("搜索框输入内容：" + search_input);        //搜索框输入内容
        var coupon_way=$(".navbar-right").find(".dropdown").attr("data-id");
        console.log("卡券方式："+coupon_way);  //卡券方式，卡券名称1，卡券ID2
        chooseShow();
    });
    //--------------------------点击搜索按钮传送选择项----------------------------------

    //---------------------下拉菜单改变文字------------------
    $(".table_head .dropdown-menu li a").click(function(){
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));
        chooseShow();
    });

    $(".navbar-right .dropdown-menu li a").click(function(){
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));
    });
    //---------------------下拉菜单改变文字------------------

    //---------------------点击编辑选择投放方式------------------
    $(".btn-group").delegate(".btn_edit","click",function(){
        var card_id=$(this).parents("tr").attr("data-id");
        var tds=$(this).parents("tr").find("td");
        //选择卡券信息回填
        $(".modal .choose_card").each(function(i){
            $(this).val("");
            for(var j=0;j<tds.length-1;j++){
                $(this).val($(this).val()+" "+$(tds[j]).text());
            }
        });
        //$(".modal_provide_way_choose").attr("data-id",card_id);
        var edit_state=tds.eq(4).text();
        if(edit_state=="已编辑"){
            $(".modal_provide_way_choose").find("input:radio").eq(1).attr("disabled",true);
        }else{
            $(".modal_provide_way_choose").find("input:radio").eq(1).attr("disabled",false);
        }
        $(".modal_provide_way_choose").modal("show").attr("data-id",card_id);
    });
    //---------------------点击编辑选择投放方式------------------

    //--------------------------拉取卡券时显示进度条----------------
    $(".navbar").delegate(".btn_pull_card","click",function(){
        $(".modal_progress").modal("show");
        //setTimeout("$('.modal_progress').modal('hide')",3000);
    });
    //--------------------------拉取卡券时显示进度条----------------

    //--------------------------删除卡券模态框显示----------------
    $(".btn-group").delegate((".btn_delete"),"click",function(){
        var data_id=$(this).parents("tr").attr("data-id");
        $(".modal_delete_card").attr("data-id",data_id).modal("show");
    });
    //--------------------------删除卡券模态框显示----------------

    //--------------------------删除卡券确认----------------
    $(".modal_delete_card").delegate(".btn_confirm","click",function(){
        console.log($(this).parents(".modal_delete_card").attr("data-id"));
        $(this).parents(".modal_delete_card").modal("hide");
    });
    //--------------------------删除卡券确认----------------

    //--------------------------选择投放方式后显示相应的规则管理模态框----------------
    $(".modal_provide_way_choose").delegate(".btn_confirm","click",function(){
        var radio=$(this).parent().prevAll(".modal-body").find("input:radio").eq(1);
        var card_id=$(".modal_provide_way_choose").attr("data-id");
        if(radio.prop("checked")){
            clearContent(".modal_rule_manage_orient");  //规则管理（定向）模态框显示
            $(".modal_rule_manage_orient").attr("data-id",card_id);
        }else{
            clearContent(".modal_rule_manage_group");  //规则管理（群发）模态框显示
            $(".modal_rule_manage_group").attr("data-id",card_id);
        }
    });
    //--------------------------选择投放方式后显示相应的规则管理模态框----------------

    //--------------------自动完成数据源---------------------------
    var test1 = [
        {
            value: 1,
            label: "ActionScriptaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
    //--------------------自动完成数据源---------------------------

    //--------------------多选自动完成调用------------------------
    multipleAuto(".coupon_list_input",test2);
    multipleAuto(".orient_people_input",test1);
    single_Auto(".form_input",test3);
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

    //--------------------自动完成搜索单选-------------------
    function single_Auto(input,source){
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
                $(this).val("").hide();
                $(this).parents(".form-group").next(".error_show").hide();
                return false;
            }
        });
    }
    //--------------------自动完成搜索单选-------------------

    //-------------自动完成删除选项------------------------------------
    $(document).on("click",".float_right_multiple",function(){
        var span=$(this).parent();
        span.prevAll('.brand_input').attr("disabled",false);
        var p_height=parseInt($(this).parents(".brand_input_div").css("height"))-32;
        console.log(p_height);
        $(this).parents(".brand_input_div").css("height",p_height+"px");
        span.remove();
    });

    $(document).on("click",".float_right_single",function(){
        var span=$(this).parent();
        span.prevAll('.brand_input').attr("disabled",false).show();
        span.remove();
    });
    //-------------自动完成删除选项------------------------------------

    //----------------模态框点击完成按钮表单验证----------------------------
    $(".modal-footer").delegate((".btn_group_finish"),"click",function(){
        var check_state=validateForm(".btn_group_finish");
        console.log(check_state);
        var card_message={
            card_id:"",
            provide_way:"",
            coupon_list:new Array(),
            forms:new Array()
        }
        if(check_state){
            var parent=$(this).parents(".modal");
            card_message.card_id=parent.attr("data-id");
            card_message.provide_way=parent.find(".provide_way_input").val();
            parent.find(".brand_input_div").eq(0).find(".brand_span").each(function(i){
                card_message.coupon_list[i]=$(this).attr("data-id");
            });
            parent.find(".brand_input_div").eq(1).find(".brand_span").each(function(i){
                card_message.forms[i]=$(this).attr("data-id");
            });
            console.log(card_message);
        }else{

        }
    });

    $(".modal-footer").delegate((".btn_orient_finish"),"click",function(){
        var check_state=validateForm(".btn_orient_finish");
        console.log(check_state);
        var card_message={
            card_id:"",
            provide_way:"",
            coupon_list:new Array(),
            forms:new Array()
        }
        if(check_state){
            var parent=$(this).parents(".modal");
            card_message.card_id=parent.attr("data-id");
            card_message.provide_way=parent.find(".provide_way_input").val();
            parent.find(".brand_input_div").eq(0).find(".brand_span").each(function(i){
                card_message.coupon_list[i]=$(this).attr("data-id");
            });
            parent.find(".brand_input_div").eq(1).find(".brand_span").each(function(i){
                card_message.forms[i]=$(this).attr("data-id");
            });
            console.log(card_message);
        }else{

        }
    });
    //----------------模态框点击完成按钮表单验证----------------------------

    //-------------------------定向人群范围选择-----------------------------------
    $(".modal_rule_manage_orient").delegate((".dropdown-menu li a"),"click",function(){
        $(this).parents(".dropdown-menu").prevAll(".btn-dropdown").find("span").text($(this).text());
        if($(this).attr("data-id")==1){          //根据不同的选择修改数据源
            multipleAuto(".orient_people_input",test1);
        }else if($(this).attr("data-id")==2){
            multipleAuto(".orient_people_input",test2);
        } else if($(this).attr("data-id")==3){
            multipleAuto(".orient_people_input",test3);
        }else{
            multipleAuto(".orient_people_input",test4);
        }
    });
    //-------------------------定向人群范围选择-----------------------------------

    //-------------------------创建短信模态框-----------------------------------
    $(".btn-group").delegate(".btn_message","click",function(){
        var card_name=$(this).parents("tr").find("td").eq(1).text();
        var modal_now=$(".modal_create_message");
        modal_now.find(".send_target").val(card_name);
        string_header="[蜜枣网]";
        $("#send_count_textarea").val(string_header+"回复退订").trigger("keyup");
        $(".error_tips").hide();
        modal_now.modal("show");
    });
    //-------------------------创建短信模态框-----------------------------------

    $(".modal_create_message").delegate(".btn_send","click",function(){
        var string=$("#send_count_textarea").val();
        var first_string=string.substring(0,string_header.length);
        var s_length=string.length;
        var last_string=string.substring(s_length-4,s_length);
        if(first_string==string_header && last_string=="回复退订"){
            $(".error_tips").hide();
            console.log("短信内容："+string+" "+"短信字数："+$("#send_count_span").text());
            $(".modal_create_message").modal("hide");
        }else{
            $(".error_tips").show();
        }
    });

});

//函数功能：表头下拉菜单选择时传送所有选择值
function chooseShow(){
    var kind = $(".kind").find(".dropdown").attr("data-id");
    console.log("类型:" + kind);           //类型选择，未选择0，全部1，通用券2，代金券3，团购券4，折扣券5，礼品券6
    var provide_way = $(".provide_way").find(".dropdown").attr("data-id");
    console.log("发放方式:" + provide_way);       //发放方式，未选择0，全部1，群发2，定向3
    var edit = $(".edit").find(".dropdown").attr("data-id");
    console.log("编辑:" + edit);        //编辑，未选择0，已编辑1，已编辑2
    var state = $(".state").find(".dropdown").attr("data-id");
    console.log("状态:" + state);       //状态，未选择0，全部1，审核中2，未通过3，待投放4，已投放5，已下架6
}
/*
函数功能：规则管理模态框打开时清除上一次选择的内容
参数：modalClassName:模态框的class
*/
function clearContent(modalClassName){
    var input=$(modalClassName).find(".brand_input_div");
    input.find(".brand_span").remove();          //删除所有span
    input.find(".brand_input").val("").attr("disabled",false);   //input框可输入
    input.css("height","36px");     //初始化高度
    input.parents(".form-group").next(".error_show").hide();        //删除表单验证显示
    $(modalClassName).modal("show");
    $(".modal_provide_way_choose").modal("hide");
}

/*
 函数功能：模态框表单验证
 参数：item:确认按钮的class
 */
function validateForm(item){
    var spans_number=1;
    $(item).parents(".modal").find(".validate_div").each(function(i){
        var span_length=$(this).find(".brand_span").length;
        if(span_length>0){

        }else{
            $(this).parents(".form-group").next(".error_show").show();
            spans_number=0;
        }
    });
    return spans_number;
}

//------------------输入框计数显示--------------------------
function countText(tag,name){
    var text=document.getElementById(tag).value.length;
    var show=text;
    document.getElementById(name).innerText=show;
}

