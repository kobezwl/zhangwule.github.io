import * as api from "./module.js";

// 下拉菜单
{
    let dropDown_td = [];
    let dropDown_dd = [];

    let locationBox = document.querySelector( '#nav .location' );
    let optional = document.querySelector( '#nav .optional_location' );
    let UserInfo = document.querySelector( '#nav .Info .UserInfo' );
    let UserDropDown = document.querySelector( '#nav .Info .UserInfo .User_DropDown' );
    let navList_td = document.querySelectorAll( '#nav .Info ul.nav-list > li.dropDown_td' );
    let navList_dd = document.querySelectorAll( '#nav .Info ul.nav-list > li.dropDown_td .dd' );
    let cart_td = document.querySelector( '#searchBox .search .search-cont  .shopping-cart' );
    let cart_dd = document.querySelector( '#searchBox .search .search-cont  .shopping-cart .dropDown_dd' );
    let cart_float_td = document.querySelector( '#search-float  .shopping-cart' );
    let cart_float_dd = document.querySelector( '#search-float  .shopping-cart .dropDown_dd' );

    dropDown_td.push( locationBox, UserInfo, ...navList_td, cart_td, cart_float_td );
    dropDown_dd.push( optional, UserDropDown, ...navList_dd, cart_dd, cart_float_dd );
    // console.log( dropDown_td, dropDown_dd );

    for ( let i = 0; i < dropDown_td.length; i++ ) {
        api.hover( dropDown_td[i], function() {
            dropDown_dd[i].style.display = 'block';
        }, function() {
            dropDown_dd[i].style.display = 'none';
        } );
    }
}



// 定位点击切换
{
    // 当前定位盒
    let current = document.querySelector( '#nav .current_location' );
    // 当前定位盒文本
    let currentText = document.querySelector( '#nav .current_location span' );
    // 可选定位项目内容盒
    let optionalItemCont = document.querySelectorAll( '#nav .optional_location .optional_item div.item' );

    optionalItemCont.forEach( item => {
        item.addEventListener( 'click', function() {
            let selectedItem = document.querySelector( '#nav .optional_location .optional_item div.selected' );
            selectedItem.classList.remove( 'selected' );
            this.classList.add( 'selected' );
            currentText.innerHTML = this.childNodes[0].innerHTML;
            current.style.width = currentText.innerHTML.split('').length - 2 ? '70px' : '58px';
            localStorage.setItem( 'location', currentText.innerHTML );
        } );
    } );
}



// 热门搜索切换
{
    // 热门搜索
    let hotHint = document.querySelector( '#searchBox .search .search-hint a.hot-hint' );
    let timer = null;
    let hotHintText = [ '健康防疫！', '爆改电竞房', '家装建材礼' ];
    let i = 1;

    timer = setInterval( () => {
        // console.log( i );
        hotHint.innerHTML = hotHintText[i];
        i++;
        if ( i > hotHintText.length - 1 ) {
            i = 0;
        }
    }, 3000 );
}



// 侧边tab
{
    let columnList = document.querySelector( '.columnList' );
    let columnNav = document.querySelectorAll( '.columnNav li' );
    let columnCont = document.querySelector( '.columnCont' );
    let columnItem = document.querySelectorAll( '.columnCont div.columnItem' );

    function clearStyle() {
        columnItem.forEach( Item => {
            Item.style.display = 'none';
        } );
        document.querySelectorAll( '.columnNav_li' ).forEach( itemLi => {
            itemLi.classList.remove( 'columnNav_li' );
        } );
    }
    columnNav.forEach( ( item, index ) => {
        item.addEventListener( 'mouseenter', function() {
            clearStyle();
            item.classList.add( 'columnNav_li' );
            columnCont.style.display = 'block';
            columnItem[index].style.display = 'block';
        } );
    } );
    columnList.addEventListener( 'mouseleave', function() {
        clearStyle();
        columnCont.style.display = 'none';
    } );
}



