var isDebug = document.location.protocol != 'https:';

requirejs.config({
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                if ('.json' === url.substr(-5)) {//针对json
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    map: {
        '*': {
            css: 'https://cdn.uutool.cn/vendor/requirejs/css.min.js'
        }
    },

    //各类js文件的路径,全部使用cdn文件
    paths: {
        text: "https://cdn.uutool.cn/vendor/requirejs/text.min",//text
        css: "https://cdn.uutool.cn/vendor/requirejs/css.min",//css
        jquery: "https://cdn.uutool.cn/vendor/jquery/jquery-1.9.1.min",//jquery
        cryptojs: "https://cdn.uutool.cn/vendor/crypto-js/crypto-js",//crypto-js
        qrcode: "https://cdn.uutool.cn/vendor/jq-plugins/jquery-qrcode.min",//jquery.qrcode
        layers: "https://cdn.uutool.cn/vendor/layer/3.0.3/layer",//layer 为r.js里面的关键字，换成layers
        laydate: "https://cdn.uutool.cn/vendor/laydate/5.0.9/laydate",//laydate
        lazyload: "https://cdn.staticfile.org/vanilla-lazyload/10.16.2/lazyload.amd.min",//layzyload
        clipboard: "https://cdn.uutool.cn/vendor/clipboard/2.0.1/clipboard.min",//clipboard
        moment: "https://cdn.uutool.cn/vendor/moment/2.10.6/moment.min",//moment.js
        vue: isDebug ? 'https://cdn.uutool.cn/vendor/vue/2.5.17/vue' : 'https://cdn.uutool.cn/vendor/vue/2.5.17/vue.min',//vue
        requester: "https://cdn.uutool.cn/lib/requester",//requester
        req: "https://cdn.uutool.cn/lib/req",//req网络请求封装,带token验证
        fileSaver: "https://cdn.uutool.cn/vendor/file-saver/2.0.0/FileSaver.min",//file saver
        colorPicker: "https://cdn.uutool.cn/vendor/jquery-color-picker/js/colpick",//color picker
        swiper: "https://cdn.uutool.cn/vendor/swiper/3.4.2/js/swiper.min",//swiper
        veeValidate: "https://cdn.uutool.cn/vendor/vee-validate/2.0.9/vee-validate.min",//veevalidate
        photoSwiper: "https://cdn.uutool.cn/vendor/photoswipe/4.1.2/photoswipe.min",//photoswiper插件
        photoSwiperUi: "https://cdn.uutool.cn/vendor/photoswipe/4.1.2/photoswipe-ui-default.min",//photoswiper插件UI
        xlsx: "https://cdn.uutool.cn/vendor/js-xlsx/0.14.0/xlsx.full.min",//xlxs
        plupload: 'https://cdn.uutool.cn/vendor/plupload/3.1.2/plupload.min',//文件上传
        jszip: 'https://cdn.uutool.cn/vendor/jszip/3.2.0/jszip.min',//jsZip
        sortablejs: "https://cdn.uutool.cn/vendor/sortable/1.4.0/sortable.min", //拖动插件
        vue_draggable: "https://cdn.uutool.cn/vendor/vue-draggable/2.16.0/vuedraggable.min", //vue拖动插件
        date2lunar: "https://cdn.uutool.cn/vendor/lib/calendar/calendar.min", //阳历转农历
    },
    shim: {
        qrcode: {
            deps: ['jquery']
        },
        colorPicker: {
            deps: ['jquery', 'css!https://cdn.uutool.cn/vendor/jquery-color-picker/css/colpick.css']
        },
        layers: {
            deps: ['jquery', 'css!https://cdn.uutool.cn/vendor/layer/3.0.3/skin/default/layer']
        },
        laydate: {
            deps: ['css!https://cdn.uutool.cn/vendor/laydate/5.0.9/theme/default/laydate']
        },
        swiper: {
            deps: ['css!https://cdn.uutool.cn/vendor/swiper/3.4.2/css/swiper.min.css']
        },
        photoSwiper: {
            deps: ['css!https://cdn.uutool.cn/vendor/photoswipe/4.1.2/photoswipe.min.css', 'css!https://cdn.uutool.cn/vendor/photoswipe/4.1.2/default-skin/default-skin.min.css']
        }
    }
});
