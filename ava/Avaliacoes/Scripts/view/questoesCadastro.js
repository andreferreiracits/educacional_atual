var FUNCAO_VAZIA = 'javascript:void(0)';
var tblLista;
var mensagem, confirm, dataMode, ajudaCad;
var simplesTip;

/* ************************************* QUESTAO ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta", "#prevAviso");
    confirm = new Confirm("alerta", "#prevAviso");
    dataMode = new DataMode(mensagem);
    ajudaCad = new Ajuda();
    ajudaCad.criar("helpCadQuestao", "helpCadQuestaoCaixa", RecursosJS["msg008"]);
    ajudaCad.criar("helpFilCadQuestao", "helpFilQuestaoCaixa", RecursosJS["msg009"]);
    
    $("input#txtModificadoInicial, input#txtModificadoFinal").datepicker({
        showOn: "button",
        buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
        buttonImageOnly: true
    });
    dataMode.data("input#txtModificadoInicial, input#txtModificadoFinal");

    //formularios para o filtro

    tblLista = new Tabela('frmTabelaQuestao', 'tblQuestoes', false, new Ordenacao("modificado", true), retornarAcao, '.dlgFiltroClassificacao > form');
    tblLista.atualizarSelecionados = true;
    tblLista.checkBoxName = "chkQuestao"; 

    tblLista.setOpenFiltro(abriuFiltro)
    tblLista.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }

        new QuestaoResumo('#tblQuestoes', "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra");

        simplesTip = new SimpleTipLoad('a.btnEdicaoRapida', 'dialogEdicaoRapida', '.opcoes', 10, '.fechar', retornoEdicaoRapida, closeEdicaoRapida, antesEdicaoRapida, retornoMsgEdicaoRapida);

        ajusteFiltroClassificacao();

        //aplicar o paginador aqui
        this.aplicarIrPara();
        //clearInputClassificacao();
    }
    tblLista.onExecutarAcao = function (acao) {
        if (acao.toLowerCase() == "editar" || acao.toLowerCase() == "excluir" || acao.toLowerCase() == 'revisar') {
            carregando.mostrar();
        }
    }
    

    initClassificacaoListaQuestoes();

    criarBotaoExpandirOpcoesFiltro('#qtdOpcao', '#maisMenos');

    //dialogo selecionar banco
    $("#dlgTipoBanco").dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $("#dlgAvaliacaoRapida").dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false,
    });

    $('#btnCancelarBanco').attr('href', FUNCAO_VAZIA).click(function () { $("#dlgTipoBanco").dialog("close"); });
    $('#btnAbrirBanco').attr('href', FUNCAO_VAZIA).click(function () { abrirDialogoBanco(); });

    $('#btnConcluirBanco').attr('href', FUNCAO_VAZIA).click(function () { adicionarFiltroBanco(); });


    $("input[name=rdoFinalidade]").change(function () {
        var arr = $(this).attr("id").split('_');

        if (arr[1] == 0) {

            $("input[name=lstClassificacaoTipo]").parent("span.cad_classificacao").show();

        } else {
            var classificacoes = arr[1].split('=');

            $("input[name=lstClassificacaoTipo]").parent("span.cad_classificacao").hide();

            $.each(classificacoes, function (i, escolhido) {
                if (i != 0) {
                    $("input#lstClassificacaoTipo_" + escolhido).parent("span.cad_classificacao").show();
                }
            });
        }
    });

    //mostrar ou não os botões das classificação de acordo com o banco
    $('input[name="chkFinalidade"]').click(function () {
        habilitarDesabilitarClassificacao();
    });
    habilitarDesabilitarClassificacao();
    //

    //acoes em massa

    aplicarAcaoMassa();


    //combo nquestoes por pagina
    $('div.ferramentas > div.funcao > div.slc.totalpagina').combo({
        close: "fechar",
        onOpen: function () {},
        onClose: function () { }
    }).find(".opcoes > a").click(function(){
        $("#intTamanhoPagina").val($(this).text());
        $('div.ferramentas > div.funcao > div.slc.totalpagina > a.nome').click();
        $('div.ferramentas > div.funcao > div.slc.totalpagina > a.nome > span').text($(this).text());
        tblLista.executarNovoFiltro();
    });


    setTimeout(tblLista.executarNovoFiltro, 100);

}

function habilitarDesabilitarClassificacao() {
    $('input[name="chkFinalidade"]:not(:checked)').each(function () {
        $('input[name="bancoPertence"][value="' + $(this).val() + '"]').parents('span.cad_classificacao').hide();
        $('input[name="bancoPertence"][value="' + $(this).val() + '"]').parents('form.formClassificacaoFiltro').find('input[type="checkbox"]:checked').removeAttr('checked');
    });
    $('input[name="chkFinalidade"]:checked').each(function () {
        $('input[name="bancoPertence"][value="' + $(this).val() + '"]').parents('span.cad_classificacao').show();
    });
    
}


function abriuFiltro() {
    //clearInputClassificacao();
    $("#fitrosBanco").html('');
}
/* relativo ao filtro 'banco de questão' */
function abrirDialogoBanco() {
    $("#dlgTipoBanco").dialog("open");
    $("#treeBanco").html("");
    $("<div>").attr("class", "carregando").appendTo("#treeBanco");
    $.ajax({
        url: caminhoBase + '/Questoes/CarregarArvoreBancoQuestao/',
        type: 'POST',
        success: function (dados) {
            carregando.esconder();
            if (retornoErro(dados)) {
                return;
            }
            $("#treeBanco").html(dados);
        }
    });
}
function adicionarFiltroBanco() {
    $("#dlgTipoBanco input:checked").map(function () {
        var idSpan = 'filtroBanco_' + this.value;

        var strNome = $(this).parents("label").find("span").text();

        if (this.name == "boxMeu") {
            $("#fitrosBanco").append("<span id='" + idSpan + "'></span>");
            $("#" + idSpan).addClass('botaoFiltro');
            $("#" + idSpan).append("<input type='hidden' name='meuBanco' value='" + this.value + "'/>");
            $("#" + idSpan).append("<span>" + strNome + "</span>");
            $("#" + idSpan).append("<a class='botaoFechar' href='javascript:void(0)'>x</a>");

            $('a.botaoFechar', $("#" + idSpan)).attr('href', 'javascript:void(0)').click(function () {
                $($("#" + idSpan)).remove();
            });
        }
        else {

            $("#fitrosBanco").append("<span id='" + idSpan + "'></span>");
            $("#" + idSpan).addClass('botaoFiltro');
            $("#" + idSpan).append("<input type='hidden' name='slcBanco' value='" + this.value + "'/>");
            $("#" + idSpan).append("<span>" + strNome + "</span>");
            $("#" + idSpan).append("<a class='botaoFechar' href='javascript:void(0)'>x</a>");

            $('a.botaoFechar', $("#" + idSpan)).attr('href', 'javascript:void(0)').click(function () {
                $($("#" + idSpan)).remove();
            });
        }



    });

    $("#dlgTipoBanco").dialog("close");
}

