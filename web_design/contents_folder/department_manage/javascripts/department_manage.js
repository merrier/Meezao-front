/**
 * Created by Administrator on 2016/6/17.
 */
$(function(){
    //--------------------------创建部门模态框显示-----------------------------
    $(".navbar-default").delegate(".btn_create_department","click",function(){
        var modal_now=$(".modal_department");
        modal_now.addClass("modal_create_department").removeClass("modal_edit_department");
        modal_now.find(".chinese_name").val("");
        modal_now.find(".english_name").val("");
        modal_now.find(".modal-title").text("创建部门");
        modal_now.modal("show").attr("data-id","");
    });
    //--------------------------创建部门模态框显示-----------------------------

    //--------------------------查询-----------------------------
    $(".navbar-right").delegate(".btn_search","click",function(){
        console.log($(".search_input").val());
    });
    //--------------------------查询-----------------------------

    //--------------------------示例框显示-----------------------------
    $(".btn-group").delegate(".btn_show_example","click",function(e){
        e.stopPropagation();
        if($(".show_example_div").is(":hidden")){
            $(".show_example_div").show();
        }else{
            $(".show_example_div").hide();
        }
    });
    //--------------------------示例框显示-----------------------------

    $(document).click(function(){
        $(".show_example_div").hide();
    });

    //--------------------------表单验证-----------------------------
    $(".department_form").validate({
        debug:true,
        rules:{
            department_chinese_name:{
                name:[]
            },
            department_english_name:{
                name:[]
            }
        },
        errorPlacement : function(error, element) {
            //忽略自定义的方法错误提示
            if (error.text() == "ignore") {
                return true;
            }
        },
        submitHandler:function(form){
            var modal_now=$(form).parents(".modal");
            var data={
                cname:"",
                ename:""
            };
            data.cname=$(form).find(".chinese_name").val();
            data.ename=$(form).find(".english_name").val();
            if(modal_now.hasClass("modal_create_department")){

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
            $(".error_tips").text("请填写中文名或英文名").show();
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
    }, "ignore");
    //--------------------------表单验证-----------------------------

    // 空字符串判断
    function isEmpty(v) {
        if(v==""){
            return true;
        }else{
            return false;
        }
    }

    //--------------------------编辑部门模态框显示-----------------------------
    $(".btn-group").delegate(".btn_edit","click",function(){
        var cname=$(this).parents("tr").find("td").eq(1).text();
        var ename=$(this).parents("tr").find("td").eq(2).text();
        var d_id=$(this).parents("tr").attr("data-id");
        var modal_now=$(".modal_department");
        modal_now.removeClass("modal_create_department").addClass("modal_edit_department");
        modal_now.find(".chinese_name").val(cname);
        modal_now.find(".english_name").val(ename);      //数据回填
        modal_now.find(".modal-title").text("编辑部门");
        modal_now.modal("show").attr("data-id",d_id);
    });
    //--------------------------编辑部门模态框显示-----------------------------

    //--------------------------批量上载模态框显示-----------------------------
    $(".btn-group").delegate(".btn_batch_upload","click",function(){
        $(".modal_upload").modal("show");
        $("#is_upload").val("");
        $("#file").val("");
        $(".error_prompt").hide();
    });
    //--------------------------批量上载模态框显示-----------------------------

    //--------------------------批量上载上传文件验证-----------------------------
    $(".modal_upload").delegate(".btn-primary","click",function(){
        if($("#is_upload").val()){
            $(".modal_upload").modal("hide");
        }else{
            $(".error_prompt").show();
        }
    });
    //--------------------------批量上载上传文件验证----------------------------
});

function fileChange(target) {
    var name=target.value;
    var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    if(fileName !="xls" && fileName !="xlsx"){
        alert("请选择execl格式文件上传！");
        target.value="";
        return false;
    }else{
        $("#is_upload").val("1");
        $(".error_prompt").hide();
        console.log(target.value);
    }
}