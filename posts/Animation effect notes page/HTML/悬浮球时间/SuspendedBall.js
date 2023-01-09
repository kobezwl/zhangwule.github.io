// =================================================================
// 获取时间
$(function(){
    var $thisTimeUl = $('#SuspendedBallContainer .SuspendedBallThisTime');
    var $thisTimeLi = $('#SuspendedBallContainer .SuspendedBallThisTime > li');
    var $SuspendedBallCheckBox = $('#SuspendedBallContainer .SuspendedBallCheckBox');
    var timer = null;
    $(function clockOn(){
        $thisTime = new Date();
        var $Year = $thisTime.getFullYear();
        var $Months = $thisTime.getMonth();    // 月
        var $Days = $thisTime.getDate();    // 日
        var $Hours = $thisTime.getHours();    // 小时
        var $Minutes = $thisTime.getMinutes();    // 分钟
        var $Seconds = $thisTime.getSeconds();    // 秒
        var $thisMonths = $Months + 1;
        var $Week = new Date($Year, $Months, 1).getDay();
        var $Weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日',];

        if(eval($thisMonths) < 10){
            $thisMonths = "0" + $thisMonths;
        }
        if(eval($Days) < 10){
            $Days = "0" + $Days;
        }
        if(eval($Hours) < 10){
            $Hours = "0" + $Hours;
        }
        if(eval($Minutes) < 10){
            $Minutes = "0" + $Minutes;
        }
        if(eval($Seconds) < 10){
            $Seconds = "0" + $Seconds;
        }
        $('#SuspendedBallContainer .SuspendedBallThisTime li:eq(0)').empty().append($thisMonths);
        $('#SuspendedBallContainer .SuspendedBallThisTime li:eq(2)').text($Days);
        $('#SuspendedBallContainer .SuspendedBallThisTime li:eq(4)').empty().append($Weeks[$Week - 1]);
        $('#SuspendedBallContainer .SuspendedBallThisTime li:eq(6)').empty().append($Hours);
        $('#SuspendedBallContainer .SuspendedBallThisTime li:eq(8)').empty().append($Minutes);
        $('#SuspendedBallContainer .SuspendedBallThisTime li:eq(10)').empty().append($Seconds);
        // $('#SuspendedBallContainer .SuspendedBallSS').empty().append($Hours);
        // $('#SuspendedBallContainer .SuspendedBallSS').empty().append($Minutes);
        $('#SuspendedBallContainer .SuspendedBallSS').empty().append($Seconds);
        if($thisTimeLi.is(':hidden')){
            // $('#SuspendedBallContainer .SuspendedBallSS').empty().append($Hours);
            // $('#SuspendedBallContainer .SuspendedBallSS').empty().append($Minutes);
            $('#SuspendedBallContainer .SuspendedBallSS').empty().append($Seconds);
        }else{
            $('#SuspendedBallContainer .SuspendedBallSS').empty();
        }

        // 想实现展开执行计时器，收起关闭计时器，防止占用线程，或导致栈内存过度占用
        // var timer = setTimeout(clockOn(), 200);
        // $(function showHide(){
        //     console.log($thisTimeLi.is(':hidden'));
        //     var Door = setTimeout(() => {
        //         showHide();
        //     }, 1000);
        // });

        var i = 0;
        var Stop = $('#Stop');
        var Restart = $('#Restart');
        var $Door = false;    // 门
        // var timers = setInterval(function(){
        //     i++;
        //     console.log($thisTimeLi.is(':hidden'));
        // // }, 1000);
        // Stop.click(function(){
        //     clearInterval(timers);
        // });
        // Restart.click(function(){
        //     timers = setInterval(function(){
        //         i++;
        //         console.log($thisTimeLi.is(':hidden'));
        //     }, 1000);
        // });
        // $SuspendedBallCheckBox.click(function(){
        //     if($thisTimeLi.is(':hidden')){
        //         var $Door = false;    // 门
        //     }else{
        //         var $Door = true;    // 门
        //     }
        // });

        timer = setInterval(function(){
            clockOn();
        }, 200);
        // clearInterval(timer);
        // console.log('-----');
        // if($Door){
        //     timer = setInterval(function(){
        //         clockOn();
        //         console.log('1111');
        //     }, 200);
        // }else{
        //     clearInterval(timer);
        //     console.log('0000');
        // }
        // console.log($thisTimeUl.css("width") == '180px');
        // return clockOn();
        // ==== 计数器 ====
        // var add = (function(){
        // var counter = 0;
        //     return function(){
        //         return counter += 1;
        //     }
        // })();
        // $SuspendedBallCheckBox.click(function(){
        //     if(add() % 2 != 0){
        //         // console.log("已展开");
        //         timer = setInterval(function(){
        //             clockOn();
        //         }, 200);
        //     }else{
        //         // console.log("已收起");
        //         clearInterval(timer);
        //     }
        //     // console.log(add());
        // });
    });
});

