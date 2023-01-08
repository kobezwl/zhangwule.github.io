'use strict';

// 目录变化
{
    let page = document.querySelector( '#page' );
    let postArticle = document.querySelector( '.post-article' );
    let articlePost = document.querySelectorAll( '.post' );
    let directoryList = document.querySelectorAll( '.directory-content li' );
    // 目录变化效果
    function exclude( index ) {
        directoryList.forEach( item => {
            item.classList.remove( 'post-active' );
        } );
        if ( index !== null ) {
            directoryList[index].classList.add( 'post-active' );
        }
    }
    // 是否切换目录
    function isKey( index ) {
        return articlePost[index].offsetTop - page.scrollTop <= 10 && articlePost[index].offsetTop - page.scrollTop > -1 * articlePost[index].clientHeight + 10;
    }
    let index = 0;
    // 索引变化
    function indexChange( is ) {
        if ( isKey( index ) ) {
            exclude( index );
        }
        else {
            index = is ? index + 1 : index - 1;
            if ( index > 5 || index < 0 ) {
                index = 5;
            }
        }
    }
    let previousTop = 999;
    let postArticleTop = 0;
    // 滚动
    function pageScroll() {
        postArticleTop = postArticle.offsetTop - page.scrollTop;
        if ( postArticleTop < 0 && postArticleTop > -1 * postArticle.clientHeight ) {
        // if ( postArticleTop < 0 ) {
            if ( previousTop > postArticleTop ) {
                // console.log( '向下滚动!!!' );
                indexChange( true );
            }
            else {
                // console.log( '向上滚动!!!' );
                indexChange( false );
            }
            previousTop = postArticleTop;
        }
        else {
            exclude( null );
            return false;
        }
    }
    page.addEventListener( 'scroll', pageScroll );
}



// 评论功能
{
    let textInput = document.querySelector( '.comment-input' );
    let submitBtn = document.querySelector( '.post-comment input[type="submit"]' );
    let comment = document.querySelector( 'ul.comment-list' );
    let commentContent = [];
    function submitComment() {
        if ( textInput.value.trim() ) {
            let commentLi = document.createElement( 'li' );
            let time = new Date();
            commentLi.classList.add( 'comment-item' );
            commentLi.innerHTML = `
                <p class="user-info">
                    <i class="icon-user iconfont"></i>
                    <span class="user-name">admin</span>
                    <span class="user-time">${ time.toLocaleString().replace(/:\d{1,2}$/,' ') }</span>
                </p>
                <p class="coment">${ textInput.value.trim() }</p>
            `;
            comment.append( commentLi );
            if ( localStorage.getItem( 'comment' ) ) {
                let getItem = localStorage.getItem( 'comment');
                localStorage.setItem( 'comment', `${ getItem }, ${ ( commentLi.innerHTML ) }` );
            }
            else {
                commentContent.push( commentLi.innerHTML );
                localStorage.setItem( 'comment', commentContent );
            }
            textInput.value = '';
        }
    }
    submitBtn.addEventListener( 'click', submitComment );
    textInput.addEventListener( 'keyup', function( e ) {
        if ( e.keyCode === 13 ) {
            submitComment();
        }
    } );
}