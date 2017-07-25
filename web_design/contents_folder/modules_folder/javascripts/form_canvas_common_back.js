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


//-------------------------对图表中的文字进行初始化---------------------
var size_radix = 1,
    labelFontSize = 12,
    titleFontSize = 14,
    emphasisFontSize = 16,
    titleMarginLeft = 30,
    titlePadding = [12.8,16,12.8,16],
    marginArrayFirst = [80, 120, 80, 80],
    marginArraySecond = [80, 40, 80, 80];


//-------------------------报表适配通用方法-----------------------
//id为报表id，formWidth为报表所占宽度比例，formHeight为报表所占高度比例
//此方法只会改变报表的大小，而不会对报表内文字的大小进行改变
function updateChartSize(id, formWidth, formHeight) {

    console.log("调用了updateChartSize");

    var width_win = $(window).width(),    //获取屏幕宽度
        width_main = width_win >= 1200 ? (width_win - 274) : 960,
        size_base = width_win >= 1200 ? (width_win - 274) / 24 : 40,
        width_new = Math.floor(formWidth * size_base),
        height_new = Math.floor(formHeight * size_base);

    $(".form_gridly").css("width",width_main + "px");
    $(".form_main").css("width",width_main + "px");

    $(id).css("width",width_new + "px");   //改变form_brick宽高
    $(id).css("height",height_new + "px");

    $(id + " .form_contents>div").eq(0).css("width",width_new - 10 + "px"); //改变以报表英文名为id的div宽高
    $(id + " .form_contents>div").eq(0).css("height",height_new - 10 + "px");


    //改变form_contents里的孙子div大小，考虑到复合图标类型，所以需要进行额外处理
    $(id + " .form_contents>div>div").each(function(){
        var width_child = $(this).attr("data-width_radio") || 1,    //当没有data-width_radio属性时，默认为100%宽高
            height_child = $(this).attr("data-height_radio") || 1,
            width_child_new = (width_new - 10) * width_child,
            height_child_new = (height_new - 10) * height_child;

        $(this).css("width",width_child_new + "px");
        $(this).css("height",height_child_new + "px");
    });
}


