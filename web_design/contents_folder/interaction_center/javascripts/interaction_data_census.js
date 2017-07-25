/**
 * Created by Administrator on 2016/6/6.
 */

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

$(function(){
    //--------------------传播层级图-------------------
    var myChart = echarts.init(document.getElementById('main'));
    var xArray=['第1层','第2层','第3层','第4层','第5层','第6层','第7层','第8层','第9层','第10层','第11层','第12层'
        ,'第13层','第14层','第15层','第16层','第17层','第18层','第19层','第20层'];          //分层
    var yArray=[
        {value: 100, name:'第1层'},
        {value: 555, name:'第2层'},
        {value: 509, name:'第3层'},
        {value: 468, name:'第4层'},
        {value: 420, name:'第5层'},
        {value: 365, name:'第6层'},
        {value: 330, name:'第7层'},
        {value: 212, name:'第8层'},
        {value: 184, name:'第9层'},
        {value: 120, name:'第10层'},
        {value: 96, name:'第11层'},
        {value: 70, name:'第12层'},
        {value: 54, name:'第13层'},
        {value: 30, name:'第143层'},
        {value: 10, name:'第15层'},
        {value: 2, name:'第16层'},
        {value: 0, name:'第17层'},
        {value: 0, name:'第18层'},
        {value: 0, name:'第19层'},
        {value: 0, name:'第20层'}
    ];                     //每一层数据
    option = {
        title: {
            text: '传播层级分析图',
            subtext: '',
            left: 'left',
            top: 'top'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            orient: 'vertical',
            top: 'center',
            feature: {
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            bottom:'bottom',
            data: xArray,
            show:false
        },
        calculable: true,
        series: [
            {
                name: '金字塔',
                type: 'funnel',
                width: '60%',
                height: '85%',
                left: '20%',
                top: '5%',
                sort: 'none',
                data:yArray
            }
        ]
    };
    myChart.setOption(option);
    //--------------------传播层级图-------------------
});

//--------------------折线图-------------------
$(function(){
    var dateArray=['2011/01/21','2011/01/22','2011/01/24','2011/01/26','2011/01/28','2011/01/29','2011/01/31'];  //X轴
    var yArray=[[120, 132, 101, 134, 90, 230, 210],[220, 182, 191, 234, 290, 330, 310],
        [150, 232, 201, 154, 190, 330, 410]];                     //Y轴
    var myChart = echarts.init(document.getElementById('container'));
    option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['页面浏览次数','参与人数','转发次数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateArray,
            splitLine:{
                show:false
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'页面浏览次数',
                type:'line',
                data:yArray[0],
                smooth:true,
                color:'#33ffff',
                itemStyle:{
                    normal:{
                        color:'#33ffff'
                    }
                }
            },
            {
                name:'参与人数',
                type:'line',
                data:yArray[1],
                smooth:true,
                color:'#222',
                itemStyle:{
                    normal:{
                        color:'#222'
                    }
                }
            },
            {
                name:'转发次数',
                type:'line',
                data:yArray[2],
                smooth:true,
                color:'#ff0033',
                itemStyle:{
                    normal:{
                        color:'#ff0033'
                    }
                }
            }
        ]
    };

    //option = {
    //    title : {
    //        text: ''
    //    },
    //    tooltip : {
    //        trigger: 'axis'
    //    },
    //    legend: {
    //        data:['页面浏览次数','参与人数','转发次数']
    //    },
    //    toolbox: {
    //        show : true,
    //        feature : {
    //        }
    //    },
    //    calculable : true,
    //    xAxis : [
    //        {
    //            type : 'category',
    //            boundaryGap : false,
    //            data : dateArray
    //        }
    //    ],
    //    yAxis : [
    //        {
    //            type : 'value'
    //        }
    //    ],
    //    series : [
    //        {
    //            name:'页面浏览次数',
    //            type:'line',
    //            data:yArray[0]
    //        },
    //        {
    //            name:'参与人数',
    //            type:'line',
    //            data:yArray[1]
    //        },
    //        {
    //            name:'转发次数',
    //            type:'line',
    //            data:yArray[2]
    //        }
    //    ]
    //};



    myChart.setOption(option);
});
//--------------------折线图-------------------