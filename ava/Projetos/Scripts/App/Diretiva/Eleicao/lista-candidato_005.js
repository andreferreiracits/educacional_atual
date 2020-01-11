"use strict"
angular.module('Etapa').directive('listaCandidato', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/lista-candidato.html',
        scope: {
            objEtapas: "=objEtapas",
            objEdicao: "=objEdicao",
            defaultConfig: "=defaultConfig",
            objEnquetes: "=objEnquetes"
            //objUsuario: "=objUsuario"
        },
        link: function (scope, el, attr) {

        },
        controller: ['$http', '$scope', '$timeout', '$location', '$filter', '$modal', 'constantes', 'projetoTools', function ($http, $scope, $timeout, $location, $filter, $modal, constantes, projetoTools) {
            var self = this;
            $scope.projetoTools = projetoTools;

            $scope.clickEvt = "click";
            $scope.overEvt = "mouseover";
            $scope.outEvt = "mouseout";

            $scope.bolMobile = projetoTools.isMobile();
            $scope.bolDesktop = projetoTools.isDesktop();

            /*
            0 - não iniciada
            1 - enquete prévia
            2 - envio dos materiais que serão utilizados na enquete
            3 - enquete material
            4 - resultado enquete material
            5 - votacao
            6 - resultado votacao
            */
            $scope.faseEleicao = 0;
            $scope.etapaCorrente = undefined;
            $scope.etapaFinal = undefined;
            $scope.objUsuario = angular.copy(constantes.Usuario);
            $scope.situacaoEtapaFinal = 0;
            $scope.audioVencedor=0;

            $scope.bolEducador = projetoTools.verificaPerfil($scope.objUsuario,'Educador');
            $scope.bolAdministrador = projetoTools.verificaPerfil($scope.objUsuario,'Administrador');
            $scope.bolAluno = projetoTools.verificaPerfil($scope.objUsuario,'Aluno');
            $scope.bolPaiDeElunoInscrito = false;
            $scope.bolAlunoInscritoEleicoes=false;

            /*
            $scope.defaultConfig = angular.copy(constantes.DefaultConfig);
            $scope.objEdicao = angular.copy(constantes.Edicao);
            $scope.objEtapas = angular.copy(constantes.Edicao.Etapas);
            */
            $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
            $scope.constantes = angular.copy(constantes);

            $scope.ctrlRajadaEvento = undefined;

            $scope.bolRelacionadoComite=false; 
            $scope.bolResultadoEnquetePrevia=false; 
            $scope.bolResultadoEnqueteMaterial=false;
            $scope.bolResultadoEleicao=false; 
            $scope.bolResultadosRevelados = false;
            $scope.dataRevelacaoResultado = "DD/MM";

            $scope.candidatoEscolhidoPrevia = undefined;
            $scope.arrAlternativasEscolhidas = [];
            
            $scope.intVotoUserPrevia=0;
            $scope.intVotoUserMaterial=[];
            $scope.intCandidatoEscolhido=0;

            $scope.EnquetePrevia = {};
            $scope.EnquetesMateriais = [];

            //$scope.partido = {};      
            $scope.enquete = {};

            $scope.candidato = undefined;
            $scope.dataRevelacaoResultado = 'DD/MM';
            $scope.tipoEleicao = "Candidato";

            this.init = function () {
                self.preInit();
                self.initBinders();
            };


            $scope.scrollDown=function(){
                /*
                _g-href="{{'/AVA/Projetos/' +  objEdicao.Ano + '/' + objEdicao.Link + '/Candidato/' + candidato.Slug}}"
                {{'#ancora_galeria_etapa_materiais'}}
                angular.element("body").eq(0).css({ "overflow": "" });
                angular.element("body").eq(0).css({ "overflow": "hidden" });
                angular.forEach(angular.element("html, body"), function (el) {
                    angular.element(el).animate({ scrollTop: 0 }, 0);
                });
                */
                window.scrollTo(0, 1000);
            };

            this.loadEnquete=function(tipo, situacaoEtapa, objPartido){
                //carregamento das enquetes conforme a situação em que se encontram as etapas
                if(angular.isDefined($scope.objEnquetes) && angular.isArray($scope.objEnquetes) && projetoTools.hasArrayElems($scope.objEnquetes)) {
                    var bolSortByPosicao=false;
                    for(var enquete in $scope.objEnquetes){
                        //filtra pelas enquetes dos respectivos partido e tipo informado
                        var bolProssegue = true;
                        if(objPartido){
                            bolProssegue = false;
                            if(objPartido.Id == $scope.objEnquetes[enquete].IdCategoria){
                                bolProssegue = true;
                            }
                        }
                        if(bolProssegue && (tipo==0 || tipo == $scope.objEnquetes[enquete].IdTipo)){
                            switch($scope.objEnquetes[enquete].IdTipo){
                                /*
                                //Não existe enquete de prévia em comitês de candidatos
                                case 1:
                                    //enquete sobre as categorias - prévias
                                    if(situacaoEtapa>=2){
                                        //tras a enquete para ser respondida na mesma ordem que foi recebida
                                        
                                        for(var alternativa in $scope.objEnquetes[enquete].Alternativas){
                                            if($scope.objEnquetes[enquete].Alternativas[alternativa].Votei){
                                                $scope.intCandidatoEscolhido = $scope.objEnquetes[enquete].Alternativas[alternativa].IdObjeto;
                                                $scope.intVotoUserPrevia = $scope.intCandidatoEscolhido;
                                            }
                                        }
                                        if(situacaoEtapa>2){
                                            //resultados revelados
                                            //complementa os dados das categorias ao vetor do resultado da enquete: número do candidato
                                            for(var alternativa in $scope.objEnquetes[enquete].Alternativas){
                                                var cat = $filter('filter')($scope.partido.Subcategorias, { Id: $scope.objEnquetes[enquete].Alternativas[alternativa].IdObjeto }, false);
                                                $scope.objEnquetes[enquete].Alternativas[alternativa].Identificador = $scope.objEnquetes[enquete].Alternativas[alternativa].Ordem;
                                                if(projetoTools.hasArrayElems(cat) && cat[0].Id == $scope.objEnquetes[enquete].Alternativas[alternativa].IdObjeto){
                                                    $scope.objEnquetes[enquete].Alternativas[alternativa].Identificador = cat[0].Complemento;
                                                }
                                            }
                                        }
                                        $scope.EnquetePrevia = angular.copy($scope.objEnquetes[enquete]);
                                    }
                                    break;
                                */
                                case 2:
                                    //enquete sobre materiais enviados e sinalizados para tal
                                    if(situacaoEtapa>=2){
                                        //tras a enquete vencedora por primeiro no slot 0 do array
                                        var curEnquete = angular.copy($scope.objEnquetes[enquete]); 
                                        if(situacaoEtapa>2){
                                            //sinaliza para ordenar as alternativas conforme a posição obtida no resultado
                                            //para posicionar os vencedores no slot 0 do array as alternativas

                                            //recurso provisório para contornar o problema da publicação de 2016, onde foram divulgados erroneamente os resultados das enquetes invertidos
                                            var tempData = angular.copy($scope.objEdicao.DataInicioInscricao);
                                            if (typeof (tempData) == "string") if (!(tempData instanceof Date)) if (tempData.indexOf("/") != -1) {
                                                tempData = eval("new " + tempData.replace(/\//ig, ""));
                                            }
                                            if(tempData.getFullYear() == 2016){
                                                curEnquete.Alternativas = curEnquete.Alternativas.sort(function(a,b){return b.Posicao - a.Posicao});
                                            }
                                            else{
                                                curEnquete.Alternativas = curEnquete.Alternativas.sort(function(a,b){return a.Posicao - b.Posicao});
                                            }

                                        }
                                        curEnquete.IdTipoMedia = 1;
                                        if(projetoTools.hasArrayElems(curEnquete.Alternativas)){
                                            if(curEnquete.Alternativas[0].Texto.toLowerCase().indexOf(".mp3")!=-1 || curEnquete.Alternativas[0].Texto.toLowerCase().indexOf(".wav")!=-1) 
                                                curEnquete.IdTipoMedia = 2;
                                        }
                                        $scope.EnquetesMateriais.push(curEnquete);
                                    }
                                    break;
                            }
                        }
                    }
                }
            }

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

            this.preInit = function () {
                //remapeia as funções de projetoTools para essa controller e para o escopo atual
                var initApi = true;
                if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(self);
                    projetoTools.extendFunctions($scope);
                }
                if ($scope.objEtapas != undefined) if (angular.isArray($scope.objEtapas)) {
                    if ($scope.objEtapas.length > 0) {
                        //preparação dos dados e setup dos parâmetros
                        for(var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias){
                            $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Slug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                            if($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Slug.toLowerCase()==document.location.href.split("/")[document.location.href.split("/").length-1].toLowerCase()){
                                $scope.candidato = angular.copy($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria]);
                                var turmas_inscritas = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Id: '!' + 0, Categorias: [ { Id : $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Id } ] } }, true);
                                if (turmas_inscritas) if (turmas_inscritas instanceof Array) if (turmas_inscritas.length > 0) {
                                    $scope.bolRelacionadoComite=true;
                                    if(projetoTools.verificaPerfil($scope.objUsuario,'Responsável')){
                                        $scope.bolPaiDeElunoInscrito = true;
                                    }
                                    if($scope.bolAluno){
                                        $scope.bolAlunoInscritoEleicoes=true;
                                    }
                                }
                            }
                            if(angular.hasArrayElems($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias)) for(var subcategoria in $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias){
                                $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias[subcategoria].Slug = IniciaisMaiusculas(retira_acentos($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias[subcategoria].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                            }
                        }
                        //adequa as datas
                        angular.forEach($scope.objEtapas, function (valor, chave) {
                            if (typeof (valor.DataInicio) == "string") if (!(valor.DataInicio instanceof Date)) if (valor.DataInicio.indexOf("/") != -1) {
                                $scope.objEtapas[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                                $scope.objEtapas[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                                $scope.objEtapas[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                            }
                            if($scope.objEtapas[chave].TipoEtapaEleicao>0){
                                switch($scope.objEtapas[chave].TipoEtapaEleicao){
                                    case 1:
                                        //etapa da enquete de prévisa
                                        var objPartido = $scope.partido;
                                        if(self.situacaoEtapa($scope.objEtapas[chave])==2){// && hoje>$scope.objEtapas[chave].DataInicio && hoje<$scope.objEtapas[chave].DataFim){
                                            //enquete em andamento prévia
                                            self.loadEnquete(1, 2, objPartido);
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>2){
                                            //enquete finalizada - resultado revelado
                                            $scope.bolResultadoEnquetePrevia = true;
                                            self.loadEnquete(1, 3, objPartido);
                                        }
                                        var test = $filter('filter')($scope.EnquetePrevia.Alternativas, { Votei: true }, false);
                                        if(angular.hasArrayElems(test)){
                                             $scope.intCandidatoEscolhido = test[0].IdObjeto;
                                             $scope.intVotoUserPrevia = $scope.intCandidatoEscolhido;
                                        }
                                        break;
                                    case 2:
                                        //etapa de envios dos materiais da enquete
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>=2){
                                            //$scope.bolResultadoEnquetePrevia = true;
                                        }
                                        break;  
                                    case 3:
                                        //etapa da enquete de materiais
                                        if(self.situacaoEtapa($scope.objEtapas[chave])==2){
                                            //enquete em andamento materiais
                                            self.loadEnquete(2, 2, objPartido);
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])>2){
                                            //enquete finalizada - resultado revelado
                                            $scope.bolResultadoEnqueteMaterial = true;
                                            self.loadEnquete(2, 3, objPartido);
                                            if($scope.faseEleicao<4) {
                                                $scope.faseEleicao = 4;
                                            }
                                        }
                                        for(var enq in $scope.EnquetesMateriais){
                                            var test = $filter('filter')($scope.EnquetesMateriais[enq].Alternativas, { Votei: true }, false);
                                            if(angular.hasArrayElems(test)){
                                                var ordem = $scope.EnquetesMateriais[enq].Ordem-1;
                                                if(!angular.isArray($scope.arrAlternativasEscolhidas))
                                                    $scope.arrAlternativasEscolhidas=[];
                                                while(!angular.hasArrayElems($scope.arrAlternativasEscolhidas) || $scope.arrAlternativasEscolhidas.length<$scope.EnquetesMateriais.length){
                                                    var temp = {};
                                                    $scope.arrAlternativasEscolhidas.push(angular.copy(temp));
                                                }
                                                $scope.arrAlternativasEscolhidas[ordem] = angular.copy(test[0]);

                                                if(!angular.isArray($scope.intVotoUserMaterial))
                                                    $scope.intVotoUserMaterial=[];
                                                while(!angular.hasArrayElems($scope.intVotoUserMaterial) || $scope.intVotoUserMaterial.length<$scope.EnquetesMateriais.length){
                                                    var temp = 0;
                                                    $scope.intVotoUserMaterial.push(angular.copy(temp));
                                                }
                                                $scope.intVotoUserMaterial[ordem] = test[0].IdObjeto;
                                            }
                                        }
                                        break;
                                    case 5:
                                        //revelação dos resultados para todos
                                        $scope.dataRevelacaoResultado = projetoTools.DiaMesComZeros($scope.objEtapas[chave].DataInicio);
                                        var dataAtual = new Date();
                                        if (dataAtual.getTime() > $scope.objEtapas[chave].DataInicio.getTime()) {
                                            $scope.bolResultadosRevelados = true;
                                        }
                                        if(self.situacaoEtapa($scope.objEtapas[chave])==2){
                                            //enfim votação
                                            if($scope.faseEleicao<5) {
                                                $scope.faseEleicao = 5;
                                            }
                                        }
                                        break;
                                }
                                
                            }
                        });
                        
                        //console.log("$scope.Enquetes...");
                        //console.log($scope.EnquetePrevia);
                        //console.log($scope.EnquetesMateriais);

                        $scope.etapaCorrenteAtiva = projetoTools.getEtapaCorrente($scope.objEtapas,false);
                        if ($scope.etapaCorrenteAtiva) {
                            $scope.etapaUltimaEtapaOcorreu = $scope.etapaCorrenteAtiva;
                        }
                        else {
                            $scope.etapaUltimaEtapaOcorreu = projetoTools.getEtapaCorrente($scope.objEtapas,true);
                        }
                        if(angular.isObject($scope.etapaUltimaEtapaOcorreu)) if($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao) if(angular.getInt($scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao)>0){
                            $scope.faseEleicao = $scope.etapaUltimaEtapaOcorreu.TipoEtapaEleicao;
                        }
                        //$scope.etapaFinal = angular.copy($scope.objEtapas[$scope.objEtapas.length - 1]);
                        $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEtapas));
                        $scope.situacaoEtapaFinal = self.situacaoEtapa($scope.etapaFinal);

                        if($scope.situacaoEtapaFinal == 4){
                            //busca o áudio de quem ganhou
                            if($scope.audioVencedor==0){
                                self.getResultado(function(retorno){
                                    //console.log(retorno);
                                    $scope.audioVencedor = retorno.dados[0].Ordem;
                                });
                            }
                        }

                        //flag se sinaliza se o resultado das eleições já está disponível
                        if(self.situacaoEtapa($scope.etapaFinal)==4 && ($scope.etapaFinal.TipoEtapaEleicao==5 || $scope.etapaFinal.TipoEtapaEleicao==6)){
                            $scope.bolResultadoEleicao=true;
                        }
                        $scope.safeApply();
                    }
                }
            };

            this.initBinders = function () {
                //em desktop trata a exibição do tooltip por hover
                if ($scope.bolMobile) {
                    $scope.clickEvt = "touchend";
                    $scope.overEvt = "touchstart";
                    $scope.outEvt = "touchend";
                }
                if ($scope.bolDesktop && !$scope.bolMobile) {
                    $scope.clickEvt = "click";
                    $scope.overEvt = "mouseover";
                    $scope.outEvt = "mouseout";
                }

                var els = angular.element("section.previas > a.btn_confirmar");
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

                            $scope.registrarVotoPrevia();
                        }, 150);
                    });
                });

                var els = angular.element("section.bloco-enquete > a.btn_confirmar");
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

                            $scope.registrarVotoMaterial();
                        }, 150);
                    });

                });
            }

            $scope.setCustomRadio = function(objeto,ordem){
                //if($scope.bolEducador || $scope.bolAdministrador){
                //    self.openModalNaoAutorizado($scope.categoria, 1);
                //}
                //else
                if($scope.bolRelacionadoComite && ($scope.bolAlunoInscritoEleicoes || $scope.bolPaiDeElunoInscrito)){
                    //Tipo prévia
                    if($scope.faseEleicao==1 && $scope.intVotoUserPrevia==0){
                        $scope.candidatoEscolhidoPrevia = undefined;
                        if(objeto){
                            $scope.candidatoEscolhidoPrevia = objeto;
                            $scope.intCandidatoEscolhido = objeto.Ordem;
                        }
                        var seletor = "section.previas div.seletor";
                        var elms = angular.element(seletor);
                        angular.forEach(elms, function (el) {
                            angular.element(el).removeClass("ativo");
                            if($scope.intCandidatoEscolhido>0 && angular.element(el).hasClass("candidato_0"+$scope.intCandidatoEscolhido)){
                                angular.element(el).addClass("ativo");
                            }
                        });
                    }
                    //Tipo materiais
                    if($scope.faseEleicao==3 && ordem!=undefined && ordem>=0 && !($scope.intVotoUserMaterial[ordem]>0)){
                        if(objeto){
                            if(!angular.isArray($scope.arrAlternativasEscolhidas))
                                $scope.arrAlternativasEscolhidas=[];
                            while(!angular.hasArrayElems($scope.arrAlternativasEscolhidas) || $scope.arrAlternativasEscolhidas.length<=ordem){
                                var temp = {};
                                $scope.arrAlternativasEscolhidas.push(angular.copy(temp));
                            }
                            $scope.arrAlternativasEscolhidas[ordem] = angular.copy(objeto);
                        }
                        var seletor = "section.enquete div.seletor";
                        var elms = angular.element(seletor);
                        angular.forEach(elms, function (el) {
                            angular.element(el).removeClass("ativo");
                            if($scope.intCandidatoEscolhido>0 && angular.element(el).hasClass("candidato_0"+$scope.intCandidatoEscolhido)){
                                angular.element(el).addClass("ativo");
                            }
                        });
                    }
                }
            };

            //registra o voto em uma enquete
            //incrementa o número de votos em uma subcategoria - tblCategoriaVotos
            $scope.registrarVotoPrevia = function(){
                var categoria = angular.copy($scope.candidatoEscolhidoPrevia);
                //if($scope.bolEducador || $scope.bolAdministrador){
                //    self.openModalNaoAutorizado(categoria, 1);
                //}
                //else
                if($scope.intVotoUserPrevia==0 && ($scope.bolAlunoInscritoEleicoes || $scope.bolPaiDeElunoInscrito) && $scope.bolRelacionadoComite){
                    if($scope.intCandidatoEscolhido>0 && $scope.candidatoEscolhidoPrevia){       
                        self.openModalConfirmacaoEnquete(categoria, 1);
                    }
                    else{
                        alert("Selecione um candidato para registrar o seu voto!");
                    }
                }
            };

            $scope.votouEnquete=function(objEnquete){
                var votoscomputados = $filter('filter')(objEnquete.Alternativas, { Votei: true }, false);
                if(projetoTools.hasArrayElems(votoscomputados)){
                    return true;
                }
                return false;
            };

            $scope.registrarVotoMaterial = function(ordem){
                var categoria = angular.copy($scope.arrAlternativasEscolhidas[ordem]);
                //if($scope.bolEducador || $scope.bolAdministrador){
                //    self.openModalNaoAutorizado(categoria, 1);
                //}
                //else
                if(($scope.bolAlunoInscritoEleicoes || $scope.bolPaiDeElunoInscrito) && $scope.bolRelacionadoComite && !($scope.intVotoUserMaterial[ordem]>0)) {
                    if(projetoTools.hasArrayElems($scope.arrAlternativasEscolhidas) && $scope.arrAlternativasEscolhidas[ordem]){      
                        self.openModalConfirmacaoEnquete(categoria,2,ordem);
                    }
                    else{
                        alert("Selecione um material para registrar o seu voto!");
                    }
                }
            };
            
            $scope.getCargo = function(intPosicao){
                switch(intPosicao){
                    case 1:
                        return "Prefeito"
                        break;
                    case 2:
                        return "Vice-prefeito"
                        break;
                    case 3:
                        return "Vereador"
                        break;
                }
            };

            this.openModalNaoAutorizado = function (alternativa, variante) {
                var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete-educador.html',
                    controller: 'ctrlModalEnquete',
                    resolve: {
                        defaultConfig: function () {
                            return $scope.defaultConfig;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        etapa: function () {
                            var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                            if(variante==2) {
                                angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                                    if($scope.EnquetesMateriais[ordem].IdEtapa == curEtapa.Id){
                                        p_etapa = angular.copy(curEtapa);
                                    }
                                });
                            }
                            return p_etapa;
                        },
                        objUsuario: function () {
                            return $scope.objUsuario
                        },
                        objEdicao: function () {
                            return $scope.objEdicao;
                        },
                        enquetes: function () {
                            return undefined;
                        },
                        alternativa: function () {
                            return 0;
                        }
                    },
                    backdrop: 'static'
                });

                modalInstance.result.then(function (parametro) {
                    //

                }, function () {
                    //
                });
                modalInstance.opened.then(function (parametro) {
                    //
                }, function () {
                    //
                });
            };
            /*
            this.openModalNaoAutorizadoUrna = function (p_etapa) {
                if(!p_etapa){
                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                        if(self.situacaoEtapa(curEtapa)==2 && [5].indexOf(curEtapa.TipoEtapaEleicao)!=-1) if(self.situacaoEtapa(curEtapa)==2){
                            p_etapa = angular.copy(curEtapa);        
                        }
                    });
                }
                if(p_etapa){
                    var modalInstance = $modal.open({
                        templateUrl: "/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-educador.html",
                        controller: "ctrlModalVotacaoEducador",
                        resolve: {
                            defaultConfig: function () {
                                return $scope.defaultConfig;
                            },
                            edicaoConfig: function () {
                                return $scope.edicaoConfig;
                            },
                            etapa: function () {
                                return p_etapa;
                            },
                            objUsuario: function () {
                                return $scope.objUsuario
                            },
                            objEdicao: function () {
                                return $scope.objEdicao;
                            },
                            enquetes: function () {
                                return undefined;
                            },
                            alternativa: function () {
                                return 0;
                            }
                        },
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (parametro) {
                        //

                    }, function () {
                        //
                    });
                    modalInstance.opened.then(function (parametro) {
                        //
                    }, function () {
                        //
                    });
                }
            };
            */
            this.openModalConfirmacaoEnquete = function (alternativa, variante, ordem) {
                var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                $scope.currentOrdem = ordem;
                if(variante==2) {
                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                        if($scope.EnquetesMateriais[ordem].IdEtapa == curEtapa.Id){
                            p_etapa = angular.copy(curEtapa);
                        }
                    });
                }
                var modalInstance = $modal.open({
                    templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete.html',
                    controller: 'ctrlModalEnquete',
                    resolve: {
                        defaultConfig: function () {
                            return $scope.defaultConfig;
                        },
                        edicaoConfig: function () {
                            return $scope.edicaoConfig;
                        },
                        etapa: function () {
                            var p_etapa = angular.copy($scope.etapaCorrenteAtiva);
                            if(variante==2) {
                                angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                                    if($scope.EnquetesMateriais[ordem].IdEtapa == curEtapa.Id){
                                        p_etapa = angular.copy(curEtapa);
                                    }
                                });
                            }
                            return p_etapa;
                        },
                        objUsuario: function () {
                            return $scope.objUsuario
                        },
                        objEdicao: function () {
                            return $scope.objEdicao;
                        },
                        enquetes: function () {
                            switch(variante){
                                case 1:
                                    return [$scope.EnquetePrevia];
                                    break;
                                case 2:
                                    return $scope.EnquetesMateriais;
                                    break;
                            }
                            
                        },
                        alternativa: function () {
                            switch(variante){
                                case 1:
                                    return alternativa.Id;
                                    break;
                                case 2:
                                    return alternativa.Id;
                                    break;
                            }
                            
                        },
                    },
                    backdrop: 'static'
                });

                modalInstance.result.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
                    var sucesso = false;
                    sucesso = true;
                    switch(variante){
                        case 1:
                            $scope.intVotoUserPrevia = alternativa.Id;
                            for(var alt in $scope.EnquetePrevia.Alternativas){
                                if($scope.EnquetePrevia.Alternativas[alt].IdObjeto == alternativa.Id){
                                    $scope.EnquetePrevia.Alternativas[alt].Votei=true;
                                }
                            }
                            break;
                        case 2:
                            $scope.intVotoUserMaterial[ordem] = alternativa.Id;
                            for(var alt in $scope.EnquetesMateriais[ordem].Alternativas){
                                if($scope.EnquetesMateriais[ordem].Alternativas[alt].IdObjeto == alternativa.Id){
                                    $scope.EnquetesMateriais[ordem].Alternativas[alt].Votei=true;
                                }
                            }
                            break;
                    }
                    $scope.safeApply();
                }, function () {
                    //
                });
                modalInstance.opened.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
                }, function () {
                    //
                });
            };

            
            //abre a urna virtual em um modal embutido - nao usar popup
            this.openVotacao = function (etapa) {
                /*
                if($scope.bolEducador || $scope.bolAdministrador){
                    self.openModalNaoAutorizadoUrna(etapa);
                }
                else if($scope.bolAlunoInscritoEleicoes || $scope.bolPaiDeElunoInscrito) {
                */
                    var linkTarefa = "";
                    var p_etapa = undefined;
                    if(etapa) if (etapa.LinkTarefa) if (etapa.LinkTarefa!="") if(etapa.LinkTarefa.toLowerCase().indexOf("eleicoes/urna")!=-1) {
                        linkTarefa = etapa.LinkTarefa;
                        p_etapa = angular.copy(etapa);
                    }
                    if(linkTarefa == "") if(!etapa) if(projetoTools.hasArrayElems($scope.objEtapas)) {
                        var temp = $filter('filter')($scope.objEtapas, { TipoEtapaEleicao: { Id: 5 } }, false);
                        if(projetoTools.hasArrayElems(temp)) if (temp[0].LinkTarefa != "") {
                            linkTarefa = temp[0].LinkTarefa;
                            p_etapa = angular.copy(temp[0]);
                        }
                    }
                    if(p_etapa.TipoEtapaEleicao==5 && linkTarefa != "") {
                        console.log(linkTarefa);
                        console.log($scope.objEtapas);
                        var modalInstance = $modal.open({
                            templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-urna.html',
                            controller: 'ctrlModalVotacao',
                            resolve: {
                                linkTarefa: function () {
                                    return linkTarefa;
                                }
                            },
                            backdrop: 'static'
                        });

                        modalInstance.result.then(function (p_equipe) { 
                            //
                        }, function () {
                            //
                        });
                        modalInstance.opened.then(function (parametro) { 
                        }, function () {
                            //
                        });
                    }
                //}
            };
            
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
            
            $scope.getAudioCandidato = function (categoria) {

                /*  situacaoEtapa
                    1 - Aguarde
                    2 - Confira/Envie
                    3 - Confira os envios/Etapa passou
                    4 - Confira o resultado */

                /* if(angular.isObject($scope.objEdicao)) if(angular.isArray($scope.objEdicao.Etapas)){
                    $scope.etapaCorrenteAtiva = projetoTools.getEtapaCorrente($scope.objEdicao.Etapas, false);
                    //$scope.etapaFinal = angular.copy($scope.objEdicao.Etapas[$scope.objEdicao.Etapas.length - 1]);
                    $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEtapas));
                } */
                
                // Se a última etapa foi concluída
                if($scope.situacaoEtapaFinal == 4){
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

            $timeout(function () { self.init() }, 10);
        } ],
        controllerAs: 'ctrlCandidatos'
    };

});

 
