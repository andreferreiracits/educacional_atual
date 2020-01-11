"use strict"
angular.module('Etapa').directive('galeriaEnvioPreSelecionado', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Galeria/galeria-envio-pre-selecionado.html',
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

            $scope.CacheCategoriasFinal = [];
            $scope.CacheEscolasFinal = [];
            $scope.CacheEstadosFinal = [];
            $scope.CacheTurmasFinal = [];
            $scope.loadingBuscarGeral = false;
            $scope.loadingBuscarPortal = false;

            this.CategoriaSelecionado = undefined;
            this.EstadoSelecionado = undefined;
            this.EscolaSelecionada = undefined;
            this.TurmaSelecionada = undefined;
            this.AnoSelecionado = undefined;
            
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

                    $http.post('/AVA/Projetos/Servico/GetPortalEnvioPreSelecionadosPorIdProjetoEdicaoEtapaTipoProjeto', {                    
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

                        //---------------------------------------------
                        //lista de categorias para filtro
                        // #Rafael
						if (data.listCamposDeFiltro) if (data.listCamposDeFiltro instanceof Array) if (data.listCamposDeFiltro.length > 0) {
							$scope.Categorias = [];
                            var indiceCategoria = 0;

                            for(var idxCombo in data.listCamposDeFiltro){
                                $scope.CatAux = [];
                                for(var opcao in data.listCamposDeFiltro[idxCombo]){
                                    //var IdFormularioCampo = data.listCamposDeFiltro[idxCombo][opcao][0].IdFormularioCampo;
									$scope.CatAux.push({
		                                IdFormularioGrupo:              data.listCamposDeFiltro[idxCombo][opcao][0].IdFormularioCampo,
		                                IntOrdemGrupo:                  data.listCamposDeFiltro[idxCombo][opcao][0].IntOrdemGrupo,
		                                IdFormularioCampo:              data.listCamposDeFiltro[idxCombo][opcao][0].IdFormularioCampo,
		                                IntOrdemCampo:                  data.listCamposDeFiltro[idxCombo][opcao][0].IntOrdemCampo,
                                		IdFormularioCampoOpcao:         data.listCamposDeFiltro[idxCombo][opcao][0].IdFormularioCampoOpcao,
		                                IntOrdemFormularioCampoOpcao:   data.listCamposDeFiltro[idxCombo][opcao][0].IntOrdemFormularioCampoOpcao,
		                                StrTitulo:                      data.listCamposDeFiltro[idxCombo][opcao][0].StrTitulo,
		                                StrOpcao:                       data.listCamposDeFiltro[idxCombo][opcao][0].StrOpcao
									});                                    
                                }
						        if ($scope.CatAux.length > 0){							        
                                    $scope.Categorias[indiceCategoria] = angular.copy($scope.CatAux);
                                    indiceCategoria++;
                                }
                            }                          

						}                        

                        if(data.listaAnos){
                            $scope.listaAnos = data.listaAnos;
                        }

                        //lista de escolas/estados para os filtros
                        if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {
                            var temp = ",";

                            $scope.CacheEscolas = data.listaEscolas;
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
                        if (data.listaTurmas && data.listaTurmas instanceof Array && data.listaTurmas.length > 0) {
                            $scope.CacheTurmas = data.listaTurmas;
                            $scope.Turmas = angular.copy($scope.CacheTurmas);
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
                var _self = this;
                
                if(level == 3){
                    self.buscarEnvioPortal();
                    _self.EstadoSelecionado = undefined;
                    _self.EscolaSelecionada = undefined;
                    _self.TurmaSelecionada = undefined;
                    return true;
                }
                
                $timeout(function() {
                    var idEstado = "";
                    var idEscola = 0;
                    var idTurma = 0;
                    if (_self.EstadoSelecionado) if (_self.EstadoSelecionado.Sigla) if (_self.EstadoSelecionado.Sigla != "") {
                        idEstado = _self.EstadoSelecionado.Sigla;
                    }
                    if (_self.EscolaSelecionada) if (_self.EscolaSelecionada.Id) if (!isNaN(_self.EscolaSelecionada.Id)) if (parseInt(_self.EscolaSelecionada.Id)>0){
                        idEscola = parseInt(_self.EscolaSelecionada.Id);
                    }
                    if (_self.TurmaSelecionada) if (_self.TurmaSelecionada.Id) if (!isNaN(_self.TurmaSelecionada.Id)) if (parseInt(_self.TurmaSelecionada.Id)>0){
                        idTurma = parseInt(_self.TurmaSelecionada.Id);
                    }
                    //aplica filtragens nas combos após a seleção

                    

                    switch (level) {
                        case 0:
                            //filtra as Escolas conforme o Estado selecionado
                            _self.EscolaSelecionada = undefined;
                            _self.TurmaSelecionada = undefined;
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
                            _self.TurmaSelecionada = undefined;
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
                    var idEscola = 0;
                    var idTurma = 0;
                    if (_self.EscolaSelecionada) if (_self.EscolaSelecionada.Id) if (!isNaN(_self.EscolaSelecionada.Id)) if (parseInt(_self.EscolaSelecionada.Id)>0){
                        idEscola = parseInt(_self.EscolaSelecionada.Id);
                    }
                    if (_self.TurmaSelecionada) if (_self.TurmaSelecionada.Id) if (!isNaN(_self.TurmaSelecionada.Id)) if (parseInt(_self.TurmaSelecionada.Id)>0){
                        idTurma = parseInt(_self.TurmaSelecionada.Id);
                    }
                    if(true){
                        //reseta/recarrega todos os elementos
                        $scope.CacheEscolasFinal = angular.copy($scope.CacheEscolas),
                        $scope.objEnviosInscricao.Envios = [];
                        $scope.objEnviosInscricao.TotalEnvios = 0;
                        $scope.paramsMateriais.intPagina = 1;

                        var ordenacao = self.getOrdenacao();
                        $scope.loadingBuscarGeral = true;
                        var path = "/AVA/Projetos/Servico/GetInscricaoEnvioPreSelecionadosPaginado/";
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
                            intAno : _self.AnoSelecionado
                        };
                        if (parametros.intPagina == 1){
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
                                }
                                if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                                    $scope.objEnviosInscricao.Envios = data.listParticipanteEnvio;
                                }
                                $scope.controle.aba_atual = 1;
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
                var path = "/AVA/Projetos/Servico/GetInscricaoEnvioPreSelecionadosPaginado/";
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
                    intDestaque: $scope.paramsMateriais.simplesmenteDestaques
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