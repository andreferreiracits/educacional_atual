var FUNCAO_VAZIA = 'javascript:void(0);';
var mensagem;
var confirm;
var dataMode;

function inicializar() {
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);

    $('#frmEstruturaRelatorio').attr("data-callback", "finalizacaoRelatorio");
    //$(".cxaPasso:eq(0)").attr("data-callback", "retornoConfiguracaoRelatorio");
    $(".cxaPasso:eq(1)").attr("data-callback", "retornoConfiguracaoRelatorioRO");
    //console.log(caminhoBase);
    retornoConfiguracaoRelatorio();
    $('input[name="Tipo"]').change(function () {
        window.location = caminhoBase + '/Relatorio/Novo/' + $(this).val();
    });

    
}

function retornoDados(json) { //Se for pra continuar retorna true
    //$.each(json.Mensagens, function (i, v) { console.log(v); });
    carregando.esconder();

    if (json.Sucesso)
        return true;

    var dados = mensagem.htmlTemplate("Erro", true, json.Mensagens[0].Mensagem, 'alerta');
    mensagem.exibir(dados);

    return false;
}

function finalizacaoRelatorio(json) {
    
    $('#frmEstruturaRelatorio').find("input[name=Id]").val(json.Id);
    var link = $("#visualizarRelatorio").attr("href");
    $("#visualizarRelatorio").attr("href", link.substring(0, link.lastIndexOf("/")) + "/" + json.Id);
    $("#visualizarRelatorio").removeClass("hideI");

    //bloquear a troca de tipo
    $('input[name="Tipo"]:not(:checked)').attr('disabled', 'disabled');
}


