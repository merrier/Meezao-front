/*------------------被动添加自动回复 消息自动回复 关键词自动回复 保证页面刷新后根据url显示应该显示的样式------------------------*/
//$(document).ready(function(e) {
//TODO 这里的代码有必要吗??
//刷新保持样式
/*--------------------这里根本就没有必要写---------------------*/
/*$('.style_fresh_change').click(function(){
 //var style_id = $(this).attr('data-id');
 //var go_url = location.pathname+'?style_id='+style_id;
 //document.location.href=go_url;
 });*/
/*function init_auto(){
 var style_id = $("input[name='style_id']").attr('data-value');
 $("#lzm_style_"+style_id).removeClass("box_shadow").siblings().addClass("box_shadow");
 $(".box_content_main").eq(style_id-1).show().siblings(".box_content_main").hide();
 }
 init_auto();*/
//});
/*------------------------被动添加自动回复 消息自动回复 关键词自动回复 直接的页面切换 end---------------*/
function getFirstPage(searchInfo,type){
    $('.showpic_dialog_page2 span:eq(1)').addClass('showpic_current_page');
    $.ajax({
        type: 'GET',
        url: "Get_art",
        data: {
            page: '1',
            type:type,
            searchInfo: searchInfo
        },
        success: function (data) {
            if(type=='single'){
                $("#insert_flag2").nextAll().remove();
                for (var i = data.length - 1; i >= 0; i--) {
                    var html = '<div class="dialog_appmsg_item news_checked_lzm" data-id="' + data[i].id + '">' +
                        '<div class="dialog_appmsg_data">' +
                        '<div class="appmsg_item_content" style="color:black"> ' +
                        '<div class="news_style1_title">' + data[i].title + '</div>' +
                        '<div class="news_style1_pic" style="background-image:url('+ data[i].thumb_pic_url + ') "></div>' +
                        '<div class="pic_text" style="display: none">' + data[i].content + '</div>' +
                        '</div>' +
                        '<div class="appmsg_item_bgcheck">' +
                        '<i class="fa fa-check"></i>' +
                        ' </div>' +
                        '</div> ' +
                        '</div>';
                    $(html).insertAfter($("#insert_flag2"));
                }
            }
            else{
                $("#insert_flag2").nextAll().remove();
                for (var i = data.length - 1; i >= 0; i--) {
                    var html='';
                    html+=  '<div class="dialog_appmsg_item news_checked_lzm" data-id="' + data[i][0].more_id + '">' +
                        '<div class="dialog_appmsg_data"> ' +
                        '<div class="appmsg_item_content" style="color:black">' +
                        '<div class="cover_appmsg_item"> ' +
                        '<h4 class="appmsg_title js_title" name="3592"> ' +
                        '<a class="" target="_blank">' +data[i][0].title+'</a> ' +
                        '</h4> ' +
                        '<div class="appmsg_thumb_wrp" style="background: url(\''+ data[i][0].thumb_pic_url + '\')">' +
                        '</div> ' +
                        '</div>';
                    for(var j=1;j<data[i].length;j++){
                        html+=              '<div class="appmsg_item"> ' +
                            '<div class="appmsg_thumb_wrp" style="background: url(\''+ data[i][j].thumb_pic_url + '\')"> ' +
                            '</div> ' +
                            '<h4 class="appmsg_title js_title" name="3593"> ' +
                            '<a class="appmsg_t_a" target="_blank">' +data[i][j].title+'</a>' +
                            '</h4> ' +
                            '</div>';
                    }
                    html+='<div class="appmsg_item_bgcheck">' +
                        '<i class="fa fa-check"></i>' +
                        '</div> ' +
                        '</div> ' +
                        '</div> ' ;
                    $(html).insertAfter($("#insert_flag2"));
                }
            }
        },
        error: function () {
            alert('执行错误,请正确操作');
        }
    });
}
function getInfo(searchInfo,type){
    var count2=0;
    $.ajax({
        type: 'GET',
        url: "get_count",
        data: {
            searchInfo: searchInfo,
            type:type
        },
        success: function (data) {
            count2=data;
            var page2 = parseInt(count2 / 8);
            if ((count2 - page2 * 8) > 0) {
                page2 += 1;
            } else if (count2 == 0) {
                page2 = 1;
            }
            if (page2 == 1) {
                $('.showpic_previous_page2').addClass('showpic_page_disabled');
                $('.showpic_next_page2').addClass('showpic_page_disabled');
            }
            $('<span class=" showpic_previous_page2 showpic_page_disabled">上一页</span> <span class="showpic_current_page">1</span> <span class="showpic_next_page2">下一页</span>').insertAfter($('#count_more_articles'));
            for (var i = 2; i <= page2; i++) {
                $("<span>" + i + "</span>").insertBefore($('.showpic_next_page2'));
            }
            $('.d_reply .showpic_dialog_page2 span:not(".showpic_previous_page2,.showpic_next_page2")').click(function () {
                $(this).addClass("showpic_current_page").siblings().removeClass('showpic_current_page');
            })
            $('.d_reply .showpic_dialog_page2 span').click(function () {
                //alert('我是点击事件');
                var current_page = 1;
                if ($(this).hasClass('showpic_page_disabled')) {
                } else {
                    if($(this).html()=='上一页'){
                        //alert('上一页');
                        if (!$('.showpic_previous_page2').hasClass('showpic_page_disabled')) {
                            if ($('.d_reply .showpic_dialog_page2').find('.showpic_current_page').html() != 1) {
                                $('.d_reply .showpic_dialog_page2').find('.showpic_current_page').removeClass('showpic_current_page').prev().addClass('showpic_current_page');
                            }
                        }
                    }else if($(this).html()=='下一页'){
                        //alert('下一页');
                        if (!$('.showpic_next_page2').hasClass('showpic_page_disabled')) {
                            if ($('.d_reply .showpic_dialog_page2').find('.showpic_current_page').html() != page2) {
                                $('.d_reply .showpic_dialog_page2').find('.showpic_current_page').removeClass('showpic_current_page').next().addClass('showpic_current_page');
                            }
                        }
                    }
                    if ($(this).html() == page2) {//alert('page2');
                        $('.showpic_next_page2').addClass('showpic_page_disabled');
                        $('.showpic_previous_page2').removeClass('showpic_page_disabled');
                    } else if ($(this).html() == 1) {//alert('1');
                        $('.showpic_previous_page2').addClass('showpic_page_disabled');
                        $('.showpic_next_page2').removeClass('showpic_page_disabled');
                    } else if ($(this).html() == 1 && $(this).html() == page2) {//alert('1page2')
                        $('.showpic_previous_page2').addClass('showpic_page_disabled');
                        $('.showpic_next_page2').addClass('showpic_page_disabled');
                    } else {//alert('otherpage')
                        $('.showpic_next_page2').removeClass('showpic_page_disabled');
                        $('.showpic_previous_page2').removeClass('showpic_page_disabled');
                    }
                    current_page = $('.d_reply .showpic_dialog_page2').find('.showpic_current_page').html();
                    $.ajax({
                        type: 'GET',
                        url: "Get_art",
                        data: {
                            page: current_page,
                            type:type,
                            searchInfo: searchInfo
                        },
                        success: function (data) {
                          //  alert('test')
                            if(type=='single'){
                                $("#insert_flag2").nextAll().remove();
                                for (var i = data.length - 1; i >= 0; i--) {
                                    var html = '<div class="dialog_appmsg_item news_checked_lzm" data-id="' + data[i].id + '">' +
                                        '<div class="dialog_appmsg_data">' +
                                        '<div class="appmsg_item_content" style="color:black"> ' +
                                        '<div class="news_style1_title">' + data[i].title + '</div>' +
                                        '<div class="news_style1_pic" style="background-image:url('+ data[i].thumb_pic_url + ') "></div>' +
                                        '<div class="pic_text" style="display: none">' + data[i].content + '</div>' +
                                        '</div>' +
                                        '<div class="appmsg_item_bgcheck">' +
                                        '<i class="fa fa-check"></i>' +
                                        ' </div>' +
                                        '</div> ' +
                                        '</div>';
                                    $(html).insertAfter($("#insert_flag2"));
                                }
                            }
                            else{
                                $("#insert_flag2").nextAll().remove();
                                for (var i = data.length - 1; i >= 0; i--) {
                                    var html='';
                                    html+=  '<div class="dialog_appmsg_item news_checked_lzm" data-id="' + data[i][0].more_id + '">' +
                                        '<div class="dialog_appmsg_data"> ' +
                                        '<div class="appmsg_item_content" style="color:black">' +
                                        '<div class="cover_appmsg_item"> ' +
                                        '<h4 class="appmsg_title js_title" name="3592"> ' +
                                        '<a class="" target="_blank">' +data[i][0].title+'</a> ' +
                                        '</h4> ' +
                                        '<div class="appmsg_thumb_wrp" style="background: url(\''+ data[i][0].thumb_pic_url + '\')">' +
                                        '</div> ' +
                                        '</div>';
                                    for(var j=1;j<data[i].length;j++){
                                        html+=              '<div class="appmsg_item"> ' +
                                            '<div class="appmsg_thumb_wrp" style="background: url(\''+ data[i][j].thumb_pic_url + '\')"> ' +
                                            '</div> ' +
                                            '<h4 class="appmsg_title js_title" name="3593"> ' +
                                            '<a class="appmsg_t_a" target="_blank">' +data[i][j].title+'</a>' +
                                            '</h4> ' +
                                            '</div>';
                                    }
                                    html+='<div class="appmsg_item_bgcheck">' +
                                        '<i class="fa fa-check"></i>' +
                                        '</div> ' +
                                        '</div> ' +
                                        '</div> ' ;
                                    $(html).insertAfter($("#insert_flag2"));
                                }
                            }
                        },
                        error: function () {
                            alert('执行错误,请正确操作');
                        }
                    });
                    return false;
                }
            })
        },
        error: function () {
            alert('获取信息失败');
        }
    });
}
function getType(){
    if($('.single').hasClass('selected')){
        return 'single';
    }else{
        return 'more';
    }
}

