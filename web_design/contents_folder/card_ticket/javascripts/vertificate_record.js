/**
 * Created by Administrator on 2016/5/21.
 */

$(function(){

    //---------------------------卡券核销模态框显示------------------------
    $(".navbar").delegate(".btn_card_vertificate","click",function(){
        $(".modal_card_vertificate").modal("show");
    });
    //---------------------------卡券核销模态框显示------------------------

    //---------------------------点击查询按钮卡券详情显示------------------------
    $(".modal_card_vertificate").delegate(" .btn_search","click",function(){
        var search_input=$(this).prevAll(".form-group").find("input").val();
        var card_detail={
            effective_date:"有效卡券",
            serial_number:"222222",
            use_info:"使用须知使用须知使用须知使用须知使用须知"
        };
        var spans=$(".card_detail").find("span");
        spans.eq(0).text(card_detail.effective_date);
        spans.eq(1).text(card_detail.serial_number);
        spans.eq(2).text(card_detail.use_info);
        $(".card_detail").show();
        var effective_state=spans.eq(0).text();
        if(effective_state=="无效卡券"){
            $(".btn_vertificate_confirm").attr("disabled",true);
        }else{
            $(".btn_vertificate_confirm").attr("disabled",false);
        }
        console.log("搜索输入内容："+search_input);    //搜索输入内容
    });
    //---------------------------点击查询按钮卡券详情显示------------------------

    //---------------------------核销成功模态框显示------------------------
    $(".modal_card_vertificate").delegate(" .btn_vertificate_confirm","click",function() {
        $(".modal_card_vertificate_success").modal("show");
        $(".modal_card_vertificate").modal("hide");
        $(".card_detail").hide();
    });
    //---------------------------核销成功模态框显示------------------------

    //---------------------------返回继续核销------------------------
    $(".modal_card_vertificate_success").delegate(" .btn_backto_vertificate","click",function() {
        $(".modal_card_vertificate").modal("show");
        $(".modal_card_vertificate_success").modal("hide");
    });
    //---------------------------返回继续核销------------------------

    //------------------------------开始时间选择--------------------
    $("#from").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        minDate: 'Today',
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
        }
    });
    //------------------------------开始时间选择--------------------

    //------------------------------结束时间选择--------------------
    $("#to").datepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        }
    });
    //------------------------------结束时间选择--------------------

})
