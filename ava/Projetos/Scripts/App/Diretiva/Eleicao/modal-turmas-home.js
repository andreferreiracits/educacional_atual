"use strict"

angular.module('Etapa').controller('ctrlEleicaoModalTurmasHome', ['$scope', '$filter', '$log', '$modalInstance', '$http', '$timeout', 'edicaoConfig', 'objEdicao', 'objUsuario', 'defaultConfig', 'constantes', 'projetoTools', 'categoria', function ($scope, $filter, $log, $modalInstance, $http, $timeout, edicaoConfig, objEdicao, objUsuario, defaultConfig, constantes, projetoTools, categoria) {
    var self = this;

    $scope.defaultConfig = defaultConfig;
    $scope.edicaoConfig = edicaoConfig;
    $scope.objUsuario = objUsuario;
    $scope.objEdicao = objEdicao;
    $scope.constantes = constantes;
    $scope.categoria = categoria;
    $scope.serieSelecionada = undefined;
    $scope.turmasFiltradas = [];
    $scope.seriesComInscricoes = [];
    $scope.tipoEleicao = "";

    $scope.ctrlRajadaEvento = undefined;

    //remapeia as funções de projetoTools para essa controller e para o escopo atual
    var initApi = true;
    if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
        initApi = false;
    }
    if (initApi) {
        angular.extendFunctions(self);
        angular.extendFunctions($scope);
    }

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    this.getNomeSerie = function (idSerie) {
        var retorno = "";
        if ($scope.objEdicao) if ($scope.objEdicao.Series) if ($scope.objEdicao.Series instanceof Array) if ($scope.objEdicao.Series.length > 0) {
            var temp = $filter('filter')($scope.objEdicao.Series, { Id: idSerie }, true);
            if (temp) if (temp instanceof Array) if (temp.length == 1) {
                retorno = temp.Nome;
            }
        }
        return retorno;
    };

    this.trocarFiltroSerie = function () {
        if ($scope.ctrlRajadaEvento) {
            $timeout.cancel($scope.ctrlRajadaEvento);
            $scope.ctrlRajadaEvento = undefined;
        }
        $scope.ctrlRajadaEvento = $timeout(function (event) {
            var bolDefault = true;
            if ($scope.serieSelecionada) if ($scope.serieSelecionada.Id) if ($scope.serieSelecionada.Id > 0) {
                bolDefault = false;
                $scope.turmasFiltradas = $filter('filter')($scope.objUsuario.TurmasInscritas, { IdSerie: $scope.serieSelecionada.Id, Inscricao: { Categorias: [{ Id: $scope.categoria.Id}]} }, true);
            }
            if (bolDefault) {
                $scope.turmasFiltradas = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Categorias: [{ Id: $scope.categoria.Id}]} }, true);
            }
        }, 150);
    };

    this.initWatchers = function () {
        $scope.$watch("serieSelecionada", function (newVal, oldVal) {
            if (newVal != oldVal) {
                self.trocarFiltroSerie();
            }
        }, true);
    };

    this.seriesInscritas = function () {
        var ids = [];
        var retorno = [];
        $scope.turmasFiltradas = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Categorias: [{ Id: $scope.categoria.Id}]} }, true);
        for (var insc in $scope.turmasFiltradas) {
            if (ids.indexOf($scope.turmasFiltradas[insc].IdSerie) == -1) {
                ids.push($scope.turmasFiltradas[insc].IdSerie);
                var objSerie = $filter('filter')($scope.objEdicao.Series, { Id: $scope.turmasFiltradas[insc].IdSerie }, true);
                if (objSerie) if (objSerie instanceof Array) if (objSerie.length == 1) {
                    retorno.push(angular.copy(objSerie[0]));
                }
            }
        }
        retorno = retorno.sort(function (a, b) {
            var tmp = [];
            var aVal = a.Nome, bVal = b.Nome;
            //força que os iniciados com valores numéricos fiquem ao final da relação
            /*
            if (/^\d/.test(aVal)) {
            aVal = 'Z' + aVal;
            }
            if (/^\d/.test(bVal)) {
            bVal = 'Z' + bVal;
            }
            */
            var minLen = Math.min(aVal.length, bVal.length);
            tmp.push(aVal.substr(0, minLen));
            tmp.push(bVal.substr(0, minLen));
            tmp.sort();
            if (tmp[0].substr(0, minLen) == aVal) {
                return -1; //já em ordem
            } else {
                return 1; //inverte a ordem
            }
        });
        return retorno;
    };

    this.initData = function () {
        $scope.tipoEleicao = "Candidato";
        for (var categoria in $scope.edicaoConfig.GruposCategorias[0].Categorias) {
            if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias) if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias instanceof Array) if ($scope.edicaoConfig.GruposCategorias[0].Categorias[categoria].Subcategorias.length > 0) {
                $scope.tipoEleicao = "Partido";
            }
        }
    };

    this.init = function () {
        self.initData();
        $scope.turmasFiltradas = $filter('filter')($scope.objUsuario.TurmasInscritas, { Inscricao: { Categorias: [{ Id: $scope.categoria.Id}]} }, true);
        $scope.seriesComInscricoes = self.seriesInscritas();
        self.initWatchers();
    };

    $timeout(function () {
        self.init();
    });

    /*
    $scope.getCaracteresRestantes = function (id, min, max) {
    if (jQuery(id).size() > 0) {
    if ((max - jQuery(id).val().length) < 0 && jQuery(id).val().toString().length > 0) {
    jQuery(id).removeClass('ng-invalid')
    }

    return max - jQuery(id).val().length;
    }
    return undefined;
    }
    */
} ]);