/* relativo os filtros de classificacao */


function criarBotaoExpandirOpcoesFiltro(sBotao, sBox) {
    if ($(sBotao).length <= 0)
        return;

    var txtBotao = $(sBotao).html().split("|");

    $(sBotao).attr("txtShow", txtBotao[0]);
    $(sBotao).attr("txtHide", txtBotao[1]);
    $(sBotao).attr("areaBox", sBox);


    if ($(sBox).is(":visible")) {
        $(sBotao).html($(sBotao).attr("txtHide"));
    } else {
        $(sBotao).html($(sBotao).attr("txtShow"));
    }

    $(sBotao).click(function () {

        if ($($(this).attr("areaBox")).is(":visible")) {
            $($(this).attr("areaBox")).hide('slow');
            $(this).html($(this).attr("txtShow"));
        } else {
            $($(this).attr("areaBox")).show('slow');
            $(this).html($(this).attr("txtHide"));
        }
    });
}

function retornarAcao(acao, dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    
    switch (acao.toLowerCase()) {
        case 'apagar':
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluirMassa);
                return;
            }
            mensagem.exibir($(dados));
            break;

        case 'excluida':
            carregando.esconder();
            mensagem.exibir($(dados));
            break;

        case 'excluir':
            carregando.esconder();
            if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
                confirm.exibir($(dados), confirmaExcluir);
                return;
            }
            break;

        case 'adicionar':
            mensagem.exibir($(dados));
            break;

        case 'salvar':
            mensagem.exibir($(dados));
            carregando.esconder();
            break;

        case 'editar':
            checkEditar(dados)
            return;
            break;
        case 'revisar':
            checkEditar(dados)
            return;
            break;
        case 'status':
            mensagem.exibir($(dados));
            carregando.esconder();
            tblLista.executarNovoFiltro()
            return;
            break;
        case 'compartilhar':
            mensagem.exibir($(dados));
            carregando.esconder();
            tblLista.executarNovoFiltro()
            return;
            break;
        case 'ano':
            mensagem.exibir($(dados));
            carregando.esconder();
            tblLista.executarNovoFiltro()
            return;
            break;
        case 'criarprova':
            carregando.mostrar();
            window.location = dados.UrlCriacaoProva;
            return;
            break;
        case 'criarprovarapida':
            inicioAvaliacoesRapida(dados);
            break;  
        case 'imprimirresumoquestoes':
            inicioResumoQuestoes(dados);
            return;
        break;

    }

    tblLista.recarregarTabela();
}

