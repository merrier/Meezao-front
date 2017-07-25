/**
 * Created by claire666 on 2017/4/25.
 */

//---------------------测试开始---------------------
// $(function () {
//     var cities=[{city_id:"1",city:"朝阳区"},{city_id:"2",city:"海淀区"},{city_id:"3",city:"西城区"}];
//     var questions=[{que_id:"1",que_form:"2",question:"sssssss"},{que_id:"2",que_form:"1",question:"sssssss"},{que_id:"3",que_form:"2",question:"sssssss"}];
//     var answers=[[{que_id:"1",content:"2222"},{que_id:"1",content:"22222222"},{que_id:"1",content:"2222222222222"}],[{que_id:"2",content:"2222"},
//         {que_id:"2",content:"22222222"},{que_id:"2",content:"2222222222222"}],[{que_id:"2",content:"2222"},{que_id:"2",content:"22222222"},{que_id:"2",content:"2222222222222"}]]
//     $.each(cities,function (index,item) {
//         $(".district").append("<option value='1'>" +item.city+ "</option>")
//     });
//     // 回填问题
//     $.each(questions,function (index,item) {
//         if(item.que_form=='single'){
//             var singleOrMultipal="单选";
//         }else if(item.que_form=='multiple'){
//             singleOrMultipal="多选"
//         }
//         var number=parseInt(item.que_id)+3;
//         $(".question").append("<div class='question_block' data-role='controlgroup'><p class='question_own'>" +
//             "问题<span>"+number+"</span></p><div class='question_content'>"+item.question+"</div><div class='answer'></div>")
//     })
//     // 回填答案
//     $.each(answers, function (index, item) {
//
//         $.each(item, function (id, element) {
//             var answer_type=questions[parseInt(element.que_id)-1].que_form;
//             if (answer_type== 1) {
//                 $(".question_block:eq(" + index + ") .answer").append("<label><input name= '" + index + "' type='radio' value='' class='answer'>" + element.content + "</label>")
//             }
//             else if(answer_type == 2){
//                 $(".question_block:eq(" + index + ") .answer").append("<label><input type='checkbox' value='' class='answer'>" + element.content + "</label>")
//             }
//         })
//     })
// })
//---------------------测试结束---------------------

//---------------------回填开始---------------------
window.onload = $(function () {
    (function () {
        $.ajax({
            url: "",
            data: {
            },
            type: "get",
            dataType: "json",
            success: function (data) {
                alert("success")
                var cities = data.cities; //城区
                var questions = data.questions;//问题
                var answers = data.answers;// 答案
                // 回填城区
                $.each(cities, function (index, item) {
                    $(".district").append("<option value='1'>" + item.city + "</option>")
                });
                // 回填问题
                $.each(questions, function (index, item) {
                    if (item.que_form == 'single') {
                        var singleOrMultipal = "单选";
                    } else if (item.que_form == 'multiple') {
                        singleOrMultipal = "多选"
                    }
                    var number = parseInt(item.que_id) ;
                    $(".question").append(" <p class='question_type'>.("+singleOrMultipal+"）</p><div class='question_block' data-role='controlgroup'><p class='question_own'>" +
                        "问题<span>" + number + "</span></p><div class='question_content'>" + item.question + "</div><div class='answer'></div>")
                })
                // 回填答案
                $.each(answers, function (index, item) {
                    $.each(item, function (id, element) {
                        var answer_type=questions[parseInt(element.que_id)-1].que_form;
                        if (answer_type== 'single') {
                            $(".question_block:eq(" + index + ") .answer").append("<label><input name= '" + index + "' type='radio' value='' class='answer'>" + element.content + "</label>")
                        }
                        else if(answer_type == "multiple"){
                            $(".question_block:eq(" + index + ") .answer").append("<label><input type='checkbox' value='' class='answer'>" + element.content + "</label>")
                        }
                    })
                })
            }
        })
    })();
})

//---------------------回填结束---------------------


