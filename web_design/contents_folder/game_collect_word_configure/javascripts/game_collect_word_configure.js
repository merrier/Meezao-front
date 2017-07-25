/**
 * Created by Yangyue on 2016/11/2.
 */

$(function(){

    //---------------首页横幅图片上传------------
    $(".form-group").delegate(".upload_img_bg","change",function(){
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            bgImageUpload(".primary-vision",picurl,filesize,size);
        }
    });
    //---------------首页横幅图片上传------------

    //-------------背景颜色配置----------------------------------
    $(".form-group").delegate(".btn_color","click",function(){
        var color=$(".input_backgroundcolor").val();
        $(".right_show_frontpage .right_show_content").css("backgroundColor",color);
    });
    //-------------背景颜色配置----------------------------------

    //---------------主页横幅图片图上传----------------
    $(".form-group").delegate(".upload_img_pointer","change",function(){
        console.log("1");
        var picurl = getObjectURL(this.files[0]);
        var filesize = this.files[0].size;
        var size = 0.5;
        if(picurl){
            console.log("2");
            bgImageUpload(".right_show_main .head_image img",picurl,filesize,size);
        }
    });
    //---------------主页横幅图片图上传----------------

    //------------------选择行数----------------------------------
    $(".dropdown_row").delegate(".dropdown-menu li a","click",function(){
        var row=$(this).text();
        var parents=$(this).parents(".dropdown");
        parents.attr("data-id",row);
        parents.find(".btn_rows span").text(row);
        var col=$(".dropdown_col").attr("data-id");
        var words=$(".input_game_word").val().split("");
        initiate(parseInt(row),parseInt(col),words);
    });
    //------------------选择行数----------------------------------

    //------------------选择列数----------------------------------
    $(".dropdown_col").delegate(".dropdown-menu li a","click",function(){
        var col=$(this).text();
        var parents=$(this).parents(".dropdown");
        parents.attr("data-id",col);
        parents.find(".btn_cols span").text(col);
        var row=$(".dropdown_row").attr("data-id");
        var words=$(".input_game_word").val().split("");
        initiate(parseInt(row),parseInt(col),words);
    });
    //------------------选择行数----------------------------------

    function initiate(row,col,words){

        $(".content_game .game_square").remove();


        for(var i=0;i<row;i++){
            for(var j=0;j<col;j++){
                var gameSquare=$('<div class="game_square"></div>');
                var width=Math.floor($(".content_game").width()-col*4);

                gameSquare.width(Math.floor(width/col));
                gameSquare.height(Math.floor(gameSquare.width()));

                gameSquare.css("line-height",gameSquare.height()+"px");
                gameSquare.css("font-size",gameSquare.height()/3+"px");
                gameSquare.appendTo(".content_game");
            }
        }

        console.log($(".content_game").width());
        console.log(width);
        console.log(gameSquare.width());
        console.log(gameSquare.height());

        $(".content_game").height(gameSquare.height()*row+4*row);

        for(var i=0;i<words.length;i++){
            $(".content_game .game_square").each(function(index){
                $(this).text(words[index]);
            });
        }

    }



});