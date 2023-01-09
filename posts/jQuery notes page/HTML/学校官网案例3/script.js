// 下拉菜单
$(function(){
    var $nav_icon = $('#header .headerIcon > ul > li:eq(1)');
    $nav_icon.hover(function(){
        $('.nav_site').toggle();
    });
});

// tab 淡入淡出
$(function(){
    var $system_Nav = $('#system .system_Nav > a');
    var $system_Active = $('#system > .system_Active > div');
    $system_Nav.click(function(){
        $(this).addClass('system_Nav_style').siblings().removeClass('system_Nav_style');
        var index = $(this).index();
        $system_Active.eq(index).fadeIn(600).siblings().fadeOut(600);
    });
});
// 颜色
$(function(){
    var $ActiveL_Color = ['#4E9DE0','#4DABDF','#4EBCE1','#4ED2E1','#4EE0A1','#FFA477','#F28D77','#75ACE2'];
    var $system_ActiveL = $('#system .system_ActiveL > a');
    $system_ActiveL.each(function(index){
        $(this).css('backgroundColor', $ActiveL_Color[index]);
    });
})

// tab
$(function(){
    var $hall_Nav = $('#hall .hall_Nav > div');
    var $hall_Active = $('#hall .hall_Active > div');
    $hall_Nav.click(function(){
        $(this).addClass('hall_Nav_style').siblings().removeClass('hall_Nav_style');
        var index = $(this).index();
        $hall_Active.eq(index).addClass('hall_Active_style').siblings().removeClass('hall_Active_style');
    });
});

// 颜色
$(function(){
    var $hall_Active_Color = ['#81C0E9','#7FD3EB','#85EDCC','#B2E983','#F8C26C','#F9909F'];
    var $hall_Active_a = $('#hall .hall_Active > div:eq(1) > ul > li > a');
    var $hall_Active_li = $('#hall .hall_Active > div:eq(1) > ul > li');
    $hall_Active_a.each(function(index){
        $(this).css('color', $hall_Active_Color[index]);
    });
    $hall_Active_li.each(function(index){
        $(this).css('border-color',$hall_Active_Color[index]);
    });
    $hall_Active_li.hover(
        function(){
            $(this).css('background-color',$(this).css('border-color'));
        },
        function(){
            $(this).css('background-color','');
    })
})