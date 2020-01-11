var FUNCAO_VAZIA = 'javascript:void(0)';
var aba, enunciado, tblLista, tblAdicionar, arquivo, mensagem, mensagemAnexo, popupImagem, confirm, dataMode, ajudaFinaldiade;
var proximaTela = "";
var formVez;
var classHabilidade, classAssunto, classAssuntoPesquisaOpniao;
var tblListaQuestaoPai;
var lstTipos = lstTipoResposta;
var tipoAtual = 0;

function inicializar() {
    aba = new Aba('menuNavegacaoQuestao', carregarTela);
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    mensagemAnexo = new Mensagem("alertaAnexo");
    dataMode = new DataMode(mensagem);
    ajudaNovaQ = new Ajuda();
    
    $('#frmQuestao').submit(function (e) {
        if (formVez) {
            parametros = formVez.serialize();
        } else {
            parametros = "";
        }

        if (valicarSubmitSalvar('#frmQuestao')) {
            carregando.mostrar();
            $.ajax({
                url: $(this).attr("action"),
                data: $(this).serialize() + "&" + parametros,
                type: "POST",
                success: function (dados, status, xhttp) { retornoSalvarQuestao(dados); }
            });
        }
        e.preventDefault();
    });

    criarBotaoExpandirArea('#btnOcultarHistorico', '#contentHistorico');
    
    //buscar uma padraão
    var tmpId = $("#menuNavegacaoQuestao .passoAtivo").attr('id');
    if (tmpId) {
        carregarTela(tmpId);
    } else {
        carregarTela('tipoquestao');
    }
}
function valicarSubmitSalvar(form) {
    var bolVal = true;
    //valido todas as caixas de texto que tenham limite
    var elements = $(form + ' textarea[maxchar]');
    for(var i=0 ; i < elements.length; i++ ){
        var elm = elements.get(i);
        var maxChar = parseInt($(elm).attr('maxchar'), 10)
        if (maxChar > 0) {
            if ($(elm).val().length > maxChar) {
                if ($(elm).attr('maxcharmsg')) {
                    var dados = mensagem.htmlTemplate("Avaliações", true, ($(elm).attr('maxcharmsg')), 'alerta');

                } else {
                    var tmpMsg = RecursosJS["msg001"] + $(elm).attr('maxchar');
                    var dados = mensagem.htmlTemplate("Avaliações", elm, tmpMsg, 'alerta');
                }
                mensagem.exibir($(dados));
                return false;
            }
        }
    }
    return bolVal;
}
function acaoSubmitSalvar(form2) {
    formVez = form2;
}
function carregarTela(tela) {
    if (proximaTela == "estrutura") {
        try {
            tipo.tratarEnunciado();
        } catch (e) {
            var dados = mensagem.htmlTemplate("Avaliações", true, e, 'alerta');
            mensagem.exibir($(dados));
            return;
        }
    }
    proximaTela = tela;
    $('#frmQuestao').submit();
}
function trocarTela(tela) {
    aba.selecionar(tela);
    mensagem.close();
    confirm.close();
    atualizaStatus();
    switch (tela) {
        case 'tipoquestao':
            hideBoxArea("#cxaEstruturaQuestao");
            $("#cxaTipoQuestao").show();
            hideBoxArea("#cxaClassificacaoQuestao");
            hideBoxArea("#cxaResumoQuestao");
            inicializarTipoQuestao();
            break;
        case 'estrutura':
            $("#cxaEstruturaQuestao").show();
            hideBoxArea("#cxaTipoQuestao");
            hideBoxArea("#cxaClassificacaoQuestao");
            hideBoxArea("#cxaResumoQuestao");
            inicializarEstrutura();
            break;
        case 'classificacao':
            hideBoxArea("#cxaEstruturaQuestao");
            hideBoxArea("#cxaTipoQuestao");
            $("#cxaClassificacaoQuestao").show();
            hideBoxArea("#cxaResumoQuestao");
            inicializarClassificacao();
            break;
        case 'resumo':
            hideBoxArea("#cxaEstruturaQuestao");
            hideBoxArea("#cxaTipoQuestao");
            hideBoxArea("#cxaClassificacaoQuestao");
            $("#cxaResumoQuestao").show();
            inicializarResumo();
            break;
    }
    carregando.esconder();
}
function hideBoxArea(sBox) {
    $(sBox).html('');
    $(sBox).hide();
}
function retornoSalvarQuestao(dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    if ($(dados).hasClass('confirm')) {
        var tipoConfirm = $(dados).find("#statusAtualConfirm").val()
        if (tipoConfirm == "identificador") {
            confirm.exibir($(dados), this.confirmaIdentificador, this.naoConfirmaIdentificador);
        } else {
            confirm.exibir($(dados), this.confirmaSalvarTipo, this.naoConfirmaSalvarTipo);
        }
        carregando.esconder();
    } else {
        $('#bolConfirmTipo').remove();
        switch (proximaTela) {
            case 'tipoquestao': carregarTipoQuestao(); break;
            case 'estrutura': carregarEstrutura(); break;
            case 'classificacao': carregarClassificacao(); break;
            case 'resumo': carregarResumo(); break;
        }
    }
}
function confirmaSalvarTipo() {
    $('#frmQuestao').append('<input id="bolConfirmTipo" name="bolConfirmTipo" type="hidden" value="1" />');
    $('#frmQuestao').submit();
}
function naoConfirmaSalvarTipo() {
    switch (proximaTela) {
        case 'tipoquestao': carregarTipoQuestao(); break;
        case 'estrutura': carregarEstrutura(); break;
        case 'classificacao': carregarClassificacao(); break;
        case 'resumo': carregarResumo(); break;
    }
}
function confirmaIdentificador() {
    $('#bolConfirmTipo').remove();
    confirm.close();
}
function naoConfirmaIdentificador() {
    $('#frmQuestao').append('<input id="bolConfirmTipo" name="bolConfirmTipo" type="hidden" value="1" />');
    $('#frmQuestao').submit();
}
function atualizaStatus() {
    var mudaStatus = $(".atualizastatus");
    if (mudaStatus.length > 0) {
        $('#statusQuestao').html(mudaStatus.html());
        mudaStatus.remove();
    }
}

