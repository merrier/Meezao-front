/**
 * Created by Administrator on 2016/7/12.
 */

$(document).ready(function(){

    var par=".configure_menu_C";

    var test= [
        {
            value: 1,
            label: "基础模板B端"
        },
        {
            value: 2,
            label: "基础模板C端"
        }
    ];

    singleAuto(par+" .navbar-right .form_input",test);

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
                initialTable(menu);
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

    var menu={
        "data":[
            {
                "level":"level1",
                "text":"有折有饭"
            },
            {
                "level":"level2",
                "text":"最新资讯"
            },
            {
                "level":"level2",
                "text":"最新活动"
            }
        ]
    };

    function initialTable(menu){
        for(var i=0;i<menu.data.length;i++){
            switch (menu.data[i].level){
                case "level1":
                    var tr=$('<tr class="menu_level1">'+
                        '<td></td>'+
                        '<td>'+
                        '<div class="btn-group" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default btn_hide">隐藏</button>'+
                        '</div>'+
                        '</td>'+
                        '</tr>');
                    tr.attr("data-id",i);
                    tr.find("td").eq(0).text(menu.data[i].text);
                    tr.appendTo(".table_body");
                    break;
                case "level2":
                    var tr=$('<tr class="menu_level2">'+
                        '<td></td>'+
                        '<td>'+
                        '<div class="btn-group" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default btn_hide">隐藏</button>'+
                        '</div>'+
                        '</td>'+
                        '</tr>');
                    tr.attr("data-id",i);
                    tr.find("td").eq(0).text(menu.data[i].text);
                    tr.appendTo(".table_body");
                    break;
                case "level3":
                    var tr=$('<tr class="menu_level3">'+
                        '<td></td>'+
                        '<td>'+
                        '<div class="btn-group" role="group" aria-label="...">'+
                        '<button type="button" class="btn btn-default btn_hide">隐藏</button>'+
                        '</div>'+
                        '</td>'+
                        '</tr>');
                    tr.attr("data-id",i);
                    tr.find("td").eq(0).text(menu.data[i].text);
                    tr.appendTo(".table_body");
                    break;
                default:
                    break;
            }
        }
    }

    //---------------------隐藏显示状态切换------------------------------
    //---------------------一级菜单状态点击------------------------------
    $(par).on("click"," .menu_level1 td .btn-default",function(){
        var par=$(this).parents("tr");
        var index_start=par.index();          //当前一级菜单的index
        var menu_level1_next=par.nextAll("tr.menu_level1").eq(0);
        var index_stop=menu_level1_next.index();        //下一个一级菜单的index
        if(index_stop<0){                        //没有下一个一级菜单
            if($(this).hasClass("btn_hide")){               //隐藏一级菜单和其对应的二级、三级菜单
                $(this).removeClass("btn_hide").addClass("btn_show");
                $(this).text("显示");
                menuLevel2ShowLast(par);
                menuLevel3ShowLast(par);
            }else{                        //显示一级菜单和其对应的二级、三级菜单
                $(this).removeClass("btn_show").addClass("btn_hide");
                $(this).text("隐藏");
                menuLevel2HideLast(par);
                menuLevel3HideLast(par);
            }
        }else{                                 //有下一个一级菜单
            if($(this).hasClass("btn_hide")){                 //隐藏一级菜单和其对应的二级、三级菜单
                $(this).removeClass("btn_hide").addClass("btn_show");
                $(this).text("显示");
                menuLevel2Show(par,index_start,index_stop);
                menuLevel3Show(par,index_start,index_stop);
            }else{                            //显示一级菜单和其对应的二级、三级菜单
                $(this).removeClass("btn_show").addClass("btn_hide");
                $(this).text("隐藏");
                menuLevel2Hide(par,index_start,index_stop);
                menuLevel3Hide(par,index_start,index_stop);
            }
        }
    });
    //---------------------一级菜单状态点击------------------------------

    //---------------------二级菜单状态点击------------------------------
    $(par).on("click"," .menu_level2 td .btn-default",function(){
        var par=$(this).parents("tr");
        var index_start=par.index();             //当前二级菜单的index
        var menu_level2_next=par.nextAll("tr.menu_level2").eq(0);
        var index_stop=menu_level2_next.index();   //下一个二级菜单的index
        if(index_stop<0){                   //没有下一个二级菜单
            if($(this).hasClass("btn_hide")){                  //隐藏二级菜单
                $(this).removeClass("btn_hide").addClass("btn_show");
                $(this).text("显示");
                menuLevel3ShowLast(par);             //隐藏二级菜单下的三级菜单
                menuLevel1HideUp(par);               //所有二级菜单隐藏则对应的一级菜单也隐藏
            }else{               //显示二级菜单
                $(this).removeClass("btn_show").addClass("btn_hide");
                $(this).text("隐藏");
                menuLevel3HideLast(par);             //显示二级菜单下的三级菜单
                par.prevAll(".menu_level1").eq(0).find(".btn-default").removeClass("btn_show").addClass("btn_hide").text("隐藏");
                //显示对应的一级菜单
            }
        }else{                    //有下一个二级菜单
            if($(this).hasClass("btn_hide")){                 //隐藏二级菜单
                $(this).removeClass("btn_hide").addClass("btn_show");
                $(this).text("显示");
                menuLevel3Show(par,index_start,index_stop);            //隐藏二级菜单下的三级菜单
                menuLevel1HideUp(par);                                 //所有二级菜单隐藏则对应的一级菜单也隐藏
            }else{                //显示二级菜单
                $(this).removeClass("btn_show").addClass("btn_hide");
                $(this).text("隐藏");
                menuLevel3Hide(par,index_start,index_stop);          //显示二级菜单下的三级菜单
                par.prevAll(".menu_level1").eq(0).find(".btn-default").removeClass("btn_show").addClass("btn_hide").text("隐藏");
                //显示对应的一级菜单
            }
        }
    });
    //---------------------二级菜单状态点击------------------------------

    //---------------------三级菜单状态点击------------------------------
    $(par).on("click"," .menu_level3 td .btn-default",function(){
        var par=$(this).parents("tr");
        if($(this).hasClass("btn_hide")){          //隐藏三级菜单
            $(this).removeClass("btn_hide").addClass("btn_show");
            $(this).text("显示");
            menuLevel2ShowUp(par);            //所有三级菜单隐藏则二级菜单隐藏，所有二级菜单隐藏则一级菜单隐藏
        }else{                         //显示三级菜单
            $(this).removeClass("btn_show").addClass("btn_hide");
            $(this).text("隐藏");
            par.prevAll(".menu_level1").eq(0).find(".btn-default").removeClass("btn_show").addClass("btn_hide").text("隐藏");
            //显示对应的一级菜单
            par.prevAll(".menu_level2").eq(0).find(".btn-default").removeClass("btn_show").addClass("btn_hide").text("隐藏");
            //显示对应的二级菜单
        }
    });
    //---------------------三级菜单状态点击------------------------------
    //---------------------隐藏显示状态切换------------------------------

    function menuLevel2Show(par,index_start,index_stop){
        par.nextAll(".menu_level2").each(function(){
            var index_now=$(this).index();
            if(index_now<index_stop&&index_now>index_start){
                $(this).find(".btn-default").removeClass("btn_hide").addClass("btn_show");
                $(this).find(".btn-default").text("显示");
            }
        });
    }

    function menuLevel2ShowLast(par){
        par.nextAll(".menu_level2").each(function(){
            $(this).find(".btn-default").removeClass("btn_hide").addClass("btn_show");
            $(this).find(".btn-default").text("显示");
        });
    }

    function menuLevel3Show(par,index_start,index_stop){
        par.nextAll(".menu_level3").each(function(){
            var index_now=$(this).index();
            //console.log(index_now);
            if(index_now<index_stop&&index_now>index_start){
                $(this).find(".btn-default").removeClass("btn_hide").addClass("btn_show");
                $(this).find(".btn-default").text("显示");
            }
        });
    }

    function menuLevel3ShowLast(par){
        par.nextAll(".menu_level3").each(function(){
            $(this).find(".btn-default").removeClass("btn_hide").addClass("btn_show");
            $(this).find(".btn-default").text("显示");
        });
    }

    function menuLevel2Hide(par,index_start,index_stop){
        par.nextAll(".menu_level2").each(function(){
            var index_now=$(this).index();
            //console.log(index_now);
            if(index_now<index_stop&&index_now>index_start){
                $(this).find(".btn-default").removeClass("btn_show").addClass("btn_hide");
                $(this).find(".btn-default").text("隐藏");
            }
        });
    }

    function menuLevel2HideLast(par){
        par.nextAll(".menu_level2").each(function(){
            $(this).find(".btn-default").removeClass("btn_show").addClass("btn_hide");
            $(this).find(".btn-default").text("隐藏");
        });
    }

    function menuLevel3Hide(par,index_start,index_stop){
        par.nextAll(".menu_level3").each(function(){
            var index_now=$(this).index();
            //console.log(index_now);
            if(index_now<index_stop&&index_now>index_start){
                $(this).find(".btn-default").removeClass("btn_show").addClass("btn_hide");
                $(this).find(".btn-default").text("隐藏");
            }
        });
    }

    function menuLevel3HideLast(par){
        par.nextAll(".menu_level3").each(function(){
            $(this).find(".btn-default").removeClass("btn_show").addClass("btn_hide");
            $(this).find(".btn-default").text("隐藏");
        });
    }

    function menuLevel1HideUp(par){
        var menu_level1_prev=par.prevAll("tr.menu_level1").eq(0);
        var index_prev=menu_level1_prev.index();
        console.log(index_prev);
        var menu_level1_next=par.nextAll("tr.menu_level1").eq(0);
        var index_next=menu_level1_next.index();
        console.log(index_next);
        var flag=1;
        if(index_next<0){
            par.parents(".table_body").find(".menu_level2").each(function(){
                var index_current=$(this).index();
                if(index_current>index_prev){
                    if($(this).find(".btn-default").hasClass("btn_hide")){
                        flag=0;
                    }
                }
            });
        }else{
            par.parents(".table_body").find(".menu_level2").each(function(){
                var index_current=$(this).index();
                if(index_current<index_next&&index_current>index_prev){
                    if($(this).find(".btn-default").hasClass("btn_hide")){
                        flag=0;
                    }
                }
            });
        }
        console.log(flag);
        if(flag){
            menu_level1_prev.find(".btn-default").removeClass("btn_hide").addClass("btn_show").text("显示");
        }
    }

    function menuLevel2ShowUp(par){
        var menu_level2_prev=par.prevAll(".menu_level2").eq(0);
        var menu_level2_index_prev=menu_level2_prev.index();
        console.log(menu_level2_index_prev);
        var menu_level2_next=par.nextAll(".menu_level2").eq(0);
        var menu_level2_index_next=menu_level2_next.index();
        console.log(menu_level2_index_next);
        var flag_level3=1;
        if(menu_level2_index_next<0){
            par.parents(".table_body").find(".menu_level3").each(function(){
                var index_current=$(this).index();
                console.log(index_current);
                if(index_current>menu_level2_index_prev){
                    if($(this).find(".btn-default").hasClass("btn_hide")){
                        flag_level3=0;
                    }
                }
            });
        }else{
            par.parents(".table_body").find(".menu_level3").each(function(){
                var index_current=$(this).index();
                console.log(index_current);
                if(index_current>menu_level2_index_prev&&index_current<menu_level2_index_next){
                    if($(this).find(".btn-default").hasClass("btn_hide")){
                        flag_level3=0;
                    }
                }
            });
        }
        console.log(flag_level3);
        if(flag_level3){
            menu_level2_prev.find(".btn-default").removeClass("btn_hide").addClass("btn_show").text("显示");
            menuLevel1HideUp(par);
        }
    }

});