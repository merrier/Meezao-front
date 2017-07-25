/**
 * Created by Yangyue on 2016/6/29.
 */

$(function(){

    var par=".brand_list";

    //----------------------------搜索--------------------------------
    $(par+" .nav_top").delegate(".btn_search","click",function(){
        console.log($(this).next(".search_input").val());
    });
    //----------------------------搜索--------------------------------

    //--------------------------示例框显示-----------------------------
    $(par+" .btn-group").delegate(".btn_show_example","click",function(e){
        e.stopPropagation();
        if($(".show_example_div").is(":hidden")){
            $(".show_example_div").show();
        }else{
            $(".show_example_div").hide();
        }
    });

    $(document).click(function(){
        $(".show_example_div").hide();
    });
    //--------------------------示例框显示-----------------------------

    //-------------------------多选框的联动活动-------------------
    $(par+" .nav_bottom").delegate(".checkAll_checkbox","click",function(){
        $(".check_one").prop("checked",this.checked);
    });

    $(par+" td").delegate(".check_one","click",function(){
        var flag=true;
        $(".check_one").each(function(){
            if(!this.checked){
                flag=false;
            }
        });
        $(".checkAll_checkbox").prop("checked",flag);
    });
    //-------------------------多选框的联动活动-------------------

    //-------------------------删除选中活动-------------------
    $(par+" .nav_bottom").delegate(".btn_delete","click",function(){          //导航条里的删除按钮
        $(".modal_delete").addClass("modal_delete_all").removeClass(".modal_delete_single").modal("show");
    });

    $(par+" .modal_delete").delegate(".btn_confirm","click",function(){
        var par=$(this).parents(".modal_delete");
        if(par.hasClass("modal_delete_all")){
            if($(".checkAll_checkbox").prop("checked")){
                $("tbody tr").remove();            //全选删除
            }else{
                $(".check_one").each(function(){
                    if($(this).prop("checked")){
                        $(this).parents("tr").remove();           //选中项删除
                    }
                })
            }
        }else{
            console.log($(this).parents(".modal_delete").attr("data-id"));    //单项删除
        }
        $(".modal_delete").modal("hide");
    });

    $(par+" .btn-group").delegate(".btn_delete","click",function(){           //表格里的删除按钮
        $(".modal_delete").addClass("modal_delete_single").removeClass(".modal_delete_all").modal("show").attr("data-id",$(this).parents("tr").attr("data-id"));
    });
    //------------------------------删除选中活动---------------------

    //--------------------------创建品牌品类模态框------------------------
    $(par+" .nav_top").delegate(".btn_create","click",function(){
        $(".chinese_name").val("");
        $(".english_name").val("");
        $(".first_word_span").text("请选择首字母");
        $(".first_word_input").val("");
        $(".upload_img").attr("src","");
        $(".img_name p").text("");
        $("#myfile").val("");
        $(".brand_choose_div").find(".brand_choose_item").remove();
        $(".brand_choose_input").val("");
        var modal_now=$(".modal_brand");
        modal_now.find(".modal-title").text("创建品牌品类");
        modal_now.addClass("modal_create_brand").removeClass("modal_edit_brand").modal("show");
    });
    //--------------------------创建品牌品类模态框------------------------

    //-----------------------------编辑品牌品类模态框-------------------------
    $(par+" .btn-group").delegate(".btn_edit","click",function(){
        var modal_now=$(".modal_brand");
        modal_now.addClass("modal_edit_brand").removeClass("modal_create_brand");
        var par=$(this).parents("tr");
        var d_id=par.attr("data-id");
        var c_name=par.find(".brand_div span").eq(0).text();
        var e_name=par.find(".brand_div span").eq(1).text();
        var f_word=par.find(".btn_first_word").text();
        var img_url=par.find("img").attr("src");
        $(".brand_choose_div").find(".brand_choose_item").remove();
        par.find(".btn_brand_kind").each(function(){
            var div_item=$('<div class="brand_choose_item"><i class="fa fa-close"></i></div>');
            div_item.html($(this).text()+'<i class="fa fa-close"></i>');
            div_item.appendTo(".modal_edit_brand .brand_choose_div");
            $(".brand_choose_input").val("1");
            console.log("1");
        });
        $(".chinese_name").val(c_name);
        $(".english_name").val(e_name);
        $(".first_word_span").text(f_word);
        $(".first_word_input").val("1");
        $(".upload_img").attr("src",img_url);
        $(".modal_brand .img_name p").text("");
        modal_now.find(".modal-title").text("编辑品牌品类");
        modal_now.attr("data-id",d_id).modal("show");
    });
    //-----------------------------编辑品牌品类模态框-------------------------

    //-----------------------------选择首字母-------------------------------
    $(par+" .dropdown_menu_first_word").delegate("li a","click",function(){
        $(this).parents(".dropdown").find("span").eq(0).text($(this).text());
        $(".first_word_input").val("1");
    });
    //-----------------------------选择首字母-------------------------------

    //-----------------------------选择品类-------------------------------
    $(par+" .dropdown_menu_brand_kind").delegate("li a","click",function(){
        var text=$(this).text();
        var flag=true;
        var par=$(this).parents(".modal").find(".brand_choose_div");
        par.find(".brand_choose_item").each(function(){
            if(text==$(this).text()){
                alert("不可重复选择！");
                flag=false;
            }else{
            }
        });
        if(flag){
            console.log(par.find(".brand_choose_item").length);
            if(par.find(".brand_choose_item").length<4){
                var div_item=$('<div class="brand_choose_item"><i class="fa fa-close"></i></div>');
                div_item.html(text+'<i class="fa fa-close"></i>');
                div_item.appendTo(par);
                par.next(".brand_choose_input").val("1");
            }else{
                alert("最多选择4类！")
            }
        }
    });
    //-----------------------------选择品类-------------------------------

    //-----------------------------删除品类-------------------------------
    $(document).on("click",".brand_list .fa-close",function(){
        $(this).parents(".brand_choose_item").remove();
        $(".brand_choose_input:last-child").remove();
    });
    //-----------------------------删除品类-------------------------------

    //-----------------------------品类下拉选项添加-------------------------------
    $(par+" .dropdown").delegate(".dropdown_toggle_brand","click",function(){
        $(".dropdown_menu_brand_kind").find("li").remove();
        var brand_kind=new Array("食品类","女人类","男人类","亲子类","美妆类","数码家电类","居家生活类","餐饮类","珠宝首饰类","其他类");
        for (var i=0;i<brand_kind.length;i++){
            var li=$('<li><a href="javascript:void(0)"></a></li>');
            li.find("a").text(brand_kind[i]);
            li.appendTo(".dropdown_menu_brand_kind");
        }
    });
    //-----------------------------品类下拉选项添加-------------------------------

    //--------------------------表单验证-----------------------------
    $(par+" .brand_form").validate({
        debug:true,
        rules:{
            brand_chinese_name:{
                name:""
            },
            brand_english_name:{
                name:""
            },
            first_word_input:{
                required:true
            },
            brand_choose_input:{
                required:true
            }
        },
        messages:{
            first_word_input:{
                required:"*请选择首字母"
            },
            brand_choose_input:{
                required:"*请选择品类"
            }
        },
        errorClass:"error_tip",
        errorElement: "label",
        errorPlacement : function(error, element) {
            //忽略自定义的方法错误提示
            if (error.text() == "ignore") {
                return true;
            }
            error.appendTo(element.parents(".form-group"));
        },
        submitHandler:function(form){
            var modal_now=$(form).parents(".modal");
            var data={
                cname:"",
                ename:"",
                first_word:"",
                brand_array:[]
            };
            data.cname=$(form).find(".chinese_name").val();
            data.ename=$(form).find(".english_name").val();
            data.first_word=$(form).find(".first_word_span").text();
            $(form).find(".brand_choose_item").each(function(){
                data.brand_array.push($(this).text());
            });
            if(modal_now.hasClass("modal_create_brand")){

            }else{
                console.log(modal_now.attr("data-id"));
            }
            console.log(data);
            modal_now.modal("hide");
        }
    });

    jQuery.validator.addMethod("name", function(value, element) {
        var chinese_name = $(".chinese_name").val();// 中文名
        var english_name = $(".english_name").val();// 英文名

        // 都没填
        if (isEmpty(chinese_name) && isEmpty(english_name)) {
            //自定义错误提示
            $(".error_tips").text("*请填写中文名或英文名").show();
            return false;
        }
        var chinese_name_Pass = false;
        var english_name_Pass = false;
        // 中文名填了、英文名没填
        if (!isEmpty(chinese_name) && isEmpty(english_name)) {
            chinese_name_Pass = true;
        }

        // 中文名没填、英文名填了
        if (isEmpty(chinese_name) && !isEmpty(english_name)) {
            english_name_Pass = true;
        }

        // 中文名英文名都填了
        if (!isEmpty(chinese_name) && !isEmpty(english_name)) {
            chinese_name_Pass = true;
            english_name_Pass = true;
        }

        if (chinese_name_Pass || english_name_Pass) {
            //自定义成功提示
            $(".error_tips").text("").hide();
            return true;
        } else {
            return false;
        }
    }, "");

    // 空字符串判断
    function isEmpty(v) {
        if(v==""){
            return true;
        }else{
            return false;
        }
    }
    //--------------------------表单验证-----------------------------

    //--------------------------上载模态框-----------------------------
    $(par+" .btn-group").delegate(".btn_upload","click",function(){
        $("#upload_file").val("");
        $(".document_p").text("");
        $(".img_p").text("");
        $("#upload_img").val("");
        $(".modal_upload .upload_file_input").val("");
        $(".modal_upload .upload_img_input").val("");
        $(".modal_upload .error_p").hide();
        $(".modal_upload").modal("show");
    });
    //--------------------------上载模态框-----------------------------

    //--------------------------上载模态框表单验证-----------------------------
    $(par+" .modal_upload").delegate(".btn_confirm","click",function(){
        var modal_now=$(this).parents(".modal");
            var data={
                file:"",
                img:""
            };
            data.file=$(".modal_upload").find("#upload_file").val();
            data.img=$(".modal_upload").find("#upload_img").val();
        if(data.file==""){
            $(".modal_upload .error_p").eq(0).show();
        }else{
            $(".modal_upload .error_p").eq(0).hide();
        }
        if(data.img==""){
            $(".modal_upload .error_p").eq(1).show();
        }else{
            $(".modal_upload .error_p").eq(1).hide();
        }
        if(data.file!="" && data.img!=""){
            console.log(data);
            modal_now.modal("hide");
        }
    });
    //--------------------------上载模态框表单验证-----------------------------

});

