Player.extend({
    init: function(){
        var self=this;
        this.$video_container=$('<video id="smart_player"></video>');
        $('body').append(this.$video_container);

        this.$video_container.on('playing', function(){
            self.trigger('ready');
        });
    },
    play: function (options) {
        this.$video_container.attr('src', options.url);
        this.$video_container[0].play();
    }
});