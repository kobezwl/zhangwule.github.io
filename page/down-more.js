// 向下更多
{
    let downBtn = document.querySelector( '#down-more i' );
    let page = document.querySelector( '#page' );
    let header = document.querySelector( '#page-header' );

    function downScroll() {
        page.scrollTo( 0, header.getBoundingClientRect().height );
    }
    downBtn.addEventListener( 'click', downScroll );
}