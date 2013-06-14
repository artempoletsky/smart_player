describe('Player', function () {
    it('plays video file, sends ready event when player is started', function () {
        var spy = jasmine.createSpy();
        Player.on('ready', spy);
        Player.play({
            url: Config.trailer
        });
        waitsFor(function () {
            return spy.calls.length == 1
        }, 'ready have been triggered', 10000);
    });
});