function antesEdicaoRapida(btn) {
     tblLista.lockHoverLinha(btn.parent().parent().parent());
}


function retornoEdicaoRapida(btn) {
    var tag = new Tags("edicaoRapidaF", "txtEditavel", "txtTags", 25);

    $('#frmEdicaoRapida').submit(function (e) {
        carregando.mostrar();

        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornarAcao('salvar', dados); }
        });
        e.preventDefault();
    });

    $('#btnAtualizarRapida').click(function () {
        $('#frmEdicaoRapida').submit();
        simplesTip.closeSimpleTip();
    });

    retornoEdicacaoRapidaClassificacao();
}

function closeEdicaoRapida() {
    tblLista.unlockHoverLinha();
}

function checkEditar(dados) {
    if (retornoErro(dados)) {
        return;
    }
    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
        carregando.esconder();
        confirm.exibir($(dados), this.confirmaEditarEmUso);
        return;
    }
    location.href = $(dados).text();
}
function confirmaEditarEmUso() {
    carregando.mostrar();
    var idQuestao = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Questoes/EditarEmUso/' + idQuestao,
        data: $(this).serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornarConfirmarEditarEmUso(dados); }
    });
}
function retornarConfirmarEditarEmUso(dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    location.href = $(dados).text();
}
function confirmaExcluir() {
    carregando.mostrar();
    var idQuestao = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Questoes/ExcluirQuestao/' + idQuestao,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornarAcao('excluida', dados); }
    });
}
function confirmaExcluirMassa() {
    
    tblLista.executarAcaoMassa('apagar', true);
}
function retornoMsgEdicaoRapida(dados) {
    closeEdicaoRapida();
    if (retornoErro(dados)) {
        return;
    }
    if ($(dados).attr('class') && $(dados).attr('class').indexOf("confirm") > -1) {
        confirm.exibir($(dados), confirmaEditarEmUsoEdicaoRapida);
        return;
    }
}
function confirmaEditarEmUsoEdicaoRapida() {
    var idQuestao = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Questoes/EditarEmUso/' + idQuestao,
        data: $(this).serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornarConfirmarEditarEmUsoEdicaoRapida(dados); }
    });
}

function aplicarAcaoMassa() {
    $('a.statusMassa > input[type="radio"]').hide();

    $('a.statusMassa').click(function () {
        $(this).find('input[type="radio"]').attr('checked', 'checked');

        tblLista.executarAcaoMassa('status');
    });

    $('a.compartilharMassa > input[type="radio"]').hide();

    $('a.compartilharMassa').click(function () {
        $(this).find('input[type="radio"]').attr('checked', 'checked');

        tblLista.executarAcaoMassa('compartilhar');
    });

    dataMode.ano('#txtAnoMassa');
    $('a.anoMassa').click(function () {
        tblLista.executarAcaoMassa('ano');
    });
    $('a.criarProva').click(function () {
        tblLista.executarAcaoMassa('criarProva');
        carregando.mostrar();
    });
    $('a.criarProvaRapida').click(function () {
        tblLista.executarAcaoMassa('criarProvaRapida');
        carregando.mostrar();
    });
    $('a.imprimirResumoQuestoes').click(function () {
        tblLista.executarAcaoMassa('imprimirResumoQuestoes');
        carregando.mostrar();
    });
    
    //compartilhamento
}

