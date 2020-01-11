var FUNCAO_VAZIA = 'javascript:void(0)';
var proximaTela = "";
var aba, mensagem, tblAdicionar, confirm, dataMode, ajuda;
var formVez;
var tblListaQuestoes;
var anularquestao;

function inicializar() {

    aba = new Aba('menuNavegacaoSimulado', carregarTela);
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);

    anularquestao = new AnularQuestoes("#dlgAnularQuestao", "#btnCancelarAnular", "#btnConcluirAnular", RetornoAnularQuestoes);

    $('#frmSimulado').submit(function (e) {

        if (formVez) {
            parametros = formVez.serialize();
        } else {
            parametros = "";
        }

        carregando.mostrar();
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize() + '&' + parametros,
            type: "POST",
            success: function (dados, status, xhttp) { retornoSimulado(dados); }
        });
        e.preventDefault();
    });


    carregarTela('configuracao');
}

function acaoSubmitSalvar(form2) {
    formVez = form2;
}

function carregarTela(tela) {
    proximaTela = tela;
    $('#frmSimulado').submit();
}

function trocarTela(tela) {
    aba.selecionar(tela);
    
    switch (tela) {
        case 'configuracao':
            $("#cxaConfiguracao").show();
            hideBoxArea("#cxaAvaliacoes");
            hideBoxArea("#cxaResumo");
            inicializarConfiguracao();
            break;
        case 'avaliacoes':
            hideBoxArea("#cxaConfiguracao");
            $("#cxaAvaliacoes").show();
            hideBoxArea("#cxaResumo");
            inicializarAvaliacoes();
            break;
        case 'resumo':
            hideBoxArea("#cxaConfiguracao");
            hideBoxArea("#cxaAvaliacoes");
            $("#cxaResumo").show();

            inicializarResumo();
            break;
    }
    
    $(window).scrollTop(0);
}

function hideBoxArea(sBox) {
    $(sBox).html('');
    $(sBox).hide();
}

function retornoSimulado(dados) {

    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (proximaTela) {
        case 'configuracao': carregarConfiguracao(); break;
        case 'avaliacoes': carregarAvaliacoes(); break;
        case 'resumo': carregarResumo(); break;
    }
    
}


