var Player = {
    init: function () {

    },
    _state: 'stop',
    play: function (options) {
        this.stop();
        this._state = 'play';
        this._play(options);
    },
    _play: function () {
        this.trigger('ready');
    },
    stop: function (silent) {
        if (this._state != 'stop') {
            this._stop();
            if (!silent) {
                this.trigger('stop');
            }
        }
        this._state = 'stop';
    },
    _stop: function () {

    },
    videoInfo: {

    },
    autoInit: true
};


(function () {
    var extendFunction, eventProto;
    //use underscore, or jQuery extend function
    if (window._ && _.extend) {
        extendFunction = _.extend;
    } else if (window.$ && $.extend) {
        extendFunction = $.extend;
    }


    if (window.EventEmitter) {
        eventProto = EventEmitter.prototype;
    } else if (window.Backbone) {
        eventProto = Backbone.Events;
    } else if (window.Events) {
        eventProto = Events.prototype;
    }

    Player.extend = function (proto) {
        extendFunction(this, proto);
    };

    Player.extend(eventProto);

    if (Player.autoInit) {
        $(function () {
            $('body').on('load', function () {
                Player.init();
            });
        });
    }

}());
Player.extend({
    init: function () {
        var self = this;
        this.$video_container = $('<video id="smart_player" style="position: absolute; left: 0; top: 0;"></video>');
        var video = this.$video_container[0];
        $('body').append(this.$video_container);

        this.$video_container.on('loadedmetadata', function () {
            self.videoInfo.width = video.videoWidth;
            self.videoInfo.height = video.videoHeight;
            self.videoInfo.duration = video.duration;
            self.trigger('ready');
        });


        this.$video_container.on('loadstart',function (e) {
            self.trigger('bufferingBegin');
        }).on('playing',function () {
                self.trigger('bufferingEnd');
            }).on('timeupdate',function () {
                self.videoInfo.currentTime = video.currentTime;
                self.trigger('update');
            }).on('ended', function () {
                self.trigger('complete');
            });


        this.$video_container.on('abort canplay canplaythrough canplaythrough durationchange emptied ended error loadeddata loadedmetadata loadstart mozaudioavailable pause play playing ratechange seeked seeking suspend volumechange waiting', function (e) {
            //console.log(e.type);
        });


        /*
         abort 	Sent when playback is aborted; for example, if the media is playing and is restarted from the beginning, this event is sent.
         canplay 	Sent when enough data is available that the media can be played, at least for a couple of frames.  This corresponds to the CAN_PLAY readyState.
         canplaythrough 	Sent when the ready state changes to CAN_PLAY_THROUGH, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level. Note: Manually setting the currentTime will eventually fire a canplaythrough event in firefox. Other browsers might not fire this event.
         durationchange 	The metadata has loaded or changed, indicating a change in duration of the media.  This is sent, for example, when the media has loaded enough that the duration is known.
         emptied 	The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.
         ended 	Sent when playback completes.
         error 	Sent when an error occurs.  The element's error attribute contains more information. See Error handling for details.
         loadeddata 	The first frame of the media has finished loading.
         loadedmetadata 	The media's metadata has finished loading; all attributes now contain as much useful information as they're going to.
         loadstart 	Sent when loading of the media begins.
         mozaudioavailable 	Sent when an audio buffer is provided to the audio layer for processing; the buffer contains raw audio samples that may or may not already have been played by the time you receive the event.
         pause 	Sent when playback is paused.
         play 	Sent when playback of the media starts after having been paused; that is, when playback is resumed after a prior pause event.
         playing 	Sent when the media begins to play (either for the first time, after having been paused, or after ending and then restarting).
         progress 	Sent periodically to inform interested parties of progress downloading the media. Information about the current amount of the media that has been downloaded is available in the media element's buffered attribute.
         ratechange 	Sent when the playback speed changes.
         seeked 	Sent when a seek operation completes.
         seeking 	Sent when a seek operation begins.
         suspend 	Sent when loading of the media is suspended; this may happen either because the download has completed or because it has been paused for any other reason.
         timeupdate 	The time indicated by the element's currentTime attribute has changed.
         volumechange 	Sent when the audio volume changes (both when the volume is set and when the muted attribute is changed).
         waiting 	Sent when the requested operation (such as playback) is delayed pending the completion of another operation (such as a seek).
         */
    },
    _play: function (options) {
        this.$video_container.attr('src', options.url);
        this.$video_container[0].play();
    },
    _stop: function () {
        this.$video_container[0].pause();
        this.$video_container[0].src = '';
    },
    seek: function (time) {
        this.$video_container[0].currentTime = time;
    },
    audio: {
        //https://bugzilla.mozilla.org/show_bug.cgi?id=744896
        set: function (index) {

        },
        get: function () {

        },
        cur: function () {

        }
    }
});
if (navigator.userAgent.toLowerCase().indexOf('maple') != -1) {
    (function () {
        var curAudio = 0;


        var safeApply = function (self, method, args) {
            try {
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
            } catch (e) {
                throw e;
            }
        }
        Player.extend({
            usePlayerObject: false,
            init: function () {
                var self = this;
                //document.body.onload=function(){
                if (self.usePlayerObject) {
                    //self.$plugin = $('<object id="pluginPlayer" border=0 classid="clsid:SAMSUNG-INFOLINK-PLAYER" style="position: absolute; left: 0; top: 0; width: 1280px; height: 720px;"></object>');
                    self.plugin = document.getElementById('pluginPlayer');
                    $('body').append(self.$plugin);


                } else {
                    self.plugin = sf.core.sefplugin('Player');
                }


                if (!self.plugin) {
                    throw new Error('failed to set plugin');
                }

                self.plugin.OnStreamInfoReady = 'Player.OnStreamInfoReady';
                self.plugin.OnRenderingComplete = 'Player.OnRenderingComplete';
                self.plugin.OnCurrentPlayTime = 'Player.OnCurrentPlayTime';
                self.plugin.OnCurrentPlaybackTime = 'Player.OnCurrentPlayTime';
                self.plugin.OnBufferingStart = 'Player.OnBufferingStart';
                //self.plugin.OnBufferingProgress = 'Player.OnBufferingProgress';
                self.plugin.OnBufferingComplete = 'Player.OnBufferingComplete';
                //self.plugin.OnConnectionFailed = 'Player.onError';
                //self.plugin.OnNetworkDisconnected = 'Player.onError';
                //self.plugin.OnAuthenticationFailed = 'Player.OnAuthenticationFailed';

                self.plugin.OnEvent = 'Player.onEvent';
                //}

            },
            seek: function (time) {
                if (time <= 0) {
                    time = 0;
                }
                /*if ( this.duration <= time + 1 ) {
                 this.videoInfo.currentTime = this.videoInfo.duration;
                 }
                 else {*/
                var jump = Math.floor(time - this.videoInfo.currentTime - 1);
                this.videoInfo.currentTime = time;
                alert('jump: ' + jump);
                if (jump < 0) {
                    this.doPlugin('JumpBackward', -jump);
                }
                else {
                    this.doPlugin('JumpForward', jump);
                }
                //  this.currentTime = time;
                //}
            },
            onEvent: function (event, arg1, arg2) {

               // alert('playerEvent: ' + event);
                switch (event) {
                    case 9:
                        this.OnStreamInfoReady();
                        break;

                    case 4:
                        //this.onError();
                        break;

                    case 8:
                        this.OnRenderingComplete();
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
            OnRenderingComplete: function () {
                alert('PLAYER COMPLETE');
                Player.trigger('complete');
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
                    alert(millisec / 1000);
                    this.videoInfo.currentTime = millisec / 1000;
                    this.trigger('update');
                }
            },
            _play: function (options) {
                var url = options.url;
                switch (options.type) {
                    case 'hls':
                        url += '|COMPONENT=HLS'
                }
                this.doPlugin('InitPlayer', url);
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
            },
            audio: {
                set: function (index) {
                    /*one is for audio*/
                    //http://www.samsungdforum.com/SamsungDForum/ForumView/f0cd8ea6961d50c3?forumID=63d211aa024c66c9
                    Player.doPlugin('SetStreamID', 1, index);
                    curAudio = index;
                },
                get: function () {
                    /*one is for audio*/
                    var len = Player.doPlugin('GetTotalNumOfStreamID', 1);

                    var result = [];
                    for (var i = 0; i < len; i++) {
                        result.push(Player.doPlugin('GetStreamLanguageInfo', 1, i));
                    }
                    return result;
                },
                cur: function () {
                    return curAudio;
                }
            }
        });
    }());

}