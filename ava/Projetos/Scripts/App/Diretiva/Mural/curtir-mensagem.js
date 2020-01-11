"use strict"
angular.module('Mural').directive('curtirMensagem', function ($http) {
    return {
        restrict: 'A',
        scope: {
            idMensagemRapida: "@idMensagemRapida",
            objListaCurtida: "=objListaCurtida"
        },
        link: function (scope, element, attrs) {

            $(element).on("click", function (e) {
                //e.preventDefault();

                var idMensagemRapida = scope.idMensagemRapida;
                var bolCurtir = true;

                if ($(element).hasClass('ativo')) {
                    //descurtir mensagem
                    $.ajax({
                        url: "/AVA/Projetos/Clube/Home/removerCurtirMensagem",
                        data: { 'idMensagemRapida': idMensagemRapida },
                        cache: false,
                        success: function (data) {
                            scope.buscaCurticoes(idMensagemRapida, 1);
                        },
                        error: function () {
                            console.log("Erro ao descurtir mensagem.")
                        }
                    });
                    bolCurtir = false;
                } else {
                    //curtir mensagem
                    $.ajax({
                        url: "/AVA/Projetos/Clube/Home/CurtirMensagem",
                        data: { 'idMensagemRapida': idMensagemRapida },
                        cache: false,
                        success: function (data) {
                            scope.buscaCurticoes(idMensagemRapida, 1);
                        },
                        error: function () {
                            console.log("Erro ao curtir mensagem.")
                        }
                    });
                }

                $(element).toggleClass('ativo');
                try {
                    if (idMensagemRapida > 0) {
                        if ($(".boxCurticoesMensagem_" + idMensagemRapida).length > 1) {
                            if (bolCurtir) {
                                $(".boxCurticoesMensagem_" + idMensagemRapida)
                                    .parent()
                                    .find("a")
                                    .addClass("ativo")
                            } else {
                                $(".boxCurticoesMensagem_" + idMensagemRapida)
                                    .parent()
                                    .find("a")
                                    .removeClass("ativo")
                            }
                        }
                    }
                } catch (err) { };

            });


            //-> Busca curtições da mensagem
            scope.buscaCurticoes = function (_id, _tipo) {
                //_id: idMensagemRapida OU idComentario

                if (_id != null && _id != '' && _id > 0) {
                    //_tipo: 1 OU 2 -> 1 é mensagem, 2 é comentário
                    angular.element(".boxCurticoesMensagem_" + _id).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                    $.ajax({
                        url: "/AVA/Projetos/Clube/Home/listaCurtidas",
                        data: { 'id': _id, 'tipo': _tipo },
                        cache: false,
                        success: function (data) {

                            if (parseInt(data.error) == 0) {

                                if (data.usuarios != null) {

                                    var classTooltip = "";
                                    var qtdCurtidasExibir = 2;
                                    var objetoCurtidores = {
                                        curtidor: new Array()
                                    };

                                    //Varre todos as curtidas
                                    for (var ii = 0; ii < data.usuarios.length; ii++) {

                                        var qtdCurtidas = data.usuarios.length;
                                        var bolCurtiu = false;
                                        var idCurtidor = 0;
                                        var idPrimeiroCurtidor = 0;
                                        var idSegundoCurtidor = 0;
                                        var htmlTemp = "";

                                        if (qtdCurtidas > 2) {
                                            classTooltip = "b_tooltip_left";
                                        }

                                        //Verifica se o usuario logado curtiu a mensagem
                                        for (var ff = 0; ff < data.usuarios.length; ff++) {
                                            if (data.usuarios[ff].id == data.usuario.id) {
                                                bolCurtiu = true;
                                                idCurtidor = data.usuarios[ff].id;
                                                qtdCurtidasExibir = 1;
                                            }
                                        }

                                        if (qtdCurtidasExibir > qtdCurtidas) {
                                            qtdCurtidasExibir = qtdCurtidas;
                                        }

                                        //Se for pra listar curtidas de uma mensagem
                                        if (_tipo == 1) {

                                            htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"feedCurtirIcone blokletters vertodoscurtirammensagem " + classTooltip + "\" idmensagem=\"" + _id + "\">";

                                            //Se eu curti me poe em 1º lugar
                                            if (bolCurtiu) {
                                                htmlTemp = htmlTemp + "<img title=\"você\" src=\"" + data.usuario.strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                                idPrimeiroCurtidor = data.usuario.id;
                                            }

                                            // Se mais alguem curtiu, insere junto comigo.
                                            if (!bolCurtiu || (bolCurtiu && qtdCurtidas > 1)) {
                                                for (var kk = 0; kk < qtdCurtidasExibir; kk++) {
                                                    if (qtdCurtidas >= 1) {


                                                        if (kk == 0 && (parseInt(data.usuarios[kk].id) == parseInt(data.usuario.id))) {
                                                            kk++;
                                                        }

                                                        if (parseInt(data.usuarios[kk].id) != parseInt(data.usuario.id)) {
                                                            htmlTemp = htmlTemp + "<img src=\"" + data.usuarios[kk].strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                                        }


                                                        //Salva os ids dos dois usuários que estão sendo exibidos para não mostrar dentro da tooltip
                                                        if (idPrimeiroCurtidor == 0) {
                                                            idPrimeiroCurtidor = data.usuarios[kk].id;
                                                        } else if (idSegundoCurtidor == 0 && idPrimeiroCurtidor != 0) {
                                                            idSegundoCurtidor = data.usuarios[kk].id;
                                                        }
                                                    }
                                                }
                                            }

                                            // Exibe o +X 
                                            if (parseInt(qtdCurtidas - 2) > 0) {
                                                htmlTemp = htmlTemp + "+ " + parseInt(qtdCurtidas - 2);
                                            }
                                            //fecha <a> da perseguição
                                            htmlTemp = htmlTemp + "</a> ";

                                            //Exibe a tooltip com todos os curtidores
                                            htmlTemp = htmlTemp + "<div class=\"black_tip_left tooltip\" id=\"tooltipCurtir_" + _id + "\" style=\"display: none\"> ";
                                        } else {
                                            idCurtidor = data.usuario.id;
                                        }

                                        for (var dd = 0; dd < qtdCurtidas; dd++) {

                                            // só mostra 10 curtidores dentro da tooltip
                                            if (dd <= 10) {

                                                //Só adiciona na tooltip os curtidores que não estejam sendo exibidos.

                                                if (data.usuarios[dd].id != idCurtidor && data.usuarios[dd].id != idPrimeiroCurtidor && data.usuarios[dd].id != idSegundoCurtidor) {
                                                    htmlTemp = htmlTemp + "<a href=\"/AVA/Perfil/Home/Index/" + data.usuarios[dd].strLogin + "\">" + data.usuarios[dd].strApelido + "</a> ";
                                                }
                                            } else {
                                                break;
                                            }
                                        }

                                        //Só exibe o "ver todos" dentro da tooltip se existirem mais de 10 curtições
                                        if (qtdCurtidas > 10 && _tipo == 1) {

                                            htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"vertodoscurtirammensagem ver_todos_tool\" id=\"" + _id + "\" idmensagem=\"" + _id + "\">Ver todos</a> ";

                                        } else if (qtdCurtidas > 10 && _tipo == 2) {

                                            htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6\" class=\"vertodoscurtiramcomentario ver_todos_tool\" id=\"" + _id + "\">Ver todos</a> ";
                                        }

                                        //Só fecha a div da tooltip se for curtidas da mensagem, curtidas do comentário não tem essa div.

                                        if (_tipo == 1) {
                                            htmlTemp = htmlTemp + "</div> ";
                                            $(".boxCurticoesMensagem_" + _id).html(htmlTemp);
                                        } else if (_tipo == 2) {
                                            $("#boxCurtidasComentarios_" + _id).html(htmlTemp);
                                        }

                                        $(".tooltipGostaram").each(function () {
                                            $(this).tooltip({
                                                offset: [0, 0],
                                                opacity: 1,
                                                position: 'top center',
                                                effect: 'slide',
                                                relative: true,
                                                events: {
                                                    def: 'mouseover, mouseout'
                                                }
                                            });
                                        });

                                    }
                                } //tem curtidas
                                else { // Não tem curtidas então esconde o loader
                                    $(".boxCurticoesMensagem_" + _id).html("");
                                }


                                $(".b_tooltip_left").each(function () {
                                    $(this).tooltip({
                                        offset: [0, 0],
                                        opacity: 1,
                                        position: 'top center',
                                        effect: 'slide',
                                        relative: true,
                                        events: {
                                            def: 'mouseover, mouseout'
                                        }
                                    });
                                });
                            } else {
                                console.log("Erro ao listar curticoes da mensagem.")
                                $(".boxCurticoesMensagem_" + _id).html("");
                            }

                        },
                        error: function () {
                            console.log("Erro ao listar curticoes da mensagem.")
                            $(".boxCurticoesMensagem_" + _id).html("");
                        }
                    });
                }
            };

            scope.montaListaCurticaoByObjeto = function (_id, _tipo, data) {

                $(".boxCurticoesMensagem_" + _id).html("<img src='/AVA/StaticContent/Common/img/perfil/carregando.gif' border='0' />");

                if (parseInt(data.error) == 0) {
                    if (data.usuarios != null) {

                        var classTooltip = "";
                        var qtdCurtidasExibir = 2;
                        var objetoCurtidores = {
                            curtidor: new Array()
                        };

                        //Varre todos as curtidas
                        for (var ii = 0; ii < data.usuarios.length; ii++) {

                            var qtdCurtidas = data.usuarios.length;
                            var bolCurtiu = false;
                            var idCurtidor = 0;
                            var idPrimeiroCurtidor = 0;
                            var idSegundoCurtidor = 0;
                            var htmlTemp = "";

                            if (qtdCurtidas > 2) {
                                classTooltip = "b_tooltip_left";
                            }

                            //Verifica se o usuario logado curtiu a mensagem
                            for (var ff = 0; ff < data.usuarios.length; ff++) {
                                if (data.usuarios[ff].id == data.usuario.id) {
                                    bolCurtiu = true;
                                    idCurtidor = data.usuarios[ff].id;
                                    qtdCurtidasExibir = 1;
                                }
                            }

                            if (qtdCurtidasExibir > qtdCurtidas) {
                                qtdCurtidasExibir = qtdCurtidas;
                            }

                            //Se for pra listar curtidas de uma mensagem
                            if (_tipo == 1) {

                                htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"feedCurtirIcone blokletters vertodoscurtirammensagem " + classTooltip + "\" idmensagem=\"" + _id + "\">";

                                //Se eu curti me poe em 1º lugar
                                if (bolCurtiu) {
                                    htmlTemp = htmlTemp + "<img title=\"você\" src=\"" + data.usuario.strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                    idPrimeiroCurtidor = data.usuario.id;
                                }

                                // Se mais alguem curtiu, insere junto comigo.
                                if (!bolCurtiu || (bolCurtiu && qtdCurtidas > 1)) {
                                    for (var kk = 0; kk < qtdCurtidasExibir; kk++) {
                                        if (qtdCurtidas >= 1) {


                                            if (kk == 0 && (parseInt(data.usuarios[kk].id) == parseInt(data.usuario.id))) {
                                                kk++;
                                            }

                                            if (parseInt(data.usuarios[kk].id) != parseInt(data.usuario.id)) {
                                                htmlTemp = htmlTemp + "<img src=\"" + data.usuarios[kk].strMiniFoto + "\" height=\"25\" width=\"25\"> ";
                                            }

                                            //Salva os ids dos dois usuários que estão sendo exibidos para não mostrar dentro da tooltip
                                            if (idPrimeiroCurtidor == 0) {
                                                idPrimeiroCurtidor = data.usuarios[kk].id;
                                            } else if (idSegundoCurtidor == 0 && idPrimeiroCurtidor != 0) {
                                                idSegundoCurtidor = data.usuarios[kk].id;
                                            }
                                        }
                                    }
                                }

                                // Exibe o +X 
                                if (parseInt(qtdCurtidas - 2) > 0) {
                                    htmlTemp = htmlTemp + "+ " + parseInt(qtdCurtidas - 2);
                                }
                                //fecha <a> da perseguição
                                htmlTemp = htmlTemp + "</a> ";

                                //Exibe a tooltip com todos os curtidores
                                htmlTemp = htmlTemp + "<div class=\"black_tip_left tooltip\" id=\"tooltipCurtir_" + _id + "\" style=\"display: none\"> ";
                            } else {
                                idCurtidor = data.usuario.id;
                            }

                            for (var dd = 0; dd < qtdCurtidas; dd++) {

                                // só mostra 10 curtidores dentro da tooltip
                                if (dd <= 10) {

                                    //Só adiciona na tooltip os curtidores que não estejam sendo exibidos.

                                    if (data.usuarios[dd].id != idCurtidor && data.usuarios[dd].id != idPrimeiroCurtidor && data.usuarios[dd].id != idSegundoCurtidor) {
                                        htmlTemp = htmlTemp + "<a href=\"/AVA/Perfil/Home/Index/" + data.usuarios[dd].strLogin + "\">" + data.usuarios[dd].strApelido + "</a> ";
                                    }
                                } else {
                                    break;
                                }
                            }

                            //Só exibe o "ver todos" dentro da tooltip se existirem mais de 10 curtições
                            if (qtdCurtidas > 10 && _tipo == 1) {

                                htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=5\" class=\"vertodoscurtirammensagem ver_todos_tool\" id=\"" + _id + "\" idmensagem=\"" + _id + "\">Ver todos</a> ";

                            } else if (qtdCurtidas > 10 && _tipo == 2) {

                                htmlTemp = htmlTemp + "<a href=\"/AVA/Barras/Home/RetornaViewPerseguicaoCompleta/?deonde=6\" class=\"vertodoscurtiramcomentario ver_todos_tool\" id=\"" + _id + "\">Ver todos</a> ";
                            }

                            //Só fecha a div da tooltip se for curtidas da mensagem, curtidas do comentário não tem essa div.

                            if (_tipo == 1) {
                                htmlTemp = htmlTemp + "</div> ";
                                $(".boxCurticoesMensagem_" + _id).html(htmlTemp);
                            } else if (_tipo == 2) {
                                $("#boxCurtidasComentarios_" + _id).html(htmlTemp);
                            }

                            $(".tooltipGostaram").each(function () {
                                $(this).tooltip({
                                    offset: [0, 0],
                                    opacity: 1,
                                    position: 'top center',
                                    effect: 'slide',
                                    relative: true,
                                    events: {
                                        def: 'mouseover, mouseout'
                                    }
                                });
                            });

                        }
                    } //tem curtidas
                    else { // Não tem curtidas então esconde o loader
                        $(".boxCurticoesMensagem_" + _id).html("");
                    }


                    $(".b_tooltip_left").each(function () {
                        $(this).tooltip({
                            offset: [0, 0],
                            opacity: 1,
                            position: 'top center',
                            effect: 'slide',
                            relative: true,
                            events: {
                                def: 'mouseover, mouseout'
                            }
                        });
                    });
                } else {
                    console.log("Erro ao listar curticoes da mensagem.")
                    $(".boxCurticoesMensagem_" + _id).html("");
                }
            }; //fim monta

            setTimeout(function () {

                if (scope.objListaCurtida && scope.objListaCurtida !== undefined && scope.objListaCurtida != null) {
                    scope.montaListaCurticaoByObjeto(scope.idMensagemRapida, 1, scope.objListaCurtida);
                } else {
                    scope.buscaCurticoes(scope.idMensagemRapida, 1);
                }
            }, 100);

        }

    };
});

