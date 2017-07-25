/**
 * Created by Yangyue on 2016/6/29.
 */
$(function(){

    $(".input-group-btn").delegate(".dropdown-menu a","click",function(){
        var data_id=$(this).attr("data-id");
        var text=$(this).text();
        $(this).parents(".dropdown").attr("data-id",data_id).find("span").eq(0).text(text);
    });

    $(".content_right_header").delegate(".search","click",function(){
        var searchMessage={
            search_id:"",
            search_input:""
        };
        searchMessage.search_id=$(".dropdown").attr("data-id");
        searchMessage.search_input=($(".search_input").val());
        console.log("data-id:"+searchMessage.search_id);
        console.log("input:"+searchMessage.search_input);
    });

    //-------------------------下拉选项的显示与隐藏-------------------
    $(".content_item").delegate("i","click",function(){
        var ct_div=$(this).parents(".content_item_title").next(".content_item_div");
        if(ct_div.is(":visible")){
            ct_div.hide();
            $(this).removeClass("fa-caret-up").addClass("fa-caret-down");   //隐藏
        }else{
            ct_div.show();
            $(this).removeClass("fa-caret-down").addClass("fa-caret-up");   //显示
        }
    });
    //-------------------------下拉选项的显示与隐藏-------------------

    //-------------------------多选框的联动活动-------------------
    //-------------------------一级全选/全不选-------------------
    $(".content_right_header").delegate(".checkAll_checkbox","click",function(){
        $(".check_item").prop("checked",this.checked);
        $(".check_item_child").prop("checked",this.checked);
        addChoices();
    });
    //-------------------------一级全选/全不选-------------------

    //-------------------------二级全选/全不选-------------------
    $(".content_item_title").delegate(".check_item","click",function(){
        var par=$(this).parents(".content_item");
        par.find(".check_item_child").prop("checked",this.checked);
        var flag=true;
        $(".check_item").each(function(){
            if(!this.checked){
                flag=false;
            }
        });
        $(".checkAll_checkbox").prop("checked",flag);        //改变一级复选框的状态
        addChoices();
    });
    //-------------------------二级全选/全不选-------------------

    //-------------------------三级复选框选择-------------------
    $(".content_item_child").delegate(".check_item_child","click",function(){
        var flag_1=true;
        var par=$(this).parents(".content_item_div");
        par.find(".check_item_child").each(function(){
            if(!this.checked){
                flag_1=false;
            }
        });
        $(this).parents(".content_item").find(".check_item").prop("checked",flag_1);      //改变二级复选框状态
        var flag_2=true;
        $(".check_item").each(function(){
            if(!this.checked){
                flag_2=false;
            }
        });
        $(".checkAll_checkbox").prop("checked",flag_2);     //改变一级复选框状态
        addChoices();
    });
    //-------------------------三级复选框选择-------------------
    //-------------------------多选框的联动活动-------------------

    //-------------------------左侧充值对象删除-------------------
    $(document).on("click",".fa-close",function(){
        var data_id=Number($(this).parents(".object_div_item").attr("data-id"))-1;     //获取被删除对象的顺序信息
        $(".content_right_middle").find(".check_item_child").eq(data_id).trigger("click");      //触发相应选项的点击事件
    });
    //-------------------------左侧充值对象删除-------------------

    $(".charge_form").validate({
        debug:true,
        rules:{
            recharge_number_input:{
                required:true,
                digits:true
            },
            object_input:{
                required:true
            }
        },
        messages:{
            recharge_number_input:{
                required:"*请填写要充值的条数",
                digits:"*请填写整数"
            },
            object_input:{
                required:"*请选择要充值的对象"
            }
        },
        errorClass:"error_tips",
        submitHandler:function(form){
            console.log($(".charge_form").find("input").eq(0).val());         //充值条数
            $(".object_div_item").each(function(){
                console.log("object_id:"+$(this).attr("data-id"));            //充值对象的data-id
            });
        }
    });

});

/*
 函数功能：添加充值对象
 函数名称：addChoices
 */
function addChoices(){
    $(".object_div").find(".object_div_item").remove();
    $(".object_input").val("");
    $(".check_item_child").each(function(){
        if(this.checked){
            var new_div=$("<div class='object_div_item'><i class='fa fa-close'></i></div>");
            new_div.html($(this).next(".checkAll_p").text()+"<i class='fa fa-close'></i>");
            new_div.attr("data-id",$(this).attr("data-id"));
            new_div.appendTo(".object_div");
            $(".object_input").val("1");
        }
    });
}
