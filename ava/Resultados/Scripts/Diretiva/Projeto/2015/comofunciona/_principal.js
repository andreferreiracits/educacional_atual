"use strict";

angular.module("resultado").controller('ComoFuncionaPrincipal2015Ctrl', ["$stateParams", "$http", "$scope", "$timeout", "$filter", "$location", "$state", '$modal', function ($stateParams, $http, $scope, $timeout, $filter, $location, $state, $modal) {
    var self = this;
    var mgr;

    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    };
        
    this.initDefaultObjects = function (teste) {

    };

    $scope.openOverlay = function () {
        var modalInstance = $modal.open({
            templateUrl: '/AVA/Resultados/Scripts/Diretiva/Projeto/2015/comofunciona/_jogo.html',
            controller: 'overlayCtrl',
            size: 0,
            resolve: {
                edicao: function () {
                    return $scope.edicao;
                },
                defaultConfig: function () {
                    return $scope.config;
                }
            }
        });

        modalInstance.result.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!

        }, function () {
            //reverte as alterações em caso de fechamento sem ok, p.exe: clicar fora do modal
        });
        modalInstance.opened.then(function (parametro) { // Ao clicar em "OK", recebe os parametros!
        }, function () {
        });
    };


    self.initDefaultObjects();
} ]);

angular.module('formulario').controller('overlayCtrl', ['$scope', '$modalInstance', '$http', '$filter', '$timeout', 'edicao', 'defaultConfig', function ($scope, $modalInstance, $http, $filter, $timeout, edicao, defaultConfig) {
    var _self=this;
    this.lastScrollPosition = 0;
    this.controlDynamicImgLoad=undefined;

    $scope.edicao = edicao;
    $scope.defaultConfig = defaultConfig;

    $scope.safeApply = function( fn ) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.ok = function () {
        var bolClose=true;
        if(bolClose){
            $modalInstance.close();
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    
    $scope.normalizeObj = function (obj) {
        try {
            return JSON.parse(obj);
        } catch (ex) {
            return angular.copy(obj);
        }
    }

} ]);