// 'use strict';

{
    function queryElementSize( element ) {
        let el = document.querySelectorAll( element );
        // if ( el.length === 1 ) {
            el = el[0];
        // }
        console.log( el );
        console.log( `
            元素尺寸为: 
            width: ${ Math.floor( el.getBoundingClientRect().width ) }px;
            height: ${ Math.floor( el.getBoundingClientRect().height ) }px;
        ` );
    }
    // queryElementSize( '.post-item .post-item-info' );
}