// 无缝轮播图
{
    // --- banner_L ---
    let banner = {
        container: document.querySelector( '.banner_L .banner-container' ),
        items: document.querySelectorAll( '.banner_L .banner-container li' ),
        active: true, 
        indicator: document.querySelectorAll( '.banner_L .banner-indicator li' ), 
        arrowLeft: document.querySelector( '.banner_L > .left' ), 
        arrowRight: document.querySelector( '.banner_L > .right' ), 
        size: 590, 
        transition: '0.5s ease',
        curIndex: 0, 
        timer: null, 
        autoplay: {
            isAutoplay: true, 
            intervalTime: 3000
        } ,
        stopElement: document.querySelector( '.banner_L' )
    }

    // 实例化
    let seamlessBanner = new api.SeamlessShow( banner );

    // 绑定事件
    banner.indicator.forEach( function ( item, index ) {
        // 防抖节流
        let timer_copy = null;
        api.hover( item, function() {
            timer_copy = setTimeout( function() {
                seamlessBanner.moveTo( index );
            }, 30 );
        }, function() {
            clearTimeout( timer_copy );
        } );
    } );
    banner.arrowLeft.addEventListener( 'click', function() {
        seamlessBanner.leftNext();
    } );
    banner.arrowRight.addEventListener( 'click', function() {
        seamlessBanner.rightNext();
    } );

    // 悬浮暂停
    api.hover( banner.stopElement, function() {
        // console.log( '移入, stop! ' );
        clearInterval( banner.timer );
    }, function() {
        // console.log( '移出, start! ' );
        seamlessBanner.autoplay( banner.autoplay.intervalTime );
    } );

    // --- banner_R ---
    let banner_copy = {
        container: document.querySelector( '.banner_R .banner-container' ),
        items: document.querySelectorAll( '.banner_R .banner-container li' ),
        active: false, 
        arrowLeft: document.querySelector( '.banner_R > .left' ), 
        arrowRight: document.querySelector( '.banner_R > .right' ), 
        size: 190, 
        transition: '0.5s ease',
        curIndex: 0, 
        timer: null, 
        autoplay: {
            isAutoplay: true, 
            intervalTime: 9000
        } ,
        stopElement: document.querySelector( '.banner_R' )
    }

    // 实例化
    let seamlessBanner_copy = new api.SeamlessShow( banner_copy );

    // 绑定事件
    banner_copy.arrowLeft.addEventListener( 'click', function() {
        seamlessBanner_copy.leftNext();
    } );
    banner_copy.arrowRight.addEventListener( 'click', function() {
        seamlessBanner_copy.rightNext();
    } );

    // 悬浮暂停
    api.hover( banner_copy.stopElement, function() {
        // console.log( '移入, stop! ' );
        clearInterval( banner_copy.timer );
    }, function() {
        // console.log( '移出, start! ' );
        seamlessBanner_copy.autoplay( banner_copy.autoplay.intervalTime );
    } );

    // --- seckill ---
    let seckill = {
        container: document.querySelector( '.seckill-list ul' ),
        items: document.querySelectorAll( '.seckill-list ul li.seckill-item' ),
        active: false, 
        arrowLeft: document.querySelector( '.seckill-list > .left' ), 
        arrowRight: document.querySelector( '.seckill-list > .right' ), 
        size: 200 * 4, 
        transition: '0.5s ease-in-out',
        curIndex: 0
    }

    // 实例化
    let seamlessSeckill = new api.SeamlessShow( seckill );

    // 绑定事件
    let timer = null;
    function seckill_timer( This ) {
        This.style.pointerEvents = 'none';
        timer = setTimeout( () => {
            This.style.pointerEvents = 'auto';
        }, 500 );
    }
    seckill.arrowLeft.addEventListener( 'click', function() {
        seamlessSeckill.leftNext();
        seckill_timer( this );
    } );
    seckill.arrowRight.addEventListener( 'click', function() {
        seamlessSeckill.rightNext();
        seckill_timer( this );
    } );
}



// 右侧边栏 填充、悬浮
{
    let serviceItem = document.querySelectorAll( '.side-service li.service-item span.icon' );
    let j = 0;
    for ( let i = 0; i < serviceItem.length; i++ ) {
        if ( i % 3 == 0 ) {
            j++;
        }
        serviceItem[i].style.transition = 'none';
        serviceItem[i].style.backgroundPosition = `${ i % 3 * -29 }px ${ ( j - 1 ) * -29 }px`;
        document.body.clientHeight;
        serviceItem[i].style.transition = 'all 0.2s linear';
        api.hover( serviceItem[i].parentNode.parentNode, function() {
            serviceItem[i].style.backgroundImage = "url( './image/icon_hover.jpg' )";
        }, function() {
            serviceItem[i].style.backgroundImage = "url( './image/iconImg.jpg' )";
        } );
    }
}



