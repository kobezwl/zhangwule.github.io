// tab
$(function(){
    var $header_Nav = $('#header .header_Nav > ul > li');
    var $main_Active = $('#main > article');
    $header_Nav.click(function(){
        $(this).addClass('header_Nav_style').siblings().removeClass('header_Nav_style');
        var index = $(this).index();
        $main_Active.eq(index).addClass('main_Active_style').siblings().removeClass('main_Active_style');
    });
});

// banner
$(function(){
    var $hall_img = $('#hall .hall_img > div');
    var i = 1;
    // $hall_img.hide().first().fadeIn();
    setInterval(function(){
        if(i == 1){
            $hall_img.css('display', 'none');
            $hall_img.eq(0).fadeIn(600);
        }
        if(i == 2){
            $hall_img.css('display', 'none');
            $hall_img.eq(1).fadeIn(600);
        }
        if(i == 3){
            $hall_img.css('display', 'none');
            $hall_img.eq(2).fadeIn(600);
        }
        // console.log(i);
        if(i++ >= 3){
            i = 1;
        }
    },3000);
})

// 切换
$(function(){
    var $hall_Nav = $('#hall .hall_Nav > ul > li');
    var $hall_Active = $('#hall .hall_main > article');
    $hall_Nav.click(function(){
        $(this).addClass('hall_Nav_style').siblings().removeClass('hall_Nav_style');
    });
    $hall_Nav.eq(0).click(function(){
        $hall_Active.eq(0).css('transform','translate(0px,0px)').css('transition-duration','500ms');
        $hall_Active.eq(1).css('transform','translate(0px,0px)').css('transition-duration','500ms');
        $hall_Active.eq(2).css('transform','translate(0px,0px)').css('transition-duration','500ms');
    });
    $hall_Nav.eq(1).click(function(){
        $hall_Active.eq(0).css('transform','translate(-1200px,0px)').css('transition-duration','500ms');
        $hall_Active.eq(1).css('transform','translate(-1200px,0px)').css('transition-duration','500ms');
        $hall_Active.eq(2).css('transform','translate(-1200px,0px)').css('transition-duration','500ms');
    });
    $hall_Nav.eq(2).click(function(){
        $hall_Active.eq(0).css('transform','translate(-2400px,0px)').css('transition-duration','500ms');
        $hall_Active.eq(1).css('transform','translate(-2400px,0px)').css('transition-duration','500ms');
        $hall_Active.eq(2).css('transform','translate(-2400px,0px)').css('transition-duration','500ms');
    });
});

// 图标颜色
// $(function(){
//     var $recommend_icon_colors = ['#3A94D3','#30D59D','#7A6DB5','#F47F45','#F25872','#F1C03C','#39CAE9','#7A6DB5'];
//     var $recommend_icon = $('#hall .recommend_icon');
//     console.log($recommend_icon);
//     $recommend_icon.each(function(index){
//         $(this).css('backgroundColor', $recommend_icon_colors[index]);
//     });
// });

$(function(){
    var $hot_icon_colors = ['#3A94D3','#97D66C','#FBB740','#D07056','#8493A0','#667BBF','#FF7777','#F47F45'];
    var $hot_icon = $('#hall .hot_icon');
    $hot_icon.each(function(index){
        $(this).css('backgroundColor', $hot_icon_colors[index]);
    });
});

$(function(){
    var $card_top_main = $('#hall .card_top_main > li');
    var $card_bottom_main = $('#hall .card_bottom_main > li');
    var $card_main = jQuery.merge($card_top_main,$card_bottom_main);
    var $card_main_colors = ['#77D13A','#3FA4D3','#30C193','#33CBD1','#407DB1','#F3753D'];
    $card_main.each(function(index){
        $(this).css('backgroundColor', $card_main_colors[index]);
    });
    var $Teacher_card_top_main = $('#hall .Teacher_card_top_main > li');
    var $Teacher_card_bottom_main = $('#hall .Teacher_card_bottom_main > li');
    var $Teacher_card_main = jQuery.merge($Teacher_card_top_main,$Teacher_card_bottom_main);
    var $Teacher_card_main_colors = ['#77D13A','#3FA4D3','#30C193','#33CBD1','#407DB1','#F3753D'];
    $Teacher_card_main.each(function(index){
        $(this).css('backgroundColor', $Teacher_card_main_colors[index]);
    });
});

$(function(){
    var $Teacher_hot_icon_colors = ['#F47F45','#7A6DB5','#7A6DB5','#FBB740','#3A94D3','#F47F45','#97D66C','#8493A0'];
    var $Teacher_hot_icon = $('#hall .Teacher_hot .hot_icon');
    $Teacher_hot_icon.each(function(index){
        $(this).css('backgroundColor', $Teacher_hot_icon_colors[index]);
    });
});

// 导航选择
$(function(){
    var $Scenario = $('#service .Scenario > li');
    var $Role = $('#service .Role > li');
    var $Class = $('#service .Class > li');
    var $Mode = $('#service .Mode > li');
    $Scenario.click(function(){
        $(this).addClass('Scenario_Nav_style').siblings().removeClass('Scenario_Nav_style');
    });
    $Role.click(function(){
        $(this).addClass('Role_Nav_style').siblings().removeClass('Role_Nav_style');
    });
    $Class.click(function(){
        $(this).addClass('Class_Nav_style').siblings().removeClass('Class_Nav_style');
    });
    $Mode.click(function(){
        $(this).addClass('Mode_Nav_style').siblings().removeClass('Mode_Nav_style');
    });
});