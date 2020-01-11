var idUsuarioCript = 0;
var idFerramentaTipoTimeLine = 35; //constante
var idFerramentaTipoTimeLineFile = 37; //constante
var idFerramentaBanner = 43; //constante

var GlobalPaginacaoModalInicio = 1;
var GlobalPaginacaoModalFim = 12;
var GlobalPaginacaoContador = 0;
var idLoadedGlobal = false;

var timeoutPreview = null;

//Assuntos
var idNovoAssunto = -1;
var auxAssuntos = new Object();
auxAssuntos.Adicionar = new Array();
auxAssuntos.Editar = new Array();
auxAssuntos.Remover = new Array();
auxAssuntos.Mover = new Array();
var objAssuntoCadastrado = { idAssunto: 0, strAssunto: '' };
var timeoutMensagemAssunto = null;
var bolAtualizarMuralDepoisDeAssuntos = false;

var objetoImagens = {
    imagens: new Array()
};
var objetoArquivos = {
    arquivos: new Array()
};

var objetoImagemBanner = {
    id: 0
};

var tpClick = "click"; // web
var mobile = false;
if (Modernizr.touch) {
    mobile = true;
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
        tpClick = "click";
    } else {
        //o touchstart estava gerando mais erros do que acertos
        //tpClick = "touchstart"; //mobile
    }
}

var idComp = '';
var classComp = '';
var editID = 0;

var bolFezAlteracaoConfiguracoes = false;
var strMensagemConfiguracaoNaoSalvaUnload = "Você fez alterações nesta página que ainda não foram salvas.";
var strMensagemConfiguracaoNaoSalva = "Você fez alterações nesta página que ainda não foram salvas. Tem certeza de que deseja sair?";
var _idMsgComentarioGlobal = null;

var objetoIdMensagemRapida = {
    idMsgRapida: new Array()
};
var destinoIdAssunto = null;
var destinoConfiguracoes = null;
var bolPassouNoBeforeUnload = false;
window.onbeforeunload = function (event) {
    bolPassouNoBeforeUnload = true;
    if (bolFezAlteracaoConfiguracoes === true) {
        return strMensagemConfiguracaoNaoSalvaUnload;
    }
};

function unloadipad() {
    if (bolPassouNoBeforeUnload === false) {
        if (bolFezAlteracaoConfiguracoes === true) {
            //if (!confirm(strMensagemConfiguracaoNaoSalvaUnload )) {
                
            //}
        }
    }
    bolPassouNoBeforeUnload = false;
}

