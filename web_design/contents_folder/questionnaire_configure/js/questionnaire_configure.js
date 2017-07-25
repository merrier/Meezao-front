/**
 * Created by yuejd on 2017/4/10.
 */
window.onload = $(function () {
    (function(){
        // $.ajax({
        //     url:"",
        //     data:{
        //         "activity":act_info_id,
        //         "cities":cities,
        //         "questions":questions,
        //         "answers":answers,
        //         "awards":awards
        //
        //     },
        //     type:"get",
        //     dataType:"json",
        //     success:function (data) {
        //         alert("success")
        //     }
        // })

        $.getJSON("get_data.json",function(result){
            var cities=result.cities; //城区
            var questions=result.questions;//问题
            var answers=result.answers;// 答案
            var awards=result.awards;//奖励
            var activity=result.activity;
            // 回填城区

            $(".activity_info_id").html(activity);
            $.each(cities,function (index,item) {
                $(".city_content").append("<li><div class='displayPart' displayLength='5'>" +item.city+ "</div><span>&times;</span></li>")

            });
            // 回填问题
            $.each(questions,function (index,item) {
                if(item.que_form==1){
                    var singleOrMultipal="单选";
                }else if(item.que_form==2){
                    singleOrMultipal="多选"
                }
                $(".question_content").append("<table class='table table-bordered'><thead><tr> <th>Q<span>"+item.que_id+"</span></th><th><span>" +item.question+"" +
                    "</span><span>【"+singleOrMultipal+"】</span></th> <th> <div class='btn-group'> <div class='btn btn-default btn_creat_answer'>创建答案</div> " +
                    "<div class='btn btn-default btn_edit_question'>编辑</div> <div class='btn btn-default btn_delete_question'>删除</div> </div> </th> </tr> </thead><tbody></tbody></table>")

            })
            // 回填答案
            $.each(answers,function (index,item) {
                var id=item.que_id - 1;
                $(".question_content table:eq("+ id +") tbody").append("<tr> <td><input type='radio'> </td> <td>"+ item.content +"</td> <td> <div class='btn btn-group'>" +
                    "<div class='btn btn-default btn_edit_answer'>编辑</div> <div class='btn btn-default btn_delete_answer'>删除</div></div></td> </tr>")

            })
            // 回填奖励文字
            $(".crear_txt").val(awards.award_name);


        })
    })();


    //点击创建城区开始
    //点击创建城区btn

    // $(".creat_city").click(function () {
    //     var li=$(".city_content li");
    //     if (li.length <= 15){
    //         $("#modal-city").modal("show");
    //     }else {
    //         $(".creat_city").addClass("set_grey")
    //     }
    // });
    //
    // //点击创建城区中的确定创建
    // $(".creat_city_box .city_submit").click(function () {
    //     var cityname= $(".creat_city_box input").val();
    //     if (cityname==""||cityname==null){
    //         $(".error_tips").show();
    //         $(".creat_city_box input").focus();
    //     }
    //     else {
    //         $(".city_content").append("<li><div class='displayPart' displayLength='5'>" +cityname+ "</div><span>&times;</span></li>")
    //         $("#modal-city").modal("hide");
    //     }
    //
    // });
    // //点击删除单个已创建的城市
    // $("body .city_content").delegate("li span","click",function () {
    //     var li = $(this).parents("li")
    //     li.remove();
    //     //如果按钮变灰，删除一个变蓝
    //     $(".creat_city").removeClass("set_grey")
    // });
    // //点击创建城市结束
    //创建问题btn定位
    $(window).scroll(function () {
        var $btn =$(".creat_question_btn");
        var h = 261;
        var s =$(this).scrollTop();
        if(s>=h){
            $btn.addClass("fix");
        }else{
            $btn.removeClass("fix");
        }
    });




    //点击创建问题开始
    $(".creat_question_btn").click(function () {
        $("#modal-question").modal("show").find("input[type='text']").val("");
    });
    //点击确认创建问题
    $(".creat_question_box .question_submit").click(function () {
        var table_num= $(".question_content table").length;
        var input_order=$(".creat_question_box .input_sort_num").val();
        var table_order=input_order-2;
        var q_content=$(".creat_question_box .input_question").val();
        var singleOrMultipal= $(".creat_question_box .radio input:radio:checked").val();
        var must = $(".must").is(":checked");
        var star;
        if (must == true){
            star = "*" ;
        }else if(must == false){
            star = "";
        }
        if (q_content==""||q_content==null){
            $(".error_tips").show();
            $(".creat_question_box input").focus();
        }else {
            if(input_order<=table_num+1 && input_order>0){

                if(input_order==1){
                    var $que_von = $(".question_content");
                    if(singleOrMultipal=="多选" || singleOrMultipal=="单选"){
                        var i = createAnswer("single",input_order,q_content,singleOrMultipal,star);
                        $que_von.prepend(i);
                    }else if(singleOrMultipal=="填空"){
                        i = createAnswer("txt",input_order,q_content,singleOrMultipal,star);
                        $que_von.prepend(i);
                    }else if(singleOrMultipal=="矩阵单选题"){
                        i = createAnswer("box",input_order,q_content,singleOrMultipal,star);
                        $que_von.prepend(i);
                    }else if(singleOrMultipal=="矩阵量表题"){
                        i = createAnswer("rank",input_order,q_content,singleOrMultipal,star);
                        $que_von.prepend(i);
                    }else if(singleOrMultipal=="段落说明"){
                        i=createAnswer("explain",input_order,q_content,singleOrMultipal,star);
                        $que_von.prepend(i);
                    }
                    sortQuestion();//问题列表重新排序
                    $("#modal-question").modal("hide");
                } else{
                    var $que_content =  $(".question_content table:eq("+table_order+")");
                    if(singleOrMultipal=="多选" || singleOrMultipal=="单选"){
                        var i = createAnswer("single",input_order,q_content,singleOrMultipal,star);
                        $que_content.after(i);

                    }else if(singleOrMultipal=="填空"){
                        i = createAnswer("txt",input_order,q_content,singleOrMultipal,star);
                        $que_content.after(i);

                    }else if(singleOrMultipal=="矩阵单选题"){
                        i = createAnswer("box",input_order,q_content,singleOrMultipal,star);
                        $que_content.after(i);

                    }else if(singleOrMultipal=="矩阵量表题"){
                        i = createAnswer("rank",input_order,q_content,singleOrMultipal,star);
                        $que_content.after(i);
                    }else if(singleOrMultipal=="段落说明"){
                        i=createAnswer("explain",input_order,q_content,singleOrMultipal,star);
                        $que_content.after(i);
                    }
                    //问题列表重新排序
                    sortQuestion();
                    $("#modal-question").modal("hide");
                }

            }else{
                $(".sort_tips").find("span:eq(0)").html(table_num);
                $(".sort_tips").find("span:eq(1)").html(table_num+1);
                $(".sort_tips").show();
                $(".input_sort_num").focus();
            }
        }
    });
    function createAnswer(option,order,content,choice,star) {
        if(option=="single"){
            var item =  "<table class='table table-bordered'><thead><tr> <th>Q<span>"+order+"</span></th><th><span>" +content+"" +
            "</span><span>【"+choice+"】</span><span style='color: red;' >"+star+"</span></th> <th> <div class='btn-group'> <div class='btn btn-default btn_creat_answer'>创建答案</div> " +
            "<div class='btn btn-default btn_edit_question'>编辑</div> <div class='btn btn-default btn_delete_question'>删除</div> </div> </th></tr></thead><tbody></tbody></table>";
        }else if(option =="txt"){
            item = "<table class='table table-bordered'><thead><tr> <th>Q<span>"+order+"</span></th><th><span>" +content+"" +
                "___________</span><span>【"+choice+"】</span><span style='color: red;'>"+star+"</span></th> <th> <div class='btn-group'> <div class='btn btn-default btn_creat_answer'>创建答案</div>" +
                "<div class='btn btn-default btn_edit_question'>编辑</div> <div class='btn btn-default btn_delete_question'>删除</div> </div> </th> </tr> </thead><tbody></tbody></table>";
        }else if(option == "box"){
            item = "<table class='table table-bordered'><thead><tr> <th>Q<span>"+order+"</span></th><th><span>" +content+"" +
                "</span><span>【"+choice+"】</span><span style='color: red;'>"+star+"</span></th> <th> <div class='btn-group'> <div class='btn btn-default btn_config_option'>配置选项</div> " +
                "<div class='btn btn-default btn_edit_question'>编辑</div> <div class='btn btn-default btn_delete_question'>删除</div> </div> </th> </tr> </thead><tbody></tbody></table>";
        }else if(option =="rank"){
            item = "<table class='table table-bordered'><thead><tr> <th>Q<span>"+order+"</span></th><th><span>" +content+"" +
                "</span><span>【"+choice+"】</span><span style='color: red;'>"+star+"</span></th> <th> <div class='btn-group'> <div class='btn btn-default btn_config_rank'>配置选项</div> " +
                "<div class='btn btn-default btn_edit_question'>编辑</div> <div class='btn btn-default btn_delete_question'>删除</div> </div> </th> </tr> </thead><tbody></tbody></table>";
        }else if(option =="explain"){
            item = "<table class='table table-bordered'><thead><tr> <th>Q<span>"+order+"</span></th><th><span>" +content+"" +
                "</span><span>【"+choice+"】</span><span style='color: red;'>"+star+"</span></th> <th> <div class='btn-group'>" +
                "<div class='btn btn-default btn_edit_question'>编辑</div> <div class='btn btn-default btn_delete_question'>删除</div> </div> </th> </tr> </thead><tbody></tbody></table>";
        }
        return item;
    }

    //点击编辑问题
    $(".question_content").delegate("table .btn_edit_question","click",function () {
        setDataId();
        var $this=$(this);
        var table=$this.parents("table");
        var data_id=table.attr("data-id");
        $("#modal-edit-question").modal("show").attr("data-id",data_id);
        var current_in=table.find("th:eq(1)").find("span:eq(0)").html();
        $(".edit_question_box .input_question").val(current_in);
        $(".edit_question_box .input_sort_num").val(table.attr("data-id"));

        });

        //点击编辑问题中的确认
    $(".edit_question_box .edit_question_submit").click(function () {
        var table_num= $(".question_content table").length;
        var input_question=$(".edit_question_box .input_question").val();
        var input_num=$(".edit_question_box .input_sort_num").val();
        var data_id=parseInt($("#modal-edit-question").attr("data-id")) - 1;
        var table=$(".question_content table:eq("+data_id+")");
        // var singleOrMultipal= $(".edit_question_box .radio input:radio:checked").val();
        if(input_num<=table_num && input_num>0){
            if(input_num==1){
                     table.find("th:eq(1)").find("span:eq(0)").html(input_question);
                     // table.find("th:eq(1)").find("span:eq(1)").html("【"+singleOrMultipal+"】");
                     var $r_table= table.remove();
                     $r_table.prependTo($(".question_content"))
                     $("#modal-edit-question").modal("hide");
                     setDataId();
                     sortQuestion();
                     return false
                }else{
                    table.find("th:eq(1)").find("span:eq(0)").html(input_question);
                    // table.find("th:eq(1)").find("span:eq(1)").html("【"+singleOrMultipal+"】");
                    var $rr_table= table.remove();
                    var input_new_num=input_num-2;
                    $rr_table.insertAfter($(".question_content table:eq("+ input_new_num +")"));
                    $("#modal-edit-question").modal("hide");
                    setDataId();
                    sortQuestion();
                    return false;
                }

            }else{
                $(".sort_tips").find("span:eq(0)").html(table_num);
                $(".sort_tips").find("span:eq(1)").html(table_num);
                $(".sort_tips").show();
                $(".input_sort_num").focus();
            }

        });
    //点击创建问题结束
    // 点击删除单条问题
    $(".question_content").delegate("table .btn_delete_question","click",function () {
        var $this=$(this);
        $("#modal-delete").modal("show");
        $("#modal-delete").find(".modal-body p").html("确认删除当前问题？")
        $(".confirm_delete_box .delete_submit").click(function () {
            $this.parents("table").remove();
            sortQuestion();
            $("#modal-delete").modal("hide");
        });
    });
    //点击创建答案
    $(".question_content").delegate("table .btn_creat_answer","click",function () {
        setDataId();
        var table=$(this).parents("table");
        var data_id=table.attr("data-id");
        $("#modal-creat-answer").modal("show").attr("data-id",data_id).find("input[type='text']").val("");
        var question=table.find("thead th:eq(1)").find("span:eq(0)").html();
        var choice=table.find("thead th:eq(1)").find("span:eq(1)").html();
        console.log(question);
        $(".creat_answer_box .creat_answer_box_question").text(question);
        $(".creat_answer_box .creat_answer_box_choice span").html(choice);
        if(choice=="【多选】"){
            $(".max_choose_box").show();
            $('.max_choose').empty().append("<option>不限</option>");
        }else {
            $(".max_choose_box").hide();
        }
        var answer = table.find("tbody").html(),state=judge();
        if(state==true){
            $(".add_other").css("color","#0096ff");
        }else{
            $(".add_other").css("color","#ccc");
        }
        if(answer ==""){
            $(".answer_content tbody").empty();
        }else{
            $(".answer_content tbody").html("");
            table.find("tbody tr").each(function (id,item) {
                var data = $(item).attr("data");
                var input_num = id+1;
                var input_anw = $(item).find("td:eq(1)").text();
                $(".max_choose").append("<option>"+(id+1)+"</option>");
                $(".answer_content tbody").append("<tr data="+data+"><td>"+input_num+"</td> <td>"+input_anw+"</td> <td> <div class='btn btn-default btn_box_delete_answer'>删除</div> </td> </tr>");
            })

        }

    });
    //结束创建答案

    //点击创建答案中的确认添加
    $(".creat_answer_box .confirm_add").click(function () {
        var input_anw=$(".creat_answer_box .input_answer").val();
        var input_num=$(".creat_answer_box .input_answer_num").val();
        var new_input_num=input_num-2;
        var tr_num=$(".creat_answer_box .answer_content tbody tr").length;
        if(input_anw=="" || input_anw==null){
            $(".creat_answer_box .answer_error_tips").show();
        }else {
            if (input_num<=tr_num+1 && input_num>0){
                if(input_num==1){
                    $(".creat_answer_box .answer_content tbody").prepend("<tr><td>1</td> <td>"+input_anw+"</td> <td> <div class='btn btn-default btn_box_delete_answer'>删除</div> </td> </tr>");
                    sortAnswer();
                }else {
                    $(".creat_answer_box .answer_content tbody tr:eq("+new_input_num+")").after("<tr> <td>1</td> <td>"+input_anw+"</td> <td> <div class='btn btn-default btn_box_delete_answer'>删除</div> </td> </tr>");
                    sortAnswer();
                }
                if($(".max_choose_box").is(":visible")){
                    $(".max_choose").append("<option>"+(tr_num+1)+"</option>");
                }


            }
            else {
                $(".creat_answer_box .sort_error_tips").find("span:eq(0)").html(tr_num);
                $(".creat_answer_box .sort_error_tips").find("span:eq(1)").html(tr_num+1);
                $(".creat_answer_box .sort_error_tips").show();
            }
        }
    });
    //结束创建答案中的确认添加
    //点击创建答案中的删除单个答案
    $(".answer_content").delegate("table tbody .btn_box_delete_answer","click",function () {
        var $tr = $(this).parents("tr");
        $tr.remove();
        sortAnswer();
        var data = $tr.attr("data");
        if(data){
            $(".add_other").css("color","#0096ff");
        }
        $(".max_choose option:last").remove();

    });
    $(".add_other").click(function () {
        var $this = $(this);
        var $tbody =  $(".creat_answer_box .answer_content tbody");
        var l = $tbody.find("tr").length;
        var state = judge();
        if (state==true){
            $tbody.append("<tr data='other'><td>"+(l+1)+"</td><td>其他___</td><td> <div class='btn btn-default btn_box_delete_answer'>删除</div></td></tr>");
            $(".max_choose").append("<option>"+(l+1)+"</option>")
            $this.css("color","#ccc");
        }
    });
    function judge() {
        var $tbody =  $(".creat_answer_box .answer_content tbody");
        var state = true;
        $tbody.find("tr").each(function (id,item) {
            var data = $(this).attr("data");
            if (data=="other"){
                state = false ;
            }
        });
        return state;
    }
    //点击确认创建答案
    $(".creat_answer_box .creat_answer_submit").click(function () {
        var data_id=$("#modal-creat-answer").attr("data-id")-1;
        var choice=  $(".creat_answer_box .creat_answer_box_choice span").html();
        var max_num = $(".max_choose option:selected").val();
        console.log(max_num);
        if(!isNaN(max_num)){
            $(".question_content table:eq("+ data_id +") thead th:eq(1) span:last").before("<i>(最多可选"+max_num+"项) &nbsp;</i>");
        }
        if(choice=="【单选】" || choice =="【填空】"){
            $(".question_content table:eq("+ data_id +") tbody").empty();
            $(".answer_content tbody tr").each(function(index,item) {
                var answer=$(item).find("td:eq(1)").html();
                var data = $(item).attr("data");
                if(data){
                    $(".question_content table:eq("+ data_id +") tbody").append("<tr data = "+data+"><td><input type='radio' name='radio'> </td> <td>"+ answer +"</td> <td> <div class='btn btn-group'>" +
                        "<div class='btn btn-default btn_edit_answer'>编辑</div> <div class='btn btn-default btn_delete_answer'>删除</div></div></td> </tr>");
                }else{
                    $(".question_content table:eq("+ data_id +") tbody").append("<tr><td><input type='radio' name='radio'> </td> <td>"+ answer +"</td> <td> <div class='btn btn-group'>" +
                        "<div class='btn btn-default btn_edit_answer'>编辑</div> <div class='btn btn-default btn_delete_answer'>删除</div></div></td> </tr>");
                }


            });
            $("#modal-creat-answer").modal("hide");
        }
        if(choice=="【多选】"){
            $(".question_content table:eq("+ data_id +") tbody").empty();
            $(".answer_content tbody tr").each(function(index,item) {
                var answer=$(item).find("td:eq(1)").html();
                var data = $(item).attr("data");
                if(data){
                    $(".question_content table:eq("+ data_id +") tbody").append("<tr data = "+data+"><td><input type='checkbox'></td> <td>"+ answer +"</td><td><div class='btn btn-group'>" +
                        "<div class='btn btn-default btn_edit_answer'>编辑</div><div class='btn btn-default btn_delete_answer'>删除</div></div></td></tr>")
                }else{
                    $(".question_content table:eq("+ data_id +") tbody").append("<tr><td><input type='checkbox'></td><td>"+ answer +"</td><td><div class='btn btn-group'>" +
                        "<div class='btn btn-default btn_edit_answer'>编辑</div><div class='btn btn-default btn_delete_answer'>删除</div></div></td></tr>")
                }


            });
            $("#modal-creat-answer").modal("hide");
        }
    });

    //点击编辑答案
     $(".question_content").delegate("table tbody .btn_edit_answer","click",function () {
         var tr=$(this).parents("tr");
         var table=$(this).parents("table");
         var cur_answer=tr.find("td:eq(1)").html();
         var table_id=table.attr("data-id");
         table.find("tbody tr").each(function (index,element) {
             $(element).attr("tr-id",index+1);
         });
         var tr_id=tr.attr("tr-id");
         console.log('答案的位置',tr_id)
         $("#modal-edit-answer").modal("show").attr({"table-id":table_id,"tr-id":tr_id});
         $(".edit_answer_box .input_answer").val(cur_answer);
         $(".edit_answer_box .input_sort_num").val(tr_id);
     });
    $(".jump_que").click(function () {
         if($(this).is(":checked")){
             $(".jump").show();
         }else {
             $('.jump').hide();
         }
    });
    //点击编辑答案中的确定
    $(".edit_answer_box .edit_answer_submit").click(function () {
        var table_id=$("#modal-edit-answer").attr("table-id") - 1;
        var table=$(".question_content table:eq("+table_id+")");
        var tr_id=$("#modal-edit-answer").attr("tr-id")-1;
        var tr=table.find("tbody tr:eq("+tr_id+")");
        var tr_num= table.find("tbody tr").length;
        var input_answer=$(".edit_answer_box .input_answer").val();
        var input_num=$(".edit_answer_box .input_sort_num").val();
        if(input_num<=tr_num && input_num>0){
            if(input_num==1){
                tr.find("td:eq(1)").html(input_answer);

                var $r_tr= tr.remove();
                $r_tr.prependTo($(table).find("tbody"));
                $("#modal-edit-answer").modal("hide");
                table.find("tbody tr").each(function (index,element) {
                    $(element).attr("tr-id",index+1);
                });
                return false
            }else{
                tr.find("td:eq(1)").html(input_answer);
                var $rr_tr= tr.remove();
                var input_new_num=input_num-2;
                $rr_tr.insertAfter($(table).find("tbody tr:eq("+input_new_num+")"));
                $("#modal-edit-answer").modal("hide");
                table.find("tbody tr").each(function (index,element) {
                    $(element).attr("tr-id",index+1);
                });
                return false;
            }

        }else{
            $(".sort_tips").find("span:eq(0)").html(tr_num);
            $(".sort_tips").find("span:eq(1)").html(tr_num);
            $(".sort_tips").show();
            $(".input_sort_num").focus();
        }
    });
    //点击答案中的删除
    $(".question_content").delegate("table tbody .btn_delete_answer","click",function (){
        var $this=$(this);
        $("#modal-delete").modal("show");
        $("#modal-delete").find(".modal-body p").html("确认删除当前答案？");
        $(".confirm_delete_box .delete_submit").click(function () {
            $this.parents("tr").remove();
            $("#modal-delete").modal("hide");
        });
    });

    //结束确认答案

    //点击配置矩阵单选题的配置选项按钮
    $(".question_content").delegate(".btn_config_option","click",function () {
        setDataId();
        var data_id = $(this).parents('table').attr("data-id");
        var table=$(this).parents("table");
        var question=table.find("thead th:eq(1)").find("span:eq(0)").html();
        var choice=table.find("thead th:eq(1)").find("span:eq(1)").html();
        $(".config_single_box_question").text(question);
        $(".config_single_box_choice").text(choice);
        $("#modal-config-single").modal("show") ;
        $("#modal-config-single").attr("data-id",data_id);
        //初始化模态框，后期有时间加回填
        $(".question_manage_content,.option_manage_content").html("");
        addContent("que",".question_manage_content"); addContent("op",".option_manage_content");
    });
    //点击配置选项中的新建问题
    $(".add_question_manage").click(function () {
        addContent("que",".question_manage_content");
    });
    //点击配置选项中的新建选项
    $(".add_option_manage").click(function () {
        addContent("op",".option_manage_content");
    });
    $('.question_manage_content,.option_manage_content,.pro_manage_content').delegate("span","click",function () {
       $(this).parent("div").remove();
    });
    //点击配置矩阵单选题模态框中的确定按钮
    $(".config_option_submit").click(function () {
        var que_array = [],option_array = [];
        var id = $(this).parents(".modal").attr('data-id');
        var state = ""
        $(".question_manage_content input").each(function (id,item) {
           var que = $(this).val();
            if(que==""||que==null){
                $(this).focus();
                state= false;
            }else {
                que_array.push(que);state= true;
            }

        });
        $(".option_manage_content input").each(function (id,item) {
            var option = $(this).val();
            if(option==""||option==null){
                $(this).focus();
                state = false;
            }else {
                option_array.push(option);state= true;
            }

        });
        var $table = $(".question_content table:eq("+parseInt(id-1)+")");
        var length = option_array.length;
        if(state==true){
            $table.find("tbody").empty().append('<tr> <td></td>'+
                '<td class="span_group"></td></tr>');
            $.each(option_array,function (id,item) {
                $table.find("tbody .span_group").append("<span>"+item+"</span>");
            });
            $.each(que_array,function (id,item) {
                $table.find("tbody").append('<tr><td>'+item+'</td> <td class="radio_group"></td><td>' +
                    '<div class="btn btn-group">' +
                    '<div class="btn btn-default btn_delete_answer">删除</div>' +
                    '</div> </td></tr>');

            });
            for (var i= 0;i<length;i++){
                $table.find(".radio_group").append('<input type="radio" disabled>');
            }
            $("#modal-config-single").modal("hide");
        }
    });
    //点击配置量表题
    $(".question_content").delegate(".btn_config_rank","click",function () {
        setDataId();
        var data_id = $(this).parents('table').attr("data-id");
        var table=$(this).parents("table");
        var question=table.find("thead th:eq(1)").find("span:eq(0)").html();
        var choice=table.find("thead th:eq(1)").find("span:eq(1)").html();
        $(".config_rank_box_question").text(question);
         $(".config_rank_box_choice").text(choice);
        $("#modal-config-rank").modal("show") ;
        $("#modal-config-rank").attr("data-id",data_id);
        //初始化模态框，后期有时间加回填
        $(".pro_manage_content").html("");
        addContent("que",".pro_manage_content");

    });
    //点击配置选项中的新建问题
    $(".add_pro_manage").click(function () {
        addContent("que",".pro_manage_content");
    });
    //点击配置矩阵量表题模态框中的确定按钮
    $(".config_rank_submit").click(function () {
        var pro_array = [];
        var type = $(".rank_type option:selected").val();
        var range = $(".rank_range").val();
        var txt = type.substring(0,2);
        var state='';
        var id = $(this).parents(".modal").attr('data-id');
        var $table = $(".question_content table:eq("+parseInt(id-1)+")");
        $(".pro_manage_content input").each(function (id,item) {
            var pro = $(item).val();
            if(pro==""||pro==null){
                $(this).focus();
                state= false;
            }else {
                pro_array.push(pro);
                state = true;
            }
        });
        if(state==true){
            $table.find("tbody").empty().append('<tr>'+
                '<td> </td>'+
                '<td class="rank_span"><span>非常不'+txt+'</span><span>非常'+txt+'</span> </td>'+
                '<td></td>'+
                '</tr>');
            $.each(pro_array,function (id,item) {
                $table.append('<tr>'+
                    '<td>'+item+'</td>'+
                    '<td class="rank_radio"></td>'+
                    '<td>'+
                    '<div class="btn btn-group">'+
                    '<div class="btn btn-default btn_delete_answer">删除</div>'+
                    '</div>'+
                    '</td>'+
                    '</tr>');
            });
            for(var i=0;i<range;i++){
                $table.find(".rank_radio").append('<input type="radio" disabled>'+(i+1)+'');
            }
            $(".config_rank_box").modal("hide");


        }

    });

    function addContent(con,classname) {
        if (con=="que"){
            var que =  '<div><input placeholder="问题"><span>&times;️</span></div>';
        }else {
            que = '<div><input placeholder="选项"><span>&times;️</span></div>';
        }
        $(classname).append(que);

    }
    //点击取消
    $(".modal .cancel").click(function () {
        $(".close").trigger("click");
    });

    //答案列表序号重排
    function sortAnswer() {
        $(".answer_content table tbody tr").each(function (index) {
            $(".answer_content table tbody tr:eq("+index+")").find("td:first").html(index+1);
        })
    }

    //文字个数动态查询
    $(".input_num_limit,.input_question,.input_sort_num,.input_answer,.input_answer_num").keyup(function () {
        var num= $(this).val().length;
        $(".input_num").text(num);
        if(num>0){
            $(".error_tips").hide();
            $(".sort_tips").hide();
            $(".answer_error_tips").hide();
            $(".sort_error_tips").hide();
        }
    });
    //给每个问题列表加个data-id
    function setDataId() {
        $(".question_content table").each(function (index,element) {
            $(element).attr("data-id",index+1);
        });
    }

    //问题列表序号重排
    function sortQuestion() {
        $(".question_content table").each(function (index) {
            $(".question_content table:eq("+index+")").find("thead").find("th:first").find("span").html(index+1)
        })
    }


    //动态显示创建的文字
    $(".step3 .creat-txt").keyup(function () {
        var txt=$(this).val();
        var num=txt.length;
        $(".step3 .phone-txt").empty().append(txt);
        $(".step3 .txt-limit").html(num);
    })
    //点击选取卡券
    $(".choose-card").click(function () {
        $("#modal-card").modal("show");
    })
    //点击拉取更新卡券
    $(".upgrade-card").click(function(){
        $("#modal-card").modal("hide");
        $(".modal_progress").modal("show");
        setTimeout("$('.modal_progress').modal('hide')",3000);
        setTimeout("$('#modal-card').modal('show')",3000);
    });
    //点击确定选取卡券
    $(".card-box .card-submit").click(function () {
        var checked= $(".card-box-content table tbody input:radio:checked");
        var tr=checked.parents("tr");
        var type=tr.find("td:eq(1)").html();
        var name=tr.find("td:eq(2)").html();
        console.log(name)
        var inventory=tr.find("td:eq(3)").html();
        $(".card-content table tbody").empty().append("<tr> <td>"+type+"</td> <td>"+name+"</td> " +
            "<td>"+inventory+"</td> <td> <div class='btn btn-default btn-delete-card'>删除</div> </td> </tr>")
        $(".step3 .phone-card").empty().append("卡券").css({"background":"green","height":"60px"});//获取卡券的图片
        $("#modal-card").modal("hide");
    });
    //点击删除卡券
    $(".step3 .card-content table").delegate(".btn-delete-card","click",function () {
        var $this=$(this);
        $("#modal-delete").modal("show");
        $("#modal-delete").find(".modal-body p").html("确认删除当前卡券？");
        $(".confirm_delete_box .delete_submit").click(function () {
            $this.parents("tr").remove();
            $("#modal-delete").modal("hide");
        });
    });
    $("#spinner").spinner();
    //点击完成创建, 传数据
    $(".finish-creat .finish").click(function () {
        var city=$(".city_content");
        var question=$(".question_content");
        var award=$(".card-content")
        var city_name=[];
        var city_id=[];
        var cities=[];
        var questions=[];
        var que_id=[];
        var que_form=[];
        var que_content=[];
        var answers=[];
        var ans_id=[];
        var ans_content=[];
        var act_info_id=$(".activity_info_id").html();
        //获取城区名称和城区id
         city.find("li").each(function (index,element) {
            city_name[index]= $(element).find("div").html();
            city_id[index]= index+1;
            cities[index]={"city_id":city_id[index],"city":city_name[index]}
        });
        //获取问题内容和问题序号
         question.find("table").each(function (index,element) {
             var answer = [];
             que_id[index]=$(this).find("thead th:eq(0) span").html();
             que_content[index]=$(this).find("thead th:eq(1) span:first").html();
             var que_choice=$(this).find("thead th:eq(1) span:last").html();
             if(que_choice=="【单选】"){
                 que_form[index]=1;
             }
             if(que_choice=="【多选】"){
                 que_form[index]=2;
             }
             questions[index]={"que_id":que_id[index],"que_form":que_form[index],"question":que_content[index]};
             //-------------修改-------------------
             $(this).find("tbody tr").each(function (id,item) {
                 ans_content[id]= $(this).find("td:eq(1)").html();
                 ans_id[id] = id+1 ;
                 que_id[id]=$(this).parents("table").find("thead th:eq(0) span").html();
                 answer[id]={"que_id":que_id[id],"inner_id":ans_id[id],"content":ans_content[id]}
             });
             answers.push(answer);
             //-------------修改-------------------
         });
        //获取答案和问题序号
        // question.find("tbody tr").each(function(id,item){
        //     ans_content[id]= $(this).find("td:eq(1)").html();
        //     ans_id[id]=id+1;
        //     que_id[id]=$(this).parents("table").find("thead th:eq(0) span").html();
        //     answers[id]={"que_id":que_id[id],"inner_id":ans_id[id],"content":ans_content[id]}
        // });
        //获取奖励名称及描述
          var award_name=award.find("tbody td:eq(1)").html();
          var award_des=$(".creat-txt").val();
          var awards={"award_name":award_name,"award_des":award_des};

        console.log(answers)
        console.log(questions)
        console.log(cities)
        console.log(awards)
        if(city_name.length==0){
            window.scrollTo(0,0);
            alertShow("danger",3,"请创建城区！")
        }
        if(que_content.length==0){
            window.scrollTo(0,0);
            alertShow("danger",3,"请创建问题！")
        }
        if(city_name.length!==0 && que_content.length!==0){
            window.scrollTo(0,0);
            alertShow("success",3,"创建成功！")

            $.ajax({
                url:"",
                data:{
                    "activity":act_info_id,
                    "cities":cities,
                    "questions":questions,
                    "answers":answers,
                    "awards":awards

                },
                type:"post",
                dataType:"json",
                success:function (data) {
                    alert("success")
                }
            })

        }




    });






    // //超出部分省略号
    // $.fn.extend({
    //     displayPart:function () {
    //         var displayLength = 100;
    //         displayLength = this.attr("displayLength") || displayLength;
    //         var text = this.text();
    //         if (!text) return "";
    //         var result = "";
    //         var count = 0;
    //         for (var i = 0; i < displayLength; i++) {
    //             var _char = text.charAt(i);
    //             if (count >= displayLength) break;
    //             if (/[^x00-xff]/.test(_char)) count++; //双字节字符，//[u4e00-u9fa5]中文
    //             result += _char;
    //             count++;
    //         }
    //         if (result.length < text.length) {
    //             result += "...";
    //         }
    //         this.text(result);
    //     }
    // });


})


