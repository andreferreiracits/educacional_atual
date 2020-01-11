"use strict"

function fnOpenVideoEmbed(link, width, height) {
    jQuery.fancybox.open({
        content: '<iframe width="' + width + '" height="' + height + '" src="' + link.replace(new RegExp("watch\\?v=", "i"), 'v/') + '" frameborder="0" allowfullscreen></iframe>'
    });
}

angular.module('Menu').directive('menuProjeto', function() {
    return {
        restrict: 'ACE',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Menu/menu-projeto.html',
        scope: {
            edicao: "=edicao",
            usuario: "=usuario"
        },
        link: function (scope, elm, attrs) {
        },
        controller: ['$http', '$scope', '$filter', '$location', '$timeout', function($http, $scope, $filter, $location, $timeout) {
            var that = this;
            $scope.dateNow = new Date();
            $scope.enabledMenuModal = false;
            $scope.strLinkModal = "";
            $scope.closeMenuModal = function () {
                $scope.strLinkModal = "";
                $scope.enabledMenuModal = true;
            };

            $scope.processaLink = function (link) {
                if (link.indexOf('(') != -1 && link.indexOf(')') != -1) {
                    eval(link);
                }
                else {
                    document.location.href = link;
                }
            };

            this.init = function () {
                $scope.edicao.DataInicioInscricao = new Date(parseInt($scope.edicao.DataInicioInscricao.substr(6), 10));
                $scope.edicao.DataFimInscricao = new Date(parseInt($scope.edicao.DataFimInscricao.substr(6), 10));
                $http.get('/AVA/Projetos/Servico/BuscarMenuPorId/?idMenu=' + $scope.edicao.IdMenu).success(function (data) {
                    $scope.menu = data.menu;
                    if ($scope.menu.Links[0].MenuFilho.Id) {
                        $scope.menu.Links[0].Url = $scope.menu.Links[0].Url + "/0";
                    }

                    //console.log(data.menu);
                }).error(function () {
                    console.log("Não foi possivel montar o menu para este Projeto.");
                });
            };

            this.closeOthers = function (indx) {
                for (var i = 0; i < $scope.menu.Links.length; i++) {
                    if ($scope.menu.Links[i].MenuFilho) {
                        if (i != indx) {
                        $scope.menu.Links[i].MenuFilho.showsubMenu = false;
                        } else {
                            $scope.menu.Links[i].MenuFilho.showsubMenu = !$scope.menu.Links[i].MenuFilho.showsubMenu;
                        }
                    }
                    
                }
                //console.log(indx);
            }

            this.ehPerfil = function (perfil) {
                var retorno = false;
                if (perfil != null) {
                    var perfis = perfil.split(',');
                    if ($scope.usuario.Cargos) if ($scope.usuario.Cargos instanceof Array) if ($scope.usuario.Cargos.length > 0) {
                        angular.forEach($scope.usuario.Cargos, function (cargo) {
                            var teste = $filter('filter')(perfis, cargo.Nome)
                            if (teste) if (teste instanceof Array) if (teste.length > 0) {
                                retorno = true;
                            }
                        });
                    }
                }
                return retorno;
            };

            this.mostraMenu = function (link) {
                if (link.Visualizacao !== null && link.Visualizacao !== '' && !that.ehPerfil(link.Visualizacao)) {
                    return false;
                }

                switch (link.Classe) {
                    case 'inscricao':
                        return $scope.dateNow > $scope.edicao.DataInicioInscricao && $scope.dateNow < $scope.edicao.DataFimInscricao;
                    case 'minhaequipe':
                    case 'minhasequipes':
                    case 'minhaturma':
                    case 'minhasturmas':
                    case 'meusenvios':
                        return $scope.usuario.bolPossuiEnvio;
                    default:
                        return true;
                }
            };

            setTimeout(function () {
                that.init();
            }, 100);
        } ],
        controllerAs: "menuProjeto"
    };

});

/**
* Aba menu ativa -> verifica se está presenta no PATH(URL) o link(scope.url) passado como paramêtro
* Se der match na url, adiciona classe 'ativo' no elemento que chamou a diretiva
**/
angular.module('Menu').directive('abaMenuAtiva', ['$window', function ($window) {
    return {
        restrict: 'A',
        scope: {
            url: "@url"
        },
        link: function (scope, elm, attrs) {
            if (scope.url) {
                var urlMenu = $window.location.pathname.toLowerCase();
                scope.url = scope.url.toLowerCase();
                
                // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
                var urlRegExp = new RegExp(urlMenu.replace(/\/$/, '') + "$");

                if (urlMenu.search(/\bmural\b/) > -1 && scope.url.search(/\bmural\b/) > -1) {
                    setTimeout(function () {
                        $(elm).addClass("ativo");
                    }, 300);
                } else if (urlRegExp.test(scope.url.replace(/\/$/, ''))) {
                    setTimeout(function () {
                        $(elm).addClass("ativo");
                    }, 300);
                }
            }
        }
    }
}]);