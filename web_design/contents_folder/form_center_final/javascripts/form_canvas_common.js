/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/8/10>
 // +--------------------------------------------------------------------------*/
// JavaScript Document


//------------------------随机数生成-----------------------
function randomImport() {
    var x = 10000000000;
    var y = 1;
    var rand = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0)) + parseInt(Math.random() * (x - y + 1) + y) + String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
    return rand;
}


//------------------------遍历返回数组的2/3--------------------
function arrayReduce(array) {
    var array_new = [];
    $.each(array, function (index, value) {
        var value_new = parseInt(value * 2 / 3);
        array_new.push(value_new);
    });
    return array_new;
}


//------------------------生成包括name、value的对象数组---------------------
function array_element_to_float_rand(title, item) {
    var read_count = title.length;
    var first = [];
    for (var i = 0; i < read_count; i++) {
        //first.push(item[i] );
        var d = {};
        d['name'] = title[i];
        d['label'] = item[i];
        first.push(d);

    }
    //console.info(first);
    return first;
}


//------------------------echarts或highcharts绘制的所有图表开始-----------------------

var canvas_common_opt = {
    size:{
        symbolSize:10
    },
    color: {
        green: "#00a300",
        yellow: "#ffc40d",
        purple: "#603cba",
        dark_purple:"#660099",
        blue: "#2d89ef",
        axis: "rgba(255,255,255,0.5)"
    },
    line_symbol:["circle","rect","roundRect","triangle","diamond","pin","arrow"],
    title: {
        textStyle: {
            fontFamily: '微软雅黑',
            fontSize: 14 * size_radix,
            fontWeight: 'normal'
        },
        x: 'left',
        padding: [10, 15, 10, 15]
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '16%',
        containLabel: true
    },
    tooltip_formatter_percentage: function (params) {
        var tooltip_str = '';
        for (var i = 0; i < params.length; i++) {
            tooltip_str += params[i].seriesName + ' : ' + (params[i].value * 100).toFixed(0) + "%" + '<br/>';
        }
        return params[0].name + '<br />' + tooltip_str;
    }
};


//-------------------------对图表中的文字进行初始化---------------------
var size_radix = 1,
    symbolSize = 10,
    labelFontSize = 12,
    tooltipFontSize = 13,
    titleFontSize = 14,
    subtitleFontSize = 12,
    emphasisFontSize = 16,
    titleMarginLeft = 30,
    titlePadding = [12.8, 16, 12.8, 16],
    marginArrayFirst = [80, 120, 80, 80],
    marginArraySecond = [80, 40, 80, 80];


//-------------------------报表适配通用方法-----------------------
//id为报表id，formWidth为报表所占宽度比例，formHeight为报表所占高度比例
//此方法只会改变报表的大小，而不会对报表内文字的大小进行改变
function updateChartSize(id, formWidth, formHeight) {

    console.log("调用了updateChartSize");

    var width_win = $(window).width(),    //获取屏幕宽度
        width_main = width_win >= 1234 ? (width_win - 274) : 960,
        size_base = width_win >= 1234 ? (width_win - 274) / 24 : 40,
        width_new = Math.floor(formWidth * size_base),
        height_new = Math.floor(formHeight * size_base);

    $(".form_gridly").css("width", width_main + "px");
    $(".form_main").css("width", width_main + "px");

    $(id).css("width", width_new + "px");   //改变form_brick宽高
    $(id).css("height", height_new + "px");

    $(id + " .form_contents>div").eq(0).css("width", width_new - 10 + "px"); //改变以报表英文名为id的div宽高
    $(id + " .form_contents>div").eq(0).css("height", height_new - 10 + "px");


    //改变form_contents里的孙子div大小，考虑到复合图标类型，所以需要进行额外处理
    $(id + " .form_contents>div>div").each(function () {
        var width_child = $(this).attr("data-width_radio") || 1,    //当没有data-width_radio属性时，默认为100%宽高
            height_child = $(this).attr("data-height_radio") || 1,
            top_child = $(this).attr("data-top_radio") || 0,
            left_child = $(this).attr("data-left_radio") || 0,
            right_child = $(this).attr("data-right_radio") || 0,
            bottom_child = $(this).attr("data-bottom_radio") || 0,
            width_child_new = (width_new - 10) * width_child,
            height_child_new = (height_new - 10) * height_child,
            top_child_new = (height_new - 10) * top_child,
            left_child_new = (width_new - 10) * left_child,
            right_child_new = (width_new - 10) * right_child,
            bottom_child_new = (height_new - 10) * bottom_child;

        $(this).css("width", width_child_new + "px");
        $(this).css("height", height_child_new + "px");
        $(this).css("top", top_child_new + "px");
        $(this).css("bottom", bottom_child_new + "px");
        $(this).css("right", right_child_new + "px");
        $(this).css("left", left_child_new + "px");
    });
}


//-------------------------根据屏幕宽度进行报表适配调用方法-----------------------
//此方法只会改变报表的大小，而不会对报表内文字的大小进行改变
function autoUpdateSize(en_name, rand, method) {

    console.log("执行了autoUpdateSize");

    (function (win) {

        function setUnitA() {

            // var en_name = "active_fans_percentage";

            $("#" + en_name).attr("id", en_name + rand);

            var brick = $("#" + en_name + rand),
                brick_id = brick.parents(".form_brick").attr("id"),
                originWidth = +brick.attr("data-width"),
                originHeight = +brick.attr("data-height");

            updateChartSize("#" + brick_id, originWidth, originHeight);

            if (method) {
                eval(method + "(" + "en_name" + "," + "rand" + ")");
            }
        }

        var h = null;
        window.addEventListener("resize", function () {
            clearTimeout(h);
            h = setTimeout(setUnitA, 300);
        }, false);

        setUnitA();
    })(window);
}


//-------------------根据屏幕宽度改变html的font-size大小---------------
(function (win) {
    function setUnitA() {

        var width_win = $(window).width();

        document.documentElement.style.fontSize = width_win >= 1234 ? (width_win - 274) * 16 / 960 + "px" : "16px";

        size_radix = width_win >= 1234 ? (width_win - 274) / 906 : 1;

        titleFontSize = Math.ceil(14 * size_radix);
        subtitleFontSize = Math.ceil(12 * size_radix);
        labelFontSize = Math.ceil(12 * size_radix);
        tooltipFontSize = Math.ceil(13 * size_radix);
        emphasisFontSize = Math.ceil(16 * size_radix);

        symbolSize = Math.ceil(8 * size_radix);

        for (var k = 0; k < titlePadding.length; k++) {
            titlePadding[i] = titlePadding[i] * size_radix;
            titlePadding[i] = titlePadding[i] * size_radix;
        }

        var originLeft = 80;

        for (var i = 0; i < marginArrayFirst.length; i++) {
            marginArrayFirst[i] = marginArrayFirst[i] * size_radix;
            marginArraySecond[i] = marginArraySecond[i] * size_radix;

        }
        titleMarginLeft = titleMarginLeft + marginArrayFirst[3] - originLeft;

        console.log("titleFontSize:" + titleFontSize);
        console.log("labelFontSize:" + labelFontSize);
        console.log("marginArrayFirst:" + marginArrayFirst);
        console.log("marginArraySecond:" + marginArraySecond);
        console.log("titleMarginLeft:" + titleMarginLeft);
    }

    var h = null;
    window.addEventListener("resize", function () {
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
    }, false);
    setUnitA();
})(window);


