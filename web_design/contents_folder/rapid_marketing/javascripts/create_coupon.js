/**
 * Created by Yangyue on 2016/10/28.
 */

$(function(){

    //----------------------模态框-下载进度内容改变---------------------
    function modalProgressChange(message,target){
        var modal_pro = $(".modal_download_progress");
        modal_pro.find(".modal_progress_box").hide();
        modal_pro.find("h5").text(message);
        modal_pro.find(".modal_btnbox").show().find("a").hide().end().find("." + target).css("display","inline-block");
    }

    //$(".modal_download_progress").modal("show");


    //----------------------下载卡券按钮点击---------------------
    $(".create_coupon_bottom").delegate(".btn_download_coupon","click",function(){
        $(".modal_download_progress").modal("show").find(".modal_btnbox").hide().end().find(".modal_progress_box").show()
            .end().find("h5").text("精确定向卡券下载中......");

        $.ajax({
            type: 'POST',
            url: '/RapidMarketing/RapidMarketing/get_card_message',
            data:{test:''},
            dataType: 'json'
        }).done(function (data) {

            $(".modal_download_progress").modal("hide");
            if (data.errcode == 200) {
                var data_source_id = $(".data_source_id").data('id');
                if(data_source_id){

                }else{
                    modalProgressChange("卡券拉取成功，但未选择群组不能进行营销，请选择群组!","btn_choose_group");
                    //alert("卡券拉取成功，但未选择群组请不能进行营销，请在接下来的页面选择群组");  //发送失败：短信内容为空
                    //location.href('/RapidMarketing/RapidMarketing/rapid_marketing_group.html');
                }
            }else if(data.errcode == -1){
                //alertShow("danger",3,data.errmsg);
                modalProgressChange(data.errmsg,"btn_again");
            }else if(data.errcode == 100){
                  modalProgressChange("无可下载卡券,请到微信后台创建新卡券!","btn_build_coupon");
            } else {
                modalProgressChange(data.errmsg,"btn_again");
                //alertShow("danger",3,data.errmsg);
            }
        }).fail(function () {
            modalProgressChange("更新卡券失败，请联系客服!","btn_online_service");
            //alert("更新卡券失败：请联系客服!");  //发送失败：短信内容为空
        });

    });

    function initiate(){
        if($(".modal_message_div").text()=="1"){
            console.log(window.location.host);
            $(".modal_message").modal("show").find(".link_p span").text("https://"+window.location.host);
        }else{
            $(".modal_message").modal("hide");
        }
    }

    initiate();
});
