/**
 * Created by Administrator on 2016/7/12.
 */

$(document).ready(function(){

    var par=".create_account";

    var test1= [
        {
            value: 1,
            label: "Delighted"
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
        }
    ];

    var test2= [
        {
            value: 1,
            label: "Cool"
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
            label: "Funny"
        },
        {
            value: 6,
            label: "Action"
        }
    ];

    singleAuto(par+" .form_left .form_input",test1);
    singleAuto(par+" .form_right .form_input",test2);

    //--------------------自动完成搜索单选-------------------
    function singleAuto(input,source){
        $(input).autocomplete({
            source: source,
            _renderItem:function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function( event, ui ) {
                var span=$("<span class='brand_span'><i class='fa fa-close float_right_single'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_single'></i>");
                span.attr("data-id",ui.item.value);
                $(this).parent().append(span);
                $(this).val(ui.item.label).hide();
                console.log($(this).val());
                return false;
            }
        });
    }
    //--------------------自动完成搜索单选-------------------

    //-------------自动完成删除选项------------------------------------
    $(document).on("click",par+" .float_right_single",function(){
        var span=$(this).parent();
        span.prevAll('.brand_input').attr("disabled",false).val("").show();
        span.remove();
    });
    //-------------自动完成删除选项------------------------------------

    //--------------------加密模式选择------------------------------------
    $(".dropdown-menu").delegate("li a","click",function(){
        var text=$(this).text();
        var d_id=$(this).attr("data-id");
        $(this).parents(".dropdown").attr("data-id",d_id);
        $(this).parents(".dropdown").find(".choose_span").text(text);
        $(this).parents(".dropdown").prev(".code_pattern_input").val(text);
    });
    //--------------------加密模式选择------------------------------------

    //------------------------------开始时间选择--------------------
    $(par+" #from").datetimepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            $("#to").parents(".datimepicker").next(".error_tips").hide();
        }
    });
    //------------------------------开始时间选择--------------------

    //------------------------------结束时间选择--------------------
    $(par+" #to").datetimepicker({
        duration: '',
        defaultDate: "",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        dateFormat: "yy-mm-dd",
        regional:'zh-CN',
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
            $("#from").parents(".datimepicker").next(".error_tips").hide();
        }
    });
    //------------------------------结束时间选择--------------------

    //var account_detail={
    //    "company_name":[
    //        {
    //            "value":"1",
    //            "label":"北京疆域智行科技有限公司"
    //        }
    //    ],
    //    "APPID_input":[
    //        {
    //            "text":"aaaaaaaaa"
    //        }
    //    ],
    //    "Secret":[
    //        {
    //            "text":"bbbbbbbbbbb"
    //        }
    //    ],
    //    "merchant_account_ID":[
    //        {
    //            "text":"ccccccccc"
    //        }
    //    ],
    //    "pay_key":[
    //        {
    //            "text":"ddddddddd"
    //        }
    //    ],
    //    "code_pattern":[
    //        {
    //            "text":"明文模式",
    //            "data-id":"1"
    //        }
    //    ],
    //    "code_key":[
    //        {
    //            "text":"eeeeeeeee"
    //        }
    //    ],
    //    "Token":[
    //        {
    //            "text":"ffffffff"
    //        }
    //    ],
    //    "Access_token":[
    //        {
    //            "text":"ggggggggg"
    //        }
    //    ],
    //    "weixin_origin_ID":[
    //        {
    //            "text":"hhhhhhhhh"
    //        }
    //    ],
    //    "transmit_heading":[
    //        {
    //            "text":"iiiiiiii"
    //        }
    //    ],
    //    "domain_name":[
    //        {
    //            "text":"jjjjjjjj"
    //        }
    //    ],
    //    "database_name":[
    //        {
    //            "text":"kkkkkkkkk"
    //        }
    //    ],
    //    "Mysql_host":[
    //        {
    //            "text":"llllllll"
    //        }
    //    ]
    //    ,"Mysql_port":[
    //        {
    //            "text":"mmmmmmmm"
    //        }
    //    ],
    //    "Username":[
    //        {
    //            "text":"nnnnnnn"
    //        }
    //    ],
    //    "Password":[
    //        {
    //            "text":"ooooooooo"
    //        }
    //    ],
    //    "Table_pre":[
    //        {
    //            "text":"ppppppppp"
    //        }
    //    ],
    //    "phone_domain":[
    //        {
    //            "text":"qqqqqqqqq"
    //        }
    //    ],
    //    "weixin_group_name":[
    //        {
    //            "value":"ppppppppp",
    //            "label":"2"
    //        }
    //    ],
    //    "account_name":[
    //        {
    //            "text":"rrrrrrrrrr"
    //        }
    //    ],
    //    "time_range":[
    //        {
    //            "start_time":"2016-07-12 12;00",
    //            "end_time":"2016-07-12 13;00"
    //        }
    //    ],
    //    "135key":[
    //        {
    //            "text":"sssssssssssss"
    //        }
    //    ],
    //    "message_mould":[
    //        {
    //            "text":"tttttttttt"
    //        }
    //    ],
    //    "group_message":[
    //        {
    //            "text":"uuuuuuuuuu"
    //        }
    //    ],
    //    "checkbox":[
    //        {
    //            "checkbox_one":"true",
    //            "checkbox_two":"false"
    //        }
    //    ]
    //};

    var account_detail= [
            {
                "value":"1",
                "label":"北京疆域智行科技有限公司"
            },
            {
                "text":"aaaaaaaaa"
            },
            {
                "text":"bbbbbbbbbbb"
            },
            {
                "text":"ccccccccc"
            },
            {
                "text":"dddddddddd"
            },
            {
                "text":"明文模式",
                "data-id":"1"
            },
            {
                "text":"eeeeeeeee"
            },
            {
                "text":"ffffffff"
            },
            {
                "text":"ggggggggg"
            },
            {
                "text":"hhhhhhhhh"
            },
            {
                "text":"iiiiiiii"
            },
            {
                "text":"jjjjjjjj"
            },
            {
                "text":"kkkkkkkkk"
            },
            {
                "text":"llllllll"
            },
            {
                "text":"mmmmmmmm"
            },
            {
                "text":"nnnnnnn"
            },
            {
                "text":"ooooooooo"
            },
            {
                "text":"ppppppppp"
            },
            {
                "text":"qqqqqqqqq"
            },
            {
                "label":"ppppppppp",
                "value":"2"
            },
            {
                "text":"rrrrrrrrrr"
            },
            {
                "start_time":"2016-07-12 12:00",
                "end_time":"2016-07-12 13:00"
            },
            {
                "text":"sssssssssssss"
            },
            {
                "text":"tttttttttt"
            },
            {
                "text":"uuuuuuuuuu"
            },
            {
                "radio":"true"
            },
            {
                "checkbox_one":"true",
                "checkbox_two":"true"
            }
        ];

    initialForm(account_detail);

    function initialForm(account){
        $(".form_left .form-group").each(function(){
            var index=Number($(this).index());
            //console.log(index);
            if(index==0){
                var span=$("<span class='brand_span'><i class='fa fa-close float_right_single'></i></span>");
                span.html(account[index].label+"<i class='fa fa-close float_right_single'></i>");
                span.attr("data-id",account[index].value);
                $(this).find(".brand_input_div").append(span);
                $(this).find(".brand_input").val(account[index].label).hide();
            }else if(index==5){
                $(this).find(".dropdown").attr("data-id",account[index].data_id);
                $(this).find(".choose_span").text(account[index].text);
                $(this).find(".code_pattern_input").val(account[index].text);
            }else{
                $(this).find(".form-control").val(account[index].text);
            }
        });
        $(".form_right .form-group").each(function(){
            var index=Number($(this).index());
            var index_now=Number($(this).index())+13;
            console.log(index);
            console.log(index_now);
            if(index==6){
                var span=$("<span class='brand_span'><i class='fa fa-close float_right_single'></i></span>");
                span.html(account[index_now].label+"<i class='fa fa-close float_right_single'></i>");
                span.attr("data-id",account[index_now].value);
                $(this).find(".brand_input_div").append(span);
                $(this).find(".brand_input").val(account[index_now].label).hide();
            }else if(index==8){
                $(this).find("#from").val(account[index_now].start_time);
                $(this).find("#to").val(account[index_now].end_time);
            }else if(index==13) {
                console.log($(this).find(".electric_checkbox").prop("checked"));
                if(account[index_now].checkbox_one=="true"){
                    $(this).find(".electric_checkbox").prop("checked",true);
                }else{
                    $(this).find(".electric_checkbox").prop("checked",false);
                }
                if(account[index_now].checkbox_two=="true"){
                    $(this).find(".crm_checkbox").prop("checked",true);
                }else{
                    $(this).find(".crm_checkbox").prop("checked",false);
                }
            }else if(index==12) {

            }else{
                console.log(account[index_now].text);
                $(this).find(".form-control").val(account[index_now].text);
            }
        })
    }

});