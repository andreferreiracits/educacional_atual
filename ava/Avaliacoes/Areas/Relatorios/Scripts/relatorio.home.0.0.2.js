var tabelaSelecao;
var FUNCAO_VAZIA = 'javascript:void(0);';
var mensagem;
var confirm;
var dataMode;

function confirmaExcluirMassa() {
    carregando.mostrar();
    tabelaSelecao.executarAcaoMassa('apagar', true);
}
function confirmaExcluir() {
    carregando.mostrar();
    var idQuestao = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/RelatorioNovo/Excluir/' + idQuestao,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornoAcao('excluida', dados); }
    });
}
function retornoAcao(acao, dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (acao.toLowerCase()) {
        case 'excluida':
            carregando.esconder();
            mensagem.exibir($(dados));
            break;
        case 'excluir':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluir);
                return;
            }
            mensagem.exibir($(dados));
            break;
        case 'apagar':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirMassa);
                return;
            }
            mensagem.exibir($(dados));
            break;
        default:
            break;
    }
    tabelaSelecao.recarregarTabela();
}

function inicializar() {
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);

    tabelaSelecao = new Tabela('tblFormBuscaRelatorio', 'tblTabelaBuscaRelatorio', true, new Ordenacao("1", true), retornoAcao);

    templateFakeFiltro = function (txtPalavra) {
        var html = '<span class="areaBotoesFiltros">'
             + '<span class="textoFiltros">Filtrado por:</span>'
            + '<span class="botaoFiltro" title="' + txtPalavra + '">'
                + '<input type="hidden" name="filtroCampo" value="txtPalavraChave">'
                + '<input type="hidden" name="filtroValor" value="' + txtPalavra + '">'
			    + '<span>' + txtPalavra + '</span>'
			    + '<a class="botaoFechar" href="javascript:void(0)">x</a>'
		    + '</span>'
        + '</span>';
        return html;
    }

    tabelaSelecao.atualizarSelecionados = true;
    tabelaSelecao.checkBoxName = "chkRelatorio";
    tabelaSelecao.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }
        $("#tblFormBuscaRelatorio").find("[data-tipo=linkpopup]").each(function () {
            aplicarPopUP($(this));
        });

        var $campo = $("#tblFormBuscaRelatorio #txtPalavraChave");

        if ($.trim($campo.val()) == '' || $campo.val() == $campo.attr("title"))
            return;

        var dds = templateFakeFiltro($campo.val());
        var $filtros = $("#tblFormBuscaRelatorio .novofiltroTags");
        $filtros.html(dds);

        $filtros.find(".botaoFechar").click(function () {
            $campo.val($campo.attr("title"));
            $filtros.empty();
            tabelaSelecao.recarregarTabela();
        });
    }

    $("#btnBuscarRelatorio").click(function () {
        $("#tblFormBuscaRelatorio").submit();
    });
}


function aplicarPopUP(elemento) {
    var link = elemento.data("link");
    var titulo = elemento.attr("title");
    var width = elemento.data("width");
    var height = elemento.data("height");
    var scroll = elemento.data("scroll");
    var resiza = elemento.data("resizable");
    var propriedades = [];

    if (resiza) {
        propriedades.push("resizable=1");
    }
    if (window.scrollbars) {
        propriedades.push("scrollbars=1");
    }
    propriedades.push("height=" + height);
    propriedades.push("width=" + width);

    elemento.click(function () {
        window.open(link, titulo, propriedades.join());
    });
}