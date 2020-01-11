(function ($) {

    $.fn.destaque = function (options) {
        PosiLog.logDebug(options);
        this.opts = jQuery.extend($.destaqueDefaultOptions, options || {});
        getDestaques($(this), this.opts);

    }

    function getDestaques(target, opts) {
        PosiLog.logDebug("[$.ajax] Destaques >>>>>>>>> Inciando chamada Ajax [" + opts.templateUrl + "] ....");

        $.ajax({
            url: opts.templateUrl,
            cache: false,
            success: function (htmlTemplate) {
                PosiLog.logDebug("[$.ajax] Destaques >>>>>>>>> Inciando chamada Ajax [" + opts.dataSourceUrl + "] ....");

                $.ajax({
                    url: opts.dataSourceUrl,
                    cache: false,
                    dataType: "json",
                    type: "post",
                    success: function (jSonDS, textStatus, XMLHttpRequest) {

                        htmlTemplate = htmlTemplate.replace(/<<StaticContent>>/g, opts.staticContentUrl);
                        PosiLog.logDebug("[$.ajax.success] Destaques >>>>>>>>> Inserindo resultado na pagina. \ntextStatus: [" + textStatus + "]\ndata: [" + jSonDS + "]");

                        var template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });
                        var html = template.expand(jSonDS);
                        target.html(html);


                        /*
                        target.find("#meu-espaco-destaque-triger").fancybox({
                        'autoDimensions': true
                        });

                        target.find("#meu-espaco-destaque-triger").attr("href", "#meu-espaco-destaque"); // O IE CONSEGUIU MUDAR O HREF DO LINK. Tem que manter essa linha para consertar.
                        target.find("#meu-espaco-destaque-triger").trigger("click");
                        */
                        target.find("#meu-espaco-destaque-triger").attr("href", "#meu-espaco-destaque"); // O IE CONSEGUIU MUDAR O HREF DO LINK. Tem que manter essa linha para consertar.
                        target.find("#meu-espaco-destaque-triger").fancybox({
                            'autoDimensions': true,
                            'onComplete': function () {
                                if ($("#meu-espaco-destaque").height() > 0) {
                                    $.fancybox.changeSize($("#meu-espaco-destaque").width(), $("#meu-espaco-destaque").height()); //Garante o tamanho no IE8
                                }
                            },
                            'onClosed': function () {
                                $.ajax({
                                    url: opts.dataSourceOkUrl,
                                    cache: false,
                                    dataType: "json",
                                    type: "post",
                                    success: function (jSonDS, textStatus, XMLHttpRequest) {
                                        PosiLog.logDebug("[$.ajax.success] Destaques >>>>>>>>> DataSourceOk!!! ");
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        PosiLog.logError("[$.ajax.error] Destaques >>>>>>>>> DataSourceOk  ");
                                    }
                                });
                            }
                        });
                        if (jSonDS) {
                            if (jSonDS[0] != 0 && typeof jSonDS[0] != "undefined") {
                                if (!jSonDS[0].bolAbriuDestaque) {
                                    target.find("#meu-espaco-destaque-triger").trigger("click");
                                }
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        PosiLog.logError("[$.ajax.error] Destaques >>>>>>>>> Erro ao tentar carregar .... \n" + textStatus + "\n\n" + XMLHttpRequest.toString())
                    }
                });
            }
        });
    }



    $.destaqueDefaultOptions =
{
    dataSourceUrl: '',
    dataSourceOkUrl: '',
    templateUrl: '',
    staticContentUrl: ''
}

})(jQuery);