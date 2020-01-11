"use strict"
angular.module('Inscricao.mista').directive('listaTurma', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/clube/lista-turma.html',
        scope: {
            edicao: "=edicao",
            listaTurmas: "=listaTurmas",
            objTurma: "=objTurma",
            objEtapa: "=objEtapa",
            checkTurma: "=checkTurma",
            objParceiros: "=objParceiros",
            parceirosEnvioSelected: "=parceirosEnvioSelected",
            bloqueiaAllTurma: "=bloqueiaAllTurma",
            acesso: "=acesso"
        },
        controller: ['$scope', '$http', '$log', '$filter', '$timeout', function ($scope, $http, $log, $filter, $timeout) {
            var self = this;

            $scope.auxListaTurmas = $scope.listaTurmas;

            $scope.maxEnvioTurma = 0;
            if ($scope.objEtapa) if ($scope.objEtapa.Edicao) if ($scope.objEtapa.Edicao.InscricoesTipos) {
                var objTipoInscricaoEtapa = $filter('filter')($scope.objEtapa.Edicao.InscricoesTipos, { Id: 1 }, true);
                if (objTipoInscricaoEtapa.length == 1) {
                    if (objTipoInscricaoEtapa[0].MaxEnvio > 0 || $scope.objEtapa.MaxEnvio > 0) {
                        $scope.maxEnvioTurma = Math.max(objTipoInscricaoEtapa[0].MaxEnvio, $scope.objEtapa.MaxEnvio);
                    }
                }
            }

            $scope.selectEquipeInscricao = function (obj) {
                $scope.objEquipe = obj;
            };

            $scope.$on("resetRadioEquipe", function (event) {
                angular.element("input[name=radio_equipe]").prop("checked", false);
            });

            $scope.$on("updateTotalEnviosTurma", function (event, objUpdatedTurma) {
                if (angular.isNumber(objUpdatedTurma.TotalEnvios)) {
                    for (var curTurma in $scope.listaTurmas) {
                        if ($scope.listaTurmas[curTurma].Id == objUpdatedTurma.Id) {
                            $scope.listaTurmas[curTurma].TotalEnvios = objUpdatedTurma.TotalEnvios;
                        }
                    }
                    for (var curTurma in $scope.auxListaTurmas) {
                        if ($scope.auxListaTurmas[curTurma].Id == objUpdatedTurma.Id) {
                            $scope.auxListaTurmas[curTurma].TotalEnvios = objUpdatedTurma.TotalEnvios;
                        }
                    }
                }
            });

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

            // Remove Professor Parceiro
            this.removerParceiro = function (index) {
                $scope.parceirosEnvioSelected.splice(index, 1);
            };

        } ],
        controllerAs: "listaTurmaCtrl"
    };
});
