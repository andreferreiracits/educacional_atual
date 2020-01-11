var listaRespostas;
var mensagem;

/* ************************************* CORREÇÃO DE PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta");

    listaRespostas = new Correcao('frmResposta', 'lstRespostas', true, retornarAcao);

    criarBotaoExpandirArea("#btnOcultarEnunciado", "#boxEnunciado", "#boxEnunciadoReduzido");

    anteriorProximo($("#btnNext"));
    anteriorProximo($("#btnPrev"));
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
        case 'erro':
            mensagem.exibir($(dados));
            return;
    }
    listaRespostas.recarregarLista();
}

function criarBotaoExpandirArea(sBotao, sBox, sBox2) {
    if ($(sBotao).length <= 0) {
        return;
    }

    var txtBotao = $(sBotao).html().split("|");

    $(sBotao).attr("txtHide", txtBotao[0]);
    $(sBotao).attr("txtShow", txtBotao[1]);
    $(sBotao).attr("areaBox", sBox);
    $(sBotao).attr("areaBox2", sBox2);

    if ($(sBox).is(":visible")) {
        $(sBotao).html($(sBotao).attr("txtHide"));
        $(sBox2).hide();
    } else {
        $(sBotao).html($(sBotao).attr("txtShow"));
        $(sBox2).show();
    }

    $(sBotao).click(function () {
        if ($($(this).attr("areaBox")).is(":visible")) {
            $($(this).attr("areaBox")).hide();
            $($(this).attr("areaBox2")).show();
            $(this).html($(this).attr("txtShow"));
        } else {
            $($(this).attr("areaBox")).show();
            $($(this).attr("areaBox2")).hide();
            $(this).html($(this).attr("txtHide"));
        }
    });
}

function retornoCarregarItens() {
    $(".btnOcultarEnunciado").each(function () {
        var id = $(this).attr("id");
        var box1 = $(this).parent().parent().find(".boxEnunciado").attr("id");
        var box2 = $(this).parent().parent().find(".boxEnunciadoReduzido").attr("id");
        $("#" + box1).hide();
        criarBotaoExpandirArea("#" + id, "#" + box1, "#" + box2);
    });
}

function anteriorProximo($btn) {
    var valor = $btn.attr("datavalor");
    $btn.removeAttr("datavalor");
    if (valor == -1) {
        $btn.attr("href", "javascript:void(0)");
        $btn.addClass("desabilitado");
    }
}
