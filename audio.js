(function ($, window, document, undefined) {
    

    // 音频构造器
    var Audio = function (options) {

        //合并参数设置
        this.options = $.extend({}, Audio.defaults, options);

        //将选择器对象赋值给插件，方便后续调用
        this.audioElement = this.init();

        this.process = 0;


    };

    // 默认参数
    Audio.defaults = {
        // 音频地址
        src: '1.mp3',
        //音频标签id
        id: 'myAudio',
        // 是否自动播放
        autoplay: false,
        // 是否循环
        loop: true,
        // 设置音频初始音量 0.0-1.0
        volume: 1,
        // 音乐当前的播放位置发送改变时执行
        audioChange: function (event) {},
        // 音乐播放结束后的回调函数
        endfun: function () {}
    };

    // 定义插件的方法
    Audio.prototype = {

        // 初始化音频标签
        init: function () {

            var options = this.options;

            // 创建音频标签并设置属性
            var audioElement = document.createElement('audio');
            
            // 设置音频标签的基础属性
            audioElement.src = options.src;
            audioElement.id = options.id;
            audioElement.autoplay = options.autoplay;
            audioElement.loop = options.loop;
            audioElement.volume = options.volume;

            // 当前的播放位置发送改变时执行
            audioElement.addEventListener("timeupdate", function () {

                // 将音频对象的 当前播放时间点 和 总时长 当做事件参数传出去
                var eventObject = {
                    currentTime: audioElement.currentTime,
                    duration: audioElement.duration
                }
                options.audioChange(eventObject);
            });

            return audioElement;
        },

        // 播放
        play: function () {
            var audio = this.audioElement;
            audio.play();
        },

        // 暂停
        pause: function () {
            var audio = this.audioElement;
            audio.pause();
        },

        // 停止播放
        stop: function () {
            var audio = this.audioElement;
            
            // 先暂停播放然后 在将下次播放时间设置为0;
            // 没有更好的办法了，官方没有提供直接停止的方法
            this.pause();
            audio.currentTime = 0;
        },

        //设置音量 获取音量 0.0-1.0
        volume: function (value) {
            var audio = this.audioElement;
            if (value) {
                audio.volume = value;
            }
            return audio.volume;
        },

        // 音乐静音 参数布尔值 true 静音 false 不静音
        muted: function (flag) {
            var audio = this.audioElement;
            audio.muted = flag;
        }

    };

    // 内部方法
    var Methods = {

    };


    var myAudio = new Audio({
        // 音频地址 string
        src: '1.mp3',
        //音频标签id string
        id: 'myAudio',
        // 是否自动播放 
        autoplay: false,
        // 是否循环
        loop: false,
        // 设置音频初始音量 0.0-1.0
        volume: 0.5,
        // 音频播放时调用的函数 event 有两个值 currentTime代表当前播放的时间点 duration音乐总时长
        audioChange: function (event) {
            // 获取播放比值
            var processNum = event.currentTime/event.duration;

            // 因为进度条定的是最大值是一百所以乘以这个比例
            processNum = processNum * 250;
            
            $('#process .process-now').width(processNum);
            $('#process .process-dot').css({
                left: processNum + 'px'
            });
        },
        // 播放完毕处理的事件
        end: function () {
            
        }

    });
    console.log(myAudio);
    
    $('#play').click(function () {
        myAudio.play();
    });

    $('#pause').click(function () {
        myAudio.pause();
    });

    $('#volume').on('input',function () {
        var num = parseInt(this.value);

        num = num/100;
        console.log(num);
        myAudio.volume(num);
        
        
        myAudio.muted(false);
    });

    $('#stop').click(function () {
        myAudio.stop();
    });

    $('#muted').click(function() {
        myAudio.muted(true);
    });

    $('#getprocess').click(function() {
        
    });

})(Zepto || jQuery, window, document);