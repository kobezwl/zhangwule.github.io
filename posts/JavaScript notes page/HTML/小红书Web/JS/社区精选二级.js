// 无缝轮播图

let Carousel = {
    item: document.querySelector( 'div#main > div#carousel > div.carousel-inner > ul.container' ),
    itemList: document.querySelectorAll( 'div#main > div#carousel > div.carousel-inner > ul.container > li' ),
    indicator: document.querySelectorAll( 'div#main > div#carousel > ul.indicator > li' ),
    arrowLeft: document.querySelector( 'div#main > div#carousel > div.carousel-inner > div.left' ),
    arrowRight: document.querySelector( 'div#main > div#carousel > div.carousel-inner > div.right' ),
};
let size = Carousel.itemList[0].getBoundingClientRect().width;

API.banner.set( Carousel.item, Carousel.itemList, Carousel.indicator, size, 'div#main > div#carousel > ul.indicator > li.active' );
API.banner.init();
API.banner.clickCut();
Carousel.arrowLeft.addEventListener( 'click', function() {
    API.banner.leftNext( Carousel.itemList.length );
} );
Carousel.arrowRight.addEventListener( 'click', function() {
    API.banner.rightNext( Carousel.itemList.length );
} );




// 粘性定位
let sticky = {
    item: document.querySelector( 'div#main > div#carousel > div.pull > div.notes' ),
    attach: document.querySelectorAll( 'div#main > div#carousel > div.pull > div.notes > div.notes-text > div.item > a' )
}

function viscous() {
    let top = sticky.item.offsetTop;
    window.addEventListener( 'scroll', function() {
        if ( document.documentElement.scrollTop + 50 >= top ) {
            sticky.item.style.position = 'fixed';
            sticky.item.style.top = '51px';
            sticky.attach.forEach( item => {
                item.style.marginRight = '10px';
            } );
        }
        else {
            sticky.item.style.position = 'relative';
            sticky.item.style.top = '0px';
        }
    } );
}
viscous();