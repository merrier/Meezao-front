/**
 * Created by claire666 on 2017/4/20.
 */
$(document).ready(function(){
	$('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},500);
	});
});
// function showDiv(classname) {
// 	document.getElementById('popWindow').style.display = 'block';
// 	document.getElementById(classname).style.display = 'block';
// }

$(".answer-skillbar").delegate(".btn_graph1","click",function(){
	var parent=$(this).parents(".answer_bar");
	var question=parent.prev(".question").children("span").eq(0).text();
	var answer=$(this).prevAll(".skillbar").eq(0).find("span").eq(0).text();
	console.log(question,answer);
	var layer=$("#maskLayer");
	layer.find(".mask-question span").eq(0).text(question);
	layer.find(".mask-skillbar-title span").eq(0).text(answer);
	layer.show();
	$("#popWindow").show();
});

function closeDiv() {
	document.getElementById('popWindow').style.display = 'none';
	document.getElementById('maskLayer').style.display = 'none';
	document.getElementById('maskLayer2').style.display = 'none';
}

$(".content_mb_subject").delegate(".btn_graph2","click",function(){
	var parent=$(this).parents(".answer_bar");
	var question=parent.prev(".question").children("span").eq(0).text();
	var answer=$(this).prevAll(".skillbar").eq(0).find("span").eq(0).text();
	console.log(question,answer);
	var layer=$("#maskLayer2");
	var button=$(this).text();
	if(button.indexOf("属性")!== -1){
		layer.find(".mask-question").show();
		layer.find(".mask-skillbar-title").show();
		layer.find(".mask-question span").eq(0).text(question);
		layer.find(".mask-skillbar-title span").eq(0).text(answer);
	}else{
		layer.find(".mask-question").hide();
		layer.find(".mask-skillbar-title").hide();
	}
	
	layer.show();
	$("#popWindow").show();
});


// echarts柱状图
// 基于准备好的dom，初始化echarts实例
$(function () {

	//-----------------------ajax拉取柱图数据---------------------
	function ajaxBarGet() {
		var barget = [];
		$.ajax({
			dataType: "json",
			url: "",
			type: "GET",
			async: false,
			error: function (data) {
				data = [{
					//-----------------------图表1---------------------
					// 城区
					city: ['东城区','丰台区','朝阳区','海淀区','西城区'],
					// 数组1是男性
					male:[750, 100, 100,20,20],
					// 数组2是女性
					female:[200, 300, 100,10,30],
					// 数组3是最小年龄
					minAge:[20, 15, 25,15,15],
					// 数组4是年龄差值=最大年龄-最小年龄
					dataAge:[20, 15, 25,20,20],
					//-----------------------图表2---------------------
					// 蒙版2的x轴
					xTag:['性别','城区','问题1','问题2','问题3','问题4','问题5'],
					// 问题加循环
					// question1:['答案1','答案2','答案3'],
					question2:['答案1','答案2','答案3','答案4','答案5','答案6'],
					// 答案加循环
					// 所有答案1(性别为男，城区依次排列）
					answer1:[2496, 535, 611,615,633,633,633],
					// 所有答案2(性别为女，城区依次排列）
					answer2:[0, 489, 621,630,647,590,641],
					// 所有答案3
					answer3:[0, 470, 632,606,609,638,594],
					// 所有答案4
					answer4:[0, 534, 432,245,607,635,628],
					// 所有答案5
					answer5:[0, 468, 100, 400, 0, 0, 0, 0],
					answer6:[0, 0, 100, 0, 0, 0, 0, 0]
				}];
				barget = data;
				console.info(data);
			},
			done: function (data) {
				console.log("拉取数据失败!")
			},
			always: function () {

			},
			complete: function () {
			}
		});
		return barget;
	}
	var dataBarArray = ajaxBarGet();

	//------------------------图表1--------------------
var myChart = echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据
var option = {
	tooltip : {
		trigger: 'axis',
		// 提示框设置
		formatter: function (params){
			return params[0].name + '<br/>'
				+ params[0].seriesName + ' : ' + params[0].value + '<br/>'
				+ params[1].seriesName + ' : ' + params[1].value + '<br/>'
				+ params[3].seriesName + ' : ' + params[2].value + ' - '+ (params[2].value + params[3].value);
		}
	},
	legend: {
		data:['男性','女性','年龄'],
		align: 'left',
		right: 10,
		textStyle: {
			color: "#fff"
		}
	},
	grid: {
		left: '0%',
		right: '0%',
		bottom: '10%',
		containLabel: true
	},
	yAxis : [
		{
			type: 'value',
			name: '人数',
			position: 'left',
			axisTick : {show: false},
			splitLine:{show: false},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#ffffff'
				},
			}
		},
		{
			type: 'value',
			name: '年龄',
			min: 0,
			max: 100,
			position: 'right',
			axisTick : {show: false},
			splitLine:{show: false},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#ffffff'
				},
			},
		},
	],
	xAxis : [
		{
			name: '城区',
			nameLocation:'middle',
			nameGap:40,
			'type' : 'category',
			ayisTick : {show: false},
			splitLine:{show: false},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			// x轴标签设置
			'axisLabel':{
				'interval':0,
				'textStyle': {
					color: '#ffffff',
					fontSize:10
				}
			},
			'data' : dataBarArray[0].city
		}
	],
	series : [
		{
			name:'男性',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '性别',
			yAxis: 1,
			data:dataBarArray[0].male
		},
		{
			name:'女性',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '性别',
			yAxis: 1,
			data:dataBarArray[0].female
		},
		{
			name:'最小年龄',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '年龄',
			yAxisIndex: 1,
			data:dataBarArray[0].minAge
		},
		{
			name:'年龄',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '年龄',
			yAxisIndex: 1,
			data:dataBarArray[0].dataAge
		}
	]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

	//------------------------图表2--------------------
