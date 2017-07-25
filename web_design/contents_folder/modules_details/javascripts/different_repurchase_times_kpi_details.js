/**
 * Created by Merrier on 2017/1/17.
 */


$(function(){

    var list = $(".details_config_data").attr("data-list");


    // var data_group;

    // //------------------------------开始时间选择--------------------
    // $("#from").datepicker({
    //     duration: '',
    //     defaultDate: "",
    //     changeMonth: true,
    //     changeYear: true,
    //     numberOfMonths: 1,
    //     dateFormat: "yy-mm-dd",
    //     onClose: function (selectedDate) {
    //         $("#to").datepicker("option", "minDate", selectedDate);
    //         $(".config_item_timeperiod .error_message").hide();
    //     }
    // });
    //
    // //------------------------------结束时间选择--------------------
    // $("#to").datepicker({
    //     duration: '',
    //     defaultDate: "",
    //     changeMonth: true,
    //     changeYear: true,
    //     numberOfMonths: 1,
    //     dateFormat: "yy-mm-dd",
    //     minDate: 'Today',
    //     onClose: function (selectedDate) {
    //         $("#from").datepicker("option", "maxDate", selectedDate);
    //         $(".config_item_timeperiod .error_message").hide();
    //     }
    // });




    //-----------------------用于测试的假数组--------------------
    var data_group_all = [{
        "id": "1",
        "name": "商城",
        "en_name": "market_group",
        "data_sources": [{"id": "16", "name": "zi"}, {"id": "17", "name": "aafa"}]
    }, {
        "id": "2",
        "name": "类目",
        "en_name": "category_group",
        "data_sources": [{"id": "1", "name": "全部微信会员"}, {"id": "2", "name": "30天内新注册微信会员"}, {
            "id": "3",
            "name": "7天内新注册微信会员"
        }, {"id": "4", "name": "骨灰粉丝"}, {"id": "5", "name": "忠诚粉丝"}, {"id": "6", "name": "唤醒粉丝"}, {
            "id": "7",
            "name": "待唤醒粉丝"
        }, {"id": "8", "name": "僵尸粉丝"}]
    }, {
        "id": "3",
        "name": "品牌",
        "en_name": "brand_group",
        "data_sources": [{"id": "9", "name": "全部电子会员"}, {"id": "10", "name": "30天内新注册电子会员"}, {
            "id": "11",
            "name": "7天内新注册电子会员"
        }]
    }];

    //---------------------下拉框数据源选择----------------------
    $(".singauto_dropdown").delegate(".dropdown-menu>li>a", "click", function () {
        $(this).parents("ul").prevAll(".btn-dropdown").find(":first-child").text($(this).text());
        $(this).parents(".dropdown").attr("data-id", $(this).attr("data-id"));
        var data_id = $(this).attr("data-id");
        var data_name = $(this).attr("data-name");
        var array_group = groupDataAssignment(data_id);
        eval(data_name + "=array_group");
        eval("data_group" + "=" + data_name);
        singleAuto(".singauto_input_box .singauto_input", data_group, data_id);
    });


    //--------------------遍历数组给全局变量赋值-----------------
    function groupDataAssignment(data_id){
        var array_ajax = [];
        $.each(data_group_all,function(index,item){
            if(item.id == data_id){
                $.each(item.data_sources,function(i,data_item){
                    var value = data_item.id;
                    var label = data_item.name;
                    var push_item = {
                        value:value,
                        label:label
                    };
                    array_ajax.push(push_item);
                });
            }
        });
        return array_ajax;
    }


    // single_Auto(".activity_input",test1);   //自动完成搜索单选初始化

    //--------------------自动完成搜索单选-------------------
    function singleAuto(input,source,data_id){
        $(input).autocomplete({
            source: source,
            //_renderItem:function (ul, item) {
            //    return $("<li></li>")
            //        .append(item.label+"<br/>"+item.value)
            //        .appendTo(ul);
            //},
            select: function( event, ui ) {
                var value = ui.item.value;
                var span=$("<span class='singauto_span'><i class='fa fa-close float_right_single'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_single' title='删除'></i>");
                span.attr("data-id",ui.item.value);
                $(this).parents(".singauto_input_box").prepend(span);
                span.siblings(".dropdown-toggle").css("margin-top","-1px");
                dataAddHideInput("group", data_id, value);
                $(this).val("").hide();
                $(this).parents(".form-group").next(".error_show").hide();

                return false;
            }
        });
    }


    //----------------------模糊搜索展示全部结果---------------------
    $(".singauto_input_box").delegate(".dropdown-toggle","click",function(){
        var auto_input=$(this).parents(".singauto_input_box").find(".singauto_input");
        if (auto_input.autocomplete("widget").is(":visible")) {
            auto_input.autocomplete("close");
            return;
        }
        $(this).blur();
        auto_input.autocomplete('search', '');
        auto_input.focus();
    });

    //---------------------模糊搜索点击添加到隐藏input中--------------------
    function dataAddHideInput(type, data_id, value) {
        var group_hideinputbox = $(".singauto_hideinputbox");
        var actions_hideinput = $(".modal_group").find(".filter_actions_hideinput");
        var actions_input_id = data_id + "_" + value;
        var group_input_id = type + "_" + value;
        if (type == "group") {
            $(".singauto_range_hideinputnew").eq(0).clone(true).appendTo(group_hideinputbox).addClass("group_range_hideinput")
                .removeClass("singauto_range_hideinputnew").attr("name", "group_input").attr("id", group_input_id).val(group_input_id);
        } else if (type == "actions") {
            actions_hideinput.val(actions_input_id);
        }
    }

    //--------------------自动完成搜索删除已选项-------------------
    $(document).on("click",".float_right_single",function(){
        var span = $(this).parents(".singauto_span");
        $(this).parents(".singauto_input_box").find('.singauto_input').attr("disabled",false).show();
        span.siblings(".dropdown-toggle").css("margin-top","0");
        span.remove();
    });

});


