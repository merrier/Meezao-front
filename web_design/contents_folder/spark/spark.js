/**
 * Created by claire666 on 2017/6/23.
 */
var myChart1 = echarts.init(document.getElementById('main1'));
var option1 = {
    title: {
        // 主标签为问答标签／wiki分类，副标签为Top5（默认的副标签）／自选／全部
        text: '问答标签',
        subtext: '自选',
        x:'left',
        y:'top'
    },
    tooltip: {
        trigger: 'item',
        backgroundColor : 'rgba(0,0,250,0.2)'
    },
    visualMap: {
        color: ['red', 'yellow']
    },
    radar: {
        indicator : [
            { text: '电子设计', max: 400},
            { text: '红外', max: 400},
            { text: '蓝牙', max: 400},
            { text: '测距', max: 400},
            { text: 'mcookie', max: 400}
        ]
    },
    series : (function (){
        var series = [];
        for (var i = 1; i <= 28; i++) {
            series.push({
                type: 'radar',
                symbol: 'none',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width:1
                        }
                    },
                    emphasis : {
                        areaStyle: {color:'rgba(0,250,0,0.3)'}
                    }
                },
                data:[
                    {
                        value:[
                            (40 - i) * 10,
                            (38 - i) * 4 + 60,
                            i * 5 + 10,
                            i * 9,
                            i * i /2
                        ],
                        name: '2017年5月' + i + '日'
                    }
                ]
            });
        }
        return series;
    })()
};
myChart1.setOption(option1);

var myChart2 = echarts.init(document.getElementById('main2'));
var option2 = {
    title: {
        text: 'wiki分类',
        subtext: 'Top5',
        x:'left',
        y:'top'
    },
    tooltip: {
        trigger: 'item',
        backgroundColor : 'rgba(0,0,250,0.2)'
    },
    visualMap: {
        color: ['red', 'yellow']
    },
    radar: {
        indicator : [
            { text: '导论实验课', max: 400},
            { text: 'Arduino语法', max: 400},
            { text: 'Web学习', max: 400},
            { text: '计算机基础原理', max: 400},
            { text: '电子电路基础课', max: 400}
        ]
    },
    series : (function (){
        var series = [];
        for (var i = 1; i <= 28; i++) {
            series.push({
                type: 'radar',
                symbol: 'none',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width:1
                        }
                    },
                    emphasis : {
                        areaStyle: {color:'rgba(0,250,0,0.3)'}
                    }
                },
                data:[
                    {
                        value:[
                            (40 - i) * 10,
                            (38 - i) * 4 + 60,
                            i * 5 + 10,
                            i * 9,
                            i * i /2
                        ],
                        name: '2017年5月' + i + '日'
                    }
                ]
            });
        }
        return series;
    })()
};
myChart2.setOption(option2);