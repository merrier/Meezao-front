/* Js group_management */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/11 22:27>
 // +--------------------------------------------------------------------------*/

$(function () {

    //---------------------群组名称显示全部-------------------
    $(".group_common").delegate(".group_name","mouseover",function(){
        $(this).attr("data-subtitle",$(this).text()).text($(this).attr("data-title"));
    });

    $(".group_common").delegate(".group_name","mouseout",function(){
        $(this).text($(this).attr("data-subtitle"));
    });

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu li a").click(function dropDownCommon() {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
    });

    //----------------------点击黑名单出现右侧搜索框-------------------
    $(".nav_tablist").delegate(".nav-tabs a", "click", function () {
        var text = $(this).text();
        var navbar_right = $(this).parents(".nav-tabs").siblings(".navbar-right");
        if (text == "黑名单") {
            navbar_right.show();
        } else {
            navbar_right.hide();
        }

    });

    //----------------------黑名单中的列表项删除---------------------
    $(".group_blacklist").delegate(".fa-times", "click", function () {
        $(this).parents(".group_blacklist").remove();
    });

    //----------------------自设群组中的列表项删除--------------------
    $(".group_common").delegate(".fa-times", "click", function () {
        $(this).parents(".group_common").remove();
    });

    //--------------------自设群组中的添加群组按钮--------------------
    $(".group_ownset").delegate(".group_ownset_btn", "click", function () {
        $(".modal_addgroup_choose").find(".radio input").attr("checked", false).end().modal("show");
    });

    //-------------------模态框-选择添加群组方式的确认按钮------------------
    $(".modal_addgroup_choose").delegate(".modal_btn_confirm", "click", function () {
        var val = $(this).parents(".modal_addgroup_choose").modal("hide").find("input:radio[name='addgroup_choose']:checked").val();
        var modal_import = $(".modal_addgroup_import");
        var modal_filter = $(".modal_addgroup_filter");
        if (val == "addgroup_filter") {
            modalFilterInit();
            modal_filter.modal("show");
        } else if (val == "addgroup_import") {
            modalImportInit();
            modal_import.modal("show");
        } else {
            alertShow("danger", 3, "您未选择添加群组的方式!");
            return false;
        }
    });

    //-----------------模态框-导入数据与筛选建组的初始化----------------
    function modalImportInit() {
        var modal_import = $(".modal_addgroup_import");
        modal_import.find(".modal_input_groupname").val("").trigger("keyup");
        modal_import.find(".modal_input_import").val("");
        modal_import.find(".modal_import_name").text("");
        modal_import.find("label.error_tips").hide();
    }

    function modalFilterInit() {
        var modal_filter = $(".modal_addgroup_filter");
    }


    //-----------------------模态框-系统外数据导入相关----------------------

    //-------------------表单验证----------------------------------
    $(".modal_import_form").validate({
        debug: true,
        rules: {
            modal_input_groupname: {
                required: true
            },
            modal_input_import: {
                required: true
            }
        },
        messages: {
            modal_input_groupname: {
                required: "*请输入组名"
            },
            modal_input_import: {
                required: "*请导入文件"
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().siblings(".error_show"));
        },
        errorClass: "error_tips",
        errorElement: "label"
    });

    //-----------------导入文件按钮---------------
    $(".modal_addgroup_import").delegate("#modal_input_import", "change", function () {
        var url = getObjectURL(this.files[0]);
        var filetype = $(this).val().substring($(this).val().lastIndexOf(".") + 1).toUpperCase();
        var filename = $(this).val().replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1");
        if (url) {
            if (filetype == "XLS") {
                $(".modal_import_name").text(filename);
            }
        }
    });

    //--------------------------示例框显示-----------------------------
    $(".btn-group").delegate(".btn_show_example", "click", function (e) {
        e.stopPropagation();
        if ($(".show_example_div").is(":hidden")) {
            $(".show_example_div").show();
        } else {
            $(".show_example_div").hide();
        }
    });


    //--------------------------示例框显示-----------------------------

    $(document).click(function () {
        $(".show_example_div").hide();
    });


    //--------------------------------模态框-筛选建组------------------------------

    //------------------开始时间选择--------------------
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

    //--------------------结束时间选择--------------------
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


    //--------------------------------------群组相关----------------------------------
    var data_group = [];

    var data_group_all = [{
        "id": "1",
        "name": "自设群组",
        "en_name": "own_group",
        "data_sources": [{"id": "16", "name": "zi"}, {"id": "17", "name": "aafa"}]
    }, {
        "id": "2",
        "name": "微信群组",
        "en_name": "wx_group",
        "data_sources": [{"id": "1", "name": "全部微信会员"}, {"id": "2", "name": "30天内新注册微信会员"}, {
            "id": "3",
            "name": "7天内新注册微信会员"
        }, {"id": "4", "name": "骨灰粉丝"}, {"id": "5", "name": "忠诚粉丝"}, {"id": "6", "name": "唤醒粉丝"}, {
            "id": "7",
            "name": "待唤醒粉丝"
        }, {"id": "8", "name": "僵尸粉丝"}]
    }, {
        "id": "3",
        "name": "电子会员",
        "en_name": "electronic_group",
        "data_sources": [{"id": "9", "name": "全部电子会员"}, {"id": "10", "name": "30天内新注册电子会员"}, {
            "id": "11",
            "name": "7天内新注册电子会员"
        }]
    }, {
        "id": "4",
        "name": "CRM会员",
        "en_name": "CRM_group",
        "data_sources": [{"id": "12", "name": "全部CRM会员"}, {"id": "13", "name": "30天内新注册CRM会员"}, {
            "id": "14",
            "name": "7天内新注册CRM会员"
        }]
    }, {"id": "5", "name": "黑名单", "en_name": "blacklist_group", "data_sources": []}];


    //--------------------遍历数组给全局变量赋值-----------------
    function groupDataAssignment(data_id) {
        var array_ajax = [];
        $.each(data_group_all, function (index, item) {
            if (item.id == data_id) {
                $.each(item.data_sources, function (i, data_item) {
                    var value = data_item.id;
                    var label = data_item.name;
                    var push_item = {
                        value: value,
                        label: label
                    };
                    array_ajax.push(push_item);
                });
            }
        });
        return array_ajax;
    }


    //---------------------群组名字点击----------------------
    $(".group_range_choosediv").delegate(".dropdown-menu>li>a", "click", function () {
        var data_id = $(this).attr("data-id");
        //var data_type = "group";
        var data_name = $(this).attr("data-name");
        var array_group = groupDataAssignment(data_id);
        eval(data_name + "=array_group");
        eval("data_group" + "=" + data_name);
        multipleAutoMerrier(".modal_addgroup_filter .group_range_input", data_group, data_id);
    });


    //---------------------模糊搜索点击添加到隐藏input中--------------------
    function dataAddHideInput(type, data_id, value) {
        var group_hideinputbox = $(".group_range_hideinputbox");
        var actions_hideinput = $(".modal_addgroup_filter").find(".filter_actions_hideinput");
        var actions_input_id = data_id + "_" + value;
        var group_input_id = type + "_" + value;
        if (type == "group") {
            $(".group_range_hideinputnew").eq(0).clone(true).appendTo(group_hideinputbox).addClass("group_range_hideinput")
                .removeClass("group_range_hideinputnew").attr("name", "groups[]").attr("id", group_input_id).val(group_input_id);
        } else if (type == "actions") {
            actions_hideinput.val(actions_input_id);
        }
    }


    //--------------------自动完成搜索多选-------------------
    function multipleAutoMerrier(input, source, data_id) {
        $(input).autocomplete({
            source: source,
            _renderItem: function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function (event, ui) {
                var span = $("<span class='brand_span'><i class='fa fa-close float_right_multiple'></i></span>");
                span.html(ui.item.label + "<i class='fa fa-close float_right_multiple'></i>");
                span.attr("data-id", "group_" + ui.item.value);
                //不允许重复添加
                var flag = 0;
                var value = ui.item.value;
                $(this).parent().find("span").each(function (i) {
                    if (ui.item.label == $(this).text()) {
                        flag = 1;
                    }
                });
                if (flag) {
                    alert("不允许重复添加选项！");
                    $(this).val("");
                } else {
                    $(this).parent().append(span);
                    $(this).val("");
                    var p_height = parseInt($(this).parents(".group_range_inputdiv").css("height")) + 30;
                    $(this).parents(".group_range_inputdiv").css("height", p_height + "px");
                    $(this).parents(".input-group").next(".error_tips").hide();
                    dataAddHideInput("group", data_id, value)
                }
                return false;
            }
        });
    }


    //---------------群组自动完成多选删除选项----------------
    $(".group_range_inputdiv").on("click", ".float_right_multiple", function () {
        var span = $(this).parent();
        var data_id = span.attr("data-id");
        var p_height = parseInt($(this).parents(".group_range_inputdiv").css("height")) - 30;
        span.prevAll('.brand_input').attr("disabled", false);
        $(this).parents(".group_range_inputdiv").css("height", p_height + "px");
        span.remove();
        $(".group_range_hideinput[id=" + data_id + "]").remove();
    });


    //---------------输入群组名称隐藏提示信息--------------
    $(".filter_input_groupname").keyup(function () {
        var val = $(this).val();
        if (val != "" || val != null) {
            $(".error_tips_groupname").hide();
        }
    });

    //------------------------------------行为相关------------------------------------
    var searchOption = {
        level1:"",
        level2:"",
        level3:"",
        value:""
    };

    var data_actions = [];

    var data_actions_all = {
        "level1": [
            {
                "id": "0",
                "en_name": "empty",
                "cn_name": "不选择行为"
            },
            {
                "id": "1",
                "en_name": "subscribe",
                "cn_name": "订阅"
            },
            {
                "id": "2",
                "en_name": "browse",
                "cn_name": "浏览"
            },
            {
                "id": "3",
                "en_name": "share",
                "cn_name": "分享"
            },
            {
                "id": "4",
                "en_name": "receive",
                "cn_name": "领取"
            },
            {

                "id": "5",
                "en_name": "use",
                "cn_name": "使用"
            },
            {

                "id": "6",
                "en_name": "write_off",
                "cn_name": "核销"
            },
            {

                "id": "7",
                "en_name": "participate",
                "cn_name": "参与"
            },
            {

                "id": "8",
                "en_name": "purchase",
                "cn_name": "购买"
            },
            {

                "id": "9",
                "en_name": "score",
                "cn_name": "积分"
            },
            {
                "id": "10",
                "en_name": "register_member",
                "cn_name": "注册会员"
            },
            {

                "id": "11",
                "en_name": "bind_member",
                "cn_name": "绑定会员"
            },
            {

                "id": "12",
                "en_name": "wechat",
                "cn_name": "微信"
            }
        ],

        "level2": {
            "1": [
                {
                    "id": "13",
                    "en_name": "brand_card",
                    "cn_name": "品牌卡券"
                },
                {
                    "id": "14",
                    "en_name": "preferential_information",
                    "cn_name": "优惠信息"
                },
                {
                    "id": "15",
                    "en_name": "online_merchandise",
                    "cn_name": "在线商品"
                }
            ],
            "2": [
                {
                    "id": "16",
                    "en_name": "brand",
                    "cn_name": "品牌"
                },
                {
                    "id": "17",
                    "en_name": "column",
                    "cn_name": "栏目"
                },
                {
                    "id": "18",
                    "en_name": "coupons",
                    "cn_name": "卡券"
                },
                {
                    "id": "19",
                    "en_name": "interaction",
                    "cn_name": "互动"
                }
            ],
            "4": [
                {
                    "id": "18",
                    "en_name": "coupons",
                    "cn_name": "卡券"
                }
            ],
            "5": [
                {
                    "id": "20",
                    "en_name": "wifi",
                    "cn_name": "Wifi"
                },
                {
                    "id": "21",
                    "en_name": "line_up",
                    "cn_name": "排队"
                },
                {
                    "id": "22",
                    "en_name": "self_park",
                    "cn_name": "自助停车"
                }
            ],
            "6": [
                {
                    "id": "18",
                    "en_name": "coupons",
                    "cn_name": "卡券"
                },
                {
                    "id": "19",
                    "en_name": "coupons",
                    "cn_name": "互动"
                }
            ],
            "7": [
                {
                    "id": "19",
                    "en_name": "coupons",
                    "cn_name": "互动"
                }
            ],
            "8": [
                {
                    "id": "23",
                    "en_name": "online_purchase",
                    "cn_name": "线上购买"
                },
                {
                    "id": "24",
                    "en_name": "offline_purchase",
                    "cn_name": "线下购买"
                }
            ],
            "9": [
                {
                    "id": "25",
                    "en_name": "score_reserve",
                    "cn_name": "积分预订"
                },
                {
                    "id": "26",
                    "en_name": "score_exchange",
                    "cn_name": "积分兑换"
                }
            ],
            "10": [
                {
                    "id": "27",
                    "en_name": "CRM_member",
                    "cn_name": "CRM会员"
                },
                {
                    "id": "28",
                    "en_name": "electronic_member",
                    "cn_name": "电子会员"
                }
            ],
            "12": [
                {
                    "id": "29",
                    "en_name": "wechat_follow",
                    "cn_name": "微信关注"
                },
                {
                    "id": "30",
                    "en_name": "wechat_cancel_attention",
                    "cn_name": "微信取消关注"
                }
            ]
        },

        "level3": {
            "13": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                }
            ],
            "14": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                }
            ],
            "15": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                }
            ],
            "16": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                }
            ],
            "17": [
                {
                    "id": "32",
                    "en_name": "column_name",
                    "cn_name": "栏目名称"
                }
            ],
            "18": [
                {
                    "id": "33",
                    "en_name": "coupons_name",
                    "cn_name": "卡券名称"
                }
            ],
            "19": [
                {
                    "id": "34",
                    "en_name": "interaction_name",
                    "cn_name": "互动名称"
                }
            ],
            "21": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                }
            ],
            "23": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                },
                {
                    "id": "32",
                    "en_name": "brand_class_name",
                    "cn_name": "一级品类名称"
                }
            ],
            "24": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                },
                {
                    "id": "32",
                    "en_name": "brand_class_name",
                    "cn_name": "一级品类名称"
                }
            ],
            "25": [
                {
                    "id": "31",
                    "en_name": "brand_name",
                    "cn_name": "品牌名称"
                },
                {
                    "id": "32",
                    "en_name": "brand_class_name",
                    "cn_name": "一级品类名称"
                }
            ]
        }
    };

    //------------------------------假数据-----------------------------
    var actions_brand_name = [
        {
            value: 1,
            label: "aaabrand_name"
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

    var actions_column_name = [
        {
            value: 1,
            label: "aaacolumn_name"
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

    var actions_participation = [
        {
            value: 1,
            label: "aaa_coupons_name"
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

    var actions_interaction_name = [
        {
            value: 1,
            label: "aaa_interaction_name"
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


    var actions_coupons_name = [
        {
            value: 1,
            label: "aaa_coupons_name"
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


    var actions_brand_class_name = [
        {
            value: 1,
            label: "aaa_interaction_name"
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


    //----------------------------一级,二级或三级行为点击----------------------------
    $(".modal_filter_actions").delegate(".dropdown-menu li>a","click",function(){
        var level = $(this).parents(".modal_filter_actions").index(".modal_filter_actions") + 1;
        var data_id = $(this).attr('data-id');
        var data_name = $(this).attr("data-name");

        searchOption["level" + level] = data_id;
        $(".group_input_div").find(".singleauto_choose_deletenew").trigger("click");

        if(level ==3 ){
            eval("data_actions" + "=" + "actions_" + data_name );
            actionsAutoComplete();
        }else if(level == 2){
            actionsLiInsert(level + 1 ,data_id);

            if(data_id == 0){
                searchOption["level" + level] = "";
            }
        }else if(level == 1){
            actionsLiInsert(level + 2 ,data_id);
            actionsLiInsert(level + 1 ,data_id);

            if(data_id == 0){
                searchOption["level" + level] = "";
                searchOption["level" + (level + 1)] = "";
            }
        }

        console.info(searchOption);
    });


    //------------------------行为列表项动态生成---------------------------
    function actionsLiInsert(level,data_id){
        var span_data = ["请选择二级行为(选填)","行为属性"];
        var box = $(".filter_actions_level" + level);
        var dropdown_menu = box.find(".dropdown-menu");
        var array_item = data_actions_all["level" + level][data_id];

        dropdown_menu.find("li:not('.actions_li_empty')").remove();
        data_actions = [];
        box.find(".btn-dropdown").find("span").text(span_data[level-2]);

        if(array_item == undefined || array_item == ""){
            box.find(".actions_choose_mask").show();
        }else{

            box.find(".actions_choose_mask").hide();
            $.each(array_item,function(index,value){
                $(".actions_li_new").eq(0).clone(true).appendTo(dropdown_menu).removeClass("actions_li_new").find("a").text(value.cn_name).attr({
                    "data-id":value.id,
                    "data-name":value.en_name,
                    "data-source":value.en_name
                })
            })
        }
    }



    //--------------------行为自动完成搜索单选---------------------
    function actionsAutoComplete(){
        $(".modal_filter_actions .filter_actions_input").autocomplete({
            source: data_actions,

            select: function (event, ui) {
                var span = $("<span class='singleauto_choose_span'><i class='fa fa-close singleauto_choose_deletenew'></i></span>");
                var value = ui.item.value;
                if (ui.item.label.length > 20) {
                    var brand_name = ui.item.label.substring(0, 19);
                    span.html(brand_name + "<i class='fa fa-close singleauto_choose_deletenew'></i>");
                } else {
                    span.html(ui.item.label + "<i class='fa fa-close singleauto_choose_deletenew'></i>");
                }
                //span.attr("name", ui.item.label);
                $(this).parent().append(span);
                $(this).val("").hide();

                searchOption["value"] = ui.item.label;

                console.info(searchOption);

                return false;
            }
        });
    }

    //--------------行为自动完成单选删除按钮----------------
    $(".group_input_div").delegate(".singleauto_choose_deletenew", "click", function () {
        $(this).parents(".form-group").nextAll(".filter_actions_hideinput").find("input").val("");
        $(this).parent().prevAll(".ui-autocomplete-input").val("").css("display", "block");
        $(this).parent().remove();

        searchOption["value"] = "";

        console.info(searchOption);
    });


    ////---------------------行为选择点击---------------------
    //$(".modal_filter_actions").delegate(".dropdown-menu>li>a", "click", function () {
    //    //var data_type = "actions";
    //    // var actions_hideinput = $(".filter_group_hideinput");
    //    var data_id = $(this).attr("data-id");
    //    var data_tags = $(this).attr("data-tags");
    //    var data_name = $(this).attr("data-name");
    //    var data_source = $(this).attr("data-source");
    //    actionsInputMask(data_name, data_tags, data_source);
    //    actionsInputEmpty(data_id);
    //    singleAutoMerrier(".modal_addgroup_filter .filter_actions_input", data_actions, data_id);
    //});


    ////---------------------行为特征属性的蒙版是否隐藏-----------------
    //function actionsInputMask(data_name, data_tags, data_source) {
    //    var able_array = ["subscription_brand", "receive_card", "participation_interactive"];
    //    var result = $.inArray(data_name, able_array);
    //    if (result > -1) {
    //        $(".group_input_div").children(".filter_actions_input").attr("placeholder", data_tags).nextAll(".filter_input_mask").hide();
    //        eval("data_actions" + "=" + data_source);
    //    } else {
    //        $(".group_input_div").children(".filter_actions_input").attr("placeholder", "行为特征属性").nextAll(".filter_input_mask").show();
    //    }
    //}


    ////----------------------行为特征属性的input值清空-------------------
    //function actionsInputEmpty(data_id) {
    //    var delete_btn = $(".group_input_div").find(".singleauto_choose_deletenew");
    //    var actions_hideinput = $(".modal_addgroup_filter").find(".filter_actions_hideinput");
    //    actions_hideinput.val(data_id + "_");
    //    delete_btn.parents(".form-group").nextAll(".filter_actions_hideinput").find("input").val("");
    //    delete_btn.parent().prevAll(".ui-autocomplete-input").val("").css("display", "block");
    //    delete_btn.parent().remove();
    //}


    ////--------------------自动完成搜索单选-------------------
    //function singleAutoMerrier(input, source, data_id) {
    //    //input:模糊搜索的input标识,必须为字符串格式,即用""包起来;
    //    //source:模糊搜索的数据源,即下拉列表项;
    //
    //    $(input).autocomplete({
    //        source: source,
    //
    //        select: function (event, ui) {
    //            var span = $("<span class='singleauto_choose_span'><i class='fa fa-close singleauto_choose_deletenew'></i></span>");
    //            var value = ui.item.value;
    //            if (ui.item.label.length > 20) {
    //                var brand_name = ui.item.label.substring(0, 19);
    //                span.html(brand_name + "<i class='fa fa-close singleauto_choose_deletenew'></i>");
    //            } else {
    //                span.html(ui.item.label + "<i class='fa fa-close singleauto_choose_deletenew'></i>");
    //            }
    //            span.attr("name", ui.item.label);
    //            $(this).parent().append(span);
    //            $(this).val("").hide();
    //            var choose_input = $(this).parents(".modal_filter_box").find(".filter_actions_hideinput");
    //            choose_input.val(data_id +"_" + ui.item.value);
    //            $(this).parents(".form-group").next(".error_show").find("label").remove();
    //            dataAddHideInput("actions", data_id, value);
    //            return false;
    //        }
    //    });
    //}


    ////--------------行为自动完成单选删除按钮----------------
    //$(".group_input_div").delegate(".singleauto_choose_deletenew", "click", function () {
    //    //var data_type = "actions";
    //    var actions_hideinput = $(".modal_addgroup_filter").find(".filter_actions_hideinput");
    //    var data_id = $(".modal_filter_actions").children(".dropdown").attr("data-id");
    //    $(this).parents(".form-group").nextAll(".filter_actions_hideinput").find("input").val("");
    //    $(this).parent().prevAll(".ui-autocomplete-input").val("").css("display", "block");
    //    $(this).parent().remove();
    //    actions_hideinput.val(data_id + "_");
    //});


    //---------------------------开始按钮点击----------------------
    $(".modal_addgroup_filter").delegate(".modal_btn_confirm", "click", function () {
        var group_name = $(".filter_input_groupname").val();
        var start_time = $("#from").val();
        var end_time = $("#to").val();
        var group_length = $(".group_range_hideinputbox").children(".group_range_hideinput").length;
        $(".error_tips").hide();
        if (group_name == "" || group_name == null) {
            $(".error_tips_groupname").show();
            return false;
        } else if (start_time == "" || start_time == null) {
            $(".error_tips_starttime").show();
            return false;
        } else if (end_time == "" || end_time == null) {
            $(".error_tips_endtime").show();
            return false;
        } else if (group_length < 1) {
            $(".error_tips_group").show();
            return false;
        } else {
            $(".modal_btn_save").removeAttr("disabled");


            $.ajax({
                url:"asdfalsndfl.html",
                dataType:"json",
                data:searchOption,
                fail:function(data){

                },
                success:function(data){

                },
                always:function(data){

                }
            });


            alert("开始!")
        }
    });


});