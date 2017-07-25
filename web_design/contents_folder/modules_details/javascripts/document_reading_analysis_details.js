/**
 * Created by Yangyue on 2016/8/15.
 */
$(function () {

    //-----------------------ajax拉取数据---------------------
    function ajaxGet() {
        var barget = [];
        $.ajax({
            dataType: "json",
            url: "hahahahahah.html",
            type: "GET",
            async: false,
            error: function (data) {
                data = [{
                    text:"文案阅读分析",
                    time:['01-01', '01-08', '01-15', '01-22', '02-01', '02-08',
                        '02-15', '02-22', '03-01', '03-08', '03-15'],
                    dataArray1:[499, 715, 1064, 1292, 1440, 1760, 1356, 1485, 2164, 1941, 956],
                    dataArray2:[1.5, 1.2, 1.0, 0.8, 0.7, 1.1, 1.6, 2.1, 2.2, 1.9, 1.6],
                    dataArray3:[70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139]

                }];
                barget = data;
                console.info(data);
            },
            done: function (data) {
                console.log("拉取环图数据失败!")
            },
            always: function () {

            },
            complete: function () {
            }
        });
        return barget;
    }

    var dataArray = ajaxGet();
    //-----------------------ajax拉取数据---------------------

    Highcharts.setOptions({
        colors: ['#FFF', '#000', '#FFFF00']
    });
    $('#document_reading_analysis_first').highcharts({
        chart: {
            backgroundColor:'#2d89ef',
            borderRadius:5,
            zoomType: 'xy',
            height:290,
            width:710,
            marginLeft:50,
            marginRight:100,
            marginTop:50
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        title: {
            text: dataArray[0].text,
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
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: dataArray[0].time,
            crosshair: true,
            labels:{
                style:{
                    color:"#fff",
                    fontFamily: 'Arial',
                    fontSize: 12
                }
            }
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[2],
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                x:10
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[0],
                    fontFamily: 'Arial',
                    fontSize: 12
                }
            }
        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]

                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[1],
                    fontFamily: 'Arial',
                    fontSize: 12
                },
                x:50
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            align: 'center',
            floating: false,
            itemDistance: 80
        },
        series: [{
            name: '阅读人数',
            type: 'column',
            yAxis: 1,
            data: dataArray[0].dataArray1,
            tooltip: {
                valueSuffix: ''
            }
        }, {
            name: '阅读率',
            type: 'spline',
            yAxis: 2,
            data: dataArray[0].dataArray2,
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: '阅读人次',
            type: 'spline',
            yAxis: 0,
            data: dataArray[0].dataArray3,
            tooltip: {
                valueSuffix: ''
            }
        }]
    });

    $(".details_modules_name").val(dataArray[0].text).trigger("keyup");

});

$(function(){

    //-----------------------ajax拉取数据---------------------
    function ajaxGet() {
        var barget = [];
        $.ajax({
            dataType: "json",
            url: "hahahahahah.html",
            type: "GET",
            async: false,
            error: function (data) {
                data = [{
                    text:"",
                    time:['01-01', '01-08', '01-15', '01-22', '02-01', '02-08',
                        '02-15', '02-22', '03-01', '03-08', '03-15'],
                    dataArray1:[70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139],
                    dataArray2:[20, 80, 57, 113, 170, 220, 248, 241, 201, 141, 86],
                    dataArray3:[90, 60, 35, 84, 135, 170, 186, 179, 143, 90, 39],
                    dataArray4:[39, 42, 57, 85, 119, 152, 170, 166, 142, 103, 96]

                }];
                barget = data;
                console.info(data);
            },
            done: function (data) {
                console.log("拉取环图数据失败!")
            },
            always: function () {

            },
            complete: function () {
            }
        });
        return barget;
    }

    var dataArray = ajaxGet();
    //-----------------------ajax拉取数据---------------------

    Highcharts.setOptions({
        colors: ['#FFF', '#990099','#000', '#FF0000']
    });

    $('#document_reading_analysis_second').highcharts({
        chart: {
            backgroundColor:'#2d89ef',
            borderRadius:5,
            height:290,
            width:710,
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
            categories:  dataArray[0].time,
            labels:{
                style:{
                    color:"#fff",
                    fontFamily: 'Arial',
                    fontSize: 12
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels:{
                style:{
                    color:"#fff",
                    fontFamily: 'Arial',
                    fontSize: 12
                }
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            itemDistance:70
        },
        series: [{
            name: '阅读人数',
            data: dataArray[0].dataArray1
        }, {
            name: '阅读人次',
            data: dataArray[0].dataArray2
        }, {
            name: '转发人数',
            data: dataArray[0].dataArray3
        }, {
            name: '点赞人数',
            data: dataArray[0].dataArray4
        }]
    });

});
