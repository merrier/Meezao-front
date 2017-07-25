/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/7/13>
 // +--------------------------------------------------------------------------*/
// JavaScript Document
$(function () {

    //-----------------------ajax拉取柱图数据---------------------
    function ajaxBarGet() {
        var barget = [];
        $.ajax({
            dataType: "json",
            url: "hahahahahah.html",
            type: "GET",
            async: false,
            error: function (data) {
                data = [{
                    text:"移动端使用人数变化曲线",
                    time:['2015-1-1', '2015-1-2', '2015-1-3', '2015-1-4', '2015-1-5', '2015-1-6', '2015-1-7', '2015-1-8', '2015-1-9', '2015-1-10', '2015-1-11', '2015-1-12', '2015-1-13', '2015-1-14', '2015-1-15', '2015-1-16', '2015-1-17', '2015-1-18', '2015-1-19', '2015-1-20', '2015-1-21', '2015-1-22', '2015-1-23', '2015-1-24', '2015-1-25', '2015-1-26', '2015-1-27', '2015-1-28', '2015-1-29', '2015-1-30'],
                    data:[10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200]
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

    var dataBarArray = ajaxBarGet();


    //------------------------遍历返回数组的2/3--------------------
    function arrayReduce(array) {
        var array_new = [];
        $.each(array, function (index, value) {
            var value_new = parseInt(value * 2 / 3);
            array_new.push(value_new);
        });
        return array_new;
    }


    //-------------------30天关注人数变化曲线---------------------
    var form_16 = echarts.init(document.getElementById('mobile_user_changes'));

    var form_16_option = {
        backgroundColor: '#2d89ef',
        title: {
            text: dataBarArray[0].text,
            textStyle: {
                color: '#ffffff',
                fontFamily: '微软雅黑',
                fontSize: 15
            },
            x: 'left',
            padding: [10, 15, 10, 15]
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
                data: dataBarArray[0].time,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    interval: 3,
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Arial',
                        fontSize: 12
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
                        fontSize: 12
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
                name: dataBarArray[0].text,
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                barWidth: 10,
                data: dataBarArray[0].data
            },
            {
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
                data: arrayReduce(dataBarArray[0].data)
            }
        ]
    };

    form_16.setOption(form_16_option);

});