// 作者（Merrier）
// 图表类型：饼图
// 所用插件：echarts
// 图表个数(请实时更新)：4
// 图表名称（以中文名字为准）：
//     活跃粉丝比例（active_fans_percentage）
//     忠诚粉丝比例（loyal_fans_percentage）
//     待唤醒粉丝比例（sleeping_fans_percentage）
//     僵尸粉丝比例（zombie_fans_percentage）
function PieCanvasGenerate(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id",en_name + "_canvas" + rand);

    // var dataArray = $('#' + en_name + rand).find("." + en_name).data('list');

    var dataArrays = {
        text: "活跃粉丝比例",
        data: [30, 100],
        color: [canvas_common_opt.color.yellow, "#aaa"]
    };
    var dataArrayss = {
        text: "忠诚粉丝比例",
        data: [20, 90],
        color: [canvas_common_opt.color.green, "#aaa"]
    };
    var dataArraysss = {
        text: "待唤醒粉丝比例",
        data: [40, 100],
        color: [canvas_common_opt.color.purple, "#aaa"]
    };
    var dataArray = {
        text: "僵尸粉丝比例",
        data: [35, 110],
        color: [canvas_common_opt.color.blue, "#aaa"]
    };


    if (typeof(dataArray) == 'string') {
        dataArray = $.parseJSON(dataArray);
    }

    if (dataArray != undefined) {

        var text = dataArray.text,
            data = dataArray.data,
            color = dataArray.color;

        $("#" + en_name + rand).find(".form_pie_number").text(data[0] + "/" + data[1]);
        // $("#" + pie + rand).siblings(".form_pie_number").css('fontSize', labelFontSize);

        var form_option = {
            title: {
                text: text,
                textStyle: {
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                x: 'left',
                padding: titlePadding
            },
            tooltip:{},
            series: [
                {
                    name: text,
                    type: 'pie',
                    radius: ['30%', '60%'],
                    avoidLabelOverlap: false,

                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: data[0],
                            name: text,
                            itemStyle: {
                                normal: {
                                    color: color[0]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: "{d}%",
                                    textStyle: {
                                        fontFamily: 'Arial',
                                        fontSize: titleFontSize
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontFamily: 'Arial',
                                        fontSize: emphasisFontSize
                                    }
                                }
                            }
                        },
                        {
                            value: data[1] - data[0],
                            name: '',
                            itemStyle: {
                                normal: {
                                    color: color[1]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: "{d}%",
                                    textStyle: {
                                        color: "#fff",
                                        fontFamily: 'Arial',
                                        fontSize: titleFontSize
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff",
                                        fontFamily: 'Arial',
                                        fontSize: emphasisFontSize
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        };

        var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

        form_init.setOption(form_option);  //echarts实例化

    }
}

// 作者：Merrier
// 图表类型：柱状图+折线图
// 所用插件：echarts
// 图表个数(请实时更新)：2
// 图表名称（以中文名字为准）：
//     关注人数变化曲线（attention_number_changes）
//     移动端使用人数变化曲线（mobile_user_changes）
function BarCanvasGenerate(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);


    // var dataArray = $('#' + en_name + rand).find("." + en_name).data('list');

    //假数据
    var dataArray = {
        backgroundColor: canvas_common_opt.color.blue,
        title: "移动端使用人数变化曲线",
        x: ['2015-1-1', '2015-1-2', '2015-1-3', '2015-1-4', '2015-1-5', '2015-1-6', '2015-1-7', '2015-1-8', '2015-1-9', '2015-1-10', '2015-1-11', '2015-1-12', '2015-1-13', '2015-1-14', '2015-1-15', '2015-1-16', '2015-1-17', '2015-1-18', '2015-1-19', '2015-1-20', '2015-1-21', '2015-1-22', '2015-1-23', '2015-1-24', '2015-1-25', '2015-1-26', '2015-1-27', '2015-1-28', '2015-1-29', '2015-1-30'],
        y: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200],
        color: ["#ffffff"],
        line: ""
    };


    if (typeof(dataArray) == 'string') {
        dataArray = $.parseJSON(dataArray);
    }

    if (dataArray != undefined) {

        var text = dataArray.title,
            data = dataArray.y,
            time = dataArray.x,
            color = dataArray.color,
            line = dataArray.line;
        // var barWidth = 2;
        // if (time.length < 180) {
        //     barWidth = 10;
        // }
        if (line) {
            line = {
                name: '焦点数值',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#ff0000'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 1,
                        type: 'dashed'
                    }
                },
                data: arrayReduce(data)
            };
        }


        var bar_option = {
            backgroundColor: dataArray.backgroundColor,
            title: {
                text: text,
                textStyle: {
                    color: '#ffffff',
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                padding: titlePadding
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: time,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 'auto',
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    boundaryGap: 10 * size_radix
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: text.first,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    },
                    barCategoryGap: "50%",
                    data: data
                },
                line
            ]
        };

        var bar_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

        bar_init.setOption(bar_option);
    }

}


// 作者：Yangyue
// 图表类型：折线图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     粉丝总数KPI（fun_total_kpi）
function OneBarCanvasGenerate(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    //console.info(en_name + rand);
    //console.info($("." + en_name).html());

    var dataPieArray = $('#' + en_name + rand).find("." + en_name).data('list');

    //console.info(dataPieArray);


    if (typeof(dataPieArray) == 'string') {
        dataPieArray = $.parseJSON(dataPieArray);
    }

    if (dataPieArray != undefined) {

        var text = dataPieArray.text,
            data = dataPieArray.data,
            time = dataPieArray.time,
            color = dataPieArray.color,
            line = dataPieArray.line;

        var bar_option = {
            backgroundColor: color.back,
            title: {
                text: text.title,
                textStyle: {
                    color: text.color,
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                padding: titlePadding
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '16%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    data: time,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        interval: 'auto',
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    boundaryGap: 10
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series: [
                {
                    name: text.first,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: color.first
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: line.color,
                            width: line.width,
                            type: 'solid'
                        }
                    },
                    data: (data)
                }
            ]
        };

        var bar_init = echarts.init(document.getElementById(en_name + rand));

        bar_init.setOption(bar_option);
    }

}


// 作者：Yangyue
// 图表类型：待定
// 所用插件：echarts
// 图表个数(请实时更新)：3
// 图表名称（以中文名字为准）：
//     总体卡券发放KPI（card_voucher_kpi）
//     总体卡券发放成功率分析（card_voucher_success_rate）
//     阅读KPI（copywriter_read_kpi）
function TwoBarCanvasGenerate(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    var dataPieArray = $('#' + en_name + rand).find("." + en_name).data('list');

    if (typeof(dataPieArray) == 'string') {
        dataPieArray = $.parseJSON(dataPieArray);
    }

    if (dataPieArray != undefined) {

        var text = dataPieArray.text,
            data = dataPieArray.data,
            time = dataPieArray.time,
            color = dataPieArray.color,
            line = dataPieArray.line;
        var barWidth = 2;
        if (time.length < 180) {
            barWidth = 5;
        }

        var bar_option = {
            backgroundColor: color.back,
            title: {
                text: text.title,
                textStyle: {
                    color: text.color,
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                // x: 'left',
                padding: titlePadding
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '16%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    data: time,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        interval: 'auto',
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    boundaryGap: 10
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: line.color,
                            opacity: 0.1,
                            width: line.width
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series: [
                {
                    name: text.first,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: color.first
                        }
                    },
                    barWidth: barWidth,
                    data: data.first
                },
                {
                    name: text.second,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: color.second
                        }
                    },
                    barWidth: barWidth,
                    data: data.second
                }
            ]
        };

        var bar_init = echarts.init(document.getElementById(en_name + rand));

        bar_init.setOption(bar_option);
    }

}


// 作者：Yangyue
// 图表类型：双柱状图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     粉丝变化KPI（fun_change_kpi）
function TwoBarCanvasGenerates(en_name, rand) {
    $("#" + en_name).attr("id", en_name + rand);


    var dataPieArray = $('#' + en_name + rand).find("." + en_name).data('list');


    if (typeof(dataPieArray) == 'string') {
        dataPieArray = $.parseJSON(dataPieArray);
    }

    if (dataPieArray != undefined) {

        var text = dataPieArray.text,
            data = dataPieArray.data,
            time = dataPieArray.time,
            color = dataPieArray.color,
            line = dataPieArray.line,
            title = data.title,
            barWidth = 2;
        if (time.length < 180) {
            barWidth = 5;
        }
        var bar_option = {
            backgroundColor: color.back,
            title: {
                text: text.title,
                textStyle: {
                    color: text.color,
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                padding: titlePadding
            },

            tooltip: {

                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params, ticket, callback) {
                    var ticket = ticket.split("_");
                    var res = params[0].name + '<br/>';
                    res += '关注人数:' + title[ticket[ticket.length - 1]] + '<br/>';
                    res += "<font color='" + params[0].color + "'>" + params[0].seriesName + ':' + "</font>" + params[0].data + '<br/>';
                    res += "<font color='" + params[1].color + "'> " + params[1].seriesName + ':' + "</font>" + params[1].data + '<br/>';
                    return res;
                }

            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '16%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    data: time,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        interval: 'auto',
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    boundaryGap: 10
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: line.color,
                            opacity: 0.1,
                            width: line.width
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series: [
                {
                    name: text.first,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: color.first
                        }
                    },
                    barWidth: barWidth,
                    data: data.first

                },
                {
                    name: text.second,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: color.second
                        }
                    },
                    barWidth: barWidth,
                    data: data.second

                }
            ]
        };

        var bar_init = echarts.init(document.getElementById(en_name + rand));

        bar_init.setOption(bar_option);
    }
}

