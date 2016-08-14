+(function($, window, document) { "use strict";
    var $window = $(window);

    $.fn.lazy = function(fn) {
        var elements = this;
        var evetName = "triggerEvent";

        $(document).ready(function() {
            update();
        });

        $window.on("scroll resize", function() {
            update();
        });

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            $self.one(evetName, function() {
                if (!this.loaded) {
                    fn(self);
                    self.loaded = true;
                }
            });

            $self.on("scroll", function() {
                if (!self.loaded) {
                    $self.trigger(evetName);
                }
            });
        });

        function update() {
            elements.each(function() {
                var $this = $(this);
                var scrollTop = ($window.scrollTop() + $window.innerHeight());
                var elementOffsetTop = $this.get(0).offsetTop;
                if (scrollTop >= elementOffsetTop) {
                    $this.trigger(evetName);
                }
            });
        }

        return this;
    }
})(jQuery, window, document);