jQuery(function ($) {
    //Verificando se ocorreu alteração 
    $('body').on('keyup change paste, input[name=strComentario]', function (e) {
        var achou = false;
        var i = 0;
        _idMsgComentarioGlobal = $(e.target).attr("ident");
        for (i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++) {
            if (objetoIdMensagemRapida.idMsgRapida[i] == _idMsgComentarioGlobal) {
                achou = true;
                break;
            }
        }
        if (!achou && !$(e.target).val() == "" && _idMsgComentarioGlobal !== undefined) {
            objetoIdMensagemRapida.idMsgRapida.push(_idMsgComentarioGlobal);
        } else {
            achou = false;
        }

        if (!$(e.target).val() == "" && _idMsgComentarioGlobal !== undefined) {
            bolFezAlteracaoConfiguracoes = true;
        } else {
            if (_idMsgComentarioGlobal !== undefined) {
                objetoIdMensagemRapida.idMsgRapida.splice(i, 1);
                if (!objetoIdMensagemRapida.idMsgRapida.length > 0)
                    bolFezAlteracaoConfiguracoes = false;
            }
        }
    });

    //Tratando cache
    $('#idPostUnico').val($('#idPostUnico').attr('init'));
    $('#ckBolDestaque').removeAttr('checked');
    $('#hAssuntoTimeLine').val($('#hAssuntoTimeLine').attr('initvalue'));
    $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
    $('#ckAssuntoTimeLine' + $('#hAssuntoTimeLine').val()).attr('checked', 'checked');
    $('input.texto_banner').val('');
    $('.url_banner input').val('');

    if (window.location.hash) {
        try {
            //Verificando se é para abrir a pagina na aba de destaques
            var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
            if (hash.length > 0) {
                if (hash == "Destacados") {
                    $('.sessao_destacados').siblings().removeClass('ativo');
                    $('.sessao_destacados').addClass('ativo');
                }

                var hashTipo1 = hash;
                var hashTipo2 = hash;

                //Foi necessario tratar o hash de duas maneiras diferentes.
                //O Chrome adiciona alguns carateres se chamar apenas o unescape
                //O Firefox da erro de url mal formada se passar o unescape com decodeURI
                try {
                    //Chrome
                    hashTipo1 = unescape(decodeURI(hash));
                }
                catch (exha) { }

                try {
                    //Firefox
                    hashTipo2 = unescape(hash);
                }
                catch (exha) { }

                $('#cbAssuntoTimeLine li').each(function () {

                    var idAssuntoHash = $(this).attr('assu');
                    var strAssuntoHash = $(this).attr('strassu');

                    strAssuntoHash = unescape(decodeURI(encodeURI(strAssuntoHash)));

                    if (strAssuntoHash == hash || strAssuntoHash == hashTipo1 || strAssuntoHash == hashTipo2) {
                        idAssuntoHash = parseInt(idAssuntoHash);
                        if (idAssuntoHash >= 0) {
                            $('#hAssuntoTimeLine').val(idAssuntoHash);
                            $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
                            $('#ckAssuntoTimeLine' + idAssuntoHash).attr('checked', 'checked');
                            var textoComboHash = $('#ckAssuntoTimeLine' + idAssuntoHash).next().text() + '<span class=\"caret\"></span>';
                            $('#txtAssuntoTimeLine').html(textoComboHash);
                            $('.sessao_destacados').siblings().removeClass('ativo');
                            $('.sessao_destacados').addClass('ativo');
                        }
                    }

                });

            }
        } catch (exh) {
            console.log('Ocorreu um erro ao executar o #');
            console.log(exh);
        }
    }

    //Buscando noticias e idUsuarioCript
    if (idUsuarioCript != 0) {
        try {
            paginaEducacional_CarregarMural(false, 1);
            paginaEducacional_CarregarNoticias($.jStorage.get("noticiasPortal" + idUsuarioCript));
        } catch (err) {
            paginaEducacional_CarregarNoticias('');
            console.log('erro cache');
        }
    } else {
        $.ajax({
            type: 'POST',
            url: "/AVA/Login/Home/UsuarioCript",
            async: true,
            success: function (data) {
                idUsuarioCript = data;
                paginaEducacional_CarregarMural(false, 1);
            },
            error: function (data) {
                if (data.status != 0) {
                    idUsuarioCript = 0;
                }
            }
        });

        $.ajax({
            url: "/esc_include/inc_home/inc_barraDir_destaques_ava.asp",
            contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
            success: function (data) {
                paginaEducacional_CarregarNoticias(data);
                try {
                    $.jStorage.set("noticiasPortal" + idUsuarioCript, noticiasPortalValue);
                    $.jStorage.setTTL("noticiasPortal" + idUsuarioCript, 300000); // expires in 3 minutos
                } catch (err) {
                }
            },
            error: function (data) {
                console.log('Ocorreu um erro ao carregar as noticias');
                paginaEducacional_CarregarNoticias('');
            }
        });
    }
    //Fim busca noticias


    /*
    *    Diga lá  
    */

    ///////////////////////////////////////
    /// Assuntos
    ///////////////////////////////////////

    $('body').on(tpClick, 'section.dialogo .criar_editar_assunto.fancy', function () {
        var idPagina = $('#idPagina').val();
        $.fancybox({
            type: "ajax",
            href: "/AVA/Pagina/Home/ListaDeAssuntos/",
            ajax: {
                type: "POST",
                data: {
                    idPagina: idPagina
                },
                dataType: "html"
            },
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterShow: function () {
                auxAssuntos.Adicionar = new Array();
                auxAssuntos.Editar = new Array();
                auxAssuntos.Remover = new Array();
                auxAssuntos.Mover = new Array();
                objAssuntoCadastrado = { idAssunto: 0, strAssunto: '' };
                bolAtualizarMuralDepoisDeAssuntos = false;
                if (mobile) {
                    var auxWidthMobile = $('#criareditar.fancyAssuntos ._feed_lista_assunto ul').width();
                    auxWidthMobile = parseInt(auxWidthMobile) + 20;
                    $('#criareditar.fancyAssuntos ._feed_lista_assunto ul').width(auxWidthMobile);
                    $('#criareditar.fancyAssuntos ._feed_lista_assunto ul').mCustomScrollbar();
                }
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
                if (bolAtualizarMuralDepoisDeAssuntos) {
                    paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
                }

                if (objAssuntoCadastrado.idAssunto > 0) {
                    $('#hAssuntoPost').val(objAssuntoCadastrado.idAssunto);
                    $('#cbAssuntoPost input:checkbox').removeAttr('checked');
                    $('#ckAssuntoPost' + objAssuntoCadastrado.idAssunto).attr('checked', 'checked');
                    $('#txtAssuntoPost').html(objAssuntoCadastrado.strAssunto + '&nbsp;<span class="caret"></span>');
                } else {
                    $('#hAssuntoPost').val($('#hAssuntoPost').attr('initvalue'));
                    $('#cbAssuntoPost input:checkbox').removeAttr('checked');
                    $('#ckAssuntoPost' + $('#hAssuntoPost').val()).attr('checked', 'checked');
                    $('#txtAssuntoPost').html($('#ckAssuntoPost' + $('#hAssuntoPost').val()).next().text() + '&nbsp;<span class="caret"></span>');
                }
            },
            maxWidth: 425,
            maxHeight: 425,
            fitToView: false,
            width: 425,
            height: 425,
            padding: 0,
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            hideOnContentClick: false,
            closeEffect: 'none'
        });
    });

    //Criar novo                
    $('body').on(tpClick, '#criareditar .link_direto', function () {
        $(this).hide();

        $(this).siblings('input').show().focus();
        $(this).siblings('.inputAssuntoLimpar').show();
        //Cancelando edicao em andamento
        $('._feed_lista_assunto li.liassunto a:not(.inputAssuntoLimpar)').show();
        $('._feed_lista_assunto li.liassunto span:not(.icon_excluir)').show();
        $('._feed_lista_assunto li.liassunto input').hide();
        $('._feed_lista_assunto li.liassunto div').hide();
        $('._feed_lista_assunto li.liassunto a.inputAssuntoLimpar').hide();
        $('._feed_lista_assunto li.liassunto a.salvarEditar_link').hide();
        $('._feed_lista_assunto li.liassunto span.liassuntonome').each(function () {
            $(this).siblings('input').val($(this).text());
        });
        $('.salvar_link').show();
    });

    $('body').on(tpClick, '#criareditar', function (efk) {
        if ($(efk.target).parent().hasClass("inputAssuntoLimpar") || $(efk.target).hasClass("icon_limpar")) {
            var $liAux = $(efk.target).closest('li');
            $('input', $liAux).val('').focus();
        } else if ($(efk.target).hasClass("_inputNovoAssunto") || $(efk.target).hasClass("_inputEditarAssunto") || $(efk.target).hasClass("mostra_input") || $(efk.target).hasClass("icon_editar") || $(efk.target).hasClass("link_direto")) {

        } else {
            if ($('#criareditar ._inputNovoAssunto').is(':visible')) {
                var elmAux = $('#criareditar ._inputNovoAssunto')
                $(elmAux).removeClass("obrigatorio");
                $(elmAux).prev().hide();
                $(elmAux).hide();
                $(elmAux).siblings('.inputAssuntoLimpar').hide();
                $(elmAux).siblings('a:not(.inputAssuntoLimpar)').show();
                $(elmAux).val('');
                $(elmAux).siblings('.salvar_link').hide();
            }

            $('._feed_lista_assunto li.liassunto input:visible').each(function () {
                var $liAux = $(this).closest('li');
                $('a:not(.inputAssuntoLimpar)', $liAux).show();
                $('a.inputAssuntoLimpar', $liAux).hide();
                $('span:not(.icon_excluir)', $liAux).show();
                $('input', $liAux).hide();
                $('div', $liAux).hide();
                $('.salvarEditar_link').hide();
                $('span.liassuntonome', $liAux).each(function () {
                    $(this).siblings('input').val($(this).text());
                });
            });
        }
    });
    //botao salvar novo assunto
    $('body').on(tpClick, '#criareditar .salvar_link', function (efk) {
        idNovoAssunto--;
        var nomeAssunto = $.trim($('._inputNovoAssunto').val());
        if (nomeAssunto.length > 0) {

            var bolAssuntoExiste = nomeAssunto.toLowerCase() == "geral";
            if (!bolAssuntoExiste) {
                $('.liassunto .liassuntonome').each(function () {
                    if (nomeAssunto.toLowerCase() == $(this).text().toLowerCase()) {
                        bolAssuntoExiste = true;
                    }
                });
            }

            if (bolAssuntoExiste) {
                $('.tooltip_obrigatorio p').text('Esse assunto já existe');
                $('._inputNovoAssunto').prev().show();
                $('._inputNovoAssunto').addClass("obrigatorio");
                $('.salvar_link').trigger();
            } else {
                $(this).removeClass("obrigatorio");
                $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                var htmlNovoAssunto = '<li assu="' + idNovoAssunto + '" class="liassunto">' +
                                  '<a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a>' +
                                  '<span class="liassuntonome">' + nomeAssunto + '</span>' +
                                  '<a href="javascript:void(0);" class="feed_confirma_exclui assusmpst"><span class="fontello icon_excluir"></span></a>' +
                                  '<div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto é obrigatório</p><span class="seta_baixo"></span></div>' +
                                  '<input class="_inputEditarAssunto" type="text" value="' + nomeAssunto + '" maxlength="40" placeholder="Nome assunto"/>' +
                                  '<a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a>' +
                                  '<a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a>' +
                                  '</li>';
                $(this).parent().after(htmlNovoAssunto);
                $(this).blur();
                $(this).hide();
                $(this).siblings('a:not(.inputAssuntoLimpar)').show();
                $(this).siblings('a.inputAssuntoLimpar').hide();
                $(this).val('');

                var objAssunto = new Object();
                objAssunto.idAssunto = idNovoAssunto;
                objAssunto.strAssunto = nomeAssunto;
                auxAssuntos.Adicionar.push(objAssunto);

                $('.acoesResultado').text('Assunto criado');
                GravarAssuntosCadastrados(0);
                $('._inputNovoAssunto').siblings('.salvar_link').hide();
            }
        } else {
            $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
            $('._inputNovoAssunto').addClass("obrigatorio");
            $('._inputNovoAssunto').prev().show();
            $('.salvar_link').trigger();
        }
    });

    $('body').on('keyup', '#criareditar ._inputNovoAssunto', function (efk) {
        if (efk.keyCode == 13) {
            idNovoAssunto--;
            var nomeAssunto = $.trim($(this).val());
            if (nomeAssunto.length > 0) {

                var bolAssuntoExiste = nomeAssunto.toLowerCase() == "geral";
                if (!bolAssuntoExiste) {
                    $('.liassunto .liassuntonome').each(function () {
                        if (nomeAssunto.toLowerCase() == $(this).text().toLowerCase()) {
                            bolAssuntoExiste = true;
                        }
                    });
                }

                if (bolAssuntoExiste) {
                    $('.tooltip_obrigatorio p').text('Esse assunto já existe');
                    $(this).prev().show();
                    $(this).addClass("obrigatorio");
                } else {
                    $(this).removeClass("obrigatorio");
                    $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                    var htmlNovoAssunto = '<li assu="' + idNovoAssunto + '" class="liassunto">' +
                                  '<a href="javascript:void(0);" class="mostra_input"><span class="fontello icon_editar"></span></a>' +
                                  '<span class="liassuntonome">' + nomeAssunto + '</span>' +
                                  '<a href="javascript:void(0);" class="feed_confirma_exclui assusmpst"><span class="fontello icon_excluir"></span></a>' +
                                  '<div class="tooltip_obrigatorio" style="display:none;"><p>O nome do assunto é obrigatório</p><span class="seta_baixo"></span></div>' +
                                  '<input class="_inputEditarAssunto" type="text" value="' + nomeAssunto + '" maxlength="40" placeholder="Nome assunto"/>' +
                                  '<a href="javascript:void(0);" class="inputAssuntoLimpar" style="display:none;"><span class="fontello icon_limpar"></span></a>' +
                                  '<a href="javascript:void(0);" class="salvarEditar_link" style="display: none;"> Salvar</a>' +
                                  '</li>';
                    $(this).parent().after(htmlNovoAssunto);
                    $(this).blur();
                    $(this).hide();
                    $(this).siblings('a:not(.inputAssuntoLimpar)').show();
                    $(this).siblings('a.inputAssuntoLimpar').hide();
                    $(this).val('');

                    var objAssunto = new Object();
                    objAssunto.idAssunto = idNovoAssunto;
                    objAssunto.strAssunto = nomeAssunto;
                    auxAssuntos.Adicionar.push(objAssunto);

                    $('.acoesResultado').text('Assunto criado');
                    GravarAssuntosCadastrados(0);
                    $(this).siblings('.salvar_link').hide();
                }
            } else {
                $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                $(this).addClass("obrigatorio");
                $(this).prev().show();
            }
        } else if (efk.keyCode == 27) {
            $(this).hide();
            $(this).siblings('a:not(.inputAssuntoLimpar)').show();
            $(this).siblings('a.inputAssuntoLimpar').hide();
            $(this).val('');
            $('.tooltip_obrigatorio').hide();
            $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
            return false;
        } else {
            $(this).removeClass("obrigatorio");
            $(this).prev().hide();
            $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
        }
    });

    //Editar 
    $('body').on(tpClick, '#criareditar .mostra_input', function () {
        //Cancelando outras edicoes
        $('.link_direto').siblings('input').hide();
        $('.link_direto').siblings('.inputAssuntoLimpar').hide();
        $('.salvar_link').hide();
        $('.link_direto').show();
        $('.tooltip_obrigatorio').hide();
        $('._feed_lista_assunto li.liassunto a:not(.inputAssuntoLimpar)').show();
        $('._feed_lista_assunto li.liassunto a.inputAssuntoLimpar').hide();
        $('._feed_lista_assunto li.liassunto a.salvarEditar_link').hide();
        $('._feed_lista_assunto li.liassunto span:not(.icon_excluir)').show();
        $('._feed_lista_assunto li.liassunto input').hide();
        $('._feed_lista_assunto li.liassunto div').hide();
        $('._feed_lista_assunto li.liassunto span.liassuntonome').each(function () {
            $(this).siblings('input').val($(this).text());
        });

        $(this).hide();
        $(this).siblings('a, span').hide();
        $(this).siblings('.salvarEditar_link').show();
        $(this).siblings('a.inputAssuntoLimpar').show();
        $(this).siblings('input').show().focus().off('keyup');
        $(this).siblings('input').on('keyup', function (efk) {
            if (efk.keyCode == 13) {
                var nomeAssunto = $(this).val();
                if (nomeAssunto.length > 0) {

                    var bolAssuntoExiste = nomeAssunto.toLowerCase() == "geral";
                    var idAssuntoEdicao = parseInt($(this).closest('li').attr('assu'));

                    if (!bolAssuntoExiste) {
                        $('.liassunto:not(.liassunto[assu=' + idAssuntoEdicao + ']) .liassuntonome').each(function () {
                            if (nomeAssunto.toLowerCase() == $(this).text().toLowerCase()) {
                                bolAssuntoExiste = true;
                            }
                        });
                    }

                    if (bolAssuntoExiste) {
                        $('.tooltip_obrigatorio p').text('Esse assunto já existe');
                        $(this).prev().show();
                        $(this).addClass("obrigatorio");
                    } else {

                        $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                        $(this).removeClass("obrigatorio");
                        $(this).siblings('span').text(nomeAssunto);

                        if (idAssuntoEdicao < 0) {
                            //Assunto adicionado no js apenas
                            for (var i in auxAssuntos.Adicionar) {
                                if (auxAssuntos.Adicionar[i].idAssunto == idAssuntoEdicao)
                                    auxAssuntos.Adicionar[i].strAssunto = nomeAssunto;
                            }
                        } else if (idAssuntoEdicao > 0) {
                            var bolAssuntoEditado = false;
                            for (var i in auxAssuntos.Editar) {
                                if (auxAssuntos.Editar[i].idAssunto == idAssuntoEdicao) {
                                    bolAssuntoEditado = true;
                                    auxAssuntos.Editar[i].strAssunto = nomeAssunto;
                                }
                            }
                            if (!bolAssuntoEditado) {
                                var objAssunto = new Object();
                                objAssunto.idAssunto = idAssuntoEdicao;
                                objAssunto.strAssunto = nomeAssunto;
                                auxAssuntos.Editar.push(objAssunto);
                            }
                        } else {
                            //magica
                        }
                        $(this).siblings('a:not(.inputAssuntoLimpar), span').show();
                        $(this).siblings('a.inputAssuntoLimpar').hide();
                        $(this).blur();
                        $(this).hide();

                        $('.acoesResultado').text('Assunto editado');
                        bolAtualizarMuralDepoisDeAssuntos = true;
                        GravarAssuntosCadastrados(idAssuntoEdicao);
                        $(this).siblings('.salvarEditar_link').hide();
                    }
                } else {
                    $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                    $(this).addClass("obrigatorio");
                    $(this).prev().show();
                }
            } else if (efk.keyCode == 27) {
                $(this).val($(this).siblings('span').text());
                $(this).siblings('a:not(.inputAssuntoLimpar), span').show();
                $(this).siblings('a.inputAssuntoLimpar').hide();
                $(this).hide();
                $('.tooltip_obrigatorio').hide();
                $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                return false;
            } else {
                $(this).removeClass("obrigatorio");
                $(this).prev().hide();
                $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
            }
        });
    });
    //botao salvar editar assunto existente 
    $('body').on(tpClick, '#criareditar .salvarEditar_link', function (efk) {
        var nomeAssunto = $(this).siblings('input').val();
        if (nomeAssunto.length > 0) {

            var bolAssuntoExiste = nomeAssunto.toLowerCase() == "geral";
            var idAssuntoEdicao = parseInt($(this).closest('li').attr('assu'));

            if (!bolAssuntoExiste) {
                $('.liassunto:not(.liassunto[assu=' + idAssuntoEdicao + ']) .liassuntonome').each(function () {
                    if (nomeAssunto.toLowerCase() == $(this).text().toLowerCase()) {
                        bolAssuntoExiste = true;
                    }
                });
            }

            if (bolAssuntoExiste) {
                $('.tooltip_obrigatorio p').text('Esse assunto já existe');
                $(this).siblings('input').prev().show();
                $(this).siblings('input').addClass("obrigatorio");
                $('.salvar_link').trigger();
            } else {

                $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
                $(this).removeClass("obrigatorio");
                $(this).siblings('span').text(nomeAssunto);

                if (idAssuntoEdicao < 0) {
                    //Assunto adicionado no js apenas
                    for (var i in auxAssuntos.Adicionar) {
                        if (auxAssuntos.Adicionar[i].idAssunto == idAssuntoEdicao)
                            auxAssuntos.Adicionar[i].strAssunto = nomeAssunto;
                    }
                } else if (idAssuntoEdicao > 0) {
                    var bolAssuntoEditado = false;
                    for (var i in auxAssuntos.Editar) {
                        if (auxAssuntos.Editar[i].idAssunto == idAssuntoEdicao) {
                            bolAssuntoEditado = true;
                            auxAssuntos.Editar[i].strAssunto = nomeAssunto;
                        }
                    }
                    if (!bolAssuntoEditado) {
                        var objAssunto = new Object();
                        objAssunto.idAssunto = idAssuntoEdicao;
                        objAssunto.strAssunto = nomeAssunto;
                        auxAssuntos.Editar.push(objAssunto);
                    }
                } else {
                    //magica
                }
                $(this).siblings('a:not(.inputAssuntoLimpar), span').show();
                $(this).siblings('a.inputAssuntoLimpar').hide();
                $(this).blur();
                $(this).hide();

                $('.acoesResultado').text('Assunto editado');
                bolAtualizarMuralDepoisDeAssuntos = true;
                GravarAssuntosCadastrados(idAssuntoEdicao);
                $('._inputEditarAssunto').siblings('.salvarEditar_link').hide();
            }
        } else {
            $('.tooltip_obrigatorio p').text('O nome do assunto é obrigatório');
            $(this).siblings('input').addClass("obrigatorio");
            $(this).siblings('input').prev().show();
            $('.salvar_link').trigger();
        }
    });

    //Excluir
    $('body').on(tpClick, '#feed_confirma_RadioRemoverLabel', function () {
        $(this).addClass("inputRadioChecked");
        $('#feed_confirma_RadioMoverLabel').removeClass("inputRadioChecked");
    });

    $('body').on(tpClick, '#feed_confirma_RadioMoverLabel', function () {
        $(this).addClass("inputRadioChecked");
        $('#feed_confirma_RadioRemoverLabel').removeClass("inputRadioChecked");
    });

    $('body').on(tpClick, '#cbAssuntoEditar li label', function () {
        var idAssunto = $(this).parent().attr('assu');
        $('#hAssuntoEditar').val(idAssunto);
        $('#cbAssuntoEditar input[type=checkbox]').removeAttr('checked');
        $('#ckAssuntoEditar' + idAssunto).attr('checked', 'checked');
        var textoCombo = $(this).text() + '<span class=\"caret\"></span>';
        $('#txtAssuntoEditar').html(textoCombo);
        $('#cbAssuntoEditar').parent().removeClass('open');
        return false;
    });

    $('body').on(tpClick, '#criareditar .feed_confirma_exclui', function () {
        var idAssuntoRemover = $(this).parent().attr('assu');

        if ($(this).hasClass('assusmpst') || parseInt($(this).parent().attr('assu')) < 0) {
            $('.feed_confirma h2').text("Remover o asssunto " + $(this).siblings('span').text() + "?");
            $('#cbAssuntoEditar li[assu=' + idAssuntoRemover + ']').hide();
            $('#idAssuntoRemover').val(idAssuntoRemover);
            $('strong, label, div.bootstrap', '.feed_confirma').hide();

            $('#feed_confirma_RadioRemoverLabel, #feed_confirma_RadioMoverLabel').removeClass('inputRadioChecked');
            $('#feed_confirma_RadioRemoverLabel').addClass('inputRadioChecked');
            $('.feed_confirma input:radio').removeAttr('checked');
            $('#feed_confirma_RadioRemover').attr('checked', 'checked');

            $('._feed_lista_assunto').hide();
            $('.feed_confirma').slideDown();
        } else {
            $('.feed_confirma h2').text("Remover o asssunto " + $(this).siblings('span').text() + "?");
            $('#cbAssuntoEditar li[assu=' + idAssuntoRemover + ']').hide();
            $('#idAssuntoRemover').val(idAssuntoRemover);
            $('._feed_lista_assunto').hide();
            $('.feed_confirma').slideDown();
        }
    });

    $('body').on(tpClick, '#criareditar .feed_confirma .btn_cor', function () {
        var remover = $('#feed_confirma_RadioRemover').is(':checked');
        if (remover) {
            var idAssuntoRemover = $('#idAssuntoRemover').val();
            var novoArrayAssuntos = new Array();
            for (var i in auxAssuntos.Adicionar) {
                if (auxAssuntos.Adicionar[i].idAssunto != idAssuntoRemover) {
                    novoArrayAssuntos.push(auxAssuntos.Adicionar[i]);
                }
            }
            auxAssuntos.Adicionar = novoArrayAssuntos;
            auxAssuntos.Remover.push($('#idAssuntoRemover').val());
            $('._feed_lista_assunto li[assu=' + $('#idAssuntoRemover').val() + ']').remove();
            if (objAssuntoCadastrado.idAssunto == idAssuntoRemover)
                objAssuntoCadastrado = { idAssunto: 0, strAssunto: '' };
        } else { //Mover
            var objAssuntoRemover = new Object();
            var idAssuntoRemover = $('#idAssuntoRemover').val();
            objAssuntoRemover.idAssuntoOrigem = idAssuntoRemover;
            objAssuntoRemover.idAssuntoDestino = $('#hAssuntoEditar').val();
            auxAssuntos.Mover.push(objAssuntoRemover);
            $('._feed_lista_assunto li[assu=' + $('#idAssuntoRemover').val() + ']').remove();
            $('._feed_lista_assunto li[assu=' + objAssuntoRemover.idAssuntoDestino + '] .feed_confirma_exclui').removeClass('assusmpst');
            if (objAssuntoCadastrado.idAssunto == idAssuntoRemover)
                objAssuntoCadastrado = { idAssunto: 0, strAssunto: '' };
        }
        $('#cbAssuntoEditar li[assu=' + $('#idAssuntoRemover').val() + ']').remove();

        $('.acoesResultado').text('Assunto excluído');
        bolAtualizarMuralDepoisDeAssuntos = true;
        GravarAssuntosCadastrados(0);
        cancelarRemoverAssunto();
    });

    $('body').on(tpClick, '#criareditar .feed_confirma .btn_cinza', cancelarRemoverAssunto);

    $('body').on(tpClick, '._feed_lista_assunto .acoes .btn_cinza', function () {
        $.fancybox.close();
    });

    ///////////////////////////////////////
    /// Fim Assuntos
    ///////////////////////////////////////


    //Texto do diga lá e scroll inicial imagens e arquivos
    $('#txtInput').elastic();
    $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar({
        horizontalScroll: true,
        advanced: {
            autoExpandHorizontalScroll: true
        }
    });
    $(".dialogo_box .preview_post.arquivos").mCustomScrollbar();

    //Combo do diga lá
    //Tratando cache desconhecido
    $('#editando').val(0);
    $('#hAssuntoPost').val($('#hAssuntoPost').attr('initvalue'));
    $('#cbAssuntoPost input[type=checkbox]').removeAttr('checked');
    $('#ckAssuntoPost' + $('#hAssuntoPost').val()).attr('checked', 'checked');

    $('body').on(tpClick, '#cbAssuntoPost li', function () {
        if (!($(this).hasClass('li_criar_editar_assunto') || $(this).parent().hasClass('li_criar_editar_assunto'))) {
            var idAssunto = $(this).attr('assu');
            $('#hAssuntoPost').val(idAssunto);
            $('#cbAssuntoPost input[type=checkbox]').removeAttr('checked');
            $('#ckAssuntoPost' + idAssunto).attr('checked', 'checked');
            var textoCombo = $('label', this).text() + '<span class=\"caret\"></span>';
            $('#txtAssuntoPost').html(textoCombo);
            $('#cbAssuntoPost').parent().removeClass('open');
        }
    });

    //DatePicker agendamento
    $('#horaAgendamento').val($('#horaAgendamento').attr('placeholder'));
    $('#dataAgendamento').val($('#dataAgendamento').attr('placeholder'));
    $('#horaAgendamento').setMask('99:99');
    $('#dataAgendamento').setMask('99/99/9999');
    $('#hHoraAgendamento').val($('#horaAgendamento').val());
    $('#hDataAgendamento').val($('#dataAgendamento').val());
    $('#postAgendado').val(0);

    $('#dataAgendamento').datepicker({
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        minDate: new Date(),
        onSelect: function (eventArg) {
            $('#hDataAgendamento').val(eventArg);
        }
    });

    $('#horaAgendamento').timepicker({
        myPosition: 'right top',
        atPosition: 'right bottom',
        onSelect: function (eventArg) {
            $('#hHoraAgendamento').val(eventArg);
        }
    });

    $('body').on(tpClick, '.esconde', function () {
        var $sepdigala = $(this).closest('.sep_digala');
        var idComp = $('#editando').val() > 0 ? "edit" : "";
        $('.data_compartilhamento', $sepdigala).toggleClass("agendamento_post");
        if ($('.agendar_post', $sepdigala).is(':visible')) {
            $('#postAgendado' + idComp).val(1);
        } else {
            $('#postAgendado' + idComp).val(0);
        }
        if ($('.data_compartilhamento').hasClass("agendamento_post")) {
            $('#ckBolNotificar').removeAttr('checked');
            $('#ckBolNotificar').attr('disabled', 'disabled');
            $('.checkbox_personalizado_css.rightalign.down').addClass('disabled');
            $('#ckBolNotificaredit').removeAttr('checked');
            $('#ckBolNotificaredit').attr('disabled', 'disabled');

        } else {
            $('#ckBolNotificar').attr('checked', 'checked');
            $('#ckBolNotificar').removeAttr('disabled');
            $('.checkbox_personalizado_css.rightalign.down').removeClass('disabled');
            $('#ckBolNotificaredit').attr('checked', 'checked');
            $('#ckBolNotificaredit').removeAttr('disabled');
        }
    });

    /////////////////////////
    //Destino do post
    /////////////////////////
    $('#selecaoDestino').val('Todos');

    $('body').on(tpClick, '.lajotinha.personalizada a', function () {
        $(this).parent().hide();
        $(this).parent().prev().fadeIn();
        if ($('#editando').val() > 0) {
            $('#selecaoDestinoedit').val('Todos');
        } else {
            $('#selecaoDestino').val('Todos');
        }
    });

    $('body').on(tpClick, '.lajotinha.personalizada span', function () {
        var selecaoDestino = $('#editando').val() > 0 ? $('#selecaoDestinoedit').val() : $('#selecaoDestino').val();
        var idPagina = $('#idPagina').val();

        $.fancybox({
            maxWidth: 770,
            maxHeight: 730,
            fitToView: false,
            width: 770,
            height: 530,
            padding: 0,
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            hideOnContentClick: false,
            closeEffect: 'none',
            ajax: {
                type: "POST",
                data: {
                    destino: selecaoDestino,
                    idPagina: idPagina
                },
                dataType: "html"
            },
            type: "ajax",
            href: "/AVA/Pagina/Home/DestinoPostEducacionalCadastro/",
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {
                if (mobile) {
                    $('.engloba_compartilhar').mCustomScrollbar();
                }
                $('#compartilhado_com .btn_cinza').on(tpClick, function () {
                    $.fancybox.close();
                });
            }
        });

    });

    $('body').on(tpClick, '.seletor_completo', function () {
        var idMensagemRapida = $(this).closest('section.dialogo').attr('ide');
        var personalizacao = "";
        var idPaginaAtual = $('#idPagina').val();

        if ($('#editando').val() > 0) {
            personalizacao = $('#selecaoDestinoedit').val();
        } else {
            personalizacao = $('#selecaoDestino').val();
        }

        $.fancybox({
            maxWidth: 920,
            //fitToView: false,
            width: 920,
            padding: 0,
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            hideOnContentClick: false,
            modal: true,
            closeEffect: 'none',
            type: "ajax",
            href: "/AVA/Pagina/Home/SeletorPostEducacional/?id=" + idMensagemRapida + "&selecao=" + personalizacao + "&idpagina=" + idPaginaAtual,
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {
                if (mobile) {
                    $('.engloba_compartilhar').mCustomScrollbar();
                }
                $('#compartilhado_com .btn_cinza').on(tpClick, function () {
                    $.fancybox.close();
                });
            }
        });
    });

    $('body').on(tpClick, '.seletor_pessoas_pagina .ava_lightheader a', function () {
        if ($(this).attr('acao') == "marcar") {
            $('.seletor_pessoas_pagina input[type=checkbox]').attr("checked", "checked");
        } else {
            $('.seletor_pessoas_pagina input[type=checkbox]').removeAttr("checked");
        }
    });

    $('body').on(tpClick, '.seletor_pessoas_pagina .footer_seletor .btn_cinza', function () {
        $.fancybox.close();
    });

    $('body').on(tpClick, '.seletor_pessoas_pagina input[type=checkbox]', function () {
        var partes = $(this).attr('id').split('_');
        if (partes.length > 0) {

            //Foi necessario adicionar um _ no final para tratar falhas de ordenção
            //removendo parte não utilizada
            var lixo = partes.pop();
            if (lixo.length > 0) {
                //lixo não é lixo e não deveria ser removido.
                //Nunca deve acontecer =)
                partes.push(lixo);
            }
        }
        var checado = $(this).is(':checked');
        var $checkbox = $(this);

        var bolGeral = false;
        var bolCurso = false;
        var bolSerie = false;
        var idCurso = -1;
        var idSerie = -1;
        var tipo = "";

        // se for 1 é administrador
        switch (partes.length) {
            case 2:
                bolGeral = true;
                tipo = partes[1];
                break;
            case 3:
                bolCurso = true;
                tipo = partes[1];
                idCurso = partes[2];
                break;
            case 4:
                bolSerie = true;
                tipo = partes[1];
                idCurso = partes[2];
                idSerie = partes[3]
                break;
            default: break;
        }

        var seletor = "";
        if (bolGeral) {
            seletor = '.seletor_pessoas_pagina div.tp_' + tipo + ' input[type=checkbox]';
        }

        if (bolCurso) {
            seletor = '.seletor_pessoas_pagina div.tp_' + tipo + ' div.cur_' + idCurso + ' input[type=checkbox]';
        }

        if (tipo != "") {
            if (checado)
                $(seletor).attr("checked", "checked");
            else
                $(seletor).removeAttr("checked");
        }

        //Fazer recursividade para deschecar ou checkar pais
        if (bolCurso) {
            if (checado) {
                var $divsCurso = $checkbox.parent().siblings('div.tp_' + tipo);
                var totalCursos = $divsCurso.length;
                var totalSelecionados = $('input[nivelcheck=2]:checked:eq(0)', $divsCurso).length;

                //Todos os outros cursos estão checados. marcar pai
                if (totalCursos == totalSelecionados) {
                    $('input[type=checkbox]:eq(0)', $checkbox.parent().parent()).attr("checked", "checked");
                }
            } else {
                $('input[type=checkbox]:eq(0)', $checkbox.parent().parent()).removeAttr("checked");
            }
        }

        if (bolSerie) {
            if (checado) {
                var $inputsCurso = $checkbox.siblings('input[type=checkbox]');
                var totalSeries = $inputsCurso.length;
                var totalSelecionadosSerie = $checkbox.siblings('input[type=checkbox]:checked').length;

                if (totalSelecionadosSerie == totalSeries) {
                    $checkbox.parent().prev().prev().attr("checked", "checked");
                    var $divsCurso = $checkbox.parent().parent().siblings('div.tp_' + tipo);
                    var totalCursos = $divsCurso.length;
                    var totalSelecionados = $('input[nivelcheck=2]:checked:eq(0)', $divsCurso).length;
                    if (totalCursos == totalSelecionados) {
                        $('input[type=checkbox]:eq(0)', $checkbox.parent().parent().parent()).attr("checked", "checked");
                    }
                }
            }
            else {
                $checkbox.parent().prev().prev().removeAttr("checked");
                $('input[type=checkbox]:eq(0)', $checkbox.parent().parent().parent()).removeAttr("checked");
            }
        }

    });

    $('body').on(tpClick, '.seletor_pessoas_pagina .footer_seletor .btn_cor', function () {
        var itens = new Array();

        var bolProfessores = false;
        var bolAlunos = false;
        var bolResponsaveis = false;
        var bolAdm = false;

        var itemAnterior = "nada";
        $('.seletor_pessoas_pagina input[type=checkbox]:checked').each(function () {
            var item = $(this).attr('id').replace('Checkboxtp_', '');
            var auxIndex = item.indexOf(itemAnterior);

            if (auxIndex == -1) {
                if (item == "prof_")
                    bolProfessores = true;

                if (item == "alun_")
                    bolAlunos = true;

                if (item == "resp_")
                    bolResponsaveis = true;

                if (item == "adm")
                    bolAdm = true;

                itens.push(item);
                itemAnterior = item;
            }
        });

        var resultadoFinal = "";

        if (itens.length == 0 || (bolAdm && bolAlunos && bolProfessores && bolResponsaveis)) {
            $('.lajotinha.personalizada').hide();
            $('.lajotinha.personalizada').prev().fadeIn();
            resultadoFinal = 'Todos';
        } else {
            $('.lajotinha.personalizada').prev().hide();
            $('.lajotinha.personalizada').fadeIn();
            resultadoFinal = itens.join(',');
        }

        if ($('#editando').val() > 0) {
            $('#selecaoDestinoedit').val(resultadoFinal);
        } else {
            $('#selecaoDestino').val(resultadoFinal);
        }

        $.fancybox.close();
    });

    ////////////////////////////////////////////
    // Fim do destino post
    ////////////////////////////////////////////

    //Visualizar post
    $('body').on(tpClick, '#visualizarPost', function () {
        var idMensagemRapida = $(this).closest('section').attr('ide');

        var bolAgendado = $('#postAgendado').val() == 1;
        var bolDestaque = $('#ckBolDestaque').is(':checked');
        var bolBanner = $(".url_banner").is(":visible");
        var bolNotificar = $('#ckBolNotificar').is(':checked');
        var strMensagem = bolBanner ? $('.texto_banner').val() : $('#txtInput').val();

        var postValido = true;
        if (bolAgendado)
            postValido = validarDataPreview($('#hDataAgendamento').val(), $('#hHoraAgendamento').val());

        if (!postValido) {
            //Mudar para alert fancybox???
            alert('O agendamento precisa ser para horário posterior ao atual.');
        } else {

            $.fancybox({
                maxWidth: (bolDestaque ? 840 : 560),
                maxHeight: 520,
                fitToView: false,
                width: (bolDestaque ? 840 : 560),
                scrolling: 'no',
                height: 170,
                padding: 0,
                autoSize: true,
                closeClick: false,
                openEffect: 'none',
                hideOnContentClick: false,
                modal: true,
                closeEffect: 'none',
                ajax: {
                    type: "POST",
                    data: {
                        idMensagemRapida: idMensagemRapida,
                        idPagina: $('#idPagina').val(),
                        strTexto: encodeURIComponent(strMensagem),
                        bolComentar: $('#ckBolComentar').is(':checked'),
                        bolAgendado: $('#postAgendado').val() == 1,
                        strDataAgendamento: $('#hDataAgendamento').val(),
                        strHoraAgendamento: $('#hHoraAgendamento').val(),
                        idAssunto: $('#hAssuntoPost').val(),
                        strSelecaoDestino: $('#selecaoDestino').val(),
                        strLinkVideo: bolBanner ? ($(".url_banner input").val()) : ($('#urlVideoOriginal').val()),
                        "imagens": JSON.stringify(bolBanner ? objetoImagemBanner.id : objetoImagens.imagens),
                        "arquivos": JSON.stringify(objetoArquivos.arquivos),
                        bolDestaque: bolDestaque,
                        bolBanner: bolBanner,
                        bolNotificar: bolNotificar
                    },
                    dataType: "html"
                },
                type: "ajax",
                href: "/AVA/Pagina/Home/VisualizarPost/", //visualizando a criação
                scrolling: 'no',
                beforeShow: function () {
                    $("html").css({ 'overflow': 'hidden' });
                    $('.destaques_barra.destaques_preview.right li a p').expander({
                        slicePoint: 85,
                        window: 2,
                        expandText: '',
                        expandPrefix: '...',
                        userCollapseText: '',
                        preserveWords: true,
                        expandEffect: 'none',
                        collapseEffect: 'none',
                        moreClass: 'leia_mais',
                    });
                },
                afterClose: function () {
                    $("html").css({ 'overflow': 'scroll' });
                },
                onUpdate: function () {
                    if (mobile) {
                        $('article[ide=0]  .preview_post_pagina.post_espec').mCustomScrollbar('update');
                    }
                },
                afterShow: function () {

                    if (mobile) {
                        $('article[ide=0]  .preview_post_pagina.post_espec').mCustomScrollbar();
                    }

                    if (bolDestaque) {
                        window.setTimeout(function () {
                            $('.detaque_Video_Vimeo[ide=0]').each(function () {
                                var urlVimeo = $(this).attr('urlvimeo');
                                urlVimeo = getVimeoThumb(urlVimeo);
                                $(this).attr('style', 'background-image:url(' + urlVimeo + ');');
                            });
                        }, 100);
                    }

                    if (objetoImagens.imagens.length > 0) {
                        $('article[ide=0] .preview_post_pagina .imagens_mural img').one('load', function () {

                            if (timeoutPreview != null && timeoutPreview != undefined)
                                clearTimeout(timeoutPreview);

                            timeoutPreview = window.setTimeout(function () {
                                $.fancybox.update();
                                $.fancybox.reposition();
                            }, 10);

                        });
                    } else {
                        $.fancybox.update();
                        $.fancybox.reposition();
                    }

                    $('article[ide=0] .preview_post_pagina.banner img').one('load', function () {
                        var tamanhoBanner = $(this).width();
                        if (tamanhoBanner > 300) {
                            $(this).parent().width('100%');
                        }

                        if (timeoutPreview != null && timeoutPreview != undefined)
                            clearTimeout(timeoutPreview);

                        timeoutPreview = window.setTimeout(function () {
                            $.fancybox.update();
                            $.fancybox.reposition();
                        }, 10);

                    });

                    //idMensagemRapida da visualização é 0
                    $('article[ide=0]  .agendado[title!=""]').qtip(qtipOptions);
                    $('article[ide=0]  .post_fixo.fontello[title!=""]').qtip(qtipOptionsDestaque);

                    var customExpander = jQuery.extend({}, expanderOptions);
                    customExpander.onCollapse = customExpander.afterExpand = customExpander.onSlice = function () {
                        $.fancybox.update(); //Bug encontrado pela dari
                    };

                    $('article[ide=0] .ctn_msg').expander(customExpander);

                    $('article[ide=0] .iframeVideoVimeo').on('load', paginaEducacional_TratamentoVimeo);
                    $('.acoes_mural.preview_mensagem[ide=0] .btn_cinza').on(tpClick, function () {
                        if (!$(this).hasClass('disable')) {
                            $.fancybox.close();
                        }
                    });

                    //Usado depois do sucess
                    var assuntoPost = $('#hAssuntoPost').val();

                    $('.acoes_mural.preview_mensagem[ide=0] .btn_cor').on(tpClick, function () {

                        if (!$(this).hasClass('disable')) {

                            $('.acoes_mural.preview_mensagem[ide=0] .btn_cor').addClass('disable');
                            $('.acoes_mural.preview_mensagem[ide=0] .btn_cinza').addClass('disable');

                            $.ajax({
                                type: 'POST',
                                url: "/AVA/Pagina/Home/SalvarMensagemRapida",
                                data: {
                                    idMensagemRapida: idMensagemRapida,
                                    idPagina: $('#idPagina').val(),
                                    strTexto: encodeURIComponent(strMensagem),
                                    bolComentar: $('#ckBolComentar').is(':checked'),
                                    bolAgendado: $('#postAgendado').val() == 1,
                                    strDataAgendamento: $('#hDataAgendamento').val(),
                                    strHoraAgendamento: $('#hHoraAgendamento').val(),
                                    idAssunto: assuntoPost,
                                    strSelecaoDestino: $('#selecaoDestino').val(),
                                    strLinkVideo: bolBanner ? ($(".url_banner input").val()) : ($('#urlVideoOriginal').val()),
                                    "imagens": JSON.stringify(bolBanner ? objetoImagemBanner.id : objetoImagens.imagens),
                                    "arquivos": JSON.stringify(objetoArquivos.arquivos),
                                    bolDestaque: bolDestaque,
                                    bolBanner: bolBanner,
                                    bolNotificar: bolNotificar
                                },
                                async: true,
                                success: function (data) {
                                    $.fancybox.close();
                                    var bolPostAgendado = $('#postAgendado').val() == 1;
                                    var bolAbaAgandado = $('.sessao_agendados').hasClass('ativo');
                                    var bolAbaMural = $('.sessao_mural').hasClass('ativo');
                                    var bolAbaDestaque = $('.sessao_destacados').hasClass('ativo');

                                    if (data[0] != "0") {
                                        var $resultado = $(data);
                                        var bolPrepend = false;
                                        var bolAbaCerta = false;

                                        if (bolPostAgendado) {
                                            bolAbaCerta = bolAbaAgandado;
                                        } else {
                                            if (bolAbaMural)
                                                bolAbaCerta = true;
                                            else if (bolAbaDestaque)
                                                bolAbaCerta = bolDestaque;
                                        }

                                        if (bolAbaCerta) {
                                            //Caso a aba selecionada seja a de agendados e o post seja agendado ou
                                            //a aba seja mural e o post seja normal, gera um prepend e não recarrega
                                            var intAlteracoesPagina = $('#intAlteracoesPagina').val();
                                            intAlteracoesPagina++;
                                            $('#intAlteracoesPagina').val(intAlteracoesPagina);
                                            var idAssuntoTimeline = $('#hAssuntoTimeLine').val();
                                            if (idAssuntoTimeline == 0 || idAssuntoTimeline == assuntoPost) {
                                                bolPrepend = true;
                                            }
                                        }

                                        if (bolPrepend) {

                                            $('#ava_fluxoarticles').prepend($resultado);
                                            $('.agendado[title!=""]', $resultado).qtip(qtipOptions);
                                            $('.post_fixo.fontello[title!=""]', $resultado).qtip(qtipOptions);
                                            $('.ctn_msg', $resultado).expander(expanderOptions);
                                            $(".imagens_mural", $resultado).GaleriaAva();
                                            $('.iframeVideoVimeo', $resultado).on('load', paginaEducacional_TratamentoVimeo);
                                            $('.banner_mural img', $resultado).one('load', function () {
                                                var tamanhoBanner = $(this).width();
                                                if (tamanhoBanner > 300) {
                                                    $(this).parent().parent().width('100%');
                                                }
                                            });
                                            $('article[ide=0]').remove();

                                        } else {
                                            if (bolPostAgendado) {
                                                $('.sessao_agendados').siblings().removeClass('ativo');
                                                if (!$('.sessao_agendados').hasClass('ativo'))
                                                    $('.sessao_agendados').addClass('ativo');
                                            } else {
                                                $('.sessao_mural').siblings().removeClass('ativo');
                                                if (!$('.sessao_mural').hasClass('ativo'))
                                                    $('.sessao_mural').addClass('ativo');
                                            }

                                            $('#hAssuntoTimeLine').val($('#hAssuntoTimeLine').attr('initvalue'));
                                            $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
                                            $('#ckAssuntoTimeLine' + $('#hAssuntoTimeLine').val()).attr('checked', 'checked');
                                            var textoCombo = $('#ckAssuntoTimeLine' + $('#hAssuntoTimeLine').val()).next().text() + '<span class=\"caret\"></span>';
                                            $('#txtAssuntoTimeLine').html(textoCombo);
                                            paginaEducacional_CarregarMural(bolPostAgendado, 1);
                                        }

                                        if (bolDestaque)
                                            MostrarAbaDestaques(false);
                                        if (bolNotificar) {
                                            idMensagemRapida = $resultado.attr('ide');
                                            strSelecaoDestino = $('#selecaoDestino').val();
                                            $.ajax({
                                                type: 'POST',
                                                url: "/AVA/Pagina/Home/GerarNotificaoPostPaginaEscola",
                                                data: {
                                                    idMensagemRapida: idMensagemRapida,
                                                    strSelecaoDestino: strSelecaoDestino
                                                },
                                                async: true,
                                                success: function (data) {
                                                    if (data != "OK") {
                                                        console.log('Ocorreu um erro ao notificar usuários da página da escola');
                                                        alert('Ocorreu um erro ao notificar usuários da página da escola');
                                                    }

                                                }, error: function (data) {
                                                    console.log('Ocorreu um erro ao salvar as notificações do post da página da escola');
                                                }
                                            });
                                        }
                                    }
                                    paginaEducacional_CancelarDigaLaClick();
                                }, error: function (data) {
                                    $.fancybox.close();
                                    console.log('Ocorreu um erro ao salvar mensagem');
                                    paginaEducacional_CancelarDigaLaClick();
                                    MostrarAbaDestaques(true);
                                }
                            });
                        }
                    });
                    window.setTimeout(function () {
                        //Depois que carregou tudo espera um pouco e atualiza novamente.
                        $.fancybox.reposition();
                    }, 100);
                } //Fim aftershow                
            });
        }
    });

    //Cancelar e salvar
    $('body').on(tpClick, '#btnCancelarFerramentaMural', paginaEducacional_CancelarDigaLaClick)
             .on("click", ".dialogo_box .preview_post.imagens .remover_multimidia", function (e) {
                 //Removendo Imagens
                 //Não usar tpClick, bug no mScrollbar 

                 e.preventDefault();
                 var parent = $(this).closest(".prev_imagem");
                 var idarquivo = parseInt(parent.data("idarquivo"));
                 if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
                     for (var i = 0; i < objetoImagens.imagens.length; i++) {
                         if (objetoImagens.imagens[i].idArquivo == idarquivo) {
                             objetoImagens.imagens.splice(i, 1);
                             parent.remove();
                             break;
                         }
                     }
                 }

                 var strTexto = $.trim($('#txtInput' + idComp).val());

                 if (objetoImagens === undefined || objetoImagens == null || objetoImagens.imagens.length == 0) {
                     $(classComp + ".dialogo_box .preview_post.imagens").hide();
                     if (strTexto == '' && idComp == '') {
                         paginaEducacional_CancelarDigaLa();
                     } else {
                         $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").show();
                         $(classComp + ".mensagem_multimidia").show();
                         if (idComp != '' && strTexto == '') {
                             $('#visualizarPost' + idComp).addClass('disable').attr('disable', 'disable');
                         }
                     }
                 }

                 $(classComp + ".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
                 return false;
             }).on("click", ".dialogo_box .preview_post.arquivos .remover_multimidia", function (e) {
                 // Removendo arquivos
                 //Não usar tpClick, bug no mScrollbar 

                 e.preventDefault();
                 var parent = $(this).parent();
                 var idarquivo = parseInt(parent.data("idarquivo"));
                 if (objetoArquivos !== undefined && objetoArquivos !== null && objetoArquivos.arquivos.length > 0) {
                     for (var i = 0; i < objetoArquivos.arquivos.length; i++) {
                         if (objetoArquivos.arquivos[i].idArquivo == idarquivo) {
                             objetoArquivos.arquivos.splice(i, 1);
                             parent.remove();
                             break;
                         }
                     }
                 }

                 var strTexto = $.trim($('#txtInput' + idComp).val());

                 if (objetoArquivos === undefined || objetoArquivos == null || objetoArquivos.arquivos.length == 0) {
                     $(classComp + ".dialogo_box .preview_post.arquivos").hide();
                     if (strTexto == '' && idComp == '') {
                         paginaEducacional_CancelarDigaLa();
                     } else {
                         $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").show();
                         $(classComp + ".mensagem_multimidia").show();
                         if (idComp != '' && strTexto == '') {
                             $('#visualizarPost' + idComp).addClass('disable').attr('disable', 'disable');
                         }
                     }
                 }

                 $(classComp + ".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
                 return false;
             }).on('click', '.dialogo_box .upload_banner .remover_multimidia_banner', function () {
                 objetoImagemBanner = {
                     id: 0
                 };

                 $(classComp + '.upload_banner img').hide();
                 $(classComp + '.upload_banner img').attr('src', '');
                 $(classComp + '.upload_banner span').show();
                 $(classComp + '.upload_banner .remover_multimidia_banner').hide();

                 var linkBanner = $.trim($(classComp + ".url_banner input").val());
                 var strTextoBanner = $.trim($(classComp + ".texto_banner").val());
                 var linkValido = false;

                 if (linkBanner != '') {
                     var regexLinkGeral = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
                     if (regexLinkGeral.test(linkBanner))
                         linkValido = true;

                     if (!linkValido) {
                         $(classComp + ".url_banner p").show();
                     } else {
                         $(classComp + ".url_banner p").hide();
                     }
                 }

                 if (strTextoBanner != '' && linkValido) {
                     $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
                 } else {
                     $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
                 }
             });

    /////////////////////////////////////////////////
    /// Multimidia - Arquivos, Imagens, Video
    /////////////////////////////////////////////////

    //Iniciando diga lá
    $('body').on(tpClick, '#txtInput, #txtInputedit', function (e) {
        var strTexto = $.trim($(this).val());
        var linkVideo = $.trim($('#txtLinkVideoMensagem' + idComp).val());
        var bolBloquear = true;

        if (strTexto != '') {
            bolBloquear = false;
        }

        if (linkVideo != '') {
            //Adicionar validação do src do iframe
            bolBloquear = false;
        }

        if (objetoArquivos.arquivos.length > 0)
            bolBloquear = false;

        if (objetoImagens.imagens.length > 0)
            bolBloquear = false;

        if (bolBloquear) {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        } else {
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
        }

        $(classComp + '.sep_digala').slideDown(200);
        $(classComp + '.seletor_pagina').slideDown(200);
        $('#ckBolComentar' + idComp).closest('.hab_comentario_post').show();
        $("#btnCancelarFerramentaMural" + idComp).removeAttr("disabled").removeClass("disable");

    }).on(tpClick, ".mensagem_multimidia .multimidia_video", function (e) {
        $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").hide();
        if (!$(classComp + ".enviar_video").is(":visible")) {
            $(classComp + '.sep_digala').slideDown(200);
            $(classComp + '.seletor_pagina').slideDown(200);
            $('#ckBolComentar' + idComp).closest('.hab_comentario_post').show();
            $(classComp + ".enviar_video").show();
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
            $("#btnCancelarFerramentaMural" + idComp).removeAttr("disabled").removeClass("disable");
        }
    }).on("click", ".mensagem_multimidia .multimidia_imagens, .dialogo_box .preview_post.imagens .adicionar .adicionar_multimidia", function (e) {
        abreUploadImagemTimeLine();

        $( "#previewImagemDigaLaPagina" ).dialog({
            autoOpen: false,
            height: 680,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false,
            open: function(event, ui) {
                $(this).parent().find(".ui-dialog-titlebar").hide();
                $(this).parent().find(".ui-dialog-buttonpane").hide();
            },
        });


    }).on("click", ".mensagem_multimidia .multimidia_documentos, .dialogo_box .preview_post.arquivos .adicionar_doc", function (e) {

        abreUploadFileTimeLine();

        $( "#previewFileDigaLaPagina" ).dialog({
            autoOpen: false,
            height: 680,
            width: 900,
            modal: true,
            resizable: false,
            draggable: false,
            open: function(event, ui) {
                $(this).parent().find(".ui-dialog-titlebar").hide();
                $(this).parent().find(".ui-dialog-buttonpane").hide();
            },
        });


    }).on("click", ".mensagem_multimidia .multimidia_banner", function (e) {

       console.log('Esse?');


        $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").hide();
        if (!$(classComp + ".texto_banner").is(":visible")) {
            var strMensagem = $.trim($('#txtInput' + idComp).val());
            strMensagem = strMensagem.replace(/\n/g, " ");
            $('#txtInput' + idComp).hide();
            $('#txtInput' + idComp).val('');
            $('#ckBolComentar' + idComp).closest('.hab_comentario_post').show();
            $("#btnCancelarFerramentaMural" + idComp).removeAttr("disabled").removeClass("disable");
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
            $(classComp + '.seletor_pagina').slideDown(200);
            $(classComp + '.sep_digala').slideDown(200, function () {
                $(classComp + ".upload_banner a.remover_multimidia_banner").hide();
                $(classComp + ".upload_banner").show();
                $(classComp + ".texto_banner").show();
                $(classComp + ".texto_banner").focus();
                $(classComp + ".url_banner").show();

                if (strMensagem != '') {
                    $(classComp + ".texto_banner").val(strMensagem);

                    window.setTimeout(function () {
                        $.ajax({
                            type: 'POST',
                            url: "/AVA/Pagina/Home/VerificaSeOTextoPossuiLink",
                            data: {
                                strTexto: strMensagem
                            },
                            async: true,
                            success: function (data) {
                                if (parseInt(data) == 1) {
                                    $(classComp + '.feed_tipo_banner').show();
                                }
                            }, error: function (data) {
                                console.log('Erro ao validar texto');
                            }
                        });
                    }, 10); //Bug Ipad
                }
            });
        }
    }).on("click", ".upload_banner a:not('.remover_multimidia_banner')", function (e) {
        if (!$('.remover_multimidia_banner', $(this).closest('.upload_banner')).is(':visible')) {

            abreUploadImagemBanner();

            // abreUploadImagemTimeLine();

            $( "#previewImagemDigaLaPagina" ).dialog({
                autoOpen: false,
                height: 680,
                width: 900,
                modal: true,
                resizable: false,
                draggable: false,
                open: function(event, ui) {
                    $(this).parent().find(".ui-dialog-titlebar").hide();
                    $(this).parent().find(".ui-dialog-buttonpane").hide();
                },
            });

        }
    });

    //Banner

    $('body').on("click", '.feed_tipo_banner .btn_cinza_min', function () {
        $(this).parent().fadeOut();
    });

    $('body').on('keyup paste', '.texto_banner', function (e) {
        var strTexto = $.trim($(this).val());
        var linkBanner = $.trim($(classComp + ".url_banner input").val());
        var linkValido = false;

        if (linkBanner != '') {
            var regexLinkGeral = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
            if (regexLinkGeral.test(linkBanner))
                linkValido = true;

            if (!linkValido) {
                $(classComp + ".url_banner p").show();
            } else {
                $(classComp + ".url_banner p").hide();
            }
        }

        if (strTexto != '') {
            $('#ckBolDestaque' + idComp).removeAttr('disabled');
            $('#ckBolDestaque' + idComp).parent().removeClass('disabled');
            //$('#ckBolNotificar' + idComp).removeAttr('disabled');
            //$('#ckBolNotificar' + idComp).parent().removeClass('disabled');
        } else {
            $('#ckBolDestaque' + idComp).removeAttr('checked');
            $('#ckBolDestaque' + idComp).attr('disabled', 'disabled');
            $('#ckBolDestaque' + idComp).parent().addClass('disabled');
            //$('#ckBolNotificar' + idComp).attr('disabled', 'disabled');
            //$('#ckBolNotificar' + idComp).parent().addClass('disabled');
            $('#ckBolNotificar').attr('checked', 'checked');
        }

        if ((strTexto != '' && linkValido) || (objetoImagemBanner.id > 0 && linkValido)) {
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
        } else {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        }
    }).on('keyup paste', '.url_banner input', function (e) {
        var linkBanner = $.trim($(this).val());
        var strTexto = $.trim($(classComp + ".texto_banner").val());
        var linkValido = false;

        if (linkBanner != '') {
            var regexLinkGeral = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
            if (regexLinkGeral.test(linkBanner))
                linkValido = true;

            if (!linkValido) {
                $(classComp + ".url_banner p").show();
            } else {
                $(classComp + ".url_banner p").hide();
            }
        }

        if (strTexto != '') {
            $('#ckBolDestaque' + idComp).removeAttr('disabled');
            $('#ckBolDestaque' + idComp).parent().removeClass('disabled');
            //$('#ckBolNotificar' + idComp).removeAttr('disabled');
            //$('#ckBolNotificar' + idComp).parent().removeClass('disabled');
        } else {
            $('#ckBolDestaque' + idComp).removeAttr('checked');
            $('#ckBolDestaque' + idComp).attr('disabled', 'disabled');
            $('#ckBolDestaque' + idComp).parent().addClass('disabled');
            //$('#ckBolNotificar' + idComp).attr('disabled', 'disabled');
            //$('#ckBolNotificar' + idComp).parent().addClass('disabled');
            $('#ckBolNotificar').attr('checked', 'checked');
        }

        if ((strTexto != '' && linkValido) || (objetoImagemBanner.id > 0 && linkValido)) {
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
        } else {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        }
    });

    //Desbloqueando visualizar
    $('#urlVideoOriginal').val('');
    var timeoutVideo = '';
    $('#txtLinkVideoMensagem').val('');
    $('body').on('keyup paste', '#txtInput, #txtInputedit', function (e) {
        if (!$(classComp + '.sep_digala').is(':visible')) {
            $(classComp + '.seletor_pagina').slideDown(200);
            $(classComp + '.sep_digala').slideDown(200);
            $('#ckBolComentar' + idComp).closest('.hab_comentario_post').show();
            $("#btnCancelarFerramentaMural" + idComp).removeAttr("disabled").removeClass("disable");
        }

        var strTexto = $.trim($(this).val());
        var linkVideo = $.trim($('#txtLinkVideoMensagem' + idComp).val());
        var bolBloquear = true;
        var bolPossuiTexto = false;

        if (strTexto != '') {
            bolBloquear = false;
            bolPossuiTexto = true;
        }

        if (linkVideo != '') {
            //Adicionar validação do src do iframe
            bolBloquear = false;
        }

        if (objetoArquivos.arquivos.length > 0)
            bolBloquear = false;

        if (objetoImagens.imagens.length > 0)
            bolBloquear = false;

        if (bolPossuiTexto) {
            $('#ckBolDestaque' + idComp).removeAttr('disabled');
            $('#ckBolDestaque' + idComp).parent().removeClass('disabled');
            //$('#ckBolNotificar' + idComp).removeAttr('disabled');
            //$('#ckBolNotificar' + idComp).parent().removeClass('disabled');
        } else {
            $('#ckBolDestaque' + idComp).removeAttr('checked');
            $('#ckBolDestaque' + idComp).attr('disabled', 'disabled');
            $('#ckBolDestaque' + idComp).parent().addClass('disabled');
            //$('#ckBolNotificar' + idComp).attr('disabled', 'disabled');
            //$('#ckBolNotificar' + idComp).parent().addClass('disabled');
            $('#ckBolNotificar').attr('checked', 'checked');
        }

        if (bolBloquear) {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        } else {
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
        }
    }).on('input paste', "#txtLinkVideoMensagem, #txtLinkVideoMensagemedit", function () {
        if ($(this).val().length == 0) {
            $(classComp + '.errovideo, .verificavideo').hide();
        } else {
            if (timeoutVideo !== undefined && timeoutVideo != null) {
                clearTimeout(timeoutVideo);
            }

            timeoutVideo = setTimeout(function () {
                montaPreviewVideoMensagem($("#txtLinkVideoMensagem" + idComp).val());
            }, 1000);
        }

    }).on('keyup', "#txtLinkVideoMensagem, #txtLinkVideoMensagemedit", function () {
        $(classComp + '.errovideo, .verificavideo').hide();

        if ($(this).val().length == 0) {
            if ($.trim($('#txtInput' + idComp).val()) != "") {
                $('#visualizarPost' + idComp).removeClass('disable').prop("disabled", false);
            }
        } else {
            $('#visualizarPost' + idComp).addClass('disable').prop("disabled", true);

            if (timeoutVideo !== undefined && timeoutVideo != null) {
                clearTimeout(timeoutVideo);
            }

            timeoutVideo = setTimeout(function () {
                montaPreviewVideoMensagem($("#txtLinkVideoMensagem" + idComp).val());
            }, 1000);
        }

    });

    /////////////////////////////////////////////////
    /// Fim Multimidia - Arquivos, Imagens, Video
    /////////////////////////////////////////////////

    /************************************
    ****    Mural do educacional    *****
    ************************************/

    $('body').on(tpClick, '#cbAssuntoTimeLine li label', function () {
        var idAssunto = $(this).parent().attr('assu');
        if (bolFezAlteracaoConfiguracoes) {
            destinoIdAssunto = idAssunto;
            destinoConfiguracoes = 'comboFiltroAssuntoTimeline';
            CustomConfirmConfiguracoes('comboFiltroAssuntoTimeline', objetoIdMensagemRapida, idAssunto);
        } else {
            $('#hAssuntoTimeLine').val(idAssunto);
            $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
            $('#ckAssuntoTimeLine' + idAssunto).attr('checked', 'checked');
            var textoCombo = $(this).text() + '<span class=\"caret\"></span>';
            $('#txtAssuntoTimeLine').html(textoCombo);
            $('#cbAssuntoTimeLine').parent().removeClass('open');
            paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
        }
        return false;
    });

    $('body').on(tpClick, '.timeline.paginas header a', function () {
        if (bolFezAlteracaoConfiguracoes) {
            if ($(this).parent().hasClass('sessao_mural')) destinoConfiguracoes = 'abaMuralMural';
            if ($(this).parent().hasClass('sessao_agendados')) destinoConfiguracoes = 'abaMuralAgendados';
            if ($(this).parent().hasClass('sessao_destacados')) destinoConfiguracoes = 'abaMuralDestacados';
            CustomConfirmConfiguracoes('abaMuralAgendados', objetoIdMensagemRapida, 0);
        } else {
            if (!$(this).parent().hasClass('ativo')) {
                $(this).parent().addClass('ativo').siblings().removeClass('ativo');
                resetarFiltroMural(); 
                paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
            }
        }
    });


    //Ver mais dos arquivos multimidia do post
    $('body').on(tpClick, '.ver_mais_doc', function () {
        var visualizando = $(this).closest('article').hasClass('paginas_visualizar');
        var idMensagemRapida = $(this).closest('article').attr('ide');

        $(this).prev().slideToggle("0", function () {
            if ($(this).is(':visible')) {
                $(this).next().text('Ver menos').addClass('mostra');
            } else {
                $(this).next().text('Ver mais').removeClass('mostra');
            }
        });
    });

    //Carregar mais comentarios
    $('#ava_fluxoarticles').on(tpClick, '.carregarComentarios', function () {
        var $linkVerMais = $(this);
        if (!$linkVerMais.hasClass('carregando')) {
            $linkVerMais.addClass('carregando');
            var idMensagemRapida = $linkVerMais.attr('ide');
            $linkVerMais.prepend('<img style="padding:6px 0px 5px;" src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            $('span:not(.totalCarregado)', $linkVerMais).hide();


            $.ajax({
                type: 'POST',
                url: "/AVA/Pagina/Home/Comentarios50",
                data: {
                    'idMensagemRapida': idMensagemRapida,
                    'dataPrimeiroLoad': $('#dtmPriUpd_' + idMensagemRapida).val(),
                    'idsCarregados': $('#idsPriUpd_' + idMensagemRapida).val()
                },
                async: true,
                success: function (data) {
                    var $novos = $(data);
                    $linkVerMais.before($novos);
                    $linkVerMais.next().show();

                    $('.ctn_msg', $novos).expander(expanderOptions);

                    var idsAtuais = '';
                    if ($.trim($('#idsPriUpd_' + idMensagemRapida).val()) != '') {
                        idsAtuais += (atob($('#idsPriUpd_' + idMensagemRapida).val()).split(','));
                    }
                    if ($.trim($('#idsUltUpd_' + idMensagemRapida).val()) != '') {
                        if (idsAtuais != '')
                            idsAtuais += ',';
                        idsAtuais += (atob($('#idsUltUpd_' + idMensagemRapida).val()).split(','));
                    }

                    $('#idsPriUpd_' + idMensagemRapida).val(btoa(idsAtuais));

                    var totalComentarios = parseInt(atob($('#totCom_' + idMensagemRapida).val()));
                    var totalCarregados = atob($('#idsPriUpd_' + idMensagemRapida).val()).split(',').length;
                    $('.carregarComentarios[ide=' + idMensagemRapida + '] .totalCarregado').text(totalCarregados + ' de ' + totalComentarios);
                    var possuiVerMais = $('#bolVerMais50_' + idMensagemRapida).val() == '1';

                    if (possuiVerMais) {
                        $linkVerMais.removeClass('carregando');
                        $('span', $linkVerMais).show();
                        $('img', $linkVerMais).remove();
                    } else {
                        $('.carregarComentarios[ide=' + idMensagemRapida + ']').slideUp().remove();
                        $('img', $linkVerMais).remove();
                    }

                    $('#idsUltUpd_' + idMensagemRapida).remove();
                    $('#bolVerMais50_' + idMensagemRapida).remove();
                    $('#totComUpd_' + idMensagemRapida).remove();


                }, error: function (data) {
                    $linkVerMais.removeClass('carregando');

                    $('span', $linkVerMais).show();
                    $('img', $linkVerMais).remove();
                    console.log('Ocorreu um erro ao carregar todos os comentarios');
                }
            });
        }
    });

    ///////////////////////////////////////
    //Focus Caixa de comentario e combo excluir mensagem
    ///////////////////////////////////////
    $('body').on(tpClick, function (ef) {
        var $article = $(ef.target).closest('article');
        var idMensagemRapida = 0;
        /*if ($article.length > 0) {
        var $inputFoco = $('input.foco', $article);
        if ($inputFoco.length > 0) {
        idMensagemRapida = $article.attr("ide");
        $('article input.foco:not(article[ide=' + idMensagemRapida + '] input.foco)').prev().children().hide();
        $('article input.foco:not(article[ide=' + idMensagemRapida + '] input.foco)').animate({ width: '507px' }, 200).val("");
        $('article input.foco:not(article[ide=' + idMensagemRapida + '] input.foco)').removeClass('foco');
        }
        else {
        //Clicou em um article que não tem foco
        $('input.foco').prev().children().hide();
        $('input.foco').animate({ width: '507px' }, 200).val("");
        $('input.foco').removeClass('foco');
        }
        } else {
        //Clicou em um elemento que não é um article
        $('input.foco').prev().children().hide();
        $('input.foco').animate({ width: '507px' }, 200).val("");
        $('input.foco').removeClass('foco');
        }*/

        var $comboExcluir = $(ef.target).closest('.combo_denunciar_excluir');
        if ($comboExcluir.length > 0 && $article.length > 0) {
            idMensagemRapida = $article.attr("ide");
            $('.combo_denunciar_excluir ul:not(article[ide=' + idMensagemRapida + '] .combo_denunciar_excluir ul)').fadeOut();
        } else {
            $('.combo_denunciar_excluir ul').fadeOut();
        }
    });

    $('#ava_fluxoarticles').on(tpClick, '.botaoComentar, .escreverMais_', function (e) {
        var $formularioComentario = $('.campo_comentar', $(this).closest('article'));
        if ($('img', $formularioComentario).is(":hidden")) {
            $('img', $formularioComentario).show();
            $('input', $formularioComentario).animate({ width: '476px' }, 200).focus().addClass('foco');
        }
    });

    $('#ava_fluxoarticles').on(tpClick, '.escreverMais_', function (e) {
        var idMensagemRapida = $(this).attr('ide');
        $("html,body").animate({
            scrollTop: $('form.campo_comentar[ident=' + idMensagemRapida + ']').offset().top - 220
        }, 1000);
    });

    $('#ava_fluxoarticles').on(tpClick, '.campo_comentar input', function (e) {
        var $formularioComentario = $(this).parent();
        if ($('img', $formularioComentario).is(":hidden")) {
            $('img', $formularioComentario).show();
            $('input', $formularioComentario).animate({ width: '476px' }, 200).focus().addClass('foco');
        }
        $('.campo_comentar input').blur(function () {
            if ($(this).val() === '') {
                $(this).prev().children().hide();
                $(this).animate({ width: '507px' }, 200).val("");
                $(".campo_comentar input").removeClass('foco');
            }
        });

    });
    ///////////////////////////////////////
    //Fim Focus Caixa de comentario
    ///////////////////////////////////////

    ///////////////////////////////////////
    //Curtir Mensagem e Comentario
    ///////////////////////////////////////

    $('#ava_fluxoarticles').on(tpClick, '.botaoCurtirGrupos', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('carregando')) {
            $(this).addClass('carregando');
            $(this).toggleClass('ativo');
            var $botao = $(this);
            var idMensagemRapida = $(this).closest('article').attr('ide');
            var curtiu = $(this).hasClass('ativo');
            $botao.next().html('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            $.ajax({
                type: 'POST',
                url: "/AVA/Pagina/Home/CurtirDescurtirMensagem",
                data: { 'idMensagemRapida': idMensagemRapida, 'curtiu': curtiu },
                async: true,
                success: function (data) {
                    $botao.removeClass('carregando');
                    $('#boxCurticoesMensagem_' + idMensagemRapida).html(data);
                }, error: function (data) {
                    console.log('Ocorreu um erro ao ' + (curtiu ? 'curtir' : 'descurtir') + ' a mensagem');
                    $botao.removeClass('carregando');
                }
            });

        }
        return false;
    });

    $('#ava_fluxoarticles').on(tpClick, '.botaoCurtirComentario', function () {
        if (!$(this).hasClass('carregando')) {
            $(this).addClass('carregando');
            var $botao = $(this);
            var idComentario = $(this).attr('idcomentario');
            var curtiu = !($(this).hasClass('ativo'));
            $botao.next().html('<img src="/AVA/StaticContent/Common/img/perfil/carregando.gif" border="0" />');
            $.ajax({
                type: 'POST',
                url: "/AVA/Pagina/Home/CurtirDescurtirComentario",
                data: { 'idComentario': idComentario, 'curtiu': curtiu },
                async: true,
                success: function (data) {
                    $botao.removeClass('carregando');
                    if (data[0] == "0") {
                        $botao.next().html("");
                    }
                    else {
                        $botao.next().html(data);
                    }
                    $botao.toggleClass('ativo');
                }, error: function (data) {
                    $botao.removeClass('carregando');
                    console.log('Ocorreu um erro ao ' + (curtiu ? 'curtir' : 'descurtir') + ' o comentario');
                }
            });
        }
    });

    // Ver todos Que curtiram Mensagem
    $("#ava_fluxoarticles").on(tpClick, ".vertodoscurtirammensagem", function (e) {
        e.preventDefault();
        GlobalPaginacaoModalInicio = 1;
        GlobalPaginacaoModalFim = 12;
        idLoadedGlobal = false;


        var _this = $(this);
        var id = $(this).attr("idmensagem");
        var o = {
            href: _this.attr("href"),
            autoSize: false,
            width: 900,
            height: 530,
            fitToView: false,
            padding: 15,
            type: "ajax",
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {
                var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + id;

                /*Metodo igual do barraesquerda. porem ao colocar a referencia do barraesquerda.js tudo parou de funcionar e o prazo está curto*/
                retornaJsonPagina($urlSeguidosCompleto);

                $(".ava_lightcontent").scroll(function () {

                    if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                        idLoadedGlobal = true;

                        GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                        GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;

                        $.fancybox.showLoading();

                        var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + id + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                        retornaJsonPagina($urlSeguidosCompleto, "scrollMode");

                    }

                });
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        $.fancybox(o);

    });

    // Ver todos Que curtiram Mensagem
    $("#ava_fluxoarticles").on(tpClick, ".vertodoscurtiramcomentario", function (e) {
        e.preventDefault();
        GlobalPaginacaoModalInicio = 1;
        GlobalPaginacaoModalFim = 12;
        idLoadedGlobal = false;


        var _this = $(this);
        var id = $(this).attr("id");
        var o = {
            href: _this.attr("href"),
            autoSize: false,
            width: 900,
            height: 530,
            fitToView: false,
            padding: 15,
            type: "ajax",
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {

                var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + id;
                /*Metodo igual do barraesquerda. porem ao colocar a referencia do barraesquerda.js tudo parou de funcionar e o prazo está curto*/
                retornaJsonPagina($urlSeguidosCompleto);

                $(".ava_lightcontent").scroll(function () {

                    if (GlobalPaginacaoContador == 12 && !idLoadedGlobal && $(".ava_lightcontent").get(0).clientHeight + 20 >= ($(".ava_lightcontent").get(0).scrollHeight - $(".ava_lightcontent").get(0).scrollTop)) {
                        idLoadedGlobal = true;

                        GlobalPaginacaoModalInicio = GlobalPaginacaoModalInicio + 12;
                        GlobalPaginacaoModalFim = GlobalPaginacaoModalFim + 12;

                        $.fancybox.showLoading();

                        var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + id + "&intInicio=" + GlobalPaginacaoModalInicio + "&intFim=" + GlobalPaginacaoModalFim;
                        retornaJsonPagina($urlSeguidosCompleto, "scrollMode");

                    }

                });
            },
            helpers: {
                overlay: {
                    locked: false
                }
            }
        };
        $.fancybox(o);

    });

    ///////////////////////////////////////
    // Curtir Mensagem e Comentario
    ///////////////////////////////////////

    ///////////////////////////////////////
    // Enviar comentario
    ///////////////////////////////////////

    var _enterT = false;
    $('#ava_fluxoarticles').on('keypress', 'input[name=strComentario]', function (e) {
        if (!(_enterT)) {
            _this = $(this);
            if (_this.val() != '') {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    _enterT = true;
                    _id_msg = _this.attr('ident');

                    var strMensagem = _this.val();

                    $.ajax({
                        url: '/AVA/Pagina/Home/GravarComentario/',
                        type: 'POST',
                        data: { 'idMensagemRapida': _id_msg, 'strComentario': encodeURIComponent(strMensagem) },
                        success: function (data) {
                            var $comentario = $(data);
                            var idComentario = $comentario.attr('id').substring(7);

                            var arrayIdsCarregadas = new Array();
                            var idsCarregadasCript = $('#idsPriUpd_' + _id_msg).val();
                            if ($.trim(idsCarregadasCript) != '') {
                                arrayIdsCarregadas = atob($('#idsPriUpd_' + _id_msg).val()).split(',');
                            }

                            var totalComentarios = 0;
                            var totalComentariosCript = $('#totCom_' + _id_msg).val();
                            if ($.trim(totalComentariosCript) != '') {
                                totalComentarios = parseInt(atob(totalComentariosCript));
                            }

                            totalComentarios++;
                            $('#totCom_' + _id_msg).val(btoa(totalComentarios));
                            arrayIdsCarregadas.push(idComentario);
                            $('#idsPriUpd_' + _id_msg).val(btoa(arrayIdsCarregadas.join(',')));

                            $("#boxComentarios_" + _id_msg).prepend($comentario).slideDown(1000);
                            $('#boxComentarios_' + _id_msg).show();
                            $('.carregarComentarios[ide=' + _id_msg + '] .totalCarregado').text(arrayIdsCarregadas.length + ' de ' + totalComentarios);
                            _this.val('');
                            _enterT = false;
                            $(".ctn_msg", $comentario).expander(expanderOptions);
                            //retira da lista o idmensagem que foi dado Salvo
                            for (i = 0; i < objetoIdMensagemRapida.idMsgRapida.length; i++) {
                                if (objetoIdMensagemRapida.idMsgRapida[i] == _id_msg) {
                                    objetoIdMensagemRapida.idMsgRapida.splice(i, 1);
                                    if (!objetoIdMensagemRapida.idMsgRapida.length > 0)
                                        bolFezAlteracaoConfiguracoes = false;
                                    break;
                                }
                            }

                        }, error: function (data) {
                            console.log('Ocorreu um erro ao salvar o comentario');
                        }
                    });
                }
            }
        }
    });

    ///////////////////////////////////////
    // Fim enviar comentario
    ///////////////////////////////////////

    ///////////////////////////////////////
    // Excluir Mensagem e Comentarios
    ///////////////////////////////////////

    $("#ava_fluxoarticles").on(tpClick, ".coment_excluir", function (e) {
        var idComentario = $(this).data("idcomentario");
        var este = $(this);
        var idMensagemRapida = $(this).closest('article').attr('ide');
        $.fancybox({
            type: "ajax",
            href: "/AVA/Pagina/Home/ExcluirComentario/" + idComentario,
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {
                $('body').on(tpClick, ("#btnExcluirComentario" + idComentario), function (e) {
                    $.ajax({
                        url: '/AVA/Pagina/Home/ExcluirComentarioConfirmado/',
                        type: 'POST',
                        data: { 'idComentario': idComentario },
                        success: function (data) {
                            if (data == 0)
                                console.log('Ocorreu um erro ao excluir o comentario');

                            $.fancybox.close();
                            $('#coment_' + idComentario).slideUp().remove();

                            var velhoArray = new Array();
                            var totalComentariosVisiveis = 0;
                            var IdsCript = $.trim($('#idsPriUpd_' + idMensagemRapida).val());
                            if (IdsCript != '') {
                                velhoArray = atob(IdsCript).split(',');
                                var novoArray = new Array();
                                for (var na = 0; na < velhoArray.length; na++) {
                                    if (velhoArray[na] != idComentario)
                                        novoArray.push(velhoArray[na]);
                                }
                                totalComentariosVisiveis = novoArray.length;
                                $('#idsPriUpd_' + idMensagemRapida).val(btoa(novoArray));
                            }

                            var totalComentarios = 0;
                            var totalCript = $.trim($('#totCom_' + idMensagemRapida).val());
                            if (totalCript != '') {
                                totalComentarios = atob(totalCript);
                                totalComentarios--;
                                $('#totCom_' + idMensagemRapida).val(btoa(totalComentarios));
                            }

                            $('.carregarComentarios[ide=' + idMensagemRapida + '] .totalCarregado').text(totalComentariosVisiveis + ' de ' + totalComentarios);

                            if (totalComentarios == 0) {
                                $('.carregarComentarios[ide=' + idMensagemRapida + ']').slideUp().remove();
                                $('.escreverMais_[ide=' + idMensagemRapida + ']').slideUp();
                                $('#boxComentarios_' + idMensagemRapida).slideUp();
                            }

                        }, error: function (data) {
                            console.log('Ocorreu um erro ao excluir o comentario');
                        }
                    });
                });
                $('body').on(tpClick, ("#btnCancelarExclusaoComentario" + idComentario), function (e) {
                    $.fancybox.close();
                });
            },
            closeBtn: false,
            modal: true,
            helpers: {
                overlay: {
                    closeClick: false,
                    locked: false
                }
            },
            padding: 0
        });
    });

    $('#ava_fluxoarticles').on(tpClick, '.combo_denunciar_excluir', function (e) {
        e.preventDefault();
        $('ul', this).show();
    });

    $('#ava_fluxoarticles').on(tpClick, '.combo_denunciar_excluir .confirma_excluir', function (e) {
        var idMensagemRapida = $(this).closest("article").attr("ide");
        var este = $(this);
        $.fancybox({
            type: "ajax",
            href: "/AVA/Pagina/Home/ExcluirMensagem/" + idMensagemRapida,
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {
                $('body').on(tpClick, ("#btnExcluidMensagem" + idMensagemRapida), function (e) {
                    $.ajax({
                        url: '/AVA/Pagina/Home/ExcluirMensagemConfirmado/',
                        type: 'POST',
                        data: { 'idMensagemRapida': idMensagemRapida },
                        success: function (data) {
                            if (data == 0)
                                console.log('Ocorreu um erro ao excluir a mensagem');
                            else {
                                //Quantidade de alterações na pagina. para não bugar o veja mais
                                var auxAlteracoes = $('#intAlteracoesPagina').val();
                                auxAlteracoes--; //Informando que foi removida uma mensagem
                                $('#intAlteracoesPagina').val(auxAlteracoes);
                            }

                            $.fancybox.close();
                            $('article[ide=' + idMensagemRapida + ']').fadeOut("slow").remove();
                            MostrarAbaDestaques(true);
                            $.ajax({
                                type: 'POST',
                                url: "/AVA/Pagina/Home/CancelarNotificaoPostPaginaEscola",
                                data: {
                                    idMensagemRapida: idMensagemRapida
                                },
                                async: true,
                                success: function (data) {
                                    if (data != "OK") {
                                        console.log('Sem cancelamento de notificação do post da página da escola');
                                    }

                                }, error: function (data) {
                                    console.log('Ocorreu um erro ao cancelar as notificações do post da página da escola');
                                }
                            });

                        }, error: function (data) {
                            console.log('Ocorreu um erro ao excluir a mensagem');
                            MostrarAbaDestaques(true);
                        }
                    });
                });
                $('body').on(tpClick, ("#btnCancelarExclusaoMensagem" + idMensagemRapida), function (e) {
                    $.fancybox.close();
                });
            },
            closeBtn: false,
            modal: true,
            helpers: {
                overlay: {
                    closeClick: false,
                    locked: false
                }
            },
            padding: 0
        });
    });

    ///////////////////////////////////////
    // Fim Excluir Mensagem e Comentarios
    ///////////////////////////////////////

    //Ver mais
    $('#ava_fluxoarticles').on(tpClick, '#verMaisMensagens', function () {
        paginaEducacional_CarregarMuralVerMais(BolAbaAgendados());
    });


    // Visualiza Seleção
    $('#ava_fluxoarticles').on(tpClick, '.seletor_compartilhado', function () {
        var idMensagemRapida = $(this).closest('article').attr('ide');
        $.fancybox({
            maxWidth: 780,
            maxHeight: 730,
            fitToView: false,
            width: 780,
            height: 530,
            padding: 0,
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            hideOnContentClick: false,
            closeEffect: 'none',
            type: "ajax",
            href: "/AVA/Pagina/Home/DestinoPostEducacional/" + idMensagemRapida,
            scrolling: 'no',
            beforeShow: function () {
                $("html").css({ 'overflow': 'hidden' });
            },
            afterClose: function () {
                $("html").css({ 'overflow': 'scroll' });
            },
            afterShow: function () {
                if (mobile) {
                    $('.engloba_compartilhar').mCustomScrollbar();
                }
                $('#compartilhado_com .btn_cinza').on(tpClick, function () {
                    $.fancybox.close();
                });
            }
        });
    });

    /***************************************************
    Edição do post
    Outras alterções foram feitas no meio do codigo
    *****************************************************/

    $('#ava_fluxoarticles').on(tpClick, '.combo_denunciar_excluir .editarMensagemRapida', function (e) {
        var $articleEdit = $(this).closest('article');
        var bolNotificar = $('#ckBolNotificar').is(':checked');
        var idMensagemRapida = $articleEdit.attr('ide');
        paginaEducacional_CancelarDigaLaClick();

        $.ajax({
            url: '/AVA/Pagina/Home/CarregarDigaLaEdicao/',
            type: 'POST',
            data: { 'idMensagemRapida': idMensagemRapida },
            success: function (data) {
                $('.block_edicao').show();
                $('#editando').val(idMensagemRapida);

                idComp = 'edit';
                classComp = ' .dialogo_edicao ';
                editID = idMensagemRapida;

                var $digala = $(data);
                $articleEdit.prepend($digala);
                $('#ckBolNotificaredit').attr('disabled', 'disabled');
                $('.checkbox_personalizado_css.rightalign.down').addClass('disabled');

                /*Montando array de arquivos e imagens*/
                var mensagemTipoMultimidia = $('#mensagemTipoMultimidia').val();

                if (mensagemTipoMultimidia != 4) {
                    var strArrayArquivos = $.trim($('#arquivosSerializadasEdicao').text());
                    var strArrayImagens = $.trim($('#imagensSerializadasEdicao').text());

                    if (strArrayArquivos != '') {
                        objetoArquivos.arquivos = $.parseJSON(JSON.stringify(strArrayArquivos));
                        if (typeof objetoArquivos.arquivos == 'string' || objetoArquivos.arquivos instanceof String)
                            objetoArquivos.arquivos = $.parseJSON(objetoArquivos.arquivos);
                    }

                    if (strArrayImagens != '') {
                        objetoImagens.imagens = $.parseJSON(JSON.stringify(strArrayImagens));
                        if (typeof objetoImagens.imagens == 'string' || objetoImagens.imagens instanceof String) {
                            objetoImagens.imagens = $.parseJSON(objetoImagens.imagens);
                        }
                    }

                    $('#txtInputedit').val($('#textoEdicao').text());
                } else {
                    //Banner
                    $(classComp + '.texto_banner').val($('#textoEdicao').text());

                    var strImagemBanner = $.trim($('#imagensBannerSerializadasEdicao').text());
                    if (strImagemBanner != '') {
                        objetoImagemBanner = $.parseJSON((strImagemBanner));
                    }
                }

                /*Chamando os plugins*/

                $('#txtInputedit').elastic();
                $(classComp + ".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar({
                    horizontalScroll: true,
                    advanced: {
                        autoExpandHorizontalScroll: true
                    }
                });
                $(classComp + ".dialogo_box .preview_post.arquivos").mCustomScrollbar();
                $('body').on(tpClick, '#cbAssuntoPostedit li', function () {
                    if (!($(this).hasClass('li_criar_editar_assunto') || $(this).parent().hasClass('li_criar_editar_assunto'))) {
                        var idAssunto = $(this).attr('assu');
                        $('#hAssuntoPostedit').val(idAssunto);
                        $('#cbAssuntoPostedit input[type=checkbox]').removeAttr('checked');
                        $('#ckAssuntoPostedit' + idAssunto).attr('checked', 'checked');
                        var textoCombo = $('label', this).text() + '<span class=\"caret\"></span>';
                        $('#txtAssuntoPostedit').html(textoCombo);
                        $('#cbAssuntoPostedit').parent().removeClass('open');
                    }
                });
                $(classComp + '.iframeVideoVimeo').on('load', paginaEducacional_TratamentoVimeo);
                $('#dataAgendamentoedit').datepicker({
                    numberOfMonths: 1,
                    dateFormat: "dd/mm/yy",
                    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    minDate: new Date(),
                    onSelect: function (eventArg) {
                        $('#hDataAgendamentoedit').val(eventArg);
                    }
                });

                $('#horaAgendamentoedit').timepicker({
                    myPosition: 'right top',
                    atPosition: 'right bottom',
                    onSelect: function (eventArg) {
                        $('#hHoraAgendamentoedit').val(eventArg);
                    }
                });

                $("html,body").animate({
                    scrollTop: $articleEdit.offset().top - 5
                }, 1000); //.css('overflow', 'hidden');

                /*Botões*/
                $('#visualizarPostedit').on(tpClick, function () {
                    var postValido = true;
                    if ($('#postAgendadoedit').val() == 1)
                        postValido = validarDataPreview($('#hDataAgendamentoedit').val(), $('#hHoraAgendamentoedit').val());

                    if (!postValido) {
                        alert('O agendamento precisa ser para horário posterior ao atual.');
                    } else {

                        var objetoArquivosPreview = [];
                        var objetoImagensPreview = [];
                        var objAux = new Object();

                        if (objetoImagens.imagens.length > 0) {
                            for (var i in objetoImagens.imagens) {
                                objAux = objetoImagens.imagens[i];
                                objAux.nome = jQuery('<div />').html(objAux.nome).text();
                                objetoImagensPreview.push(objAux);
                            }
                        }

                        if (objetoArquivos.arquivos.length > 0) {
                            for (var i in objetoArquivos.arquivos) {
                                objAux = objetoArquivos.arquivos[i];
                                objAux.nome = jQuery('<div />').html(objAux.nome).text();
                                objetoArquivosPreview.push(objAux);
                            }
                        }

                        var bolDestaque = $('#ckBolDestaqueedit').is(':checked');
                        var bolBanner = $(classComp + ".url_banner").is(":visible");
                        var strMensagem = bolBanner ? $(classComp + '.texto_banner').val() : $('#txtInputedit').val();
                        var bolNotificar = $('#ckBolNotificaredit').is(':checked');
                        //Chamando preview
                        $.fancybox({
                            maxWidth: (bolDestaque ? 840 : 560),
                            maxHeight: 520,
                            fitToView: false,
                            width: (bolDestaque ? 840 : 560),
                            scrolling: 'no',
                            height: 170,
                            padding: 0,
                            autoSize: true,
                            closeClick: false,
                            openEffect: 'none',
                            hideOnContentClick: false,
                            modal: true,
                            closeEffect: 'none',
                            ajax: {
                                type: "POST",
                                data: {
                                    idMensagemRapida: idMensagemRapida,
                                    idPagina: $('#idPagina').val(),
                                    strTexto: encodeURIComponent(strMensagem),
                                    bolComentar: $('#ckBolComentaredit').is(':checked'),
                                    bolAgendado: $('#postAgendadoedit').val() == 1,
                                    strDataAgendamento: $('#hDataAgendamentoedit').val(),
                                    strHoraAgendamento: $('#hHoraAgendamentoedit').val(),
                                    idAssunto: $('#hAssuntoPostedit').val(),
                                    strSelecaoDestino: $('#selecaoDestinoedit').val(),
                                    strLinkVideo: bolBanner ? ($(classComp + ".url_banner input").val()) : ($('#urlVideoOriginal' + idComp).val()),
                                    "imagens": JSON.stringify(bolBanner ? objetoImagemBanner.id : objetoImagens.imagens),
                                    "arquivos": JSON.stringify(objetoArquivosPreview),
                                    bolDestaque: bolDestaque,
                                    bolBanner: bolBanner,
                                    bolNotificar: bolNotificar
                                },
                                dataType: "html"
                            },
                            type: "ajax",
                            href: "/AVA/Pagina/Home/VisualizarPost/", //Visualizando a edição
                            scrolling: 'no',
                            beforeShow: function () {
                                $("html").css({ 'overflow': 'hidden' });
                            },
                            afterClose: function () {
                                $("html").css({ 'overflow': 'scroll' });
                            },
                            onUpdate: function () {
                                if (mobile) {
                                    $('article[ide=' + idMensagemRapida + ']  .post_espec.preview_post_pagina').mCustomScrollbar('update');
                                }
                            },
                            afterShow: function () {

                                if (mobile) {
                                    $('article[ide=' + idMensagemRapida + ']  .post_espec.preview_post_pagina').mCustomScrollbar();
                                }

                                if (bolDestaque) {
                                    window.setTimeout(function () {
                                        $('.detaque_Video_Vimeo[ide=' + idMensagemRapida + ']').each(function () {
                                            var urlVimeo = $(this).attr('urlvimeo');
                                            urlVimeo = getVimeoThumb(urlVimeo);
                                            $(this).attr('style', 'background-image:url(' + urlVimeo + ');');
                                        });
                                    }, 100);
                                }

                                if (objetoImagens.imagens.length > 0) {
                                    $('article[ide=' + idMensagemRapida + '] .preview_post_pagina .imagens_mural img').one('load', function () {

                                        if (timeoutPreview != null && timeoutPreview != undefined)
                                            clearTimeout(timeoutPreview);

                                        timeoutPreview = window.setTimeout(function () {
                                            $.fancybox.update();
                                            $.fancybox.reposition();
                                        }, 10);

                                    });
                                } else {
                                    $.fancybox.update();
                                    $.fancybox.reposition();
                                }

                                $('article[ide=' + idMensagemRapida + '] .preview_post_pagina.banner img').one('load', function () {
                                    var tamanhoBanner = $(this).width();
                                    if (tamanhoBanner > 300) {
                                        $(this).parent().width('100%');
                                    }

                                    if (timeoutPreview != null && timeoutPreview != undefined)
                                        clearTimeout(timeoutPreview);

                                    timeoutPreview = window.setTimeout(function () {
                                        $.fancybox.update();
                                        $.fancybox.reposition();
                                    }, 10);

                                });

                                /*//idMensagemRapida da visualização é 0

                                if (objetoImagens.imagens.length > 0) {
                                //Tem que esperar as imagens carregar para dar o scroll
                                var totalImagensPost = objetoImagens.imagens.length;
                                var totalImagensPostCarregadas = 0;

                                for (var imIdx = 0; imIdx < objetoImagens.imagens.length; imIdx++) {
                                var imagemAux = new Image();
                                imagemAux.src = objetoImagens.imagens[imIdx].diretorio + '/' + objetoImagens.imagens[imIdx].arquivo + objetoImagens.imagens[imIdx].extensao;
                                $(imagemAux).load(function () {
                                totalImagensPostCarregadas++;
                                if (totalImagensPostCarregadas == totalImagensPost) {
                                $.fancybox.update();
                                }
                                });
                                }
                                } else {
                                $.fancybox.update();
                                }

                                $('article[ide=' + idMensagemRapida + '] .preview_post_pagina.banner img').one('load', function () {
                                var tamanhoBanner = $(this).width();
                                if (tamanhoBanner > 300) {
                                $(this).parent().width('100%');
                                }
                                window.setTimeout(function () { $.fancybox.reposition(); }, 10);
                                });*/

                                $('article[ide=' + idMensagemRapida + ']  .agendado[title!=""]').qtip(qtipOptions);
                                $('article[ide=' + idMensagemRapida + ']  .post_fixo.fontello[title!=""]').qtip(qtipOptionsDestaque);

                                var customExpander = jQuery.extend({}, expanderOptions);
                                customExpander.onCollapse = customExpander.afterExpand = customExpander.onSlice = function () {
                                    $.fancybox.update(); //Bug encontrado pela dari
                                };

                                $('article[ide=' + idMensagemRapida + '] .ctn_msg').expander(customExpander);
                                $('article[ide=' + idMensagemRapida + '] .iframeVideoVimeo').on('load', paginaEducacional_TratamentoVimeo);
                                $('.acoes_mural.preview_mensagem[ide=' + idMensagemRapida + '] .btn_cinza').on(tpClick, function () {
                                    if (!$(this).hasClass('disable')) {
                                        $.fancybox.close();
                                    }
                                });

                                var assuntoPost = $('#hAssuntoPostedit').val();
                                var bolAgendadoOriginal = $('#mensagemOrigemAgendado').val() == 1;

                                $('.acoes_mural.preview_mensagem[ide=' + idMensagemRapida + '] .btn_cor').on(tpClick, function () {
                                    if (!$(this).hasClass('disable')) {

                                        $('.acoes_mural.preview_mensagem[ide=' + idMensagemRapida + '] .btn_cor').addClass('disable');
                                        $('.acoes_mural.preview_mensagem[ide=' + idMensagemRapida + '] .btn_cinza').addClass('disable');

                                        var bolPostAgendado = parseInt($('#postAgendadoedit').val()) == 1;
                                        var strSelecaoDestino = $('#selecaoDestinoedit').val();
                                        $.ajax({
                                            type: 'POST',
                                            url: "/AVA/Pagina/Home/EditarMensagemRapida",
                                            data: {
                                                idMensagemRapida: idMensagemRapida,
                                                idPagina: $('#idPagina').val(),
                                                strTexto: encodeURIComponent(strMensagem),
                                                bolComentar: $('#ckBolComentaredit').is(':checked'),
                                                bolAgendado: bolPostAgendado,
                                                strDataAgendamento: $('#hDataAgendamentoedit').val(),
                                                strHoraAgendamento: $('#hHoraAgendamentoedit').val(),
                                                idAssunto: assuntoPost,
                                                strSelecaoDestino: $('#selecaoDestinoedit').val(),
                                                strLinkVideo: bolBanner ? ($(classComp + ".url_banner input").val()) : ($('#urlVideoOriginal' + idComp).val()),
                                                "imagens": JSON.stringify(bolBanner ? objetoImagemBanner.id : objetoImagens.imagens),
                                                "arquivos": JSON.stringify(objetoArquivosPreview),
                                                bolDestaque: bolDestaque,
                                                bolBanner: bolBanner,
                                                bolNotificar: bolNotificar
                                            },
                                            async: true,
                                            success: function (dataSalvar) {
                                                $.fancybox.close();
                                                var bolReplace = false;
                                                var idAssuntoTimeline = $('#hAssuntoTimeLine').val();

                                                if (bolPostAgendado) {
                                                    if (idAssuntoTimeline == 0 || idAssuntoTimeline == assuntoPost) {
                                                        bolReplace = true;
                                                    }
                                                }

                                                if (bolReplace) {

                                                    $('article[ide=' + idMensagemRapida + ']').replaceWith(dataSalvar);
                                                    $('article[ide=' + idMensagemRapida + '] .agendado[title!=""]').qtip(qtipOptions);
                                                    $('article[ide=' + idMensagemRapida + '] .post_fixo.fontello[title!=""]').qtip(qtipOptions);
                                                    $('article[ide=' + idMensagemRapida + '] .ctn_msg').expander(expanderOptions);
                                                    $('article[ide=' + idMensagemRapida + '] .imagens_mural').GaleriaAva();
                                                    $('article[ide=' + idMensagemRapida + '] .iframeVideoVimeo').on('load', paginaEducacional_TratamentoVimeo);
                                                    $('article[ide=' + idMensagemRapida + '] .banner_mural img').one('load', function () {
                                                        var tamanhoBanner = $(this).width();
                                                        if (tamanhoBanner > 300) {
                                                            $(this).parent().parent().width('100%');
                                                        }
                                                    });

                                                } else {

                                                    if (bolPostAgendado) {
                                                        $('.sessao_mural').removeClass('ativo');
                                                        if (!$('.sessao_agendados').hasClass('ativo'))
                                                            $('.sessao_agendados').addClass('ativo');
                                                    } else {
                                                        $('.sessao_agendados').removeClass('ativo');
                                                        if (!$('.sessao_mural').hasClass('ativo'))
                                                            $('.sessao_mural').addClass('ativo');
                                                    }

                                                    $('#hAssuntoTimeLine').val($('#hAssuntoTimeLine').attr('initvalue'));
                                                    $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
                                                    $('#ckAssuntoTimeLine' + $('#hAssuntoTimeLine').val()).attr('checked', 'checked');
                                                    var textoCombo = $('#ckAssuntoTimeLine' + $('#hAssuntoTimeLine').val()).next().text() + '<span class=\"caret\"></span>';
                                                    $('#txtAssuntoTimeLine').html(textoCombo);
                                                    paginaEducacional_CarregarMural(bolPostAgendado, 1);

                                                }
                                                if (bolDestaque)
                                                    MostrarAbaDestaques(false);
                                                if (bolNotificar) {
                                                    $.ajax({
                                                        type: 'POST',
                                                        url: "/AVA/Pagina/Home/GerarNotificaoPostPaginaEscola",
                                                        data: {
                                                            idMensagemRapida: idMensagemRapida,
                                                            strSelecaoDestino: strSelecaoDestino
                                                        },
                                                        async: true,
                                                        success: function (data) {
                                                            if (data != "OK") {
                                                                console.log('Ocorreu um erro ao notificar usuários da página da escola');
                                                                alert('Ocorreu um erro ao notificar usuários da página da escola');
                                                            }

                                                        }, error: function (data) {
                                                            console.log('Ocorreu um erro ao salvar as notificações do post da página da escola');
                                                        }
                                                    });
                                                }

                                                paginaEducacional_CancelarDigaLaClick();
                                            }, error: function (dataSalvar) {
                                                $.fancybox.close();
                                                console.log('Ocorreu um erro ao salvar mensagem');
                                                paginaEducacional_CancelarDigaLaClick();
                                                MostrarAbaDestaques(true);
                                            }
                                        });
                                    }
                                });
                                window.setTimeout(function () {
                                    $.fancybox.reposition();
                                }, 100);
                            } //Fim aftershow
                        });
                    }
                });

                $('#btnCancelarFerramentaMuraledit').on(tpClick, function () {
                    paginaEducacional_CancelarDigaLaClick();
                });
            }, error: function (data) {
                console.log('Ocorreu um erro ao carregar a edição');
            }
        });
    });

    ////////////////////////////////////////////////
    //////////   Destaque     //////////////////////
    ////////////////////////////////////////////////

    $('body').on(tpClick, '.combo_denunciar_excluir .removerDestaqueMensagemRapida', function () {
        var idMensagemRapida = $(this).closest("article").attr("ide");

        $.ajax({
            type: 'POST',
            url: "/AVA/Pagina/Home/RemoverDestaqueMensagemRapida",
            data: {
                idMensagemRapida: idMensagemRapida,
                idPagina: $('#idPagina').val()
            },
            async: true,
            success: function (data) {
                if ($('.sessao_destacados').hasClass('ativo')) {
                    $('#ava_fluxoarticles article[ide=' + idMensagemRapida + ']').fadeOut();
                    var intAlteracoesPagina = $('#intAlteracoesPagina').val();
                    intAlteracoesPagina--;
                    $('#intAlteracoesPagina').val(intAlteracoesPagina);
                } else {
                    $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .combo_denunciar_excluir ul').fadeOut();
                    $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .removerDestaqueMensagemRapida').html('<span class="fixar_comentario_combo fontello"></span>Destacar');
                    $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .removerDestaqueMensagemRapida').addClass('adicionarDestaqueMensagemRapida');
                    $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .adicionarDestaqueMensagemRapida').removeClass('removerDestaqueMensagemRapida');
                    $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .combo_denunciar_excluir').siblings('.post_fixo.fontello').fadeOut('fast', function () {
                        $(this).remove();
                    });
                }
                MostrarAbaDestaques(true);
            },
            error: function (data) {
                console.log('Ocorreu um erro ao remover o destaque');
                MostrarAbaDestaques(true);
            }
        });

    });

    $('body').on(tpClick, '.combo_denunciar_excluir .adicionarDestaqueMensagemRapida', function () {
        var idMensagemRapida = $(this).closest("article").attr("ide");

        $.ajax({
            type: 'POST',
            url: "/AVA/Pagina/Home/AdicionarDestaqueMensagemRapida",
            data: {
                idMensagemRapida: idMensagemRapida,
                idPagina: $('#idPagina').val()
            },
            async: true,
            success: function (data) {
                $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .combo_denunciar_excluir ul').fadeOut();
                $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .adicionarDestaqueMensagemRapida').html('<span class="desfixar_comentario_combo fontello"></span>Remover destaque');
                $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .adicionarDestaqueMensagemRapida').addClass('removerDestaqueMensagemRapida');
                $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .removerDestaqueMensagemRapida').removeClass('adicionarDestaqueMensagemRapida');
                $('<span class="post_fixo fontello" style="display:none;" title="Post destacado"></span>').insertAfter('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .combo_denunciar_excluir');
                $('#ava_fluxoarticles article[ide=' + idMensagemRapida + '] .post_fixo.fontello').fadeIn(function () {
                    $(this).qtip(qtipOptions);
                });
                MostrarAbaDestaques(false);
            },
            error: function (data) {
                console.log('Ocorreu um erro ao adicionar o destaque');
                MostrarAbaDestaques(true);
            }
        });

    });
});


