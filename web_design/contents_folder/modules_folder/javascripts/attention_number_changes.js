/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/7/13>
 // +--------------------------------------------------------------------------*/
// JavaScript Document
var fontSize=[15,12,12];

function updateChartSize(){

    var width=$(window).width();

    console.log(width);

    if(width>1320){
        width=width*0.75;
        fontSize=[18,14,14];
    }else{
        width=960;
    }

    var width2=width*0.75;
    var width4=width*0.24;
    var width3=width2-10;

    $(".form_main").width(width+"px");
    $(".form_gridly").width(width+"px");
    $(".form_first").width(width2+"px");
    $(".form_second").css("left",width2+"px");
    $("#document_average_forward_rate").width(width4+"px");
    $("#attention_number_changes_30_days").width(width3+"px");

    console.log(width);
    console.log(width2);
    console.log(width3);
}

$(function(){

    updateChartSize();
    $(window).resize(updateChartSize);
    //$(document).resize(updateChartSize);
    console.log($("#attention_number_changes_30_days").width());

});

$(function () {

    var rand = randomImport();
    BarCanvasGenerate("attention_number_changes",rand);

});





