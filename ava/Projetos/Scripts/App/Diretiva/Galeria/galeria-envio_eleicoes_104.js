"use strict"

var ctrlGaleriaEnvioEleicoes = function ($http, $scope, $timeout, $filter, $location, $interval, $modal, constantes, projetoTools) {
    var self = this;
    var initApi = true;
    $scope.bolMobile = projetoTools.isMobile();
    $scope.bolDesktop = projetoTools.isDesktop();
    /*
    if(!angular.isObject($scope.objEdicao) && angular.isObject(constantes.Edicao))
        $scope.objEdicao = angular.copy(constantes.Edicao);
    if(!angular.isObject($scope.objEtapas) && angular.isObject(constantes.Edicao.Etapas))
        $scope.objEtapas = angular.copy(constantes.Edicao.Etapas);
    if(!angular.isObject($scope.usuario) && angular.isObject(constantes.Usuario))
        $scope.usuario = angular.copy(constantes.Usuario);
    if(!angular.isObject($scope.defaultConfig) && angular.isObject(constantes.DefaultConfig))
        $scope.defaultConfig = angular.copy(constantes.DefaultConfig);
    */

    $scope.bolProjetoPrevia = false;
    $scope.bolAntesPreparacaoCampanha = false;
    $scope.bolAplicandoFiltros = false;
    $scope.nuncaExistiramMateriais=true;
    $scope.Categorias = [];
    $scope.Escolas = [];
    $scope.Estados = [];
    $scope.Turmas = [];
    $scope.listaAnos = [];
    $scope.CacheCategorias = [];
    $scope.CacheEscolas = [];
    $scope.CacheEstados = [];
    $scope.CacheTurmas = [];

    $scope.CacheEscolasCabos = [];
    $scope.CacheEstadosCabos = [];
    $scope.CacheTurmasCabos = [];

    $scope.listaCamposDeFiltro01 = [];
    $scope.listaCamposDeFiltro02 = [];
    $scope.listaCamposDeFiltro03 = [];
    $scope.listaCamposDeFiltro04 = [];
    $scope.listaCamposDeFiltro05 = [];
    $scope.listaCamposDeFiltro06 = [];
    $scope.listaCamposDeFiltro07 = [];
    $scope.listaCamposDeFiltro08 = [];
    $scope.listaCamposDeFiltro09 = [];
    $scope.listaCamposDeFiltro10 = [];
    $scope.CacheCamposDeFiltro01 = [];
    $scope.CacheCamposDeFiltro02 = [];
    $scope.CacheCamposDeFiltro03 = [];
    $scope.CacheCamposDeFiltro04 = [];
    $scope.CacheCamposDeFiltro05 = [];
    $scope.CacheCamposDeFiltro06 = [];
    $scope.CacheCamposDeFiltro07 = [];
    $scope.CacheCamposDeFiltro08 = [];
    $scope.CacheCamposDeFiltro09 = [];
    $scope.CacheCamposDeFiltro10 = [];

    $scope.CacheCategoriasFinal = [];
    $scope.CacheEscolasImutavel = [];
    $scope.CacheEstadosImutavel = [];
    $scope.CacheTurmasImutavel = [];
    $scope.CacheTurmasParticipantes = [];
    $scope.CacheTurmasMateriais = [];
    $scope.CacheEnviosInscricao = [];

    self.CamposDeFiltro01Selecionado = undefined;
    self.CamposDeFiltro02Selecionado = undefined;
    self.CamposDeFiltro03Selecionado = undefined;
    self.CamposDeFiltro04Selecionado = undefined;
    self.CamposDeFiltro05Selecionado = undefined;
    self.CamposDeFiltro06Selecionado = undefined;
    self.CamposDeFiltro07Selecionado = undefined;
    self.CamposDeFiltro08Selecionado = undefined;
    self.CamposDeFiltro09Selecionado = undefined;
    self.CamposDeFiltro10Selecionado = undefined;

    self.CamposDeFiltro01SelecionadoCache = undefined;
    self.CamposDeFiltro02SelecionadoCache = undefined;
    self.CamposDeFiltro03SelecionadoCache = undefined;
    self.CamposDeFiltro04SelecionadoCache = undefined;
    self.CamposDeFiltro05SelecionadoCache = undefined;
    self.CamposDeFiltro06SelecionadoCache = undefined;
    self.CamposDeFiltro07SelecionadoCache = undefined;
    self.CamposDeFiltro08SelecionadoCache = undefined;
    self.CamposDeFiltro09SelecionadoCache = undefined;
    self.CamposDeFiltro10SelecionadoCache = undefined;

    var bolIniciarListas = false;
    var naoCarregaLoader = false;

    $scope.totalTurmasCategoria = [];

    $scope.initialLoaded = false;
    $scope.loadingBuscarGeral = false;
    $scope.loadingBuscarPortal = false;     

    //flags para identificar se estão habilitadas as eleições, qual área e em qual fase se encontra
    $scope.bolSemGaleria = false;
    $scope.bolEleicoes = true;
    $scope.bolPgComite = false;
    $scope.bolHomeProjeto = false;
    $scope.bolHomeEtapa = false;
    $scope.bolPossuiResultadosLiberados = false;
    $scope.bolRelacionadoComite = false;
    $scope.bolResultadosRevelados = false;
    $scope.bolResultadoEnvioEleicaoRevelado = false;
    $scope.bolExibirFiltros = false;
    $scope.hasMoreParticipantes = false;

    $scope.tipoEleicao = "Candidato";
    $scope.faseEleicao = 0;
    $scope.idCategoria = 0;
    $scope.etapaCorrente = undefined;
    $scope.etapaFinal = undefined;
    $scope.situacaoEtapaFinal = 0;
    $scope.audioVencedor=0;

    //elemento a serem exibidos na relação de participantes
    $scope.ItensPorPagina = 20;

    $scope.ctrlAudio = undefined;

    self.CategoriaSelecionado = undefined;
    self.EstadoSelecionado = undefined;
    self.EscolaSelecionada = undefined;
    self.TurmaSelecionada = undefined;
    self.AnoSelecionado = undefined;                       
    var filtros = "";

    $scope.paramsPortal =
    {
        idEtapaParam: 0,
        intPagina: 1,
        intRegPorPagina: parseInt($scope.maxRegistroPagina),
        total: 0
    };

    $scope.paramsMateriais =
    {
        idEtapaParam: 0,
        intPagina: 1,
        intRegPorPagina: parseInt($scope.maxRegistroPagina),
        simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
        total: 0
    };

    $scope.paramsParticipantes = {
        intPagina: 1,
        intRegPorPagina: $scope.ItensPorPagina,
        total: 0
    };

    try {        
        if ($scope.objEtapa) {            
            if ($scope.objEtapa.Id > 0) {
                $scope.paramsPortal.idEtapaParam = $scope.objEtapa.Id;
                $scope.paramsMateriais.idEtapaParam = $scope.objEtapa.Id;

                $scope.bolSemGaleria = $scope.objEtapa.BolSemGaleria;                        
            }
        }
    } catch (err) {
        console.error("erro " + err.message);
    }

    $scope.objComoFazer = [];
    $scope.objEnviosInscricao = {
        TotalEnvios: 0,
        Envios: []
    };

    $scope.controle = { aba_atual: 0 };        

    self.observeUserAudioEnded=function(bolStart,idxAudio,clsPlay,clsStop){
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

    var entrou_tooltip = false;
    $scope.ctrlTimerInitQuartinho = undefined;
    self.initBinders = function () {
        //posterga a inicialização enquanto não tiverem os elementos necessários carregados
        if ($scope.ctrlTimerInitQuartinho) {
	        $interval.cancel($scope.ctrlTimerInitQuartinho);
	        $scope.ctrlTimerInitQuartinho = undefined;
        }
        $scope.ctrlTimerInitQuartinho = $interval(function () {
	        var els = angular.element(".comite.aberto, .comite.aberto > a, .comite.aberto > div.img_comite, .tooltip_turmas, .tooltip_turmas *");
            if (els.length > 0) {
		        if ($scope.ctrlTimerInitQuartinho) {
			        $interval.cancel($scope.ctrlTimerInitQuartinho);
			        $scope.ctrlTimerInitQuartinho = undefined;
		        }
		        $timeout(function () {
			        self.initBindersGo();
		        }, 250);
	        }
        }, 1000);
    };

    self.initBindersGo = function () {
                
        //TRATAMENTOS DOS TOOLTIPS
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

    self.initDadosEleicoes=function() {

        bolIniciarListas = true;

        //setup das informações relacionadas com as eleições
        var tmpEleicoes = $filter('filter')(constantes.Edicao.Etapas, {TipoEtapaEleicao: '!'+0} , false);
        if(angular.isArray(tmpEleicoes)) if(tmpEleicoes.length>0) if(projetoTools.ArrayIntersect([1,2,3,4,5,6],tmpEleicoes.map(function(){return arguments[0].TipoEtapaEleicao})).length>0) if(angular.isArray(constantes.EdicaoConfig.GruposCategorias)) if(constantes.EdicaoConfig.GruposCategorias.length>0) if(angular.isArray(constantes.EdicaoConfig.GruposCategorias[0].Categorias)) if(constantes.EdicaoConfig.GruposCategorias[0].Categorias.length > 0){
            $scope.bolEleicoes = true;
            if(document.location.href.toLowerCase().indexOf("/etapas")!=-1 || document.location.href.toLowerCase().indexOf("/desafios")!=-1){
                var test = "/etapas";
                if(document.location.href.toLowerCase().indexOf("/desafios")!=-1)
                    test = "/desafios";
                var bolInGeneralHome = true;
                if(document.location.href.toLowerCase().split(test).length==2) if(document.location.href.toLowerCase().split(test)[1].length>2) {
                    bolInGeneralHome = false;
                }
                if(bolInGeneralHome){
                    $scope.bolHomeEtapa = false;
                    $scope.bolHomeProjeto = true;
                }
                else{
                    $scope.bolHomeEtapa = true;
                    $scope.bolHomeProjeto = false;                        
                }
            }
            else{
                $scope.bolHomeEtapa = false;
                $scope.bolHomeProjeto = false;
                $scope.bolPgComite = true;
            }
                    
            for(var categoria in constantes.EdicaoConfig.GruposCategorias[0].Categorias){
                $scope.totalTurmasCategoria.push(0);
                var slug = IniciaisMaiusculas(retira_acentos(constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Slug = slug;
                if (constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias) if (constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias instanceof Array) if (constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.length > 0) {
                    $scope.tipoEleicao = "Partido";
                    for(var categoria in constantes.EdicaoConfig.GruposCategorias[0].Categorias.Subcategorias) {
                        var subSlug = IniciaisMaiusculas(retira_acentos(constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Descricao).replace(/-/g," ")).replace(/\s/g,"");
                        constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.Slug = subSlug;
                    }
                }

                if(!$scope.bolHomeEtapa && !$scope.bolHomeProjeto) if(constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Slug.toLowerCase()==document.location.href.split("/")[document.location.href.split("/").length-1].toLowerCase()){
                    $scope.idCategoria = constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Id;
                    $scope.partido = angular.copy(constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria]);
                    var turmas_inscritas = $filter('filter')(constantes.Usuario.TurmasInscritas, { Inscricao: { Id: '!' + 0, Categorias: [ { Id : constantes.EdicaoConfig.GruposCategorias[0].Categorias[categoria].Id } ] } }, true);
                    if (turmas_inscritas) if (turmas_inscritas instanceof Array) if (turmas_inscritas.length > 0) {
                        $scope.bolRelacionadoComite=true;
                    }
                }
            }
            $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
            $scope.objUsuario = angular.copy(constantes.Usuario);
            if(angular.isObject($scope.objEdicao)) if(angular.isArray($scope.objEdicao.Etapas)){
                $scope.etapaCorrenteAtiva = projetoTools.getEtapaCorrente($scope.objEdicao.Etapas, false);
                //$scope.etapaFinal = angular.copy($scope.objEdicao.Etapas[$scope.objEdicao.Etapas.length - 1]);
                $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEdicao.Etapas));
                $scope.situacaoEtapaFinal = self.situacaoEtapa($scope.etapaFinal);
            }

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

            if ($scope.etapaCorrenteAtiva) {
                $scope.etapaUltimaEtapaOcorreu = $scope.etapaCorrenteAtiva;
            }
            else if(angular.isObject($scope.objEdicao)) if(angular.isArray($scope.objEdicao.Etapas)){
                $scope.etapaUltimaEtapaOcorreu = projetoTools.getEtapaCorrente($scope.objEdicao.Etapas, true);
            }
            if($scope.etapaUltimaEtapaOcorreu) if($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao) if($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao>0)
                $scope.faseEleicao = $scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao;
                    
            if (tmpEleicoes != undefined) {
                if (tmpEleicoes.length > 0) {
                    angular.forEach(tmpEleicoes, function (valor, chave) {
                        if (typeof (valor.DataInicio) == "string") if (!(valor.DataInicio instanceof Date)) if (valor.DataInicio.indexOf("/") != -1) {
                            tmpEleicoes[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                            tmpEleicoes[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                            tmpEleicoes[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                        }

                        //revelação dos resultados para todos
                        if(tmpEleicoes[chave].TipoEtapaEleicao==5){
                            if(tmpEleicoes[chave].DataInicio.getTime()<(new Date().getTime())) {
                                $scope.bolResultadosRevelados = true;
                                $scope.bolPossuiResultadosLiberados = true;
                            }
                            if(tmpEleicoes[chave].DataResultado.getTime()<(new Date().getTime())) {
                                $scope.bolResultadoEnvioEleicaoRevelado = true;
                                $scope.bolPossuiResultadosLiberados = true;
                            }
                            $scope.dataRevelacaoResultado = angular.copy(projetoTools.DiaMesComZeros(tmpEleicoes[chave].DataInicio));
                        }
                    });
                }                                   
            }
            
            var etapasComEnvios = $filter('filter')($scope.objEdicao.Etapas, { TipoEnvio: '!'+0, BolSemFormulario: false, BolSemGaleria: false, BolBreve: false }, true);
            //Situacao: 1, 
            angular.forEach(etapasComEnvios, function (etp, idxEtp) {
                var correcao = parseInt(idxEtp)+2;
                if (typeof (etp.DataInicio) == "string") if (!(etp.DataInicio instanceof Date)) if (etp.DataInicio.indexOf("/") != -1) {
                    etp.DataInicio = eval("new " + etp.DataInicio.replace(/\//ig, ""));
                    etp.DataFim = eval("new " + etp.DataFim.replace(/\//ig, ""));
                    etp.DataResultado = eval("new " + etp.DataResultado.replace(/\//ig, ""));
                }
                if(etp.DataFim.getTime()<(new Date().getTime())) {
                    $scope.bolPossuiResultadosLiberados = true;
                }
            });

            $scope.safeApply();
            if($scope.bolHomeEtapa)
                self.initBinders();

            // verifica se projeto possui prévias
            for(var etapa in constantes.Edicao.Etapas)
                if(constantes.Edicao.Etapas[etapa].TipoEtapaEleicao == 1)
                    $scope.bolProjetoPrevia = true;   
            
            // verifica se etapa de preparação da campanha já iniciou
            if($scope.bolProjetoPrevia){                
                for(var etp in constantes.Edicao.Etapas){                                    
                    if(constantes.Edicao.Etapas[etp].Ordem == 5){
                        var dataEtapaTemp = constantes.Edicao.Etapas[etp].DataInicio;
                        if(dataEtapaTemp && dataEtapaTemp instanceof Date){                                     
                            if(dataEtapaTemp.getTime() > new Date().getTime())
                                $scope.bolAntesPreparacaoCampanha = true;                                                                             
                        }else{
                            if (dataEtapaTemp && typeof dataEtapaTemp != 'undefined' && typeof dataEtapaTemp === 'string')
                                if(dataEtapaTemp.indexOf('(') > -1 && dataEtapaTemp.indexOf(')') > -1){
                                    dataEtapaTemp = dataEtapaTemp.substring(dataEtapaTemp.indexOf('(') + 1, dataEtapaTemp.indexOf(')'));
                                    if(dataEtapaTemp.length == 13)
                                        if(dataEtapaTemp > new Date().getTime())
                                            $scope.bolAntesPreparacaoCampanha = true;
                                }                                                                                   
                        }
                        break;
                    }
                }
            }else{
                for(var etp in constantes.Edicao.Etapas){                
                    if(constantes.Edicao.Etapas[etp].Ordem == 4){
                        var dataEtapaTemp = constantes.Edicao.Etapas[etp].DataInicio;
                        if(dataEtapaTemp && dataEtapaTemp instanceof Date){                                     
                            if(dataEtapaTemp.getTime() > new Date().getTime())
                                $scope.bolAntesPreparacaoCampanha = true;                                                                             
                        }else{
                            if (dataEtapaTemp && typeof dataEtapaTemp != 'undefined' && typeof dataEtapaTemp === 'string')
                                if(dataEtapaTemp.indexOf('(') > -1 && dataEtapaTemp.indexOf(')') > -1){
                                    dataEtapaTemp = dataEtapaTemp.substring(dataEtapaTemp.indexOf('(') + 1, dataEtapaTemp.indexOf(')'));
                                    if(dataEtapaTemp.length == 13)
                                        if(dataEtapaTemp > new Date().getTime())
                                            $scope.bolAntesPreparacaoCampanha = true;
                                }                                                                                   
                        }
                        break;                       
                    }
                }            
            }                
        }

        if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto)
        {
            $scope.Participantes = new Array();
            $scope.hasMoreParticipantes = false;
        }

        var etapasComEnvios = $filter('filter')($scope.objEdicao.Etapas, { TipoEnvio: '!'+0, BolSemFormulario: false, BolSemGaleria: false, BolBreve: false }, true);
        //Situacao: 1, 
        angular.forEach(etapasComEnvios, function (etp, idxEtp) {
            var correcao = parseInt(idxEtp)+2;
            if (typeof (etp.DataInicio) == "string") if (!(etp.DataInicio instanceof Date)) if (etp.DataInicio.indexOf("/") != -1) {
                etp.DataInicio = eval("new " + etp.DataInicio.replace(/\//ig, ""));
                etp.DataFim = eval("new " + etp.DataFim.replace(/\//ig, ""));
                etp.DataResultado = eval("new " + etp.DataResultado.replace(/\//ig, ""));
            }
            var bolEtapaLiberada = false;
            if(etp.DataFim.getTime()<(new Date()).getTime()) {
                bolEtapaLiberada = true;
            }
            //console.log(bolEtapaLiberada);
            //$scope.objEnviosInscricao.TotalEnvios == 0 || $scope.nuncaExistiramMateriais)
            if($scope.bolResultadoEnvioEleicaoRevelado || $scope.bolResultadosRevelados || (!$scope.bolResultadosRevelados && $scope.bolRelacionadoComite && bolEtapaLiberada )  ) {
                var etapasComEnvios = $filter('filter')($scope.objEdicao.Etapas, { TipoEnvio: '!'+0, BolSemFormulario: false, BolSemGaleria: false, BolBreve: false }, true);
                angular.forEach(etapasComEnvios, function (etp, idxEtp) {
                    //$scope.faseEleicao
                    //$scope.objEnviosInscricao.TotalEnvios>0
                    //$scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao;
                    if (typeof (etp.DataInicio) == "string") if (!(etp.DataInicio instanceof Date)) if (etp.DataInicio.indexOf("/") != -1) {
                        etp.DataInicio = eval("new " + etp.DataInicio.replace(/\//ig, ""));
                        etp.DataFim = eval("new " + etp.DataFim.replace(/\//ig, ""));
                        etp.DataResultado = eval("new " + etp.DataResultado.replace(/\//ig, ""));
                    }
                            
                    if(etp.DataFim.getTime()<(new Date()).getTime()) {
                        $scope.bolPossuiResultadosLiberados = true;
                        $scope.paramsMateriais = {
                            idEtapaParam: etp.Id,
                            intPagina: 1,
                            intRegPorPagina: parseInt($scope.maxRegistroPagina),
                            simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
                            total: 0
                        };
                                
                        if(!$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
                            self.openAbaGaleria(idxEtp+2,0);
                        }
                                 
                        //console.log("prosseguiu");
                        //self.reloadFiltrosMateriais();
                        //this.buscarGaleriaOrdenado();
                        //self.aplicarFiltros(0,true);
                    }
                });
            }
        });
    };



    self.openVejaMaisTurmas = function (categoria) {
        //console.log("abrindo o modal....");

        angular.element("body").eq(0).css({ "overflow": "hidden" });
        window.scrollTo(0, 0);
        angular.forEach(angular.element("html, body"), function (el) {
            angular.element(el).animate({ scrollTop: 0 }, 0);
        });

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

    var atualizarSelecionado = function(listaCamposDeFiltro, combo){        
        var temp = undefined;
        if(listaCamposDeFiltro && listaCamposDeFiltro instanceof Array && listaCamposDeFiltro.length > 0){        
            for(var campo in listaCamposDeFiltro){    
                temp = undefined;
                if(self.CamposDeFiltro01SelecionadoCache && self.CamposDeFiltro01SelecionadoCache != undefined &&
                   self.CamposDeFiltro01SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro01SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];        
                } else if(self.CamposDeFiltro02SelecionadoCache && self.CamposDeFiltro02SelecionadoCache != undefined &&
                   self.CamposDeFiltro02SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro02SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                } else if(self.CamposDeFiltro03SelecionadoCache && self.CamposDeFiltro03SelecionadoCache != undefined &&
                   self.CamposDeFiltro03SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro03SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                } else if(self.CamposDeFiltro04SelecionadoCache && self.CamposDeFiltro04SelecionadoCache != undefined &&
                   self.CamposDeFiltro04SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro04SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                } else if(self.CamposDeFiltro05SelecionadoCache && self.CamposDeFiltro05SelecionadoCache != undefined &&
                   self.CamposDeFiltro05SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro05SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];          
                } else if(self.CamposDeFiltro06SelecionadoCache && self.CamposDeFiltro06SelecionadoCache != undefined &&
                   self.CamposDeFiltro06SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro06SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                } else if(self.CamposDeFiltro07SelecionadoCache && self.CamposDeFiltro07SelecionadoCache != undefined &&
                   self.CamposDeFiltro07SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro07SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                } else if(self.CamposDeFiltro08SelecionadoCache && self.CamposDeFiltro08SelecionadoCache != undefined &&
                   self.CamposDeFiltro08SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro08SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];     
                } else if(self.CamposDeFiltro09SelecionadoCache && self.CamposDeFiltro09SelecionadoCache != undefined &&
                   self.CamposDeFiltro09SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro09SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                } else if(self.CamposDeFiltro10SelecionadoCache && self.CamposDeFiltro10SelecionadoCache != undefined &&
                   self.CamposDeFiltro10SelecionadoCache.IdFormularioCampo == listaCamposDeFiltro[campo].IdFormularioCampo &&
                   self.CamposDeFiltro10SelecionadoCache.IdFormularioCampoOpcao == listaCamposDeFiltro[campo].IdFormularioCampoOpcao){
                    temp = listaCamposDeFiltro[campo];
                }                                                    
                switch(combo){
                    case 1 : if(temp != undefined){self.CamposDeFiltro01Selecionado = angular.copy(temp);}  break;
                    case 2 : if(temp != undefined){self.CamposDeFiltro02Selecionado = angular.copy(temp);}  break;
                    case 3 : if(temp != undefined){self.CamposDeFiltro03Selecionado = angular.copy(temp);}  break;
                    case 4 : if(temp != undefined){self.CamposDeFiltro04Selecionado = angular.copy(temp);}  break;
                    case 5 : if(temp != undefined){self.CamposDeFiltro05Selecionado = angular.copy(temp);}  break;
                    case 6 : if(temp != undefined){self.CamposDeFiltro06Selecionado = angular.copy(temp);}  break;
                    case 7 : if(temp != undefined){self.CamposDeFiltro07Selecionado = angular.copy(temp);}  break;
                    case 8 : if(temp != undefined){self.CamposDeFiltro08Selecionado = angular.copy(temp);}  break;
                    case 9 : if(temp != undefined){self.CamposDeFiltro09Selecionado = angular.copy(temp);}  break;
                    case 10 : if(temp != undefined){self.CamposDeFiltro10Selecionado = angular.copy(temp);} break;                
                }
            }                        
        }
    }
    
    self.openAbaGaleria = function (idAba, idEtapa) {        
        $scope.bolAplicandoFiltros = false;
        //atualmente apenas a eleicoes estao enviando o idEtapa

        if($scope.bolHomeEtapa && angular.isDefined($scope.objEtapa) && angular.isObject($scope.objEtapa) && angular.isNumber($scope.objEtapa.Id) && $scope.objEtapa.Id>0){
            idEtapa = $scope.objEtapa.Id;                           
         }
        
        $scope.IdEtapaAbreAba = idEtapa;

        //------------------------------------------------------------------
        filtros = '';
        self.CamposDeFiltro01Selecionado = undefined;
        self.CamposDeFiltro02Selecionado = undefined;
        self.CamposDeFiltro03Selecionado = undefined;
        self.CamposDeFiltro04Selecionado = undefined;
        self.CamposDeFiltro05Selecionado = undefined;
        self.CamposDeFiltro06Selecionado = undefined;
        self.CamposDeFiltro07Selecionado = undefined;
        self.CamposDeFiltro08Selecionado = undefined;
        self.CamposDeFiltro09Selecionado = undefined;
        self.CamposDeFiltro10Selecionado = undefined;

        self.CamposDeFiltro01SelecionadoCache = undefined;
        self.CamposDeFiltro02SelecionadoCache = undefined;
        self.CamposDeFiltro03SelecionadoCache = undefined;
        self.CamposDeFiltro04SelecionadoCache = undefined;
        self.CamposDeFiltro05SelecionadoCache = undefined;
        self.CamposDeFiltro06SelecionadoCache = undefined;
        self.CamposDeFiltro07SelecionadoCache = undefined;
        self.CamposDeFiltro08SelecionadoCache = undefined;
        self.CamposDeFiltro09SelecionadoCache = undefined;
        self.CamposDeFiltro10SelecionadoCache = undefined;

        $scope.CacheCamposDeFiltro01 = $scope.listaCamposDeFiltro01 = [];
        $scope.CacheCamposDeFiltro02 = $scope.listaCamposDeFiltro02 = [];
        $scope.CacheCamposDeFiltro03 = $scope.listaCamposDeFiltro03 = [];
        $scope.CacheCamposDeFiltro04 = $scope.listaCamposDeFiltro04 = [];
        $scope.CacheCamposDeFiltro05 = $scope.listaCamposDeFiltro05 = [];
        $scope.CacheCamposDeFiltro06 = $scope.listaCamposDeFiltro06 = [];
        $scope.CacheCamposDeFiltro07 = $scope.listaCamposDeFiltro07 = [];
        $scope.CacheCamposDeFiltro08 = $scope.listaCamposDeFiltro08 = [];
        $scope.CacheCamposDeFiltro09 = $scope.listaCamposDeFiltro09 = [];
        $scope.CacheCamposDeFiltro10 = $scope.listaCamposDeFiltro10 = []; 

        self.EstadoSelecionado = undefined;
        self.EscolaSelecionada = undefined;
        self.TurmaSelecionada = undefined;

        $scope.Escolas = [];
        $scope.Estados = [];
        $scope.Turmas = [];
        $scope.CacheEscolas = [];
        $scope.CacheEstados = [];
        $scope.CacheTurmas = [];
        $scope.listaAnos = [];
        $scope.CacheEscolasCabos = [];
        $scope.CacheEstadosCabos = [];
        $scope.CacheTurmasCabos = [];  
        $scope.CacheEscolasImutavel = [];
        $scope.CacheEstadosImutavel = [];
        $scope.CacheTurmasImutavel = [];
        
        //------------------------------------------------------------------
        
        if(idEtapa > 0){            
            $http.post('/AVA/Projetos/Servico/GetPortalEnvioPorIdProjetoEdicaoEtapaTipoProjeto', {
                idProjeto: $scope.objEdicao.Projeto.Id,
                idEdicao: $scope.objEdicao.Id,
                idEtapa: idEtapa,
                tipoProjeto: $scope.objEdicao.TipoProjeto,
                tipoOrdenacao: self.getOrdenacao(),
                intPagina: $scope.paramsPortal.intPagina,
                intRegPorPagina: $scope.paramsPortal.intRegPorPagina,
                intDestaque: $scope.paramsMateriais.simplesmenteDestaques,
                intAno : self.AnoSelecionado,
                idCategoria: $scope.idCategoria
            }).success(function(data) {                  
                if(data.listaCamposDeFiltro){                                                     
                    $scope.CacheCamposDeFiltro01 = $scope.listaCamposDeFiltro01 = [];
                    $scope.CacheCamposDeFiltro02 = $scope.listaCamposDeFiltro02 = [];
                    $scope.CacheCamposDeFiltro03 = $scope.listaCamposDeFiltro03 = [];
                    $scope.CacheCamposDeFiltro04 = $scope.listaCamposDeFiltro04 = [];
                    $scope.CacheCamposDeFiltro05 = $scope.listaCamposDeFiltro05 = [];
                    $scope.CacheCamposDeFiltro06 = $scope.listaCamposDeFiltro06 = [];
                    $scope.CacheCamposDeFiltro07 = $scope.listaCamposDeFiltro07 = [];
                    $scope.CacheCamposDeFiltro08 = $scope.listaCamposDeFiltro08 = [];
                    $scope.CacheCamposDeFiltro09 = $scope.listaCamposDeFiltro09 = [];
                    $scope.CacheCamposDeFiltro10 = $scope.listaCamposDeFiltro10 = [];  

                    // Monta listas
                    for(var campo in data.listaCamposDeFiltro){
                        for(var opcao in data.listaCamposDeFiltro[campo]){    
                            switch(campo){
                                case '0' : $scope.listaCamposDeFiltro01.push(data.listaCamposDeFiltro[campo][opcao][0]); 
                                           $scope.CacheCamposDeFiltro01 = angular.copy($scope.listaCamposDeFiltro01); break;
                                case '1' : $scope.listaCamposDeFiltro02.push(data.listaCamposDeFiltro[campo][opcao][0]); 
                                           $scope.CacheCamposDeFiltro02 = angular.copy($scope.listaCamposDeFiltro02); break;
                                case '2' : $scope.listaCamposDeFiltro03.push(data.listaCamposDeFiltro[campo][opcao][0]); 
                                           $scope.CacheCamposDeFiltro03 = angular.copy($scope.listaCamposDeFiltro03); break;
                                case '3' : $scope.listaCamposDeFiltro04.push(data.listaCamposDeFiltro[campo][opcao][0]); 
                                           $scope.CacheCamposDeFiltro04 = angular.copy($scope.listaCamposDeFiltro04); break;
                                case '4' : $scope.listaCamposDeFiltro05.push(data.listaCamposDeFiltro[campo][opcao][0]);
                                           $scope.CacheCamposDeFiltro05 = angular.copy($scope.listaCamposDeFiltro05); break;
                                case '5' : $scope.listaCamposDeFiltro06.push(data.listaCamposDeFiltro[campo][opcao][0]);
                                           $scope.CacheCamposDeFiltro06 = angular.copy($scope.listaCamposDeFiltro06); break;
                                case '6' : $scope.listaCamposDeFiltro07.push(data.listaCamposDeFiltro[campo][opcao][0]);
                                           $scope.CacheCamposDeFiltro07 = angular.copy($scope.listaCamposDeFiltro07); break;
                                case '7' : $scope.listaCamposDeFiltro08.push(data.listaCamposDeFiltro[campo][opcao][0]);
                                           $scope.CacheCamposDeFiltro08 = angular.copy($scope.listaCamposDeFiltro08); break;
                                case '8' : $scope.listaCamposDeFiltro09.push(data.listaCamposDeFiltro[campo][opcao][0]);
                                           $scope.CacheCamposDeFiltro09 = angular.copy($scope.listaCamposDeFiltro09); break;
                                case '9' : $scope.listaCamposDeFiltro10.push(data.listaCamposDeFiltro[campo][opcao][0]);
                                           $scope.CacheCamposDeFiltro10 = angular.copy($scope.listaCamposDeFiltro10); break;                                                                            
                            }
                        }
                    }                                                                                                                                                                               
                }
            }).error(function (err) {
                console.log(err);
                    //console.log("Não foi possível buscar detalhe da Etapa");
            })

            if($scope.CacheEnviosInscricao.length == 0){
                $scope.CacheEnviosInscricao = angular.copy($scope.objEnviosInscricao.Envios);
            }            
            $scope.loadingBuscarGeral= true;
            $scope.objEnviosInscricao.Envios.length = 0;
            $scope.objEnviosInscricao.TotalEnvios = 0;
            $scope.paramsPortal.idEtapaParam = idEtapa;                         

            self.buscarEnvioParticipantes(true);

            $scope.etapaAtual           = $filter('filter')($scope.objEdicao.Etapas, {Id:idEtapa}, true);
            $scope.bolEleicoesNoPomar   = ($scope.objEdicao.Nome.trim().toLowerCase()).indexOf("eleições no pomar") > -1;
            $scope.bolEleicoesNaCaverna = ($scope.objEdicao.Nome.trim().toLowerCase()).indexOf("eleições na caverna") > -1;
            $scope.bolBloquearEtapa     = false;

            var etapaTemp, dataEtapaTemp;
            
            if($scope.bolEleicoesNaCaverna){
                // a etapa 3 só pode ser liberada apos a votacao da 4 ser concluida                
                 etapaTemp = $filter('filter')($scope.objEdicao.Etapas, {Ordem:4}, true);
                 dataEtapaTemp = etapaTemp[0].DataFim;

                 if(dataEtapaTemp && dataEtapaTemp instanceof Date){                                     
                    if(dataEtapaTemp.getTime() > new Date().getTime() && $scope.etapaAtual[0].Ordem == 3){
                        $scope.bolBloquearEtapa = true;                        
                    }                                                    
                 }else{
                     if (dataEtapaTemp && typeof dataEtapaTemp != 'undefined' && typeof dataEtapaTemp === 'string'){
                         if(dataEtapaTemp.indexOf('(') > -1 && dataEtapaTemp.indexOf(')') > -1){
                            dataEtapaTemp = dataEtapaTemp.substring(dataEtapaTemp.indexOf('(') + 1, dataEtapaTemp.indexOf(')'));
                            if(dataEtapaTemp.length == 13){
                                if(dataEtapaTemp > new Date().getTime() && $scope.etapaAtual[0].Ordem == 3){
                                    $scope.bolBloquearEtapa = true;                        
                                }
                            }
                         }                            
                     }                          
                 }        
            }else if($scope.bolEleicoesNoPomar){
                // a etapa 2 só pode ser liberada apos a votacao da 3 ser concluida
                 etapaTemp = $filter('filter')($scope.objEdicao.Etapas, {Ordem:3}, true);       
                 dataEtapaTemp = etapaTemp[0].DataFim;

                 if(dataEtapaTemp && dataEtapaTemp instanceof Date){                                     
                    if(dataEtapaTemp.getTime() > new Date().getTime() && $scope.etapaAtual[0].Ordem == 2){
                        $scope.bolBloquearEtapa = true;                        
                    }                                                    
                 }else{
                    if (dataEtapaTemp && typeof dataEtapaTemp != 'undefined' && typeof dataEtapaTemp === 'string'){
                         if(dataEtapaTemp.indexOf('(') > -1 && dataEtapaTemp.indexOf(')') > -1){
                            dataEtapaTemp = dataEtapaTemp.substring(dataEtapaTemp.indexOf('(') + 1, dataEtapaTemp.indexOf(')'));
                            if(dataEtapaTemp.length == 13){
                                if(dataEtapaTemp > new Date().getTime() && $scope.etapaAtual[0].Ordem == 2){
                                    $scope.bolBloquearEtapa = true;                        
                                }
                            }
                         }
                     }
                 }   
            }
            etapaTemp = null;
        }

        if((idAba >= 2 && idEtapa > 0) || $scope.bolHomeEtapa){
            var bolProssegue=true;
            if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
                /*
                valida se pode abrir a aba de materiais somente se respeitar as seguintes condições:
                - resultados estão revelados
                - faz parte do comite
                - aba clicada se refere à etapa aberta e com resultados publicados
                */
                bolProssegue=false;
                var tempEtapa;
                var etapasComEnvios = $filter('filter')($scope.objEdicao.Etapas, { TipoEnvio: '!'+0, BolSemFormulario: false, BolSemGaleria: false, BolBreve: false }, true);
                angular.forEach(etapasComEnvios, function (etp, idxEtp) {
                    var correcao = parseInt(idxEtp)+2;

                    if(etp.Id == $scope.IdEtapaAbreAba){
                        correcao = idAba;
                    }
                    
                    if(correcao==idAba){
                        if (typeof (etp.DataInicio) == "string") if (!(etp.DataInicio instanceof Date)) if (etp.DataInicio.indexOf("/") != -1) {
                            etp.DataInicio = eval("new " + etp.DataInicio.replace(/\//ig, ""));
                            etp.DataFim = eval("new " + etp.DataFim.replace(/\//ig, ""));
                            etp.DataResultado = eval("new " + etp.DataResultado.replace(/\//ig, ""));
                        }

                        var bolEtapaLiberada = false;
                        if(etp.DataFim.getTime()<(new Date()).getTime()) {
                            bolEtapaLiberada = true;
                        }
                        if($scope.bolResultadoEnvioEleicaoRevelado || $scope.bolResultadosRevelados || (!$scope.bolResultadosRevelados && $scope.bolRelacionadoComite && bolEtapaLiberada )  ) {                            
                            bolProssegue = true;
                            //bloqueia aba da etapa nas galerias das eleicoes segundo as regras de negocio
                            if(($scope.bolEleicoesNoPomar || $scope.bolEleicoesNaCaverna) && $scope.bolBloquearEtapa){
                                bolProssegue = false;
                            }
                        }
                    }
                });
            }
            if(bolProssegue){
                if(idAba != $scope.controle.aba_atual){
                    self.EstadoSelecionado = undefined;
                    self.EscolaSelecionada = undefined;
                    self.TurmaSelecionada = undefined;
                                        
                    $scope.CacheCamposDeFiltro01 = $scope.listaCamposDeFiltro01 = [];
                    $scope.CacheCamposDeFiltro02 = $scope.listaCamposDeFiltro02 = [];
                    $scope.CacheCamposDeFiltro03 = $scope.listaCamposDeFiltro03 = [];
                    $scope.CacheCamposDeFiltro04 = $scope.listaCamposDeFiltro04 = [];
                    $scope.CacheCamposDeFiltro05 = $scope.listaCamposDeFiltro05 = [];
                    $scope.CacheCamposDeFiltro06 = $scope.listaCamposDeFiltro06 = [];
                    $scope.CacheCamposDeFiltro07 = $scope.listaCamposDeFiltro07 = [];
                    $scope.CacheCamposDeFiltro08 = $scope.listaCamposDeFiltro08 = [];
                    $scope.CacheCamposDeFiltro09 = $scope.listaCamposDeFiltro09 = [];
                    $scope.CacheCamposDeFiltro10 = $scope.listaCamposDeFiltro10 = [];                      
                                                            
                    self.CamposDeFiltro01Selecionado = undefined;
                    self.CamposDeFiltro02Selecionado = undefined;
                    self.CamposDeFiltro03Selecionado = undefined;
                    self.CamposDeFiltro04Selecionado = undefined;
                    self.CamposDeFiltro05Selecionado = undefined;
                    self.CamposDeFiltro06Selecionado = undefined;
                    self.CamposDeFiltro07Selecionado = undefined;
                    self.CamposDeFiltro08Selecionado = undefined;
                    self.CamposDeFiltro09Selecionado = undefined;
                    self.CamposDeFiltro10Selecionado = undefined;
                }
                if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
                    if($scope.objEnviosInscricao.TotalEnvios == 0 || $scope.nuncaExistiramMateriais){
                        var bolCarregarGaleriaMateriais = true;
                        var etapasComEnvios = $filter('filter')($scope.objEdicao.Etapas, { TipoEnvio: '!'+0, BolSemFormulario: false, BolSemGaleria: false, BolBreve: false }, true);
                        angular.forEach(etapasComEnvios, function (etp, idxEtp) {
                            //$scope.faseEleicao
                            //$scope.objEnviosInscricao.TotalEnvios>0
                            //$scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao;
                            if (typeof (etp.DataInicio) == "string") if (!(etp.DataInicio instanceof Date)) if (etp.DataInicio.indexOf("/") != -1) {
                                etp.DataInicio = eval("new " + etp.DataInicio.replace(/\//ig, ""));
                                etp.DataFim = eval("new " + etp.DataFim.replace(/\//ig, ""));
                                etp.DataResultado = eval("new " + etp.DataResultado.replace(/\//ig, ""));
                            }
                            var bolEtapaLiberada = false;
                            if(etp.DataFim.getTime()<(new Date()).getTime()) {
                                bolEtapaLiberada = true;
                                if($scope.bolResultadoEnvioEleicaoRevelado || $scope.bolResultadosRevelados || (!$scope.bolResultadosRevelados && $scope.bolRelacionadoComite && bolEtapaLiberada )  ) {
                                    $scope.paramsMateriais = {
                                        idEtapaParam: etp.Id,
                                        intPagina: 1,
                                        intRegPorPagina: parseInt($scope.maxRegistroPagina),
                                        simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
                                        total: 0
                                    };
                                        

                                    //console.log("prosseguiu");
                                    //this.buscarGaleriaOrdenado();
                                    //this.openAbaGaleria(idxEtp+2);

                                    self.reloadFiltrosMateriais(idEtapa);
                                    //self.aplicarFiltros(0,true);
                                }
                            }


                        });
                    }
                    else{
                        self.reloadFiltrosMateriais();
                    }
                }
                else{
                    self.reloadFiltrosParticipantes();
                }
                $scope.controle.aba_atual = idAba;
            }           
            else{
                //console.log("inibiu a abertura");
                self.openAbaGaleria(1,0);
            }   
        }else{
			
			// ##########################################################################################
				if ($scope.bolEleicoes && $scope.idCategoria>0 && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto && $scope.IdEtapaAbreAba == 0)
				{				
                    $scope.paramsParticipantes.intRegPorPagina = $scope.ItensPorPagina;
                    var path = "/AVA/Projetos/Servico/GetTurmasParticipantesEdicaoCategoria/";
                    var parametros = {
                        idProjetoEdicao: $scope.objEdicao.Id,
                        idEscola: 0,
                        idCategoria: $scope.idCategoria,
                        idTurma: 0,
                        idProjetoEquipe: 0,
                        idUsuario: 0,
                        idInscricao: 0,
                        intPagina: $scope.paramsParticipantes.intPagina,
                        //intRegPorPagina: $scope.ItensPorPagina,
                        intRegPorPagina: 1000000000,
                        strUF: '',
                        termo: ""
                    };										
					$http({
						url: path,
						method: "POST",
						params: parametros
					}).success(function (data)
					{   							
                        if(data.TurmasParticipantes) if (data.TurmasParticipantes instanceof Array) if (data.TurmasParticipantes.length > 0) if($scope.CacheEscolasCabos.length == 0)
						{                                    
							var temp = ",";
							var temp2 = ",";
							$scope.CacheEscolasCabos = [];
							for(var turma in data.TurmasParticipantes)
							{
								if (temp.indexOf("," + data.TurmasParticipantes[turma].Escola.Nome + ",") == -1) {
									temp += data.TurmasParticipantes[turma].Escola.Nome + ",";
									$scope.CacheEscolasCabos.push(data.TurmasParticipantes[turma].Escola);
								}

								if (temp2.indexOf("," + data.TurmasParticipantes[turma].Escola.Estado + ",") == -1) {
									temp2 += data.TurmasParticipantes[turma].Escola.Estado + ",";
									$scope.CacheEstadosCabos.push({
										Estado: $scope.getEstadoByUf(data.TurmasParticipantes[turma].Escola.Estado),
										Sigla: data.TurmasParticipantes[turma].Escola.Estado
									});
								}
							}

							if ($scope.CacheEscolasCabos.length > 0){
								$scope.CacheEscolasCabos.sort();
							}                                                                                     

							if ($scope.CacheEstadosCabos.length > 0){
								$scope.CacheEstadosCabos.sort();
							}    							                                       
						} 
					});
			}			
			
			// ##########################################################################################
			
            $scope.bolComites = false;
            if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto)
                $scope.bolComites = true;
            if($scope.bolHomeProjeto && $scope.objEnviosInscricao.TotalEnvios == 0){
                //console.log("nao tem");
            }
            if($scope.bolComites || (!$scope.bolComites && (($scope.bolEleicoes && $scope.bolHomeEtapa) || $scope.objEnviosInscricao.TotalEnvios > 0))) {
                if(idAba != $scope.controle.aba_atual){
                    self.EstadoSelecionado = undefined;
                    self.EscolaSelecionada = undefined;
                    self.TurmaSelecionada = undefined;
                }
                if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
                    self.reloadFiltrosParticipantes();
                }
                else{
                    self.reloadFiltrosMateriais();
                }
                if(!($scope.bolHomeEtapa && $scope.objEnviosInscricao.TotalEnvios==0 && idAba==1 && $scope.bolResultadosRevelados))
                    $scope.controle.aba_atual = idAba;        
            }
        }
        $scope.bolExibirFiltros = self.getUpdatedStatusToShowFilters();
    };

    $scope.getLinkEtapa = function (Edicao, Envio) {        
        var retorno = "";

        if (Edicao) if (Edicao.TipoProjeto) if (!isNaN(Edicao.TipoProjeto)) if (parseInt(Edicao.TipoProjeto)>0) if(Edicao.Id) if (!isNaN(Edicao.Id)) if (parseInt(Edicao.TipoProjeto)>0 && parseInt(Edicao.Id)>0) {
            switch (parseInt(Edicao.TipoProjeto)) {
                case 1:
                    //projeto
                    retorno = "/AVA/Projetos/" +  new Date(parseInt(Envio.DataCriacao.substr(6), 10)).getFullYear() + "/" + Edicao.Link + "/Etapas/" + Envio.Etapa.Link + "/";
                    break;
                case 2:
                    //clube
                    retorno = "/AVA/Projetos/Clube/" + Edicao.Projeto.Link + "/Desafios/" + Envio.Etapa.Link + "/";
                    break;
            }
            if(Envio.MensagemRapida) if(Envio.MensagemRapida.StrEncryptIdMensagem) if(Envio.MensagemRapida.StrEncryptIdMensagem!=""){
                retorno +=  Envio.MensagemRapida.StrEncryptIdMensagem;
            }
        }
        return retorno;
    };

    $scope.getLinkPerfil = function (idInscricaoTipo, idObjeto, linkUsuario) {
        var retorno = "";
        switch (parseInt(idInscricaoTipo)) {
            case 1:
                //1	Inscrição por turmas
                retorno = "/AVA/turma/" + idObjeto;
            case 2:
                //2	Inscrição por equipes em uma turma
                //Deve ir para o Minha(s) Equipe(s)
                retorno = "/AVA/Perfil/Home/Index/" + linkUsuario;
            case 3:
                //3	Inscrição por equipes em uma escola 
                //Deve ir para o Minha(s) Equipe(s)
                retorno = "/AVA/Perfil/Home/Index/" + linkUsuario;
            case 4:
                //4	Inscrição por Escola - vai para o mural da escola/home do projeto?
                retorno = "/AVA/Mural/";
            case 5:
                //5	Inscrição Individual
                retorno = "/AVA/Perfil/Home/Index/" + idObjeto;
                break;
            default:
                //erro
                break;
        }
        return retorno;
    };

    $scope.arrayOpcaoOrdenacao = [
        { Id: 1, Text: "Mais recentes"}, 
        { Id: 2, Text:  "Melhores avaliados"}
    ];
    $scope.filteredEnvioPortal = [];
    $scope.combo_order =  0;

    $scope.getPath=function(){
        if($location.path()){
            return $location.path();
        }
        else{
            return document.location.pathname;
        }
    };

    $scope.isHome=function(){
        var path =  $scope.getPath();
        if(path.substr(0,1)=="/"){
	        path=path.substr(1);
        }
        if(path.substr(path.length-1)=="/"){
	        path=path.substr(0,(path.length-1));
        }
        if(path.indexOf("/")!=-1) if(path.split("/").length==5){
            return true;
        }
        return false;
    };

    this.buscarEnvioPortalPaginado = function () {
        $scope.paramsPortal.intPagina++;
        var intPagina = $scope.paramsPortal.intPagina;
        var regPorPagina = $scope.paramsPortal.intRegPorPagina;

        var begin = ((intPagina * regPorPagina) - (regPorPagina- 1))-1;
        var end = (intPagina * regPorPagina)-1;
        for(var i = begin; i <= end; i++){
            if($scope.objComoFazer[i]){
                $scope.filteredEnvioPortal.push($scope.objComoFazer[i]);
            }
        }
    };

    this.buscarGaleriaOrdenado = function(){
        $scope.bolAplicandoFiltros = true;
        $scope.paramsPortal.intPagina=1;
        $scope.paramsMateriais.intPagina=1;
        if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
            if($scope.controle.aba_atual == 1){
                self.aplicarFiltros(2,true);
            }
            else if($scope.controle.aba_atual >= 2){
                self.buscarEnvioPortal(true);
            }
        }
        else{
            if($scope.controle.aba_atual == 1){
                self.aplicarFiltros(2,true);
            }
            else if($scope.controle.aba_atual == 2){
                self.buscarEnvioPortal(true);
            }
        } 
    };

    $scope.getEstadoByUf = function (strUF) {
        var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
        var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
        return arrNomes[arrSiglas.indexOf(strUF)];
    };

    this.getOrdenacao = function() {
        var retorno=0;
        if($scope.combo_order) if($scope.combo_order instanceof Object) if($scope.combo_order.Id) if(!isNaN($scope.combo_order.Id)){
            retorno=parseInt($scope.combo_order.Id);
        }
        if($scope.combo_order) if(!isNaN($scope.combo_order)){
            retorno=parseInt($scope.combo_order);
        }
        return retorno;
    }
           
    this.buscarParticipantes = function (bolNaoMudaAba) {
        //console.log("buscando...");
        if (!$scope.loadingBuscarGeral) {
            $scope.loadingBuscarGeral = true;
            $scope.paramsPortal.intPagina = 1;            
            var path = "/AVA/Projetos/Servico/GetTurmasParticipantesEdicaoCategoria/";
            var parametros = {
                idProjetoEdicao: $scope.objEdicao.Id,
                idEscola: 0,
                idCategoria: $scope.idCategoria,
                idTurma: 0,
                idProjetoEquipe: 0,
                idUsuario: 0,
                idInscricao: 0,
                intPagina: 1,
                intRegPorPagina: $scope.ItensPorPagina,
                strUF: "",
                termo: ""
            };

            $http.post(path, parametros).success(function(data) {
                //reseta a lista de participantes
                $scope.Participantes = new Array();
                $scope.TotalParticipantes = 0;
                $scope.hasMoreParticipantes = false;
                if (data.TurmasParticipantes) if (data.TurmasParticipantes instanceof Array) if(data.TurmasParticipantes.length>0) {
                    for (var participante in data.TurmasParticipantes) {
                        $scope.Participantes.push(data.TurmasParticipantes[participante]);
                    }
                    if (data.TurmasParticipantes.length == $scope.ItensPorPagina) {
                        $scope.hasMoreParticipantes = true;
                    }
                    $scope.TotalParticipantes = data.Total;
                }
                if(!bolNaoMudaAba){
                    self.openAbaGaleria(self.getAbaParaAbrir(),0);
                }
            }).error(function (err) {
                console.log("Não foi possível buscar detalhe da Etapa");
            }).finally(function(){
                //console.log("finnally");                
                //verifica se deve exibir o container dos filtros
                $scope.bolExibirFiltros = self.getUpdatedStatusToShowFilters();

                $scope.initialLoaded = true;

                //console.log("buscou participantes");
                if($scope.bolResultadosRevelados || $scope.bolPossuiResultadosLiberados){
                    //console.log("buscou participantes2");
                    self.buscarEnvioParticipantes(true);
                    //self.buscarEnvioPortal(($scope.TotalParticipantes==0));
                }
                else{
                    self.openAbaGaleria(self.getAbaParaAbrir(),0);
                    $scope.loadingBuscarGeral = false;
                }
            });
        }
    };

    this.buscarEnvioParticipantes = function (bolNaoMudaAba) {
        
        //$scope.loadingBuscarGeral = false;
        //this.buscarEnvioPortal(bolNaoMudaAba);

        //console.log("buscandooo...");
        //var _self = this;
        self.EstadoSelecionado = undefined;
        self.EscolaSelecionada = undefined;
        self.TurmaSelecionada = undefined;
        $timeout(function() {                           
            var idEstado = "";
            var idEscola = 0;
            var idTurma = 0;
            $scope.hasMoreElements = false;
            //$scope.objEnviosInscricao.TotalEnvios = 0;
            //$scope.objEnviosInscricao.Envios = new Array();
            $scope.paramsMateriais.intPagina = 1;
            var ordenacao = self.getOrdenacao();
            $scope.loadingBuscarGeral = true;
                                    
            var path = "/AVA/Projetos/Servico/GetInscricaoEnvioPaginado/";
            
            
            if($scope.idEtapaAbaAtual){
                $scope.paramsMateriais.idEtapaParam = $scope.idEtapaAbaAtual;
             }
            
            if($scope.IdEtapaAbreAba && $scope.IdEtapaAbreAba > 0){
                $scope.paramsMateriais.idEtapaParam = $scope.IdEtapaAbreAba;
            }

            if($scope.bolHomeEtapa && angular.isDefined($scope.objEtapa) && angular.isObject($scope.objEtapa) && angular.isNumber($scope.objEtapa.Id) && $scope.objEtapa.Id>0){
                $scope.paramsMateriais.idEtapaParam = $scope.objEtapa.Id;
            }

            var parametros = {
                idProjeto: $scope.objEdicao.Projeto.Id,
                idEdicao: $scope.objEdicao.Id,
                //idEtapa: $scope.paramsMateriais.idEtapaParam,
				idEtapa: $scope.IdEtapaAbreAba,
                idSituacao: 1,
                idEscola : idEscola,
                strUF : idEstado,
                idTurma: idTurma,
                idInscricao:0,
                idUsuario:0,
                tipoProjeto: $scope.objEdicao.TipoProjeto,
                tipoOrdenacao: ordenacao,
                intPagina: $scope.paramsMateriais.intPagina,
                intRegPorPagina: $scope.paramsMateriais.intRegPorPagina,
                intDestaque: $scope.paramsMateriais.simplesmenteDestaques,
                intAno : self.AnoSelecionado,
                idCategoria : $scope.idCategoria,
                bolEnviosCompletos:false,
                filtros:filtros
            };

            $http({
                url: path,
                method: "POST",
                params: parametros
            }).success(function (data) {
                if (data) if (data instanceof Object) {
                    //trata o recebimento da relação de materiais
                    if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                        $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);
                        $scope.nuncaExistiramMateriais=false;
                    }
                    if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                        $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                    }
                    if($scope.objEnviosInscricao.TotalEnvios>$scope.objEnviosInscricao.Envios.length){
                        $scope.hasMoreElements = true;
                    }
                    //trata o recebimento da relação de participantes para as galerias usadas nas páginas dos candidatos
                    if($scope.bolEleicoes && $scope.idCategoria > 0 && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto) if (data.TurmasParticipantes){//Participantes) {
                        var contador = 0;
                        for (var participante in data.TurmasParticipantes) {
                            $scope.Participantes.push(data.TurmasParticipantes[participante]);
                            contador++;
                        }
                        $scope.hasMoreParticipantes = false;
                        if (data.TurmasParticipantes) if (data.TurmasParticipantes instanceof Array) if( data.TurmasParticipantes.length>0){
                            if (data.TurmasParticipantes.length == $scope.ItensPorPagina) {
                                $scope.hasMoreParticipantes = true;
                            }
                            $scope.TotalParticipantes = data.Total;
                        }
                    }
					
					// #################################################################################
					if($scope.IdEtapaAbreAba > 0 || $scope.bolHomeEtapa){            
						var idEstado = 0;
						$scope.Estados = [];
						$scope.CacheEstados = [];
						self.EstadoSelecionado = undefined;

						var idEscola = 0;                            
						$scope.CacheEscolas = [];
						$scope.Escolas = [];
						self.EscolaSelecionada = undefined;

						var idTurma = 0;
						$scope.CacheTurmas = [];
						$scope.Turmas = [];                                                        
						self.TurmaSelecionada = undefined;  					
						
						self.CamposDeFiltro01Selecionado = undefined;
						self.CamposDeFiltro02Selecionado = undefined;
						self.CamposDeFiltro03Selecionado = undefined;
						self.CamposDeFiltro04Selecionado = undefined;
						self.CamposDeFiltro05Selecionado = undefined;
						self.CamposDeFiltro06Selecionado = undefined;
						self.CamposDeFiltro07Selecionado = undefined;
						self.CamposDeFiltro08Selecionado = undefined;
						self.CamposDeFiltro09Selecionado = undefined;
						self.CamposDeFiltro10Selecionado = undefined;            
						self.CamposDeFiltro01SelecionadoCache = undefined;
						self.CamposDeFiltro02SelecionadoCache = undefined;
						self.CamposDeFiltro03SelecionadoCache = undefined;
						self.CamposDeFiltro04SelecionadoCache = undefined;
						self.CamposDeFiltro05SelecionadoCache = undefined;
						self.CamposDeFiltro06SelecionadoCache = undefined;
						self.CamposDeFiltro07SelecionadoCache = undefined;
						self.CamposDeFiltro08SelecionadoCache = undefined;
						self.CamposDeFiltro09SelecionadoCache = undefined;
						self.CamposDeFiltro10SelecionadoCache = undefined;						

						if(data.listaEscolas) if (data.listaEscolas instanceof Array){                                    
							//escolas
							$scope.CacheEscolasImutavel = angular.copy(data.listaEscolas);                                                                
							//estados
							var temp = ",";
							$scope.Estados = [];
							for (var escola in $scope.CacheEscolasImutavel) {
								if (temp.indexOf("," + $scope.CacheEscolasImutavel[escola].Estado + ",") == -1) {
									temp += $scope.CacheEscolasImutavel[escola].Estado + ",";
									$scope.Estados.push({
										Estado: $scope.getEstadoByUf($scope.CacheEscolasImutavel[escola].Estado),
										Sigla: $scope.CacheEscolasImutavel[escola].Estado
									});
								}
							}
							if ($scope.Estados.length > 0){
								$scope.Estados.sort();
								$scope.CacheEstadosImutavel = angular.copy($scope.Estados);
								$scope.CacheEstados = angular.copy($scope.Estados);
							}
								
							//turmas
							if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {                                
								$scope.CacheTurmasImutavel = angular.copy(data.listaTurmas);
								$scope.CacheTurmas = angular.copy($scope.CacheTurmasImutavel);
								$scope.CacheTurmasMateriais = angular.copy($scope.CacheTurmasImutavel);                                
							}                                                                                                                                        
						}						
					}
					// #################################################################################
                }
                $scope.loadInProgress = false;
            }).error(function (err) {
                console.log("Não foi possível buscar materiais da etapa");
            }).finally(function(){
                if(!bolNaoMudaAba){
                    if($scope.bolHomeProjeto && $scope.objEnviosInscricao.TotalEnvios>0)
                        self.openAbaGaleria(1,0);
                    else{
                        //console.log("teste");
                        self.openAbaGaleria(self.getAbaParaAbrir(),0);
                    }
                }else{
                    $scope.loadingBuscarGeral = false;
                }
                //verifica se deve exibir o container dos filtros
                $scope.bolExibirFiltros = self.getUpdatedStatusToShowFilters();
               
                $scope.initialLoaded = true;
            });
        },150);
    };


    this.buscarEnvioPortal = function (bolNaoMudaAba) {
        //console.log("buscando...");
        if (!$scope.loadingBuscarGeral) {
            $scope.loadingBuscarGeral = true;
            $scope.paramsPortal.intPagina = 1;
            $scope.nuncaExistiramMateriais = true;
            $http.post('/AVA/Projetos/Servico/GetPortalEnvioPorIdProjetoEdicaoEtapaTipoProjeto', {
                idProjeto: $scope.objEdicao.Projeto.Id,
                idEdicao: $scope.objEdicao.Id,
                idEtapa: $scope.paramsPortal.idEtapaParam,
                tipoProjeto: $scope.objEdicao.TipoProjeto,
                tipoOrdenacao: self.getOrdenacao(),
                intPagina: $scope.paramsPortal.intPagina,
                intRegPorPagina: $scope.paramsPortal.intRegPorPagina,
                intDestaque: $scope.paramsMateriais.simplesmenteDestaques,
                intAno : self.AnoSelecionado,
                idCategoria: $scope.idCategoria
            }).success(function(data) {
                $scope.objComoFazer = data.listPortalEnvio; //popula como fazer
                $scope.filteredEnvioPortal = [];

                var intPagina = $scope.paramsPortal.intPagina;
                var regPorPagina = $scope.paramsPortal.intRegPorPagina;
                var begin = ((intPagina * regPorPagina) - (regPorPagina- 1))-1;
                var end = (intPagina * regPorPagina)-1;

                if (data.listPortalEnvio) if (data.listPortalEnvio instanceof Array) if (data.listPortalEnvio.length > 0) {
                    $scope.nuncaExistiramMateriais=false;
                    for(var i = begin; i <= end; i++){
                        if(data.listPortalEnvio[i]){
                            $scope.filteredEnvioPortal.push(data.listPortalEnvio[i]);
                        }
                    }
                }

                /*if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {
                    //obtem a relação de turmas filtradas, apenas aquelas que possuem envios publicados na categoria
                    $scope.CacheTurmas = angular.copy(data.listaTurmas);
                    $scope.CacheTurmasMateriais = angular.copy($scope.CacheTurmas);
                    $scope.Turmas = angular.copy($scope.CacheTurmas);
                }*/

                $scope.paramsPortal.total = data.countPortalEnvio;

                //lista de categorias para filtro.
				/*if (data.listPortalEnvio) if (data.listPortalEnvio instanceof Array) if (data.listPortalEnvio.length > 0) {
					var temp = ",";

					$scope.CacheCategorias = data.listPortalEnvio;
					$scope.Categorias = angular.copy($scope.CacheCategorias);
                    $scope.CatAux = [];

					for (var categoria in $scope.Categorias){
						if (temp.indexOf("," + $scope.Categorias[categoria].Titulo + ",") == -1) {
                            temp += $scope.Categorias[categoria].Titulo + ",";
							$scope.CatAux.push({
								Categoria: $scope.Categorias[categoria].Titulo,
                                Titulo: $scope.Categorias[categoria].Titulo
							});
						}
					}
					if ($scope.CatAux.length > 0){
						$scope.CatAux.sort();
						$scope.CacheCategorias = angular.copy($scope.CatAux);
                        $scope.Categorias = angular.copy($scope.CatAux);
					}
				}*/

                if(data.listaAnos){
                    $scope.listaAnos = data.listaAnos;
                }

                /*if(data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0 && $scope.CacheEscolasImutavel.length <= 0){                                    
                    //escolas
                    $scope.CacheEscolasImutavel = angular.copy(data.listaEscolas);                                    
                    //$scope.CacheEscolas = angular.copy($scope.CacheEscolasImutavel);
                    //$scope.Escolas = angular.copy($scope.CacheEscolasImutavel);                                    
                            
                    //estados
                    var temp = ",";
                    $scope.Estados = [];
                    for (var escola in $scope.CacheEscolasImutavel) {
                        if (temp.indexOf("," + $scope.CacheEscolasImutavel[escola].Estado + ",") == -1) {
                            temp += $scope.CacheEscolasImutavel[escola].Estado + ",";                            
                            $scope.Estados.push({
                                Estado: $scope.getEstadoByUf($scope.CacheEscolasImutavel[escola].Estado),
                                Sigla: $scope.CacheEscolasImutavel[escola].Estado
                            });
                        }
                    }
                    if ($scope.Estados.length > 0){
                        $scope.Estados.sort();
                        $scope.CacheEstadosImutavel = angular.copy($scope.Estados);
                        $scope.CacheEstados = angular.copy($scope.Estados);
                    }
                            
                    //turmas
                    if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {                                
                        $scope.CacheTurmasImutavel = angular.copy(data.listaTurmas);
                        $scope.CacheTurmas = angular.copy($scope.CacheTurmasImutavel);
                        $scope.CacheTurmasMateriais = angular.copy($scope.CacheTurmasImutavel);                                
                    }                                                                                                                                        
                }*/

                //lista de escolas/estados para os filtros
                //-----------
                /*var listaTurmasTemp = [];
                var listaEscolasTemp = [];
                for(var envio in data.listParticipanteEnvio){
                    if(data.listParticipanteEnvio[envio].Inscricao && data.listParticipanteEnvio[envio].Inscricao.Turma && data.listParticipanteEnvio[envio].Inscricao.Turma.Escola)
                        listaEscolasTemp.push(data.listParticipanteEnvio[envio].Inscricao.Turma.Escola);
                    if(data.listParticipanteEnvio[envio].Inscricao && data.listParticipanteEnvio[envio].Inscricao.Turma)
                        listaTurmasTemp.push(data.listParticipanteEnvio[envio].Inscricao.Turma);
                }*/
                //-----------
                /* if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {
                //if (listaEscolasTemp) if (listaEscolasTemp instanceof Array) if (listaEscolasTemp.length > 0) {
                    var temp = ",";

                    $scope.CacheEscolas = angular.copy(data.listaEscolas);
                    $scope.CacheEscolasFinal = angular.copy($scope.CacheEscolas);
                    $scope.Escolas = angular.copy($scope.CacheEscolas);
                    $scope.Estados = [];
                            
                    for (var escola in $scope.Escolas) {
                        if (temp.indexOf("," + $scope.Escolas[escola].Estado + ",") == -1) {
                            temp += $scope.Escolas[escola].Estado + ",";
                            $scope.Estados.push({
                                Estado: $scope.getEstadoByUf($scope.Escolas[escola].Estado),
                                Sigla: $scope.Escolas[escola].Estado
                            });
                        }
                    }

                    if ($scope.Estados.length > 0){
                        $scope.Estados.sort();
                        $scope.CacheEstados = angular.copy($scope.Estados);
                    }
                }*/

                //lista de turmas para os filtros
                /*if (data.listaTurmas && data.listaTurmas instanceof Array && data.listaTurmas.length > 0) {
                //if (listaTurmasTemp && listaTurmasTemp instanceof Array && listaTurmasTemp.length > 0) {
                    $scope.CacheTurmas = angular.copy(data.listaTurmas);
                    $scope.CacheTurmasMateriais = angular.copy($scope.CacheTurmas);
                    $scope.Turmas = angular.copy($scope.CacheTurmas);
                }*/
                if($scope.bolResultadosRevelados){
                    //valor base para o total de envios
                    if(data.TotalEnvios){
                        $scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios;
                    }

                    //popula os envios
                    if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                        $scope.nuncaExistiramMateriais=false;
                        $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                    }
                    try{
                        if(
                            (!data.listParticipanteEnvio || data.listParticipanteEnvio.length == 0) 
                            &&  $scope.objComoFazer.length > 0
                        ){
                            $scope.nuncaExistiramMateriais = true;
                        }
                    }catch(err){}
                }


            }).error(function (err) {
                console.log("Não foi possível buscar detalhe da Etapa");
            }).finally(function(){
                if(!bolNaoMudaAba){
                    self.openAbaGaleria(self.getAbaParaAbrir(),0);
                }
                //verifica se deve exibir o container dos filtros
                $scope.bolExibirFiltros = self.getUpdatedStatusToShowFilters();

                $scope.initialLoaded = true;                

                //old
                //if($scope.bolPossuiResultadosLiberados && !bolNaoMudaAba)
                //if(($scope.bolResultadosRevelados || $scope.bolPossuiResultadosLiberados) && !bolNaoMudaAba && !($scope.objEtapa.BolSemGaleria && $scope.bolHomeEtapa))
                /*
                console.log("vai");
                console.log(bolNaoMudaAba);
                console.log($scope.bolResultadosRevelados);
                console.log($scope.objEtapa.BolSemGaleria);
                console.log($scope.bolHomeEtapa);
                */
                if(
                    !bolNaoMudaAba && 
                    (
                        (!$scope.bolResultadosRevelados && $scope.bolHomeEtapa) 
                        || 
                        ($scope.bolResultadosRevelados && !$scope.objEtapa.BolSemGaleria)
                    )
                ){
                    self.buscarEnvioParticipantes(bolNaoMudaAba);
                }else{
                    $scope.loadingBuscarGeral = false;
                }

            });
        }
    };

    this.aplicarFiltros = function (level,bolNaoMudaAba,Objeto) {
        $scope.bolAplicandoFiltros = true;
        //var self = this;
        if(level == 3){
            self.buscarEnvioPortal(true);
            self.EstadoSelecionado = undefined;
            self.EscolaSelecionada = undefined;
            self.TurmaSelecionada = undefined;
            return true;
        }
                
        $timeout(function() {
            var idEstado = "";
            var idEscola = 0;
            var idTurma = 0;

            if (self.EstadoSelecionado) if (self.EstadoSelecionado.Sigla) if (self.EstadoSelecionado.Sigla != "") {
                idEstado = self.EstadoSelecionado.Sigla;
            }
            if (self.EscolaSelecionada) if (self.EscolaSelecionada.Id) if (!isNaN(self.EscolaSelecionada.Id)) if (parseInt(self.EscolaSelecionada.Id)>0){
                idEscola = parseInt(self.EscolaSelecionada.Id);
            }
            if (self.TurmaSelecionada) if (self.TurmaSelecionada.Id) if (!isNaN(self.TurmaSelecionada.Id)) if (parseInt(self.TurmaSelecionada.Id)>0){
                idTurma = parseInt(self.TurmaSelecionada.Id);
            }

            //correção dos dados dos filtros em caso de estar utilizando a galeria de participantes
            if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
                if($scope.controle.aba_atual == 1){
                    self.reloadFiltrosParticipantes();
                }
                if($scope.controle.aba_atual == 2){
                    self.reloadFiltrosMateriais();
                }
            }

            //aplica filtragens nas combos após a seleção
            /*
            switch (level) {
                case 0:
                    //filtra as Escolas conforme o Estado selecionado
                    self.EscolaSelecionada = undefined;
                    self.TurmaSelecionada = undefined;
                    $scope.Turmas = [];
                    if (idEstado.length == 2) {
                        //filtra as escolas conforme o estado selecionado
                        var escolas = $filter('filter')($scope.CacheEscolas, { Estado: idEstado }, true);
                        $scope.Escolas = angular.copy(escolas);
                    }
                    else {
                        $scope.Escolas = angular.copy($scope.CacheEscolas);
                    }
                    break;
                case 1:
                    //filtra as turmas conforme a escola selecionada
                    self.TurmaSelecionada = undefined;
                    if (idEscola>0) {
                        //filtra as escolas conforme o estado selecionado
                        var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
                        $scope.Turmas = angular.copy(turmas);
                    }
                    else {
                        $scope.Turmas = [];
                    }
                    break;                                                                               
            }
            */

            self.CamposDeFiltro01SelecionadoCache = undefined;
            self.CamposDeFiltro02SelecionadoCache = undefined;
            self.CamposDeFiltro03SelecionadoCache = undefined;
            self.CamposDeFiltro04SelecionadoCache = undefined;
            self.CamposDeFiltro05SelecionadoCache = undefined;
            self.CamposDeFiltro06SelecionadoCache = undefined;
            self.CamposDeFiltro07SelecionadoCache = undefined;
            self.CamposDeFiltro08SelecionadoCache = undefined;
            self.CamposDeFiltro09SelecionadoCache = undefined;
            self.CamposDeFiltro10SelecionadoCache = undefined;

            filtros = '';

            if(self.CamposDeFiltro01Selecionado){
                filtros += self.CamposDeFiltro01Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro01Selecionado.IdFormularioCampoOpcao + ';';                                
                self.CamposDeFiltro01SelecionadoCache = angular.copy(self.CamposDeFiltro01Selecionado);
            }if(self.CamposDeFiltro02Selecionado){
                filtros += self.CamposDeFiltro02Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro02Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro02SelecionadoCache = angular.copy(self.CamposDeFiltro02Selecionado);
            }if(self.CamposDeFiltro03Selecionado){
                filtros += self.CamposDeFiltro03Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro03Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro03SelecionadoCache = angular.copy(self.CamposDeFiltro03Selecionado);
            }if(self.CamposDeFiltro04Selecionado){
                filtros += self.CamposDeFiltro04Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro04Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro04SelecionadoCache = angular.copy(self.CamposDeFiltro04Selecionado);
            }if(self.CamposDeFiltro05Selecionado){
                filtros += self.CamposDeFiltro05Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro05Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro05SelecionadoCache = angular.copy(self.CamposDeFiltro05Selecionado);
            }if(self.CamposDeFiltro06Selecionado){
                filtros += self.CamposDeFiltro06Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro06Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro06SelecionadoCache = angular.copy(self.CamposDeFiltro06Selecionado);
            }if(self.CamposDeFiltro07Selecionado){
                filtros += self.CamposDeFiltro07Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro07Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro07SelecionadoCache = angular.copy(self.CamposDeFiltro07Selecionado);
            }if(self.CamposDeFiltro08Selecionado){
                filtros += self.CamposDeFiltro08Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro08Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro08SelecionadoCache = angular.copy(self.CamposDeFiltro08Selecionado);
            }if(self.CamposDeFiltro09Selecionado){
                filtros += self.CamposDeFiltro09Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro09Selecionado.IdFormularioCampoOpcao + ';';
                self.CamposDeFiltro09SelecionadoCache = angular.copy(self.CamposDeFiltro09Selecionado);
            }if(self.CamposDeFiltro10Selecionado){
                filtros += self.CamposDeFiltro10Selecionado.IdFormularioCampo + ':' + self.CamposDeFiltro10Selecionado.IdFormularioCampoOpcao + ';';                                    
                self.CamposDeFiltro10SelecionadoCache = angular.copy(self.CamposDeFiltro10Selecionado);
            }

            /*
            var idEscola = 0;
            var idTurma = 0; */
            /*if (self.EscolaSelecionada) if (self.EscolaSelecionada.Id) if (!isNaN(self.EscolaSelecionada.Id)) if (parseInt(self.EscolaSelecionada.Id)>0){
                idEscola = parseInt(self.EscolaSelecionada.Id);
            }
            if (self.TurmaSelecionada) if (self.TurmaSelecionada.Id) if (!isNaN(self.TurmaSelecionada.Id)) if (parseInt(self.TurmaSelecionada.Id)>0){
                idTurma = parseInt(self.TurmaSelecionada.Id);
            }*/
            
            if(true){
                //reseta/recarrega todos os elementos
                        
                if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto && $scope.controle.aba_atual==1){
                    //reseta a lista de participantes
                    $scope.Participantes = new Array();
                    $scope.TotalParticipantes = 0;
                    $scope.hasMoreParticipantes = false;
                }
                else{
                    $scope.hasMoreElements = false;
                    //reseta a lista de materiais
                    //$scope.CacheEscolasFinal = angular.copy($scope.CacheEscolas),
                    //if (parametros.intPagina == 1){
                        $scope.objEnviosInscricao.TotalEnvios = 0;
                        $scope.objEnviosInscricao.Envios = new Array();
                    //}
                }

                $scope.paramsMateriais.intPagina = 1;

                if($scope.IdEtapaAbreAba && $scope.IdEtapaAbreAba > 0){
                    $scope.paramsMateriais.idEtapaParam = $scope.IdEtapaAbreAba;
                }else if($scope.bolHomeEtapa && angular.isDefined($scope.objEtapa) && angular.isObject($scope.objEtapa) && angular.isNumber($scope.objEtapa.Id) && $scope.objEtapa.Id>0){
                    $scope.paramsMateriais.idEtapaParam = $scope.objEtapa.Id;
                }

                if(level == 0){
                    // ao trocar estado reseta escolas e turmas
                    idEscola = 0,                            
                    $scope.CacheEscolas = [];
                    $scope.Escolas = [];
                    self.EscolaSelecionada = undefined;

                    idTurma = 0,
                    $scope.CacheTurmas = [];
                    $scope.Turmas = [];                                                        
                    self.TurmaSelecionada = undefined;

                }else if(level == 1){
                    // ao trocar escola reseta turmas                            
                    idTurma = 0,
                    $scope.CacheTurmas = [];
                    $scope.Turmas = [];
                    self.TurmaSelecionada = undefined;
                } 

                var ordenacao = self.getOrdenacao();
                
                if(!naoCarregaLoader){
                    $scope.loadingBuscarGeral = true;
                }else{
                    $scope.objEnviosInscricao.TotalEnvios = 1;
                    $scope.objEnviosInscricao.Envios = 1;                 
                }
                
                var path = "/AVA/Projetos/Servico/GetInscricaoEnvioPaginado/";
                var parametros = {
                    idProjeto: $scope.objEdicao.Projeto.Id,
                    idEdicao: $scope.objEdicao.Id,
                    idEtapa: $scope.paramsMateriais.idEtapaParam,
                    idSituacao: 1,
                    idEscola : idEscola,
                    strUF : idEstado,
                    idTurma: idTurma,
                    idInscricao:0,
                    idUsuario:0,
                    tipoProjeto: $scope.objEdicao.TipoProjeto,
                    tipoOrdenacao: ordenacao,
                    intPagina: $scope.paramsMateriais.intPagina,
                    intRegPorPagina: $scope.paramsMateriais.intRegPorPagina,
                    intDestaque: $scope.paramsMateriais.simplesmenteDestaques,
                    intAno : self.AnoSelecionado,
                    idCategoria : $scope.idCategoria,
                    bolEnviosCompletos:false,
                    filtros:filtros
                };
                if ($scope.bolEleicoes && $scope.idCategoria>0 && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto && $scope.controle.aba_atual==1){
                    
                    $scope.paramsParticipantes.intRegPorPagina = $scope.ItensPorPagina;
                    path = "/AVA/Projetos/Servico/GetTurmasParticipantesEdicaoCategoria/";
                    parametros = {
                        idProjetoEdicao: $scope.objEdicao.Id,
                        idEscola: idEscola,
                        idCategoria: $scope.idCategoria,
                        idTurma: idTurma,
                        idProjetoEquipe: 0,
                        idUsuario: 0,
                        idInscricao: 0,
                        intPagina: $scope.paramsParticipantes.intPagina,
                        intRegPorPagina: $scope.ItensPorPagina,
                        strUF: idEstado,
                        termo: ""
                    };
                }
                else{
                    if (!naoCarregaLoader){                     
                        $scope.hasMoreElements = false;
                        $scope.objEnviosInscricao.TotalEnvios = 0;
                        $scope.objEnviosInscricao.Envios = new Array();
                    }
                }
                
                $http({
                    url: path,
                    method: "POST",
                    params: parametros
                }).success(function (data) {                    
                    if (data) if (data instanceof Object) {
                        //trata o recebimento da relação de materiais
                        if (data.TotalEnvios != undefined) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                            $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);                            
                            if(naoCarregaLoader && $scope.objEnviosInscricao.TotalEnvios == 0){
                                $scope.objEnviosInscricao.Envios = 0;                                
                            }
                            $scope.nuncaExistiramMateriais=false;
                        }
                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                        }
                        if($scope.objEnviosInscricao.TotalEnvios>$scope.objEnviosInscricao.Envios.length){
                            $scope.hasMoreElements = true;
                        }
                        //trata o recebimento da relação de participantes para as galerias usadas nas páginas dos candidatos
                        if($scope.bolEleicoes && $scope.idCategoria > 0 && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto) if (data.TurmasParticipantes){//Participantes) {
                            var contador = 0;
                            //for (var participante in data.Participantes) {
                            for (var participante in data.TurmasParticipantes) {
                                $scope.Participantes.push(data.TurmasParticipantes[participante]);
                                contador++;
                            }
                            $scope.hasMoreParticipantes = false;
                            if (data.TurmasParticipantes) if (data.TurmasParticipantes instanceof Array) if( data.TurmasParticipantes.length>0){
                                if (data.TurmasParticipantes.length == $scope.ItensPorPagina) {
                                    $scope.hasMoreParticipantes = true;
                                }
                                $scope.TotalParticipantes = data.Total;
                            }
                        }

                        // -------------------------------------------------                                
                                // aba dos participantes
                                if ($scope.bolEleicoes && $scope.idCategoria>0 && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto && $scope.controle.aba_atual==1){
                                    switch(level)
                                    {
                                        case 0:
                                            if(idEstado && idEstado.length == 2){
                                                $scope.Escolas = angular.copy($filter('filter')($scope.CacheEscolasCabos, { Estado: idEstado }, true));
                                            }
                                            break;                                        
                                        case 1:
                                            $scope.Escolas = angular.copy($filter('filter')($scope.CacheEscolasCabos, { Estado: idEstado }, true));  
                                            break;
                                    }                                                                                        

                                }else{
                                    $scope.Escolas = angular.copy($scope.CacheEscolasImutavel);
                                    $scope.Estados = angular.copy($scope.CacheEstadosImutavel);
                                    //$scope.Turmas = angular.copy($scope.CacheTurmasImutavel);

                                    if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {                                
                                        $scope.CacheTurmas = angular.copy(data.listaTurmas);                                                
                                    } 
                                                                       
                                    //reseta filtros se não houver nenhum envio
                                    naoCarregaLoader = false;
                                    if($scope.objEnviosInscricao.TotalEnvios == 0 && filtros != ''){                                        
                                        naoCarregaLoader = true;
                                        filtros = '';
                                        self.CamposDeFiltro01Selecionado = undefined;
                                        self.CamposDeFiltro02Selecionado = undefined;
                                        self.CamposDeFiltro03Selecionado = undefined;
                                        self.CamposDeFiltro04Selecionado = undefined;
                                        self.CamposDeFiltro05Selecionado = undefined;
                                        self.CamposDeFiltro06Selecionado = undefined;
                                        self.CamposDeFiltro07Selecionado = undefined;
                                        self.CamposDeFiltro08Selecionado = undefined;
                                        self.CamposDeFiltro09Selecionado = undefined;
                                        self.CamposDeFiltro10Selecionado = undefined;            
                                        self.CamposDeFiltro01SelecionadoCache = undefined;
                                        self.CamposDeFiltro02SelecionadoCache = undefined;
                                        self.CamposDeFiltro03SelecionadoCache = undefined;
                                        self.CamposDeFiltro04SelecionadoCache = undefined;
                                        self.CamposDeFiltro05SelecionadoCache = undefined;
                                        self.CamposDeFiltro06SelecionadoCache = undefined;
                                        self.CamposDeFiltro07SelecionadoCache = undefined;
                                        self.CamposDeFiltro08SelecionadoCache = undefined;
                                        self.CamposDeFiltro09SelecionadoCache = undefined;
                                        self.CamposDeFiltro10SelecionadoCache = undefined;
                                        
                                        $scope.objEnviosInscricao.TotalEnvios = 1;
                                        $scope.objEnviosInscricao.Envios = 1;
                                        
                                        self.aplicarFiltros(level, true, Objeto);
                                    }                                 

                                    if(level == 0){                                    
                                        if(idEstado && idEstado.length == 2){
                                            $scope.Escolas = angular.copy($filter('filter')($scope.Escolas, { Estado: idEstado }, true));
                                        }else{
                                            $scope.Escolas = angular.copy($scope.Escolas);
                                        }                                    
                                    }else if(level > 0 && idEscola > 0){
                                        $scope.Turmas = angular.copy($filter('filter')($scope.CacheTurmas , { Escola: { Id : idEscola} }, true));                                                                                        
                                    }
                                
                                    /*switch (level) {
                                        case 0:
                                            if(idEstado && idEstado.length == 2){
                                                $scope.Escolas = angular.copy($filter('filter')($scope.Escolas, { Estado: idEstado }, true));
                                            }else{
                                                $scope.Escolas = angular.copy($scope.Escolas);
                                            }
                                            break;                                                                               
                                        case 1:
                                            if(idEscola > 0){
                                                $scope.Turmas = angular.copy($filter('filter')($scope.CacheTurmas , { Escola: { Id : idEscola} }, true));                                            
                                            }
                                            break;                                                                                                               
                                        case 2:                                        
                                            if(idEscola > 0){
                                                $scope.Turmas = angular.copy($filter('filter')($scope.Turmas , { Escola: { Id : idEscola} }, true));                                            
                                            }
                                            break;                                        
                                        case 4:                                                                                 
                                            break;
                                    } */
                                }                                               
                        // ------------------------------------------------- 

                        if(data.listaCamposDeFiltro){                                                                                                             
                            $scope.listaCamposDeFiltro01 = [];                            
                            $scope.listaCamposDeFiltro02 = [];                            
                            $scope.listaCamposDeFiltro03 = [];                            
                            $scope.listaCamposDeFiltro04 = [];                            
                            $scope.listaCamposDeFiltro05 = [];                            
                            $scope.listaCamposDeFiltro06 = [];                            
                            $scope.listaCamposDeFiltro07 = [];                            
                            $scope.listaCamposDeFiltro08 = [];                            
                            $scope.listaCamposDeFiltro09 = [];                            
                            $scope.listaCamposDeFiltro10 = [];                                     
                                    
                            // Monta listas
                            for(var campo in data.listaCamposDeFiltro){
                                for(var opcao in data.listaCamposDeFiltro[campo]){    
                                    switch(campo){
                                        case '0' : $scope.listaCamposDeFiltro01.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '1' : $scope.listaCamposDeFiltro02.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '2' : $scope.listaCamposDeFiltro03.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '3' : $scope.listaCamposDeFiltro04.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '4' : $scope.listaCamposDeFiltro05.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '5' : $scope.listaCamposDeFiltro06.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '6' : $scope.listaCamposDeFiltro07.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '7' : $scope.listaCamposDeFiltro08.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '8' : $scope.listaCamposDeFiltro09.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                        case '9' : $scope.listaCamposDeFiltro10.push(data.listaCamposDeFiltro[campo][opcao][0]); break;
                                    }                                                                  
                                }
                            }

                            self.CamposDeFiltro01Selecionado = undefined;
                            self.CamposDeFiltro02Selecionado = undefined;
                            self.CamposDeFiltro03Selecionado = undefined;
                            self.CamposDeFiltro04Selecionado = undefined;
                            self.CamposDeFiltro05Selecionado = undefined;
                            self.CamposDeFiltro06Selecionado = undefined;
                            self.CamposDeFiltro07Selecionado = undefined;
                            self.CamposDeFiltro08Selecionado = undefined;
                            self.CamposDeFiltro09Selecionado = undefined;
                            self.CamposDeFiltro10Selecionado = undefined;
                            
                            atualizarSelecionado($scope.listaCamposDeFiltro01,1);
                            atualizarSelecionado($scope.listaCamposDeFiltro02,2);
                            atualizarSelecionado($scope.listaCamposDeFiltro03,3);                            
                            atualizarSelecionado($scope.listaCamposDeFiltro04,4);
                            atualizarSelecionado($scope.listaCamposDeFiltro05,5);
                            atualizarSelecionado($scope.listaCamposDeFiltro06,6);
                            atualizarSelecionado($scope.listaCamposDeFiltro07,7);
                            atualizarSelecionado($scope.listaCamposDeFiltro08,8);
                            atualizarSelecionado($scope.listaCamposDeFiltro09,9);
                            atualizarSelecionado($scope.listaCamposDeFiltro10,10);                     
                        }
                    }
                    $scope.loadInProgress = false;
                }).error(function (err) {
                    console.log("Não foi possível buscar materiais da etapa");
                }).finally(function(){
                    if(!bolNaoMudaAba){
                        self.openAbaGaleria(self.getAbaParaAbrir(),0);
                    }
                    //verifica se deve exibir o container dos filtros
                    $scope.bolExibirFiltros = self.getUpdatedStatusToShowFilters();

                    $scope.loadingBuscarGeral = false;
                    $scope.initialLoaded = true;
                });
            }            
        },150);
    };

    this.verificaEnvioFechado = function(){
        var retorno = false;

        if($scope.listaAnos){
            if($scope.listaAnos instanceof Array){
                if($scope.listaAnos.length > 1 && this.AnoSelecionado){
                    if(parseInt(this.AnoSelecionado) != parseInt($scope.listaAnos[$scope.listaAnos.length - 1])){
                        retorno = true;
                    }
                }else if($scope.listaAnos.length == 1){
                    var anoAtual = new Date().getFullYear();
                    if(anoAtual > $scope.listaAnos[0]){
                        return true;
                    }
                }
            } 
        }

        return retorno;
    };

    var _thisController = this;
    $scope.carregaProximaPagina = function () {
        //concatena no model os novos dados obtidos
        $scope.loadMoreInProgress = true;
        var idEscola = 0;
        var idEstado = "";
        var idTurma = 0;
        if (_thisController.EstadoSelecionado && _thisController.EstadoSelecionado.Sigla && _thisController.EstadoSelecionado.Sigla != "") {
            idEstado = _thisController.EstadoSelecionado.Sigla;
        }
        if (_thisController.EscolaSelecionada && _thisController.EscolaSelecionada.Id && !isNaN(_thisController.EscolaSelecionada.Id)) {
            idEscola = _thisController.EscolaSelecionada.Id;
        }
        if (_thisController.TurmaSelecionada && _thisController.TurmaSelecionada.Id && !isNaN(_thisController.TurmaSelecionada.Id)) if (parseInt(_thisController.TurmaSelecionada.Id)>0){
            idTurma = parseInt(_thisController.TurmaSelecionada.Id);
        }

        if($scope.bolHomeEtapa && angular.isDefined($scope.objEtapa) && angular.isObject($scope.objEtapa) && angular.isNumber($scope.objEtapa.Id) && $scope.objEtapa.Id>0){
            $scope.paramsMateriais.idEtapaParam = $scope.objEtapa.Id;
        }
        
        var ordenacao = self.getOrdenacao();
        var path = "";
        var parametros = {};
        if ($scope.bolEleicoes && $scope.controle.aba_atual == 1 && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
            $scope.paramsParticipantes.intPagina++;
            path = "/AVA/Projetos/Servico/GetTurmasParticipantesEdicaoCategoria/";
            parametros = {
                idProjetoEdicao: $scope.objEdicao.Id,
                idEscola: idEscola,
                idCategoria: $scope.idCategoria,
                idTurma: idTurma,
                idProjetoEquipe: 0,
                idUsuario: 0,
                idInscricao: 0,
                intPagina: $scope.paramsParticipantes.intPagina,
                intRegPorPagina: $scope.ItensPorPagina,
                strUF: idEstado,
                termo: ""
            };
        }
        else{            
            $scope.paramsMateriais.intPagina++;
            path = "/AVA/Projetos/Servico/GetInscricaoEnvioPaginado/"
            parametros = {
                idProjeto: $scope.objEdicao.Projeto.Id,
                idEdicao: $scope.objEdicao.Id,
                idEtapa: $scope.paramsMateriais.idEtapaParam,
                idSituacao: 1,
                idEscola: idEscola,
                strUF: idEstado,
                idTurma: idTurma,
                idInscricao:0,
                idUsuario:0,
                tipoProjeto: $scope.objEdicao.TipoProjeto,
                tipoOrdenacao: ordenacao,
                intPagina: $scope.paramsMateriais.intPagina,
                intRegPorPagina: $scope.paramsMateriais.intRegPorPagina,
                intDestaque: $scope.paramsMateriais.simplesmenteDestaques,
                idCategoria: $scope.idCategoria,
                bolEnviosCompletos:false, 
                filtros:filtros
            };
        }
        if(path != "" && (parametros.idEdicao>0 || parametros.idProjetoEdicao>0) && parametros.intPagina>0 && parametros.intRegPorPagina>0){
            
            $http({
                url: path,
                method: "POST",
                params: parametros
            }).success(function (data) {
                $scope.pagina++;
                if (data) if (data instanceof Object) {
                    if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                        $scope.objEnviosInscricao.TotalEnvios = parseInt(data.Total);
                    }
                    if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array){
                        if (data.listParticipanteEnvio.length > 0) {
                            angular.forEach(data.listParticipanteEnvio, function (valor, chave) {
                                $scope.objEnviosInscricao.Envios.push(valor);
                            });
                        }
                        if(data.TotalEnvios > 0){
                            $scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios; 
                        }
                        else{
                            $scope.objEnviosInscricao.TotalEnvios = $scope.objEnviosInscricao.Envios.length; 
                        }
                        //$scope.controle.aba_atual = 1;
                    }
                    if($scope.bolEleicoes && $scope.controle.aba_atual == 1) if (data.TurmasParticipantes){
                        //$scope.Participantes = new Array();
                        //console.log("mo");
                        var contador = 0;
                        $scope.hasMoreParticipantes=false;
                        if (data.TurmasParticipantes) if (data.TurmasParticipantes instanceof Array) if(projetoTools.hasArrayElems(data.TurmasParticipantes)){
                            for (var participante in data.TurmasParticipantes) {
                                $scope.Participantes.push(data.TurmasParticipantes[participante]);
                                contador++;
                            }
                            if (data.TurmasParticipantes.length>0 || data.Total>0){
                                if (data.TurmasParticipantes.length == $scope.ItensPorPagina) {
                                    $scope.hasMoreParticipantes = true;
                                }
                                $scope.TotalParticipantes = data.Total;
                            }
                        }
                    }
                }
                $scope.loadMoreInProgress = false;
            });
        }
    };

    $scope.isRelacionadoComite = function (categoria) {
        $scope.objUsuario = constantes.Usuario;                                                                               
        for(var turma in $scope.objUsuario.TurmasInscritas){
            if($scope.objUsuario.TurmasInscritas[turma].Inscricao.Categorias[0].Id == categoria.Id){                            
                        
                for(var parceiro in $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros){
                    if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros[parceiro].Id){                                
                        return true;
                    }
                }
                                                        
                if($scope.objUsuario.Cargos && $scope.objUsuario.Cargos.length == 1)
                    if($scope.objUsuario.Cargos[0] == 'Aluno' || $scope.objUsuario.Cargos[0] == 'Responsável')
                        return true;
                        
                if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Responsavel.Id)
                    return true;                        
                        
            }                                      
        }
        return false;          
    };

    $scope.getAudioCandidato = function (categoria) {

        /*  situacaoEtapa
        1 - Aguarde
        2 - Confira/Envie
        3 - Confira os envios/Etapa passou
        4 - Confira o resultado
        */

        if(angular.isObject($scope.objEdicao)) if(angular.isArray($scope.objEdicao.Etapas)){
            $scope.etapaCorrenteAtiva = projetoTools.getEtapaCorrente($scope.objEdicao.Etapas, false);
            //$scope.etapaFinal = angular.copy($scope.objEdicao.Etapas[$scope.objEdicao.Etapas.length - 1]);
            $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEdicao.Etapas));
        }
                
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

    $scope.getAbaClass = function (etapa, situacao, aba_atual, ordemAba) {            
        if (typeof situacao != 'undefined'){                        
            var retorno = '';            
            if(situacao < 2)
                retorno = 'desabilitado etapa'+etapa.Ordem;
            else{
                if(aba_atual != (ordemAba + 2))
                    retorno = 'etapa'+etapa.Ordem;
                else if(aba_atual==(ordemAba + 2) && aba_atual >= 2)
                    retorno = 'ativo etapa'+etapa.Ordem;
                else
                    retorno = 'etapa'+etapa.Ordem;
            }
            
            if($scope.bolProjetoPrevia){                            
                if($scope.bolAntesPreparacaoCampanha){
                   if(etapa.Ordem == 1)
                        if(aba_atual==(ordemAba + 2) && aba_atual >= 2)
                            return 'ativo etapa'+etapa.Ordem;
                        else
                            return 'etapa'+etapa.Ordem;
                   if([3,5].indexOf(etapa.Ordem)!=-1)
                        return 'desabilitado';
                        //return 'desabilitado etapa'+etapa.Ordem;
                }else
                   if([1,3,5].indexOf(etapa.Ordem)!=-1)
                        if(aba_atual==(ordemAba + 2) && aba_atual >= 2)
                            return 'ativo etapa'+etapa.Ordem;
                        else
                            return 'etapa'+etapa.Ordem;
            }else{
                if($scope.bolAntesPreparacaoCampanha){
                   if(etapa.Ordem == 1)
                        if(aba_atual==(ordemAba + 2) && aba_atual >= 2)
                            return 'ativo etapa'+etapa.Ordem;
                        else
                            return 'etapa'+etapa.Ordem;
                   if([2,4].indexOf(etapa.Ordem)!=-1)
                        return 'desabilitado';
                        //return 'desabilitado etapa'+etapa.Ordem;
                }else
                   if([1,2,4].indexOf(etapa.Ordem)!=-1)
                        if(aba_atual==(ordemAba + 2) && aba_atual >= 2)
                            return 'ativo etapa'+etapa.Ordem;
                        else
                            return 'etapa'+etapa.Ordem;
            }   
            return retorno;
        }    
    }

    $scope.bolAbaHabilitada = function (etapa, situacao) {            
        if (typeof etapa != 'undefined' && typeof situacao != 'undefined'){                        
            if($scope.bolProjetoPrevia){            
                if($scope.bolAntesPreparacaoCampanha){
                    if([3,5].indexOf(etapa.Ordem)!=-1){
                        return false;                         
                    }
                }
            }else{
                if($scope.bolAntesPreparacaoCampanha){
                    if([2,4].indexOf(etapa.Ordem)!=-1){
                        return false;        
                    }
                }
            }
            if(situacao < 2)
                return false;
        }
        return true;
    } 

    self.reloadFiltrosMateriais=function(idEtapa){
        $scope.listaAnos = [];
        $scope.paramsMateriais =
        {
            idEtapaParam: 0,
            intPagina: 1,
            intRegPorPagina: parseInt($scope.maxRegistroPagina),
            simplesmenteDestaques: parseInt($scope.simplesmenteDestaques),
            total: 0
        };                    
        //lista de escolas/estados para os filtros
        if ($scope.CacheEscolaFinal) if ($scope.CacheEscolaFinal instanceof Array) if ($scope.CacheEscolaFinal.length > 0) {
            var temp = ",";
            $scope.CacheEscolas = angular.copy($scope.CacheEscolaFinal);
            $scope.Escolas = angular.copy($scope.CacheEscolas);
            $scope.Estados = [];
                            
            for (var escola in $scope.Escolas) {
                if (temp.indexOf("," + $scope.Escolas[escola].Estado + ",") == -1) {
                    temp += $scope.Escolas[escola].Estado + ",";
                    $scope.Estados.push({
                        Estado: $scope.getEstadoByUf($scope.Escolas[escola].Estado),
                        Sigla: $scope.Escolas[escola].Estado
                    });
                }
            }

            if ($scope.Estados.length > 0){
                $scope.Estados.sort();
                $scope.CacheEstados = angular.copy($scope.Estados);
            }
        }

        //lista de turmas para os filtros

        if ($scope.objTurmas && $scope.objTurmas.Turmas && $scope.objTurmas.Turmas instanceof Array && $scope.objTurmas.Turmas.length > 0) {
            $scope.CacheTurmas = angular.copy($scope.objTurmas.Turmas);
            $scope.Turmas = angular.copy($scope.CacheTurmas);
        }

    };

            
            
    self.reloadFiltrosParticipantes=function(){
        $scope.paramsParticipantes = {
            intPagina: 1,
            intRegPorPagina: $scope.ItensPorPagina,
            total: 0
        };
        $scope.listaAnos = [];
         
        
                    
        //lista de escolas/estados para os filtros
        if ($scope.objEscolas) if ($scope.objEscolas instanceof Array) if ($scope.objEscolas.length > 0) {
            var temp = ",";
            $scope.CacheEscolas = angular.copy($scope.objEscolas);
            $scope.Escolas = angular.copy($scope.CacheEscolas);
            $scope.Estados = [];
                            
            for (var escola in $scope.Escolas) {
                if (temp.indexOf("," + $scope.Escolas[escola].Estado + ",") == -1) {
                    temp += $scope.Escolas[escola].Estado + ",";
                    $scope.Estados.push({
                        Estado: $scope.getEstadoByUf($scope.Escolas[escola].Estado),
                        Sigla: $scope.Escolas[escola].Estado
                    });
                }
            }

            if ($scope.Estados.length > 0){
                $scope.Estados.sort();
                $scope.CacheEstados = angular.copy($scope.Estados);
            }
        }

        //lista de turmas para os filtros

        if ($scope.CacheTurmasParticipantes && $scope.CacheTurmasParticipantes instanceof Array && $scope.CacheTurmasParticipantes.length > 0) {
            $scope.CacheTurmas = angular.copy($scope.CacheTurmasParticipantes);
            $scope.Turmas = angular.copy($scope.CacheTurmas);
        }
    };

    self.initGaleriaEnvio=function(){
        
        //remapeia as funções de tools para essa controller e para o escopo atual
        if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
            initApi = false;
        }
        if (initApi) {
            projetoTools.extendFunctions(self);
            projetoTools.extendFunctions($scope);
            $scope.projetoTools = projetoTools;
        }

        try{
            var bolPossuiMax = false;
            if($scope.maxRegistroPagina){
                if($scope.maxRegistroPagina > 0 ){
                    bolPossuiMax = true;
                }
            }
            if(!bolPossuiMax){
                $scope.maxRegistroPagina = 6;
            }
        }catch(err){}


        self.initDadosEleicoes();

        if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto){
            self.buscarParticipantes(false);
        }
        else{
            self.buscarEnvioPortal(false);
        }                           
    };

    self.getAbaParaAbrir=function(){
        /*
        CONDIÇÃO PARA EXIBIÇÃO INICIAL DAS ABAS DA GALERIA
        aba 1:
        - quando há envio dos participantes na home ou na página da etapa
        - exibida quando na página do comitê sem resultados revelados: lista de participantes do comitê
        aba 2:
        - quando não há envio dos participantes na home ou na página da etapas: mostra o como fazer
        - quando 
        */
        var retorno = 0;
        if($scope.bolSemGaleria){
            if(!$scope.bolEleicoes){
                //como fazer
                retorno = 2;
            }
            else{
                if(!$scope.bolHomeProjeto && !$scope.bolHomeEtapa){
                    //pagina do comite, abre a lista de participantes
                    retorno = 1;
                }
                else{
                    if(!$scope.bolResultadosRevelados && $scope.bolHomeEtapa)
                        retorno = 1;
                    else{
                        //como fazer
                        retorno = 2;
                    }
                }
            }
        }
        else{
            if(!$scope.bolEleicoes){
                if(!$scope.nuncaExistiramMateriais){
                    retorno = 1;
                }
                else{
                    //como fazer
                    retorno = 2;
                }
            }
            else{
                if(!$scope.bolHomeProjeto && !$scope.bolHomeEtapa){
                    //estando na pagina do comite
                    var bolSemNada=false;
                    var bolSemMateriais=false;
                    var bolSemParticipantes=false;
                    if($scope.TotalParticipantes == 0 && $scope.nuncaExistiramMateriais){
                        bolSemNada=true;
                        retorno = 1;
                    }
                    else{
                        if(
                            !$scope.nuncaExistiramMateriais
                            &&
                            (
                                (!$scope.bolRelacionadoComite && $scope.bolResultadosRevelados)
                                ||
                                ($scope.bolRelacionadoComite)
                            )
                        ){
                            //abre a aba de materiais
                            retorno = 2;
                        }
                        else{
                            retorno = 1;
                        }
                    }
                }
                else{
                    if($scope.bolHomeEtapa){
                        if(
                            !$scope.bolResultadosRevelados 
                            || 
                            ($scope.bolResultadosRevelados && !$scope.bolSemGaleria && $scope.objEnviosInscricao.TotalEnvios > 0)
                        ){
                            retorno = 1;
                        }
                        else
                            retorno = 2;
                    }
                    else{
                        if($scope.nuncaExistiramMateriais || !$scope.bolResultadosRevelados){
                            //como fazer
                            retorno = 2;
                        }
                        else{
                            retorno = 1;
                        }
                    }
                }
            }
        }
        return retorno;
    };

    self.getUpdatedStatusToShowFilters=function(){
                
        if($scope.simplesmenteDestaques==0) {
            if($scope.controle.aba_atual == 1){
                if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto && $scope.Participantes.length>0){
                    return true;
                }
                //if($scope.bolEleicoes && ($scope.bolResultadosRevelados || $scope.bolRelacionadoComite) && ($scope.bolHomeEtapa || $scope.bolHomeProjeto) && ($scope.objEnviosInscricao.TotalEnvios>0) && !$scope.bolSemGaleria){
                if($scope.bolEleicoes && ($scope.bolResultadosRevelados || $scope.bolRelacionadoComite) && ($scope.bolHomeEtapa || $scope.bolHomeProjeto) && !$scope.bolSemGaleria){
                    return true;
                }
                if(!$scope.bolEleicoes && $scope.objEnviosInscricao.TotalEnvios>0 && !$scope.bolSemGaleria && ($scope.bolHomeEtapa || $scope.bolHomeProjeto)){
                    return true;
                }
            }
            if($scope.controle.aba_atual >= 2){
                if($scope.bolEleicoes && !$scope.bolHomeEtapa && !$scope.bolHomeProjeto && $scope.objEnviosInscricao.TotalEnvios>0 && !$scope.bolSemGaleria){
                    return true;
                }
                if($scope.bolAplicandoFiltros)
                    return true;
                else
                    return false;
                /*
                if($scope.bolEleicoes && ($scope.bolHomeEtapa || $scope.bolHomeProjeto) && $scope.objComoFazer.length>0){
                    return false;
                }
                if(!$scope.bolEleicoes && $scope.objComoFazer.length>0){
                    return true;
                }
                */
            }
        }
        return false;
    };

    $timeout(function(){
        self.initGaleriaEnvio();
    },5000);
            
}

angular.module('Etapa').directive('galeriaEnvioEleicoes', function () {
    return {
        restrict: 'E',
        templateUrl: function (elem, attrs) {
            if(attrs) if(attrs.template_reduzido) if(attrs.template_reduzido=="1"){
                return '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-envio-eleicoes.html';
            }
            if(attrs) if(attrs.templateReduzido) if(attrs.templateReduzido=="1"){
                return '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-envio-eleicoes.html';
            }
            return '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-envio-eleicoes-moldura.html';
        },
        scope: {
            objEdicao: "=objEdicao",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig",
            objEtapa: "=objEtapa",
            maxRegistroPagina: "@maxRegistroPagina",
            simplesmenteDestaques: "@simplesmenteDestaques",
            objEscolas: "=objEscolas",
            objTurmas: "=objTurmas"
            /*objEleicoes: "=objEleicoes"*/
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', '$interval', '$modal', 'constantes', 'projetoTools', ctrlGaleriaEnvioEleicoes ],
        controllerAs: 'galeriaEnvioCtrl'
    };
});

angular.module('Etapa').directive('galeriaEnvioEleicoesComite', function () {
    return {
        restrict: 'E',
        templateUrl: function (elem, attrs) {
            return '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-envio-eleicoes.html';
        },
        scope: {
            objEdicao: "=objEdicao",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig",
            objEtapa: "=objEtapa",
            maxRegistroPagina: "@maxRegistroPagina",
            simplesmenteDestaques: "@simplesmenteDestaques",
            objEscolas: "=objEscolas",
            objTurmas: "=objTurmas"
            /*objEleicoes: "=objEleicoes"*/
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', '$interval', '$modal', 'constantes', 'projetoTools', ctrlGaleriaEnvioEleicoes ],
        controllerAs: 'galeriaEnvioCtrl'
    };
});
