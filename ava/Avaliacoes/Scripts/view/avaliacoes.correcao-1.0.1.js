(function ($) {
    var FUNCAO_VAZIA = 'javascript:;';
    var CORRIGIR = 0;
    var CORRIGIDA = 2;
    var TODAS = -1;

    var methods = {
        init: function (options) {
            var settings = {
                //Inicializacao
                'inicializacao': undefined,
                'varAluno': undefined,
                'varAplicacao': undefined,
                'varAplicacaoParalela': 0,
                'caminhoBase': $('base#baseCorrecao').attr('href') == undefined ? "./" : $('base#baseCorrecao').attr('href'),
                //StatusRealizacao
                'retornoStatus': undefined,
                //Correcao
                'varQtdPorPagina': 1,
                'funcaoErro': undefined,
                'funcaoSucesso': undefined,
                'funcaoCarregando': undefined,
                'abriuBoxCorrecao': undefined,
                'abriuBoxQuestao': undefined,
                'abriuListaCorrigir': undefined,
                'abriuListaTodas': undefined,
                'abriuListaCorrigidas': undefined
            };

            return this.each(function () {
                var $this = $(this);
                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }

                if ($this.data('settings').inicializacao) {
                    $this.avaliacoescorrecao($this.data('settings').inicializacao);
                } else {
                    $this.avaliacoescorrecao("iniciar");
                }
            });
        },
        statusRealizacao: function () {
            var $this = $(this);
            var idAluno = $this.data('settings').varAluno;
            var idAplicacao = $this.data('settings').varAplicacao;
            var idAplicacaoParalela = $this.data('settings').varAplicacaoParalela;

            $.ajax({
                url: $this.data('settings').caminhoBase + "/Realizacao/StatusRealizacaoUsuarioJson/" + idAplicacao + "/" + idAplicacaoParalela + "/" + idAluno,
                type: "GET",
                datatype: 'json',
                success: function (dados, status, xhttp) {
                    if ($this.data('settings').retornoStatus)
                        $this.data('settings').retornoStatus(dados);
                }
            });
        },
        iniciar: function () {
            var $this = $(this);
            var idAluno = $this.data('settings').varAluno;
            var idAplicacao = $this.data('settings').varAplicacao;

            iniciar = function () {
                $.ajax({
                    url: $this.data('settings').caminhoBase + "/Correcao/CarregarQuestoesAluno/" + idAluno + "/" + idAplicacao,
                    type: "POST",
                    success: function (dados, status, xhttp) {
                        retornoQuestaoAluno(dados);
                    }, beforeSend: function () {
                        carregando();
                    }
                });
            }

            retornoQuestaoAluno = function (dados) {
                var proximo = $this.avaliacoescorrecao('_retornos', dados, true);
                if (!proximo)
                    return false; //Para o carregamento.

                if ($this.data('settings').abriuBoxCorrecao) {
                    $this.data('settings').abriuBoxCorrecao();
                }

                $("#intQtdPorPagina").val($this.data('settings').varQtdPorPagina);

                $(".abaSubConteudo li").click(function () {
                    if (!$(this).hasClass("selecionado")) {
                        $(".abaSubConteudo li").removeClass("selecionado");
                        $(this).addClass("selecionado");
                    }
                });
                $("#listaQuestaoCorrigir").click(function () {
                    $this.find("#intAcao").val(CORRIGIR);
                    $this.find("#intPagina").val(1);
                    submit();
                    if ($this.data('settings').abriuListaCorrigir) {
                        $this.data('settings').abriuListaCorrigir();
                    }
                });
                $("#listaQuestaoCorrigida").click(function () {
                    $this.find("#intAcao").val(CORRIGIDA);
                    $this.find("#intPagina").val(1);
                    submit();
                    if ($this.data('settings').abriuListaCorrigidas) {
                        $this.data('settings').abriuListaCorrigidas();
                    }
                });
                $("#listaQuestaoTodas").click(function () {
                    $this.find("#intAcao").val(TODAS);
                    $this.find("#intPagina").val(1);
                    submit();
                    if ($this.data('settings').abriuListaTodas) {
                        $this.data('settings').abriuListaTodas();
                    }
                });
                submit();
            }

            retornoRespostaAluno = function (dados) {
                var proximo = $this.avaliacoescorrecao('_retornos', dados, false);
                if (!proximo)
                    return false; //Para o carregamento.

                if ($this.data('settings').abriuBoxQuestao) {
                    $this.data('settings').abriuBoxQuestao();
                }

                $("#lstRespostas").html(dados);
                atualizarValores(dados);
                paginacao(dados);
                carregarFuncoes();
                $("#lstRespostas").find("#infoDados").remove();
            }

            carregarFuncoes = function () {

                $this.find(".boxRespostaAluno").each(function (a, e) {
                    var $content = $("#" + $(this).attr("id"));

                    criarBotaoExpandirArea("#btnOcultarEnunciado" + (a + 1), "#boxEnunciado" + (a + 1), "#boxEnunciadoReduzido" + (a + 1));

                    try {
                        var textarea = $content.find("textarea[name=txtCorrecao]");
                        var optionsT = {
                            'maxCharacterSize': parseInt(textarea.attr('maxchar')),
                            'originalStyle': 'originalTextareaInfo',
                            'warningStyle': 'warningTextareaInfo',
                            'warningNumber': 40,
                            'displayFormat': '#left caracteres restantes'
                        };
                        textarea.textareaCount(optionsT);
                    } catch (e) {
                    }

                    DecimalFunction( $content.find('input[name=txtPercentualNota]') , 2, "oldValue", "iniValue");
                    $content.find('input[name=txtPercentualNota]').blur(function () {
                        var tmValor = parseFloat(this.value.replace(",", "."));

                        tmValor = tmValor.toFixed(2);
                        this.value = new String(tmValor).replace(".", ",");

                        if (tmValor < 0) {
                            this.value = 0;
                        } else if (tmValor > 100) {
                            this.value = 100;
                        }

                        //ajusta o valor do outro campo
                        var tmpValorPontos = parseFloat($content.find('input[name=valorResposta]').val().replace(",", "."));
                        tmpValorPontos = tmpValorPontos.toFixed(2);

                        var valor = this.value.replace(",", ".")
                        var tmpValorFinal = tmpValorPontos * (valor / 100);

                        tmpValorFinal = tmpValorFinal.toFixed(2);
                        $content.find('input[name=pontosResposta]').val(new String(tmpValorFinal).replace(".", ","));
                        //ajusta o slide
                        $content.find(".sliderResposta").slider("value", this.value.replace(",", "."));
                    }).keydown(function (event) {
                        if (event.which == 13) {
                            $(this).blur();
                        }
                    });

                    DecimalFunction($content.find('input[name=pontosResposta]'), 2, "oldValue", "iniValue");
                    $content.find('input[name=pontosResposta]').blur(function () {
                        //verifica se a primeira posição é 0 para dai implementar a virgula
                        if (this.value.indexOf("0") == 0 && this.value.indexOf(",") == -1) {
                            this.value = this.value.substring(0, 1) + "," + this.value.substring(1);
                        }

                        var tmValor = parseFloat(this.value.replace(",", "."));
                        var tmMax = parseFloat($(this).attr('maxvalue').replace(",", "."));

                        this.value = tmValor.toFixed(2).replace(".", ",");

                        if (tmValor < 0) {
                            this.value = 0;
                        } else if (tmValor > tmMax) {
                            this.value = $(this).attr('maxvalue');
                            tmValor = tmMax;
                        }

                        tmValor = tmValor.toFixed(2);
                        tmMax = tmMax.toFixed(2);

                        //ajusta o valor do outro campo
                        var tmpValorPontos = parseFloat($content.find('input[name=valorResposta]').val().replace(",", "."));

                        //var tmpValor = parseFloat(this.value.replace(",", "."));
                        var tmpValorFinal = (tmValor * 100) / tmMax;

                        if (isNaN(tmpValorFinal) || tmpValorFinal == Infinity || tmpValorFinal == -Infinity)
                            tmpValorFinal = 0;

                        tmpValorFinal = tmpValorFinal.toFixed(2);

                        $content.find('input[name=txtPercentualNota]').val(new String(tmpValorFinal).replace(".", ","));
                        //ajusta o valor do slide                       
                        $content.find(".sliderResposta").slider("value", tmpValorFinal);
                    }).keydown(function (event) {
                        if (event.which == 13) {
                            $(this).blur();
                        }
                    }).attr("maxvalue", $content.find('input[name=valorResposta]').val());


                    $content.find(".sliderResposta").slider({
                        value: $content.find('input[name=txtPercentualNota]').val(),
                        min: 0,
                        max: 100,
                        step: 1,
                        slide: function (event, ui) {
                            //$("#amount").val("$" + ui.value);
                            //ajusta os valores para os outros campos
                            var tmpValorPontos = parseFloat($content.find('input[name=valorResposta]').val().replace(",", "."));
                            var tmpValorFinal = tmpValorPontos * (ui.value / 100);

                            tmpValorFinal = tmpValorFinal.toFixed(2);

                            $content.find('input[name=pontosResposta]').val(new String(tmpValorFinal).replace(".", ","));

                            $content.find('input[name=txtPercentualNota]').val(ui.value);
                        }
                    });

                    $content.find(".btnCorrecao").click(function (ev) {
                        var resposta = submitForm($content.find('.frmCorrecaoExt'));
                        resposta.always(function (data) {
                            confirmarCorrecao(data)
                        });
                        ev.preventDefault();
                    });

                });
            }

            confirmarCorrecao = function (dados) {
                var proximo = $this.avaliacoescorrecao('_retornos', dados, false);
                if (!proximo)
                    return false; //Para o carregamento.

                submit();
            }

            paginacao = function (dados) {
                $dados = $(dados);
                $(dados).find("tfoot").each(function () {
                    $this.find(".paginacao").html($('tr > td#pagina', this).children());
                    $this.find(".resultados").html($('tr > td#resultado', this).html());
                });

                $this.find('.paginacao > a').each(function () {
                    var pagina = 0;
                    var caminho = $(this).attr('href');
                    var padrao = new RegExp("pagina\=(\\d+)");

                    if (padrao.test(caminho))
                        pagina = padrao.exec(caminho)[1];

                    $(this).attr('href', 'javascript:void(0)');

                    if ($(this).attr('class') != "selecionado" && pagina > 0) {
                        $(this).click(function () {
                            $this.find("#intPagina").val(pagina);
                            submit();
                        });
                    }
                });
            }
            carregando = function () {
                if ($this.data('settings').funcaoCarregando)
                    $this.data('settings').funcaoCarregando();
            }
            atualizarValores = function (dados) {
                $dados = $(dados);
                $("#qtdeNaoCorrigida").text(
                    $dados.find("table").attr("data-naocorrigidas")
                );
                $("#qtdeCorrigida").text(
                    $dados.find("table").attr("data-corrigidas")
                );
                $("#qtdeTotal").text(
                    $dados.find("table").attr("data-todas")
                );
            }
            submit = function () {
                var resposta = submitForm($("#frmRespostaExt"));
                resposta.always(function (data) {
                    retornoRespostaAluno(data);
                });
            }
            submitForm = function (form) {
                var retorno = $.ajax({
                    url: form.attr("action"),
                    data: form.serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) {
                    }, beforeSend: function () {
                        carregando();
                    }

                });
                return retorno;
            }
            criarBotaoExpandirArea = function (sBotao, sBox, sBox2) {
                if ($(sBotao).length <= 0) {
                    return;
                }
                var txtBotao = $(sBotao).html().split("|");
                $(sBotao).attr("txtHide", txtBotao[0]);
                $(sBotao).attr("txtShow", txtBotao[1]);
                $(sBotao).attr("areaBox", sBox);
                $(sBotao).attr("areaBox2", sBox2);
                if ($(sBox).is(":visible")) {
                    $(sBotao).html($(sBotao).attr("txtHide"));
                    $(sBox2).hide();
                } else {
                    $(sBotao).html($(sBotao).attr("txtShow"));
                    $(sBox2).show();
                }

                $(sBotao).click(function () {

                    if ($($(this).attr("areaBox")).is(":visible")) {
                        $($(this).attr("areaBox")).hide();
                        $($(this).attr("areaBox2")).show();
                        $(this).html($(this).attr("txtShow"));
                    } else {
                        $($(this).attr("areaBox")).show();
                        $($(this).attr("areaBox2")).hide();
                        $(this).html($(this).attr("txtHide"));
                    }
                });
            }

            iniciar();
        },
        _retornos: function (dados, showDados) {
            var $this = $(this);
            fErro = $this.data('settings').funcaoErro;
            fSucesso = $this.data('settings').funcaoSucesso;

            if (!fErro) {
                alert("A função para o retorno do erro não foi definida.");
                return false;
            }

            if ($(dados).attr('class') && $(dados).attr('class').indexOf('erro') > -1) {
                var mensagem = $(dados).find("#mensagem").text();
                fErro(mensagem);
                return false;
            }
            if ($(dados).attr('class') && $(dados).attr('class').indexOf('sucesso') > -1) {
                var mensagem = $(dados).find("#mensagem").text();
                fSucesso(mensagem);
            }

            if (showDados) {
                $this.html(dados);
            }
            return true;
        }
    };

    $.fn.avaliacoescorrecao = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.avaliacoescorrecao');
        }

    };
})(jQuery);



