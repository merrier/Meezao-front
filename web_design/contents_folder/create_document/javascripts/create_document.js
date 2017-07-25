/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/17 20:57>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function () {


    $.getJSON("haha.json",function(result){
        var data = result.haha;
        console.info(data);
    })



    //---------------------左侧表单和右侧标签栏回填---------------------
    (function(){
        $.getJSON("get_tag.json",function(result){

            //title 图文消息的标题
            //author 图文消息的作者
            //digest 图文消息的描述
            //thumb_url 图片链接
            //content_source 是否显示原文链接
            //content_source_url 在图文消息页面点击“阅读原文”后的页面，受安全限制，如需跳转Appstore，可以使用itun.es或appsto.re的短链服务，并在短链后增加 #wechat_redirect 后缀
            //simple 蒙板内容
            //content 正文内容
            //show_cover_pic 是否显示封面

            //----------左侧表单回填-------------
            var left_title = result.title;
            var left_author = result.author;
            var left_digest = result.digest;
            var left_thumb_url = result.thumb_url;
            var left_content_source = result.content_source;
            var left_content_source_url = result.content_source_url ;
            var left_simple = result.simple ;
            var left_content = result.content ;
            var left_show_cover_pic = result.show_cover_pic;


            //图文消息的标题和作者并触发字数统计
            $("#credoc_input_title").val(left_title).trigger("keyup");
            $("#credoc_input_author").val(left_author).trigger("keyup");


            //正文预览按钮是否可点击
            if(left_content == ""||left_content == null){
                previewWhetherAble("content","disabled")
            }else{
                previewWhetherAble("content","able")
            }

            //蒙版预览按钮是否可点击
            if(left_simple == "" || left_simple == null){
                previewWhetherAble("simple","disabled")
            }else{
                previewWhetherAble("simple","able");
            }

            //是否显示原文链接及回填
            if(left_content_source){
                $("#credoc_input_textlink").val(left_content_source_url);
            }

            //封面图片回填
            if(left_thumb_url != "" && left_thumb_url != null){
                $(".upload_img_cover").attr("src",left_thumb_url);
                $(".upload_img_hideinput").val(left_thumb_url);
            }

            //封面图片是否显示在正文中checkbox
            if(left_show_cover_pic){
                $(".btn_imgshow_article").find("input").attr("checked",true);
            }else{
                $(".btn_imgshow_article").find("input").attr("checked",false);
            }


            //右侧标签回填
            $.each(result.copywriter_labels, function(address_index,item){
                $.each(result.copywriter_labels[address_index],function(tagbox_index,tagbox_item){
                    for(i=0;i<=tagbox_item.length-1;i++){
                        var tagbox = $(".credoc_right_box").eq(address_index-1).find(".right_main_head");
                        var inputbox = tagbox.siblings(".right_main_inputbox");
                        var data_id = tagbox_item[i].id;
                        var label_name = tagbox_item[i].label_name;
                        var id = data_id + "_" + label_name;
                        var name;

                        switch(address_index){
                            case(1):
                                name = "title_ids[]"
                                break;
                            case(2):
                                name = "contents_ids[]"
                                break;
                        }

                        $(".tag_deletion_boxnew").eq(0).clone(true).addClass("tag_deletion_box").
                            removeClass("tag_deletion_boxnew").attr("id",id)
                            .appendTo(tagbox).children(".tag_deletion_name").text(label_name);

                        $(".right_tagbox_inputnew").eq(0).clone(true).appendTo(inputbox).removeClass("right_tagbox_inputnew")
                            .addClass("right_tagbox_input").attr({name:name,value:id,'data-id':id});
                    }
                })
            });
        })
    })();


    //--------------------预览按钮是否可点击-------------------
    function previewWhetherAble(type,state){
        //参数说明:
        //type:分为两种,正文为"content",蒙版为"simple";
        //state:分为两种,可点击为"able",不可点击为"disabled";
        var btn = "." + type + "btn_preview_"+state;
        $(btn).show().siblings("button").hide();
    }


    //---------------------输入标签提交--------------------
    $(".right_main_show").delegate(".btn-default","click",function (){
        var input = $(this).siblings("input");
        var val = input.val().replace(/\ +/g, "");
        var box = $(this).parents(".credoc_right_main").children(".right_main_head");
        var id = "human"+"_"+val;
        tagSubmitVerification(val, box,id);
    });


    //---------------------常用标签和推荐标签提交--------------------
    $(".right_main_show").delegate(".tag_deletion_box","click",function () {
        var val = $(this).children(".tag_deletion_name").text().replace(/\ +/g, "");
        var box = $(this).parents(".credoc_right_main").children(".right_main_head");
        var id = $(this).attr("id");
        tagSubmitVerification(val, box,id);
    });


    //--------------------标签提交验证-------------------
    function tagSubmitVerification(val, box,id) {
        var val = val;
        var box = box;
        var id = id;
        var inputbox = box.siblings(".right_main_inputbox");
        var index = inputbox.index(".right_main_inputbox");
        var name;
        switch(index){
            case 0:
                name = "title_ids[]"
                break;
            case 1:
                name = "contents_ids[]"
                break;
        }

        var len = box.children(".tag_deletion_box").length;
        var state = true;

        box.children(".tag_deletion_box").each(function () {
            if (val == $(this).children(".tag_deletion_name").text()) {
                state = false;
            }
        });

        if (val) {
            if (len >= 5) {
                window.scrollTo(0,0);
                alertShow("danger",3, "最多只能添加5个标签!");
            } else if (!state) {
                window.scrollTo(0,0);
                alertShow("danger",3, "不能添加重复的标签!");
            } else if (state) {
                $(".tag_deletion_boxnew").eq(0).clone(true).appendTo(box).removeClass("tag_deletion_boxnew")
                    .addClass("tag_deletion_box").attr("data-id",id).children("span").text(val);

                $(".right_tagbox_inputnew").eq(0).clone(true).appendTo(inputbox).removeClass("right_tagbox_inputnew")
                    .addClass("right_tagbox_input").attr({name:name,value:id,'data-id':id});
            }
        }
    }


    //-----------------删除标签------------------
    $(".credoc_con_right").delegate(".tag_deletion_box i", "click", function () {
        var data_id = $(this).parents(".tag_deletion_box").attr("data-id");
        var inputbox = $(this).closest('.credoc_right_main').find('.right_tagbox_input[data-id='+data_id+']').remove();
    });


    //------------------图片上传及预览------------------
    $("#credoc_input_cover").change(function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 1;
        if(picurl){
            bgImageUpload(".upload_img_cover",picurl,filesize,size);
        }
    });


    //------------------右侧标签循环输出-----------------
    (function(){
        $.getJSON("get_tag.json",function(result){

            $.each(result.label, function(address_index,item){
                $.each(result.label[address_index],function(tagbox_index,tagbox_item){
                    for(i=0;i<=tagbox_item.length-1;i++){
                        var tagbox = $(".credoc_right_box").eq(address_index-1).find(".right_show_labelbox").eq(tagbox_index-1);
                        var data_id = tagbox_item[i].id;
                        var label_name = tagbox_item[i].label_name;
                        var id = data_id + "_" + label_name;

                        $(".tag_deletion_boxnew").eq(0).clone(true).addClass("tag_deletion_box").removeClass("tag_deletion_boxnew").attr("id",id)
                                                 .appendTo(tagbox.children(".right_show_content")).children(".tag_deletion_name").text(label_name)
                                                 .siblings("i").remove();

                    }
                })
            });
        });
    })();


    //---------------------完成按钮-------------------------
    $("body").delegate(".credoc_btn_complete","click",function(){
        submitVerfication(event);
    });

    //---------------------完成并继续按钮--------------------
    $("body").delegate(".credoc_btn_continue","click",function(){
        submitVerfication(event);
    });


    //-------------------表单验证-------------------
    function submitVerfication(event){
        var title = $("#credoc_input_title").val();
        var img = $(".upload_img_hideinput").val();
        var title_tag_len = $(".credoc_right_box").eq(0).find(".right_main_head").children(".tag_deletion_box").length;
        var content_tag_len = $(".credoc_right_box").eq(1).find(".right_main_head").children(".tag_deletion_box").length;
        if (title=="" || title==null){
            event.preventDefault();
            alertShow("danger",3,"请输入标题!");
            window.scrollTo(0,0);
            return false;
        }else if(img=="" || img==null){
            event.preventDefault();
            alertShow("danger",3,"请上传图片!");
            window.scrollTo(0,0);
            return false;
        }else if(title_tag_len==0){
            event.preventDefault();
            alertShow("danger",3,"请添加题目栏数据标签!");
            window.scrollTo(0,0);
            return false;
        }else if(content_tag_len==0){
            event.preventDefault();
            alertShow("danger",3,"请添加内容栏数据标签!");
            window.scrollTo(0,0);
            return false;
        }else{
            alert("成功");
        }

    }



});