//Funções
//Noticias
function paginaEducacional_CarregarNoticias(noticias) {
    if (noticias.length > 0) {
        if (noticias != "500") {
            var $noticias = $(noticias);
            $('p img', $noticias).parent().css('float', 'left');
            var $itemComImagem = $('p img', $noticias).parent().parent();
            $itemComImagem.prepend($('p img', $noticias).parent().detach());
            $('.bcs5.editoria ul').replaceWith($noticias);
        }
    }
}

//Diga lá
function paginaEducacional_LimparCaixaTexto(idCaixa) {
    $(idCaixa).val('');
    $(idCaixa).siblings(':last').html('');
    $(idCaixa).siblings(':last').prev().html('');
    $(idCaixa).height(28);
}

//Mural Educacional
var ajaxTimeLine = null;
var countPaginacaoIdPost = 0;
function paginaEducacional_CarregarMural(carregarAgendados, indexPaginacao) {
    if (ajaxTimeLine != null) {
        ajaxTimeLine.abort();
    }

    var bolSomenteDestaques = false;
    if (!carregarAgendados) {
        bolSomenteDestaques = $('.sessao_destacados').hasClass('ativo');
    }

    var loader = '<div id="loader_timeline" style="padding: 20px 47%;"><img border="0" alt="carregando..." src="/AVA/StaticContent/Common/img/perfil/carregando.gif" /></div>';

    if (indexPaginacao == 1) {
        $('#intAlteracoesPagina').val(0);
        $('#indexPaginacao').val(indexPaginacao);
        $('#ava_fluxoarticles').html(loader);
    } else if (indexPaginacao > 1) {
        $('#ava_fluxoarticles').append(loader);
        //Só altera a paginação quando da sucess
    }

    $('#ava_fluxoarticles #verMaisMensagens').remove();

    var intAlteracoesPagina = $('#intAlteracoesPagina').val();

    ajaxTimeLine = $.ajax({
        type: 'POST',
        url: "/AVA/Pagina/Home/TimeLine",
        data: {
            idPagina: $('#idPagina').val(),
            intAgendado: (carregarAgendados ? 1 : 0),
            idAssunto: $('#hAssuntoTimeLine').val(),
            intPaginacao: indexPaginacao,
            intAlteracoesPagina: intAlteracoesPagina,
            idPostUnico: $('#idPostUnico').val(),
            bolSomenteDestaques: bolSomenteDestaques ? 1 : 0
        },
        async: true,
        success: function (data) {
            if (data != "0" && data != "-1") {
                var $resultado = $(data);
                $('#indexPaginacao').val(indexPaginacao);

                if (indexPaginacao == 1) {
                    $('#ava_fluxoarticles').html($resultado);
                } else {
                    $('#loader_timeline').remove();
                    $('#ava_fluxoarticles').append($resultado);
                }

                //Contraindo os textos
                $('.agendado[title!=""]', $resultado).qtip(qtipOptions);
                $('.post_fixo.fontello[title!=""]', $resultado).qtip(qtipOptions);
                $('.ctn_msg', $resultado).expander(expanderOptions);
                $(".imagens_mural", $resultado).GaleriaAva();
                $('.iframeVideoVimeo', $resultado).on('load', paginaEducacional_TratamentoVimeo);

                $('.banner_mural img', $resultado).one('load', function () {
                    var tamanhoBanner = $(this).width();
                    if (tamanhoBanner > 300) {
                        $(this).parent().parent().width('100%');
                    }                    
                });

                if ($("#idPost").val() != "0" && $("#idPost").val() != "") {
                    if ($("#ava_fluxoarticles article[ide='"+$("#idPost").val()+"']").html() != null) {
                        $("#ava_fluxoarticles article[ide='"+$("#idPost").val()+"']")[0].scrollIntoView();
                    }
                    else{
                        countPaginacaoIdPost++;
                        if (countPaginacaoIdPost < 4) {
                            $('#verMaisMensagens').click();    
                            console.log('procurando -> '+$("#idPost").val());
                        }
                        else{
                            countPaginacaoIdPost = 0;
                            console.log("post nao encontrado.");
                        }
                    }
                }

            } else if (indexPaginacao == 1) {
                if (data == "-1") {
                    $('#ava_fluxoarticles').html('<article ide="0" class="clearfix"><div class="blokletters"><p>Não há resultados para o filtro aplicado.</p></div></article>');
                } else {
                    $('#ava_fluxoarticles').html('<article ide="0" class="clearfix"><div class="blokletters"><p>Nenhuma mensagem encontrada</p></div></article>');
                }
            }

            $('#loader_timeline').remove();

        }, error: function (data) {
            console.log('Ocorreu um erro ao carregar mural');
        }
    });
}

