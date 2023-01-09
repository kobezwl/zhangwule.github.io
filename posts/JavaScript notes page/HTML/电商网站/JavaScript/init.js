import * as api from "./module.js";

// 初始化
{
    function init() {
        // 定位初始化
        function locationInit() {
            // 当前定位盒
            let current = document.querySelector( '#nav .current_location' );
            // 当前定位盒文本
            let currentText = document.querySelector( '#nav .current_location span' );
            // 可选定位项目盒
            let optionalItem = document.querySelector( '#nav .optional_location .optional_item' );
            // 定位数组
            let locationArr = [ '北京', '上海', '天津', '重庆', '河北', '山西', '河南', '辽宁', '吉林', '黑龙江', '内蒙古', '江苏', '山东', '安徽', '浙江', '福建', '湖北', '湖南', '广东', '广西', '江西', '四川', '海南', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '港澳', '台湾', '钓鱼岛', '海外' ];

            // 填充当前定位盒文本
            currentText.innerHTML = localStorage.getItem( 'location' ) ? localStorage.getItem( 'location' ) : locationArr[0];
            localStorage.setItem( 'location', currentText.innerHTML );
            // console.log( '本地缓存: ' + localStorage.getItem( 'location' ) );
            // 填充可选定位项目盒
            locationArr.forEach( ( item, index ) => {
                let divs = document.createElement( 'div' );
                divs.classList.add( 'item' );
                if ( index == locationArr.indexOf( localStorage.getItem( 'location' ) ) ) {
                    divs.classList.add( 'selected' );
                }
                divs.innerHTML = `<a href="javascript:void(0)" data-id="${ index + 1 }">${item}</a>`;
                optionalItem.appendChild( divs );
            } );
            // 设置当前定位盒宽度
            current.style.width = localStorage.getItem( 'location' ).split('').length - 2 ? '70px' : '58px';
        }
        locationInit();

        // gif初始化
        // /*
        function gifInit() {
            // logo动画
            let logo = document.querySelector( '#searchBox .logo' );
            let logo_img = document.querySelector( '#searchBox .logo .logo_img' );
            let logo_gif = document.querySelector( '#searchBox .logo .logo_gif' );
            let logo_gif_img = document.querySelector( '#searchBox .logo .logo_gif > img' );
            let timer = null;

            api.hover( logo, function() {
                logo_img.style.display = 'none';
                logo_gif.style.display = 'block';
                clearTimeout( timer );
            }, function() {
                timer = setTimeout( () => {
                    logo_img.style.display = 'block';
                    logo_gif.style.display = 'none';
                    logo_gif_img.src = logo_gif_img.src;
                }, 5000 );
            } );
        }
        gifInit();
        // */

        /*
        [ '时尚女鞋', '潮流女包', '精品男包', '功能箱包', '奢侈品', '钟表', '珠宝首饰', '金银投资' ], 
        [ '流行男鞋', '运动鞋包', '运动服饰', '健身训练', '骑行运动', '体育用品', '户外鞋服', '户外装备', '垂钓用品', '游泳用品' ], 
        [ '房产', '汽车车型', '汽车价格', '汽车品牌', '维修保养', '汽车装饰', '车载电器', '美容清洗', '安全自驾', '汽车服务', '电动车', '摩托车' ], 
        [ '奶粉', '营养辅食', '尿裤湿巾', '喂养用品', '洗护用品', '寝居服饰', '妈妈专区', '童车童床', '玩具', '乐器' ], 
        [ '新鲜水果', '蔬菜蛋品', '精选肉类', '海鲜水产', '冷饮冻食', '中外名酒', '中外名酒', '进口食品', '休闲食品', '地方特产', '茗茶', '饮料冲调', '粮油调味' ], 
        [ '艺术品', '火机烟具', '礼品', '鲜花速递', '绿植园艺', '种子', '农药', '肥料', '畜牧养殖', '农机农具' ], 
        [ '中西药品', '营养健康', '营养成分', '滋补养生', '计生情趣', '保健器械', '护理护具', '隐形眼镜', '健康服务' ], 
        [ '文学', '童书', '教材教辅', '人文社科', '经管励志', '艺术', '科学技术', '生活', '文娱', '教育培训', '电子书', '邮币' ], 
        [ '交通出行', '酒店预订', '旅游度假', '定制旅游', '演出票务', '生活缴费', '生活服务', '彩票', '游戏' ], 
        [ '众筹', '东家', '白条', '支付', '保险', '企业金融' ], 
        [ '家电安装', '办公安装', '家居安装', '家电维修', '手机维修', '办公维修', '清洗保养', '特色服务', '二手数码', '二手电脑', '二手奢品', '二手书' ], 
        [ '工具', '劳动防护', '安全消防', '工控配电', '仪器仪表', '清洁用品', '化学品', '仓储包装', '焊接紧固', '机械配件', '暖通照明', '实验用品' ] 
        */
        function tempItemListInit() {
            let columnItem = [];
            let ItemList = [];
            for ( let i = 1; i < 7; i++ ) {
                columnItem.push( document.querySelector( `.column-item${i} .ItemList` ) );
                ItemList.push( document.querySelector( `.column-item${ i + 6 } .columnItem_L` ) );
                ItemList.push( document.querySelector( `.column-item${ i + 6 * 2 } .columnItem_L` ) );
            }
            ItemList.forEach( ( item, index ) => {
                if ( index > 5 ) {
                    index = index - 6
                }
                let clone = columnItem[index].cloneNode( true );
                item.appendChild( clone );
            } );
        }
        tempItemListInit();
    }
    init();

}