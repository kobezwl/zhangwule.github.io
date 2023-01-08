'use strict';

// 评论数
{
    let postComment = document.querySelector( '#site-info .post-comment' );
    let count = 0;
    if ( localStorage.getItem( 'comment' ) ) {
        count = localStorage.getItem( 'comment' ).split( ',' ).length;
    }
    else {
        count = 0;
    }
    postComment.innerHTML = count;
}



// 渲染评论
{
    let comment = document.querySelector( 'ul.comment-list' );
    function renderComment( content ) {
        let li = document.createElement( 'li' );
        li.classList.add( 'comment-item' );
        li.innerHTML = content;
        comment.append( li );
    }
    if ( localStorage.getItem( 'comment' ) ) {
        let commentContent = localStorage.getItem( 'comment' ).split( ',' );
        commentContent.forEach( value => {
            renderComment( value );
        } );
    }
}