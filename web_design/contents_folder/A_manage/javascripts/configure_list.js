/**
 * Created by Yangyue on 2016/7/20.
 */

$(document).ready(function(){

    var par=".configure_list";

    $(par).delegate(".btn_create_configure","click",function(){
       $(".modal_create_configure").modal("show");
    });

    $(par).delegate(".modal_create_configure .btn-primary","click",function(){
        $("input:radio").each(function(){
            if($(this).prop("checked")){
                var val=$(this).val();
                switch (val)
                {
                    case "custom_made_game":
                        gameConfigureInitial("定制化游戏配置");
                        break;
                    case "mould_game":
                        gameConfigureInitial("模板化游戏配置");
                        break;
                    case "function":
                        fConfigureInitial("功能配置","功能");
                        break;
                    case "form":
                        fConfigureInitial("报表配置","报表");
                        break;
                    default:
                        break;
                }
                $(".modal_create_configure").modal("hide");
            }
        });
    });

    $(par).delegate(".dropdown a","click",function(){
        var text=$(this).text();
        var d_id=$(this).attr("data-id");
        var par=$(this).parents(".dropdown");
        par.find(".choose_span").text(text);
        par.attr("data-id",d_id);

    });

    $(par).delegate(".content_mb_subject .btn_back","click",function(){
        $(".content_mb_title").text("配置列表");
        $(".content_mb_subject").hide().eq(0).show();
    });

    //$(par).delegate(".btn_collect","click",function(){
    //   if($(this).hasClass("btn_un_collected")){
    //       $(this).removeClass("btn_un_collected").addClass("btn_collect_already");
    //       $(this).text("已收藏");
    //   }else{
    //       $(this).addClass("btn_un_collected").removeClass("btn_collect_already");
    //       $(this).text("收藏");
    //   }
    //});

    //--------------------分组模态框--------------------------------
    $(par).delegate(".btn_group","click",function(){
        var par=$(this).parents('tr');
        var modal_now=$(".modal_group");
        var d_group=par.attr("data-group");
        modal_now.find("input:checkbox").each(function(){      //分组信息回填
            if(d_group.indexOf($(this).attr("data-id"))>=0){
                $(this).prop("checked",true);
            }else{
                $(this).prop("checked",false);
            }
        });
        modal_now.attr("data-group",par.attr("data-group"));
        modal_now.modal("show").attr("data-id",par.attr("data-id"));
    });
    //--------------------分组模态框--------------------------------

    //--------------------选择分组确认--------------------------------
    $(par).delegate(".modal_group .btn-primary","click",function(){
        var par=$(this).parents(".modal_group");
        var d_id=par.attr('data-id');
        console.log(d_id);
        var d_group="";
        $("input:checkbox").each(function(index){
            if($(this).prop("checked")){
                d_group=d_group+$(this).index();
            }
        });
        console.log(d_group);
        $(".table_body tr").each(function(){
            console.log($(this).attr("data-id"));
            if($(this).attr("data-id")==d_id){
                $(this).attr("data-group",d_group);
            }
        });
        par.modal("hide");
    });
    //--------------------选择分组确认--------------------------------

    $(par).delegate(".btn-group .btn_edit","click",function(){
        var tr=$(this).parents("tr");
        var kind=tr.find("td").eq(1).text();
        var name=tr.find("td").eq(2).text();
        var url=tr.find("td").eq(3).text();
        var d_id=tr.attr("data-id");
        var configure_detail={
            introduction:"aaaaaaaaaaaa",
            price:"2000",
            code_d_id:"1",
            code_text:"社交类",
            checkbox_input1:true,
            checkbox_input2:false,
            checkbox_input3:true,
            img_src1:"",
            img_p1:"12.jpg",
            img_src2:"",
            img_p2:"34.jpg",
            ID_code:"2222"
        };
        switch (kind){
            case "定制化游戏":
                gameConfigureEdit("定制化游戏配置",configure_detail,name,url,d_id);
                break;
            case "模板化游戏":
                gameConfigureEdit("模板化游戏配置",configure_detail,name,url,d_id);
                break;
            case "功能":
                fConfigureEdit("功能配置",configure_detail,name,url,"功能",d_id);
                break;
            case "报表":
                fConfigureEdit("报表配置",configure_detail,name,url,"报表",d_id);
                break;
            default:
                break;
        }
    });

    $(par).delegate(".form_group_introduction .btn_preview","click",function(){
        $(".modal_preview").modal("show");
    });

    //--------------------------------删除模态框-------------------------------
    $(par).delegate(".btn_delete","click",function(){
        var modal_now=$(".modal_delete");
        var d_id=$(this).parents("tr").attr("data-id");
        modal_now.attr("data-id",d_id).modal("show");
    });
    //--------------------------------删除模态框-------------------------------

    //--------------------------------删除确认-------------------------------
    $(par).delegate(".modal_delete .btn_confirm","click",function(){
        var modal_now=$(".modal_delete");
        console.log(modal_now.attr("data-id"));
        modal_now.modal("hide");
    });
    //--------------------------------删除确认-------------------------------

    $(par).delegate(".custom_made_game_configure .btn_submit","click",function(){
       var kind=$(".content_mb_title").text();
       var configure_detail={
            name:"",
            introduction:"",
            price:"",
            code_d_id:"1",
            code_text:"社交类",
            checkbox_input1:true,
            checkbox_input2:false,
            checkbox_input3:true,
            img_src1:"",
            img_p1:"",
            img_src2:"",
            img_p2:"",
            ID_code:"",
            url:""
        };
        var content_now=$(".custom_made_game_configure");
        configure_detail.name=content_now.find("input").eq(0).val();
        configure_detail.introduction=content_now.find("input").eq(1).val();
        configure_detail.price=content_now.find("input").eq(2).val();
        configure_detail.code_d_id=content_now.find(".dropdown").attr("data-id");
        configure_detail.code_text=content_now.find(".choose_span").text();
        configure_detail.checkbox_input1=content_now.find(".checkbox_input").eq(0).prop("checked");
        configure_detail.checkbox_input2=content_now.find(".checkbox_input").eq(1).prop("checked");
        configure_detail.checkbox_input3=content_now.find(".checkbox_input").eq(2).prop("checked");
        configure_detail.img_src1=content_now.find(".upload_img").eq(0).attr("src");
        configure_detail.img_p1=content_now.find(".img_name p").eq(0).text();
        configure_detail.img_src2=content_now.find(".upload_img").eq(1).attr("src");
        configure_detail.img_p2=content_now.find(".img_name p").eq(1).text();
        configure_detail.ID_code= content_now.find(".ID_code_input").val();
        configure_detail.url= content_now.find(".url_input").val();
        if(content_now.hasClass("configure_create")){

        }else{
            console.log(content_now.attr("data-id"));
        }
        if(kind=="定制化游戏配置"){
            console.log("定制化游戏");
        }else{
            console.log("模板化游戏");
        }
    });

    $(par).delegate(".btn_check","click",function(){
        var text=$(this).prev(".ID_code_input").val();
        if(text!=""){
            $(this).next(".btn_confirm").attr("disabled",false);
        }
    });

    $(par).delegate(".function_configure .btn_submit","click",function(){
        var kind=$(".content_mb_title").text();
        var configure_detail={
            name:"",
            introduction:"",
            price:"",
            img_src1:"",
            img_p1:"",
            ID_code:"",
            url:""
        };
        var content_now=$(".function_configure");
        configure_detail.name=content_now.find("input").eq(0).val();
        configure_detail.introduction=content_now.find("input").eq(1).val();
        configure_detail.price=content_now.find("input").eq(2).val();
        configure_detail.img_src1=content_now.find(".upload_img").eq(0).attr("src");
        configure_detail.img_p1=content_now.find(".img_name p").eq(0).text();
        configure_detail.ID_code= content_now.find(".ID_code_input").val();
        configure_detail.url= content_now.find(".url_input").val();
        if(content_now.hasClass("configure_create")){

        }else{
            console.log(content_now.attr("data-id"));
        }
        if(kind=="功能配置"){
            console.log("功能");
            console.log(configure_detail);
        }else{
            console.log("报表");
            console.log(configure_detail);
        }
    });


    function gameConfigureInitial(title){
        $(".content_mb_title").text(title);
        var content_now=$(".custom_made_game_configure");
        content_now.removeClass("configure_edit").addClass("configure_create");
        content_now.attr("data-id","");
        content_now.find("input").val("").trigger("keyup");
        $(".custom_made_game_configure .dropdown").attr("data-id","0").find(".choose_span").text("");
        $(".custom_made_game_configure input:checkbox").attr("checked",false);
        $(".custom_made_game_configure .upload_img").attr("src","").next("p").text("");
        $(".content_mb_subject").hide().eq(1).show();
    }

    function fConfigureInitial(title,kind){
        $(".content_mb_title").text(title);
        var content_now=$(".function_configure").trigger("keyup");
        content_now.removeClass("configure_edit").addClass("configure_create");
        content_now.attr("data-id","");
        content_now.find("input").val("");
        content_now.find("label").eq(0).text("请输入"+kind+"名称");
        content_now.find("label").eq(1).text("请输入"+kind+"介绍");
        content_now.find("label").eq(2).text("请输入"+kind+"价格");
        content_now.find(".upload_img").attr("src","").next("p").text("");
        $(".content_mb_subject").hide().eq(2).show();
    }

    function gameConfigureEdit(title,configure_detail,name,url,d_id){
        $(".content_mb_title").text(title);
        var content_now=$(".custom_made_game_configure");
        content_now.addClass("configure_edit").removeClass("configure_create");
        content_now.attr("data-id",d_id);
        content_now.find("input").eq(0).val(name).trigger("keyup");
        content_now.find("input").eq(1).val(configure_detail.introduction).trigger("keyup");
        content_now.find("input").eq(2).val(configure_detail.price);
        content_now.find(".dropdown").attr("data-id",configure_detail.code_d_id).find(".choose_span").text(configure_detail.code_text);
        content_now.find(".checkbox_input").eq(0).attr("checked",configure_detail.checkbox_input1);
        content_now.find(".checkbox_input").eq(1).attr("checked",configure_detail.checkbox_input2);
        content_now.find(".checkbox_input").eq(2).attr("checked",configure_detail.checkbox_input3);
        content_now.find(".upload_img").eq(0).attr("src",configure_detail.img_src1);
        content_now.find(".upload_img").eq(1).attr("src",configure_detail.img_src2);
        content_now.find(".img_name p").eq(0).text(configure_detail.img_p1);
        content_now.find(".img_name p").eq(1).text(configure_detail.img_p2);
        content_now.find(".ID_code_input").val(configure_detail.ID_code);
        content_now.find(".url_input").val(url);
        $(".content_mb_subject").hide().eq(1).show();
    }

    function fConfigureEdit(title,configure_detail,name,url,kind,d_id){
        $(".content_mb_title").text(title);
        var content_now=$(".function_configure");
        content_now.addClass("configure_edit").removeClass("configure_create");
        content_now.attr("data-id",d_id);
        content_now.find("label").eq(0).text("请输入"+kind+"名称");
        content_now.find("label").eq(1).text("请输入"+kind+"介绍");
        content_now.find("label").eq(2).text("请输入"+kind+"价格");
        content_now.find("input").eq(0).val(name).trigger("keyup");
        content_now.find("input").eq(1).val(configure_detail.introduction).trigger("keyup");
        content_now.find("input").eq(2).val(configure_detail.price);
        content_now.find(".upload_img").eq(0).attr(configure_detail.img_src1);
        content_now.find(".img_name p").eq(0).text(configure_detail.img_p1);
        content_now.find(".ID_code_input").val(configure_detail.ID_code);
        content_now.find(".url_input").val(url);
        $(".content_mb_subject").hide().eq(2).show();
    }

});

/*
 函数名称：fileChange
 参数：js原生选择器
 功能：限制图片上传格式为jpg或者png
 */
function iconUpload(target) {
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
        var url=getObjectURL(target.files[0]);           //获取图片url
        $(target).next(".img_name").find(".upload_img").attr("src",url);      //显示上传图片
        $(target).next(".img_name").find("p").text(fileName);          //显示上传图片文件名
    }
}