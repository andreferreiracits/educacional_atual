(function ($) {

    $.fn.CursoAluno = function (options) {
        this.opts = jQuery.extend($.cursoMatriculaDefaultOptions, options || {});
        getCursoAluno($(this), this.opts);

    }

     $.cursoMatriculaDefaultOptions =
    {
        dataSourceUrl: '',
        templateUrl: ''
    }

    function getCursoAluno(target, opts) {

        $.ajax({
            url: opts.templateUrl,
            cache: false,
            success: function (htmlTemplate) {
                $.ajax({
                    url: opts.dataSourceUrl,
                    cache: false,
                    dataType: "json",
                    type: "post",
                    success: function (jSonDS, textStatus, XMLHttpRequest) {
                        var template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });
                        var html = template.expand(jSonDS);
                        target.html(html);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        PosiLog.logError("[$.ajax.error] Cursos >>>>>>>>> Erro ao tentar carregar .... \n" + textStatus + "\n\n" + XMLHttpRequest.toString())
                    }
                });
            }
        });
    };
    
})(jQuery);