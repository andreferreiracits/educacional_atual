var tblLista;
var mensagem, confirm, dataMode,ajuda;

/* ************************************* CRIAÇÃO PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta", "#prevAviso");
    confirm = new Confirm("alerta", "#prevAviso");
    dataMode = new DataMode(mensagem);
    tblLista = new Tabela('frmTabela', 'tblAplicacoesUsuario', false, undefined, undefined);
    tblLista.retornoCarregarTabela = function (dados) {
        retornoErro(dados);

        var $va = $(dados);

        ajustarBarraStatus($va.attr("data-json"));

        this.aplicarIrPara();
    }

    CriarAjudaToolTip();

    CarregarAgendadores();

    $(".statusFiltro").click(function () {
        $(".subDivFacaFiltros input[name=tipoStatusFiltro]").prop("checked", false);
        $("#" + $(this).attr("data-for")).prop("checked", true).click().prop("checked", true);
    });
    $("#btnFiltrarAgendador").click(function () {
        addFiltroAgendador();
    });
    $("#btnFiltrarPeriodo").click(function () {
        addFiltroPeriodo();
    });

    if ($("#associarGrupoArsp").gerenciadorgrupos) {
        $("#associarGrupoArsp").gerenciadorgrupos({
            'inicializacao': 'associar',
            'associarBtnValidar': 'botaoOK',
            'associarBtnAssociar': 'botaoOkk',
            'associarForm': 'frmTabela',
            'associarValidar': associarValidar,
            'associarAssociar': associarAssociar,
            'associarTxtName': 'keyGerenciador',
            'caminhoBase': '/recursos/GerenciadorGrupos'
        });
    }


    function tratarRetornoGerenciador(data) {
    //{"acesso":false,"mensagem":"Chave inválida","criador":"","id":0,"nogrupo":false,"chave":""}
    //{"erro":"true","id":"Erro002","mensagem":"Usuário não autenticado ","tipo":"0"}
        if (data.erro && data.erro == "true" && data.id == "Erro002") {
            var dados = mensagem.htmlTemplate("Error", true, "Usuário deslogado", "sessao");
            mensagem.exibir(dados, undefined, undefined);
            return true;
        }
        return false;
    }


    function Resposta(title, msg) {
        var dados = $("<p>").attr({ "id": "mensagem", "title": title }).html(
            "<div id='aResponderM' class='iconeChaveAssociar'>" +
            "<div>" + msg + "</div>"+
            "</div>"+
            "<div class='clear'></div>"
            );
        return dados;
    }

    function associarValidar(data) {
        fTrue = function () {
            $("#botaoOkk").trigger("click");
        }
        if (tratarRetornoGerenciador(data))
            return;

        if (data.acesso) {
            var title       = "Confirmação de chave de acesso - " + data.chave;
            var msg         = "Você deseja se associar as avaliações geradas pelo professor " + data.criador;
            var dados = Resposta(title, msg);
            confirm.exibir(dados, fTrue, undefined);
        } else {
            var title = "Chave de acesso - " + $("input[name=keyGerenciador]").val();
            var dados = Resposta(title, data.mensagem);
            var div   = $("<div>");
            dados.appendTo(div);

            mensagem.exibir(div);
        }
    }
    function associarAssociar(data) {
        if (tratarRetornoGerenciador(data))
            return;

        var title = "Chave de acesso - " + data.chave;
        var dados = Resposta(title, data.mensagem);
        var div = $("<div>");
        dados.appendTo(div);
        $("input[name=keyGerenciador]").val("");
        mensagem.exibir(div);
        tblLista.recarregarTabela();
    }

    $("input#horaInicial").timePicker();
    $("input#horaFinal").timePicker();

    $("#realizacaoInicial").datepicker({
        showOn: "button",
        buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
        buttonImageOnly: true,
        constrainInput: true
    });
    $("#realizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
        buttonImageOnly: true
    });
    dataMode.data("#realizacaoInicial, #realizacaoFinal");

    $(".btDataInicio").click(function () {
        $(".btAgendador").removeClass("btAresponder_ON");
        $(this).toggleClass("btAresponder_ON");
        $("#divFiltroAvancadoAgendador").addClass("hide");
        if ($("#divFiltroAvancadoDataInicio").hasClass("hide")) { $("#divFiltroAvancadoDataInicio").removeClass("hide"); }
        else { $("#divFiltroAvancadoDataInicio").addClass("hide"); }
        ;
    });
    $(".btAgendador").click(function () {
        $(".btDataInicio").removeClass("btAresponder_ON");
        $(this).toggleClass("btAresponder_ON");
        $("#divFiltroAvancadoDataInicio").addClass("hide");
        if ($("#divFiltroAvancadoAgendador").hasClass("hide")) { $("#divFiltroAvancadoAgendador").removeClass("hide"); }
        else { $("#divFiltroAvancadoAgendador").addClass("hide"); }

    });
    $(".btTipoAvaliacao").click(function () {
        $(".btTipoPesquisaOp").removeClass("btAresponder_ON");
        $(this).toggleClass("btAresponder_ON");
        $("#txtAcao_frmTabela").val("filtrar");
        filtroTipoAplic(1);
    });
    $(".btTipoPesquisaOp").click(function () {
        $(".btTipoAvaliacao").removeClass("btAresponder_ON");
        $(this).toggleClass("btAresponder_ON");
        $("#txtAcao_frmTabela").val("filtrar");
        filtroTipoAplic(2);
    });

    $(".btOrdemAZ").click(function () {
        $(".cxOrdemResultado").find(".btAresponder").removeClass("btAresponder_ON");
        $(this).addClass("btAresponder_ON");
        $("#txtOrdem_frmTabela").val("titulo, 0");
        $("#txtAcao_frmTabela").val("filtrar");
        $("#frmTabela").submit();
    });
    $(".btOrdemZA").click(function () {
        $(".cxOrdemResultado").find(".btAresponder").removeClass("btAresponder_ON");
        $(this).addClass("btAresponder_ON");
        $("#txtOrdem_frmTabela").val("titulo, 1");
        $("#txtAcao_frmTabela").val("filtrar");
        $("#frmTabela").submit();
    });
    $(".btOrdemC").click(function () {
        $(".cxOrdemResultado").find(".btAresponder").removeClass("btAresponder_ON");
        $(this).addClass("btAresponder_ON");
        $("#txtOrdem_frmTabela").val("comeco, 1");
        $("#txtAcao_frmTabela").val("filtrar");
        $("#frmTabela").submit();
    }).addClass('btAresponder_ON');
    $(".btOrdemT").click(function () {
        $(".cxOrdemResultado").find(".btAresponder").removeClass("btAresponder_ON");
        $(this).addClass("btAresponder_ON");
        $("#txtOrdem_frmTabela").val("termina, 1");
        $("#txtAcao_frmTabela").val("filtrar");
        $("#frmTabela").submit();
    });
    $("input[name=tipoStatusFiltro]").click(function () {
        $("#txtAcao_frmTabela").val("filtrar");
        $("#frmTabela").submit();
    });

    setTimeout(filtroAnoCorrente, 100);

};
function filtroTipoAplic(tipo) {
    if ($("#txtFiltroTipoAplic").val() == tipo) {
        $("#txtFiltroTipoAplic").val("");
        $("#frmTabela").submit();
    } else {
        $("#txtFiltroTipoAplic").val(tipo);
        $("#txtAcao_frmTabela").val("filtrar");
        $("#frmTabela").submit();
    }
}
function CriarAjudaToolTip() {
    ajuda = new Ajuda();

    ajuda.criar("helpAresponder", "helpAresponderCaixa", RecursosJS["msg028"], "", "meia", false);
    ajuda.criar("tipoPercFiltroAberta", "tipoPercFiltroAbertaCaixa", "Avaliação Aberta: 41 ( 48.23% )", "branca", "inteira", true);
    ajuda.criar("tipoPercFiltroResultado", "tipoPercFiltroResultadoCaixa", "Teste2", "branca", "inteira", true);
    ajuda.criar("tipoPercFiltroEmBreve", "tipoPercFiltroEmBreveCaixa", "Teste3", "branca", "inteira", true);
    ajuda.criar("tipoPercFiltroEncerrada", "tipoPercFiltroEncerradaCaixa", "Teste5", "branca", "inteira", true);
    ajuda.criar("tipoPercFiltroNaoRealizada", "tipoPercFiltroNRealizadaCaixa", "Teste6", "branca", "inteira", true);
}
function ajustarBarraStatus(texto) {
    var json = $.parseJSON(texto);

    ajuda.alterarTexto("tipoPercFiltroAbertaCaixa", "Aberta: " + json.TotalAbertas + " (" + json.PercAbertas + "%)");
    ajuda.alterarTexto("tipoPercFiltroResultadoCaixa", "Resultado: " + json.TotalResultado + " (" + json.PercResultado + "%)");
    ajuda.alterarTexto("tipoPercFiltroEmBreveCaixa", "Em breve: " + json.TotalEmbreve + " (" + json.PercEmbreve + "%)");
    ajuda.alterarTexto("tipoPercFiltroEncerradaCaixa", "Encerrada: " + json.TotalEncerradas + " (" + json.PercEncerradas + "%)");
    ajuda.alterarTexto("tipoPercFiltroNRealizadaCaixa", "Não realizada: " + json.TotalNaoRealizada + " (" + json.PercNaoRealizada + "%)");

    $("#tipoStatusFiltroAberta").closest("label").find("span").text(json.TotalAbertas);
    $("#tipoStatusFiltroResultado").closest("label").find("span").text(json.TotalResultado);
    $("#tipoStatusFiltroEmBreve").closest("label").find("span").text(json.TotalEmbreve);
    $("#tipoStatusFiltroEncerrada").closest("label").find("span").text(json.TotalEncerradas);
    $("#tipoStatusFiltroNaoRealizada").closest("label").find("span").text(json.TotalNaoRealizada);

    $(".statusAberta").css("width", json.PercAbertas + "%").text(json.PercAbertas + "%");
    $(".statusResultado").css("width", json.PercResultado + "%").text(json.PercResultado + "%");
    $(".statusEmbreve").css("width", json.PercEmbreve + "%").text(json.PercEmbreve + "%");
    $(".statusEncerrada").css("width", json.PercEncerradas + "%").text(json.PercEncerradas + "%");
    $(".statusNaorealizada").css("width", json.PercNaoRealizada + "%").text(json.PercNaoRealizada + "%");

    if (json.PercAbertas <= 5)
        $(".statusAberta").text('');
    if (json.PercResultado <= 5)
        $(".statusResultado").text('');
    if (json.PercEmbreve <= 5)
        $(".statusEmbreve").text('');
    if (json.PercEncerradas <= 5)
        $(".statusEncerrada").text('');
    if (json.PercNaoRealizada <= 5)
        $(".statusNaorealizada").text('');


    if (json.PercAbertas <= 0 && json.PercResultado <= 0 && json.PercEmbreve <= 0 && json.PercEncerradas <= 0 && json.PercNaoRealizada <= 0) {
        $("#barraStatus").hide("fast");
    } else {
        $("#barraStatus").show("fast");
    }
}

function addFiltroAgendador() {

    //seta flag pra filtro
    $("#txtAcao_frmTabela").val("filtrar");
    //retira agendador anterior
    $("input[name=txtidAgendador]").parents("span").remove();
    if ($("#idAgendador option:selected").val() != 0) {
        $("<input>").attr({ "type": "hidden", "name": "txtidAgendador" }).val($("#idAgendador option:selected").val()).appendTo(
            $("<span>")
            .attr({ "class": "spanFiltro" })
            .html($("#idAgendador option:selected").text() + " <img onclick='excluirFiltroAgen(this);' src= '" + caminhoBase + "/" + "Content/imgcss/1.0.2/bt_x.png' />")
            .appendTo("#divConteudoFiltroAvancado")
        );
        $("#frmTabela").submit();
        $("#idAgendador").val("");
        exibeBoxFiltro();
    } else {
        $("#frmTabela").submit();
        $("#idAgendador").val("");
        escondeBoxFiltro();
    }

};
function filtroAnoCorrente() {
    $("#realizacaoInicial").val(periodo.inicio.data);
    $("#realizacaoFinal").val(periodo.fim.data);
    $("#horaInicial").val(periodo.inicio.hora);
    $("#horaFinal").val(periodo.inicio.hora);
    addFiltroPeriodo();
}
function addFiltroPeriodo() {
    //seta flag pra filtro
    $("#txtAcao_frmTabela").val("filtrar");
    //retira agendador anterior
    $("input[name=txtRealizacaoInicial]").parents("span").remove();

    var vRI = $("<input>").attr({ "type": "hidden", "name": "txtRealizacaoInicial" }).val($("#realizacaoInicial").val());
    var vRF = $("<input>").attr({ "type": "hidden", "name": "txtRealizacaoFinal" }).val($("#realizacaoFinal").val());
    var vHI = $("<input>").attr({ "type": "hidden", "name": "txthoraInicial" }).val($("#horaInicial").val());
    var vHF = $("<input>").attr({ "type": "hidden", "name": "txthoraFinal" }).val($("#horaFinal").val());
    if ((vRI.val() != "") && (vRF.val() != "") && (vHI.val() != "") && (vHF.val() != "")) {
        var cSP = $("<span>").attr({ "class": "spanFiltro" }).html("Período: " + $("#realizacaoInicial").val() + " " + $("#horaInicial").val() + " até " + $("#realizacaoFinal").val() + " " + $("#horaFinal").val() + " <img onclick='excluirFiltroPeri(this);' src='" + caminhoBase + "/" + "Content/imgcss/1.0.2/bt_x.png' />");
        vRI.appendTo(cSP);
        vRF.appendTo(cSP);
        vHI.appendTo(cSP);
        vHF.appendTo(cSP);
        cSP.appendTo("#divConteudoFiltroAvancado");

        $("#frmTabela").submit();
        $("#realizacaoInicial").val("");
        $("#realizacaoFinal").val("");
        $("#horaInicial").val("");
        $("#horaFinal").val("");
        exibeBoxFiltro();
    } else {
        $("#frmTabela").submit();
        $("#realizacaoInicial").val("");
        $("#realizacaoFinal").val("");
        $("#horaInicial").val("");
        $("#horaFinal").val("");
        escondeBoxFiltro();
    }
};
function excluirFiltroAgen(obj) {
    $("#txtAcao_frmTabela").val("filtrar");
    $(obj).parents("span").remove();
    $("#frmTabela").submit();
    escondeBoxFiltro();
};
function excluirFiltroPeri(obj) {
    $("#txtAcao_frmTabela").val("filtrar");
    $(obj).parents("span").remove();
    $("#frmTabela").submit();
    escondeBoxFiltro();
};

function ViewProva(id) {
    window.open(caminhoBase + '/Aplicacao/VisualizacaoProva/' + id, 'VisualizaProva', 'width=800, height=600, scrollbars=1, resizable=1');
}
function CarregarAgendadores() {
    $.ajax({
        url: caminhoBase + '/Aresponder/CarregaAgendadores',
        type: "POST",
        success: function (dados, status, xhttp) { retornoCarregarAgendadores(dados) },
        beforeSend: function () { carregando.mostrar(); }
    });
}
function retornoCarregarAgendadores(dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }
    $("#idAgendador > option").remove();
    var option;
    $.each(dados.itens, function (i, obj) {
        option = $("<option>");
        if (obj.Selected) {
            option.attr("selected", "selected");
        }
        option.val(obj.Value).text(obj.Text).appendTo("#idAgendador");
    });
}
function divTipoAv(obj) {
    $(obj).find("div").toggleClass("hide")
}
function exibeBoxFiltro() {
    if ($("#divConteudoFiltroAvancado").find("span").length > 0) {
        $("#divConteudoFiltroAvancado").fadeIn(300);
    }
}
function escondeBoxFiltro() {
    if ($("#divConteudoFiltroAvancado").find("span").length <= 1) {
        $("#divConteudoFiltroAvancado").fadeOut(300);
    }
}
function ViewRealizacaoProva(id) {
    window.open(caminhoBase + '/Realizacao/index/' + id, 'RealizacaoProva', 'width=800, height=600, scrollbars=1, resizable=1');
}

//quando fecha a janela da realização
function onFinalizarRealizacao(idAplicacao, idConfig, idRealizada) {
    //tblLista.recarregarTabela();
    window.location = window.location.toString();
}
function onCloseRealizacao(etapa, idAplicacao, idConfig, idRealizada) {
    onFinalizarRealizacao(idAplicacao, idConfig, idRealizada)
}