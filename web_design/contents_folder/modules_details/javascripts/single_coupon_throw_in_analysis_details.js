/**
 * Created by Yangyue on 2016/8/19.
 */
//$(function(){
//
//    //-----------------------ajax拉取数据---------------------
//    function ajaxGet() {
//        var barget = [];
//        $.ajax({
//            dataType: "json",
//            url: "hahahahahah.html",
//            type: "GET",
//            async: false,
//            error: function (data) {
//                data = [{
//                    text:"单一卡券投放分析",
//                    time:['01-01','01-08','01-15','01-22','01-29','02-05','02-12','02-19','02-26','03-05','03-12','03-19','03-26'],
//                    dataArray1:[70, 69, 95, 145, 182, 215, 292,200,300,400,90,120],
//                    dataArray2:[20, 80, 57, 113, 170, 220, 248,312,109,130,230,90],
//                    dataArray3:[90, 60, 35, 84, 135, 170, 186,99,140,290,109,77],
//                    dataArray4:[39, 42, 57, 85, 119, 152, 170,309,200,80,340,50]
//
//                }];
//                barget = data;
//                console.info(data);
//            },
//            done: function (data) {
//                console.log("拉取环图数据失败!")
//            },
//            always: function () {
//
//            },
//            complete: function () {
//            }
//        });
//        return barget;
//    }
//
//    var dataArray = ajaxGet();
//    //-----------------------ajax拉取数据---------------------
//
//    Highcharts.setOptions({
//        colors: ['#fff', '#0000ff', '#000','#FF0000']
//    });
//
//    $('#single_coupon_throw_in_analysis').highcharts({
//        chart: {
//            backgroundColor:'#660099',
//            borderRadius:5,
//            height:375,
//            width:950,
//            marginLeft:50,
//            marginTop:50
//        },
//        scrollbar: {
//            enabled: true
//        },
//        credits:{
//            enabled:false // 禁用版权信息
//        },
//        title: {
//            text: dataArray[0].text,
//            align:'left',
//            x:10,
//            y:15,
//            style:{
//                color:"#fff",
//                fontFamily: '微软雅黑',
//                fontSize: 15,
//                fontWeight:'bold'
//            }
//        },
//        xAxis: {
//            categories: dataArray[0].time,
//            labels:{
//                style:{
//                    color:"#fff"
//                }
//            },
//            min:0,
//            max:10
//        },
//        yAxis: {
//            title: {
//                text: ''
//            },
//            labels:{
//                style:{
//                    color:"#fff"
//                }
//            }
//        },
//        tooltip: {
//            valueSuffix: ''
//        },
//        legend: {
//            align: 'center',
//            floating: false,
//            itemDistance: 80,
//            itemStyle:{
//                color:'#fff'
//            }
//        },
//        series: [{
//            name: '投放总数',
//            data: dataArray[0].dataArray1
//        }, {
//            name: '浏览人数',
//            data: dataArray[0].dataArray2
//        }, {
//            name: '领取人数',
//            data: dataArray[0].dataArray3
//        }, {
//            name: '核销人数',
//            data: dataArray[0].dataArray4
//        }]
//    });
//
//});

//$(function () {
//
//    Highcharts.setOptions({
//        colors: ['#009900', '#66ff66', '#3366ff']
//    });
//
//    $(document).ready(function () {
//        $('#single_coupon_provide_analysis').highcharts({
//            chart: {
//                width:715,
//                height:480,
//                plotBackgroundColor: null,
//                plotBorderWidth: null,
//                plotShadow: false,
//                borderColor: '#00ccff',
//                borderWidth: 2,
//                borderRadius: 10
//            },
//            credits:{
//                enabled:false
//            },
//            title: {
//                text: '单一卡券发放分析',
//                align:'left'
//            },
//            legend:{
//                itemDistance:80
//            },
//            tooltip: {
//                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//            },
//            plotOptions: {
//                pie: {
//                    allowPointSelect: true,
//                    cursor: 'pointer',
//                    dataLabels: {
//                        enabled: false
//                    },
//                    showInLegend: true
//                }
//            },
//            series: [{
//                type: 'pie',
//                innerSize:150,
//                size:300,
//                x:20,
//                name: 'Browser share',
//                data: [
//                    ['已领取卡券数',   45.0],
//                    ['已领核销券数',       26.8],
//                    ['剩余库存',  10.0]
//                ]
//            }]
//        });
//    });
//});

$(function(){
    //--------------------自动完成数据源---------------------------
    var test1 = [
        {
            value: 1,
            label: "ActionScriptaaabbbbb"
        },
        {
            value: 2,
            label: "AppleScript"
        },
        {
            value: 3,
            label: "BASIC"
        },
        {
            value: 4,
            label: "Groovy"
        },
        {
            value: 5,
            label: "拉夏贝尔"
        },
        {
            value: 6,
            label: "Action"
        },
        {
            value: 7,
            label: "全部"
        }
    ];
    //--------------------自动完成数据源---------------------------

    single_Auto(".activity_input",test1);   //自动完成搜索单选初始化

    //--------------------自动完成搜索单选-------------------
    function single_Auto(input,source){
        $(input).autocomplete({
            source: source,
            //_renderItem:function (ul, item) {
            //    return $("<li></li>")
            //        .append(item.label+"<br/>"+item.value)
            //        .appendTo(ul);
            //},
            select: function( event, ui ) {
                var span=$("<span class='brand_span'><i class='fa fa-close float_right_single'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_single'></i>");
                span.attr("data-id",ui.item.value);
                $(this).parent().append(span);
                $(this).val("").hide();
                $(this).parents(".form-group").next(".error_show").hide();
                return false;
            }
        });
    }
    //--------------------自动完成搜索单选-------------------

    //--------------------自动完成搜索删除已选项-------------------
    $(document).on("click",".float_right_single",function(){
        var span=$(this).parent();
        span.prevAll('.activity_input').attr("disabled",false).show();
        span.remove();
    });
    //--------------------自动完成搜索删除已选项-------------------

});