/* ******************** tipoquestao ******************* */
function inicializarTipoQuestao() {

    acaoSubmitSalvar($("#frmTipoQuestao"));

    ajudaNovaQ.criar("helpFinQuestao", "helpFinQuestaoCaixa", RecursosJS["msg010"]);
    ajudaNovaQ.criar("helpTipoQuestao", "helpTipoQuestaoCaixa", RecursosJS["msg011"]);
    
    tipoCategoria = new TipoCategoria("frmTipoQuestao", "rdoFinalidade", caminhoBase + '/Questoes/TrocarCategoriaQuestao/', "listaTipoQuestao", caminhoBase + '/Questoes/TrocarTipo/', 'rdoTipo');

    $('#btnAvancarTipo').click(function () { carregarTela('estrutura'); });
}
function carregarTipoQuestao() {
    $.ajax({
        url: caminhoBase + '/Questoes/TipoQuestao/',
        data: $('#frmQuestao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoTipoQuestao(dados); }
    });
}
function retornoTipoQuestao(dados) {
    if(!retornoErro(dados)) {
        $("div#cxaTipoQuestao").html($(dados));
    }
    trocarTela('tipoquestao');
}

/* ******************** Estrutura ******************** */
var tblMultiplosEnunciadoBase;
var bolMultiplosEnunciadoBase = false;
function inicializarEstrutura() {
    
    acaoSubmitSalvar($("#frmSalvarEstrutura"));

    ajudaNovaQ.criar("helpCadEnunQuestao", "helpCadEnunQuestaoCaixa", RecursosJS["msg012"]);
    ajudaNovaQ.criar("helpCadAlteQuestao", "helpCadAlteQuestaoCaixa", RecursosJS["msg013"]);
    ajudaNovaQ.criar("helpCadCritQuestao", "helpCadCritQuestaoCaixa", RecursosJS["msg029"]);
    
    tipo = new TipoResposta("areaRespostas", "intTipoQuestao", caminhoBase + '/Questoes/AdicionarAlternativa/', caminhoBase + '/Questoes/RemoverAlternativa/', '#frmQuestao');
    enunciado = new Enunciado("areaEnunciado", "enunciado", tipo.formatacaoTineEnunciado());

    //TODO: TEMPORARIO
    $('#btnAvancar').click(function () { carregarTela('classificacao'); });
    $('#btnVoltar').click(function () { carregarTela('tipoquestao'); });

    //questao pai
    if ($("#dlgQuestaoPai").length > 0 && $("#dlgCriarQuestaoPai").length > 0) {

        tblListaQuestaoPai = new Tabela("frmTabelaQuestaoPai", 'tblQuestoesPai', false, new Ordenacao("enunciado", true), retornoQuestoesPai, "#frmQuestao");
        tblListaQuestaoPai.retornoCarregarTabela = function (dados) {
            if (!retornoErro(dados)) {
                new QuestaoResumo('#tblQuestoesPai', "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");
            }
        }
        tblListaQuestaoPai.onExecutarAcao = function (acao) {
            if (acao.toLowerCase() == "adicionar") {
                carregando.mostrar();
            }
        }
        if (!$("#dlgQuestaoPai").is(':data(dialog)')) {
            $("#dlgQuestaoPai").dialog({
                dialogClass: 'SEC025_DIALOG',
                autoOpen: false, modal: true,
                width: 885, height: 560,
                position: ['center', 'center'],
                draggable: false, resizable: false,
                open: function () {
                    //tblListaQuestaoPai.recarregarTabela();
                    setTimeout(tblListaQuestaoPai.executarNovoFiltro, 100);
                }
            });
        }

        if (!$("#dlgCriarQuestaoPai").is(':data(dialog)')) {
            $("#dlgCriarQuestaoPai").dialog({
                dialogClass: 'SEC025_DIALOG',
                autoOpen: false, modal: true,
                width: 885, height: 560,
                position: ['center', 'center'],
                draggable: false, resizable: false
            });
        }


        $(".btnQuestaoPai").attr('href', FUNCAO_VAZIA).click(function () {
            $("#dlgQuestaoPai").dialog('open');
        });

        $("#btnNovaQuestaoPai").attr('href', FUNCAO_VAZIA).click(function () {
            abrirCriarQuestaoPai();
        });

        $('#btnCancelarQuestaoPai').attr('href', FUNCAO_VAZIA).click(function () {
            $('#dlgQuestaoPai').dialog('close');
        });

        $('#btnCancelarCriarQuestaoPai').attr('href', FUNCAO_VAZIA).click(function () {
            $('#areaCriarQuestaoPai').html(''); 
            $('#dlgCriarQuestaoPai').dialog('close');
        });


        $("#btnSalvarCriarQuestaoPai").attr('href', FUNCAO_VAZIA).click(function () {
            salvarQuestaoPai();
        });

        if ($('#areaEnunciadoBase .areaTextoEnunciado').length > 0) {
            $("#btnQuestaoPai").hide();
        }

        botaoRemoverQuestaoPai();

        criarBotaoExpandirArea('#btnOcultarQuestaoPai', '#areaEnunciadoBaseContent');

        inicializaMultiplosEnunciadosBase();
    }
}
function carregarEstrutura() {
    //remove pois estavam persistindo na página
    if ($("#dlgQuestaoPai").length > 0) {
        $("#dlgQuestaoPai").remove();
    }
    if($("#dlgCriarQuestaoPai").length > 0) {
        $("#dlgCriarQuestaoPai").remove();
    }
    $.ajax({
        url: caminhoBase + '/Questoes/EstruturaQuestao/',
        data: $('#frmQuestao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoEstruturaQuestao(dados); }
    });
}
function retornoEstruturaQuestao(dados) {
    if (!retornoErro(dados)) {
        $("div#cxaEstruturaQuestao").html($(dados));
    }
    trocarTela('estrutura');
}

/* para questão pai */
function retornoQuestoesPai(acao, dados) {
    if (retornoErro(dados)) {
        return;
    }

    carregando.esconder();
    switch (acao.toLowerCase()) {
        case "adicionar":
            if (bolMultiplosEnunciadoBase) {

                carregarListaEnunciadosBase();
                if (parseInt($(dados).text(), 10) <= 0) {
                    $("#containerMultiplosEnunciadosBase").hide();
                    $('#btnQuestaoPai').show();
                } else {
                    $("#containerMultiplosEnunciadosBase").show();
                    $('#btnQuestaoPai').hide();
                }
            } else {
                $('#areaEnunciadoBase').html(dados);
                $('#btnQuestaoPai').hide();
                botaoRemoverQuestaoPai();
            }
            $('#dlgQuestaoPai').dialog('close');
            criarBotaoExpandirArea('#btnOcultarQuestaoPai', '#areaEnunciadoBaseContent');
            break;
        case "remover":
            if (bolMultiplosEnunciadoBase) {
                carregarListaEnunciadosBase();
                if (parseInt($(dados).text(), 10) <= 0) {
                    $("#containerMultiplosEnunciadosBase").hide();
                    $('#btnQuestaoPai').show();
                } else {
                    $("#containerMultiplosEnunciadosBase").show();
                    $('#btnQuestaoPai').hide();
                }
            } else {
                $('#btnQuestaoPai').show();
                $('#areaEnunciadoBase').html('');
            }
            
            $('#dlgQuestaoPai').dialog('close');
            
            break;
    }

}
function botaoRemoverQuestaoPai() {
    var link = $('#areaEnunciadoBase #btnRemoverQuestaoPai').attr('href');
    var acao = $('#areaEnunciadoBase #btnRemoverQuestaoPai').html();

    $('#areaEnunciadoBase #btnRemoverQuestaoPai').click(function () {
        carregando.mostrar();
        $.ajax({
            url: link,
            data: $('#frmQuestao').serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoQuestoesPai(acao, dados); }
        });

    });
    $('#areaEnunciadoBase #btnRemoverQuestaoPai').attr('href', FUNCAO_VAZIA);
}
function abrirCriarQuestaoPai() {

    var load = document.createElement("div");
    load.className = "carregando";
    $('#areaCriarQuestaoPai').html($(load));

    $("#dlgCriarQuestaoPai").dialog('open');

    $.ajax({
        url: caminhoBase + '/Questoes/CriarQuestaoPai',
        data : $('#frmQuestao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados))
                return;

            $('#areaCriarQuestaoPai').html(dados);
            var enunciadoPai = new Enunciado("areaEnunciadoQuestaoPai", "enunciado", formatEnunciadoQuestao);
        }
    });

}
function salvarQuestaoPai() {

    if (valicarSubmitSalvar('#frmCriarQuestaoPai')) {
        carregando.mostrar();
        $.ajax({
            url: caminhoBase + '/Questoes/SaveQuestaoPai',
            data: $('#frmCriarQuestaoPai').serialize() + "&" + $('#frmQuestao').serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoSalvarQuestaoPai(dados); }
        });
    }


}
function retornoSalvarQuestaoPai(dados) {
    carregando.esconder();

    if (retornoErro(dados))
        return;

    $('#areaCriarQuestaoPai').html('');
    $('#dlgCriarQuestaoPai').dialog('close');
    tblListaQuestaoPai.recarregarTabela();
}

