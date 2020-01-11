
//menu passos
(function (P, $) {
    "use strict";

    P.add("avl_stps", function () {
        var me = this;

        var eventPre = "pre_next";

        function _init($ul) {
            me.chain.add(undefined, eventPre, function (next) {  next(); });
        };


        this.render = function ($ul) {
            _init($ul);
            _link($ul);
            _hide($ul);
        };

        this.click = function ($a) {
            var link = $a.attr('href');
            var menu = me.element($a, "menu");
            _selectStep(menu.find('a[href="' + link + '"]'));
        };


        function _hide($ul) {
            var $ativo;
            $ul.find('li > a').each(function () {
                var strTarget = $(this).attr('href')
                var target = P.$(strTarget);
                if (!_selected($(this))) {
                    $ativo = $(this);
                    target.hide();
                } else {
                    target.show();
                }
            });

        };

        function _link($ul) {
            $ul.find('a').each(function () {
                $(this).click(function (evt) {
                    _selectStep($(this));
                    evt.preventDefault();
                });
            });
        };

        function _selected($a) {
            return $a.attr('aria-selected') || false;
        };

        function _selectStep($ativar) {
            var $ul = $ativar.closest('ul');
            var $ativo = $ul.find('[aria-selected="true"]');
            me.chain.fire($ativo, eventPre, function () {
                $ul.find('a').removeAttr('aria-selected')
                $ativar.attr("aria-selected", "true");
                _hide($ul);

                me.events.dispatch($ativar, 'end_open');
            });

        };



    });

})(PlungerJs, jQuery);