var expanderOptions = {
    slicePoint: 500,
    window: 2,
    expandText: ' leia mais',
    expandPrefix: '...',
    userCollapseText: 'menos',
    preserveWords: true,
    expandEffect: 'fadeIn',
    collapseEffect: 'fadeOut'
};

var qtipOptions = {
    style: { classes: 'qtip-dark' },
    position: {
        my: 'bottom center', // Position my top left...
        at: 'top center', // at the bottom right of...
        adjust: {
            y: 0
        }
    }
};

var qtipOptionsDestaque = {
    style: { classes: 'qtip-dark' },
    position: {
        my: 'bottom center', // Position my top left...
        at: 'bottom center', // at the bottom right of...
        adjust: {
            x: 0
        }
    }
};

function paginaEducacional_CarregarMuralVerMais(carregarAgendados) {
    var indexPaginacao = $('#indexPaginacao').val();
    indexPaginacao++;
    paginaEducacional_CarregarMural(carregarAgendados, indexPaginacao);
}

function paginaEducacional_TratamentoVimeo() {
    var playerVimeo = $f(this);
    var playerVimeoStarted = false;
    playerVimeo.api('pause');
    playerVimeo.addEvent('ready', function () {
        playerVimeo.addEvent('play', function () {
            if (!playerVimeoStarted) {
                playerVimeoStarted = true;
                playerVimeo.api('pause');
            }
        });
    });
}

