/**
 * Created by Yangyue on 2017/2/28.
 */

$( function() {
    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $( "#tags" ).autocomplete({
        source: availableTags
    });

    singleAuto(".auto_single_input",availableTags);
    multipleAuto(".auto_multiple_input",availableTags);

    //--------------------自动完成搜索单选-------------------
    function singleAuto(input,source){
        $(input).autocomplete({
            source: source,
            minLength: 0,
            autoFocus: true
        });
    }
    //--------------------自动完成搜索-单选------------------

    //--------------------自动完成搜索多选-------------------
    function multipleAuto(input,source){
        $(input).autocomplete({
            source: source,
            minLength: 0,
            autoFocus: true,
            _renderItem:function (ul, item) {
                return $("<li></li>")
                    .append(item.label)
                    .appendTo(ul);
            },
            select: function( event, ui ) {
                var span=$("<span class='auto_span'><i class='fa fa-close float_right_multiple'></i></span>");
                span.html(ui.item.label+"<i class='fa fa-close float_right_multiple'></i>");
                span.attr("data-id",ui.item.value);
                if(ui.item.label=="全部"){
                    //选择全部时移除其它选项并禁止选择
                    $(this).parent().find("span").each(function(i){
                        $(this).remove();
                    });
                    $(this).parent().append(span);
                    $(this).val("").attr("disabled",true);
                    $(this).parents(".auto_input_div").css("height","68px");
                }else{
                    //不允许重复添加
                    var flag=0;
                    $(this).parent().find("span").each(function(i){
                        if(ui.item.label==$(this).text()){
                            flag=1;
                        }
                    });
                    if(flag){
                        alert("不允许重复添加选项！");
                        $(this).val("");
                    }else{
                        $(this).parent().append(span);
                        $(this).val("");
                        var p_height=parseInt($(this).parents(".auto_input_div").css("height"))+34;
                        $(this).parents(".auto_input_div").css("height",p_height+"px");
                    }
                }
                return false;
            }
        });
    }
    //--------------------自动完成搜索多选-------------------

    //--------------------展开所有选项-----------------------
    $('.dropdown_menu_div').on('click', function() {
        var auto_input=$(this).prev("div").children(".auto_input");
        if (auto_input.autocomplete("widget").is(":visible")) {
            auto_input.autocomplete("close");
            return;
        }
        $(this).blur();
        auto_input.autocomplete('search', '');
        auto_input.focus();
    });
    //--------------------展开所有选项-----------------------

    //-------------自动完成多选删除选项------------------------------------
    $(document).on("click",".float_right_multiple",function(){
        var span=$(this).parent();
        span.prevAll('.auto_input').attr("disabled",false);
        var p_height=parseInt($(this).parents(".auto_input_div").css("height"))-34;
        $(this).parents(".auto_input_div").css("height",p_height+"px");
        span.remove();
    });
    //-------------自动完成多选删除选项------------------------------------

} );