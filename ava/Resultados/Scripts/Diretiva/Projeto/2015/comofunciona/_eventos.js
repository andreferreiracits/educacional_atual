"use strict";

angular.module("resultado").controller('ComoFuncionaEventos2015Ctrl', ["$http", "$scope", "$timeout", "$filter", "$location","projetoMapa", function ($http, $scope, $timeout, $filter, $location, projetoMapa) {
    var _self = this;
    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };

    $scope.intPagina = 0;
    $scope.intRegPorPagina = 6;
    $scope.TotalPortalEnvios = 0;
    $scope.TotalEnvios = 0;
    $scope.Envios = [];
    $scope.Escolas = [];
    $scope.Estados = [];
    $scope.Turmas = [];
    $scope.Categorias = [];
    $scope.CacheEscolas = [];
    $scope.CacheEstados = [];
    $scope.CacheTurmas = [];
    $scope.CacheEscolasFinal = [];
    $scope.CacheEstadosFinal = [];
    $scope.CacheTurmasFinal = [];

    $scope.loadInProgress = true;
    $scope.appendInProgress = false;

    $scope.currentLevel = 0;

    $scope.EstadoSelecionado = undefined;
    $scope.EscolaSelecionada = undefined;
    $scope.TurmaSelecionada = undefined;

    var controleAssincrono = undefined;

    $scope.aplicarFiltros = function (level,bolAppend) {
        var carregado = false;
        if($scope.categoriasEtapa1) if($scope.categoriasEtapa1 instanceof Array) if($scope.categoriasEtapa1.length>0){
            carregado = true;
        }
        if(carregado){
            clearTimeout(controleAssincrono);
            _self.aplicarFiltros(level,bolAppend);
        }
        else{
            clearTimeout(controleAssincrono);
            controleAssincrono = setTimeout(function($scope){
                $scope.aplicarFiltros(level,bolAppend);
            },1000);
        }
    };

    this.aplicarFiltros = function (level,bolAppend) {
        if(bolAppend){
            $scope.intPagina=$scope.intPagina+1;
        }
        else{
            $scope.intPagina=1;
        }
        $scope.currentLevel=level;

        var _self=this;
        $timeout(function(){
            var idEstado = '';
            var idEscola = 0;
            var idTurma = 0;
            var strUF = '';
            if ($scope.EstadoSelecionado) if ($scope.EstadoSelecionado.Sigla) if ($scope.EstadoSelecionado.Sigla != "") {
                idEstado = $scope.EstadoSelecionado.Sigla;
            }
            if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) if (parseInt($scope.EscolaSelecionada.Id)>0){
                idEscola = parseInt($scope.EscolaSelecionada.Id);
            }
            if ($scope.TurmaSelecionada) if ($scope.TurmaSelecionada.Id) if (!isNaN($scope.TurmaSelecionada.Id)) if (parseInt($scope.TurmaSelecionada.Id)>0){
                idTurma = parseInt($scope.TurmaSelecionada.Id);
            }
            //aplica filtragens nas combos após a seleção
            switch (level) {
                case 0:
                    //filtra as Escolas conforme o Estado selecionado
                    $scope.EscolaSelecionada = undefined;
                    $scope.TurmaSelecionada = undefined;
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
                    $scope.TurmaSelecionada = undefined;
                    if (idEscola>0) {
                        //filtra as escolas conforme o estado selecionado
                        var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
                        turmas=$filter('unique')(turmas,"Id");
                        $scope.Turmas = angular.copy(turmas);
                    }
                    else {
                        $scope.Turmas = [];
                    }
                    break;
            }
            var idEscola = 0;
            var idTurma = 0;
            if ($scope.EscolaSelecionada) if ($scope.EscolaSelecionada.Id) if (!isNaN($scope.EscolaSelecionada.Id)) if (parseInt($scope.EscolaSelecionada.Id)>0){
                idEscola = parseInt($scope.EscolaSelecionada.Id);
            }
            if ($scope.TurmaSelecionada) if ($scope.TurmaSelecionada.Id) if (!isNaN($scope.TurmaSelecionada.Id)) if (parseInt($scope.TurmaSelecionada.Id)>0){
                idTurma = parseInt($scope.TurmaSelecionada.Id);
            }
            if(true){
                //reseta/recarrega todos os elementos
                $scope.CacheEscolasFinal = angular.copy($scope.CacheEscolas);
                if(!bolAppend){
                    $scope.Envios = [];
                    $scope.loadInProgress = true;
                }
                else{
                    $scope.appendInProgress = true;
                }
                $scope.TotalEnvios = 0;
                var path = "/AVA/Projetos/Servico/GetEnviosCompostosFiltradoOrdenadoPaginado/?_=" + new Date().getTime();
                var parametros = {
                    idProjeto: $scope.edicao.Projeto.Id,
                    idEdicao: $scope.edicao.Id,
                    idEtapa: $scope.edicao.Etapas[2].Id,
                    idSituacao: 1,
                    idEscola : idEscola,
                    strUF : idEstado,
                    idTurma: idTurma,
                    idInscricao:0,
                    idUsuario:0,
                    tipoProjeto: $scope.edicao.TipoProjeto,
                    tipoOrdenacao: 1,
                    intPagina: $scope.intPagina,
                    intRegPorPagina: $scope.intRegPorPagina,
                    intDestaque: 0,
                    intEtapaRelativa: 0,
                    idCategoria: $scope.categoriasEtapa1[2].Id,
                    termoBusca: ''
                };
                if ($scope.intPagina == 1){
                    $scope.TotalEnvios = 0;
                    $scope.Envios = new Array();
                }
                $http({
                    url: path,
                    method: "POST",
                    params: parametros
                }).success(function (data) {
                    if (data) if (data instanceof Object) {
                        if (data.TotalEnvios) if (!isNaN(data.TotalEnvios)) if (parseInt(data.TotalEnvios) >= 0) {
                            $scope.TotalEnvios = parseInt(data.TotalEnvios);
                        }
                        var inicializar=true;
                        if($scope.CacheEscolas) if($scope.CacheEscolas instanceof Array) if($scope.CacheEscolas.length>0){
                            inicializar=false;
                        }
                        if(inicializar){
                            //lista de escolas/estados para os filtros

                            if($scope.CacheEscolas.length==0) if (data.listaEscolas) if (data.listaEscolas instanceof Array) if (data.listaEscolas.length > 0) {
                                $scope.CacheEscolas = data.listaEscolas;
                                var temp = ",";
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
                            if ($scope.CacheTurmas) if ($scope.CacheTurmas instanceof Array) if ($scope.CacheTurmas.length == 0) if (data.listaTurmas) if (data.listaTurmas instanceof Array) if (data.listaTurmas.length > 0) {
                                $scope.CacheTurmas = data.listaTurmas;
                                $scope.Turmas = angular.copy($scope.CacheTurmas);
                                if (idEscola>0) {
                                    //filtra as escolas conforme a escola selecionada
                                    var turmas = $filter('filter')($scope.CacheTurmas, { Escola: { Id : idEscola} }, true);
                                    $scope.Turmas = angular.copy(turmas);
                                }
                            }

                            if (data.listaCategorias) if (data.listaCategorias instanceof Array) if (data.listaCategorias.length > 0) {
                                $scope.Categorias = data.listaCategorias;
                            }
                        }
                        //popula os envios
                        if (data.listParticipanteEnvio) if (data.listParticipanteEnvio instanceof Array) if (data.listParticipanteEnvio.length > 0) {
                            if(bolAppend){
                                for(var material in data.listParticipanteEnvio){
                                    $scope.Envios.push(data.listParticipanteEnvio[material]);
                                }
                            }
                            else{
                                $scope.Envios = data.listParticipanteEnvio;
                            }
                        }
                    }
                    $scope.loadInProgress = false;
                    $scope.appendInProgress = false;
                }).error(function (err) {
                    console.log("Não foi possível buscar materiais da etapa");
                }).finally(function(){
                    
                });
            }
        },150);
    };

    $scope.getEstadoByUf = function (strUF) {
        var arrNomes = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rio de Janeiro', 'Rondônia', 'Roraima', 'São Paulo', 'Santa Catarina', 'Sergipe', 'Tocantins'];
        var arrSiglas = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RN', 'RS', 'RJ', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
        return arrNomes[arrSiglas.indexOf(strUF)];
    };

    _self.aplicarFiltros(0,false);
} ]);