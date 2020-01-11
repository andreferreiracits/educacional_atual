"use strict";

angular.module("resultado").controller('ResultadoViajandopelasHistorias2019Ctrl', ["$http", "$rootScope", "$scope", "$timeout", "$filter", "$location", "$state", "$modal", "projetoTools", "constantes", function ($http, $rootScope, $scope, $timeout, $filter, $location, $state, $modal, projetoTools, constantes) {
    var self = this;

    $scope.edicao = angular.copy(constantes.Edicao);
    $scope.edicaoConfig = angular.copy(constantes.EdicaoConfig);
    $scope.defaultConfig = angular.copy(constantes.defaultConfig);

    $scope.objEtapa = undefined;
    $scope.DataAtualizacao = "";
    $scope.loadingComplete = false;

    //remapeia as funções de projetoTools para essa controller e para o escopo atual
    var initApi = true;
    if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
        initApi = false;
    }
    if (initApi) {
        projetoTools.extendFunctions(self);
        projetoTools.extendFunctions($scope);
    }

    this.init = function () {

        if (!angular.isDefined($scope.usuario)) {
            $scope.usuario = angular.copy(constantes.Usuario);
        }

        if ($scope.resultado) {
            $scope.copiaResultado = angular.copy($scope.resultado);
            if ($scope.resultado.JsonConfig) if (typeof ($scope.resultado.JsonConfig) == "string") {
                //$scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
                //$scope.resultado.JsonConfig = angular.copy(self.getObject($scope.resultado.JsonConfig));
            }
            if (typeof $scope.resultado.DataAtualizacao == 'string') {
                $scope.DataAtualizacao = $scope.DataZeros(new Date(parseInt($scope.resultado.DataAtualizacao.substr(6), 10)));
            }
            else {
                $scope.DataAtualizacao = $scope.DataZeros($scope.resultado.DataAtualizacao);
            }
        }
        if ($scope.dados) if (typeof ($scope.dados) == "string") {
            //$scope.dados = angular.fromJson($scope.dados);
            $scope.dados = angular.copy(self.getObject($scope.dados));
        }
        if ($scope.edicao) if ($scope.edicao.Etapas) {
            var _objEtapa = $filter("filter")($scope.edicao.Etapas, {
                BolBreve: false,
                BolSemFormulario: false,
                BolSemGaleria: false,
                MaxEnvio: '!' + 0
            }, true);
            if (_objEtapa.length > 0) {
                $scope.objEtapa = angular.copy(_objEtapa[0]);
                if (typeof $scope.objEtapa.DataInicio == 'string')
                    $scope.objEtapa.DataInicio = new Date(parseInt($scope.objEtapa.DataInicio.substr(6), 10));
                if (typeof $scope.objEtapa.DataInicio == 'string')
                    $scope.objEtapa.DataFim = new Date(parseInt($scope.objEtapa.DataInicio.substr(6), 10));
                if (typeof $scope.objEtapa.DataResultado == 'string')
                    $scope.objEtapa.DataResultado = new Date(parseInt($scope.objEtapa.DataResultado.substr(6), 10));
            }
        }

        //console.log("res");
        //console.log($scope.resultado);
        //console.log($scope.dados);

        $scope.safeApply();
        $scope.loadingComplete = true;
    };

    this.getObject = function (content) {
        if (content) {
            if (typeof (content) == "string") {
                return angular.fromJson(content);
            }
            else {
                return angular.copy(content);
            }
        }
    };

    $scope.DataZeros = function (data) {
        var d = new Date();
        if (data) if (data instanceof Date) {
            d = data;
        }
        var ret = $scope.Right("0" + d.getDate().toString(), 2);
        ret += '/' + $scope.Right("0" + (d.getMonth() + 1).toString(), 2);
        ret += '/' + d.getFullYear().toString();
        return ret;
    }

    $timeout(function () {
        self.init();
    });
} ]);

