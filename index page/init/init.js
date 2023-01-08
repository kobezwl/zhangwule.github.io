// 'use strict';

// 评论数
{
    let postComment = document.querySelectorAll( '#posts .post-comment' );
    let count = 0;
    if ( localStorage.getItem( 'comment' ) ) {
        count = localStorage.getItem( 'comment' ).split( ',' ).length;
    }
    else {
        count = 0;
    }
    postComment.forEach( item => {
        item.innerHTML = count;
    } );
}