// 左侧边栏收缩
{
    let sidebarColumn = document.querySelector( '.sidebar-column_add' );
    let sidebarContent = document.querySelector( '.sidebar-content' );
    let shut = document.querySelector( '.sidebar-content span.shut' );
    // let timer = null;

    api.hover( sidebarColumn, function() {
        sidebarContent.style.width = '790px';
    }, function() {
        sidebarContent.style.width = '0px';
    } );
    shut.addEventListener( 'click', function() {
        sidebarContent.style.width = '0px';
    } );
}


// 悬浮提示
{
    let items = document.querySelectorAll( '.seckill-list li.seckill-item a' );
    let hints = document.querySelectorAll( '.seckill-list li.seckill-item a span.item-name' );

    items.forEach( ( item, index ) => {
        item.title = hints[index].innerHTML;
    } );
}



// 倒计时
{
    let time_hour = document.querySelector( '.countdown-main .time_hour' );
    let time_minute = document.querySelector( '.countdown-main .time_minute' );
    let time_second = document.querySelector( '.countdown-main .time_second' );
    let timer = null;

    timer = setInterval( () => {
        let time = api.getCountDown( '2023', '01', '01', '00', '00', '00' );
        time_hour.innerHTML = time.time_H;
        time_minute.innerHTML = time.time_M;
        time_second.innerHTML = time.time_S;
        if ( !time ) {
            time_hour.innerHTML = '00';
            time_minute.innerHTML = '00';
            time_second.innerHTML = '00';
            clearInterval( timer );
            // console.log( 'stop!!!' );
        }
    }, 1000 );
}



// '缩放' 轮播图
{
    let banner = {
        container: document.querySelector( '.newArrival ul' ), // ul
        items: document.querySelectorAll( '.newArrival ul li' ), // ul li
        active: false, // 是否有指示器
        arrowLeft: document.querySelector( '.newArrival .left' ), // 左箭头
        arrowRight: document.querySelector( '.newArrival .right' ), // 右箭头
        size: 130, // 单个尺寸
        transition: 'all 0.4s ease', // 过渡效果
        curIndex: 0, // index 初始
        timer: null, // 定时器 初始
        autoplay: {
            isAutoplay: true, // 是否自动播放
            intervalTime: 5000 // 间隔时间
        }, 
        stopElement: document.querySelector( '.newArrival' ), // 悬浮暂停元素
        isZoom: true // 是否前后创建两个
    }
    let timer = null;
    let seamlessBanner = new api.SeamlessShow( banner );
    banner.items[0].classList.add( 'active' );
    let items = document.querySelectorAll( '.newArrival ul li' );

    function toggleClass() {
        banner.items.forEach( ( item, index ) => {
            item.classList.remove( 'active' );
        } );
        banner.items[ banner.curIndex ].classList.add( 'active' );
        if ( banner.curIndex == 3 ) {
            items[1].classList.add( 'active' );
            items[ items.length - 1 - 1 ].classList.remove( 'active' );
        }
        if ( banner.curIndex == 0 ) {
            items[1].classList.remove( 'active' );
            items[ items.length - 1 - 1 ].classList.add( 'active' );
        }
        if ( banner.curIndex == 2 ) {
            items[ items.length - 1 - 1 ].classList.remove( 'active' );
        }
        if ( banner.curIndex == 1 ) {
            items[1].classList.remove( 'active' );
        }
    }

    if ( banner.autoplay.isAutoplay ) {
        timer = setInterval( () => {
            toggleClass()
        }, banner.autoplay.intervalTime );
    }
    banner.arrowLeft.addEventListener( 'click', function() {
        seamlessBanner.leftNext();
        toggleClass()
    } );
    banner.arrowRight.addEventListener( 'click', function() {
        seamlessBanner.rightNext();
        toggleClass()
    } )

    // 悬浮暂停
    api.hover( banner.stopElement, function() {
        // console.log( '移入, stop! ' );
        clearInterval( banner.timer );
        clearInterval( timer );
    }, function() {
        // console.log( '移出, start! ' );
        seamlessBanner.autoplay( banner.autoplay.intervalTime );
        timer = setInterval( () => {
            toggleClass()
        }, banner.autoplay.intervalTime );
    } );
}



