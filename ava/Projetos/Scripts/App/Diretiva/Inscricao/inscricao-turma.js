"use strict"
angular.module('Inscricao').directive('inscricaoTurma', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Inscricao/inscricao-turma.html',
        scope: {
            usuario: "=usuario",
            edicao:"=edicao",
            defaultConfig: "=defaultConfig"
        },
        controller: ['$http', '$scope', inscricaoTurma],
        controllerAs: "inscTurma"
    };

});

function inscricaoTurma($http, $scope) {
    var inscricaoTurma = this;
    $scope.Turma;
    $scope.Turmas;
    this.isCheckTurma = function () {
        if ($scope.Turma == null) {
            return false
        }
        else {
            return true
        }
    };
}