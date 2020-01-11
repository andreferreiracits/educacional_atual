var tblLista, tblImpressao;
var mensagem, confirm, dataMode, ajuda;

/* ************************************* CRIAÇÃO PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);
    ajuda = new Ajuda();

    ajuda.criar("helpCadAvaliacao", "helpCadAvaliacaoCaixa", RecursosJS["msg018"]);

    $("input#txtModificadoInicial, input#txtModificadoFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true,
        constrainInput: false
    });

    dataMode.numero("#txtTotalQuestoes");

    
    dataMode.data("input#txtModificadoInicial, input#txtModificadoFinal");
    tblLista = new Tabela('frmTabela', 'tblProvas', false, new Ordenacao("modificado", true), retornarAcao);
    tblLista.retornoCarregarTabela = function (dados) {
        retornoErro(dados);

        this.aplicarIrPara();
    }
    tblLista.onExecutarAcao = function (acao) {
        if (acao.toLowerCase() == "editar" || acao.toLowerCase() == "excluir") {
            carregando.mostrar();
        }
    }

    $('#dlgImpressao').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $('#btnCancelarImpressao').click(function () { $('#dlgImpressao').dialog('close'); });

    $('#btnConcluirImpressao').click(imprimirAvaliacao);

    $('#slcStatus').selectcombo();
    $('#slcTipoSelecao').selectcombo();

    aplicarAcaoMassa();

    setTimeout(tblLista.executarNovoFiltro, 100);
}


function retornarAcao(acao, dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (acao.toLowerCase()) {
        case 'apagar':
            if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirMassa);
                return;
            }
            mensagem.exibir($(dados));
        case 'excluir':
            carregando.esconder();
            if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluir);
                return;
            }
            mensagem.exibir($(dados));
            break;
        case 'excluida':
            carregando.esconder();
            mensagem.exibir($(dados));
            break;
        case 'adicionar':
            mensagem.exibir($(dados));
            break;
        case 'editar':
            checkEditar(dados);
            return;
            break;
        case 'status':
            mensagem.exibir($(dados));
            carregando.esconder();
            tblLista.executarNovoFiltro();
            return;
            break;
        case 'compartilhar':
            mensagem.exibir($(dados));
            carregando.esconder();
            tblLista.executarNovoFiltro();
            return;
            break;
    }
    tblLista.recarregarTabela();
}

function checkEditar(dados) {
    if (retornoErro(dados)) {
        return;
    }
    if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
        carregando.esconder();
        confirm.exibir($(dados), this.confirmaEditarEmUso);
        return;
    }
    location.href = $(dados).text();
}
function confirmaEditarEmUso() {
    carregando.mostrar();
    var idProva = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Criacao/EditarEmUso/' + idProva,
        data: $(this).serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornarConfirmarEditarEmUso(dados); }
    });
}
function retornarConfirmarEditarEmUso(dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    location.href = $(dados).text();
}

function confirmaExcluir() {
    carregando.mostrar();
    var idProva = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase+'/Criacao/ExcluirProva/' + idProva,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornarAcao('excluida', dados); }
    });
}

function confirmaExcluirMassa() {
    tblLista.executarAcaoMassa('apagar', true);
}
/* impressao */
function ImprimirProva(id) {
    $("#dlgImpressao #boxDownloadModelos").html("");
    $("#dlgImpressao #boxDownloadModelos").hide();

    var idProva = id;
    $('#dlgImpressao').dialog('open');

    var load = document.createElement("div");
    load.className = "carregando";

    $("#dlgImpressao .popupConteudo").html($(load));

    $.ajax({
        url: caminhoBase + '/Criacao/ImprimirAvaliacao/' + idProva,
        cache: false,
        type: "GET",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                $('#dlgImpressao').dialog('close');
                return;
            }
            
            $("#dlgImpressao .popupConteudo").html(dados);

            /*criarBotaoExpandirArea('#btnConfigAvancada', '.configAvancadas', function (isShow) {
                if (!isShow) {
                    alterarBotaoExpandirArea($('#btnShowQuestoes'), false);
                }
            })*/
            criarBotaoExpandirArea('#btnShowQuestoes', '#boxShowQuestoesRO');
            if (!tblImpressao) {
                tblImpressao = new Tabela('formImprimirAvaliacao', 'tblQuestoes', false, new Ordenacao("modificado", true), undefined);
                tblImpressao.retornoCarregarTabela = retornoCarregarTabelaQuestoes;
            }

            $("#dlgImpressao input[name='rdoEspacoDisc']").click(function () {
                if (this.value == 0) {
                    $("#dlgImpressao #localDiscursiva label").addClass("desabilitado");
                    $("#dlgImpressao #estiloLinha label").addClass("desabilitado");
                    $("#dlgImpressao #localDiscursiva input").attr('disabled', true);
                    $("#dlgImpressao #estiloLinha input").attr('disabled', true);

                } else {
                    $("#dlgImpressao #estiloLinha label").removeClass("desabilitado");
                    $("#dlgImpressao #localDiscursiva label").removeClass("desabilitado");
                    $("#dlgImpressao #localDiscursiva input").attr('disabled', false);
                    $("#dlgImpressao #estiloLinha input").attr('disabled', false);
                }
            });

            tblImpressao.recarregarTabela();
            
        }
    });


}
function retornarAcaoImprimir(dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }
    
    if ($(dados).attr('id') == 'download') {
        window.location = $(dados).text();
    } else {
        $("#dlgImpressao #boxDownloadModelos").html($(dados).html());
        $("#dlgImpressao #boxDownloadModelos").show();

        $("#dlgImpressao #boxDownloadModelos .fechar").click(function () {
            $("#dlgImpressao #boxDownloadModelos").html('');
            $("#dlgImpressao #boxDownloadModelos").hide();
        });

        
    }
    
}
function imprimirAvaliacao() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Criacao/Imprimir/',
        data: $('#formImprimirAvaliacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            retornarAcaoImprimir(dados);
        }
    });
}

