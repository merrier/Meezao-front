/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function () {

    //--------------------上传进度条模态框格式化----------------------
    //$(".modal_upload_progress").modal({
    //    show:true
    //});
    $(".modal_opr_tipslast").modal({
        show:true
    });

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu").delegate("li a", "click", function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
    });

    //-----------------------上传数据类型下拉菜单----------------------------
    $(".data_upload_dropdown").delegate(".dropdown-menu li a", "click", function () {
        var type = $(this).data("type");
        var name = $(this).text();
        var id = $(this).data("id");
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr({
            "data-id":id,
            "data-type":type
        });
        $(".data_example_img").attr("src","/Public/Meezao/data_upload_center/images/" + type + ".png");
        $(".btn_download_header").attr("href",'/Public/Meezao/data_upload_center/Template/'+name+'导入.xls');
        if(id != 0){
            $(".btn_download_header,.btn_example").removeClass("disabled");
        }
        if($(".upload_remain_number").text() != 0){
            $(".btn_upload_file").removeClass("disabled");
            $("#input_upload_file").show();
        }
    });

    //--------------------------示例框显示-----------------------------
    $(".data_upload").delegate(".btn_example", "click", function (e) {
        e.stopPropagation();
        var img_example = $(".data_upload").find(".data_example_img");
        img_example.is(":hidden") ?
            img_example.show() :
            img_example.hide();
    });

    $(document).click(function () {
        $(".data_upload").find(".data_example_img").hide();
    });


    //------------------限制文件上传类型为xls或xlsx--------------------
    function fileUpload(target) {
        var name = target.value;
        var fileType = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
        var fileArr = name.split("\\");
        var fileName = fileArr[fileArr.length - 1];     //获取文件名称
        var fileSize = target.files[0].size/1024;           //获取文件大小，单位为kb
        if (fileType != "xls" && fileType != "xlsx") {
            alertShow("danger", 3, "请选择xls或者xlsx格式文件上传！");
            target.value = "";
            return false;
        }else if (fileSize > 100*1024) {
            alertShow("danger",3,"上传文件大小不得超过100M!");
            target.value="";
            return false;
        }
        else {
            $(".data_upload .data_file_name").text(fileName);
            $(".btn_data_save").removeClass("disabled");
            alertShow("success", 3, "上传成功！");
        }
    }

    $(".data_upload").delegate("#input_upload_file", "change", function () {
        fileUpload(this);
    });


    //------------------------检查/存储到数据库------------------------
    $(".data_upload_main").delegate(".btn_data_save","click",function(){
        uploadProgressInit();
        $(".modal_upload_progress").modal("show");
        uploadFile($('#input_upload_file'));
    });



    //----------------------上传进度--------------------------
    function uploadFile(file) {
        console.info(file);
        console.info($(file));
        var fd = new FormData();
        fd.append("file", $(file)[0].files[0]);
        fd.append("id", $('.data_upload_dropdown').data('id'));
        var xhr = new XMLHttpRequest();
        var box1 = $(".upload_progress_box").eq(0);
        var box2 = $(".upload_progress_box").eq(1);
        var progress = $(".modal_upload_progress").find(".progress-bar");
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
            console.info(message)
            var obj=JSON.parse(message);
            console.info(obj)
            //var obj = eval("("+message+")");
            if(obj.status == 1||obj.status == 200){
                console.info('已上传');

                box1.find("label").addClass("progress_label_undo").end().find(".fa")
                    .removeClass("fa-spinner fa-pulse").addClass("fa-check");
                box2.find("label").removeClass("progress_label_undo").end().find(".fa-spinner").show();

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
        alert("上传已由用户或浏览器取消删除连接.");
    }


    //----------------------------进度条初始化---------------------------
    function uploadProgressInit(){
        var box1 = $(".upload_progress_box").eq(0);
        var box2 = $(".upload_progress_box").eq(1);
        var progress = $(".modal_upload_progress").find(".progress-bar");
        progress.css("width",0);
        box1.find("label").removeClass("progress_label_undo").end().find(".fa").addClass("fa-spinner fa-pulse")
            .removeClass("fa-check");
        box2.find("label").addClass("progress_label_undo").end().find(".fa").hide().addClass("fa-spinner fa-pulse")
            .removeClass("fa-check");
    }


    //---------------------------------操作提示模态框------------------------------------

    //-------------------上传成功，关闭窗口--------------------
    $(".modal_opr_tips").delegate(".modal_btn_success","click",function(){
        location.reload();
    });
});

