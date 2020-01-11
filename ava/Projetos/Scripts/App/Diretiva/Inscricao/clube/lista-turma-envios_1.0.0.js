"use strict"
angular.module('Inscricao.mista').directive('listaTurmaEnvios', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/clube/lista-turma-envios.html',
        scope: {
            edicao: "=edicao",
            listaInscricoesTurmas: "=listaInscricoesTurmas",
            checkTurma: "=checkTurma",
            idxEnvio: "=idxEnvio",
            objTurma: "=objTurma",
            objParceiros: "=objParceiros",
            parceirosEnvioSelected: "=parceirosEnvioSelected"

        },
        controller: ['$scope', '$http', '$log', '$filter', '$timeout', function ($scope, $http, $log, $filter, $timeout) {
            var self = this;
            $scope.turmaSelecionada = {};
            $scope.idx = 0;
            if (angular.isDefined($scope.idxEnvio)) if (!isNaN($scope.idxEnvio)) if ($scope.idxEnvio > 0) {
                $scope.idx = parseInt($scope.idxEnvio);
            }
            // Adiciona Professor Parceiro
            this.adicionarParceiro = function () {
                if (self.professorParceiro == undefined) {
                    $timeout(self.adicionarParceiro, 500);
                }
                else {
                    // inserindo mesmo cara 2 vezes
                    var result = $filter('filter')($scope.parceirosEnvioSelected, { Id: self.professorParceiro.Id });
                    if (result.length == 0) {
                        $scope.parceirosEnvioSelected.push({ "Id": "" + self.professorParceiro.Id + "", "Nome": "" + self.professorParceiro.Nome + "" });
                    }
                    $timeout(function () {
                        jQuery("#professorParceiro_value").val("");
                        jQuery("#professorParceiro_value").focus();
                        self.professorParceiro = undefined;
                    }, 100);
                }
            };

            $scope.callCheckTurma = function (p_turma) {
                console.log("click");
                $scope.checkTurma($scope.turmaSelecionada);
            };

            // Remove Professor Parceiro
            this.removerParceiro = function (index) {
                $scope.parceirosEnvioSelected.splice(index, 1);
            };

        } ],
        controllerAs: "listaTurmaEnviosCtrl"
    };
});
