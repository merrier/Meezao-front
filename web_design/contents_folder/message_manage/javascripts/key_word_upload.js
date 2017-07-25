/**
 * Created by Administrator on 2016/7/8.
 */

$(document).ready(function(){

    var par=".key_word_upload";

    //-----------------------------组名、用户名选择----------------------------------
    $(par+" .input-group-btn").delegate(".dropdown-menu a","click",function(){
        var data_id=$(this).attr("data-id");
        var text=$(this).text();
        $(this).parents(".dropdown").attr("data-id",data_id).find("span").eq(0).text(text);
    });
    //-----------------------------组名、用户名选择----------------------------------

    //------------------------------根据输入进行搜索------------------------
    $(par+" .content_right_header").delegate(".search","click",function(){
        var searchMessage={
            search_id:"",
            search_input:""
        };
        searchMessage.search_id=$(".dropdown").attr("data-id");
        searchMessage.search_input=($(".search_input").val());
        console.log("data-id:"+searchMessage.search_id);
        console.log("input:"+searchMessage.search_input);

        if(searchMessage.search_id=="1"){              //组名输入搜索
            $(".content_item_title").find(".checkAll_p").each(function(){
                if($(this).text().indexOf(searchMessage.search_input)>=0){
                    $(this).parents(".content_item").show();
                    $(this).parents(".content_item").find(".content_item_div").show();
                    $(this).parents(".content_item_title").find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
                } else{
                    $(this).parents(".content_item").hide();
                }
            });
        }else{                                           //用户名输入搜索
            $(".content_item").hide();
            $(".content_item").each(function(){
                $(this).find(".content_item_child").hide();
                $(this).find(".content_item_div .checkAll_p").each(function() {
                    if($(this).text().indexOf(searchMessage.search_input)>=0){
                        $(this).parents(".content_item").show();
                        $(this).parents(".content_item_div").show();
                        $(this).parents(".content_item_div").prev(".content_item_title").find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
                        $(this).parents(".content_item_child").show();
                    } else{
                    }
                });
            });
        }
    });
    //------------------------------根据输入进行搜索------------------------

    //-------------------------下拉选项的显示与隐藏-------------------
    $(document).on("click",".document_upload .content_item i",function(){
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
    $(par+" .content_right_header").delegate(".checkAll_checkbox","click",function(){
        $(".check_item").prop("checked",this.checked);
        $(".check_item_child").prop("checked",this.checked);
        addChoices();
    });
    //-------------------------一级全选/全不选-------------------

    //-------------------------二级全选/全不选-------------------
    $(document).on("click",".document_upload .content_item_title .check_item",function(){
        console.log("1");
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
    $(document).on("click",".document_upload .content_item_child .check_item_child",function(){
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
    $(document).on("click",".document_upload  .fa-close",function(){
        var data_id=Number($(this).parents(".object_div_item").attr("data-id"))-1;     //获取被删除对象的顺序信息
        $(".content_right_middle").find(".check_item_child").eq(data_id).trigger("click");      //触发相应选项的点击事件
    });
    //-------------------------左侧充值对象删除-------------------

    $(par+" .charge_form").validate({
        debug:true,
        rules:{
            document_upload_input:{
                required:true
            },
            object_input:{
                required:true
            }
        },
        messages:{
            document_upload_input:{
                required:"*请选择要上传的文档"
            },
            object_input:{
                required:"*请选择要发布的对象"
            }
        },
        errorClass:"error_tips",
        errorPlacement: function (error, element) {
            error.appendTo($(element).parents(".form-group"));
        },
        submitHandler:function(form){
            console.log("上传文档"+$("#upload_document").val());
            $(".object_div_item").each(function(){
                console.log("object_id:"+$(this).attr("data-id"));            //充值对象的data-id
            });
        }
    });

    initial();

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

/*
 函数功能：菜单初始化
 */
function initial(){
    $(".document_upload_input").val("");
    var object_array={
        "group_name":["新世界北方区","王府井","重庆百货"],
        "user_name":[
            ["新世界望京店","新世界崇文店","新世界顺义店"],
            ["王府井一店","王府井二店","王府井三店","王府井四店"],
            ["重庆百货一店","重庆百货二店","重庆百货三店","重庆百货四店"]
        ]
    };
    var s=0;
    for(var i=0;i<object_array.group_name.length;i++){
        var div=$('<div class="content_item">'+
            '<div class="content_item_title">'+
            '<input type="checkbox" name="checkAll" class="check_item">'+
            '<div class="checkAll_p"></div>'+
            '<i class="fa fa-caret-down fa-2x"></i>'+
            '</div>'+
            '<div class="content_item_div">'+
            '</div>'+
            '</div>');
        div.find(".checkAll_p").text(object_array.group_name[i]);
        var div_par=div.find(".content_item_div");
        for(var j=0;j<object_array.user_name[i].length;j++){
            var div_child=$('<div class="content_item_child">'+
                '<input type="checkbox" name="checkAll" class="check_item_child">'+
                '<div class="checkAll_p"></div>'+
                '</div>');
            s++;
            div_child.find(".check_item_child").attr("data-id", s.toString());
            div_child.find(".checkAll_p").text(object_array.user_name[i][j]);
            div_child.appendTo(div_par);
        }
        div.appendTo(".content_right_middle");
    }
}

/*
 函数名称：fileUpload
 参数：js原生选择器
 功能：限制图片上传格式为xls或者xlsx
 */
function documentUpload(target) {
    var name=target.value;
    var fileType = name.substring(name.lastIndexOf(".")+1).toLowerCase();
    var fileArr=name.split("\\");
    var fileName=fileArr[fileArr.length-1];
    $(target).nextAll(".document_p").text(fileName);
    $(".document_upload_input").val($(target).val());
}
