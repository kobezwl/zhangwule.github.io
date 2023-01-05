'use strict';

// 翻页时钟
{
    class FlipCard {
        constructor( currentNumber = 1, nextNumber = 2 ) {
            this.duration = 500;
            this.isRunning = false;
            this.createRootNode();
            this.createNodes();
            this.setFrontNumber( currentNumber );
            this.setBackNumber( nextNumber );
        }

        // 创建主节点
        createRootNode() {
            this.root = document.createElement( 'div' );
            this.root.classList.add( 'card' );
        }

        // 创建子节点
        createNodes() {
            this.frontNode = document.createElement( 'div' );
            this.frontNode.classList.add( 'digital', 'front' );
            this.backNode = document.createElement( 'div' );
            this.backNode.classList.add( 'digital', 'back' );
            this.root.append( this.frontNode, this.backNode );
        }

        // 修改自定义属性 data-number
        setFrontNumber( number ) {
            this.frontNode.dataset.number = number;
        }

        setBackNumber( number ) {
            this.backNode.dataset.number = number;
        }

        flipDown( currentNumber, nextNumber ) {
            if ( this.isRunning ) {
                return;
            }
            this.isRunning = true;
            this.root.classList.add( 'running' );
            this.setFrontNumber( currentNumber );
            this.setBackNumber( nextNumber );
            setTimeout( () => {
                this.root.classList.remove( 'running' );
                this.setFrontNumber( nextNumber );
                this.isRunning = false;
            }, this.duration );
        }
    }

    // new FlipCard();

    class FlipClock {
        constructor( id ) {
            this.root = document.querySelector( `#${id}` );
            this.init();
        }

        getTimeFromDate( date ) {
            return date.toTimeString().slice( 0, 8 ).split( ':' ).join( '' );
        }

        refreshTime() {
            const now = new Date();
            this.nowTimeStr = this.getTimeFromDate( new Date( now.getTime() - 1000 ) );
            this.nextTimeStr = this.getTimeFromDate( now );
        }

        init() {
            this.refreshTime();
            this.flipCards = this.buildFlipCards();
            this.initFlipping();
        }

        initFlipping() {
            this.interval = setInterval( () => {
                this.refreshTime();
                this.flipCards.forEach( ( item, index ) => {
                    if ( this.nowTimeStr[index] === this.nextTimeStr[index] ) {
                        return;
                    }
                    item.flipDown( this.nowTimeStr[index], this.nextTimeStr[index] );
                } );
            }, 1000 );
        }

        buildFlipCards() {
            let flipCards = [];
            for ( let i = 0; i < 6; i++ ) {
                const flipCard = new FlipCard( this.nowTimeStr[i], this.nextTimeStr[i] );
                this.root.append( flipCard.root );
                if ( i === 1 || i === 3 ) {
                    const divider = document.createElement('div');
                    divider.classList.add( 'divider' );
                    divider.textContent = ':';
                    this.root.append( divider )
                }
                flipCards.push( flipCard );
            }
            return flipCards;
        }
    }

    new FlipClock( 'bg-clock' );
}