function abreListaAnotacoes(idCurso, idMateria, idTurma, strCursoEscola, strMateria, strTurma) {
    document.frmListaAnotacoes.idCursoEscolaAnotacao.value = idCurso;
    document.frmListaAnotacoes.target = "_self";
    document.frmListaAnotacoes.strCursoAnotacao.value = strCursoEscola;
    document.frmListaAnotacoes.strMateriaAnotacao.value = strMateria;
    document.frmListaAnotacoes.strTurmaAnotacao.value = strTurma;
    document.frmListaAnotacoes.idMateriaAnotacao.value = idMateria;
    document.frmListaAnotacoes.idTurmaAnotacao.value = idTurma;
    document.frmListaAnotacoes.submit();
}

function abreAtividades(idCurso, idMateria, idTurma, strCursoEscola, strMateria, strTurma) {
    document.frmDadosAtiv.idCursoEscola.value = idCurso;
    document.frmDadosAtiv.target = "_self";
    document.frmDadosAtiv.strCurso.value = strCursoEscola;
    document.frmDadosAtiv.strMateria.value = strMateria;
    document.frmDadosAtiv.strTurma.value = strTurma;
    document.frmDadosAtiv.idMateria.value = idMateria;
    document.frmDadosAtiv.idTurma.value = idTurma;
    document.frmDadosAtiv.submit();
}

function abreLista(idCurso, idMateria, idTurma, intTipo, strCursoEscola, strMateria, strTurma, opcao) {
    document.frmListas.IdCursoEscola.value = idCurso;
    document.frmListas.strCurso.value = strCursoEscola;
    document.frmListas.strMateria.value = strMateria;
    document.frmListas.strTurma.value = strTurma;
    document.frmListas.IdMateria.value = idMateria;
    document.frmListas.IdTurma.value = idTurma;
    document.frmListas.intTipo.value = intTipo;
    document.frmListas.action = "/academico/servicos/planodeensino/pea_list.asp?strRetorno=mp&StrOpQtd=" + opcao;
    document.frmListas.submit();
}

function abreListaAvisos(idCurso, idMateria, idTurma) {
    document.frmListaAvisos.target = "_self";
    document.frmListaAvisos.CE.value = idCurso;
    document.frmListaAvisos.M.value = idMateria;
    document.frmListaAvisos.T.value = idTurma;
    document.frmListaAvisos.submit();
}

function abreListaDebateEntrega(idCurso, idMateria, idTurma, intTipo) {
    document.frmListaDebate.target = "_self";
    document.frmListaDebate.CE.value = idCurso;
    document.frmListaDebate.M.value = idMateria;
    document.frmListaDebate.T.value = idTurma;
    document.frmListaDebate.submit();
}

function abreFAQ(url) {
    window.open("/academico/servicos/unvwiki/administrador/redirect.asp?wiki=/" + url);
}

function exibirMaterialApoioCDT(idCursoEscola, idMateria, idTurma, strCursoEscola, strMateria, strTurma, op) {
    document.formMaterialApoioCDT.idCursoEscola.value = idCursoEscola;
    document.formMaterialApoioCDT.idMateria.value = idMateria;
    document.formMaterialApoioCDT.idTurma.value = idTurma;
    document.formMaterialApoioCDT.strCursoEscola.value = strCursoEscola;
    document.formMaterialApoioCDT.strMateria.value = strMateria;
    document.formMaterialApoioCDT.strTurma.value = strTurma;
    document.formMaterialApoioCDT.op.value = 0;
    document.formMaterialApoioCDT.submit()
}

function StartScorm(idAplicacao, idConteudo, intSatisfactionStatus) {
    if (intSatisfactionStatus == 2) {
        parent.alertaPadrao(idAplicacao, idConteudo);
    }
    else {
            window.parent.location.href = '/academico/servicos/unvScorm/visualizacao.asp?t=0&idAplicacao=' + idAplicacao + '&idConteudo=' + idConteudo
    }
    return (false);
}


var alertaPadrao = function (idSCOAplicacao, idSCOConteudo) {
	$('body').append('<a href="/academico/servicos/unvScorm/Scorm_concluido.asp?idSCOAplicacao='+ idSCOAplicacao + '&idSCOConteudo=' + idSCOConteudo +'" id="alerta-padrao"></a>');
	$("#alerta-padrao").fancybox({
		'width'				: '5',
		'height'			: '2',
		'autoScale'			: true,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'type'				: 'iframe'
	});
	$('#alerta-padrao').click();
};

function showScormInfo(IdCursoEscola, IdMateria, idTurma) {
    $('<a />')
        .attr('href', '/academico/servicos/minhaPagina/scorm_list_cdt_new.asp?IdCursoEscola=' + IdCursoEscola + '&IdMateria=' + IdMateria + '&idTurma=' + idTurma)
        .fancybox({
            'width': 700
        })
        .click();
    return false;
}


