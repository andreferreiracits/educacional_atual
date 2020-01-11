angular.module('Mural').directive('postUnico', function () {
    return {
        restrict: 'E',
        //templateUrl: '/AVA/Projetos/Scripts/App/Diretiva/Mural/post-unico.html',
        templateUrl: function (elem, attrs) {
            //var tpl = $state.current.name;
            return '/AVA/Projetos/Scripts/App/Diretiva/Mural/' + attrs.template + '.html';
            //return'/AVA/Projetos/Scripts/App/Diretiva/Mural/post-unico.html'
        },
        scope: {
            post: "=post",
            usuario: "=usuario",
            comentario: "=comentario",
            objEdicao: "=edicao"
        },
        controller:
        ['$http', '$scope', '$timeout', '$filter', function ($http, $scope, $timeout, $filter) {
            var postUnico = this;

            this.config = {
                maxPosts: 3,
                ocultaComentario: true,
                placeholder: "Seja o primeiro a comentar",
                bolPodeComentar: false,
                bolDonoDoPost: false,
                comentario: "",
                bolMostaPost: true,
                comentanto: false
            };

            this.bolPostandoComentario = false;

            this.leaveMouseComentario = function (index) {
                $scope.post.comentarios[index].apagando = $timeout(function () { $scope.post.comentarios[index].showCurtidores = false }, 500);
            };

            this.enterMouseComentario = function (index) {
                $timeout.cancel($scope.post.comentarios[index].apagando);
                $scope.post.comentarios[index].showCurtidores = true;
            };
            console.log("running if");


            if ($scope.post.error == 0) {
                console.log("inside IF");
                console.log($scope.usuario);

                if ($scope.comentario) {                    
                    postUnico.config.bolMostaPost = false;
                }

                if ($scope.post.timeline.totalComentarios > 0) {
                    this.config.placeholder = "Escreva um comentário...";
                }

                if ($scope.usuario.bolParticipando) {
                    this.config.bolPodeComentar = true;
                }

                if ($scope.usuario.Id === $scope.post.timeline.IdUsuario) {
                    this.config.bolDonoDoPost = true;
                }

                if ($scope.usuario.idTipoParticipante == 1 || $scope.usuario.idTipoParticipante == 2) {
                    this.config.bolTutor = true;
                }
                                
            }

            this.confirmaExcluirComentario = function (index) {
                $scope.post.comentarios[index].showConfirmaExcluir = !$scope.post.comentarios[index].showConfirmaExcluir;
                postUnico.config.comentanto = true;
            };

            this.confirmaExcluirPost = function () {
                $scope.post.timeline.showConfirmaExcluir = !$scope.post.timeline.showConfirmaExcluir;
            };

            this.excluirPost = function () {
                var parm = { idMensagemRapida: $scope.post.timeline.IdMensagemrapida };

                $http.post('/AVA/Projetos/Clube/Home/ExcluirMensagem', parm).success(function (data, status, headers, config) {
                    if (data.error == 0) {
                        // seta post para excluido
                        $scope.post.timeline.BolExcluido = true;
                    }
                    else {
                        alert("Erro ao excluir o Comentário");
                    }
                }).error(function (data, status, headers, config) {
                    alert("Erro ao excluir o Comentário");
                });

            };

            this.excluirComentario = function (index) {
                if (index >= 0) {
                    var parm = {
                        idComentario: $scope.post.comentarios[index].IdComentario
                    }
                    $http.post('/AVA/Projetos/Clube/Home/ExcluirComentario', parm).success(function (data, status, headers, config) {
                        if (data.error == 0) {
                            // Remove o Comentario do Array.
                            $scope.post.comentarios.splice(index, 1);
                        }
                        else {
                            alert("Erro ao excluir o Comentário");
                        }
                    }).error(function (data, status, headers, config) {
                        alert("Erro ao excluir o Comentário");
                    });
                }
            };

            // o descurtir
            this.CurtirDescurtir = function (index) {
                //Comentarios
                if (index >= 0) {
                    var parm = {
                        idComentario: $scope.post.comentarios[index].IdComentario,
                        bolProjeto: 1
                    };
                    // Verifica qual metodo Usuar Curtir ou descurtir.
                    if ($scope.post.comentarios[index].bolCurtiu) {
                        metodo = "DescurtirComentario"; parm.valor = -1;
                    }
                    else {
                        metodo = "CurtirComentario"; parm.valor = +1;
                    }
                    $http.post('/AVA/Projetos/Clube/Home/' + metodo, parm).success(function (data, status, headers, config) {
                        $scope.post.comentarios[index].intCurtidas = $scope.post.comentarios[index].intCurtidas + config.data.valor;
                        $scope.post.comentarios[index].bolCurtiu = !$scope.post.comentarios[index].bolCurtiu;
                    }).error(function (data, status, headers, config) {
                        alert("Erro ao Curtir");
                    });
                }
            };

            this.goToComentar = function () {
                angular.element('#comentar').trigger('focus');
            };

            this.comentar = function (event) {
                if (event.keyCode == 13 && postUnico.config.comentario.length > 0) {

                    var parm = {
                        idMensagemRapida: $scope.post.timeline.IdMensagemrapida,
                        comentario: postUnico.config.comentario,
                        bolProjeto: 1
                    };

                    postUnico.bolPostandoComentario = true;

                    $http.post('/AVA/Projetos/Clube/Home/Comentar', parm)
                    .success(function (data, status, headers, config) {
                        $scope.post.comentarios = data.comentarios;
                        postUnico.config.comentario = "";
                        postUnico.ativaFancy();

                        postUnico.bolPostandoComentario = false;
                    })
                    .error(function (data, status, headers, config) {
                        alert("Erro ao enviar o Comentario");
                        postUnico.bolPostandoComentario = false;
                    });

                }
            };

            this.getCurtidasComentario = function (idComentario, index) {
                var parm = {
                    id: idComentario,
                    tipo: 2 // buscar Curtidas no comentario.
                };

                $http.post("/AVA/Projetos/Clube/Home/listaCurtidas/", parm).success(function (data, status, headers, config) {
                    $scope.post.comentarios[index].curtidores = data.usuarios;
                }).error(function (data, status, headers, config) {

                });
            };

            this.excluir = function (index) {
                if (index >= 0) {
                    $scope.post.comentarios[index];
                }
                else {
                    //TimeLine
                    $scope.post.timeline;
                }
            };

            this.ocultaComentario = function (index, total) {
                if (postUnico.config.ocultaComentario) {
                    if (index < total - postUnico.config.maxPosts) {
                        return true
                    }
                    return false;
                }
                else {
                    return false;
                }
            };

            this.ativaFancy = function () {
                $("body").on("click", ".vertodoscurtiramcomentario", function (e) {
                    e.preventDefault();
                    var _this = $(this);
                    var id = $(this).attr("idmensagem");
                    var o = {
                        href: _this.attr("href"),
                        autoSize: false,
                        width: 720,
                        autoResize: false,
                        fitToView: false,
                        height: 'auto',
                        padding: 15,
                        type: "ajax",

                        afterShow: function () {
                            var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=6&idPublico=&strLogin=&idTurma=&idComentario=" + id;
                            retornaJson($urlSeguidosCompleto);
                        },
                        helpers: {
                            overlay: {
                                locked: false
                            }
                        }
                    };
                    $.fancybox(o);
                });
            };

            this.maisCurtidas = function (totalCurtidas, totalFotos, bolCurtiu) {
                var total = totalCurtidas;
                if (bolCurtiu) {
                    total = total - 1;
                }
                if (totalFotos > 0) {
                    total = total - totalFotos;
                }
                return total;
            };

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

            setTimeout(function () { postUnico.ativaFancy(); }, 1000);
        } ],
        controllerAs: "postUnico"
    };
});