var myChart2 = echarts.init(document.getElementById('main2'));
// 指定图表的配置项和数据
var option2 = {
	tooltip : {
		trigger: 'axis',
		// 提示框设置
		formatter: function (params){
			if(params[0].name=='性别') {
				return params[0].name + '<br/>'
					+ ' 男: ' + params[0].value + '<br/>'
					+ ' 女: ' + params[1].value + '<br/>';
			}
			else if(params[0].name=='城区') {
				// i=城市个数
				var dataCity=dataBarArray[0].city
				a='';
				for (var i=0;i<dataCity.length;i++) {
					var a = a + dataCity[i] +  ' : ' + params[i].value + '<br/>';
				}
				return b = params[0].name + '<br/>' + a;
			}
			// 问题加循环
			else {
				var index=params[0].dataIndex-1;
				var dataQuestion=dataBarArray[0]["answer"+index];
				var dataName=dataBarArray[0].question2;
				var result="";
				for(var i=0;i<dataName.length;i++){
					if(dataBarArray[0]["answer"+(i+1)][index+1] === 0){
						result+="";
					}else{
						result += dataName[i]+" : "+dataBarArray[0]["answer"+(i+1)][index+1]+"<br/>";
					}					
				}
				console.log(result);
				return params[0].name + '<br/>' + result;
			}
		}
	},

	grid: {
		left: '0%',
		right: '0%',
		bottom: '10%',
		containLabel: true
	},
	yAxis : [
		{
			type: 'value',
			name: '人数',
			position: 'left',
			axisTick : {show: false},
			splitLine:{show: false},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#ffffff'
				},
			}
		},
	],
	xAxis : [
		{
			'type' : 'category',
			ayisTick : {show: false},
			splitLine:{show: false},
			axisLine: {
				lineStyle: {
					color: '#eee'
				}
			},
			// x轴标签设置
			'axisLabel':{
				'interval':0,
				'textStyle': {
					color: '#ffffff',
					fontSize:10
				}
			},
			'data' : dataBarArray[0].xTag
		}
	],
	// 看最多有几个答案（城区多少个，或自设问题的答案有多少个），一开始就预设好x轴标签，每个柱子都一样高（例子最多答案的是问题2，有5个答案）
	// data的第一个值为性别（2个），第二个值为城区（例子为4个）
	// 答案从1开始按序排列
	series : [
		{
			name:'答案1',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '同一柱子',
			yAxis: 1,
			data:dataBarArray[0].answer1
		},
		{
			name:'答案2',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '同一柱子',
			yAxis: 1,
			data:dataBarArray[0].answer2
		},
		{
			name:'答案3',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '同一柱子',
			yAxis: 1,
			data:dataBarArray[0].answer3
		},
		{
			name:'答案4',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '同一柱子',
			yAxis: 1,
			data:dataBarArray[0].answer4
		},

		{
			name:'答案5',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '同一柱子',
			yAxis: 1,
			data:dataBarArray[0].answer5
		},
		{
			name:'答案6',
			type:'bar',
			barWidth : 10,
			barMaxWidth:10,
			stack: '同一柱子',
			yAxis: 1,
			data:dataBarArray[0].answer6
		}
	]
};
// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);
});