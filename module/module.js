'use strict';

export { random, hover, tab, SeamlessShow, getCountDown }

// 生成随机数 random( x, y )
function random( x = 0, y = 3 ) {
    let min = Math.floor( Math.min( x, y ) );
    let max = Math.floor( Math.max( x, y ) );
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
/*
    使用: 
        api.random( x, y );
        返回 [ x, y ] 的随机数, 默认为 [ 0, 3 ] 之间
*/



// hover
function hover( item, fn1, fn2 ) {
    // 移入
    item.onmouseenter = function() {
        fn1.call( item );
    }
    // item.addEventListener( 'mouseenter', fn1.call( item ) );
    // 移出
    item.onmouseleave = function() {
        fn2.call( item );
    }
    // item.addEventListener( 'mouseleave', fn2.call( item ) );
}
/*
    使用: 
        api.hover( 作用对象, 回调函数1, 回调函数2 );
*/



// tab 选项卡
function tab( info ) {
    let lastIndex = 0;
    info.type = info.type == '' ? 'default' : info.type ;
    if ( info.type !== 'default' && info.type !== 'vertical-shift' && info.type !== 'level-shift' ) {
        throw new Error( `info.type 类型参数错误, 不可为"${info.type}", 请选择"default"、"vertical-shift"、"level-shift"中的一种` );
    }
    info.head.forEach( ( item, index ) => {
        item.addEventListener( info.event, function() {
            const map = {
                'default': () => {
                    info.head.forEach( ( element, index ) => {
                        element.classList.remove( info.headTagName );
                        info.body[index].classList.remove( info.bodyTagName );
                    } );
                    item.classList.add( info.headTagName );
                    info.body[index].classList.add( info.bodyTagName )
                }, 
                'level-shift': () => {
                    info.head.forEach( element => {
                        element.classList.remove( info.headTagName );
                    } );
                    item.classList.add( info.headTagName );
                    info.cont.style.transition = `all 0.3s linear`;
                    // info.cont.style.transition = `all 0.${ 2 + Math.abs( lastIndex - index ) }s linear`;
                    info.cont.style.transform = `translateX( -${ index * info.itemWidth }px )`;
                    lastIndex = index;
                }, 
                'vertical-shift': () => {
                    info.head.forEach( element => {
                        element.classList.remove( info.headTagName );
                    } );
                    item.classList.add( info.headTagName );
                    info.cont.style.transform = `translateY( -${ index * info.itemHeight }px )`;
                }
            }
            map[ info.type ]();
        } );
    } );
}
/*
    使用: 
    let info = {
        type: 'default',    // tab 类型 'default', 'vertical-shift', 'level-shift'
        event: 'click', // 触发事件
        head: document.querySelectorAll( '' ),    // tab 导航列表
        body: document.querySelectorAll( '' ),    // tab 切换内容
        // cont: document.querySelector( '' ),    // ( 'vertical-shift' || 'level-shift' )
        headTagName: '',    // 导航标签样式名字
        bodyTagName: '',    // 内容标签样式名字 ( 'default' )
        itemHeight: 250,    // 每个项目高度 ( 'vertical-shift' )
        itemWidth: 600    // 每个项目宽度 ( 'level-shift' )
    };

    api.tab( info );
*/



// 无缝轮播图
class SeamlessShow {
    constructor( banner ) {
        this.banner = banner;
        this.init();
    }

    // 改变位置
    moveTo( index ) {
        this.banner.container.style.transform = `translateX( -${ index * this.banner.size }px )`;
        this.banner.container.style.transition = this.banner.transition;
        if ( this.banner.active ) {
            // 获取 .active
            let active = document.querySelector( '.active' );
            // 删除类名, 并为当前指示器添加 .active
            active.classList.remove( 'active' );
            // console.log( banner.indicator[index] );
            this.banner.indicator[index].classList.add( 'active' );
        }
        // 将计数器更新为 index
        this.banner.curIndex = index;
        return `moveTo(${index})`;
    }

    // 初始化
    init() {
        // 创建两个 dom 元素, 第一的 li, 和最后一个 li
        let first = this.banner.container.firstElementChild.cloneNode( true );
        let last = this.banner.container.lastElementChild.cloneNode( true );
        // 添加到 dom 里, first 放到最后, last 放到第一
        this.banner.container.appendChild( first );
        this.banner.container.insertBefore( last, this.banner.container.firstElementChild );
        // 设置 last 位置
        last.style.position = 'absolute';
        last.style.left = `-${ this.banner.size }px`;
        // last.style.transform = `translateX( -${ this.banner.size }px )`;
        if ( this.banner.isZoom ) {
            let second = this.banner.container.children[2].cloneNode( true );
            let last_second = this.banner.container.children[ this.banner.items.length - 1 ].cloneNode( true );
            this.banner.container.appendChild( second );
            this.banner.container.insertBefore( last_second, this.banner.container.firstElementChild );
            last_second.style.position = 'absolute';
            last_second.style.left = `-${ this.banner.size * 2 }px`;
        }
        // 改变 container 宽度
        let initWidth = ( this.banner.items.length + 2 ) * this.banner.size;
        this.banner.container.style.width = initWidth + 'px';

        // 执行自动播放
        if ( this.banner.autoplay == undefined ) {
            return false;
        }
        if ( this.banner.autoplay.isAutoplay ) {
            this.autoplay( this.banner.autoplay.intervalTime );
            return '自动播放已执行';
        }

        return 'init() 初始化已完成';
    }

    // 切换
    leftNext() {
        if ( this.banner.curIndex === 0 ) {
            this.banner.container.style.transform = `translateX( -${ this.banner.items.length * this.banner.size }px )`;
            this.banner.container.style.transition = 'none';
            this.banner.container.clientHeight;
            this.moveTo( this.banner.items.length - 1 );
        }
        else {
            this.moveTo( this.banner.curIndex - 1 );
        }
    }
    rightNext() {
        if ( this.banner.curIndex === this.banner.items.length - 1 ) {
            this.banner.container.style.transform = `translateX( ${ this.banner.size }px )`;
            this.banner.container.style.transition = 'none';
            this.banner.container.clientHeight;
            this.moveTo( 0 );
        }
        else {
            this.moveTo( this.banner.curIndex + 1 );
        }
    }

    // 自动播放
    autoplay( time ) {
        this.banner.timer = setInterval( () => {
            this.rightNext();
        }, time );
    }
}
/*
    // 使用: 
    let banner = {
        container: document.querySelector(), // ul
        items: document.querySelectorAll(), // ul li
        active: true, // 是否有指示器
        indicator: document.querySelectorAll(), // 指示器 li
        arrowLeft: document.querySelector(), // 左箭头
        arrowRight: document.querySelector(), // 右箭头
        size: 590, // 单个尺寸
        transition: '0.5s ease', // 过渡效果
        curIndex: 0, // index 初始
        timer: null, // 定时器 初始
        autoplay: {
            isAutoplay: true, // 是否自动播放
            intervalTime: 3000 // 间隔时间
        }, 
        stopElement: document.querySelector(), // 悬浮暂停元素
        isZoom: true // 是否前后创建两个
    }

    // 实例化
    let seamless = new api.SeamlessShow( banner );

    // 绑定事件
    banner.arrowLeft.addEventListener( 'click', function() {
        seamless.leftNext();
    } );
    banner.arrowRight.addEventListener( 'click', function() {
        seamless.rightNext();
    } );

    // 悬浮暂停
    api.hover( banner.stopElement, function() {
        // console.log( '移入, stop! ' );
        clearInterval( banner.timer );
    }, function() {
        // console.log( '移出, start! ' );
        seamless.autoplay( banner.autoplay.intervalTime );
    } );
*/



// 倒计时
function getCountDown( ...deadlineInfo ) {
    let deadline = new Date( deadlineInfo[0], deadlineInfo[1] - 1, deadlineInfo[2], deadlineInfo[3], deadlineInfo[4], deadlineInfo[5] );

    let deadlineStamp = deadline.getTime();
    let thisTime = new Date();
    let thisTimeStamp = thisTime.getTime();
    let differStamp = deadlineStamp - thisTimeStamp;

    // console.log( differStamp < 0 );
    // 判断是否小于当前时间
    if ( differStamp < 0 ) {
        return false;
    }

    // 总秒数
    let differSec = differStamp / 1000;
    // 计算小时
    let Hours = parseInt( differSec / 60 / 60 % 24 );
    // 计算分钟
    let Minute = parseInt( differSec / 60 % 60 );
    // 计算秒钟
    let Sec = parseInt( differSec % 60 );

    // 格式化函数
    function formatting( time ) {
        return time < 10 ? '0' + time : time;
    }
    Hours = formatting( Hours );
    Minute = formatting( Minute );
    Sec = formatting( Sec );

    // 返回值
    return {
        time_H: Hours, 
        time_M: Minute, 
        time_S: Sec
    };
}
/*
    // 使用: 
    api.getCountDown( '年', '月', '日', '时', '分', '秒' );
*/