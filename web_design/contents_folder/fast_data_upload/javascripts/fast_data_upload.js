/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function () {

    //$(".modal_upload").modal("show");


    //$(".modal_upload_progress").modal("show");

    //$(".modal_opr_fail").modal("show");

    //----------------------获取当前显示盒子的index值----------------------
    function getBoxIndex() {
        var par = $(".fast_main_box:visible");
        var ind = par.index(".fast_main_box");
        return ind;
    }


    //----------------------模态框上传文件初始化---------------------
    function modalUploadInit(ind) {
        $(".data_file_name").text("");
        $(".input_upload").val("");
        $(".modal_upload").attr("data-id", ind).find(".btn_modal_browse").attr("onclick", "$('#input_upload_" + ind + "').click()");
    }


    //------------------限制文件上传类型为xls或xlsx--------------------
    function fileUploadValidation(target) {
        var name = target.value;
        var fileType = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
        var fileArr = name.split("\\");
        var fileName = fileArr[fileArr.length - 1];     //获取文件名称
        var fileSize = target.files[0].size / 1024;           //获取文件大小，单位为kb
        if (fileType != "xls" && fileType != "xlsx") {
            alert("请选择xls或者xlsx格式文件上传！");
            target.value = "";
            return false;
        } else if (fileSize > 100 * 1024) {
            alert("上传文件大小不得超过100M!");
            target.value = "";
            return false;
        }
        else {
            $(".data_file_name").text("已选择文件：" + fileName);
        }
    }

    $(".input_upload_box").delegate(".input_upload", "change", function () {
        fileUploadValidation(this);
    });


    //----------------------上传进度--------------------------
    function uploadFileProgress(file) {
        console.info(file);
        console.info($(file));
        var fd = new FormData();
        fd.append("file", $(file)[0].files[0]);
        fd.append("id", $('.modal_upload_progress').attr('data-id'));
        var xhr = new XMLHttpRequest();
        var progress = $(".modal_upload_progress").find(".modal_progress");
        //上传中设置上传的百分比
        xhr.upload.addEventListener("progress", function(evt){
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                progress.css("width",percentComplete+ "%");
                console.info(percentComplete);
            }else {
                alert('无法计算!');
            }
        }, false);

        //请求完成后执行的操作
        xhr.addEventListener("load", function(evt){
            //console.info(evt.target);
            var message = evt.target.responseText;
            console.info(message);
            var obj=JSON.parse(message);
            console.info(obj);

            var ind = getBoxIndex();
            //var obj = eval("("+message+")");
            if(obj.status == 1||obj.status == 200){
                $(".fast_main_box").hide().eq(ind + 1).show();
                setTimeout(alertShow("success",3,"上传成功！"),500);
                console.info('已上传');
            }else{
                alert(obj.message);
            }

        }, false);

        //请求error
        xhr.addEventListener("error", uploadFailed, false);
        //请求中断
        xhr.addEventListener("abort", uploadCanceled, false);
        //发送请求
        xhr.open("POST", "./uploadFiles");

        xhr.send(fd);
    }

    function uploadFailed(evt) {
        alert("上传出错！");
    }

    function uploadCanceled(evt) {
        alert("上传已由用户或浏览器取消删除连接！");
    }


    //----------------------上载按钮点击---------------------
    $(".fast_left_upload").delegate(".btn_upload_trigger", "click", function () {
        var ind = getBoxIndex();
        modalUploadInit(ind);
        $(".modal_upload").modal("show");
    });


    //----------------------模态框-上传文件上传按钮------------------------
    $(".modal_upload").delegate(".btn_modal_upload", "click", function () {
        var ind = $(".modal_upload").attr("data-id");
        if ($("#input_upload_" + ind).val() == undefined || $("#input_upload_" + ind).val() == "") {
            alert("请选择上传文件！");
        } else {
            $(".modal_upload").modal("hide");
            $(".modal_upload_progress").find(".modal_progress").css("width",0).end().modal("show");
            uploadFileProgress($('#input_upload_' + ind));
        }
    });


    //----------------------下一步按钮点击-----------------------
    $(".fast_left_bottom").delegate(".btn_upload_next","click",function(){
        var ind = getBoxIndex();
        $(".fast_main_box").hide().eq(ind + 1).show();
    });


    //----------------------开启精确营销按钮点击--------------------
    $(".fast_main_generate").delegate(".btn_generate","click",function(){
        $(".modal_generate_group").find(".modal_progress").css("width",0).end().modal("show");
        setTimeout(function(){
            window.open("http://www.baidu.com");
            location.reload();
        },3000);
    });


    //-------------------查看错误类型模态框弹出-----------------
    $(".common_table").delegate(".show_error_report","click",function () {
        var str = $(this).next("div").text();
        var ul = $(".modal_opr_fail").find(".modal_opr_list");
        ul.html(" ");
        if(!str){
            ul.html("异常错误，请联系客服");
        }else{
            var str_arr = str.split(",");
            $.each(str_arr,function(i,v){
                var li = "<li>" + v + "</li>";
                ul.html(ul.html() + li);
            });
        }
        $(".modal_opr_fail").modal("show");

    });


    //---------------------模态框-错误类型中的重新上传按钮点击------------------
    $(".modal_opr_fail").delegate(".modal_btn_again","click",function(){
        $(".modal_opr_fail").modal("hide");
    })


    //-------------------------数据分隔时间段设置模态框----------------------------

    //--------------------确认按钮点击-------------------
    $(".modal_finance_date").delegate(".btn-primary","click",function(){
        var modal = $(".modal_finance_date"),
            data_id = modal.find(".dropdown").attr("data-id");

        if(data_id == 0){
            alert("请选择每年财年开始月份！");
            return false;
        }else{
            $.ajax({
                url:"hahdf",
                dataType:"JSON",
                data:data_id,
                success:function(data){

                },
                error:function(data){
                    modal.modal("hide");
                    alertShow("success",3,"设置财年月份成功！");
                }
            })
        }
    });


});

