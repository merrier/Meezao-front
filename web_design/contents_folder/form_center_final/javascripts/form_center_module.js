/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/7/4>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {

    //--------------------------------模块相关----------------------------------


    //-----------------------导航栏中的搜索按钮-----------------------
    $(".navbar-form").delegate(".btn_search", "click", function () {
        var val = $.trim($(this).parents(".navbar-form").find(".search_input").val());
        console.log(val);
    });


    //-------------------------排序按钮点击----------------------------
    $(".form_center_table").delegate(".btn_order", "click", function () {
        var tr = $(this).parents("tr");
        var data_id = tr.attr("data-id");
        var order = tr.find("td").eq(0).text();
        var name = tr.find("td").eq(1).text();

        $(".modal_module_order").find(".order_number_input").val(order).end().find(".modal-title").text(name).end().attr("data-id", data_id).modal("show");
    });


    //-----------------------排序成功函数----------------------
    function orderSuccess(){
        var modal_order = $(".modal_module_order");
        var data_id = modal_order.attr("data-id");
        var order = $.trim(modal_order.find(".order_number_input").val());

        modal_order.modal("hide");
        $(".form_center_table").find("tbody>tr[data-id=" + data_id + "]").find("td").eq(0).text(order);
        alertShow('success',3,"修改顺序成功!");
    }


    //----------------------模态框-排序确认----------------------
    $(".modal_module_order").delegate(".btn-primary","click",function(){
        var modal_order = $(".modal_module_order");
        var data_id = modal_order.attr("data-id");
        var order = $.trim(modal_order.find(".order_number_input").val());

        if(order == "" || order == undefined){
            modal_order.modal("hide");
            alertShow("danger",3,"请输入正确的序号!");
        }else{
            $.ajax({
                url: '/Simian/Auth/Login/send.html',
                type: "POST",
                dataType: 'json',
                data: {
                    id: data_id,
                    order:order
                },

                done: function (data) {

                },
                fail: function (data) {
                    orderSuccess();
                },
                always:function(){

                },
                complete:function(){

                }
            });
        }
    });

    //-----------------------------查看按钮点击----------------------------
    $(".form_center_table").delegate(".btn_view","click",function(){
        var tr = $(this).parents("tr");
        var img_url = tr.attr("data-img");

        $(".modal_module_details").find(".modal_details_img").attr("src",img_url).end().modal("show");

    });



});