/* ******************** configuracao ******************** */
function carregarConfiguracao() {
    $.ajax({
        url: caminhoBase + '/Simulado/Configuracao/',
        data: $(this).serialize() + '&' + $('#frmSimulado').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoConfiguracao(dados); }
    });
}
function retornoConfiguracao(dados) {
    if (!retornoErro(dados)){
        $("div#cxaConfiguracao").html($(dados));
    }
    trocarTela('configuracao');
}
function inicializarConfiguracao() {
    carregando.esconder();

    acaoSubmitSalvar($("#frmConfiguracaoSimulado"));

    $('#btnAvancarConfiguracao').click(function () { carregarTela('avaliacoes'); });

    $("input#txtDataGabarito, " +
      "input#txtDataRecursoInicio, " +
      "input#txtDataRecursoFim, " +
      "input#txtDataRanking, " +
      "input#txtDataRealizacaoInicio.habilitado, " +
      "input#txtDataRealizacaoFinal").datepicker({
          showOn: "button",
          buttonImage: pathImgCalendario(),
          buttonImageOnly: true
      });
      dataMode.data("input#txtDataGabarito, input#txtDataRecursoInicio, input#txtDataRecursoFim, input#txtDataRanking, input#txtDataRealizacaoInicio, input#txtDataRealizacaoFinal");

      $("input#txtHoraGabarito, " +
      "input#txtHoraRecursoInicio, " +
      "input#txtHoraRecursoFim, " +
      "input#txtHoraRanking, " +
      "input#txtHoraRealizacaoInicio.habilitado, " +
      "input#txtHoraRealizacaoFinal").timePicker();

      dataMode.hora("input#txtHoraGabarito, input#txtHoraRecursoInicio, input#txtHoraRecursoFim, input#txtHoraRanking, input#txtHoraRealizacaoInicio, input#txtHoraRealizacaoFinal");


      $("input#txtDataRealizacaoInicio.desabilitado, " +
      "input#txtHoraRealizacaoInicio.desabilitado ").attr('disable', true);

      dataMode.numero("input#txtIdRedacao");

      $('input#rdoRedacaoNao').click(function () {
          $('input#txtIdRedacao').val("");
          $('input#txtIdRedacao').attr('disabled', 'disabled')
          $('#boxRedacao').addClass('desabilitado');
      })
      $('input#rdoRedacaoSim').click(function () {
          $('#boxRedacao').removeClass('desabilitado');
          $('input#txtIdRedacao').removeAttr('disabled')
      })

      
      if ($('input#rdoRedacaoNao:checked').length > 0) {
          $('input#txtIdRedacao').attr('disabled', 'disabled')
          $('#boxRedacao').addClass('desabilitado');
      }

      $('#ckdUpLow').click(testLowUp);

      testLowUp();

      $('input[name="rdoGabarito"]').change(testarGabarito);
      //referente ao gabarito
      testarGabarito();

}
function testLowUp() {
    if ($('#ckdUpLow').is(':checked')) {
        $('#hidUpLow').val('1')
    } else {
        $('#hidUpLow').val('0')
    }
}
function testarGabarito() {
    if ($("#rdoGabaritoSem").is(':checked')) {
        $('#rdoComentarioNao').click();
    }
    if (!$("#rdoGabaritoData").is(':checked')) {
        $('#boxDataGabarito').addClass('desabilitado');
        $('#txtDataGabarito').attr('disabled', 'disabled');
        $('#txtHoraGabarito').attr('disabled', 'disabled');
    } else {
        $('#boxDataGabarito').removeClass('desabilitado');
        $('#txtDataGabarito').removeAttr('disabled');
        $('#txtHoraGabarito').removeAttr('disabled');
    }
}
/* ******************** avaliacoes ******************** */
function carregarAvaliacoes() {
    $.ajax({
        url: caminhoBase + '/Simulado/Avaliacoes/',
        data: $(this).serialize() + '&' + $('#frmSimulado').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoAvaliacoes(dados); }
    });
}
function retornoAvaliacoes(dados) {
    if (!retornoErro(dados)) {
        $('#dlgSelecionarProva').remove();
        $("div#cxaAvaliacoes").html($(dados));
    }
    
    trocarTela('avaliacoes');
}
function inicializarAvaliacoes() {
    carregando.esconder();

    acaoSubmitSalvar($("#frmAvaliacoesSimulado"));

    $('#btnBuscarProvas').click(function () { $('#frmTabelaBusca').submit(); });

    $('#btnVoltarAvaliacoes').click(function () { carregarTela('configuracao'); });
    $('#btnAvancarAvaliacoes').click(function () { carregarTela('resumo'); });

    /* para a busca das provas */
    $("input#txtModificadoBuscaInicial, input#txtModificadoBuscaFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });
    dataMode.data("input#txtModificadoBuscaInicial, input#txtModificadoBuscaFinal");

    $("#btnAdicionarProva").click(adicionarProva);

    $('#dlgSelecionarProva').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $('#dlgVisualizarQuestoes').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 580,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    tblAdicionar = new Tabela('frmTabelaBusca', 'tblBusca', false, new Ordenacao("nome", true), retornarTabelaBuscaProva);
    tblAdicionar.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }

    $('#btnCancelarProvaBusca').attr('href', FUNCAO_VAZIA).click(cancelarBusca);
    $('#btnAdicionarProvaBusca').attr('href', FUNCAO_VAZIA).click(salvarBusca);


    $('#listaAgendamentos .btnRemover').each(function () {
        $(this).click(function () {
            var idAgendamento = $(this).parents(".itemAgendamento").find('input[name="txtIdAgendamento"]').val();
            removerProva(idAgendamento);
        });
    });

    //carregar a prova selecionada
    $('#listaAgendamentos .btnVisualizarQuestao').each(function () {
        $(this).click(function () {
            var idAgendamento = $(this).parents(".itemAgendamento").find('input[name="txtIdAgendamento"]').val();
            visualizarQuestoes(idAgendamento);
        }).attr('href',FUNCAO_VAZIA);
    });

    tblListaQuestoes = new Tabela("#frmTabelaQuestoesResumo", 'tblQuestoes', false, new Ordenacao("modificado", true), undefined, "#frmSimulado");
    tblListaQuestoes.retornoCarregarTabela = retornoCarregarTabelaQuestoes;
    tblListaQuestoes.setTabelaExterna(false);

    $('#btnFecharVisualizar').attr('href', FUNCAO_VAZIA).click(fecharVisualizarQuestoes);

    dataMode.numero("input[name='txtDuracaoAgendamento']");


    //para as exclusivas
    dataMode.numero("input[name='txtIdGrupo']");
    $('.itemAgendamento').each(function () {

        acaoParaGrupos($(this))
        //aplicar as ações

    });

    //ação botao anular questões
    $('#listaAgendamentos .btnAnularQuestao').each(function () {
        $(this).click(function () {
            var idAgendamento = $(this).parents(".itemAgendamento").find('input[name="txtIdAgendamento"]').val();
            AnularQuestao(idAgendamento);
        }).attr('href', FUNCAO_VAZIA);
    });
}
function acaoParaGrupos(obj) {
    if (obj.find('input[name^="rdoExclusiva"]:checked').val() == 0) {
        obj.find('input[name="txtIdGrupo"]').val("");
        obj.find('input[name="txtIdGrupo"]').attr('readonly', 'readonly')
        obj.find('.boxGrupo').addClass('desabilitado');
    }

    obj.find('input[name^="rdoExclusiva"][value="0"]').click(function () {
        obj.find('input[name="txtIdGrupo"]').val("");
        obj.find('input[name="txtIdGrupo"]').attr('readonly', 'readonly')
        obj.find('.boxGrupo').addClass('desabilitado');
    })
    obj.find('input[name^="rdoExclusiva"][value="1"]').click(function () {
        obj.find('input[name="txtIdGrupo"]').val("1");
        obj.find('input[name="txtIdGrupo"]').removeAttr('readonly')
        obj.find('.boxGrupo').removeClass('desabilitado');
    })
}

