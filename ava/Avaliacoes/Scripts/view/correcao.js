var tblLista, tblQuestoes, tblAlunos;
var anularquestao;
var mensagem, ajuda;

/* ************************************* CORREÇÃO DE PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta");
    ajuda = new Ajuda();

    ajuda.criar("helpTopoCorrecao","helpTopoCorrecaoCaixa",RecursosJS["msg027"]);
    
    $("input#txtRealizacaoInicial, input#txtRealizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
        buttonImageOnly: true
    });

    tblLista    = new Tabela('frmTabela', 'tblProvas', false, new Ordenacao("modificado", true), retornarAcao);
    tblLista.retornoCarregarTabela = function (dados) {
        retornoErro(dados);

        this.aplicarIrPara();
    }
    

    $("#btnListaQuestao").click(function () {
        setBtnAtivo($(this));
        carregarListaQuestoes();
    });
    $("#btnListaAlunos").click(function () {
        setBtnAtivo($(this));
        carregarListaAlunos();
    });


    $("#btnListaQuestao.ativo").click();
    $("#btnListaAlunos.ativo").click();

    try {
        anularquestao = new AnularQuestoes("#dlgAnularQuestao", "#btnCancelarAnular", "#btnConcluirAnular", RetornoAnularQuestoes);
    } catch (e) { }

    setTimeout(tblLista.executarNovoFiltro, 100);
}


function retornarAcao(acao, dados) {
    if (retornoErro(dados)) {
        return;
    }

    switch (acao.toLowerCase()) {

    }
    tblLista.recarregarTabela();
}

function setBtnAtivo(obj) {
    $("ul.correcaoOpcoes a").removeClass("ativo");
    if (obj != undefined) {
        obj.addClass("ativo");
    }
}

function carregarListaQuestoes() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + "/Correcao/TabelaQuestoes/",
        type: "GET",
        success: function (dados, status, xhttp) { retornoCarregarListaQuestoes(dados); }
    });
}
function retornoCarregarListaQuestoes(dados) {
    if(retornoErro(dados)){
        carregando.esconder();
        return;
    }
    if (tblAlunos) {
        tblAlunos.limpar();
    }
    $('#containerListas').html('');
    $('#containerListas').html(dados);

    tblQuestoes = new Tabela('frmTabelaQuestoes', 'tblQuestoes', true, new Ordenacao("modificado", true), retornarAcaoLista, "#frmCorrecaoAplicacao");
    tblQuestoes.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }
    carregando.esconder();
}
function carregarListaAlunos() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + "/Correcao/TabelaAlunos/",
        type: "GET",
        success: function (dados, status, xhttp) { retornoCarregarListaAlunos(dados); }
    });
}
function retornoCarregarListaAlunos(dados) {
    if(retornoErro(dados)){
        carregando.esconder();
        return;
    }
    if (tblQuestoes) {
        tblQuestoes.limpar();
    }
    $('#containerListas').html('');
    $('#containerListas').html(dados);

    tblAlunos = new Tabela('frmTabelaAlunos', 'tblAlunos', true, new Ordenacao("modificado", true), retornarAcaoLista, "#frmCorrecaoAplicacao");
    tblAlunos.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }
    carregando.esconder();
}
function retornarAcaoLista(dados) {
    retornoErro(dados);
}


/* anular qustao */
function AnularQuestao(id) {
    anularquestao.Abrir(id);
}
function RetornoAnularQuestoes(dados) {
    if(retornoErro(dados)){
        return;
    }

    tblLista.recarregarTabela();
}
