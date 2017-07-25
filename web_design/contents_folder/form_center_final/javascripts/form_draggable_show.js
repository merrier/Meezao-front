/**
 * Created by Administrator on 2016/6/17.
 */
$(function () {


    //----------------------添加模块模态框显示---------------------
    $(".navbar-right").delegate(".btn_add_module", "click", function () {
        $(".modal_add_module").find("input[type='checkbox']").each(function () {
            $(this).prop("checked", false);
        });
        //formCheckedDisable();
        $(".modal_add_module").modal("show").find(".search_input").val("");
    });


    //-----------------------添加模块模态框中的搜索按钮------------------
    $(".modal_add_module").delegate(".btn_search", "click", function () {
        var val = $.trim($(".modal_add_module").find(".modal_search_input").val());
        var tr = $(".table_add_module").find("tbody>tr");

        if (val == "" || val == null) {
            tr.show();
        } else {
            tr.each(function () {
                if ($(this).find("td").eq(1).text().indexOf(val) >= 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        }
    });


    //--------------------------保存按钮点击---------------------
    $(".navbar-default").delegate(".btn_save", "click", function () {
        var position_array = formPositionArray();
        if (position_array.id) {
            $(".form_gridly").removeClass("form_gridly_bg");
            setTimeout(function () {
                //formImgCreate();
                set_table_collection(position_array);

                $(".form_gridly").addClass("form_gridly_bg")
            }, 1000);
        }

    });


    //------------------------如果有报表被导入就生成图片并上传服务器--------------------
    function set_table_collection(date) {
        if (date) {
            html2canvas($(".form_main"),
                {
                    onrendered: function (canvas) {
                        $('#canvas_img').attr('src', canvas.toDataURL());
                        var myImage = canvas.toDataURL();
                        date.img = myImage;

                        $.ajax({
                            type: "post",
                            url: '/DataCenter/TableCollection/set_table_collection',
                            data: date,
                            dataType: "json",
                            cache: false
                        }).done(function (data) {
                            location.reload();

                        }).fail(function (xhr, text, error) {

                        }).always(function (data) {

                        }).complete(function (res) {

                        });
                    }
                });

        }
    }


    //----------------------报表所在位置数组生成------------------------
    function formPositionArray() {
        var position_array = [];
        $(".form_gridly>.form_brick").each(function () {
            var table_id = $(this).attr("data-ty-table_id") ? $(this).attr("data-ty-table_id") : '';
            var id = $(this).attr("data-ty-id");
            var left = $(this).css("left");
            var top = $(this).css("top");
            var item = {
                collection_id: table_id,
                table_id: id,
                table_left: left,
                table_top: top
            };
            position_array.push(item);
        });
        var id = $('.table_collection_id').attr('data-id');
        position_array = {id: id, obj: position_array};
        return position_array;
    }


    //-----------------------模块删除按钮-----------------------
    $(".form_brick_new").delegate(".btn_delete", "click", function () {
        var form_brick = $(this).parents(".form_brick");
        form_brick.remove();
    });


    //-----------------------报表可拖拽插件调用---------------------
    function formTdragApply(en_name) {
        var form_brick = $(".form_brick[data-id=" + en_name + "]");

        form_brick.Tdrag({
            scope: ".form_gridly",
            grid: [40, 20],
            animation_options: {//运动时的参数
                duration: 8,//每次运动的时间
                easing: "ease-out"//移动时的特效，ease-out、ease-in、linear
            }
        });
    }


    //------------------------添加模块的图片到网格中---------------------
    function formDraggableImgImport(options) {
        var en_name = options.en_name,
            cn_name = options.cn_name,
            ty_id = options.table_id,
            collection_id = options.id,
            id = en_name + "_" + ty_id + "_" + collection_id,
            state = options.state,
            top = options.top,
            left = options.left,
            url = options.url,

            img_src = "images/form_brick/" + en_name + ".png",
            img_box = "<img src=" + img_src + "/>";

        $(".form_brick_new").eq(0).clone(true).addClass("form_brick").removeClass("form_brick_new").appendTo(".form_gridly")
            .attr({
                "id": id,
                "data-id": en_name,
                'data-ty-id': ty_id,
                'data-ty-table_id': collection_id
            }).find(".form_contents").append(img_box).parents(".form_brick").css({
            "top": top,
            "left": left
        }).addClass("form_brick_" + state).find(".form_mask_" + state).find(".form_mask_title").text(cn_name)
            .parents(".form_mask_" + state).siblings(".form_mask").hide();

        if (url == "" || url == undefined) {

        } else {
            $("#" + id).find(".btn_check").show().attr("href", url);
        }

        formTdragApply(en_name);
    }


    //-------------------------添加模块的确认按钮--------------------
    $(".modal_add_module").delegate(".btn-primary", "click", function () {
        var tr_checked = $(".table_add_module").find("tbody").find("tr").find("input:checked").parents("tr");
        var length = tr_checked.length;

        if (length == 0) {
            $(".modal_add_module").modal("hide");
            alertShow("danger", 3, "您没有添加任何模块!");
        } else {
            $(".modal_add_module").modal("hide");
            tr_checked.each(function () {
                var en_name = $(this).attr("data-name"),
                    cn_name = $(this).find("td").eq(1).text(),
                    state = $(this).attr("data-state"),
                    id = $(this).attr("data-id"),
                    options = {
                        en_name: en_name,
                        cn_name: cn_name,
                        state: state,
                        table_id:id,
                        top: "0px",
                        left: "0px"
                    };

                formDraggableImgImport(options);

            });
            setTimeout(alertShow("success", 3, "添加成功!"), 1000);
        }
    });


    //-----------------------正常的蒙版显示-----------------------
    $(".form_brick_normal").hover(function () {
        $(this).find(".form_mask_normal").show();
    }, function () {
        $(this).find(".form_mask_normal").hide();
    });


    //----------------------获取循环模块所用数据数组-----------------------
    var formFakeArray = $(".formFakeArray").data("list");


    //------------------------------报表块初始化------------------------------
    function formBrickInit() {
        $.each(formFakeArray, function (index, value) {
            formDraggableImgImport(value);
        });
    }

    formBrickInit();
});