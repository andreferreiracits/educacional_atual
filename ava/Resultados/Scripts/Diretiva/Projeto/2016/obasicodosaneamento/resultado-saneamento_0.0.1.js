"use strict"

angular.module('resultado').directive('resultadoSaneamento', ['$http', '$timeout', '$filter', 'projetoTools', function ($http, $timeout, $filter, projetoTools) {
    return {
        restrict: 'AEC',
        replace: true,
        transclude: false,
        scope: {
            strTeste: "@",
            objTeste: "="
        },
        templateUrl: function (element, attrs) {
            return '/AVA/Projetos/StaticResultados/Diretiva/Projeto/2016/obasicodosaneamento/resultado-saneamento.html';
        },
        link: function link(scope, element, attrs, ctrl) {
            var _self = this;
            var container = jQuery(element);

            scope.slideIndex = 1;

            scope.plusSlides = function (n) {
                scope.showSlides(scope.slideIndex += n);
            };

            scope.currentSlide = function (n) {
                scope.showSlides(scope.slideIndex = n);
            };

            scope.showSlides = function (n) {
                var i;
                var slides = document.getElementsByClassName("bloco-projeto");
                var dots = document.getElementsByClassName("numero_pergunta");
                if (n > slides.length) { scope.slideIndex = 1 }
                if (n < 1) { scope.slideIndex = slides.length }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }

                if (slides[scope.slideIndex - 1]) if (slides[scope.slideIndex - 1].style)
                    slides[scope.slideIndex - 1].style.display = "block";
                if (dots[scope.slideIndex - 1]) if (dots[scope.slideIndex - 1].className)
                    dots[scope.slideIndex - 1].className += " active";

            };
            scope.init = function () {
                scope.showSlides(scope.slideIndex);
            };

            $timeout(function () {
                scope.init();
            }, 150);

        }
    };
} ]);
