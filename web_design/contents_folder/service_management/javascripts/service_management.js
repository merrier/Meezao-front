/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/25 15:43>
 // +--------------------------------------------------------------------------*/
// JavaScript Document

$(function(){

    //-----------------------------------消息管理-------------------------------------------

    //---------------------下拉菜单改变文字------------------
    $(".dropdown-menu li a").click(function dropDownCommon() {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
    });

    //--------------------内容点击查看全部----------------------
    $(".message_management_table").delegate(".td_content span","click",function(){
        var td_title = $(this).parents("tr").find(".td_title").text();
        var data_name = $(this).attr("data-name");
        $(".modal_message_content").find(".modal-title").text(td_title).end().find(".modal-body").text(data_name).end().modal("show");
    });




    //-----------------------------------文档中心----------------------------------------



});