//-------------------------根据屏幕宽度进行报表适配调用方法-----------------------
//此方法只会改变报表的大小，而不会对报表内文字的大小进行改变
function autoUpdateSize(en_name,rand,method){

    (function (win) {

        function setUnitA() {

            // var en_name = "active_fans_percentage";

            $("#" + en_name).attr("id",en_name + rand);

            var brick = $("#" + en_name + rand),
                brick_id = brick.parents(".form_brick").attr("id"),
                originWidth = +brick.attr("data-width"),
                originHeight = +brick.attr("data-height");

            updateChartSize("#" + brick_id, originWidth, originHeight);

            if(method){
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

        document.documentElement.style.fontSize = width_win >= 1200 ?  (width_win - 274) * 16 / 960 + "px" : "16px";

        size_radix = width_win >= 1200 ? (width_win - 274) / 926 : 1;

        titleFontSize = Math.ceil(14 * size_radix);
        labelFontSize = Math.ceil(12 * size_radix);
        emphasisFontSize = Math.ceil(16 * size_radix);

        for (var k = 0; k < titlePadding.length; k++) {
            titlePadding[i] = Math.ceil(titlePadding[i] * size_radix);
            titlePadding[i] = Math.ceil(titlePadding[i] * size_radix);
        }

        var originLeft = 80;

        for (var i = 0; i < marginArrayFirst.length; i++) {
            marginArrayFirst[i] = Math.ceil(marginArrayFirst[i] * size_radix);
            marginArraySecond[i] = Math.ceil(marginArraySecond[i] * size_radix);

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


//------------------------echarts或highcharts绘制的所有图表开始-----------------------

var canvas_common_opt = {
    color: {
        green: "#00a300",
        yellow: "#ffc40d",
        purple: "#603cba"
    },
    title: {
        textStyle: {
            fontFamily: '微软雅黑',
            fontSize: 14*size_radix,
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



// 作者（Merrier）
// 图表类型：饼图
// 所用插件：echarts
// 图表个数(请实时更新)：9
// 图表名称（以中文名字为准）：
//     活跃粉丝比例（active_fans_percentage）
//     latest_collection_rate
//     latest_number_of_recipients
//     latest_write_off_rate
//     忠诚粉丝比例（loyal_fans_percentage）
//     待唤醒粉丝比例（sleeping_fans_percentage）
//     total_collection_rate
//     total_write_off_rate
//     僵尸粉丝比例（zombie_fans_percentage）
function PieCanvasGenerate(en_name, rand) {
//console.info(en_name);
    var pie = en_name + "_pie";

    $("#" + pie).attr("id", pie + rand).siblings("." + en_name).attr("class", en_name + rand);

    //var dataPieArray = $('#' + pie).siblings("." + en_name).data('list');

    //var dataPieArray = $('#active_fans_percentage_pie').siblings(".active_fans_percentage_pie").attr('data-list');
    var dataPieArray = $('#' + pie + rand).siblings("." + en_name + rand).data('list');


    //console.info(pie);
    //console.info(typeof(dataPieArray));
    if (typeof(dataPieArray) == 'string') {
        dataPieArray = $.parseJSON(dataPieArray);
    }
    //console.info(dataPieArray);
    if (dataPieArray != undefined) {

        var text = dataPieArray.text,
            data = dataPieArray.data,
            color = dataPieArray.color;

        $("#" + pie + rand).siblings(".form_pie_number").text(data[0] + "/" + data[1]);
        $("#" + pie + rand).siblings(".form_pie_number").css('fontSize', labelFontSize);


        var pie_option = {
            title: {
                text: text,
                textStyle: {
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                x: 'left',
                padding: [10, 15, 10, 15]
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
                                    color: color
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
                                        fontSize: titleFontSize
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: '#eee',
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
// 图表类型：柱状图+折线图
// 所用插件：echarts
// 图表个数(请实时更新)：2
// 图表名称（以中文名字为准）：
//     关注人数变化曲线（attention_number_changes）
//     移动端用户变化曲线（mobile_user_changes）
function BarCanvasGenerate(en_name, rand) {

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
        var barWidth = 2;
        if (time.length < 180) {
            barWidth = 10;
        }
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
            backgroundColor: color.back,
            title: {
                text: text.title,
                textStyle: {
                    color: '#ffffff',
                    fontFamily: '微软雅黑',
                    fontSize: titleFontSize,
                    fontWeight: 'normal'
                },
                left: '4%',
                top: '2%'
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
                    name: text.first,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#fff'
                        }
                    },
                    barWidth: barWidth,
                    data: data
                },
                line
            ]
        };

        var bar_init = echarts.init(document.getElementById(en_name + rand));

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
                left: '4%',
                top: '2%'
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
//     粉丝总数KPI（card_voucher_kpi）
//     粉丝总数KPI（card_voucher_success_rate）
//     粉丝总数KPI（copywriter_read_kpi）
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
                left: '4%',
                top: '2%'
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
                left: '4%',
                top: '2%'
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

    $("#" + en_name).attr("id", en_name + rand);

    var title = en_name + '_title',
        content = en_name + '_content',
        title_name = title + rand,
        content_name = content + rand,
        title_id = $("#" + title).attr("id", title_name),
        content_id = $("#" + content).attr("id", content_name),
        dataPieArray = $('#' + en_name + rand).find("." + en_name).data('list'),
        title = dataPieArray.title,
        content = dataPieArray.content;

    if (title.data.length == 0) {
        var title_data = [['无', 1]];
        var title_bool = false;
    } else {
        var title_data = title.data;
        var title_bool = true;
    }

    if (content.data.length == 0) {
        var content_data = [['无', 1]];
        var content_bool = false;
    } else {
        var content_data = content.data;
        var content_bool = true;
    }
    title_id.highcharts({
        chart: {
            type: 'pie',
            //height:466,
            //width:466,
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
            text: title.msg,
            align: 'center',
            y: 60,
            style: {
                'color': '#00b0f0',
                'fontSize': titleFontSize * 1.4
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            enabled: title_bool
        },
        plotOptions: {
            pie: {
                size: '90%',
                innerSize: '65%',
                depth: 45,
                align: 'center',
                dataLabels: {
                    style: {
                        "fontSize": labelFontSize
                    },
                    enabled: title_bool
                }
            }
        },
        series: [{
            name: '比例',
            data: title_data
        }]
    });
    content_id.highcharts({
        chart: {
            type: 'pie',
            //height:466,
            //width:466,
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
            text: content.msg,
            align: 'center',
            y: 60,
            style: {
                'color': '#00b0f0',
                'fontSize': titleFontSize * 1.4
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            enabled: content_bool
        },
        plotOptions: {
            pie: {
                size: '90%',
                innerSize: '65%',
                depth: 45,
                align: 'center',
                dataLabels: {
                    style: {
                        "fontSize": labelFontSize
                    },
                    enabled: content_bool
                }
            }
        },
        series: [{
            name: '比例',
            data: content_data
        }]
    });
}


// 作者：Yangyue
// 图表类型：待定
// 所用插件：highcharts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     文案阅读数分析（document_reading_analysis）
function documentReadingCanvas(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    var first = en_name + "_first",
        second = en_name + "_second",
        first_name = first + rand,
        second_name = second + rand,
        first_id = $("#" + first).attr("id", first_name),
        second_id = $("#" + second).attr("id", second_name),
        dataArray = $("#" + en_name + rand).find("." + en_name).data("list"),
        firstArray = dataArray.first,
        secondArray = dataArray.second;

    $(first_id).highcharts({

        chart: {
            backgroundColor: '#2d89ef',
            borderRadius: 5,
            zoomType: 'xy',
            marginLeft: marginArrayFirst[3],
            marginRight: marginArrayFirst[1],
            marginTop: 80

        },
        credits: {
            enabled: false // 禁用版权信息
        },
        title: {
            text: firstArray.text,
            align: 'left',
            x: titleMarginLeft,
            y: 15,
            style: {
                color: "#fff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize
                // fontWeight: 'bold'
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: firstArray.time,
            crosshair: true,
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            }
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '',
                style: {
                    color: firstArray.dataArray3.color,
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                },
                x: 10
            },
            title: {
                text: '',
                style: {
                    color: firstArray.dataArray3.color
                }
            },
            opposite: true
        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: firstArray.dataArray1.color
                }
            },
            labels: {
                format: '',
                style: {
                    color: firstArray.dataArray1.color,
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            }
        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: firstArray.dataArray2.color

                }
            },
            labels: {
                format: '{value}%',
                style: {
                    color: firstArray.dataArray2.color,
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                },
                x: 50
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
            color: firstArray.dataArray1.color,
            data: firstArray.dataArray1.data,
            tooltip: {
                valueSuffix: ''
            },
            textStyle: {
                fontSize: labelFontSize
            }

        }, {
            name: '阅读率',
            type: 'spline',
            yAxis: 2,
            color: firstArray.dataArray2.color,
            data: firstArray.dataArray2.data,
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
            color: firstArray.dataArray3.color,
            data: firstArray.dataArray3.data,
            tooltip: {
                valueSuffix: ''
            }
        }]

    });

    $(second_id).highcharts({

        chart: {
            backgroundColor: '#2d89ef',
            borderRadius: 5,
            zoomType: 'xy',
            marginLeft: marginArraySecond[3],
            marginRight: marginArraySecond[1],
            marginTop: 80

        },
        credits: {
            enabled: false // 禁用版权信息
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: secondArray.time,
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
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
            itemDistance: 70
        },
        series: [{
            name: '阅读人数',
            color: secondArray.dataArray1.color,
            data: secondArray.dataArray1.data
        }, {
            name: '阅读人次',
            color: secondArray.dataArray2.color,
            data: secondArray.dataArray2.data
        }, {
            name: '转发人数',
            color: secondArray.dataArray3.color,
            data: secondArray.dataArray3.data
        }, {
            name: '收藏人数',
            color: secondArray.dataArray4.color,
            data: secondArray.dataArray4.data
        }]

    });
}


// 作者：Yangyue
// 图表类型：待定
// 所用插件：highcharts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     单文案阅读数分析（single_document_reading_analysis）
function singleDocument(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    var first = en_name + "_first",
        second = en_name + "_second",
        third = en_name + "_third",
        first_name = first + rand,
        second_name = second + rand,
        third_name = third + rand,
        first_id = $("#" + first).attr("id", first_name),
        second_id = $("#" + second).attr("id", second_name),
        third_id = $("#" + third).attr("id", third_name),
        dataArray = $('#' + en_name + rand).find("." + en_name).data('list'),
        first_array = dataArray.first,
        second_array = dataArray.second,
        third_array = dataArray.third,
        titless = dataArray.title;

    $(first_id).highcharts({
        chart: {
            backgroundColor: '#660099',
            borderRadius: 5,
            marginLeft: marginArraySecond[3],
            marginRight: marginArraySecond[1],
            marginTop: 80
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        title: {
            text: first_array.text,
            align: 'left',
            x: titleMarginLeft,
            y: 15,
            style: {
                color: "#fff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize
            }
        },
        tooltip: {
            formatter: function () {
                var s;
                if (this.series.type == 'line') {
                    s = '<b>' + this.x + '</b>';
                    s += '<br/>' + '文章标题: ' + titless + '<br/>' + this.series.name + ': ' + this.y;

                } else {
                    s = '<b>' + this.point.name + ':' + Math.round(this.percentage * 100) / 100 + '%' + '</b>'
                }
                return s;
            }
        },
        xAxis: {
            categories: first_array.time,
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: "#fff",
                    fontSize: labelFontSize,
                    fontFamily: 'Arial'
                }
            }
        },
        legend: {
            align: 'center',
            floating: false,
            //itemDistance: 80,
            itemStyle: {
                color: '#fff',
                fontSize: labelFontSize,
                fontFamily: 'Arial',
                fontWeight: 'normal'
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
            innerSize: 60,
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
            }, {
                name: '历史消息',
                y: first_array.pie.data[3],
                color: first_array.history_message.color
            }, {
                name: '其他',
                y: first_array.pie.data[4],
                color: first_array.others.color
            }],
            center: ['92%', 0],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });

    $(second_id).highcharts({
        chart: {
            backgroundColor: '#660099',
            borderRadius: 5,
            marginLeft: marginArraySecond[3],
            marginRight: marginArraySecond[1],
            marginTop: 80
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: second_array.time,
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            align: 'center',
            floating: false,
            //itemDistance: 120,
            itemStyle: {
                color: '#fff',
                fontFamily: 'Arial',
                fontSize: labelFontSize,
                fontWeight: 'normal'

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

    $(third_id).highcharts({
        chart: {
            backgroundColor: '#660099',
            type: 'bar'
            // marginLeft:marginArraySecond[3],
            // marginRight:marginArraySecond[1],
            // marginTop:80
        },
        title: {
            text: ''
        },
        plotOptions: {
            bar: {
                borderWidth: 0
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
            labels: {
                style: {
                    color: "#fff",
                    fontFamily: 'Arial',
                    fontSize: labelFontSize
                }
            },
            min: 0,
            max: 10,
            lineWidth: 0,   //去除x轴轴线
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
                style: {
                    color: '#fff',
                    fontSize: labelFontSize,
                    fontFamily: 'Arial'
                }
            },
            gridLineWidth: 0
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            enabled: false
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
}


// 作者：Yangyue
// 图表类型：待定
// 所用插件：highcharts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     待定（single_coupon）
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

    $("#" + en_name).attr("id", en_name + rand);

    var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    var dataArrays = {
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
        color: ["#ffc40e", "#2d89f0", "#f78d05", "#f6db05", "#2d89f0"]
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
            left: '4%',
            top: '2%'
        },
        legend: {
            show:"false",
            y: 'bottom',
            data: dataArrays.legend,
            itemWidth: 5,
            itemHeight: 5,
            textStyle: {
                fontSize: labelFontSize
            }
        },

        color: dataArray.color,
        calculable: false,
        series: [
            {
                name: '消费组成占比',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '35%'],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

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
                name: '消费组成占比',
                type: 'pie',
                radius: ['50%', '75%'],
                selectedMode: "single",

                //for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,

                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner',
                            textStyle: {
                                color: "#000"
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

    var form_init = echarts.init(document.getElementById(en_name + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：标准柱图（双柱，有legend）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员消费力分布曲线（member_consumption_distribution_curve）
function twoBarLegend(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

     var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

    //假数据
    // var dataArray = {
    //     backgroundColor: "#2d89f0",
    //     title: "会员消费力分布曲线",
    //     text: ["客户占比", "消费占比"],
    //     data: [
    //         [0.34, 0.53, 0.78, 0.47, 0.24, 0.09, 0.23, 0.88, 0.43, 0.88, 0.82, 0.05, 0.94, 0.60, 0.28, 0.50],
    //         [0.60, 0.58, 0.30, 0.60, 0.43, 0.03, 0.48, 0.05, 0.39, 0.53, 0.57, 0.69, 0.93, 0.20, 0.45, 0.38]
    //     ],
    //     data_price:["0-500","501-1001","1002-1502","1503-2003","2004-2504","2503-3005","3006-3506","3507-4007"],
    //     data_zoom:false,
    //     color: ["#ffffff", "#ffc40e"]
    // };


    var form_opt = {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '20%',
            top: '16%',
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
            left: '4%',
            top: '2%'
        },
        tooltip : {
            trigger: 'axis',
            formatter: function (params){
                return "消费力："+ params[0].name + "元" + '<br/>'
                    + params[0].seriesName + ' : ' + (params[0].value*100).toFixed(0) + "%" + '<br/>'
                    + params[1].seriesName + ' : ' + (params[1].value*100).toFixed(0) + "%" + '<br/>';
            }
        },
        legend: {
            data: dataArray.text,
            y: 'bottom',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "#ffffff",
                fontSize: labelFontSize
            }
        },
        calculable: true,
        dataZoom: {
            show: dataArray.data_zoom,
            height: 15,
            y: Math.floor(titleMarginLeft * 6.5),
            // backgroundColor:"#ffffff",
            textStyle: {
                color: "#ffffff"
            },
            handleColor: "#ffc40e",
            dataBackgroundColor: "#7d7d7d",
            fillerColor: "#ffffff",
            start:0,
            end: 10,
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
                    interval: 0,
                    formatter: function(value){
                        return value + "元"
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20
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
                    formatter: function(value){
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
                            formatter:function(params){
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
                            formatter:function(params){
                                return (params.value * 100).toFixed(0) + "%";
                            }
                        }
                    }
                },
                data: dataArray.data[1]
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：标准饼图（单环，有legend）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员生命周期管理（member_life_cycle_management）
function onePieLegend(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

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
                color: "#ffffff",
                fontFamily: '微软雅黑',
                fontSize: titleFontSize,
                fontWeight: 'normal'
            },
            left: '4%',
            top: '2%'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 5,
            itemHeight: 5,
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
                            show: true
                        }
                    }
                },

                data: dataArray.data
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + rand));

    form_init.setOption(form_opt);  //echarts实例化
}


// 作者：Merrier
// 图表类型：散点（气泡）图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     品牌购买关联分析（brand_purchase_association_analysis）
function scatterSingle(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");


    //假数据
    var dataArrays = {
        backgroundColor: "#70309f",
        color_scatter:"#ffff00",
        text: "品牌购买关联分析",
        data: [
            [10, 430, 0.23,"优衣库"],
            [3, 1200, 0.05, 'H&M'],
            [20, 103, 0.43, "GAP"],
            [14, 283, 0.29, "ZARA"],
            [18, 395, 0.69, "Mousy"],
            [12, 90, 0.20, "hasd"],
            [7, 382, 0.39, "肯德基"],
            [13, 490, 0.25, "麦当劳"]]
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
            left: '4%',
            top: '2%'
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
        // legend: {
        //     y: 'bottom',
        //     data: dataArray.legend,
        //     textStyle: {
        //         fontSize: labelFontSize,
        //         color:"#fff"
        //     }
        // },
        xAxis: [
            {
                type: 'value',
                scale: true,
                // interval:2,
                min:0,
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
                        width:2
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'rgba(255,255,255,0.3)',
                        width:1
                    }
                },
                boundaryGap:[0,0.05]
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                //interval:300,
                min:0,
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
                        width:2
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'rgba(255,255,255,0.3)',
                        width:1
                    }
                },
                boundaryGap:[0,0.01]
            }
        ],
        grid: {
            left: '5%',
            right: '10%',
            bottom: '5%',
            top: '15%',
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
                itemStyle:{
                    normal:{
                        color:dataArray.color_scatter,
                        // color: function (params){
                        //     var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
                        //     return colorList[params.dataIndex];
                        // },
                        label:{
                            show:true,
                            position:'top',
                            formatter:function(params){
                                return params.value[3];
                            },
                            textStyle:{
                                color:"#fff",
                                fontSize:titleFontSize
                            }
                        }
                    }
                }
            }
        ]


    };


    var form_init = echarts.init(document.getElementById(en_name + rand));

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
    var name = en_name;
    $("#" + en_name).attr("id", en_name + rand);

    var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");


    //假数据
    var dataArrayss = {
        backgroundColor: "#2d89f0",
        text: "每年会员比例分布",
        data: {
            data_time:[2010,2011,2012,2013,2014,2015,2016],
            data_percentage:[[0.2,0.3,0.1,0.15,0.3,0.25,0.3],[0.2,0.1,0.5,0.3,0.4,0.1,0.2],[0.3,0.25,0.35,0.35,0.25,0.5,0.2],[0.3,0.35,0.05,0.2,0.05,0.15,0.3]]
        },
        legend:["新多次会员","新单次会员","旧多次会员","旧单次会员"],
        color:["#01a300","#953735","#da9695","#fdeadb"]
    };

    //会员属性分布假数据
    var dataArrays = {
        backgroundColor: "#70309f",
        text: "会员属性分布",
        data: {
            data_time: ["未知年龄",'18-23','24-29','30-35','36-41','42-47'],
            data_percentage: [[0.2, 0.6, 0.1, 0.15, 0.3, 0.25], [0.2, 0.1, 0.5, 0.55, 0.4, 0.2], [0.6, 0.3, 0.4, 0.3, 0.3, 0.55]]
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
            left: '4%',
            top: '2%'
        },
        tooltip: {
            trigger: 'axis',
            formatter:function (params) {
                var tooltip_str = '';
                for(var i = 0;i<params.length;i++){
                    // if(name == 'membership_attribute_distribution'){
                        tooltip_str += params[i].seriesName + ' : ' + (params[i].value) + '<br/>';
                    // }else{
                    //     tooltip_str += params[i].seriesName + ' : ' + (params[i].value * 100).toFixed(0) + "%" + '<br/>';
                    // }
                }
                return params[0].name + '<br />' + tooltip_str;
            }
        },
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 5,
            itemHeight: 5,
            textStyle: {
                fontSize: labelFontSize,
                color: "#fff"
            }
        },
        calculable: true,
        grid: {
            left: '5%',
            right: '10%',
            bottom: '13%',
            top: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: dataArray.data.data_time,
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
                // max: 1.2,
                // interval: 0.5,
                axisLabel: {
                    formatter: function (value) {
                        // if(name == 'membership_attribute_distribution'){
                            return (value);
                        // }else{
                        //     return (value * 100).toFixed(dataArray.toFixed) + "%";


                        // }
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

        series:(function(){
            var series_arr = [];
            for(var i =0;i<dataArray.data.data_percentage.length;i++){
                var serier_opt = {
                    name:dataArray.legend[i] || "",
                    type: "bar",
                    stack: dataArray.text,
                    barWidth : fixWidth(dataArray.label_width),
                    itemStyle: {
                        normal: {
                            color: dataArray.color[i],
                            label: {
                                show: dataArray.label,
                                formatter: function (params) {
                                    // if(name == 'membership_attribute_distribution'){
                                        return (params.data);
                                    // }else{
                                    //     return (params.data * 100).toFixed(dataArray.toFixed) + "%";
                                    // }
                                }
                            }
                        }
                    },
                    data: dataArray.data.data_percentage[i]
                };
                series_arr.push(serier_opt);
            }
            return series_arr;
        })()
    };



    var form_init = echarts.init(document.getElementById(en_name + rand));

    form_init.setOption(form_opt);  //echarts实例化
}
function fixWidth(percent)
{
    return document.body.clientWidth * percent ; //这里你可以自己做调整
}

// 作者：Merrier
// 图表类型：柱状图+折线图
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     不同回购次数下的KPI（different_repurchase_times_kpi）
function barPlusLine(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);
    var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");

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
            left: '2%',
            top: '2%'
        },
        tooltip : {
            trigger: 'axis',
            formatter: function (params){
                return "购买次数："+ params[0].name + "次" + '<br/>'
                    + params[0].seriesName + ' : ' + params[0].value + "元" + '<br/>'
                    + params[1].seriesName + ' : ' + (params[1].value*100).toFixed(0) + "%" + '<br/>';
            }
        },
        calculable : true,
        legend: {
            y: 'bottom',
            data: dataArray.legend,
            itemWidth: 25,
            itemHeight: 10,
            textStyle: {
                fontSize: labelFontSize,
                color:"#fff"
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            top:"30%",
            bottom:"13%",
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : dataArray.data.data_times,
                axisLabel: {
                    formatter: function(value){
                        if(value == 1){
                            return value;
                        }else{
                            return "》" + value;
                        }
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle:{
                        color:"#ffffff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width:1
                    }
                },
                splitLine:{
                    show:false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '客单价',
                axisLabel: {
                    formatter:'{value}',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle:{
                        color:"#ffffff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width:1
                    }
                },
                splitLine:{
                    show:false
                }
            },
            {
                type : 'value',
                name : '复购率',
                interval:0.25,
                axisLabel: {
                    formatter: function(value){
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
                    lineStyle:{
                        color:"#ffffff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ffffff',
                        width:1
                    }
                },
                splitLine:{
                    show:false
                }
            }
        ],
        series : [
            {
                name:'客单价',
                type:'bar',
                barCategoryGap:"50%",
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
                        label:{
                            show:true,
                            position:"top"
                        }
                    },
                    emphasis:{
                        color:"#ffc003"
                    }
                },
                data: dataArray.data.data_price
            },
            {
                name:'复购率',
                type:'line',
                yAxisIndex: 1,
                itemStyle:{
                    normal:{
                        lineStyle:{
                            color:"#3ac278"
                        }
                    }
                },
                data:dataArray.data.data_rate
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + rand));

    form_init.setOption(form_opt);  //echarts实例化
}
// 作者：Merrier
// 图表类型：标准柱图（单柱）
// 所用插件：echarts
// 图表个数(请实时更新)：1
// 图表名称（以中文名字为准）：
//     会员价值分布曲线（member_value_distribution_curve）
function singleBar(en_name, rand) {

    $("#" + en_name).attr("id", en_name + rand);

    var dataArray=$("#"+en_name+rand).find("."+en_name).data("list");
    //假数据
    var dataArrays = {
        backgroundColor: "#70309f",
        title: "会员价值分布曲线",
        category:"TOP111品类",
        label_text:"个月",
        data:[0.34, 0.53, 0.78, 0.24, 0.09, 0.23, 0.88, 0.43, 0.88, 0.82, 0.05, 0.94, 0.60, 0.28, 0.50, 0.43, 0.88, 0.82],
        data_date: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", ">18"],
        // data_zoom: true,
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
            left: '2%',
            top: '2%'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return dataArray.category + ' : ' + (params[0].value * 100).toFixed(0) + "%" + '<br/>';
            }
        },
        legend: {
            show:false
        },
        calculable: true,
        // dataZoom: {
        //     show: dataArray.data_zoom,
        //     height: 15,
        //     y: Math.floor(titleMarginLeft * 7),
        //     // backgroundColor:"#ffffff",
        //     textStyle: {
        //         color: "#ffffff"
        //     },
        //     handleColor: "#ffc40e",
        //     dataBackgroundColor: "transparent",
        //     fillerColor: "#ffffff",
        //     // start: 0,
        //     // end: 50,
        //     startValue:0,
        //     endValue:17,
        //     zoomLock: false
        // },
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
                    formatter: function (value) {
                        if (dataArray.label_text == "" || dataArray.label_text == undefined) {
                            return value;
                        } else {
                            return value + dataArray.label_text;
                        }
                    },
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: labelFontSize
                    }
                },
                boundaryGap: 20
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
                            }
                        }
                    }
                },
                data: dataArray.data
            }
        ]
    };


    var form_init = echarts.init(document.getElementById(en_name + rand));

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

    $("#" + pie).attr("id", pie + rand).siblings("." + en_name).attr("class", en_name + rand);

    // var dataArray = $('#' + pie + rand).siblings("." + en_name + rand).data('list');

    var dataArray = {
        text: "返店率",
        data: [30, 100],
        color: "#ffc40d",
        string: "sadf12"
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
                                    color: color
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
                                        fontSize: titleFontSize
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: '#eee',
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

