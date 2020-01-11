"use strict"
angular.module('Topo').directive('topoProjeto', function () {
    return {
        restrict: 'EA',
        templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Menu/topo-projeto.html',
        scope: {
            usuario: "=usuario",
            edicao: "=edicao",
            participante: "=participante",
            projeto: "=projeto"
        },
        controller: ['$http', '$scope', '$filter', '$location', 'ipCookie', function ($http, $scope, $filter, $location, ipCookie) {
            $scope.dateNow = new Date();
            var that = this;
            $scope.bolClickEntenda = false;
            $scope.modalEntenda = false;
            $scope.bolAbrirModal = false;

            $scope.modal = {
                Convidar: false,
                Sair: false,
                Participar: false,
                Termos: false,
                FeedbackConvite: false,
                Load: false,
                FeedbackParticipe: false
            };

            $scope.boasVindas = "Bem vindo ao Clube";
            $scope.apresentacao = "Antes de efetuar a sua inscrição, é necessário ler e aceitar os termos de uso.";
            $scope.aceitouTermos = false;
            $scope.Participando = false;
            $scope.participeEmProgresso = false;
            $scope.MenuReduzido = true;

            this.verificaCookie = function () {
                var CookieId = "visualizouEdicao";
                var CookieContent = JSON.stringify({ idEdicao: $scope.edicao.Id, idUsuario: $scope.usuario.Id });
                var listaCookies = JSON.parse(Get_Cookie(CookieId));
                if (listaCookies instanceof Array) {
                    for (var cooki = 0; cooki < listaCookies.length; cooki++) {
                        var obj = JSON.parse(listaCookies[cooki]);
                        if (parseInt(obj.idEdicao) == parseInt($scope.edicao.Id) && parseInt(obj.idUsuario) == parseInt($scope.usuario.Id)) {
                            $scope.MenuReduzido = true;
                        }
                    }
                    if (!$scope.MenuReduzido) {
                        listaCookies.push(CookieContent);
                    }
                }
                else {
                    listaCookies = new Array(CookieContent);
                }
                Set_Cookie(CookieId, JSON.stringify(listaCookies), 1 / 24, '/', '', '');
            }


            if ($scope.edicao.BolEncerrado) {
                $scope.MenuReduzido = true;
            }

            $scope.abreModal = function (modal, status) {
                // varre o Objeto Modal para encotrar e alertar
                for (var prop in $scope.modal) {
                    $scope.modal[prop] = false;
                    if (prop == modal) {
                        $scope.modal[prop] = status;
                        if (status) {
                            jQuery("html, body").animate({ scrollTop: 20 }, '500');
                        }
                    }
                    if (modal == "FeedbackParticipe" && status == false) {
                        window.location.reload();
                    }
                }
            };

            $scope.Participar = function () {
                if (!$scope.participeEmProgresso) {
                    $scope.participeEmProgresso = true;
                    // Ativo Load e desativo os convidar.
                    $scope.abreModal('Load', true);
                    // existe um serviço de entrar e sair?
                    $http.get("/AVA/Grupo/Home/ParticiparGrupo/?intPublico=1&idGrupo=" + $scope.edicao.IdGrupoMural).success(function (data) {
                        //if (data.success == true) {
                        if (data == "0") {
                            $scope.abreModal('Load', false);
                            $scope.Participando = true;
                            $scope.aceitouTermos = false;
                        } else {
                            $scope.abreModal('Load', false);
                            $scope.aceitouTermos = false;
                        }
                        $scope.participeEmProgresso = false;
                        $scope.abreModal('FeedbackParticipe', true);
                        jQuery("html, body").animate({ scrollTop: 20 }, '500');
                    }).error(function () {
                        //
                    }).then(function (data) {
                        $scope.participeEmProgresso = false;
                    });
                }
            };

            this.verificaInscricaoAberta = function () {
                var dtInicioInscricao = new Date(parseInt($scope.edicao.DataInicioInscricao.substr(6), 10));
                var dtFimInscricao = new Date(parseInt($scope.edicao.DataFimInscricao.substr(6), 10));

                if (this.verificaPerfil('educador,administrador') && ($scope.dateNow > dtInicioInscricao && $scope.dateNow < dtFimInscricao)) {
                    return true;
                } else {
                    return false;
                }
            };

            this.verificaUsuario = function () {
                return JSON.stringify($scope.usuario);
            };

            this.verificaPerfil = function (perfil) {
                var retorno = false;
                if (perfil != null) {
                    var perfis = perfil.split(',');
                    if ($scope.usuario.Cargos) if ($scope.usuario.Cargos instanceof Array) if ($scope.usuario.Cargos.length > 0) {
                        angular.forEach($scope.usuario.Cargos, function (cargo) {
                            var teste = [];
                            if (cargo) {
                                if (cargo instanceof Object) if (cargo.Nome) if (typeof (cargo.Nome) == "string") if (cargo.Nome != "") {
                                    teste = $filter('filter')(perfis, cargo.Nome);
                                }
                                if (typeof (cargo) == "string") {
                                    teste = $filter('filter')(perfis, cargo);
                                }
                                if (teste) if (teste instanceof Array) if (teste.length > 0) {
                                    retorno = true;
                                }
                            }
                        });
                    }
                }
                return retorno;
            };

            this.getStatusEntenda = function () {
                return $scope.modalEntenda;
            };

            this.alternaEntenda = function (bool) {
                $scope.modalEntenda = bool;
            };

            this.testeParticipando = function (idParticipante) {
                if (!isNaN(idParticipante)) if (parseInt(idParticipante) > 0) {
                    return true;
                }
                return false;
            };

            this.openEntendaProjeto = function (link) {
                jQuery.fancybox.open({
                    content: '<iframe width="640" height="350" src="' + link.replace(new RegExp("watch\\?v=", "i"), 'v/') + '?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>'
                });
                jQuery("html, body").animate({ scrollTop: 20 }, '500');
            };

            if (!$scope.usuario.bolInscrito && !$scope.usuario.bolParticipando) {
                this.verificaCookie();
            }
        } ],
        controllerAs: 'topoProjeto'
    };
});