// 作者：Yangyue
// 图表类型：双环形图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     文案关键词分析（document_keywords_analysis）
function TwoPieCanvasGenerate(en_name, rand) {

    $("#" + en_name + '_left').attr("id", en_name + '_left' + rand);
    $("#" + en_name + '_right').attr("id", en_name + '_right' + rand);

    // var dataArray = $('#' + en_name + rand).find("." + en_name).data('list');

    var dataArray = {
        title: ["标题", "内容"],
        data: [[['亲子', 45.0], ['女装', 46.8], ['男装', 30.0], ['影妆', 28.5],
            ['打折', 26.2], ['童话', 20.7], ['餐饮', 16.7], ['活动', 11.7], ['女鞋', 31.7], ['童装', 20.9]],
            [['亲子', 45.0], ['女装', 46.8], ['男装', 30.0], ['影妆', 28.5], ['打折', 26.2],
                ['童话', 20.7], ['餐饮', 16.7], ['活动', 11.7], ['女鞋', 31.7], ['童装', 20.9]]]
    };


    var left = en_name + '_left' + rand,
        right = en_name + '_right' + rand,
        left_data,
        left_bool,
        right_data,
        right_bool;


    if (dataArray.data[0].length == 0) {
        left_data = [['无', 1]];
        left_bool = false;
    } else {
        left_data = dataArray.data [0];
        left_bool = true;
    }

    if (dataArray.data[1].length == 0) {
        right_data = [['无', 1]];
        right_bool = false;
    } else {
        right_data = dataArray.data[1];
        right_bool = true;
    }


    $("#" + left).highcharts({
        chart: {
            type: 'pie',
            height: 440 * size_radix,
            width: 445 * size_radix,
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: dataArray.title[0],
            align: 'center',
            verticalAlign:"middle",
            style: {
                'color': '#00b0f0',
                'fontSize': titleFontSize * 1.4
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            enabled: left_bool
        },
        plotOptions: {
            pie: {
                size: '75%',
                innerSize: '50%',
                center:["50%","50%"],
                depth: 45,
                align: 'center',
                dataLabels: {
                    style: {
                        "fontSize": labelFontSize
                    },
                    enabled: right_bool
                }
            }
        },
        series: [{
            name: '比例',
            data: dataArray.data[0]
        }]
    });

    $("#" + right).highcharts({
        chart: {
            type: 'pie',
            height: 440 * size_radix,
            width: 445 * size_radix,
            options3d: {
                enabled: true,
                alpha: 45
            }
            //borderColor:""
        },
        credits: {
            enabled: false
        },
        title: {
            text: dataArray.title[1],
            align: 'center',
            verticalAlign:"middle",
            style: {
                'color': '#00b0f0',
                'fontSize': titleFontSize * 1.4
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            enabled: right_bool
        },
        plotOptions: {
            pie: {
                size: '75%',
                innerSize: '50%',
                center:["50%","50%"],
                depth: 45,
                align: 'center',
                dataLabels: {
                    style: {
                        "fontSize": labelFontSize
                    },
                    enabled: right_bool
                }
            }
        },
        series: [{
            name: '比例',
            data: right_data
        }]
    });
}


// 作者：Merrier
// 图表类型：柱状+折线+纯文本
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     文案阅读分析（document_reading_analysis）
function barLineText(en_name, rand) {

    $("#" + en_name + "_first").attr("id", en_name + "_first" + rand);
    $("#" + en_name + "_second").attr("id", en_name + "_second" + rand);

    // var dataArray = $('#' + en_name + rand).find("." + en_name).data('list');

    var dataArray = {
        "source": "_1",
        "nav_name": 1,
        "share_rate": 0,
        "read_number_rate": 0,
        "read_pnumber": 0,
        "read_number": 0,
        "share_number_rate": 0,
        "day": "15",
        "en_name": "document_reading_analysis",
        "first": {
            "text": "文案基础分析1",
            "time": ['01-01', '01-08', '01-15', '01-22', '02-01', '02-08',
                '02-15', '02-22', '03-01', '03-08', '03-15'],
            "dataArray1": {
                "color": "#FFF",
                "data": [499, 715, 1064, 1292, 1440, 1760, 1356, 1485, 2164, 1941, 956]
            },
            "dataArray2": {
                "color": "#000",
                "data": [1.5, 1.2, 1.0, 0.8, 0.7, 1.1, 1.6, 2.1, 2.2, 1.9, 1.6]
            },
            "dataArray3": {
                "color": "#FFFF00",
                "data": [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139]
            }
        },
        "second": {
            "text": "文案基础分析2",
            "time": ['01-01', '01-08', '01-15', '01-22', '02-01', '02-08',
                '02-15', '02-22', '03-01', '03-08', '03-15'],
            "dataArray1": {"color": "#FFF", "data": [499, 715, 1064, 1292, 1440, 1760, 1356, 1485, 2164, 1941, 956]},
            "dataArray2": {"color": "#000", "data": [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139]},
            "dataArray3": {"color": "#990099", "data": [1356, 1485, 2164, 1941, 956, 1064, 1292, 1440, 1760, 499, 715]},
            "dataArray4": {"color": "#FF0000", "data": [1064, 1292, 1440, 1760, 499, 715, 1485, 2164, 1941, 1292, 1440]}
        }
    };

    var form_opt_first = {
        backgroundColor: "#2d89ef",
        title: {
            text: dataArray.first.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y: 'bottom',
            data: ["阅读人数", "阅读率", "阅读人次"],
            itemWidth: 30 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                fontSize: labelFontSize,
                color: "#fff"
            }
        },
        calculable: true,
        grid: {
            left: '5%',
            right: '0',
            bottom: '10%',
            top: '17%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.first.time,
                axisLabel: {
                    formatter: '{value}',
                    interval: 0,
                    textStyle: {
                        color: '#ddd',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 2
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: [0.05, 0.05]
            }
        ],

        yAxis: (function () {
            var series_arr = [];

            //绘制柱状图
            var serier_opt_bar = {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: dataArray.first.dataArray1.color,
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 2
                    }
                }
                // splitNumber: 7
            };
            series_arr.push(serier_opt_bar);

            //绘制折线图阅读率
            var serier_opt_line1 = {
                type: 'value',
                axisLabel: {
                    formatter: function (value) {
                        return value * 100 + "%"
                    },
                    textStyle: {
                        color: dataArray.first.dataArray2.color,
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                splitNumber: 5
            };
            series_arr.push(serier_opt_line1);

            //绘制折线图阅读人次
            var serier_opt_line2 = {
                type: 'value',
                axisLabel: {
                    margin: 50 * size_radix,
                    textStyle: {
                        color: dataArray.first.dataArray3.color,
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                splitNumber: 5
            };
            series_arr.push(serier_opt_line2);

            return series_arr;
        })(),

        //绘制图表
        series: [{
            name: "阅读人数",
            type: "bar",
            yAxisIndex: 0,
            stack: dataArray.first.text,
            itemStyle: {
                normal: {
                    color: dataArray.first.dataArray1.color,
                    label: {
                        show: false
                    }
                }
            },
            data: dataArray.first.dataArray1.data
        }, {
            name: "阅读率",
            yAxisIndex: 1,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: dataArray.first.dataArray2.color,
                    label: {
                        show: false
                    }
                }
            },
            lineStyle: {
                normal: {
                    color: dataArray.first.dataArray2.color,
                    type: "dashed",
                    width: 2
                }
            },
            data: dataArray.first.dataArray2.data
        }, {
            name: "阅读人次",
            yAxisIndex: 2,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    color: dataArray.first.dataArray3.color,
                    label: {
                        show: false
                    }
                }
            },
            lineStyle: {
                normal: {
                    color: dataArray.first.dataArray3.color,
                    width: 2
                }
            },
            data: dataArray.first.dataArray3.data
        }]
    };

    var form_init_first = echarts.init(document.getElementById(en_name + "_first" + rand));

    form_init_first.setOption(form_opt_first);  //echarts实例化

    var form_opt_second = {
        backgroundColor: "#2d89ef",
        title: {
            text: dataArray.second.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y: 'bottom',
            data: ["阅读人数", "阅读人次", "转发人数", "收藏人数"],
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                fontSize: labelFontSize,
                color: "#fff"
            }
        },
        calculable: true,
        grid: {
            left: '5%',
            right: '0',
            bottom: '10%',
            top: '17%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.second.time,
                axisLabel: {
                    formatter: '{value}',
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 2
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: [0.05, 0.05]
            }
        ],

        yAxis: (function () {
            var yaxis_arr = [];
            var second_legend = ["阅读人数", "阅读人次", "转发人数", "收藏人数"];
            var yaxis_opt1 = {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 2
                    }
                }
            };
            yaxis_arr.push(yaxis_opt1);

            for (var i = 1; i < second_legend.length; i++) {
                var yaxis_opt = {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                    // splitNumber: 7
                };
                yaxis_arr.push(yaxis_opt);
            }
            return yaxis_arr;
        })(),

        //绘制图表
        series: (function () {
            var series_arr = [];
            var second_legend = ["阅读人数", "阅读人次", "转发人数", "收藏人数"];
            for (var j = 0; j < second_legend.length; j++) {
                var serier_opt = {
                    name: second_legend[j],
                    // yAxisIndex: j + 1,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: dataArray.second["dataArray" + (j + 1)].color,
                            label: {
                                show: false
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: dataArray.second["dataArray" + (j + 1)].color,
                            width: 2
                        }
                    },
                    data: dataArray.second["dataArray" + (j + 1)].data
                };
                series_arr.push(serier_opt);
            }
            return series_arr;
        })()
    };

    var form_init_second = echarts.init(document.getElementById(en_name + "_second" + rand));

    form_init_second.setOption(form_opt_second);  //echarts实例化
}


