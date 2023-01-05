'use strict';

// 传送导航
{
    // config 显示隐藏
    {
        let setting = document.querySelector( '#elevator .setting' );
        let config = document.querySelector( '#elevator #config' );

        function configToggle() {
            if ( getComputedStyle( config, null ).opacity === '0' ) {
                config.style.transform = 'translateX( 0px )';
                config.style.opacity = '1';
            }
            else {
                config.style.transform = 'translateX( 30px )';
                config.style.opacity = '0';
            }
        }
        setting.addEventListener( 'click', configToggle );
    }

    // 分享剪切板
    {
        let share = document.querySelector( '#elevator .share' );

        // share.addEventListener( 'click', (e) => {
            // window.clipboardData.setData( 'text/plain', `
            //     Gitee: http://kobezwl.gitee.io/zhangwule/
            //     GitHub: https://zhangwule.github.io/
            // ` );
            // e.clipboardData.setData( 'Text', 'getting' );
            // console.log( e.setText( 'getting' ) );
        // } );
    }

    {
        // function setCopyBtn(){
        //     $(".CopyToClipboard").each(function(){
        //         var e=new ZeroClipboard.Client;e.setHandCursor(!0),
        //         e.addEventListener("load",function(e){}),
        //         e.addEventListener("mouseOver",function(e){
        //             var t=e.movie.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.innerHTML;
        //             t=t.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),e.setText(t)}),
        //             e.addEventListener("complete",function(e,t){
        //                 alert("代码已经复制到你的剪贴板。")
        //             })
        //         }
    }
}
