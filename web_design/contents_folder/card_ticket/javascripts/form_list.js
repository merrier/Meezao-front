/**
 * Created by Administrator on 2016/5/21.
 */

$(function(){

    //--------------------删除模态框显示----------------------------------
    $(document).on("click",".btn-delete",function(e){
        e.stopPropagation();
        var name=$(this).parents("tr").find("td").eq(1).text();    //删除按钮对应的卡券名称
        $(".modal-form-delete").attr("data-name",name).modal("show");
    });
    //--------------------删除模态框显示----------------------------------

    //--------------------确认删除卡券----------------------------------
    $(".modal-form-delete .btn_confirm").click(function(){
        console.log($(".modal-form-delete").attr("data-name"));
        $(".modal-form-delete").modal("hide");
    });
    //--------------------确认删除卡券----------------------------------

    //--------------------可用卡券详情显示----------------------------------
    $(".btn-card-quantity").click(function(e){
        e.stopPropagation();
        $(".modal-available-card").find('h4').text($(this).parents("tr").find("td").eq(1).text()+"(可用卡券)");
        $(".modal-available-card").modal("show");
    });
    //--------------------可用卡券详情显示----------------------------------

    $(".create_form").click(function(){
        appendImg(2);
        $("#form_name_input").val("");
        $(".modal_create_form").modal("show").find(".back_img").attr("src","");
    });

    $(".btn-preview").click(function(e){
        e.stopPropagation();
        $(".preview_div").css({"top":e.pageY+26});
        $(".preview_div").css({"left":e.pageX});
        $(".preview_div").show();
    });

    $(document).click(function(){
        $(".preview_div").hide();
    });

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu li a").click(function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id",$(this).attr("data-id"));
        var time=$(".dropdown").eq(0).attr("data-id");
        console.log("time: "+time);
    });
    //---------------------下拉菜单改变文字------------------

    $(".modal_create_form .dropdown-menu li a").click(function(){
        var text=$(this).text();
        $(this).parents(".dropdown").find(".inner_text").text(text);
        if(text=="两格"){
            appendImg(2);
        }else if(text=="三格"){
            appendImg(3);
        }else if(text=="四格"){
            appendImg(4);
        }
        else if(text=="五格"){
            appendImg(5);
        }
        else{
            appendImg(6);
        }
    });

    //------------------图片上传及预览------------------
    $(".form_style_input").change(function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            bgImageUpload(".back_img",picurl,filesize,size);
        }
    });

    //---------------表单验证-------------------------------------
    $(".form_create").validate({
        debug:true,
        rules:{
            form_name:{
                required:true
            }
        },
        messages:{
            form_name:{
                required:"*请输入表单名称"
            }
        },
        errorPlacement : function(error, element) {
            error.appendTo(element.parent().siblings(".error_show"));
        },
        errorClass:"error_tips",
        errorElement: "label"
    })
    //---------------表单验证-------------------------------------

    //---------------确定创建表单-------------------------------------
    $(".modal_create_form").delegate(".btn_confirm","click",function(){
        var form_name=$("#form_name_input").val();
        var img_src=$(".back_img").attr("src");
        var form_style=$(".inner_text").text();
        if(form_name==""){

        }else{
            console.log("表单名称:"+form_name);
            console.log("图片src:"+img_src);
            console.log("表格样式:"+form_style);
        }
    })
    //---------------确定创建表单-------------------------------------

})

function appendImg(number){
    $(".card_style").find("img").remove();
    for(var i= 0;i<number;i++){
        $(".card_style").append("<img src='images/card_style.png'>");
    }
};

//------------------输入框计数显示--------------------------
function count(tag,max,name){
    var text=document.getElementById(tag).value.length;
    var max=max;
    var show=text+"/"+max;
    document.getElementById(name).innerText=show;
}
