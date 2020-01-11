var caminhoBase;

(function ($) {

    var FUNCAO_VAZIA = 'javascript:;';

    var methods = {

        init: function (options) {
            var settings = {
                'carregando': new Carregando("carregandoGeral"),
                'mensagem': new Mensagem('SEC025-11-alerta'),
                'caminhoBase': $('base#baseAvaliacao').attr('href') == undefined ? "./" : $('base#baseAvaliacao').attr('href'),
                'idAplicacao': 0,
                'idConfig': 0,
                'idProvaRealizada': 0,
                'showMensagem': true,
                'callIniciarNao': undefined,
                'callIniciarValidar': undefined,
                'callFecharFinalizar': undefined,
                'retornoIniciar': undefined,
                'retornoCarregarQuestao': undefined,
                'retornoFinalizar': undefined,
                'retornoRedirectLogin': undefined,
                'retornoMensagem': undefined,
                'showFecharFinalizar': false,
                'showRealizadaRespostas': true,
                'showRealizadaResumo': true,
                'showRealizadaRespostaIndividuais': false,
                'bolSimulada': false,
                'onCloseMensagem' : undefined,
                'textoExtraMensagem' : '<br />Irá reinicializar',
                'onClose' : undefined,
                'etapaAtual' : ''
            };

            return this.each(function () {
                var $this = $(this);
                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }

                caminhoBase =  $this.data('settings').caminhoBase;

                $this.avaliacoesRealizacao('atualizarSessao');

                //chamada para quando fechar a janela
                //$(window).bind("beforeunload", function (event) {
                //


                ////observa as requisições ajax
                //$('body').ajaxSuccess
                //
                var requestAjax = false;
                $('body').ajaxStart(function (e, xhr, settings) {
                    requestAjax = true;
                });
                $('body').ajaxSuccess(function (e, xhr, settings) {
                    requestAjax = false;
                });
                $(window).bind("beforeunload", function (event) {

                    if(requestAjax)
                        return;

                    if(window.opener && window.opener.onCloseRealizacao){
                        window.opener.onCloseRealizacao($this.data('settings').etapaAtual, $this.data('settings').idAplicacao, $this.data('settings').idConfig, $this.data('settings').idProvaRealizada)
                    }

                    if($this.data('settings').onClose){
                        $this.data('settings').onClose(event, $this.data('settings').etapaAtual);
                    }

                    //chamar o jquery somente se estiver realizado
                    if($this.data('settings').etapaAtual == 'realizar'){
                        if (!$this.data('settings').bolSimulada) {
                            
                            $.ajax({
                                url: $this.data('settings').caminhoBase + '/Realizacao/Close/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig,
                                type: "GET",
                                success: function (dados, status, xhttp) {  }
                            });
                        }
                        //return 'Tem certeza que deseja fechar?';
                        return 'Tem certeza que deseja fechar?';
                    }
                    
                    

                    return;
                    //
                    

                    
                });

            });

        },

        iniciar: function (options) {
            var $this = $(this);
            if ($this.data('settings').idAplicacao <= 0) {
                throw "defina uma aplicação";
            }

            $this.data('settings').etapaAtual = 'iniciar';

            var carregando = $this.data('settings').carregando;

            var url = $this.data('settings').caminhoBase + '/Realizacao/Iniciar/';

            if ($this.data('settings').bolSimulada) {
                url = $this.data('settings').caminhoBase + '/Realizacao/IniciarSimulada/';
            }

            $.ajax({
                url: url + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig,
                type: "GET",
                success: function (dados, status, xhttp) { retornoIniciar(dados); }
            });

            function retornoIniciar(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, true)) {
                    return;
                }

                var inicioHabilitado = $this.find('#btnIniciar').attr("data-habilitado");

                if ( inicioHabilitado == 'True' || $this.data('settings').bolSimulada ){
                    $this.find('#btnIniciar').click(validarIniciar).removeAttr('href');
                }else{
                    $this.find('#btnIniciar').addClass("btnCinza_desabilitado").removeAttr('href');
                }

                $this.find('#btnSair').click(sairIniciar).removeAttr('href');

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
            
            /*console.log("Realizar", options);*/
            
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            carregando.mostrar();
            
            var dlgInstrucao;

            var paginacao = undefined;
            var qAtual = 0;

            if ($this.data('settings').bolSimulada) {
                var url = $this.data('settings').caminhoBase + '/Realizacao/RealizarSimular/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;
            } else {
                var url = $this.data('settings').caminhoBase + '/Realizacao/Realizar/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;
            }

            if (options) {
                if (options.url) {
                    url = $this.data('settings').caminhoBase + options.url + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;
                }else{
                    $this.data('settings').etapaAtual = 'realizar';
                }
                if (options.questao) {
                    qAtual = options.questao;
                    url += "/" + qAtual;
                }
                if ($this.data('settings').idProvaRealizada) {

                    url = $this.data('settings').caminhoBase + options.url + $this.data('settings').idProvaRealizada;
                }
            }else{
                $this.data('settings').etapaAtual = 'realizar';
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

                $("#boxInstrucao").hide();

                inicializarInstrucao();
                inicializarEncerrar();
                inicializarRefazer();
                inicializarResumo();
                inicializarRespostas();
                //carregando.esconder();
                inicializarTempo();
            };
            function retornoCarregarQuestaoErro(dados) {
                $this.avaliacoesRealizacao('_retornos', dados, false)
            };
            function retornoCarregarQuestao(dados) {
                if ($this.data('settings').retornoCarregarQuestao) {
                    $this.data('settings').retornoCarregarQuestao();
                }

                //montar o grafico
                carregarGrafico()

                //caso esteja no modo para não ver as respostas do usuario
                if (!$this.data('settings').showRealizadaRespostas) {
                    $this.find('.marcado').removeClass('marcado')
                    $this.find('textarea').val('');
                }
                if (!$this.data('settings').showRealizadaResumo) {
                    $this.find('#btnResumo').remove()
                }
                if (!$this.data('settings').showRealizadaRespostaIndividuais) {
                    $this.find('#btnRespostas').remove()
                }

                carregando.esconder();
            };
            function carregarGrafico() {
                if ($this.find('#graficoFusionChart').length > 0) {
                    $.ajax({
                        url: $this.data('settings').caminhoBase + $this.find('#graficoPath').val(),
                        type: "POST",
                        success: function (dados, status, xhttp) {
                            retornoCarregarGrafico(dados);
                        }
                    });

                }

            }

            function retornoCarregarGrafico(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, false)) {
                    return;
                }
                if ($(dados).hasClass('vazio')) {
                    $this.find('#graficoFusionChart').html(dados);
                    return;
                }
                $this.find('#graficoFusionChart').insertFusionCharts({
                    swfPath: $this.data('settings').caminhoBase + "/Charts/",
                    type: $this.find('#graficoTipo').val(),
                    data: dados,
                    dataFormat: "XMLData",
                    width: "600",
                    height: "350",
                    useLabels: false,
                    labelSourceIndex: false
                });
            };

            function inicializarInstrucao() {

                $this.find(".iconeInstrucao #btnInstrucao").click(exibirInstrucao).removeAttr('href');
                $this.find("#btnInstrucaoFechar").click(fecharInstrucao).removeAttr('href');

                var lnkImprimir = $this.find("#btnInstrucaoImprimir").attr('href');
                $this.find('#btnInstrucaoImprimir').click( function(){$this.avaliacoesRealizacao('_imprimir', lnkImprimir);}).removeAttr('href');

                //caso não tenha na pagina o jqueryui
                $("#boxInstrucao").hide();
                try{
                    dlgInstrucao = $this.find("#boxInstrucao").dialog({
                        dialogClass: 'SEC025_DIALOG',
                        autoOpen: false, modal: true,
                        width: 750,
                        position: ['center', 'center'],
                        draggable: false, resizable: false
                    });
                }catch(e){
                    $("#boxInstrucao").remove();
                }


            };
            function exibirInstrucao() {
                try{
                    dlgInstrucao.dialog('open');
                }catch(e){}
            };
            function fecharInstrucao() {
                try{
                    dlgInstrucao.dialog('close');
                }catch(e){}
            }
            /* Encerrar */
            function inicializarEncerrar() {
                $this.find("#boxEncerrar").hide();
                $this.find("#btnEncerrar").click(exibirEncerrar).removeAttr('href');

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
                
                carregando.esconder();
                if (!$this.avaliacoesRealizacao('_retornos', dados, false)) {
                    return;
                }

                $this.find("#boxEncerrar").html($(dados)).removeClass('carregando');

                efeitoBtn("btnCinza");
                efeitoBtn("btnAzul");
                efeitoBtn("btnVerde");
                efeitoBtn("btnDourado");

                $this.find("#boxEncerrar .navegaPaginacao a.btnPaginacao").each(function () {
                    var tmpId = $(this).attr('href');
                    $(this).click(function () {
                        paginacao.trocarQuestao(tmpId);
                        exibirEncerrar();
                    }).removeAttr('href');
                });
                $this.find("#btnEncerrarNao").click(exibirEncerrar).removeAttr('href');
                $this.find("#btnEncerrarSim").click(confirmarEncerrar).removeAttr('href');
            };

            function confirmarEncerrar() {
                $this.avaliacoesRealizacao('_finalizar');
            }
            /* refazer */
            //Talvez nao seja mais necessário~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Verificar se não é usado em outro lugar... se nao trocar por Resumo
            function inicializarRefazer() {
                $this.find("#btnRefazer").click(refazer).removeAttr('href');
            }
            function inicializarResumo() {
                $this.find("#btnResumo").click(resumo).removeAttr('href');
            }
            function resumo() {

                if ( options.urlFinalizar ){
                    options.urlVisualizar = options.url;
                    options.url = options.urlFinalizar;
                }

                $this.avaliacoesRealizacao('_finalizar', options);
            }
            function inicializarRespostas() {

                $this.find("#dlgRealizadores").hide();
                $this.find("#btnRespostas").click(respostas).removeAttr('href');
            }
            function respostas() {
                if ($this.find("#dlgRealizadores").is(":visible")) {
                    $this.find("#dlgRealizadores").hide();
                    return;
                }
                if ($.trim($this.find("#listaRealizadores").html()).length == 0) {

                    $.ajax({
                        url: $this.data('settings').caminhoBase + '/Realizacao/QuemRealizou/' + $this.data('settings').idProvaRealizada,
                        type: "GET",
                        cache: false,
                        success: function (dados, status, xhttp) { retornoQuemRealizou(dados); }
                    });
                }

                $this.find("#dlgRealizadores").show();
                //
            }
            function retornoQuemRealizou(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, false)) {
                    return;
                }

                $this.find("#listaRealizadores").html(dados);

                $this.find("#listaRealizadores a").click(function (e) {
                    var tmpId = parseInt($(this).attr('href'), 10);
                    if (tmpId > 0) {
                        $this.data('settings').idProvaRealizada = tmpId;
                        $this.data('settings').showRealizadaRespostas = true;
                        $this.find("#idProvaRealizacao").val(tmpId);
                    } else {
                        $this.data('settings').showRealizadaRespostas = false
                    }

                    $this.find("#listaRealizadores a").removeClass('ativo');

                    $(this).addClass('ativo');

                    paginacao.trocarQuestao(paginacao.questaoAtual);

                    $this.find("#dlgRealizadores").hide();

                    e.preventDefault();
                });
            }
            function refazer() {
                
                if ($this.data('settings').bolSimulada) {
                    var options = { url: "/Realizacao/RefazerSimulada/" }
                } else {
                    var options = { url: "/Realizacao/Refazer/" }
                }
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

            function escolherRealizador(id) {
                alert(id)
            };

            var tempo = 0;
            function inicializarTempo(){
                if($this.find('#boxTempo').length > 0){
                    var boxTempo = $this.find('#boxTempo');
                    tempo = parseInt(boxTempo.find('#contaTempoSeg').val(),10);
                    boxTempo.html('');

                    renderTempo();
                    //verifica se acabou o tempo e chama o encerramento por tempo
                    
                    setTimeout(atualizaTempo,1000);
                }
            }

            function renderTempo(){
                if($this.find('#boxTempo').length > 0){
                     var boxTempo = $this.find('#boxTempo');
                     var tempoRender = secondsToTime(tempo < 0 ? 0 : tempo);
                     boxTempo.html('<span class="tempoHr">' + (tempoRender.h < 10 ? '0' + tempoRender.h : tempoRender.h ) + '</span><span class="divHrMin">:</span>' + 
                                   '<span class="tempoMin">' + (tempoRender.m < 10 ? '0' + tempoRender.m : tempoRender.m ) + '</span><span class="divMinSeg">:</span>' +
                                   '<span class="tempoSeg">' + (tempoRender.s < 10 ? '0' + tempoRender.s : tempoRender.s ) + '</span>');
                }
            }

            function atualizaTempo(){
                if($this.find('#boxTempo').length <= 0){
                    return;
                }
                if(tempo <= 0){
                    carregando.mostrar();
                    $.ajax({
                        url: $this.data('settings').caminhoBase + '/Realizacao/FinalizarTempo/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig,
                        type: "GET",
                        cache: false,
                        success: function (dados, status, xhttp) { retornoFinalizarTempo(dados); }
                    });
                    return;
                }
                tempo--;
                renderTempo()
                setTimeout(atualizaTempo,1000);
            }
            
            function secondsToTime(secs)
            {
                var hours = Math.floor(secs / (60 * 60));
   
                var divisor_for_minutes = secs % (60 * 60);
                var minutes = Math.floor(divisor_for_minutes / 60);
 
                var divisor_for_seconds = divisor_for_minutes % 60;
                var seconds = Math.ceil(divisor_for_seconds);
   
                var obj = {
                    "h": hours,
                    "m": minutes,
                    "s": seconds
                };
                return obj;
            }

            function retornoFinalizarTempo(dados){
                if (!$this.avaliacoesRealizacao('_retornos', dados, false)) {
                    return;
                }

                if($(dados).hasClass('naoacabou')){
                    carregando.esconder();
                    atualizaTempo();
                }
            }

            return $this;
        },

        visualizar: function (options) {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            $this.data('settings').etapaAtual = 'visualizar';

            if(options && options.questao){
                var idQuestao = options.questao
                var options = { url: "/Realizacao/VisualizarViewRealizacao/" }
                options.questao = idQuestao;
                $this.avaliacoesRealizacao('realizar', options);
            }else{
                var options = { url: $this.data('settings').caminhoBase + '/Realizacao/FinalizarViewRealizada/' + $this.data('settings').idProvaRealizada,
                    urlVisualizar: "/Realizacao/VisualizarViewRealizacao/"
                };
                $this.avaliacoesRealizacao('_finalizar', options);
            }
            
        },

        visualizardireto: function (options) {
            var $this = $(this);

            if(options && options.questao){
                var idQuestao = options.questao
                var options = { url: "/Realizacao/VisualizarViewRealizacaoDireta/" }
                options.questao = idQuestao;
            }else{
                var options = { url: "/Realizacao/VisualizarViewRealizacaoDireta/" }
            }

            $this.data('settings').etapaAtual = 'visualizar';

            $this.avaliacoesRealizacao('realizar', options);
        },


        _finalizar: function (options) {

            /*console.log("_finalizar", options);*/

            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            carregando.mostrar();

            $this.data('settings').etapaAtual = 'finalizar';

            if ($this.data('settings').bolSimulada) {
                var urlFinalizar = $this.data('settings').caminhoBase + '/Realizacao/FinalizarSimulada/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;
                var urlVisualizar = "/Realizacao/VisualizarRealizadaSimulada/";

            } else {
                var urlFinalizar = $this.data('settings').caminhoBase + '/Realizacao/Finalizar/' + $this.data('settings').idAplicacao + '/' + $this.data('settings').idConfig;
                var urlVisualizar = "/Realizacao/Visualizar/";
            }

            if (options) {
                if (options.url) {
                    urlFinalizar = options.url;
                    urlVisualizar = options.urlVisualizar
                }
            }

            $.ajax({
                url: urlFinalizar,
                type: "POST",
                success: function (dados, status, xhttp) { retornoFinalizar(dados); }
            });

            function retornoFinalizar(dados) {
                if (!$this.avaliacoesRealizacao('_retornos', dados, true)) {
                    return;
                }
                if ($this.data('settings').showFecharFinalizar) {
                    $this.find('#btnFechar').click(fechar).removeAttr('href');
                } else {
                    $this.find('#btnFechar').remove();
                }

                var lnkImprimir = $this.find('#btnImprimir').attr('href')

                $this.find('#btnImprimir').click( function(){$this.avaliacoesRealizacao('_imprimir', lnkImprimir);}).removeAttr('href');

                $this.find('#btnView.btnView').click(function () { visualizar(); }).removeAttr('href');
                $this.find('#btnRefazer.btnRefazer').removeAttr('href').click(refazer);
                $this.find('#btnReabrir.btnReabrir').removeAttr('href').click(reabrir);

                $this.find("#boxRefazer #btnRefazerSim").removeAttr('href').click(refazerSim);

                $this.find("#boxRefazer #btnRefazerNao").removeAttr('href').click(refazerNao);

                $this.find("#boxRefazer").hide();

                carregando.esconder();
                var qtd = $this.find(".boxProtocolo .btns a").length;
                if (qtd != 0) {
                    $this.find(".boxProtocolo .btns").css("width", (140 * qtd));
                }
                var bolFinalizar = options ? options.bolFinalizar : true;

                if(bolFinalizar){
                    if ($this.data('settings').retornoFinalizar) {
                        $this.data('settings').retornoFinalizar();
                    }

                    if(window.opener && window.opener.onFinalizarRealizacao){
                        window.opener.onFinalizarRealizacao($this.data('settings').idAplicacao, $this.data('settings').idConfig, $this.data('settings').idProvaRealizada)
                    }
                }
                $this.find(".boxConteudoResumo .navegaPaginacao a.btnPaginacao").each(function () {
                    var tmpId = $(this).attr('href');
                    $(this).removeAttr('href').click(function () {
                        visualizar(tmpId);
                    });
                });

            };


            function visualizar(pagAtual) {
                var options = { url: urlVisualizar, urlFinalizar: urlFinalizar }

                if (pagAtual) {
                    options["questao"] = pagAtual;
                } else {
                    options["questao"] = 0;
                }
                $this.data('settings').etapaAtual = 'visualizar';
                $this.avaliacoesRealizacao('realizar', options);
            };

            function refazer() {
                $this.find("#areaConteudo").hide();
                $this.find("#boxRefazer").show();
            };

            function refazerNao() {
                $this.find("#areaConteudo").show();
                $this.find("#boxRefazer").hide();
            }
            function refazerSim() {
                if ($this.data('settings').bolSimulada) {
                    var options = { url: "/Realizacao/RefazerSimulada/" }
                } else {
                    var options = { url: "/Realizacao/Refazer/" }
                }
                $this.data('settings').etapaAtual = 'realizar';
                $this.avaliacoesRealizacao('realizar', options);
            }

            function reabrir() {
                var options = { url: "/Realizacao/Reabrir/" }
                 $this.data('settings').etapaAtual = 'realizar';
                $this.avaliacoesRealizacao('realizar', options);
            };

            function fechar() {
                if ($this.data('settings').callFecharFinalizar) {
                    $this.data('settings').callFecharFinalizar();
                    return;
                }
                window.close();
            };

            

        },
        _imprimir : function(lnk) {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            carregando.mostrar();
            $.ajax({
                url: caminhoBase + lnk,
                type: "GET",
                cache: false,
                success: function (dados, status, xhttp) { 
                    if (!$this.avaliacoesRealizacao('_retornos', dados, false)) {
                        return;
                    }
                    carregando.esconder();

                    if($(dados).attr('id') == 'download'){
                        window.location = $(dados).text();
                        //alert($(dados).text());
                    }
                    
                }
            });
        },

        _retornos: function (dados, showDados) {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            var mensagem = $this.data('settings').mensagem;

            mensagem.onClose = function(){
                if($this.data('settings').onCloseMensagem){
                    $this.data('settings').onCloseMensagem();
                }else{
                    mensagem.recarregar();
                }
            }

            mensagem.onReload = function(){
                if ($this.data('settings').retornoRedirectLogin) {
                    $this.data('settings').retornoRedirectLogin();
                } else {
                    mensagem.recarregar();
                }
                return false;
            }
            if ($(dados).hasClass('erro')) {
                if ($this.data('settings').showMensagem || !$this.data('settings').retornoMensagem) {
                    mensagem.exibir($(dados),$this.data('settings').textoExtraMensagem);
                }
                if ($this.data('settings').retornoMensagem) {
                    $this.data('settings').retornoMensagem($(dados).html());
                }

                carregando.esconder();

                return false;
            }
            if ($(dados).hasClass('aviso')) {
                
                mensagem.exibir($(dados));
            }
            if ($(dados).hasClass('tentativas')) {
                var bolFinalizar = $(dados).text() == 'finalizar';
                $this.avaliacoesRealizacao('_finalizar', {bolFinalizar:bolFinalizar});
                return false;
            }
            if($(dados).hasClass('cancelada')){
                $this.html($(dados).html());
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
                        success: function (dados, status, xhttp) { }
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

