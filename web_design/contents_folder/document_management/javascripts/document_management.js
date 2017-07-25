/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/18 9:43>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {
    //---------------------------单文案列表---------------------------

    //----------------点击td标题弹出链接框----------------
    $(".sindoc_list_table").delegate(".td_title_box", "click", function (event) {
        $(".td_title_link").hide();
        $(this).children(".td_title_link").show();
        event.stopPropagation();
    });

    //-----------------点击周围让链接框隐藏-----------------
    $(".wrp").click(function () {
        $(".sindoc_list_table .td_title_link").hide();
    });


    //-------------------遍历已选择文案长度并返回-----------------
    function chosenDocumentLength() {
        var len = $(".sindoc_choose_hidebox>tr").length;
        if (len < 1) {
            $(".btn_confirm_submit").attr("disabled", "disabled");
        } else {
            $(".btn_confirm_submit").attr("disabled", false);
        }
        return len;
    }


    //------将选择的tr克隆到隐藏的div中-------
    function chosenDataSave(tr) {
        //tr为表格已选中的一行数据
        var tr = tr;
        tr.clone(true).appendTo(".sindoc_choose_hidebox");
    }


    //------将取消选择的tr的数据从隐藏的div中删除-------
    function chosenDataDelete(tr) {
        //tr为表格取消选中的一行数据
        var tr = tr;
        var data_id = tr.attr("data-id");
        $(".sindoc_choose_hidebox").children("tr[data-id=" + data_id + "]").remove();
    }


    //------更新隐藏的div中指定id元素的数据-------
    function chosenDataUpdate(tr) {
        //tr为排序改变的一行数据
        var tr = tr;
        var data_id = tr.attr("data-id");
        var order = tr.children(".td_order").children("input").val();
        $(".sindoc_choose_hidebox").children("tr[data-id=" + data_id + "]").find(".td_order_input").val(order)
    }


    //--------------------点击选择按钮-----------------
    $(".sindoc_list_table").delegate(".td_choice_checkbox", "click", function () {
        var tr = $(this).parents("tr");
        var btn_delete = tr.children("td").eq(8).find(".btn_delete");
        var len = chosenDocumentLength();
        //len为点击之前的长度

        if ($(this).is(":checked")) {
            if(len < 8){
                $(".btn_confirm_submit").attr("disabled", false);
                $(this).parent().next(".td_order").children(".td_order_input").val("").css("border", "1px solid #ccc").show();
                btn_delete.attr("disabled","disabled");
                chosenDataSave(tr);
            }else{
                alertShow("danger",3,"组合文案个数最多为8个!");
                return false;
            }

        } else {
            $(this).parent().next(".td_order").children(".td_order_input").val("").hide();
            btn_delete.removeAttr("disabled");
            chosenDataDelete(tr);
        }
    });

    //---------------------光标焦点离开input----------------
    $(".sindoc_list_table").delegate(".td_order_input", "blur", function () {
        var tr = $(this).parents("tr");
        $(this).css("border", "0");
        chosenDataUpdate(tr);
    });

    //----------------------光标焦点聚焦在input--------------------
    $(".sindoc_list_table").delegate(".td_order_input", "focus", function () {
        var tr = $(this).parents("tr");
        $(this).css("border", "1px solid #ccc");
    });


    //-----------------已选择的文案回填排序---------------
    function chosenDataBackfill() {
        $(".sindoc_choose_hidebox").children("tr").each(function () {
            var chosen_id = $(this).find(".td_id_input").val();
            var val = $(this).find(".td_order_input").val();
            $(".sindoc_list_table tbody>tr").each(function () {
                var new_id = $(this).attr("data-id");
                if (chosen_id == new_id) {
                    $(this).children(".td_choose").children("input").attr("checked", "true");
                    $(this).children(".td_order").children("input").val(val).css("border", "0").show();
                }
            })
        })
    }


    //-----------------验证输入必须为正整数-----------------
    function docOrderVerification() {
        var len = $(".sindoc_choose_hidebox").children("tr").length;
        var state = 1;
        //state为验证的结果,"1"为验证通过,"0"为验证不通过

        if (len == 0) {
            state = 0;
            alertShow("danger", 3, "请选择需要组合的文案!");
        } else {
            $(".sindoc_choose_hidebox").children("tr").each(function () {
                var order = $(this).find(".td_order_input").val();
                var result = regularExpression("positive_integers", order);
                if (!result) {
                    state = 0;
                    alertShow("danger", 3, "排序中的数字只能为正整数!");
                }
            });
        }

        return state;
    }



    //-----------------点击时测试验证是否正确------------------
    $(".pages_footer a").click(function () {
        var state = docOrderVerification();
    });




    //---------------------------多文案列表---------------------------

    //----------------------文案模态框通用弹出----------------------
    function docModalShow(classname,tr){
        var type = classname.slice(4);
        if(type != "edit"){
            $('.common_table').find("tbody").children("tr").removeClass("tr_chosen");
            tr.addClass("tr_chosen");
            $(".modal_doc_" + type).modal("show");
        }
    }



    //----------------------文案列表表格按钮点击---------------------
    $(".common_table").delegate("td .btn", "click", function () {
        var classname = $(this).attr("class").slice(16);
        var tr = $(this).parents("tr");
        docModalShow(classname,tr);
    });

    //----------------------模态框-预览确认---------------------
    $(".modal_doc_preview").delegate(".modal-footer .modal_btn_confirm", "click", function () {
        $('.common_table').find("tbody").children("tr").removeClass("tr_chosen");
        $(".modal_doc_preview").modal("hide");
    });



    //----------------------模态框-发送确认---------------------
    $(".modal_doc_send").delegate(".modal-footer .modal_btn_confirm", "click", function () {
        var btn_send = $(".tr_chosen").children("td").eq(7).find(".btn_send");
        btn_send.attr("disabled","disabled");
        setTimeout(function(){
            btn_send.removeAttr("disabled");
        },10000);
        $('.common_table').find("tbody").children("tr").removeClass("tr_chosen");
        $(".modal_doc_send").modal("hide");
    });

    //---------------------模态框-删除确认--------------------
    $(".modal_doc_delete").delegate(".modal-footer .modal_btn_confirm", "click", function () {
        $(".tr_chosen").remove();
        $(".modal_doc_delete").modal("hide");
    });






    //----------------------------发送列表---------------------------------

    //--------------------表格撤销按钮点击-------------------






});