/*
函数名称：fileChange
参数：js原生选择器
功能：限制图片上传格式为jpg或者png,大小不得超过40kb
 */
function fileChange(target) {
    var name=target.value;
    var fileType = name.substring(name.lastIndexOf(".")+1).toLowerCase();     //获取文件格式
    var fileArr=name.split("\\");
    var fileName=fileArr[fileArr.length-1];     //获取文件名称
    if(fileType !="jpg" && fileType !="png"){
        alert("请选择jpg或者png格式图片文件上传！");
        target.value="";
        return false;
    }else{
        var fileSize = target.files[0].size/1024;           //获取文件大小，单位为kb
        console.log(fileSize);
        if (fileSize > 40) {
            alert("图片文件大小不得超过40kb!");
            target.value="";
            return false;
        }else{

            var url=getObjectURL(target.files[0]);           //获取图片url
            console.log(url);
            $(".modal_brand .upload_img").attr("src",url);      //显示上传图片
            console.log($(".modal_brand .upload_img").attr("src"));
            $(".modal_brand .img_name p").text(fileName);          //显示上传图片文件名
        }
    }
}

/*
 函数名称：fileUpload
 参数：js原生选择器
 功能：限制图片上传格式为xls或者xlsx
 */
function fileUpload(target) {
    var name=target.value;
    var fileType = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    var fileArr=name.split("\\");
    var fileName=fileArr[fileArr.length-1];
    if(fileType !="xls" && fileType !="xlsx"){
        alert("请选择xls或者xlsx格式文件上传！");
        target.value="";
        return false;
    }else{
        $(target).nextAll(".document_p").text(fileName);
        $(".modal_upload .error_p").eq(0).hide();
    }
}

/*
 函数名称：imgUpload
 参数：js原生选择器
 功能：限制图片上传格式为zip
 */
function imgUpload(target) {
    var name=target.value;
    var fileType = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    var fileArr=name.split("\\");
    var fileName=fileArr[fileArr.length-1];
    if(fileType !="zip"){
        alert("请选择zip格式文件上传！");
        target.value="";
        return false;
    }else{
        $(target).nextAll(".img_p").text(fileName);
        $(".modal_upload .error_p").eq(1).hide();
    }
}