///****************Classe DataMode - Decimal*********************//
DecimalFunction = function (obj, qtdCasasDecimais, oldValue, iniValue) {
    var esplit, antigo;
    if (oldValue && $.trim(oldValue) != "") {
        oldValue = "oldValue";
    }
    if (iniValue && $.trim(iniValue) != "") {
        iniValue = "focusvalue";
    }
    $(obj).keyup(function () {
        esplit = this.value.split(",");
        if (esplit.length > 2) {
            antigo = $(this).attr(oldValue).split(',');
            this.value = $(this).attr(oldValue).split(',')[0] + "," + $(this).attr(oldValue).split(',')[1];
        } else if (esplit[1] && esplit[1].length > qtdCasasDecimais) {
            this.value = $(this).attr(oldValue).split(',')[0] + "," + $(this).attr(oldValue).split(',')[1].substring(0, qtdCasasDecimais);
        }
    }).keydown(function (e) {
        if (e.which == 9 && this.value == "") {
            this.value = $(this).attr(iniValue);
        }
        if (e.which != 110 && e.which != 188 && e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
            return false;
        }
        $(this).attr(oldValue, this.value);
    }).focusin(function () {
        $(this).attr(iniValue, this.value);
        $(this).attr(oldValue, $(this).attr(iniValue));
        this.value = "";
    }).blur(function () {
        esplit = this.value.split(",");
        if (esplit[1] && esplit[1].length == 0) {
            this.value = $(this).attr(oldValue).split(',')[0];
        }
        if (this.value == "") {
            this.value = $(this).attr(iniValue);
        }
    });
}

function writeSimulador(parms) {
    var simulador = $("<div>")
        .attr("id", "simulador" + parms.id)
        .html('<iframe src="' + parms.url + '" frameborder="no" height="' + parms.y + '" width="' + parms.x + '">');

    simulador.appendTo($("#tagSimulador" + parms.id));
}
