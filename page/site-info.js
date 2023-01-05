'use strict';

// 文字输入效果
{
    let siteSubtitle = document.querySelector( '#site-info .site-subtitle .active-text' );

    function textInputEffect() {
        let textArray = [ 
            '烟花只管绽放，何顾观者感受', 
            '良言一句三冬暖，恶语伤人六月寒', 
            '别离喧闹太近，别离自我太远' 
        ];
        let textCount = 0;
        let sentencesCount = 0;
        let timer = null; 
        let isEnd = false;

        function inputEffect() {
            isEnd = false;
            textCount++;
            siteSubtitle.innerHTML = textArray[sentencesCount].substring( 0, textCount );
            if ( siteSubtitle.innerHTML === textArray[sentencesCount] ){
                sentencesCount++;
                textCount = 0;
                isEnd = true;
            }
            if ( sentencesCount === textArray.length ){
                sentencesCount = 0;
            }
        }
        timer = setInterval( () => {
            if ( isEnd !== true ){ 
                inputEffect();
            }
            else {
                setTimeout( () => {
                    isEnd = false;
                }, 1600 );
            }
        }, 400 );
    }
    textInputEffect();
}