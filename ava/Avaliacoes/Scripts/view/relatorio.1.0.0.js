var tblLista;

/* ************************************* RELATÓRIOS ************************************** */
function inicializar() {
    $("input#txtRealizacaoInicial, input#txtRealizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });

    tblLista = new Tabela('frmTabela', 'tblProvas', true, new Ordenacao("modificado", true), retornarAcao);
    tblLista.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }
}

function retornarAcao(acao, dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (acao.toLowerCase()) {
        case 'apagar':
        case 'excluir':
        case 'adicionar':
        case 'regerar':
            mensagem.exibir($(dados));
            break;
    }
    tblLista.recarregarTabela();
}