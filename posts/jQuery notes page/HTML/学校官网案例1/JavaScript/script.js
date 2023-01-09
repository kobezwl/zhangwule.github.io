                    // ---- 新闻动态 ----
    $(function(){
        $('.option li').click(function(){
        $(this).siblings('li').removeClass('cur_1');
        $(this).addClass('cur_1');
    
        var index = $(this).index();
        $(".active div").eq(index).addClass('mainTR_option_1').siblings("div").removeClass("mainTR_option_1");
        })
    })

                    // ---- 综合服务 ----
    $(function(){
        $('.serveNav > ul > li').click(function(){
            $('.serveNav > ul > li').attr('class','');
            $(this).attr('class','serveNav_Cur');

            $('.serveMain > ul > li').css('display','none');
            $('.serveMain > ul > li').eq($(this).index()).css('display','block');
        });
    })