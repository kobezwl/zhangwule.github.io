'use strict';

// 背景图片随时间变化
{
    let thisTimeHour = new Date().toTimeString().slice( 0, 2 ).split( ':' ).join( '' );
    // let bgImg = document.querySelector( '#bg-img' );
    let siteInfo = document.querySelector( '#site-info' );
    let footer = document.querySelector( '#page-footer' );

    if ( thisTimeHour < 12 ) {
        // bgImg.style.backgroundImage = `url( './image/background/urban-daytime.png' )`;
        siteInfo.style.color = '#000000';
        // footer.style.backgroundImage = `url( './image/background/urban-daytime.png' )`;
        footer.style.color = '#000000';
    }
    else {
        // bgImg.style.backgroundImage = `url( './image/background/urban-sunset.png' )`;
        siteInfo.style.color = '#ffffff';
        // footer.style.backgroundImage = `url( './image/background/urban-sunset.png' )`;
        footer.style.color = '#ffffff';
    }
    function bgImgChange( time ) {
        // if ( time === 5 || time === 6 || time === 7 ) {
        //     document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-sunset.png' )` );
        // }
        if ( time === 6 || time === 7 || time === 8 || time === 9 || time === 10 || time === 11 ) {
            document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-daytime.png' )` );
        }
        else if (  time === 12 || time === 13 || time === 14 ) {
            document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-sunset_3.png' )` );
        }
        else if ( time === 15 || time === 16 || time === 17 || time === 18 ) {
            document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-sky.png' )` );
        }
        else if ( time === 19 || time === 20 || time === 21 ) {
            document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-night_3.png' )` );
        }
        else{
            document.documentElement.style.setProperty( '--bg-layer-img', `url( '../image/background/urban-night_2.png' )` );
        }
    }
    bgImgChange( thisTimeHour );
}