+(function($, window, document) { "use strict";
    var $window = $(window);

    $.fn.lazy = function(fn) {
        var elements = this;

        $window.on("resize", function() {
            __update();
        });

        $(document).ready(function() {
            __update();
        });

        $window.on("scroll", function() {
            __update();
        });

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            $self.one("appear", function() {
                if (!this.loaded) {
                    fn(self);
                    self.loaded = true;
                }
            });

            $self.on("scroll", function() {
                if (!self.loaded) {
                    $self.trigger("appear");
                }
            });
        });

        function __update() {
            elements.each(function() {
                var $this = $(this);
                var scrollTop = ( $window.scrollTop() + $window.innerHeight() );
                var elementOffsetTop = $this.get(0).offsetTop;
                if (scrollTop >= elementOffsetTop) {
                  $this.trigger("appear");
                }
            });
        }

        return this;
    }
})(jQuery, window, document);
