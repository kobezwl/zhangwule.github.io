'use strict';

// 背景图片随时间变化
{
    let thisTimeHour = new Date().toTimeString().slice( 0, 2 ).split( ':' ).join( '' );
    let bgImg = document.querySelector( '#bg-img' );
    let siteInfo = document.querySelector( '#site-info' );
    let footer = document.querySelector( '#page-footer' );

    if ( thisTimeHour < 12 ) {
        bgImg.style.backgroundImage = `url( './image/background/城市白天.png' )`;
        siteInfo.style.color = '#000000';
        footer.style.backgroundImage = `url( './image/background/城市白天.png' )`;
    }
    else {
        bgImg.style.backgroundImage = `url( './image/background/城市夕阳.png' )`;
        siteInfo.style.color = '#ffffff';
        footer.style.backgroundImage = `url( './image/background/城市夕阳.png' )`;
    }
}