// =================================================================
// 实现可移动效果
$(function(){
    // 鼠标抬起事件
    $(document).mouseup(function (e) {
        $(document).off("mousemove");
    });
    // ======== 改变 SuspendedBallContainer 的位置 ========
    // 获得要移动DOM
    var $SuspendedBallContainer = $("#SuspendedBallContainer");    // 第一个
    // 存放数据的对象
    var $obj = {};    // {}是空的对象，是 new Object();的简写
    $SuspendedBallContainer.mousedown(function(e){    // 鼠标按下瞬间
        // 获得鼠标偏移量
        $obj.left = e.pageX;
        $obj.top = e.pageY;
        // 获取container初始位置
        $obj.sPositionX = $(this).position().left;
        $obj.sPositionY = $(this).position().top;
        // 鼠标移动事件
        $(document).mousemove(function(e){    // 鼠标移动触发
            // 新的偏移位置
            $obj.newleft = e.pageX;
            $obj.newtop = e.pageY;
            // 偏移量
            $obj.x = $obj.newleft - $obj.left;
            $obj.y = $obj.newtop - $obj.top;
            // $SuspendedBallContainer 新的位置
            $obj.newPositionX = $obj.sPositionX + $obj.x;
            $obj.newPositionY = $obj.sPositionY + $obj.y;
            console.log($SuspendedBallCheckBox);
            $SuspendedBallCheckBox.css({
                zIndex: '-1',
            });
            // 鼠标抬起事件
            $(document).mouseup(function (e) {
                $(document).off("mousemove");
                $SuspendedBallCheckBox.css({
                    zIndex: '',
                });
            });

            // ======== 位置限制 $SuspendedBallContainer 改变的位置 ========
            // 上限制
            if($obj.newPositionY <= 0){
                // 当上边的偏移量小于0的时候，就是上边的临界点，就让新的位置为0
                $obj.newPositionY = 0;
            }
            // 右限制
            if($obj.newPositionX > $('body').width() - $SuspendedBallContainer.width() + 5){
                $obj.newPositionX = $('body').width() - $SuspendedBallContainer.width() + 5;
            }
            // 下限制
            if($obj.newPositionY > $('body').height() - $SuspendedBallContainer.height() + 5){    //  - $SuspendedBallContainer.height()
                // 如果向下的偏移量大于文档对象的高度减去自身的高度，就让它等于这个高度
                $obj.newPositionY = $('body').height() - $SuspendedBallContainer.height() + 5;    //  - $SuspendedBallContainer.height()
            }
            // 左限制
            if($obj.newPositionX < - $SuspendedBallContainer.width() + 5){
                // 左边的偏移量小于0的时候设置 左边的位置为0
                $obj.newPositionX = - $SuspendedBallContainer.width() + 5;
            }

            // 改变 $SuspendedBallContainer 的位置
            $SuspendedBallContainer.css({
                left: $obj.newPositionX + "px",
                top: $obj.newPositionY + "px",
            });
            // 鼠标抬起事件
            $(document).mouseup(function (e) {
                $(document).off("mousemove");
            });
        });
    });

    // =================================================================
    // 实现一些显示隐藏
    var $SuspendedBallCheckBox = $('#SuspendedBallContainer .SuspendedBallCheckBox');
    var $thisTimeLi = $('#SuspendedBallContainer .SuspendedBallThisTime > li');
    // var $boxIn = $('#SuspendedBallContainer .icon_1');
    // var $boxOut = $('#SuspendedBallContainer .icon_2');
    // var $In = $('#SuspendedBallContainer .icon_1 > i');
    // var $Out = $('#SuspendedBallContainer .icon_2 > i');
    // var $angle = ('360deg');
    // $thisTimeLi.hide();
    $(function(){
        $SuspendedBallCheckBox.click(function(){
            if($thisTimeLi.is(':hidden')){
                $thisTimeLi.show();    // 300
            }else{
                $thisTimeLi.hide();
            }
            // 右
            if($obj.newPositionX <= $('body').width() && $obj.newPositionX >= $('body').width() - 50){
                $obj.newPositionX = $('body').width() - 230;
                $SuspendedBallContainer.css({
                    left: $obj.newPositionX + "px",
                    top: $obj.newPositionY + "px",
                });
            }
            // 下
            if($obj.newPositionY <= $('body').height() - $SuspendedBallContainer.height() + 5 && $obj.newPositionY > $('body').height() - 50){
                $obj.newPositionY = $('body').height() - $SuspendedBallContainer.height() - 25;
                $SuspendedBallContainer.css({
                    left: $obj.newPositionX + "px",
                    top: $obj.newPositionY + "px",
                });
            }
            // 左
            if($obj.newPositionX >= - $SuspendedBallContainer.width() + 5 && $obj.newPositionX <= 0){
                //左边的偏移量小于0的时候设置 左边的位置为0
                $obj.newPositionX = 0;
                $SuspendedBallContainer.css({
                    left: $obj.newPositionX + "px",
                    top: $obj.newPositionY + "px",
                });
            }
        });
    });
});