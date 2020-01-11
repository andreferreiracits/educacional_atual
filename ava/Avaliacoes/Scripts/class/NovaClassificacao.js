function NovaClassificacao(sNome) {

    var cls = this;

    this.nome = sNome;

    this.init = function () {
        this.callTipo('init');
    };
    this.initDefault = function () { }
    this.callTipo = function (func) {
        var funcDefault = func + "Default";
        func = func + this.nome;
        var args = [];

        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if (this[func]) {
            return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return this[funcDefault].apply(this, Array.prototype.slice.call(arguments, 1));
        }

    }
    /* filtros do select da busca */
    this.conteudoSelectFiltro = undefined;
    NovaClassificacao.openSelectFiltro = undefined;

    this.montarSelectFiltro = function (sContainer) {

        var link = $(sContainer + ' .tituloSelectClassificacao').attr('href');
        $(sContainer + ' .tituloSelectClassificacao').attr('href', FUNCAO_VAZIA);

        cls.conteudoSelectFiltro = new NovaArvore(sContainer + ' .arvoreSelectClassificacao', caminhoBase + link, false, undefined);
        

        cls.conteudoSelectFiltro.onChange = function (value, check, count) {
            //implementar o contador de "selects
            for (var i = 0; i < count.length; i++) {
                if ($(sContainer + ' .tituloSelectClassificacao span.totalSelect').length > i) {
                    var campoTotal = $(sContainer + ' .tituloSelectClassificacao span.totalSelect').get(i);
                    if (count[i] > 0) {
                        $(campoTotal).html('(' + count[i] + ')');
                    } else {
                        $(campoTotal).html('');
                    }
                }
            }
        }
        $(sContainer).combo({
            onOpen: function () {
                cls.conteudoSelectFiltro.carregar();
                if (NovaClassificacao.openSelectFiltro) {
                    //fechar o outro se estiver aberto
                    $(NovaClassificacao.openSelectFiltro).find('a.nome').click();
                }
                NovaClassificacao.openSelectFiltro = sContainer;


            },
            onClose: function () {
                NovaClassificacao.openSelectFiltro = undefined;
            }

        });
        return this;
    }

    /* quando for um filtro de questões com popup */
    this.lstFiltroMarcados = undefined;
    this.conteudoLstFiltro = undefined;
    this.dialogoListaFiltro = undefined;

    this.dialogoFiltroListaQuestoes = function (sDialogo, sBtnFiltro) {

        this.dialogoListaFiltro = sDialogo;

        $(this.dialogoListaFiltro).dialog({ dialogClass: 'SEC025_DIALOG',
            autoOpen: false, modal: true,
            width: 885, height: 560,
            position: ['center', 'center'],
            draggable: false, resizable: false,
            open: function () {
                cls.callTipo("carregarConteudoFiltro")
            },
            close: function () {
                cls.callTipo("cancelarFiltro")
            }
        });

        $(cls.dialogoListaFiltro + " .btnCancelar").click(function () {
            $(cls.dialogoListaFiltro).dialog('close');
        }).attr('href', 'javascript:void(0);');

        $(cls.dialogoListaFiltro + " .btnFiltro").click(function () {
            cls.callTipo("executarFiltro")
            
        }).attr('href', 'javascript:void(0);');

        $(sBtnFiltro).click(function () {
            
            $(cls.dialogoListaFiltro).dialog('open');
        }).attr('href', 'javascript:void(0);');

        return this;
    };


    this.carregarConteudoFiltroDefault = function () {
        if (!cls.conteudoLstFiltro) {
            cls.conteudoLstFiltro = new NovaArvore(cls.dialogoListaFiltro + ' .conteudoFiltroSelect', $(cls.dialogoListaFiltro + ' > form').attr('action'), false, undefined);
        }

        cls.conteudoLstFiltro.carregar();

        cls.lstFiltroMarcados = $(cls.dialogoListaFiltro + ' input[type="checkbox"]:checked');

    };

    this.cancelarFiltroDefault = function () {
        if (cls.lstFiltroMarcados) {
            $(cls.dialogoListaFiltro + ' input[type="checkbox"]').removeAttr('checked');
            cls.lstFiltroMarcados.attr('checked', 'checked');
        }

        cls.lstFiltroMarcados = undefined;
    }

    this.executarFiltroDefault = function () {
        cls.lstFiltroMarcados = $(cls.dialogoListaFiltro + ' input[type="checkbox"]:checked');
        $(cls.dialogoListaFiltro).dialog('close');
    }
    this.destroyDialogFiltro = function () {
        $(cls.dialogoListaFiltro).dialog("destroy");
        $(cls.dialogoListaFiltro).remove();
    }



    /* quando for para relacionar uma classificação a uma questão */
    this.conteudoAdicionar = undefined;
    this.conteudoEditar = undefined;
    this.dialogoAdicionar = undefined;
    this.formQuestao = undefined;
    this.onAdicionou = undefined;
    this.editavel = false
    this.dialogoAdicionarClassificacao = function (sDialogo, sBtnAdicionar, sForm, bolEditavel) {
        this.dialogoAdicionar = sDialogo;
        this.formQuestao = sForm;
        if (bolEditavel)
            this.editavel = bolEditavel;

        if (!$(this.dialogoAdicionar).is(':data(dialog)')) {
            $(this.dialogoAdicionar).dialog({ dialogClass: 'SEC025_DIALOG',
                autoOpen: false, modal: true,
                width: 885, height: 560,
                position: ['center', 'center'],
                draggable: false, resizable: false,
                open: function () {
                    cls.callTipo("carregarConteudoAdicionar", true)
                },
                close: function () {
                    var tipoEdit = $(cls.dialogoAdicionar + " input[name=hidEditarClassificacao]").val()
                    if (tipoEdit == 1)
                        clickSelecionar();
                    //$(cls.dialogoAdicionar + ' .btnEditarClassificacao').click();

                    cls.conteudoAdicionar = undefined;
                    cls.callTipo("fecharConteudoAdicionar");
                    //$(cls.dialogoAdicionar + ' .conteudoAdicionarSelect').html('');
                }
            });

            $(cls.dialogoAdicionar + " .btnCancelar").click(function () {
                $(cls.dialogoAdicionar).dialog('close');
            }).attr('href', 'javascript:void(0);');

            var linkAdicionar = $(cls.dialogoAdicionar + " .btnSalvar").attr('href');
            $(cls.dialogoAdicionar + " .btnSalvar").click(function () {
                cls.callTipo("relacionarQuestao", linkAdicionar);
            }).attr('href', 'javascript:void(0);');

            $(cls.dialogoAdicionar + " .instrucaoEditar").hide();

            //habilitar a edição
            if (this.editavel && $(this.dialogoAdicionar + ' .btnEditarClassificacao').length > 0) {
                $(this.dialogoAdicionar + ' .btnEditarClassificacao').show();
                var txtBotao = $(this.dialogoAdicionar + ' .btnEditarClassificacao').html().split("|");
                $(this.dialogoAdicionar + ' .btnEditarClassificacao').attr("txtHide", txtBotao[0]);
                $(this.dialogoAdicionar + ' .btnEditarClassificacao').attr("txtShow", txtBotao[1]);
                $(this.dialogoAdicionar + ' .btnEditarClassificacao').html(txtBotao[0]);

                $(this.dialogoAdicionar + ' .btnEditarClassificacao').click(function () {
                    var tipoEdit = $(cls.dialogoAdicionar + " input[name=hidEditarClassificacao]").val()
                    if (tipoEdit == 1) {
                        clickSelecionar();

                        cls.callTipo("carregarConteudoAdicionar", true)
                    } else {
                        $(this).html($(this).attr("txtShow"));
                        $(cls.dialogoAdicionar + " input[name=hidEditarClassificacao]").val("1");

                        $(cls.dialogoAdicionar + " .btnCancelar").hide();
                        $(cls.dialogoAdicionar + " .btnSalvar").hide();

                        $(cls.dialogoAdicionar + " .instrucaoSelecionar").hide();
                        $(cls.dialogoAdicionar + " .instrucaoEditar").show();


                        cls.callTipo("carregarEditarClassificacao", this);
                    }
                });

            } else {
                $(this.dialogoAdicionar + ' .btnEditarClassificacao').hide();
            }

            function clickSelecionar() {

                $(cls.dialogoAdicionar + ' .btnEditarClassificacao').html($(cls.dialogoAdicionar + ' .btnEditarClassificacao').attr("txtHide"));

                $(cls.dialogoAdicionar + " input[name=hidEditarClassificacao]").val("0");

                $(cls.dialogoAdicionar + " .btnCancelar").show();
                $(cls.dialogoAdicionar + " .btnSalvar").show();

                $(cls.dialogoAdicionar + " .instrucaoSelecionar").show();
                $(cls.dialogoAdicionar + " .instrucaoEditar").hide();
            }
        }

        $(sBtnAdicionar).click(function () {
            $(cls.dialogoAdicionar).dialog('open');
        }).attr('href', 'javascript:void(0);');

        return this;
    };

    this.fecharConteudoAdicionarDefault = function () {
        $(cls.dialogoAdicionar + ' .conteudoAdicionarSelect').html('');
    }

    this.carregarConteudoAdicionarDefault = function (bReload) {
        if (!cls.conteudoAdicionar || bReload) {
            cls.conteudoAdicionar = new NovaArvore(cls.dialogoAdicionar + ' .conteudoAdicionarSelect', $(cls.dialogoAdicionar + ' > form').attr('action'), false, undefined);
            cls.conteudoAdicionar.selectPaisFilhos = false;
        }

        cls.conteudoAdicionar.onLoad = function () {
            //limpa todos os checks
            carregando.mostrar();
            $(cls.dialogoAdicionar + ' input[type="checkbox"]:checked').removeAttr('checked');

            $.ajax({
                url: $(cls.dialogoAdicionar + ' .linkClassificacaoQuestao').attr('href'),
                type: 'POST',
                data: $(cls.formQuestao).serialize(),
                success: function (dados) {
                    carregando.esconder();
                    if (retornoErro(dados)) {
                        return;
                    }
                    var idsClassificacoes = eval(dados);
                    for (var i = 0; i < idsClassificacoes.length; i++) {
                        $(cls.dialogoAdicionar + ' input[type="checkbox"][value="' + idsClassificacoes[i] + '"]').click(); //.attr('checked', 'checked');
                        //idsClassificacoes
                    }

                }
            });

        }
        cls.conteudoAdicionar.carregar();
    };
    this.carregarEditarClassificacaoDefault = function (obj) {
        cls.conteudoAdicionar = new NovaArvore(cls.dialogoAdicionar + ' .conteudoAdicionarSelect', $(cls.dialogoAdicionar + ' .linkClassificacaoEdicao').attr('href'), true, undefined);
        cls.conteudoAdicionar.formExtraEdicao = cls.formQuestao;
        cls.conteudoAdicionar.carregar();
        cls.conteudoAdicionar.retornoAcao = function (id) {
            if (cls.conteudoAdicionar.CRIAR == id || cls.conteudoAdicionar.EDITAR == id || cls.conteudoAdicionar.EXCLUIR == id )
                obj.click();
        }
    }
    this.relacionarQuestaoDefault = function (link) {
        carregando.mostrar();
        //desabilitar os dados que não vão
        $(cls.formQuestao + "," + cls.dialogoAdicionar + " form").find('.notsend').attr('disabled', 'disabled');
        $.ajax({
            url: link,
            type: 'POST',
            data: $(cls.formQuestao + "," + cls.dialogoAdicionar + " form").serialize(),
            success: function (dados) {
                $(cls.formQuestao + "," + cls.dialogoAdicionar + " form").find('.notsend').removeAttr('disabled');
                carregando.esconder();
                if (retornoErro(dados)) {
                    return;
                }
                $(cls.dialogoAdicionar).dialog('close');
                if (cls.onAdicionou)
                    cls.onAdicionou();
            }
        });
    };

    this.destroyDialog = function () {
        $(cls.dialogoAdicionar).dialog("destroy");
        $(cls.dialogoAdicionar).remove();
    }

    /* tabela que lista as questões */
    this.tabela = undefined;

    this.tabelaClassificacao = function (sTabela, sForm, sFormExtra) {
        $('#' + sTabela).hide();
        $('#' + sForm).hide();

        this.tabela = new Tabela(sForm, sTabela, true, new Ordenacao("nome", true), retornarTabela, sFormExtra, retornoVazio, true);
        this.tabela.retornoCarregarTabela = function (dados) {
            if (retornoErro(dados)) {
                return;
            }
        }


        function retornoVazio(bol) {
            if (bol) {
                $('#' + sTabela).hide();
                $('#' + sForm).hide();
            } else {
                $('#' + sTabela).show();
                $('#' + sForm).show();
            }
        }

        function retornarTabela(acao, dados) {
            if (retornoErro(dados)) {
                return;
            }
            switch (acao.toLowerCase()) {
                case 'apagar':
                case 'excluir':
                    mensagem.exibir($(dados));
                    break;
            }
            cls.tabela.recarregarTabela();
        }

        return this;
    }

    this.atualizarTabela = function () {
        cls.tabela.recarregarTabela();
    }
    /* quando for possível editar uma classificação */


    /* para a busca de questões em uma prova */
    this.conteudoBuscaProva = undefined;
    this.containerBuscaProva = undefined;
    this.onBuscaSelecionada = undefined;
    this.buscaQuestaoProva = function (sContainer) {

        NovaClassificacao.listaBusca[sContainer] = this;
        NovaClassificacao.listaBuscaRef.push(sContainer);

        this.containerBuscaProva = sContainer;

        if ($(this.containerBuscaProva).length > 0) {
            cls.callTipo("carregarConteudoBusca")
        }

        return this;
    };

    this.carregarConteudoBuscaDefault = function () {
        if (!cls.conteudoBuscaProva) {
            cls.conteudoBuscaProva = new NovaArvore(cls.containerBuscaProva + ' .conteudoFiltroSelect', $(cls.containerBuscaProva).attr('action'), false, undefined);
        }

        cls.conteudoBuscaProva.carregar();
    };

    this.buscaProvaChecked = function () {
        return cls.callTipo("buscaProvaChecked")
    };
    this.buscaProvaCheckedDefault = function () {
        if ($(cls.containerBuscaProva + " input:checked").length > 0) {
            return true;
        }

        return false;
    };

    this.buscaProvaSelecionadas = function (fRetorno) {
        cls.onBuscaSelecionada = fRetorno
        cls.callTipo("buscaProvaSelecionadas")
    }
    this.buscaProvaSelecionadasDefault = function () {
        var idClassificacao = $(cls.containerBuscaProva + ' input[name="intTipoClassificacao"]').val();
        var check = $(cls.containerBuscaProva + " input:not(.notsend):checked").map(function () {
            return idClassificacao + '-' + (this.value.split(';')[0]);
        }).get().join(',');

        cls.onBuscaSelecionada(check);
    }


    /* para a busca de questões por criterio prova */
    this.conteudoCriterioProva = undefined;
    this.containerCriterioProva = undefined;
    this.formProva = undefined;
    this.buscaCriterioProva = function (sContainer, sForm) {
        
        NovaClassificacao.listaCriterio[sContainer] = this;
        NovaClassificacao.listaCriterioRef.push(sContainer);

        this.formProva = sForm;
        this.containerCriterioProva = sContainer;

        if ($(this.containerCriterioProva).length > 0) {
            cls.callTipo("carregarConteudoCriterio")
        }

        return this;
    };
    this.carregarConteudoCriterio = function() {
        cls.callTipo("carregarConteudoCriterio")
    }
    this.carregarConteudoCriterioDefault = function () {

        if (!cls.conteudoCriterioProva) {
            cls.conteudoCriterioProva = new NovaArvore(cls.containerCriterioProva + ' .conteudoAdicionarSelect', $(cls.containerCriterioProva).attr('action'), false, undefined);
            cls.conteudoCriterioProva.selectPaisFilhos = false;
        }

        cls.conteudoCriterioProva.onLoad = function () {
            //limpa todos os checks
            carregando.mostrar();
            $(cls.containerCriterioProva + ' input[type="checkbox"]:checked').removeAttr('checked');

            $.ajax({
                url: $(cls.containerCriterioProva + ' .linkCriterioProva').attr('href'),
                type: 'POST',
                data: $(cls.formProva).serialize(),
                success: function (dados) {
                    carregando.esconder();
                    if (retornoErro(dados)) {
                        return;
                    }
                    var idsClassificacoes = eval(dados);

                    for (var i = 0; i < idsClassificacoes.length; i++) {
                        $(cls.containerCriterioProva + ' input[type="checkbox"][value="' + idsClassificacoes[i] + '"]').click();
                    }

                }
            });

        }
        cls.conteudoCriterioProva.carregar();
    };

    this.buscaCriterioSelecionadas = function () {
        return cls.callTipo("buscaCriterioSelecionadas")
    }
    this.buscaCriterioSelecionadasDefault = function () {
        var idClassificacao = $(cls.containerCriterioProva + ' input[name="intTipoClassificacao"]').val();
        var check = $(cls.containerCriterioProva + " input:not(.notsend):checked").map(function () {
            return idClassificacao + '-' + (this.value.split(';')[0]);
        }).get().join(',');

        return check;
    }
    

    this.init();

}
NovaClassificacao.listaBusca = {};
NovaClassificacao.listaBuscaRef = [];
NovaClassificacao.buscaProvaCheckedRef = function (sRef) {
    if (NovaClassificacao.listaBusca['#'+sRef]) {
        return NovaClassificacao.listaBusca['#' + sRef].buscaProvaChecked()
    }
    return false;
};
NovaClassificacao.listaCriterio = {};
NovaClassificacao.listaCriterioRef = [];

$(document).click(function (e) {
    if (!NovaClassificacao.openSelectFiltro)
        return;

    if ($(e.target).parents(NovaClassificacao.openSelectFiltro).length > 0) {
        return;
    }
    if ($(e.target).parents('.arvoreSelectClassificacao').length == 0) {
        $(NovaClassificacao.openSelectFiltro).find('a.nome').click();
    }

})