// 作者：Merrier
// 图表类型：复合
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     单文案阅读数分析（single_document_reading_analysis）
function singleDocument(en_name, rand) {

    $("#" + en_name + "_first").attr("id", en_name + "_first" + rand);
    $("#" + en_name + "_second").attr("id", en_name + "_second" + rand);
    $("#" + en_name + "_third").attr("id", en_name + "_third" + rand);

    // var dataArray = $('#' + en_name + rand).find("." + en_name).data('list');


    var dataArray = {
        "begin_time": "2016-12-03",
        "source": "2247483854_1",
        "data_source": [0, "2247483854_1"],
        "end_time": "2016-12-04",
        "title": "蜜枣全球零售观点（2016.11.22-2016.11.28）",
        "nav_name": 1,
        "en_name": "single_document_reading_analysis",
        "first": {
            "text": "单文案阅读分析",
            "time": ["2016-12-03", "2016-12-04"],
            "public_number": {"color": "#99FF00", "data": [2, 0]},
            "friends_transmit": {"color": "#FF0000", "data": [0, 0]},
            "circle_of_friends": {"color": "#00CC00", "data": [0, 0]},
            "history_message": {"color": "#FFF", "data": [0, 0]},
            "others": {"color": "#33FFFF", "data": [0, 0]},
            "pie": {"data": [2, 0, 0, 0, 0]}
        },
        "second": {
            "text": "单文案阅读分析",
            "time": ["2016-12-03", "2016-12-04"],
            "graphic_page": {"color": "#99FF00", "data": [2, 0]},
            "origin_page": {"color": "#FF0000", "data": [0, 0]},
            "share_transmit": {"color": "#00CC00", "data": [0, 0]},
            "wechat_collect": {"color": "#FFF", "data": [0, 0]}
        },
        "third": {
            "text": "",
            "time": ["北京", "吉林", "上海", "内布拉斯加", "内蒙古", "四川", "巴黎", "江苏", "江西", "河南", "首尔", "黑龙江"],
            "total_fans": {"color": "#FFF", "data": [12, 4, 1, 1, 13, 1, 1, 1, 10, 1, 1, 16]},
            "new_fans": {"color": "#00FF00", "data": [4, 3, 0, 0, 0, 6, 0, 5, 0, 0, 0, 2]}
        }
    };

    var extra_opt = {
        "backgroundColor": canvas_common_opt.color.dark_purple,
        first: {
            legend: ["公众号会话", "好友转发", "朋友圈", "历史消息", "其他"],
            en_name: ["public_number", "friends_transmit", "circle_of_friends", "history_message", "others"],
            color: ["#99FF00", "#FF0000", "#00CC00", "#FFF", "#33FFFF"]
        },
        second:{
            legend:["图文页阅读人数","原文页阅读人次","分享转发人数","微信收藏人数"],
            en_name:["graphic_page","origin_page","share_transmit","wechat_collect"],
            color:["#99FF00","#FF0000","#00CC00","FFF"]
        }
    };


    //第一个报表绘制开始
    var form_opt_first = {
        grid: {
            left: '2%',
            right: '2%',
            bottom: '10%',
            top: '23%',
            containLabel: true
        },
        backgroundColor: extra_opt.backgroundColor,
        title: {
            text: dataArray.first.text,
            subtext:"文章标题：" + dataArray.title,
            subtextStyle:{
                fontSize:subtitleFontSize,
                color:"#ccc"
            },
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
                fontSize: tooltipFontSize
            }
        },
        legend: {
            y: 'bottom',
            data: extra_opt.first.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                color: "#fff",
                fontSize: labelFontSize
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: dataArray.first.time,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ccc"
                    }
                },
                axisLabel: {
                    // interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20 * size_radix
            }
        ],
        yAxis: [
            {
                type: 'value',
                // max: '120000',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#ccc"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    // interval: 'auto',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                }
            }
        ],
        series: (function () {
            var series_arr = [];
            var pie_opt = {
                type: 'pie',
                name: dataArray.title,
                innerSize: 10,
                radius: ['20%', '30%'],
                color: extra_opt.first.color,
                data: (function () {
                    var data_arr = [];
                    for (var j = 0; j < extra_opt.first.legend.length; j++) {
                        var data_opt = {
                            value: dataArray.first.pie.data[j], name: extra_opt.first.legend[j]
                        };
                        data_arr.push(data_opt);
                    }
                    return data_arr;
                })(),
                label: {
                    normal: {
                        show: false
                    }
                },
                center: [600 * size_radix, 70 * size_radix]
            };
            series_arr.push(pie_opt);
            for (var i = 0; i < extra_opt.first.en_name.length; i++) {
                var line_opt = {
                    type: 'line',
                    name: extra_opt.first.legend[i],
                    symbol:canvas_common_opt.line_symbol[i],
                    symbolSize:symbolSize,
                    itemStyle: {
                        normal: {
                            color: dataArray.first[extra_opt.first.en_name[i]].color
                        }
                    },
                    data: dataArray.first[extra_opt.first.en_name[i]].data
                };
                series_arr.push(line_opt);
            }
            return series_arr;
        })()
    };

    var form_init_first = echarts.init(document.getElementById(en_name + "_first" + rand));

    form_init_first.setOption(form_opt_first);  //echarts实例化
    //第一个报表绘制结束

    //第二个报表绘制开始
    var form_opt_second = {
        grid: {
            left: '2%',
            right: '2%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        backgroundColor: extra_opt.backgroundColor,
        title: {
            show:false
        },
        tooltip: {
            formatter: dataArray.title + "<br/>{a}: {c}",
            trigger: 'item',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
                fontSize: tooltipFontSize
            }
        },
        legend: {
            y: 'bottom',
            data: extra_opt.second.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                color: "#fff",
                fontSize: labelFontSize
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: dataArray.second.time,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ccc"
                    }
                },
                axisLabel: {
                    // interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20 * size_radix
            }
        ],
        yAxis: [
            {
                type: 'value',
                // max: '120000',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#ccc"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    // interval: 'auto',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                }
            }
        ],
        series: (function () {
            var series_arr = [];
            for (var i = 0; i < extra_opt.second.en_name.length; i++) {
                var line_opt = {
                    type: 'line',
                    name: extra_opt.second.legend[i],
                    symbol:canvas_common_opt.line_symbol[i],
                    symbolSize:symbolSize,
                    itemStyle: {
                        normal: {
                            color: dataArray.second[extra_opt.second.en_name[i]].color
                        }
                    },
                    data: dataArray.second[extra_opt.second.en_name[i]].data
                };
                series_arr.push(line_opt);
            }
            return series_arr;
        })()
    };

    var form_init_second = echarts.init(document.getElementById(en_name + "_second" + rand));

    form_init_second.setOption(form_opt_second);  //echarts实例化
    //第二个报表绘制结束

    //第三个报表绘制开始
    var form_opt_third = {
        grid: {
            left: '2%',
            right: '8%',
            bottom: '5%',
            top: '0%',
            containLabel: true
        },
        backgroundColor: extra_opt.backgroundColor,
        title: {
            show:false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: tooltipFontSize
            }
        },
        legend: {
            show:false
        },
        calculable: true,
        dataZoom: {
            show: true,
            height: 12 * size_radix,
            y2: 5 * size_radix,
            start:0,
            end:50,
            labelPrecision:0,
            backgroundColor: "transparent",
            textStyle: {
                color: "#ffffff"
            },
            handleColor: "#ffffff",
            handleStyle:{
                opacity:0.7
            },
            dataBackgroundColor: "transparent",
            fillerColor: "#ccc",
            filterMode:"empty",
            zoomLock: true
        },
        xAxis: [
            {
                type: 'value',
                min:0,
                offset:100,
                minInterval:1,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    // interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20 * size_radix
            }
        ],
        yAxis: [
            {
                type: 'category',
                // max: '120000',
                data:dataArray.third.time,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    // interval: 'auto',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                }
            }
        ],
        series: [{
            name:"粉丝总数",
            type:"bar",
            data:dataArray.third.total_fans.data,
            itemStyle: {
                normal: {
                    color: dataArray.third.total_fans.color
                }
            }
        },{
            name:"新增粉丝数",
            type:"bar",
            data:dataArray.third.new_fans.data,
            itemStyle: {
                normal: {
                    color: dataArray.third.new_fans.color
                }
            }
        }]
    };

    var form_init_third = echarts.init(document.getElementById(en_name + "_third" + rand));

    form_init_third.setOption(form_opt_third);  //echarts实例化
    //第三个报表绘制结束
}


