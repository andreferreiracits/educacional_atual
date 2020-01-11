"use strict"

angular.module('Etapa').controller('ctrlModalResultadoEleicao', ['$scope', '$filter', '$log', '$modalInstance', '$http', '$timeout', '$interval', 'constantes', 'projetoTools', 'edicao', function ($scope, $filter, $log, $modalInstance, $http, $timeout, $interval, constantes, projetoTools, edicao) {
    var self = this;
    var initApi = true;
    $scope.bolCarregando = true;
    $scope.edicao = edicao;
    $scope.dadosCargo = [];

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    this.init = function () {
        //remapeia as funções de projetoTools para essa controller e para o escopo atual
        if (self.extendFunctions) if (typeof (self.extendFunctions) == "function") {
            initApi = false;
        }
        if (initApi) {
            angular.extendFunctions(self);
            angular.extendFunctions($scope);
        }

        if ($scope.ctrlTimerInitUrna) {
            $interval.cancel($scope.ctrlTimerInitUrna);
            $scope.ctrlTimerInitUrna = undefined;
        }
        $scope.ctrlTimerInitUrna = $interval(function () {
            $scope.bolCarregando = false;

            $scope.dadosCargo = [];

            /*
            var els = angular.element("#iframe_urna");
            var carregou = false;
            try {
                if (els.size() == 1 && els.get(0).contentDocument && els.get(0).contentDocument.getElementsByTagName('body')[0].getAttribute('bgcolor').indexOf("#") != -1) {
                    carregou = true;
                }
            }
            catch (ex) { }
            if (carregou) {
                if ($scope.ctrlTimerInitUrna) {
                    $interval.cancel($scope.ctrlTimerInitUrna);
                    $scope.ctrlTimerInitUrna = undefined;
                }
                $timeout(function () {
                    $scope.bolCarregando = false;
                }, 250);
            }
            */
        }, 1000);
    };

    $timeout(function () {
        self.init();
    });


} ]);