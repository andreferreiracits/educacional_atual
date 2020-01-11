"use strict";

//angular.module('resultado').run(
//    ['$rootScope', '$state', '$stateParams',
//        function ($rootScope, $state, $stateParams) {            
//            $rootScope.$state = $state;
//            $rootScope.$stateParams = $stateParams;
//        }
//    ]
//);

angular.module("resultado").controller('DesafiosDeUmaConstrucao2017Ctrl', [
    "$http", "$scope", "$timeout", "$interval", "$filter", "$location", "$state", "$modal",
    function ($http, $scope, $timeout, $interval, $filter, $location, $state, $modal) {
        var self = this;

        $scope.intCategoria = 1;
        $scope.oBotaoSelecionado = { 'background-color': '#e7e7e7', 'border-bottom': '5px solid #000', 'cursor': 'default' };
        $scope.oBotaoNormal = { 'background-color': 'transparent', 'border-bottom': '0px', 'cursor': 'pointer' };

        $scope.styleCat1 = $scope.oBotaoNormal;
        $scope.styleCat2 = $scope.oBotaoNormal;
        $scope.styleCat3 = $scope.oBotaoNormal;

        self.intInterval = 3000;       

        $scope.openModalCategoria = function () {

            var objCategoria = {};

            var modalInstance = $modal.open({
                templateUrl: '/AVA/Resultados/Scripts/Diretiva/Projeto/2017/desafiosdeumaconstrucao/modal-categoria.html',
                controller: 'modalCategoriaCtrl',
                //size: 'sm',
                resolve: {
                    objCategoria: function () {
                        return objCategoria;
                    },
                    intCategoria: function () {
                        return $scope.intCategoria;
                    }
                },
                backdrop: 'static'
            });

            modalInstance.result.then(function () {
                // Ao clicar em "OK", recebe os parametros!
                //$log.info('Modal result dismissed at: ' + new Date());
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });

            modalInstance.opened.then(function (parametro) {
                // Ao clicar em "OK", recebe os parametros!
            }, function () {
                //$log.info('Modale opened dismissed at: ' + new Date());
            });
        };

        $scope.MudarCategoria = function (pIntCategoria) {
            if (pIntCategoria != $scope.intCategoria) {
                $scope.intCategoria = pIntCategoria;
                $scope.SetStyleBotao();
            }
        };

        $scope.SetStyleBotao = function () {
            if ($scope.intCategoria == 1) {
                $scope.styleCat1 = $scope.oBotaoSelecionado;
                $scope.styleCat2 = $scope.oBotaoNormal;
                $scope.styleCat3 = $scope.oBotaoNormal;
            }

            if ($scope.intCategoria == 2) {
                $scope.styleCat1 = $scope.oBotaoNormal;
                $scope.styleCat2 = $scope.oBotaoSelecionado;
                $scope.styleCat3 = $scope.oBotaoNormal;
            }

            if ($scope.intCategoria == 3) {
                $scope.styleCat3 = $scope.oBotaoSelecionado;
                $scope.styleCat2 = $scope.oBotaoNormal;
                $scope.styleCat1 = $scope.oBotaoNormal;
            }
        };

        $scope.normalizeObj = function (obj) {
            try {
                return JSON.parse(obj);
            } catch (ex) {
                return angular.copy(obj);
            }
        };

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $scope.Left = function (str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else
                return String(str).substring(0, n);
        };

        $scope.Right = function (str, n) {
            if (n <= 0)
                return "";
            else if (n > String(str).length)
                return str;
            else {
                var iLen = String(str).length;
                return String(str).substring(iLen, iLen - n);
            }
        };

        $scope.OpenCompararProjetos = function () {
            return '/AVA/Projetos/2017/desafiosdeumaconstrucao/Comparar';
            //return '/AVA/Projetos/2017/desafiosdeumaconstrucao/GaleriaNacional/B7D8';
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
        };

        $scope.SetStyleBotao();
    }
]);

angular.module("resultado").controller('modalCategoriaCtrl', [
    "$http", "$scope", "$timeout", "$interval", "$filter", "$location", "$state", "$modalInstance", "objCategoria", "intCategoria",
    function ($http, $scope, $timeout, $interval, $filter, $location, $state, $modalInstance, objCategoria, intCategoria) {
        var self = this;

        $scope.objCategoria = objCategoria;
        $scope.intCategoria = intCategoria;
        $scope.intMembroFamilia = 1;

        //console.log($scope.objCategoria);

        $scope.setMembro = function (pIntMembro) {
            if ($scope.intMembroFamilia != pIntMembro) {
                $scope.intMembroFamilia = pIntMembro;
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);