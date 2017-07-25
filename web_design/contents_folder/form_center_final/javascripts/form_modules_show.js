/**
 * Created by Administrator on 2016/6/17.
 */


$(function () {


    //------------------------字母和数字随机数生成--------------------
    function randomImport() {
        var x = 10000000000;
        var y = 1;
        var rand = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0)) + parseInt(Math.random() * (x - y + 1) + y) + String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
        return rand;
    }


    //-------------------------报表导入-------------------------
    //函数名:formStringGenerate
    //作者:Merrier(王聪)
    //功能:通过url导入报表到当前页面
    //输入参数:options
    //返回值:无
    function formStringGenerate(options) {
        var cn_name = options.cn_name,
            en_name = options.en_name,
            top = options.top,
            url = options.url,
            left = options.left,
            state = options.state,
            params = "table_id=" + options.id;
            // test = 0;


        //获取当前页面url的前缀
        var url_prefix = window.location.protocol + "//" + window.location.host;

        //html的url生成(需要是绝对路径)

        // //后台的路径
        // if (params) {
        //     var html_url = url_prefix + "/DataCenter/TableCellList/index.html?table_name=" + en_name + '&' + params;
        // } else {
        //     var html_url = url_prefix + "/DataCenter/TableCellList/index.html?table_name=" + en_name;
        // }

        //前端的路径
        if (params) {
            var html_url = url_prefix + "/web_design/contents_folder/form_center_final/form_modules_show.html?table_name=" + en_name + '&' + params;
        } else {
            var html_url = url_prefix + "/web_design/contents_folder/form_center_final/form_modules_show.html?table_name=" + en_name;
        }


        //ajax全局配置，使其变成同步，可以使报表正确导入
        $.ajaxSetup({
            async: false
        });

        //js的url生成(需要是绝对路径)

        // //后台的路径
        // var js_url = url_prefix + "/Public/DataCenter/javascripts/" + en_name + ".js";

        //前端的路径
        var js_url = url_prefix + "/web_design/contents_folder/modules_folder/javascripts" + en_name + ".js";


        $(".form_brick_new").eq(0).clone(true).addClass("form_brick").removeClass("form_brick_new").appendTo(".form_gridly").attr({
            "data-id": en_name,
            "id": en_name + "_box"

        }).find(".form_contents").load(html_url + " ." + en_name + "_load", function (response, status) {

            if (status == "success") {

                var win_width = $(window).width(),
                    size = win_width >= 1234 ? 1: (win_width - 274) / 960,//适配比例，为何如此计算请自己查看网页思考
                    rand = randomImport(),
                    form_brick = $(".form_brick[id=" + en_name + "_box]"),
                    originWidth,
                    originHeight;

                form_brick.css({
                    "top": parseInt(top) * size + "px",
                    "left": parseInt(left) * size + "px"

                }).addClass("form_brick_" + state).find(".form_mask_" + state).find(".form_mask_title").text(cn_name)
                    .parents(".form_mask_" + state).siblings(".form_mask").hide();

                if (url) {  //动态给可以配置的页面添加跳转链接
                    form_brick.find(".btn_check").attr("href", url);
                } else {
                    form_brick.find(".btn_check").remove();
                }

                form_brick.attr("id", en_name + "_box" + rand);

                setTimeout(function () {
                    originWidth = $("#" + en_name + "_box" + rand).width();
                    originHeight = $("#" + en_name + "_box" + rand).height();

                    importJs(js_url);
                    updateChartSize("#" + en_name + "_box" + rand, originWidth, originHeight);

                }, 100);

            }
        });
    }


    // //---------------------------url参数字符串生成--------------------------
    // function urlParamsStringGenerate(arr) {
    //     var ar = [];
    //     $.each(arr, function (index, value) {
    //         $.each(value, function (k, v) {
    //             ar.push(k + '=' + v);
    //         });
    //     });
    //
    //     if (ar) {
    //         return ar.join("&");
    //     } else {
    //         return "";
    //     }
    // }


    //----------------------------动态引入js到当前页面-------------------------
    function importJs(js_location) {
        var new_element = document.createElement("script");
        new_element.setAttribute("type", "text/javascript");
        new_element.setAttribute("src", js_location);
        document.body.appendChild(new_element);
    }


    //获取循环模块所用数据数组
    //var formFakeArray = $(".formFakeArray").data("list");

    var formFakeArray = [
        {
            cn_name: "僵尸粉丝比例",
            en_name: "zombie_fans_percentage",
            id: "2",
            top: "0px",
            left: "0px",
            state: "overtime"
        },
        {
            cn_name: "活跃粉丝比例",
            en_name: "active_fans_percentage",
            id: "4",
            top: "240px",
            left: "240px",
            state: "notopen"
        },
        {
            cn_name: "忠实粉丝比例",
            en_name: "loyal_fans_percentage",
            id: "24",
            top: "480px",
            left: "480px",
            state: "normal"
        }
    ];


    // //-----------------------给模块循环添加查看按钮的链接----------------------
    // function checkLinkUrlAdd() {
    //     $(".form_brick_normal").each(function () {
    //
    //         var href = "https://www.baidu.com";
    //
    //         var btn_check = $(this).find(".btn_check");
    //         btn_check.attr("href", href);
    //
    //     });
    // }

    //------------------------------报表块初始化------------------------------
    function formBrickInit() {

        $.each(formFakeArray, function (index, value) {

            setTimeout(function () {
                var status = true;

                $.each(value, function (k, v) {
                    if (k == "conditions" && v == "") {
                        status = false;
                        return false;
                    }
                });

                if (status) {
                    formStringGenerate(value);
                }

            }, value * 1000);
        });
    }

    formBrickInit();


});