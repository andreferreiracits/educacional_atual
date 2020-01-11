"use strict"
angular.module('Etapa').directive('listaEtapa', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Etapa/lista-etapa.html',
        scope: {
            objEdicao: "=objEdicao",
            objEtapas: "=objEtapas",
            defaultConfig: "=defaultConfig"
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter','$modal', '$window', 'constantes', 'projetoTools', function ($http, $scope, $timeout, $filter, $modal, $window, constantes, projetoTools) {
            var self = this;
            $scope.arrEtapaParceria = [];
            $scope.tooltip = {
                Turmas : {},
                EtapaVinculo : []
            };
            $scope.objUsuario = angular.copy(constantes.Usuario);
            $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);

            //$scope.objEdicao = angular.copy(constantes.Edicao);
            //$scope.objEtapas = angular.copy(constantes.Edicao.Etapas);
            //$scope.defaultConfig = angular.copy(constantes.DefaultConfig);
            $scope.selTurmaParceira = function(turma){
                if(turma) if(turma != null) if(turma !== undefined){
                    var url;
                    if(turma.Parceira.LinkPostEnvio != null && turma.Parceira.LinkPostEnvio.LinkPost != null){
                        url = '/AVA/Projetos/' + $scope.objEdicao.Ano + '/' + $scope.objEdicao.Link + '/Etapas/' + turma.Parceira.LinkPostEnvio.Etapa.Link + '/' + turma.Parceira.LinkPostEnvio.LinkPost;
                    }else{
                        url = '/AVA/Turma/' +  turma.Parceira.Link;
                    }

                    if(url){
                        window.location.href = url;
                    }
                }
            };

            $scope.tooltipEtapaParceria = function (etapa, value) {
                if(!etapa.arrEtapaParceria){
                    etapa.arrEtapaParceria = 
                    {
                        showTooltip : false,
                        isNew : false,
                        tooltip: {
                            Turmas : {},
                            EtapaVinculo : []
                        }
                    };
                }else{
                    if(etapa.arrEtapaParceria.tooltip){
                        if(etapa.arrEtapaParceria.tooltip.Turmas != null){
                            etapa.arrEtapaParceria.showTooltip = value;
                        }
                    }
                }
                
                if(value == true){                   
                    if(!etapa.arrEtapaParceria.tooltip || (etapa.arrEtapaParceria.tooltip && etapa.arrEtapaParceria.tooltip.EtapaVinculo.length == 0) )
                    {
                        $scope.loadingParceria = true;
                        $http({
                            url: "/AVA/Projetos/Servico/GetTurmasParceria",
                            method: "POST",
                            params: { 
                                idEdicao : $scope.objEdicao.Id,
                                idEtapa : etapa.Id
                            }
                        }).success(function (data) {
                            etapa.arrEtapaParceria.tooltip = data;
                            if(etapa.arrEtapaParceria.tooltip){
                                if(etapa.arrEtapaParceria.tooltip.Turmas != null){
                                    etapa.arrEtapaParceria.showTooltip = value;
                                }
                            }

                            $scope.loadingParceria = false;
                        }).error(function (err) {
                            console.log("Não foi possível efetuar esta operação.");
                        }).finally(function(){
                            $scope.loadingParceria = false;
                        });
                    }
                }else{
                    etapa.comboTurma = {};
                }
            };


            $scope.Comite="";
            $scope.TipoComite = "Candidato";
            $scope.bolUsuarioInscrito=false;
            $scope.bolAlunoInscritoEleicoes=false;
            $scope.bolEducadorInscritoEleicoes=false;
            $scope.bolPaiInscritoEleicoes = false;
            $scope.situacaoEtapaFinal = 0;

            this.loadStatusEleicoes=function(){
                if ($scope.objUsuario.TurmasInscritas)
                if ($scope.objUsuario.TurmasInscritas instanceof Array)
                if (projetoTools.hasArrayElems($scope.objUsuario.TurmasInscritas))
                if (projetoTools.hasArrayElems($scope.edicaoConfig.GruposCategorias))
                if (projetoTools.hasArrayElems($scope.edicaoConfig.GruposCategorias[0].Categorias)) {
                    if($scope.bolAluno){
                        var turma_inscricao = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Id: '!' + 0, Categorias: [ { Id : '!'+0 } ] } }, true);
                        if(projetoTools.hasArrayElems(turma_inscricao)){
                            var categoria = $filter('filter')($scope.edicaoConfig.GruposCategorias[0].Categorias, { Id: turma_inscricao[0].Inscricao.Categorias[0].Id } , true);
                            if(angular.hasArrayElems(categoria)){
                                $scope.bolAlunoInscritoEleicoes=true;
                                categoria[0].Slug = IniciaisMaiusculas(retira_acentos(categoria[0].Descricao).replace(/-/g," ")).replace(/\s/g,"");
                                $scope.Comite=categoria[0].Slug;
                                if(angular.hasArrayElems(categoria[0].Subcategorias)){
                                    $scope.TipoComite = "Partido";
                                }
                            }
                        }
                    }
                    if($scope.bolEducador || $scope.bolAdministrador){
                        $scope.bolEducadorInscritoEleicoes=true;
                    }
                    if($scope.bolPai){
                        $scope.bolPaiInscritoEleicoes = true;
                    }
                }
            };
            
            this.init = function () {
                var initApi = true;
                if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
                    initApi = false;
                }
                if (initApi) {
                    projetoTools.extendFunctions(self);
                    projetoTools.extendFunctions($scope);
                }

                $scope.bolEducador = projetoTools.verificaPerfil($scope.objUsuario,'Educador');
                $scope.bolAdministrador = projetoTools.verificaPerfil($scope.objUsuario,'Administrador');
                $scope.bolAluno = projetoTools.verificaPerfil($scope.objUsuario,'Aluno');
                $scope.bolPai = projetoTools.verificaPerfil($scope.objUsuario,'Responsável');

                if ($scope.objUsuario.TurmasInscritas)
                if ($scope.objUsuario.TurmasInscritas instanceof Array)
                if (projetoTools.hasArrayElems($scope.objUsuario.TurmasInscritas)){
                    $scope.bolUsuarioInscrito=true;
                }


                //usado para personalizar o botao de texto da etapa de enquete
                self.loadStatusEleicoes();

                if ($scope.objEtapas != undefined) {
                    angular.forEach($scope.objEtapas, function (valor, chave) {
                        $scope.objEtapas[chave].DataInicio = eval("new " + valor.DataInicio.replace(/\//ig, ""));
                        $scope.objEtapas[chave].DataFim = eval("new " + valor.DataFim.replace(/\//ig, ""));
                        $scope.objEtapas[chave].DataResultado = eval("new " + valor.DataResultado.replace(/\//ig, ""));
                    });                    
                    $scope.etapaFinal = angular.copy(projetoTools.getEtapaFinal($scope.objEtapas));
                    $scope.situacaoEtapaFinal = self.situacaoEtapa($scope.etapaFinal);
                }


                $scope.bolMultiplosComites = $scope.isMultiplosComites();
            };

            this.classEtapa = function (ordem) {
                if (ordem < 9) {
                    return "etapa0" + ordem;
                }
                else {
                    return "etapa" + ordem;
                }

            }

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

            $scope.isMultiplosComites = function () {                
                var countTurmas = 0;
                $scope.objUsuario = constantes.Usuario;                                                                               
                if($scope.edicaoConfig.GruposCategorias instanceof Array) 
                    if ($scope.edicaoConfig.GruposCategorias.length >= 0)
                        for(var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias){                
                            for(var turma in $scope.objUsuario.TurmasInscritas){
                                if($scope.objUsuario.TurmasInscritas[turma].Inscricao.Categorias[0].Id == $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Id){                            
                        
                                    var ContParceiro = 0;
                                    for(var parceiro in $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros){
                                        if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros[parceiro].Id){                                
                                            ContParceiro = ContParceiro + 1;
                                            break;
                                        }
                                    }

                                    if(ContParceiro > 0){
                                        countTurmas = countTurmas + 1;
                                        break;
                                    }
                                                        
                                    if($scope.objUsuario.Cargos && $scope.objUsuario.Cargos.length == 1)
                                        if($scope.objUsuario.Cargos[0] == 'Aluno')
                                            return false;
                        
                                    if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Responsavel.Id){
                                        countTurmas = countTurmas + 1;
                                        break;                    
                                    }                        
                                }
                            }                                      
                }
                if(countTurmas > 1)
                    return true;    
                return false;          
            }

            $scope.classLinkEtapa = function(p_etapa){
                var retorno="";
                switch(projetoTools.situacaoEtapa(p_etapa)){
                    case 0:
                    case 1:
                        retorno="aguarde";
                        break;
                    case 2:
                        retorno="enviar";
                        break;
                    case 3:
                    case 4:
                        retorno="confira";
                        break;
                }
                return retorno;
            };

            $scope.hrefTarget = function (p_etapa) {
                var retorno = undefined;
                var link = p_etapa.LinkTarefa;

                if (link !== null) {
                    if (!link.includes("educacional.com.br") && !link.includes("educacional.localhost") && !link.includes("educacional.net") && !link.startsWith("/")) {
                        retorno = '_blank';
                    }
                }
                return retorno;
            };

            $scope.hrefLinkEtapa = function(p_etapa){
                //por padrão, caso não seja atribuído nenhum link nas condições a seguir,
                //então verificar o evento disparado pelo click (vide $scope.clickLinkEtapa())
                var retorno = "javascript:;";

                if (p_etapa.LinkTarefa !== null && projetoTools.situacaoEtapa(p_etapa) != 0) {
                    retorno = p_etapa.LinkTarefa;
                    return retorno;
                }

                switch(projetoTools.situacaoEtapa(p_etapa)){
                    case 0:
                        //breve
                        break;
                    case 1:
                        //nao iniciada
                        //if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)==-1) {
                            retorno=$scope.strLinkEtapa(p_etapa);
                        //}
                        break;
                    case 2:
                        //em andamento
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                            //eleições
                            if([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1 && $scope.bolUsuarioInscrito) {
                                if(!$scope.bolMultiplosComites)
                                    retorno=$scope.strLinkComite(p_etapa)
                            }
                        }
                        else{
                            retorno=$scope.strLinkEtapa(p_etapa);
                        }
                        break;
                    case 3:
                        //pré-encerramento
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                            //eleições
                            if([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                                if($scope.situacaoEtapaFinal<2 && !$scope.bolMultiplosComites){
                                    retorno=$scope.strLinkComite(p_etapa)
                                }
                            }
                            if(p_etapa.TipoEtapaEleicao==5) {
                                retorno=$scope.strLinkResultado();
                            }
                        }
                        else{
                            retorno=$scope.strLinkEtapa(p_etapa);
                        }
                    case 4:
                        //encerrada
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                            //eleições
                            if([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                                if($scope.situacaoEtapaFinal<2 && !$scope.bolMultiplosComites){
                                    retorno=$scope.strLinkComite(p_etapa)
                                }
                            }
                            if(p_etapa.TipoEtapaEleicao==5) {
                                retorno=$scope.strLinkResultado();
                            }
                        }
                        else{
                            retorno=$scope.strLinkEtapa(p_etapa);
                        }
                        break;
                    default:
                        break;
                }
                return retorno;
            };

            $scope.clickLinkEtapa = function(p_etapa){
                /*
                OBS:
                    'return false;' significa que a ação será pelo link no href
                    vide tratamento no $scope.hrefLinkEtapa() para esses casos
                */
                switch(projetoTools.situacaoEtapa(p_etapa)){
                    case 0:
                        //breve
                        return false;
                        break;
                    case 1:
                        //nao iniciada
                        return false;
                        break;
                    case 2:
                        //em andamento
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1){
                            if(([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1 && $scope.bolUsuarioInscrito && $scope.bolMultiplosComites) || p_etapa.TipoEtapaEleicao==5){
                                $scope.acaoEleicao(p_etapa);
                            }
                            else{
                                return false;
                            }
                        }
                        else{
                            return false;
                        }
                        break;
                    case 3:
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1){
                            //eleições
                            if([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                                $scope.acaoEleicao(p_etapa);
                            }
                            if(p_etapa.TipoEtapaEleicao==5) {
                                //usará o link de resultado no href
                            }
                        }
                        else{
                            return false;
                        }
                    case 4:
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1){
                            //eleições
                            if([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                                $scope.acaoEleicao(p_etapa);
                            }
                            if(p_etapa.TipoEtapaEleicao==5) {
                                //usará o link de resultado no href
                            }
                        }
                        else{
                            return false;
                        }
                        break;
                    default:
                        return false;
                        break;
                }
            };

            $scope.htmlLinkEtapa = function(p_etapa){
                var retorno="";
                switch(projetoTools.situacaoEtapa(p_etapa)){
                    case 0:
                        retorno="Aguarde! <span>"+projetoTools.DiaMesComZeros(p_etapa.DataInicio)+"</span>";
                        break;
                    case 1:
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1){
                            retorno="Aguarde! <span>dia "+projetoTools.DiaMesComZeros(p_etapa.DataInicio)+"</span>";
                        }
                        else{
                            retorno="Confira! <span>de "+projetoTools.DiaMesComZeros(p_etapa.DataInicio)+" a "+projetoTools.DiaMesComZeros(p_etapa.DataFim)+"</span>";
                        }
                        break;
                    case 2:
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1){
                            retorno="Votação <span>dia "+projetoTools.DiaMesComZeros(p_etapa.DataFim)+"</span>";
                        }
                        else{
                            retorno="Envios liberados! <span>"+projetoTools.DiaMesComZeros(p_etapa.DataFim)+"</span>";
                        }
                        break;
                    case 3:
                        retorno="Resultado <span>"+projetoTools.DiaMesComZeros(p_etapa.DataResultado)+"</span>";
                        break;                    
                    case 4:
                        if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1){
                            //if($scope.bolMultiplosComites)
                            retorno="Ver resultado!";
                        }
                        else{
                            retorno="Confira os resultados";
                        }
                        break;
                    default:
                        retorno="";
                        break;
                }
                return retorno;
            };

            $scope.strLinkComite = function(objEtapa){   
                 if(!$scope.bolMultiplosComites && $scope.objUsuario){                                        
                    var categoriaLink = '';
                    $scope.objUsuario = constantes.Usuario;                                                                               
                    if($scope.edicaoConfig.GruposCategorias instanceof Array) 
                        if ($scope.edicaoConfig.GruposCategorias.length >= 0)
                            for(var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias){                
                                for(var turma in $scope.objUsuario.TurmasInscritas){
                                    if($scope.objUsuario.TurmasInscritas[turma].Inscricao.Categorias[0].Id == $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Id){                            
                        
                                        var ContParceiro = 0;
                                        for(var parceiro in $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros){
                                            if($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Parceiros[parceiro].Id){                                
                                                ContParceiro = ContParceiro + 1;
                                                break;
                                            }
                                        }
                        
                                        if( ContParceiro > 0 ||
                                            ($scope.objUsuario.Id == $scope.objUsuario.TurmasInscritas[turma].Inscricao.Responsavel.Id) ||
                                            (($scope.bolAluno || $scope.bolPai) && projetoTools.hasArrayElems($scope.objUsuario.TurmasInscritas))
                                            
                                        ){
                                            //(($scope.objUsuario.Cargos && $scope.objUsuario.Cargos.length == 1) && $scope.objUsuario.Cargos[0] == 'Aluno')
                                            categoriaLink = $scope.edicaoConfig.GruposCategorias[0].Categorias[categoria];
                                            break;                  
                                        }                        
                                    }
                                }                                      
                            }                                        
                    
                    var slugLink      = categoriaLink.Slug;                    

                    var tipoEleicaoLink = "Candidato";
                    if(categoriaLink.Subcategorias instanceof Array) 
                        if (categoriaLink.Subcategorias.length > 0)
                           tipoEleicaoLink = "Partido";
                    if ($scope.bolAlunoInscritoEleicoes || $scope.bolEducadorInscritoEleicoes  || $scope.bolPaiInscritoEleicoes){
                        return '/AVA/Projetos/' + $scope.objEdicao.Ano + '/' + $scope.objEdicao.Link + '/' + tipoEleicaoLink + '/' + slugLink;
                    }
                }
                return $scope.strLinkEtapa(objEtapa);
            }

            $scope.strLinkResultado = function(){   
                return '/AVA/Projetos/' + $scope.objEdicao.Ano + '/' + $scope.objEdicao.Link + '/ResultadoNacional';
            };

            $scope.strLinkEtapa = function(etapa){   
                return '/AVA/Projetos/' + $scope.objEdicao.Ano + '/' + $scope.objEdicao.Link + '/Etapas/' + etapa.Link;
            };

            $scope.acaoEleicao = function(p_etapa){
                if(p_etapa.TipoEtapaEleicao==5 && $scope.situacaoEtapaFinal==2){
                    $scope.AbreUrna(p_etapa);
                }
                else if ($scope.bolEducadorInscritoEleicoes || $scope.situacaoEtapaFinal>=2){
                    $scope.openModalEducador(p_etapa);
                }
            };

            $scope.AbreUrna = function (etapa) {
                //console.log("abreUrna");
                var linkTarefa = "";
                if(etapa) if (etapa.LinkTarefa) if (etapa.LinkTarefa!="") if(etapa.LinkTarefa.toLowerCase().indexOf("eleicoes/urna")!=-1) {
                    linkTarefa = etapa.LinkTarefa;
                }
                if(!etapa) if(projetoTools.hasArrayElems($scope.objEtapas)) {
                    var temp = $filter('filter')($scope.objEtapas, { TipoEtapaEleicao: { Id: 5 } }, false);
                    if(projetoTools.hasArrayElems(temp)) if (temp[0].LinkTarefa != "") {
                        linkTarefa = temp[0].LinkTarefa;
                    }
                }
                if(linkTarefa != ""){
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
                else {
                    console.log("Endereço da etapa não configurado.");
                }
            };

            $scope.openModalEducador = function (p_etapa) {
                //var p_etapa = undefined;//angular.copy($scope.objEtapas[0]);
                var categorias = undefined;
                var strControle = "";
                var strTemplate = "";

                if(!p_etapa){
                    angular.forEach($scope.objEtapas, function (curEtapa, curIdxEtapa) {
                        if(self.situacaoEtapa(curEtapa)==2){
                            p_etapa = angular.copy(curEtapa);        
                        }
                        if([1,3,5].indexOf(curEtapa.TipoEtapaEleicao)!=-1) {
                            if([1,3].indexOf(curEtapa.TipoEtapaEleicao)!=-1) {
                                strControle = "ctrlModalEnquete";
                                strTemplate = "/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete-educador.html";
                            }
                        //    if([5].indexOf(curEtapa.TipoEtapaEleicao)!=-1) if(self.situacaoEtapa(curEtapa)==2){
                        //        strControle = "ctrlModalVotacaoEducador";
                        //        strTemplate = "/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-educador.html";
                        //    }
                        }
                        
                    });
                }
                if(p_etapa) if(self.situacaoEtapa(p_etapa)>1) if([1,3,5].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                    if([1,3].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                        strControle = "ctrlModalEnquete";
                        strTemplate = "/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-enquete-educador.html";
                    }
                    //if([5].indexOf(p_etapa.TipoEtapaEleicao)!=-1) {
                    //    strControle = "ctrlModalVotacaoEducador";
                    //    strTemplate = "/AVA/Projetos/Scripts/App/Diretiva/Eleicao/modal-votacao-educador.html";
                    //}
                }
                if (projetoTools.hasArrayElems($scope.edicaoConfig.GruposCategorias))
                if (projetoTools.hasArrayElems($scope.edicaoConfig.GruposCategorias[0].Categorias)) {
                    categorias = angular.copy($scope.edicaoConfig.GruposCategorias[0].Categorias);
                }
                if(strControle!="" && strTemplate!="" && angular.isArray(categorias) && projetoTools.hasArrayElems(categorias)){
                    var modalInstance = $modal.open({
                        templateUrl: strTemplate,
                        controller: strControle,
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
                                return categorias;
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

            // Sempre dar uma mini delay para a inicialização do Modulo.
            $timeout(function () { self.init() }, 10);
        } ],
        controllerAs: 'Etapas'
    };

});
