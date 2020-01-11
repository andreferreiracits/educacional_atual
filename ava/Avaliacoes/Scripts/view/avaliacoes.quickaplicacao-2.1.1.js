(function ($) {

    var FUNCAO_VAZIA = 'javascript:;';

    var methods = {

        init: function (options) {

            var settings = {
                'carregando': undefined, //new Carregando("carregandoGeral"),
                'mensagem': undefined, //new Mensagem('SEC025-11-alerta'),
                'confirm': undefined, //new Confirm('SEC025-11-alerta'),
                'caminhoBase': $('base#baseAvaliacao').attr('href') == undefined ? "./" : $('base#baseAvaliacao').attr('href'),
                'caminhoBaseGerenciador': '/Recursos/GerenciadorGrupos',
                'showMensagem': true,
                'idProva': 0,
                'idAplicacao': 0,
                'idConfig': 0,
                'idPagina': 0,
                'modo': undefined,
                'retornoRedirectLogin': undefined,
                'retornoCancelar': undefined,
                'retornoConcluir': undefined,
                'editarAplicacao': undefined,
                'editarAplicacaoParalela': undefined,
                'retornoMensagem': undefined,
                'abriuVisualizacao': undefined,
                'abriuAplicacao': undefined,
                'abriuLista': undefined,
                'retornoExcluir': undefined,
                'noJavascript': [],
                'loadScripts': false,
                'txtPadrao': 'Atividade Padrão',
                'bolGerenciador': true,
                'viewCorreta': true,
                'onCloseMensagem': undefined,
                'codigoOrigem': undefined
            };

            return this.each(function () {
                var $this = $(this);

                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }


                if ($this.data('settings').loadScripts) {
                    InsertJS($this);
                } else {
                    endInserJS();
                }

                $this.avaliacoesQuickAplicacao('atualizarSessao');

                function InsertJS() {
                    //, "jquery-ui", "timePicker", "datepicker", "Msg", "Confirmacao", "Carregando"
                    var lstJs = ["jquery-ui", "timepicker", "datepicker", "carregando", "msg", "confirm"];
                    var lstFilesJs = ["/Scripts/util/jquery-ui-1.8.5.custom.min.js",
                                      "/Scripts/util/jquery.timePicker.min.js",
                                      "/Scripts/util/jquery.ui.datepicker-pt-BR.js",
                                      "/Scripts/class/Carregando.js",
                                      "/Scripts/class/Msg.js",
                                      "/Scripts/class/Confirmacao.js"];

                    var total = lstJs.length;
                    for (var i = 0; i < lstJs.length; i++) {
                        var file = $this.data('settings').caminhoBase + lstFilesJs[i];
                        $.getScript(file, function (data, textStatus) {
                            retornoInsertJS();
                        });
                    }
                    function retornoInsertJS() {
                        total--
                        if (total <= 0) {
                            endInserJS();
                        }
                    }
                }
                function endInserJS() {
                    if (!$this.data('settings').carregando) {
                        $this.data('settings').carregando = new Carregando("carregandoGeral");
                    }
                    if (!$this.data('settings').mensagem) {
                        $this.data('settings').mensagem = new Mensagem('SEC025-11-alertaquick');
                    }
                    if (!$this.data('settings').confirm) {
                        $this.data('settings').confirm = new Confirm('SEC025-11-alertaquick');
                    }

                    if ($this.data('settings').modo) {
                        switch ($this.data('settings').modo) {
                            case 'view':
                                View($this);
                                break;
                            case 'criar':
                                Criar($this);
                                break;
                            case 'criarparalela':
                                CriarParalela($this);
                                break;
                            case 'editar':
                                Editar($this);
                                break;
                            case 'editarparalela':
                                EditarParalela($this);
                                break;
                            case 'listar':
                                Listar($this);
                                break;
                            default:
                                throw "modo de inicialização inválido";
                        }
                    } else {
                        throw ("defina um modo de inicialização");
                    }
                }

            });


            function View($this) {
                if ($this.data('settings').idProva <= 0) {
                    throw ("para visualizar defina um idProva");
                    return;
                }
                $this.avaliacoesQuickAplicacao('_viewprova')
            }
            function Criar($this) {
                if ($this.data('settings').idProva <= 0) {
                    throw ("para criar defina um idProva");
                    return;
                }
                $this.avaliacoesQuickAplicacao('_quicknova')
            }
            function CriarParalela($this) {
                if ($this.data('settings').idAplicacao <= 0) {
                    throw ("para criar defina um idAplicacao");
                    return;
                }

                $this.avaliacoesQuickAplicacao('_quicknova')
            }
            function Editar($this) {
                if ($this.data('settings').idAplicacao <= 0) {
                    throw ("para editar defina um idAplicacao");
                    return;
                }
                $this.avaliacoesQuickAplicacao('_quicknova')
            }
            function EditarParalela($this) {
                if ($this.data('settings').idAplicacao <= 0) {
                    throw ("para editar defina um idAplicacao");
                    return;
                }
                if ($this.data('settings').idConfig <= 0) {
                    throw ("para editar defina um idConfig");
                    return;
                }
                $this.avaliacoesQuickAplicacao('_quicknova')
            }
            function Listar($this) {
                if ($this.data('settings').idProva <= 0 && $this.data('settings').idAplicacao > 0) {
                    $this.avaliacoesQuickAplicacao('_quicklistar');
                    return
                }
                if ($this.data('settings').idProva > 0 && $this.data('settings').idAplicacao <= 0) {
                    $this.avaliacoesQuickAplicacao('_quicklistar');
                    return
                }
                if ($this.data('settings').idProva > 0 && $this.data('settings').idAplicacao > 0) {
                    throw ("para listar defina apenas um idProva ou idAplicacao");
                    return
                }
                console.log($this.data('settings').idProva, $this.data('settings').idAplicacao);
                throw ("para listar defina um idProva ou idAplicacao");
            }

        },

        _viewprova: function () {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            var mensagem = $this.data('settings').mensagem;

            var paginacao;
            var qAtual = 0;
            if ($this.data('settings').idPagina) {
                qAtual = $this.data('settings').idPagina;
            }
            carregando.mostrar();

            $.ajax({
                url: $this.data('settings').caminhoBase + '/Aplicacao/ViewProva/' + $this.data('settings').idProva + '/' + qAtual,
                type: "GET",
                success: function (dados, status, xhttp) { retornoViewProva(dados); }
            });

            function retornoViewProva(dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, true)) {
                    return;
                }

                //carregando.esconder();

                mensagem.esconder()

                var lstTipos = $(dados).attr('tipos').split(',');

                paginacao = new Realizacao($this, 'frmQuestaoViewProva', "btnLimpar", "btnRevisar", "btnConferir.btnConferir", "btnVoltar", "btnAvancar", lstTipos, qAtual, retornoCarregarQuestao, retornoCarregarQuestaoErro);
                paginacao.viewCorreta = $this.data('settings').viewCorreta;
                if ($this.data('settings').abriuVisualizacao) {
                    $this.data('settings').abriuVisualizacao();
                }


            };
            function retornoCarregarQuestaoErro(dados) {
                $this.avaliacoesQuickAplicacao('_retornos', dados, false)
            };

            function retornoCarregarQuestao(dados) {

                carregando.esconder();

                if ($this.data('settings').retornoCarregarQuestao) {
                    $this.data('settings').retornoCarregarQuestao();
                }

            };


            return $this;
        },

        _quicknova: function () {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            var mensagem = $this.data('settings').mensagem;

            var idAplicacao = $this.data('settings').idAplicacao
            var idProva = $this.data('settings').idProva
            var idConfig = $this.data('settings').idConfig

            var criarGrupo = new Function();

            carregando.mostrar();

            var AA_Grupos, AA_Config, AA_Resumo, AA_GruposBtn;
            var boxShowQuestoes;
            var boxGerenciador;

            var textosComentario = [];
            var listaRealizadorGrupo = [];
            var selecao;
            $.ajax({
                url: $this.data('settings').caminhoBase + '/Aplicacao/QuickNova/' + idAplicacao + "/" + idProva + "/" + idConfig,
                type: "GET",
                cache: false,
                success: function (dados, status, xhttp) { retornoQuickNova(dados); }
            });


            function retornoQuickNova(dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }

                $this.html(dados);
                carregarNavegacao();
                mensagem.esconder();

                AA_Grupos = $this.find("#AA_Grupos");
                AA_Config = $this.find("#AA_Config");
                AA_Resumo = $this.find("#AA_Resumo");
                AA_GruposBtn = $this.find("#AA_GruposBtn");


                $this.find("#AA_btnGerenciadorMode").attr('href', FUNCAO_VAZIA).click(modeGrupos);

                $this.find("#AA_btnCriarGrupos").attr('href', FUNCAO_VAZIA).click(criarGrupos);

                $this.find("#btnCancelarGrupos").attr('href', FUNCAO_VAZIA).click(cancelar).hide();
                $this.find("#btnAvancarGrupos").attr('href', FUNCAO_VAZIA).click(selecionarGrupos);
                $this.find("#btnVoltarGrupos").attr('href', FUNCAO_VAZIA).click(voltarCriarGrupos).hide();
                $this.find("#btnContinuarGrupos").attr('href', FUNCAO_VAZIA).click(cancelarCriarGrupos).hide();
                $this.find("#btnSalvarGrupos").attr('href', FUNCAO_VAZIA).click(salvarGrupos).hide();

                abrirGrupos();


                if ($this.data('settings').abriuAplicacao) {
                    $this.data('settings').abriuAplicacao();
                }
            }

            function cancelar() {
                if ($this.data('settings').retornoCancelar) {
                    $this.data('settings').retornoCancelar();
                    return;
                }

                $this.html("");
            }

            /*navegacao*/

            function carregarNavegacao() {
                $this.find(".passo1 a").attr('href', FUNCAO_VAZIA).click(abrirGrupos);
                $this.find(".passo2 a").attr('href', FUNCAO_VAZIA).click(selecionarGrupos);
                $this.find(".passo3 a").attr('href', FUNCAO_VAZIA).click(navegacaoResumo);
            }
            function navegacaoResumo() {
                selecionarGrupos();
                if (selecao) {
                    abrirResumo();
                }
            }
            function ajustarNavegacao(passo) {
                $this.find("#cnfg_aplicador_navegacao a").each(function () {
                    $(this).removeClass("ativo");
                });
                passo.toggleClass("ativo");
            }

            /* grupos */
            function abrirGrupos() {
                ajustarNavegacao($this.find(".passo1 a"));
                $this.find("#cnfg_aplicador_navegacao").show();
                AA_Grupos.show();
                AA_Config.hide();
                AA_Resumo.hide();

                if (!$this.data('settings').bolGerenciador) {
                    carregando.esconder();
                    return
                }

                boxGerenciador = $this.find("#containerGerenciadorGrupos");

                if ($.trim(boxGerenciador.html()).length > 0) {
                    carregando.esconder();
                    return;
                }

                var lstIds = [];
                $this.find('input[name="chkRealizadorGrupo"]').each(function () {
                    lstIds.push(this.value);
                });
                var opcoesGerenciador = {
                    'retornoSelecionar': retornoSelecionar,
                    'idsSelecionados': lstIds,
                    'retornoAbriu': retornoGerenciadorAbriu,
                    'retornoAbriuEdicao': retornoAbriuEdicao,
                    'retornoAbriuCriar': retornoGerenciadorAbriuCriar,
                    'retornoAbriuEditar': retornoAbriuEditar,
                    'showBtnCriar': false,
                    'showBtnCancelar': false,
                    'showBtnSelecionar': false,
                    'showBtnConcluir': false,
                    'showBtnModeEdicao': false,
                    'showNavegacao': true,
                    'retornoQtdGruposUsuario': retornoQtdGrupos,
                    'mensagemInicial': "Selecione um ou mais grupos que participarão desta atividade",
                    'showMensagemInicial': true
                };
                if ($this.data('settings').caminhoBaseGerenciador) {
                    opcoesGerenciador['caminhoBase'] = $this.data('settings').caminhoBaseGerenciador;
                }

                boxGerenciador.gerenciadorgrupos(opcoesGerenciador);

            }
            function retornoQtdGrupos(qtd) {
                if (qtd == 0) {

                    var data = mensagem.htmlTemplate("Erro", true, "Para configurar uma atividade, é necessário primeiro criar um grupo.", 'alerta');
                    /*
                    htmlTemplate = function (titulo, erro, msg, estilo)
                    var data = "<div id=\"confirm\" class=\"mensagem comBotao boxMsg alerta confirm\">" +
                    "<div class=\"cnfg_aplicador_mensagem\">" +
                    "<span>Para configurar uma atividade, é necessário primeiro criar um grupo.</span>" +
                    "<div class=\"cnfg_aplicador_mensagemBotoes\">" +
                    "<a href=\" " + FUNCAO_VAZIA + "\" class=\"btn btnConfirmSim\">Continuar</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";*/
                    //alert("Para configurar uma atividade, é necessário primeiro criar um grupo.");
                    //$this.avaliacoesQuickAplicacao('_retornos', data, false, false);
                    $this.avaliacoesQuickAplicacao('_retornos', data, false, criarGrupos);

                    //criarGrupos();
                }
            }

            function criarGrupos() {
                //$("#AA_Mask").hide();
                $this.find("#cnfg_aplicador_navegacao").hide();
                boxGerenciador.gerenciadorgrupos('iniciar', 'criarnovo');
            }
            function modeGrupos() {
                boxGerenciador.gerenciadorgrupos('iniciar', 'edicao');
            }
            function retornoSelecionar(ids) {
                //<input type="checkbox" value="297" name="chkRealizadorGrupo" />
                $this.find("#frmAplicacao input[name='chkRealizadorGrupo']").remove();
                var listaGrupoLoc = [];
                if (ids != null) {
                    for (var i = 0; i < ids.length; i++) {
                        if ($.trim(ids[i]) > 0) {
                            var input = $(document.createElement('input')).attr({
                                type: 'hidden',
                                name: 'chkRealizadorGrupo',
                                value: ids[i]
                            });
                            listaGrupoLoc[i] = input;
                        }
                    }
                    listaRealizadorGrupo = listaGrupoLoc;
                    //alert($this.find("#frmAplicacao").html());
                    selecao = true;
                    abrirConfig();
                } else {
                    selecao = false;
                }
            }
            function retornoGerenciadorAbriu() {
                $this.find("#AA_btnCriarGrupos").hide();
                $this.find("#btnVoltarGrupos").hide();
                $this.find("#btnSalvarGrupos").hide();
                $this.find("#AA_btnGerenciadorMode").show();
                $this.find(".cnfg_aplicador_toolTip").show();
                $this.find("#btnAvancarGrupos").show();
                $this.find("#cnfg_aplicador_navegacao").show();
                carregando.esconder();
            }
            function retornoAbriuEdicao() {
                $this.find("#cnfg_aplicador_navegacao").hide();
                $this.find("#AA_btnGerenciadorMode").hide();
                $this.find(".cnfg_aplicador_toolTip").hide();
                $this.find("#AA_btnCriarGrupos").show();
                $this.find("#btnSalvarGrupos").hide();
                $this.find("#btnVoltarGrupos").hide();
                $this.find("#btnAvancarGrupos").hide();
                $this.find("#btnContinuarGrupos").show();
            }
            function retornoGerenciadorAbriuCriar() {
                $this.find("#AA_btnCriarGrupos").hide();
                $this.find("#AA_btnGerenciadorMode").hide();
                $this.find("#btnAvancarGrupos").hide();
                $this.find("#btnContinuarGrupos").hide();
                $this.find(".cnfg_aplicador_toolTip").hide();
                $this.find("#btnSalvarGrupos").text("Gravar").show();
                $this.find("#btnVoltarGrupos").show();
            }
            function retornoAbriuEditar() {
                $this.find("#AA_btnCriarGrupos").hide();
                $this.find("#AA_btnGerenciadorMode").hide();
                $this.find("#btnAvancarGrupos").hide();
                $this.find("#btnContinuarGrupos").hide();
                $this.find(".cnfg_aplicador_toolTip").hide();
                $this.find("#btnSalvarGrupos").text("Alterar").show();
                $this.find("#btnVoltarGrupos").show();
            }
            function cancelarCriarGrupos() {
                $this.find("#btnContinuarGrupos").hide();
                boxGerenciador.gerenciadorgrupos('iniciar', 'cancelar');
            }
            function voltarCriarGrupos() {
                $this.find("#btnContinuarGrupos").hide();
                boxGerenciador.gerenciadorgrupos('iniciar', 'edicao');
            }
            function salvarGrupos() {
                boxGerenciador.gerenciadorgrupos('iniciar', 'concluir');
            }
            function selecionarGrupos() {
                if (!$this.data('settings').bolGerenciador) {
                    abrirConfig();
                    return
                }
                boxGerenciador.gerenciadorgrupos('iniciar', 'selecionar');
            }
            /* configuração */
            function abrirConfig() {
                $this.find("#cnfg_aplicador_navegacao").show();

                //TODO:VERIFICAR default text
                //defaultText();

                ajustarNavegacao($this.find(".passo2 a"));
                if ($.trim(AA_Config.html()).length > 0) {
                    iniciarConfig();
                    return;
                }
                carregando.mostrar();

                $.ajax({
                    url: $this.data('settings').caminhoBase + '/Aplicacao/QuickConfiguracao/',
                    data: $this.find("#frmSalvarAplicacao").serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) { retornoAbrirConfig(dados); }
                });
            }
            function tratarNome(texto) {
                if (texto != null) {
                    var padrao = new RegExp("\\((.*)\\)(.*)");
                    var resultado = padrao.exec(texto);

                    texto = resultado[1];
                    texto = texto.split('|');
                    texto.push(resultado[2]);
                } else {
                    texto = "";
                }
                return texto;
            }
            function retornoAbrirConfig(dados) {

                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }
                AA_Config.html(dados);

                $this.find("#btnCancelarConfig").attr('href', FUNCAO_VAZIA).click(cancelar).hide();
                $this.find("#btnVoltarConfig").attr('href', FUNCAO_VAZIA).click(abrirGrupos);
                $this.find("#btnAvancarConfig").attr('href', FUNCAO_VAZIA).click(abrirResumo);

                $this.find("input[name='rdoAgendamento']").change(testAgendamento);
                $this.find("input[name='rdoTentativa']").change(testTentativas);
                $this.find("input[name='rdoCorrecao']").change(testCorrecao);
                $this.find("input[name='rdoGabarito']").change(testGabarito);
                $this.find("input[name='rdoDicas']").change(testDica);

                testAgendamento();
                testTentativas();
                testCorrecao()
                testGabarito();
                testDica();

                $this.find("input#txtDataRealizacaoInicio.habilitado, input#txtDataRealizacaoFinal, input#txtDataCorrecao, input#txtDataGabarito").datepicker({
                    showOn: "button",
                    buttonImage: $this.data('settings').caminhoBase + "/" + "Content/images/calendar.gif",
                    buttonImageOnly: true
                });

                $("input#txtDataRealizacaoInicio, input#txtDataRealizacaoFinal, input#txtDataCorrecao, input#txtDataGabarito").change(function () {
                    var obj = $(this);

                    var teste = $.datepicker.parseDate('dd/mm/yy', obj.val());

                    var yearMax = new Date().getFullYear();
                    var yearMin = 1900;
                    var dateMax = new Date();
                    dateMax.setFullYear(yearMax, 11, 31)
                    dateMax = dateMax.setHours(0, 0, 0, 0);

                    var dateMin = new Date();
                    dateMin.setFullYear(yearMin, 0, 1)
                    dateMin = dateMin.setHours(0, 0, 0, 0);

                    var atual = new Date();
                    atual.setFullYear(obj.val().substring(6, 10), parseInt(obj.val().substring(3, 5)) - 1, obj.val().substring(0, 2));
                    atual = atual.setHours(0, 0, 0, 0);

                    try {
                        if ((atual > dateMax || atual <= dateMin) && atual != "") {
                            throw "e";
                        }
                    } catch (e) {
                        $(this).val("");
                    }
                });



                $this.find("input#txtHoraRealizacaoInicio.habilitado, input#txtHoraRealizacaoFinal, input#txtHrCorrecao, input#txtHoraGabarito").timePicker();
                //$this.find("input#txtHoraRealizacaoFinal").timePicker();
                //$this.find("input#txtHrCorrecao").timePicker();
                //$this.find("input#txtHoraGabarito").timePicker();

                $this.find("input#txtDataRealizacaoInicio.desabilitado, input#txtHoraRealizacaoInicio.desabilitado");

                $this.avaliacoesQuickAplicacao("_criarExpandirAreas", "#btnConfigAvancada", "#boxConfigAvancada", false, abriuBoxAvancado);
                $this.avaliacoesQuickAplicacao("_criarExpandirAreas", "#btnShowQuestoes", "#boxShowQuestoes", false, abriuBoxQuestao);




                if ($this.find("input#txtTituloAtividade").val().length == 0) {
                    $this.find("input#txtTituloAtividade").val($this.data('settings').txtPadrao);
                };

                $this.find("#AA_Main .txtTentativa").keydown(function (e) {

                    if (e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                        return false;
                    }
                });

                iniciarConfig();
            }
            function iniciarConfig() {
                AA_Grupos.hide();
                AA_Config.show();
                AA_Resumo.hide();

                boxShowQuestoes = $this.find("#boxShowQuestoes");

                carregando.esconder();
            }
            function genericDesativaRadio(checkBox, boxDisable, radioDisable, checado) {

                var check = $this.find(checkBox).is(":checked");

                if (check == checado) {
                    $(boxDisable).find(radioDisable).attr('disabled', 'disabled');
                } else {
                    $(boxDisable).find(radioDisable).removeAttr('disabled');
                }
            }
            function genericTestCheckBox(checkBox, boxDisable, checado) {
                var check = $this.find(checkBox).is(":checked")

                var box = $(boxDisable);

                if (check == checado) {
                    box.addClass('desabilitado');
                    $(boxDisable).find("input").attr('disabled', 'disabled');
                } else {
                    box.removeClass('desabilitado');
                    $(boxDisable).find("input").removeAttr('disabled');
                }
            }
            function testAgendamento() {
                genericTestCheckBox("#rdoAgendamentoNao", '#boxAgendamento', true);
                genericDesativaRadio("#rdoAgendamentoNao", "#caixaCorrecao", "#rdoCorrecaoAgendamento", true);
                genericDesativaRadio("#rdoAgendamentoNao", "#caixaDivulgacaoGabarito", "#rdoGabaritoAgendamento", true);
            }

            function testTentativas() {
                genericTestCheckBox("#rdoTentativaNao", '#boxTentativas', true);
            }
            function testCorrecao() {
                genericTestCheckBox("#rdoCorrecaoData", '#boxDataCorrecao', false);
            }
            function testGabarito() {
                genericTestCheckBox("#rdoGabaritoData", '#boxDataGabarito', false);
                genericDesativaRadio("#rdoGabaritoSem", "#caixaDivulgacaoGabarito", "#rdoComentarioNao", true);
                genericDesativaRadio("#rdoGabaritoSem", "#caixaDivulgacaoGabarito", "#rdoComentarioSim", true);
            }
            function testDica() {
                genericTestCheckBox("#rdoDicasNao", '#boxTentativaDica', true);
            }
            /* questoes */
            function abriuBoxQuestao(isOpen) {
                if (isOpen) {
                    abrirQuestoes();
                }
            }
            function abriuBoxAvancado(isOpen) {
                if (!isOpen) {
                    $this.find("#boxShowQuestoes").hide();
                    $this.avaliacoesQuickAplicacao("_expandirAreaTrocarBotao", $this.find("#btnShowQuestoes"), true)
                }
            }
            function abriuBoxAvancadoRO(isOpen) {
                if (!isOpen) {
                    $this.find("#boxShowQuestoesRO").hide();
                    $this.avaliacoesQuickAplicacao("_expandirAreaTrocarBotao", $this.find("#btnShowQuestoesRO"), true)
                }
            }
            function abrirQuestoes() {
                if ($.trim(boxShowQuestoes.html()).length > 0) {
                    iniciarQuestoes();
                    return;
                }
                carregando.mostrar();
                $.ajax({
                    url: $this.data('settings').caminhoBase + '/Aplicacao/QuickQuestoes/',
                    data: $this.find("#frmSalvarAplicacao").serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) { retornoAbrirQuestoes(dados); }
                });
            }
            function retornoAbrirQuestoes(dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }

                boxShowQuestoes.html(dados);

                iniciarQuestoes();
            }
            function iniciarQuestoes() {
                carregando.esconder();

                boxShowQuestoes.find(".tabela input[type='checkbox']").change(function () { checkUncheckQuestao($(this)); })

                boxShowQuestoes.find(".tabela .setaFechado").click(function () { clickSeta($(this)); });
            }
            function checkUncheckQuestao(obj) {
                var celEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxEnunciadoQuestao");
                if (obj.is(":checked")) {
                    celEnunciado.removeClass('desabilitado');
                } else {
                    celEnunciado.addClass('desabilitado');
                }
            }
            function clickSeta(obj) {
                if (obj.attr('class').indexOf('setaFechado') > -1) {
                    obj.addClass('setaAberto').removeClass('setaFechado');
                    var idQuestao = obj.parents("tr.trLinhaQuestao").find("input").val();
                    abrirQuestao(idQuestao, obj)
                } else if (obj.attr('class').indexOf('setaAberto') > -1) {
                    obj.addClass('setaFechado').removeClass('setaAberto');

                    var celEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxConteudoQuestao");
                    var celMiniEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxEnunciadoQuestao");
                    celMiniEnunciado.show();
                    celEnunciado.hide('fast');
                }
            }
            function abrirQuestao(idQuestao, obj) {
                var celEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxConteudoQuestao");
                if ($.trim(celEnunciado.html()).length > 0) {
                    iniQuestao(obj);
                    return;
                }
                $.ajax({
                    url: $this.data('settings').caminhoBase + '/Aplicacao/QuickCarregarQuestao/' + idQuestao,
                    data: $this.find("#frmSalvarAplicacao").serialize(),
                    type: "POST",
                    success: function (dados, status, xhttp) { retornoAbrirQuestao(obj, dados); }
                });
            }
            function trocarNome(tipo, btn, localAlteraTitu, divHide, numero) {

                if (numero != 1) {
                    numero = (!$(btn.find(divHide)).is(":visible")) ? 2 : 1;
                }

                var texto = textosComentario[tipo][numero - 1] + " " + textosComentario[tipo][2];

                $(btn.find(localAlteraTitu)).html(texto);

            }
            function retornoAbrirQuestao(obj, dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }
                var celEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxConteudoQuestao");

                var btn = $(dados).find('.boxDicas a.btnDica');
                textosComentario["Dica"] = tratarNome($(btn).html());
                btn.attr('href', FUNCAO_VAZIA).click(function () { showDica($(this)) });
                $(dados).find('.boxDicas a.btnDica').html(btn);
                /*
                this.btn.attr('href', FUNCAO_VAZIA).click(function () { showDica($(this)) });
                trocarNome("Dica", $("#caixaQuestoes"), ".boxDicas a.btnDica", ".conteudoDica", 1);
                */



                celEnunciado.html($(dados).html())

                var btn = $(dados).find('.boxDicas a.btnDica');
                textosComentario["Dica"] = tratarNome($(btn).html());

                var btn2 = $(dados).find('.boxComentarios a.btnDica');
                textosComentario["Coment"] = tratarNome($(btn2).html());

                var btn3 = $(dados).find('.boxComentariosProfessor a.btnDica');
                textosComentario["ComentProf"] = tratarNome($(btn3).html());

                iniQuestao(obj);
            }

            function iniQuestao(obj) {

                var celEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxConteudoQuestao");
                var celMiniEnunciado = obj.parents("tr.trLinhaQuestao").find("td .boxEnunciadoQuestao");
                celMiniEnunciado.hide();
                celEnunciado.show("fast");


                boxShowQuestoes.find(".tabela .boxConteudoQuestao").each(function () {
                    if ($(this).html() != celEnunciado.html()) {
                        $(this).hide("fast");
                        var celMiniEnunciado = $(this).parents("tr.trLinhaQuestao").find("td .boxEnunciadoQuestao");
                        celMiniEnunciado.show();

                        var obj = $(this).parents("tr.trLinhaQuestao").find("td .setaAberto");
                        obj.addClass('setaFechado').removeClass('setaAberto');
                    }
                });


                //exconder os outros

                if ($("#boxShowQuestoesRO").html() == null) {
                    this.btn = $(boxShowQuestoes).find('.boxDicas a.btnDica');
                    this.btn.attr('href', FUNCAO_VAZIA).click(function () { showDica($(this)) });
                    trocarNome("Dica", $("#caixaQuestoes"), ".boxDicas a.btnDica", ".conteudoDica", 1);

                    this.btn2 = $(boxShowQuestoes).find('.boxComentarios a.btnDica');
                    this.btn2.attr('href', FUNCAO_VAZIA).click(function () { showComentario($(this)) });
                    trocarNome("Coment", $("#caixaQuestoes"), ".boxComentarios a.btnDica", ".conteudoComentario", 1);

                    this.btn3 = $(boxShowQuestoes).find('.boxComentariosProfessor a.btnDica');
                    this.btn3.attr('href', FUNCAO_VAZIA).click(function () { showProfessor($(this)) });
                    trocarNome("ComentProf", $("#caixaQuestoes"), ".boxComentariosProfessor a.btnDica", ".conteudoProfessor", 1);

                    var boxQuestaoPai = $(boxShowQuestoes).find("#boxQuestaoPai");

                    $(boxShowQuestoes).find("#btnQuestaoPai").click(function () {
                        $(this).find("#imgBtnQuestaoPai").toggleClass("imagemMais");

                        if (boxQuestaoPai.hasClass("hide")) {
                            boxQuestaoPai.toggleClass("hide");
                        } else {
                            boxQuestaoPai.addClass("hide");
                        }
                    });

                } else {
                    this.btn4 = $("#boxShowQuestoesRO").find('.boxDicas a.btnDica');
                    this.btn4.attr('href', FUNCAO_VAZIA).click(function () { showDica($(this)) });
                    trocarNome("Dica", $("#caixaQuestoes"), ".boxDicas a.btnDica", ".conteudoDica", 1);

                    this.btn5 = $("#boxShowQuestoesRO").find('.boxComentarios a.btnDica');
                    this.btn5.attr('href', FUNCAO_VAZIA).click(function () { showComentario($(this)) });
                    trocarNome("Coment", $("#caixaQuestoes"), ".boxComentarios a.btnDica", ".conteudoComentario", 1);

                    this.btn6 = $("#boxShowQuestoesRO").find('.boxComentariosProfessor a.btnDica');
                    this.btn6.attr('href', FUNCAO_VAZIA).click(function () { showProfessor($(this)) });
                    trocarNome("ComentProf", $("#caixaQuestoes"), ".boxComentariosProfessor a.btnDica", ".conteudoProfessor", 1);

                    this.btn4.trigger("click");
                    this.btn4.trigger("click");

                    this.btn5.trigger("click");
                    this.btn5.trigger("click");

                    this.btn6.trigger("click");
                    this.btn6.trigger("click");

                    var boxQuestaoPai = $("#boxShowQuestoesRO").find("#boxQuestaoPai");

                    $("#boxShowQuestoesRO").find("#btnQuestaoPai").click(function () {
                        $(this).find("#imgBtnQuestaoPai").toggleClass("imagemMais");

                        if (boxQuestaoPai.hasClass("hide")) {
                            boxQuestaoPai.toggleClass("hide");
                        } else {
                            boxQuestaoPai.addClass("hide");
                        }
                    });

                }



            }

            function exibeOculta(btn, a, b) {
                if (!btn.parents(".areaDicas").find(".areaConteudoDica " + a).hasClass("hide")) {
                    btn.parents(".areaDicas").find(".areaConteudoDica  " + a).toggleClass("hide");
                    btn.parents(".areaDicas").find("" + b).toggleClass("hide");
                }
            }
            function showDica(btn) {

                var conta = btn.parents(".areaDicas").find(".areaConteudoDica .conteudoDica");

                conta.find("div.fechar").unbind('click');

                trocarNome("Dica", btn.parents(".areaDicas"), ".boxDicas a.btnDica", ".conteudoDica", 0);
                trocarNome("Coment", btn.parents(".areaDicas"), ".boxComentarios a.btnDica", ".conteudoComentario", 1);
                trocarNome("ComentProf", btn.parents(".areaDicas"), ".boxComentariosProfessor a.btnDica", ".conteudoProfessor", 1);

                exibeOculta(btn, ".conteudoComentario", ".boxComentarios .indBoxDicaComent");
                exibeOculta(btn, ".conteudoProfessor", ".boxComentariosProfessor .indBoxProfessor");

                btn.parents(".areaDicas").find(".boxDicas .indBoxDicaComent").toggleClass("hide");
                conta.toggleClass("hide");
                conta.find("div.fechar").click(function () {
                    btn.trigger("click");
                });
            }
            function showComentario(btn) {

                var conta = btn.parents(".areaDicas").find(".areaConteudoDica .conteudoComentario");
                conta.find("div.fechar").unbind('click');

                trocarNome("Dica", btn.parents(".areaDicas"), ".boxDicas a.btnDica", ".conteudoDica", 1);
                trocarNome("Coment", btn.parents(".areaDicas"), ".boxComentarios a.btnDica", ".conteudoComentario", 0);
                trocarNome("ComentProf", btn.parents(".areaDicas"), ".boxComentariosProfessor a.btnDica", ".conteudoProfessor", 1);

                exibeOculta(btn, ".conteudoDica", ".boxDicas .indBoxDicaComent");
                exibeOculta(btn, ".conteudoProfessor", ".boxComentariosProfessor .indBoxProfessor");

                btn.parents(".areaDicas").find(".boxComentarios .indBoxDicaComent").toggleClass("hide");
                conta.toggleClass("hide");
                conta.find("div.fechar").click(function () {
                    btn.trigger("click");
                });
            }
            function showProfessor(btn) {

                var conta = btn.parents(".areaDicas").find(".areaConteudoDica .conteudoProfessor");
                conta.find("div.fechar").unbind('click');

                trocarNome("Dica", btn.parents(".areaDicas"), ".boxDicas a.btnDica", ".conteudoDica", 1);
                trocarNome("Coment", btn.parents(".areaDicas"), ".boxComentarios a.btnDica", ".conteudoComentario", 1);
                trocarNome("ComentProf", btn.parents(".areaDicas"), ".boxComentariosProfessor a.btnDica", ".conteudoProfessor", 0);

                exibeOculta(btn, ".conteudoDica", ".boxDicas .indBoxDicaComent");
                exibeOculta(btn, ".conteudoComentario", ".boxComentarios .indBoxDicaComent");

                btn.parents(".areaDicas").find(".boxComentariosProfessor .indBoxProfessor").toggleClass("hide");
                conta.toggleClass("hide");
                conta.find("div.fechar").click(function () {
                    btn.trigger("click");
                });
            }

            /*validaçoes*/
            function validarCamposResumo() {

                if ($this.find("input#rdoAgendamentoSim").is(":checked")) {
                    if (($this.find("input#txtDataRealizacaoInicio").val().length == 0) || ($this.find("input#txtDataRealizacaoFinal").val().length == 0) || ($this.find("input#txtHoraRealizacaoInicio").val().length == 0) || ($this.find("input#txtHoraRealizacaoFinal").val().length == 0)) {
                        $this.find("input#txtDataRealizacaoInicio").focus();
                        var dados = mensagem.htmlTemplate("Erro", true, "Data Agendamento incompleta", 'alerta');
                        mensagem.exibir($(dados));
                        return false;
                    }
                }
                if ($this.find("input#rdoCorrecaoData").is(":checked")) {
                    if (($this.find("input#txtDataCorrecao").val().length == 0) || ($this.find("input#txtHrCorrecao").val().length == 0)) {
                        var dados = mensagem.htmlTemplate("Erro", true, "Data Correção incompleta", 'alerta');
                        mensagem.exibir($(dados));
                        return false;
                    }
                }
                if ($this.find("input#rdoGabaritoData").is(":checked")) {
                    if (($this.find("input#txtDataGabarito").val().length == 0) || ($this.find("input#txtHoraGabarito").val().length == 0)) {
                        var dados = mensagem.htmlTemplate("Erro", true, "Data Gabarito incompleta", 'alerta');
                        mensagem.exibir($(dados));
                        return false;
                    }
                }
                return true;

            }
            function validarCamposConclusao() {

                if ($this.find("input#txtTituloAtividade").val().length == 0) {
                    var dados = mensagem.htmlTemplate("Erro", true, "Titulo atividade em branco", 'alerta');
                    mensagem.exibir($(dados));
                    return false;
                }
                /*
                if ($this.find("input#rdoTentativaSim").is(":checked")) {
                if (($this.find("input#txtNumeroTentativa").val() == 0)) {
                $this.find("input#txtNumeroTentativa").focus();
                var dados = mensagem.htmlTemplate(true, "Numero de Tentativa deve ser maior que zero", 'alerta');
                mensagem.exibir($(dados));
                return false;
                }
                }
                if ($this.find("input#rdoDicasSim").is(":checked")) {
                if (($this.find("input#txtNumeroTentativaDica").val() == 0)) {
                $this.find("input#txtNumeroTentativaDica").focus();
                var dados = mensagem.htmlTemplate(true, "Numero de visualização das discas deve ser maior que zero", 'alerta');
                mensagem.exibir($(dados));
                return false;
                }
                }
                */
                return true;

            }
            /*resumo*/
            function abrirResumo() {
                $this.find("#cnfg_aplicador_navegacao").show();
                ajustarNavegacao($this.find(".passo3 a"));
                //Append 
                $.each(listaRealizadorGrupo, function (index, value) {
                    if (value != undefined) {
                        $this.find("#frmAplicacao").append(value);
                    }
                });




                if (validarCamposResumo()) {

                    carregando.mostrar();

                    $.ajax({
                        url: $this.data('settings').caminhoBase + '/Aplicacao/QuickResumo/',
                        data: $this.find("#frmSalvarAplicacao").serialize() + "&" + $this.find("#frmAplicacao").serialize(),
                        type: "POST",
                        success: function (dados, status, xhttp) { retornoAbrirResumo(dados); }
                    });
                }


            }
            function retornoAbrirResumo(dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }

                AA_Resumo.html(dados);

                AA_Grupos.hide();
                AA_Config.hide();
                AA_Resumo.show();


                $this.find("#btnCancelarResumo").attr('href', FUNCAO_VAZIA).click(cancelar).hide();
                $this.find("#btnVoltarResumo").attr('href', FUNCAO_VAZIA).click(abrirConfig);
                $this.find("#btnConcluirResumo").attr('href', FUNCAO_VAZIA).click(concluir);

                $this.avaliacoesQuickAplicacao("_criarExpandirAreas", "#btnConfigAvancadaRO", "#boxConfigAvancadaRO", false, abriuBoxAvancadoRO);
                $this.avaliacoesQuickAplicacao("_criarExpandirAreas", "#btnShowQuestoesRO", "#boxShowQuestoesRO", false);

                $this.find("#boxShowQuestoesRO .tabela .setaFechado").click(function () { clickSeta($(this)); });

                carregando.esconder();
            }
            /*concluir*/
            function concluir() {

                if (validarCamposConclusao()) {
                    
                    if ($this.data('settings').codigoOrigem) {
                    
                        var campoCodigo = $this.find("#frmAplicacao input[name='strCodigoOrigem']");
                        if (campoCodigo.length == 0) {
                               $this.find("#frmAplicacao").append($('<input name="strCodigoOrigem" type="hidden"/>'));
                        }
                        campoCodigo = $this.find("#frmAplicacao input[name='strCodigoOrigem']");
                    
                        campoCodigo.val($this.data('settings').codigoOrigem);
                    
                    }
                    
                    carregando.mostrar();
                    $.ajax({
                        url: $this.data('settings').caminhoBase + '/Aplicacao/QuickConcluir/',
                        data: $this.find("#frmSalvarAplicacao").serialize() + "&" + $this.find("#frmAplicacao").serialize(),
                        type: "POST",
                        success: function (dados, status, xhttp) { retornoConcluir(dados); }
                    });
                }

            }
            function retornoConcluir(dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }

                carregando.esconder();

                $this.html("");

                if ($this.data('settings').retornoConcluir) {
                    $this.data('settings').retornoConcluir();
                    return;
                }


            }
            function defaultText() {
                $(".defaultText").focus(function (srcc) {
                    if ($(this).val() == $(this)[0].title) {
                        $(this).removeClass("defaultTextActive");
                        $(this).val("");
                    }
                });
                $(".defaultText").blur(function () {
                    if ($(this).val() == "") {
                        $(this).addClass("defaultTextActive");
                        $(this).val($(this)[0].title);
                    }
                });
                $(".defaultText").blur();
            }
            return $this;
        },

        _quicklistar: function () {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            var mensagem = $this.data('settings').mensagem;

            var idAplicacao = $this.data('settings').idAplicacao;
            var idProva = $this.data('settings').idProva;
            var nomeAplicacao = "";
            carregando.mostrar();

            function carregarLista() {
                $.ajax({
                    url: $this.data('settings').caminhoBase + '/Aplicacao/QuickCarregarAplicacoes/' + idAplicacao + "/" + idProva,
                    type: "GET",
                    cache: false,
                    success: function (dados, status, xhttp) { retornoListar(dados); }
                });
            }

            function retornoListar(dados) {
                if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false)) {
                    return;
                }
                $this.html(dados);


                $("#cnfg_aplicador_botoes #btnCriarNovaConfiguracao").click(function () {
                    if ($this.data('settings').idProva == 0 && $this.data('settings').idAplicacao > 0) {
                        $this.data('settings').modo = 'criarparalela';
                    } else if ($this.data('settings').idProva > 0 && $this.data('settings').idAplicacao == 0) {
                        $this.data('settings').modo = 'criar';
                    } else {
                        alert("retorna exception que não pode criar")
                    }
                    $this.data('settings').retornoConcluir = _retornoConcluir;

                    $this.avaliacoesQuickAplicacao('_quicknova')
                    /*if ($this.data('settings').criarNovaConfiguracao) {
                    $this.data('settings').criarNovaConfiguracao();
                    } else {
                    alert("A função criarNovaConfiguracao não foi implementada");
                    }*/
                });

                function _retornoConcluir() {
                    $this.avaliacoesQuickAplicacao('_quicklistar')
                }
                mensagem.esconder();
                //aplicar 
                $this.find(".tabela .btnEditar").each(function () {
                    var id = $(this).attr('href');
                    $(this).attr('href', FUNCAO_VAZIA).click(function () {

                        var tmpIds = id.split('/');
                        var tmpIdAplicacao = parseInt(tmpIds[tmpIds.length - 2], 10);
                        var tmpIdConfig = parseInt(tmpIds[tmpIds.length - 1], 10);

                        if (tmpIdConfig == 0) {
                            editarAplicacao(tmpIdAplicacao);
                        } else {
                            editarAplicacaoParalela(tmpIdAplicacao, tmpIdConfig);
                        }

                    });
                });
                $this.find(".tabela .btnExcluir").each(function () {
                    var id = $(this).attr('href');
                    $(this).attr('href', FUNCAO_VAZIA).click(function () {

                        nomeAplicacao = $(this).parents("tr").find("td").first().text().split("/")[0];
                        var tmpIds = id.split('/');
                        var tmpIdAplicacao = parseInt(tmpIds[tmpIds.length - 2], 10);
                        var tmpIdConfig = parseInt(tmpIds[tmpIds.length - 1], 10);

                        excluirAplicacao(tmpIdAplicacao, tmpIdConfig);

                    });
                });

                carregando.esconder();

                if ($this.data('settings').abriuLista) {
                    $this.data('settings').abriuLista($this.find(".tabela .btnEditar").length);
                }
            }
            function excluirAplicacao(idAplicacao, idConfiguracao, confirm) {
                carregando.mostrar();
                $.ajax({
                    url: $this.data('settings').caminhoBase + '/Aplicacao/QuickExcluirAplicacao/' + idAplicacao + "/" + idConfiguracao + "/" + (confirm ? 1 : 0),
                    type: "GET",
                    success: function (dados, status, xhttp) { retornoExcluir(dados); }
                });

                function retornoExcluir(dados) {
                    carregando.esconder();
                    //mensagem comBotao boxMsg alerta confirm

                    if (dados.indexOf("vazio") == -1) {
                        var data = "<div id=\"confirm\" class=\"mensagem comBotao boxMsg alerta confirm\">" +
                            "<input type=\"hidden\" value=\"" + $(dados).find("input[type=hidden]").val() + "\"/>" +
			                    "<span>Deseja excluir esta configuração?</span>" +
                                "<p class='destaque'>" + nomeAplicacao + "</p>" +
			                    "<div class=\"cnfg_aplicador_mensagemBotoes\">" +
				                    "<a href=\" " + FUNCAO_VAZIA + "\" class=\"btn btnConfirmSim\">Sim</a><a class=\"btn btnConfirmNao\" href=\" " + FUNCAO_VAZIA + " \">Não</a>"
                        "</div>" +
	                    "</div>";
                        dados = data;
                    }


                    if (!$this.avaliacoesQuickAplicacao('_retornos', dados, false, confirmExcluir)) {
                        return;
                    }
                    carregarLista();
                    if ($this.data('settings').retornoExcluir) {
                        $this.data('settings').retornoExcluir();
                    }
                }
                function confirmExcluir() {
                    excluirAplicacao(idAplicacao, idConfiguracao, true)
                }
            }

            function editarAplicacao(id) {
                if ($this.data('settings').editarAplicacao) {
                    $this.data('settings').editarAplicacao(id);
                }
            }
            function editarAplicacaoParalela(id, idConfig) {
                if ($this.data('settings').editarAplicacaoParalela) {
                    $this.data('settings').editarAplicacaoParalela(id, idConfig);
                }
            }

            carregarLista();

            return $this;
        },

        _retornos: function (dados, showDados, confirmSim, confirmNao) {
            var $this = $(this);
            var retorno = $this.data('settings').retorno;

            var carregando = $this.data('settings').carregando;
            var mensagem = $this.data('settings').mensagem;
            var confirm = $this.data('settings').confirm;


            mensagem.onReload = function () {
                if ($this.data('settings').retornoRedirectLogin) {
                    $this.data('settings').retornoRedirectLogin();
                } else {
                    mensagem.recarregar();
                }
                return false;
            }

            if ($(dados).hasClass("erro")) {

                if ($this.data('settings').showMensagem || !$this.data('settings').retornoMensagem) {
                    mensagem.exibir($(dados));
                }

                if ($this.data('settings').retornoMensagem) {
                    $this.data('settings').retornoMensagem($(dados).html());
                }

                carregando.esconder();
                return false;
            }
            if ($(dados).hasClass("confirm")) {
                confirm.exibir($(dados), confirmSim, confirmNao);
                carregando.esconder();
                return false;
            }

            if (showDados) {
                $this.html($(dados).html());
            }

            return true;
        },

        _expandirAreaTrocarBotao: function (btn, visible) {

            if (visible) {
                btn.html(btn.attr("txtShow"));
            } else {
                btn.html(btn.attr("txtHide"));
            }

        },

        _criarExpandirAreas: function (sBotao, sBox, showIni, callBack) {

            var $this = $(this);
            var btn = $this.find(sBotao);
            var box = $this.find(sBox);
            if (btn.length <= 0) {
                return;
            }

            if (showIni) {
                box.show();
            } else {
                box.hide();
            }
            var txtBotao = btn.html().split("|");

            btn.attr("txtHide", txtBotao[0]);
            btn.attr("txtShow", txtBotao[1]);
            btn.attr("areaBox", sBox);


            if (box.is(":visible")) {
                btn.html(btn.attr("txtHide"));
            } else {
                btn.html(btn.attr("txtShow"));
            }

            btn.click(function () {

                if ($($(this).attr("areaBox")).is(":visible")) {
                    $($(this).attr("areaBox")).hide("slow");
                    $(this).html($(this).attr("txtShow"));
                    if (callBack) {
                        callBack(false);
                    }
                } else {
                    $($(this).attr("areaBox")).show("slow");
                    $(this).html($(this).attr("txtHide"));
                    if (callBack) {
                        callBack(true);
                    }
                }

            });


        },

        //atualiza sessao
        atualizarSessao: function () {
            var $this = $(this);
            var onClick = false;
            $('body').mousedown(function () {
                onClick = true;
            });

            setInterval(wakeupSessao, 10 * (60 * 1000));

            function wakeupSessao() {
                if (onClick) {
                    onClick = false;
                    var link = $this.data('settings').caminhoBase + "/Portal/WakeUp.asp";
                    $.ajax({
                        url: link,
                        type: "GET",
                        cache: false,
                        success: function (dados, status, xhttp) { }
                    });
                }
            }
        }

    };

    $.fn.avaliacoesQuickAplicacao = function (method) {
        // Method calling logic

        if (methods[method]) {

            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.avaliacoesQuickAplicacao');
        }

    };


})(jQuery);