$(document).ready(function () {
    $(".btn_submit").click(function () {
        //---------------------表单验证开始---------------------

            // 提交时对未回答的问题进行定位
            var age = $("#elec_age").val();
            // var gender_input = $('.switch').bootstrapSwitch('state');
           // var gender_ori = $('input[name="g_title"]').val();
           //  console.log(gender_ori)


            var city_input= $(".district option:selected").val();
            var status=true;// each的判断
            // 年龄提交有错时定位
            if (isNaN(age) || age < 0 || age > 100 || !(/^\d+$/.test(age))) {
                $("#elec_age").focus();
                $(".error_tips").show();
            return false;
            }
            // 性别未填时定位
            // if (gender_input == 0) {
            //     // console.log(vv)
            //     $(".gender").focus();
            //     return false;
            // }
            // 城市未填时定位
            if (city_input == 0) {
                // console.log(vvv)
                $(".district").focus();
                return false;
            }
            // 自设问题未答时的定位
            $(".question_block").each(function (index, item) {
                var answer_input = $(item).find("input:checked");
                // console.log(input)
                if (answer_input.length == 0) {
                    $(this).find("input").focus();
                    status=false;
                    return false;
                }
            })
            if (status==false){
                return false;
            }
        //---------------------表单验证结束---------------------

        //---------------------点击提交，传数据------------------
        var age = $("#elec_age").val(); //获取年龄
        var gender_ori = $('input[name="g_title"]').val();
        console.log(gender_ori)
        var gender;
        var city = $('.district option:selected').text();//获取城区名称
        var ans_id = [];
        //获取性别
        if (gender_ori == 1||gender_ori=='') {
            gender = 1;
        } else if(gender_ori == 0){
            gender = 2;
        }
        console.log(age)
        console.log(gender)
        console.log(city)
        //获取问题序号和答案
        var answers = [];
        $(".question_block").each(function (index, item) {
            var answer = [];
            $(this).find("input:checked").each(function (id, element) {
                var content = $(this).parents("label").text();
                ans_id[id] = $(this).parents("label").index();
                answer[id] = {"inner_id": ans_id[id], "content": content}
                console.log(answer);
            });
            answers.push(answer);

        });
        console.log(answers);
        $.ajax({
            url: "",
            data: {},
            type: "post",
            dataType: "json",
            success: function (data) {
                alert("success")
            }
        });
        //---------------------数据传输结束------------------
    });
    $("#elec_age").keyup(function () {
        $(".error_tips").hide();
    });
});


    //---------------------点击提交，传数据---------------------
    //     $(".btn_submit").click(function () {
    //         var age=$("#elec_age").val(); //获取年龄
    //         var gender_ori=$('.gender option:selected').text();
    //         var gender;
    //         var city=$('.district option:selected').text();//获取城区名称
    //         var answers=[];
    //         var ans_content=[];
    //         var ans_id=[];
    //         //获取性别
    //         if (gender_ori=='男'){
    //             gender=1;
    //         }else if(gender_ori=='女'){
    //             gender=2;
    //         }
    //         console.log(age)
    //         console.log(gender)
    //         console.log(city)
    //         //获取问题序号和答案
    //         var answers=[];
    //         $(".question_block").each(function (index,item) {
    //             var answer=[];
    //             $(this).find("input:checked").each(function (id,element) {
    //                 var content=$(this).parents("label").text();
    //                 ans_id[id]=$(this).parents("label").index();
    //                 answer[id]={"inner_id":ans_id[id],"content":content}
    //                 console.log(answer)
    //             })
    //             answers.push(answer);
    //
    //         })
    //         console.log(answers)
    //             $.ajax({
    //                 url:"",
    //                 data:{
    //                 },
    //                 type:"post",
    //                 dataType:"json",
    //                 success:function (data) {
    //                     alert("success")
    //                 }
    //             })
    //         })
        //---------------------数据传输结束---------------------
// 选中答案后变黑色
//         $(".question_block input").click(function () {
//                 $(this).parents("label").css("color", "black")
//                 $(this).parents("label").siblings("label").css("color", "gray")
//         })
//         function chaCloor(field){
//                 var pig = field.checked;
//                 pig ? field.nextSibling.style.color = "skyblue" : field.nextSibling.style.color = "white";
//         }


// 初始化Bootstrap Switch插件
$("[name='my-checkbox']").bootstrapSwitch();
// 性别按钮
$(".bootstrap-switch-handle-on").text("男")
$(".bootstrap-switch-handle-off").text("女")
$(".bootstrap-switch-handle-on").css("background","#00b6f6")
$(".bootstrap-switch-handle-off").css("background","#00b6f6")
$(".bootstrap-switch-handle-off").css("color","#fff")
// 性别按钮颜色

// 单选答案样式及选中后的样式
$(".question_block input[type=radio]").click(function () {
    $(this).parents("label").css("color","white")
    $(this).parents("label").siblings("label").css("color","gray")
    $(this).parents("label").css("background","#00b6f6")
    $(this).parents("label").siblings("label").css("background","#fff")
})
// 多选答案样式及选中后的样式
$(".question_block input[type=checkbox]").click(function () {
    var choice= $(this).is(":checked");
    choice?$(this).parents("label").css("color","white"):$(this).parents("label").css("color","gray");
    choice?$(this).parents("label").css("background","#00b6f6"):$(this).parents("label").css("background","white");
})

function gcheck(a){
    var a;
    var $aa = $("#"+a);
    // console.log($aa.is(":checked"));
    if($aa.is(":checked")){
        $("."+a).val("1");
    }else{

        $("."+a).val("0");
    }
}