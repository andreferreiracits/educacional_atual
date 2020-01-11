"use strict";

angular.module('resultado').directive('resultadoClube', function ($rootScope, $timeout) {
    return {
        restrict: 'E',
        scope: {
            edicao: "=edicao",
            config: "=config",
            usuario: "=usuario",
            dados: "=dados",
            resultado: "=resultado"
        },
        templateUrl: function (element, attrs) {
            if (attrs.edicao) {
                var dados = angular.fromJson(attrs.edicao);
                return '/AVA/Resultados/Scripts/Diretiva/Clube/' + dados.LinkProjeto + '/resultado-clube.html';
            } else {
                return '/AVA/Resultados/Scripts/Comum/resultado-clube.html';
            }
        },
        link: function (scope, elm, attrs) {
        }
    };
});