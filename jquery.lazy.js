!(function($, window, document) {
    var $window = $(window);

    $.fn.lazyRequest = function(options) {
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
                    var impressionId = $self.attr('data-iid');
                    var adId = $self.attr('data-aid');
                    post({
                        impression_id: impressionId,
                        ad_id: adId,
                    });
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
                if ($window.scrollTop() >= Math.floor($this.offset().top)) {
                     $this.trigger("appear");
                }
            })
        }

        function post(params) {
            $.ajax({
                type: 'POST',
                url: '/0/views',
                data: params
            });
        }

        return this;
    }
})(jQuery, window, document);