function retornarTabelaBuscaProva(acao, dados) {
    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
        confirm.exibir($(dados), confirmaProva);
        carregando.esconder();
        return;
    }
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    switch (acao.toLowerCase()) {
        case 'adicionar':
            tblAdicionar.limpar();

            $('#listaAgendamentos').append($(dados));
            //aplicar ações
            //$(dados)
            carregando.esconder();
            dataMode.numero(".itemAgendamento:last-child input[name='txtDuracaoAgendamento']");
            //alert($('.itemAgendamento:last-child').length)

            $('.itemAgendamento:last-child .btnRemover').each(function () {
                $(this).click(function () {
                    var idAgendamento = $(this).parents(".itemAgendamento").find('input[name="txtIdAgendamento"]').val();
                    removerProva(idAgendamento);
                });
            });

            //carregar a prova selecionada
            $('.itemAgendamento:last-child .btnVisualizarQuestao').each(function () {
                $(this).click(function () {
                    var idAgendamento = $(this).parents(".itemAgendamento").find('input[name="txtIdAgendamento"]').val();
                    visualizarQuestoes(idAgendamento);
                }).attr('href', FUNCAO_VAZIA);
            });

            $('.itemAgendamento:last-child .btnAnularQuestao').each(function () {
                $(this).click(function () {
                    var idAgendamento = $(this).parents(".itemAgendamento").find('input[name="txtIdAgendamento"]').val();
                    AnularQuestao(idAgendamento);
                }).attr('href', FUNCAO_VAZIA);
            });

            acaoParaGrupos($('.itemAgendamento:last-child'))
            

            $('#dlgSelecionarProva').dialog("close");

            break;
    }

}
function adicionarProva() {
    $('#dlgSelecionarProva').dialog("open");
}
function salvarBusca() {
    
    carregando.mostrar();
    
    tblAdicionar.executarAcaoExterna("adicionar", caminhoBase + "/Simulado/AdicionarProvaBusca");
}

function cancelarBusca() {
    $('#dlgSelecionarProva').dialog('close');
}

function removerProva(idAgendamento) {

    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Simulado/RemoverProva/',
        data: $("#frmSimulado").serialize() + '&idAgendamento=' + idAgendamento,
        type: "POST",
        success: function (dados, status, xhttp) { retornoRemoverProva(idAgendamento, dados); }
    });
}
function retornoRemoverProva(idAgendamento, dados) {
    carregando.esconder();
    
    if (!retornoErro(dados)) {
        $('#listaAgendamentos .itemAgendamento:has("input[value=\"' + idAgendamento + '\"]")').remove();
    }
}
function visualizarQuestoes(idAgendamento) {
    $("#frmTabelaQuestoesResumo input[name='idAplicacaoSalvar']").val(idAgendamento);
    $('#dlgVisualizarQuestoes').dialog("open");
    tblListaQuestoes.recarregarTabela();

}
function fecharVisualizarQuestoes() {
    $('#dlgVisualizarQuestoes').dialog('close');
}
function AnularQuestao(id) {
    anularquestao.Abrir(id);
}
function RetornoAnularQuestoes(dados) {
    retornoErro(dados);
}
/* ******************** resumo ******************** */
function carregarResumo() {
    $.ajax({
        url: caminhoBase + '/Simulado/Resumo/',
        data: $(this).serialize() + '&' + $('#frmSimulado').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoResumo(dados); }
    });
}
function retornoResumo(dados) {
    if (!retornoErro(dados)) {
        $("div#cxaResumo").html($(dados));
    }
    trocarTela('resumo');
}
function inicializarResumo() {
    carregando.esconder();

    acaoSubmitSalvar(undefined);

    $('#btnVoltarResumo').click(function () { carregarTela('avaliacoes'); });
    $('#btnSalvarConfirmacao').attr('href', FUNCAO_VAZIA).click(function () { salvarConfirmacao(); });

    $('form#frmResumoSimulado').submit(function (e) {
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize() + "&" + $("#frmSimulado").serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoSalvarConfirmacao(dados); }
        });
        e.preventDefault();
    });


}

function retornoSalvarConfirmacao(dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    location.href = $(dados).text();

}

function salvarConfirmacao() {
    carregando.mostrar();

    $('form#frmResumoSimulado').submit();
}

/* TABELA de questões */

function retornoCarregarTabelaQuestoes(dados) {
    if (retornoErro(dados)) {
        return;
    }
    new QuestaoResumo("#tblQuestoes", "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");

}
function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados);
}

