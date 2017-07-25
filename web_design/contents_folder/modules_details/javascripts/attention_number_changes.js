/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/7/13>
 // +--------------------------------------------------------------------------*/
// JavaScript Document
$(function () {

    //---------------------点击设为默认时发ajax------------------
    $(".form_configure_bottom").delegate(".btn_set_default","click",function(e){
        e.preventDefault();

        $(".modal_data_computing").modal("show");
        timer = setInterval(ajaxInterval,4000);
    });


    //---------------------轮询发ajax-------------------
    function ajaxInterval() {

        var modal = $(".modal_data_computing");

        $.ajax({
            dataType:"json",
            url:"",
            type:"POST",
            async:false,

            error:function(data){
                var status = data.status,
                    width_total = parseInt(modal.find(".progress").css("width")),
                    width_now = parseInt(modal.find(".progress-bar").css("width")),
                    width_radio = width_now/width_total;

                if(status != true){
                    if(width_radio > 0.94){
                        return;
                    }else{
                        modal.find(".progress-bar").css("width",(width_radio + 0.05)*width_total + "px");
                    }
                }else{
                    clearInterval(timer);
                    modal.find(".modal-body p").text("数据已计算完毕，3秒后将自动刷新页面。");
                    setTimeout(function(){
                        location.reload();
                    },3000);
                }
            },
            success:function(data){
                console.log("网络连接错误！");
            },
            always:function(data){
            }
        })
    }


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
                    text:"关注人数变化曲线",
                    time:['2016-1-1', '2016-1-2', '2016-1-3', '2016-1-4', '2016-1-5', '2016-1-6', '2016-1-7', '2016-1-8', '2016-1-9', '2016-1-10', '2016-1-11', '2016-1-12', '2016-1-13', '2016-1-14', '2016-1-15', '2016-1-16', '2016-1-17', '2016-1-18', '2016-1-19', '2016-1-20', '2016-1-21', '2016-1-22', '2016-1-23', '2016-1-24', '2016-1-25', '2016-1-26', '2016-1-27', '2016-1-28', '2016-1-29', '2016-1-30'],
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
    var form_5 = echarts.init(document.getElementById('attention_number_changes'));

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
            //show:true
        },
        xAxis: [
            {
                type: 'category',
                data: dataBarArray[0].time,
                axisTick: {
                    show: false
                },
                splitLine:{
                    show:false
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'#fff'
                    }
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
                splitLine:{
                    show:false
                },
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
                    show: true,
                    lineStyle:{
                        color:'#fff'
                    }
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

    form_5.setOption(form_5_option);

});


