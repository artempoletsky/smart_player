describe('Player', function () {
    it('plays video file, sends ready event when player is started', function () {
        var spy = jasmine.createSpy();
        Player.on('ready', spy);
        Player.play({
            url: 'blob:https%3A//www.youtube.com/d6db1fbf-b1dd-4626-b462-fcad70d2b2c1'
        });
        waitsFor(function () {
            return spy.calls.length == 1
        });
    });
});