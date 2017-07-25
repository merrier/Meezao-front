/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/10 9:43>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

//若后期有修改或者添加,改变之后的内容都会在js文件的最前面以便查找.


//-----------------警告框开始-----------------
function alertShow(type,delay,content){
    //type:分为两种,"success"或1,为绿色背景,含义为成功;"danger"或"error"或0,为红色背景,含义为失败;
    //delay:分为两种,"human"为人工关闭,有关闭按钮;其他数字为自动关闭,单位为秒;
    //content:为自定义内容,默认类型为字符串,即需要用""括起来.

    //定义默认值,content不能有默认值,因为会影响到加载时是否显示警告框
    //var defaults = {
    //    'type':'success',
    //    'delay':'3',
    //    'content':''
    //};


    var alert_type = type;


    if(alert_type == 1){
        alert_type = "success";
    }

    if(alert_type == 0 || alert_type == "error"){
        alert_type = "danger"
    }

    var alert_delay = delay;


    var alert_content = content;


    var alert_class = "alert"+"-"+alert_type;
    var alert_class_all = "alert"+"-"+alert_type+"-"+alert_delay;
    $(".alert-example").eq(0).clone(true).insertAfter(".content_mb_title").addClass(alert_class).addClass(alert_class_all)
                       .removeClass("alert-example").children("strong").text(alert_content);
    if(alert_delay != "human"){
        alertRemove(alert_class_all,alert_delay);
    }
}


function alertRemove(classname,delay){
    var class_name = classname;
    var delay_time = delay;
    $("."+class_name).children("button").remove();
    setTimeout(function () {
        $("."+class_name).remove();
    },delay_time*1000);
}

//-----------------警告框结束------------------



//------------------模态框-修改密码表单验证开始---------------------
$(".modifypassword_form").validate({
    debug:true,
    rules:{
        modifypassword_password_old:{
            required:true,
        },
        modifypassword_password_new:{
            required:true,
            // new:""
        },
        "modifypassword_password_newagain":{
            equalTo: "#modifypassword_password_new"
        }
    },
    messages:{
        modifypassword_password_old:{
            required: '*请输入原密码',
        },
        modifypassword_password_new: {
            required: '*请输入新密码',
        },
        "modifypassword_password_newagain":{
            equalTo: "*两次输入的密码不一致"
        }
    },
    errorClass:"error_tips",
});
//------------------模态框-修改密码表单验证结束---------------------


//------------------模态框-手机号解绑表单验证开始--------------------
$(".phone_unbinding").validate({
    debug:true,
    rules:{
        phonesolution_phone_number:{
            required:true,
            phonenumber:""
        }
    },
    messages:{
        phonesolution_phone_number:{
            required:"*请填写绑定的手机号"
        }
    },
    errorClass:"error_tips",

});

$.validator.addMethod("phonenumber", function(value, element, params){
    var phonenumber = /^1[35847][0-9][0-9]{8}$/;
    return this.optional(element) || (phonenumber.test(value));
}, $.validator.format("*请确认输入的是手机号！"));
//------------------模态框-手机号解绑表单验证结束--------------------

//---------------------30s倒计时-------------------
function settime(countdown, val) {
    if (countdown == 0) {
        $(".reg_btn_mask").hide();
        $(".reg_btn_getcode:visible").removeClass("reg_btn_gray");
        $(val).html("获取验证码");
        countdown = 30;
        return false;
    } else {
        $(".reg_btn_mask").show();
        $(".reg_btn_getcode:visible").addClass("reg_btn_gray");
        $(val).html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        settime(countdown, val)
    }, 1000)
}

function validateForm() {
    if (check_Verification_Code()) {
        with (document.getElementById("regForm")) {
            method = "post";
            action = "Wwwww";
            submit();
        }
    }
}


//手机号码的验证
function checkMobile(mobile) {
    var phoneReg = /^1[35847][0-9][0-9]{8}$/;
    if (!phoneReg.test(mobile)) {
        $(".modal_tips_phone").text('*请确认输入的是手机号').show();
        return false;
    }
    else {
        $(".modal_tips_phone").text('').hide();
        return true;
    }
}


//验证码生成
function MathRand() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }

    $(".modal_code_random").text(Num);
}


//-----------------------模态框通用验证----------------------
$(".reg_btn_getcode").on("click",function(){

    var countdown = 30;
    var val = $(this);
    var mobile = $(".modal_phone_number:visible").val();
    if (checkMobile(mobile)) {

        var yzm = MathRand();//验证码
        var phone = $(".modal_modify_password .modal_phone_number:visible").val();


        settime(countdown, val);//倒计时
    }
});


function checkCode(param){
    $(param).delegate('.modal_btn_confirm',"click",function(){

        var vercode = $.trim($(".modal_vercode:visible").val());
        var vercode_val = $.trim($(param).find(".modal_code_random").text());
        if (vercode_val) {
            if(vercode == ""){
                $(".modal_tips_vercode").text('*验证码不能为空').show();
                return false;
            } else if (vercode_val == vercode){
                $(".modal_tips_vercode").text('').hide();
            }else{
                $(".modal_tips_vercode").text('*验证码输入错误').show();
                return false;
            }
        }

    });
};

checkCode(".modal_phone_solution");
checkCode(".modal_retrieve_password");



