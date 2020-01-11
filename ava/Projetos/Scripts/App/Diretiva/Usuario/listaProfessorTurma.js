"use strict"
angular.module('Usuario').directive('listaProfessorTurma', function () {
    return {
        restrict: 'E',
        templateUrl: '/AVA/Projetos/Template/lista-professor-turma.html',
        controller: ['$http', '$scope', function ($http, $scope) {
            professores = this;
            this.getProfessores = function (idEdicao, idTurma) {
                $http.get('/AVA/Projetos/Servico/GetResponsaveisEdicaoTurmaLogin/?idEdicao=' + idEdicao + '&idTurma=' + idTurma + '&strLogin=').success(function (data) {
                    professores.produtc = data;
                }).error(
                    function () {
                        alert("Ruim Lista Professor Turma");
                    }
                );
            };
            this.getEmails = function () {

            };
            this.getProfessores($scope.$parent.idEdicao, $scope.$parent.Turma.Id);
        } ],
        controllerAs: 'professores'
    };
});
