(function ($) {

    $.fn.atualizaCadastro = function (options) {
        PosiLog.logDebug(options);
        this.opts = jQuery.extend($.atualizaCadastroDefaultOptions, options || {});
        getAtualizaNotificacao($(this), this.opts);

    }

    function getAtualizaNotificacao(target, opts) {
        PosiLog.logDebug("[$.ajax] AtualizaCadastro >>>>>>>>> Inciando chamada Ajax [" + opts.templateUrl + "] ....");

        $.ajax({
            url: opts.templateUrl,
            cache: false,
            success: function (htmlTemplate) {
                PosiLog.logDebug("[$.ajax] AtualizaCadastro >>>>>>>>> Inciando chamada Ajax [" + opts.dataSourceUrl + "] ....");

                $.ajax({
                    url: opts.dataSourceUrl,
                    cache: false,
                    dataType: "json",
                    type: "post",
                    success: function (jSonDS, textStatus, XMLHttpRequest) {

                        htmlTemplate = htmlTemplate.replace(/<<StaticContent>>/g, opts.staticContentUrl);
                        PosiLog.logDebug("[$.ajax.success] AtualizaCadastro >>>>>>>>> Inserindo resultado na pagina. \ntextStatus: [" + textStatus + "]\ndata: [" + jSonDS + "]");

                        var template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });

                        var html = template.expand(jSonDS);

                        target.html(html);
                        /*
                        target.find("#meu-espaco-atualiza-email-triger").fancybox({
                        'autoDimensions': true,
                        'showCloseButton': false
                        });

                        target.find("#meu-espaco-atualiza-email-triger").attr("href", "#meu-espaco-atualiza-email"); // O IE CONSEGUIU MUDAR O HREF DO LINK. Tem que manter essa linha para consertar.
                        target.find("#meu-espaco-atualiza-email-triger").trigger("click");
                        */
                        target.attr("href", "#meu-espaco-atualiza-email"); // O IE CONSEGUIU MUDAR O HREF DO LINK. Tem que manter essa linha para consertar.
                        target.fancybox({
                            'autoDimensions': true,
                            'showCloseButton': false,
                            'onClosed': function () {
                                $.ajax({
                                    url: opts.dataSourceOkUrl,
                                    cache: false,
                                    dataType: "json",
                                    type: "post",
                                    success: function (jSonDS, textStatus, XMLHttpRequest) {
                                        PosiLog.logDebug("[$.ajax.success] AtualizaCadastro >>>>>>>>> DataSourceOk!!! ");
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        PosiLog.logError("[$.ajax.error] AtualizaCadastro >>>>>>>>> DataSourceOk  ");
                                    }
                                });
                            }
                        });

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        PosiLog.logError("[$.ajax.error] AtualizaCadastro >>>>>>>>> Erro ao tentar carregar .... \n" + textStatus + "\n\n" + XMLHttpRequest.toString())
                    }
                });
            }
        });
    }



    $.atualizaCadastroDefaultOptions =
{
    dataSourceUrl: '',
    dataSourceOkUrl: '',
    templateUrl: '',
    staticContentUrl: ''
}

})(jQuery);