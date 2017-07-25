/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/6/14>
 // +--------------------------------------------------------------------------*/
// JavaScript Document
$(function () {

    (function bodyBgAdd(){
        var bg_url = $.trim($("#background-image").val());

        console.info(bg_url);

        console.info("url('" + bg_url + "')");

        $(".page").css("background-image","url('" + bg_url + "')");
    })();

});