function paginaEducacional_CancelarDigaLaClick() {
    paginaEducacional_CancelarDigaLa();

    removerPreviewVideoMensagem(true);

    limpaArrayImagensTimeLine();
    $(".dialogo_box .preview_post.imagens .prev_imagem:not(.adicionar)").remove();
    $(".dialogo_box .preview_post.imagens").hide();
    $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");

    limpaArrayArquivosTimeLine();
    $(".dialogo_box .preview_post.arquivos .prev_documento:not(.adicionar)").parent().remove();
    $(".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
    $(".dialogo_box .preview_post.arquivos").hide();
    $(".errovideo").hide();
}

function paginaEducacional_CancelarDigaLa() {
    $('#ckBolComentar').closest('.hab_comentario_post').hide();

    paginaEducacional_LimparCaixaTexto('#txtInput');

    $('#selecaoDestino').val('Todos');
    $('.lajotinha.personalizada').hide();
    $('.naopersonalizada').fadeIn();

    $('.data_compartilhamento').removeClass("agendamento_post");
    $('#postAgendado').val(0);
    //Buscando data atual para por nos hidden
    $.ajax({
        type: 'POST',
        url: "/AVA/Pagina/Home/HoraCerta",
        data: { 'tipo': 'picker' },
        async: true,
        success: function (data) {
            var strData = data.split(' ');
            $('#horaAgendamento').attr('placeholder', strData[1]);
            $('#dataAgendamento').attr('placeholder', strData[0]);
            $('#horaAgendamento').val($('#horaAgendamento').attr('placeholder'));
            $('#dataAgendamento').val($('#dataAgendamento').attr('placeholder'));
            $('#hHoraAgendamento').val($('#horaAgendamento').val());
            $('#hDataAgendamento').val($('#dataAgendamento').val());
        }, error: function (data) {
            console.log('Ocorreu um erro ao buscar horario no servidor');
        }
    });

    $('#ckBolDestaque').removeAttr('checked');
    $('#ckBolDestaque').attr('disabled', 'disabled');
    $('#ckBolDestaque').parent().addClass('disabled');
    //$('#ckBolNotificar' + idComp).attr('disabled', 'disabled');
    //$('#ckBolNotificar' + idComp).parent().addClass('disabled');
    $('#ckBolNotificar').attr('checked', 'checked');
    $('#ckBolComentar').removeAttr('checked');

    $('#hAssuntoPost').val($('#hAssuntoPost').attr('initvalue'));
    $('#cbAssuntoPost input[type=checkbox]').removeAttr('checked');
    $('#ckAssuntoPost' + $('#hAssuntoPost').val()).attr('checked', 'checked');
    var textoCombo = $('#ckAssuntoPost' + $('#hAssuntoPost').val()).next().text() + '<span class=\"caret\"></span>';
    $('#txtAssuntoPost').html(textoCombo);

    $(".enviar_video").hide();
    $(".mensagem_multimidia ul:not(.dropdown-menu)").show();
    $(".mensagem_multimidia").show();
    $('#urlVideoOriginal').val('');
    $('#txtLinkVideoMensagem').val('');

    $('#btnCancelarFerramentaMural').closest('.sep_digala').slideUp(200);
    $('.seletor_pagina').slideUp(200);

    //Parte do editar.
    $('#editando').val(0);
    $('.block_edicao').hide();
    $('.dialogo_edicao').remove();
    $('#textoEdicao').remove();
    $('#arquivosSerializadasEdicao').remove();
    $('#imagensSerializadasEdicao').remove();
    $('#mensagemTipoMultimidia').remove();
    $('#mensagemOrigemAgendado').remove();
    $("html,body").css('overflow', '');

    //Banner
    $('.texto_banner').hide();
    $('.texto_banner').val('');
    $('.feed_tipo_banner').hide();
    $('.upload_banner').hide();
    $('.url_banner').hide();
    $('.url_banner input').val('');
    $('.url_banner p').hide();
    $('#txtInput').show();
    $('#txtInputedit').show();

    $('.upload_banner img').attr('src', '');
    $('.upload_banner span').show();
    $('.upload_banner .remover_multimidia_banner').hide();
    $('.upload_banner img').hide();
    objetoImagemBanner = {
        id: 0
    };

    idComp = '';
    classComp = '';
    editID = 0;
}

//Copiados do mural

function montaPreviewVideoMensagem(data) {
    data = decodeURI(data).replace(/\s/g, '');
    var time = "";

    if (data.length > 0) {

        $(classComp + '.errovideo').fadeOut('fast', function () {
            $(classComp + ".verificavideo").fadeIn('slow');
        });

        if (data.indexOf("#t=") > 1 || data.indexOf("&t=") > 1 || data.indexOf("&amp;t=") > 1 || data.indexOf("?t=") > 1) {
            time = getVideoTime(data);
        }

        if (data.indexOf("http://") > -1) {
            data = data.replace("http://", "");
        } else if (data.indexOf("https://") > -1) {
            data = data.replace("https://", "");
        }
        if (data.indexOf("&feature=youtu.be") > -1) {
            var posFeature = data.indexOf("&feature=youtu.be");
            if (data.indexOf("&list=") > -1) {
                var posList = data.indexOf("&list=");
                data = data.substring(0, posFeature) + data.substring(posList, data.length);
            } else if (data.indexOf("#t=") > -1) {
                var posTempo = data.indexOf("#t=");
                data = data.substring(0, posFeature) + data.substring(posTempo, data.length);
            } else if (data.indexOf("&t=") > -1) {
                var posTempo = data.indexOf("&t=");
                data = data.substring(0, posFeature) + data.substring(posTempo, data.length);
            } else if (data.indexOf("&amp;t=") > -1) {
                var posTempo = data.indexOf("&amp;t=");
                data = data.substring(0, posFeature) + data.substring(posTempo, data.length);
            } else if (data.indexOf("?t=") > -1) {
                var posTempo = data.indexOf("?t=");
                data = data.substring(0, posFeature) + data.substring(posTempo, data.length);
            } else if (data.indexOf("&feature=youtu.be") > -1) {
                data = data.substring(0, posFeature);
            }
        }

        data.match(/^(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be)|youtube)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

        var match = {
            provider: null,
            url: RegExp.$2,
            id: RegExp.$5
        }

        var request;
        $.support.cors = true;
        /*if (match.url == 'youtube.com' || match.url == 'youtu.be' || match.url == 'youtube') {
            //var link = 'http://gdata.youtube.com/feeds/api/videos/' + match.id + '?v=2&alt=json';

            request = $.ajax({
                url: getYoutubeURLDados(match.id),
                timeout: 5000,
                success: function (data, status, xhr) {
                    console.log(data);
                    if (data.items.length > 0) {
                        match.provider = 'youtube';
                    }
                },
                dataType: 'jsonp'
            });
            
        }

        if (match.url == 'vimeo.com') {
            var link = 'http://vimeo.com/api/v2/video/' + match.id + '.json'

            request = $.ajax({
                url: link,
                timeout: 2000,
                dataType: 'jsonp',
                success: function () {
                    match.provider = 'vimeo';
                }
            });
        }*/
        request = retornaVideoURL(match);

        if (request && match.id != "") {

            request.always(function () {
                if (!bolVideoProibido) {
                    match.provider = strTipoVideo;
                }

                if (match.provider) {

                    var strLinkVideo = "";
                    var classIframe = "";

                    $(classComp + '.enviar_video, .verificavideo, .errovideo').hide();

                    if (match.provider == "youtube") {
                        strLinkVideo = "www.youtube.com/embed/" + match.id + "?rel=0&wmode=transparent";
                        if (time.length > 0)
                            strLinkVideo += "&start=" + time;
                    } else {
                        classIframe = ' class="iframeVideoVimeo" ';
                        strLinkVideo = "player.vimeo.com/video/" + match.id + "?badge=0&byline=0&portrait=0&title=0&player_id=playerPreview&api=1";
                        if (time.length > 0)
                            strLinkVideo += "#t=" + time;
                    }

                    $("#container_preview_video" + idComp).html(
                            '<iframe ' + classIframe + ' width="300" height="165" src="//' + strLinkVideo + '" allowTransparency="true" frameborder="0" allowfullscreen></iframe>' +
                            '<a href="javascript: void(0);" onClick="removerPreviewVideoMensagem(false);" class="remover_multimidia"><span class="FontAwesome"></span>Remover</a>'
                        ).fadeIn('slow', function () {

                            $(classComp + '.enviar_video, .verificavideo, .errovideo').hide();

                            $("#urlVideoOriginal" + idComp).val(data);

                            $('#visualizarPost' + idComp).removeClass('disable').prop("disabled", false);
                            $(classComp + ".iframeVideoVimeo").on('load', paginaEducacional_TratamentoVimeo);

                        });

                } else {
                    $(classComp + '.verificavideo').fadeOut('fast', function () {
                        $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido));
                        bolVideoProibido = false;
                        strTipoVideo = "";
                        $(classComp + ".errovideo").fadeIn('slow');
                    });
                }
            });
        } else {
            $(classComp + '.verificavideo').fadeOut('fast', function () {
                $(".errovideo").text(retornaTextoErroVideo(bolVideoProibido));
                bolVideoProibido = false;
                strTipoVideo = "";
                $(classComp + ".errovideo").fadeIn('slow');
            });
        }
    }
    return false;
}