// '寻宝' tab
{
    let info = {
        type: 'default',    // tab 类型 'default', 'level-shift', 'vertical-shift'
        event: 'mouseenter',    // 触发事件
        head: document.querySelectorAll( 'div.seekTreasure ul.tab_head li' ),    // tab 导航列表
        body: document.querySelectorAll( 'div.seekTreasure div.tab_body ul' ),    // tab 切换内容
        headTagName: 'tab_head_active',    // 导航标签样式名字
        bodyTagName: 'tab_body_active',    // 主体标签样式名字
    };

    api.tab( info );
}



// '推荐' tab
{
    let info = {
        type: 'default',    // tab 类型 'default', 'vertical-shift', 'level-shift'
        event: 'click', // 触发事件
        head: document.querySelectorAll( '.recommend-content ul.recommend_tab_head li' ),    // tab 导航列表
        body: document.querySelectorAll( '.recommend-content div.recommend_tab_body div.recommend_tab_box' ),    // tab 切换内容
        headTagName: 'tab_head_active',    // 导航标签样式名字
        bodyTagName: 'tab_body_active',    // 内容标签样式名字 ( 'default' )
    };

    api.tab( info );
// }



// 渲染 '推荐' item
// {
    let itemBox = document.querySelector( '.tab_body_active ul' );
    // console.log( itemBox );


    let tempCount = 0;
    function createItem( count, info, treasure, hot, shop ) {
    // function createItem( count ) {
        info = info ? info : JSON.parse( localStorage.getItem( 'recommendInfo' ) );
        treasure = treasure ? treasure : JSON.parse( localStorage.getItem( 'recommend_treasure_Info' ) );
        hot = hot ? hot : JSON.parse( localStorage.getItem( 'recommend_hot_Info' ) );
        shop = shop ? shop : JSON.parse( localStorage.getItem( 'recommend_shop_Info' ) );

        try {
            info.length
        } catch (error) {
            throw new Error( '终止', info );
        }
        count = count ? count : 0 ;
        let surplus = 0;
        if ( count > info.length ) {
            surplus = count - info.length;
        }
        if ( !tempCount ) {
            tempCount = count;
        }

        for ( let i = 0; i < count - surplus; i++ ) {
            let itemList = itemBox.querySelectorAll( 'li.item' );
            let itemCount = itemList.length + 1;
            let createLi = document.createElement( 'li' );
            createLi.setAttribute( 'data-id', info[i].itemIndxe );
            createLi.classList.add( 'item' );

            if ( itemCount % 30 == 5 || itemCount % 30 == 11 || itemCount % 30 == 23 ) {
                let key = 0;
                switch( itemCount % 30 ) {
                    case 5: 
                        createLi.classList.add( 'treasure-item' );
                        createLi.innerHTML = `
                            <a href="${ treasure[key].link }">
                                <div class="item-img">
                                    <img src="${ treasure[key].imgSrc }" alt="item-img">
                                </div>
                                <div class="item-info">
                                    <p class="info-tag">${ treasure[key].itemInfo.tag }</p>
                                    <p class="info-title">${ treasure[key].itemInfo.title }</p>
                                    <p class="info-slogan">${ treasure[key].itemInfo.slogan }</p>
                                    <div class="info-btn">${ treasure[key].itemInfo.btn }</div>
                                </div>
                            </a>
                        `;
                        break;
                    case 11: 
                        createLi.classList.add( 'hot-item' );
                        createLi.innerHTML = `
                            <div>
                                <p class="hot-title">${ hot[key].itemName }</p>
                                <ul class="hot-list">
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[0] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[1] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[2] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[3] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[4] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[5] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[6] }</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">${ hot[key].hotList[7] }</a>
                                    </li>
                                </ul>
                            </div>
                        `;
                        break;
                    default: 
                        createLi.classList.add( 'shop-item' );
                        createLi.innerHTML = `
                            <div class="item-img">
                                <img src="${ shop[key].imgSrc }" alt="item-img">
                            </div>
                            <div class="item-info">
                                <p class="info-tags">
                                    <span class="tags-tag">${ shop[key].itemInfo.tags[0] }</span>
                                    <span class="tags-slogan">${ shop[key].itemInfo.tags[1] }</span>
                                </p>
                                <p class="info-title">${ shop[key].itemInfo.title }</p>
                                <div class="info-btn">${ shop[key].itemInfo.btn }</div>
                            </div>
                        `;
                }
                // throw new Error( '终止', null );
            }
            else {
                createLi.classList.add( 'ordinary' );
                createLi.innerHTML = `
                    <a href="${ info[i].link }">
                        <div class="item-img">
                            <img src="${ info[i].imgSrc }" alt="item-img">
                        </div>
                        <div class="item-info">
                            <p class="item-name">${ info[i].itemName }</p>
                            <p class="item-price">
                                <i class=" iconfont">¥</i>
                                <span>
                                    ${ info[i].itemPrice[0] }.
                                    <span class="price-sup">${ info[i].itemPrice[1] }</span>
                                </span>
                            </p>
                        </div>
                    </a>
                    <div class="item-hover">
                        <!-- disBtn -->
                        <div class="hover-btn">
                            <i class=" iconfont"></i>
                            <span>找相似</span>
                        </div>
                    </div>
                    <span class="dislike" title="不喜欢"></span>
                `;
            }
            itemBox.appendChild( createLi );

            if ( tempCount == itemCount ) {
                let itemList = itemBox.querySelectorAll( 'li.ordinary' );
                let hoverBtn = itemBox.querySelectorAll( 'li.ordinary div.hover-btn' );
                let dislike = itemBox.querySelectorAll( 'li.ordinary span.dislike' );
                function disBtn() {
                    console.log( '获取相似商品' );
                    this.classList.add( 'disBtn' );
                    this.removeEventListener( 'click', disBtn );
                }
                let previousKey = 0;
                function replace() {
                    let key = api.random( 0, info.length - 1 );
                    
                    if ( key == this.parentNode.getAttribute( 'data-id' ) || key == previousKey ) {
                        key = api.random( 0, info.length - 1 );
                    }
                    let index = [...itemList].indexOf( this.parentNode );

                    this.parentNode.setAttribute( 'data-id', info[key].itemIndxe );
                    this.parentNode.innerHTML = `
                        <a href="${ info[key].link }">
                            <div class="item-img">
                                <img src="${ info[key].imgSrc }" alt="item-img">
                            </div>
                            <div class="item-info">
                                <p class="item-name">${ info[key].itemName }</p>
                                <p class="item-price">
                                    <i class=" iconfont">¥</i>
                                    <span>
                                        ${ info[key].itemPrice[0] }.
                                        <span class="price-sup">${ info[key].itemPrice[1] }</span>
                                    </span>
                                </p>
                            </div>
                        </a>
                        <div class="item-hover">
                            <!-- disBtn -->
                            <div class="hover-btn">
                                <i class=" iconfont"></i>
                                <span>找相似</span>
                            </div>
                        </div>
                        <span class="dislike" title="不喜欢"></span>
                    `;
                    previousKey = key;
                    itemList[index].querySelector( 'div.hover-btn' ).addEventListener( 'click', disBtn );
                    itemList[index].querySelector( 'span.dislike' ).addEventListener( 'click', replace );
                }

                dislike.forEach( ( item, index ) => {
                    item.addEventListener( 'click', replace );
                } );

                hoverBtn.forEach( item => {
                    item.addEventListener( 'click', disBtn );
                } );
            }
        }
        if ( surplus ) {
            createItem( surplus, info, treasure, hot, shop );
        }
    }
    createItem( 24 );

    info.head.forEach( item => {
        item.addEventListener( 'click', function() {
            itemBox = document.querySelector( '.tab_body_active ul' );
            if ( itemBox.childNodes.length < 15 ) {
                createItem( 24 );
            }
            if ( itemBox.childNodes.length < 145 ) {
                loading.style.display = 'block';
            }
            console.log( document.documentElement.scrollTop );
            
            document.documentElement.style.scrollBehavior = 'auto';
            document.documentElement.scrollTop = 2836;
            document.documentElement.style.scrollBehavior = 'smooth';
        } );
    } );

    // 加载更多
    let loading = document.querySelector( 'div#loading' );
    let observe = new IntersectionObserver( function( entries ) {
        let entry = entries[0];
        let timer = null;
        if ( entry.isIntersecting && itemBox.childNodes.length <= 145 ) {
            timer = setInterval( () => {
                createItem( 24 );
                if ( itemBox.childNodes.length > 145 ) {
                    loading.style.display = 'none';
                }
                clearInterval( timer );
            }, 500 );
        }
    }, {
        thresholds: 1
    } );
    observe.observe( loading );
}



