/**
 * Created by Administrator on 2016/6/17.
 */
$(function(){

    //--------------------------------左侧相关-----------------------------

    //---------------背景图上传------------
    $(".form-group").delegate(".upload_img_bg","change",function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            bgImageUpload(".show_bg",picurl,filesize,size);
        }
    });


    //---------------指针图上传----------------
    $(".form-group").delegate(".upload_img_pointer","change",function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            bgImageUpload(".show_turntable_pointer",picurl,filesize,size);
        }
    });


    //--------------选择奖项数量-----------------
    $(".form-group").delegate(".dropdown-menu li a","click",function(){
        var text = $(this).text();
        var data_id = $(this).attr("data-id");
        $(this).parents(".form-group").find(".btn-dropdown>span").text(text);
        $(this).parents(".form-group").find(".dropdown").attr("data-id",data_id);
        prizeInputToggle(parseInt(data_id)+2);
        switch (text){
            case "3个奖项": $(".show_turntable_bg").show().attr("src","images/turntable_prize_three.png");
                break;
            case "4个奖项": $(".show_turntable_bg").show().attr("src","images/turntable_prize_four.png");
                break;
            case "5个奖项": $(".show_turntable_bg").show().attr("src","images/turntable_prize_five.png");
                break;
            case "6个奖项": $(".show_turntable_bg").show().attr("src","images/turntable_prize_six.png");
                break;
        }
    });


    //--------------动态改变奖项设置的隐藏与显示-------------
    function prizeInputToggle(number){
        $(".prize_input_box").hide().find("input").val("").trigger("keyup");
        for(var i=1;i<=number;i++){
            $(".prize_input_box"+i).show();
        }
    }


    //------------------奖项数量及概率的正则验证---------------
    $(".prize_input_box").delegate(".form-group input","blur",function(){
        var val = $(this).val();
        var index = $(this).parents(".form-group").index(".prize_input_box>.form-group");
        if(index%3 == 1){
            var result1 = regularExpression("positive_integers_zero",val);
            if(!result1){
                $(this).val("");
                alertShow("danger",3,"奖项数量必须为正整数(包含0)!");
            }
        }else if(index%3 == 2){
            var result2 = regularExpression("positive_integers_zero",val);
            if(!result2){
                $(this).val("");
                alertShow("danger",3,"奖项概率必须为正整数(包含0)!");
            }
        }
    });


    //----------抽奖次数和需要几次助力文字显示--------
    $(".form-group").delegate(".perman_perday_num,.helptimes_need,.perman_total_num","blur",function(){
        var val =$(this).val();
        var result = regularExpression("positive_integers",val);
        if (result) {
            if($(this).hasClass("perman_perday_num")){
                $(".show_turntable_lotterynum").show().text("您当前有"+val+"次机会");
            }else if($(this).hasClass("helptimes_need")){
                $(".show_turntable_neednum").show().text("离下次机会还需"+val+"次助力");
            }
        }else{
            $(this).val("");
            if($(this).hasClass("perman_perday_num")){
                $(".show_turntable_lotterynum").hide();
            }else if($(this).hasClass("helptimes_need")){
                $(".show_turntable_neednum").hide();
            }
            return false;
        }
    });


    //---------------分享图标--------------
    $(".form-group").delegate(".upload_img_sharelogo","change",function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            bgImageUpload(".show_share_logo",picurl,filesize,size);
        }
    });


    //---------------分享标题---------------
    $(".form-group").delegate("input.share_title","keyup",function(){
        var val = $(this).val();
        var len = val.length;
        if(len!=0){
            $(".show_share_title").show().text(val);
        }else{
            $(".show_share_title").hide().text("");
        }
    });


    //---------------分享描述---------------
    $(".form-group").delegate("input.share_des","keyup",function(){
        var val = $(this).val();
        var len = val.length;
        if(len!=0){
            $(".show_share_des").show().text(val);
            var valh = $(".show_share_des").height();
            $(".show_share_des").css("margin-top",(50-valh)/2+"px");
        }else{
            $(".show_share_des").hide().text("");
        }
    });


    //-------------是否需要助力------------
    $(".form-group").delegate(".radio-inline>input","click",function(){
        var val = $(this).val();
        if(val == 1){
            $(".show_btn_help").show();
            $(".show_btn_goplay").removeClass("show_btn_goplayonly");
        }else{
            $(".show_btn_help").hide();
            $(".show_btn_goplay").addClass("show_btn_goplayonly");
        }
    });


    //---------------助力页图片-----------------
    $(".form-group").delegate(".upload_img_help","change",function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            bgImageUpload(".show_helppage_bg",picurl,filesize,size);
        }
    });






    //-------------------------------右侧相关----------------------------

    //--------------活动说明相关-------------
    $(".right_show_box").delegate(".show_turntable_actdes","click",function(){
        var par = $(this).parents(".right_show_box");
        par.find(".show_mask_black").show();
        par.find(".show_rules_box").show();
    });

    //--------------点击蒙版消失------------
    $(".show_mask_black").click(function(){
        var par = $(this).parents(".right_show_box");
        par.find(".show_mask_black").fadeOut();
        par.find(".show_rules_box").fadeOut();
    });


    //---------------------------------保存和重置按钮-----------------------------

    //---------------表单验证-------------
    function zhuanpanFormValidation(){
        var state = true;
        $(".input_submit_need:visible").each(function(){
            var data_tips = $(this).attr("data-tips");
            var val = $(this).val();
            if(val == "" || val == null){
                window.scrollTo(0,0);
                alertShow("danger",3,data_tips);
                state = false;
            }
        });
        return state;
    }


    //----------------保存按钮和表单验证---------------
    $(".game_zhuanpan_opr").delegate(".btn_save","click",function(event){
        var result = zhuanpanFormValidation();
        if(!result){
            event.preventDefault();
        }else{
            alert("保存成功!");
        }
    });


    //-----------------重置按钮------------------
    $(".game_zhuanpan_opr").delegate(".btn_reset","click",function(){
        location.reload();
    });

});