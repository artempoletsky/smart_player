var Player = {
    init: function () {
        console.log(43234234);
    },
    play: function () {
        this.trigger('ready');
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

    if (window.$&& false) {
        $(function () {
            Player.init()
        });
    } else {
        window.addEventListener('DOMContentLoaded', function () {
            Player.init();
        });
    }
}());