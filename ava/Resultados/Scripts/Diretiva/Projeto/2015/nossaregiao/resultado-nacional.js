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
        .state('comoestaotempo', {
            url: "/",
            views:
            {
                "mapa":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_comoestaotempo.html",
                    controller: "ComoEsta2015Ctrl"
                }
            }
        })
        .state('Brincadeiras', { // Etapa 2 - Brincadeiras
            url: "/brincadeiras",
            views:
            {
                "mapa":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_brincadeiras.html",
                    controller: "Brincadeira2015Ctrl"
                }
            }
        })
        .state('Curiosidades', { // Etapa 2 - Curiosidades
            url: "/curiosidades",
            views:
            {
                "mapa":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_curiosidades.html",
                    controller: "Curiosidade2015Ctrl"
                }
            }
        })
        .state('Entrevistas', { // Etapa 2 - Entrevistas
            url: "/entrevistas",
            views:
            {
                "mapa":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_entrevistas.html",
                    controller: "Entrevista2015Ctrl"
                }
            }
        })
        .state('Nosso sotaque', { //Etapa 3 - Nosso sotaque
            url: "/nossosotaque",
            views:
            {
                "mapa":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_nossosotaque.html",
                    controller: "NossoSotaque2015Ctrl"
                }
            }
        })
        .state('Relógios de Sol', { //Etapa Opcional - Relógios de Sol
            url: "/relogiodesol",
            views:
            {
                "mapa":
                {
                    templateUrl: "/AVA/Resultados/Scripts/Diretiva/Projeto/2015/nossaregiao/_relogiodesol.html",
                    controller: "Relogio2015Ctrl"
                }
            }
        });

    //Se não achar nenhuma rota, redireciona para raíz "/"
    $urlRouterProvider.otherwise("/");
} ]);


angular.module("resultado")
.controller('NossaRegiao2015Ctrl',
["$http", "$scope", "$timeout", "$filter", "projetoMapa", "$location", function ($http, $scope, $timeout, $filter, projetoMapa, $location) {
    var self = this;
    $scope.allEtapas = [];

    if ($scope.resultado) {
        if ($scope.resultado.JsonConfig) {
            if (typeof ($scope.resultado.JsonConfig) == "string") {
                $scope.resultado.JsonConfig = angular.fromJson($scope.resultado.JsonConfig);
            }
        }
    }

    $scope.objMensagemRapida = {};
    
    if ($scope.resultado) {
        if ($scope.resultado.MensagemRapida) {
            $scope.objMensagemRapida = $scope.resultado.MensagemRapida;
        }
    }

    $scope.$on("broadGaleria", function (event, objCityToAdd, objFilter) {
        $scope.$broadcast("changeListMap", objCityToAdd, objFilter);
    });

    $scope.$on("broadGaleriaCluster", function (event, objFilter) {
        $scope.$broadcast("changeListMapOpcao", objFilter);
    });

    $scope.$on("removeAudio", function (event, slug) {
        if ($(".audio_" + slug).length > 0) {
            $(".audio_" + slug).remove();
        }
    });


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


    this.init = function () {
        $http({
            url: '/AVA/Resultados/Servico/GetResultadoEdicaoEtapa',
            params: {
                idEdicao: $scope.edicao.Id,
                idEtapa: 0
            },
            method: "GET"
        }).success(function (response) {
            var data = {};
            if (typeof (response) == "string") {
                data = angular.fromJson(response);
            }
            else {
                data = response;
            }

            if (data) if (data.dados) {
                if (typeof (data.dados) == "string") {
                    $scope.allEtapas = angular.fromJson(data.dados);
                }
                else {
                    $scope.allEtapas = data.dados;
                }
            }

        });
    };

    this.init();
} ]);



angular.module('resultado')
.directive('ngTocaAudio', [function () {
    return {
        restrict: 'EA',
        scope: {
            idelm: "@",
            audio: "@",
            slug: "@"
        },
        templateUrl: "",
        link: function (scope, elm, attrs) {

            var id = scope.idelm;
            var valor = scope.audio;
            var _slug = "";

            if (scope.slug) {
                _slug = scope.slug;
            }

            var bolClassic = false;
            var ObjetoAlvo = { Valor: scope.audio };

            $(elm).bind("click", function () {
                if (ObjetoAlvo.Valor.toLowerCase().indexOf(".wma") != -1) {
                    bolClassic = true;
                    jQuery('body > .audioPlayer').remove();
                    jQuery('body > .audioPlayerClassic').remove();
                    if ($(elm).hasClass("play")) {
                        if ($("#classic_audio" + id).size() == 0) {
                            $('body').append("<embed id='classic_audio" + id + "' name='classic_audio" + id + "' class='audioPlayerClassic' style='display:block;' src='" + ObjetoAlvo.Valor + "' type='video/x-ms-asf-plugin' pluginspage='http://www.microsoft.com/netshow/download/player.htm' autostart=true transparentatstart=true width='0' height='0'  ShowStatusBar=false animationatstart=true  showcontrols=0 showpositioncontrols=0></embed>");
                        }
                        $(".audioPlayerCall").removeClass("stop").addClass("play");
                        $(elm)
                            .removeClass("play")
                            .addClass("stop");
                    }
                    else {
                        if (navigator.userAgent.indexOf("MSIE")) {
                            var intervalo = setTimeout(function () {
                                $(".audioPlayerCall").removeClass("stop").addClass("play");
                            }, 500);
                        }
                        else {
                            $(".audioPlayerCall").removeClass("stop").addClass("play");
                        }
                    }
                }
                else {
                    $('body > .audioPlayerClassic').remove();
                    if ($("#audio" + id).size() == 0) {
                        var type = "";
                        switch (ObjetoAlvo.Valor.toLowerCase().substr(ObjetoAlvo.Valor.lastIndexOf('.') + 1)) {
                            case 'mp3':
                                type = 'audio/mpeg';
                                break;
                            default:
                                type = '';
                                break;
                        }
                        jQuery('body').append("<audio id='audio" + id + "' class='audioPlayer audio_" + _slug + "' style='display:none' controls><source src='" + ObjetoAlvo.Valor + "' " + type + "></audio>");
                    }
                    var volume = 0.7;
                    try {
                        jQuery("#audio" + id)[0].currentTime = 0;
                    } catch (e) { }
                    jQuery(".audioPlayerCall").removeClass("stop").addClass("play");
                    if (jQuery("#audio" + id)[0].paused == false) {
                        jQuery(".audioPlayer").each(function () {
                            var idaux = jQuery(this).get(0).id.replace("audio", "");
                            jQuery(this).get(0).pause();
                        });
                    }
                    else {
                        jQuery(".audioPlayer").each(function () {
                            var idaux = jQuery(this).get(0).id.replace("audio", "");
                            jQuery(this).get(0).pause();

                        });
                        jQuery("#audio" + id)[0].play();
                        angular.element(elm).removeClass("play").addClass("stop");
                    }
                }
                var rndTemp = "rnd" + Math.round(Math.random() * 100000000);
            });

        }
    }
} ]);