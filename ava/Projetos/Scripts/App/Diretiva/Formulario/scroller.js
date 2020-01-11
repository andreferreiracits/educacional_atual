angular.module('formulario').directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            var currentScrollPosition = 0;
            var lastScrollPosition = 0;
            var controlDynamicImgLoad = undefined;
            console.log('loading directive');

            element.bind('scroll', function () {
                /*
                //console.log('in scroll');
                //console.log(raw.scrollTop + raw.offsetHeight);
                //console.log(raw.scrollHeight);
                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
                scope.$apply(attrs.scrolly);
                }
                */
                currentScrollPosition = (raw.offsetHeight + raw.scrollTop);
                if (lastScrollPosition != currentScrollPosition) {
                    console.log("mudou a posição do scroll");
                    lastScrollPosition = (raw.offsetHeight + raw.scrollTop);
                    clearTimeout(controlDynamicImgLoad);
                    controlDynamicImgLoad = setTimeout(function () {
                        console.log("tratando o scroll");
                        clearTimeout(controlDynamicImgLoad);
                        var parentID = "[rel=lazyLoadHandler]";
                        var stopOn = 8;
                        var contador = 0;
                        angular.element(parentID + ' .lazy-load[data_back_img]').each(function () {
                            console.log(angular.element(this).get(0));
                            console.log(angular.element(this).get(0).getAttribute("data_back_img"));
                            if (isElementVisible(angular.element(this).get(0)) > 0) {
                                console.log("visible found");
                                if (angular.element(this).get(0).getAttribute("data_back_img") != "") {
                                    contador++;
                                    if ((stopOn > 0 && contador <= stopOn) || stopOn == 0) {
                                        angular.element(this).css({
                                            'background-image': 'url(' + angular.element(this).get(0).getAttribute("data_back_img").toString().replace(/\"/g,"").replace(/(\&quot\;)/g,"") + ')'
                                        });
                                    }
                                }
                            }
                            else {
                                console.log("invisible found");
                                //jQuery(this).get(0).setAttribute('src','');
                                angular.element(this).css({
                                    'background-image': 'none'
                                });
                            }
                        });
                    }, 1000);
                }
            });
        }
    };
});

//myApp.factory('myService', function() {});

//function MyCtrl($scope) {
angular.module('formulario').controller('CtrlScroll', ['$http', '$scope', '$element', '$attrs', '$compile', '$timeout', function ($http, $scope, $element, $attrs, $compile, $timeout) {
    $scope.name = 'Superhero';

    $scope.items = [];
    for (var i = 0; i < 50; i++) {
        $scope.items.push('item: ' + i);
    }

    $scope.lazyLoadBackImgs = function () {
        console.log('show more triggered');
    };

} ]);
//}
//]]>  