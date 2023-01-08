'use strict';

// 烟花效果
{
    let fireworksLayer = document.querySelector( '#bg-fireworks' );
    let timer = null;
    function bgFireworks() {
        // 创建 canvas
        let canvas = document.createElement( 'canvas' );
        fireworksLayer.append( canvas );

        let context = canvas.getContext( '2d' );

        // 让 canvas 撑满页面
        function resizeCanvas() {
            canvas.width = fireworksLayer.clientWidth;
            canvas.height = fireworksLayer.clientHeight;
            clearCanvas();
        }

        // 初始化 canvas 颜色
        function clearCanvas() {
            context.fillStyle = "transparent";
            context.fillRect( 0, 0, canvas.width, canvas.height );
        }
        resizeCanvas();
        clearCanvas();
        window.addEventListener( 'resize', resizeCanvas );

        // function mouseDownHandler( e ) {
        //     let x = e.clientX;
        //     let y = e.clientY;
        //     createFireworks( x, y );
        // }
        // document.addEventListener( 'mousedown', mouseDownHandler );

        // 页面切换时, 停止定时器
        function stop() {
            clearInterval( timer );
        }
        function start() {
            timer = setInterval( () => {
                createFireworks( Math.random() * canvas.width, Math.random() * ( canvas.height / 2 ) );
            }, 2400 );
        }
        document.addEventListener( 'visibilitychange', function() {
            console.log( document.visibilityState );
            if ( document.visibilityState === 'hidden' ) {
                stop();
            }
            else {
                start();
            }
        } );
        if ( timer === null ) {
            start();
        }

        // 创建烟花
        let particles = [];
        function createFireworks( x, y ) {
            let count = 100;
            // let radius = 0;
            let hue = Math.floor( Math.random() * 51 ) + 150;
            let hueVariance = 30;
            for ( let i = 0; i < count; i++ ) {
                let angle = 360 / count * i;
                let radians = angle * Math.PI / 180;
                let p = {};
                p.x = x;
                p.y = y;
                p.radians = radians;
                p.size = 2;
                p.speed = ( Math.random() * 5 ) + 0.4;
                p.radius = p.speed;
                p.hue = Math.floor( Math.random() * ( ( hue + hueVariance ) - ( hue - hueVariance ) ) ) + ( hue - hueVariance );
                p.brightness = Math.floor( Math.random() * 31 ) + 50;
                p.alpha = ( Math.floor( Math.random() * 61 ) + 40 ) / 100;
                particles.push(p);
                canvas.width = canvas.width;
            }
        }

        // 画出烟花
        function drawFireworks() {
            clearCanvas();
            for ( let i = 0; i < particles.length; i++ ) {
                let p = particles[i];
                let vx = Math.cos( p.radians ) * p.radius;
                let vy = Math.sin( p.radians ) * p.radius + 0.4;
                p.x += vx;
                p.y += vy;
                p.radius *= 1 - p.speed / 100;
                p.alpha -= 0.005;
                if ( p.alpha <= 0 ) {
                    particles.splice( i, 1 );
                    continue;
                }
                context.beginPath();
                context.arc( p.x, p.y, p.size, 0, Math.PI * 2, false );
                context.closePath();
                context.fillStyle = `hsla( ${ p.hue }, 100%, ${ p.brightness }%, ${ p.alpha } )`;
                context.fill();
            }
        }

        // requestAnimationFrame 和浏览器渲染同步
        function tick() {
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = `rgba( 0, 0, 0, ${ 10 / 100 } )`;
            context.fillRect( 0, 0, canvas.width, canvas.height );
            context.globalCompositeOperation = 'lighter';
            drawFireworks();
            requestAnimationFrame( tick );
        }
        tick();
    }
    bgFireworks();
}