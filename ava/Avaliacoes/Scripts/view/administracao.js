var tblLista;
var mensagem, confirm;

/* ************************************* CRIAÇÃO PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");

    tblLista = new Tabela('frmTabela', 'tblBancos', true, new Ordenacao("titulo", true), retornarAcao);
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
        
    }
    tblLista.recarregarTabela();
}

function confirmaExcluir() {
    carregando.mostrar();
    var idBanco = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Administracao/Excluir/' + idBanco,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornarAcao('excluida', dados); }
    });
}

