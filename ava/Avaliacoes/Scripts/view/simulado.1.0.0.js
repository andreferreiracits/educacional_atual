var tblLista, ajuda;
var mensagem, confirmacao, dataMode;


function inicializar() {
    mensagem = new Mensagem("alerta");
    confirmacao = new Confirm("alerta");
    dataMode = new DataMode(mensagem);

    $("input#txtRealizacaoInicial, input#txtRealizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });
    dataMode.data("input#txtRealizacaoInicial, input#txtRealizacaoFinal");

    tblLista = new Tabela('frmTabela', 'tblSimulados', true, false, retornarAcao);
    tblLista.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }
    tblLista.onExecutarAcao = function (acao) {
        if (acao.toLowerCase() == "cancelar" || acao.toLowerCase() == "excluir") {
            carregando.mostrar();
        }

    }


    $("#dlgRanking").dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false,
        close: function () { $("#dlgRanking .popupConteudo").html(''); }

    });
    
    
    $('#dlgRanking #btnCancelarRanking').click(function () {
        $("#dlgRanking").dialog('close');
    });

    $('#dlgRanking #btnGerarRanking').click(function () {
        CriarRanking();
    });
    $('#dlgRanking #btnVoltarRanking').click(function () {
        VoltarDialogoRanking();
    });
    $('#dlgRanking #btnContinuarGerarRanking').click(function () {
        IniciarGerarRanking();
    });
    $('#dlgRanking #btnVisualizarRanking').click(function () {
        VisualizarRanking();
    });
    $('#dlgRanking #btnLiberarRanking').click(function () {
        PublicarRanking();
    });
    $('#dlgRanking #btnOcultarRanking').click(function () {
        OcultarRanking();
    });

}

function retornarAcao(acao, dados) {

    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (acao.toLowerCase()) {
        case 'apagar':
            if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
                confirmacao.exibir($(dados), confirmaExcluirMassa);
                return;
            }
            mensagem.exibir($(dados));
            break;
        case 'excluir':
            carregando.esconder();
            if ($(dados).attr("class") && $(dados).attr('class').indexOf("confirm") > -1) {
                confirmacao.exibir($(dados), confirmaExcluir);
                return;
            }
            mensagem.exibir($(dados));
            break;
        case 'adicionar':
            break;
        case 'regerar':
            mensagem.exibir($(dados));
            break;
        case 'anularquestao':
            break;
        case 'cancelar':
            carregando.esconder();
            break;
        case 'excluida':
            carregando.esconder();
            break;
    }
    tblLista.recarregarTabela();
}


function confirmaExcluir() {
    carregando.mostrar();
    var idSimulado = $("#statusAtualConfirm").val();
    $.ajax({
        url: caminhoBase + '/Simulado/ExcluirSimulado/' + idSimulado,
        data: 'bolConfirmTipo=1',
        type: "POST",
        success: function (dados, status, xhttp) { retornarAcao('excluida', dados); }
    });
}

function confirmaExcluirMassa() {
    tblLista.executarAcaoMassa('apagar', true);
}

function DialogoRanking(idSimulado) {
    $("#dlgRanking .popupConteudo").html('');
    $("#dlgRanking").dialog('open');

    HideBotoes()

    ConteudoDialogRanking(idSimulado)
}

function ConteudoDialogRanking(idSimulado) {
    $.ajax({
        url: caminhoBase + '/Simulado/IniciarRanking/' + idSimulado,
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }

            carregando.esconder();

            $("#dlgRanking .popupConteudo").html(dados);

            AcaoBotoes();


        }
    });
}