// 作者：Yangyue
// 图表类型：待定
// 所用插件：highcharts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     单一卡券发放分析（single_coupon）
function couponCanvas(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    var throw_in = en_name + "_throw_in_analysis",
        provide = en_name + "_provide_analysis",
        throw_in_name = throw_in + rand,
        provide_name = provide + rand,
        throw_in_id = $("#" + throw_in).attr("id", throw_in_name),
        provide_id = $("#" + provide).attr("id", provide_name),
        dataArray = $("#" + en_name + rand).find("." + en_name).data("list"),
        throw_in_array = dataArray.throw_in,
        provide_array = dataArray.provide,
        max = 10;

    if (throw_in_array.time.length < 10) {
        max = throw_in_array.time.length - 1;
    }

    $(throw_in_id).highcharts({
        chart: {
            backgroundColor: '#660099',
            borderRadius: 5,
            marginLeft: marginArraySecond[3],
            marginRight: marginArraySecond[1]

        },
        scrollbar: {
            enabled: true
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        title: {
            text: throw_in_array.text,
            align: 'left',
            x: titleMarginLeft,
            y: 15,
            style: {
                color: "#fff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize
            }
        },
        xAxis: {
            categories: throw_in_array.time,
            labels: {
                style: {
                    color: "#fff"
                }
            },
            min: 0,
            max: max
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: "#fff"
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
            itemStyle: {
                color: '#fff',
                fontSize: labelFontSize
            }
        },
        series: [
            {
                name: '转赠人数',
                color: throw_in_array.throw_in_number.color,
                data: throw_in_array.throw_in_number.data
            },
            {
                name: '浏览人数',
                color: throw_in_array.browser_number.color,
                data: throw_in_array.browser_number.data
            }, {
                name: '领取人数',
                color: throw_in_array.get_number.color,
                data: throw_in_array.get_number.data
            }, {
                name: '核销人数',
                color: throw_in_array.verification_number.color,
                data: throw_in_array.verification_number.data
            }]
    });

    $(provide_id).highcharts({
        chart: {
            //width:715,
            //height:480,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor: '#00ccff',
            borderWidth: 2,
            borderRadius: 10
        },
        colors: provide_array.colors,
        credits: {
            enabled: false
        },
        title: {
            text: provide_array.text,
            align: 'left',
            x: titleMarginLeft,
            y: 25,
            style: {
                color: "#000",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize * 1.1
            }
        },
        legend: {
            itemDistance: 80,
            itemStyle: {
                fontSize: labelFontSize
            }
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
                    style: {
                        'fontSize': labelFontSize
                    }
                },
                showInLegend: true

            }
        },
        series: [{
            type: 'pie',
            innerSize: '50%',
            size: '80%',
            x: 20,
            name: '比例',
            data: provide_array.data
        }]
    });
}


// 作者：Merrier
// 图表类型：嵌套饼图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     消费组成占比（consumption_composition_proportion）
function nestPie(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {
        text: "消费组成占比",
        data: {
            data_in: [
                {value: 40, name: '会员'},
                {value: 60, name: '非会员'}
            ],
            data_out: [
                {value: 9, name: '忠诚会员'},
                {value: 31, name: '普通会员'},
                {value: 60, name: '非会员'}
            ]
        },
        color: ["#ffc40e", "#2d89f0", "#f78d05", "#f6db05", "#2d89f0"],
        legend: ['非会员', '普通会员', '忠诚会员']
    };


    var form_opt = {
        title: {
            text: dataArray.text,
            textStyle: {
                color: dataArray.color,
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                fontSize: labelFontSize
            }
        },

        color: dataArray.color,
        calculable: false,
        series: [
            {
                // name: '消费组成占比',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '25%'],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner',
                            textStyle: {
                                color: "#000",
                                fontSize: labelFontSize
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: "{b}\n{d}%"
                        }
                    }
                },

                data: dataArray.data.data_in
            },
            {
                // name: '消费组成占比',
                type: 'pie',
                radius: ['40%', '60%'],
                selectedMode: "single",
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner',
                            textStyle: {
                                color: "#000",
                                fontSize: labelFontSize
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: "{d}%"
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },

                data: dataArray.data.data_out
            }
        ]
    };

    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：标准柱图（双柱，有legend）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员消费力分布曲线（member_consumption_distribution_curve）
