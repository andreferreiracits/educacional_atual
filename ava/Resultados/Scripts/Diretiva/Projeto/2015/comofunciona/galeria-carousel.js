"use strict";

function controleGaleriaCarousel($http, $scope, $timeout, $filter, $location) {
    var _self = this;
    var _that = this;

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
        $scope.envios = angular.copy($scope.envios);
    };
}

function isAndroid() {
    return navigator.platform.toUpperCase().indexOf("ARM") > -1 || navigator.userAgent.toUpperCase().indexOf("ANDROID") > -1;
}

function isIpad() {
    return navigator.userAgent.match(/iPad/i) != null;
}

angular.module('resultado').directive('galeriaCarousel', function () {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            envios: "=",
            loadInProgress: "="
        },
        templateUrl: function (element, attrs) {
            return '/AVA/Resultados/Scripts/Diretiva/Projeto/2015/comofunciona/galeria-carousel.html';
        },
        link: function link(scope, element, attrs) {
            var _self = this;
            var container = $(element);
            var carousel = container.children('.jcarousel');
            scope.carouselInstance = carousel;
            scope.mainElementName = "rnd" + Math.round(Math.random() * 100000000);
            scope.carrosselInicializado = false;
            scope.ready = false;
            scope.firstRun = true;
            scope.instance = carousel;
            scope.carouselTravado = false;

            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            scope.quickReload = function () {
                carousel.jcarousel('reload', {
                    wrap: 'circular',
                    animation: 1,
                    transitions: false,
                    center: false
                });
            }

            scope.rebobina = function () {
                carousel.jcarousel('scroll', 0);
            }

            scope.reload = function () {
                carousel.jcarousel('reload', {
                    wrap: 'circular',
                    animation: 1000,
                    transitions: false,
                    center: false
                });
            }

            scope.deactivate = function () {
                scope.ready = false;

            }
            scope.activate = function () {
                scope.ready = true;

            }

            scope.destroy = function () {
                carousel.jcarousel('destroy');
            }

            scope.sentido = 0;
            scope.secondMove = false;

            scope.setLeft = function () {
                if (scope.sentido < 0)
                    scope.secondMove = true;
                else
                    scope.secondMove = false;
                scope.sentido = -1;

            };
            scope.setRight = function () {
                if (scope.sentido > 0)
                    scope.secondMove = true;
                else
                    scope.secondMove = false;
                scope.sentido = 1;
            };

            scope.init = function () {
                carousel.jcarousel({
                    wrap: 'circular',
                    animation: 1000,
                    transitions: false,
                    center: false
                });

                if (navigator.platform.toUpperCase().indexOf("ARM") > -1 || navigator.userAgent.toUpperCase().indexOf("ANDROID") > -1 || navigator.userAgent.match(/iPad/i) != null) {
                    angular.element('.jcarousel-control-prev').jcarouselControl({
                        event: 'touchend',
                        target: '-=3'
                    });

                    angular.element('.jcarousel-control-next').jcarouselControl({
                        event: 'touchend',
                        target: '+=3'
                    });
                }
                else {
                    angular.element('.jcarousel-control-prev').jcarouselControl({
                        target: '-=3'
                    });

                    angular.element('.jcarousel-control-next').jcarouselControl({
                        target: '+=3'
                    });
                }


                carousel.on('jcarousel:animate', function (event, carousel) {
                    if (!scope.secondMove) {
                        if (scope.sentido > 0) {
                            //right
                            jQuery('#jcarousel-content').css('transition-duration', '0s');
                            //jQuery('#jcarousel-content').css('background-position', '25px 0px');
                            jQuery('#jcarousel-content').css('background-position', '0px 0px');
                        }
                        if (scope.sentido < 0) {
                            //left
                            var lft = (1) * parseInt(jQuery('#jcarousel-content').css('left').toString().replace("px", "").replace("-", ""));
                            jQuery('#jcarousel-content').css('transition-duration', '0s');
                            jQuery('#jcarousel-content').css('background-position', lft.toString() + 'px 0px');
                        }
                    }
                    else {
                        if (scope.sentido > 0) {
                            //right
                            //right
                            var lft = (1) * parseInt(jQuery('#jcarousel-content').css('left').toString().replace("px", "").replace("-", ""));
                            jQuery('#jcarousel-content').css('transition-duration', '0s');
                            jQuery('#jcarousel-content').css('background-position', lft.toString() + 'px 0px');
                        }
                        if (scope.sentido < 0) {
                            //left
                            jQuery('#jcarousel-content').css('transition-duration', '0s');
                            //jQuery('#jcarousel-content').css('background-position', '-20px 0px');
                            jQuery('#jcarousel-content').css('background-position', '0px 0px');
                        }
                    }
                });

                carousel.on('jcarousel:animateend', function (event, carousel) {
                    //scope.carouselTravado = false;
                    if (scope.secondMove) {
                        if (scope.sentido > 0) {
                            //right
                            var lft = (1) * parseInt(jQuery('#jcarousel-content').css('left').toString().replace("px", "").replace("-", ""));
                            jQuery('#jcarousel-content').css('transition-duration', '0s');
                            jQuery('#jcarousel-content').css('background-position', lft.toString() + 'px 0px');
                        }
                        if (scope.sentido < 0) {
                            //left
                        }
                    }
                    else {
                        if (scope.sentido > 0) {
                            //right
                            var lft = (1) * parseInt(jQuery('#jcarousel-content').css('left').toString().replace("px", "").replace("-", ""));
                            jQuery('#jcarousel-content').css('transition-duration', '0s');
                            jQuery('#jcarousel-content').css('background-position', lft.toString() + 'px 0px');
                        }
                        if (scope.sentido < 0) {
                            //left
                        }
                    }
                });
            }

            scope.rebobina = function () {
                carousel.jcarousel('scroll', 0);
            }

            scope.clear = function () {
                angular.element('#jcarousel-content').html('');
            }

            scope.render = function (valor) {
                var tmplt = '';
                var bolFound = false;
                if (scope.envios) if (scope.envios instanceof Array) if (scope.envios.length >= 0) {
                    bolFound = true;
                    for (var item in scope.envios) {
                        tmplt += '<li class="envio grid_3">';
                        tmplt += '	<a href="/AVA/Projetos/2015/' + scope.envios[item].Etapa.Edicao.Link + '/Etapas/' + scope.envios[item].Etapa.Link + '/' + scope.envios[item].MensagemRapida.StrEncryptIdMensagem + '">';
                        tmplt += '		<div class="midia" style="background-image: url(' + scope.envios[item].Imagem + ');"></div><div class="sobre">';
                        tmplt += '			<h3 alt="' + scope.envios[item].Titulo + '" title="' + scope.envios[item].Titulo + '">' + scope.envios[item].Titulo + '</h3>';
                        tmplt += '		</div>'
                        tmplt += '	</a>';
                        tmplt += '</li>';
                    }
                }
                angular.element('#jcarousel-content').html(tmplt);
            }



            scope.$on("updateCarousel", function (event, objData) {
                if (objData) if (objData instanceof Array) if (objData.length >= 0) {
                    jQuery('#jcarousel-content').css('transition-duration', '0s');
                    jQuery('#jcarousel-content').css('background-position', '0px 0px');
                    scope.envios = objData;
                    scope.ready = true;
                    if (!scope.firstRun) {
                        scope.clear();
                        scope.render();
                        scope.reload();
                    }
                    else {
                        scope.render();
                        scope.init();
                        scope.firstRun = false;
                    }

                    if (objData.length < 4) {
                        angular.element('.jcarousel-control-prev,.jcarousel-control-next').hide();
                    }
                    else {
                        angular.element('.jcarousel-control-prev,.jcarousel-control-next').show();
                    }
                }
            });

            setTimeout(function () {
                scope.init();
            }, 150);
        }
    };
}).controller('controleGaleriaCarousel', ['$http', '$scope', '$element', '$attrs', '$compile', '$timeout', '$filter', controleGaleriaCarousel]);