function inicializaMultiplosEnunciadosBase() {
    if ($('#tblMultiplosEnunciadoBase').length <= 0) {
        bolMultiplosEnunciadoBase = false;
        return;
    }
    bolMultiplosEnunciadoBase = true;
    if(!tblMultiplosEnunciadoBase)
        tblMultiplosEnunciadoBase = new Tabela("frmSalvarEstrutura", 'tblMultiplosEnunciadoBase', false, undefined, retornoQuestoesPai, "#frmQuestao");

    tblMultiplosEnunciadoBase.retornoCarregarTabela = function (dados) {
        if (!retornoErro(dados)) {
            new QuestaoResumo('#tblMultiplosEnunciadoBase', "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");
        }
    }

    if ($("#containerMultiplosEnunciadosBase").is(":visible")) {
        //alert($('#btnQuestaoPai').length)
        $('#btnQuestaoPai').hide();
    }

    carregarListaEnunciadosBase();

}
function carregarListaEnunciadosBase() {
    $.ajax({
        url: caminhoBase + '/Questoes/ListaMultiplosEnunciadoBase/',
        data: $("#frmQuestao").serialize(),
        type: 'POST',
        success: function (dados) {
            tblMultiplosEnunciadoBase.carregarTabela(dados);
        }
    });
}

