/**
 * Created by Yangyue on 2016/8/17.
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
                    text:"标题",
                    data:[
                        ['亲子',   45.0],
                        ['女装',   46.8],
                        ['男装',   30.0],
                        ['影妆',   28.5],
                        ['打折',   26.2],
                        ['童话',   20.7],
                        ['餐饮',   16.7],
                        ['活动',   11.7],
                        ['女鞋',   31.7],
                        ['童装',   20.9]
                    ]

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

    $('#document_keywords_analysis').highcharts({
        chart: {
            type: 'pie',
            height:466,
            width:466,
            options3d: {
                enabled: true,
                alpha: 45
            }
            //borderColor:""
        },
        credits:{
            enabled:false
        },
        title: {
            text: dataArray[0].text,
            align:'center',
            y:260,
            style:{
                'color':'#00b0f0',
                'fontSize':'60px'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                size:300,
                innerSize: 200,
                depth: 45
            }
        },
        series: [{
            name: 'Browser share',
            data: dataArray[0].data
        }]
    });
});

$(function(){

    $(".keywords_kind").delegate("div","click",function(){
        $(this).addClass("keywords_kind_now").siblings().removeClass("keywords_kind_now");
    });

});
