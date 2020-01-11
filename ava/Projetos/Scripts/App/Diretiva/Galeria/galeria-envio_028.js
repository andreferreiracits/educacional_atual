"use strict"
angular.module('Etapa').directive('galeriaEnvio', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-envio.html',
        scope: {
            objEdicao: "=objEdicao",
            objEtapa: "=objEtapa",
            usuario: "=usuario",
            defaultConfig: "=defaultConfig",
            maxRegistroPagina: "@maxRegistroPagina",
            simplesmenteDestaques: "@simplesmenteDestaques"
        },
        link: function (scope, el, attr) {
        },
        controller: ['$http', '$scope', '$timeout', '$filter', '$location', function ($http, $scope, $timeout, $filter, $location) {
            var self = this;
            
            $scope.bolSemGaleria = false;
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

            /*$scope.mostrarCampoDeFiltro01 = false;
            $scope.mostrarCampoDeFiltro02 = false;
            $scope.mostrarCampoDeFiltro03 = false;
            $scope.mostrarCampoDeFiltro04 = false;
            $scope.mostrarCampoDeFiltro05 = false;
            $scope.mostrarCampoDeFiltro06 = false;
            $scope.mostrarCampoDeFiltro07 = false;
            $scope.mostrarCampoDeFiltro08 = false;
            $scope.mostrarCampoDeFiltro09 = false;
            $scope.mostrarCampoDeFiltro10 = false;*/

            $scope.CacheCategoriasFinal = [];
            $scope.CacheEscolasImutavel = [];
            $scope.CacheEstadosImutavel = [];
            $scope.CacheTurmasImutavel = [];            
            $scope.loadingBuscarGeral = false;
            $scope.loadingBuscarPortal = false;

            //this.CategoriaSelecionado = undefined;
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


            this.EstadoSelecionado = undefined;
            this.EscolaSelecionada = undefined;
            this.TurmaSelecionada = undefined;
            this.AnoSelecionado = undefined; 
            var filtros = '';
            var naoCarregaLoader = false;

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

            self.openAbaGaleria = function (idAba) {
                
                if($scope.controle.aba_atual == 2){
                    if(idAba == 1 && $scope.objEnviosInscricao.TotalEnvios > 0){
                        $scope.controle.aba_atual = idAba;        
                    }
                }else{
                    $scope.controle.aba_atual = idAba;
                }                                        
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
                $scope.paramsPortal.intPagina=1;
                $scope.paramsMateriais.intPagina=1;
                if($scope.controle.aba_atual == 1){
                    self.aplicarFiltros(2);
                }
                else if($scope.controle.aba_atual == 2){
                    self.buscarEnvioPortal(true);
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
           

            this.buscarEnvioPortal = function (bolNaoMudaAba) {
                
                if (!$scope.loadingBuscarGeral) {
                    $scope.loadingBuscarGeral = true;
                    $scope.paramsPortal.intPagina = 1;

                    $http.post('/AVA/Projetos/Servico/GetPortalEnvioPorIdProjetoEdicaoEtapaTipoProjeto', {
                        idProjeto: $scope.objEdicao.Projeto.Id,
                        idEdicao: $scope.objEdicao.Id,
                        idEtapa: $scope.paramsPortal.idEtapaParam,
                        tipoProjeto: $scope.objEdicao.TipoProjeto,
                        tipoOrdenacao: self.getOrdenacao(),
                        intPagina: $scope.paramsPortal.intPagina,
                        intRegPorPagina: $scope.paramsPortal.intRegPorPagina,
                        intDestaque: $scope.paramsMateriais.simplesmenteDestaques,
                        intAno : self.AnoSelecionado
                    }).success(function(data) {                        

                        $scope.objComoFazer = data.listPortalEnvio; //popula como fazer
                        $scope.filteredEnvioPortal = [];

                        var intPagina = $scope.paramsPortal.intPagina;
                        var regPorPagina = $scope.paramsPortal.intRegPorPagina;
                        var begin = ((intPagina * regPorPagina) - (regPorPagina- 1))-1;
                        var end = (intPagina * regPorPagina)-1;

                        if (data.listPortalEnvio) if (data.listPortalEnvio instanceof Array) if (data.listPortalEnvio.length > 0) {
                            for(var i = begin; i <= end; i++){
                                if(data.listPortalEnvio[i]){
                                    $scope.filteredEnvioPortal.push(data.listPortalEnvio[i]);
                                }
                            }
                        }

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

                        if(data.listaAnos){
                            $scope.listaAnos = data.listaAnos;
                        }

                        if(data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0 && $scope.CacheEscolasImutavel.length <= 0){                                    
                            //escolas
                            $scope.CacheEscolasImutavel = angular.copy(data.listaEscolas);                                    
                            
                            //estados
                            var temp = ",";
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

                        //valor base para o total de envios
                        if(data.TotalEnvios){
                            $scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios;
                        }

                        //popula os envios
                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            $scope.nuncaExistiramMateriais=false;
                            $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                        }

                        
                        if($scope.bolSemGaleria){
                            $scope.controle.aba_atual = 2;
                        }
                        else{
                            if(!bolNaoMudaAba){
                                if($scope.nuncaExistiramMateriais)
                                    $scope.controle.aba_atual = 2;
                                else
                                    $scope.controle.aba_atual = 1;
                            }

                            try{
                                if(
                                    (!data.listParticipanteEnvio || data.listParticipanteEnvio.length == 0) 
                                    &&  $scope.objComoFazer.length > 0
                                ){
                                   $scope.controle.aba_atual = 2;
                                }
                            }catch(err){}
                        }


                    }).error(function (err) {
                        console.log("Não foi possível buscar detalhe da Etapa");
                    }).finally(function(){
                        $scope.loadingBuscarGeral = false;
                    });
                }
            };

            this.aplicarFiltros = function (level,Objeto) {                                
                if(level == 3){
                    self.buscarEnvioPortal();
                    self.EstadoSelecionado = undefined;
                    self.EscolaSelecionada = undefined;
                    self.TurmaSelecionada  = undefined;
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
                           
                    /*switch (level) {
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
                    }*/
                    //------------------------------------------------------------------------------------------
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
                    //------------------------------------------------------------------------------------------
                    //var idEscola = 0;
                    //var idTurma = 0;
                    /*if (self.EscolaSelecionada) if (self.EscolaSelecionada.Id) if (!isNaN(self.EscolaSelecionada.Id)) if (parseInt(self.EscolaSelecionada.Id)>0){
                        idEscola = parseInt(self.EscolaSelecionada.Id);
                    }
                    if (self.TurmaSelecionada) if (self.TurmaSelecionada.Id) if (!isNaN(self.TurmaSelecionada.Id)) if (parseInt(self.TurmaSelecionada.Id)>0){
                        idTurma = parseInt(self.TurmaSelecionada.Id);
                    }*/

                    if(true){
                        //reseta/recarrega todos os elementos                        
                        $scope.objEnviosInscricao.Envios = [];
                        $scope.objEnviosInscricao.TotalEnvios = 0;
                        $scope.paramsMateriais.intPagina = 1;

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
                            idCategoria:0,
                            bolEnviosCompletos:false,
                            filtros:filtros
                        };
                        if (parametros.intPagina == 1 && !naoCarregaLoader){
                            $scope.objEnviosInscricao.TotalEnvios = 0;
                            $scope.objEnviosInscricao.Envios = new Array();
                        }
                        $http({
                            url: path,
                            method: "POST",
                            params: parametros
                        }).success(function (data) {                                                  
                            if (data) if (data instanceof Object) {                            
                                if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                                    $scope.objEnviosInscricao.TotalEnvios = parseInt(data.TotalEnvios);
                                    if(naoCarregaLoader && $scope.objEnviosInscricao.TotalEnvios == 0){
                                        $scope.objEnviosInscricao.Envios = 0;                                
                                    }
                                }
                                if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                                    $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                                }
                                
                                $scope.controle.aba_atual = 1;

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

                                    self.aplicarFiltros(level,Objeto);
                                }                                
                                
                                
                                if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {                                
                                    $scope.CacheTurmas = angular.copy(data.listaTurmas);                                                
                                } 

                                if(level == 0){                                    
                                    if(idEstado && idEstado.length == 2){
                                        $scope.Escolas = angular.copy($filter('filter')($scope.CacheEscolasImutavel, { Estado: idEstado }, true));
                                    }else{
                                        $scope.Escolas = angular.copy($scope.CacheEscolasImutavel);
                                    }                                    
                                }else if(level > 0 && idEscola > 0){
                                    $scope.Turmas = angular.copy($filter('filter')($scope.CacheTurmas , { Escola: { Id : idEscola} }, true));                                                                                        
                                }                                
                                
                                
                                // atualiza turmas de acordo com o filtro
                                /*if(idEscola > 0){
                                    $scope.Turmas = angular.copy($filter('filter')(data.listaTurmas , { Escola: { Id : idEscola} }, true));                                            
                                }*/
                                
                                // -------------------------------------------------
                                /*if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {
                                    var temp = ",";

                                    $scope.CacheEscolas = angular.copy(data.listaEscolas);
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

                                if (data.listaTurmas && data.listaTurmas instanceof Array && data.listaTurmas.length > 0) {                            
                                    $scope.CacheTurmas = angular.copy(data.listaTurmas);
                                    $scope.Turmas = angular.copy($scope.CacheTurmas);
                                }   */                                                              


                                /*
                                if(data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0 && $scope.CacheEscolasImutavel.length <= 0){                                    
                                    //escolas
                                    $scope.CacheEscolasImutavel = angular.copy(data.listaEscolas);                                    
                                    $scope.CacheEscolas = angular.copy($scope.CacheEscolasImutavel);
                                    $scope.Escolas = angular.copy($scope.CacheEscolasImutavel);                                    
                                    //estados
                                    var temp = ",";
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
                                        $scope.CacheEscolasImutavel = angular.copy($scope.Estados);
                                        $scope.CacheEstados = angular.copy($scope.Estados);
                                    }                                                                                                            
                                }
                                */
                                /*
                                switch (level) {
                                    case 0:                                        
                                        if(idEstado && idEstado.length == 2){
                                            $scope.Escolas = angular.copy($filter('filter')($scope.CacheEscolasImutavel, { Estado: idEstado }, true));
                                        }else{
                                            $scope.Escolas = angular.copy($scope.CacheEscolasImutavel);
                                        }
                                        break;
                                    case 1:
                                        if(idEscola > 0){
                                            $scope.Turmas = angular.copy($filter('filter')($scope.CacheTurmasImutavel , { Escola: { Id : idEscola} }, true));                                            
                                        }
                                        break;
                                     
                                    case 2:                                                                            
                                        break;
                                    case 4:
                                        break;
                                } */
                                

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
                                // -------------------------------------------------

                            }
                            $scope.loadInProgress = false;
                        }).error(function (err) {
                            console.log("Não foi possível buscar materiais da etapa");
                        }).finally(function(){
                            $scope.loadingBuscarGeral = false;
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
                $scope.paramsMateriais.intPagina++;
                var ordenacao = self.getOrdenacao();
                var path = "/AVA/Projetos/Servico/GetInscricaoEnvioPaginado/";
                var parametros = {
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
                    intAno : self.AnoSelecionado,
                    idCategoria:0,
                    bolEnviosCompletos:false,
                    filtros:filtros
                };
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
                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            angular.forEach(data.listParticipanteEnvio, function (valor, chave) {
                                $scope.objEnviosInscricao.Envios.push(valor);
                            });
                            $scope.objEnviosInscricao.TotalEnvios = data.TotalEnvios; 
                            $scope.controle.aba_atual = 1;
                        }
                    }
                    $scope.loadMoreInProgress = false;
                });
            };

            this.buscarEnvioPortal();
        } ],
        controllerAs: 'galeriaEnvioCtrl'
    };
});