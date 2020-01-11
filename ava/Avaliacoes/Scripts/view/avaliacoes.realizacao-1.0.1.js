(function ($) {

    var FUNCAO_VAZIA = 'javascript:;';

    var methods = {

        init: function (options) {
            var settings = {
                'carregando': new Carregando("carregandoGeral"),
                'mensagem': new Mensagem($(this), 'boxMsg'),
                'caminhoBase': $('base#baseAvaliacao').attr('href') == undefined ? "./" : $('base#baseAvaliacao').attr('href'),
                'idAplicacao': 0,
                'idConfig': 0,
                'showMensagem': true,
                'callIniciarNao': undefined,
                'callIniciarValidar': undefined,
                'callFecharFinalizar': undefined,
                'retornoIniciar': undefined,
                'retornoCarregarQuestao': undefined,
                'retornoFinalizar': undefined,
                'retornoRedirectLogin': undefined,
                'retornoMensagem': undefined,
                'showFecharFinalizar': false
            };

            return this.each(function () {
                var $this = $(this);
                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }

                $this.avaliacoesRealizacao('atualizarSessao');

            });

            
        },

        iniciar: function (options) {
            var $this = $(this);
            if ($this.data('settings').idAplicacao <= 0) {
                throw "defina uma aplicação";
            }
            var carregando = $this.data('settings').carregando;

            $.ajax({
                url: $this.data('settings').caminhoBase + '/Realizacao/Iniciar/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig,
                type: "GET",
                success: function (dados, status, xhttp) { retornoIniciar(dados); }
            });

            function retornoIniciar(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, true)) {
                    return;
                }

                $this.find('#btnIniciar').attr('href', FUNCAO_VAZIA).click(validarIniciar);
                $this.find('#btnSair').attr('href', FUNCAO_VAZIA).click(sairIniciar);

                $this.find("#frmValidarAplicacao").submit(function (e) {
                    $.ajax({
                        url: $(this).attr('action'),
                        data: $(this).serialize(),
                        type: "POST",
                        success: function (dados, status, xhttp) {
                            retornoValidarIniciar(dados);
                        }
                    });
                    e.preventDefault();
                });

                if ($this.data('settings').retornoIniciar) {
                    $this.data('settings').retornoIniciar();
                }
            };

            function validarIniciar() {
                carregando.mostrar();
                $this.find("#frmValidarAplicacao").submit();
            };

            function sairIniciar() {

                if ($this.data('settings').callIniciarNao) {
                    $this.data('settings').callIniciarNao();
                    return;
                }

                window.close();
            };

            function retornoValidarIniciar(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, false)) {
                    return;
                }

                if ($this.data('settings').callIniciarValidar) {
                    $this.data('settings').callIniciarValidar();
                    return;
                }

                $this.avaliacoesRealizacao('realizar');

            };

            return $this;
        },

        realizar: function (options) {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            carregando.mostrar();

            var paginacao = undefined;
            var qAtual = 0;
            var url = $this.data('settings').caminhoBase + '/Realizacao/Realizar/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;

            if (options) {
                if (options.url) {
                    url = $this.data('settings').caminhoBase + options.url + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;
                }
                if (options.questao) {
                    qAtual = options.questao;
                    url += "/" + qAtual;
                }
            }

            
            $.ajax({
                url: url,
                type: "POST",
                success: function (dados, status, xhttp) { retornoRealizar(dados); }
            });

            function retornoRealizar(dados) {

                if (!$this.avaliacoesRealizacao('_retornos', dados, true)) {
                    return;
                }
                var lstTipos = $(dados).attr('tipos').split(',');

                paginacao = new Realizacao($this, 'frmQuestaoRealizacao', "btnLimpar", "btnRevisar.btnRevisar", "btnConferir.btnConferir", "btnVoltar", "btnAvancar", lstTipos, qAtual, retornoCarregarQuestao, retornoCarregarQuestaoErro);

                inicializarInstrucao();
                inicializarEncerrar();
                inicializarRefazer();
                inicializarResumo();

                //carregando.esconder();
            };
            function retornoCarregarQuestaoErro(dados) {
                $this.avaliacoesRealizacao('_retornos', dados, false)
            };
            function retornoCarregarQuestao(dados) {
                if ($this.data('settings').retornoCarregarQuestao) {
                    $this.data('settings').retornoCarregarQuestao();
                }
                carregando.esconder();
            };
            function inicializarInstrucao() {
                $this.find("#boxInstrucao").hide();
                $this.find(".iconeInstrucao #btnInstrucao").attr('href', FUNCAO_VAZIA).click(exibirInstrucao);
                $this.find("#btnInstrucaoFechar").attr('href', FUNCAO_VAZIA).click(exibirInstrucao);
                $this.find("#btnInstrucaoX").attr('href', FUNCAO_VAZIA).click(exibirInstrucao);
            };
            function exibirInstrucao() {
                $this.find("#boxInstrucao").toggle();
            };

            /* Encerrar */
            function inicializarEncerrar() {
                $this.find("#boxEncerrar").hide();
                $this.find("#btnEncerrar").attr('href', FUNCAO_VAZIA).click(exibirEncerrar);

                $this.find('#frmCarregarListaEncerrar').submit(function (e) {
                    carregando.mostrar();
                    $.ajax({
                        url: $(this).attr('action'),
                        data: $(this).serialize() + '&' + $('#hidLista').serialize() + '&time=' + new Date().getTime(),
                        type: "POST",
                        success: function (dados, status, xhttp) { retornoListaEncerrar(dados); }
                    });
                    e.preventDefault();
                });
            };
            function exibirEncerrar() {
                if ($this.find("#boxListaQuestoes").css('display') != 'none') {
                    $this.find("#btnListaQuestao").trigger("click");
                }


                $this.find("#boxEncerrar").toggle();
                $this.find("#boxAreaRealizacao").toggle();

                $this.find("#boxEncerrar").empty().addClass('carregando');

                if ($this.find("#boxEncerrar").is(':visible')) {
                    $this.find("#frmCarregarListaEncerrar").submit();
                }

            };

            function retornoListaEncerrar(dados) {
                //alert(dados);
                carregando.esconder();

                $this.find("#boxEncerrar").html($(dados)).removeClass('carregando');

                efeitoBtn("btnCinza");
                efeitoBtn("btnAzul");
                efeitoBtn("btnVerde");
                efeitoBtn("btnDourado");

                $this.find("#boxEncerrar .navegaPaginacao a.btnPaginacao").each(function () {
                    var tmpId = $(this).attr('href');
                    $(this).attr('href', FUNCAO_VAZIA).click(function () {
                        paginacao.trocarQuestao(tmpId);
                        exibirEncerrar();
                    });
                });
                $this.find("#btnEncerrarNao").attr('href', FUNCAO_VAZIA).click(exibirEncerrar);
                $this.find("#btnEncerrarSim").attr('href', FUNCAO_VAZIA).click(confirmarEncerrar);
            };

            function confirmarEncerrar() {
                $this.avaliacoesRealizacao('_finalizar');
            }
            /* refazer */
            //Talvez nao seja mais necessário~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Verificar se não é usado em outro lugar... se nao trocar por Resumo
            function inicializarRefazer() {
                $this.find("#btnRefazer").attr('href', FUNCAO_VAZIA).click(refazer);


            }
            function inicializarResumo() {
                $this.find("#btnResumo").attr('href', FUNCAO_VAZIA).click(resumo);
            }
            function resumo() {
                $this.avaliacoesRealizacao('_finalizar');
            }
            function refazer() {
                var options = { url: "/Realizacao/Refazer/" }
                $this.avaliacoesRealizacao('realizar', options);
            }

            function efeitoBtn(classCorBtn) {
                $this.find("." + classCorBtn).mouseover(function () {
                    $(this).toggleClass(classCorBtn + "_over");
                }).mouseout(function () {
                    $(this).toggleClass(classCorBtn + "_over");
                    if ($(this).hasClass(classCorBtn + "_down")) {
                        $(this).toggleClass(classCorBtn + "_down");
                    }
                }).mousedown(function () {
                    $(this).toggleClass(classCorBtn + "_down");
                }).mouseup(function () {
                    $(this).toggleClass(classCorBtn + "_down");
                });
            };

            return $this;
        },

        _finalizar: function () {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            carregando.mostrar();
            $.ajax({
                url: $this.data('settings').caminhoBase + '/Realizacao/Finalizar/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig,
                type: "POST",
                success: function (dados, status, xhttp) { retornoFinalizar(dados); }
            });

            function retornoFinalizar(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, true)) {
                    return;
                }
                if ($this.data('settings').showFecharFinalizar) {
                    $this.find('#btnFechar').attr('href', FUNCAO_VAZIA).click(fechar);
                } else {
                    $this.find('#btnFechar').remove();
                }

                $this.find('#btnImprimir').attr('href', FUNCAO_VAZIA).click(imprimir);

                $this.find('#btnView.btnView').attr('href', FUNCAO_VAZIA).click(function () { visualizar(); });
                $this.find('#btnRefazer.btnRefazer').attr('href', FUNCAO_VAZIA).click(refazer);

                $this.find("#boxRefazer #btnRefazerSim").attr('href', FUNCAO_VAZIA).click(refazerSim);

                $this.find("#boxRefazer #btnRefazerNao").attr('href', FUNCAO_VAZIA).click(refazerNao);

                $this.find("#boxRefazer").hide();

                carregando.esconder();
                var qtd = $this.find(".boxProtocolo .btns a").length;
                if (qtd != 0) {
                    $this.find(".boxProtocolo .btns").css("width", (140 * qtd));
                }

                if ($this.data('settings').retornoFinalizar) {
                    $this.data('settings').retornoFinalizar();
                }

                $this.find(".boxConteudoResumo .navegaPaginacao a.btnPaginacao").each(function () {
                    var tmpId = $(this).attr('href');
                    $(this).attr('href', FUNCAO_VAZIA).click(function () {
                        visualizar(tmpId);
                    });
                });
            };


            function visualizar(pagAtual) {
                var options = { url: "/Realizacao/Visualizar/" }
                if (pagAtual) {
                    options["questao"] = pagAtual;
                }
                $this.avaliacoesRealizacao('realizar', options);
            };

            function refazer() {
                //alert("refazer");
                //alert($this.find("#boxRefazer").length);
                $this.find("#areaConteudo").hide();
                $this.find("#boxRefazer").show();
                //var options = { url: "/Realizacao/Refazer/" }
                //$this.avaliacoesRealizacao('realizar', options);
            };

            function refazerNao() {
                $this.find("#areaConteudo").show();
                $this.find("#boxRefazer").hide();
            }
            function refazerSim() {
                var options = { url: "/Realizacao/Refazer/" }
                $this.avaliacoesRealizacao('realizar', options);
            }

            function fechar() {
                if ($this.data('settings').callFecharFinalizar) {
                    $this.data('settings').callFecharFinalizar();
                    return;
                }
                window.close();
            };

            function imprimir() {
                window.print();
            };

        },

        _retornos: function (dados, showDados) {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            var mensagem = $this.data('settings').mensagem;

            if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") > -1) {

                if ($(dados)[0].nodeName.toLowerCase() == "login") {

                    if ($this.data('settings').retornoRedirectLogin) {
                        $this.data('settings').retornoRedirectLogin($(dados).text());
                    } else {
                        window.location = $(dados).text();
                    }
                    return false;
                }

                //verifico qual é o tratamento que devo dar pelo nome do nó
                if ($(dados)[0].nodeName.toLowerCase() == "tentativas") {
                    $this.avaliacoesRealizacao('_finalizar');
                    return false;
                }

                if ($this.data('settings').showMensagem) {
                    mensagem.exibir($(dados));
                }
                if ($this.data('settings').retornoMensagem) {
                    $this.data('settings').retornoMensagem($(dados).html());
                }

                carregando.esconder();
                return false;
            }


            if (showDados) {
                $this.html($(dados).html());
                efeitoBtn("btnCinza");
                efeitoBtn("btnAzul");
                efeitoBtn("btnVerde");
                efeitoBtn("btnDourado");
            }
            function efeitoBtn(classCorBtn) {
                $this.find("." + classCorBtn).mouseover(function () {
                    $(this).toggleClass(classCorBtn + "_over");
                }).mouseout(function () {
                    $(this).toggleClass(classCorBtn + "_over");
                    if ($(this).hasClass(classCorBtn + "_down")) {
                        $(this).toggleClass(classCorBtn + "_down");
                    }
                }).mousedown(function () {
                    $(this).toggleClass(classCorBtn + "_down");
                }).mouseup(function () {
                    $(this).toggleClass(classCorBtn + "_down");
                });
            };




            return true;
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
                        success: function (dados, status, xhttp) {}
                    });
                }
            }
        }
        


    };

    $.fn.avaliacoesRealizacao = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.avaliacoesRealizacao');
        }

    };


})(jQuery);

