(function ($) {

    var AVclassBuscaAssunto, AVclassBuscaNivel;

    function initBuscaQuestaoAvaliacaoRapida() {
        AVclassBuscaNivel = new NovaClassificacao("NivelEnsino").montarSelectFiltro("#selectNivelEnsino");
        AVclassBuscaAssunto = new NovaClassificacao("AreaAssunto").montarSelectFiltro("#selectAreaAssunto");
    }

    var tblLista;

    ___navegacaoBotoesAvRapida = function (botao, Texto, Func, Mostrar) {
        botao.text(Texto).unbind("click").bind("click", function () {
            if (Func)
                Func();
        });
        if (Mostrar) {
            botao.show();
        } else {
            botao.hide();
        }
    }
    __navegacaoBotaoAvRapidaCancelar = function (contexto, Texto, Func, Mostrar) {
        ___navegacaoBotoesAvRapida(contexto.find("#btnCancelar"), Texto, Func, Mostrar);
    }
    __navegacaoBotaoAvRapidaVoltar = function (contexto, Texto, Func, Mostrar) {
        ___navegacaoBotoesAvRapida(contexto.find("#btnVoltar"), Texto, Func, Mostrar);
    }
    __navegacaoBotaoAvRapidaAvancar = function (contexto, Texto, Func, Mostrar) {
        ___navegacaoBotoesAvRapida(contexto.find("#btnAvancar"), Texto, Func, Mostrar);
    }

    var methods = {

        init: function (options) {
            var settings = {
                'loader': undefined,
                'removerTitulo': false,
                'caminhoBase': "",
                'caminhoGerenciadorGrupos': "",
                'CodigoOrigem': "",
                'fClose': undefined,
                '_questoes': undefined,
                '_mensagem': undefined,
                '_dataMode': undefined,
                '_ajuda': undefined,
                '_defaultLoader': undefined,
                '_tratarErroGerenciador': undefined,
                '__avRapidaListaQuestoes': false,
                '__tituloMensagens': "Avaliações",
                '__recursos': {
                    'msg001': "Dê um título para a avaliação e digite o texto que será exibido para os respondentes no início da prova.",
                    'msg002': "Selecione as questões que vão compor a avaliação. Você pode usar questões prontas ou criá-las agora usando dois tipos comuns: simples e múltipla escolha.",
                    'msg003': "Pesquise questões de qualquer tipo já cadastradas no banco.",
                    'msg004': "Crie uma questão tipo simples escolha. Você pode repetir essa operação várias vezes.",
                    'msg005': "Crie uma questão tipo múltipla escolha. Você pode repetir essa operação várias vezes.",
                    'msg006': "Acumule as questões da avaliação aqui. Você pode combinar questões do banco com as que forem criadas agora. No final da seleção, dê um valor para cada questão e defina a ordem de exibição.",
                    'msg007': "Agendar a avaliação é definir para quem e quando a avaliação estará disponível para ser respondida on-line.",
                    'msg008': "Selecione as pessoas que vão responder a prova. É possível escolher pessoas uma a uma ou turmas e grupos vinculados a você.",
                    'msg009': "Escolha o modelo de agendamento que melhor atende a sua necessidade."
                }
            };
            return this.each(function () {
                var $this = $(this);
                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }

                $this.avaliacaorapida("iniciar");
            });
        },
        __carregador: function (mostrar) {
            var $this = $(this);

            if ($this.data('settings').loader) {
                externo(mostrar);
                return;
            }
            if (mostrar) {
                $this.data('settings')._defaultLoader.mostrar();
            } else {
                $this.data('settings')._defaultLoader.esconder();
            }
        },
        __criarRequisicaoAvRapida: function (pURL) {
            var $this = $(this);
            var resposta = $.ajax({
                url: $this.data('settings').caminhoBase + pURL,
                type: 'POST',
                success: function (data) {
                    $this.avaliacaorapida("__carregador", false);
                },
                beforeSend: function () {
                    $this.avaliacaorapida("__carregador", true);
                }
            });
            return resposta;
        },
        __criarRequisicaoAvRapidaJson: function (pURL, objetoJS) {
            var $this = $(this);
            var resposta = $.ajax({
                url: $this.data('settings').caminhoBase + pURL,
                data: JSON.stringify(objetoJS),
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $this.avaliacaorapida("__carregador", false);
                },
                beforeSend: function () {
                    $this.avaliacaorapida("__carregador", true);
                }
            });
            return resposta;
        },
        finalizar: function () {
            var $this = $(this);
            if ($this.data('settings').fClose) {
                $this.data('settings').fClose();
            }
        },
        iniciar: function () {
            var $this = $(this);
            $this.data('settings')._ajuda = new Ajuda();
            $this.data('settings')._ajuda.tela = $this;


            $this.data('settings')._mensagem = new Mensagem('SEC025-11-avRapidaMensagem');
            $this.data('settings')._dataMode = new DataMode($this.data('settings')._mensagem);
            $this.data('settings')._defaultLoader = new Carregando("SEC025-11-avRapidaLoader");
            $this.data('settings')._tratarErroGerenciador = function (a, b, c) {
                $this.avaliacaorapida("_retornoGerenciador", a, b, c);
            }

            var rInicio = $this.avaliacaorapida("__criarRequisicaoAvRapida", '/AvaliacaoRapida/AvaliacaoRapida/Inicio');

            rInicio.always(function (data) {

                if (!$this.avaliacaorapida("_retornos", data, true)) {
                    return;
                }


                if ($this.data('settings').removerTitulo) {
                    $this.find("h3.tituloStatus").remove();
                }


                $this.find("#menuPasso0").click(function () {
                    $this.avaliacaorapida("_aplicarEtapa0");
                });
                $this.find("#menuPasso1").click(function () {
                    $this.avaliacaorapida("_aplicarEtapa1");
                });
                $this.find("#menuPasso2").click(function () {
                    $this.avaliacaorapida("_aplicarEtapa2");
                });

                $this.find("#menuPasso0").click();

                //Criar helpers
                $this.data('settings')._ajuda.criar("helpTop1", "helpTop1Caixa", $this.data('settings').__recursos.msg001);
                $this.data('settings')._ajuda.criar("helpTop2", "helpTop2Caixa", $this.data('settings').__recursos.msg002);
                $this.data('settings')._ajuda.criar("helpTop3", "helpTop3Caixa", $this.data('settings').__recursos.msg007);

            });
        },

        _encerrar: function () {
            var $this = $(this);

            var objetoFinal = {
                Agendamento: $this.avaliacaorapida("__montarJsonAgendamento").Agendamento,
                Avaliacao: $this.avaliacaorapida("__montarJsonAvaliacao").Avaliacao
            };
            var finalizar = $this.avaliacaorapida("__criarRequisicaoAvRapidaJson", '/AvaliacaoRapida/AvaliacaoRapida/Finalizar', objetoFinal);

            finalizar.always(function (data) {
                if (!$this.avaliacaorapida("_retornoDadosNovo", data))
                    return;

                $this.avaliacaorapida("__criarMensagem", $this.data('settings').__tituloMensagens, false, "Avaliação agendada com sucesso!", 'alerta');
                $this.avaliacaorapida("finalizar");
            });
        },
        __montarJsonAvaliacao: function (arryNovasQuestoes) {
            var $this = $(this);
            var objeto = $this.find("#avRapidaNovaAvaliacao").serializeObject();
            objeto.CodigoOrigem = $this.data("settings").CodigoOrigem;
            objeto.Introducao = { 'Conteudo': $this.find("textarea[name=IntroducaoConteudo]").val(), 'EhHtml': $this.find("input[name=EhHtmlIntroducao]").val() == "true" };
            objeto.ListaQuestao = $this.avaliacaorapida("___objetoListaQuestao");
            objeto.Embaralhar = objeto.Embaralhar == "true";
            return { 'Avaliacao': objeto };
        },
        ___objetoListaQuestao: function () {
            var $this = $(this);

            var objeto = [];
            var ultimaposicao = 0;

            $("#frmTabelaQuestoes tbody tr").each(function (i, v) {

                if ($(this).hasClass("vazio"))
                    return;

                var linha = {};
                linha.Id = Number($(this).find("input[name=Id]").val());
                linha.Posicao = (i + 1); //$(this).find("input[name=Posicao]").val();
                linha.Valor = parseFloat($(this).find("input[name=Valor]").val().replace(',', '.'), 10);

                objeto.push(linha);
                ultimaposicao = (i + 1);
            });
            if ($this.data("settings")._questoes) {
                $.each($this.data("settings")._questoes, function (i, v) {
                    var linha = {};
                    linha.Id = Number(v);
                    linha.Posicao = (ultimaposicao + (i + 1)); //$(this).find("input[name=Posicao]").val();
                    linha.Valor = parseFloat(0);

                    objeto.push(linha);
                });
                $this.data("settings")._questoes = undefined;
            }
            return objeto;
        },
        ___arrayListaQuestoes: function () {
            var obj = [];

            $("#frmTabelaQuestoes tbody tr").each(function (i, v) {
                var value = $(this).find("input[name=Id]").val();
                if (value)
                    obj.push(value);
            });

            return obj;
        },

        _atualizarListaQuestaoProva: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa1");

            $this.avaliacaorapida("__atualizarPosicao");

            var quantidade = $this.avaliacaorapida("__atualizarContador");

            $content.find("#listaQuestoesAddProva").removeClass("hide").addClass("hide");

            if (quantidade == 0) {
                $content.find("#questoesDaProva").addClass("hide");
            } else {
                $content.find("#questoesDaProva").removeClass("hide");
                $content.find("#questoesDaProva a.btnVerQuestoes").removeClass("hideI");
            }

            if ($this.data('settings').__avRapidaListaQuestoes && quantidade > 0) {
                $content.find("#listaQuestoesAddProva").removeClass("hide");
                $content.find("#questoesDaProva a.btnVerQuestoes").addClass("hideI");
            }
        },
        __atualizarContador: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa1");

            var arrayq = $this.avaliacaorapida("___arrayListaQuestoes");

            $("<input[type='hidden'][name='listagemId']").val(arrayq.join());

            $content.find("#questoesDaProva .count").text(arrayq.length);

            return arrayq.length;
        },
        __atualizarPosicao: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa1");

            $content.find("#tblQuestoes tbody tr").each(function (i) {
                $(this).find("input[name=Posicao]").val((i + 1));
            });
        },


        _tabelaProvaQuestoes: function (selecionadas) {
            var $this = $(this);

            $this.data("settings")._questoes = selecionadas;


            var $content = $this.find("#listaQuestoesAddProva");

            if ($content.html().length != 0) {
                tblLista.recarregarTabela();
                return;
            }
            var rPrvQuestoes = $this.avaliacaorapida("__criarRequisicaoAvRapida", '/AvaliacaoRapida/AvaliacaoRapida/AvaliacaoProvaQuestao');

            function retornoTabelaQuestoes(acao, dados) {
                tblLista.recarregarTabela();
            }

            rPrvQuestoes.always(function (data) {
                $content.html(data);
                tblLista = new Tabela('frmTabelaQuestoes', 'tblQuestoes', false, new Ordenacao("nome", true), retornoTabelaQuestoes);

                $content.find("#avRapidaApagarQuestoes").click(function () {
                    $content.find("#frmTabelaQuestoes input[type=checkbox][name=chkQuestao.Checked]:checked").closest("tbody tr").remove();
                    $this.data('settings').__avRapidaListaQuestoes = true;
                    tblLista.recarregarTabela();
                });

                $content.find("#tblQuestoes tbody").sortable({
                    handle: 'a.reordenar',
                    axis: 'y',
                    opacity: 0.9,
                    update: function (event, ui) {
                        $this.avaliacaorapida("__atualizarPosicao");
                    }
                });

                tblLista.ModeOrdenacao(false);
                tblLista.requisicao = function (caminho, dados, retorno) {
                    $this.avaliacaorapida("__carregador", true);
                    $.ajax({
                        url: caminho,
                        data: JSON.stringify($this.avaliacaorapida("__montarJsonAvaliacao")),
                        type: "POST",
                        contentType: 'application/json; charset=utf-8',
                        success: function (dados, status, xhttp) {
                            $this.avaliacaorapida("__carregador", false);
                            retorno(dados, status, xhttp);
                        }
                    });
                }
                tblLista.recarregarTabela();
                tblLista.retornoCarregarTabela = function (dados) {
                    if (!$this.avaliacaorapida('_retornos', dados))
                        return;

                    $this.avaliacaorapida("_atualizarListaQuestaoProva");
                    $this.data('settings').__avRapidaListaQuestoes = false;

                    $("#frmTabelaQuestoes .btnExcluirQuestao").click(function () {
                        $(this).parents("tr").remove();
                        $this.data('settings').__avRapidaListaQuestoes = true;
                        tblLista.recarregarTabela();
                    });

                    new QuestaoResumo("#tblQuestoes", "a.tooltip", function (retorno) {
                        $this.avaliacaorapida("_retornos", retorno, false);
                    }).aplicarBotaoExtra("a.tooltipextra");

                    //seta a mascara para os valores
                    $this.data('settings')._dataMode.decimal("#frmTabelaQuestoes input[name='Valor']", 2, "oldValue", "focusvalue");
                    $("#frmTabelaQuestoes input[name='Valor']").keydown(function (event) {
                        if (event.which == 13) {
                            $(this).blur();
                        }
                    }).keyup(function () {
                        if (parseFloat(this.value.replace(",", ".")).toFixed(2) > 100.0) {
                            this.value = 100;
                            $(this).attr("oldvalue", 0);
                            $(this).blur();
                        }
                    }).blur(function () {
                        if (parseFloat(this.value.replace(",", ".")).toFixed(2) < 0.1) {
                            this.value = "0,10";
                            $(this).attr("oldvalue", 0);
                        }
                        //salva apenas se mudou de valor

                        if (this.value != $(this).attr("focusvalue")) {
                            $this.avaliacaorapida("__atualizarValorMaximo");
                        }
                    });

                    //seta para o valor total
                    $this.data('settings')._dataMode.decimal("#frmTabelaQuestoes input[name='txtValorTotal']", 2, "oldValue", "focusvalue");
                    $("#frmTabelaQuestoes input[name='txtValorTotal']").keydown(function (event) {
                        if (event.which == 13) {
                            $(this).blur();
                        }
                    }).keyup(function () {
                        if (parseFloat(this.value.replace(",", ".")).toFixed(2) > 1000.0) {
                            this.value = 1000;
                            $(this).attr("oldvalue", 0);
                            $(this).blur();
                        }
                    }).blur(function () {
                        if (parseFloat(this.value.replace(",", ".")).toFixed(2) < 0.02) {
                            this.value = "0,02";
                            $(this).attr("oldvalue", 0);
                        }
                        //salva apenas se mudou de valor
                        if (this.value != $(this).attr("focusvalue")) {
                            $this.avaliacaorapida("__atualizarValorQuestoes");
                        }
                    });
                }
            });

        },
        __atualizarValorMaximo: function () {
            var $this = $(this);
            var total = 0;
            $("#frmTabelaQuestoes tbody tr input[name=Valor]").each(function (i, v) {
                total = total + parseFloat($(this).val().replace(',', '.'), 10);
            });

            $this.find("input[name=txtValorTotal]").val(total.toFixed(2).replace(".", ","));
        },
        __atualizarValorQuestoes: function () {
            var $this = $(this);
            var valorMinimoNota = 0.01;
            var quantidadeQuestoes = $("#frmTabelaQuestoes tbody tr input[name=Valor]").length;

            var valorTotal = parseFloat($this.find("input[name=txtValorTotal]").val().replace(",", "."));

            var valorPorQuestao = parseFloat((valorTotal / quantidadeQuestoes).toFixed(2));
            var valorReal = valorPorQuestao * quantidadeQuestoes;
            var diferenca = valorTotal - valorReal;


            if (valorPorQuestao < valorMinimoNota) {
                valorPorQuestao = valorMinimoNota;
                valorTotal = valorMinimoNota * quantidadeQuestoes;

                var mensagem = "o valor minimo por questão deve ser de " + valorMinimoNota.toFixed(2).replace(".", ",") + "";
                $this.avaliacaorapida("__criarMensagem", "Erro", true, mensagem, 'alerta');
            }

            $("#frmTabelaQuestoes tbody tr input[name=Valor]").val(valorPorQuestao.toFixed(2).replace(".", ","));
            $("#frmTabelaQuestoes tfoot tr input[name=txtValorTotal]").val(valorTotal.toFixed(2).replace(".", ","));

            if (Math.abs(diferenca) > 0) {
                valorPorQuestao += diferenca;
                $("#frmTabelaQuestoes tbody tr input[name=Valor]:last").val(valorPorQuestao.toFixed(2).replace(".", ","));
            }
        },
        _tabelaAdicionarQuestoes: function () {
            var $this = $(this);

            var tabelaAdicionar;
            var rAddQuestoes = $this.avaliacaorapida("__criarRequisicaoAvRapida", '/AvaliacaoRapida/AvaliacaoRapida/AvaliacaoBuscarQuestao');

            function retornoTabelaBusca(acao, dados) {
                tblAdicionar.limpar();
            }

            rAddQuestoes.always(function (data) {
                $this.find("#listaQuestoesProcurarProva").html(data);

                tblAdicionar = new Tabela('frmTabelaBusca', 'tblBusca', false, new Ordenacao("nome", true), retornoTabelaBusca, '#avRapidaNovaAvaliacao');
                tblAdicionar.atualizarSelecionados = true;
                tblAdicionar.checkBoxName = "chkQuestaoBusca";
                tblAdicionar.retornoCarregarTabela = function (dados) {
                    if (!$this.avaliacaorapida('_retornos', dados))
                        return;

                    new QuestaoResumo("#tblBusca", "a.tooltip", function (retorno) {
                        $this.avaliacaorapida("_retornos", retorno, false);
                    }).aplicarBotaoExtra("a.tooltipextra");
                    //ajusteFiltroBuscaQuestao();
                }

                //setTimeout(tblAdicionar.executarNovoFiltro, 100);

                initBuscaQuestaoAvaliacaoRapida();
            });

            function addQuestoes() {
                var resp = tblAdicionar.getSelecionados();
                if (resp.length > 0) {
                    $this.avaliacaorapida("_tabelaProvaQuestoes", resp);
                    $this.avaliacaorapida("_etapa1Ocultar");
                } else {
                    $this.avaliacaorapida("__criarMensagem", $this.data('settings').__tituloMensagens, false, "Selecione questões", 'alerta');
                }
            }

            __navegacaoBotaoAvRapidaAvancar($this, "Inserir na avaliação »", addQuestoes, true);
        },








        _navegar: function (numeroEtapa) {
            var $this = $(this);

            $this.find(".menuAvRapida li.passo a").removeClass("ativo");
            $this.find(".menuAvRapida li.passo:eq(" + numeroEtapa + ") a").addClass("ativo");

            $this.find(".sec_menuNavegacao").addClass("hideI");
            $this.find(".sec_menuNavegacao:eq(" + numeroEtapa + ")").removeClass("hideI");

            $this.find(".cxEtapa").addClass("hide");
            $this.find(".cxEtapa:eq(" + numeroEtapa + ")").removeClass("hide");
        },
        _aplicarEtapa0: function () {
            var $this = $(this);
            $this.avaliacaorapida("_navegar", 0);

            var $content = $this.find(".cxaEtapa0");

            var proximaEtapa = function () {
                $this.avaliacaorapida("_aplicarEtapa1");
            }
            var cancelar = function () {
                $this.avaliacaorapida("finalizar");
            }

            __navegacaoBotaoAvRapidaCancelar($this, "Cancelar", cancelar, true);
            __navegacaoBotaoAvRapidaVoltar($this, "« Voltar", undefined, false);
            __navegacaoBotaoAvRapidaAvancar($this, "Avançar »", proximaEtapa, true);

            if ($content.html().length != 0)
                return;

            var rEtapa0 = $this.avaliacaorapida("__criarRequisicaoAvRapida", '/AvaliacaoRapida/AvaliacaoRapida/Nova');
            rEtapa0.always(function (data) {
                if (!$this.avaliacaorapida("_retornos", data, false)) {
                    return;
                }
                $content.html(data);

                var campo = $content.find("#txtIntroducao");
                campo.tinymce($.extend({}, formatIntroducaoProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));
            });
        },



        __etapa1Defaults: function () {
            var $this = $(this);
            var proximaEtapa = function () {
                $this.avaliacaorapida("_aplicarEtapa2");
            }
            var voltarEtapa = function () {
                $this.avaliacaorapida("_aplicarEtapa0");
            }

            var cancelar = function () {
                $this.avaliacaorapida("finalizar");
            }

            __navegacaoBotaoAvRapidaCancelar($this, "Cancelar", cancelar, true);
            __navegacaoBotaoAvRapidaVoltar($this, "« Voltar", voltarEtapa, true);
            __navegacaoBotaoAvRapidaAvancar($this, "Avançar »", proximaEtapa, true);
        },
        _etapa1Ocultar: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa1");

            $content.find(".menuTemplate li input[name='rdoTemplate']").prop("checked", false);
            $content.find(".templateDivQ").removeClass("hide").addClass("hide");
            $content.find(".menuTemplate li div.ativo").removeClass("ativo");

            $this.data('settings').__avRapidaListaQuestoes = false;
            $this.avaliacaorapida("_atualizarListaQuestaoProva");

            $this.avaliacaorapida("__etapa1Defaults");
        },

        _templateEtapa1: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa1");

            $content.find(".menuTemplate li input[name='rdoTemplate']").click(function () {
                var carregar = $(this).is(":checked");

                $content.find(".menuTemplate li div.ativo").removeClass("ativo");

                $this.data('settings').__avRapidaListaQuestoes = false;
                $this.avaliacaorapida("_atualizarListaQuestaoProva");

                if (carregar) {
                    $content.find(".menuTemplate li input[name='rdoTemplate']").prop("checked", false);

                    $content.find(".templateDivQ").removeClass("hide").addClass("hide");
                    $content.find(".templateDivQ:eq(" + $(this).data("pos") + ")").removeClass("hide");

                    $(this).closest("div").addClass("ativo");
                } else {
                    $content.find(".templateDivQ").removeClass("hide").addClass("hide");

                    //$this.avaliacaorapida("__etapa1Defaults");
                }

                $(this).prop("checked", carregar);
            });
        },
        _aplicarEtapa1: function () {
            var $this = $(this);
            $this.avaliacaorapida("_navegar", 1);
            $this.avaliacaorapida("_etapa1Ocultar");

            var $content = $this.find(".cxaEtapa1");
            if ($content.html().length != 0)
                return;

            var rEtapa1 = $this.avaliacaorapida("__criarRequisicaoAvRapida", '/AvaliacaoRapida/AvaliacaoRapida/Questoes');
            rEtapa1.always(function (data) {
                if (!$this.avaliacaorapida("_retornos", data, false)) {
                    return;
                }

                $content.html(data);
                $this.avaliacaorapida("_templateEtapa1");

                $this.data('settings')._ajuda.criar("helpQstProva", "helpQstProvaCaixa", $this.data('settings').__recursos.msg006);



                $content.find("#questoesDaProva a.btnVerQuestoes").click(function () {
                    $this.avaliacaorapida("_etapa1Ocultar");

                    $this.data('settings').__avRapidaListaQuestoes = true;
                    $this.avaliacaorapida("_atualizarListaQuestaoProva");
                });
                $content.find("#rdoTemplateQuestao1").click(function () {
                    $this.avaliacaorapida("_tabelaAdicionarQuestoes");

                    var carregar = $(this).is(":checked");
                    if (!carregar)
                        $this.avaliacaorapida("__etapa1Defaults");
                });

                $content.find("#rdoTemplateQuestao2").click(function () {
                    $this.avaliacaorapida("_criarQuestaoSimples");

                    var carregar = $(this).is(":checked");
                    if (!carregar)
                        $this.avaliacaorapida("__etapa1Defaults");
                });
                $content.find("#rdoTemplateQuestao3").click(function () {
                    $this.avaliacaorapida("_criarQuestaoMultipla");

                    var carregar = $(this).is(":checked");
                    if (!carregar)
                        $this.avaliacaorapida("__etapa1Defaults");
                });
            });
        },


        /******************** Criar uma nova questão
        *****************************************/
        __montarJsonQuestao: function () {
            var $this = $(this);
            var $content = $this.find("#areaCriarQuestao");

            var objeto = $content.find("form").serializeObject();
            objeto.CodigoOrigem = $this.data("settings").CodigoOrigem;

            objeto.Enunciado = { 'Conteudo': $content.find("form textarea[name=Enunciado]").val(), 'EhHtml': $this.find("input[name=EhHtmlEnunciado]").val() == "true" };
            objeto.Respostas = [];

            $content.find("ul.itensResposta li.Alternativa").each(function () {
                var $resposta = $(this);

                objeto.Respostas.push({
                    'Letra': $resposta.find(".opcaoLetra span").text(),
                    'Texto': { 'EhHtml': false, 'Conteudo': $resposta.find("textarea[name=Alternativa]").val() }
                });
            });

            if (objeto.Tipo == 1)
                objeto.Corretas = $content.find("input[name=Correta]:checked").val();

            if (objeto.Tipo == 2) {
                objeto.Corretas = [];
                $content.find("input[name=Correta]:checked").each(function () {
                    objeto.Corretas.push($(this).val());
                });
            }

            return { 'Questao': objeto };
        },
        __reordenarAlternativas: function () {
            var $this = $(this);
            var $content = $this.find("#areaCriarQuestao");

            $content.find("ul.itensResposta li.Alternativa").each(function (i, v) {
                var letra = String.fromCharCode(i + 65);

                $(this).find("div.opcaoLetra span").text(letra);
                $(this).find("input[name=Correta]").val(letra);
            });
        },
        _publicarQuestao: function () {
            var $this = $(this);

            var salvarQuestao = $this.avaliacaorapida("__criarRequisicaoAvRapidaJson", '/Servico/Questao/Salvar', $this.avaliacaorapida("__montarJsonQuestao"));
            salvarQuestao.always(function (data) {
                if (!$this.avaliacaorapida("_retornoDadosNovo", data))
                    return;

                var ary = [];
                ary.push(data.Id);
                //ary.push(13291);
                $this.avaliacaorapida("_tabelaProvaQuestoes", ary);
                $this.avaliacaorapida("_etapa1Ocultar");
            });
        },

        _criarQuestaoSimples: function () {
            $(this).avaliacaorapida("__criarQuestaoInicializar", '/AvaliacaoRapida/AvaliacaoRapida/QuestoaSimples');
        },
        _criarQuestaoMultipla: function () {
            $(this).avaliacaorapida("__criarQuestaoInicializar", '/AvaliacaoRapida/AvaliacaoRapida/QuestaoMultipla');
        },
        __formatAlternativa: function (textarea) {
            var optionsT = {
                'maxCharacterSize': parseInt(textarea.attr('maxchar')),
                'originalStyle': 'originalTextareaInfo',
                'warningStyle': 'warningTextareaInfo',
                'warningNumber': 40,
                'displayFormat': '#left caracteres restantes'
            };

            textarea.textareaCount(optionsT);
        },
        __criarQuestaoInicializar: function (url) {
            var $this = $(this);
            var $content = $this.find("#areaCriarQuestao");

            var rEtapa1 = $this.avaliacaorapida("__criarRequisicaoAvRapida", url);
            rEtapa1.always(function (data) {
                $content.html(data);

                var campo = $content.find("#txtEnunciado");
                campo.tinymce($.extend({}, formatIntroducaoProva, { htmlcharcount_maxchars: (parseInt(campo.attr('maxchar'), 10) > 0 ? campo.attr('maxchar') : undefined) }));


                $this.avaliacaorapida("__formatAlternativa", $content.find("ul.itensResposta > li.Alternativa textarea[name=Alternativa]"));

                $content.find(".btnRemover").on("click", function () {
                    $(this).closest("li.Alternativa").remove();
                    $this.avaliacaorapida("__reordenarAlternativas");

                    $content.find("#cxaAdicionarAlternativa .btnAdicione").show();
                });
                $content.find(".btnAdicione").on("click", function () {

                    if ($content.find("li.Alternativa").length == 26) {
                        $this.avaliacaorapida("__criarMensagem", "Erro", true, "Limite máximo de 26 alternativas!!", 'alerta');
                        return;
                    }

                    var $clone = $content.find("li.Modelo.hide").clone(true);


                    $this.avaliacaorapida("__formatAlternativa", $clone.find("textarea[name=Alternativa]"));

                    $content.find("ul.itensResposta").append($clone);

                    $clone.removeClass("hide").removeClass("Modelo").addClass("Alternativa");

                    $this.avaliacaorapida("__reordenarAlternativas");

                    if ($content.find("li.Alternativa").length == 26)
                        $(this).hide();
                });
                $content.find("input[name=Correta], label input[name=Correta]").on("click", function () {
                    $content.find("li.Alternativa").removeClass("Correta");

                    $content.find("input[name=Correta]:checked").each(function () {
                        $(this).closest("li.Alternativa").addClass("Correta");
                    });
                });
            });


            var proximaEtapa = function () {
                $this.avaliacaorapida("_publicarQuestao");
            }
            __navegacaoBotaoAvRapidaAvancar($this, "Inserir na avaliação »", proximaEtapa, true);
        },
        /******************** Agendamento
        *****************************************/
        __montarJsonAgendamento: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa2");

            var lista = $.parseJSON($content.find("input[name=rdoTemplateAgendamento]:checked").data("vform"));

            var objeto = {};

            for (var name in lista) {
                objeto[name] = lista[name];
            }

            var form = $this.find("#avRapidaNovoAgendamento");
            objeto.Id = Number(form.find("input[name=IdAgendamento]").val());
            objeto.Tipo = Number(form.find("input[name=TipoAgendamento]").val());

            objeto.IdBanco = Number(form.find("input[name=IdBanco]").val());

            objeto.CodigoOrigem = $this.data("settings").CodigoOrigem;
            objeto.Estado = Number(form.find("input[name=Estado]").val());



            var avaliacao = $this.avaliacaorapida("__montarJsonAvaliacao");
            objeto.Instrucoes = avaliacao.Avaliacao.Introducao;
            objeto.Titulo = avaliacao.Avaliacao.Titulo;
            objeto.IdAvaliacao = avaliacao.Avaliacao.Id;

            objeto.EmbaralharQuestoes = $content.find("input[name=rdoEmbaralharQuestoes]:checked").val() == "true";

            var periodo = {};
            periodo.Tipo = Number($content.find("input[name=rdoAgendamento]:checked").val());

            if ($content.find("input[name=txtDataRealizacaoInicio]").attr("disabled") != "disabled")
                periodo.Inicio = $content.find("input[name=txtDataRealizacaoInicio]").val() + " " + $content.find("input[name=txtHoraRealizacaoInicio]").val();

            periodo.Fim = $content.find("input[name=txtDataRealizacaoFinal]").val() + " " + $content.find("input[name=txtHoraRealizacaoFinal]").val();

            objeto.Periodo = periodo;

            objeto.Realizadores = [];

            $content.find("tr.Realizador").each(function () {
                var rl = {};
                rl.Id = Number($(this).find("input[name=Id]").val());
                rl.Tipo = Number($(this).find("input[name=Tipo]").val());
                objeto.Realizadores.push(rl);
            });

            return { 'Agendamento': objeto };
        },





        _templateEtapa2: function () {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa2");

            $content.find(".menuTemplate li input[name='rdoTemplateAgendamento']").click(function () {
                $content.find(".menuTemplate li div.ativo").removeClass("ativo");
                $(this).closest("div").addClass("ativo");
            });
        },
        _aplicarEtapa2: function () {
            var $this = $(this);
            $this.avaliacaorapida("_navegar", 2);
            var $content = $this.find(".cxaEtapa2");



            var proximaEtapa = function () {
                $this.avaliacaorapida("_encerrar");
            }
            var voltarEtapa = function () {
                $this.avaliacaorapida("_aplicarEtapa1");
            }
            var cancelar = function () {
                $this.avaliacaorapida("finalizar");
            }
            __navegacaoBotaoAvRapidaCancelar($this, "Cancelar", cancelar, true);
            __navegacaoBotaoAvRapidaVoltar($this, "« Voltar", voltarEtapa, true);
            __navegacaoBotaoAvRapidaAvancar($this, "Agendar", proximaEtapa, true);

            if ($content.html().length != 0)
                return;

            var rEtapa2 = $this.avaliacaorapida("__criarRequisicaoAvRapida", '/AvaliacaoRapida/AvaliacaoRapida/Agendamento');
            rEtapa2.always(function (data) {
                if (!$this.avaliacaorapida("_retornos", data, false)) {
                    return;
                }
                $content.html(data);

                $this.avaliacaorapida("_templateEtapa2");

                var opcoesGerenciador = {
                    'retornoSelecionarObjeto': function (lista) {
                        if (lista != null) {
                            $.each(lista, function (i, item) {
                                $this.avaliacaorapida('__listaRealizadores', item.id, item.nome, 1);
                            });
                            $content.find("#avRapidaGerenciadorGrupos").empty();
                        }
                    },
                    //                    'idsSelecionados': lstIds,
                    //                    'retornoAbriu': retornoGerenciadorAbriu,
                    //                    'retornoAbriuEdicao': retornoAbriuEdicao,
                    //                    'retornoAbriuCriar': retornoGerenciadorAbriuCriar,
                    //                    'retornoAbriuEditar': retornoAbriuEditar,
                    'showBtnCriar': false,
                    'showBtnCancelar': false,
                    'showBtnSelecionar': true,
                    'showBtnConcluir': false,
                    'showBtnModeEdicao': false,
                    'showNavegacao': false,
                    'mensagemInicial': "Selecione um ou mais grupos que participarão desta atividade",
                    'showMensagemInicial': true,
                    'caminhoBase': $this.data('settings').caminhoGerenciadorGrupos,
                    'showRedeGrupos': true,
                    'fLoaderExterno': function (load) { $this.avaliacaorapida("__carregador", load); },
                    'retornoRedirectLogin': $this.data('settings')._tratarErroGerenciador
                };

                $content.find("#avRapidaBtnGerenciadorGrupos").unbind("click").bind("click", function () {
                    var lstIds = [];

                    $content.find("tr.Realizador input[name=Tipo][value=1]").each(function () {
                        lstIds.push($(this).closest("tr").find("input[name=Id]").val());
                    });

                    opcoesGerenciador.idsSelecionados = lstIds;

                    $content.find("#avRapidaGerenciadorGrupos").gerenciadorgrupos(opcoesGerenciador);
                });

                var listaSuspensaUsuarios;
                listaSuspensaUsuarios = new ListaGerenciadorUsuarios("strBuscaUsuario", "gg_listaUsuarioAluno", retornoSelecionadoAluno)
                listaSuspensaUsuarios.userRede = true;
                listaSuspensaUsuarios.papel = "0";
                listaSuspensaUsuarios.caminhoBase = $this.data('settings').caminhoGerenciadorGrupos;
                listaSuspensaUsuarios.erroCallBack = $this.data('settings')._tratarErroGerenciador;

                $content.find("#avRapidaAgendamentoRealizadores").find("a.btnExcluir").on("click", function () {
                    $(this).closest("tr").remove();
                    if ($content.find("#avRapidaAgendamentoRealizadores > tbody > tr.Realizador").length == 0) {
                        $content.find("#avRapidaAgendamentoRealizadores").find("td.vazio").closest("tr").removeClass("hide");
                    }
                });

                function retornoSelecionadoAluno(id, nome) {
                    $this.avaliacaorapida('__listaRealizadores', id, nome, 3);
                }

                function genericTestCheckBox(checkBox, boxDisable, checado) {
                    var check = $(checkBox).is(":checked")

                    var box = $(boxDisable);

                    if (check == checado) {
                        box.addClass('desabilitado');
                        $(boxDisable).find("input").attr('disabled', 'disabled');
                    } else {
                        box.removeClass('desabilitado');
                        $(boxDisable).find("input").removeAttr('disabled');
                    }
                }
                $content.find("input[name='rdoAgendamento']").change(function () {
                    genericTestCheckBox("#rdoAgendamentoNao", '#boxAgendamento', true);
                });

                $content.find("input#txtDataRealizacaoInicio, input#txtDataRealizacaoFinal").datepicker({
                    showOn: "button",
                    buttonImage: $this.data('settings').caminhoBase + "/" + "Content/images/calendar.gif",
                    buttonImageOnly: true
                });
                $this.data('settings')._dataMode.data("input#txtDataRealizacaoInicio, input#txtDataRealizacaoFinal");

                $content.find("input#txtHoraRealizacaoInicio, input#txtHoraRealizacaoFinal").timePicker();
                $this.data('settings')._dataMode.hora("input#txtHoraRealizacaoInicio, input#txtHoraRealizacaoFinal");
            });
        },
        __listaRealizadores: function (id, nome, tipo, imagem) {
            var $this = $(this);
            var $content = $this.find(".cxaEtapa2");
            var tabela = $content.find("#avRapidaAgendamentoRealizadores");
            var temIgual = false;

            tabela.find("input[name=Id][value=" + id + "]").each(function () {
                if (Number($(this).closest("tr").find("input[name=Tipo]").val()) == Number(tipo))
                    temIgual = true;
            });

            if (temIgual)
                return;

            var linha = tabela.find("tr.Modelo").clone(true).addClass("Realizador").removeClass("hide").removeClass("Modelo").find("span").text(nome).end();
            linha.append($("<input>").attr({ "type": "hidden", "name": "Id" }).val(id));
            linha.append($("<input>").attr({ "type": "hidden", "name": "Tipo" }).val(tipo));
            tabela.append(linha);
            tabela.find("td.vazio").closest("tr").addClass("hide");
        },

        /****************** Tratamento retorno
        * True  = Continuar
        * False = Não Continuar
        *************************************************/

        //            if (!$this.avaliacaorapida("_retornoDadosNovo", data))
        //                return;

        //            if (!data.Sucesso) {
        //                alert("tratar erros da prova sem sucesso...");
        //                return;
        //            }



        __criarMensagem: function (titulo, bolErro, mensagem, classes) {
            var $this = $(this);

            var dados = $this.data('settings')._mensagem.htmlTemplate(titulo, bolErro, mensagem, classes);
            $this.data('settings')._mensagem.exibir(dados);
        },

        _retornoGerenciador: function (codMsg, strMensagem, tipo) {
            var $this = $(this);

            if (!tipo || Number(tipo) == 3) {
                $this.avaliacaorapida("__criarMensagem", "Erro", true, "Usuário deslogado", 'sessao alerta');
            }
        },

        _retornoDadosNovo: function (json) { //Do serviço, sempre virá um json
            //$.each(json.Mensagens, function (i, v) { console.log(v); });
            var $this = $(this);

            if (json.Sucesso)
                return true;

            $this.avaliacaorapida("__criarMensagem", "Erro", true, json.Mensagens[0].Mensagem, 'alerta');

            return false;
        },
        _retornos: function (dados, showDados) {
            var $this = $(this);

            //Tratamento erro

            var mRetorno = $(dados); //<div class="erro alerta sessao"><p id="mensagem" title="Erro">Usuário deslogado</p></div>
            if (mRetorno.hasClass("erro")) {
                $this.data('settings')._mensagem.exibir(mRetorno);
                return false;
            }
            if (mRetorno.hasClass("SEC025-11_erro")) {
                var classes = "alerta erro";

                if (mRetorno.data("acao") == "Redirect")
                    classes += " sessao";

                $this.avaliacaorapida("__criarMensagem", "Erro", true, mRetorno.find("p").text(), classes);
                return false;
            }
            //            if ($(dados).hasClass("confirm")) {
            //                confirm.exibir($(dados), confirmSim, confirmNao);
            //                carregando.esconder();
            //                return false;
            //            }

            //            if (showDados) {
            //                $this.html($(dados).html());
            //            }

            //            return true;
            if (showDados) {
                $this.html(dados);
            }

            return true;
        }

    };


    $.fn.avaliacaorapida = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.avaliacaorapida');
        }

    };


    $.fn.serializeObject = function () {
        var o = {};
        //    var a = this.serializeArray();
        $(this).find('input[type="hidden"], input[type="text"], input[type="password"], input[type="checkbox"]:checked, input[type="radio"]:checked, select').each(function () {
            if ($(this).attr('type') == 'hidden') { //if checkbox is checked do not take the hidden field
                var $parent = $(this).parent();
                var $chb = $parent.find('input[type="checkbox"][name="' + this.name.replace(/\[/g, '\[').replace(/\]/g, '\]') + '"]');
                if ($chb != null) {
                    if ($chb.prop('checked')) return;
                }
            }

            if (this.name === null || this.name === undefined || this.name === '')
                return;

            var elemValue = null;

            if ($(this).is('select'))
                elemValue = $(this).find('option:selected').val();
            else
                elemValue = this.value;

            if ($.trim(elemValue).length > 0 && $.isNumeric(Number(elemValue))) {
                elemValue = Number(elemValue);
            }


            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                //o[this.name].push(elemValue || '');
                o[this.name].push(elemValue);
            } else {
                //o[this.name] = elemValue || '';
                o[this.name] = elemValue;
            }
        });
        return o;
    }

})(jQuery);