function twoBarLegend(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {
        backgroundColor: "#2d89f0",
        title: "会员消费力分布曲线",
        text: ["客户占比", "消费占比"],
        data: [
            [0.34, 0.53, 0.78, 0.47, 0.24, 0.09, 0.23, 0.88, 0.43, 0.88, 0.82, 0.05, 0.94, 0.60, 0.28, 0.50],
            [0.60, 0.58, 0.30, 0.60, 0.43, 0.03, 0.48, 0.05, 0.39, 0.53, 0.57, 0.69, 0.93, 0.20, 0.45, 0.38]
        ],
        data_price: ["0-500元", "501-1001元", "1002-1502元", "1503-2003元", "2004-2504元", "2503-3005元", "3006-3506元", "3507-4007元", "4008-4508元", "4509-5010元", "1002-1502元", "1503-2003元", "2004-2504元", "2503-3005元", "3006-3506元", "3507-4007元"],
        data_zoom: true,
        color: ["#ffffff", "#ffc40e"]
    };


    var form_opt = {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '20%',
            top: '20%',
            containLabel: true
        },
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.title,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: dataArray.text,
            y: 'bottom',
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                color: "#ffffff",
                fontSize: labelFontSize
            }
        },
        calculable: true,
        dataZoom: {
            show: dataArray.data_zoom,
            height: 12 * size_radix,
            y2: 25 * size_radix,
            // backgroundColor: "#ffffff",
            textStyle: {
                color: "#ffffff"
            },
            handleColor: "#ffc40e",
            dataBackgroundColor: "#ccc",
            fillerColor: "#ffffff",
            startValue: 0,
            endValue: 8,
            zoomLock: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.data_price,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20 * size_radix
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLabel: {
                    interval: 'auto',
                    formatter: function (value) {
                        return value * 100 + "%"
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                }
            }
        ],
        series: [
            {
                name: dataArray.text[0],
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: dataArray.color[0],
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (params) {
                                return (params.value * 100).toFixed(0) + "%";
                            }
                        }
                    }
                },
                data: dataArray.data[0]
            },
            {
                name: dataArray.text[1],
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: dataArray.color[1],
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (params) {
                                return (params.value * 100).toFixed(0) + "%";
                            }
                        }
                    }
                },
                data: dataArray.data[1]
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：标准饼图（单环，有legend）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员生命周期管理（member_life_cycle_management）
function onePieLegend(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");


    //假数据
    var dataArray = {
        text: "会员生命周期管理",
        data: [
            {value: 10000, name: '活跃期'},
            {value: 4000, name: '沉默期'},
            {value: 2000, name: '睡眠期'},
            {value: 3500, name: '流失期'},
            {value: 1300, name: '死亡期'}
        ],
        legend: ["活跃期", "沉默期", "睡眠期", "流失期", "死亡期"],
        color: ["#4f81bc", "#c0504e", "#9bbb58", "#8165a2", "#4aacc5"]
    };


    var form_opt = {
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#000",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            itemGap: 10,
            textStyle: {
                fontSize: labelFontSize
            }
        },

        color: dataArray.color,
        calculable: false,
        series: [
            {
                name: '会员生命周期管理',
                type: 'pie',
                selectedMode: 'single',
                radius: ["25%", '60%'],

                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner',
                            textStyle: {
                                color: "#fff",
                                fontSize: labelFontSize
                            },
                            formatter: "{c}"
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: emphasisFontSize
                            }
                        }
                    }
                },

                data: dataArray.data
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：散点（气泡）图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     品牌购买关联分析（brand_purchase_association_analysis）
//     品牌偏好关联分析（brand_purchase_association_analysis）
function scatterSingle(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {
        backgroundColor: "#70309f",
        color_scatter: "#ffff00",
        text: "品牌购买关联分析",
        data: [[10, 430, 0.23, "优衣库"], [3, 1200, 0.05, 'H&M'], [20, 103, 0.43, "GAP"], [14, 283, 0.29, "ZARA"], [18, 395, 0.69, "Mousy"], [12, 90, 0.20, "hasd"], [7, 382, 0.39, "肯德基"], [13, 490, 0.25, "麦当劳"]]
        // legend:['优衣库',"H&M","GAP","ZARA","Mousy","hasd","肯德基","麦当劳"]
    };


    var form_opt = {
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            formatter: function (params) {
                return "品牌名称：" + params.value[3] + "</br>" +
                    "消费次数：" + params.value[0] + '次' + "</br>" +
                    "平均消费额：" + params.value[1] + '元';

            },
            axisPointer: {
                show: false
            }
        },
        xAxis: [
            {
                type: 'value',
                scale: true,
                // interval: 2,
                min: 0,
                axisLabel: {
                    // formatter: '{value}次',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 2
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type:"dashed",
                        color: canvas_common_opt.color.axis,
                        width: 1
                    }
                },
                boundaryGap: [0, 0.05]
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                // interval: 300,
                min: 0,
                axisLabel: {
                    // formatter: '{value}元',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 2
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type:"dashed",
                        color: canvas_common_opt.color.axis,
                        width: 1
                    }
                },
                boundaryGap: [0, 0.02]
            }
        ],
        grid: {
            left: '5%',
            right: '5%',
            bottom: '2%',
            top: '10%',
            containLabel: true
        },
        series: [
            {
                name: dataArray.text,
                type: 'scatter',
                data: dataArray.data,
                symbolSize: function (value) {
                    return Math.sqrt(value[2] * 4000);
                },
                itemStyle: {
                    normal: {
                        color: dataArray.color_scatter,
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function (params) {
                                return params.value[3];
                            },
                            textStyle: {
                                color: "#fff",
                                fontSize: titleFontSize
                            }
                        }
                    }
                }
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：层叠柱状图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     每年会员比例分布（annual_member_percentage_distribution）
//     会员属性分布（member_attribute_distribution）
function stackBar(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");


    //每年会员比例分布假数据
    var dataArrays = {
        backgroundColor: "#2d89f0",
        text: "每年会员比例分布",
        data: {
            data_x: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
            data_y: [[0.2, 0.3, 0.1, 0.15, 0.3, 0.25, 0.3], [0.2, 0.1, 0.5, 0.3, 0.4, 0.1, 0.2], [0.3, 0.25, 0.35, 0.35, 0.25, 0.5, 0.2], [0.3, 0.35, 0.05, 0.2, 0.05, 0.15, 0.3]]
        },
        legend: ["新多次会员", "新单次会员", "旧多次会员", "旧单次会员"],
        color: ["#01a300", "#953735", "#da9695", "#fdeadb"]
    };

    //会员属性分布假数据
    var dataArray = {
        backgroundColor: "#70309f",
        text: "会员属性分布",
        data: {
            data_x: ["未知年龄", '18-23', '24-29', '30-35', '36-41', '42-47'],
            data_y: [[0.2, 0.6, 0.1, 0.15, 0.3, 0.25], [0.2, 0.1, 0.5, 0.55, 0.4, 0.2], [0.6, 0.3, 0.4, 0.3, 0.3, 0.55]]
        },
        legend: ["男性", "女性", "未知"],
        color: ["#01a300", "#953735", "#da9695"]
    };


    var form_opt = {
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis',
            formatter: canvas_common_opt.tooltip_formatter_percentage
        },
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                fontSize: labelFontSize,
                color: "#fff"
            }
        },
        calculable: true,
        grid: {
            left: '5%',
            right: '5%',
            bottom: '13%',
            top: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.data.data_x,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: [0.05, 0.05]
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 1.2,
                interval: 0.5,
                axisLabel: {
                    formatter: function (value) {
                        return (value * 100).toFixed(0) + "%";
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: [0.05, 0.05]
            }
        ],

        series: (function () {
            var series_arr = [];
            for (var i = 0; i < dataArray.data.data_y.length; i++) {
                var serier_opt = {
                    name: dataArray.legend[i] || "",
                    type: "bar",
                    stack: dataArray.text,
                    itemStyle: {
                        normal: {
                            color: dataArray.color[i],
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return (params.data * 100).toFixed(0) + "%";
                                }
                            }
                        }
                    },
                    data: dataArray.data.data_y[i]
                };
                series_arr.push(serier_opt);
            }
            return series_arr;
        })()
    };

    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：柱状图+折线图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     不同回购次数下的KPI（different_repurchase_times_kpi）