/* ******************** classificacao ************************* */
function carregarClassificacao() {
    $.ajax({
        url: caminhoBase + '/Questoes/ClassificacaoQuestao/',
        data: $('#frmQuestao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoClassificacaoQuestao(dados); }
    });
}
function inicializarClassificacao() {

    ajudaNovaQ.criar("helpClasTopoQuestao", "helpClasTopoQuestaoCaixa", RecursosJS["msg014"]);
    ajudaNovaQ.criar("helpClasPaiQuestao", "helpClasPaiQuestaoCaixa", RecursosJS["msg014"]);
    ajudaNovaQ.criar("helpClasIdenQuestao", "helpClasIdenQuestaoCaixa", RecursosJS["msg015"]);
    ajudaNovaQ.criar("helpClasChavQuestao", "helpClaschavQuestaoCaixa", RecursosJS["msg016"]);

    var tag = new Tags("questaoClassificacao", "txtEditavel", "txtTags", 25);

    acaoSubmitSalvar($("#frmSalvarClassificacao"));

    $('#btnAvancarClassificacao').click(function () { carregarTela('resumo'); });
    $('#btnVoltarClassificacao').click(function () { carregarTela('estrutura'); });

    initClassificacaoQuestao()
    
    dataMode.ano("#txtAno");

}
function retornoClassificacaoQuestao(dados) {
    if (!retornoErro(dados)) {
        destroyDialogoClassificacao();
        
        $("div#cxaClassificacaoQuestao").html($(dados));
    }

    trocarTela('classificacao');
}

/* ******************* resumo ***************************** */
var tblMultiplosEnunciadoBaseRO;
function carregarResumo() {
    $.ajax({
        url: caminhoBase + '/Questoes/ResumoQuestao/',
        data: $('#frmQuestao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoResumoQuestao(dados); }
    });
}
function inicializarResumo() {
    acaoSubmitSalvar($("#frmSalvarResumo"));

    ajudaNovaQ.criar("helpResTopQuestao", "helpResTopQuestaoCaixa", RecursosJS["msg017"]);
    
    $('#btnVoltarResumo').click(function () { carregarTela('classificacao'); });

    $('#btnSalvarCriarResumo').click(function () { popUpDuplicar(); });

    $('#btnDuplicarCancelarResumo').click(function () { $("#btnSalvarCriarResumo").trigger("click"); });

    $('#btnSalvarResumo').click(function () { salvarResumo('default'); });
    $('#btnImprimirResumo').click(function () {
        var id = $("#frmQuestao #idQuestaoSalvar").val();

        var printFrame = $("<iframe>").attr("src", caminhoBase + "/Questoes/ResumoImprimirQuestao/" + id).hide();
        $("body").append(printFrame);
        removeFrame = function () {
            printFrame.remove();
        }
        setTimeout(removeFrame, 2000);
    });
    $('#btnSalvarDuplicarSimResumo').click(function () { salvarResumo('duplicarparcial'); })
    $('#btnSalvarDuplicarNaoResumo').click(function () { salvarResumo('nova'); });


    $('#btnResumoEditarTipo').click(function () { carregarTela('tipoquestao'); });
    $('#btnResumoEditarEstrutura').click(function () { carregarTela('estrutura'); });
    $('#btnResumoEditarClassificacao').click(function () { carregarTela('classificacao'); });

     criarBotaoExpandirArea('#btnExpandirEditarClassificacao', '#boxClassificacaoQuestao')
     criarBotaoExpandirArea('#btnOcultarQuestaoPai', '#areaEnunciadoBaseContent');

     

     simuladores();

     callTipo("resumo");

     inicializaMultiplosEnunciadosBaseRO();
}
function retornoResumoQuestao(dados) {
    tipoAtual = $(dados).find("input[name=intQuestaoTipo]").val();

    if (!retornoErro(dados))
        $("div#cxaResumoQuestao").html($(dados));

    trocarTela('resumo');
}
function salvarResumo(acao) {
    urlData = caminhoBase + '/Questoes/SalvarQuestaoDefault/'
    if (acao == "duplicarparcial") {
        urlData = caminhoBase + '/Questoes/SalvarQuestaoDuplicarParcial/'
    } else if (acao == "nova") {
        urlData = caminhoBase + '/Questoes/SalvarQuestaoCriarNova/'
    }
    carregando.mostrar();
    $.ajax({
        url: urlData,
        data: $('#frmQuestao').serialize()  + "&" + formVez.serialize() + "&" + 'acaoSalvar=' + acao,
        type: "POST",
        success: function (dados, status, xhttp) { retornoSalvarResumo(acao,dados); }
    });
}
function retornoSalvarResumo(acao, dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    location.href = $(dados).text();
}
function popUpDuplicar() {
    $(".navegacaoBotoes div.to").slideToggle("slow");
}

function inicializaMultiplosEnunciadosBaseRO() {
    if ($('#tblMultiplosEnunciadoBaseRO').length <= 0) {
        bolMultiplosEnunciadoBase = false;
        return;
    }
    bolMultiplosEnunciadoBase = true;
    if (!tblMultiplosEnunciadoBaseRO)
        tblMultiplosEnunciadoBaseRO = new Tabela("frmSalvarResumo", 'tblMultiplosEnunciadoBaseRO', false, undefined, undefined, "#frmQuestao");
    tblMultiplosEnunciadoBaseRO.retornoCarregarTabela = function (dados) {
        if (!retornoErro(dados)) {
            new QuestaoResumo('#tblMultiplosEnunciadoBaseRO', "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");
        }
    }
    carregarListaEnunciadosBaseRO();
}
function carregarListaEnunciadosBaseRO() {
    $.ajax({
        url: caminhoBase + '/Questoes/ListaMultiplosEnunciadoBaseRO/',
        data: $("#frmQuestao").serialize(),
        type: 'POST',
        success: function (dados) {
            tblMultiplosEnunciadoBaseRO.carregarTabela(dados);
        }
    });
}

/* gerais */
function criarBotaoExpandirArea(sBotao, sBox) {
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

        if ($($(this).attr("areaBox")).is(":visible")) {
            $($(this).attr("areaBox")).hide("slow");
            $(this).html($(this).attr("txtShow"));
        } else {
            $($(this).attr("areaBox")).show("slow");
            $(this).html($(this).attr("txtHide"));
        }
    });
}
function expandirBoxArea() {
    if ($(sBox).is(":visible")) {
        $(sBox).hide("slow");
    } else {
        $(sBox).show("slow");
    }

}

