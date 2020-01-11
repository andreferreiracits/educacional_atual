var realizadorDAL; //aqui vai depender da camada implementada no momento
var FUNCAO_VAZIA = 'javascript:;';

(function ($) {

    var ETAPA_REALIZANDO = 'Realizar';
    var ETAPA_RESUMO = 'Resumo';
    var ETAPA_VIEW = 'Visualizar';

    var LOG_ERROR = 1;
    var LOG_WARN = 2;
    var LOG_DEBUG = 3;

    var methods = {

        init: function (options) {
            var settings = {
                /* componentes alteraveis */
                'carregando': new Carregando("SEC025-11-carregandoGeral"),
                'mensagem': new Mensagem('SEC025-11-alerta'),
                /*parametros*/
                'idAplicacao': 0,
                'caminhoBase': "./",
                'alertDebug':0
            };

            return this.each(function () {
                var $this = $(this);

                
                //var carregando = telas
                /*variaveis internas pra controle*/
                $this.data('etapaAtual', '');
                $this.data('questaoAtual', 0);

                if (options) {
                    $this.data('settings', $.extend(settings, options));
                } else {
                    $this.data('settings', settings);
                }

                if (!realizadorDAL)
                    realizadorDAL = new RealizadorDAL($this.data('settings').caminhoBase);

                realizadorDAL.alertDebug = $this.data('settings').alertDebug;
                if($this.data('settings').alertDebug >= LOG_DEBUG && enableApiDebug){
                    enableApiDebug();
                }
                $(window).bind("beforeunload", function (event) {

                    //chamar o jquery somente se estiver realizado
                    if ($this.data('etapaAtual') == ETAPA_REALIZANDO) {

                        realizadorDAL.Close($this.data('settings').idAplicacao);

                        return 'Tem certeza que deseja fechar?';
                    }

                    return;

                });

            });

        },

        //acoes: realizar, encerrar, visualizar, refazer, resumo

        realizar: function (options) {
            
            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            carregando.mostrar();

            realizadorDAL.init(function(){
                $this.data('etapaAtual', ETAPA_REALIZANDO);

                if (options && options.questao) {
                    $this.data('questaoAtual', options.questao)
                }

                realizadorDAL.Realizar($this.data('settings').idAplicacao, retornoRealizar);    
            });

            function retornoRealizar(status, dados, questoes) {
                
                if (!$this.avaliacoesRealizacao('_retornos', status))
                    return;

                //descobre o que voltou:
                var tipoRetorno = $(dados).attr('id');
                $this.avaliacoesRealizacao('_render', dados);

                if(tipoRetorno == 'realizar'){
                    $this.avaliacoesRealizacao('_realizar', dados, questoes);
                }else if(tipoRetorno == 'resumo'){
                    $this.avaliacoesRealizacao('_resumo', dados, questoes);
                }
            }

        },

        refazer: function () {

            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            $this.data('questaoAtual', 0);

            carregando.mostrar();

            $this.data('etapaAtual', ETAPA_REALIZANDO);

            realizadorDAL.Refazer($this.data('settings').idAplicacao, retornoRefazer);

            function retornoRefazer(status, dados, questoes) {
                if (!$this.avaliacoesRealizacao('_retornos', status))
                    return;


                $this.avaliacoesRealizacao('_render', dados);
                $this.avaliacoesRealizacao('_realizar', dados, questoes);
            }

        },

        visualizar: function () {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            $this.data('etapaAtual', ETAPA_VIEW);

            carregando.mostrar();
            realizadorDAL.Visualizar($this.data('settings').idAplicacao,retornoVisualizar);

            function retornoVisualizar(status, dados, questoes) {
                
                if (!$this.avaliacoesRealizacao('_retornos', status))
                    return;

                $this.avaliacoesRealizacao('_render', dados);
                $this.avaliacoesRealizacao('_realizar', dados, questoes);
            }
        },

        resumo : function() {
           
            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            carregando.mostrar();

            $this.data('etapaAtual', ETAPA_RESUMO);

            realizadorDAL.Resumo($this.data('settings').idAplicacao, retornoResumo);
           
            function retornoResumo(status, dados, questoes) {
            
               
                if (!$this.avaliacoesRealizacao('_retornos', status)) 
                    return;

               
                //descobre o que voltou:
                $this.avaliacoesRealizacao('_render', dados);

               
                $this.avaliacoesRealizacao('_resumo', dados, questoes);
            }
        },
        encerrar: function () {
            var $this = $(this);
            var carregando = $this.data('settings').carregando;
            carregando.mostrar();

            realizadorDAL.Encerrar($this.data('settings').idAplicacao, function(status){

                carregando.esconder();
               
                if(!$this.avaliacoesRealizacao('_retornos', status))
                    return

                $this.avaliacoesRealizacao('resumo');
                
            });


        },


        _realizar: function (dados, questoes) {
            
            if(!questoes)
                throw "lista de questões indefinida";

            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            var lstTipos = $(dados).attr('tipos').split(',');
            
            //caso tenha excluido uma questão do fim da fila
            if($this.data('questaoAtual') >= questoes.length){
                $this.data('questaoAtual',questoes.length - 1)
            }
            var paginacao = new Realizacao($this, lstTipos, $this.data('questaoAtual'), questoes, $this.data('etapaAtual'));
            paginacao.retornoCarregar = retornoCarregarQuestao;
            paginacao.retornoErro = retornoCarregarQuestaoErro;

            inicializarEncerrar();
            inicializarResumo();

            realizadorDAL.Online(function(onLine){

                if(onLine){
                    $this.find("#btnEncerrar").show();
                    $this.find("#btnSinc").show();
                }
            });
            //carregando.esconder();

            $this.find("#btnEncerrar").click(exibirEncerrar).removeAttr('href');
            $this.find("#btnSinc").click(sincronizar).removeAttr('href');



            /* callback de carregar questão */
            function retornoCarregarQuestaoErro(status) {
                $this.avaliacoesRealizacao('_retornos', status)
            };
            function retornoCarregarQuestao(status, dados) {
                $this.data('questaoAtual', paginacao.questaoAtual);
                carregando.esconder();
            };

            /* Encerrar */
            function inicializarEncerrar() {
                $this.find("#boxEncerrar").hide();

                $this.find("#btnEncerrar").hide();
                $this.find("#btnSinc").hide();
            };

            

            function exibirEncerrar() {
                
                if ($this.find("#boxListaQuestoes").css('display') != 'none') {
                    $this.find("#btnListaQuestao").trigger("click");
                }

                $this.find("#boxEncerrar").toggle();
                $this.find("#boxAreaRealizacao").toggle();

                if ($this.find("#boxEncerrar").is(':visible')) {
                    carregando.mostrar();
                    $this.find("#boxEncerrar").html('');
                    realizadorDAL.ListaEncerrar(retornoListaEncerrar);
                }

            };

            function retornoListaEncerrar(status, dados) {
                if (!$this.avaliacoesRealizacao('_retornos', status))
                    return;

                var conteudo = $(dados);

                var lista = paginacao.ListaAberta();
                if(lista.length <= 0){
                    conteudo.find("#listaQuestoesEncerrar").html("");
                    conteudo.find(".msgEncerrar1").hide();
                    conteudo.find(".msgEncerrar2").show();
                }else{
                    conteudo.find("#listaQuestoesEncerrar .navegaPaginacao ul").html("");
                    $this.find("#tmplListaQuestoes").template();

                    conteudo.find(".msgEncerrar2").hide();
                    conteudo.find(".msgEncerrar1").show();

                    conteudo.find("#listaQuestoesEncerrar .navegaPaginacao ul").append(
                        $this.find("#tmplListaQuestoes")
                                    .tmpl(paginacao.ListaAberta())
                                );
                }

                $this.find("#boxEncerrar").html(conteudo);

                carregando.esconder();

                efeitoBtn("btnCinza");
                efeitoBtn("btnAzul");
                efeitoBtn("btnVerde");
                efeitoBtn("btnDourado");

                $this.find("#boxEncerrar .navegaPaginacao a.btnPaginacao").each(function () {
                    var tmpId = parseInt($(this).attr('href').split('in=')[1], 10);
                    $(this).click(function () {
                        paginacao.trocarQuestao(tmpId);
                        exibirEncerrar();
                    }).removeAttr('href');
                });
                $this.find("#btnEncerrarNao").click(exibirEncerrar).removeAttr('href');
                $this.find("#btnEncerrarSim").click(confirmarEncerrar).removeAttr('href');
            };

            function confirmarEncerrar() {
                $this.avaliacoesRealizacao('encerrar');
            };

            function inicializarResumo() {
                $this.find("#btnResumo").click(function(){
                    $this.avaliacoesRealizacao('resumo');
                }).removeAttr('href');
            };


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

            function sincronizar(){
                
                carregando.mostrar();
                $(carregando.id).find("p").html('<span class="loadImg"></span>Aguarde, sincronizando...');
                //return;

                realizadorDAL.Sincronizar($this.data('settings').idAplicacao, function(status){
                    $(carregando.id).find("p").html('<span class="loadImg"></span>Aguarde, carregando...');
                    carregando.esconder();
                    
                    if(!$this.avaliacoesRealizacao('_retornos', status))
                        return;

                    $this.avaliacoesRealizacao('realizar', {questao:$this.data('questaoAtual')});
                });

            };

            return $this;
        },

        _resumo: function (dados, questoes) {
            
            var $this = $(this);
            var carregando = $this.data('settings').carregando;

            $this.data('etapaAtual', ETAPA_RESUMO);

            $this.find('#btnView.btnView').click(function () { visualizar(0); }).removeAttr('href');
            $this.find('#btnRefazer.btnRefazer, #btnAutoEstudo.btnRefazer').removeAttr('href').click(refazer);

            $this.find("#boxRefazer #btnRefazerSim").removeAttr('href').click(refazerSim);
            $this.find("#boxRefazer #btnRefazerNao").removeAttr('href').click(refazerNao);

            $this.find("#boxRefazer").hide();

            carregando.esconder();

            $this.find(".boxConteudoResumo .navegaPaginacao ul").html("");

            $this.find("#tmplListaQuestoes").template();

            $this.find(".boxConteudoResumo .navegaPaginacao ul").append(
                $this.find("#tmplListaQuestoes").tmpl(questoes)
            );

            $this.find(".boxConteudoResumo .navegaPaginacao a.btnPaginacao").each(function () {
                var tmpId = parseInt($(this).attr('href').split('in=')[1],10);
                $(this).removeAttr('href').click(function () {
                    visualizar(tmpId);
                });
            });

            function visualizar(pagAtual) {

                $this.data('questaoAtual', pagAtual)

                $this.avaliacoesRealizacao('visualizar');

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
                $this.avaliacoesRealizacao('refazer');
            }


            return $this;
        },

        /*
        testa o retorno
        */
        _retornos: function (statusJson) {
            if(statusJson.sucess){
                return true;
            }
            var $this = $(this);
            var mensagem = $this.data('settings').mensagem;
            var carregando = $this.data('settings').carregando;
            
            //ocorreu um erro
            var msg = mensagem.htmlTemplate("Avaliações",true, statusJson.erro.msg, 'alerta');
            mensagem.exibir($(msg));
            carregando.esconder();
            return false;
        },

        /*
        renderiza o retorno
        */
        _render: function (dados) {

            var $this = $(this);
            $this.html($(dados).html());
        },

        /*
        debugar 
        */
        _debug: function (msg, tipo) {
        
            var $this = $(this);
            if($this.data('settings').alertDebug >= tipo ){
                alert(msg);
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