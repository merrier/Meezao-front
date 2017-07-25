/**
 * Created by Administrator on 2016/6/24.
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
        if(searchMessage.search_id=="1"){
            $(".content_item_title").find(".checkAll_p").each(function(){
                console.log($(this).text().indexOf(searchMessage.search_input));
               if($(this).text().indexOf(searchMessage.search_input)>=0){
                   $(this).parents(".content_item").show().find(".content_item_title").trigger("click");
                   console.log($(this).text());
               } else{
                   $(this).parents(".content_item").hide();
               }
            });
        }else{
            $(".content_item_div").find(".checkAll_p").each(function() {
                console.log($(this).text().indexOf(searchMessage.search_input));
                if($(this).text().indexOf(searchMessage.search_input)>=0){
                    $(this).parents(".content_item").show().find(".content_item_title").trigger("click");
                    //$(this).parents(".content_item_child").show().siblings().hide();
                } else{
                    //$(this).parents(".content_item").hide();
                }
            });
        }
       console.log("data-id:"+searchMessage.search_id);
       console.log("input:"+searchMessage.search_input);
    });

    //-------------------------下拉选项的显示与隐藏-------------------
    $(".content_item").delegate(".content_item_title","click",function(){
        var ct_div=$(this).next(".content_item_div");
        if(ct_div.is(":visible")){
            ct_div.hide();
            $(this).find("i").removeClass("fa-caret-up").addClass("fa-caret-down");   //隐藏
        }else{
            ct_div.show();
            $(this).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");   //显示
        }
    });
    //-------------------------下拉选项的显示与隐藏-------------------

    $(".content_item_child").delegate(".check_item_child","click",function(){
        addChoices();
    });

    //-------------------------左侧充值对象删除-------------------
    //$(document).on("click",".fa-close",function(){
    //    var data_id=Number($(this).parents(".object_div_item").attr("data-id"))-1;     //获取被删除对象的顺序信息
    //    $(".content_right_middle").find(".check_item_child").eq(data_id).prop("checked",false).trigger("click");      //触发相应选项的点击事件
    //});
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
            var new_div=$("<div class='object_div_item'></div>");
            new_div.html($(this).next(".checkAll_p").text());
            new_div.attr("data-id",$(this).attr("data-id"));
            new_div.appendTo(".object_div");
            $(".object_input").val("1");
        }
    });
}
