"use strict";

angular.module('resultado')
.run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
)
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('principal', {
            url: "/",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2017/natrilhadanossaregiao/_principal.html",
                    controller: "NaTrilhaDaNossaRegiaoPrincipal2017Ctrl",
                    controllerAs: 'jogoPrincipalCtrl'
                }
            }
        })        
        .state('jogo', {
            url: "/jogo",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2017/natrilhadanossaregiao/_jogo.html",
                    controller: "NaTrilhaDaNossaRegiaoJogo2017Ctrl"                    
                }
            }
        });

        //Se não achar nenhuma rota, redireciona para raíz "/"
        $urlRouterProvider.otherwise("/");
}]);


angular.module("resultado").controller('NaTrilhaDaNossaRegiao2017Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "$state", function ($http, $scope, $timeout, $filter, $location, $state) {
    var self = this;

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
    }
    $scope.Right = function (str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

    $scope.DataZeros = function (data) {
        var d = new Date();
        if (data) if (data instanceof Date) {
            d = data;
        }
        var ret = $scope.Right("0" + d.getDate().toString(), 2);
        ret += '/' + $scope.Right("0" + (d.getMonth() + 1).toString(), 2);
        ret += '/' + d.getFullYear().toString();
        return ret;
    }

    //$scope.categoriasEtapa1 = [];

    //this.init = function () {
    //    var path = "/AVA/Projetos/Servico/GetCategoriasEdicao/?_=" + new Date().getTime();        
    //    var parametros = {
    //        idEdicao: $scope.edicao.Id,
    //        idEtapa: $scope.edicao.Etapas[0].Id
    //    };

    //    $http({
    //        url: path,
    //        params: parametros,
    //        method: "GET"
    //    }).success(function (response) {
    //        var data = {};
    //        if (typeof (response) == "string") {
    //            data = angular.fromJson(response);
    //        }
    //        else {
    //            data = response;
    //        }
    //        if (data) if (data.listaCategoriasGeral) {
    //            $scope.categoriasEtapa1 = data.listaCategoriasGeral;
    //            if ($scope.resultado) if ($scope.resultado.DataAtualizacao) if ($scope.resultado.DataAtualizacao.indexOf("/") != -1) {
    //                $scope.resultado.DataAtualizacao = new Date(parseInt($scope.resultado.DataAtualizacao.substr(6), 10));
    //            }
    //        }
    //    });
    //};
    //this.init();

}]);