function retornarConfirmarEditarEmUsoEdicaoRapida(dados) {
    if (!retornoErro(dados))
        tblLista.recarregarTabela();
}
function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados);
}

//**** Resumo Questões *****/
function inicioResumoQuestoes(html){
    
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    removeFrame = function () {
        $(iframe).remove();
    }
    setTimeout(removeFrame, 15000); 
    carregando.esconder();
}

//****Avaliação rapida****//
function inicioAvaliacoesRapida(json) {
    $dialogo = $("#dlgAvaliacaoRapida");


    limparDialog = function(){
        $dialogo.find("#cxaAgendamento").html("");
        $dialogo.find("#cxaProva").html("");
        $dialogo.find("input").unbind("change").unbind("click").unbind("blur");
    }

    /*nova prova...*/
    aplicarFuncoesAplicacao = function () {
        var $content = $dialogo.find("#cxaAgendamento");


        /* regras de "conflitos" de configuraçoes */
        function testCorrecao() {
            //se tiver checado desabilita
            if ($('#checkCorrecao').is(':checked')) {
                if (!$('#rdoCorrecaoEncerrar').is(':checked')) {
                    $('#rdoCorrecaoEncerrar').click();
                }
            }

            genericDesativaRadio("#checkCorrecao", "#caixaCorrecao", 'input[name="rdoCorrecao"]', true);
            genericDesativaRadio("#rdoCorrecaoSem", "#caixaCorrecao", 'input[name="rdoDivulgaNota"]', true);

            if ($('#rdoCorrecaoSem').is(':checked')) {
                $('input[name="rdoDivulgaNota"]').removeAttr('checked');
            } else {
                if ($('input[name="rdoDivulgaNota"]:checked').length <= 0) {
                    $('#rdoDivulgaNotaTodas').attr('checked', 'checked');
                }
            }
            genericTestCheckBox("#rdoCorrecaoData", '#boxDataCorrecao', false);
        }
        function testGabarito() {
            genericTestCheckBox("#rdoGabaritoData", '#boxDataGabarito', false);
            genericDesativaRadio("#rdoGabaritoSem", "#caixaDivulgacaoGabarito", "#rdoComentarioNao", true);
            genericDesativaRadio("#rdoGabaritoSem", "#caixaDivulgacaoGabarito", "#rdoComentarioSim", true);
        }
        function testLowUp() {
            if ($('#ckdUpLow').is(':checked')) {
                $('#hidUpLow').val('1')
            } else {
                $('#hidUpLow').val('0')
            }
        }
        function genericDesativaRadio(checkBox, boxDisable, radioDisable, checado) {

            var check = $(checkBox).is(":checked");

            if (check == checado) {
                $(boxDisable).find(radioDisable).attr('disabled', 'disabled');
                $(radioDisable).parent().addClass('desabilitado');
            } else {
                $(boxDisable).find(radioDisable).removeAttr('disabled');
                $(radioDisable).parent().removeClass('desabilitado');
            }
        }

        function genericTestCheckBox(checkBox, boxDisable, checado) {
            var check = $(checkBox).is(":checked")

            var box = $(boxDisable);

            if (check == checado) {
                box.addClass('desabilitado');
                $(boxDisable).find("input").attr('disabled', 'disabled');
            } else {
                box.removeClass('desabilitado');
                $(boxDisable).find("input").removeAttr('disabled');
            }
        }

        function testDica() {
            genericTestCheckBox("#rdoDicasNao", '#boxTentativaDica', true);
        }

        function testTentativas() {
            genericTestCheckBox("#rdoTentativaNao", '#boxTentativas', true);
        }

          $content.find(".txtData").datepicker({
              showOn: "button",
              buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
              buttonImageOnly: true
          });
          dataMode.data(".txtData");
          $content.find(".txtHora").timePicker();
          dataMode.hora(".txtHora");

          /* conflito entre parametros */
          $content.find('#ckdUpLow').click(testLowUp);
          $content.find("input[name='rdoCorrecao']").change(testCorrecao);
          $content.find("input[name='checkCorrecao']").change(testCorrecao);
          $content.find("input[name='rdoGabarito']").change(testGabarito);
          $content.find("input[name='rdoDicas']").change(testDica);
          $content.find("input[name='rdoTentativa']").change(testTentativas);

          $content.find(".txtTentativa").keydown(function (e) {

            if (e.which != 8 && e.which != 9 && (e.which < 47 || e.which > 58) && (e.which < 96 || e.which > 105)) {
                return false;
            }
        });


          testLowUp();
          testCorrecao()
          testGabarito();
          testDica();
          testTentativas();
    }
    criarAplicacao = function () {
        $.ajax({
            url: caminhoBase + '/Agendamento/AvaliacaoCriarAgendamentoRapido/' + json.IdProva,
            type: 'POST',
            success: function (data) { retornoCriarAplicacao(data); }
        });
    }
    retornoCriarAplicacao = function (dados) {
        carregando.esconder();

        var continuar = true;
        if (retornoErro(dados)) {
            carregando.esconder();
            continuar = false;
        }
        if ( $(dados).hasClass("sucesso") && $(dados).hasClass("alerta")) {
            mensagem.exibir($(mensagem.htmlTemplate("Avaliações", false, $(dados).find("#mensagem").html() + "</br> Avaliação: " + json.IdProva + " Agendamento: " + json.IdAplicacao, "sucesso alerta")));
            limparDialog();
            $dialogo.dialog("close");
            continuar = false;
        }

        if (!continuar)
            return;

        $dialogo.find("#cxaAgendamento").hide().show("fast").html(dados);
        aplicarFuncoesAplicacao();
        $dialogo.find("#btnAgendamentoAvaliacaoRapida").hide();

        var apliForm = $dialogo.find("#frmSalvarParticipantesPortais");
        
        json.IdAplicacao = apliForm.find("#txtIdAplicacaoParticipantesPortais").val();

        apliForm.submit(function (e) {
            $.ajax({
                url: apliForm.attr("action"),
                type: 'POST',
                data: apliForm.serialize(),
                beforeSend: function () { carregando.mostrar(); },
                success: function (data) { retornoCriarAplicacao(data); }
            });
            e.preventDefault();
        });
        carregando.esconder();

        $dialogo.find("#btnConcluirAvaliacaoRapida").text("Agendar").unbind("click").click(function(){
            apliForm.submit();
        }).show();
    }
    criarProva = function () {
        $.ajax({
            url: caminhoBase +'/Criacao/EstruturaProvaRapida/' + json.IdProva,
            type: 'POST',
            success: function (data) { retornoCriarProva(data); }
        });
    }
    retornoCriarProva = function (dados) {
        var continuar = true;
        if (retornoErro(dados)) {
            carregando.esconder();
            continuar = false;
        }
        if (dados.status && dados.status == "publicada") {
      
            confirm.exibir(
                $(mensagem.htmlTemplate("Avaliações", false, "Avaliação("+json.IdProva+") foi criada com sucesso, deseja associa-la a um agendamento?", "sucesso alerta"))
                ,function (){
                    criarAplicacao();
                }, function (){
                    limparDialog();
                    $dialogo.dialog("close");
                    carregando.esconder();
                }
            );
            continuar = false;
        }

        if (!continuar)
            return;

        $dialogo.find("#cxaProva").hide().show("fast").html(dados);

        var provaForm = $dialogo.find("#frmProvaEstruturaRapida");
        $("<input>").attr({ "type": "hidden", "name": "idProvaSalvar" }).val(json.IdProva).appendTo(provaForm);
        provaForm.submit(function (e) {
            $.ajax({
                url: provaForm.attr("action"),
                type: 'POST',
                data: provaForm.serialize(),
                beforeSend: function () { carregando.mostrar(); },
                success: function (data) { retornoCriarProva(data); }
            });
            e.preventDefault();
        });
        carregando.esconder();
        $dialogo.find("#btnConcluirAvaliacaoRapida").text("Criar").unbind("click").click(function(){
            provaForm.submit();
        }).show();
        $dialogo.dialog("open");
    }

    limparDialog();
    criarProva();

    $('#btnConcluirAvaliacaoRapida').attr('href', FUNCAO_VAZIA).hide();
    $('#btnCancelarAvaliacaoRapida').attr('href', FUNCAO_VAZIA).click(function () { $dialogo.dialog("close"); });
}