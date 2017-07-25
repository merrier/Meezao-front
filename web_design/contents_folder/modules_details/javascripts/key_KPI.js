/**
 * Created by Yangyue on 2016/8/23.
 */
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
                    text:"关键KPI",
                    time:['2016-1-1', '2016-1-2', '2016-1-3', '2016-1-4', '2016-1-5', '2016-1-6', '2016-1-7', '2016-1-8', '2016-1-9', '2016-1-10', '2016-1-11', '2016-1-12', '2016-1-13', '2016-1-14', '2016-1-15', '2016-1-16', '2016-1-17', '2016-1-18', '2016-1-19', '2016-1-20', '2016-1-21', '2016-1-22', '2016-1-23', '2016-1-24', '2016-1-25', '2016-1-26', '2016-1-27', '2016-1-28', '2016-1-29', '2016-1-30'],
                    dataArray1:[10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200],
                    dataArray2:[40, 62, 100, 304, 90, 130, 210, 100, 252, 20, 34, 270, 350, 200, 105, 152, 233, 339, 290, 155, 100, 72, 201, 34, 68, 300, 220, 110, 352, 66]
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
    var form_5 = echarts.init(document.getElementById('key_KPI'));

    var form_5_option = {
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
                name: '首篇阅读数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                barWidth: 5,
                data: dataBarArray[0].dataArray1
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
                data: arrayReduce(dataBarArray[0].dataArray1)
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
                data: dataBarArray[0].dataArray2
            }
        ]
    };

    form_5.setOption(form_5_option);

});


