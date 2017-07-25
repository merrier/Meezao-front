
/**
 * Created by Yangyue on 2016/8/17.
 */

var width=$(".form_brick").width();
var height=$(".form_brick").height();
console.log(width);
console.log(height);
var width1=width*0.745;
var width2=width*0.245;
var height1=height*0.49;

console.log(width1);
console.log(width2);
console.log(height1);

console.log($("#single_document_reading_analysis").width());
console.log($("#single_document_reading_analysis").height());

function updateChartSize(id,formWidth,formHeight){

    console.log(formWidth);
    console.log(formHeight);

    var width=$(window).width();
    console.log(width);
    var size=width/1400;
    console.log(size);


    if(width>1400){
        var formWidth=formWidth*size;
        width1=(formWidth-10)*0.745;
        width2=(formWidth-10)*0.245;
        var formHeight=formHeight*size;
        height=(formHeight-10);
        height1=(formHeight-10)*0.49;
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

updateChartSize("#single_document_reading_analysis",(width+10),(height+10));

$(function(){

    //------------------------------开始时间选择--------------------
    $("#from").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        minDate: 'Today',
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            $(".config_item_timeperiod .error_message").hide();
        }
    });
    //------------------------------开始时间选择--------------------

    //------------------------------结束时间选择--------------------
    $("#to").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
            $(".config_item_timeperiod .error_message").hide();
        }
    });
    //------------------------------结束时间选择--------------------

    function initDataSource(){
        var ul=$(".config_item_datasource .dropdown-menu");
        var dataSource=[
            '2016/08/07 享受春意',
            '2016/08/08 享受春意盎然，您有多张优惠入场券',
            '2016/08/09 享受春意盎然，您有多张优惠入场券',
            '2016/08/10 享受春意盎然，您有多张优惠入场券',
            '2016/08/11 享受春意盎然，您有多张优惠入场券',
            '2016/08/12 享受春意盎然',
            '2016/08/12 享受春意盎然'
        ];
        for(var i=0;i<dataSource.length;i++){
            var li=$("<li><a href='javascript:void(0);'></a></li>");
            li.find("a").text(dataSource[i]).attr("data-id",i);
            li.appendTo(ul);
        }
    }

    initDataSource();

    $(".config_item_datasource .dropdown-menu").on("click","li a",function(){

        var text=$(this).text();
        var data_id=$(this).attr("data-id");

        $(this).parents(".dropdown").find(".datasource_choose").text(text);
        $(this).parents(".dropdown").attr("data-id",data_id);
        $(".config_item_datasource .error_message").hide();

    });

    $(".form_configure_bottom").delegate(".btn_set_default","click",function(){

        console.log("error");

        var startTime=$("#from").val();
        var endTime=$("#to").val();
        var datasource_choose=$(".config_item_datasource .datasource_choose").text();

        if(startTime=="" || endTime==""){
            $(".config_item_timeperiod .error_message").show();
        }else{
            $(".config_item_timeperiod .error_message").hide();
        }

        if(datasource_choose==""){
            $(".config_item_datasource .error_message").show();
        }else{
            $(".config_item_datasource .error_message").hide();
        }

    });

});



