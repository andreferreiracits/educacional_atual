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
        //$rootScope.mainSection = "box_resultados";
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
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_principal.html",
                    controller: "EraumavezPrincipal2015Ctrl"
                }
            }
        })
        .state('princesa', {
            url: "/princesa",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_galeria.html",
                    controller: "EraUmaVezPrincesa2015Ctrl"
                }
            }
        })
        .state('joaoemaria', {
            url: "/joaoemaria",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_galeria.html",
                    controller: "EraUmaVezJoaoMaria2015Ctrl"
                }
            }
        })
        .state('brancadeneve', {
            url: "/brancadeneve",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_galeria.html",
                    controller: "EraUmaVezBrancaDeNeve2015Ctrl"
                }
            }
        })
        .state('chapeuzinho', {
            url: "/chapeuzinho",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_galeria.html",
                    controller: "EraUmaVezChapeuzinho2015Ctrl"
                }
            }
        })
        .state('cigarraeaformiga', {
            url: "/cigarraeaformiga",
            views:
            {
                "main":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/eraumavezeraoutravez/_galeria.html",
                    controller: "EraUmaVezCigarraFormiga2015Ctrl"
                }
            }
        });

    //Se não achar nenhuma rota, redireciona para raíz "/"
    $urlRouterProvider.otherwise("/");
} ]);


angular.module("resultado")
.controller('EraUmaVez2015Ctrl',
["$http", "$scope", "$timeout", "$filter", "$location", "$state", "$rootScope", function ($http, $scope, $timeout, $filter, $location, $state, $rootScope) {
    var self = this;
    
    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
        }
    }


    $scope.$on("loadClassMain", function (event, data) {
        $scope.mainSection = data;
    });

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

} ]);