/**
 * Created by Yangyue on 2016/11/7.
 */
$(function(){

    //----------------------红包等级、奖项等级选择-----------------------
    $(".dropdown").delegate("ul li a","click",function(){
        var text=$(this).text();
        var level=$(this).attr("data-id");
        var parent=$(this).parents(".dropdown");
        parent.find("span").eq(0).text(text);
        parent.attr("data-id",level);
        $(this).parents(".form-group").nextAll(".prize_input_box").each(function(){
            if($(this).index()<=parseInt(level)){
                $(this).show();
                console.log("v");
            }else{
                $(this).hide();
            }
        });
    });
    //----------------------红包等级、奖项等级选择-----------------------

    //----------------------初始化红包等级和奖项等级选择--------------------
    function initiate(){
        console.log("1");
        $(".dropdown").each(function(){
            var level=$(this).attr("data-id");
            $(this).parents(".form-group").nextAll(".prize_input_box").each(function(){
                if($(this).index()<=parseInt(level)){
                    $(this).show();
                    console.log("a");
                }else{
                    $(this).hide();
                }
            })
        });
    }
    initiate();
    //----------------------初始化红包等级和奖项等级选择--------------------

    //----------------------验证红包概率配置--------------------------------
    $(".basic_configure").delegate(".btn_save","click",function(){
        var probability=0;
        $(".red_probability").each(function(){
            if($(this).parents(".prize_input_box").css("display")!="none"){
                console.log($(this).val());
                probability += (parseInt($(this).val()));
            }
        });
        console.log(probability);
        if(probability != 100){
            $(".error_message").show();
        }else{
            $(".error_message").hide();
        }
    });
    //----------------------验证红包概率配置--------------------------------

    //----------------------导航条配置页面切换------------------------------
    $(".navbar-nav").delegate("li","click",function(){
        var index=$(this).index();
        console.log(index);
        $(".navbar-nav li").removeClass("active");
        $(this).addClass("active");
        //$(".main_configure_content").hide();
        $(".main_configure_content").each(function(){
            $(this).hide();
            console.log($(this).index());
            if(($(this).index()-1)==index){
                $(this).show();
            }
        });
    });
    //----------------------导航条配置页面切换------------------------------

    //----------------游戏入口页面--------------------------------------------------------
    //----------------------活动规则输入字数统计----------------------------
    $(".form-group").delegate(".activity_detail","keyup",function(){
        var text_length=$(this).val().trim().length;
        //var length=text.length;
        $(this).next(".message_span").text(text_length+"/300");
    });
    //----------------------活动规则输入字数统计----------------------------

    //---------------首页背景图片上传------------
    var count1=0;
    $(".game_frontpage .form-group").delegate(".upload_img_bg","change",function(){
        count1++;
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 50;
        if(picurl){
            if(count1==1){
                backgroundImageUpload(".game_frontpage .right_show_content",picurl,filesize,size);
                backgroundImageUpload(".game_register .right_show_content",picurl,filesize,size);
                backgroundImageUpload(".game_main .right_show_content",picurl,filesize,size);
            }else{
                backgroundImageUpload(".game_frontpage .right_show_content",picurl,filesize,size);
            }
        }
    });
    //---------------首页背景图片上传------------

    //---------------首页logo图片上传------------
    var count2=0;
    $(".game_frontpage .form-group").delegate(".upload_img_logo","change",function(){
        count2++;
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 50;
        if(picurl){
            if(count2==1){
                bgImageUpload(".game_frontpage .logo",picurl,filesize,size);
                bgImageUpload(".game_register .logo",picurl,filesize,size);
                bgImageUpload(".game_main .logo",picurl,filesize,size);
            }else{
                bgImageUpload(".game_frontpage .logo",picurl,filesize,size);
            }
        }
    });
    //---------------首页logo图片上传------------

    //---------------首页主视角图片上传------------
    var count3=0;
    $(".game_frontpage .form-group").delegate(".upload_img_main","change",function(){
        count3++;
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 50;
        if(picurl){
            if(count3==1){
                bgImageUpload(".game_frontpage .header_img",picurl,filesize,size);
                bgImageUpload(".game_main .header_img",picurl,filesize,size);
            }else{
                bgImageUpload(".game_frontpage .header_img",picurl,filesize,size);
            }
        }
    });
    //---------------首页主视角图片上传------------

    //---------------显示活动规则弹框------------------------
    $(".red_back").delegate(".activity_rule","click",function(){
        ruleShow(".game_frontpage");
    });
    //---------------显示活动规则弹框------------------------

    //---------------关闭活动规则弹框------------------------
    $(".game_frontpage").delegate(".mask_black","click",function(){
        ruleClose(this);
    });
    //---------------关闭活动规则弹框------------------------

    //----------------游戏入口页面--------------------------------------------------------

    //----------------注册页面--------------------------------------------------------
    //---------------背景图片上传------------
    $(".game_register .form-group").delegate(".upload_img_bg","change",function(){
        generalBackgroundImgUpload(this,".game_register");
    });
    //---------------背景图片上传------------

    //---------------logo图片上传------------
    $(".game_register .form-group").delegate(".upload_img_logo","change",function(){
        imgUpload(this,".game_register .logo");
    });
    //---------------logo图片上传------------
    //----------------注册页面--------------------------------------------------------

    //----------------------主页面---------------------------------------------------
    //---------------背景图片上传------------
    $(".game_main .form-group").delegate(".upload_img_bg","change",function(){
        generalBackgroundImgUpload(this,".game_main");
    });
    //---------------背景图片上传------------

    //---------------logo图片上传------------
    $(".game_main .form-group").delegate(".upload_img_logo","change",function(){
        imgUpload(this,".game_main .logo");
    });
    //---------------logo图片上传------------

    //---------------主视角图片上传------------
    $(".game_main .form-group").delegate(".upload_img_main","change",function(){
        imgUpload(this,".game_main .header_img");
    });
    //---------------主视角图片上传------------

    //---------------显示活动规则弹框------------------------
    $(".game_main .right_show_content").delegate(".activity_discipline","click",function(){
        ruleShow(".game_main");
    });
    //---------------显示活动规则弹框------------------------

    //---------------关闭活动规则弹框------------------------
    $(".game_main").delegate(".mask_black","click",function(){
        ruleClose(this);
    });
    //---------------关闭活动规则弹框------------------------
    //----------------------主页面---------------------------------------------------

    //----------------------分享页面-------------------------------------------------
    //---------------背景图片上传------------
    $(".game_share .form-group").delegate(".upload_img_bg","change",function(){
        generalBackgroundImgUpload(this,".game_share");
    });
    //---------------背景图片上传------------

    //---------------logo图片上传------------
    $(".game_share .form-group").delegate(".upload_img_logo","change",function(){
        imgUpload(this,".game_share .logo");
    });
    //---------------logo图片上传------------

    //---------------主视角图片上传------------
    $(".game_share .form-group").delegate(".upload_img_main","change",function(){
        imgUpload(this,".game_share .header_img");
    });
    //---------------主视角图片上传------------

    //---------------显示活动规则弹框------------------------
    $(".game_share .right_show_content").delegate(".activity_discipline","click",function(){
        ruleShow(".game_share");
    });
    //---------------显示活动规则弹框------------------------

    //---------------关闭活动规则弹框------------------------
    $(".game_share").delegate(".mask_black","click",function(){
        ruleClose(this);
    });
    //---------------关闭活动规则弹框------------------------
    //----------------------分享页面-------------------------------------------------


});