$(function () {

    //----------------------模态框相关---------------------
    $('.modal').not(".modal_bind_phone,.modal_common_unclosed").modal({
        keyboard: true,
        backdrop: 'static',
        show:false
    });


//--------------模态框-绑定手机-------------
    $(".modal_bind_phone,.modal_common_unclosed").modal({
        keyboard: false,
        backdrop: 'static',
        show:false
    });


//----------------------警告框淡出删除---------------------
    $(".alert").delegate("button","click",function(){
        $(this).parents(".alert").fadeOut().remove();
    });


    //-----------------------tooltip初始化--------------------------
    $(".common_hover_tooltip").tooltip();

    //-----------------------信息中心点击信封-------------------------
    $(".toolbar").delegate(".toobar_information_center","click",function(){
         console.log("点击红点了");
    });


    //---------------------系统管理消息弹框关闭--------------------
    $(".system_information").delegate("i","click",function(){
        console.log("点击了关闭")
    });

    //---------------------系统管理消息弹框查看更多--------------------
    $(".system_information").delegate(".btn_view_more","click",function(){
        console.log("点击了查看更多")
    });


    //----------------------传过来状态之后自己执行----------------------
    function judgeSystemMessage(){
        var state = $(".system_information").css("display");
        if(state == "block"){
            $(".toolbar_information_center").find("sup").show();
        }else{
            $(".toolbar_information_center").find("sup").hide();
        }
    };


    //-------------------读取警告框标签内容-----------------
    (function alertTagRead(){
        var alert_tag = $(".content").children(".alert_hide_tag");
        var alert_type = alert_tag.children(".alert_tag_type").text();
        var alert_delay = alert_tag.children(".alert_tag_delay").text();
        var alert_content = alert_tag.children(".alert_tag_content").text();
        if(alert_content == "" || alert_content == null){
            return false;
        }else{
            alertShow(alert_type,alert_delay,alert_content);
        }
    })();


    //------------------信息中心点击-----------------
    $(".toolbar_person_information").on("click", drop_menu);


    //---------------------------主体内容点击-----------------------
    $(".wrp").click(
        function (event) {
            var className = event.target.className; //这样会获取你单击的元素的class
            if (className != "toolbar_person_information") {
                $(".toolbar_drop_menu").hide();
            }
        }
    );


    //下拉菜单
    function drop_menu(event) {
        event.stopPropagation();
        if ($(".toolbar_drop_menu").is(":hidden")) {
            $(".toolbar_drop_menu").show();
        }
        else {
            $(".toolbar_drop_menu").hide();
        }
    }


    //---------------------左侧导航栏----------------------
    $(".nav_bar a").on("click", menu_unflod);

    function menu_unflod() {
        var class_name = $(this).closest("ul").attr("class");
        //一级菜单
        if (class_name == "nav_bar_level1") {
            if ($(this).nextAll().is(":hidden")) {
                $(this).addClass("nav_bar_current1").nextAll().show();
                $(this).parent().siblings().children("a").removeClass("nav_bar_current1").next().hide();
            }
            else {
                $(this).parent().find("a").next().hide();
                $(this).parent().find("a").removeClass("nav_bar_current1 nav_bar_current2");

            }
        }
        if (class_name == "nav_bar_level2") {
            if ($(this).parent().has("ul").length == 0) {
                $(this).parent().siblings().children("a").removeClass("nav_bar_current2");
                $(this).parent().siblings().children("a").next().hide();
            }
            else {
                if ($(this).nextAll().is(":hidden")) {
                    $(this).parent().siblings().children("a").removeClass("nav_bar_current2").nextAll().hide();
                    $(this).addClass("nav_bar_current2").nextAll().show();
                }
                else {
                    $(this).parent().find("a").nextAll().hide();
                    $(this).parent().find("a").removeClass("nav_bar_current1 nav_bar_current2");

                }
            }
        }
    }

    

    

    //-------------------路径自动生成以及左侧导航开始------------------
    // var $data1 = '/MeeZao/Plat/Fun/Form/config_name/10/state/0/p/2.html';
    // var $data2 = '/MeeZao/Plat/Fun/Form.html?name=&searchtype=undefined&checktype=1&time=undefined';
    // var $data3 = '/MeeZao/Plat/Fun/Form.html';

    $(".nav_bar a").each(function(){
        var url = window.location.pathname;
        var a_href=$(this).attr("href");
        var pattern=new RegExp("php","g");
        var matches=pattern.exec(a_href);
        var start=pattern.lastIndex;
        var sa_href=a_href.substring(start);
        if(url.indexOf(sa_href)>-1){
            $(this).parents("ul").prev("a").trigger("click");
            $(this).css("color","#00b6f6");
            var text_this = $(this).text();
            var closest_ul = $(this).closest("ul");
            if (closest_ul.hasClass("nav_bar_level3")){
                var text_level2 = $(this).parents(".nav_bar_level3").prev("a").find("span").text();
                var text_level1 = $(this).parents(".nav_bar_level2").prev("a").find("span").text();
                $(".content_route_pathname").text(">"+text_level1+">"+text_level2+">"+text_this);
            }else if(closest_ul.hasClass("nav_bar_level2")){
                var text_level1 = $(this).parents(".nav_bar_level2").prev("a").find("span").text();
                $(".content_route_pathname").text(">"+text_level1+">"+text_this);
            }
        }
    });
    //-------------------路径自动生成以及左侧导航结束------------------

});