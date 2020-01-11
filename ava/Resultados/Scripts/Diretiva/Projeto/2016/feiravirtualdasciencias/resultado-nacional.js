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
);


angular.module("resultado")
.controller('FeiraVirtual2016Ctrl',
["$http", "$scope", "$timeout", "$interval", "$filter", "$location", "$state", function ($http, $scope, $timeout, $interval, $filter, $location, $state) {
    var self = this;

    self.intInterval = 3000;

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

    $scope.$on("$includeContentLoaded", function (event, templateName) {        
        if (templateName == '/cp/projetos/template/2016/feiravirtualdasciencias/vencedores.html') {
            //console.log('carregou o template: ' + templateName);

            self.initTemplateVencedores();
        }
    });

    self.initTemplateVencedores = function () {
        var oBoxJuriOficial = angular.element('#box_galeria-resultados-vencedores .oficial');
        var oBoxJuriPopular = angular.element('#box_galeria-resultados-vencedores .popular');

        oBoxJuriOficial.find('nav ul li').on('click', function () {
            //console.log('cliquei');
            var oBotao = angular.element(this);
            var strClass = oBotao.attr('class');
            var intColocacao = oBotao.attr('data-int-colocacao');

            if (!oBotao.hasClass('ativo')) {
                oBotao.parent().find('li').removeClass('ativo');
                oBotao.addClass('ativo');

                oBoxJuriOficial.find('div.bloco-projeto').hide();
                oBoxJuriOficial.find('div.bloco-projeto[data-int-colocacao="' + intColocacao + '"]').show();

                if (angular.isDefined(self.intervalOficial)) {
                    $interval.cancel(self.intervalOficial);
                    self.intervalOficial = undefined;                    
                }
            }

        });

        oBoxJuriPopular.find('nav ul li').on('click', function () {
            //console.log('cliquei');
            var oBotao = angular.element(this);
            var strClass = oBotao.attr('class');
            var intColocacao = oBotao.attr('data-int-colocacao');

            if (!oBotao.hasClass('ativo')) {
                oBotao.parent().find('li').removeClass('ativo');
                oBotao.addClass('ativo');

                oBoxJuriPopular.find('div.bloco-projeto').hide();
                oBoxJuriPopular.find('div.bloco-projeto[data-int-colocacao="' + intColocacao + '"]').show();

                if (angular.isDefined(self.intervalPopular)) {
                    $interval.cancel(self.intervalPopular);
                    self.intervalPopular = undefined;                    
                }
            }

        });

        self.intervalOficial = $interval(function () {
            self.mostraProximo(angular.element('#box_galeria-resultados-vencedores .oficial'));
        }, self.intInterval);

        self.intervalPopular = $interval(function () {
            self.mostraProximo(angular.element('#box_galeria-resultados-vencedores .popular'));
        }, self.intInterval);

        //oBoxJuriOficial.find('ul li').removeClass('ativo');
    };

    self.mostraProximo = function (oBoxAux) {
        if (oBoxAux) {
            try {
                var intColocacao = oBoxAux.find('nav ul li.ativo').attr('data-int-colocacao');
                var intProximo = '0';

                oBoxAux.find('nav ul li').removeClass('ativo');

                if (intColocacao == '1') { intProximo = '2'; }
                if (intColocacao == '2') { intProximo = '3'; }
                if (intColocacao == '3') { intProximo = '1'; }

                oBoxAux.find('nav ul li[data-int-colocacao="' + intProximo + '"]').addClass('ativo');
                oBoxAux.find('div.bloco-projeto').hide();
                oBoxAux.find('div.bloco-projeto[data-int-colocacao="' + intProximo + '"]').show();
            }
            catch (err) { }
        }
    };

//    this.init = function () {

//        if ($scope.dados) {
//            console.log('===$scope.dados===');
//            console.log($scope.dados);
            //            if (typeof ($scope.dados) == "string") {
            //                $scope.dados = angular.fromJson($scope.dados);
            //            }
            //            else {
            //                $scope.dados = $scope.dados;
            //            }
//        }
//        else {
//            $scope.dados = {};
//        }
//    };

    //this.init();
} ]);