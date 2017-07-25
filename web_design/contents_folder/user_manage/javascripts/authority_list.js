/**
 * Created by Administrator on 2016/5/17.
 */

$(function() {
    //--------------------创建权限模态框显示-------------------
    $(".create_authority").click(function() {
        $(".create_authority_modal").find(".group_name_input").val("").attr("disabled",false);
        count('group_name_input',10,'count_title');
        $(".clear_setting").trigger("click");
        $(".create_authority_modal").find("h4").text("创建权限");
        $(".create_authority_modal").modal("show");
        $(".create_authority_modal").find(".error_show label").remove();
    });
    //--------------------创建权限模态框显示-------------------

    //--------------------编辑权限模态框显示-------------------
    $(".btn-edit").click(function() {
        var authority_message={
            name:$(this).parents("tr").find("td").eq(1).text(),
            states:[1,1,0,0,0,0,0,0,0,1,1]          //编辑权限菜单按钮初始数组
        };
        $(".create_authority_modal").find(".group_name_input").val(authority_message.name).attr("disabled",true);
        $(".create_authority_modal").find(".group_name_input").removeClass("error_tips");
        $(".create_authority_modal").find(".error_show label").remove();
        $(".create_authority_modal").find("h4").text("编辑权限");
        count('group_name_input',10,'count_title');
        $(".create_authority_modal .detail_state").each(function(i){
            if(authority_message.states[i]==1){
                $(this).text("关");
                $(this).removeClass("show_state");
                $(this).addClass("hide_state");
            }else{
                $(this).text("开");
                $(this).removeClass("hide_state");
                $(this).addClass("show_state");
            }
        });
        $(".create_authority_modal").modal("show");
    });
    //--------------------编辑权限模态框显示-------------------

    //-------------------清空配置----------------------------------
    $(".clear_setting").click(function(){
        $(this).parents(".modal").find(".detail_state").each(function(){
            $(this).text("开");
            $(this).removeClass("hide_state");
            $(this).addClass("show_state");
        });
    });
    //-------------------清空配置----------------------------------

    //-------------------表单验证----------------------------------
    $(".authority_form").validate({
        debug:true,
        rules:{
            group_name_input:{
                required: true
            }
        },
        messages:{
            group_name_input:{
                required:"*请输入组名"
            }
        },
        errorPlacement : function(error, element) {
            error.appendTo(element.parent().siblings(".error_show"));
        },
        errorClass:"error_tips",
        errorElement: "label"
    });
    //-------------------表单验证----------------------------------

    //-------------------菜单联动---------------------------------
    $(".level1_state").click(function(){
        var par = $(this).parents(".authority_detail_level1");
        var level2 = par.find(".level2_state");
        var level3 = par.find(".level3_state");
        if($(this).hasClass("hide_state")){
            $(this).removeClass("hide_state");
            $(this).addClass("show_state");
            $(this).text("开");
            level2.text("开");
            level2.removeClass("hide_state");
            level2.addClass("show_state");
            level3.text("开");
            level3.removeClass("hide_state");
            level3.addClass("show_state");
        }
        else{
            $(this).removeClass("show_state");
            $(this).addClass("hide_state");
            $(this).text("关");
            level2.text("关");
            level2.removeClass("show_state");
            level2.addClass("hide_state");
            level3.text("关");
            level3.removeClass("show_state");
            level3.addClass("hide_state");
        }

    });

    $(".level2_state").click(function(){
        var par = $(this).parents(".authority_detail_level2");
        var level3 = par.find(".level3_state");
        if($(this).hasClass("hide_state")){
            $(this).removeClass("hide_state");
            $(this).addClass("show_state");
            $(this).text("开");
            level3.text("开");
            level3.removeClass("hide_state");
            level3.addClass("show_state");

        }
        else{
            $(this).removeClass("show_state");
            $(this).addClass("hide_state");
            $(this).text("关");
            level3.text("关");
            level3.removeClass("show_state");
            level3.addClass("hide_state");
            //添加
            var par = $(this).parents(".authority_detail_level1");
            var level1 = par.find(".level1_state");
            if(level1.hasClass("show_state")){
                level1.removeClass("show_state");
                level1.addClass("hide_state");
                level1.text("关");
            }

        }

        var par = $(this).parents(".authority_detail_level1");
        var level2=par.find(".level2_state");
        var level2_length=level2.length;
        var yy=0;
        for(var i=0;i<level2_length;i++)
        {
            if($(this).parents(".authority_detail_level1").find(".level2_state").eq(i).hasClass("show_state"))
            {
                yy++;
                console.log(1);
            }
        }
        if(yy==level2_length){
            var level1_change=$(this).parents(".authority_detail_level1").find(".level1_state");
            level1_change.text("开");
            level1_change.removeClass("hide_state");
            level1_change.addClass("show_state");
        }
    });

    $(".level3_state").click(function() {
        if ($(this).hasClass("hide_state")) {
            $(this).removeClass("hide_state");
            $(this).addClass("show_state");
            $(this).text("开");
        } else {
            $(this).removeClass("show_state");
            $(this).addClass("hide_state");
            $(this).text("关");

            var par = $(this).parents(".authority_detail_level1");
            var level1 = par.find(".level1_state");
            if (level1.hasClass("show_state")) {
                level1.removeClass("show_state");
                level1.addClass("hide_state");
                level1.text("关");
            }

            var par = $(this).parents(".authority_detail_level2");
            var level2 = par.find(".level2_state");
            if (level2.hasClass("show_state")) {
                level2.removeClass("show_state");
                level2.addClass("hide_state");
                level2.text("关");
            }
        }

        var par = $(this).parents(".authority_detail_level2");
        var level3 = par.find(".level3_state");
        var level3_length = level3.length;
        var xx = 0;
        for (var i = 0; i < level3_length; i++) {
            if ($(this).parents(".authority_detail_level2").find(".level3_state").eq(i).hasClass("show_state")) {
                xx++;
            }
        }
        if (xx == level3_length) {
            var level2_change = $(this).parents(".authority_detail_level2").find(".level2_state");
            level2_change.text("开");
            level2_change.removeClass("hide_state");
            level2_change.addClass("show_state");

            var par = $(this).parents(".authority_detail_level1");
            var level2 = par.find(".level2_state");
            var level2_length = level2.length;
            var yy = 0;
            for (var i = 0; i < level2_length; i++) {
                if ($(this).parents(".authority_detail_level1").find(".level2_state").eq(i).hasClass("show_state")) {
                    yy++;
                }
            }
            if (yy == level2_length) {
                var level1_change = $(this).parents(".authority_detail_level1").find(".level1_state");
                level1_change.text("开");
                level1_change.removeClass("hide_state");
                level1_change.addClass("show_state");
            }
        }
    });
    //-------------------菜单联动---------------------------------

    //-------------------有下一级的菜单标示-----------------------
    $(".authority_detail_menu").each(function(){
        if($(this).siblings("div").length>0){
            $(this).addClass("menu_current");
        }else{

        }
    });

    $(".menu_level2").each(function(){
        if($(this).siblings("div").length>0){
            $(this).addClass("menu_current");
        }else{

        }
    });
    //-------------------有下一级的菜单标示-----------------------

    //$(".body_right .detail_state").each(function(i){
    //    var menu_states=[0,1,1,1,1,1,1,1,1,0,0];
    //    if(menu_states[i]==1){
    //        $(this).text("关");
    //        $(this).removeClass("show_state");
    //        $(this).addClass("hide_state");
    //    }else{
    //        $(this).text("开");
    //        $(this).removeClass("hide_state");
    //        $(this).addClass("show_state");
    //    }
    //});

    //------------------确认传送组名和菜单开关状态——-------------------
    $(".create_authority_modal .confirm").click(function(){
        var states = new Array();
        var par=$(this).parents(".create_authority_modal");
        par.find(".detail_state").each(function(i) {
            if($(this).text()=="开"){
                states.push(0);
            }
            else{
                states.push(1);
            }
        });

        if(par.find(".group_name_input").val()==""){

        }else{
            console.log(states);
            console.log(par.find(".group_name_input").val());
        }

    });
    //------------------确认传送组名和菜单开关状态——-------------------

    //------------------权限详情显示-------------------------------------
    $(".btn-check-detail").click(function(e){
        e.stopPropagation();
        console.log($(this).parent().prev("td").text());
        //------------------查看详情菜单开关状态初始化-----------------------
        $(".check_authority_detail .detail_state").each(function(i){
            var menu_states=[0,1,1,1,1,1,1];
            if(menu_states[i]==1){
                $(this).text("关");
                $(this).removeClass("show_state");
                $(this).addClass("hide_state");
            }else{
                $(this).text("开");
                $(this).removeClass("hide_state");
                $(this).addClass("show_state");
            }
        });
        //------------------查看详情菜单开关状态初始化-----------------------
        $(".check_authority_detail").css({"top":e.pageY+26});
        $(".check_authority_detail").css({"left":e.pageX});
        $(".check_authority_detail").show();
        var top=parseInt($(".check_authority_detail").css("top"));
        var height=top-340;
        if(top>460){
            $(".mask_hide").css({"height":height+"px"}).show();
        }
    });
    //------------------权限详情显示-------------------------------------

    //------------------点击其它地方弹出框隐藏--------------------------
    $(document).click(function(){
        $(".check_authority_detail").hide();
        $(".mask_hide").hide();
    });
    //------------------点击其它地方弹出框隐藏--------------------------

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu li a").click(function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));
        $(".dropdown").each(function(i){
            console.log($(this).attr("data-id"));
        });
    });
    //---------------------下拉菜单改变文字------------------

});


//------------------输入框计数显示--------------------------
function count(tag,max,name){
    var text=document.getElementById(tag).value.length;
    var max=max;
    var show=text+"/"+max;
    document.getElementById(name).innerText=show;
}