function removerPreviewVideoMensagem(btnCancelar) {
    if (btnCancelar === undefined || btnCancelar == null || btnCancelar == "") {
        btnCancelar = false;
    }

    $("#container_preview_video" + idComp).fadeOut('slow', function () {

        var $iframe = $('iframe', $(this));

        //correção do bug do vimeo no IE
        $iframe.attr('src', '');

        setTimeout(function () {
            $iframe.remove();
            $("#container_preview_video" + idComp).html("");
        }, 20);

        $("#txtLinkVideoMensagem" + idComp).val("");
        $(classComp + ".enviar_video").hide();
        $('#urlVideoOriginal' + idComp).val('');

        if (!btnCancelar) {
            var strMensagem = $.trim($('#txtInput' + idComp).val());

            if (strMensagem == '' && idComp == '') {
                paginaEducacional_CancelarDigaLa();
            } else {
                $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").show();
                $(classComp + ".mensagem_multimidia").show();
                if (idComp != '' && strMensagem == '') {
                    $('#visualizarPost' + idComp).addClass('disable').attr('disable', 'disable');
                }
            }
        }
    });
}

/******* TIMELINE IMAGEM *********/

function preparaAvaSelector() { }

function CallbackUploadExcluidos(jsonRetorno) {
    if (parseInt(jsonRetorno.idFerramentaTipo) == idFerramentaBanner) {
        if (objetoImagemBanner.id == parseInt(jsonRetorno.idArquivo)) {
            objetoImagemBanner = {
                id: 0
            };

            $(classComp + '.upload_banner img').hide();
            $(classComp + '.upload_banner img').attr('src', '');
            $(classComp + '.upload_banner span').show();
            $(classComp + '.upload_banner .remover_multimidia_banner').hide();

            var linkBanner = $.trim($(classComp + ".url_banner input").val());
            var strTextoBanner = $.trim($(classComp + ".texto_banner").val());
            var linkValido = false;

            if (linkBanner != '') {
                var regexLinkGeral = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
                if (regexLinkGeral.test(linkBanner))
                    linkValido = true;

                if (!linkValido) {
                    $(classComp + ".url_banner p").show();
                } else {
                    $(classComp + ".url_banner p").hide();
                }
            }

            if (strTextoBanner != '' && linkValido) {
                $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
            } else {
                $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
            }
        }
    } else if (parseInt(jsonRetorno.idFerramentaTipo) == idFerramentaTipoTimeLine) {
        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens != null && objetoImagens.imagens.length > 0) {
            var tamanho = objetoImagens.imagens.length;
            for (var i = 0; i < tamanho; i++) {
                if (objetoImagens.imagens[i].idArquivo == jsonRetorno.idArquivo) {
                    objetoImagens.imagens.splice(i, 1);
                    $(classComp + ".preview_post.imagens").find(".prev_imagem").not(".adicionar").each(function () {
                        if ($(this).data("idarquivo") == jsonRetorno.idArquivo) {
                            $(this).remove();
                            return;
                        }
                    });
                    break;
                }
            }

            if (objetoImagens.imagens.length == 0) {
                $(classComp + ".dialogo_box .preview_post.imagens").hide();

                var strTexto = $.trim($("#txtInput" + idComp).val());

                if (strTexto == '' && idComp == '') {
                    paginaEducacional_CancelarDigaLa();
                } else {
                    $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").show();
                    $(classComp + ".mensagem_multimidia").show();
                    if (idComp != '' && strTexto == '') {
                        $('#visualizarPost' + idComp).addClass('disable').attr('disable', 'disable');
                    }
                }
            }

            $(classComp + ".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
        }
    }
    else if (parseInt(jsonRetorno.idFerramentaTipo) == idFerramentaTipoTimeLineFile) {
        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
            var tamanho = objetoArquivos.arquivos.length;
            for (var i = 0; i < tamanho; i++) {
                if (objetoArquivos.arquivos[i].idArquivo == jsonRetorno.idArquivo) {
                    objetoArquivos.arquivos.splice(i, 1);
                    $(classComp + ".preview_post.arquivos").find(".prev_documento").each(function () {
                        if (parseInt($(this).parent().data("idarquivo")) == jsonRetorno.idArquivo) {
                            $(this).parent().remove();
                            return;
                        }
                    });
                    break;
                }
            }

            if (objetoArquivos.arquivos.length == 0) {
                $(classComp + ".dialogo_box .preview_post.arquivos").hide();

                var strTexto = $.trim($("#txtInput" + idComp).val());

                if (strTexto == '' && idComp == '') {
                    paginaEducacional_CancelarDigaLa();
                } else {
                    $(classComp + ".mensagem_multimidia ul:not(.dropdown-menu)").show();
                    $(classComp + ".mensagem_multimidia").show();
                    if (idComp != '' && strTexto == '') {
                        $('#visualizarPost' + idComp).addClass('disable').attr('disable', 'disable');
                    }
                }
            }

            $(classComp + ".dialogo_box .preview_post.arquivos").mCustomScrollbar("update");
        }
    }
}