function barPlusLine(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");


    //假数据
    var dataArray = {
        backgroundColor: "#7030a0",
        text: "不同回购次数下的KPI",
        data: {
            data_times: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            data_price: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
            data_rate: [0.873, 0.906, 0.504, 0.898, 0.504, 0.9022, 0.303, 0.196, 0.724, 0.598]
        },
        legend: ["客单价", "复购率"],
        mark_red: 400
    };


    var form_opt = {
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return "购买次数：" + params[0].name + "次" + '<br/>'
                    + params[0].seriesName + ' : ' + params[0].value + "元" + '<br/>'
                    + params[1].seriesName + ' : ' + (params[1].value * 100).toFixed(1) + "%" + '<br/>';
            }
        },
        calculable: true,
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                fontSize: labelFontSize,
                color: "#fff"
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            top: "20%",
            bottom: "10%",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.data.data_times,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '客单价',
                nameTextStyle:{
                    fontSize:labelFontSize
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'value',
                name: '复购率',
                nameTextStyle:{
                    fontSize:labelFontSize
                },
                interval: 0.25,
                axisLabel: {
                    formatter: function (value) {
                        return value * 100 + ".00%"
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '客单价',
                type: 'bar',
                barCategoryGap: "50%",
                itemStyle: {
                    normal: {
                        color: function (params) {
                            if (params.data == dataArray.mark_red) {
                                console.info(params.data);
                                return "#ff0000";
                            } else {
                                return "#ffffff";
                            }
                        },
                        label: {
                            show: true,
                            position: "top"
                        }
                    },
                    emphasis: {
                        color: "#ffc003"
                    }
                },
                data: dataArray.data.data_price
            },
            {
                name: '复购率',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: "#3ac278"
                        }
                    }
                },
                data: dataArray.data.data_rate
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：标准柱图（单柱）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员价值分布曲线（member_value_distribution_curve）
function singleBar(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {
        backgroundColor: "#70309f",
        title: "会员价值分布曲线",
        category: "TOP50品牌",
        data: [0.34, 0.53, 0.78, 0.24, 0.09, 0.23, 0.88, 0.43, 0.88, 0.82, 0.05, 0.94, 0.60, 0.28, 0.50, 0.43, 0.88, 0.82],
        data_date: ["1个月", "2个月", "3个月", "4个月", "5个月", "6个月", "7个月", "8个月", "9个月", "10个月", "11个月", "12个月", "13个月", "14个月", "15个月", "16个月", "17个月", ">18个月"],
        color: "#ffffff"
    };


    var form_opt = {
        grid: {
            left: '2%',
            right: '2%',
            bottom: '10%',
            top: '20%',
            containLabel: true
        },
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.title,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return dataArray.category + ' : ' + (params[0].value * 100).toFixed(0) + "%" + '<br/>';
            },
            textStyle: {
                fontSize: tooltipFontSize
            }
        },
        legend: {
            show: false
        },
        calculable: true,

        xAxis: [
            {
                type: 'category',
                data: dataArray.data_date,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20 * size_radix
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff"
                    }
                },
                axisLabel: {
                    interval: 'auto',
                    formatter: function (value) {
                        return value * 100 + "%"
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                }
            }
        ],
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: dataArray.color,
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (params) {
                                return (params.value * 100).toFixed(0) + "%";
                            },
                            textStyle: {
                                fontSize: labelFontSize
                            }
                        }
                    }
                },
                data: dataArray.data
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}

