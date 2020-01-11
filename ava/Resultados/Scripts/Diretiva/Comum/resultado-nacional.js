"use strict";

angular.module('resultado').directive('resultadoNacional', function ($rootScope, $timeout) {
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
                return '/AVA/Resultados/Scripts/Diretiva/Projeto/' + dados.Ano + '/' + dados.Link + '/resultado-nacional.html';
            } else {
                return '/AVA/Resultados/Scripts/Comum/resultado-nacional.html';
            }
        },
        link: function (scope, elm, attrs) {
        }
    };
});