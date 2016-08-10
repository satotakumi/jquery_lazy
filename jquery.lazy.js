+(function($, window, document) { "use strict";
    var $window = $(window);

    $.fn.lazy = function(options) {
        var elements = this;

        $window.on("resize", function() {
            update();
        });

        $(document).ready(function() {
            update();
        });

        $window.on("scroll", function() {
            update();
        });

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.requested = false;

            $self.one("appear", function() {
                if (!this.requested) {
                    // TODO: after appear
                    self.requested = true;
                }
            });

            $self.on("scroll", function() {
                if (!self.requested) {
                    $self.trigger("appear");
                }
            });
        });

        function update() {
            elements.each(function() {
                var $this = $(this);
                // TODO: Write someting
            })
        }

        return this;
    }
})(jQuery, window, document);
