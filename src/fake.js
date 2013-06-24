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

    }
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

    if (window.$ && false) {
        $(function () {
            Player.init()
        });
    } else {
        window.addEventListener('DOMContentLoaded', function () {
            Player.init();
        });
    }
}());