// 作者（Gaotianyang）
// 图表类型：标准饼图（单环，有label）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     营销渠道响应率（marketing_channel_response_percentage）
function onePieLabel(en_name, rand) {
//console.info(en_name);

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray =
        {
            title: "营销渠道响应率",
            text: "微信",
            data: [70, 100],
            color: "#A24A48"
        };


    var form_opt = {
        title: {
            text: dataArray.text,
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                color: "#000"
            },
            x: 'center',
            y: 'center',
            padding: titlePadding
        },
        series: [
            {
                name: dataArray.text,
                type: 'pie',
                radius: ['30%', '60%'],
                avoidLabelOverlap: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: dataArray.data[0],
                        name: dataArray.text,
                        itemStyle: {
                            normal: {
                                color: dataArray.color
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: "{d}%",
                                textStyle: {
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                    fontSize: labelFontSize
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: emphasisFontSize,
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    {
                        value: dataArray.data[1] - dataArray.data[0],
                        name: '',
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: "{d}%",
                                textStyle: {
                                    color: '#eee',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold'
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: emphasisFontSize,
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Gaotianyang
// 图表类型：双环形图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     营销渠道有效率（marketing_channel_effectively_percentage）
function twoPieDountChart(en_name, rand) {

    $("#" + en_name + '_left').attr("id", en_name + '_left' + rand);
    $("#" + en_name + '_right').attr("id", en_name + '_right' + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataPieArray = {
        left: {
            text: "微信",
            data: [
                {value: 30, name: '有效'},
                {value: 70, name: '无效'}
            ],
            legend: ["有效", "无效"],
            color: ["#A24A48", "#EEE"]
        },
        right: {
            text: "短信",
            data: [
                {value: 20, name: '有效'},
                {value: 30, name: '无效'},
                {value: 50, name: '未知'}
            ],
            legend: ["有效", "无效", "未知"],
            color: ['#A24A48', '#B2935C', '#EEE']
        }
    };

    var left = en_name + '_left' + rand,
        right = en_name + '_right' + rand;

    var form_opt_left = {
        title: {
            text: dataPieArray.left.text,
            textStyle: {
                color: "#000",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            x: 'center',
            y: 'center',
            padding: titlePadding
        },
        legend: {
            orient: 'vertical',
            align: 'left',
            y: 'center',
            right: '10%',
            data: dataPieArray.left.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            itemGap: 10,
            textStyle: {
                fontSize: labelFontSize
            }
        },
        color: dataPieArray.left.color,
        calculable: false,
        series: [
            {
                name: dataPieArray.left.text,
                type: 'pie',
                radius: ['30%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: "{d}%",
                        textStyle: {
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            fontSize: labelFontSize
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataPieArray.left.data
            }
        ]
    };

    var form_init_left = echarts.init(document.getElementById(left));

    form_init_left.setOption(form_opt_left);  //echarts实例化

    var form_opt_right = {
        title: {
            text: dataPieArray.right.text,
            textStyle: {
                color: "#000",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            x: 'center',
            y: 'center',
            padding: titlePadding
        },
        legend: {
            orient: 'vertical',
            align: 'left',
            y: 'center',
            right: '10%',
            data: dataPieArray.right.legend,
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            itemGap: 10,
            textStyle: {
                fontSize: labelFontSize
            }
        },
        color: dataPieArray.right.color,
        calculable: false,
        series: [
            {
                name: dataPieArray.right.text,
                type: 'pie',
                radius: ['30%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: "{d}%",
                        textStyle: {
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            fontSize: labelFontSize
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataPieArray.right.data
            }
        ]
    };

    var form_init_right = echarts.init(document.getElementById(right));

    form_init_right.setOption(form_opt_right);  //echarts实例化

}


// 作者：Gaotianyang
// 图表类型：层叠柱状图+折线图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     不同类型会员购买分布（different_types_membership_buy_distribution）
function stackBarPlusLine(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");


    //假数据
    var dataArray = {
        backgroundColor: "#00ac00",
        text: "不同类型会员购买分布",
        data: {
            data_x: ["2015"],
            data_y: [
                [],[],[],[]],
            data_rate: [[],[]]
        },
        legend: ["新会员销售额", "非回头客(会员)销售额", "回头客(会员)销售额", "非会员销售额"],
        legend_rate: ["新会员", "消费中老会员占比"],
        color: ["#fff", "#b2935c", "#6a9a9a", "#b2b787"],
        color_rate: ["#6d349b", "#000"]
    };

    var form_opt = {
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis'
            // formatter: function (params) {
            //     return params[0].name + '<br/>'
            //         + params[0].seriesName + ' : ' + params[0].value + "元" + '<br/>'
            //         + params[1].seriesName + ' : ' + params[1].value + "元" + '<br/>'
            //         + params[2].seriesName + ' : ' + params[2].value + "元" + '<br/>'
            //         + params[3].seriesName + ' : ' + params[3].value + "元" + '<br/>'
            //         + params[4].seriesName + ' : ' + params[4].value + "人" + '<br/>'
            //         + params[5].seriesName + ' : ' + (params[5].value * 100).toFixed(0) + "%" + '<br/>';
            // }
        },
        legend: {
            y: 'bottom',
            data: dataArray.legend.concat(dataArray.legend_rate),
            itemWidth: 20 * size_radix,
            itemHeight: 10 * size_radix,
            textStyle: {
                fontSize: labelFontSize,
                color: "#fff"
            }
        },
        calculable: true,
        grid: {
            left: '5%',
            right: '0',
            bottom: '15%',
            top: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.data.data_x,
                axisLabel: {
                    // rotate: 40,
                    formatter: function (value) {
                        if(value){
                            return value;
                        }else{
                            return "";
                        }
                    },
                    // interval: 0,
                    textStyle: {
                        color: '#ffffff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: [0.05, 0.05]
            }
        ],

        yAxis: (function () {
            var series_arr = [];

            //绘制柱状图
            var serier_opt = {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        width: 1
                    }
                },
                // splitNumber: 7
            };
            series_arr.push(serier_opt);

            //绘制折线图新会员
            var serier_opt = {
                type: 'value',
                axisLabel: {
                    margin: 50,
                    textStyle: {
                        color: dataArray.color_rate[0],
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                splitNumber: 5
            };
            series_arr.push(serier_opt);

            //绘制折线图消费中老会员占比
            var serier_opt = {
                type: 'value',
                max: 1,
                axisLabel: {
                    formatter: function (value) {
                        return value * 100 + "%"
                    },
                    textStyle: {
                        color: dataArray.color_rate[1],
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
                // splitNumber: 5
            };
            series_arr.push(serier_opt);

            return series_arr;
        })(),
        //绘制图表
        series: (function () {
            var series_arr = [];
            for (var i = 0; i < dataArray.data.data_y.length; i++) {
                var serier_opt = {
                    name: dataArray.legend[i] || "",
                    type: "bar",
                    yAxisIndex: 0,
                    barCategoryGap: "50%",
                    stack: dataArray.text,
                    itemStyle: {
                        normal: {
                            color: dataArray.color[i],
                            label: {
                                show: false
                            }
                        }
                    },
                    data: dataArray.data.data_y[i]
                };
                series_arr.push(serier_opt);
            }
            for (var j = 0; j < dataArray.data.data_rate.length; j++) {
                var serier_opt = {
                    name: dataArray.legend_rate[j],
                    yAxisIndex: j + 1,
                    type: 'line',
                    // smooth: true,
                    itemStyle: {
                        normal: {
                            color: dataArray.color_rate[j],
                            label: {
                                show: false
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: dataArray.color_rate[j],
                            width: 2
                        }
                    },
                    data: dataArray.data.data_rate[j]
                };
                series_arr.push(serier_opt);
            }
            return series_arr;
        })()
    };

    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Gaotianyang
// 图表类型：柱状图+饼图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员细分及生命周期管理（member_segmentation_life_cycle_management）
function barPlusPie(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {
        backgroundColor: "#00ac00",
        title: "会员细分及生命周期管理",
        bar: {
            tooltip_name: ["人数"],
            data: [100000, 90000, 80000, 70000, 60000, 40000, 50000, 45000, 30000, 20000, 15000, 10000, 10000],
            data_x: ["3分", "4分", "5分", "6分", "7分", "8分", "9分", "10分", "11分", "12分", "13分", "14分", "15分"],
            color: "#ffffff"
        },
        pie: {
            //data: ["活跃会员","沉默会员","睡眠会员","流失会员","死亡会员"],
            data: {
                name: ["活跃会员", "沉默会员", "睡眠会员", "流失会员", "死亡会员"],
                value: [15, 20, 20, 10, 35]
            },
            color: ["#a24a48", "#b2935c", "#6a9a9a", "#b2b787", "#91644b"]
        }
    };


    var form_opt = {
        grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            top: '12.5%',
            containLabel: true
        },
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.title,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
                fontSize: tooltipFontSize
            }
        },
        legend: {
            show: false
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: dataArray.bar.data_x,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: canvas_common_opt.color.axis
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20 * size_radix
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: '120000',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: canvas_common_opt.color.axis
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: canvas_common_opt.color.axis
                    }
                },
                axisLabel: {
                    interval: 'auto',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                }
            }
        ],
        series: [
            {
                name: dataArray.bar.tooltip_name[0],
                type: 'bar',
                barCategoryGap:"50%",
                itemStyle: {
                    normal: {
                        color: dataArray.bar.color
                    },
                },
                data: dataArray.bar.data
            }, {
                type: 'pie',
                name: '比例',
                innerSize: 10,
                radius: ['10%', '30%'],
                data: [
                    {value: dataArray.pie.data.value[0], name: dataArray.pie.data.name[0]},
                    {value: dataArray.pie.data.value[1], name: dataArray.pie.data.name[1]},
                    {value: dataArray.pie.data.value[2], name: dataArray.pie.data.name[2]},
                    {value: dataArray.pie.data.value[3], name: dataArray.pie.data.name[3]},
                    {value: dataArray.pie.data.value[4], name: dataArray.pie.data.name[4]}
                ],
                zlevel:2,
                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: "{b}:{d}%",
                        textStyle: {
                            color: '#fff',
                            fontFamily: 'Arial',
                            fontSize: labelFontSize,
                            fontWeight: 'bold'
                        },
                        lineStyle: {
                            color: canvas_common_opt.color.axis
                        }
                    }
                },
                center: [700 * size_radix, 100 * size_radix],
                size: 10,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }
        ]
    };

    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者（Merrier）
// 图表类型：饼图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     返点率（return_rate）
function piePlusString(en_name, rand) {

    var pie = en_name + "_canvas";

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray = $('#' + pie + rand).siblings("." + en_name + rand).data('list');

    var dataArray = {
        text: "返店率",
        data: [30, 100],
        color: ["#ffc40d", "#aaa"],
        string: "ROI:1:200"
    };


    if (typeof(dataArray) == 'string') {
        dataArray = $.parseJSON(dataArray);
    }

    if (dataArray != undefined) {

        var text = dataArray.text,
            data = dataArray.data,
            color = dataArray.color,
            string = dataArray.string;

        $("#" + pie + rand).siblings(".form_pie_number").text(string);

        var pie_option = {
            title: {
                text: text,
                textStyle: {
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                x: 'left',
                padding: titlePadding
            },
            series: [
                {
                    name: text,
                    type: 'pie',
                    radius: ['30%', '60%'],
                    avoidLabelOverlap: false,

                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: data[0],
                            name: text,
                            itemStyle: {
                                normal: {
                                    color: color[0]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: "{d}%",
                                    textStyle: {
                                        fontFamily: 'Arial',
                                        fontSize: titleFontSize
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontFamily: 'Arial',
                                        fontSize: emphasisFontSize
                                    }
                                }
                            }
                        },
                        {
                            value: data[1] - data[0],
                            name: '',
                            itemStyle: {
                                normal: {
                                    color: color[1]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: "{d}%",
                                    textStyle: {
                                        color: '#fff',
                                        fontFamily: 'Arial',
                                        fontSize: titleFontSize
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontFamily: 'Arial',
                                        fontSize: emphasisFontSize
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        };

        var pie_init = echarts.init(document.getElementById(pie + rand));

        pie_init.setOption(pie_option);  //echarts实例化

    }
}


// 作者：Merrier
// 图表类型：双柱状图+折线图(折线为虚线,无legend)
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     关键KPI（key_KPI）
function doubleBarPlusLine(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {
        text:"关键KPI",
        time:['2016-1-1', '2016-1-2', '2016-1-3', '2016-1-4', '2016-1-5', '2016-1-6', '2016-1-7', '2016-1-8', '2016-1-9', '2016-1-10', '2016-1-11', '2016-1-12', '2016-1-13', '2016-1-14', '2016-1-15', '2016-1-16', '2016-1-17', '2016-1-18', '2016-1-19', '2016-1-20', '2016-1-21', '2016-1-22', '2016-1-23', '2016-1-24', '2016-1-25', '2016-1-26', '2016-1-27', '2016-1-28', '2016-1-29', '2016-1-30'],
        dataArray1:[10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200],
        dataArray2:[40, 62, 100, 304, 90, 130, 210, 100, 252, 20, 34, 270, 350, 200, 105, 152, 233, 339, 290, 155, 100, 72, 201, 34, 68, 300, 220, 110, 352, 66]
    };

    var extra_opt = {
        backgroundColor: canvas_common_opt.color.blue,
        color: {
            bar: ["#ffffff", canvas_common_opt.color.green],
            line: ["#ffffff"]
        },
        legend:["首篇阅读数","新增粉丝数","净增粉丝数"]
    };


    var form_opt = {
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.time,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    // interval: 3,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 10
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '首篇阅读数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                barWidth: 5,
                data: dataArray[0].dataArray1
            },
            {
                name: '新增粉丝数',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#ff0000'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 2,
                        type: 'dashed'
                    }
                },
                data: arrayReduce(dataArray.dataArray1)
            },
            {
                name: '净增粉丝数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#00ff00'
                    }
                },
                barWidth: 5,
                data: dataArray.dataArray2
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：
// 图表类型：
// 所用插件：echarts/highcharts
// 图表个数(请实时更新)：
// 图表名称（以中文名字为准）：
//     中文名（module_id）
function moduleMethodName(en_name, rand) {

    $("#" + en_name + "_canvas").attr("id", en_name + "_canvas" + rand);

    // var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArray = {};

    var form_opt = {
        backgroundColor: dataArray.backgroundColor,
        title: {
            text: dataArray.text,
            textStyle: {
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            padding: titlePadding
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [],
        yAxis: [],
        series: []
    };

    var form_init = echarts.init(document.getElementById(en_name + "_canvas" + rand));

    form_init.setOption(form_opt);  //echarts实例化
}