$(function(){

    var dataArray={
        "first":
        {
            "text":"单条文案阅读分析",
            "time":['01-01','01-02','01-03','01-04','01-05','01-06','01-07'],
            "public_number":{"color":"#99FF00","data":[3000,2412,2509,1080,4077,3222,2309]},
            "friends_transmit":{"color":"#FF0000","data":[1900,2800,3666,4511,3000,4000,4980]},
            "circle_of_friends":{"color":"#00CC00","data":[2555,2890,3400,1900,1700,300,988]},
            "history_message":{"color":"#FFF","data":[2090,1600,3900,3200,2566,4521,3980]},
            "others":{"color":"#33FFFF","data":[4900,4080,3509,3100,2678,1300,1000]},
            "pie":{"data":[100,200,300,400,500]}
        },
        "second":
        {
            "text":"",
            "time":['01-01','01-02','01-03','01-04','01-05','01-06','01-07'],
            "graphic_page":{"color":"#99FF00","data":[70, 69, 95, 145, 182, 215, 292]},
            "origin_page":{"color":"#FF0000","data":[20, 80, 57, 113, 170, 220, 248]},
            "share_transmit":{"color":"#00CC00","data":[90, 60, 35, 84, 135, 170, 186]},
            "wechat_collect":{"color":"#FFF","data":[39, 42, 57, 85, 119, 152, 170]}
        },
        "third":
        {
            "text":"",
            "time":['北京市', '天津市', '上海市', '重庆市', '河北省','云南省','辽宁省','黑龙江',
                '湖南省','安徽省','山东省','新疆省','江苏省','浙江省','江西省'],
            "total_fans":{"color":"#FFF","data":[137, 131, 125, 100, 80,39,34,46,29,26,24,22,20,19,10]},
            "new_fans":{"color":"#00FF00","data":[90,80,77,70,40,30,29,10,0,0,0,0,0,0,0]}
        }
    };
    var first_array=dataArray.first;
    var second_array=dataArray.second;
    var third_array=dataArray.third;

    $(".details_modules_name").val(first_array.text).trigger("keyup");

    $('#single_document_reading_analysis_first').highcharts({
        chart: {
            backgroundColor:'#660099',
            borderRadius:5,
            height:height1,
            width:width1,
            marginLeft:50,
            marginTop:40
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        title: {
            text: first_array.text,
            align:'left',
            x:10,
            y:15,
            style:{
                color:"#fff",
                fontFamily: '微软雅黑',
                fontSize: 15,
                fontWeight:'bold'
            }
        },
        tooltip: {
            formatter: function () {
                var s;
                if(this.series.type=='line'){
                    s = '<b>' + this.x + '</b>';
                    s += '<br/>'+'文章标题: '+'<br/>' + this.series.name + ': ' + this.y + 'm';

                }else{
                    s = '<b>' +this.point.name+':' +Math.round(this.percentage*100)/100 +'%'+ '</b>'
                }
                return s;
            }
        },
        xAxis: {
            categories: first_array.time,
            labels:{
                style:{
                    color:"#fff"
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels:{
                style:{
                    color:"#fff"
                }
            }
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
            type: 'line',
            name: '公众号会话',
            data: first_array.public_number.data,
            color: first_array.public_number.color
        }, {
            type: 'line',
            name: '好友转发',
            data: first_array.friends_transmit.data,
            color: first_array.friends_transmit.color
        }, {
            type: 'line',
            name: '朋友圈',
            data: first_array.circle_of_friends.data,
            color: first_array.circle_of_friends.color
        }, {
            type: 'line',
            name: '历史消息',
            data: first_array.history_message.data,
            color: first_array.history_message.color
        }, {
            type: 'line',
            name: '其他',
            data: first_array.others.data,
            color: first_array.others.color
        }, {
            type: 'pie',
            name: '比例',
            innerSize:60,
            data: [{
                name: '公众号会话',
                y: first_array.pie.data[0],
                color: first_array.public_number.color
            }, {
                name: '好友转发',
                y: first_array.pie.data[1],
                color: first_array.friends_transmit.color
            }, {
                name: '朋友圈',
                y: first_array.pie.data[2],
                color: first_array.circle_of_friends.color
            },{
                name: '历史消息',
                y: first_array.pie.data[3],
                color: first_array.history_message.color
            },{
                name: '其他',
                y: first_array.pie.data[4],
                color: first_array.others.color
            }],
            center: [580, 0],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });

    $('#single_document_reading_analysis_second').highcharts({
        chart: {
            backgroundColor:'#660099',
            borderRadius:5,
            height:height1,
            width:width1,
            reflow:true,
            marginLeft:50,
            marginTop:34
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: second_array.time,
            labels:{
                style:{
                    color:"#fff"
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels:{
                style:{
                    color:"#fff"
                }
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            align: 'center',
            floating: false,
            itemDistance: 120,
            itemStyle:{
                color:'#fff'
            }
        },
        series: [{
            name: '图文页阅读人数',
            data: second_array.graphic_page.data,
            color: second_array.graphic_page.color
        }, {
            name: '原文页阅读人次',
            data: second_array.origin_page.data,
            color: second_array.origin_page.color
        }, {
            name: '分享转发人数',
            data: second_array.share_transmit.data,
            color: second_array.share_transmit.color
        }, {
            name: '微信收藏人数',
            data: second_array.wechat_collect.data,
            color: second_array.wechat_collect.color
        }]
    });

    $('#single_document_reading_analysis_third').highcharts({
        chart: {
            backgroundColor:'#660099',
            type: 'bar',
            height:height,
            width:width2,
            reflow:true,
            borderRadius:5,
            marginLeft:65,
            marginBottom:30,
            marginRight:20
        },
        title: {
            text: ''
        },
        plotOptions:{
            bar:{
                borderWidth:0
            }
        },
        scrollbar: {
            enabled: true
        },
        xAxis: {
            categories: third_array.time,
            title: {
                text: null
            },
            labels:{
                style:{
                    color:"#fff"
                }
            },
            min:0,
            max:10,
            lineWidth:0,   //去除x轴轴线
            tickWidth: 0   //去除x轴刻度线
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style:{
                    color:'#fff'
                }
            },
            gridLineWidth:0
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            enabled:false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '总粉丝数',
            data: third_array.total_fans.data,
            color: third_array.total_fans.color
        }, {
            name: '新增粉丝数',
            data: third_array.new_fans.data,
            color: third_array.new_fans.color
        }]
    });
});