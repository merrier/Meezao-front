/* Js data_reduction_backup */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/27 22:27>
 // +--------------------------------------------------------------------------*/


$(function(){

    //-----------------------备份当前时间数据库-------------------------
    $(".navbar-default").delegate(".btn_data_backup","click",function(){
        $(".modal_data_backup").modal("show");
    });


    //----------------------还原数据库至最近备份时间------------------------
    $(".data_reduction_backup").delegate(".btn_data_reduction","click",function(){
        $(".modal_data_reduction").modal("show");
    });

});