//----------------------初始化红包等级和奖项等级选择--------------------
function initiate(){
    console.log("1");
    $(".dropdown").each(function(){
        var level=$(this).attr("data-id");
        $(this).parents(".form-group").nextAll(".prize_input_box").each(function(){
            if($(this).index()<=parseInt(level)){
                $(this).show();
                console.log("a");
            }else{
                $(this).hide();
            }
        })
    });
}
//----------------------初始化红包等级和奖项等级选择--------------------

/*
 背景图片上传函数功能：根据上传的图片更换元素背景图片；
 参数：showclass:索要更换背景图片的元素的className;
 picurl:上传图片的的url;
 filesize:上传图片文件大小，单位M
 size:限制上传文件大小，单位M
 */
function backgroundImageUpload(showclass, picurl, filesize, size) {
    var showclass = showclass;
    var picurl = picurl;
    var filesize = filesize;
    var size = size;
    var limitsize = size * 1024 * 1000;
    if (filesize > limitsize) {
        alertShow("danger", 3, "图片不能大于" + size + "M!");
    } else {
        $(showclass).show().css("background-image", "url("+picurl+")");
        $(showclass).siblings(".upload_img_hideinput").val(picurl);
        alertShow("success", 3, "图片上传成功!");
    }
}

function ruleShow(itemClass){
    var p;
    var act_array=[];
    var activity_rule_text=$(".game_frontpage .activity_detail").val().trim();
    act_array=activity_rule_text.split("。");
    $(itemClass+" .activity_rules_text p").remove();
    console.log(act_array);
    for(var i=0;i<act_array.length;i++){
        if(act_array[i]==""){

        }else{
            p=$("<p></p>");
            p.text(parseInt(i+1)+"、"+act_array[i]);
            p.appendTo(itemClass+" .activity_rules_text");
        }

    }
    $(itemClass+" .mask_black").show();
    $(itemClass+" .activity_rules").show();
}

function ruleClose(item){
    $(item).hide();
    $(item).next(".activity_rules").hide();
}

function generalBackgroundImgUpload(item,itemClass){
    var picurl = getObjectURL(item.files[0]);
    var filesize = item.files[0].size;
    var size = 50;
    if(picurl){
        backgroundImageUpload(itemClass+" .right_show_content",picurl,filesize,size);
    }
}

function imgUpload(item,itemClass){
    var picurl = getObjectURL(item.files[0]);
    var filesize = item.files[0].size;
    var size = 50;
    if(picurl){
        bgImageUpload(itemClass,picurl,filesize,size);
    }
}