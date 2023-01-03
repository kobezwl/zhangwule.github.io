// 背景图片随时间变化
{
    let bgImg = document.querySelector( '#bg-img' );
    let thisTimeHour = new Date().toTimeString().slice( 0, 2 ).split( ':' ).join( '' );

    if ( thisTimeHour > 12 ) {
        bgImg.style.backgroundImage = `url( './image/background/城市夕阳_1.png' )`;
    }
    else {
        bgImg.style.backgroundImage = `url( './image/background/城市白天_1.png' )`;
    }
}