// //----------------------------根据屏幕宽度改变图表大小-----------------------
// var width=$(".form_brick").width();
// var height=$(".form_brick").height();
// //var titleSize=16;
// //var labelSize=12;
// console.log(width);
// console.log(height);
// var width1=width*0.745;
// var width2=width;
// var height1=height*0.49;
// var height2=height*0.4;
//
// console.log(width1);
// console.log(width2);
// console.log(height1);
//
// console.log($("#single_coupon").width());
// console.log($("#single_coupon").height());
//
// var width=$(window).width();
// console.log(width);
// var size=width/1400;
// console.log(size);
//
// function updateChartSize(id,formWidth,formHeight){
//
//     console.log(formWidth);
//     console.log(formHeight);
//
//     if(width>1400){
//         var formWidth=formWidth*size;
//         width1=(formWidth-10)*0.745;
//         width2=(formWidth-10);
//         var formHeight=formHeight*size;
//         height=(formHeight-10);
//         height1=(formHeight-10)*0.49;
//         height2=(formHeight-10)*0.4;
//         console.log(formWidth);
//         console.log(formHeight);
//         $(".form_main").width(formWidth+"px");
//         $(".form_gridly").width(formWidth+"px");
//         $(".form_brick").width((formWidth-10)+"px");
//         $(".form_brick").height((formHeight-10)+"px");
//         $(".form_contents").width((formWidth-10)+"px");
//         $(".form_contents").height((formHeight-10)+"px");
//         $(id).width((formWidth-10)+"px");
//         $(id).height((formHeight-10)+"px");
//         console.log(width1);
//         console.log(width2);
//         console.log(height1);
//     }
// }
//
// updateChartSize("#single_coupon",(width+10),(height+10));

$(function(){

    var dataArray=
    {
        "throw_in":
        {
            "text":"单一卡券投放分析",
            "time":['01-01','01-08','01-15','01-22','01-29','02-05','02-12','02-19','02-26','03-05','03-12','03-19','03-26'],
            "throw_in_number":{"color":"#fff","data":[70, 69, 95, 145, 182, 215, 292,200,300,400,90,120]},
            "browser_number":{"color":"#0000ff","data":[20, 80, 57, 113, 170, 220, 248,312,109,130,230,90]},
            "get_number":{"color":"#000","data":[90, 60, 35, 84, 135, 170, 186,99,140,290,109,77]},
            "verification_number":{"color":"#FF0000","data":[39, 42, 57, 85, 119, 152, 170,309,200,80,340,50]}
        },
        "provide":
        {
            "text":"单一卡券发放分析",
            "colors":['#009900', '#66ff66', '#3366ff'],
            "data":[
                ['已领取卡券数',   45.0],
                ['已领核销券数',       26.8],
                ['剩余库存',  10.0]
            ]
        }
    };
    console.info(dataArray);
    var throw_in_array=dataArray.throw_in;
    var provide_array=dataArray.provide;

    $("#single_coupon_throw_in_analysis").highcharts({
        chart: {
            backgroundColor:'#660099',
            borderRadius:5,
            height:height2,
            width:width2,
            marginLeft:50,
            marginTop:50
        },
        scrollbar: {
            enabled: true
        },
        credits:{
            enabled:false // 禁用版权信息
        },
        title: {
            text: throw_in_array.text,
            align:'left',
            x:10,
            y:15,
            style:{
                color:"#fff",
                fontFamily: '微软雅黑',
                fontSize: 16*size,
                fontWeight:'bold'
            }
        },
        xAxis: {
            categories: throw_in_array.time,
            labels:{
                style:{
                    color:"#fff",
                    fontSize:12*size
                }
            },
            min:0,
            max:10
        },
        yAxis: {
            title: {
                text: ''
            },
            labels:{
                style:{
                    color:"#fff",
                    fontSize:12*size
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
            itemStyle:{
                color:'#fff'
            }
        },
        series: [{
            name: '投放总数',
            color:throw_in_array.throw_in_number.color,
            data: throw_in_array.throw_in_number.data
        }, {
            name: '浏览人数',
            color:throw_in_array.browser_number.color,
            data: throw_in_array.browser_number.data
        }, {
            name: '领取人数',
            color:throw_in_array.get_number.color,
            data: throw_in_array.get_number.data
        }, {
            name: '核销人数',
            color:throw_in_array.verification_number.color,
            data: throw_in_array.verification_number.data
        }]
    });

    $("#single_coupon_provide_analysis").highcharts({
        chart: {
            height:height1,
            width:width1,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            borderColor: '#00ccff',
            borderWidth: 2,
            borderRadius: 10
        },
        colors: provide_array.colors,
        credits:{
            enabled:false
        },
        title: {
            text: provide_array.text,
            align:'left',
            x:10,
            y:15,
            style:{
                color:"#000",
                fontFamily: '微软雅黑',
                fontSize: 16*size,
                fontWeight:'bold'
            }
        },
        legend:{
            itemDistance:80
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
                    style:{
                        'fontSize':12*size
                    }
                },
                showInLegend: true

            }
        },
        series: [{
            type: 'pie',
            innerSize:'50%',
            size:'80%',
            x:20,
            name: '比例',
            data: provide_array.data
        }]
    });

});