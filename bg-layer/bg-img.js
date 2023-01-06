'use strict';

// 背景图片随时间变化
{
    let thisTimeHour = new Date().toTimeString().slice( 0, 2 ).split( ':' ).join( '' );
    let bgImg = document.querySelector( '#bg-img' );
    let siteInfo = document.querySelector( '#site-info' );
    let footer = document.querySelector( '#page-footer' );

    if ( thisTimeHour < 12 ) {
        document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-daytime.png' )` );
        // bgImg.style.backgroundImage = `url( './image/background/urban-daytime.png' )`;
        siteInfo.style.color = '#000000';
        // footer.style.backgroundImage = `url( './image/background/urban-daytime.png' )`;
        footer.style.color = '#000000';
    }
    else {
        document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-sunset.png' )` );
        // bgImg.style.backgroundImage = `url( './image/background/urban-sunset.png' )`;
        siteInfo.style.color = '#ffffff';
        // footer.style.backgroundImage = `url( './image/background/urban-sunset.png' )`;
        footer.style.color = '#ffffff';
    }
}