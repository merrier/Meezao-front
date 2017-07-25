/* Js web_template */
/* +--------------------------------------------------------------------------
 // | Author: Merrier <953075999@qq.com> <http://> <Date:2016/9/21 22:27>
 // +--------------------------------------------------------------------------*/


$(function(){

    //-------------------根据屏幕宽度改变html的font-size大小---------------
    // (function(win) {
    //     function setUnitA() {
    //         document.documentElement.style.fontSize = document.documentElement.clientWidth >960 ? document.documentElement.clientWidth * 16 / 960 + "px" : "16px";
    //     }
    //     var h = null;
    //     window.addEventListener("resize", function() {
    //         clearTimeout(h);
    //         h = setTimeout(setUnitA, 300);
    //     }, false);
    //     setUnitA();
    // })(window);


    //-------------------------全屏滚动初始化-------------------------
    if ($(window).height() > 600 && $(window).width() > 960) {
        $(".panel").css({"height": $(window).height()});

        $.scrollify({
                section: ".panel",
                scrollSpeed: 800,
                // interstitialSection: "",
                before: function (i, panels) {
                    var ref = panels[i].attr("data-section-name");
                    $(".pagination_scrollify .active").removeClass("active");
                    $(".pagination_scrollify").find("a[href=\"#" + ref + "\"]").addClass("active");
                },
                after: function (i, panels) {
                    var data_bg = panels[i].attr("data-bg");
                    if (data_bg) {
                        $(".pagination_scrollify").addClass("pagination_black");
                    } else {
                        $(".pagination_scrollify").removeClass("pagination_black");
                    }
                    if (location.hash == '#home') {
                        $("nav").removeClass("nav_black");
                        //$(".nav_black").fadeOut();
                        //$(".nav_transparent").fadeIn();
                    } else {
                        $("nav").addClass("nav_black");
                        //$(".nav_black").fadeIn();
                        //$(".nav_transparent").fadeOut();
                    }
                },
                afterRender: function () {
                    var pagination = "<ul class=\"pagination_scrollify\">";
                    var activeClass = "";
                    $(".panel").each(function (i) {
                        activeClass = "";
                        if (i === 0) {
                            activeClass = "active";
                        }
                        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-cn_name") + "</span></a></li>";
                    });

                    pagination += "</ul>";

                    $("body").append(pagination);
                }
            });
    }


    //-------------------------轮播初始化-------------------------
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: 2000,//自动滑动的延迟
        speed:1000, //自动滑动的速度
        autoplayDisableOnInteraction:false, //用户操作swiper之后，是否禁止autoplay
        //parallax:true,  //开启视差效果（相对父元素移动）
        effect : 'coverflow',   //切换效果
        slidesPerView: 1,
        centeredSlides: true,
        pagination: '.swiper-pagination',    //分页器
        paginationClickable : false   //点击分页器的指示点分页器会控制Swiper切换
    });



});

