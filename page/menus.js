import * as api from "../module/module.js";
// console.log( api );

// 侧边栏菜单
{
    let sidebarSwitch = document.querySelector( '#head-nav .sidebar-switch' );
    let maskLayer = document.querySelector( '#head-nav .mask-layer' );
    let sidebar  = document.querySelector( '#head-nav .menu-content' );

    function unfoldSidebar() {
        maskLayer.style.opacity = '1';
        sidebar.style.opacity = '1';
        maskLayer.style.pointerEvents = 'auto';
        // sidebar.style.transform = 'translateX( 0px )';
        sidebar.style.right = '-17px';
        page.style.overflowY = 'hidden';
    }
    function shutSidebar() {
        maskLayer.style.opacity = '0';
        sidebar.style.opacity = '0';
        maskLayer.style.pointerEvents = 'none';
        // sidebar.style.transform = 'translateX( 300px )';
        sidebar.style.right = '-320px';
        page.style.overflowY = 'auto';
    }
    sidebarSwitch.addEventListener( 'click', unfoldSidebar );
    maskLayer.addEventListener( 'click', shutSidebar );
}



{
    // 装饰条
    let decoration = document.querySelector( '#page .menus .decoration' );
    let star = createStar();
    // star = [ ...star ];
    let timer = null;

    function createStar() {
        for ( let i = 0; i < Math.floor( decoration.clientWidth / 24 ) + 2; i++ ) {
            let star = document.createElement( 'i' );
            star.classList.add( 'icon-star', 'iconfont', 'star' );
            decoration.appendChild( star );
        }
        return document.querySelectorAll( '#page .menus .decoration .star' );
    }

    let prevIndex = 0;
    function shake() {
        let index = api.random( 1, star.length - 2 );
        star.forEach( item => {
            item.classList.remove( 'shakeStar' );
        } );
        if ( prevIndex === index ) {
            index = api.random( 1, star.length - 2 );
        }
        star[index].classList.add( 'shakeStar' );
        prevIndex = index;
    }
    timer = setInterval( () => {
        shake();
    }, 3000 );
}