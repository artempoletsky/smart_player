describe('Player', function () {

    var currentURL = Config.trailer;
    var currentType = '';




    var formatDuration = function (secs) {
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return (hours ? hours + ':' : '') + minutes + ":" + seconds;
    };

    describe('has video info, and ready event', function () {


        it('supports ready', function () {
            var spy = jasmine.createSpy('ready handler');
            Player.on('ready', spy);

            runs(function () {
                Player.play({
                    url: Config.trailer
                });
            });
            waitsFor(function () {
                return spy.calls.length == 1
            }, 'ready have been triggered', 2000);
        });

        it('has video duration', function () {
            runs(function () {
                var info = Player.videoInfo;
                expect(formatDuration(info.duration)).toBe(Config.trailerDuration);
            });
        });

        it('has video resolution', function () {
            runs(function () {
                var info = Player.videoInfo;
                expect(info.width).toBe(Config.trailerWidth);
                expect(info.height).toBe(Config.trailerHeight);
            });
        });


        var spyStop = jasmine.createSpy('stop handler');


        it('supports stop method', function () {
            runs(function () {
                Player.on('stop', spyStop);
                Player.stop();
                expect(spyStop).toHaveBeenCalled();
            });

            waitsFor(function () {
                return spyStop.calls.length == 1
            }, 'stop have been triggered', 1000);

        });
    });


    describe('support buffering and update time events', function () {

        var begin = jasmine.createSpy('bufferingEnd handler');
        var end = jasmine.createSpy('end handler');

        it('supports bufferingBegin', function () {


            runs(function () {

                Player.play({
                    url: Config.movie
                });

                Player.on('bufferingBegin', begin);
            });


            waitsFor(function () {
                return begin.calls.length == 1
            }, 'bufferingBegin have been triggered', 15000);
        });
        runs(function () {
            Player.on('bufferingEnd', end);
        });

        it('supports bufferingEnd', function () {
            waitsFor(function () {
                return end.calls.length == 1
            }, 'bufferingEnd have been triggered', 15000);
        });


        it('supports update', function () {
            var update = jasmine.createSpy('update handler');


            var date;
            runs(function () {
                Player.on('update', update)
            });


            waitsFor(function () {
                return update.calls.length == 1;
            }, 'update have been triggered', 2000);


            runs(function () {
                expect(Math.floor(Player.videoInfo.currentTime)).toBe(0);
                date = (new Date().getTime());
            });

            waitsFor(function () {
                return Player.videoInfo.currentTime >= 2;
            }, '2 seconds playing', 10000);


            runs(function () {
                expect(Math.round((new Date().getTime() - date) / 1000)).toBe(2);
            });
        });


        it('supports seek method', function () {
            Player.seek(120);
            waitsFor(function () {
                return Player.videoInfo.currentTime >= 120 && Player.videoInfo.currentTime <= 121
            }, 'seeking success', 15000);
        });


        it('supports complete event', function () {
            Player.seek(Player.videoInfo.duration - 2);
            var onComplete = jasmine.createSpy('complete spy');
            Player.on('complete', onComplete);
            waitsFor(function () {
                return onComplete.calls.length == 1;
            }, 'onComplete was called', 15000);
        });


        runs(function () {
            Player.stop();
        });


    });


    xit('support hls', function () {

        runs(function () {
            Player.play({
                url: Config.hls,
                type: 'hls'
            });
        });


        var spy = jasmine.createSpy('ready handler');
        Player.on('ready', spy);
        waitsFor(function () {
            return spy.calls.length == 1
        }, 'ready have been triggered', 20000);
    });
});