(function ($) {
    // Para a visao do ALUNO
    $.fn.posiCursos = function (options) {
        $.cursoDefaultOptions =
            {
                dataSourceUrl: '',
                templateUrl: '',
                imgRootUrl: '',
                staticContentUrl: '',
                anteriores: false,
                futuros: false,
                filtro: '',
                ano: 0,
                ordenacao: ''
            };

        var opts = jQuery.extend({}, $.cursoDefaultOptions, options);

        var templateUrl = opts.templateUrl;
        // closure para armazenar template
        var cursosTemplate = (function () {
            var t;

            $.ajax({
                async: false,
                url: templateUrl,
                cache: false,
                success: function (template) {
                    t = template;
                }
            });

            return t;
        })();

        var htmlTemplate = cursosTemplate.replace(/<<imgRootUrl>>/g, opts.imgRootUrl);

        var target = $(this);

        $(this).parent().find("#bt-correntes").click(function (e) {
            showLoading("#aba-curso-content", opts.staticContentUrl);
            getCursos(htmlTemplate, target, opts, false, false, opts.filtro, opts.paginaAtual, opts.ordenacao);
            e.preventDefault();
        });
        $(this).parent().find("#bt-anteriores").click(function (e) {
            showLoading("#aba-curso-content", opts.staticContentUrl);
            opts.ano = $("#slcAno").val();
            getCursos(htmlTemplate, target, opts, true, false, opts.filtro, opts.paginaAtual, opts.ordenacao);
            e.preventDefault();
        });
        $(this).parent().find("#bt-futuros").click(function (e) {
            showLoading("#aba-curso-content", opts.staticContentUrl);
            getCursos(htmlTemplate, target, opts, false, true, opts.filtro, opts.paginaAtual, opts.ordenacao);
            e.preventDefault();
        });

        getCursos(htmlTemplate, $(this), opts, opts.anteriores, opts.futuros, opts.filtro, opts.paginaAtual, opts.ordenacao);
    }

    function showLoading(target, staticContentUrl)
    {
        $(target).html(
            $("<img />")
            .attr("src", staticContentUrl + "/Common/img/icon/carregando.gif")
            .css("position", "absolute")
            .css("top", "50%")
            .css("right", "50%")
        );
    }

    function getCursos(htmlTemplate, target, opts, _anteriores, _futuros, _filtro, _paginaAtual, _ordenacao) {
        var targetBt = "#bt-correntes";

        if (_anteriores) {
            targetBt = "#bt-anteriores";
        }

        if (_futuros) {
            targetBt = "#bt-futuros";
        }


        PosiLog.logDebug("[$.ajax.error] Cursos -> Iniciando chamada\n");
        $.ajax({
            url: opts.dataSourceUrl,
            type: 'GET',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            cache: false,
            data: {
                tipo: 'cursos',
                anteriores: _anteriores,
                futuros: _futuros,
                ano: opts.ano
            },
            success: function (jSonDS, textStatus, XMLHttpRequest) {
                htmlTemplate = htmlTemplate.replace(/<<staticContent>>/g, opts.staticContentUrl);
                PosiLog.logDebug("[$.ajax.error] Cursos -> dados recebidos\n");
                var template = jsontemplate.Template(htmlTemplate, { more_formatters: JSON.stringify });
                var html = template.expand(jSonDS);

                target.html(html);

                // Adiciona eventos para o clique dos botoes.
                target.parent().find("#bt-correntes")
                        .removeClass('selected')
                        .html(opts.bt_correntes);
                target.parent().find("#bt-anteriores")
                        .removeClass('selected')
                        .html(opts.bt_anteriores);
                target.parent().find("#bt-futuros")
                        .removeClass('selected')
                        .html(opts.bt_futuros);

                // Adiciona estilo "selecionado" ao botao que foi clicado.
                target.parent().find(targetBt).addClass('selected');
                target.parent().find(targetBt).append($('<span class=\'abadown\'><img src=\'' + opts.imgRootUrl + '/seta.png\' /></span>'));

                if (targetBt == "#bt-anteriores") {
                    $("#Ano").show();
                }
                else {
                    $("#Ano").hide();
                }

                // Adiciona eventos para exibicao em modo simples ou detalhado.
                target.find(".detalhes-link").unbind("toggle").toggle(
                            function (e) { //Detalhado
                                var img = $(this).children()[0];
                                $(this).parent().parent().find(".detalhes-container").show();
                                img.setAttribute("src", img.getAttribute("src").substring(0, img.getAttribute("src").lastIndexOf("/")) + "/ic_menos.png");
                                e.preventDefault();
                            },
                            function (e) { //Simples
                                var img = $(this).children()[0];
                                $(this).parent().parent().find(".detalhes-container").hide();
                                img.setAttribute("src", img.getAttribute("src").substring(0, img.getAttribute("src").lastIndexOf("/")) + "/ic_mais.png");
                                e.preventDefault();
                            }
                        );
                if (target.is(":visible")) {
                    target.show(0);
                }


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                PosiLog.logError("[$.ajax.error] Cursos >>>>>>>>> Erro ao tentar carregar .... \n" + textStatus + "\n\n" + XMLHttpRequest.toString())
            }
        });
    }
})(jQuery);