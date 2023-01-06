'use strict';

// --- 传送导航 ---
{
    // 回到顶部
    {
        let returnTop = document.querySelector( '#elevator .return-top i' );
        let page = document.querySelector( '#page' );
        function toTop() {
            page.scrollTo( 0, 0 );
        }
        returnTop.addEventListener( 'click', toTop );
    }

    // 分享网址
    {
        let share = document.querySelector( '#elevator .share i' );
        let shareLink = document.querySelector( '#elevator .input-share-link-text' );
        let shareHint = document.querySelector( '#elevator .share-hint' );
        let timer = null;
        let flag = true;
        share.addEventListener( 'click', function() {
            if ( flag ) {
                shareLink.select();
                // document.execCommand("copy");
                navigator.clipboard.writeText( shareLink.value )
                shareHint.classList.add( 'share-hint-show' );
                flag = false;
                timer = setTimeout( () => {
                    shareHint.classList.remove( 'share-hint-show' );
                    flag = true;
                }, 2500 );
            }
            else {
                return false;
            }
        } );
    }

    // config 显示隐藏
    {
        let setting = document.querySelector( '#elevator .setting i' );
        let config = document.querySelector( '#elevator #config' );
        function configToggle() {
            if ( getComputedStyle( config, null ).opacity === '0' ) {
                config.style.transform = 'translateX( 0px )';
                config.style.opacity = '1';
            }
            else {
                config.style.transform = 'translateX( 30px )';
                config.style.opacity = '0';
            }
        }
        setting.addEventListener( 'click', configToggle );
    }

    // 深浅色模式切换 ( 可优化 )
    {
        let dayNightToggle = document.querySelector( '#config .day-night-toggle i' );
        let page_header = document.querySelector( '#page-header' );
        let menu_content = document.querySelector( '.menus .menu-content' );
        let page_main = document.querySelector( '#page-main' );
        let card_items = document.querySelectorAll( '#page-main .card' );
        let site_data = document.querySelector( '.author-card .site-data' );
        let post_items = document.querySelectorAll( '#page-main .post-item' );
        let page_footer = document.querySelector( '#page footer' );
        let flag = true;
        function colorToggle() {
            function multipleToggle( elements ) {
                elements.forEach( item => {
                    if ( flag ) {
                        item.style.backgroundColor = '#121212';
                        item.style.color = '#ffffff';
                    }
                    else {
                        item.style.backgroundColor = '#ffffff';
                        item.style.color = '#121212';
                    }
                } );
            }
            function darkColor() {
                page_header.style.backgroundColor = 'rgba( 0, 0, 0, 0.25 )';
                menu_content.style.backgroundColor = '#121212';
                menu_content.style.color = '#ffffff';
                page_main.style.backgroundColor = 'rgba( 0, 0, 0, 0.5 )';
                site_data.style.color = '#ffffff';
                page_footer.style.color = '#121212';
                multipleToggle( card_items );
                multipleToggle( post_items );
                dayNightToggle.className = 'icon-nightmode-fill iconfont';
            }
            function lightColor() {
                page_header.style.backgroundColor = 'transparent';
                menu_content.style.backgroundColor = '#ffffff';
                menu_content.style.color = '#4c4948';
                page_main.style.backgroundColor = 'rgba( 255, 255, 255, 0.5 )';
                site_data.style.color = '#4c4948';
                page_footer.style.color = '#ffffff';
                multipleToggle( card_items );
                multipleToggle( post_items );
                dayNightToggle.className = 'icon-Daytimemode-fill iconfont';
            }
            if ( flag ) {
                darkColor();
                flag = false;
            }
            else {
                lightColor();
                flag = true;
            }
        }
        dayNightToggle.addEventListener( 'click', colorToggle );
    }

    const TempAPI = {
        shut: null
    }
    // 切换背景图片
    {
        let bgImgToggle = document.querySelector( '#elevator .bg-img-toggle i' );
        let imageSelect = document.querySelector( '#elevator .bg-img-toggle .image-select' );
        let prepareImg = document.querySelectorAll( '.bg-img-toggle .image-select img' );
        let tempI = document.querySelectorAll( '#elevator i' );
        prepareImg.forEach( item => {
            item.addEventListener( 'click', function() {
                document.documentElement.style.setProperty( '--bg-layer-img', `url( '${ this.src }' )` );
            } );
        } );
        function shutImageSelect() {
            if ( getComputedStyle( imageSelect, null ).display === 'block' ) {
                imageSelect.style.display = 'none';
            }
        }
        bgImgToggle.addEventListener( 'click', function() {
            if ( getComputedStyle( imageSelect, null ).display === 'none' ) {
                imageSelect.style.display = 'block';
            }
            else {
                imageSelect.style.display = 'none';
            }
        } );
        tempI = [...tempI];
        tempI.shift();
        tempI.forEach( item => {
            item.addEventListener( 'click', shutImageSelect );
        } );
        document.querySelector( '#page' ).addEventListener( 'click', shutImageSelect );
        TempAPI.shut = { shutImageSelect };
    }

    // 传送导航显示隐藏
    {
        let elevator = document.querySelector( '#elevator' );
        let page = document.querySelector( '#page' );
        page.addEventListener( 'scroll', function() {
            if ( page.scrollTop >= 264 ) {
                elevator.style.transform = 'translateX( 0px )';
                elevator.style.opacity = '1';
            }
            else {
                elevator.style.transform = 'translateX( 30px )';
                elevator.style.opacity = '0';
            }
            if ( getComputedStyle( elevator, null ).opacity === '0' ) {
                TempAPI.shut.shutImageSelect();
            }
        } );
    }
}
