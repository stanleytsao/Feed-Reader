$(function() {

    describe('RSS Feeds', function() {
        
        // Tests to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeTruthy();
        });

        // Tests each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        function testURLdefined(obj) {
            it('Feed ' + obj + ' URL defined', function() {
                expect(allFeeds[obj].url).toBeTruthy();
            });
        }
        
        // Tests each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        function testNameDefined(obj) {
            it('Feed ' + obj + ' name defined', function() {
                expect(allFeeds[obj].name).toBeTruthy();
            });
        }

        for (var obj = 0; obj < allFeeds.length; obj++) {
            testURLdefined(obj);
            testNameDefined(obj);
        }

    });

    describe('The menu', function() {
        
        var $body = $(document.body);
        var $icon = $('.menu-icon-link')

        // Tests that the menu element is hidden by default
        it('hidden by default', function() {
            expect($body.hasClass("menu-hidden")).toBe(true);
        });

        // Tests that the menu changes visibility when the menu icon is clicked and hides when clicked again.
        it ('visibility changes on click', function() {
            $icon.click();
            expect($body.hasClass("menu-hidden")).toBe(false);
            $icon.click();
            expect($body.hasClass("menu-hidden")).toBe(true);
        });

    });

    describe('Initial Entries', function() {

        // Async load finishes before testing
        beforeEach(function(done) {
            loadFeed(0,done);         
        });
        
        // Tests that when the loadFeed function is called and completes its work, there is at least a single entry element within the feed container
        it ('at least 1 entry', function() {
            var $entries = $('.feed .entry');
            expect($entries.length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function() {

        var $feed = $('.feed');
        var oldContent, newContent;
        
        // Async load finishes before testing
        beforeEach(function(done) {            
            loadFeed(1, function() {
                oldContent = $feed.find("h2").text();
                done();
            });
        });
        
        // Tests that when a new feed is loaded by the loadFeed function that the content actually changes.
        it ('changes the content', function(done) {
            loadFeed(0, function() {
                newContent = $feed.find("h2").text();
                expect(newContent).not.toEqual(oldContent);
                done();
            });
        });    

    });  

}());