// 滚动条控制
{
    let column = document.querySelector( '#column' );
    let searchFloat = document.querySelector( '#search-float' );
    let elevator = document.querySelector( '#elevator' );
    let occupy = document.querySelector( '#elevator .occupy' );
    let returnTop = document.querySelector( '#elevator .return-top' );
    let recommend_tab_head = document.querySelector( '#recommend .recommend_tab_head' );

    let seckill_position = document.querySelector( '.seckill_position' );
    let elevatorSeckill = document.querySelector( '.elevator-seckill a' );
    let elevatorActivity = document.querySelector( '.elevator-activity a' );
    let elevatorFeature = document.querySelector( '.elevator-feature a' );
    let elevatorChannel = document.querySelector( '.elevator-channel a' );
    let elevatorRecommend = document.querySelector( '.elevator-recommend a' );

    function updateLocation( position) {
        if ( position < 1 && position > -270 ) {
            elevatorSeckill.style.color = '#e1251b';
            elevatorActivity.style.backgroundImage = 'url( ./image/elevator.jpg )';
            elevatorFeature.style.color = '#333333';
            elevatorChannel.style.color = '#333333';
        }

        else if ( position < -271 && position > -838 ) {
            elevatorSeckill.style.color = '#333333';
            elevatorActivity.style.backgroundImage = 'url( ./image/elevator_hover.jpg )';
            elevatorFeature.style.color = '#333333';
            elevatorChannel.style.color = '#333333';
        }

        else if ( position < -840 && position > -1567 ) {
            elevatorSeckill.style.color = '#333333';
            elevatorActivity.style.backgroundImage = 'url( ./image/elevator.jpg )';
            elevatorFeature.style.color = '#e1251b';
            elevatorChannel.style.color = '#333333';
        }

        else if ( position < -1577 && position > -2212) {
            elevatorSeckill.style.color = '#333333';
            elevatorActivity.style.backgroundImage = 'url( ./image/elevator.jpg )';
            elevatorFeature.style.color = '#333333';
            elevatorChannel.style.color = '#e1251b';
        }

        else if ( position < -2225 ) {
            elevatorSeckill.style.color = '#333333';
            elevatorActivity.style.backgroundImage = 'url( ./image/elevator.jpg )';
            elevatorFeature.style.color = '#333333';
            elevatorChannel.style.color = '#333333';
            elevatorRecommend.style.color = '#e1251b';
        }
        else {
            elevatorSeckill.style.color = '#333333';
            elevatorActivity.style.backgroundImage = 'url( ./image/elevator.jpg )';
            elevatorFeature.style.color = '#333333';
            elevatorChannel.style.color = '#333333';
            elevatorRecommend.style.color = '#333333';
        }

        // 顶部搜索框
        if ( document.documentElement.scrollTop > 660 ) {
            searchFloat.style.height = '50px';
            searchFloat.style.borderBottom = '2px solid #f10214';
            searchFloat.style.transition = 'all 0.5s ease-in-out';
        }
        else {
            searchFloat.style.height = '0px';
            searchFloat.style.borderBottom = 'none';
            searchFloat.style.transition = 'none';
        }

        // 定位导航
        if ( document.documentElement.scrollTop > 610 ) {
            elevator.style.position = 'fixed';
            elevator.style.top = '0';
            occupy.style.height = '75px';
            returnTop.style.transform = 'translateY( 0px )';

        }
        else {
            elevator.style.position = 'absolute';
            elevator.style.top = '510px';
            occupy.style.height = '0';
            returnTop.style.transform = 'translateY( -60px )';
        }

        // 推荐导航
        if ( document.documentElement.scrollTop > 3000 ) {
            recommend_tab_head.style.position = 'fixed';
            recommend_tab_head.style.top = '52px';
            recommend_tab_head.style.padding = '0 0 0 220px';
            recommend_tab_head.style.width = '100%';
            recommend_tab_head.style.height = '0px';
            recommend_tab_head.clientHeight;
            recommend_tab_head.style.boxShadow = '2px 2px 2px rgb( 0 0 0 / 20% )';
            recommend_tab_head.style.transition = 'all 0.5s ease';
            recommend_tab_head.style.height = '60px';
        }
        else {
            recommend_tab_head.style.position = 'absolute';
            recommend_tab_head.style.top = '0';
            recommend_tab_head.style.padding = '0 55px';
            recommend_tab_head.style.width = 'inherit';
            recommend_tab_head.style.boxShadow = 'none';
            recommend_tab_head.style.transition = 'none';
        }
    }
    updateLocation( seckill_position.getBoundingClientRect().top );
    window.addEventListener( 'scroll', function() {
        updateLocation( seckill_position.getBoundingClientRect().top );
    } );
}