function abreUploadImagemBanner() {
    $.ajax({
        url: "/AVA/Pagina/Home/VerificaAlbumTimelineBanner",
        type: 'POST',
        dataType: "json",
        async: false,
        success: function (data) {
            var erro = parseInt(data.error);
            if (erro == 0) {
                idalbum = parseInt(data.album.idAlbum);

                var param = {
                    "idFerramenta": 0,
                    "idFerramentaTipo": idFerramentaBanner,
                    "idsArquivosSelecionados": ''
                };
                var mForm;

                try {
                    mForm = document.createElement("<form name='upload'>");
                } catch (ex) {
                    mForm = document.createElement("form");
                    mForm.name = "upload";
                }

                for (var i in param) {
                    if (param.hasOwnProperty(i)) {
                        var input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = i;
                        input.value = param[i];
                        mForm.appendChild(input);
                    }
                }

                
                var idsArquivosPreSelecionados = new Array();
                if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens !== undefined && objetoImagens.imagens.length > 0) {
                    for (var oi in objetoImagens.imagens) {
                        idsArquivosPreSelecionados.push(objetoImagens.imagens[oi].idArquivo);
                    }
                }
                var param = {
                    "idFerramenta": idalbum,
                    "idFerramentaTipo": idFerramentaBanner,
                    "idsArquivosSelecionados": idsArquivosPreSelecionados.join(',')
                };
                var mForm;

                try {
                    mForm = document.createElement("<form name='upload' id='upload'>");
                } catch (ex) {
                    mForm = document.createElement("form");
                    mForm.name = "upload";
                }

                for (var i in param) {
                    if (param.hasOwnProperty(i)) {
                        var input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = i;
                        input.value = param[i];
                        mForm.appendChild(input);
                    }
                }
                mForm.target = "Upload";
                mForm.method = "POST";
                mForm.action = "/AVA/Upload";

                document.body.appendChild(mForm);

                var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
                if (Modernizr.touch) {
                    parametros = null;
                }
                $("#previewImagemDigaLaPagina iframe").append(mForm);		
                mForm.submit();		
                $("#previewImagemDigaLaPagina").dialog("open");		
                $.fancybox.hideLoading();


            } else {
                console.log(data.msg);
                $.fancybox.hideLoading();
            }
        },
        error: function (data) {
            $.fancybox.hideLoading();
        }
    });

}

function abreUploadImagemTimeLine() {
    var idalbum = parseInt($(".dialogo .dialogo_box .preview_post.imagens").data("idalbum"));
    $.fancybox.showLoading();

    if (idalbum === undefined || idalbum == null || idalbum == 0 || isNaN(idalbum)) {

        // url: "/AVA/Pagina/Home/VerificaAlbumTimeline",

        var flagContinua = true;
        $.fancybox.showLoading();
        if (idalbum === undefined || idalbum == null || idalbum == 0) {
            $.ajax({
                url: "/AVA/Pagina/Home/VerificaAlbumTimeline",
                type: "POST",
                dataType: "json",
                async: !1,//false,
                success: function (data) {
                    var erro = parseInt(data.error);
                    if (erro == 0) {
                        idalbum = parseInt(data.album.idAlbum);

                    } else {
                        console.log(data.msg);
                        flagContinua = false;
                        $.fancybox.hideLoading();
                    }
                },
                error: function (data) {
                    $.fancybox.hideLoading();
                    flagContinua = false;
                }
            });
        }
        //TODO:::
        if (flagContinua) {
            var idsArquivosPreSelecionados = new Array();
            if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens !== undefined && objetoImagens.imagens.length > 0) {
                for (var oi in objetoImagens.imagens) {
                    idsArquivosPreSelecionados.push(objetoImagens.imagens[oi].idArquivo);
                }
            }
            var param = {
                "idFerramenta": idalbum,
                "idFerramentaTipo": idFerramentaTipoTimeLine,
                "idsArquivosSelecionados": idsArquivosPreSelecionados.join(',')
            };
            var mForm;

            try {
                mForm = document.createElement("<form name='upload' id='upload'>");
            } catch (ex) {
                mForm = document.createElement("form");
                mForm.name = "upload";
            }

            for (var i in param) {
                if (param.hasOwnProperty(i)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = i;
                    input.value = param[i];
                    mForm.appendChild(input);
                }
            }
            mForm.target = "Upload";
            mForm.method = "POST";
            mForm.action = "/AVA/Upload";

            document.body.appendChild(mForm);

            var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
            if (Modernizr.touch) {
                parametros = null;
            }
            $("#previewImagemDigaLaPagina iframe").append(mForm);		
            mForm.submit();		
            $("#previewImagemDigaLaPagina").dialog("open");		
            $.fancybox.hideLoading();
        }


    }
}

function limpaArrayImagensTimeLine() {
    if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
        objetoImagens.imagens.splice(0, objetoImagens.imagens.length);
    }
}

function montaPreviewImagemMensagemRapida(obj) {
    $(classComp + ".dialogo_box .preview_post.imagens").show();

    var $caixa = $(classComp + ".dialogo_box .preview_post.imagens .engloba_classe .mCSB_container");

    if (obj !== undefined && obj != null && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var caminhoImagem = obj[i].diretorio;
            var thumb = obj[i].thumbnail + obj[i].extensao;
            var $div = $("<div />").addClass("prev_imagem").data("idarquivo", obj[i].idArquivo);
            var $img = $("<img />").attr("src", caminhoImagem + "/" + thumb).attr("width", "99").attr("height", "99").attr("alt", obj[i].nome);
            var $a = $("<a />").addClass("remover_multimidia").attr("href", "javascript:void(0);");
            var $span = $("<span />").addClass("FontAwesome");

            $a.append($span);
            $div.append($img);
            $div.append($a);

            if ($caixa.find(".prev_imagem:first").hasClass("adicionar")) {
                $caixa.prepend($div);
            } else {
                $caixa.find(".prev_imagem").not(".adicionar").last().after($div);
            }

        }
        $(classComp + ".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
    }

}

/******* TIMELINE IMAGEM *********/

/******* TIMELINE ARQUIVOS *******/

function abreUploadFileTimeLine() {
    

    console.log("abreUploadFileTimeLine mensagemRapida");
    var flagContinua = true;
    var idArquivoMultimidia = parseInt($(".dialogo .dialogo_box .preview_post.arquivos").data("idarquivomultimidia"));
    $.fancybox.showLoading();
    
    if (idArquivoMultimidia === undefined || idArquivoMultimidia == null || idArquivoMultimidia == 0) {
        $.ajax({
            url: "/ava/Pagina/home/VerificaArquivoMultimidiaTimeline",
            dataType: "json",
            async: false,
            success: function (data) {
                var erro = parseInt(data.error);
                if (erro == 0) {
                    idArquivoMultimidia = parseInt(data.arquivomultimidia.idArquivoMultimidia);

                } else {
                    console.log(data.msg);
                    flagContinua = false;
                    $.fancybox.hideLoading();
                }
            },
            error: function (data) {
                $.fancybox.hideLoading();
                flagContinua = false;
            }
        });
    }
    if (flagContinua) {
        var idsArquivosPreSelecionados = new Array();
        if (objetoArquivos.arquivos.length > 0) {
            for (var oi in objetoArquivos.arquivos) {
                idsArquivosPreSelecionados.push(objetoArquivos.arquivos[oi].idArquivo);
            }
        }

        var param = {
            "idFerramenta": idArquivoMultimidia,
            "idFerramentaTipo": 37,//TODO::: idFerramentaTipoTimeLineFile,
            "idsArquivosSelecionados": idsArquivosPreSelecionados.join(',')
        };
        var mForm;

        try {
            mForm = document.createElement("<form name='upload'>");
        } catch (ex) {
            mForm = document.createElement("form");
            mForm.name = "upload";
        }

        for (var i in param) {
            if (param.hasOwnProperty(i)) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = i;
                input.value = param[i];
                mForm.appendChild(input);
            }
        }
        // o mForm.target tem que esta igual ao do div (mForm.target = "UploadFile" == <iframe name="UploadFile")
        mForm.target = "UploadFile";
        mForm.method = "POST";
        mForm.action = "/AVA/Upload";

        document.body.appendChild(mForm);

        var parametros = "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=880,height=660";
        if (Modernizr.touch) {
            parametros = null;
        }
        $("#previewFileDigaLaPagina iframe").append(mForm);		
		mForm.submit();		
		$("#previewFileDigaLaPagina").dialog("open");
        $.fancybox.hideLoading();
    }
  
}

function montaPreviewFilesMensagemRapida(obj) {
    var $caixa = $(classComp + ".dialogo_box .preview_post.arquivos .mCSB_container");

    if (obj !== undefined && obj != null && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {

            var $div = $("<div />").data("idarquivo", obj[i].idArquivo);
            var $divv = $("<div />").addClass("prev_documento");
            var $div3 = $("<div />").addClass("tipo_arquivo");
            var $img = $("<img />").attr("src", "/ava/StaticContent/Common/img/perfil/documento_multimidia.png").attr("width", "32").attr("height", "41");
            var $span = $("<span />").text(obj[i].extensao.substring(1, obj[i].extensao.length));
            var $p = $("<p />").html((obj[i].nome == "" ? obj[i].arquivo : obj[i].nome));
            var $a = $("<a />").attr("href", "#").addClass("remover_multimidia").text("Remover");
            var $spana = $("<span />").addClass("FontAwesome");


            $div3.append($img);
            $div3.append($span);
            $divv.append($div3);
            $divv.append($p);
            $a.prepend($spana);
            $div.append($divv);
            $div.append($a);

            $caixa.find(".adicionar_doc").prev().before($div);

        }
        $(classComp + ".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update");
    }
}

function limpaArrayArquivosTimeLine() {
    if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
        objetoArquivos.arquivos.splice(0, objetoArquivos.arquivos.length);
    }
}

/******* TIMELINE ARQUIVOS *******/

/******* Callback upload *********/
function CallbackUpload(jsonRetorno) {
    
    var idFerramenta = jsonRetorno.idFerramenta;

    if(  jsonRetorno.isbanner == true ){

        var idFerramentaTipo = 43;

    }
    else{
        var idFerramentaTipo = parseInt(jsonRetorno.idFerramentaTipo);
    }
    
    var idArquivo = jsonRetorno.arrayArquivo[0].id;
    var srcImagem = jsonRetorno.arrayArquivo[0].strDiretorio + "/" + jsonRetorno.arrayArquivo[0].strArquivo + jsonRetorno.arrayArquivo[0].strExtensao;

    if (idFerramentaTipo == idFerramentaBanner) { //Imagem do banner
        objetoImagemBanner = jQuery.extend({}, jsonRetorno.arrayArquivo[0]);
        $(classComp + '.upload_banner img').attr('src', objetoImagemBanner.strDiretorio + '/' + objetoImagemBanner.strThumbnail + objetoImagemBanner.strExtensao);
        $(classComp + '.upload_banner span:not(' + classComp + '.upload_banner .remover_multimidia_banner span)').hide();
        $(classComp + '.upload_banner .remover_multimidia_banner').show();
        $(classComp + '.upload_banner img').show();

        var linkBanner = $.trim($(classComp + ".url_banner input").val());

        if (linkBanner != '') {
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
        } else {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        }
    }else if (idFerramentaTipo == idFerramentaTipoTimeLine) { //Album timeline
        var auxImagens = [];
        var bolArquivoExiste = false;

        //Remove os arquivos desselecionados no upload
        if (objetoImagens.imagens != null) {
            for (var j in objetoImagens.imagens) {
                bolArquivoExiste = false;
                for (var i in jsonRetorno.arrayArquivo) {
                    if (jsonRetorno.arrayArquivo[i].id == objetoImagens.imagens[j].idArquivo) {
                        bolArquivoExiste = true;
                        auxImagens.push(objetoImagens.imagens[j]);
                    }
                }
                if (!bolArquivoExiste) {
                    $('.dialogo_box .preview_post.imagens .prev_imagem').each(function () {
                        if ($(this).data("idarquivo") == objetoImagens.imagens[j].idArquivo) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
            }
            $(".dialogo_box .preview_post.imagens .engloba_classe").mCustomScrollbar("update");
        }

        objetoImagens.imagens = auxImagens;
        auxImagens = [];

        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
            bolArquivoExiste = false;

            /*Só adiciona no array os arquivos recem selecionados, assim não faz uma nova ordem toda vez*/
            for (var j in objetoImagens.imagens) {
                if (objetoImagens.imagens[j].idArquivo == jsonRetorno.arrayArquivo[i].id) {
                    bolArquivoExiste = true;
                    break;
                }
            }

            if (!bolArquivoExiste) {
                var objImagem = {
                    bolPaisagem: jsonRetorno.arrayArquivo[i].bolPaisagem,
                    bolRetrato: jsonRetorno.arrayArquivo[i].bolRetrato,
                    idArquivo: jsonRetorno.arrayArquivo[i].id,
                    thumbnail: jsonRetorno.arrayArquivo[i].strThumbnail,
                    arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                    nome: jsonRetorno.arrayArquivo[i].strNome,
                    descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                    diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                    extensao: jsonRetorno.arrayArquivo[i].strExtensao,
                    altura: jsonRetorno.arrayArquivo[i].intAlturaImg,
                    largura: jsonRetorno.arrayArquivo[i].intLarguraImg

                };

                objetoImagens.imagens.push(objImagem);
                auxImagens.push(objImagem);
            }
        }

        objetoImagens.imagens.sort(function (a, b) {
            if (b.largura > a.largura)
                return 1;
            return 0;
        });
        objetoImagens.imagens.sort(function (a, b) {
            if (a.largura == b.largura) {
                if (b.altura < a.altura) {
                    return 1;
                }
                return -1;
            }
            return 0;
        });

        if (objetoImagens !== undefined && objetoImagens != null && objetoImagens.imagens.length > 0) {
            $(classComp + '.seletor_pagina').slideDown(200);
            $(classComp + '.sep_digala').slideDown(200);
            $('#ckBolComentar' + idComp).closest('.hab_comentario_post').show();
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
            $("#btnCancelarFerramentaMural" + idComp).removeAttr("disabled").removeClass("disable");
        } else {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        }

        if (auxImagens !== undefined && auxImagens != null && auxImagens.length > 0) {
            if (!$(classComp + ".dialogo_box .preview_post.imagens").is(":visible")) {
                $(classComp + ".dialogo_box .preview_post.imagens").show();
            }
            montaPreviewImagemMensagemRapida(auxImagens);
            if ($(classComp + ".mensagem_multimidia ul.right").is(":visible")) {
                $(classComp + ".mensagem_multimidia ul.right").hide();
            }
        }
        auxImagens.splice(0, auxImagens.length);
        auxImagens = null;
    } else if (idFerramentaTipo == idFerramentaTipoTimeLineFile) { // Arquivos timeline
        var auxFiles = [];

        //Remove os arquivos desselecionados no upload
        var bolArquivoExiste = false;
        if (objetoArquivos.arquivos != null) {
            for (var j in objetoArquivos.arquivos) {
                bolArquivoExiste = false;
                for (var i in jsonRetorno.arrayArquivo) {
                    if (jsonRetorno.arrayArquivo[i].id == objetoArquivos.arquivos[j].idArquivo) {
                        bolArquivoExiste = true;
                        auxFiles.push(objetoArquivos.arquivos[j]);
                    }
                }
                if (!bolArquivoExiste) {
                    $('.dialogo_box .preview_post.arquivos .prev_documento').each(function () {
                        if ($(this).parent().data("idarquivo") == objetoArquivos.arquivos[j].idArquivo) {
                            $(this).parent().remove();
                            return false;
                        }
                    });
                }
            }
            $(".dialogo_box .preview_post.arquivos ").mCustomScrollbar("update");
        }

        objetoArquivos.arquivos = auxFiles;
        auxFiles = [];
        //Fim removendo 

        for (var i = 0; i < jsonRetorno.arrayArquivo.length; i++) {
            //Evitando que arquivo seja adicionado com duplicidade
            bolArquivoExiste = false;
            if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                for (var j in objetoArquivos.arquivos) {
                    if (objetoArquivos.arquivos[j].idArquivo == jsonRetorno.arrayArquivo[i].id) {
                        bolArquivoExiste = true;
                        break;
                    }
                }
            }

            if (!bolArquivoExiste) {
                var objFile = {
                    idArquivo: jsonRetorno.arrayArquivo[i].id,
                    arquivo: jsonRetorno.arrayArquivo[i].strArquivo,
                    nome: jsonRetorno.arrayArquivo[i].strNome,
                    descricao: jsonRetorno.arrayArquivo[i].strDescricao,
                    diretorio: jsonRetorno.arrayArquivo[i].strDiretorio,
                    extensao: jsonRetorno.arrayArquivo[i].strExtensao
                };

                if (objetoArquivos.arquivos != null && objetoArquivos.arquivos.length > 0) {
                    var t = objetoArquivos.arquivos.length;
                    var bolAdicionar = true;
                    for (var o = 0; o < t; o++) {
                        if (objetoArquivos.arquivos[o].idArquivo == objFile.idArquivo) {
                            bolAdicionar = false;
                            break;
                        }
                    }
                    if (bolAdicionar) {
                        objetoArquivos.arquivos.push(objFile);
                        auxFiles.push(objFile);
                    }
                } else {
                    objetoArquivos.arquivos.push(objFile);
                    auxFiles.push(objFile);
                }
            }
        }

        if (objetoArquivos !== undefined && objetoArquivos != null && objetoArquivos.arquivos.length > 0) {
            $(classComp + '.seletor_pagina').slideDown(200);
            $(classComp + '.sep_digala').slideDown(200);
            $('#ckBolComentar' + idComp).closest('.hab_comentario_post').show();
            $("#visualizarPost" + idComp).removeClass("disable").removeAttr("disabled");
            $("#btnCancelarFerramentaMural" + idComp).removeAttr("disabled").removeClass("disable");
        } else {
            $("#visualizarPost" + idComp).addClass("disable").attr("disabled", "disabled");
        }

        if (auxFiles !== undefined && auxFiles != null && auxFiles.length > 0) {
            $(classComp + ".preview_post.arquivos").show();
            montaPreviewFilesMensagemRapida(auxFiles);
            $(classComp + ".mensagem_multimidia ul.right").hide();
        }
        auxFiles.splice(0, auxFiles.length);
        auxFiles = null;
    }
}

function validarDataPreview(dataPreview, horaPreview) {
    var dataStr = "";
    var dataStrAtual = "";
    var dataP = dataPreview.split('/');
    var horaP = horaPreview.split(':');

    dataStr = dataP[2] + dataP[1] + dataP[0] + horaP[0] + horaP[1];
    var intData = parseInt(dataStr);

    var dataAtual = new Date();
    dataStrAtual = (dataAtual.getFullYear()).toString() + (((dataAtual.getMonth() + 1) < 10) ? ("0" + (dataAtual.getMonth() + 1)) : (dataAtual.getMonth() + 1)).toString();
    dataStrAtual += ((dataAtual.getDate() < 10) ? ("0" + dataAtual.getDate()) : dataAtual.getDate()).toString();
    dataStrAtual += ((dataAtual.getHours() < 10) ? ("0" + dataAtual.getHours()) : dataAtual.getHours()).toString();
    dataStrAtual += ((dataAtual.getMinutes() < 10) ? ("0" + dataAtual.getMinutes()) : dataAtual.getMinutes()).toString();

    var intDataAtual = parseInt(dataStrAtual);

    return (intData >= intDataAtual);
}

function retornaJsonPagina(caminho, scrollMode) {
    $.getJSON(caminho, null, function (data) {

        var xml = null;
        xml = data.Result;
        xmlGlobal = xml;
        GlobalPaginacaoContador = Object.keys(xml).length;

        $("#myContentTemplate").tmpl(data).appendTo("#ava_contentlista");
        $("#ava_contentlista #ava_loader").css("display", "none");

        $.fancybox.hideLoading();

        /** Usado para ativar o scroll de carteirinhas novamente **/
        if (scrollMode !== undefined && scrollMode == "scrollMode") {
            idLoadedGlobal = false;
        }
        /** Usado para ativar o scroll de carteirinhas novamente **/


        $("#txtFiltroAva").live('keyup', function (e) {

            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                e.preventDefault();
                return false;
            }


            if ($(this).attr('idusuario')) {
                _id = $(this).attr('idusuario')
            } else {
                _id = 0
            }
            FiltrarUsuarioPagina('#ava_contentlista', xml, $(this).val(), _id);
        });

        $("#txtFiltroAva").live('focus', function () {
            if ($(this).val() == "Filtrar por nome") {
                $(this).val("");
            }
        })

        $("#txtFiltroAva").live('blur', function () {
            if ($(this).val() == "") {
                $(this).val("Filtrar por nome");
            }
        })

    }); //getJson
}

