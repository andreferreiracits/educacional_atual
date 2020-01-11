"use strict";

angular.module("resultado").controller('GastronomiaCtrl', ["$http", "$scope", "$timeout", "$filter", "$location", "$state", "projetoTools", "constantes", function ($http, $scope, $timeout, $filter, $location, $state, projetoTools, constantes) {
    var self = this;
    this.resultado = undefined;
    this.loaded = false;
    
    $scope.constantes = angular.copy(constantes);

    $scope.Left = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }
    $scope.Right = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

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

    this.init = function () {
        /*
        var initApi = true;
        if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
            initApi = false;
        }
        if (initApi) {
            projetoTools.extendFunctions(self);
            projetoTools.extendFunctions($scope);
        }
        */
        $scope.usuario = angular.copy($scope.constantes.Usuario);
        $scope.edicao = angular.copy($scope.constantes.Edicao);
        self.loaded = true;
    };
    $timeout(function () {
        self.init();
    }, 500);
} ]);