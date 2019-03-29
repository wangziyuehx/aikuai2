$(document).ready(function(){
//	成功案列部分的tab切换
	$('#list2>li').mouseenter(function(){
		$(this).addClass("list2_pro").siblings('li').removeClass("list2_pro");
	})
	
//	表单部分
//点击城市选择填入文本框
$("#select").click(function(){
	$('.city').toggle();
	
})
$(".city>li").mouseenter(function(){
	$(this).css("background","#E1E3E9").siblings("li").css("background","#FFFFFF");
	$(this).click(function(){
		$("#select").val($(this).text());
		$('.city').hide();
	})
})






})

    //硬件产品摘要缩略js
    $(".hardware_show .plan_txts").each(function () {
        if($(this).text().length > 17){
            $(this).text($(this).text().substring(0,17));
            $(this).html($(this).html()+'…');
        }
    });
    
    var click_stop =  true;
    //技术支持文章下面的解决按钮
    $('.yes_or_no').click(function(){
        var   title =	$('.article_title').val();

        var addData = {
            type:$(this).attr('attr-data'),
            title:title
        };
        if(click_stop){
            $.ajax({
                url: '/templates/ikuaitemplate/count_yes_or_no.php',
                data: addData,
                type: 'POST',
                dataType: 'json',
                async: false,
                success: function (json) {
                    console.log(json)
                    alert('提交成功')
                    click_stop =  false;
                }
            });
        }
    })

    //顶部菜单 加载进页面时判断是加载pc端的js还是移动短的js
    $(function () {
        var start_w = $(document).width();
        if( start_w >= 768){
            mouseMenu();
            
            //返回顶部pc的按钮样式
            $(document).on('mouseover','.go_up',function () {
                $(this).addClass("go_up_h");
            })
            $(document).on('mouseout','.go_up',function () {
                $(this).removeClass("go_up_h");
            })

        }else{
            menuNavs();

        }
    });


    //pc顶部菜单的鼠标移上去的时间
    function mouseMenu() {
        $('.navbar-nav > li > a').css('color','#fff');

        $(".menu_level").mouseover(function () {
            $('.navbar-nav > li > .menu_level').css({'color':'#fff'});
            //$(this).css('color','#327DF1');
            $(this).css({'color':'#327DF1'});
            var nodeParent = this.parentNode;
            var nodeChild = nodeParent.children;
            var createNode = document.getElementById("menu_show");
            createNode.style.display = 'block';

            for(var i=0;i<nodeChild.length;i++){
                if(nodeChild[i]!=this){
                    var nodes = nodeChild[i].outerHTML;
                    createNode.innerHTML = nodes;
                }
            }
        });

        $(".head_top .navbar-nav").mouseout(function(){
            $("#menu_show").hide();
            $('.navbar-nav > li > .menu_level').css({'color':'#fff'});
        });

        $(".menu_show").hover(function () {
            $("#menu_show").show();
        },function () {
            $("#menu_show").hide();
        });
    }

    //手机端下面折叠菜单的交互
    function menuNavs(){
        var li = $(".navbar-nav  li");
        $(".navbar-nav  li").addClass("menu_1"); // 一级菜单

        li.has("ul").removeClass("menu_1").addClass("menu_2");  // 二级菜单

        var lis = $(".navbar-nav >  li");
        lis.has("ul>li>ul").removeClass("menu_2").addClass("menu_3");  // 三级菜单


        var menu_1 = $(".menu_1 > a");
        var menu_2 = $(".menu_2 > a");
        var menu_3 = $(".menu_3 > a");

        menu_1.click(function(){
            if($(this).parents().is(".menu_2")){

            }else{
                if($(this).parents("li").is(".menu_2")){
                    shut();
                }else if($(this).parents("li").is(".menu_3")){
                    $(this).parent("li").siblings().removeClass("opens");
                }
            }
        });
        menu_2.click(function(){
            if($(this).parent().is(".opens")){
                if($(this).parents("li").is(".menu_2")){
                    $(this).parent("li").removeClass("opens");
                    if($(this).parents(".menu_3")){
                        //$(this).siblings("ul").slideUp(100);
                        $(this).siblings("ul").hide();
                    }
                    else{
                        //$(".navbar-nav  ul").slideUp(100);
                        $(".navbar-nav  ul").hide();
                    }

                }else if($(this).parents("li").is(".menu_3")){

                }
            }else{
                if($(this).parents("li").is(".menu_3")){

                    $(this).parent().addClass("opens");
                    $(this).siblings("ul").slideDown();

                    // $(this).parent(".menu_2").siblings("li").find("ul").slideUp(500);
                    $(this).parent(".menu_2").siblings("li").find("ul").hide();
                    $(this).parent(".menu_2").siblings("li").removeClass("opens")

                }else if($(this).parents("li").is(".menu_2")){
                    shut();
                    $(this).parent().addClass("opens");
                    $(this).siblings("ul").slideDown();
                }
            }
        });
        menu_3.click(function(){
            if($(this).parent().is(".opens")){
                shut();

            }else{
                shut();
                $(this).parent().addClass("opens");
                $(this).siblings("ul").slideDown();
            }
        });


        //关闭子集
        function shut(){
            $(".opens").removeClass("opens");
           // $(".navbar-nav ul").slideUp(500);
            $(".navbar-nav ul").hide();
        }
    }

    //   屏幕发生变化时顶部菜单判断调用pc还是移动的js
    window.onresize = function () {
        var screen_w = $(document).width();
        if(screen_w >=768){
            //手机切回pc时 点击一级菜单时候需设置
            $(".menu_level").click(function () {
                $(this).siblings(".nav-child").removeAttr("style");
            });

            //默认把pc下菜单的二级菜单的外侧的div设为显示状态（手机下面是隐藏的）
            $(".head_top .nav .nav-child").removeAttr("style");

            //把手机时加上的一二三级标签的class去掉
            var li = $(".navbar-nav  li");
            $(".navbar-nav  li").removeClass("menu_1"); // 一级菜单
            li.has("ul").removeClass("menu_1").removeClass("menu_2");  // 二级菜单
            var lis = $(".navbar-nav >  li");
            lis.has("ul>li>ul").removeClass("menu_2").removeClass("menu_3");  // 三级菜单

            //加载进来pc的js
            mouseMenu();

        }else{


//           改变字体的颜色
            $(".menu_level").mouseover(function () {
                $('.navbar-nav > li > a').removeAttr('style');
            });
            $('.navbar-nav > li > a').removeAttr('style');

            //加载进来phone的js
            menuNavs();
        }

    }
    //    快速安装的手机端事件
//  $(".tree-holder >div").click(function () {
//      $(".tree-holder > .nav").toggleClass("nav_show");
//  });
// 动态详情的截取
    $(".plan_all .plan_txts").each(function  ()  {
        var  maxtxt  =  42;
        if($(this).text().length  >  maxtxt){
            $(this).text($(this).text().substring(0,maxtxt));
            $(this).html($(this).html()+'…');
        }
    });

 
    
//  表单部分的样式

    
    
