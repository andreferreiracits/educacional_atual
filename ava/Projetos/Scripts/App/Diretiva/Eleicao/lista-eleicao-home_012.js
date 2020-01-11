"use strict"
angular.module('Etapa').directive('listaEleicaoHome', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/lista-eleicao-home.html',
        scope: {},
        /*{
            objEtapas: "=objEtapas",
            objEdicao: "=objEdicao",
            defaultConfig: "=defaultConfig"
        },*/
        link: function (scope, el, attr) {

        },
        controller: ['$http', '$scope', '$timeout', '$filter', '$modal', 'constantes', 'projetoTools', function ($http, $scope, $timeout, $filter, $modal, constantes, projetoTools) {
            var self = this;
            var entrou_tooltip = false;

            $scope.projetoTools = projetoTools;

            $scope.clickEvt = "click";
            $scope.overEvt = "mouseover";
            $scope.outEvt = "mouseout";

            $scope.ctrlRajadaEvento = undefined;
            $scope.ctrlAudio = undefined;

            $scope.bolMobile = projetoTools.isMobile();
            $scope.bolDesktop = projetoTools.isDesktop();
            $scope.bolInicializado = false;
            
            $scope.faseEleicao = 0;
            $scope.situacaoEtapaFinal = 0;
            $scope.audioVencedor = 0;
            $scope.etapaCorrente = undefined;
            $scope.etapaFinal = undefined;
            $scope.objUsuario = angular.copy(constantes.Usuario);
            $scope.defaultConfig = angular.copy(constantes.DefaultConfig);
            $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
            $scope.objEdicao = angular.copy(constantes.Edicao);
            $scope.objEtapas = angular.copy(constantes.Edicao.Etapas);
            $scope.tipoEleicao = "Candidato";
            
            this.preInit = function () {
                //remapeia as funções para essa controller e para o escopo atual
                var initApi = true;
                if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(self);
                    projetoTools.extendFunctions($scope);
                }

                if(angular.isArray($scope.edicaoConfig.GruposCategorias[0].Categorias[0].Subcategorias)) if($scope.edicaoConfig.GruposCategorias[0].Categorias[0].Subcategorias.length>0){
                    //base de partidos
                    $scope.partidosCandidatos = $scope.edicaoConfig.GruposCategorias[0].Categorias;
                }
                else{
                    //baseado em candidatos
                }

                if ($scope.objEtapas != undefined) {
                    if ($scope.objEtapas.length > 1) {
                        //preparação dos dados
                        $scope.tipoEleicao = "Candidato";
                        for(var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias){
                            var slug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                            $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Slug = slug;
                            if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias) if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias instanceof Array) if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.length > 0) {
                                $scope.tipoEleicao = "Partido";
                                for(var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias.Subcategorias) {
                                    var subSlug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Descricao).replace(/-/g," ")).replace(/\s/g,"");
                                    $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Slug = subSlug;
                                }
                            }
                        }

                        //adequa as datas
                        angular.forEach($scope.objEtapas, function (valor, chave) {
                            if (typeof (valor.DataInicio) == "string") if (!(valor.DataInicio instanceof Date)) if (valor.DataInicio.indexOf("/") != -1) {
                                $scope.objEtapas[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                                $scope.objEtapas[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                                $scope.objEtapas[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                            }
                        });
                        $scope.etapaCorrenteAtiva = projetoTools.getEtapaCorrente($scope.objEtapas,false);
                        if ($scope.etapaCorrenteAtiva) {
                            $scope.etapaUltimaEtapaOcorreu = $scope.etapaCorrenteAtiva;
                        }
                        else {
                            $scope.etapaUltimaEtapaOcorreu = projetoTools.getEtapaCorrente($scope.objEtapas,true);
                        }
                        if($scope.etapaUltimaEtapaOcorreu) if($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao) if($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao>0)
                            $scope.faseEleicao = $scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao;
                        //$scope.etapaFinal = angular.copy($scope.objEtapas[$scope.objEtapas.length - 1]);
                        $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEtapas));
                        $scope.situacaoEtapaFinal = self.situacaoEtapa($scope.etapaFinal);

                        if($scope.situacaoEtapaFinal == 4){
                            //busca o áudio de quem ganhou
                            if($scope.audioVencedor==0){
                                self.getResultado(function(retorno){
                                    //console.log(retorno);
                                    if(angular.isArray(retorno.dados) && projetoTools.hasArrayElems(retorno.dados) && angular.isDefined(retorno.dados[0].Ordem))
                                        $scope.audioVencedor = retorno.dados[0].Ordem;
                                });
                            }
                        }                        
                    }
                }
            };

            this.getResultado=function(callback){
                var retorno = {
                    dados: undefined,
                    config: undefined,
                    definitions: undefined
                };
                //faz a requisição pelos dados remotamente
                $http({
                    url: '/AVA/Resultados/Servico/GetResultadoEdicaoEtapa',
                    params: {
                        idEdicao: $scope.objEdicao.Id,
                        idEtapa: $scope.etapaFinal.Id
                    },
                    method: "GET"
                }).success(function (response) {
                    var data = angular.copy(self.getObject(response));
                    if (data) {
                        if (data.dados)
                            retorno.dados = angular.copy(self.getObject(data.dados));
                        projetoTools.cb($scope, callback, angular.copy(retorno));
                    }
                });
            };

            this.initBinders = function () {
                //em desktop trata a exibição do tooltip por hover
                if ($scope.bolDesktop && !$scope.bolMobile) {
                    $scope.clickEvt = "click";
                    $scope.overEvt = "mouseover";
                    $scope.outEvt = "mouseout";
                    var els = angular.element(".comite.aberto, .comite.aberto > a, .comite.aberto > div.img_comite, .tooltip_turmas, .tooltip_turmas *");
                    angular.forEach(els, function (el) {
                        angular.element(el).unbind($scope.overEvt);
                        angular.element(el).bind($scope.overEvt, function (evt) {

                            if ($scope.ctrlRajadaEvento) {
                                $timeout.cancel($scope.ctrlRajadaEvento);
                                $scope.ctrlRajadaEvento = undefined;
                            }
                            var elt = evt.target;
                            var elm = angular.element(elt);
                            var inTip = false;
                            if (angular.element(elm).closest(".tooltip_turmas").length > 0) {
                                inTip = true;
                                if (angular.element(elm).closest(".tooltip_turmas").hasClass('tooltip_turmas')) {
                                    entrou_tooltip = true;
                                }
                            }
                            if (!inTip) {
                                angular.element(".comite.aberto").children(".tooltip_turmas").hide();
                                entrou_tooltip = false;
                            }
                            $scope.ctrlRajadaEvento = $timeout(function (event) {
                                angular.element(elm).closest('article').children(".tooltip_turmas").show();
                            }, 150);
                        });

                        angular.element(el).unbind($scope.outEvt);
                        angular.element(el).bind($scope.outEvt, function (evt) {
                            if ($scope.ctrlRajadaEvento) {
                                $timeout.cancel($scope.ctrlRajadaEvento);
                                $scope.ctrlRajadaEvento = undefined;
                            }
                            var elt = evt.target;
                            var elm = angular.element(elt);
                            if (angular.element(elm).hasClass('tooltip_turmas'))
                                entrou_tooltip = false;
                            $scope.ctrlRajadaEvento = $timeout(function (event) {
                                if (!entrou_tooltip)
                                    angular.element(".comite.aberto").children(".tooltip_turmas").hide();
                            }, 150);
                        });
                    });
                }
                //em touchdevice trata a exibição do tooltip por ativar/destivar no toque
                if ($scope.bolMobile) {
                    $scope.clickEvt = "touchend";
                    $scope.overEvt = "touchstart";
                    $scope.outEvt = "touchend";


                    var els = angular.element(".comite.aberto, .comite.aberto > a, .comite.aberto > div.img_comite");
                    angular.forEach(els, function (el) {
                        angular.element(el).unbind($scope.clickEvt);
                        angular.element(el).bind($scope.clickEvt, function (evt) {
                            if ($scope.ctrlRajadaEvento) {
                                $timeout.cancel($scope.ctrlRajadaEvento);
                                $scope.ctrlRajadaEvento = undefined;
                            }
                            $scope.ctrlRajadaEvento = $timeout(function (event) {
                                var elt = evt.target;
                                var elm = angular.element(elt);
                                var bolSelfOpened = false;
                                var childs = angular.element(".comite.aberto").children(".tooltip_turmas");
                                angular.forEach(childs, function (child) {
                                    if (angular.element(child).is(":visible") && angular.element(child).closest('article').attr("id") == angular.element(elm).closest('article').attr("id")) {
                                        bolSelfOpened = true;
                                    }
                                });

                                angular.element(".comite.aberto").children(".tooltip_turmas").hide();
                                if (!bolSelfOpened)
                                    angular.element(elm).closest('article').children(".tooltip_turmas").show();
                            }, 150);
                        });
                    });
                }
            }

            this.init = function () {
                self.preInit();
                self.initBinders();
                $scope.bolInicializado = true;
            };


            $scope.isRelacionadoComite = function (categoria) {
                $scope.objUsuario = constantes.Usuario;                                                                               
                for(var turma in $scope.objUsuario.TurmasInscritas)
                    if($scope.objUsuario.TurmasInscritas[turma].Inscricao.Categorias[0].Id == categoria.Id){                            
                        
                        for(var parceiro in $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros){
                            if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros[parceiro].Id){                                
                                return true;
                            }
                        }
                                                        
                        if($scope.objUsuario.Cargos && $scope.objUsuario.Cargos.length == 1)
                            if($scope.objUsuario.Cargos[0] == 'Aluno')
                                return true;
                        
                        if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Responsavel.Id)
                            return true;                        
                        
                    }                                      
                
                return false;          
             }            


            this.observeUserAudioEnded=function(bolStart,idxAudio,clsPlay,clsStop){
                if ($scope.ctrlAudio) {
                    $timeout.cancel($scope.ctrlAudio);
                    $scope.ctrlAudio = undefined;
                }
                if(bolStart) $scope.ctrlAudio = $timeout(function(){
                    var classPlay = "play";
                    var classStop = "stop";
                    if(clsPlay)
                        classPlay = clsPlay;
                    if(clsStop)
                        classStop = clsStop;
                    var found=false;
                    var prefix = '#'+idxAudio;
                    if(angular.element(prefix)) if(angular.element(prefix).eq(0).get(0)) if(angular.element(prefix).eq(0).get(0).ended) {
                        found=true; 
                        if(angular.element("[rel='" + idxAudio + "']").size()>0){
                            angular.element("[rel='" + idxAudio + "']").removeClass(classStop).addClass(classPlay);
                        }
                        self.stopAudio(idxAudio);
                        if ($scope.ctrlAudio) {
                            $timeout.cancel($scope.ctrlAudio);
                            $scope.ctrlAudio = undefined;
                        }
                    }
                    if(!found){
                        self.observeUserAudioEnded(true, idxAudio,clsPlay,clsStop);
                    }
                },1000);
            };

            this.openVejaMaisTurmas = function (categoria) {
                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-turmas-home.html',
                    controller: 'ctrlEleicaoModalTurmasHome',
                    resolve: {
                        defaultConfig: function () {
                            return $scope.defaultConfig;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        objUsuario: function () {
                            return $scope.objUsuario
                        },
                        objEdicao: function () {
                            return $scope.objEdicao;
                        },
                        categoria: function () {
                            return categoria;
                        },
                    },
                    backdrop: 'static'
                });

                modalInstance.result.then(function (p_equipe) { // Ao clicar em "OK", recebe os parametros!
                    //$log.info('Modal result dismissed at: ' + new Date());
                }, function () {
                    angular.element("body").eq(0).css({ "overflow": "" });
                    //$log.info('Modal dismissed at: ' + new Date());
                });
                modalInstance.opened.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
                }, function () {
                    //$log.info('Modale opened dismissed at: ' + new Date());
                });
            };                     

            $scope.getAudioCandidato = function (categoria) {

                /*  situacaoEtapa
                    1 - Aguarde
                    2 - Confira/Envie
                    3 - Confira os envios/Etapa passou
                    4 - Confira o resultado */              

                // Se a última etapa foi concluída
                if($scope.situacaoEtapaFinal == 4){
                    //busca o áudio de quem ganhou
                    if(categoria.Ordem == $scope.audioVencedor){   
                        return 'audio_eleicao_'+categoria.Ordem+'_6_eleito';
                    }
                    else{
                        return 'audio_eleicao_'+categoria.Ordem+'_6_nao_eleito';
                    }
                }else{
                    // Se nenhuma etapa iniciou
                    if($scope.etapaCorrenteAtiva == undefined){                    
                        return 'audio_eleicao_'+categoria.Ordem+'_0_home';
                    }else{                 
                        // Etapa atual
                        if($scope.etapaCorrenteAtiva)
                            if($scope.etapaCorrenteAtiva.Ordem >= 1){                                
                                //console.log('audio_eleicao_'+categoria.Ordem+'_'+$scope.etapaCorrenteAtiva.Ordem);
                                return 'audio_eleicao_'+categoria.Ordem+'_'+$scope.etapaCorrenteAtiva.Ordem;
                            }
                                                  
                    }                
                }

            };

            setTimeout(function () { self.init() }, 10);
        } ],
        controllerAs: 'ctrlEleicoesHome'
    };

});

 
