// JavaScript Document
$(document).ready(function (e) {
    //右侧
    dot_show();
    $(".menu_form_area .frm_radio_label").click(function (e) {
        $(".menu_form_area .frm_radio_label").removeClass("selected");
        $(this).addClass("selected");
        $(".menu_form_area .frm_radio_label").find(".frm_radio").removeAttr("checked")
        $(this).find(".frm_radio").attr("checked", "true");
        var index = $(this).index();
        $(".menu_content").hide();
        $(".menu_content").eq(index).show();
    });
    $(".table").delegate(".frm_radio_label", "click", function () {
        $(".table .frm_radio_label").removeClass("selected");
        $(this).addClass("selected");
        $(".table .frm_radio_label").find(".frm_radio").removeAttr("checked")
        $(this).find(".frm_radio").attr("checked", "true");
    });
    $(".tab_nav").click(function (e) {
        $(".tab_nav").removeClass("selected");
        $(this).addClass("selected");
        var index = $(this).index();
        $(".tab_content").hide();
        $(".tab_content").eq(index).show();
        if (index == 2) {

        }
    });
    $(".js_editorArea").on("keyup", count);
    function count() {
        var val = $(".js_editorArea").text();

        var val_len = val.length;
        if (val_len <= 600) {
            var s_len = 600 - val_len;
            $(".editor_tip.js_editorTip").html("还可以输入" + "<em>" + s_len + "</em>" + "字");
        }
        else {
            var c_len = val_len - 600;
            $(".editor_tip.js_editorTip").html("已超出" + "<em style='color:red'>" + c_len + "</em>" + "字");
        }
    }

    //左侧菜单的切换
    //一级菜单
    $("#menuList").delegate(".jsMenu", "click", function (e) {
        //alert("1");
        //此处从后台要id值;
        var id_name = $(this).attr("id");
        $(".menu_form_area").attr("data-id", id_name);//右侧的值和左侧的点击菜单一致
        $(".current").removeClass("current");
        $(".jsMenu").children(".sub_pre_menu_box").hide();//初始化
        $(this).addClass("current").children(".sub_pre_menu_box").show();//当前的一级菜单高亮一级菜单的框
        var dataid = $('.jsMenu.current').attr('id');
        console.info(dataid);
        $("#js_confirm").attr('data-id', dataid).attr('data-ty', 'menu');

        // $(this).find(".jslevel2").removeClass("current");//二级菜单移除框
        var menu2_len = $(this).find(".sub_pre_menu_list").children().length;//二级菜单的个数
        var menu_name = $(this).find(".js_l1Title").text().trim();
        $(".menu_form_area .global_info").text(menu_name);
        $(".js_menu_name").val(menu_name);//初始化菜单名称
        $(".js_menuTitle").text("菜单名称")
        $("#jsDelBt").text("删除菜单");
        $(".title.js_menuContent").text("菜单内容");
        $(".js_titleNolTips").text("字数不超过4个汉字或8个字母")
        $("#js_none").hide();//一级菜单右侧
        $("#js_rightBox").show();//一级菜单右侧
        if (menu2_len == 1) {
            $(".menu_form_bd .menu_content_container").show();
            $(".frm_control_group").eq(1).show();
            $("#js_innerNone").hide();
            //$(this).find(".icon_menu_dot").hide();
            dot_show();
            $(".menu_form_area .frm_control_group").show();
            $(".menu_form_area .menu_content_container").show();
        }
        if (menu2_len >= 2) {
            $(".menu_form_bd .menu_content_container").hide();
            $(".frm_control_group").eq(1).hide();
            $("#js_innerNone").show();
            //$(this).find(".icon_menu_dot").show();

            $(".menu_form_area .frm_control_group").eq(1).hide();
            $(".menu_form_area .menu_content_container").hide();
        }

    });
    $(".jsMenu").eq(0).trigger("click");//触发第一个菜单的点击事件



//菜单名称的字数计数
    $(".js_menu_name").keyup(function () {
        var t = $(this)
        input_count(t);
    })
    function input_count(t) {
        var menu_text = $(t).val();
        var len = 0;
        var text_len = menu_text.length;

        for (var i = 0; i < text_len; i++) {
            if (menu_text.charCodeAt(i) > 256) {
                //$(this).attr('maxlength','9');
                len += 1;
            } else {
                //$(this).attr('maxlength','18');
                len += 0.5;
            }
        }

        //一级菜单
        if ($(".menu_form_area .global_info").text().trim() == "菜单名称") {
            if (len > 4) {
                $(".frm_msg.fail").eq(0).show();
                $(".frm_msg.fail").eq(1).hide();
            }
            if (len <= 4 && len > 0) {
                $(".frm_msg.fail").eq(1).hide();
                $(".frm_msg.fail").eq(0).hide();
            }
            if (len == 0) {
                $(".frm_msg.fail").eq(0).hide();
                $(".frm_msg.fail").eq(1).show();
            }
        }
        //二级菜单
        if ($(".menu_form_area .global_info").text().trim() == "子菜单名称") {

            if (len > 8) {
                $(".frm_msg.fail").eq(0).show();
                $(".frm_msg.fail").eq(1).hide();
            }
            if (len <= 8 && len > 0) {

                $(".frm_msg.fail").eq(1).hide();
                $(".frm_msg.fail").eq(0).hide();
            }
            if (len == 0) {
                $(".frm_msg.fail").eq(0).hide();
                $(".frm_msg.fail").eq(1).show();
            }
        }

        // console.log(len);
    }

    ////删除确定菜单框
    //$("#js_confirm").click(function (e) {
    //    $("#myModal_del").hide();
    //    $(".modal-backdrop").hide();
    //    var menu_1_len = $(".jslevel1").length;//一级菜单的个数
    //    var id_name = $(".menu_form_area").attr("data-id");
    //    $("#" + id_name).remove();//编辑菜单被删除;
    //
    //    $("#js_none").show();//一级菜单右侧
    //    $("#js_rightBox").hide();//一级菜单右侧
    //
    //    if (menu_1_len == 3) {
    //        //$(".js_addMenuBox").find(".pre_menu_link").append('<span class="js_addMenuTips">添加菜单</span>');
    //
    //        //$("#menuList").append("<li class='js_addMenuBox pre_menu_item size1of3 add_menu1'>"+"<a href='javascript:void(0);' class='pre_menu_link' title='添加菜单'>"+'<i class="icon16_common add_gray"></i>'+"</a>"+"</li>")
    //    }
    //    if (menu_1_len == 2) {
    //        $(".jslevel1").removeClass("size1of3").addClass("size1of2")
    //    }
    //    if (menu_1_len == 1) {
    //        $(".js_addMenuBox").find(".pre_menu_link").append('<span class="js_addMenuTips">添加菜单</span>');
    //    }
    //
    //});
    //一级菜单添加
    $("#menuList").delegate(".add_menu1", "click", function () {
        $("#js_rightBox").show();
        $("#js_none").hide();
        $(".current").removeClass("current");
        var menu1_len = $("#menuList").children().length;
        var menu_1_len = $(".jslevel1").length;
        if(menu_1_len < 3) {
            //$('.add_menu2').hide();
            add_menu($(this));
        }
        $("#js_none").hide();//一级菜单右侧
        $("#js_rightBox").show();//一级菜单右侧
        $(".menu_form_area .frm_control_group").show();
        $(".menu_form_area .menu_content_container").show();
        $(".menu_form_area #js_innerNone").hide();
        for (var i = 0; i < $(".jsMenu").length - 1; i++) {
            $(".jsMenu").eq(i).find(".sub_pre_menu_box").hide();
            //$(".jsMenu").eq(i).removeClass("current");
        }
        $(this).prev().click();
    })
    //二级菜单点击
    $("#menuList").delegate(".jslevel2", "click", function (e) {
        e.stopImmediatePropagation();
        var id_name = $(this).attr("id");
        $(".menu_form_area").attr("data-id", id_name);//右侧的值和左侧的点击菜单一致
        $(".menu_form_area #js_innerNone").hide();
        $(".current").removeClass("current");
        $(this).addClass("current");
        $(".jslevel1").removeClass("current");
        var menu2_text = $(this).text().trim();
        console.log(menu2_text);
        $(".menu_form_area").find(".global_info").text(menu2_text);
        $(".menu_form_area").find(".js_menuTitle").text("子菜单名称");
        $(".menu_form_area").find(".js_menu_name").val(menu2_text);
        $(".menu_form_area").find(".js_titleNolTips").text("字数不超过8个汉字或16个字母");
        $("#jsDelBt").text("删除子菜单");
        $(".title.js_menuContent").text("子菜单内容");
        $(".frm_control_group").eq(1).show();
        $(".menu_content_container").show();
        $("#js_none").hide();
        $("#js_rightBox").show();
    })
    function second_id() {
        for (var i = 0; i < $(".jsMenu").length; i++) {
            console.log($(".jsMenu").length)
            var z_id = $(".jsMenu").eq(i).attr("id");
            var z_id_index = z_id.split("_")[2];
            for (var j = 0; j < $(".jsMenu").eq(i).find(".jslevel2").length; j++) {
                $(".jsMenu").eq(i).find(".jslevel2").eq(j).attr("id", "j_m_" + z_id_index + "_" + j);
            }

        }
        //var i=$(".jslevel2").parents(".jsMenu").attr("id");


    }

    //二级菜单添加
    $("#menuList").delegate(".add_menu2", "click", function (e) {
        //右侧菜单
        e.stopImmediatePropagation();
        $("#js_none").hide();
        $("#js_rightBox").show();
        //一级菜单的处理
        $(".menu_form_area #js_innerNone").hide();//子菜单个数不能0;
        $(".frm_msg.fail").eq(0).hide();
        $(".current").removeClass("current");//删除所有高亮样式；
        //后天调去id值;
        var id_menu2 = add_id($(this));
        var pid = $(this).closest('.jsMenu').attr('id');
        console.info("pid=====" + pid);

        //console.info('add_menu2');
        if ($(this).parents(".jsMenu").find(".jslevel2").length < 5) {
            add_sub_menu($(this),pid);
        }
        else {
            var len = $(this).parents(".jsMenu").find(".jslevel2").length;
            $(this).parents(".jsMenu").find(".jslevel2").eq(len - 1).click();
            alert("最多添加5个子菜单")
        }
        //second_id();


    });
    /*卡券框*/
    $(".js_card_list").delegate(".edit_gray", "click", function (e) {
        var top_h = Number($(this).offset().top);
        var top_h = (top_h + 20) + "px"
        $(".popover_k").show().css("top", top_h);
        $(".j_con_k").attr("data-id", $(this).attr("id"));

    });
    //卡券框下面的蒙层
    //$("#cardmsg").click(function(e) {
    // $(".mask_ka").show();
    //$(".myModal").show();
    //});
    $(".popover_k").delegate(".j_del_c", "click", function () {
        $(".popover_k").hide();
    })
    $(".popover_k").delegate(".j_con_k", "click", function () {
        var change_cou = $(".stock_input").val();
        //console.log(change_cou);
        var id = $(this).attr("data-id");
        //console.log(id);
        var cou_ed = $("#" + id).prev().text();
        //console.log(cou_ed);
        if ($(".selected").hasClass("add")) {
            var z_cou = Number(change_cou) + Number(cou_ed);
            if (z_cou < 10000000000) {
                $("#" + id).prev().text(z_cou);
                $(".popover_k").hide();
                $(".stock_input").val("");
            }
            else {
                $(".result_tips").text("库存不能超过10亿").fadeIn();
                $(".result_tips").text("库存不能超过10亿").fadeOut(3000);
            }
        }
        if ($(".selected").hasClass("reduce")) {
            var z_cou = Number(cou_ed) - Number(change_cou);
            if (z_cou > 0) {
                $("#" + id).prev().text(z_cou);
                $(".popover_k").hide();
                $(".stock_input").val("");
            }
            else {
                $(".result_tips").text("库存不能少于1").fadeIn();
                $(".result_tips").text("库存不能少于1").fadeOut(3000);
            }
        }
    })
    //增加或者减少
    $(".popover_k .frm_radio_label").click(function (e) {
        $(".popover_k .frm_radio_label").removeClass("selected");
        $(this).addClass("selected");
    });
    $(".jsMsgSendTab").delegate(".del_img", "click", function (e) {
        $("#preview").attr("src", "");
        $(".img_p_div").hide();
        $(".MsgSend_media_box").eq(1).show();
        var file = $("#doc");
        file.val("");//input file 的value删除;
    });
    $("#js_confirm_ka").click(function () {
        //$(this).parents(".fade").hide();
        $(".fade").hide();
        $(".popover_k").hide();
        // $(".mask_ka").hide();
    })
    $("#js_del_ka").click(function () {
        //$(this).parents(".fade").hide();
        //$(".fade").hide();
        $(".popover_k").hide();
        //$(".mask_ka").hide();
    })

    ////从素材库中选择图片
    //$("#js_con_sucai").click(function (e) {
    //    // var $div=$(["data-check=checked_img"]).attr("class");
    //    var index = $(".tab_navs .selected").index();
    //    if (index == 0) {
    //        $(".MsgSend_box").eq(0).find(".blockLeft").remove();
    //        //素材内容
    //        var $div = $(".outDiv").find(".check").html();//素材库内容
    //
    //        //传给后台$div和id_name;
    //
    //        //console.log($div);
    //        //console.log($(".outDiv").find(".check").index());
    //        $(".MsgSend_media_box").eq(0).hide();
    //        //$(".c_p_div").hide();
    //        $(".MsgSend_box").eq(0).show().prepend("<div class='blockLeft'>" + $div + "</div>");
    //        $(".MsgSend_box").eq(0).find(".mask_page").remove();
    //        $(".MsgSend_box").eq(0).find(".icon_card_selected").remove();
    //        $(".fade").hide();
    //    }
    //    if (index == 2) {
    //        $(".MsgSend_box").eq(1).find(".blockLeft").remove();
    //        var $div = $(".outDiv").find(".check").html();
    //        //传给后台$div和id_name;
    //        var id_name = $(".menu_form_area").attr("data-id");//与菜单相对应的菜单名称
    //        var menu_name = $(".js_menu_name").val();//菜单名称
    //        var $div = $(".outDiv").find(".check").html();//素材库内容
    //        var id_name = $(".js_radio").filter(".selected").attr("id");//子菜单内容上面的单选框
    //        var editor_text = $(".js_editorArea").text();//子菜单内容文字
    //        //console.log($div);
    //        //console.log($(".outDiv").find(".check").index());
    //        $(".MsgSend_media_box").eq(1).hide();
    //        //$(".c_p_div").hide();
    //        $(".MsgSend_box").eq(1).show().prepend("<div class='blockLeft'>" + $div + "</div>");
    //        $(".MsgSend_box").eq(1).find(".mask_page").remove();
    //        $(".MsgSend_box").eq(1).find(".icon_card_selected").remove();
    //        $(".fade").hide();
    //    }
    //    //传给后台值
    //    var id_name = $(".menu_form_area").attr("data-id");//与菜单相对应的内容
    //    var menu_name = $(".js_menu_name").val();//菜单名称
    //    var sui_c = $(".js_appmsgArea").find(".MsgSend_box").html();//素材库内容
    //    var tup_c = $(".js_imgArea").find(".MsgSend_box").html();//素材库内容
    //    //console.log(tup_c);
    //    var id_name_radio = $(".js_radio").filter(".selected").attr("id");//子菜单内容上面的单选框
    //    var editor_text = $(".js_editorArea").text();//子菜单内容文字
    //    var url_page = $("#urlText").val();//页面的url
    //    console.log(id_name);
    //    console.log(menu_name);
    //    console.log(sui_c);
    //    console.log(id_name_radio);
    //    console.log(editor_text);
    //    console.log(tup_c);
    //    console.log(url_page);
    //});

    //素材搜索删除
    $("#searchCloseBt").click(function (e) {
        $("#msgSearchInput").val("");
    });
    //菜单有子菜单的显示
    function dot_show() {
        var len = $(".jslevel1").length;

        for (var i = 0; i < len; i++) {
            var len_2 = $(".jslevel1").eq(i).find(".jslevel2").length;
            //alert(len_2);
            if (len_2 > 0) {
                $(".jslevel1").eq(i).find(".js_icon_menu_dot").show();
            }
            else {
                $(".jslevel1").eq(i).find(".js_icon_menu_dot").hide();
            }
        }
    }

    //菜单编辑内容
    $("#save_text").click(function (e) {
        var text = $(".js_editorArea").text();
        var id_name = $(".menu_form_area").attr("data-id")
        //传给后台
        console.log(text);
        //传给后台$div和id_name;
        var id_name = $(".menu_form_area").attr("data-id");//与菜单相对应的内容
        var menu_name = $(".js_menu_name").val();//菜单名称
        var sui_c = $(".js_appmsgArea").find(".MsgSend_box").html();//素材库内容

        var tup_c = $(".js_imgArea").find(".MsgSend_box").html();//素材库内容
        //console.log(tup_c);
        var id_name_radio = $(".js_radio").filter(".selected").attr("id");//子菜单内容上面的单选框
        var editor_text = $(".js_editorArea").text();//子菜单内容文字
        var url_page = $("#urlText").val();
        console.log(id_name);
        console.log(menu_name);
        console.log(sui_c);
        console.log(id_name_radio);
        console.log(editor_text);
        console.log(tup_c);
        console.log(url_page);
        return false;

    });
    $(".js_radio").click(function (e) {
        e.stopImmediatePropagation();
        var id = $(this).attr("id");
        console.log(id);
        //传给后台
    });
    function add_menu(th) {
        /*ajax发送相关数据*/
        var menu_id = 0;

            $.ajax({
            type: "GET",
            url: "/MeeZao/Weixin/CustomMenu/add_menu_name",
            //data: {'pid':pid},
            dataType: "json",
            success: function (data) {
                console.info('data=====>' + data.menu_id);
                menu_id = data.menu_id;
                $('.size1of3.current').removeClass("current");
                $('.sub_pre_menu_box').hide();
                th.before('<li class="jsMenu pre_menu_item grid_item jslevel1 size1of3 current" id=' + menu_id + '>' +
                    '<a href="javascript:void(0);" class="pre_menu_link" draggable="false">' +

                    ' <i class="icon_menu_dot js_icon_menu_dot" style="display: none;"></i>' +
                    '<i class="icon20_common sort_gray"></i>' +
                    '<span class="js_l1Title">菜单名称</span>' +
                    '</a>' +
                    ' <div class="sub_pre_menu_box" style="">' +
                    ' <ul class="sub_pre_menu_list">' +

                    '<li class="js_addMenuBox add_menu2"><a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="添加子菜单" draggable="false"><span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon16_common add_gray"></i></span></a></li>' +
                    ' </ul>' +
                    '<i class="arrow arrow_out"></i>' +
                    '<i class="arrow arrow_in"></i>' +
                    '</div>' +
                    '</li>');
                $(".size1of3.current").trigger("click");
                hide_add();
                //$("#"+id).attr('data_id',data.data_id)
            },
            error: function (data) {
                console.log("error-----add_menu------");
                console.log(data);

            }
        });
        //alert(menu_id);
        //return menu_id;
    };
    function add_sub_menu(th,pid) {
        console.info('pid=========' + pid);
        //menu_id = 0;

        /*ajax发送相关数据*/
        //if(pid){
        $.ajax({
            type: "POST",
            url: "/MeeZao/Weixin/CustomMenu/add_sub_menu_name",
            data: {'pid': pid},
            dataType: "json",
            success: function (data) {
                console.info(data);
                //alert('data======' + data.menu_id);
                sub_menu_id = data.menu_id;
                $('.jslevel2.current').removeClass('current');
                th.before('<li data-id="' + sub_menu_id + '"  data-ty="sub" class="jslevel2 current" id=' + sub_menu_id + '>' + '<a href="javascript:void(0);" class="jsSubView">' +
                    '<span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon20_common sort_gray"></i>' +
                    '<span class="js_l2Title">子菜单名称</span></span></a></li>');
                // console.log($(".jsMenu").attr("class"));
                //$(this).parents(".jsMenu").removeClass("current");//二级菜单的颜色框
                th.parents(".jslevel1").find(".icon_menu_dot").show();//可以单写一个函数
                //二级菜单的编辑框
                var menu2_text = th.siblings(".current").text().trim();
                console.log(menu2_text);
                $(".menu_form_area").find(".global_info").text(menu2_text);
                $(".menu_form_area").find(".js_menuTitle").text(menu2_text);
                $(".menu_form_area").find(".js_menu_name").val(menu2_text);
                $(".menu_form_area").find(".js_titleNolTips").text("字数不超过8个汉字或16个字母");
                $("#jsDelBt").text("删除子菜单");
                $(".title.js_menuContent").text("子菜单内容");
                $(".menu_form_area .frm_control_group").show();
                $(".menu_form_area .menu_content_container").show();
                var len = th.parents(".jsMenu").find(".jslevel2").length;
                th.parents(".jsMenu").find(".jslevel2").eq(len - 1).click();//新添加的子菜单被点击


                //$("#"+id).attr('data_id',data.data_id)
            },
            error: function (data) {
                console.log("error-----add_sub_menu------");
                console.log(data);

            }
        });
        //console.info('menu======'+menu_id);
        //alert(menu_id);

        //}
    };
    function add_id(t) {
        var t = t;

        var class_name = $(t).attr("class");
        //alert(class_name);
        //主菜单
        if (class_name.indexOf("add_menu1") != -1) {
            var menu_len = $(".jslevel1").length;
            var max = 0;
            for (var i = 0; i < menu_len; i++) {
                var id_index = Number($(".jslevel1").eq(i).attr("id").split("_")[2]);
                if (max < id_index) {
                    max = id_index;
                }
            }
            return "z_m_" + (max + 1);
        }
        if (class_name.indexOf("add_menu2") != -1) {
            var menu_len = $(t).parents(".jslevel1").find(".jslevel2").length;
            var max = 0;
            var z_index = $(t).parents(".jslevel1").attr("id").split("_")[2];
            for (var i = 0; i < menu_len; i++) {
                var id_index = Number($(t).parent().find(".jslevel2").eq(i).attr("id").split("_")[3]);
                //alert(id_index)
                if (max < id_index) {
                    max = id_index;
                }
            }
            return "j_m_" + z_index + "_" + (max + 1);
        }


    }

    $(".img_pick").delegate(".img_item_bd", "click", function () {
        $(".img_item_bd").removeClass("selected");
        $(this).addClass("selected");
    })
    $("#js_con_p_sucai").click(function () {
        var src = $(".img_item_bd.selected").find("img").attr("src");
        $(".MsgSend_img_box").prepend("<div class='image_src'>" + "<img class='img_app' src=" + src + ">" + "</div>");
        $(".MsgSend_img_box").show();
        $(".js_imgArea").find(".MsgSend_media_box").hide();
        $(this).parents("#myModal_p_sucai").hide();
        $(".fade").hide();
    })
    $("#del_add_img").click(function () {
        $(this).prev().remove();
        $(".MsgSend_img_box").hide();
        $(".js_imgArea").find(".MsgSend_media_box").show();
    })

});