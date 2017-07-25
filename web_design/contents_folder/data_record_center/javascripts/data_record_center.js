/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function () {

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu").delegate("li a", "click", function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));

    });



    //-----------------------搜索按钮点击---------------------
    $(".navbar-form").delegate(".btn_data_search","click",function(){
        var form = $(this).siblings(".form-group");
        var dropdown = form.find(".dropdown").eq(0);
        var id = dropdown.data("id");
        var type = dropdown.data("type");
        var val = $.trim(form.find(".input_data_search").val());

        $.ajax({
            url:"",
            data:{
                "type":type,
                "id":id,
                "value":val
            },
            success:function(data){

            },error:function(data){

            },always:function(data){

            }
        })
    });

    //-----------------------删除模态框弹出-----------------------
    $(".common_table").delegate(".btn_common_delete", "click", function () {
        var data_id = $(this).parents("tr").attr("data-id");
        var type = $(this).siblings(".btn_common_edit").attr("data-type");
        $(".modal_common_delete").attr({
            "data-id":data_id,
            "data-type":type
        }).modal("show");
    });


    //------------------------删除模态框确认按钮------------------------
    $(".modal_common_delete").delegate(".btn_confirm","click",function(){
        var modal = $(this).parents(".modal_common_delete");
        var data_id = modal.attr("data-id");
        var type = modal.attr("data-type");
        var tr = $(".common_table").find("tbody tr[data-id=" + data_id + "]");
        $.ajax({
            url:"asdfas.php",
            data:{
                "type":type,
                "data-id":data_id
            },
            success:function(data){

            },error:function(data){
                tr.remove();
                alertShow("success",3,"删除记录成功！");
                $(".modal_common_delete").modal("hide");
            },always:function(data){

            }
        })
    });


    //-----------------------类型对照----------------------
    var data_record_center = {
        "category": "品类",
        "SKU": "SKU",
        "brand": "品牌",
        "brand_location": "品牌定位",
        "grade": "会员等级"
    };


    //-----------------------创建按钮通用点击-----------------------
    $(".content_mb_subject").delegate(".btn_common_create", "click", function () {
        var type = $(this).attr("data-type");
        var opr = $(this).attr("data-opr");
        var title = "创建" + data_record_center[type];

        $(".modal_data_record").attr(
            {
                "data-type": type,
                "data-opr": opr
            }
        ).find("input").val("").end().find(".modal-title").text(title).end().modal("show");
    });


    //------------------------编辑按钮通用点击------------------------
    $(".common_table").delegate(".btn_common_edit", "click", function () {
        var type = $(this).attr("data-type");
        var opr = $(this).attr("data-opr");
        var title = "编辑" + data_record_center[type];
        var tr = $(this).parents("tr");
        var data_id = tr.attr("data-id");
        var modal = $(".modal_data_record");

        tr.find("td").not(".td_opr").each(function(){
            var that = $(this);
            var text= that.text();
            if(text != ''){
                var id = that.data("class").slice(3);
                modal.find("input[name = " + id + "]").val(text);
            }
        });
        if(tr.parents(".common_table").hasClass("table_brand_list")){
            var location = tr.find("td[data-class='td_brand_location']").text();
            modal.find(".dropdown-menu li a").each(function(){
                var that = $(this);
                var text = that.text();
                console.log(text);
                if(text == location){
                    that.trigger("click");
                    return false;
                }else{
                    return true;
                }
            });
        }
        modal.attr(
            {
                "data-type": type,
                "data-opr": opr,
                "data-id":data_id
            }
        ).find(".modal-title").text(title).end().modal("show");
    });


    //-----------------------模态框-通用创建/编辑确定按钮-------------------------
    $(".modal_data_record").delegate(".btn_confirm", "click", function () {
        var type = $(this).attr("data-type");
        var opr = $(this).attr("data-opr");
        var data_id = $(this).attr("data-id") || "0";
        var parent = $(this).parents(".modal_data_record");
        var bool = modalFormCheck(parent);
        var data = {};
        var data_input = [];


        if(bool){
            parent.find(".modal-body").find("input").each(function(){
                var name = $(this).attr("name");
                var value = $.trim($(this).val());
                data_input.push({
                    "name":name,
                    "value":value
                });
            });
            $.ajax({
                url:"asdfas.php",
                data:{
                    "type":type,
                    "opr":opr,
                    "data-id":data_id,
                    "data_input":data_input
                },
                success:function(data){

                },error:function(data){
                    alertShow("success",3,"创建成功！");
                    $(".modal_data_record").modal("hide");
                },always:function(data){

                }
            })
        }
    });


    //------------------------模态框内输入内容通用验证-------------------------
    function modalFormCheck(target){
        var result = true;
        var num = 0;
        var double= target.find(".input_limit_double");
        if(double.length >0 && $.trim(double.eq(0).val()) == "" && $.trim(double.eq(1).val()) == ''){
            alert("请输入中/英名称！");
            result = false;
            return false;
        }
        else{
            target.find(".input_limit").not(".input_limit_double").each(function(){
                if($.trim($(this).val()) == ""){
                    alert($(this).attr("data-error"));
                    result = false;
                    return false;
                }
            });
        }
        return result;
    }

});

