"use strict"
angular.module('Turma').directive('listaTurmaInscricao', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Turma/lista-turma-inscricao.html',
        scope : {idUsuario: "=idUsuario", idEdicao : "=idEdicao", Turma : "=turma", Turmas : "=turmas"},
        controller: ['$http', '$scope', listaTurmaInscricao],
        controllerAs: 'lstTurma'
    };
});

function listaTurmaInscricao($http, $scope) {
    var listaTurmaInscricao = this;
    this.buscaTurmas = function () {
        $http.get('/AVA/ProjetoApi/v1/Turma/GetListaTurma/' + $scope.idUsuario + '/' + $scope.idEdicao).success(function (data) {
            $scope.Turmas = data.Turmas;
        }).error(errorPadrao);
    };

    this.checkTurma = function (turma) {
        $scope.Turma = turma;
    };

    this.estaPublicado = function (idSituacao) {
        if (idSituacao == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    this.estaInscrito = function (inscricao) {
        if (inscricao != null) if (inscricao.Id) if (!isNaN(inscricao.Id)) if (parseInt(inscricao.Id)>0) {
            return true;
        }
        return false;
    }
    this.buscaTurmas();
} 