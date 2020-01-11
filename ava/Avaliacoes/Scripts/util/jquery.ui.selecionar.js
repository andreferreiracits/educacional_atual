(function($, undefined) {
    $.widget("ui.selecionar", {
        options: undefined,

        _create: function() {
            if (this.options != undefined)
                this._refreshValue();
        },

        destroy: function() {

        },

        _setOption: function(key, value) {
            if (key === "check") {
                this.options.check = value;
            } else if (key === "id") {
                this.options.id = value;
            } else {
                return;
            }
            $.Widget.prototype._setOption.apply(this, arguments);

            this._refreshValue();
        },

        _refreshValue: function() {
            var id = this.options.id;
            var check = this.options.check;

            $(this.element).click(function() {
                var texto = "input[id*='" + id + "']";

                $(texto).each(function() {
                    if (check)
                        $(this).attr("checked", "checked");
                    else
                        $(this).removeAttr("checked");
                });
            });
        }
        
        
    });

    $.extend($.ui.selecionar, {
        version: "1.0.0"
    });
    

})(jQuery);