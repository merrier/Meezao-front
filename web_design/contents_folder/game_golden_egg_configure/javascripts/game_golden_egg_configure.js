/**
 * Created by Yangyue on 2017/1/13.
 */
$(function () {

    //-------------------------------创建活动模态框----------------------------------
    $(".navbar-default").delegate(".btn_create_activity","click",function(){
        $(".modal_create_activity .create_order_input").val("");
        $(".modal_create_activity .time_element").val("");
        $(".modal_create_activity").modal("show");
    });
    //-------------------------------创建活动模态框----------------------------------

    //------------------------------开始时间选择--------------------
    $("#create_from,#edit_from").datetimepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        minDate:"today"
    });
    //------------------------------开始时间选择--------------------

    //-------------------------------创建活动确认----------------------------------
    $(".modal_create_activity").delegate(".btn-primary","click",function(){
        var activity_message={
            order:"",
            final_time:""
        };
        activity_message.order=$(".modal_create_activity .create_order_input").val().trim();
        activity_message.final_time=$("#create_from").val().trim();
        console.log(activity_message.final_time);
        console.log(activity_message);
        $(".modal_create_activity").modal("hide");
    });
    //-------------------------------创建活动确认----------------------------------

    //-------------------------------编辑活动模态框----------------------------------
    $(".btn-group").delegate(".btn_edit","click",function(){
        var $this=$(this).parents("tr");
        var id=$this.attr("data-id");
        var order=$this.find("td").eq(0).text().trim();
        var time=$this.find("td").eq(1).text().trim();
        $(".modal_edit_activity .edit_order_input").val(order);
        $("#edit_from").val(time);
        $(".modal_edit_activity").attr("data-id",id).modal("show");
    });
    //-------------------------------编辑活动模态框----------------------------------

    //-------------------------------编辑活动确认----------------------------------
    $(".modal_edit_activity").delegate(".btn-primary","click",function(){
        var activity_message={
            id:"",
            order:"",
            final_time:""
        };
        activity_message.id=$(".modal_edit_activity").attr("data-id");
        activity_message.order=$(".modal_edit_activity .edit_order_input").val().trim();
        activity_message.final_time=$("#edit_from").val().trim();
        console.log(activity_message);
        $(".modal_edit_activity").modal("hide");
    });
    //-------------------------------编辑活动确认----------------------------------

    //-------------------------------编辑活动模态框----------------------------------
    $(".btn-group").delegate(".btn_delete","click",function(){
        var $this=$(this).parents("tr");
        var id=$this.attr("data-id");
        $(".modal_delete_activity").attr("data-id",id).modal("show");
    });
    //-------------------------------编辑活动模态框----------------------------------

    //-------------------------------删除活动确认----------------------------------
    $(".modal_delete_activity").delegate(".btn-primary","click",function(){
        $(".modal_delete_activity").modal("hide");
        console.log($(".modal_delete_activity").attr("data-id"));
    });
    //-------------------------------删除活动确认----------------------------------

});