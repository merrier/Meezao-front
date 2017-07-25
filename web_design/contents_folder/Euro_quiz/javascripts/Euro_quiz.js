/* Js index_new */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/5/11 22:27>
 // +--------------------------------------------------------------------------*/

$(function(){

    //----------------------------------录入结果-------------------------------

    //------------------结果输入正则验证---------------
    $(".battle_result").delegate(".entry_result_input","blur",function(){
        var val = $(this).val();
        var result = regularExpression("positive_integers_zero",val);
        if(!result){
            $(this).val("");
            alertShow("danger",3,"请输入正确的比分!");
            return false;
        }
    });

    //-----------------提交按钮表单验证---------------
    $(".entry_result_form").delegate('.battle_btn a[type=submit]',"click",function(event){
        $(".entry_result_input").each(function(){
            var val = $(this).val();
            var tags =$(this).attr("data-tags");
            if(val==""||val==null){
                event.preventDefault();
                alertShow("danger",3,tags);
                return false;
            }
        });
        alertShow("success",3,"提交成功");
    });

    //--------------------------------对战列表----------------------------------

    //------------------删除记录----------------
    $(".battle_list_table").delegate(".btn_delete","click",function(){
        var data_id = $(this).parents('tr').attr("data-id");
        $(".modal_delete_confirm").modal("show").find(".btn-confirm").attr("data-id",data_id);
    });

    //---------------模态框-操作确认点击确认------------
    $(".modal_delete_confirm").delegate(".btn_confirm","click",function(){
        var data_id = $(this).attr("data-id");
        $(".modal_delete_confirm").modal("hide");
        alertShow("success",3,"删除成功!");
    });



    //----------------------------------新建对战-------------------------------

    //---------------------活动时间选择(插件)----------------------
    $('.battle_time').datepicker({
        duration: '',
        showTime: true,
        constrainInput: false,
        dateFormat: 'yy-mm-dd',
        time24h: true
    });

    //------------------队伍选择下拉点击----------------
    $(".battle_team").delegate(".dropdown-menu a","click",function(){
        var data_id = $(this).attr("data-id");
        var text = $(this).text();
        var par = $(this).parents(".battle_team");
        var index = par.index(".battle_team");
        var input = par.find(".form-control");
        var other_input = par.siblings(".battle_team").find(".form-control").val();

        if(other_input!=""&&other_input==text){
            alertShow("danger",3,"主队与客队不能为同一支队伍!");
            return false;
        }else{
            input.val(text);
            $(".battle_teamlogo").eq(index).children("h5").text(text);
        }
    });

    //------------------表单提交时表单验证----------------
    $(".create_battle_form").delegate('.battle_btn a[type=submit]',"click",function(event){
        $(".create_battle_input").each(function(){
            var val = $(this).val();
            var tags =$(this).attr("data-tags");
            if(val==""||val==null){
                event.preventDefault();
                alertShow("danger",3,tags);
                return false;
            }
        });
        alertShow("success",3,"提交成功");
    });


});