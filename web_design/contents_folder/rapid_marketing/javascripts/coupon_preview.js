/**
 * Created by Yangyue on 2016/11/3.
 */
function modalPreviewShow(){
    $(".modal_preview .coupons_item").remove();

    $(".table_body tr").each(function(){
        if($(this).find("input:checkbox").prop("checked")){
            var dateTerm;
            var coupon=$('<div class="coupons_item">'+
                '<img class="coupons_exclusive_logo" src="images/exclusive_logo.png"/>'+
                '<div class="coupons_item_top">'+
                '<div class="coupons_top_main">'+
                '<img src="" class="coupons_top_logo" />'+
                '<div class="coupon_message">'+
                '<h4 class="coupons_top_title"></h4>'+
                '<p class="coupons_top_des">'+
                '<span>有效期限：</span>'+
                '<span class="coupons_validity_time"></span>'+
                '</p>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="coupons_item_bottom">'+
                '<span class="coupons_bottom_name"></span>'+
                '</div>'+
                '</div>');
            if($(this).attr("data-send_type")=="2"){
                coupon.find(".coupons_exclusive_logo").css("display","block");
            }
            coupon.find(".coupons_item_top").css("background-color",$(this).attr("data-color"));
            coupon.find(".coupons_top_logo").attr("src",$(this).attr("data-logo_url"));
            coupon.find(".coupons_top_title").text($(this).attr("data-title"));
            if($(this).attr("data-date_type")=="DATE_TYPE_FIX_TIME_RANGE"){
                dateTerm=$(this).attr("data-begin_timestamp")+"至"+$(this).attr("data-end_timestamp");
            }else{
                if($(this).attr("data-fixed_begin_term")=="0"){
                    dateTerm="领取当天生效"+$(this).attr("data-fixed_term")+"天内有效";
                }else{
                    dateTerm="领取"+$(this).attr("data-fixed_begin_term")+"天后生效"+$(this).attr("data-fixed_term")+"天内有效";
                }
            }
            coupon.find(".coupons_validity_time").text(dateTerm);
            coupon.find(".coupons_bottom_name").text($(this).attr("data-brand_name"));
            coupon.appendTo(".modal_preview .coupon_preview_content");
        }
    });
    $(".modal_preview").modal("show");
}