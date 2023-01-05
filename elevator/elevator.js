'use strict';

// 传送导航

// config 显示隐藏
{
    let setting = document.querySelector( '#elevator .setting' );
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

// 分享网址
{
    let share = document.querySelector( '#elevator .share' );
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