$(function () {
    var type='single';
    var searchInfo='';
    getInfo(searchInfo,type);
    $('.dialog_search_btn').click(function(){
        $('.showpic_dialog_page2 span').remove();
        type=getType();
        searchInfo=$('.dialog_search_input').val().trim();
        getFirstPage(searchInfo,type);
        getInfo(searchInfo,type);
    })
    $('.single').click(function(){
        $('.showpic_dialog_page2 span').remove();
        type='single';
        getFirstPage(searchInfo,type);
        getInfo(searchInfo,type);
    })
    $('.more').click(function(){
        $('.showpic_dialog_page2 span').remove();
        type='more';
        getFirstPage(searchInfo,type);
        getInfo(searchInfo,type);
    })
    /*---------------------------关键字自动回复修改图文信息 这里是跟自动回复的id相关------------------------------------------*/
    //TODO 这里的作用我不是很懂
    $('.edit_news_content').click(function () {
        var news_id = $(this).attr('data-id');
        $("input[name='news_id_edit']").attr('data-id', news_id);
    });
    /*---------------------------关键字自动回复修改图文信息 end------------------------------------------*/

    /*---------------------------被动添加自动回复 消息自动回复 关键词自动回复点击切换--------------------------------------------------*/
    $(".content_title").click(function () {
        var $index = $(".content_title").index(this);
        if($index==2){
            $(".navbar_right_second").show();
            $(".navbar_right_first").hide();
            $(".btn_main_choice_item").eq(0).addClass("choice_chosen");
            $(".btn_main_choice_item").eq(1).removeClass("choice_chosen");
        }else{
            $(".navbar_right_first").show();
            $(".navbar_right_second").hide();
        }
        $(this).addClass("active").siblings().removeClass("active");
        $(".box_content_main").eq($index).show().siblings(".box_content_main").hide();
    });
    /*---------------------------被动添加自动回复 消息自动回复 关键词自动回复点击切换 end--------------------------------------------------*/

    //------------------文字/图片点击切换------------------
    $(".btn_main_choice_item").click(function () {
        var $index = $(".btn_main_choice_item").index(this);
        $(".box_content_main:visible").find(".content_main_showbox").eq($index).show();
        $(".box_content_main:visible").find(".content_main_showbox").eq($index).siblings(".content_main_showbox").hide();
        $(this).addClass("choice_chosen")
            .siblings().removeClass("choice_chosen");
    })
    //------------------文字/图片点击切换 end------------------

    //------------------数字统计------------------
    $(".main_show_textarea").keyup(function () {
        var $val = $(this).val();
        var $length = $val.length;
        var $parent = $(this).parents(".content_main_showbox");
        $parent.find(".show_tips_number").text("600" - $length);
    });
    //------------------数字统计  end------------------


    //------------------图片上传及预览----------------
    $(".show_btn_input").change(function () {
        var picurl = getObjectURL(this.files[0]);
        var $content = $(this).parents(".content_main_show");
        if (picurl) {
            $content.find(".main_show_box").hide();
            $content.find(".main_show_preview").show();
            $content.find(".show_preview_picbox img").attr("src", picurl);
        }
    });
    //------------------图片上传及预览 end----------------


    //------------------获取图片url地址---------------
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };
    //------------------获取图片url地址 end---------------

    //------------------清除内容 文字 图片-----------------
    $(".main_footer_clear").click(function () {
        $(".content_main_showbox").each(function () {
            if ($(this).is(":visible")) {
                if ($(this).find(".main_show_tips").is(":visible")) {
                    $(this).find(".main_show_textarea").val("");
                    $(this).find(".show_tips_number").text("600");
                }
                ;
                if ($(this).find(".main_show_preview").is(":visible")) {
                    $(this).find(".main_show_preview").hide();
                    $(this).find(".main_show_box").show();
                }
                ;

            }
            ;
        });
    });
    //------------------清除内容 文字 图片 end-----------------

    /*------------------------------------------------------------规则名相关操作----------------------------------------------------------------------------------------------*/
    //------------------规则名数字统计及动态显示-----------------
    $(".detail_name_input").keyup(function () {
        var $val = $(this).val();
        var $length = $val.length;
        $(this).parent(".detail_name_box").find(".name_tips_number").text("60" - $length);
        $(this).parents(".content_rules_main").children(".rules_main_title").find("span").text($val);
        $(this).parents(".rules_detail_box").children(".rule_sure").show();
    });
    //------------------规则名数字统计及动态显示 end-----------------

    //------------------规则标题点击 是否显示内容详情-------------------
    $(".rules_main_title").click(function () {
        var $parent = $(this).parent(".content_rules_main");
        $parent.children(".rules_main_overview").toggle();
        $parent.children(".rules_main_detail").toggle();
    });
    //------------------规则标题点击 是否显示内容详情 end-------------------

    //--------------------删除规则-----------------------
    $(".rules_title_delete").click(function () {
        $(this).parent(".rules_main_title").unbind("click");
        $(this).parents(".content_rules_main").remove();
        $(".content_rules_main").each(function () {
            var $index = $(this).index() + 1;
            $(this).children(".rules_main_title").find("em").text("规则" + $index + ":");
        });
    });
    //--------------------删除规则 end-----------------------

    //--------------------添加规则 前端控制-----------------------
    /*-----------------添加新规则时确保之前的规则都有规则名------------------*/
    $(".add_rules_btn").click(function () {
        var $length = $(".content_rules_main").length;
        if ($length === 0) {
            $(".content_rules_mainnew").clone(true).prependTo(".content_rules_all").addClass("content_rules_main").removeClass("content_rules_mainnew").show();
        } else {
            var $val = $(".content_rules_main").eq(0).find(".detail_name_input").val();
            if ($val === "" || $val === null) {
                alert("请确保规则名不为空！");
            } else {
                $(".content_rules_mainnew").clone(true).prependTo(".content_rules_all").addClass("content_rules_main").removeClass("content_rules_mainnew").show();
                $(".content_rules_main").each(function () {
                    var $index = $(this).index() + 1;
                    $(this).children(".rules_main_title").find("em").text("规则" + $index + ":");
                });
            };
        };
    });
    /*-----------------添加新规则时确保之前的规则都有规则名 end------------------*/
    //*------------------------------确定添加规则名--------------------------*/
    $(".rule_sure").click(function () {
        var $val = $(this).parents(".rules_detail_box").find(".detail_name_input").val();
        if ($val == "" || $val == null) {
            //alert("请输入规则名！");
            alertShow(0,2,"请输入规则名！");
        } else {
            $(this).hide();
        }
    });
    //*------------------------------确定添加规则名 end--------------------------*/
    /*------------------------------------------------------------规则名相关操作 end----------------------------------------------------------------------------------------------*/

    /*------------------------------------------------------------关键字相关操作----------------------------------------------------------------------------------------------*/
    //--------------------添加关键字 且添加关键字前确保规则名被确定-------------------
    $(".detail_add_keywords").click(function () {
        var $sure = $(this).parents(".rules_main_detail").find(".rule_sure_new_lzm");
        if ($sure.is(":visible")) {
            alert("请确认规则名！")
        } else {
            $(".add_bgall").fadeIn();
            $(".keywords_dialog").fadeIn();
            var $anc = $(this).parents(".rules_detail_keywords").children(".detail_keywords_content");
            var $anclist = $(this).parents(".content_rules_main").find(".label_keywords_list");
            $anc.addClass("detail_keywords_contentonly");
            $anclist.addClass("label_keywords_listonly");
        }
    });
    //--------------------添加关键字 且添加关键字前确保规则名被确定 end-------------------

    //--------------------编辑关键字------------------
    //TODO 在编辑关键字的时候判断规则名真的有意义吗?
    var $ind;
    $(".keywords_opr_edit").click(function () {
        var $val = $(this).parents(".rules_main_detail").find(".detail_name_input").val();
        if ($val == "" || $val == null) {
            //alert("请输入规则名！")
            alertShow(0,2,"请输入规则名！");
        } else {
            var $anc = $(this).parents(".detail_keywords_item").children(".detail_keywords_name");
            var $index = $(".keywords_opr_edit").index(this);
            $ind = $index;
            $anc.addClass("detail_keywords_nameonly");
            $('.edit_keyword_text').text($anc.html().trim());
            $(".modkey_dialog").fadeIn();
            $(".add_bgall").fadeIn();
        }
        ;
    });
    //--------------------编辑关键字 end------------------

    //---------------------关键字删除----------------------
    $(".keywords_opr_delete").click(function () {
        var $index = $(".keywords_opr_delete").index(this);
        $ind = $index;
        $(this).parents(".content_rules_main").find(".label_keywords_item").eq($ind - 1).remove();
        $(this).parents(".detail_keywords_item").remove();

    });
    //---------------------关键字删除 end----------------------

    //--------------------关键字字数统计-----------------------
    $(".keywords_dialog_textarea").keyup(function () {
        var $length = 30 - $(this).val().length;
        var $parent = $(this).parents(".keywords_dialog_content")
        $parent.children(".keywords_dialog_tips").find(".keywords_tips_number").text($length);
    });
    //--------------------关键字字数统计 end-----------------------

    /*------------------------------------------------------------关键字相关操作 end----------------------------------------------------------------------------------------------*/


    //--------------------dialog通用-------------------
    //点击关闭按钮或取消按钮
    $(".dialog_title i,.btn_cancel").click(function () {
        $(this).parents(".common_dialog").fadeOut();
        $(".add_bgall").fadeOut();
        $(".detail_keywords_content").removeClass("detail_keywords_contentonly");
        $(".label_keywords_list").removeClass("label_keywords_listonly");
        $(".detail_keywords_name").removeClass("detail_keywords_nameonly");
        $(".rules_show_content").removeClass("rules_show_contentonly");
        $(".showpic_dialog_tips").hide();
        $(".showpic_picitem_bg").hide();
        $(".showpicword_btn_confirm").removeClass("btn_ok");
        $(".showpic_tips_number").text("0");
    });
    //--------------------dialog通用 end-------------------

    //TODO 存在问题 先注释
    //--------------------回车添加关键字 ---------------------
    /*	$(".keywords_dialog_textarea").keydown(function(e){
     var $val1 = $(this).val();
     if(e.keyCode == 13){
     if($val1 ==""||$val1 ==null){
     return false;
     }else{
     var $val = $(this).val();
     $(".add_tag_labelnew").clone(true).appendTo(".keywords_add_tag")
     .addClass("add_tag_label").removeClass("add_tag_labelnew")
     .children(".add_tag_text").text($val);
     $(this).val("").focus();
     // return false;
     e.preventDefault();
     };
     };
     });*/

    //TODO 貌似并没有什么用 先注释掉
   /* //--------------------关键字删除-----------------------
    $("body").on("click", ".add_tag_label i", function () {
        $(this).parent(".add_tag_label").remove();
    });
*/
    //---------------添加/编辑 文字、图片、图文dialog-----------------
    $(".rules_show_item").click(function () {
        var $sure = $(this).parents(".rules_main_detail").find(".rule_sure_new_lzm");
        var getCon='';
       if($(this).parents(".rules_detail_show").find(".show_content_boxword").is(':visible')){
           getCon = $(this).parents(".rules_detail_show").find(".show_content_name").html().trim();
       }
        if ($sure.is(":visible")) {
            //alert("请确认规则名！")
            alertShow(0,2,"请输入规则名！");
        } else {
            var $text = $(this).text();
            var $con = $(this).parents(".rules_detail_show").children(".rules_show_content");
            console.log($text);
            if ($text == "文字") {
                $(".showword_dialog").fadeIn();
                $(".add_bgall").fadeIn();
                $con.addClass("rules_show_contentonly");
                $(".showword_dialog_textarea").val(getCon);
            } else if ($text == "图片") {
                $(".showpic_dialog").fadeIn();
                $(".add_bgall").fadeIn();
                $con.addClass("rules_show_contentonly");
            } else if ($text == "图文") {
                $(".showpicword_dialog").fadeIn();
                $(".add_bgall").fadeIn();
                $con.addClass("rules_show_contentonly");
            }
        }
    });
    //---------------添加/编辑 文字、图片、图文dialog end-----------------

    /*---------------------------------关键字自动回复图片分页----------------------------------------------------*/
    var count = $('#count_pic').html();
    var page = parseInt(count / 8);
    if ((count - page * 8) > 0) {
        page += 1;
    } else if (count == 0) {
        page = 1;
    }
    if (page == 1) {
        $('.showpic_previous_page1').addClass('showpic_page_disabled');
        $('.showpic_next_page1').addClass('showpic_page_disabled');
    }
    for (var i = 2; i <= page; i++) {
        $("<span>" + i + "</span>").insertBefore($('.showpic_next_page1'));
    }
    $('.d_reply .showpic_dialog_page1 span:not(".showpic_previous_page1,.showpic_next_page1")').click(function () {
        $(this).addClass("showpic_current_page").siblings().removeClass('showpic_current_page');
    })
    $('.showpic_previous_page1').click(function () {
        if (!$('.showpic_previous_page1').hasClass('showpic_page_disabled')) {
            $('.d_reply .showpic_dialog_page1 span').each(function () {
                if ($(this).hasClass('showpic_current_page')) {
                    if ($(this).html() != 1) {
                        $(this).removeClass('showpic_current_page').prev().addClass('showpic_current_page');
                    }
                }
            })
        }
    })
    $('.showpic_next_page1').click(function () {
        if (!$('.showpic_next_page1').hasClass('showpic_page_disabled')) {
            $('.d_reply .showpic_dialog_page1 span').each(function () {
                if ($(this).hasClass('showpic_current_page')) {
                    if ($(this).html() != page) {
                        $(this).removeClass('showpic_current_page').next().addClass('showpic_current_page');
                        return false;
                    }
                }
            })
        }
    })
    $('.d_reply .showpic_dialog_page1 span').click(function () {
        var current_page = 1;
        if ($(this).hasClass('showpic_page_disabled')) {
        } else {
            $('.d_reply .showpic_dialog_page1 span').each(function () {
                if ($(this).hasClass('showpic_current_page')) {
                    current_page = $(this).html();
                    if ($(this).html() == page) {
                        $('.showpic_next_page1').addClass('showpic_page_disabled');
                        $('.showpic_previous_page1').removeClass('showpic_page_disabled');
                    } else if ($(this).html() == 1) {
                        $('.showpic_previous_page1').addClass('showpic_page_disabled');
                        $('.showpic_next_page1').removeClass('showpic_page_disabled');
                    } else if ($(this).html() == 1 && $(this).html() == page) {
                        $('.showpic_previous_page1').addClass('showpic_page_disabled');
                        $('.showpic_next_page1').addClass('showpic_page_disabled');
                    } else {
                        $('.showpic_next_page1').removeClass('showpic_page_disabled');
                        $('.showpic_previous_page1').removeClass('showpic_page_disabled');
                    }
                    $.ajax({
                        type: 'GET',
                        url: "Get_pic",
                        data: {
                            page: current_page
                        },
                        success: function (data) {
                            $("#insert_flag").nextAll().remove();
                            for (var i = data.length - 1; i >= 0; i--) {
                                var html = "<li class='showpic_dialog_picitem auto_reply_picture' data-id='" + data[i].matter_url + "'> <img src='" + data[i].matter_url + "'/> <p>" + data[i].name + "</p> <div class='showpic_picitem_bg'> <i class='fa fa-check'></i> </div> </li>";
                                $(html).insertAfter($("#insert_flag"));
                            }
                        },
                        error: function () {
                            alert('执行错误,请正确操作');
                        }
                    });
                    return false;
                }
            })
        }
    })
    /*---------------------------------关键字自动回复图片分页 end----------------------------------------------------*/

    /*------------------------------------关键字自动回复文字-------------------------------------------------------------------*/
    //--------------------添加回复文字字数统计-----------------------
    $(".showword_dialog_textarea").keyup(function () {
        var $length = 300 - $(this).val().length;
        var $parent = $(this).parents(".showword_dialog_content")
        $parent.children(".showword_dialog_tips").find(".showword_tips_number").text($length);
    });
    //--------------------添加回复文字字数统计 end-----------------------

    //---------------确定回复文字--------------------
    $(".showword_btn_confirm").click(function () {
        var $val = $(".showword_dialog_textarea").val();
        if ($val == "" || $val == null) {
            alert("回复文字不能为空");
            return false;
        } else {
            $(".show_content_boxwordnew").eq(0).clone().appendTo(".rules_show_contentonly").addClass("show_content_boxword").removeClass("show_content_boxwordnew").show().siblings(".show_content_boxword").remove();
            $(".rules_show_contentonly .reply_del_text").remove();
            $(".rules_show_contentonly").children(".show_content_boxword").show().siblings().hide();
            $(".rules_show_contentonly").find(".show_content_name").text($val);
            $(".rules_show_contentonly").parents(".content_rules_main").find(".label_reply_info").html("1条文字消息");
            $(".rules_show_content").removeClass("rules_show_contentonly");
            $(".showword_dialog").fadeOut();
            $(".add_bgall").fadeOut();
            //$(".showword_dialog_textarea").val('');
        }
    });
    //---------------确定回复文字 end--------------------

    //--------------------编辑回复文字字数统计-----------------------
    $(".alterword_dialog_textarea").keyup(function () {
        var $length = 300 - $(this).val().length;
        var $parent = $(this).parents(".alterword_dialog_content")
        $parent.children(".alterword_dialog_tips").find(".alterword_tips_number").text($length);
    });
    //--------------------编辑回复文字字数统计 end-----------------------

    //---------------确定编辑回复文字--------------------
    $(".alterword_btn_confirm").click(function () {
        var $val = $(".alterword_dialog_textarea").val();
        if ($val == "" || $val == null) {
            alert("回复文字不能为空");
            return false;
        } else {
            $(".rules_show_contentonly").find(".show_content_name").text($val);
            $(".rules_show_content").removeClass("rules_show_contentonly");
            $(".alterword_dialog").fadeOut();
            $(".add_bgall").fadeOut();
        }
    });
    //--------------------确定编辑回复文字 end--------------------

    /*------------------------------------关键字自动回复文字 end-------------------------------------------------------------------*/


    //-----------删除回复文字、图片、图文 在不刷新页面的前提下会显示无回复内容---------------
    //TODO 在刷新的情况下如何保持获取回复信息的状态
    $("body").on("click", ".show_opr_delete", function () {
        $(this).parents(".content_rules_main").find(".label_reply_info").html("无回复内容");
        $(this).parents(".show_content_box").hide();
    });
    //-----------删除回复文字、图片、图文 在不刷新页面的前提下会显示无回复内容 end---------------

    //--------------------关键字自动回复选择图片---------------------
    $("body").on("click", ".showpic_dialog_picitem", function () {
        $(this).children(".showpic_picitem_bg").show();
        $("showpic_tips_number").text("1");
        $(this).siblings().children(".showpic_picitem_bg").hide();
    });
    $(".showpic_btn_confirm").click(function () {
        var text = $(".showpic_tips_number").text();
        if (text == '') {
            alert("请选择图片！");
        } else {
            $(".showpic_dialog_picitem").each(function () {
                if ($(this).children(".showpic_picitem_bg").is(":visible")) {
                    $("input[name='auto_reply_picture']").attr('data-value-id', $(this).children("img").attr("src"));
                    var $src = $(this).children("img").attr("src");
                    $(".show_content_boxpicnew").eq(0).clone().appendTo(".rules_show_contentonly").addClass("show_content_boxpic").removeClass("show_content_boxpicnew").show().siblings(".show_content_boxpic").remove();
                    $('.rules_show_contentonly .reply_del_img').remove();
                    $(".rules_show_contentonly").children(".show_content_boxpic").show().siblings().hide();
                    $(".rules_show_contentonly").children(".show_content_boxpic").attr("src", $src);
                    $(".rules_show_contentonly").children(".show_content_boxpic").find(".content_box_info").find("img").attr("src", $src);
                    $(".rules_show_contentonly").parents(".content_rules_main").find(".label_reply_info").html("1条图片消息");
                    $(".rules_show_content").removeClass("rules_show_contentonly");
                    $(".showpic_tips_number").text("0");
                    $(".showpic_dialog").fadeOut();
                    $(".add_bgall").fadeOut();
                }
            });
        }
    });
    //--------------------关键字自动回复选择图片 end---------------------

    //--------------------添加回复图文-------------------
    //搜索框点击删除时删除搜索框内容
    $(".dialog_search_close").click(function () {
        $(".dialog_search_input").val("");
    });
    //TODO 图文的hover功能有问题 需要修改 缺失appmsg_item_bg
    $(".dialog_appmsg_data").hover(function () {
        if ($(this).children(".appmsg_item_bgcheck").is(":hidden")) {
            $(".appmsg_item_bg").hide();
            $(this).children(".appmsg_item_bg").show();
        }
    }, function () {
        if ($(this).children(".appmsg_item_bgcheck").is(":hidden")) {
            $(this).children(".appmsg_item_bg").hide();
        }
    });

    //点击图文时添加选中的蒙层
    $("body").on("click", ".dialog_appmsg_data", function () {
        $(".appmsg_item_bgcheck").hide();
        $(this).addClass('this_checked').siblings().removeClass('this_checked');
        $(this).children(".appmsg_item_bg").hide();
        $(this).find(".appmsg_item_bgcheck").show();
        $(this).parents(".showpicword_dialog").find(".showpicword_btn_confirm").addClass("btn_ok");
    });


    //------------------------------被添加自动回复和消息自动回复相关--------------------------------------------
    //TODO 现在这两个自动回复只能通过刷新解决回复方式切换时出现的bug 这里有待用前端解决这个问题
    //判断是上传图片还是文字(存贮判断信息)图片
    $('.choice_img_1').click(function () {
        var img_logic = $(this).attr('data-id');//判断是上传图片还是文字(存贮判断信息)图片
        $("input[name='store_logic_1']").attr('data-value-id', img_logic);
    });
    //判断是上传图片还是文字(存贮判断信息)图片
    $('.choice_text_1').click(function () {
        var img_logic = $(this).attr('data-id');//判断是上传图片还是文字(存贮判断信息)文字
        $("input[name='store_logic_1']").attr('data-value-id', img_logic);
    });

    $('.main_footer_save_1').click(function () {
        $()
        var main_text_1 = $('.main_show_textarea_lzm1').val();  //被添加自动回复
        var logic_text_img = $("input[name='store_logic_1']").attr('data-value-id');
        //alert(logic_text_img);
        if (logic_text_img == '2') {
            //$('#argform').submit();
            var fd = new FormData($('#argform')[0]);
            $.ajax({
                type: 'POST',
                url: "Upload_picture",
                data: fd,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert(data);
                    $('.main_show_textarea_lzm1').val('');
                    $('.show_tips_number').eq(0).html(600);
                },
                error: function () {
                    alert('执行错误,请正确操作----');
                }
            })
        } else {
            $.ajax({
                type: 'POST',
                url: "First_reply",
                data:{text_content:main_text_1},
                success: function (data) {
                    alert(data);
                    $(".main_preview1").hide();
                    $('.main_footer_save_1').parents(".box_content_main").find('.main_show_box').show();
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }
    });
    $('.lzm_delete_1').click(function () {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: "First_reply_del",
            data: "id=" + id,
            success: function (data) {
                alert('删除成功');
                //var goto_url = location.href;
                //document.location.href = goto_url;
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });

    $('.choice_img_2').click(function () {
        var img_logic = $(this).attr('data-id');//判断是上传图片还是文字(存贮判断信息)图片
        $("input[name='store_logic_2']").attr('data-value-id', img_logic);
        //alert(img_logic);
    });
    $('.choice_text_2').click(function () {
        var img_logic = $(this).attr('data-id');//判断是上传图片还是文字(存贮判断信息)文字
        $("input[name='store_logic_2']").attr('data-value-id', img_logic);
        //alert(img_logic);
    });
    $('.main_footer_save_2').click(function () {
        var main_text_2 = $('.main_show_textarea_lzm2').val();
        var logic_text_img = $("input[name='store_logic_2']").attr('data-value-id');
        if (logic_text_img == '2') {
            //$('#argform_2').submit();
            var fd = new FormData($('#argform_2')[0]);
            $.ajax({
                type: 'POST',
                url: "Upload_picture_2",
                data: fd,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert(data);
                    $('.main_show_textarea_lzm2').val('');
                    $('.show_tips_number').eq(1).html(600);
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            })
        } else {
            $.ajax({
                type: 'POST',
                url: "Second_reply",
                data: {text_content:main_text_2},
                success: function (data) {
                    alert(data);
                    $(".main_preview2").hide();
                    $('.main_footer_save_2').parents(".box_content_main").find('.main_show_box').show();
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }
    });
    $('.lzm_delete_2').click(function () {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: "Second_reply_del",
            data: "id=" + id,
            success: function (data) {
                alert('删除成功');
                //var goto_url = location.href;
                //document.location.href = goto_url;
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });
    $(".rule_sure_new_lzm").click(function () {
        var rule = $(this).parent().children('.detail_name_box').find("input[name='rule_name']").val()
        $btn = $(this);
        if(rule){
            $.ajax({
                type: 'POST',
                url: "Rule_add",
                data: "rule_name=" + rule,
                success: function (data) {
                    $("input[name='rule_id']").attr('data-id', data);
                    $btn.attr('data-rule-id', data);
                    alert("规则名添加成功")
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }
    });
    //------------------------------被添加自动回复和消息自动回复相关 end--------------------------------------------

    //给修改关键字添加关键字赋值 这个值是规则名所在表的id值
    $('.edit_add_keywords').click(function () {
        var data_id = $(this).attr('data-id');
        $("input[name='rule_id_eidt']").attr('data-id', data_id);
    });
    //添加关键字
    $('.keyword_sure').click(function () {
        $("input[name='rule_id']").attr('data-id', ($(".detail_keywords_contentonly").parent().siblings('.rules_detail_box').find('.rule_sure').attr('data-rule-id')));
        var keyword_text = $('.keyword_text').val().trim();
        var rule_id = $("input[name='rule_id']").attr('data-id');
        //var rule_id_eidt = $("input[name='rule_id_eidt']").attr('data-id');
        if(keyword_text){
            $.ajax({
                type: 'POST',
                url: "Keyword_add",
                data: "keywords=" + keyword_text + '&rule_id=' + rule_id,
                success: function (data) {
                    alert(data);
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }else{
            //alert('关键字不能为空');
            alertShow(0,2,"关键字不能为空！");
        }
    });
    //编辑关键字
    $('.edit_keyword_lzm').click(function () {
        var rule_id_edit = $("input[name='rule_id_eidt']").attr('data-id');
        var keyword_text = $('.edit_keyword_text').val().trim();
        if(keyword_text){
            $.ajax({
                type: 'POST',
                url: "Edit_keywords",
                data: 'rule_id_edit=' + rule_id_edit + '&keyword_name=' + keyword_text,
                success: function (data) {
                    alert(data);
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }else{
            //alert('关键字不能为空');
            alertShow(0,2,"关键字不能为空！");
        }
    })
    //--------------------关键字自动回复文字内容如确认--------------------------
    $('.text_sure').click(function () {
        $("input[name='rule_id']").attr('data-id', ($(".rules_show_contentonly").parent().siblings('.rules_detail_box').find('.rule_sure').attr('data-rule-id')));
        var text_message = $('.text_meseage').val();//回复文字内容
        var rule_id = $("input[name='rule_id']").attr('data-id');//规则id
        var edit_rule_id = $("input[name='edit_text_img_news_reply']").attr('data-id');//修改规则id
        //alert('rule_id:'+rule_id);
        //alert('edit_rule_id:'+edit_rule_id);
        var ajax_rule_id = rule_id;
        var ajax_url ='Add_auto_text';
        if(rule_id==''){
            ajax_rule_id = edit_rule_id;
            ajax_url ='Edit_auto_text';
        }
        $.ajax({
            type:'POST',
            url: ajax_url,
            data: {
                content: text_message,
                rule_id: ajax_rule_id
            },
            success:function(data){
                alert(data);
            },
            error:function(){
                alert('执行错误,请正确操作');
            }
        });
        $(".showword_dialog_textarea").val('');
    });
    //自动回复图片选择
    $('.auto_reply_picture').click(function () {
        var picture_url = $(this).attr('data-id');//图片路径
        $("input[name='auto_reply_picture']").attr('data-value-id', picture_url);
    });
    //自动回复图片上传
    $('.picture_sure_lzm').click(function () {
        var picture_url = $("input[name='auto_reply_picture']").attr('data-value-id');//图片路径
        $("input[name='rule_id']").attr('data-id', ($(".rules_show_contentonly").parent().siblings('.rules_detail_box').find('.rule_sure').attr('data-rule-id')));
        var rule_id = $("input[name='rule_id']").attr('data-id');//规则id
        var rule_edit_id = $("input[name='edit_text_img_news_reply']").attr('data-id');
        if (rule_id == '') {
            $.ajax({
                type: 'POST',
                url: "Edit_auto_img",
                data: "picture_url=" + picture_url + '&rule_id=' + rule_edit_id,
                success: function (data) {
                    alert(data);
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        } else {
            $.ajax({
                type: 'POST',
                url: "Add_auto_img",
                data: "picture_url=" + picture_url + '&rule_id=' + rule_id,
                success: function (data) {
                    alert(data);
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }
    });
    //全部删除
    $('.rule_delete_all_lzm').click(function () {
        var rule_id = $(this).attr('data-rule-id');//规则id
        $.ajax({
            type: 'POST',
            url: "All_delete",
            data: 'rule_id=' + rule_id,
            success: function (data) {
                alert(data);
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });
    //修改规则名称
    $('.rule_sure_lzm').click(function () {
        var rule_id = $(this).attr('data-rule-id');
        var rule_name = $("input[name='edit_rule_name']").val();//规则名
        if(rule_name){
            $.ajax({
                type: 'POST',
                url: "Edit_rule_name",
                data: 'rule_id=' + rule_id + '&rule_name=' + rule_name,
                success: function (data) {
                    alert(data);
                },
                error: function () {
                    alert('执行错误,请正确操作');
                }
            });
        }
    })
    //编辑关键字赋值id
    $('.edit_keywords_lzm').click(function () {
        var data_id = $(this).attr('data-id');
        $("input[name='rule_id_eidt']").attr('data-id', data_id);
    });

    //删除关键字
    $('.del_keywords_lzm').click(function () {
        var del_id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: "Del_keywords",
            data: 'del_id=' + del_id,
            success: function (data) {
                alert(data);
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });
    //回复文字赋值
    $('.reply_edit_text').click(function () {
        var data_id = $(this).attr('data-id');
        $("input[name='reply_words_contents']").attr('data-id', data_id);
    });

    //删除自动回复文字内容
    $("body").on("click", ".reply_del_text", function () {
        var id = $(this).attr('data-id');//管理表id
        var data_reply_id = $(this).attr('data-reply-id');
        //alert('id:'+id);
        //alert('data_reply_id:'+data_reply_id);
        $.ajax({
            type: 'POST',
            url: "Del_autoreply_content",
            data: 'id=' + id + '&data_reply_id=' + data_reply_id,
            success: function (data) {
                alert(data);
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });
    //删除自动回复图片
    $("body").on("click", ".reply_del_img", function () {
        var data_reply_id = $(this).attr('data-reply-id');
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: "Del_autoreply_img",
            data: 'id=' + id + '&data_reply_id=' + data_reply_id,
            success: function (data) {
                alert(data);
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });
    $("body").on("click", ".reply_del_news", function () {
        var data_reply_id = $(this).attr('data-reply-id');
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: "Del_autoreply_news",
            data: 'id=' + id + '&data_reply_id=' + data_reply_id,
            success: function (data) {
                alert(data);
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });
    });
    //修改自动回复的文字赋值
    $('.edit_text_content').click(function () {
        var rule_id = $(this).attr('data-id');
        $("input[name='edit_text_img_news_reply']").attr('data-id', rule_id);
    });
    //修改自动回复的图片赋值
    $('.edit_img_content').click(function () {
        var rule_id = $(this).attr('data-id');
        $("input[name='edit_text_img_news_reply']").attr('data-id', rule_id);
    });
    //修改自动回复图文赋值
    $('.edit_news_content').click(function () {
        var rule_id = $(this).attr('data-id');
        $("input[name='edit_text_img_news_reply']").attr('data-id', rule_id);
    });
    //选择图文信息
    $("body").on("click", ".news_checked_lzm", function () {
        //$('.news_checked_lzm').click(function(){
        var data_id = $(this).attr('data-id');
        //alert('data_id:'+data_id);
        $("input[name='news_checked']").attr('data-id', data_id);
    });
    //-----------------添加/修改图文信息------------------------
    //-----------图文选择完成并确定------------------------
    $(".showpicword_btn_confirm").click(function () {
        if ($(this).hasClass("btn_ok")) {
            $(".news_checked_lzm").each(function () {
                if ($(this).find(".appmsg_item_bgcheck").is(":visible")) {
                    $(".rules_show_contentonly").children(".show_content_boxpicword").html($(this).html());
                    $(".rules_show_contentonly").children(".show_content_boxpicwordnew").html($(this).html());
                    $(".rules_show_contentonly").find(".appmsg_item_bgcheck").remove();
                    //$(".show_content_boxpicwordnew").eq(0).clone().appendTo(".rules_show_contentonly").addClass("show_content_boxpicword").removeClass("show_content_boxpicwordnew").show().siblings(".show_content_boxpicword").remove();
                    $(".rules_show_contentonly").children(".show_content_boxpicword").show().siblings().hide();
                    $(".rules_show_contentonly").children(".show_content_boxpicwordnew").show().siblings().hide();
                    $(this).removeClass("btn_ok");
                    $(".rules_show_contentonly").parents(".content_rules_main").find(".label_reply_info").html("1条图文消息");
                    $(".appmsg_item_bg").hide();
                    $(".appmsg_item_bgcheck").hide();
                    $(".showpicword_dialog").fadeOut();
                    $(".add_bgall").fadeOut();
                    $(".rules_show_content").removeClass("rules_show_contentonly");
                }
            })
        } else {
            //alert("请选择素材！");
            alertShow(0,2,"请选择素材！");
            return false;
        }
    });
    //-----------图文选择完成并确定 end------------------------
    $('.news_sure_lzm').click(function () {
        $("input[name='rule_id']").attr('data-id', ($(".rules_show_contentonly").parent().siblings('.rules_detail_box').find('.rule_sure').attr('data-rule-id')));
        var rule_id = $("input[name='rule_id']").attr('data-id');//规则id
        var news_id = $("input[name='news_checked']").attr('data-id');//文案id
        var edit_rule_id = $("input[name='edit_text_img_news_reply']").attr('data-id');//修改规则id
        //alert('rule_id:'+rule_id);
        //alert('edit_rule_id:'+edit_rule_id);
        //alert('news_id:'+news_id);
        var type=getType();
        var ajax_rule_id=rule_id;
        var ajax_url="Add_auto_news";
        if (rule_id == '') {//编辑
            ajax_rule_id=edit_rule_id;
            ajax_url="Edit_auto_news";
        }
        $.ajax({
            type: 'POST',
            url: ajax_url,
            data:{
                rule_id:ajax_rule_id,
                news_id:news_id,
                type:type
            },
            success: function (data) {
                alert(data);
            },
            error: function () {
                alert('执行错误,请正确操作');
            }
        });

    });
    //-------------------修改关键字确认按钮----------------
    $(".modkey_btn_confirm").click(function () {
        var $val = $(".modkey_dialog_textarea").val();
        if ($val == "" || $val == null) {
            //alert("关键字不能为空");
        } else {
            $(".detail_keywords_nameonly").text($val).removeClass("detail_keywords_nameonly");
            $(".label_keywords_item").eq($ind - 1).text($val);
            $(".modkey_dialog_textarea").val("");
            $(this).parents(".common_dialog").fadeOut();
            $(".add_bgall").fadeOut();
        };
    });
    //--------------------添加关键字的确定按钮-----------------------
    $(".keywords_btn_confirm").click(function () {
        var $val = $(".keywords_dialog_textarea").val();
        if ($val == "" || $val == null) {
            $(".add_tag_label .add_tag_text").each(function () {
                var $text = $(this).text();
                $(".detail_keywords_itemnew").eq(0).clone(true).appendTo(".detail_keywords_contentonly").addClass("detail_keywords_item").removeClass("detail_keywords_itemnew").children(".detail_keywords_name").text($text);
                $(".label_keywords_itemnew").eq(0).clone(true).appendTo(".label_keywords_listonly").addClass("label_keywords_item").removeClass("label_keywords_itemnew").text($text);
            });
        } else {
            $(".add_tag_labelnew").clone(true).appendTo(".keywords_add_tag").addClass("add_tag_label").removeClass("add_tag_labelnew").children(".add_tag_text").text($val);
            $(".add_tag_label .add_tag_text").each(function () {
                var $text = $(this).text();
                $(".detail_keywords_itemnew").eq(0).clone(true).appendTo(".detail_keywords_contentonly").addClass("detail_keywords_item").removeClass("detail_keywords_itemnew").children(".detail_keywords_name").text($text);
                $(".label_keywords_itemnew").eq(0).clone(true).appendTo(".label_keywords_listonly").addClass("label_keywords_item").removeClass("label_keywords_itemnew").text($text);
            });
            $(".keywords_dialog").fadeOut();
            $(".add_bgall").fadeOut();
            $(".add_tag_label").remove();
            $(".keywords_dialog_textarea").val("").focus();
            $(".detail_keywords_content").removeClass("detail_keywords_contentonly");
            $(".label_keywords_list").removeClass("label_keywords_listonly");
        };

    });
    //------------------删除被动回复和消息自动回复的图片------------------
    $("body").on("click", ".show_preview_delete", function () {
        $(this).parents(".content_main_showbox").find(".show_btn_input").val("");
        $(this).parents(".content_main_showbox").find(".main_show_preview").hide();
        $(this).parents(".content_main_showbox").find(".main_show_box").show();
    });
    $("body").on("click", ".more", function () {

    })

});