//parametros: container, xml, pesquisa, idUsuario
function FiltrarUsuarioPagina(e, j, s, u) {
    $(e).html("");

    if ($.trim(s) != '') {
        var bolTemUser = false;
        for (r = 0; r < j.length; r++) {

            if ((j[r].strNome.toLowerCase().indexOf(s.toLowerCase()) > -1) ||
                (j[r].strApelido.toLowerCase().indexOf(s.toLowerCase()) > -1) ||
                (retira_acentos(j[r].strNome).toLowerCase().indexOf(s.toLowerCase()) > -1) ||
                (retira_acentos(j[r].strApelido).toLowerCase().indexOf(s.toLowerCase()) > -1)) {

                if (j[r].id != u) {
                    bolTemUser = true;

                    var strHTML = "";
                    strHTML = populaFiltroPagina(j[r]);

                    $(e).append(strBuilder);
                }

            }
        }

        if (!bolTemUser) {
            var htmlTitulo = $("#titListaUsuariosAva").clone();
            htmlTitulo.find("span").remove();
            var strTitulo = htmlTitulo.text();

            var palavra = "'" + s + "'"
            $(e).html('<span class="letter-spacing">Nenhum resultado encontrado na pesquisa de ' + strTitulo + '. Que tal pesquisar <a class="link" href="javascript: procurarpessoas(' + palavra + ')"> outros tipos de usuários?</a></span>');
        }

    } else {

        for (r = 0; r < j.length; r++) {

            var strHTML = "";
            if (j[r].id != u) {
                strHTML = populaFiltro(j[r]);
                $(e).append(strBuilder);
            }
        }

    }

}

function populaFiltroPagina(vJson) {

    var strHTML = "";
    var strFoto = "";

    strBuilder = '<div class="carteirinha" id="cart_' + vJson.id + '"><div class="in_cT">';

    if (vJson.bolEducador) {
        strBuilder += '<div class="souProf"><span>Professor</span></div>';
    }

    if (vJson.strFoto.length <= 0) {
        strFoto = "/AVA/StaticContent/Common/img/perfil/avatar.jpg"
    } else {
        strFoto = vJson.strFoto;
    }

    if (vJson.strApelido.length > 0)
        strNome = vJson.strApelido
    else
        strNome = vJson.strNome;

    if (strNome.lenght > 10)
        strNome = strNome.substring(0, 9);

    strBuilder += '<a href="/AVA/Perfil/Home/Index/' + vJson.strLogin + '"><img src="' + strFoto + '" width="55" height="55" alt="avatar"><span>' + strNome + '</span></a>';

    if (vJson.bolSigoAuto && vJson.idSeguidor != vJson.id) {
        strBuilder += '<a class=" bt_seguir s_IdoForever txtSeguindoBloqueadoModal" href="#">Seguindo<span class="fontello icoSeguindo"></span></a>'
    } else if (vJson.bolPossoSeguir && !vJson.bolEstouSeguindo && vJson.idSeguidor != vJson.id) {
        strBuilder += '<a id="btseg_' + vJson.id + '" class="bt_seguir s_Indo" href="javascript: seguir(' + vJson.idSeguidor + ',' + vJson.id + ')">seguir<span class="fontello icoSeguir"></span></a>';
    } else if (vJson.bolPossoSeguir && vJson.bolEstouSeguindo && vJson.idSeguidor != vJson.id) {
        strBuilder += '<a id="btseg_' + vJson.id + '" href="javascript: parardeseguir(' + vJson.idSeguidor + ',' + vJson.id + ')" class="bt_seguir"><span class="ava_seguindo"></span><span class="ava_parardeseguir">parar de seguir</span><span class="fontello icoPararSeguir"></span></a>';
    }

    strBuilder += '</div></div>';

    return strBuilder;

}

/////// Assuntos

function cancelarRemoverAssunto() {
    $('#cbAssuntoEditar li').show();
    $('#idAssuntoRemover').val("");
    $('.feed_confirma').hide();
    $('._feed_lista_assunto').slideDown();
    $('#hAssuntoEditar').val($('#hAssuntoEditar').attr('initvalue'));
    $('#cbAssuntoEditar input[type=checkbox]').removeAttr('checked');
    $('#ckAssuntoEditar' + $('#hAssuntoEditar').val()).attr('checked', 'checked');
    var textoComboResetEditar = $("#cbAssuntoEditar li[assu=" + $('#hAssuntoEditar').attr('initvalue') + "] label").text() + '<span class=\"caret\"></span>';
    $('#txtAssuntoEditar').html(textoComboResetEditar);
    $('#cbAssuntoEditar').parent().removeClass('open');

    $('#feed_confirma_RadioRemoverLabel, #feed_confirma_RadioMoverLabel').removeClass('inputRadioChecked');
    $('#feed_confirma_RadioMoverLabel').addClass('inputRadioChecked');
    $('.feed_confirma input:radio').removeAttr('checked');
    $('#feed_confirma_RadioMover').attr('checked', 'checked');
    $('strong, label, div.bootstrap', '.feed_confirma').show();
}

function resetarFiltroMural() {
    $('#hAssuntoTimeLine').val($('#hAssuntoTimeLine').attr('initvalue'));
    $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
    $('#ckAssuntoTimeLine' + $('#hAssuntoTimeLine').val()).attr('checked', 'checked');
    var textoComboReset = $("#cbAssuntoTimeLine li[assu=" + $('#hAssuntoTimeLine').attr('initvalue') + "] label").text() + '<span class=\"caret\"></span>';
    $('#txtAssuntoTimeLine').html(textoComboReset);
    $('#cbAssuntoTimeLine').parent().removeClass('open');
}

function GravarAssuntosCadastrados(idEditado) {
    if (!($('._feed_lista_assunto .acoes .btn_cor').hasClass('salvando'))) {
        $('._feed_lista_assunto .acoes .btn_cor').addClass('salvando');

        $.ajax({
            url: '/AVA/Pagina/Home/SalvarAssuntos/',
            type: 'POST',
            data: { 'idPagina': $('#idPagina').val(), 'jsonAssuntos': JSON.stringify(auxAssuntos) },
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            success: function (data) {
                var ultimoAssuntoCadastrado = '';

                var assun = jQuery.parseJSON(JSON.stringify(data));
                if (typeof assun == 'string' || assun instanceof String)
                    assun = $.parseJSON(assun);

                if (idEditado > 0) {
                    for (var na in assun) {
                        if (assun[na].idAssunto == idEditado) {
                            objAssuntoCadastrado = assun[na];
                        }
                    }
                } else {
                    for (var a in auxAssuntos.Adicionar) {
                        var $liAux = $('.liassunto[assu=' + auxAssuntos.Adicionar[a].idAssunto + ']');
                        for (var na in assun) {
                            if (assun[na].strAssunto == $('.liassuntonome', $liAux).text()) {
                                $('.liassunto[assu=' + auxAssuntos.Adicionar[a].idAssunto + ']').attr('assu', assun[na].idAssunto);
                                objAssuntoCadastrado = assun[na];
                            }
                        }
                    }
                }

                $('.acoesResultado').fadeIn();
                clearTimeout(timeoutMensagemAssunto);
                timeoutMensagemAssunto = window.setTimeout(function () { $('.acoesResultado').fadeOut(); }, 5000);

                resetarFiltroMural();

                //Recriando assuntos digala
                var novoHtmlDigala = "";
                var novoHtmlDigalaEditar = "";
                var novoHtmlTimeline = "";
                var novoHtmlListaDeAssuntos = "";

                for (var na in assun) {
                    novoHtmlDigala += '\n<li assu="' + assun[na].idAssunto + '">' +
                                    '\n<input type="checkbox" id="ckAssuntoPost' + assun[na].idAssunto + '"';
                    if (assun[na].bolGeral)
                        novoHtmlDigala += ' checked="checked" />';
                    else
                        novoHtmlDigala += ' />';
                    novoHtmlDigala += '\n<label for="ckAssuntoPost' + assun[na].idAssunto + '">' + assun[na].strAssunto + '&nbsp;</label>' +
			                              '\n</li>';

                    /*-------------------------------------*/
                    if (editID > 0) {
                        novoHtmlDigalaEditar += '\n<li assu="' + assun[na].idAssunto + '">' +
                                            '\n<input type="checkbox" id="ckAssuntoPost' + idComp + assun[na].idAssunto + '"';
                        if (assun[na].bolGeral)
                            novoHtmlDigalaEditar += ' checked="checked" />';
                        else
                            novoHtmlDigalaEditar += ' />';
                        novoHtmlDigalaEditar += '\n<label for="ckAssuntoPost' + idComp + assun[na].idAssunto + '">' + assun[na].strAssunto + '&nbsp;</label>' +
			                                '\n</li>';
                    }

                    /*---------------------------------------*/

                    novoHtmlTimeline += '\n<li assu="' + assun[na].idAssunto + '">' +
                                            '\n<input type="checkbox" id="ckAssuntoTimeLine' + assun[na].idAssunto + '" />' +
                                            '\n<label for="ckAssuntoTimeLine' + assun[na].idAssunto + '">' + assun[na].strAssunto + '&nbsp;</label>' +
			                                '\n</li>';

                    novoHtmlListaDeAssuntos += '\n<li assu="' + assun[na].idAssunto + '">' +
                                                '\n<input type="checkbox" id="ckAssuntoEditar' + assun[na].idAssunto + '"';


                    if (assun[na].bolGeral)
                        novoHtmlListaDeAssuntos += ' checked="checked" />';
                    else
                        novoHtmlListaDeAssuntos += ' />';

                    novoHtmlListaDeAssuntos += '\n<label for="ckAssuntoEditar' + assun[na].idAssunto + '">' + assun[na].strAssunto + '&nbsp;</label>' +
			                                   '\n</li>';
                }

                $('#cbAssuntoPost li:not(.li_criar_editar_assunto)').remove();
                $('#cbAssuntoPost li.li_criar_editar_assunto').before(novoHtmlDigala);
                $('#cbAssuntoTimeLine li:not(li[assu=0])').remove();
                $('#cbAssuntoTimeLine li[assu=0]').after(novoHtmlTimeline);
                $('#cbAssuntoEditar li').remove();
                $('#cbAssuntoEditar').html(novoHtmlListaDeAssuntos);

                if (editID > 0) {
                    $('#cbAssuntoPost' + idComp + ' li:not(.li_criar_editar_assunto)').remove();
                    $('#cbAssuntoPost' + idComp + ' li.li_criar_editar_assunto').before(novoHtmlDigalaEditar);
                }

                history.pushState({
                    comboDigaLa: $('#cbAssuntoPost').html(),
                    comboTimeLine: $('#cbAssuntoTimeLine').html(),
                    comboEditar: $('#cbAssuntoEditar').html()
                }, location.pathname, location.pathname);

                //Recriando assuntos timeline

                auxAssuntos.Adicionar = new Array();
                auxAssuntos.Editar = new Array();
                auxAssuntos.Remover = new Array();
                auxAssuntos.Mover = new Array();

                if (mobile) {
                    $('#criareditar.fancyAssuntos ._feed_lista_assunto ul').mCustomScrollbar('update');
                }
            }, error: function (data) {
                console.log('Ocorreu um salvar os assuntos');
                $('.acoesResultado').text('Erro ao salvar assunto.').fadeIn();
                clearTimeout(timeoutMensagemAssunto);
                timeoutMensagemAssunto = window.setTimeout(function () { $('.acoesResultado').fadeOut(); }, 5000);

                auxAssuntos.Adicionar = new Array();
                auxAssuntos.Editar = new Array();
                auxAssuntos.Remover = new Array();
                auxAssuntos.Mover = new Array();
            }
        });
    }
}

function BolAbaAgendados() {
    var retval = false;
    if ($('.timeline.paginas header .sessao_agendados').length) {
        retval = $('.timeline.paginas header .sessao_agendados').hasClass('ativo');
    }
    return retval;
}

function MostrarAbaDestaques(bolValidarNoServidor) {
    var idpagina = $('#idPagina').val();
    idpagina = parseInt(idpagina);

    if (idpagina > 2) {        
        if (bolValidarNoServidor) {
            //Não tem como saber se possui destaques ou não, então verifica no servidor 
            var bolExisteAbaDestacados = false;
            var bolEstaNaAbaDestacador = false;

            if ($('.timeline.paginas header .komika.sessao_destacados').length) {
                bolExisteAbaDestacados = true;
                bolEstaNaAbaDestacador = $('.timeline.paginas header .komika.sessao_destacados').hasClass('ativo');
            }

            $.ajax({
                type: 'POST',
                url: "/AVA/Pagina/Home/VerificaSePossuiAbaDestacados",
                data: {
                    idPagina: idpagina
                },
                async: true,
                success: function (data) {
                    if (parseInt(data) == 1) {
                        //Possui destaques ainda
                        if (!$('.timeline.paginas header .komika.sessao_destacados').length) {
                            $('<h1 class="komika sessao_destacados" style="display:none;"><a href="javascript:void(0);"><span class="seta_baixo"></span>DESTACADOS</a></h1>').insertAfter('.timeline.paginas header .komika.sessao_agendados');
                            $('.timeline.paginas header .komika.sessao_destacados').fadeIn();
                        }
                    } else {
                        //Não possui mais destaques
                        $('.timeline.paginas header .komika.sessao_destacados').fadeOut(function () {
                            $(this).remove();
                            if (bolEstaNaAbaDestacador) {
                                //se o usuario estava na aba de destacados, carrega a aba do mural do zero.
                                $('.timeline.paginas header .komika').removeClass('ativo');
                                $('.timeline.paginas header .komika.sessao_mural').addClass('ativo');
                                resetarFiltroMural();
                                paginaEducacional_CarregarMural(false, 1);
                            }
                        });
                    }
                }, error: function (data) {
                    console.log('Erro ao validar destaques');
                }
            });

        } else {
            //Significa que adicionou um post com destaque ou marcou um post como destaque. não precisa verificar no servidor
            if (!$('.timeline.paginas header .komika.sessao_destacados').length) {
                $('<h1 class="komika sessao_destacados" style="display:none;"><a href="javascript:void(0);"><span class="seta_baixo"></span>DESTACADOS</a></h1>').insertAfter('.timeline.paginas header .komika.sessao_agendados');
                $('.timeline.paginas header .komika.sessao_destacados').fadeIn();
            }
        }
    }   
}

function CustomConfirmConfiguracoes(destino, objetoIdMensagemRapida, idMensagemTarget) {
    $.fancybox({
        type: "ajax",
        href: "/AVA/Pagina/Home/AbandonarConfiguracoes/",
        afterShow: function () {
            $('body').on('click', '#btnSairPaginaConfiguracoes', function () {
                bolFezAlteracaoConfiguracoes = false;
                switch (destinoConfiguracoes) {
                    case 'timeline':
                        LimparCampoComentario(objetoIdMensagemRapida);
                        $.fancybox.close();
                        PrepararTimeLineFocus(idMensagemTarget);
                        break;
                    case 'abaMuralMural':
                        LimparCampoComentario(objetoIdMensagemRapida);
                        $.fancybox.close();
                        PrepararAbaMuralMural();
                        break;
                    case 'abaMuralAgendados':
                        LimparCampoComentario(objetoIdMensagemRapida);
                        $.fancybox.close();
                        PrepararAbaMuralAgendados();
                        break;
                    case 'abaMuralDestacados':
                        LimparCampoComentario(objetoIdMensagemRapida);
                        $.fancybox.close();
                        PrepararAbaMuralDestacados();
                        break;
                    case 'comboFiltroAssuntoTimeline':
                        LimparCampoComentario(objetoIdMensagemRapida);
                        $.fancybox.close();
                        PrepararFiltroAssuntoTimeline(destinoIdAssunto);
                        break;
                    default: break;
                }
                destinoConfiguracoes = null;
                destinoIdAssunto = null;
                //$.fancybox.close();
            });
            $('body').on('click', '#btnPermanecerPaginaConfiguracoes', function () {
                $.fancybox.close();
            });
        },
        closeBtn: false,
        modal: true,
        helpers: {
            overlay: {
                closeClick: false,
                locked: false
            }
        },
        padding: 0
    });
}

function LimparCampoComentario(objetoIdMensagemRapida) {
    var tam = objetoIdMensagemRapida.idMsgRapida.length;
    for (var i = tam - 1; i >= 0; i--) {
        $('article[ide=' + objetoIdMensagemRapida.idMsgRapida[i] + '] input').prev().children().hide();
        $('article[ide=' + objetoIdMensagemRapida.idMsgRapida[i] + '] input').animate({ width: '507px' }, 200).val("");
        $('article[ide=' + objetoIdMensagemRapida.idMsgRapida[i] + '] input').removeClass('foco');
        objetoIdMensagemRapida.idMsgRapida.splice(i, 1);
    }
}

function PrepararTimeLineFocus(idMensagemRapida) {
    $('html, body').animate({ scrollTop: $("#campoComentar_" + idMensagemRapida).offset().top - 400 }, 1000);
    var larguraComentario = $("#campoComentar_" + idMensagemRapida).closest('article').hasClass('pgedu') ? "507px" : "441px";
    $("#campoComentar_" + idMensagemRapida + " input").animate({ width: larguraComentario }, 200);
    $("#campoComentar_" + idMensagemRapida).addClass('foco');
}

function PrepararFiltroAssuntoTimeline(idAssuntoTimeline) {
    $('#hAssuntoTimeLine').val(idAssuntoTimeline);
    $('#cbAssuntoTimeLine input[type=checkbox]').removeAttr('checked');
    $('#ckAssuntoTimeLine' + idAssuntoTimeline).attr('checked', 'checked');
    var textoCombo = $('#ckAssuntoTimeLine' + idAssuntoTimeline).parent().text() + '<span class=\"caret\"></span>';
    $('#txtAssuntoTimeLine').html(textoCombo);
    $('#cbAssuntoTimeLine').parent().removeClass('open');
    paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
}

function PrepararAbaMuralMural() {
    $('.timeline.paginas header .sessao_agendados').removeClass('ativo');
    $('.timeline.paginas header .sessao_destacados').removeClass('ativo');
    $('.timeline.paginas header .sessao_mural').addClass('ativo');
    paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
}

function PrepararAbaMuralAgendados() {
    $('.timeline.paginas header .sessao_mural').removeClass('ativo');
    $('.timeline.paginas header .sessao_destacados').removeClass('ativo');
    $('.timeline.paginas header .sessao_agendados').addClass('ativo');
    paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
}

function PrepararAbaMuralDestacados() {
    $('.timeline.paginas header .sessao_mural').removeClass('ativo');
    $('.timeline.paginas header .sessao_agendados').removeClass('ativo');
    $('.timeline.paginas header .sessao_destacados').addClass('ativo');
    paginaEducacional_CarregarMural(BolAbaAgendados(), 1);
}

function LimparCampoComentarioLostFocus(posicao) {
    $('article[ide=' + objetoIdMensagemRapida.idMsgRapida[posicao] + '] input').prev().children().hide();
    $('article[ide=' + objetoIdMensagemRapida.idMsgRapida[posicao] + '] input').animate({ width: '507px' }, 200).val("");
    $('article[ide=' + objetoIdMensagemRapida.idMsgRapida[posicao] + '] input').removeClass('foco');
}
