// JavaScript Document
$(function(){
	$(".nav_bar a").on("click",menu_unflod);
	$(".person_information").on("click",drop_menu);
	$(".drop_menu li a").click(function(){
		$(this).addClass("active").parent().siblings().children("a").removeClass("active");
		$(".m_popover").addClass("hide");
		
		})//下拉菜单
	
	//修改账户
	$(".drop_menu li.modification_account").on("click",modification_account_password);
	$("#change_account_del").on("click",change_account_del);
    $("#change_account_confirm").on("click",change_account_confirm);
	
	$(".wrp").click(
       function(event){
	  change_account_init()
       var className=event.target.className; //这样会弹出你单击的元素的id,你可以在这里写你的程序了
	   if(className!="modification_account"){
		   $(".change_account").addClass("hide");
		   
	   }
	    if(className!="person_information"){
		   $(".drop_menu").hide();
	   }
      }
     );
	function modification_account_password(event){
		
		event.stopPropagation();
		$('.m_popover').addClass("hide");
		$(".change_account").removeClass("hide");
	}
	function change_account_confirm(){
		$(".change_account").addClass("hide");
	}
	function change_account_del(){
		$(".change_account").addClass("hide");
	}
	//下拉菜单
	function drop_menu(event){
		event.stopPropagation();
		if($(".drop_menu").is(":hidden"))
		{
		   $(".drop_menu").show();
		   $(".drop_tri").find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
		}
		else{
		   $(".drop_menu").hide();
		   $(".drop_tri").find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
		}
	}
	//导航框
	function menu_unflod(){
	 var class_name=$(this).closest("ul").attr("class");
	 //一级菜单
	  if(class_name=="level1")
	      {
			if($(this).next().is(":hidden"))
			{
		      $(this).children("i").removeClass("fa-angle-down").addClass("fa-angle-right");
	          $(this).addClass("current1").next().show();
		      $(this).parent().siblings().children("a").removeClass("current1").next().hide();
	          $(this).parent().siblings().children("a").children("i").removeClass("fa-angle-right").addClass("fa-angle-down");
			}
			else{
				$(this).parent().find("a").next().hide();
		        $(this).parent().find("a").removeClass("current1 current2")
		        $(this).parent().find("a").find("i").removeClass("fa-angle-right").addClass("fa-angle-down");//初始化
			}
	      }
	   if(class_name=="level2")
	     { 
		    if($(this).parent().has("ul").length==0)
			  {     
				    $(this).parent().siblings().children("a").removeClass("current2");
					$(this).parent().siblings().children("a").children("i").removeClass("fa-angle-right").addClass("fa-angle-down");
					$(this).parent().siblings().children("a").next().hide();
			  }
	         else{
				 if($(this).next().is(":hidden"))
				 {
			       $(this).parent().siblings().children("a").removeClass("current2").next().hide();
	               $(this).addClass("current2").next().show();
	               $(this).parent().siblings().children("a").children("i").removeClass("fa-angle-right").addClass("fa-angle-down");
	               $(this).children("i").removeClass("fa-angle-down").addClass("fa-angle-right");
				 }
				 else{
			       $(this).parent().find("a").next().hide();
		           $(this).parent().find("a").removeClass("current1 current2")
		           $(this).parent().find("a").find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
				 }
		      }
	       }
	}
function change_account_init(){
	$(".drop_menu li a").removeClass("active");
	$(".drop_tri").find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
	
}
})