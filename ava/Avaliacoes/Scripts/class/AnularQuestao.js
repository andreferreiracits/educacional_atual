function AnularQuestoes(sDialogo, sCancelar, sConcluir, fRetorno) {
    var aq = this;

    this.dialogo = sDialogo;
    this.form = this.dialogo + ' form '
    this.btnCancelar = sCancelar;
    this.btnConcluir = sConcluir;
    this.acaoRetorno = fRetorno;
    this.tblListaAnular;

    this.init = function () {

        $(this.dialogo).dialog({ dialogClass: 'SEC025_DIALOG',
            autoOpen: false, modal: true,
            width: 885, height: 560,
            position: ['center', 'center'],
            draggable: false, resizable: false
        });

        $(this.btnCancelar).click(function () { $(aq.dialogo).dialog("close"); });
        $(this.btnConcluir).click(aq.Confirm);

        $(this.dialogo + " #btnNaoAnular").click(function () { $("#boxConfirAnular").hide() });

        $(this.dialogo + " #btnSimAnular").click(aq.Executar);
        $(this.dialogo + " #btnCancelarAnularConfirm").click(function () { $(aq.dialogo).dialog("close"); });

        var nomeForm = $(this.form).attr('id')
        this.tblListaAnular = new Tabela(nomeForm, 'tblQuestoes', false, new Ordenacao("modificado", true), undefined);
        this.tblListaAnular.retornoCarregarTabela = this.retornoCarregarTabela
    };


    this.Abrir = function (id) {
        $("#idAplicacaoSalvar").val(id)
        $(this.dialogo).dialog("open");
        $("#boxConfirAnular").hide();

        this.tblListaAnular.recarregarTabela();

    }

    this.retornoCarregarTabela = function (dados) {
        if ($(dados).hasClass('erro')) {
            aq.acaoRetorno(dados);
        }
        $(aq.dialogo + " .cabecalhoAnular").html($(aq.dialogo + " tfoot>tr>td").html())
        $(aq.dialogo + " tfoot").remove();
        var nomeForm = $(aq.form).attr('id')
        new QuestaoResumo('#tblQuestoes', "a.tooltip", aq.erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra"); ;
    }

    this.Confirm = function () {
        $("#boxConfirAnular").show();
    }

    this.Executar = function() {
        carregando.mostrar();
        $.ajax({
            url: caminhoBase + '/Agendamento/AnularQuestoes/',
            data: $(aq.form).serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { aq.retornoExecutar(dados); }
        });
    }
    this.retornoExecutar = function(dados) {

        carregando.esconder();
        $(aq.dialogo).dialog('close');

        if(aq.acaoRetorno){
            aq.acaoRetorno(dados);
        }

    }

    this.erroRetornoQuestaoResumo = function(dados) {
        aq.acaoRetorno(dados);
    }

    this.init();
}