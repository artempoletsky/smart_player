if (navigator.userAgent.toLowerCase().indexOf('maple') != -1) {
    (function () {
        var safeApply = function (self, method, args) {
            alert(method + ',' + args[0] + ',' + args[1] + ',' + args[2] + ',' + args[3]);
            switch (args.length) {
                case 0:
                    return self[method]();
                case 1:
                    return self[method](args[0]);
                case 2:
                    return self[method](args[0], args[1]);
                case 3:
                    return self[method](args[0], args[1], args[2]);
                case 4:
                    return self[method](args[0], args[1], args[2], args[3]);
                case 5:
                    return self[method](args[0], args[1], args[2], args[3], args[4]);
                case 6:
                    return self[method](args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                    return self[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                case 8:
                    return self[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);

            }
        }
        Player.extend({
            usePlayerObject: true,
            init: function () {
                if (this.usePlayerObject) {
                    this.$plugin = $('<object id="pluginPlayer" border=0 classid="clsid:SAMSUNG-INFOLINK-PLAYER" style="position: absolute; left: 0; top: 0; width: 1280px; height: 720px;"></object>');
                    this.plugin = this.$plugin[0];
                    $('body').append(this.$plugin);


                } else {
                    this.plugin = sf.core.sefplugin('Player');

                }

                this.plugin.OnStreamInfoReady = 'Player.OnStreamInfoReady';
                //this.plugin.OnRenderingComplete = 'Player.OnRenderingComplete';
                this.plugin.OnCurrentPlayTime = 'Player.OnCurrentPlayTime';
                this.plugin.OnCurrentPlaybackTime = 'Player.OnCurrentPlayTime';
                this.plugin.OnBufferingStart = 'Player.OnBufferingStart';
                //this.plugin.OnBufferingProgress = 'Player.OnBufferingProgress';
                this.plugin.OnBufferingComplete = 'Player.OnBufferingComplete';
                //this.plugin.OnConnectionFailed = 'Player.onError';
                //this.plugin.OnNetworkDisconnected = 'Player.onError';
                //this.plugin.OnAuthenticationFailed = 'Player.OnAuthenticationFailed';

                this.plugin.OnEvent = 'Player.onEvent';
            },
            onEvent: function (event, arg1, arg2) {

                alert('playerEvent: ' + event);
                switch (event) {
                    case 9:
                        this.OnStreamInfoReady();
                        break;

                    case 4:
                        //this.onError();
                        break;

                    case 8:
                        //this.OnRenderingComplete();
                        break;
                    case 14:
                        this.OnCurrentPlayTime(arg1);
                        break;
                    case 13:
                        //this.OnBufferingProgress(arg1);
                        break;
                    case 12:
                        this.OnBufferingComplete();
                        break;
                    case 11:
                        this.OnBufferingStart();
                        break;
                }
            },
            OnStreamInfoReady: function () {
                var duration, width, height, resolution;

                try {
                    duration = this.doPlugin('GetDuration');
                } catch (e) {
                    alert('######## ' + e.message);
                }

                duration = Math.ceil(duration / 1000);
                //this.jumpLength = Math.floor(this.duration / 30);

                if (this.usePlayerObject) {
                    width = this.doPlugin('GetVideoWidth');
                    height = this.doPlugin('GetVideoHeight');
                } else {
                    resolution = this.doPlugin('GetVideoResolution');
                    if (resolution == -1) {
                        width = 0;
                        height = 0;
                    } else {
                        var arrResolution = resolution.split('|');
                        width = arrResolution[0];
                        height = arrResolution[1];
                    }
                }

                this.videoInfo.duration = duration;
                this.videoInfo.width = width * 1;
                this.videoInfo.height = height * 1;
                alert('ready');
                this.trigger('ready');
            },
            OnBufferingStart: function () {
                this.trigger('bufferingBegin');
            },
            OnBufferingComplete: function () {
                this.trigger('bufferingEnd');
            },
            OnCurrentPlayTime: function (millisec) {
                if (this._state == 'play') {
                    this.videoInfo.currentTime = millisec / 1000;
                    this.trigger('update');
                }
            },
            _play: function (options) {
                switch (options.type) {
                    case 'hls':
                        options.url+='|COMPONENT=HLS'
                }

                this.doPlugin('InitPlayer', options.url);
                this.doPlugin('StartPlayback', options.from || 0);
            },
            _stop: function () {
                this.doPlugin('Stop');
            },
            doPlugin: function () {
                var result,
                    plugin = this.plugin,
                    methodName = arguments[0],
                    args = Array.prototype.slice.call(arguments, 1, arguments.length) || [];

                if (this.usePlayerObject) {
                    result = safeApply(plugin, methodName, args);
                }
                else {
                    if (methodName.indexOf('Buffer') != -1) {
                        methodName += 'Size';
                    }
                    args.unshift(methodName);
                    result = safeApply(plugin, 'Execute', args);
                }

                return result;
            }
        });
    }());

}