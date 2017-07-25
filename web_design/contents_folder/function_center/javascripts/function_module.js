/**
 * Created by Administrator on 2016/5/20.
 */

$(function(){

    $(".dropdown-menu li a").click(function(){
        var text=$(this).text();
        var data_id=$(this).attr("data-id");
        $(this).parents(".dropdown").attr("data-id",data_id);
        $(this).parent("ul").prevAll(".dropdown-toggle").html(text+' '+'<span class="caret"></span>');
        if(text=="已开通"){
            $(".container_open").show();
            $(".container_unopen").hide();
        }else{
            $(".container_unopen").show();
            $(".container_open").hide();
        }
    });

    $(".content_container .col-md-3").click(function(){
        var title=$(this).find(".title").text();
        var color=$(this).find(".title").css("color");
        $(".function_module_detail").find("h4").text(title).css("color",color);
        $(".function_module_detail").find("img").attr("src",$(this).find("img").attr("src"));
        $(".function_module_detail").modal("show");
    });

    $(".navbar-right").delegate(".btn_search","click",function(){
        var states=$(this).parents(".navbar-right").next(".dropdown").attr("data-id");
        console.log("状态："+states);         //已开通2，未开通1
        var search_input=$(this).parents(".navbar-right").find(".form-control").val();
        console.log("输入内容："+search_input);
    })
})
