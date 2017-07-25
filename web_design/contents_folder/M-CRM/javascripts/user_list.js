/**
 * Created by Administrator on 2016/5/30.
 */

$(function(){

    //------------------------动态添加会员卡等级下拉菜单-------------------------
    var member_card_level=[["1","VIP卡"],["2","VIP金卡"],["3","VIP白金卡"]];
    for(var i=0;i<member_card_level.length;i++){
        var li=$("<li><a href='#'>"+member_card_level[i][1]+"</a></li>");
        li.find("a").attr("data-id",member_card_level[i][0]);
        $(".member_card_level_choose").find(".dropdown-menu").append(li);
    }
    //------------------------动态添加会员卡等级下拉菜单-------------------------

    //------------------------下拉菜单选择改变文字-------------------------
    $(".dropdown-menu li").delegate("a","click",function(){
        var text=$(this).text();
        var par=$(this).parents(".dropdown");
        par.find(".inner_text").text(text);
        par.attr("data-id",$(this).attr("data-id"));
    });
    //------------------------下拉菜单选择改变文字-------------------------

    //------------------------点击确认按钮返回选择信息-------------------------
    $(".nav_bottom").delegate(".btn_confirm","click",function(){
        var sex_id=$(".sex_choose").attr("data-id");   //性别选择：未选择0，男1，女2，未知性别3
        var identify_id=$(".identify_choose").attr("data-id");   //身份选择：未选择0，微信1，电子会员2，CRM会员3
        var member_id=$(".member_card_level_choose").attr("data-id");  //会员卡等级选择：未选择0，VIP卡1，VIP金卡2，VIP白金卡3
        console.log("性别："+sex_id);
        console.log("身份："+identify_id);
        console.log("会员卡等级："+member_id);
    });
    //------------------------点击确认按钮返回选择信息-------------------------

    //------------------------点击全部恢复默认选择-------------------------------
    $(".nav_bottom").delegate(".btn_all","click",function(){
        $(".sex_choose").attr("data-id","0").find(".inner_text").text("性别");
        $(".identify_choose").attr("data-id","0").find(".inner_text").text("身份");
        $(".member_card_level_choose").attr("data-id","0").find(".inner_text").text("会员卡等级");
    });
    //------------------------点击全部恢复默认选择-------------------------------

    //------------------------点击搜索-------------------------------
    $(".navbar-right").delegate(".btn_search","click",function(){
        var par=$(this).parents(".navbar-right");
        var searh_text=par.find(".search_input").val();
        var choose=par.find(".dropdown").attr("data-id");
        console.log(searh_text);                //搜索框输入内容
        console.log(choose);           //搜索类型选择：默认手机号1，CRM卡号2
    });
    //------------------------点击搜索-------------------------------

    //--------------------会员数据详情--------------------------
    var VIP_message=["刘一","27","1989/02/01","男","1111111111111","2015/01/01","13161635704","123456789","meezao2015@163.com","10020","北京市海淀区西土城路10号"];
    var wx_message=["liuyi89","北京海淀区","2012/02/01","男","僵尸粉丝"];
    var wx_ele_message=["liuyi89","北京海淀区","2012/02/01","男","僵尸粉丝","1111111111","刘大仙","男","100080","北京市朝阳区"];


    //var VIP_message_json={
    //    name:"刘一",
    //    id_card:'131102199309023614',
    //    open_date:"2015-01-01",
    //    phone_number:"13161635704",
    //    card_number:"123456789",
    //    email:"meezao2015@163.com",
    //    postcode:"100876",
    //    address:"北京市海淀区西土城路10号"
    //};
    //
    //var wx_message_json={
    //    nickname:"liuyi89",
    //    address:"北京海淀区",
    //    concern_time:"2012-02-01",
    //    sex:"男",
    //    fan_status:"僵尸粉丝"
    //};
    //
    //var wx_ele_message_json ={
    //    nickname:"liuyi89",
    //    address:"北京海淀区",
    //    concern_time:"2012-02-01",
    //    sex:"男",
    //    fan_status:"僵尸粉丝",
    //    card_number:"11103285",
    //    card_name:"刘大仙",
    //    card_sex:"男",
    //    card_postcode:"100080",
    //    usual_address:"北京市朝阳区"
    //};


    $(".list_nav").delegate(".list_nav_li","click",function(){
        var VIP=$(this).find(".list_nav_category").find("p");
        var VIP_length=VIP.length;
        console.log(VIP_length);
        if(VIP_length>0){
            if(VIP.hasClass("unvalidated")){
                $(".list_title_unvalidate").show();
                $(".list_title_validate").hide();

            }else{
                $(".list_title_unvalidate").hide();
                $(".list_title_validate").show();
            }
            var crm_bac_mess=$(".crm_bac_mess");
            if(VIP_message[3]=="男")
            {
                crm_bac_mess.find(".cus_bac_mess_p>img").eq(0).attr("src","images/man_head.png");
            }else if(VIP_message[3]=="女"){
                crm_bac_mess.find(".cus_bac_mess_p>img").eq(0).attr("src","images/woman_head.png");
            }else{
                crm_bac_mess.find(".cus_bac_mess_p>img").eq(0).attr("src","images/unknow.png");
            }
            $.getJSON("User_message.json",function(data){
                $.each(data.VIP_message,function(i,item){
                    var className=item.name;
                    $("."+className).text(item.value);
                });
            });
            $(".crm_bac_mess").find(".fold_border").show();
            $(".crm_bac_mess").find(".no_data_img").hide();

        }else{
            $(".crm_bac_mess").find(".no_data_img").show();
            $(".crm_bac_mess").find(".fold_border").hide();
        }

        //微信用户
        if($(this).find(".list_nav_category").find("img").hasClass("wx_cus")){
            //电子会员
            if($(this).find(".list_nav_category").find("img").hasClass("ele_cus")){
                $.getJSON("User_message.json",function(data){
                    $.each(data.wx_ele_message,function(i,item){
                        var className=item.name;
                        $(".wx_bac_mess").find("."+className).text(item.value);
                    })
                });
                $(".wx_bac_mess").find(".fold_border").show();
                $(".wx_bac_mess").find(".cus_bac_mess_li").eq(2).css("display","inline-block");
                $(".wx_bac_mess").find(".no_data_img").hide();
            }
            else{
                $.getJSON("User_message.json",function(data){
                    $.each(data.wx_message,function(i,item){
                        var className=item.name;
                        $(".wx_bac_mess").find("."+className).text(item.value);
                    });
                });
                $(".wx_bac_mess").find(".fold_border").show();
                $(".wx_bac_mess").find(".cus_bac_mess_li").eq(2).hide();
                $(".wx_bac_mess").find(".no_data_img").hide();
            }
        }else{
            $(".wx_bac_mess").find(".fold_border").hide();
            $(".wx_bac_mess").find(".no_data_img").show();
        }
    });

    $(".list_nav_li").eq(0).trigger("click");

    //-----------------------------散点图时间选择下拉菜单------------------------
    function initialTime(){
        var myDate = new Date();
        var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        var date1=year+"-"+month;
        var date2;
        var last_year;
        var last_month=month-1;
        if(last_month<=0){
            last_month+=12;
            last_year=year-1;
            date2=last_year+"-"+last_month;
        }else{
            date2=year+"-"+last_month;
        }
        var last_last_month=month-2;
        var date3;
        if(last_month<=0){
            last_last_month+=12;
            last_year=year-1;
            date3=last_year+"-"+last_last_month;
        }else{
            date3=year+"-"+last_last_month;
        }
        $(".time_choose").find(".inner_text").text(date1);
        $(".time_choose").find("a").eq(0).text(date1);
        $(".time_choose").find("a").eq(1).text(date2);
        $(".time_choose").find("a").eq(2).text(date3);
    };
    initialTime();
    //-----------------------------散点图时间选择下拉菜单------------------------

    //-----------------------------下拉菜单选择--------------------------------------
    $(".time_choose,.behavior_choose").delegate(".dropdown-menu a","click",function(){
        var data_id=$(this).attr("data-id");
        var text=$(this).text();
        var par=$(this).parents(".time_choose");
        par.find(".inner_text").text(text);
        par.attr("data-id",data_id);
        console.log(par.attr("data-id"));
    });
    //-----------------------------下拉菜单选择--------------------------------------

    //-----------------------------散点图的显示与隐藏--------------------------------------
    $(".action_list_title").delegate(".fa_right","click",function(){
        if($("#main").css("display")=="none"){
            $("#main").show();
        }else{
            $("#main").hide();
        }
    });
    //-----------------------------散点图的显示与隐藏--------------------------------------

    //-----------------------------散点图------------------------
    var myChart = echarts.init(document.getElementById('main'));

    $.getJSON("life_expectancy.json", function (data) {
        var itemStyle = {
            normal: {
                opacity: 1,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0)'
            }
        };

        var sizeFunction = function (x) {
            var y = Math.sqrt(x / 5e8) + 0.1;
            return y * 40;
        };
        // Schema:

        var schema = [
            {name: 'month', index: 0, text: '日期', unit: '号'},
            {name: 'hour', index: 1, text: '时', unit: '时'},
            {name: 'second', index: 2, text: '分', unit: '分'},
            {name: 'behavior', index: 3, text: '行为', unit: ''}
        ];

        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 3000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#222'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#000'
                            }
                        }
                    },
                    symbol: 'none',
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        color: '#bbb',
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },
                    data: []
                },
                backgroundColor: '#fff',
                title: {
                    'text': data.timeline[0],
                    textAlign: 'center',
                    left: '63%',
                    top: '55%',
                    textStyle: {
                        fontSize: 100,
                        color: '#ececec'
                    }
                },
                tooltip: {
                    padding: 5,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[0].text + '：' + value[4] + schema[0].unit + '<br>'
                            + schema[1].text + '：' + value[0] + schema[1].unit + '<br>'
                            + schema[2].text + '：' + value[1] + '<br>';
                    }
                },
                grid: {
                    left: '6%',
                    right: '80'
                },
                xAxis: {
                    type: 'value',
                    name: 'hour',
                    max: 24,
                    min: 1,
                    interval:1,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#111'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#111'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#111'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'min',
                    max: 60,
                    min:0,
                    nameTextStyle: {
                        color: '#111',
                        fontSize: 18
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#111'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#111'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#111'
                        }
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.behaviors,
                        calculable: true,
                        precision: 0.1,
                        textGap: 30,
                        textStyle: {
                            color: '#ccc'
                        },
                        inRange: {
                            color: ['#cd5f7f', '#c200e5', '#f6a828', '#00b6f6', '#00a81c', '#b3d465', '#ce8483', '#5ec390', '#c7254e', '#e4c652','#2b669a','#FF0000','#00FF00']
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function(val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };

        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    'text': data.timeline[n] + '',
                    textStyle: {
                        fontSize: 100,
                        color: 'rgba(150,150,150,0.5)'
                    }
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function(val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }
        myChart.setOption(option);

    });

});
