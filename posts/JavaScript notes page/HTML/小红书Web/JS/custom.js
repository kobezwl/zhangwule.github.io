// --- --- --- 自定义方法 --- --- ---
const API = {
    random: null, 
    banner: null, 
    falls: null, 
    Tab: null
};



// 生成随机数
{
    let random = function( x = 0, y = 10 ) {
        let min = Math.floor( Math.min( x, y ) );
        let max = Math.floor( Math.max( x, y ) );
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    API.random = { random };
}



// hover 方法
function hover( e, fn1, fn2 ) {
    //移入事件
    e.onmouseenter = function () {
        fn1.call( e )
    }
    //移出事件
    e.onmouseleave = function () {
        fn2.call( e )
    }
}



// 无缝轮播图
{
    let curIndex = 0;
    // let count = 3;
    class SeamlessShow {
        constructor( item, itemList, indicator, size, active ) {
            this.item = item;    // 轮播图 container
            this.itemList = itemList;    // 轮播图列表
            this.indicator = indicator;    // 指示器 list
            this.size = size;    // 图片尺寸
            this.active = active;
        }
        // 改变位置
        moveTo( index ) {
            // 改变 container 位置
            this.item.style.transform = `translateX( -${ index * this.size }px )`;
            this.item.style.transition = '0.5s';
            // 获取 .active
            let active = document.querySelector( this.active );
            // 删除类名, 并为当前指示器添加 .active
            active.setAttribute( 'class', '' );
            this.indicator[ index ].setAttribute( 'class', 'active' );
            // 将计数器更新为 index
            curIndex = index;
        }
        // 初始化
        init() {
            // 创建两个 dom 元素, 第一的 li, 和最后一个 li
            let first = this.item.firstElementChild.cloneNode( true );
            let last = this.item.lastElementChild.cloneNode( true );
            // 添加到 dom 里, first 放到最后, last 放到第一
            this.item.appendChild( first );
            this.item.insertBefore( last, this.item.firstElementChild );
            // 设置 last 位置
            last.style.position = 'absolute';
            last.style.transform = `translateX( -${ this.size }px )`;
            // 改变 container 宽度
            let initWidth = ( this.itemList.length + 2 ) * this.size;
            this.item.style.width = initWidth + 'px';
        }
    }

    // 设置 new 的值
    let love = null;
    let set = function( item, itemList, indicator, size, active ) {
        return love = new SeamlessShow( item, itemList, indicator, size, active );
    }
    love = set();

    // 点击切换
    let clickCut = function() {
        love.indicator.forEach( function ( item, i ) {
            item.onclick = function () {
                love.moveTo( i );
            }
        } );
    }

    // 切换
    let moveTo = function() {
        love.moveTo();
    };

    // 初始化
    let init = function() {
        love.init()
        // console.log( love );
    };

    // 向左移动
    let leftNext = function( value ) {
        let count = value;
        if ( curIndex === 0 ) {
            console.log( 'Left Seamless' );
            love.item.style.transform = `translateX( -${ count * love.size }px )`;
            love.item.style.transition = 'none';
            love.item.clientHeight;
            love.moveTo( count - 1 );
        }
        else {
            love.moveTo( curIndex - 1 );
        }
    }

    // 向右移动
    let rightNext = function( value ) {
        let count = value;
        if ( curIndex === count - 1 ) {
            console.log( 'Right Seamless' );
            love.item.style.transform = `translateX( ${ love.size }px )`;
            love.item.style.transition = 'none';
            love.item.clientHeight;
            love.moveTo( 0 );
        }
        else {
            love.moveTo( curIndex + 1 );
        }
    }

    // 测试

    // 开放接口
    API.banner = { set, init, clickCut, leftNext, rightNext };
}

// 使用: 
// 1. banner.set( 轮播图 container, 轮播图列表, 指示器 list, 图片尺寸 );
// 2. banner.init();
// 3. banner.clickCut();
// 4. 绑定左右箭头 {
    // 左箭头.addEventListener( 'click', function() {
    //     banner.leftNext( 轮播图列表.length );
    // } );
    // 右箭头.addEventListener( 'click', function() {
    //     banner.rightNext( 轮播图列表.length );
    // } );
// }



// 瀑布流
{
    // 1. 创建添加
    function createAdd( container, type, src, inner, nameType, name ) {
        // 创建元素
        let item = document.createElement( type );
        // item.onload = setPosition;
        // 若为图片, 添加 src 属性
        if ( type == 'img' ) {
            item.src = src;
        }
        if ( type == 'a' ) {
            item.href = src;
        }
        item.innerHTML = inner;
        item.setAttribute( nameType, name );
        container.appendChild( item );
    }

    // 2. 计算列, 及每列间隙
    function calculate( falls, itemWidth, type = 'between' ) {
        // 瀑布盒子 宽度
        let fallsWidth = falls.clientWidth;
        // 列的数量
        let columns = Math.floor( fallsWidth / itemWidth );
        // 间隙数
        let spaceNumber = null;
        if ( type == 'between' ) {
            spaceNumber = columns - 1;
        }
        else if ( type == 'around' ) {
            spaceNumber = columns + 1;
        }
        else {
            throw new Error( '类型设置错误' );
        }
        // 间隙总宽
        let totalSpace = fallsWidth - columns * itemWidth;
        // 间隙大小
        let space = totalSpace / spaceNumber;
        // 返回 { 列数, 间隙大小 }
        return {
            columns: columns,
            space: space,
            type: type
        }
    }

    // 3.设置每个项目的位置
    function setPosition( calInfo, falls ) {
        // 获取 { 列数, 间隙大小 }
        let info = calInfo;
        // 数组长度为列数
        let nextTops = new Array( info.columns );
        // 填充数组每一项为 0
        nextTops.fill( 0, 0, nextTops.length );
        for ( let i = 0; i < falls.children.length; i++ ) {
            let item = falls.children[i];
            let itemHeight = item.clientHeight;
            // 找到 nextTops 中的最小值, 作为当前纵坐标
            let minTop = Math.min.apply( null, nextTops );
            item.style.top = minTop + "px";
            // 得到使用的是第几列的 top 值
            let index = nextTops.indexOf( minTop );
            // 重新设置下一个 top 值
            nextTops[index] += itemHeight + info.space;
            // 横坐标
            let left = undefined;
            if ( info.type == 'between' ) {
                left = index * info.space + index * itemWidth;
            }
            else {
                left = ( index + 1 ) * info.space + index * itemWidth;
            }
            item.style.left = left + 'px';
        }
        let max = Math.max.apply( null, nextTops );
        falls.style.height = max + 'px';
    }

    // 开放接口
    API.falls = { createAdd, calculate, setPosition };
}



// tab
{
    let tab = function( nav, cont, info, type = 'Default' ) {
        nav.forEach( ( item, index ) => {
            item.addEventListener( 'click', function() {
                if ( type == 'Default' ) {
                    nav.forEach( ( el, index ) => {
                        el.setAttribute( 'class', '' );
                        cont[index].setAttribute( 'class', '' );
                    } );
                    item.setAttribute( 'class', info.selected );
                    cont[index].setAttribute( 'class', info.show );
                }
                else if ( type == 'Vertical-shift' ) {
                    nav.forEach( el => {
                        el.setAttribute( 'class', '' );
                    } );
                    item.setAttribute( 'class', info.selected );
                    cont.style.top = `${ -( info.initHeight + info.itemHeight * index - 100 ) }px`;
                }
                else if ( type == 'Level-shift' ) {
                    nav.forEach( el => {
                        el.setAttribute( 'class', '' );
                    } );
                    item.setAttribute( 'class', info.selected );
                    cont.style.transform = `translateX( -${ info.itemWidth * index }px )`;
                }
                else {
                    throw new Error( 'Type parameter error' );
                }
            } );
        } );
    }

    // 开放接口
    API.Tab = { tab };
}

// 使用: 
// type: 'Default'
// let Default = {
//     selected: 'selected', 
//     show: 'show'
// }
// type: 'Vertical-shift'
// let verticalShift = {
//     selected: 'selected', 
//     initHeight: 50,
//     itemHeight: 250
// }
// type: 'Level-shift'
// let levelShift = {
//     selected: 'selected', 
//     itemWidth: 600
// }
// API.tab.tab( 指示器, 内容, 信息, '类型' );