/***** Funcoes extra do Resumo******/
function resumoDefault() {
    // ...
}
function resumoLacunas() {
    //return;
    var resp, pos, index;
    $("ul.itensResposta li").each(function () {
        resp = $(this).find("input[name=txtLacunaResposta]").val().split('|');
        pos = $(this).find("input[name=txtLacunaPos]").val().charCodeAt(0) - 64;
        //index = resp.indexOf(resp[0]);
        //resp.splice(index + 1, resp.length) = ignora o primeiro e mostra o resto
        switch (resp[0]) {
            case "input":
                $("input[id=lacuna_input_" + pos + "]").val(resp[1]);
                break;
            case "combo":
                var respComp = resp[1]; //.replace('"', '&quot;')
                
                $("#lacuna_input_" + pos + " option").each(function () {
                    if (this.value == respComp) {
                        $(this).attr("selected", "selected");
                    }
                });
                break;
            default:
                if (resp) { resp = "Sem Resposta"; }
                $("#lacuna_input_" + pos).val(resp);
                $("<option>").attr("selected", "selected").text(resp).appendTo($("#lacuna_input_" + pos));
        }

        //$("#lacuna_input_" + pos).prop("disabled", "disabled");
    });
}
function callTipo(func) {
    var funcDefault = func + lstTipos[0];
    func = func + lstTipos[tipoAtual];

    var args = []; // empty array
    // copy all other arguments we want to "pass through"
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    
    if (this[func]) {
        return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
        return this[funcDefault].apply(this, Array.prototype.slice.call(arguments, 1));
    }
}
function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados)
}

function simuladores() {
    $("div.testeSimulador").each(function () {
        var parametros = $(this).find("input[type=hidden]").val();
        var array = parametros.substring(parametros.indexOf('{') + 1, parametros.length - 1);
        var parms = $.parseJSON('{' + replaceAll(array, '\'', '"') + '}');

        var simulador = $("<div>")
        .attr("id", "simulador" + parms.id)
        .html('<iframe src="' + parms.url + '" frameborder="no" height="' + parms.y + '" width="' + parms.x + '">');

        simulador.insertBefore($(this));
    });
}
function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}
