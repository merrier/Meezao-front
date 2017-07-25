/**
 * Created by Administrator on 2016/5/17.
 */
$(function(){

    //--------------------用户注册模态框显示-------------------
    $(".create_user").click(function(){
        var par=$(".user_register");
        par.find(".account_input").val("").attr("disabled",false);
        par.find(".brand_input").val("");
        par.find(".authority_group_input").val("");
        $(".user_register .error_show").find("label").remove();
        par.modal('show');

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
            },
            {
                value: 7,
                label: "拉夏贝尔1"
            },
            {
                value: 8,
                label: "拉夏贝尔2"
            },
            {
                value: 9,
                label: "拉夏贝尔3"
            },
            {
                value: 10,
                label: "拉夏贝尔4"
            },
            {
                value: 11,
                label: "拉夏贝尔5"
            },
            {
                value: 12,
                label: "拉夏贝尔6"
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

        single_auto(".user_register .body_left .brand_input",test1);
        single_auto(".user_register .body_right .brand_input",test2);

    });
    //--------------------用户注册模态框显示-------------------

    //--------------------用户编辑模态框显示-------------------
    $(".btn-edit").click(function(){
        var par=$(this).parents("tr").find("td");
        var span_left=$("<span class='brand_span'><i class='fa fa-close float_right'></i></span>");
        if(par.eq(2).text().length>20){
            var brand_name=par.eq(2).text().substring(0,19);
            span_left.html(brand_name+"<i class='fa fa-close float_right'></i>");
        }else{
            span_left.html(par.eq(2).text()+"<i class='fa fa-close float_right'></i>");
        }
        span_left.attr("name",par.eq(2).text());
        var par_div_left=$(".user_edit .body_left .brand_input_div");
        par_div_left.find(".brand_span").remove();
        par_div_left.append(span_left);
        $(".user_edit .brand_input").val("").css("display","none");
        par_div_left.parents(".form-group").nextAll(".brand_choose").find("input").val(par.eq(2).attr("data-id"));
        var par_div_right=$(".user_edit .body_right .brand_input_div");
        var span_right=$("<span class='brand_span'><i class='fa fa-close float_right'></i></span>");
        span_right.html(par.eq(5).text()+"<i class='fa fa-close float_right'></i>");
        par_div_right.find(".brand_span").remove();
        par_div_right.append(span_right);
        par_div_right.parents(".form-group").nextAll(".brand_choose").find("input").val(par.eq(5).attr("data-id"));
        console.log(par.eq(5).attr("data-id"));
        $(".user_edit").find(".account_input").val(par.eq(1).attr("data-name")).attr("disabled",true);
        console.log(par.eq(1).attr("data-name"));
        $(".user_edit .error_show").find("label").remove();
        var menu_states=[1,0,0,1,1,1,1,0,0,0,1];
        $(".user_edit").find(".nav_bar .detail_state").each(function(i){
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
        $(".user_edit").find(".nav_bar").show();
        $(".user_edit").modal('show');

        //--------------------自动完成搜索数据源-------------------
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
            }
        ];

        var test2 = [
            {
                value: 1,
                label: "Applebbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaa"
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
            },
            {
                value: 7,
                label: "拉夏贝尔1"
            },
            {
                value: 8,
                label: "拉夏贝尔2"
            },
            {
                value: 9,
                label: "拉夏贝尔3"
            },
            {
                value: 10,
                label: "拉夏贝尔4"
            },
            {
                value: 11,
                label: "拉夏贝尔5"
            },
            {
                value: 12,
                label: "拉夏贝尔6"
            }
        ];
        //--------------------自动完成搜索数据源-------------------
        single_auto(".user_edit .body_left .brand_input",test1);
        single_auto(".user_edit .body_right .brand_input",test2);
    });
    //--------------------用户编辑模态框显示-------------------

    //--------------------用户注册模态框表单验证-------------------
    $(".register_form").validate({
        debug:true,
        rules:{
            account_input:{
                required:true
            },
            brand_choose:{
                required:true
            },
            group_choose:{
                required:true
            }
        },
        messages:{
            account_input:{
                required:"*请输入账号"
            },
            brand_choose:{
                required:"*请选择所属品牌"
            },
            group_choose:{
                required:"*请导入权限组"
            }
        },
        errorPlacement : function(error, element) {
            error.appendTo(element.parent().siblings(".error_show"));
        },
        errorClass:"error_tips",
        errorElement: "label"
    });
    //--------------------用户注册模态框表单验证-------------------

    //--------------------用户编辑模态框表单验证-------------------
    $(".modal_interaction_form").validate({
        debug:true,
        rules:{
            account_input:{
                required:true
            },
            brand_choose:{
                required:true
            },
            group_choose:{
                required:true
            }
        },
        messages:{
            account_input:{
                required:"*请输入账号"
            },
            brand_choose:{
                required:"*请选择所属品牌"
            },
            group_choose:{
                required:"*请导入权限组"
            }
        },
        errorPlacement : function(error, element) {
            error.appendTo(element.parent().siblings(".error_show"));
        },
        errorClass:"error_tips",
        errorElement: "label"
    });
    //--------------------用户注册模态框表单验证-------------------

    $('.dropdown_menu_div').on('click', function() {
        console.log('1');
        var auto_input=$(this).prev("div").children(".brand_input");
        if (auto_input.autocomplete("widget").is(":visible")) {
            auto_input.autocomplete("close");
            return;
        }
        $(this).blur();
        auto_input.autocomplete('search', '');
        auto_input.focus();
    });

    //--------------------自动完成搜索-------------------
    function single_auto(input,source){
        $(input).autocomplete({
            source: source,
            minLength: 0,
            autoFocus: true,
            _renderItem:function (ul, item) {
                return $("<li></li>")
                    .append(item.label.substring(0,19))
                    .appendTo(ul);
            },
            select: function( event, ui ) {
                var span=$("<span class='brand_span'><i class='fa fa-close float_right'></i></span>");
                if(ui.item.label.length>20){
                    var brand_name=ui.item.label.substring(0,19);
                    span.html(brand_name+"<i class='fa fa-close float_right'></i>");
                }else{
                    span.html(ui.item.label+"<i class='fa fa-close float_right'></i>");
                }
                span.attr("name",ui.item.label);
                $(this).parent().append(span);
                $(this).val("").css("display","none");
                var choose_input=$(this).parents(".form-group").nextAll(".brand_choose").find("input");
                choose_input.val(ui.item.value);
                console.log(choose_input.val());
                var menu_states=[1,0,0,1,1,1,1,0,0,0,1];
                $(this).parents(".form-group").nextAll(".authority_mould").find(".detail_state").each(function(i){
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
                $(this).parents(".form-group").nextAll(".authority_mould").show();
                $(this).parents(".form-group").next(".error_show").find("label").remove();
                return false;
            }
        });
    }
    //--------------------自动完成搜索-------------------


    //--------------------自动完成选择项删除-------------------
    $(document).on("click",".float_right",function(){
        $(this).parents(".form-group").nextAll(".brand_choose").find("input").val("");
        console.log($(this).parents(".form-group").nextAll(".brand_choose").find("input").val());
        $(this).parent().prevAll(".brand_input").val("").css("display","block");
        $(this).parents(".form-group").nextAll(".nav_bar").hide();
        $(this).parent().remove();
    });
    //--------------------自动完成选择项删除-------------------

    //--------------------确认后传送数据-------------------
    $(".confirm").click(function(){
        var par=$(this).parent().prevAll(".modal-body");
        var account=par.find(".account_input").val();  //账户
        var brand=par.find(".brand_choose_input").eq(0).val();   //所属品牌
        var authority_group=par.find(".brand_choose_input").eq(1).val();   //权限组
        var states = new Array();     //菜单开关状态
        par.find(".detail_state").each(function(i) {
            if($(this).text()=="开"){
                states.push(0);
            }
            else{
                states.push(1);
            }
        });
        if(account==""||brand==""||authority_group==""){

        }else{
            console.log(account+""+brand+""+authority_group);
            console.log(states);
        }
    });
    //--------------------确认后传送数据-------------------

    //--------------------用户解绑-------------------
    $(".btn-unbinding").click(function(){
        var account=$(this).parents("tr").find("td").eq(1).text();
        $(".modal-unbinding").attr("data-name",account);
        $(".modal-unbinding").modal("show");
    });

    $(".modal-unbinding .btn-confirm").click(function(){
        console.log($(this).parents(".modal").attr("data-name"));
        $(this).parents(".modal").modal("hide");
    });
    //--------------------用户解绑-------------------

    //--------------------用户删除-------------------
    $(".btn-delete").click(function(){
        var account=$(this).parents("tr").find("td").eq(1).text();
        $(".modal-delete").attr("data-name",account);
        $(".modal-delete").modal("show");
    });

    $(".modal-delete .btn-confirm").click(function(){
        console.log($(this).parents(".modal").attr("data-name"));
        $(this).parents(".modal").modal("hide");
    });
    //--------------------用户删除-------------------

    //--------------------点击查询按钮返回输入内容-------------------------------
    $(".navbar-right .search").click(function(){
        console.log($(this).prevAll(".form-group").find(".search_input").val());
    });
    //--------------------点击查询按钮返回输入内容-------------------------------

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu li a").click(function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));
        $(".dropdown").each(function(i){
            console.log($(this).attr("data-id"));
        });
    });
    //---------------------下拉菜单改变文字------------------

    $(".table_body tr").find("td").eq(1).each(function(){
        var account=$(this).text();
        if(account.length>10){
            $(this).text(account.substring(0,9)+"...");
            $(this).attr("data-name",account);
        }else{
            $(this).attr("data-name",account);
        }

    })
});