function ViewProva(id) {
    window.open(caminhoBase + '/Agendamento/VisualizacaoProva/' + id, 'VisualizaProva', 'width=800, height=600, scrollbars=1');
}


function criarBotaoExpandirArea(sBotao, sBox, fRetorno) {
    if ($(sBotao).length <= 0) {
        return;
    }
    var txtBotao = $(sBotao).html().split("|");

    $(sBotao).attr("txtHide", txtBotao[0]);
    $(sBotao).attr("txtShow", txtBotao[1]);
    $(sBotao).attr("areaBox", sBox);


    if ($(sBox).is(":visible")) {
        $(sBotao).html($(sBotao).attr("txtHide"));
    } else {
        $(sBotao).html($(sBotao).attr("txtShow"));
    }

    $(sBotao).click(function () {
        var bolShow = !$($(this).attr("areaBox")).is(":visible");
        alterarBotaoExpandirArea($(this), bolShow)
        if (fRetorno) {
            fRetorno(bolShow);
        }
    });
}

function alterarBotaoExpandirArea(obj, show) {
    if (!show) {
        $(obj.attr("areaBox")).hide("slow");
        obj.html(obj.attr("txtShow"));
    } else {
        $(obj.attr("areaBox")).show("slow");
        obj.html(obj.attr("txtHide"));
    }
}


function aplicarAcaoMassa() {
    $('a.statusMassa > input[type="radio"]').hide();

    $('a.statusMassa').click(function () {
        $(this).find('input[type="radio"]').attr('checked', 'checked');

        tblLista.executarAcaoMassa('status');
    });

    $('a.compartilharMassa > input[type="radio"]').hide();

    $('a.compartilharMassa').click(function () {
        $(this).find('input[type="radio"]').attr('checked', 'checked');

        tblLista.executarAcaoMassa('compartilhar');
    });
    //compartilhamento
}

function retornoCarregarTabelaQuestoes (dados) {
    if (retornoErro(dados)) {
        return;
    }
    new QuestaoResumo("#tblQuestoes", "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");

}

function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados)
}
