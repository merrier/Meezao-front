/**
 * Created by Administrator on 2016/5/19.
 */

$(function(){

    $(".navbar-right").delegate(".btn_search","click",function(){
        var search_input=$(this).parents(".navbar-right").find(".form-control").val();
        console.log("输入内容："+search_input);
        var create_time=$(".create_time_second").find(".dropdown").attr("data-id");
        var open_state=$(".open_state").find(".dropdown").attr("data-id");
        var module_kind=$(".module_kind").find(".dropdown").attr("data-id");
        console.log("创建时间："+create_time);       //正序2，倒序1，初始2
        console.log("开通状态："+open_state);           //开通状态：初始1，全部1，已开通2，未开,3，已过期4
        console.log("模块类型："+module_kind);         //模块类型：初始1，全部1，功能模块2，报表模块3
    });

    $(".dropdown-menu li").delegate("a","click",function(){
        var par=$(this).parents(".dropdown");
        par.find("span").eq(0).text($(this).text());
        par.attr("data-id",$(this).attr("data-id"));
        var create_time=$(".create_time_second").find(".dropdown").attr("data-id");
        var open_state=$(".open_state").find(".dropdown").attr("data-id");
        var module_kind=$(".module_kind").find(".dropdown").attr("data-id");
        console.log("创建时间："+create_time);     //正序2，倒序1，初始2
        console.log("开通状态："+open_state);        //开通状态：初始1，全部1，已开通2，未开,3，已过期4
        console.log("模块类型："+module_kind);       //模块类型：初始1，全部1，功能模块2，报表模块3
    })
})