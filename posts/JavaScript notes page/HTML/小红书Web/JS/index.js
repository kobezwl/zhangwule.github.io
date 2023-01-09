// 严格模式
'use strict';



// === === === 文字输入效果 === === ===
{
    let info_active = document.querySelector( '#main > #advert >.advert_l > span.info_active' );

    function textInputEffect() {
        let textArray = [ '我的种草基地', '剁手神器', '手机里的随身手账', '我的生活态度', '品质生活指南', '全世界的好生活' ];
        let n = 0;
        let m = 0;
        let timer = null; 
        timer = setInterval( () => {
            n++;
            info_active.innerHTML = textArray[m].substring( 0, n );
            if( info_active.innerHTML == textArray[m] ){
                m++;
                n = 0;
            }
            if( m == textArray.length){
                m = 0;
            }
        }, 300 );
    }
    textInputEffect();
}



// === === === 无缝轮播图 === === ===
{
    let banner = {
        inner: document.querySelector( '#iPhone .iPhone_r > .banner > .banner-inner' ),
        items: document.querySelectorAll( '#iPhone .iPhone_r > .banner > .banner-inner > div.banner-item' )
    }
    let curIndex = 0;
    let count = banner.items.length;
    let timer = null;

    function moveTo( index ) {
        banner.inner.style.transform = `translateX( -${ index * 355 }px )`;
        banner.inner.style.transition = '0.5s';
        curIndex = index;
    }

    let last = banner.inner.lastElementChild.cloneNode( true );
    function init () {
        banner.inner.insertBefore( last, banner.inner.firstElementChild );
        last.style.position = 'absolute';
        last.style.opacity = 0;
        last.style.transform = 'translateX( -355px )';
        let initWidth = ( banner.items.length + 1 ) * 355;
        banner.inner.style.width = initWidth + 'px';
    }
    init();

    function Next () {
        last.style.opacity = 1;
        if ( curIndex === count - 1 ) {
            // console.log( 'getting' );
            banner.inner.style.transform = `translateX( ${ 355 }px )`;
            banner.inner.style.transition = 'none';
            banner.inner.clientHeight;
            moveTo( 0 );
        }
        else {
            moveTo( curIndex + 1 );
        }
    }

    // 进度条显示
    let progress = {
        list: document.querySelectorAll( '#iPhone .iPhone_l > .box > .item > .item__list' ),
        serial: document.querySelectorAll( '#iPhone .iPhone_l > .box > .item > .item__list > .serial' ),
        title: document.querySelectorAll( '#iPhone .iPhone_l > .box > .item .content > .title' ),
        strip: document.querySelectorAll( '#iPhone .iPhone_l > .box > .item .content > .strip' ),
        active: document.querySelectorAll( '#iPhone .iPhone_l > .box > .item .content > .strip > i.long' )
    }
    let index = 0;

    function progressBar( index ) {
        for ( let i = 0; i < progress.list.length; i++ ) {
            progress.serial[i].style.marginTop = '15px';
            progress.title[i].style.fontSize = '20px';
            progress.strip[i].style.width = '100px';
            progress.active[i].style.width = '0px';
            progress.active[i].style.transition = 'all 0.5s ease';
        }
        progress.serial[index].style.marginTop = '30px';
        progress.title[index].style.fontSize = '40px';
        progress.strip[index].style.width = '200px';
        progress.active[index].style.width = '200px';
        progress.active[index].style.transition = 'all 2s ease-in-out';
    }
    // 初始化
    progressBar( index );

    // 轮动
    timer = setInterval( () => {
        Next ();
        index++;
        if ( index === progress.list.length ) {
            index = 0;
        }
        progressBar( index );
    }, 2000 );
}



// === === === 随机图片 === === ===
{
    // 项目主体
    let itemContent = document.querySelectorAll( '#random > a.picture' );
    // 遮罩层
    let coverUpLayer = document.querySelectorAll( '#random > a.picture > div.Cover-up-layer' );
    // 图片空位
    let emptyImg = document.querySelectorAll( '#random > a.picture div.image > img' );
    // 准备图片
    let prepareImg = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '010', '011' ];
    // 要用的图片
    let useImg = [];
    // 正则表达式
    let reg = /\d+/gi;
    // 定时器
    let timer = null;
    // 防抖
    let shake = null;

    function randomPicture() {
        // 找到要用的图片
        for ( let i = 0; i < 5; i++ ) {
            let sequence = prepareImg[ API.random.random() ];
            if ( useImg.includes( sequence ) == false ) {
                useImg.push( sequence );
            }
            else {
                i = i - 1;
            }
        }
        // 将图片放到 dom 中
        emptyImg.forEach( ( item, index ) => {
            let src = item.getAttribute( 'src' );
            item.setAttribute( 'src', src.split( reg ).join( useImg[index] ) );
        } );
        // 重置
        useImg = [];
    }
    // 先格式化一次
    randomPicture();
    // 关闭遮罩层
    coverUpLayer.forEach( ( item ) => {
        item.style.display = 'none';
    } );

    // 执行随机
    function performTimer() {
        timer = setInterval( () => {
            randomPicture();
            console.log( 'ending' );
        }, 3000 );
    }
    performTimer();

    // 悬浮效果
    itemContent.forEach( ( item, index ) => {
        hover( item, function() {
            coverUpLayer[index].style.backgroundColor = 'rgba( 0, 0, 0, 0.3 )';
            coverUpLayer[index].style.display = 'block';
            clearInterval( timer );
        }, function() {
            coverUpLayer[index].style.display = 'none';
            performTimer();
            // clearTimeout( shake );
        } );
    } );
}





// 测试按钮
// let test_btn = document.querySelector( '#test-btn' );
// test_btn.addEventListener( 'click', function() {
    // coverUpLayer.forEach( item => {
    //     item.style.backgroundColor = 'rgba( 0, 0, 0, 0.3 )';
    // } );
// } );









// width: 220px;
// height: 338px;
// background: #000;
// opacity: 0.3;
// position: absolute;
// top: 0;
// left: 0;
// display: none;