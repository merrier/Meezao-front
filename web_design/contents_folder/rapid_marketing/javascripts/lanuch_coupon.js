/**
 * Created by Yangyue on 2016/11/1.
 */

$(function(){

    $(".table_body").delegate("tr","click",function(){
        var icon=$(this).find("i");
        var checkbox=$(this).find(".choose input");
        var coupon_stock=$(this).find(".coupon_stock").text();
        if(icon.hasClass("fa-square-o")){
            icon.removeClass("fa-square-o");
            icon.addClass("fa-check-square");
            checkbox.prop("checked",true);
            if(coupon_stock=="0"){
                alert("该卡券库存为0！");
            }
            $(".btn_preview,.btn_lanuch_coupon").removeClass("btn_unclickable");
            $(".btn_preview").addClass("btn_preview_clickable");
            $(".btn_lanuch_coupon").addClass("btn_lanuch_coupon_clickable");

        }else{
            icon.addClass("fa-square-o");
            icon.removeClass("fa-check-square");
            checkbox.prop("checked",false);
            var flag=1;
            $("input:checkbox").each(function(){
               if($(this).prop("checked")){
                   flag=0;
               }
            });
            if(flag){
                $(".btn_preview,.btn_lanuch_coupon").addClass("btn_unclickable").unbind("click");
                //$(".btn_preview,.btn_lanuch_coupon").unbind("click");
            }

        }
    });

    $(".create_coupon_bottom").delegate(".btn_check_form_preview","click",function(){
        $(".modal_check_form_preview").modal("show");
    });

    $(".create_coupon_bottom").delegate(".btn_preview_clickable","click",modalPreviewShow);

    $(".create_coupon_bottom").delegate(".btn_lanuch_coupon_clickable","click",function(){
        var error="卡券投放失败........"
        if($(this).attr("data-state")=="0"){
            $(".modal_throw_coupon_fail").modal("show").find(".lanch-success").text(error);
        }else{
            $(".modal_throw_coupon_success").modal("show");
        }
    });
});