function HideBotoes() {
    $('#dlgRanking #btnVisualizarRanking').hide();
    $('#dlgRanking #btnGerarRanking').hide();
    $('#dlgRanking #btnContinuarGerarRanking').hide();
    $('#dlgRanking #btnOcultarRanking').hide();
    $('#dlgRanking #btnLiberarRanking').hide();
    $('#dlgRanking #btnVoltarRanking').hide();
}
function AcaoBotoes() {
    HideBotoes()
    
    var estado = parseInt($('#dlgRanking input[name="status"]').val(), 10);
    var etapa = $('#dlgRanking input[name="etapa"]').val();

    if (estado == -1 && etapa == "criar") {
        $('#dlgRanking #btnGerarRanking').show();
    }else if (estado != -1 && etapa == "criar") {
        $('#dlgRanking #btnGerarRanking').show();
    }
    
    if (estado != -1 && etapa == "gerar") {
        $('#dlgRanking #btnVoltarRanking').show();
    }


    if ((estado == 0 || estado == 1 || estado == 2) && etapa == "gerar") {
        $('#dlgRanking #btnContinuarGerarRanking').show();
    }
    if ((estado == 3 || estado == 4 || estado == 5) && etapa != "visualizar") {
        $('#dlgRanking #btnVisualizarRanking').show();
    }
    if ((estado == 3 || estado == 5) && etapa != "gerar") {
        $('#dlgRanking #btnLiberarRanking').show();
    }
    if ((estado == 4) && etapa != "gerar") {
        $('#dlgRanking #btnOcultarRanking').show();
    }
}
function VoltarDialogoRanking() {
    ConteudoDialogRanking($('#frmRankingSimulado input[name="IdSimulado"]').val());    
}


function CriarRanking() {
    var estado = parseInt($('#dlgRanking input[name="status"]').val(), 10);
    var etapa = $('#dlgRanking input[name="etapa"]').val();

    if (estado != -1 && etapa == "criar") {
        if (!confirm("deseja criar um novo ranking?")) {
            return;
        }
    }

    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Simulado/CriarRanking/',
        data: $('#frmRankingSimulado').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
            } else {
                IniciarGerarRanking()
            }
        }
    });

}
function IniciarGerarRanking() {

    $.ajax({
        url: caminhoBase + '/Simulado/IniciarGerarRanking/' + $('#frmRankingSimulado input[name="IdSimulado"]').val(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }
            carregando.esconder();

            $("#dlgRanking .popupConteudo").html(dados);

            HideBotoes();

            GeracaoRecursiva();
        }
    });
}

function GeracaoRecursiva() {
    $.ajax({
        url: caminhoBase + '/Simulado/GerarRankingUsuario/' + $('#frmRankingSimulado input[name="IdSimulado"]').val(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }

            $("#dlgRanking #logGerar").append($(dados))

            $("#dlgRanking #progressbar").progressbar({
                value: parseInt($(dados).attr('title'),10)
            });

            if ($(dados).hasClass('fim')) {
                ConsolidarRanking();
            } else if ($(dados).hasClass('proximo')) {
                GeracaoRecursiva();
            }
        }
    });
}

function ConsolidarRanking() {
    $("#dlgRanking #criarRanking #logGerar").append($('<p>Início consolidação</p>'))

    $.ajax({
        url: caminhoBase + '/Simulado/ConsolidarRankingGeral/' + $('#frmRankingSimulado input[name="IdSimulado"]').val(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }

            $("#dlgRanking #logGerar").append($(dados))

            if ($(dados).hasClass('fim')) {
                $('#dlgRanking input[name="status"]').val('3')
                AcaoBotoes();
            }
        }
    });
}

function PublicarRanking() {
    $.ajax({
        url: caminhoBase + '/Simulado/PublicarRanking/' + $('#frmRankingSimulado input[name="IdSimulado"]').val(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }

            $('#dlgRanking input[name="status"]').val('4')
            AcaoBotoes();

        }
    });
}
function OcultarRanking() {
    $.ajax({
        url: caminhoBase + '/Simulado/OcultarRanking/' + $('#frmRankingSimulado input[name="IdSimulado"]').val(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }

            $('#dlgRanking input[name="status"]').val('5')
            AcaoBotoes();

        }
    });
}
function VisualizarRanking() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Simulado/VisualizarRanking/' + $('#frmRankingSimulado input[name="IdSimulado"]').val(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                carregando.esconder();
                return;
            }
            carregando.esconder();

            $("#dlgRanking .popupConteudo").html(dados);

            new Tabela('frmRankingSimulado', 'tblVisualizarRanking', true, false, undefined);

            AcaoBotoes();

        }
    });
}