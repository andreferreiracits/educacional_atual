(function ($) {
    var methods = {
        bolInstanciado: function () {

            if (this.data("avaselector")) {
                return true;
            } else {
                return false;
            }
        },
        focus: function () {
            var principal = $(this);
            var data = principal.data("avaselector");
            if (data) {
                data.target.find(".busca_especifico").focus();
            }
        },
        getUsuarios: function () { // em desenvolvimento
            return this.each(function () {

                var principal = $(this);
                var data = $(this).data("avaselector");
                if (data) {
                    return data.arrays;
                } else {
                    $.error("AvaSelector não está instanciado");
                }
            });
        },
        destruir: function () {
            return this.each(function () {
                var principal = $(this);
                var data = principal.data("avaselector");

                if (data) {
                    if (data.opcoes.caixaLajotaExterna != null) {
                        data.opcoes.caixaLajotaExterna.removeClass("seletorGlobal");
                        data.opcoes.caixaLajotaExterna.empty();
                    }
                    $(window).unbind('.AvaSelector');
                    data.target.remove();
                    principal.removeData("avaselector");
                }
            });
        },
        limparUsuarios: function () {
            return this.each(function () {

                var principal = $(this);
                var data = $(this).data("avaselector");
                if (data) {
                    data.arrays.arrayUsuarios.splice(0, data.arrays.arrayUsuarios.length);
                    data.arrays.arrayGrupos.splice(0, data.arrays.arrayGrupos.length);

                    if (data.opcoes.caixaLajotaExterna == null) {
                        $('.listaLajotinhas .lajotinha', principal).remove();
                        if (data.opcoes.strLajotinhaTodos != null) {
                            var $auxLajTod = $(data.uteis.htmlLajotinhaTodos);
                            $('.listaLajotinhas', principal).prepend($auxLajTod);
                            $auxLajTod.qtip(data.uteis.qtipOptions);
                        }
                    } else {
                        $('.listaLajotinhas .lajotinha', data.opcoes.caixaLajotaExterna).remove();
                        if (data.opcoes.strLajotinhaTodos != null) {
                            var $auxLajTod = $(data.uteis.htmlLajotinhaTodos);
                            $('.listaLajotinhas', data.opcoes.caixaLajotaExterna).prepend($auxLajTod);
                            $auxLajTod.qtip(data.uteis.qtipOptions);
                        }
                    }
                } else {
                    $.error("AvaSelector não está instanciado");
                }
            });
        },
        init: function (parametros) {
            var opcoes = {
                "bolAluno": true,
                "bolProfessor": false,
                "bolResponsavel": false,
                "bolSeguidores": false,
                "bolAdminCoordDiretor": false,
                "bolEscondeTituloExterno": false,
                "btnTextoConclusao": "Inserir",
                "btnTextoBotaoConclusaoSeletor": "Inscrever",
                "strTitulo": "Inscrever Pessoas",
                "bolLajota": false,
                "botaoConclusao": null,
                "caixaLajotaExterna": null, // exemplo $("#caixaExterna") //em desenvolvimento
                "bolSeletorFinalizar": true, // tira o botão de finalizar do seletor //em desenvolvimento
                "bolSelecionarTodos": true,
                "bolCoordenador": true,
                "detalhesGruposSeletor": false,
                "bolAtualizarLajotaQuandoCancelar": true,
                usuarioGrupoAdicionado: function (usuarios, grupo, seletor) { }, // dispara essa function quando bolSeletorFinalizar for false toda vez que existir um novo usuario inserido //em desenvolvimento
                insertLajota: function (usuarios, grupo, seletor) { },
                cancelarInsertLajota: function (usuarios, grupo, seletor) { },
                insertComplete: function (usuarios, grupo, seletor) { },
                atualizaListaUsuarios: function (usuarios, grupo, seletor) { },
                "carregarUsuarios": null,
                "carregarGrupos": null,
                strLajotinhaTodos: null


            };
            if (parametros) {
                $.extend(opcoes, parametros);
            }

            return this.each(function () { //deve achar a div que foi colocado na pagina para fazer a chamada
                var countTurma = 0;
                var tipoTurma = 7; // turma
                var principal = $(this);
                var data = principal.data("avaselector");
                var geradorIdGrupo = 1;
                var arrayUsuariosSelecionados = new Array();
                var arrayUsersJaExiste = new Array();
                var arrayUserEncontrado = new Array();
                var arrayGrupos = new Array();
                var arrayLajotas = new Array();
                var arrayUsuarioUltimaAcao = new Array();
                var arrayGrupoUltimaAcao = new Array();
                var idLoadedGlobal = false;
                var todosUsers = false;
                var loadTrocarAba = false;
                var mostrarDetalhesSelecionado = false;
                var tipoGlobalSelecionado = opcoes.bolProfessor ? 1 : opcoes.bolAluno ? 2 : opcoes.bolResponsavel ? 3 : opcoes.bolSeguidores ? 4 : opcoes.bolAdminCoordDiretor ? 5 : 1;
                var tipoGlobalInicial = tipoGlobalSelecionado;
                var temporizador = "";
                var temporizadorBusca = "";
                var fechouCancelar = false;
                var ajaxBuscaGlobal = null;
                var ajaxTotalUsers = null;
                var ajaxCarregarUsuarios = null;
                var ajaxTotalUsuarios = null;
                var arrays = {
                    arrayUsuarios: arrayUsuariosSelecionados,
                    arrayGrupos: arrayGrupos
                };
                var bolEscolaEmRede = false;
                var bolEscolaDeUnidade = false;
                var qtipOptions = {
                    content: {
                        text: function (event, api) {
                            $('.lajotinha.grupo').qtip('hide');
                            var txtQtipCustom = $(this).attr('title');
                            if (!$(this).hasClass('todos')) {
                                var idGrupoQtipCustom = $(this).data('idgrupo');
                                txtQtipCustom = '<span data-idgrupo="' + idGrupoQtipCustom + '">' + txtQtipCustom + '</span>';
                            }
                            return txtQtipCustom;
                        }
                    },
                    style: { classes: 'qtip-light qtipAvaSelector tooltip_branco_qtip' },
                    position: {
                        my: 'bottom left', // Position my top left...
                        at: 'top center', // at the bottom right of...
                        adjust: {
                            y: 0
                        }
                    },
                    hide: {
                        fixed: true,
                        delay: 1000
                    }
                }
                var htmlLajotinhaTodos = opcoes.strLajotinhaTodos == null ? '' : '<div class="lajotinha grupo todos" title="' + opcoes.strLajotinhaTodos + '"><span>Todos</span></div>';

                //variavel usada foda do init
                var uteis = {
                    htmlLajotinhaTodos: htmlLajotinhaTodos,
                    qtipOptions: qtipOptions
                };

                if (!data) {
                    if (!opcoes.bolAdminCoordDiretor && !opcoes.bolAluno && !opcoes.bolProfessor && !opcoes.bolResponsavel && !opcoes.bolSeguidores) {
                        $.error("AvaSelector não pode ser instanciado sem nenhum tipo de usuário");
                    } else {

                        /** TODAS AS FUNCTIONS DO SELETOR DEVEM SER CRIADAS AQUI  // Firefox não reconhece funções no final **/

                        /** Criar Load **/
                        function criarLoad() {
                            var html = "<div id=\"loadSeletor\"><img border=\"0\" src=\"/AVA/StaticContent/Common/img/perfil/carregando.gif\"></div>";
                            $("#listaCarteirinhaSeletor").empty().html(html);
                        }
                        /** Criar Load **/

                        /** Ação do botão inscrever **/
                        function acaoBotaoInscrever() {
                            if (opcoes.bolLajota) {

                                if (arrayGrupoUltimaAcao.length > 0) {
                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                        arrayGrupos.push(arrayGrupoUltimaAcao[i]);
                                    }
                                    arrayGrupoUltimaAcao.splice(0, arrayGrupoUltimaAcao.length);
                                }
                                if (arrayUsuarioUltimaAcao.length > 0) {
                                    for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                        arrayUsuariosSelecionados.push(arrayUsuarioUltimaAcao[i]);
                                    }
                                    arrayUsuarioUltimaAcao.splice(0, arrayUsuarioUltimaAcao.length);
                                }
                                var cxDestinoAppend = null;
                                if (opcoes.caixaLajotaExterna == null) {
                                    cxDestinoAppend = principal.find(".listaLajotinhas");
                                } else {
                                    cxDestinoAppend = opcoes.caixaLajotaExterna.find(".listaLajotinhas");
                                }

                                $('.lajotinha', cxDestinoAppend).remove();

                                var bolPossuiInputBuscaDestino = ($('input.busca_especifico', cxDestinoAppend).length) ? true : false;

                                for (var i = 0; i < arrayGrupos.length; i++) {
                                    if (bolPossuiInputBuscaDestino) {
                                        $('input.busca_especifico', cxDestinoAppend).before(montarLajotinhaGrupo(arrayGrupos[i]));
                                    } else {
                                        $(cxDestinoAppend).append(montarLajotinhaGrupo(arrayGrupos[i]));
                                    }
                                }

                                $('div.lajotinha.grupo', cxDestinoAppend).qtip(qtipOptions);

                                for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                    if (bolPossuiInputBuscaDestino) {
                                        $('input.busca_especifico', cxDestinoAppend).before(montarLajotinhaUsuario(arrayUsuariosSelecionados[i], false));
                                    } else {
                                        $(cxDestinoAppend).append(montarLajotinhaUsuario(arrayUsuariosSelecionados[i], false));
                                    }
                                }
                                if (cxDestinoAppend.children().size() > 0) {
                                    if (opcoes.botaoConclusao == null) {
                                        liberarBotaoInserirExterno(true);
                                    }
                                } else {
                                    if (opcoes.botaoConclusao == null) {
                                        liberarBotaoInserirExterno(false);
                                    }
                                }

                                if (!opcoes.bolSeletorFinalizar) {
                                    opcoes.usuarioGrupoAdicionado(arrayUsuariosSelecionados, arrayGrupos, principal);
                                }

                                $.fancybox.close();
                            } else {
                                opcoes.insertComplete(arrayUsuariosSelecionados, arrayGrupos, principal);
                                $.fancybox.close();
                            }
                        }

                        function montaCarteirinhaTurma(usuario, abaSelecionado) {
                            console.log("entrou no montaCarteirinhaTurma");

                            console.log(arrayUsuariosSelecionados);

                            var selecionado = false;
                            var estaEmGrupo = false;
                            if (abaSelecionado === undefined || !abaSelecionado) { // Aba não selecionado                                
                                if (opcoes.bolLajota) {
                                    if (arrayUsuariosSelecionados.length > 0) {
                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                            if (usuario.idUsuario == arrayUsuariosSelecionados[i].idUsuario) {
                                                selecionado = true;
                                                break;
                                            }
                                        }

                                        var listagemGrupoSelecionado = arrayUsuariosSelecionados.filter(f=> f.idGrupo != undefined || f.idGrupo != 0);
                                        for (var i = 0; i < listagemGrupoSelecionado.length; i++) {
                                            if (usuario.idGrupo == listagemGrupoSelecionado[i].idGrupo) {
                                                selecionado = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (arrayUsuarioUltimaAcao.length > 0) {
                                        for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                            if (usuario.isTurma === undefined || !usuario.isTurma) {
                                                if (arrayUsuarioUltimaAcao[i].isTurma && usuario.idTurma == arrayUsuarioUltimaAcao[i].idTurma) {
                                                    selecionado = true;
                                                    break;
                                                }
                                            }
                                        }
                                        var listagemGrupoSelecionado = arrayUsuarioUltimaAcao.filter(f=> f.idGrupo != undefined || f.idGrupo != 0);
                                        for (var i = 0; i < listagemGrupoSelecionado.length; i++) {
                                            if (usuario.idGrupo == listagemGrupoSelecionado[i].idGrupo) {
                                                selecionado = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!selecionado && arrayGrupos.length > 0) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        selecionado = true;
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (selecionado) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (!selecionado && arrayGrupoUltimaAcao.length > 0) {
                                        for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                            if (arrayGrupoUltimaAcao[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                    if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        selecionado = true;
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (selecionado) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                } else {


                                    if (arrayUsuariosSelecionados.length > 0) {
                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                            if (usuario.idUsuario == arrayUsuariosSelecionados[i].idUsuario) {
                                                selecionado = true;
                                                break;
                                            }
                                        }

                                        var listagemGrupoSelecionado = arrayUsuariosSelecionados.filter(f=> f.idGrupo != undefined || f.idGrupo != 0);
                                        for (var i = 0; i < listagemGrupoSelecionado.length; i++) {
                                            if (usuario.idGrupo == listagemGrupoSelecionado[i].idGrupo) {
                                                selecionado = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!selecionado && arrayGrupos.length > 0) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        selecionado = true;
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (selecionado) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                /**/
                            } else { // Aba Selecionado
                                selecionado = true;

                                if (opcoes.bolLajota) {

                                    if (arrayGrupoUltimaAcao.length > 0) {
                                        for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                            if (arrayGrupoUltimaAcao[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                    if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (estaEmGrupo) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    if (arrayGrupos.length > 0 && !estaEmGrupo) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (estaEmGrupo) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                } else {

                                    if (arrayGrupos.length > 0) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (estaEmGrupo) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                /**/
                            }
                            console.log("selecionado " + selecionado);
                            console.log("estaEmGrupo " + estaEmGrupo);

                            var carteirinha = "<div class=\"carteirinha_seletor " + (selecionado ? "carteirinha_selected" : "") + " " + (estaEmGrupo ? "selecionarTudoGrupo" : "") + "\" data-nome=\"" + usuario.strNome + "\" data-strfoto=\"" + usuario.strFoto + "\" data-idusuario='0' data-strapelido=\"" + usuario.strApelido + "\" data-idturma=\"" + usuario.idTurma + "\" data-idgrupo=\"" + usuario.idGrupo + "\" data-alunos=\"" + JSON.stringify(usuario.listaAlunos).replace(/"/g, "\'") + "\">" //carteirinha_selected
                                + " <div class=\"in_cT\">"
                                + " <span class=\"ava_clips_seletor\"></span>";
                            if (abaSelecionado !== undefined && abaSelecionado) {
                                carteirinha = carteirinha + "<span class=\"FontAwesome remove\"></span>";
                            }
                            carteirinha = carteirinha + "<a href=\"javascript:void(0);\">"
                                + "   <img width=\"75\" height=\"75\" alt=\"" + usuario.strNome + "\" src=\"" + (usuario.strFoto != "" ? usuario.strFoto : "/ava/StaticContent/Common/img/perfil/avatar_menor.jpg") + "\">"
                                + "   <span class=\"nomeUsuarioCarteirinha\">" + usuario.strNome + "</span>"
                                + "   <span class=\"nomeUsuarioCarteirinha\">" + usuario.listaAlunos.length + " Alunos</span>"
                                + " </a>"
                                + "</div>"
                                + "</div>";
                            return carteirinha;
                        }

                        function checarTodasTurmas(idEscola, intInicio, intFim, idUnidade, idEnsino, idSerie, idTurma, tipo, scrollMode) {
                            // comentei a linha, estava dando erro
                            //if (x != null && x.readyState < 4) { x.abort() }

                            console.log('FOi');

                            // TODO PEGAR O USUARIO DA SESSAO    
                            ajaxCarregarUsuarios = $.ajax({
                                url: "/AVA/Barras/Home/PerseguicaoCompleta/",
                                type: "GET",
                                data: {
                                    tipo: tipo,
                                    idPublico: "",
                                    strLogin: "", //TODO:::
                                    idTurma: idTurma,
                                    idMensagemRapida:"",
                                    idComentario:"",
                                    idEnsino:idEnsino,
                                    idSerie:idSerie

                                },
                                dataType: "json",
                                success: function (data) {
                                    var auxData = '';

                                    try{
                                        if(data.Result == undefined ){

                                            auxData = (data);

                                            data = {'Result':auxData}
                                        }else{
                                            data = data;
                                        }
                                    }
                                    catch(err){
                                        data = data;

                                    }
                                    var erro = parseInt(data.error);
                                    if (erro == 1) {
                                        todosUsers = true;
                                        if ($("#listaCarteirinhaSeletor .carteirinha_seletor").size() == 0) {
                                            $("#listaCarteirinhaSeletor").text(data.msg);
                                        }
                                        $(".selecionarTodos").data("qtdusuarios", 0);
                                        $(".selecionarTodos").val($(".selecionarTodos").val());
                                    } else {
                                        if (scrollMode === undefined || scrollMode != "scrollMode") {
                                            $("#listaCarteirinhaSeletor").empty();
                                        }
                                        var usuarios = new Array();

                                        $(data.Result).each(function (i, value) {
                                            var listAlunosTurma = [];
                                            $(value.alunos).each(function (i, e) {
                                                listAlunosTurma.push({
                                                    idUsuario: e.id,
                                                    strFoto: e.strFoto,
                                                    strNome: e.strNome,
                                                    strApelido: e.strApelido,
                                                    idTurma: value.id //e.idTurma alterei aqui
                                                });
                                            });

                                            var turma = {
                                                idTurma: value.id,
                                                idGrupo: value.idGrupo,
                                                strNome: value.strNome,
                                                strFoto: value.strFoto,
                                                strApelido: value.strApelido,
                                                listaAlunos: listAlunosTurma,
                                                isTurma: true
                                            };
                                            usuarios.push(turma);
                                            $("#listaCarteirinhaSeletor").append(montaCarteirinhaTurma(turma, true));
                                        });
                                        setarUsuariosLista(usuarios, tipoTurma);
                                        totalDeTurmas = data.Result.length;
                                        countTurma = totalDeTurmas;
                                        if (scrollMode !== undefined && scrollMode == "scrollMode") {
                                            idLoadedGlobal = false;
                                        }
                                    }
                                    $.fancybox.hideLoading();

                                    if (opcoes.detalhesGruposSeletor && $("#idEventoAgenda").val() > 0
                                        && !loadTrocarAba && !mostrarDetalhesSelecionado && contarUsuarios() > 0) {
                                        $(".seletorselecionado").click();
                                        mostrarDetalhesSelecionado = true;
                                    }
                                    loadTrocarAba = false;

                                },
                                error: function (data) {
                                    if (data.statusText != "abort") {
                                        console.log(data.responseText);
                                    }
                                    $.fancybox.hideLoading();

                                    /** Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll **/
                                    loadTrocarAba = false;
                                    /** Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll **/
                                }
                            });

                        }


                        /** Ação do botão inscrever **/

                        function contarUsuarios() {
                            console.log("entrou no contarUsuarios");
                            var contador = 0;

                            if (opcoes.bolLajota) {

                                contador = arrayUsuariosSelecionados.length;
                                if (arrayGrupos.length > 0) {
                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        //claudemir
                                        //contador = contador + arrayGrupos[i].totalUsuarios;
                                        contador = contador + arrayGrupos[i].usuarios.length;
                                    }
                                }
                                contador = contador + arrayUsuarioUltimaAcao.length;
                                if (arrayGrupoUltimaAcao.length > 0) {
                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                        //::: alateriei 
                                        //contador = contador + arrayGrupoUltimaAcao[i].totalUsuarios;
                                        contador = contador + arrayGrupoUltimaAcao[i].usuarios.length;
                                    }
                                }
                            } else {
                                contador = arrayUsuariosSelecionados.length;
                                if (arrayGrupos.length > 0) {
                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        contador = contador + arrayGrupos[i].totalUsuarios;
                                    }
                                }
                            }
                            return contador;
                        }

                        function setarUsuariosLista(usuarios, nomeGrupo) {
                            var arrayTurmasUsuarios = new Array();

                            for (var i = 0; i < usuarios.length; i++) {
                                arrayTurmasUsuarios.push(usuarios[i].idTurma);
                            }

                            var arrayIdTurmasGruposUsuarios = new Array();
                            // Guarda as ID's de todas as turmas já selecionadas
                            for (var i = 0; i < arrayGrupos.length; i++) {
                                for (var j = 0; j < arrayGrupos[i].usuarios.length; j++) {
                                    arrayIdTurmasGruposUsuarios.push(arrayGrupos[i].usuarios[j].idTurma);
                                    break;
                                }
                            }
                            var arrayRemoverGrupos = new Array();
                            for (var i = 0; i < arrayIdTurmasGruposUsuarios.length; i++) {
                                for (j = 0; j < arrayTurmasUsuarios.length; j++) {
                                    if (arrayIdTurmasGruposUsuarios[i] == arrayTurmasUsuarios[j]) {
                                        arrayRemoverGrupos.push(arrayTurmasUsuarios[j]);
                                        break;
                                    }
                                }
                            }

                            var modeloObjetoGrupo = {
                                idGrupo: geradorIdGrupo,
                                idEscola: $("#escolaRedeSeletor").size() > 0 ? parseInt($("#escolaRedeSeletor").val()) : 0,
                                idUnidade: $("#unidadesSeletor").size() > 0 ? parseInt($("#unidadesSeletor").val()) : 0,
                                idEnsino: parseInt($("#nivelEnsinoSeletor").val()),
                                idSerie: parseInt($("#intAnoSerieSeletor").val()),
                                idTurma: parseInt($("#turmasSeletor").val()),
                                //totalUsuarios: total,
                                nomeGrupo: nomeGrupo,
                                bolCompleto: true,
                                tipo: tipoGlobalSelecionado, //professor, aluno, responsavel, seguidor, admin/coord
                                usuarios: usuarios
                                //TODO :::
                                //,listaTurmasUsuarios: listaTurmas
                            };

                            if (opcoes.bolLajota) {
                                var flag = false;
                                if (arrayGrupoUltimaAcao.length > 0) {
                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                        if (arrayGrupoUltimaAcao[i].nomeGrupo == modeloObjetoGrupo.nomeGrupo && arrayGrupoUltimaAcao[i].tipo == modeloObjetoGrupo.tipo && arrayGrupoUltimaAcao[i].idEscola == modeloObjetoGrupo.idEscola && arrayGrupoUltimaAcao[i].idEnsino == modeloObjetoGrupo.idEnsino && arrayGrupoUltimaAcao[i].idSerie == modeloObjetoGrupo.idSerie && arrayGrupoUltimaAcao[i].idTurma == modeloObjetoGrupo.idTurma) {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }

                                /** Verifica se existe usuário solto, que foi inserido no grupo, se sim, remove ele**/
                                for (var j = 0; j < usuarios.length; j++) {
                                    for (var o = 0; o < arrayUsuarioUltimaAcao.length; o++) {
                                        if (arrayUsuarioUltimaAcao[o].idUsuario == usuarios[j].idUsuario) {
                                            arrayUsuarioUltimaAcao.splice(o, 1);
                                        }
                                    }
                                    for (var o = 0; o < arrayUsuariosSelecionados.length; o++) {
                                        if (arrayUsuariosSelecionados[o].idUsuario == usuarios[j].idUsuario) {
                                            arrayUsuariosSelecionados.splice(o, 1);
                                        }
                                    }
                                }

                                if (arrayGrupos.length > 0 && !flag) {
                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        if (arrayGrupos[i].nomeGrupo == modeloObjetoGrupo.nomeGrupo && arrayGrupos[i].tipo == modeloObjetoGrupo.tipo && arrayGrupos[i].idEscola == modeloObjetoGrupo.idEscola && arrayGrupos[i].idEnsino == modeloObjetoGrupo.idEnsino && arrayGrupos[i].idSerie == modeloObjetoGrupo.idSerie && arrayGrupos[i].idTurma == modeloObjetoGrupo.idTurma) {
                                            flag = true;
                                            break;
                                        }
                                    }
                                }

                                /** Verifica se existe usuário solto, que foi inserido no grupo, se sim, remove ele**/

                                if (!flag) {
                                    arrayGrupoUltimaAcao.push(modeloObjetoGrupo);
                                    geradorIdGrupo++;
                                }

                            } else {
                                for (var j = 0; j < usuarios.length; j++) {
                                    for (var o = 0; o < arrayUsuariosSelecionados.length; o++) {
                                        if (arrayUsuariosSelecionados[o].idUsuario == usuarios[j].idUsuario) {
                                            arrayUsuariosSelecionados.splice(o, 1);
                                        }
                                    }
                                }

                                if (arrayGrupos.length > 0) {
                                    var flag = false;
                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        if (arrayGrupos[i].nomeGrupo == modeloObjetoGrupo.nomeGrupo && arrayGrupos[i].tipo == modeloObjetoGrupo.tipo && arrayGrupos[i].idEscola == modeloObjetoGrupo.idEscola && arrayGrupos[i].idEnsino == modeloObjetoGrupo.idEnsino && arrayGrupos[i].idSerie == modeloObjetoGrupo.idSerie && arrayGrupos[i].idTurma == modeloObjetoGrupo.idTurma) {
                                            flag = true;
                                            break;
                                        }
                                    }
                                    if (!flag) {
                                        arrayGrupos.push(modeloObjetoGrupo);
                                        geradorIdGrupo++;
                                    }
                                } else {
                                    arrayGrupos.push(modeloObjetoGrupo);
                                    geradorIdGrupo++;
                                }
                            }

                            $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").addClass("carteirinha_selected").addClass("selecionarTudoGrupo");



                            if (!($(".seletorselecionado").is(":visible"))) {
                                if (arrayUsuariosSelecionados.length > 0 || arrayGrupos.length > 0 || arrayUsuarioUltimaAcao.length > 0 || arrayGrupoUltimaAcao.length > 0) {
                                    $(".seletorselecionado").slideDown();
                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("inativo")) {
                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("inativo").addClass("ativo");

                                        //Adiciona a ação do botão inscrever
                                        $(".fancybox-inner .seletor .right").find("a:last").bind({
                                            click: acaoBotaoInscrever
                                        });
                                    }
                                }
                            }
                            contadorUserSelecionado();
                        }

                        function checkarTodosUsuarios(idEscola, idUnidade, idEnsino, idSerie, idTurma, tipo, bolCoordenador, nomeGrupo, este) {
                            $.fancybox.showLoading();
                            ajaxTotalUsuarios = $.ajax({
                                url: "/ava/seletor/home/getUsuariosTotal",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    idEscola: idEscola,
                                    idUnidade: idUnidade,
                                    idEnsino: idEnsino,
                                    idSerie: idSerie,
                                    idTurma: idTurma,
                                    intTipo: tipo,
                                    bolCoordenador: opcoes.bolCoordenador
                                },
                                success: function (data) {
                                    var erro = parseInt(data.error);

                                    if (erro == 0) {

                                        var usuarios = new Array();
                                        var total = parseInt(data.total);
                                        var listaTurmas = data.listaTurmas.split(',');
                                        $(data.usuarios).each(function (i, e) {
                                            var usuario = {
                                                idUsuario: data.usuarios[i].id,
                                                strNome: data.usuarios[i].strNome,
                                                strApelido: data.usuarios[i].strApelido,
                                                strFoto: data.usuarios[i].strFoto,
                                                idTurma: data.usuarios[i].idTurma,
                                                isTurma: false
                                            };
                                            usuarios.push(usuario);
                                        });

                                        setarUsuariosLista(usuarios, nomeGrupo);
                                    }

                                    este.val("Desfazer Selecao (" + este.data("qtdusuarios") + ")");
                                    este.data("selecionado", 1);
                                    $(".selecionarUsersSeletor .caixa_busca").css("left", ($(".selecionarTodos").width() + 30) + "px");
                                    $.fancybox.hideLoading();
                                },
                                error: function (data) {
                                    console.log(data.responseText);
                                    $.fancybox.hideLoading();
                                }
                            });
                        }

                        /** Função contador de usuarios **/
                        function contadorUserSelecionado() {
                            console.log("== contadorUserSelecionado ");
                            var contador = contarUsuarios();

                            $(".seletorselecionado").find("strong").text(contador);
                            $(".seletorselecionado").find("span").text((contador > 1 ? "selecionados" : "selecionado"));

                        }
                        /** Função contador de usuarios **/

                        /** Função que remove o overflow  **/
                        function removerOverFlowLightBox() {
                            $(".fancybox-inner").css({ "overflow": "visible" });
                        }
                        /** Função que remove o overflow  **/

                        /** Função que cria o box de tooltip **/
                        function criarBoxToolTip() {
                            var html = "<div class=\"tool_selecao\" style=\"left: 581px; top: 123px; display: none;\">"
                                + "<p>Este usuário não pode ser removido da seleção.</p>"
                                + "<div class=\"setaBaixo\"></div>"
                                + "</div>";
                            $("div.seletor").parent().before(html);
                        }
                        /** Função que cria o box de tooltip **/

                        var ajaxcarregarComboSeletor = false;
                        function carregarComboSeletor(idEscola, idUnidade, idEnsino, idSerie, idTurma) {

                            var parametros = {
                                bolProfessor: opcoes.bolProfessor,
                                bolAluno: opcoes.bolAluno,
                                bolResponsavel: opcoes.bolResponsavel,
                                bolSeguidores: opcoes.bolSeguidores,
                                bolAdminCoordDiretor: opcoes.bolAdminCoordDiretor,
                                btnTextoBotaoConclusaoSeletor: opcoes.btnTextoBotaoConclusaoSeletor,
                                strTitulo: opcoes.strTitulo,
                                bolSelecionarTodos: opcoes.bolSelecionarTodos,
                                bolCoordenador: opcoes.bolCoordenador,
                                intTipo: tipoGlobalSelecionado
                            };

                            ajaxcarregarComboSeletor = true;

                            $("#boxComboSeletor").html("<img border='0' src='/AVA/StaticContent/Common/img/perfil/carregando.gif\'>");
                            $.ajax({
                                url: "/ava/seletor/home/CarregarComboSeletor",
                                type: "POST",
                                data: {
                                    idEscola: idEscola,
                                    idUnidade: idUnidade,
                                    idEnsino: idEnsino,
                                    idSerie: idSerie,
                                    idTurma: idTurma,
                                    json: JSON.stringify(parametros)
                                },

                                dataType: "html",
                                success: function (data) {
                                    ajaxcarregarComboSeletor = false;
                                    $("#boxComboSeletor").html(data);
                                    /*if (tipoGlobalSelecionado == 4 || tipoGlobalSelecionado == 5) {
                                    $(".selecionarUsersSeletor select").prop("disabled", true);
                                    }
                                    if ($(".selecionarTipoUsuarioSeletor").size() == 2) {
                                    $(".selecionarUsersSeletor #escolaRedeSeletor").prop("disabled", true);
                                    $(".selecionarUsersSeletor #unidadesSeletor").prop("disabled", true);
                                    }*/
                                    trocarTextoFiltrado($(".itens_seletor_conteudo.selecionarUsersSeletor").find("select:first").children("option:selected").text());
                                },
                                error: function (data) {
                                    ajaxcarregarComboSeletor = false;
                                    if (data.statusText != "abort") {
                                        console.log(data.responseText);
                                    }
                                }
                            });
                        }

                        function carregarUsuarios(idEscola, intInicio, intFim, idUnidade, idEnsino, idSerie, idTurma, tipo, scrollMode) {

                            console.log("entrou carregarUsuarios jquery.AvaSelector");
                            console.log("tipo = " + tipo);
                            var bolCoordenador = $("#bolCoordenador").val();
                            if(typeof bolCoordenador == "undefined") {
                                bolCoordenador = opcoes.bolCoordenador
                            }

                            if (tipo == 2) {
                                if (ajaxCarregarUsuarios != null && ajaxCarregarUsuarios.readyState < 4) {
                                    ajaxCarregarUsuarios.abort();
                                }
                                $.fancybox.showLoading();
                                ajaxCarregarUsuarios = $.ajax({
                                    url: "/ava/seletor/home/getUsuarios",
                                    type: "POST",
                                    data: {
                                        idEscola: idEscola,
                                        intInicio: intInicio,
                                        intFim: intFim,
                                        idUnidade: idUnidade,
                                        idEnsino: idEnsino,
                                        idSerie: idSerie,
                                        idTurma: idTurma,
                                        intTipo: tipo,
                                        bolCoordenador: bolCoordenador
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        var erro = parseInt(data.error);
                                        if (erro == 1) {
                                            todosUsers = true;
                                            if ($("#listaCarteirinhaSeletor .carteirinha_seletor").size() == 0) {
                                                $("#listaCarteirinhaSeletor").text(data.msg);
                                            }
                                        } else {
                                            if (scrollMode === undefined || scrollMode != "scrollMode") {
                                                $("#listaCarteirinhaSeletor").empty();
                                            }
                                            $(data.usuarios).each(function (i, e) {
                                                var usuario = {
                                                    idUsuario: e.id,
                                                    strFoto: e.strFoto,
                                                    strNome: e.strNome,
                                                    strApelido: e.strApelido,
                                                    idTurma: e.idTurma
                                                };


                                                $("#listaCarteirinhaSeletor").append(montaCarteirinha(usuario, false));

                                                //arrayLoadUsuarios.push(usuario);
                                            });

                                            /** Usado para ativar o scroll de carteirinhas novamente **/
                                            if (scrollMode !== undefined && scrollMode == "scrollMode") {
                                                idLoadedGlobal = false;
                                            }
                                            /** Usado para ativar o scroll de carteirinhas novamente **/


                                        }
                                        $.fancybox.hideLoading();

                                        if (opcoes.detalhesGruposSeletor && $("#idEventoAgenda").val() > 0
                                            && !loadTrocarAba && !mostrarDetalhesSelecionado && contarUsuarios() > 0) {
                                            $(".seletorselecionado").click();
                                            mostrarDetalhesSelecionado = true;
                                        }
                                        /** Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll **/
                                        loadTrocarAba = false;

                                        /** Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll **/

                                    },
                                    error: function (data) {
                                        if (data.statusText != "abort") {
                                            console.log(data.responseText);
                                        }
                                        $.fancybox.hideLoading();

                                        /** Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll **/
                                        loadTrocarAba = false;
                                        /** Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll **/
                                    }
                                });
                            }
                            else if (tipo == tipoTurma) {
                                getTurmas(tipo, scrollMode, false , idEnsino, idSerie, idTurma )
                            }

                        }


                        //inicio claudemir
                        /**/// getTurmas carregarTurmas
                        function getTurmas(tipo, scrollMode, check , idEnsino, idSerie, idTurma ) {
                            console.log("entrou carregarUsuarios jquery.AvaSelector_3.4.5.js.js");
                            console.log("tipo = " + tipo);
                            //:::

                            if (ajaxCarregarUsuarios != null && ajaxCarregarUsuarios.readyState < 4) {
                                ajaxCarregarUsuarios.abort();
                            }
                            $.fancybox.showLoading();

                            ajaxCarregarUsuarios = $.ajax({
                                url: "/AVA/Barras/Home/PerseguicaoCompleta/",
                                type: "GET",
                                data: {
                                    tipo: tipo,
                                    idPublico: "",
                                    strLogin: "", //TODO:::
                                    idTurma: idTurma,
                                    idMensagemRapida:"",
                                    idComentario:"",
                                    idEnsino:idEnsino,
                                    idSerie:idSerie
                                },
                                dataType: "json",
                                success: function (data) {
                                    var auxData = '';

                                    try{
                                        if(data.Result == undefined ){

                                            auxData = (data);

                                            data = {'Result':auxData}
                                        }else{
                                            data = data;
                                        }
                                    }
                                    catch(err){
                                        data = data;

                                    }
                                    var erro = parseInt(data.error);
                                    if (erro == 1) {
                                        todosUsers = true;
                                        if ($("#listaCarteirinhaSeletor .carteirinha_seletor").size() == 0) {
                                            $("#listaCarteirinhaSeletor").text(data.msg);
                                        }
                                    } else {
                                        if (scrollMode === undefined || scrollMode != "scrollMode") {
                                            $("#listaCarteirinhaSeletor").empty();
                                        }
                                        var usuarios = new Array();

                                        $(data.Result).each(function (i, value) {
                                            var listAlunosTurma = [];
                                            $(value.alunos).each(function (i, e) {
                                                listAlunosTurma.push({
                                                    idUsuario: e.id,
                                                    strFoto: e.strFoto,
                                                    strNome: e.strNome,
                                                    strApelido: e.strApelido,
                                                    idTurma: value.id //e.idTurma alterei aqui
                                                });
                                            });

                                            var turma = {
                                                idTurma: value.id,
                                                idGrupo: value.idGrupo,
                                                strNome: value.strNome,
                                                strFoto: value.strFoto,
                                                strApelido: value.strApelido,
                                                listaAlunos: listAlunosTurma
                                            };
                                            usuarios.push(turma);
                                            //::::
                                            $("#listaCarteirinhaSeletor").append(montaCarteirinhaTurma(turma, check));
                                        });

                                        totalDeTurmas = data.Result.length;
                                        console.log("totalDeTurmas ==****************** " + totalDeTurmas);

                                        $(".selecionarTodos").val("Selecionar todos (" + totalDeTurmas + ")");
                                        $(".selecionarTodos").data("selecionado", 0);

                                        /** Usado para ativar o scroll de carteirinhas novamente **/
                                        if (scrollMode !== undefined && scrollMode == "scrollMode") {
                                            idLoadedGlobal = false;
                                        }
                                        /** Usado para ativar o scroll de carteirinhas novamente **/

                                    }
                                    $.fancybox.hideLoading();

                                    if (opcoes.detalhesGruposSeletor && $("#idEventoAgenda").val() > 0
                                        && !loadTrocarAba && !mostrarDetalhesSelecionado && contarUsuarios() > 0) {
                                        $(".seletorselecionado").click();
                                        mostrarDetalhesSelecionado = true;
                                    }
                                    //Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll 
                                    loadTrocarAba = false;

                                    //Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll

                                },
                                error: function (data) {
                                    if (data.statusText != "abort") {
                                        console.log(data.responseText);
                                    }
                                    $.fancybox.hideLoading();

                                    //Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll
                                    loadTrocarAba = false;
                                    //Libera o scroll novamente, previne chamar a função carregarUsuarios 2x, quando clica para trocar de aba e possui scroll
                                }
                            });
                        }

                        function excluirAlunoPorIdTurma(lista, idTurma) {
                            var listaNew = [];
                            for (var i = 0; i < lista.length; i++) {
                                if (lista[i].idTurma != idTurma) {
                                    listaNew.push(lista[i]);
                                }
                            }
                            return listaNew
                        }

                        function excluirAlunoPorIdAluno(lista, idUsuario) {
                            var listaNew = [];
                            for (var i = 0; i < lista.length; i++) {
                                if (lista[i].idUsuario != idUsuario) {
                                    listaNew.push(lista[i]);
                                }
                            }
                            return listaNew
                        }

                        // fim claudemir

                        function carregarUsuariosBusca(idEscola, idUnidade, idEnsino, idSerie, idTurma, tipo, palavra) {
                            if (ajaxBuscaGlobal != null && ajaxBuscaGlobal.readyState < 4) {
                                ajaxBuscaGlobal.abort();
                            }
                            ajaxBuscaGlobal = $.ajax({
                                url: "/ava/seletor/home/getUsuariosBusca",
                                type: "POST",
                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                data: {
                                    idEscola: idEscola,
                                    idUnidade: idUnidade,
                                    idEnsino: idEnsino,
                                    idSerie: idSerie,
                                    idTurma: idTurma,
                                    intTipo: tipo,
                                    palavra: palavra,
                                    bolCoordenador: opcoes.bolCoordenador
                                },
                                dataType: "json",
                                success: function (data) {
                                    var erro = parseInt(data.error);
                                    if (erro == 1) {
                                        todosUsers = true;
                                        if ($("#listaCarteirinhaSeletor .carteirinha_seletor").size() == 0) {
                                            $("#listaCarteirinhaSeletor").text(data.msg);
                                        }
                                    } else {
                                        $("#listaCarteirinhaSeletor").empty();
                                        $(data.usuarios).each(function (i, e) {
                                            var usuario = {
                                                idUsuario: e.id,
                                                strFoto: e.strFoto,
                                                strNome: e.strNome,
                                                strApelido: e.strApelido,
                                                idTurma: e.idTurma
                                            };


                                            $("#listaCarteirinhaSeletor").append(montaCarteirinha(usuario, false));

                                            //arrayLoadUsuarios.push(usuario);
                                        });

                                        /** Desativa o Scroll **/

                                        idLoadedGlobal = true;

                                        /** Desativa o Scroll **/
                                    }
                                },
                                error: function (data) {
                                    if (data.statusText != "abort") {
                                        console.log(data.responseText);
                                    }
                                }
                            });
                        }

                        function montaCarteirinhaGrupo(grupo) {
                            console.log("entrou montaCarteirinhaGrupo");
                            var nomeGrupoAux = grupo.nomeGrupo;

                            if (nomeGrupoAux.indexOf('[:splitNomeGrupo:]') > 0) {
                                nomeGrupoAux = nomeGrupoAux.split('[:splitNomeGrupo:]');
                                nomeGrupoAux = nomeGrupoAux[nomeGrupoAux.length - 1];
                            }

                            var tipo = "";
                            var tipoPlural = "";
                            if (grupo.tipo == 1) {
                                tipo = "professor";
                                tipoPlural = "professores";
                            }
                            else if (grupo.tipo == 2) {
                                tipo = "aluno";
                                tipoPlural = "alunos";
                            }
                            else if (grupo.tipo == 3) {
                                tipo = "responsável";
                                tipoPlural = "responsáveis";
                            }
                            else if (grupo.tipo == 4) {
                                tipo = "pessoa";
                                tipoPlural = "pessoas";
                            }
                            else if (grupo.tipo == 5) {
                                tipo = "pessoa";
                                tipoPlural = "pessoas";
                            }
                            else if (grupo.tipo == 7) {
                                tipo = "turma";
                                tipoPlural = "turmas";
                            }
                            else {
                                tipo = "aluno";
                                tipoPlural = "alunos";
                            }

                            var carteirinha = "<div class=\"carteirinha_seletor grupo carteirinha_selected " + (!grupo.bolCompleto ? "grupo_personalizado" : "") + "\" data-nome=\"" + grupo.nomeGrupo + "\" data-idgrupo=\"" + grupo.idGrupo + "\">" //carteirinha_selected
                                + "<div class=\"feed_full\" style=\"display: none;\">"
                                + "<p>Deseja remover essa seleção?</p>"
                                + "<div class=\"acoesFeed\">"
                                + "<a class=\"bt_normal green remover\" href=\"#\">Sim</a>"
                                + "<a class=\"bt_normal red cancelar\" href=\"#\">Não</a>"
                                + "</div>"
                                + "</div>"
                                + " <div class=\"in_cT\">"
                                + " <span class=\"ava_clips_seletor\"></span>"
                                + "<span class=\"FontAwesome remove\"></span>"

                                + "<a href=\"javascript:void(0);\">"

                                + "   <span class=\"nomeUsuarioCarteirinha\">" + nomeGrupoAux + "</span>"
                                + "<p>" + grupo.totalUsuarios + " " + (grupo.totalUsuarios > 1 ? tipoPlural : tipo) + "</p>"
                                + " </a>";


                            var total = 0;

                            for (var i = 0; i < arrayGrupos.length; i++) {
                                if (grupo.idGrupo == arrayGrupos[i].idGrupo) {
                                    total = arrayGrupos[i].usuarios.length;
                                    break;
                                }
                            }

                            if (opcoes.detalhesGruposSeletor && total > 0)
                                carteirinha = carteirinha + "<a class=\"ver_todos_tool\" href=\"javascript:void(0);\">Ver todos</a>"


                            carteirinha = carteirinha + "</div>"
                                + "</div>";


                            return carteirinha;
                        }

                        function montaCarteirinha(usuario, abaSelecionado) {
                            console.log("entrou montaCarteirinha");
                            var selecionado = false;
                            var estaEmGrupo = false;
                            if (abaSelecionado === undefined || !abaSelecionado) { // Aba não selecionado
                                if (opcoes.bolLajota) {
                                    if (arrayUsuariosSelecionados.length > 0) {
                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                            if (usuario.idUsuario == arrayUsuariosSelecionados[i].idUsuario) {
                                                selecionado = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (arrayUsuarioUltimaAcao.length > 0) {
                                        for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                            if (usuario.idUsuario == arrayUsuarioUltimaAcao[i].idUsuario) {
                                                selecionado = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!selecionado && arrayGrupos.length > 0) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        selecionado = true;
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (selecionado) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (!selecionado && arrayGrupoUltimaAcao.length > 0) {
                                        for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                            if (arrayGrupoUltimaAcao[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                    if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        selecionado = true;
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (selecionado) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                } else {


                                    if (arrayUsuariosSelecionados.length > 0) {
                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                            if (usuario.idUsuario == arrayUsuariosSelecionados[i].idUsuario) {
                                                selecionado = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!selecionado && arrayGrupos.length > 0) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        selecionado = true;
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (selecionado) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }

                            } else { // Aba Selecionado
                                selecionado = true;

                                if (opcoes.bolLajota) {

                                    if (arrayGrupoUltimaAcao.length > 0) {
                                        for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                            if (arrayGrupoUltimaAcao[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                    if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (estaEmGrupo) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (arrayGrupos.length > 0 && !estaEmGrupo) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (estaEmGrupo) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                } else {

                                    if (arrayGrupos.length > 0) {
                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (arrayGrupos[i].usuarios.length > 0) {
                                                for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                    if (arrayGrupos[i].usuarios[o].idUsuario == usuario.idUsuario) {
                                                        estaEmGrupo = true;
                                                        break;
                                                    }
                                                }
                                                if (estaEmGrupo) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                }



                            }
                            var carteirinha = "<div class=\"carteirinha_seletor " + (selecionado ? "carteirinha_selected" : "") + " " + (estaEmGrupo ? "selecionarTudoGrupo" : "") + "\" data-nome=\"" + usuario.strNome + "\" data-strfoto=\"" + usuario.strFoto + "\" data-idusuario=\"" + usuario.idUsuario + "\" data-strapelido=\"" + usuario.strApelido + "\" data-idturma=\"" + usuario.idTurma + "\">" //carteirinha_selected
                                + " <div class=\"in_cT\">"
                                + " <span class=\"ava_clips_seletor\"></span>";
                            if (abaSelecionado !== undefined && abaSelecionado) {
                                carteirinha = carteirinha + "<span class=\"FontAwesome remove\"></span>";
                            }
                            carteirinha = carteirinha + "<a href=\"javascript:void(0);\">"
                                + "   <img width=\"75\" height=\"75\" alt=\"" + usuario.strNome + "\" src=\"" + (usuario.strFoto != "" ? usuario.strFoto : "/ava/StaticContent/Common/img/perfil/avatar_menor.jpg") + "\">"
                                + "   <span class=\"nomeUsuarioCarteirinha\">" + usuario.strNome + "</span>"
                                + " </a>"
                                + "</div>"
                                + "</div>";
                            return carteirinha;
                        }

                        function montarVisualizarParticipantesEntidade(grupoVisualizacao) {
                            $.fancybox({
                                href: "/ava/seletor/home/VisualizarParticipantesEntidade",
                                type: "ajax",
                                scrolling: 'no',
                                width: 750,
                                height: 450,
                                padding: 10,
                                autoSize: false,
                                beforeShow: function () {
                                    $('.ava_lightcontent').css('cssText', 'width: 750px;');
                                    $("html").css({ 'overflow': 'hidden' });
                                },
                                afterClose: function () {
                                    $(".convite_combo").toggleClass('ativo');
                                    $("html").css({ 'overflow': 'scroll' });
                                },
                                afterShow: function () {
                                    if (grupoVisualizacao.nomeGrupo.indexOf('[:splitNomeGrupo:]') > 0) {
                                        grupoVisualizacao.nomeGrupo = grupoVisualizacao.nomeGrupo.split('[:splitNomeGrupo:]');
                                        grupoVisualizacao.nomeGrupo = grupoVisualizacao.nomeGrupo[grupoVisualizacao.nomeGrupo.length - 1];
                                    }
                                    if (grupoVisualizacao.nomeGrupo === "") {
                                        grupoVisualizacao.nomeGrupo = $(".lajotinha.grupo[data-idgrupo=" + grupoVisualizacao.idGrupo + "]").attr('data-nome');
                                    }
                                    $("#titListaUsuariosAva").text(grupoVisualizacao.nomeGrupo);
                                    $("#carteirinhaParticipanteEntidade").empty();

                                    $.ajax({
                                        url: "/ava/seletor/home/buscarFotosGrupo",
                                        type: "POST",
                                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                        dataType: "json",
                                        data: { grupo: JSON.stringify(grupoVisualizacao) },
                                        success: function (dataGrupo) {
                                            if (dataGrupo.erro == 0) {
                                                grupoVisualizacao = dataGrupo.grupo;
                                            }
                                            for (var i = 0; i < grupoVisualizacao.usuarios.length; i++) {
                                                $("#carteirinhaParticipanteEntidade").append(montaCarteirinha(grupoVisualizacao.usuarios[i]));
                                            }
                                        }, error: function () {
                                            for (var i = 0; i < grupoVisualizacao.usuarios.length; i++) {
                                                $("#carteirinhaParticipanteEntidade").append(montaCarteirinha(grupoVisualizacao.usuarios[i]));
                                            }
                                        }
                                    });
                                },
                                helpers: {
                                    overlay: {
                                        locked: false
                                    }
                                }
                            });
                        }

                        function retira_acentos(palavra) {
                            com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÝÀÃÂÄÉÈÊËÝÌÎÝÓÒÕÖÔÚÙÛÜÇ';
                            sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
                            nova = '';

                            com_acento = new Array(225, 224, 227, 226, 228, 233, 232, 234, 235, 237, 236, 238, 239, 243, 242, 245, 244, 246, 250, 249, 251, 252, 231, 193, 192, 195, 194, 196, 201, 200, 202, 203, 205, 204, 206, 207, 211, 210, 213, 214, 212, 218, 217, 219, 220, 199);

                            for (i = 0; i < palavra.length; i++) {
                                var trocou = false;
                                for (var j = 0; j < com_acento.length; j++) {
                                    if (palavra.substr(i, 1).charCodeAt(0) == com_acento[j]) {
                                        trocou = true;
                                        nova += sem_acento.substr(j, 1);
                                    }
                                }
                                if (!trocou) {
                                    nova += palavra.substr(i, 1);
                                }
                            }
                            return nova;
                        }

                        function iniciar() {
                            todosUsers = false;
                            idLoadedGlobal = false;
                            fechouCancelar = false;
                            if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "educador") {
                                tipoGlobalSelecionado = 1;
                            }
                            else if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "responsavel") {
                                tipoGlobalSelecionado = 3;
                            }
                            else if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "aluno") {
                                tipoGlobalSelecionado = 2;
                            }
                            else if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "seguidor") {
                                tipoGlobalSelecionado = 4;
                            }
                            else if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "admcoorddiret") {
                                tipoGlobalSelecionado = 5;
                            }
                            else if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "turma") {
                                tipoGlobalSelecionado = 7;
                            }

                            tipoGlobalInicial = tipoGlobalSelecionado;

                            bolEscolaDeUnidade = $("#unidadesSeletor").size() > 0 ? true : false;
                            bolEscolaEmRede = $("#escolaRedeSeletor").size() > 0 ? true : false;

                            if (arrayUsuariosSelecionados.length > 0 || arrayGrupos.length > 0) {
                                if (!($(".seletorselecionado").is(":visible"))) {
                                    if (arrayUsuariosSelecionados.length > 0 || arrayGrupos.length > 0) {
                                        $(".seletorselecionado").slideDown();
                                        if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("inativo")) {
                                            $(".fancybox-inner .seletor .right").find("a:last").removeClass("inativo").addClass("ativo");

                                            //Adiciona a ação do botão inscrever
                                            $(".fancybox-inner .seletor .right").find("a:last").bind({
                                                click: acaoBotaoInscrever
                                            });
                                        }
                                    }
                                }
                                contadorUserSelecionado();
                            }
                            var nomeGrupo = getNomeGrupo(tipoGlobalSelecionado);
                            atualizarBotaoSelecionarTodos(nomeGrupo, tipoGlobalSelecionado);
                            trocarTextoFiltrado($(".itens_seletor_conteudo.selecionarUsersSeletor").find("select:first").children("option:selected").text());

                        }


                        function montarLajotinhaUsuario(u, flag) {
                            var ladjota = "<div class=\"lajotinha\" data-idusuario=\"" + u.idUsuario + "\">"
                                + "<img src=\"" + u.strFoto + "\" height=\"24\" width=\"24\">"
                                + "<span>" + u.strNome + "</span>";
                            if ($('#aba_tarefas').hasClass('atual')) {
                                ladjota += "<a href=\"javascript:void(0);\" class=\"excluir_lajotinha FontAwesome\" alt=\"Excluir da lista\" onclick=\"excluirFiltroTarefa(0, 0, 0)\"></a>";
                            } else if ($('#aba_caminhos').hasClass('atual')) {
                                ladjota += "<a href=\"javascript:void(0);\" class=\"excluir_lajotinha FontAwesome\" alt=\"Excluir da lista\" onclick=\"excluirFiltroCaminho(0, 0, 0)\"></a>";
                            } else if ($('#aba_agendadas').hasClass('atual')) {
                                ladjota += "<a href=\"javascript:void(0);\" class=\"excluir_lajotinha FontAwesome\" alt=\"Excluir da lista\" onclick=\"excluirFiltroAgendadas(0, 0, 0)\"></a>";
                            } else {
                                ladjota += "<a href=\"javascript:void(0);\" class=\"excluir_lajotinha FontAwesome\" alt=\"Excluir da lista\"></a>";
                            }
                            ladjota += "</div>";

                            if (flag) {
                                arrayUsuariosSelecionados.push(u);
                            } else {
                                arrayLajotas.push(u);
                            }
                            return ladjota;
                        }

                        function montarLajotinhaGrupo(g) {

                            var nomeGrupoAux = g.nomeGrupo;
                            var textoTooltip = '';
                            var fimTextoTooltip = '';
                            var iconeLadjota = '';

                            if (nomeGrupoAux == 7 ){
                                nomeGrupoAux = "Turma";
                            } else if (nomeGrupoAux.indexOf('[:splitNomeGrupo:]') > 0) {
                                nomeGrupoAux = nomeGrupoAux.split('[:splitNomeGrupo:]');
                                nomeGrupoAux = nomeGrupoAux[nomeGrupoAux.length - 1];
                            }

                            if (nomeGrupoAux === "") {
                                nomeGrupoAux = $(".selecionarTipoUsuarioSeletor").parent(".active").text();
                            }

                            if (g.tipo != 4) {
                                if (!g.bolCompleto) {
                                    //grupo parcial
                                    nomeGrupoAux += ' (' + g.totalUsuarios + ')';

                                    if (g.usuarios.length > 0) {
                                        var qtd = (g.usuarios.length > 5) ? 5 : g.usuarios.length;
                                        textoTooltip = [];
                                        for (var i = 0; i < qtd; i++) {
                                            textoTooltip.push(g.usuarios[i].strNome);
                                        }
                                        textoTooltip = textoTooltip.join(', ');
                                        if (g.usuarios.length > 5) {
                                            textoTooltip += ' e outros ' + (g.usuarios.length - 5) + ' usuários';
                                        } else {
                                            //Trocando a ultima ',' por 'e' quando tiver mais de um usuário selecionado
                                            if (g.usuarios.length > 1)
                                                textoTooltip = textoTooltip.substr(0, (textoTooltip.lastIndexOf(','))) + ' e' + textoTooltip.substr((textoTooltip.lastIndexOf(',') + 1), textoTooltip.length);
                                        }
                                    }
                                } else {
                                    //Grupo completo
                                    switch (g.tipo) {
                                        case 1: //Professores
                                            textoTooltip += 'Professores ';
                                            break;
                                        case 2: //Alunos
                                            if ($("ul.menu_seletor a.selecionarTipoUsuarioSeletor[tipo='educador']").length && $("ul.menu_seletor a.selecionarTipoUsuarioSeletor[tipo='admcoorddiret']").length) {
                                                //Mensagem que só aparece para usuario com papel de professor ou maior
                                                if (!(location.href.toLowerCase().indexOf('/ava/grupo') > 0)) {
                                                    fimTextoTooltip = ' e seus pais e responsáveis';
                                                }
                                            }
                                            textoTooltip += 'Alunos ';
                                            break;
                                        case 3: //Pais e responsaveis
                                            textoTooltip += 'Pais e responsáveis ';
                                            break;
                                        case 5: //Administrador
                                            textoTooltip += 'Administradores, coordenadores e diretores ';
                                            break;
                                    }

                                    if (bolEscolaDeUnidade) {
                                        if (g.idUnidade > 0) {

                                            textoTooltip += 'da unidade ';
                                            var nomeAuxTooltip = g.nomeGrupo;
                                            if (nomeAuxTooltip.indexOf('[:splitNomeGrupo:]') > 0) {
                                                nomeAuxTooltip = nomeAuxTooltip.split('[:splitNomeGrupo:]');
                                                nomeAuxTooltip = nomeAuxTooltip[0];
                                            }
                                            textoTooltip += nomeAuxTooltip + ' ';
                                        } else {

                                            textoTooltip += 'de todas as unidades ';
                                        }
                                    } else if (bolEscolaEmRede) {
                                        if (g.idEscola > 0) {
                                            textoTooltip += 'do ';
                                            var nomeAuxTooltip = g.nomeGrupo;
                                            if (nomeAuxTooltip.indexOf('[:splitNomeGrupo:]') > 0) {
                                                nomeAuxTooltip = nomeAuxTooltip.split('[:splitNomeGrupo:]');
                                                nomeAuxTooltip = nomeAuxTooltip[0];
                                            }
                                            textoTooltip += nomeAuxTooltip + ' ';
                                        } else {
                                            textoTooltip += 'de rede de escolas ';
                                        }
                                    }

                                    if ((!bolEscolaEmRede || (bolEscolaEmRede && g.idEscola > 0)) &&
                                        (!bolEscolaDeUnidade || (bolEscolaDeUnidade && g.idUnidade))) {
                                        if (g.idEnsino == -1) {
                                            textoTooltip += 'de todos os níveis de ensino';
                                        } else if (g.idEnsino >= 0) {
                                            if (g.idTurma > 0) {
                                                textoTooltip += 'da turma ';
                                            } else {
                                                textoTooltip += 'de ';
                                            }
                                            textoTooltip += nomeGrupoAux;
                                        }
                                    }

                                    textoTooltip += fimTextoTooltip;

                                } //fim if grupo completo
                            } // fim if seleção diferente de seguidores

                            //icone
                            switch (g.tipo) {
                                case 1: //Professores
                                    iconeLadjota = '<i class="icon_lajotinha turma_icon"></i>';
                                    break;
                                case 2: //Alunos
                                    iconeLadjota = '<i class="icon_lajotinha aluno_icon"></i>';
                                    break;
                                case 3: //Pais e responsaveis
                                    iconeLadjota = '<i class="icon_lajotinha responsavel_icon"></i>';
                                    break;
                                case 4: //Seguidores
                                    iconeLadjota = '<i class="icon_lajotinha seguidores_icon"></i>';
                                    nomeGrupoAux = textoTooltip = 'Meus seguidores';
                                    break;
                                case 5: //Administrador
                                    iconeLadjota = '<i class="icon_lajotinha adm_icon"></i>';
                                    break;
                            }

                            if (g.usuarios.length > 1)
                                textoTooltip = $.trim(textoTooltip) + '.';

                            var ladjota = '<div title="' + textoTooltip + '" class="lajotinha grupo' + ((!g.bolCompleto) ? ' personalizada' : '') + '" data-idgrupo="' + g.idGrupo + '" data-nome="' + g.nomeGrupo + '" >' +
                                '<a href="javascript:void(0);" class="ver_todos_tool" data-idgrupo="' + g.idGrupo + '">' + iconeLadjota + nomeGrupoAux + '</a>' +
                                '<a href="javascript:void(0);" class="excluir_lajotinha FontAwesome" alt="Excluir da lista"></a></div>';

                            return ladjota;
                        }

                        function montarLajotinhaTodos(elemListaLajotinhas) {
                            if (opcoes.strLajotinhaTodos != null) {
                                if ($('.lajotinha', elemListaLajotinhas).length == 0) {
                                    //Só sobrou a lajotinhas que está sendo removida
                                    var $auxLajTod = $(htmlLajotinhaTodos);
                                    $(elemListaLajotinhas).prepend($auxLajTod);
                                    $auxLajTod.qtip(qtipOptions);
                                }
                            }
                        }

                        function trocarTextoFiltrado(texto) {
                            if (texto.indexOf('[:splitNomeGrupo:]') > 0) {
                                texto = texto.split('[:splitNomeGrupo:]');
                                texto = texto[texto.length - 1];
                            } else {
                                //Aluno vendo aluno
                                if (tipoGlobalSelecionado == 2) {
                                    if ($(".selecionarUsersSeletor select:enabled").length == 0) {
                                        //Quando aluno acessa a aba de aluno não tem nenhum combo habilitado
                                        texto = ($(".selecionarUsersSeletor select").last().children("option:selected").text());
                                    }
                                }
                            }
                            $(".itens_seletor_conteudo.selecionarUsersSeletor").find("span:first").text(texto);
                        }

                        function getNomeGrupo(tipo) {
                            var nomeGrupo = "";
                            var grupoAvancado = false;
                            if ($(".selecionarUsersSeletor").find("select:enabled").last().children("option:selected").val() == "0" || $(".selecionarUsersSeletor").find("select:enabled").last().children("option:selected").val() == "-1") {

                                if ($(".selecionarUsersSeletor").find("select:enabled").last().attr("id") == "escolaRedeSeletor") {
                                    nomeGrupo = "Rede de escolas";
                                }
                                else if ($("#escolaRedeSeletor").size() <= 0 && $(".selecionarUsersSeletor").find("select:enabled").last().attr("id") == "unidadesSeletor") {
                                    nomeGrupo = "Todas as unidades";

                                } else {

                                    nomeGrupo = $(".selecionarUsersSeletor").find("select:enabled").last().prev().children("option:selected").text();
                                    grupoAvancado = true;
                                    if (nomeGrupo == "") {
                                        nomeGrupo = $(".selecionarUsersSeletor").find("select:enabled").last().children("option:selected").text();
                                    }
                                }
                            }
                            else if (tipo == 4) {

                                nomeGrupo = "Meus Seguidores";
                            }
                            else if (tipo == 5) {

                                nomeGrupo = "Administradores, Coordenadores e Diretores";
                            } else { //tipo == 2 e outros  

                                grupoAvancado = true;
                                nomeGrupo = $(".selecionarUsersSeletor").find("select:enabled").last().children("option:selected").text();
                            }

                            if (grupoAvancado) {

                                var auxCombo = $(".selecionarUsersSeletor").find("select:enabled").first();
                                var auxComboTexto = auxCombo.children("option:selected").text();
                                var auxComboItens = new Array();
                                while (auxComboTexto != nomeGrupo) {
                                    auxComboItens.push(auxComboTexto);
                                    auxCombo = auxCombo.next();
                                    auxComboTexto = auxCombo.children("option:selected").text();
                                }
                                if (auxComboItens.length > 0) {
                                    auxComboItens.push(nomeGrupo);
                                    nomeGrupo = auxComboItens.join('[:splitNomeGrupo:]');
                                }

                                if (nomeGrupo.length == 0 && tipo == 2) {

                                    if ($(".selecionarUsersSeletor select:enabled").length == 0) {
                                        //Nenhum combo ativo na aba de alunos significa que é um aluno logado
                                        var idTurmaComboAluno = parseInt($(".selecionarUsersSeletor select").last().children("option:selected").val());
                                        if (idTurmaComboAluno > 0) {
                                            nomeGrupo = $(".selecionarUsersSeletor select").first().children("option:selected").text();
                                            nomeGrupo += "[:splitNomeGrupo:]";
                                            nomeGrupo += $(".selecionarUsersSeletor select").last().children("option:selected").text();
                                        }
                                    }
                                }
                            }

                            return nomeGrupo;
                        }
                        function getQtdTotalUsuarios() {
                            var idEscola = $("#escolaRedeSeletor").size() > 0 ? parseInt($("#escolaRedeSeletor").val()) : 0;
                            var idUnidade = $("#unidadesSeletor").size() > 0 ? parseInt($("#unidadesSeletor").val()) : 0;
                            var idEnsino = parseInt($("#nivelEnsinoSeletor").val());
                            var idSerie = parseInt($("#intAnoSerieSeletor").val());
                            var idTurma = parseInt($("#turmasSeletor").val());
                            var tipo = tipoGlobalSelecionado;
                            if (ajaxTotalUsers != null && ajaxTotalUsers.readyState < 4) {
                                ajaxTotalUsers.abort();
                            }

                            ajaxTotalUsers = $.ajax({
                                url: "/ava/seletor/home/getUsuariosTotal",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    idEscola: idEscola,
                                    idUnidade: idUnidade,
                                    idEnsino: idEnsino,
                                    idSerie: idSerie,
                                    idTurma: idTurma,
                                    intTipo: tipo,
                                    bolCoordenador: opcoes.bolCoordenador
                                },
                                success: function (data) {
                                    var erro = parseInt(data.error);
                                    if (erro == 0) {
                                        $(".selecionarTodos").data("qtdusuarios", data.total);
                                        $(".selecionarTodos").val($(".selecionarTodos").val() + " (" + data.total + ")");
                                        $(".selecionarUsersSeletor .caixa_busca").css("left", ($(".selecionarTodos").width() + 30) + "px");
                                    } else {
                                        $(".selecionarTodos").data("qtdusuarios", 0);
                                        $(".selecionarTodos").val($(".selecionarTodos").val());
                                        //$(".selecionarUsersSeletor .caixa_busca").css("left", ($(".selecionarTodos").width() + 30) + "px");
                                    }
                                },
                                error: function (data) {
                                    if (data.statusText != "abort") {
                                        console.log(data.responseText);
                                    }
                                }
                            });
                        }

                        function liberarBotaoInserirExterno(flag) {
                            if (flag) {
                                principal.find(".submeter").prop("disabled", false).removeClass("inativo");
                            } else {
                                principal.find(".submeter").prop("disabled", true).addClass("inativo");
                            }
                        }

                        function atualizarBotaoSelecionarTodos(nomeGrupo, tipo) {

                            if (opcoes.bolLajota) {
                                var flag = false;
                                if (arrayGrupoUltimaAcao.length > 0) {
                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                        if (arrayGrupoUltimaAcao[i].nomeGrupo == nomeGrupo && arrayGrupoUltimaAcao[i].tipo == tipo) {
                                            $(".selecionarTodos").val("Desfazer Selecao");
                                            $(".selecionarTodos").data("selecionado", 1);
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (arrayGrupos.length > 0 && !flag) {
                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        if (arrayGrupos[i].nomeGrupo == nomeGrupo && arrayGrupos[i].tipo == tipo) {
                                            $(".selecionarTodos").val("Desfazer Selecao");
                                            $(".selecionarTodos").data("selecionado", 1);
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if (!flag) {
                                    $(".selecionarTodos").val("Selecionar todos");
                                    $(".selecionarTodos").data("selecionado", 0);
                                }
                            } else {
                                var flag = false;
                                if (arrayGrupos.length > 0) {
                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        if (arrayGrupos[i].nomeGrupo == nomeGrupo && arrayGrupos[i].tipo == tipo) {
                                            $(".selecionarTodos").val("Desfazer Sele&ccedil;&atilde;o");
                                            $(".selecionarTodos").data("selecionado", 1);
                                            flag = true;
                                            break;
                                        }
                                    }

                                }
                                if (!flag) {
                                    $(".selecionarTodos").val("Selecionar todos");
                                    $(".selecionarTodos").data("selecionado", 0);
                                }
                            }
                            if (opcoes.bolSelecionarTodos) {
                                getQtdTotalUsuarios();
                            }
                        }

                        /** TODAS AS FUNCTIONS DO SELETOR DEVEM SER CRIADAS ACIMA  **** FIM ****    // Firefox não reconhece funções no final **/

                        var html = "";
                        if (!opcoes.bolEscondeTituloExterno) {
                            html = html + "<h1><a href=\"#\">" + opcoes.strTitulo + "</a></h1>";
                        }

                        html = html + "<form class=\"seletorGlobal\" name=\"formSeletor\" onsubmit=\"return false;\">"
                            + "	<input type=\"text\" class=\"busca_especifico\" placeholder=\"Digite um nome\">"
                            + "	<a href=\"javascript:void(0);\" class=\"seletor_completo\" title=\"Selecionar usu&aacute;rios\"></a>";

                        if (opcoes.caixaLajotaExterna == null) {
                            html = html + "	<div class=\"listaLajotinhas\">"
                                + "		<!--<div class=\"lajotinha\">"
                                + "			<a href=\"javascript:void(0);\" alt=\"\">Nome do aluno</a>"
                                + "			<a href=\"javascript:void(0);\" class=\"excluir_lajotinha\" alt=\"Excluir da lista\">X</a>"
                                + "		</div>-->"

                                + "	</div>";
                        }

                        if (opcoes.botaoConclusao == null) {
                            html = html + "	<input type=\"button\" class=\"btn_cinza right submeter inativo\" disabled=\"disabled\" value=\"" + opcoes.btnTextoConclusao + "\">";
                        }

                        html = html + "</form>"
                            + "<div id=\"dialog-modal\" title=\"Erro\" style=\"display: none;\">"
                            + "   "
                            + "</div>";


                        /////////////////// Teste para a Dariane

                        var html2 = "";
                        if (!opcoes.bolEscondeTituloExterno) {
                            html2 += '<h1><a href="#">' + opcoes.strTitulo + '</a></h1>';
                        }

                        html2 += '<form class="seletorGlobal" name="formSeletor" onsubmit="return false;">';

                        if (opcoes.caixaLajotaExterna == null) {
                            html2 += '<div class="listaLajotinhas"><input type="text" class="busca_especifico" placeholder="Digite um nome"></div>' +
                                '<a href="javascript:void(0);" class="seletor_completo" title="Selecionar usu&aacute;rios"></a>';
                        } else {
                            html2 += '<input type="text" class="busca_especifico" placeholder="Digite um nome">'
                                + '<a href="javascript:void(0);" class="seletor_completo" title="Selecionar usu&aacute;rios"></a>';

                        }

                        if (opcoes.botaoConclusao == null) {
                            html2 += '<input type="button" class="btn_cinza right submeter inativo" disabled="disabled" value="' + opcoes.btnTextoConclusao + '">';
                        }

                        html2 += '</form><div id="dialog-modal" title="Erro" style="display: none;"> </div>';

                        html = html2;

                        /////////////////// Fim teste para a Dariane

                        $html = $(html);
                        $(this).html($html);


                        if (opcoes.caixaLajotaExterna != null) {
                            opcoes.caixaLajotaExterna.addClass("seletorGlobal");
                            opcoes.caixaLajotaExterna.html("<div class=\"listaLajotinhas\">"
                                + "		<!--<div class=\"lajotinha\">"
                                + "			<a href=\"javascript:void(0);\" alt=\"\">Nome do aluno</a>"
                                + "			<a href=\"javascript:void(0);\" class=\"excluir_lajotinha\" alt=\"Excluir da lista\">X</a>"
                                + "		</div>-->"

                                + "	</div>");
                        } else {
                            $('.listaLajotinhas', $html).bind('click', function (e) {
                                if (!($(e.target).hasClass('lajotinha') || $(e.target).closest('div').hasClass('lajotinha') || $(e.target).is(':input'))) {
                                    $('.busca_especifico', this).focus();
                                }
                            });
                        }

                        $(this).data("avaselector", {
                            target: $html,
                            arrays: arrays,
                            opcoes: opcoes,
                            uteis: uteis
                        });

                        if (opcoes.caixaLajotaExterna != null) {
                            montarLajotinhaTodos($('.listaLajotinhas', opcoes.caixaLajotaExterna));
                            $(opcoes.caixaLajotaExterna).on("click", ".listaLajotinhas .ver_todos_tool", function (e) {
                                e.preventDefault();
                                var idGrupo = $(this).closest(".lajotinha").data("idgrupo");
                                var grupo = "";

                                for (var i = 0; i < arrayGrupos.length; i++) {
                                    if (arrayGrupos[i].idGrupo == idGrupo) {
                                        grupo = arrayGrupos[i];
                                        break;
                                    }
                                }

                                montarVisualizarParticipantesEntidade(grupo);
                            });
                        } else {
                            montarLajotinhaTodos($('.listaLajotinhas', principal));
                            $('body').on("click", ".listaLajotinhas .ver_todos_tool", function (e) {
                                e.preventDefault();
                                var idGrupo = $(this).data("idgrupo");
                                var grupo = "";

                                for (var i = 0; i < arrayGrupos.length; i++) {
                                    if (arrayGrupos[i].idGrupo == idGrupo) {
                                        grupo = arrayGrupos[i];
                                        break;
                                    }
                                }

                                montarVisualizarParticipantesEntidade(grupo);
                            });
                        }
                        /** Ação ver todos do tooltip **/


                        /** Deletar Lajotinhas **/
                        if (opcoes.caixaLajotaExterna != null) {
                            $(opcoes.caixaLajotaExterna).on("click", ".listaLajotinhas .lajotinha .excluir_lajotinha", function (e) {
                                if ($(this).closest(".lajotinha").hasClass("grupo")) {
                                    var idGrupo = parseInt($(this).closest(".lajotinha").data("idgrupo"));

                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        if (arrayGrupos[i].idGrupo == idGrupo) {
                                            arrayGrupos.splice(i, 1);
                                            break;
                                        }
                                    }

                                    $('.qtip.qtipAvaSelector span[data-idgrupo=' + idGrupo + ']').closest('.qtip.qtipAvaSelector').remove();
                                    $(this).closest(".lajotinha").remove();
                                    montarLajotinhaTodos($('.listaLajotinhas', opcoes.caixaLajotaExterna));
                                } else {
                                    var idUsuario = parseInt($(this).closest(".lajotinha").data("idusuario"));

                                    for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                        if (arrayUsuariosSelecionados[i].idUsuario == idUsuario) {
                                            arrayUsuariosSelecionados.splice(i, 1);
                                            break;
                                        }
                                    }
                                    $(this).closest(".lajotinha").remove();
                                    montarLajotinhaTodos($('.listaLajotinhas', opcoes.caixaLajotaExterna));
                                }
                                if (opcoes.caixaLajotaExterna.find(".listaLajotinhas").children().size() > 0) {
                                    if (opcoes.botaoConclusao == null) {
                                        liberarBotaoInserirExterno(true);
                                    }
                                } else {
                                    if (opcoes.botaoConclusao == null) {
                                        liberarBotaoInserirExterno(false);
                                    }
                                }
                                if (!opcoes.bolSeletorFinalizar) {
                                    opcoes.usuarioGrupoAdicionado(arrayUsuariosSelecionados, arrayGrupos, principal);
                                }
                                opcoes.atualizaListaUsuarios(arrayUsuariosSelecionados, arrayGrupos, principal);
                            });
                        }
                        else {
                            $(this).on("click", ".listaLajotinhas .lajotinha .excluir_lajotinha", function (e) {

                                if ($(this).closest(".lajotinha").hasClass("grupo")) {
                                    var idGrupo = parseInt($(this).closest(".lajotinha").data("idgrupo"));

                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                        if (arrayGrupos[i].idGrupo == idGrupo) {
                                            arrayGrupos.splice(i, 1);
                                            break;
                                        }
                                    }
                                    $('.qtip.qtipAvaSelector span[data-idgrupo=' + idGrupo + ']').closest('.qtip.qtipAvaSelector').remove();
                                    //quando o link do modal é chamado dentro do tooltip
                                    //$('.qtip.qtipAvaSelector .ver_todos_tool[data-idgrupo=' + idGrupo + ']').closest('.qtip.qtipAvaSelector').remove();
                                    $(this).closest(".lajotinha").remove();
                                    montarLajotinhaTodos($('.listaLajotinhas', principal));
                                } else {
                                    var idUsuario = parseInt($(this).closest(".lajotinha").data("idusuario"));

                                    for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                        if (arrayUsuariosSelecionados[i].idUsuario == idUsuario) {
                                            arrayUsuariosSelecionados.splice(i, 1);
                                            break;
                                        }
                                    }
                                    $(this).closest(".lajotinha").remove();
                                    montarLajotinhaTodos($('.listaLajotinhas', principal));
                                }
                                if (principal.find(".listaLajotinhas").children().size() > 0) {
                                    if (opcoes.botaoConclusao == null) {
                                        liberarBotaoInserirExterno(true);
                                    }
                                } else {
                                    if (opcoes.botaoConclusao == null) {
                                        liberarBotaoInserirExterno(false);
                                    }
                                }
                                if (!opcoes.bolSeletorFinalizar) {
                                    opcoes.usuarioGrupoAdicionado(arrayUsuariosSelecionados, arrayGrupos, principal);
                                }
                                opcoes.atualizaListaUsuarios(arrayUsuariosSelecionados, arrayGrupos, principal);
                            });

                        }
                        /** Deletar Lajotinhas **/

                        /** Buscar Usuários seletor frente **/
                        $(this).find(".busca_especifico").autocomplete({
                            source: function (request, response) {
                                $.ajax({
                                    url: "/ava/seletor/home/BuscarUsuarios",
                                    type: "POST",
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    dataType: "json",
                                    data: {
                                        json: JSON.stringify({
                                            bolProfessor: opcoes.bolProfessor,
                                            bolAluno: opcoes.bolAluno,
                                            bolResponsavel: opcoes.bolResponsavel,
                                            bolSeguidores: opcoes.bolSeguidores,
                                            bolAdminCoordDiretor: opcoes.bolAdminCoordDiretor,
                                            strBusca: request.term,
                                            bolCoordenador: opcoes.bolCoordenador
                                        })
                                    },
                                    success: function (data) {
                                        var erro = parseInt(data.error);
                                        if (erro == 0) {
                                            response($.map(data.usuarios, function (e) {
                                                return {
                                                    label: e.strNome,
                                                    value: e.strNome,
                                                    strFoto: e.strFoto,
                                                    strMiniFoto: e.strMiniFoto,
                                                    strApelido: e.strApelido,
                                                    strTurma: e.strTurma,
                                                    bolResponsavel: e.papelUsuario.bolPai,
                                                    bolEducador: e.papelUsuario.bolEducador,
                                                    bolAluno: e.papelUsuario.bolAluno,
                                                    idUsuario: e.id
                                                }
                                            }));

                                        } else {
                                            $(".ui-autocomplete").hide();
                                        }
                                        principal.find(".busca_especifico").removeClass("ui-autocomplete-loading");
                                    },
                                    error: function (data) {
                                        console.log(data.responseText);
                                    }
                                });
                            },
                            minLength: 2,
                            select: function (event, ui) {
                                var usuario = {
                                    idUsuario: ui.item.idUsuario,
                                    strNome: ui.item.label,
                                    strApelido: ui.item.strApelido,
                                    strFoto: ui.item.strFoto,
                                    strMiniFoto: ui.item.strMiniFoto,
                                    strTurma: ui.item.strTurma,
                                    idTurma: ui.item.idTurma
                                };
                                if (opcoes.caixaLajotaExterna != null) {
                                    if ($('.listaLajotinhas input.busca_especifico', opcoes.caixaLajotaExterna).length) {
                                        $('.listaLajotinhas input.busca_especifico', opcoes.caixaLajotaExterna).val("").before(montarLajotinhaUsuario(usuario, opcoes.bolLajota));
                                    } else {
                                        $('.listaLajotinhas', opcoes.caixaLajotaExterna).append(montarLajotinhaUsuario(usuario, opcoes.bolLajota));
                                    }
                                    $('.lajotinha.todos', opcoes.caixaLajotaExterna).remove();
                                } else {
                                    $('.listaLajotinhas input.busca_especifico', principal).val("").before(montarLajotinhaUsuario(usuario, opcoes.bolLajota));
                                    $('.lajotinha.todos', principal).remove();
                                    liberarBotaoInserirExterno(true);
                                }

                                if (!opcoes.bolSeletorFinalizar) {
                                    if (opcoes.bolLajota) {
                                        opcoes.usuarioGrupoAdicionado(arrayUsuariosSelecionados, arrayGrupos, principal);
                                    } else {
                                        opcoes.usuarioGrupoAdicionado(arrayLajotas, arrayGrupos, principal);
                                    }

                                }
                            },
                            close: function (event, ui) {
                                principal.find(".busca_especifico").val("");
                            }

                        })
                            .data("autocomplete")._renderItem = function (ul, item) {
                                var flag = false;
                                //ul.addClass('customClass'); //Ul custom class here

                                if (opcoes.bolLajota) {
                                    if (arrayUsuariosSelecionados.length > 0) {
                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                            if (arrayUsuariosSelecionados[i].idUsuario == item.idUsuario) {
                                                flag = true;
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    if (arrayLajotas.length > 0) {
                                        for (var i = 0; i < arrayLajotas.length; i++) {
                                            if (arrayLajotas[i].idUsuario == item.idUsuario) {
                                                flag = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (!flag) {
                                    return $("<li></li>")
                                        .data("item.autocomplete", item)
                                        .append("<a><img src=\"" + item.strMiniFoto + "\" style=\"width:35px; heigth: 35px;\"> <span class=\"nome\">" + item.label + "</span><br><span>" + (item.bolAluno ? "Aluno" : item.bolEducador ? "Professor" : item.bolResponsavel ? "Pai" : "") + "</span></a>")
                                        .appendTo(ul);
                                }
                            };

                        /** Buscar Usuários seletor frente **/

                        $(this).find(".seletor_completo").click(function (e) {
                            e.preventDefault();

                            tipoGlobalSelecionado = tipoGlobalInicial;

                            var parametros = {
                                bolProfessor: opcoes.bolProfessor,
                                bolAluno: opcoes.bolAluno,
                                bolResponsavel: opcoes.bolResponsavel,
                                bolSeguidores: opcoes.bolSeguidores,
                                bolAdminCoordDiretor: opcoes.bolAdminCoordDiretor,
                                btnTextoBotaoConclusaoSeletor: opcoes.btnTextoBotaoConclusaoSeletor,
                                strTitulo: opcoes.strTitulo,
                                bolSelecionarTodos: opcoes.bolSelecionarTodos,
                                bolCoordenador: opcoes.bolCoordenador,
                                intTipo: tipoGlobalSelecionado
                            };

                            $.fancybox.showLoading();

                            $.fancybox({
                                ajax: {
                                    type: "POST",
                                    data: {
                                        json: JSON.stringify(parametros),
                                        screen: 'caminhos'
                                    },
                                    dataType: "html"
                                },
                                href: "/ava/seletor/home/CarregarSeletor",
                                helpers: {
                                    overlay: {
                                        closeClick: false,
                                        css: {
                                            "background": "rgba(255, 255, 255, 0.8)"
                                        },
                                        locked: false
                                    }
                                },
                                type: "ajax",
                                closeBtn: false,
                                padding: 0,
                                autoResize: false,
                                autoSize: false,
                                fitToView: false,
                                width: 926,
                                height: 495,
                                afterClose: function () {
                                    mostrarDetalhesSelecionado = false;
                                },
                                afterShow: function () {
                                    /** LÓGICA APÓS ABRIR O LIGHTBOX TUDO DENTRO DO ONCOMPLETE **/



                                    iniciar();

                                    if(_action == "concluir"){
                                        $('#turmaSelector').hide();

                                    }


                                    /** Procurar Usuários na aba selecionados **/
                                    $(".selecionadosUsersSeletor .pesquisa_seletor.selecionados").keyup(function (e) {
                                        var busca = $(this).val();
                                        if (busca.length > 0) {
                                            $("#listaCarteirinhaSeletorSelecionado").empty();
                                            if (opcoes.bolLajota) {

                                                for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                    for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                        //var flag = false;
                                                        if (retira_acentos(arrayGrupoUltimaAcao[i].usuarios[o].strNome).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1 || retira_acentos(arrayGrupoUltimaAcao[i].usuarios[o].strApelido).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1) {
                                                            if (arrayUsersJaExiste.length > 0) {
                                                                var flag = false;
                                                                for (var j = 0; j < arrayUsersJaExiste.length; j++) {
                                                                    if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == arrayUsersJaExiste[j].idUsuario) {
                                                                        flag = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (!flag) {
                                                                    arrayUsersJaExiste.push(arrayGrupoUltimaAcao[i].usuarios[o]);
                                                                }
                                                            } else {
                                                                arrayUsersJaExiste.push(arrayGrupoUltimaAcao[i].usuarios[o]);
                                                            }
                                                        }

                                                    }
                                                }

                                                for (var i = 0; i < arrayGrupos.length; i++) {
                                                    for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                        //var flag = false;
                                                        if (retira_acentos(arrayGrupos[i].usuarios[o].strNome).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1 || retira_acentos(arrayGrupos[i].usuarios[o].strApelido).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1) {
                                                            if (arrayUsersJaExiste.length > 0) {
                                                                var flag = false;
                                                                for (var j = 0; j < arrayUsersJaExiste.length; j++) {
                                                                    if (arrayGrupos[i].usuarios[o].idUsuario == arrayUsersJaExiste[j].idUsuario) {
                                                                        flag = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (!flag) {
                                                                    arrayUsersJaExiste.push(arrayGrupos[i].usuarios[o]);
                                                                }
                                                            } else {
                                                                arrayUsersJaExiste.push(arrayGrupos[i].usuarios[o]);
                                                            }
                                                        }

                                                    }
                                                }
                                                for (var i = 0; i < arrayUsersJaExiste.length; i++) {
                                                    $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsersJaExiste[i], true));
                                                }

                                                for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                                    var flag = true;
                                                    if (retira_acentos(arrayUsuarioUltimaAcao[i].strNome).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1 || retira_acentos(arrayUsuarioUltimaAcao[i].strApelido).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1) {
                                                        if (arrayUsersJaExiste.length > 0) {
                                                            for (var o = 0; o < arrayUsersJaExiste.length; o++) {
                                                                if (arrayUsersJaExiste[o].idUsuario == arrayUsuarioUltimaAcao[i].idUsuario) {
                                                                    flag = true;
                                                                    break;
                                                                } else {
                                                                    flag = false;
                                                                }
                                                            }
                                                        } else {
                                                            flag = false;
                                                        }

                                                    }
                                                    if (!flag) {
                                                        $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsuarioUltimaAcao[i], true));
                                                    }
                                                }

                                                for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                    var flag = true;
                                                    if (retira_acentos(arrayUsuariosSelecionados[i].strNome).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1 || retira_acentos(arrayUsuariosSelecionados[i].strApelido).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1) {
                                                        if (arrayUsersJaExiste.length > 0) {
                                                            for (var o = 0; o < arrayUsersJaExiste.length; o++) {
                                                                if (arrayUsersJaExiste[o].idUsuario == arrayUsuariosSelecionados[i].idUsuario) {
                                                                    flag = true;
                                                                    break;
                                                                } else {
                                                                    flag = false;
                                                                }
                                                            }
                                                        } else {
                                                            flag = false;
                                                        }

                                                    }
                                                    if (!flag) {
                                                        $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsuariosSelecionados[i], true));
                                                    }
                                                }


                                            } else { //bolLajota = false


                                                for (var i = 0; i < arrayGrupos.length; i++) {
                                                    for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                        //var flag = false;
                                                        if (retira_acentos(arrayGrupos[i].usuarios[o].strNome).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1 || retira_acentos(arrayGrupos[i].usuarios[o].strApelido).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1) {
                                                            if (arrayUsersJaExiste.length > 0) {
                                                                var flag = false;
                                                                for (var j = 0; j < arrayUsersJaExiste.length; j++) {
                                                                    if (arrayGrupos[i].usuarios[o].idUsuario == arrayUsersJaExiste[j].idUsuario) {
                                                                        flag = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (!flag) {
                                                                    arrayUsersJaExiste.push(arrayGrupos[i].usuarios[o]);
                                                                }
                                                            } else {
                                                                arrayUsersJaExiste.push(arrayGrupos[i].usuarios[o]);
                                                            }
                                                        }

                                                    }
                                                }
                                                for (var i = 0; i < arrayUsersJaExiste.length; i++) {
                                                    $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsersJaExiste[i], true));
                                                }
                                                for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                    var flag = true;
                                                    if (retira_acentos(arrayUsuariosSelecionados[i].strNome).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1 || retira_acentos(arrayUsuariosSelecionados[i].strApelido).toLowerCase().indexOf(retira_acentos(busca).toLowerCase()) > -1) {
                                                        if (arrayUsersJaExiste.length > 0) {
                                                            for (var o = 0; o < arrayUsersJaExiste.length; o++) {
                                                                if (arrayUsersJaExiste[o].idUsuario == arrayUsuariosSelecionados[i].idUsuario) {
                                                                    flag = true;
                                                                    break;
                                                                } else {
                                                                    flag = false;
                                                                }
                                                            }
                                                        } else {
                                                            flag = false;
                                                        }

                                                    }
                                                    if (!flag) {
                                                        $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsuariosSelecionados[i], true));
                                                    }
                                                }
                                            }

                                            if ($("#listaCarteirinhaSeletorSelecionado .carteirinha_seletor").size() == 0) {
                                                $("#listaCarteirinhaSeletorSelecionado").text("Usuário não encontrado");
                                            }
                                        } else {
                                            $(".seletorselecionado").trigger("click");
                                        }
                                        arrayUsersJaExiste.splice(0, arrayUsersJaExiste.length);
                                    });
                                    /** Procurar Usuários na aba selecionados **/


                                    /** Buscar Usuário com os filtros **/
                                    $(".selecionarUsersSeletor .pesquisa_seletor").keyup(function (e) {

                                        var busca = $(this).val();
                                        if (temporizadorBusca != null && temporizadorBusca != "" && temporizadorBusca !== undefined) {
                                            clearTimeout(temporizadorBusca);
                                        }
                                        criarLoad();
                                        if (busca.length > 0) {
                                            $(".selecionarTodos").prop("disabled", true).addClass("inativo");
                                            temporizadorBusca = setTimeout(function () {
                                                carregarUsuariosBusca($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado, busca);
                                            }, 500);
                                        } else {
                                            $(".selecionarTodos").prop("disabled", false).removeClass("inativo");
                                            criarLoad();
                                            carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, 1, 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);

                                        }
                                    })
                                        .keypress(function (e) {
                                            var tecla = e.which || e.keyCode;
                                            if (tecla == 13)
                                                e.preventDefault();
                                        });
                                    /** Buscar Usuário com os filtros **/

                                    $(".selecionarTodos").click(function (e) {

                                        if ($(".selecionarTipoUsuarioSeletor").parent(".active").children(":first").attr("tipo") == "educador") {
                                            tipoGlobalSelecionado = 1;
                                            console.log('Educador ativo!!');
                                        }

                                        e.preventDefault();
                                        var idEscola = $("#escolaRedeSeletor").size() > 0 ? parseInt($("#escolaRedeSeletor").val()) : 0;
                                        var idUnidade = $("#unidadesSeletor").size() > 0 ? parseInt($("#unidadesSeletor").val()) : 0;
                                        var idEnsino = parseInt($("#nivelEnsinoSeletor").val());
                                        var idSerie = parseInt($("#intAnoSerieSeletor").val());
                                        var idTurma = parseInt($("#turmasSeletor").val());
                                        var tipo = tipoGlobalSelecionado;
                                        var este = $(this);

                                        var nomeGrupo = getNomeGrupo(tipo);
                                        
                                        if (parseInt(este.data("selecionado")) == 1) {
                                            
                                            var usuariosAux = null;
                                            if (opcoes.bolLajota) {
                                                if (arrayGrupoUltimaAcao.length > 0) {
                                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                        if (arrayGrupoUltimaAcao[i].tipo == tipoGlobalSelecionado
                                                            //&& arrayGrupoUltimaAcao[i].nomeGrupo == nomeGrupo 
                                                            && arrayGrupoUltimaAcao[i].idEscola == idEscola
                                                            && arrayGrupoUltimaAcao[i].idEnsino == idEnsino
                                                            && arrayGrupoUltimaAcao[i].idTurma == idTurma
                                                            && arrayGrupoUltimaAcao[i].idSerie == idSerie) {
                                                            usuariosAux = arrayGrupoUltimaAcao[i].usuarios;
                                                            arrayGrupoUltimaAcao.splice(i, 1);
                                                        }
                                                    }
                                                    if (usuariosAux != null && usuariosAux.length > 0) {
                                                        $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").each(function () {

                                                            console.log(usuariosAux);
                                                            for (var i = 0; i < usuariosAux.length; i++) {
                                                                if (usuariosAux[i].idTurma > 0) {
                                                                    if (parseInt($(this).data("idturma")) == usuariosAux[i].idTurma) {
                                                                        $(this).removeClass("carteirinha_selected").removeClass("selecionarTudoGrupo");
                                                                        break;
                                                                    }
                                                                }
                                                                else {
                                                                    if (parseInt($(this).data("idusuario")) == usuariosAux[i].idUsuario) {
                                                                        $(this).removeClass("carteirinha_selected").removeClass("selecionarTudoGrupo");
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    }
                                                    usuariosAux = null;
                                                }

                                                if (arrayGrupos.length > 0) {
                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        if (arrayGrupos[i].tipo == tipoGlobalSelecionado && arrayGrupos[i].nomeGrupo == nomeGrupo && arrayGrupos[i].idEscola == idEscola && arrayGrupos[i].idEnsino == idEnsino && arrayGrupos[i].idTurma == idTurma && arrayGrupos[i].idSerie == idSerie) {
                                                            usuariosAux = arrayGrupos[i].usuarios;
                                                            arrayGrupos.splice(i, 1);
                                                        }
                                                    }
                                                    if (usuariosAux != null && usuariosAux.length > 0) {
                                                        $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").each(function () {
                                                            for (var i = 0; i < usuariosAux.length; i++) {
                                                                if (parseInt($(this).data("idusuario")) == usuariosAux[i].idUsuario) {
                                                                    $(this).removeClass("carteirinha_selected").removeClass("selecionarTudoGrupo");
                                                                    break;
                                                                }
                                                            }
                                                        });
                                                    }
                                                    usuariosAux = null;
                                                }

                                                if (arrayGrupoUltimaAcao.length > 0) {
                                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                        for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                            $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").each(function () {
                                                                if (parseInt($(this).data("idusuario")) == arrayGrupoUltimaAcao[i].usuarios[o].idUsuario) {
                                                                    if (!($(this).hasClass("selecionarTudoGrupo"))) {
                                                                        $(this).addClass("selecionarTudoGrupo");
                                                                    }
                                                                    if (!($(this).hasClass("carteirinha_selected"))) {
                                                                        $(this).addClass("carteirinha_selected");
                                                                    }
                                                                }
                                                            });
                                                        }

                                                    }
                                                }
                                                if (arrayGrupos.length > 0) {
                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                            $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").each(function () {
                                                                if (parseInt($(this).data("idusuario")) == arrayGrupos[i].usuarios[o].idUsuario) {
                                                                    if (!($(this).hasClass("selecionarTudoGrupo"))) {
                                                                        $(this).addClass("selecionarTudoGrupo");
                                                                    }
                                                                    if (!($(this).hasClass("carteirinha_selected"))) {
                                                                        $(this).addClass("carteirinha_selected");
                                                                    }
                                                                }
                                                            });
                                                        }

                                                    }
                                                }
                                                if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                    $(".seletorselecionado").slideUp();

                                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");

                                                        //Retira a ação do botão inscrever
                                                        $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                    }
                                                }

                                                if (idTurma > 0) {
                                                    //Verificar se a turma deste usuario foi selecionado de alguma forma 
                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        if (arrayGrupos[i].idTurma == idTurma) {
                                                            arrayGrupos.splice(i, 1);
                                                            break;
                                                        }
                                                    }
                                                }
                                                else {
                                                    for (var i = 0; i < arrayGrupos.length; i++) {

                                                    }
                                                }


                                                contadorUserSelecionado();
                                            }
                                            else { // não lajota
                                                if (arrayGrupos.length > 0) {
                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        if (arrayGrupos[i].tipo == tipoGlobalSelecionado && arrayGrupos[i].nomeGrupo == nomeGrupo && arrayGrupos[i].idEscola == idEscola && arrayGrupos[i].idEnsino == idEnsino && arrayGrupos[i].idTurma == idTurma && arrayGrupos[i].idSerie == idSerie) {
                                                            usuariosAux = arrayGrupos[i].usuarios;
                                                            arrayGrupos.splice(i, 1);
                                                        }
                                                    }
                                                    if (usuariosAux != null && usuariosAux.length > 0) {
                                                        $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").each(function () {
                                                            for (var i = 0; i < usuariosAux.length; i++) {
                                                                if (parseInt($(this).data("idusuario")) == usuariosAux[i].idUsuario) {
                                                                    $(this).removeClass("carteirinha_selected").removeClass("selecionarTudoGrupo");
                                                                    break;
                                                                }
                                                            }
                                                        });
                                                    }
                                                    usuariosAux = null;
                                                }


                                                if (arrayGrupos.length > 0) {
                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                            $("#listaCarteirinhaSeletor").find(".carteirinha_seletor").each(function () {
                                                                if (parseInt($(this).data("idusuario")) == arrayGrupos[i].usuarios[o].idUsuario) {
                                                                    if (!($(this).hasClass("selecionarTudoGrupo"))) {
                                                                        $(this).addClass("selecionarTudoGrupo");
                                                                    }
                                                                    if (!($(this).hasClass("carteirinha_selected"))) {
                                                                        $(this).addClass("carteirinha_selected");
                                                                    }
                                                                }
                                                            });
                                                        }

                                                    }
                                                }
                                                if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0) {
                                                    $(".seletorselecionado").slideUp();

                                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");

                                                        //Retira a ação do botão inscrever
                                                        $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                    }
                                                }
                                                contadorUserSelecionado();
                                            }


                                            //fimmmm

                                            $(".selecionarUsersSeletor .caixa_busca").css("left", ($(".selecionarTodos").width() + 30) + "px");
                                            /** Mostra aviso caso ficou carteirinha selecionada **/

                                            if ($("#listaCarteirinhaSeletor .carteirinha_selected").size() > 0) {
                                                $(".tool_selecao").fadeIn("fast");
                                                if (temporizador != "" && temporizador != null && temporizador !== undefined) {
                                                    clearTimeout(temporizador);
                                                }

                                                temporizador = setTimeout(function () {
                                                    $(".tool_selecao").fadeOut("fast");
                                                }, 3000);
                                            }

                                            este.val("Selecionar todos (" + este.data("qtdusuarios") + ")");
                                            este.data("selecionado", 0);
                                        }

                                        //::
                                        else {
                                            console.log('Else');
                                            if (ajaxTotalUsuarios != null && ajaxTotalUsuarios.readyState < 4) {
                                                ajaxTotalUsuarios.abort();
                                            }

                                            if (tipo == tipoTurma) {
                                                checarTodasTurmas(idEscola, 1, 20, idUnidade, idEnsino, idSerie, idTurma, tipo, undefined);
                                                //este.val("Selecionar todos (" + countTurma + ")");
                                                este.data("selecionado", 1);
                                            } else {
                                                checkarTodosUsuarios(idEscola, idUnidade, idEnsino, idSerie, idTurma, tipo, opcoes.bolCoordenador, nomeGrupo, este);
                                            }
                                        }

                                        if (tipo == tipoTurma) {
                                            $(".selecionarTodos").val("Selecionar todos (" + countTurma + ")");
                                        }

                                    });

                                    /** Ação de exclusão de entidade/Grupo Personalizado **/
                                    $("#listaCarteirinhaSeletorSelecionado").on("click", ".acoesFeed .remover", function (e) {
                                        console.log('listaCarteirinhaSeletorSelecionado jquery.AvaSelector.js');

                                        e.preventDefault();

                                        var este = $(this).closest(".carteirinha_seletor");

                                        var grupo = {
                                            idGrupo: parseInt(este.data("idgrupo"))
                                        };
                                        var flag = true;
                                        if (opcoes.bolLajota) {
                                            if (arrayGrupoUltimaAcao.length > 0) {
                                                for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                    if (arrayGrupoUltimaAcao[i].idGrupo == grupo.idGrupo) {
                                                        arrayGrupoUltimaAcao.splice(i, 1);
                                                    }
                                                }
                                            }
                                            if (arrayGrupos.length > 0) {
                                                for (var i = 0; i < arrayGrupos.length; i++) {
                                                    if (arrayGrupos[i].idGrupo == grupo.idGrupo) {
                                                        arrayGrupos.splice(i, 1);
                                                    }
                                                }
                                            }
                                        } else {
                                            for (var i = 0; i < arrayGrupos.length; i++) {
                                                if (arrayGrupos[i].idGrupo == grupo.idGrupo) {
                                                    arrayGrupos.splice(i, 1);
                                                }
                                            }
                                        }

                                        if (flag) {

                                            este.fadeOut("fast", function () {
                                                $(this).remove();
                                            });

                                            if (opcoes.bolLajota) {
                                                if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                    $(".seletorselecionado").slideUp();
                                                    $(".menu_seletor li").not(".seletorselecionado").children(":first").trigger("click");
                                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");


                                                        //Retira a ação do botão inscrever
                                                        $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                    }
                                                }
                                            } else {
                                                if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0) {
                                                    $(".seletorselecionado").slideUp();
                                                    $(".menu_seletor li").not(".seletorselecionado").children(":first").trigger("click");
                                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");


                                                        //Retira a ação do botão inscrever
                                                        $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                    }
                                                }
                                            }
                                            contadorUserSelecionado();
                                        }

                                    })
                                        .on("click", ".acoesFeed .cancelar", function (e) {
                                            e.preventDefault();
                                            var este = $(this).closest(".feed_full");
                                            este.fadeOut("fast");

                                        });
                                    /** Ação de exclusão de entidade/Grupo Personalizado **/

                                    /** Clicando nas carteirinhas na aba de selecionado (Remover) **/
                                    $("#listaCarteirinhaSeletorSelecionado").on("click", ".carteirinha_seletor", function (e) {
                                        console.log("clicou no carteirinha_seletor");
                                        e.preventDefault();
                                        var flag = true;
                                        if ($(this).hasClass("grupo")) {
                                            if (!($(this).find(".feed_full").is(":visible"))) {
                                                $(this).find(".feed_full").fadeIn("fast");
                                            }
                                            flag = false;
                                        }
                                        else {

                                            if ($(this).hasClass("selecionarTudoGrupo")) { //esta em grupo

                                                if (opcoes.bolLajota) {

                                                    if (arrayGrupoUltimaAcao.length > 0) {
                                                        for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                            for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                                if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == parseInt($(this).data("idusuario"))) {
                                                                    arrayGrupoUltimaAcao[i].usuarios.splice(o, 1);
                                                                    arrayGrupoUltimaAcao[i].bolCompleto = false;
                                                                    arrayGrupoUltimaAcao[i].totalUsuarios = arrayGrupoUltimaAcao[i].totalUsuarios - 1;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (arrayGrupos.length > 0) {
                                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                                            for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                                if (arrayGrupos[i].usuarios[o].idUsuario == parseInt($(this).data("idusuario"))) {
                                                                    arrayGrupos[i].usuarios.splice(o, 1);
                                                                    arrayGrupos[i].bolCompleto = false;
                                                                    arrayGrupos[i].totalUsuarios = arrayGrupos[i].totalUsuarios - 1;
                                                                }
                                                            }
                                                        }
                                                    }

                                                } else {

                                                    if (arrayGrupos.length > 0) {
                                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                                            for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                                if (arrayGrupos[i].usuarios[o].idUsuario == parseInt($(this).data("idusuario"))) {
                                                                    arrayGrupos[i].usuarios.splice(o, 1);
                                                                    arrayGrupos[i].bolCompleto = false;
                                                                    arrayGrupos[i].totalUsuarios = arrayGrupos[i].totalUsuarios - 1;
                                                                }
                                                            }
                                                        }
                                                    }

                                                }
                                                $(this).fadeOut("fast", function () {
                                                    $(this).remove();
                                                });
                                                contadorUserSelecionado();
                                            } else {

                                                var usuario = {
                                                    idUsuario: parseInt($(this).data("idusuario")),
                                                    strFoto: $(this).data("strfoto"),
                                                    strNome: $(this).data("nome"),
                                                    strApelido: $(this).data("strapelido"),
                                                    idTurma: $(this).data("idturma"),
                                                    idGrupo: $(this).data("idgrupo")
                                                };
                                                if (opcoes.bolLajota) {
                                                    if (arrayUsuarioUltimaAcao.length > 0) {
                                                        for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                                            if (arrayUsuarioUltimaAcao[i].idUsuario == usuario.idUsuario) {
                                                                arrayUsuarioUltimaAcao.splice(i, 1);
                                                            }
                                                        }
                                                    }
                                                    if (arrayUsuariosSelecionados.length > 0) {
                                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                            if (arrayUsuariosSelecionados[i].idUsuario == usuario.idUsuario) {
                                                                arrayUsuariosSelecionados.splice(i, 1);
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                        if (arrayUsuariosSelecionados[i].idUsuario == usuario.idUsuario) {
                                                            arrayUsuariosSelecionados.splice(i, 1);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (flag) {
                                            var este = $(this);
                                            $(this).fadeOut("fast", function () {
                                                este.remove();
                                            });

                                            if (opcoes.bolLajota) {
                                                if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                    $(".seletorselecionado").slideUp();
                                                    $(".menu_seletor li").not(".seletorselecionado").children(":first").trigger("click");
                                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");


                                                        //Retira a ação do botão inscrever
                                                        $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                    }
                                                }
                                            } else {
                                                if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0) {
                                                    $(".seletorselecionado").slideUp();
                                                    $(".menu_seletor li").not(".seletorselecionado").children(":first").trigger("click");
                                                    if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                        $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");


                                                        //Retira a ação do botão inscrever
                                                        $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                    }
                                                }
                                            }


                                            contadorUserSelecionado();
                                        }
                                    });
                                    /** Clicando nas carteirinhas na aba de selecionado (Remover) **/

                                    /** carteirinhas (Seleção Individual) **/
                                    $(".selecionarUsersSeletor").on("click", ".carteirinha_seletor", function (e) {
                                        e.preventDefault();

                                        if ($(this).hasClass("selecionarTudoGrupo")) { //esta em grupo

                                            if (opcoes.bolLajota) {

                                                if (arrayGrupoUltimaAcao.length > 0) {

                                                    for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                        for (var o = 0; o < arrayGrupoUltimaAcao[i].usuarios.length; o++) {
                                                            if (arrayGrupoUltimaAcao[i].usuarios[o].idUsuario == parseInt($(this).data("idusuario"))) {
                                                                arrayGrupoUltimaAcao[i].usuarios.splice(o, 1);
                                                                arrayGrupoUltimaAcao[i].bolCompleto = false;
                                                                arrayGrupoUltimaAcao[i].totalUsuarios = arrayGrupoUltimaAcao[i].totalUsuarios - 1;
                                                                if (arrayGrupoUltimaAcao[i].totalUsuarios == 0) {
                                                                    arrayGrupoUltimaAcao.splice(i, 1);
                                                                    if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                                        $(".seletorselecionado").slideUp();

                                                                        if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                                            $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");

                                                                            //Retira a ação do botão inscrever
                                                                            $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                                        }
                                                                    }
                                                                    var nomeGrupo = getNomeGrupo(tipoGlobalSelecionado);
                                                                    atualizarBotaoSelecionarTodos(nomeGrupo, tipoGlobalSelecionado);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (arrayGrupos.length > 0) {

                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                            if (arrayGrupos[i].usuarios[o].idUsuario == parseInt($(this).data("idusuario"))) {
                                                                arrayGrupos[i].usuarios.splice(o, 1);
                                                                arrayGrupos[i].bolCompleto = false;
                                                                arrayGrupos[i].totalUsuarios = arrayGrupos[i].totalUsuarios - 1;
                                                                if (arrayGrupos[i].totalUsuarios == 0) {
                                                                    arrayGrupos.splice(i, 1);
                                                                    if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                                        $(".seletorselecionado").slideUp();

                                                                        if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                                            $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");

                                                                            //Retira a ação do botão inscrever
                                                                            $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                                        }
                                                                    }
                                                                    var nomeGrupo = getNomeGrupo(tipoGlobalSelecionado);
                                                                    atualizarBotaoSelecionarTodos(nomeGrupo, tipoGlobalSelecionado);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                            } else {

                                                if (arrayGrupos.length > 0) {
                                                    for (var i = 0; i < arrayGrupos.length; i++) {
                                                        for (var o = 0; o < arrayGrupos[i].usuarios.length; o++) {
                                                            if (arrayGrupos[i].usuarios[o].idUsuario == parseInt($(this).data("idusuario"))) {
                                                                arrayGrupos[i].usuarios.splice(o, 1);
                                                                arrayGrupos[i].bolCompleto = false;
                                                                arrayGrupos[i].totalUsuarios = arrayGrupos[i].totalUsuarios - 1;
                                                                if (arrayGrupos[i].totalUsuarios == 0) {
                                                                    arrayGrupos.splice(i, 1);
                                                                    if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                                        $(".seletorselecionado").slideUp();

                                                                        if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                                            $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");

                                                                            //Retira a ação do botão inscrever
                                                                            $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);
                                                                        }
                                                                    }
                                                                    var nomeGrupo = getNomeGrupo(tipoGlobalSelecionado);
                                                                    atualizarBotaoSelecionarTodos(nomeGrupo, tipoGlobalSelecionado);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                            }

                                            $(this).removeClass("carteirinha_selected").removeClass("selecionarTudoGrupo");
                                            contadorUserSelecionado();
                                        } else { // não está em grupo

                                            var usuario = {
                                                idUsuario: parseInt($(this).data("idusuario")),
                                                strFoto: $(this).data("strfoto"),
                                                strNome: $(this).data("nome"),
                                                strApelido: $(this).data("strapelido"),
                                                idGrupo: $(this).data("idgrupo"),
                                                idTurma: $(this).data("idturma")
                                            };

                                            var found = false;

                                            /*
                                            //esse bloco que causa o bug se selecionar todos os usuarios do nada.
                                            //esse <for> não valida a nivel de visualização, não considera o nivel de detalhamento do grupo,
                                            //não valida o tipo de usuario selecionado. 
                                            //Assim quando descomentado ele pode selecionar todos os alunos de uma escola só pelo fato de ter selecionado
                                            //uma turma de professores. não faz sentido. julio falou para não apagar e manter comentado

                                            //comentario antigo -> Verificar se a turma deste usuario foi selecionado de alguma forma 

                                            //for (var i = 0; i < arrayGrupos.length; i++) {
                                            //if (arrayGrupos[i].idTurma == usuario.idTurma) {
                                            //arrayGrupos.splice(i, 1);
                                            //found = true;
                                            //$(".selecionarTodos").click();
                                            //break;
                                            //}
                                            //}*/


                                            if (!found) {

                                                if ($(this).hasClass("carteirinha_selected")) {
                                                    $(this).removeClass("carteirinha_selected");
                                                    if (arrayUsuarioUltimaAcao.length > 0 && opcoes.bolLajota) {
                                                        // se forma uma turma, deve excluir todos os usuario daquela turma 
                                                        //::: claudemir
                                                        if (usuario.isTurma || usuario.idUsuario == 0) {
                                                            arrayUsuarioUltimaAcao = excluirAlunoPorIdTurma(arrayUsuarioUltimaAcao, usuario.idTurma);
                                                        } else {
                                                            arrayUsuarioUltimaAcao = excluirAlunoPorIdAluno(arrayUsuarioUltimaAcao, usuario.idUsuario);
                                                        }
                                                    }
                                                    arrayUsuariosSelecionados = excluirAlunoPorIdAluno(arrayUsuariosSelecionados, usuario.idUsuario);

                                                    if ($(".seletorselecionado").is(":visible")) {
                                                        if (arrayUsuariosSelecionados.length == 0 && arrayGrupos.length == 0 && arrayUsuarioUltimaAcao.length == 0 && arrayGrupoUltimaAcao.length == 0) {
                                                            $(".seletorselecionado").slideUp();
                                                            if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("ativo")) {
                                                                $(".fancybox-inner .seletor .right").find("a:last").removeClass("ativo").addClass("inativo");

                                                                //Retira a ação do botão inscrever
                                                                $(".fancybox-inner .seletor .right").find("a:last").unbind("click", acaoBotaoInscrever);

                                                            }
                                                        }
                                                    }
                                                } else {
                                                    $(this).addClass("carteirinha_selected");

                                                    /** verifica se existe grupo na situação atual **/
                                                    var flagGrupo = false;
                                                    var grupoLocalizado = null;
                                                    var idEscola = $("#escolaRedeSeletor").size() > 0 ? parseInt($("#escolaRedeSeletor").val()) : 0;
                                                    var idUnidade = $("#unidadesSeletor").size() > 0 ? parseInt($("#unidadesSeletor").val()) : 0;
                                                    var idEnsino = parseInt($("#nivelEnsinoSeletor").val());
                                                    var idSerie = parseInt($("#intAnoSerieSeletor").val());
                                                    var idTurma = parseInt($("#turmasSeletor").val());


                                                    // verificar a qtd com $(".selecionarTodos").data("qtdusuarios") e ver se muda pra bolCompleto: true
                                                    //::::
                                                    var qtdTotal = parseInt($(".selecionarTodos").data("qtdusuarios"));

                                                    if (opcoes.bolLajota) {
                                                        if (arrayGrupoUltimaAcao.length > 0) {
                                                            for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                                if (arrayGrupoUltimaAcao[i].idEscola == idEscola && arrayGrupoUltimaAcao[i].idUnidade == idUnidade && arrayGrupoUltimaAcao[i].idEnsino == idEnsino && arrayGrupoUltimaAcao[i].idSerie == idSerie && arrayGrupoUltimaAcao[i].idTurma == idTurma && arrayGrupoUltimaAcao[i].tipo == tipoGlobalSelecionado) {
                                                                    arrayGrupoUltimaAcao[i].usuarios.push(usuario);
                                                                    arrayGrupoUltimaAcao[i].totalUsuarios = arrayGrupoUltimaAcao[i].totalUsuarios + 1;
                                                                    if (arrayGrupoUltimaAcao[i].totalUsuarios == qtdTotal) {
                                                                        arrayGrupoUltimaAcao[i].bolCompleto = true;
                                                                    }
                                                                    flagGrupo = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if (!flagGrupo) {
                                                            if (arrayGrupos.length > 0) {
                                                                for (var i = 0; i < arrayGrupos.length; i++) {
                                                                    if (arrayGrupos[i].idEscola == idEscola && arrayGrupos[i].idUnidade == idUnidade && arrayGrupos[i].idEnsino == idEnsino && arrayGrupos[i].idSerie == idSerie && arrayGrupos[i].idTurma == idTurma && arrayGrupos[i].tipo == tipoGlobalSelecionado) {

                                                                        arrayGrupos[i].usuarios.push(usuario);
                                                                        arrayGrupos[i].totalUsuarios = arrayGrupos[i].totalUsuarios + 1;
                                                                        if (arrayGrupos[i].totalUsuarios == qtdTotal) {
                                                                            arrayGrupos[i].bolCompleto = true;
                                                                        }
                                                                        flagGrupo = true;
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                        }

                                                    } else { // bolLajota = false
                                                        if (arrayGrupos.length > 0) {
                                                            for (var i = 0; i < arrayGrupos.length; i++) {
                                                                if (arrayGrupos[i].idEscola == idEscola && arrayGrupos[i].idUnidade == idUnidade && arrayGrupos[i].idEnsino == idEnsino && arrayGrupos[i].idSerie == idSerie && arrayGrupos[i].idTurma == idTurma && arrayGrupos[i].tipo == tipoGlobalSelecionado) {
                                                                    arrayGrupos[i].usuarios.push(usuario);
                                                                    arrayGrupos[i].totalUsuarios = arrayGrupos[i].totalUsuarios + 1;
                                                                    if (arrayGrupos[i].totalUsuarios == qtdTotal) {
                                                                        arrayGrupos[i].bolCompleto = true;
                                                                    }
                                                                    flagGrupo = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    /** verifica se existe grupo na situação atual **/

                                                    if (!flagGrupo) {
                                                        var flag = false;
                                                        if (opcoes.bolLajota) {
                                                            for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                                                if (arrayUsuarioUltimaAcao[i].idUsuario == usuario.idUsuario && usuario.idUsuario > 0) {
                                                                    flag = true;
                                                                }
                                                            }
                                                        } else {
                                                            for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                                if (arrayUsuariosSelecionados[i].idUsuario == usuario.idUsuario && usuario.idUsuario > 0) {
                                                                    flag = true;
                                                                }
                                                            }
                                                        }

                                                        if (!flag) {
                                                            if (opcoes.bolLajota) {
                                                                arrayUsuarioUltimaAcao.push(usuario);
                                                            } else {
                                                                arrayUsuariosSelecionados.push(usuario);
                                                            }
                                                        }
                                                    }

                                                    if (!($(".seletorselecionado").is(":visible"))) {
                                                        if (opcoes.bolLajota) {
                                                            if (arrayUsuariosSelecionados.length > 0 || arrayGrupos.length > 0 || arrayUsuarioUltimaAcao.length > 0 || arrayGrupoUltimaAcao.length > 0) {
                                                                $(".seletorselecionado").slideDown();
                                                                if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("inativo")) {
                                                                    $(".fancybox-inner .seletor .right").find("a:last").removeClass("inativo").addClass("ativo");

                                                                    //Adiciona a ação do botão inscrever
                                                                    $(".fancybox-inner .seletor .right").find("a:last").bind({
                                                                        click: acaoBotaoInscrever
                                                                    });
                                                                }
                                                            }
                                                        } else {
                                                            if (arrayUsuariosSelecionados.length > 0 || arrayGrupos.length > 0) {
                                                                $(".seletorselecionado").slideDown();
                                                                if ($(".fancybox-inner .seletor .right").find("a:last").hasClass("inativo")) {
                                                                    $(".fancybox-inner .seletor .right").find("a:last").removeClass("inativo").addClass("ativo");

                                                                    //Adiciona a ação do botão inscrever
                                                                    $(".fancybox-inner .seletor .right").find("a:last").bind({
                                                                        click: acaoBotaoInscrever
                                                                    });
                                                                }
                                                            }
                                                        }

                                                    }

                                                }
                                            }
                                            contadorUserSelecionado();
                                        }
                                    });
                                    /** Selecionar Carteirinhas (Seleção Individual)**/

                                    /** Seleção Menu Lateral **/
                                    $(".seletorselecionado").click(function (e) {

                                        e.preventDefault();
                                        $(".selecionadosUsersSeletor .pesquisa_seletor").val("");
                                        $(".menu_seletor li").removeClass("active");
                                        $(this).addClass("active");
                                        $(".selecionarUsersSeletor").hide();
                                        $(".selecionadosUsersSeletor").show();
                                        $("#listaCarteirinhaSeletorSelecionado").empty();
                                        if (opcoes.bolLajota) {
                                            for (var i = 0; i < arrayGrupoUltimaAcao.length; i++) {
                                                $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinhaGrupo(arrayGrupoUltimaAcao[i]));
                                            }
                                            for (var i = 0; i < arrayGrupos.length; i++) {
                                                $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinhaGrupo(arrayGrupos[i]));
                                            }

                                            $("#listaCarteirinhaSeletorSelecionado").append("<div class=\"clearfix\"></div><br>"); //hack para separar grupos de usuarios avulsos

                                            for (var i = 0; i < arrayUsuarioUltimaAcao.length; i++) {
                                                $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsuarioUltimaAcao[i], true));
                                            }
                                            for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsuariosSelecionados[i], true));
                                            }
                                        } else {
                                            for (var i = 0; i < arrayGrupos.length; i++) {
                                                $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinhaGrupo(arrayGrupos[i]));
                                            }

                                            $("#listaCarteirinhaSeletorSelecionado").append("<div class=\"clearfix\"></div><br>"); //hack para separar grupos de usuarios avulsos

                                            for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                                $("#listaCarteirinhaSeletorSelecionado").append(montaCarteirinha(arrayUsuariosSelecionados[i], true));
                                            }
                                        }

                                        $("#listaCarteirinhaSeletorSelecionado").on("click", ".ver_todos_tool", function (e) {
                                            if ($(".seletorselecionado").hasClass("active")) {
                                                e.preventDefault();

                                                var idGrupo = $(this).closest(".carteirinha_seletor").data("idgrupo");
                                                var grupo = "";
                                                for (var i = 0; i < arrayGrupos.length; i++) {
                                                    if (arrayGrupos[i].idGrupo == idGrupo) {
                                                        grupo = arrayGrupos[i];
                                                        break;
                                                    }
                                                }

                                                montarVisualizarParticipantesEntidade(grupo);
                                            }
                                        });


                                    });
                                    $(".selecionarTipoUsuarioSeletor").click(function (e) {
                                        loadTrocarAba = true;
                                        if (ajaxTotalUsuarios != null && ajaxTotalUsuarios.readyState < 4) {
                                            ajaxTotalUsuarios.abort();
                                        }
                                        if (!($(".selecionarUsersSeletor").is(":visible"))) {
                                            $(".selecionarUsersSeletor").show();
                                            $(".selecionadosUsersSeletor").hide();
                                        }
                                        var tipo = $(this).attr("tipo");
                                        if (tipo == "educador") {
                                            tipo = 1;
                                        } else if (tipo == "aluno") {
                                            tipo = 2;
                                        } else if (tipo == "responsavel") {
                                            tipo = 3;
                                        } else if (tipo == "seguidor") {
                                            tipo = 4;
                                        } else if (tipo == "admcoorddiret") {
                                            tipo = 5;
                                        } else if (tipo == "turma") {
                                            tipo = 7;
                                        } else { tipo = 1; }
                                        tipoGlobalSelecionado = tipo;
                                        $(".menu_seletor li").removeClass("active");
                                        $(".selecionarTipoUsuarioSeletor").parent().removeClass("active");
                                        $(".selecionarTodos").prop("disabled", false).removeClass("inativo");
                                        $(this).parent().addClass("active");

                                        /** Montar Carteirinha Usuario Pré Carregado **/

                                        $(".selecionarUsersSeletor .pesquisa_seletor").val("");

                                        criarLoad();
                                        if ($("#escolaRedeSeletor").size() > 0) {
                                            $("#escolaRedeSeletor")[0].selectedIndex = 0;
                                        }
                                        if ($("#unidadesSeletor").size() > 0) {
                                            $("#unidadesSeletor")[0].selectedIndex = 0;
                                        }
                                        var escola = $("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0;
                                        var unidade = $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0;
                                        var nivelEnsino = $("#nivelEnsinoSeletor").val();
                                        var intAnoSerie = $("#intAnoSerieSeletor").val();
                                        var turmasSeletor = $("#turmasSeletor").val();

                                        carregarComboSeletor(escola, unidade, nivelEnsino, intAnoSerie, turmasSeletor, tipo);
                                        carregarUsuarios(escola, 1, 20, unidade, nivelEnsino, intAnoSerie, turmasSeletor, tipo);

                                        var intervalTrocaAbaSeletor = window.setInterval(function () {
                                            if (!ajaxcarregarComboSeletor) {
                                                clearInterval(intervalTrocaAbaSeletor);
                                                intervalMuitoLoco = null;
                                                var nomeGrupo = getNomeGrupo(tipoGlobalSelecionado);
                                                atualizarBotaoSelecionarTodos(nomeGrupo, tipoGlobalSelecionado);

                                                /** Montar Carteirinha Usuario Pré Carregado **/

                                                if (tipo != 4 && tipo != 5) {
                                                    var flagFiltro = false;
                                                    //var flagFiltro2 = false;
                                                    //$(".selecionarUsersSeletor select").attr("disabled", true);
                                                    if ($("#escolaRedeSeletor").size() > 0) {
                                                        $("#escolaRedeSeletor").find("option[value=0]").attr("selected", true);
                                                        trocarTextoFiltrado($("#escolaRedeSeletor").children("option:selected").text());
                                                        flagFiltro = true;
                                                    }
                                                    if ($("#unidadesSeletor").size() > 0) {
                                                        $("#unidadesSeletor").find("option[value=0]").attr("selected", true);
                                                        //$("#unidadesSeletor").attr("disabled", true);
                                                        if (!flagFiltro) {
                                                            trocarTextoFiltrado($("#unidadesSeletor").children("option:selected").text());
                                                        }
                                                        //flagFiltro2 = true;
                                                    }

                                                    $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);

                                                    //$(".selecionarUsersSeletor select:first").attr("disabled", false);

                                                    $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);

                                                    $("#turmasSeletor").find("option[value=0]").attr("selected", true);

                                                    //trocarTextoFiltrado($(".selecionarUsersSeletor select:enabled").children("option:selected").text());
                                                } else {
                                                    //$(".selecionarUsersSeletor select").prop("disabled", true);
                                                    //$(".selecionarUsersSeletor #escolaRedeSeletor").prop("disabled", false);
                                                    //$(".selecionarUsersSeletor #unidadesSeletor").prop("disabled", false);
                                                }
                                                /** Libera carregar scroll de usuários **/
                                                idLoadedGlobal = false;
                                                todosUsers = false;
                                            }

                                        }, 100);
                                        /** Libera carregar scroll de usuários **/

                                    });
                                    /** Seleção Menu Lateral **/

                                    /** Filtro Turma **/
                                    $("body").on('change', '#turmasSeletor', function (e) {
                                        var idTurma = $(this).val();

                                        $(".selecionarTodos").prop("disabled", false).removeClass("inativo");
                                        $(".selecionarUsersSeletor .pesquisa_seletor").val("");
                                        var strTurma = getNomeGrupo(tipoGlobalSelecionado);
                                        trocarTextoFiltrado(strTurma);
                                        atualizarBotaoSelecionarTodos(strTurma, tipoGlobalSelecionado);
                                        idLoadedGlobal = false;
                                        todosUsers = false;
                                        $("#listaCarteirinhaSeletor").empty();
                                        criarLoad();
                                        carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), idTurma, tipoGlobalSelecionado);
                                    });
                                    /** Filtro Turma **/

                                    /** Filtro AnoSérie **/
                                    $("body").on('change', '#intAnoSerieSeletor', function (e) {
                                        var idSerie = parseInt($(this).val());
                                        var idEnsino = $("#nivelEnsinoSeletor").val();
                                        var idEscola = "";
                                        var idUnidade = "";

                                        $(".selecionarUsersSeletor .pesquisa_seletor").val("");
                                        $(".selecionarTodos").prop("disabled", false).removeClass("inativo");

                                        if ($("#escolaRedeSeletor").size() > 0) {
                                            idEscola = $("#escolaRedeSeletor").val();
                                        } else {
                                            idEscola = 0;
                                        }
                                        if ($("#unidadesSeletor").size() > 0) {
                                            idUnidade = $("#unidadesSeletor").val();
                                        } else {
                                            idUnidade = 0;
                                        }
                                        if (idSerie == 0) {
                                            $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                            $("#turmasSeletor").attr("disabled", true);
                                            idLoadedGlobal = false;
                                            todosUsers = false;
                                            $("#listaCarteirinhaSeletor").empty();
                                            criarLoad();
                                            var strSerie = getNomeGrupo(tipoGlobalSelecionado);
                                            trocarTextoFiltrado(strSerie);
                                            carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);
                                            atualizarBotaoSelecionarTodos(strSerie, tipoGlobalSelecionado);
                                            //getQtdTotalUsuarios();
                                        } else {
                                            var strSerie = "";
                                            $.ajax({
                                                url: "/ava/seletor/home/getTurmasByEscolaUnidadeEnsinoSerie",
                                                type: "POST",
                                                data: {
                                                    idEscola: idEscola,
                                                    idUnidade: idUnidade,
                                                    idEnsino: idEnsino,
                                                    idSerie: idSerie,
                                                    intTipo: tipoGlobalSelecionado,
                                                    bolCoordenador: opcoes.bolCoordenador
                                                },
                                                dataType: "json",
                                                success: function (data) {
                                                    var erro = parseInt(data.error);
                                                    if (erro == 0) {

                                                        $("#turmasSeletor").removeAttr("disabled");
                                                        $("#turmasSeletor").empty().html("<option value=\"0\">Todas as turmas</option>");
                                                        $(data.listaTurmas).each(function (i, e) {
                                                            $("#turmasSeletor").append("<option value=\"" + e.id + "\">" + e.strNome + "</option>");
                                                        });
                                                        idLoadedGlobal = false;
                                                        todosUsers = false;
                                                        $("#listaCarteirinhaSeletor").empty();
                                                        criarLoad();
                                                        carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);

                                                        //getQtdTotalUsuarios();
                                                    } else {
                                                        if (erro == 3) {
                                                            $("#turmasSeletor").attr("disabled", true);
                                                            $("#turmasSeletor").empty().html("<option value=\"0\">Sem Turmas</option>");
                                                            $("#listaCarteirinhaSeletor").empty().html(data.msg);

                                                        } else {
                                                            $("#turmasSeletor").empty().html("<option value=\"n/a\">" + data.msg + "</option>");
                                                        }
                                                    }
                                                    strSerie = getNomeGrupo(tipoGlobalSelecionado);
                                                    trocarTextoFiltrado(strSerie);
                                                    atualizarBotaoSelecionarTodos(strSerie, tipoGlobalSelecionado);
                                                },
                                                error: function (data) {
                                                    console.log(data.responseText);
                                                    $("#turmasSeletor").empty().html("<option value=\"n/a\">Erro</option>");
                                                }
                                            });
                                        }
                                    });
                                    /** Filtro AnoSérie **/
                                    /** Filtro Ensino **/
                                    $("body").on('change', '#nivelEnsinoSeletor', function (e) {
                                        var idEnsino = parseInt($(this).val());
                                        var idEscola = "";
                                        var idUnidade = "";

                                        $(".selecionarUsersSeletor .pesquisa_seletor").val("");
                                        $(".selecionarTodos").prop("disabled", false).removeClass("inativo");

                                        if ($("#escolaRedeSeletor").size() > 0) {
                                            idEscola = $("#escolaRedeSeletor").val();
                                        } else {
                                            idEscola = 0;
                                        }
                                        if ($("#unidadesSeletor").size() > 0) {
                                            idUnidade = $("#unidadesSeletor").val();
                                        } else {
                                            idUnidade = 0;
                                        }
                                        if (idEnsino == -1) {
                                            $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                            $("#intAnoSerieSeletor").attr("disabled", true);
                                            $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                            $("#turmasSeletor").attr("disabled", true);
                                            idLoadedGlobal = false;
                                            todosUsers = false;
                                            $("#listaCarteirinhaSeletor").empty();
                                            criarLoad();
                                            carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);
                                            var strEnsino = getNomeGrupo(tipoGlobalSelecionado);
                                            trocarTextoFiltrado(strEnsino);
                                            atualizarBotaoSelecionarTodos(strEnsino, tipoGlobalSelecionado);
                                            //getQtdTotalUsuarios();
                                        } else {
                                            var strEnsino = "";
                                            $.ajax({
                                                url: "/ava/seletor/home/getAnoSerie",
                                                type: "POST",
                                                data: {
                                                    idEscola: idEscola,
                                                    idUnidade: idUnidade,
                                                    idEnsino: idEnsino,
                                                    intTipo: tipoGlobalSelecionado,
                                                    bolCoordenador: opcoes.bolCoordenador
                                                },
                                                dataType: "json",
                                                success: function (data) {
                                                    var erro = parseInt(data.error);
                                                    if (erro == 1) {
                                                        $("#intAnoSerieSeletor").empty().html("<option value=\"n/a\">Não há séries/anos</option>");
                                                        //console.log(data);
                                                        $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#intAnoSerieSeletor").attr("disabled", true);
                                                        $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#turmasSeletor").attr("disabled", true);
                                                    } else {

                                                        $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#intAnoSerieSeletor").attr("disabled", true);
                                                        $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#turmasSeletor").attr("disabled", true);
                                                        $("#intAnoSerieSeletor").removeAttr("disabled");
                                                        $("#intAnoSerieSeletor").empty().html("<option value=\"0\">Todas as séries/anos</option>");
                                                        $(data.listaSerie).each(function (i, e) {
                                                            $("#intAnoSerieSeletor").append("<option value=\"" + e.idSerie + "\">" + e.strSerie + "</option>");
                                                        });
                                                        idLoadedGlobal = false;
                                                        todosUsers = false;
                                                        criarLoad();
                                                        strEnsino = getNomeGrupo(tipoGlobalSelecionado);
                                                        trocarTextoFiltrado(strEnsino);
                                                        $("#listaCarteirinhaSeletor").empty();
                                                        carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);

                                                        //getQtdTotalUsuarios();
                                                    }
                                                    atualizarBotaoSelecionarTodos(strEnsino, tipoGlobalSelecionado);
                                                },
                                                error: function (data) {
                                                    $("#intAnoSerieSeletor").empty().html("<option value=\"n/a\">Erro</option>");
                                                    console.log(data.responseText);
                                                }
                                            });
                                        }
                                    });
                                    /** Filtro Ensino **/
                                    /** Filtro Unidade **/
                                    $("body").on('change', '#unidadesSeletor', function (e) {
                                        var idUnidade = parseInt($(this).val());
                                        var idEscola = "";

                                        $(".selecionarUsersSeletor .pesquisa_seletor").val("");
                                        $(".selecionarTodos").prop("disabled", false).removeClass("inativo");
                                        if ($("#escolaRedeSeletor").size() > 0) {
                                            idEscola = $("#escolaRedeSeletor").val();
                                        } else {
                                            idEscola = 0;
                                        }

                                        if (idUnidade == 0) {
                                            $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);
                                            $("#nivelEnsinoSeletor").attr("disabled", true);
                                            $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                            $("#intAnoSerieSeletor").attr("disabled", true);
                                            $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                            $("#turmasSeletor").attr("disabled", true);
                                            idLoadedGlobal = false;
                                            todosUsers = false;
                                            $("#listaCarteirinhaSeletor").empty();
                                            criarLoad();
                                            var idEscolaRede = $("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0;
                                            var intInicio = $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1;
                                            var intFim = $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20;
                                            var idUnidade = $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0;
                                            var idNivelEnsino = $("#nivelEnsinoSeletor").val();
                                            var intAnoSerie = $("#intAnoSerieSeletor").val();
                                            var turmas = $("#turmasSeletor").val();
                                            var strUnidade = getNomeGrupo(tipoGlobalSelecionado);
                                            trocarTextoFiltrado(strUnidade);
                                            carregarUsuarios(idEscolaRede, intInicio, intFim, idUnidade, idNivelEnsino, intAnoSerie, turmas, tipoGlobalSelecionado);
                                            atualizarBotaoSelecionarTodos(strUnidade, tipoGlobalSelecionado);
                                            //getQtdTotalUsuarios();
                                        } else {
                                            var strUnidade = "";

                                            $.ajax({
                                                url: "/ava/seletor/home/getNivelEnsinoByEscolaOuUnidade/",
                                                type: "POST",
                                                data: {
                                                    id: idEscola,
                                                    intUnidade: idUnidade,
                                                    intTipo: tipoGlobalSelecionado,
                                                    bolCoordenador: opcoes.bolCoordenador
                                                },
                                                dataType: "json",
                                                success: function (data) {
                                                    var error = parseInt(data.error);
                                                    if (error == 1) {
                                                        $("#nivelEnsinoSeletor").empty().html("<option value=\"n/a\">Não há nível de ensino</option>");
                                                        //console.log(data.responseText);
                                                        $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#intAnoSerieSeletor").attr("disabled", true);
                                                        $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#turmasSeletor").attr("disabled", true);
                                                    } else {
                                                        $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);
                                                        $("#nivelEnsinoSeletor").attr("disabled", true);
                                                        $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#intAnoSerieSeletor").attr("disabled", true);
                                                        $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                        $("#turmasSeletor").attr("disabled", true);
                                                        $("#nivelEnsinoSeletor").removeAttr("disabled");
                                                        $("#nivelEnsinoSeletor").empty().html("<option value=\"-1\">Todos os níveis</option>");
                                                        $(data.listaEnsino).each(function (i, e) {
                                                            $("#nivelEnsinoSeletor").append("<option value=\"" + e.idEnsino + "\">" + e.strEnsino + "</option>");
                                                        });
                                                        idLoadedGlobal = false;
                                                        todosUsers = false;
                                                        $("#listaCarteirinhaSeletor").empty();
                                                        criarLoad();
                                                        carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);
                                                        strUnidade = getNomeGrupo(tipoGlobalSelecionado);
                                                        trocarTextoFiltrado(strUnidade);
                                                        //getQtdTotalUsuarios();
                                                    }
                                                    atualizarBotaoSelecionarTodos(strUnidade, tipoGlobalSelecionado);
                                                },
                                                error: function (data) {
                                                    $("#nivelEnsinoSeletor").empty().html("<option value=\"n/a\">Erro</option>");
                                                    console.log(data.reseponseText);
                                                }
                                            });
                                        }
                                    });
                                    /** Filtro Unidade **/

                                    /** Filtro Escola Rede **/
                                    $("body").on('change', '#escolaRedeSeletor', function (e) {
                                        var idEscola = parseInt($(this).val());

                                        $(".selecionarUsersSeletor .pesquisa_seletor").val("");
                                        $(".selecionarTodos").prop("disabled", false).removeClass("inativo");
                                        if ($("#unidadesSeletor").size() > 0) { // procura escolas

                                            if (idEscola == 0) {
                                                $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);
                                                $("#nivelEnsinoSeletor").attr("disabled", true);
                                                $("#unidadesSeletor").find("option[value=0]").attr("selected", true);
                                                $("#unidadesSeletor").attr("disabled", true);
                                                $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                $("#intAnoSerieSeletor").attr("disabled", true);
                                                $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                $("#turmasSeletor").attr("disabled", true);
                                                var strEscola = getNomeGrupo(tipoGlobalSelecionado);
                                                trocarTextoFiltrado(strEscola);
                                                idLoadedGlobal = false;
                                                todosUsers = false;
                                                $("#listaCarteirinhaSeletor").empty();
                                                criarLoad();
                                                carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);
                                                atualizarBotaoSelecionarTodos(strEscola, tipoGlobalSelecionado);
                                                //getQtdTotalUsuarios();
                                            } else {
                                                if (tipoGlobalSelecionado != 5 && tipoGlobalSelecionado != 4) {
                                                    var strEscola = "";

                                                    $.ajax({
                                                        url: "/ava/seletor/home/getUnidadesByIdEscola/" + idEscola,
                                                        type: "GET",
                                                        dataType: "json",
                                                        success: function (data) {
                                                            var error = parseInt(data.error);
                                                            if (error == 1) {
                                                                $("#unidadesSeletor").empty().html("<option value=\"n/a\">Não há unidades</option>");
                                                                //console.log(data.responseText);
                                                                $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                                $("#intAnoSerieSeletor").attr("disabled", true);
                                                                $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                                $("#turmasSeletor").attr("disabled", true);
                                                            } else {
                                                                $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);
                                                                $("#nivelEnsinoSeletor").attr("disabled", true);
                                                                $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                                $("#intAnoSerieSeletor").attr("disabled", true);
                                                                $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                                $("#turmasSeletor").attr("disabled", true);
                                                                $("#unidadesSeletor").empty().html("<option value=\"0\">Todas as unidades</option>");
                                                                $(data.listaUnidades).each(function (i, e) {
                                                                    $("#unidadesSeletor").append("<option value=\"" + e.id + "\">" + e.strUnidade + "</option>");
                                                                });
                                                                strEscola = getNomeGrupo(tipoGlobalSelecionado);
                                                                trocarTextoFiltrado(strEscola);
                                                                //$("#unidadesSeletor").append(data);
                                                                idLoadedGlobal = false;
                                                                todosUsers = false;
                                                                $("#listaCarteirinhaSeletor").empty();
                                                                criarLoad();
                                                                carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);

                                                                //getQtdTotalUsuarios();
                                                            }
                                                            atualizarBotaoSelecionarTodos(strEscola, tipoGlobalSelecionado);

                                                        },
                                                        error: function (data) {
                                                            $("#unidadesSeletor").empty().html("<option value=\"n/a\">Erro</option>");
                                                            console.log(data.responseText);
                                                        }
                                                    });
                                                }
                                            }
                                        } else { // busca nivel
                                            //var idEscola = $(this).val();
                                            if (idEscola == 0) {
                                                $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);
                                                $("#nivelEnsinoSeletor").attr("disabled", true);
                                                $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                $("#intAnoSerieSeletor").attr("disabled", true);
                                                $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                $("#turmasSeletor").attr("disabled", true);
                                                var strEscola = getNomeGrupo(tipoGlobalSelecionado);
                                                trocarTextoFiltrado(strEscola);
                                                idLoadedGlobal = false;
                                                todosUsers = false;
                                                $("#listaCarteirinhaSeletor").empty();
                                                criarLoad();
                                                carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado);
                                                atualizarBotaoSelecionarTodos(strEscola, tipoGlobalSelecionado);
                                                //getQtdTotalUsuarios();
                                            } else {
                                                var strEscola = "";

                                                criarLoad();
                                                $.ajax({
                                                    url: "/ava/seletor/home/getNivelEnsinoByEscolaOuUnidade",
                                                    type: "POST",
                                                    data: {
                                                        id: idEscola,
                                                        intUnidade: 0,
                                                        intTipo: tipoGlobalSelecionado,
                                                        bolCoordenador: opcoes.bolCoordenador
                                                    },
                                                    dataType: "json",
                                                    success: function (data) {
                                                        var error = parseInt(data.error);
                                                        if (error == 1) {
                                                            $("#nivelEnsinoSeletor").empty().html("<option value=\"n/a\">Não há nível de ensino</option>");
                                                            //console.log(data.responseText);
                                                            $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                            $("#intAnoSerieSeletor").attr("disabled", true);
                                                            $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                            $("#turmasSeletor").attr("disabled", true);
                                                        } else {
                                                            if (tipoGlobalSelecionado != 5 && tipoGlobalSelecionado != 4) {
                                                                $("#nivelEnsinoSeletor").find("option[value=-1]").attr("selected", true);
                                                                $("#nivelEnsinoSeletor").attr("disabled", true);
                                                                $("#intAnoSerieSeletor").find("option[value=0]").attr("selected", true);
                                                                $("#intAnoSerieSeletor").attr("disabled", true);
                                                                $("#turmasSeletor").find("option[value=0]").attr("selected", true);
                                                                $("#turmasSeletor").attr("disabled", true);
                                                                $("#nivelEnsinoSeletor").removeAttr("disabled");
                                                                $("#nivelEnsinoSeletor").empty().html("<option value=\"-1\">Todos os níveis</option>");
                                                                $(data.listaEnsino).each(function (i, e) {
                                                                    $("#nivelEnsinoSeletor").append("<option value=\"" + e.idEnsino + "\">" + e.strEnsino + "</option>");
                                                                });
                                                                $("#listaCarteirinhaSeletor").empty();
                                                                var strEscola = getNomeGrupo(tipoGlobalSelecionado);
                                                                trocarTextoFiltrado(strEscola);
                                                                idLoadedGlobal = false;
                                                                todosUsers = false;
                                                                //arrayProfessor.splice(0, arrayProfessor.length);
                                                                criarLoad();
                                                                carregarUsuarios(idEscola, 1, 20, 0, -1, 0, 0, tipoGlobalSelecionado);

                                                                //getQtdTotalUsuarios();
                                                            } else {
                                                                idLoadedGlobal = false;
                                                                todosUsers = false;
                                                                criarLoad();
                                                                carregarUsuarios(idEscola, 1, 20, 0, -1, 0, 0, tipoGlobalSelecionado);

                                                            }
                                                        }
                                                        atualizarBotaoSelecionarTodos(strEscola, tipoGlobalSelecionado);
                                                    },
                                                    error: function (data) {
                                                        $("#nivelEnsinoSeletor").empty().html("<option value=\"n/a\">Erro</option>");
                                                        console.log(data.reseponseText);
                                                    }
                                                });

                                            }

                                        }

                                    });
                                    /** Filtro Escola Rede **/

                                    /** Scroll dos usuarios **/
                                    $("#listaCarteirinhaSeletor").scroll(function () {
                                        if (!loadTrocarAba && !todosUsers && !idLoadedGlobal && $("#listaCarteirinhaSeletor").get(0).clientHeight + 20 >= ($("#listaCarteirinhaSeletor").get(0).scrollHeight - $("#listaCarteirinhaSeletor").get(0).scrollTop)) {
                                            idLoadedGlobal = true;

                                            carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 1, $("#listaCarteirinhaSeletor .carteirinha_seletor").size() + 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tipoGlobalSelecionado, "scrollMode");
                                        }

                                    });
                                    /** Scroll dos usuarios **/

                                    /** Botão Cancelar do lightBox **/
                                    $(".fancybox-inner .seletor .right").find("a:first").click(function (e) {
                                        opcoes.cancelarInsertLajota(arrayUsuariosSelecionados, arrayGrupos, principal);
                                        e.preventDefault();
                                        fechouCancelar = true;
                                        $.fancybox.close();
                                    });
                                    /** Botão Cancelar do lightBox **/

                                    /** Criar o box do tooltip e remover o overflow do lightbox **/
                                    removerOverFlowLightBox();
                                    /** Criar o box do tooltip e remover o overflow do lightbox **/

                                    //Carregar Usuarios
                                    criarLoad();
                                    var tpSelecionado = $(".menu_seletor li.active a").attr("tipo");
                                    if (tpSelecionado == "aluno") {
                                        tpSelecionado = 2;
                                    }
                                    else if (tpSelecionado == "responsavel") {
                                        tpSelecionado = 3;
                                    }
                                    else {
                                        tpSelecionado = 1;
                                    }
                                    carregarUsuarios($("#escolaRedeSeletor").size() > 0 ? $("#escolaRedeSeletor").val() : 0, 1, 20, $("#unidadesSeletor").size() > 0 ? $("#unidadesSeletor").val() : 0, $("#nivelEnsinoSeletor").val(), $("#intAnoSerieSeletor").val(), $("#turmasSeletor").val(), tpSelecionado);
                                    if (opcoes.bolSelecionarTodos) {
                                        getQtdTotalUsuarios();
                                    }
                                    /** LÓGICA APÓS ABRIR O LIGHTBOX TUDO DENTRO DO ONCOMPLETE **/
                                },
                                scrolling: 'no',
                                beforeShow: function () {
                                    $("html").css({ 'overflow': 'hidden' });
                                },
                                afterClose: function () {
                                    $("html").css({ 'overflow': 'scroll' });
                                },
                                beforeClose: function () {

                                    $("body").off('change', '#escolaRedeSeletor');
                                    $("body").off('change', '#turmasSeletor');
                                    $("body").off('change', '#intAnoSerieSeletor');
                                    $("body").off('change', '#nivelEnsinoSeletor');
                                    $("body").off('change', '#unidadesSeletor');

                                    /** Funções de quando fechar o lightbox **/
                                    if (!opcoes.bolLajota) {
                                        arrayUsuariosSelecionados.splice(0, arrayUsuariosSelecionados.length);
                                        arrayGrupos.splice(0, arrayGrupos.length);
                                    }
                                    if (opcoes.bolLajota && fechouCancelar && opcoes.bolAtualizarLajotaQuandoCancelar) {
                                        arrayGrupoUltimaAcao.splice(0, arrayGrupoUltimaAcao.length);
                                        arrayUsuarioUltimaAcao.splice(0, arrayUsuarioUltimaAcao.length);

                                        var cxDestinoAppend = null;
                                        if (opcoes.caixaLajotaExterna == null) {
                                            cxDestinoAppend = principal.find(".listaLajotinhas");
                                        } else {
                                            cxDestinoAppend = opcoes.caixaLajotaExterna.find(".listaLajotinhas");
                                        }

                                        $('.lajotinha:not(.todos)', cxDestinoAppend).remove();

                                        var bolPossuiInputBuscaDestino = ($('input.busca_especifico', cxDestinoAppend).length) ? true : false;

                                        for (var i = 0; i < arrayGrupos.length; i++) {
                                            if (bolPossuiInputBuscaDestino) {
                                                $('input.busca_especifico', cxDestinoAppend).before(montarLajotinhaGrupo(arrayGrupos[i]));
                                            } else {
                                                $(cxDestinoAppend).append(montarLajotinhaGrupo(arrayGrupos[i]));
                                            }
                                        }

                                        $('div.lajotinha.grupo', cxDestinoAppend).qtip(qtipOptions);

                                        for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                            if (bolPossuiInputBuscaDestino) {
                                                $('input.busca_especifico', cxDestinoAppend).before(montarLajotinhaUsuario(arrayUsuariosSelecionados[i], false));
                                            } else {
                                                $(cxDestinoAppend).append(montarLajotinhaUsuario(arrayUsuariosSelecionados[i], false));
                                            }
                                            $('.lajotinha.todos', cxDestinoAppend).remove();
                                        }
                                        if (cxDestinoAppend.children().size() > 0) {
                                            if (opcoes.botaoConclusao == null) {

                                                liberarBotaoInserirExterno(true);
                                            }
                                        } else {
                                            if (opcoes.botaoConclusao == null) {
                                                liberarBotaoInserirExterno(false);
                                            }
                                        }
                                    }

                                    /** Funções de quando fechar o lightbox **/

                                    if (opcoes.caixaLajotaExterna != null) {
                                        montarLajotinhaTodos($('.listaLajotinhas', opcoes.caixaLajotaExterna));
                                    } else {
                                        montarLajotinhaTodos($('.listaLajotinhas', principal));
                                    }

                                }
                            });
                        });

                        //Ação botão externo conclusão
                        if (opcoes.botaoConclusao == null) {
                            $(this).find(".submeter").click(function (e) {
                                if (principal.find(".lajotinha").size() > 0) {
                                    if (opcoes.bolLajota) {
                                        //opcoes.callback.insertLajota(arrayUsuariosSelecionados, arrayGrupos);
                                        opcoes.insertLajota(arrayUsuariosSelecionados, arrayGrupos, principal);
                                        arrayUsuariosSelecionados.splice(0, arrayUsuariosSelecionados.length);
                                        arrayGrupos.splice(0, arrayGrupos.length);
                                        if (opcoes.caixaLajotaExterna != null) {
                                            $('.lajotinha', opcoes.caixaLajotaExterna).remove();
                                        } else {
                                            $('.lajotinha', principal).remove();
                                        }
                                    } else {
                                        opcoes.insertLajota(arrayLajotas, arrayGrupos, principal);
                                        arrayLajotas.splice(0, arrayLajotas.length);
                                        arrayGrupos.splice(0, arrayGrupos.length);
                                        if (opcoes.caixaLajotaExterna != null) {
                                            $('.lajotinha', opcoes.caixaLajotaExterna).remove();
                                        } else {
                                            $('.lajotinha', principal).remove();
                                        }
                                    }
                                    var cxDestino = principal;
                                    if (opcoes.caixaLajotaExterna != null) {
                                        cxDestino = opcoes.caixaLajotaExterna;
                                    }

                                    if (cxDestino.find(".listaLajotinhas").children().size() > 0) {
                                        if (opcoes.caixaLajotaExterna == null) {
                                            liberarBotaoInserirExterno(true);
                                        }
                                    } else {
                                        if (opcoes.caixaLajotaExterna == null) {
                                            liberarBotaoInserirExterno(false);
                                        }
                                    }
                                }
                            });
                        } else {
                            opcoes.botaoConclusao.click(function (e) { // a logica para deletar os usuarios e limpar as caixas de lajotas fica por conta da aplicação (usar os métodos do plugin)
                                e.preventDefault();

                                if (opcoes.bolLajota) {
                                    opcoes.insertLajota(arrayUsuariosSelecionados, arrayGrupos, principal);
                                } else {
                                    opcoes.insertLajota(arrayLajotas, arrayGrupos, principal);
                                }
                            });
                        }

                        /** Ação que carrega usuários na instancia do seletor **/

                        if (opcoes.carregarUsuarios != null || opcoes.carregarGrupos != null) {

                            if (opcoes.carregarUsuarios != null && typeof (opcoes.carregarUsuarios) == "object" && (opcoes.carregarUsuarios instanceof Array) && opcoes.carregarUsuarios.length > 0) {

                                if (opcoes.bolLajota) {
                                    for (var i = 0; i < opcoes.carregarUsuarios.length; i++) {
                                        arrayUsuariosSelecionados.push(opcoes.carregarUsuarios[i]);
                                    }
                                }
                            }
                            if (opcoes.carregarGrupos != null && typeof (opcoes.carregarGrupos) == "object" && (opcoes.carregarGrupos instanceof Array) && opcoes.carregarGrupos.length > 0) {

                                if (opcoes.bolLajota) {
                                    for (var i = 0; i < opcoes.carregarGrupos.length; i++) {
                                        arrayGrupos.push(opcoes.carregarGrupos[i]);
                                    }
                                }
                            }

                            var cxDestinoAppend = null;
                            if (opcoes.caixaLajotaExterna == null) {
                                cxDestinoAppend = principal.find(".listaLajotinhas");
                            } else {
                                cxDestinoAppend = opcoes.caixaLajotaExterna.find(".listaLajotinhas");
                            }

                            $('.lajotinha', cxDestinoAppend).remove();

                            var bolPossuiInputBuscaDestino = ($('input.busca_especifico', cxDestinoAppend).length) ? true : false;

                            for (var i = 0; i < arrayGrupos.length; i++) {
                                if (bolPossuiInputBuscaDestino) {
                                    $('input.busca_especifico', cxDestinoAppend).before(montarLajotinhaGrupo(arrayGrupos[i]));
                                } else {
                                    $(cxDestinoAppend).append(montarLajotinhaGrupo(arrayGrupos[i]));
                                }
                            }

                            $('div.lajotinha.grupo', cxDestinoAppend).qtip(qtipOptions);

                            for (var i = 0; i < arrayUsuariosSelecionados.length; i++) {
                                if (bolPossuiInputBuscaDestino) {
                                    $('input.busca_especifico', cxDestinoAppend).before(montarLajotinhaUsuario(arrayUsuariosSelecionados[i], false));
                                } else {
                                    $(cxDestinoAppend).append(montarLajotinhaUsuario(arrayUsuariosSelecionados[i], false));
                                }
                            }
                            if (cxDestinoAppend.children().size() > 0) {
                                if (opcoes.botaoConclusao == null) {
                                    liberarBotaoInserirExterno(true);
                                }
                            } else {
                                if (opcoes.botaoConclusao == null) {
                                    liberarBotaoInserirExterno(false);
                                }
                            }

                            if (!opcoes.bolSeletorFinalizar) {
                                opcoes.usuarioGrupoAdicionado(arrayUsuariosSelecionados, arrayGrupos, principal);
                            }
                        }

                        //Ação botão externo conclusão

                    } // fim else seletor pode ser instanciado
                } // fim do verifica se existe instancia
            }); // fim do this.each()
        } // fim do init

    };

    $.fn.AvaSelector = function (parametros) {
        if (methods[parametros]) {
            return methods[parametros].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof parametros === "object" || !parametros) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Método " + method + " não existe no plugin AvaSelector");
        }

    };

    //$.fn.AvaSelector.getters = ["bolInstanciado"];
})(jQuery);