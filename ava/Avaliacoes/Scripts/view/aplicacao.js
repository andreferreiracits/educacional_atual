var tblLista, anularquestao, rltAgendamento, ajuda, flipped;
var mensagem, confirm, dataMode;

/* ************************************* CRIAÇÃO PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);

    ajuda = new Ajuda();

    ajuda.criar("helpCadAgendamento","helpCadAgendamentoCaixa",RecursosJS["msg024"]);

    $("input#txtRealizacaoInicial, input#txtRealizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
        buttonImageOnly: true
    });
    dataMode.data("input#txtRealizacaoInicial, input#txtRealizacaoFinal");

    tblLista = new Tabela('frmTabela', 'tblProvas', false, new Ordenacao("modificado", true), retornarAcao);
    tblLista.retornoCarregarTabela = function (dados) {
        retornoErro(dados);

        this.aplicarIrPara();
    }
    tblLista.onExecutarAcao = function (acao) {
        if (acao.toLowerCase() == "cancelar" || acao.toLowerCase() == "excluir") {
            carregando.mostrar();
        }
        
    }
    anularquestao = new AnularQuestoes("#dlgAnularQuestao", "#btnCancelarAnular", "#btnConcluirAnular", RetornoAnularQuestoes);

    rltAgendamento = new RelatorioAgendamento("#dlgRelatorio", "#btnRelatorioVoltar", "#btnRelatorioOk", "#btnRelatorioExportar", RetornoRelatorioAgendamento);

    $('#slcStatus').selectcombo();

    //flipped = new Flipped();

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
            break;
        case 'excluir':
            carregando.esconder();
            if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluir);
                return;
            }
            mensagem.exibir($(dados));
            break;
        case 'adicionar':
            break;
        case 'regerar':
            mensagem.exibir($(dados));
            break;
        case 'anularquestao':
            break;
        case 'cancelar':
            carregando.esconder();
            if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaCancelar);
                return;
            }
            break;
        case 'excluida':
            carregando.esconder();
            break;
    }
    tblLista.recarregarTabela();
}

function confirmaExcluir() {
    carregando.mostrar();
    var idAplicacao = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Agendamento/ExcluirAplicacao/' + idAplicacao,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornarAcao('excluida', dados); }
    });
}

function confirmaCancelar() {
    carregando.mostrar();
    var idAplicacao = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Agendamento/CancelarAplicacao/' + idAplicacao,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornarAcao('cancelar', dados); }
    });
}
function confirmaExcluirMassa() {
    tblLista.executarAcaoMassa('apagar', true);
}

function AnularQuestao(id) {
    anularquestao.Abrir(id);
}
function RetornoAnularQuestoes(dados) {
    retornoErro(dados);
}
function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados);
}
function RetornoRelatorioAgendamento(dados) {
    retornoErro(dados);
}
function AgendamentoRelatorio(id) {
    rltAgendamento.Abrir(id);
}

function AgendamentoRelatorioPesquisa (id) {
    window.open(caminhoBase + '/Realizacao/VisualizarAplicacaoRealizada/' + id, 'VisualizaProva', 'width=800, height=600, scrollbars=1');
}
function AgendamentoSimular(id) {
    window.open(caminhoBase + '/Realizacao/VisualizarSimulada/' + id, 'VisualizaSimulada', 'width=800, height=600, scrollbars=1');
}

function NovoRelatorio(id) {
    window.open(caminhoBase + '/Relatorio/VisualizaAgendamento/' + id, '', 'width=1020, height=600, scrollbars=1');
}

function RelatorioFlipped(id) {
    window.open(caminhoBase + '/FlippedLearning/Index/' + id, '_blank', '');
}