function Classificacao(intTipoClassifica, sDialogo, sFormPrincipal, sFormClass, sFormTabela, bEditavel) {

    Classificacao._instancias.push(this);

    var classificacao = this;

    this.dialogo = sDialogo;
    this.tipoAtual = intTipoClassifica;
    this.form = sFormPrincipal;
    this.formClass = sFormClass;
    this.formTabela = sFormTabela;

    this.novoDialogo = undefined;
    this.novaArvore = undefined;

    this.onAdicionarFiltro = undefined;
    this.onCancelarFiltro = undefined;
    this.onAbriuNovoDialogo = undefined;

    this.lstTipos = lstTipoClassificacao;// ["Default", "Habilidade", "Assunto", "AssuntoPesquisaOpniao"]


    this.editavel = bEditavel;

    this.caminhoLoad = '/Questoes/CarregarArvoreTipoClassificacao/';
    

    //validar se o tipo está de acordo
    if (this.tipoAtual >= this.lstTipos.length) {
        throw ('O tipo de classificação não pertence a lista de tipos');
        return;
    }
    this.nome = this.lstTipos[this.tipoAtual];

    //this.arvore = 'tree' + this.nome;
    this.nometabela = 'tblList' + this.nome;

    this.bolExtras = false;
    this.tblList;

    this.hideBtn;

    this.onFiltroDialogo = undefined;



    /**
    * Inicializa a classe setando as caixas de dialogo q irão conter a arvore de classificacao
    */
    this.init = function () {
        
        //verifica se o dialogo já está sendo utilizado, pois será reaproveitado
        if (!$(this.dialogo).is(':data(dialog)')) {
            $(this.dialogo).dialog({ dialogClass: 'SEC025_DIALOG',
                autoOpen: false, modal: true,
                width: 885, height: 560,
                position: ['center', 'center'],
                draggable: false, resizable: false
            });
        }
        this.botaoAbrir();

        $('#btnCancelar' + this.nome).attr('href', FUNCAO_VAZIA).click(function () { classificacao.cancelarDialogo(); });

        $('#btnSalvar' + this.nome).attr('href', FUNCAO_VAZIA).click(function () { classificacao.salvarDialogo(); });
        //$('#btnSalvar' + this.nome).attr('href', FUNCAO_VAZIA).unbind('click');
        // $('#btnSalvar' + this.nome).attr('href', FUNCAO_VAZIA).bind('click', function () { classificacao.salvarDialogo(); });

        $('#btnFiltro' + this.nome).attr('href', FUNCAO_VAZIA).click(function () { classificacao.filtroDialogo(); });

        this.clearFiltro();

        $(this.dialogo + ' .btnExtra').hide();

        this.btnEditar();

        if (this.formTabela != '') {
            if ($('#' + this.formTabela).length > 0) {
                $('#' + classificacao.nometabela).hide();
                $('#' + classificacao.formTabela).hide();
                this.tblList = new Tabela(this.formTabela, this.nometabela, true, new Ordenacao("nome", true), this.retornarTabela, this.form + "," + this.formClass, this.retornoVazio, true);
                this.tblList.retornoCarregarTabela = function (dados) {
                    classificacao.retornoErro(dados);
                }
            }
        }

        //ajustar botão de edição
        $(this.dialogo + ' .btnEditarClassificacao')

        this.callTipo('init');
    }

    this.initDefault = function () {
    }
    /**
    * Seta qual será o botão que irá abrir a caixa de classificacao
    * @param string sPrefix indica qual o prefixo do botão
    */
    this.botaoAbrir = function (sPrefix) {

        if (sPrefix) {
            $(sPrefix + this.nome).attr('href', FUNCAO_VAZIA).click(function () { classificacao.abrirDialogo(); });
            return;
        }

        if ($('#btnAdicionar' + this.nome).length > 0) {
            $('#btnAdicionar' + this.nome).attr('href', FUNCAO_VAZIA).click(function () { classificacao.abrirDialogo(); });
        }
    }


    this.clearFiltro = function () {
        $("#lstClassificacaoTipo_" + this.tipoAtual).val(''); ;
    }
    /**
    * Caso o dialogo tenha mais algum botão além dos padroes (Cancelar e Salvar)
    * @param string indica qual o prefixo do botão
    * @param function função que será executada no click do botao
    */
    this.addBotaoExtra = function (sPrevix, fAcao) {
        this.bolExtras = true;
        $(sPrevix + this.nome).attr('href', FUNCAO_VAZIA).click(function () { fAcao(); });
    }

    /**
    * Indica quais botões não deverão aparecer
    * @param string indica qual os botoes
    */
    this.hideBotoes = function (sBtns) {
        this.hideBtn = sBtns;
    }

    this.btnEditar = function () {
        if ($(this.dialogo + ' .btnEditarClassificacao').length <= 0)
            return;

        if (!this.editavel) {
            $(this.dialogo + ' .btnEditarClassificacao').hide();
            return;
        }

        var txtBotao = $(this.dialogo + ' .btnEditarClassificacao').html().split("|");

        $(this.dialogo + ' .btnEditarClassificacao').attr("txtHide", txtBotao[0]);
        $(this.dialogo + ' .btnEditarClassificacao').attr("txtShow", txtBotao[1]);

        $(this.dialogo + ' .btnEditarClassificacao').html(txtBotao[0]);

        $(this.dialogo + ' .btnEditarClassificacao').click(function () {
            var tipoEdit = $(classificacao.formClass + " input[name=hidEditarClassificacao]").val()

            var editavel = false;

            if (tipoEdit == 1) {
                $(this).html($(this).attr("txtHide"));
                $(classificacao.formClass + " input[name=hidEditarClassificacao]").val("0");

                $('#btnCancelar' + classificacao.nome).show();
                $('#btnSalvar' + classificacao.nome).show();

                $(classificacao.dialogo + " .instrucaoSelecionar").show();
                $(classificacao.dialogo + " .instrucaoEditar").hide();
            } else {
                $(this).html($(this).attr("txtShow"));
                $(classificacao.formClass + " input[name=hidEditarClassificacao]").val("1");

                $('#btnCancelar' + classificacao.nome).hide();
                $('#btnSalvar' + classificacao.nome).hide();

                $(classificacao.dialogo + " .instrucaoSelecionar").hide();
                $(classificacao.dialogo + " .instrucaoEditar").show();
                editavel = true;
            }

            classificacao.callTipo('renderEdit');
            //var arvore = new Arvore('area' + classificacao.nome, classificacao.arvore, caminhoBase + '/Questoes/CarregarArvoreTipoClassificacao/', undefined, true, editavel, true, classificacao.form + "," + classificacao.formClass, undefined, classificacao.retornoArvore);
        });

    }

    /**
    * Chama uma função de acordo com o seu tipo
    * @param string prefixo da função
    */
    this.callTipo = function (func) {
        var funcDefault = func + this.lstTipos[0];
        func = func + this.lstTipos[this.tipoAtual];
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

    /**
    * abre a caixa com a lista das classificacoes
    */
    this.abrirDialogo = function (bolFiltro) {

        $(this.dialogo).dialog('open');
        $(this.hideBtn).hide();

        if (this.editavel) {
            if ($(this.dialogo + ' .btnEditarClassificacao').length > 0) {
                $(this.dialogo + " input[name=hidEditarClassificacao]").val("0")
                $(this.dialogo + ' .btnEditarClassificacao').html($(this.dialogo + ' .btnEditarClassificacao').attr("txtHide"));
            }
        }
        $(this.dialogo + " .instrucaoSelecionar").show();
        $(this.dialogo + " .instrucaoEditar").hide();

        //caso tenha botoes extras mostra, senão mostra os originais
        if (this.bolExtras) {
            $(this.dialogo + ' .btnExtra').show();
        } else {
            $(this.dialogo + ' .btnExtra').hide();
            $('#btnCancelar' + this.nome).show();
            $('#btnSalvar' + this.nome).show();
        }

        if (bolFiltro) {
            $("#btnSalvar" + this.nome).hide();
            $("#btnFiltro" + this.nome).show();
        } else {
            $("#btnSalvar" + this.nome).show();
            $("#btnFiltro" + this.nome).hide();
        }
        //se abriu com filtro irá esconder ou mostrar alguns botoes

        this.callTipo('render', bolFiltro);

        if (this.onAbriuDialogo) {
            this.onAbriuDialogo(bolFiltro)
        }
    }
    this.abrirDialogoParaFiltro = function () {
        classificacao.abrirDialogo(true);
    }
    this.abrirDialogoNovoFiltro = function (sBtnFiltro, sDialogo) {

        classificacao.novoDialogo = sDialogo;

        var link = $(sBtnFiltro).attr('href');
        $(sBtnFiltro).click(function () {
            classificacao.novoConteudoClassificacao(link);
        }).attr('href', FUNCAO_VAZIA);

        //verifica se o dialogo já está sendo utilizado, pois será reaproveitado
        if (!$(classificacao.novoDialogo).is(':data(dialog)')) {
            $(classificacao.novoDialogo).dialog({ dialogClass: 'SEC025_DIALOG',
                autoOpen: false, modal: true,
                width: 885, height: 560,
                position: ['center', 'center'],
                draggable: false, resizable: false
            });
        }

        $('#btnCancelarFiltro' + this.nome).attr('href', FUNCAO_VAZIA).click(function () {
            $(classificacao.novoDialogo).dialog('close');
            if (classificacao.onCancelarFiltro)
                classificacao.onCancelarFiltro();
        }); 
        $('#btnAdicionarFiltro' + this.nome).attr('href', FUNCAO_VAZIA).click(function () {
            $(classificacao.novoDialogo).dialog('close');
            if (classificacao.onAdicionarFiltro)
                classificacao.onAdicionarFiltro();
        });

        //dlgHabilidadesFiltro
    }
    this.novoConteudoClassificacao = function (lnkArvore) {
        $(classificacao.novoDialogo).dialog('open');

        this.callTipo('renderNovaArvore', lnkArvore);

        if (this.onAbriuNovoDialogo) {
            this.onAbriuNovoDialogo()
        }
    }
    /**
    * fecha a caixa de dialogo
    */
    this.cancelarDialogo = function() {
        $(this.dialogo).dialog('close');
    }

    /**
    * ação padrão para salvar a classificação a questao
    */
    this.salvarDialogo = function () {
        carregando.mostrar();
        classificacao.callTipo("salvar");
    }
    this.salvarDefault = function () {
        
        $.ajax({
            url: caminhoBase + '/Questoes/SalvarTipoClassificacao/',
            data: $(classificacao.form + "," + classificacao.formClass).serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { classificacao.retornoSalvar(dados); }
        });
    }
    /**
    * remove o dialogo da página
    */
    this.destroyDialog = function () {
        $(this.dialogo).dialog("destroy");
        $(this.dialogo).remove();
    }

    /**
    * retorno do salvar a classificacao
    */
    this.retornoSalvar = function (dados) {
        carregando.esconder();
        if (classificacao.retornoErro(dados)) {
            return;
        }
        if (this.tblList) {
            this.tblList.recarregarTabela();
        }
        $(this.dialogo).dialog('close');
    }

    /**
    * retorno da tabela que contem as classificacoes da questao
    */
    this.retornarTabela = function (acao, dados) {
        if (classificacao.retornoErro(dados)) {
            return;
        }
        switch (acao.toLowerCase()) {
            case 'apagar':
            case 'excluir':
                mensagem.exibir($(dados));
                break;
        }
        classificacao.tblList.recarregarTabela();
    }

    /**
    * caso a tabela retorne vazia
    */
    this.retornoVazio = function (bol) {
        if (bol) {
            $('#' + classificacao.nometabela).hide();
            $('#' + classificacao.formTabela).hide();
        } else {
            $('#' + classificacao.nometabela).show();
            $('#' + classificacao.formTabela).show();
        }
    }

    this.retornoRender = function (dados) {
        classificacao.retornoErro(dados);
    }
    this.retornoRenderEdit = function (dados) {
        classificacao.retornoErro(dados);
    }
    /**
    * retorn uma string com a lista dos ids selecionados
    * @param bool se dever ou não concatenar o tipo a cada um dos ids
    */
    this.getSelecionados = function (bolTipo) {
        return this.callTipo('getSelecionados', bolTipo);
    }
    this.getSelecionadosDefault = function (bolTipo) {
        var check = $(this.formClass + " input:checked").map(function () {
            if (bolTipo) {
                return classificacao.tipoAtual + '-' + this.value;
            } else {
                return this.value;
            }
        }).get().join(',');

        return check;

    }
    this.isCheck = function () {
        return this.callTipo('isCheck');
    }
    this.isCheckDefault = function () {
        if ($.trim(this.callTipo('getSelecionados')) != "") {
            return true;
        } else {
            return false;
        }
    }
    this.filtroDialogo = function () {
        this.callTipo('filtroDialogo');
    }
    this.filtroDialogoDefault = function () {

        $("#lstClassificacaoTipo_" + classificacao.tipoAtual).val(classificacao.getSelecionados(true));
        classificacao.cancelarDialogo();

        if (this.onFiltroDialogo) {
            this.onFiltroDialogo();
        }
    }
    /* renderizar a tela de classificação */

    this.renderDefault = function (bolFiltro) {
        if(bolFiltro)
            var arvore = new Arvore('area' + this.nome, 'tree' + this.nome, caminhoBase + this.caminhoLoad, undefined, true, false, true, this.formClass, undefined, this.retornoRender);
        else
            var arvore = new Arvore('area' + this.nome, 'tree' + this.nome, caminhoBase + this.caminhoLoad, undefined, true, false, true, this.form + "," + this.formClass, undefined, this.retornoRender);
    }
    this.renderEditDefault = function () {
        var arvore = new Arvore('area' + classificacao.nome, 'tree' + classificacao.nome, caminhoBase + this.caminhoLoad, undefined, true, classificacao.editavel, true, classificacao.form + "," + classificacao.formClass, undefined, classificacao.retornoRenderEdit);
    }
    
    this.renderNovaArvoreDefault = function (lnkArvore) {
        if(!this.novaArvore)
            this.novaArvore = new NovaArvore(classificacao.novoDialogo + ' .arvoreFiltroSelect', lnkArvore, false, undefined);

        this.novaArvore.carregar();
        /*if(bolFiltro)
            //var arvore = new Arvore('area' + this.nome, 'tree' + this.nome, caminhoBase + this.caminhoLoad, undefined, true, false, true, this.formClass, undefined, this.retornoRender);
        else
            //var arvore = new Arvore('area' + this.nome, 'tree' + this.nome, caminhoBase + this.caminhoLoad, undefined, true, false, true, this.form + "," + this.formClass, undefined, this.retornoRender);
            */
    }

    this.render = function (bolFiltro) {
        this.callTipo('render', bolFiltro);
    }
    this.retornoErro = function (dados) {
        return retornoErro(dados);
    }
    

    this.init();
}

Classificacao._instancias = [];

Classificacao.ById = function (id) {
    for (var i = 0; i < Classificacao._instancias.length; i++) {
        if (Classificacao._instancias[i].tipoAtual == id) {
            return Classificacao._instancias[i];
        }
    }
    return;
}

Classificacao.ByName = function (nome) {
    for (var i = 0; i < Classificacao._instancias.length; i++) {
        if (Classificacao._instancias[i].nome == nome) {
            return Classificacao._instancias[i];
        }
    }
    return;
}
Classificacao.ByFormClass = function (formClass) {
    for (var i = 0; i < Classificacao._instancias.length; i++) {
        if (Classificacao._instancias[i].formClass == formClass) {
            return Classificacao._instancias[i];
        }
    }
    return;
}