$(document).ready(function(){
    $("body").on("click", ".vertodoscurtirammensagem", function (e) {
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
                var $urlSeguidosCompleto = "/AVA/Barras/Home/PerseguicaoCompleta/?tipo=5&idPublico=&strLogin=&idTurma=&idMensagemRapida=" + id;
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
});





function retornaJson(caminho) {
    //se for turmas - Para admin e Coordenadores


    $.getJSON(caminho, null, function (data) {

        var xml = null;
        var xml = data.Result;
        var xmlGlobal = xml;
        $("#myContentTemplate").tmpl(data).appendTo("#ava_contentlista");
        $("#ava_contentlista #ava_loader").css("display", "none");

        $("#txtFiltroAva").live('keyup', function (e) {

            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                e.preventDefault();
                return false;
            }
            if ($(this).attr('idusuario')) {
                _id = $(this).attr('idusuario')
            } else {
                _id = 0
            }
            FiltrarUsuario('#ava_contentlista', xml, $(this).val(), _id);
        });

        $("#txtFiltroAva").live('focus', function () {
            if ($(this).val() == "Filtrar por nome") {
                $(this).val("");
            }
        })

        $("#txtFiltroAva").live('blur', function () {
            if ($(this).val() == "") {
                $(this).val("Filtrar por nome");
            }
        })

    })//getJson
}

angular.module('Mural')
.directive('socialCurtir', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            objEdicao : "=objEdicao",
            idMensagemRapida: "@idMensagemRapida",
            usuarioCurtiu: "=usuarioCurtiu",
            subclass: "@subclass",
            linkComentar: "@linkComentar"
        },
        link: function (scope, element, attrs) {
            if (scope.usuarioCurtiu == null || scope.usuarioCurtiu === undefined) {
                scope.usuarioCurtiu = false;
            }

            scope.goToComentar = function () {
                if (angular.element('#comentar')) {
                    angular.element('#comentar').trigger('focus');
                }
            };

        },
        templateUrl: "/AVA/Projetos/Scripts/App/Diretiva/Mural/social-curtir.html"
    }
});

angular.module('Mural')
.directive('socialCurtirReplace', function ($http) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            idMensagemRapida: "@idMensagemRapida",
            objEdicao : "=objEdicao",
            usuarioCurtiu: "=usuarioCurtiu",
            subclass: "@subclass",
            linkComentar: "@linkComentar"
        },
        link: function (scope, element, attrs) {
            if (scope.usuarioCurtiu == null || scope.usuarioCurtiu === undefined) {
                scope.usuarioCurtiu = false;
            }

            scope.goToComentar = function () {
                if (angular.element('#comentar')) {
                    angular.element('#comentar').trigger('focus');
                }
            };

        },
        templateUrl: "/AVA/Projetos/Scripts/App/Diretiva/Mural/social-curtir.html"
    }
});