function retornoConfiguracaoRelatorio() {
    carregando.esconder();
    var $dialogoSelecionarAgendamento = $('#dlgSelecionarAgendamento');
    $dialogoSelecionarAgendamento.dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $dialogoSelecionarAgendamento.find("input#txtModificadoBuscaInicial, input#txtModificadoBuscaFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });
    dataMode.data("input#txtModificadoBuscaInicial, input#txtModificadoBuscaFinal");


    var tabelaSelecao = new Tabela('tblFormRelatorio', 'tblTableRelatorio', false, new Ordenacao("2", true), function (retorno) {

    }, "#frmAuxiliarRelatorio");
    tabelaSelecao.atualizarSelecionados = true;
    tabelaSelecao.checkBoxName = "chkRelatorioAgendamento";
    tabelaSelecao.retornoCarregarTabela = function (dados) {
    }

    var tabelaEdicao = new Tabela('tblFormRelatorioEdicao', 'tblTableRelatorioEdicao', true, new Ordenacao("2", true), function (retorno) {
        
    }, "#frmAuxiliarRelatorio");
    tabelaEdicao.retornoCarregarTabela = function (dados) {
        //Ta repetindo oq faz no selecao, selecionar
        var lI = [];
        var lIc = [];
        $("#tblFormRelatorioEdicao input[name=IdAgendamento]").each(function () {
            lI.push($(this).val());
        });
        $("#tblFormRelatorioEdicao input[name=IdAgendamentoConfig]").each(function () {
            lIc.push($(this).val());
        });

        $("#frmAuxiliarRelatorio input[name=AgendamentosId]").val(lI.join());
        $("#frmAuxiliarRelatorio input[name=AgendamentosConfig]").val(lIc.join());


        $(".btnExcluir").on("click", function () {
            var idConfig = $(this).closest("td").find("input[name=IdAgendamentoConfig]").val();
            var idAgendamento = $(this).closest("td").find("input[name=IdAgendamento]").val();

            $("#frmEstruturaRelatorio input[name=AgendamentosConfig][value=" + idConfig + "]").remove();

            var listaId = $("#frmAuxiliarRelatorio input[name=AgendamentosId]").val().split(",");
            var listaConfig = $("#frmAuxiliarRelatorio input[name=AgendamentosConfig]").val().split(",");

            var novaListaId = [];
            var novaListaIdConfig = [];

            $.each(listaId, function (i, v) {
                if (v != idAgendamento)
                    novaListaId.push(v);
            });
            $.each(listaConfig, function (i, v) {
                if (v != idConfig)
                    novaListaIdConfig.push(v);
            });

            $("#frmAuxiliarRelatorio input[name=AgendamentosId]").val(novaListaId.join());
            $("#frmAuxiliarRelatorio input[name=AgendamentosConfig]").val(novaListaIdConfig.join());

            tabelaEdicao.recarregarTabela();
        });
    }



    $("#btnBuscarAgendamento").click(function () {
        $(this).closest("form").submit();
    });

    $("#btnAddAgendamentoRelatorio").click(function () {
        tabelaSelecao.recarregarTabela();
        $('#dlgSelecionarAgendamento').dialog('open');
    });
    $("#btnCancelarRelatorioBusca").click(function () {
        $('#dlgSelecionarAgendamento').dialog('close');
    });

    $("#btnAdicionarRelatorioBusca").click(function () {

        //Repete o retorno da tabela de edicao;
        var campoIds     = $("#frmAuxiliarRelatorio input[name=AgendamentosId]");
        var campoConfigs = $("#frmAuxiliarRelatorio input[name=AgendamentosConfig]");

        $("#frmEstruturaRelatorio input[name=AgendamentosConfig]").remove();

        var selecionados   = tabelaSelecao.getSelecionados();
        var selecionadosId = tabelaSelecao.getSelecionados("Id");

        selecionadosId = selecionadosId.concat(campoIds.val().split(","));
        selecionados   = selecionados.concat(campoConfigs.val().split(","));

        campoIds.val(selecionadosId.join());
        campoConfigs.val(selecionados.join());

        $.each(selecionados, function (i, v) {
            $("#frmEstruturaRelatorio").append(
                $("<input>").attr({
                    "type": "hidden", "name": "AgendamentosConfig"
                }).val(v)
            );
        });

        $('#dlgSelecionarAgendamento').dialog('close');
        tabelaEdicao.recarregarTabela();
    });

}
function retornoConfiguracaoRelatorioRO() {
    carregando.esconder();
    retornoTabelaBusca = function (retorno) {
    }
    var  tabela = new Tabela('tblFormRelatorioRO', 'tblTableRelatorioRO', true, new Ordenacao("titulo", true), retornoTabelaBusca);
    tabela.retornoCarregarTabela = function (dados) {
    }

    $("a.bkCxPasso0").click(function () {
        $(".menuNavegacao li:eq(0)").click();
    });
}











$(document).ready(function () {
    //Confuso... {
    $(".menuNavegacao li").on("click", function () {
        var seletorPasso = $(this).closest("ul").data("seletorpasso");
        var estaPosicao = $(this).index();
        var maximo = $(".menuNavegacao li.passo").length;
        var recarregar = $(this).data("reload");

        alterarPasso = function (passo) {
            if (estaPosicao == 0) {
                $("a[data-event=voltarPasso]").addClass("hideI");
                $("a[data-event=proximoPasso]").removeClass("hideI");
                $("a[data-event=finalizarPasso]").addClass("hideI");
            } else {
                $("a[data-event=voltarPasso]").removeClass("hideI");
                $("a[data-event=proximoPasso]").addClass("hideI");
                $("a[data-event=finalizarPasso]").addClass("hideI");
            }
            if (estaPosicao == (maximo - 1)) {
                $("a[data-event=finalizarPasso]").removeClass("hideI");
            }

            $(".menuNavegacao li.passo a").removeClass("ativo");
            $(".menuNavegacao li.passo:eq(" + estaPosicao + ") a").addClass("ativo");

            $(seletorPasso).addClass("hideI");
            passo.removeClass("hideI");
        }

        var $passo = $(seletorPasso + ":eq(" + estaPosicao + ")");

        if (recarregar || $passo.is(":empty")) {
            var objeto;
            var tipo = "GET";
            if ($(this).data("formseletor")) {
                objeto = { "Relatorio": tratarObjeto($($(this).data("formseletor")).serializeObject()) };
                tipo = "POST";
            }
            var resposta = requisicaoJsonAjax($(this).data("link"), tipo, objeto);
            resposta.always(function (data) {
                $passo.html(data);
                callTipo($passo.data("callback"));
                alterarPasso($passo);
            });
        } else {
            alterarPasso($passo);
        }


    });

    $("a[data-event=onPopup]").on("click", function (e) {
        e.preventDefault();
        var elemento = $(this);
        var link = elemento.attr("href");
        var titulo = elemento.attr("title");
        var width = elemento.data("width");
        var height = elemento.data("height");
        var scroll = elemento.data("scroll");
        var resiza = elemento.data("resizable");
        var propriedades = [];

        if (resiza) {
            propriedades.push("resizable=1");
        }
        if (scrollbars) {
            propriedades.push("scrollbars=1");
        }
        propriedades.push("height=" + height);
        propriedades.push("width=" + width);

        elemento.click(function () {
            window.open(link, titulo, propriedades.join());
        });
    });




    $("a[data-event=voltarPasso]").on("click", function () {
        var posicao = $(".menuNavegacao li.passo a.ativo").closest("li").index();
        if (posicao != 0) {
            $(".menuNavegacao li.passo:eq(" + (--posicao) + ")").click();
        }
    });
    $("a[data-event=proximoPasso]").on("click", function () {
        var posicao = $(".menuNavegacao li.passo a.ativo").closest("li").index();
        var maximo = $(".menuNavegacao li.passo").length;

        if (posicao < (maximo - 1)) {
            $(".menuNavegacao li.passo:eq(" + (++posicao) + ")").click();
        }
    });

    // }
    $("a[data-event=finalizarPasso]").on("click", function () {
        var form = $($(this).data("seletor"));
        var content = $(this).data("content");
        var tipo = form.attr("method");
        var action = form.attr("action");

        form.unbind("submit").bind("submit", function (e) {
            e.preventDefault();
            var objeto = { "Relatorio": tratarObjeto(form.serializeObject()) };
            var resposta = requisicaoJsonAjax(action, tipo, objeto);
            resposta.always(function (data) {
                if (!retornoDados(data))
                    return;

                
                if (form.data("callback")) {
                    callTipo(form.data("callback"), data);
                }
            });

            //console.log(tratarObjeto(form.serializeObject()));
        });

        form.submit();
    });
});


//$("input#txtDataRealizacaoInicio.habilitado, " +
//      "input#txtDataRealizacaoFinal, " +
//      "input#txtDataConferir, " +
//      "input#txtDataCorrecao, " +
//      "input#txtDataGabarito").datepicker({
//          showOn: "button",
//          buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
//          buttonImageOnly: true
//      });
//dataMode.data("input#txtDataRealizacaoInicio, input#txtDataRealizacaoFinal, input#txtDataConferir, input#txtDataCorrecao, input#txtDataGabarito");



//    $(document).on("click", "a[data-remote=true]", function() {
//        var element=$(this);
//        var url = element.attr('href');
//        var trigger = element.attr('data-event');
//        var fn;
//        if(trigger) {
//            fn = function(data) {
//                element.trigger(trigger, data);
//            };
//        }
//        $.get(url, fn);
//        return false;
//    });
function requisicaoJsonAjax(pURL, tipo, pObjetoJS) {
    if (tipo === undefined)
        tipo = "GET";

    carregando.mostrar();

    var resposta = $.ajax({
        url: pURL,
        data: JSON.stringify(pObjetoJS),
        type: tipo,
        contentType: 'application/json; charset=utf-8'
    });
    return resposta;
}
function callTipo(func) {
    if (!func || (func && $.trim(func).length == 0))
        return;
    func = $.trim(func);
    var args = []; // empty array
    // copy all other arguments we want to "pass through"
    for (var i = 2; i < arguments.length; i++) { args.push(arguments[i]); }
    if (this[func]) {
        return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
    }
}
function tratarObjeto(obJS) {
    if (obJS["AgendamentosConfig"] === undefined)
        return obJS;

    if (obJS["AgendamentosConfig"].push)
        return obJS;

    if ($.trim(obJS["AgendamentosConfig"]) != "") {
        var valor = obJS["AgendamentosConfig"];
        obJS["AgendamentosConfig"] = [];
        obJS["AgendamentosConfig"].push(valor);
        return obJS;
    }


    delete obJS["AgendamentosConfig"];

    return obJS;
}