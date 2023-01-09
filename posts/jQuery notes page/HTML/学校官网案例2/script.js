$(function(){
    $('.icon-Waiting-Ul').hide();
    $('.headerIcon div:first').mouseenter(function(){
        $('.icon-Waiting-Ul').show();
    });
    $('.headerIcon div:first').mouseleave(function(){
        $('.icon-Waiting-Ul').hide();
    });
})

$(function(){
    $('.headerIcon > div:last')(function(){
        var r = confirm('您确定要退出当前页面吗？');
        console.log(r);
        if(r == true){
            window.close();
        }
    });
})
$(function(){
    $('.Notice_Nav li').hover(function(){
    $(this).siblings('li').removeClass('Notice_Cur');
    $(this).addClass('Notice_Cur');

    var index = $(this).index();
    $(".Notice_Main li").eq(index).addClass('Notice_Active').siblings("li").removeClass("Notice_Active");
    })
})
$(function(){
    var $jt_left_a = $('.jt-left-a');
    var $jt_right_a = $('.jt-right-a');
    var $Nav_Icon = $('.Nav_Icon');
    $jt_left_a.mouseenter(function(){
        $jt_left_a.css('background','url(./image/jt-left-b.png)')
    })
    $jt_left_a.mouseleave(function(){
        $jt_left_a.css('background','url(./image/jt-left-a.png)')
    })
    $jt_right_a.mouseenter(function(){
        $jt_right_a.css('background','url(./image/jt-right-b.png)')
    })
    $jt_right_a.mouseleave(function(){
        $jt_right_a.css('background','url(./image/jt-right-a.png)')
    })

    var add = (function(){
        var counter = 0;

        return function(){
            return counter += 1;
        }
    })();
    $jt_left_a.click(function(){
        if(add() % 2 != 0){
            $Nav_Icon.css('transform','translate(-320px,0px)').css('transition-duration','500ms');
        }
        else{
            $Nav_Icon.css('transform','translate(0px,0px)').css('transition-duration','500ms');
        }
    });
    $jt_right_a.click(function(){
        if(add() % 2 != 0){
            $Nav_Icon.css('transform','translate(-320px,0px)').css('transition-duration','500ms');
        }
        else{
            $Nav_Icon.css('transform','translate(0px,0px)').css('transition-duration','500ms');
        }
    });
})
$(function(){
    var $Hall_Cur = $('.main_Hall_top > ul > li');
    var $Hall_Active = $('.main_Hall_bottom > ul > li');
    $Hall_Cur.click(function(){
        $(this).addClass('Hall_Cur').siblings().removeClass('Hall_Cur');
        var index = $Hall_Cur.index(this);
        $Hall_Active.eq(index).show().siblings().hide();
    });
})

$(function(){
    var $Hall_Active_Next = $('.Hall_Active_Next');
    var $Hall_Nav_Next = $('.Hall_Active > div > a');
    $Hall_Nav_Next.click(function(){
        $(this).addClass('Hall_Nav_Next').siblings().removeClass('Hall_Nav_Next');
        var index = $Hall_Nav_Next.index(this);
        if(index == 0){
            $Hall_Active_Next.css('transform','translate(0px,0px)').css('transition-duration','500ms');
        }
        if(index == 1){
            $Hall_Active_Next.css('transform','translate(-984px,0px)').css('transition-duration','500ms');
        }
    })
})
$(function(){
    var $Hall_ActiveWork_Next = $('.Hall_ActiveWork_Next');
    var $Hall_NavWork_Next = $('.Hall_ActiveWork > div > a');
    $Hall_NavWork_Next.click(function(){
        $(this).addClass('Hall_NavWork_Next').siblings().removeClass('Hall_NavWork_Next');
        var index = $Hall_NavWork_Next.index(this);
        if(index == 0){
            $Hall_ActiveWork_Next.css('transform','translate(0px,0px)').css('transition-duration','500ms');
        }
        if(index == 1){
            $Hall_ActiveWork_Next.css('transform','translate(-984px,0px)').css('transition-duration','500ms');
        }
    })
})
$(function(){
    var serve_Color = ['#6bbcf8','#f8ad6a','#f86a75','#6ad3f8','#c88ed5','#898af0','#8be780'];
    var main_Serve_Active = document.getElementsByClassName('main_Serve_Active');
    $(main_Serve_Active).each(function(){
        $(this).find('li').each(function(index){
            var serve_Index = index % 7;
            $(this).find('i').css({'color':serve_Color[serve_Index]});
        })
    })
})
$(function(){
    var $main_Serve_Active = $('.main_Serve_Active');
    var $main_Serve_Nav = $('.main_Serve_bottom > div > a');
    $main_Serve_Nav.click(function(){
        $(this).addClass('main_Serve_Nav').siblings().removeClass('main_Serve_Nav');
        var index = $main_Serve_Nav.index(this);
        if(index == 0){
            $main_Serve_Active.css('transform','translate(0px,0px)').css('transition-duration','500ms');
        }
        if(index == 1){
            $main_Serve_Active.css('transform','translate(-1004px,0px)').css('transition-duration','500ms');
        }
    })
})
$(function(){
    var $Link_i2 = $('.Link_i2');
    var $Link_ul = $('.main_Link > div > ul');
        $Link_i2.click(function(){
            var index = $Link_i2.index(this);
            if($Link_ul.eq(index).is(':hidden')){
                $Link_ul.slideUp();
                $Link_ul.eq(index).slideDown();
            }
            else{
                $Link_ul.eq(index).slideUp();
            }
        });
})
$(function(){
    var $main_Link2_Nav = $('.main_Link2 > ul > li');
    var $main_Link2_Next = $('.main_Link2 > ul > li > ul');
    $main_Link2_Nav.mouseenter(function(){
        var index = $main_Link2_Nav.index(this);
        if($main_Link2_Next.eq(index).is(':hidden')){
            // $main_Link2_Nav.hide();
            $main_Link2_Next.eq(index).show();
        }
        else{
            $main_Link2_Next.eq(index).hide();
        }
    })
    $main_Link2_Nav.mouseleave(function(){
        if($main_Link2_Next.is(':hidden')){
            // $main_Link2_Nav.hide();
            $main_Link2_Next.hide();
        }
    })
})