var width=$(".form_brick").width();
var height=$(".form_brick").height();
//var titleSize=16;
//var labelSize=12;
console.log(width);
console.log(height);
var width1=width*0.745;
var width2=width;
var height1=height*0.49;
var height2=height*0.4;

console.log(width1);
console.log(width2);
console.log(height1);

console.log($("#single_coupon").width());
console.log($("#single_coupon").height());

var width=$(window).width();
console.log(width);
var size=width/1400;
console.log(size);

function updateChartSize(id,formWidth,formHeight){

    console.log(formWidth);
    console.log(formHeight);

    if(width>1400){
        var formWidth=formWidth*size;
        width1=(formWidth-10)*0.745;
        width2=(formWidth-10);
        var formHeight=formHeight*size;
        height=(formHeight-10);
        height1=(formHeight-10)*0.49;
        height2=(formHeight-10)*0.4;
        console.log(formWidth);
        console.log(formHeight);
        $(".form_main").width(formWidth+"px");
        $(".form_gridly").width(formWidth+"px");
        $(".form_brick").width((formWidth-10)+"px");
        $(".form_brick").height((formHeight-10)+"px");
        $(".form_contents").width((formWidth-10)+"px");
        $(".form_contents").height((formHeight-10)+"px");
        $(id).width((formWidth-10)+"px");
        $(id).height((formHeight-10)+"px");
        console.log(width1);
        console.log(width2);
        console.log(height1);
    }
}

updateChartSize("#single_coupon",(width+10),(height+10));

$(function(){

    var dataArray=
    {
        "throw_in":
        {
            "text":"单一卡券投放分析",
            "time":['01-01','01-08','01-15','01-22','01-29','02-05','02-12','02-19','02-26','03-05','03-12','03-19','03-26'],
            "throw_in_number":{"color":"#fff","data":[70, 69, 95, 145, 182, 215, 292,200,300,400,90,120]},
            "browser_number":{"color":"#0000ff","data":[20, 80, 57, 113, 170, 220, 248,312,109,130,230,90]},
            "get_number":{"color":"#000","data":[90, 60, 35, 84, 135, 170, 186,99,140,290,109,77]},
            "verification_number":{"color":"#FF0000","data":[39, 42, 57, 85, 119, 152, 170,309,200,80,340,50]}
        },
        "provide":
        {
            "text":"单一卡券发放分析",
            "colors":['#009900', '#66ff66', '#3366ff'],
            "data":[
                ['已领取卡券数',   45.0],
                ['已领核销券数',       26.8],
                ['剩余库存',  10.0]
            ]
        }
    };
    console.info(dataArray);
    var throw_in_array=dataArray.throw_in;
    var provide_array=dataArray.provide;

    $("#single_coupon_throw_in_analysis").highcharts({
        chart: {
            backgroundColor:'#660099',
            borderRadius:5,
            height:height2,
            width:width2,
            marginLeft:50,
            marginTop:50
        },
        scrollbar: {
            enabled: true
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        title: {
            text: throw_in_array.text,
            align:'left',
            x:10,
            y:15,
            style:{
                color:"#fff",
                fontFamily: '微软雅黑',
                fontSize: 16*size,
                fontWeight:'bold'
            }
        },
        xAxis: {
            categories: throw_in_array.time,
            labels:{
                style:{
                    color:"#fff",
                    fontSize:12*size
                }
            },
            min:0,
            max:10
        },
        yAxis: {
            title: {
                text: ''
            },
            labels:{
                style:{
                    color:"#fff",
                    fontSize:12*size
                }
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            align: 'center',
            floating: false,
            itemDistance: 80,
            itemStyle:{
                color:'#fff'
            }
        },
        series: [{
            name: '投放总数',
            color:throw_in_array.throw_in_number.color,
            data: throw_in_array.throw_in_number.data
        }, {
            name: '浏览人数',
            color:throw_in_array.browser_number.color,
            data: throw_in_array.browser_number.data
        }, {
            name: '领取人数',
            color:throw_in_array.get_number.color,
            data: throw_in_array.get_number.data
        }, {
            name: '核销人数',
            color:throw_in_array.verification_number.color,
            data: throw_in_array.verification_number.data
        }]
    });

    $("#single_coupon_provide_analysis").highcharts({
        chart: {
            height:height1,
            width:width1,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor: '#00ccff',
            borderWidth: 2,
            borderRadius: 10
        },
        colors: provide_array.colors,
        credits:{
            enabled:false
        },
        title: {
            text: provide_array.text,
            align:'left',
            x:10,
            y:15,
            style:{
                color:"#000",
                fontFamily: '微软雅黑',
                fontSize: 16*size,
                fontWeight:'bold'
            }
        },
        legend:{
            itemDistance:80
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style:{
                        'fontSize':12*size
                    }
                },
                showInLegend: true

            }
        },
        series: [{
            type: 'pie',
            innerSize:'50%',
            size:'80%',
            x:20,
            name: '比例',
            data: provide_array.data
        }]
    });

});