var tblListaAlunos, tblListaProfessores;
var listaSuspensa;
var mensagem, confirm, dataMode;
var i = 0;


function tratarErroGerenciador(codMsg, strMensagem, tipo) {
    if (!tipo || Number(tipo) == 3) {
        var dados = mensagem.htmlTemplate("Error", true, "Usuário deslogado", "sessao");
        mensagem.exibir(dados, undefined, undefined);
    }
}

/* ************************************* CRIAÇÃO PROVA ************************************** */
function inicializar() {
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);
    //tblLista = new Tabela('frmTabela', 'tblAplicacoes', false, new Ordenacao("modificado", true), undefined);

    setBtnAtivo();
    $("#btnListaAlunos").attr("href", "javascript:;").click(function () {
        setBtnAtivo($(this)); abrirListaAlunos();
    });
    $("#btnListaProfessores").attr("href", "javascript:;").click(function () {
        setBtnAtivo($(this)); abrirListaProfessores();
    });

    $("#dlgResumoAplicacao").dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $('#btnCancelarResumo').click(function () { $("#dlgResumoAplicacao").dialog('close'); });
}

function abrirListaProfessores() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Coordenador/ListaProfessores',
        type: "POST",
        success: function (dados, status, xhttp) { retornoAbrirListaProfessores(dados); }
    });
}
function retornoAbrirListaProfessores(dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }
    $("#BoxListaCoordenador").html(dados);

    $("#btnClearFiltro").attr("href", "javascript:;").click(function () {
        $("#professorCoordenador").hide();
        $("input[name=txtNomeProcurado]").val("");
        $("#txtFiltros").val("[]");
    });

    $("#txtRealizacaoInicial").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });
    $("#txtRealizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });
    dataMode.data("#txtRealizacaoInicial, #txtRealizacaoFinal");

    var listaSuspensaProfessor;
    listaSuspensaProfessor = new ListaGerenciadorUsuarios("txtNomeProcuradoProfessor", "gg_listaUsuarioProfessor", retornoSelecionadoProfessor)
    listaSuspensaProfessor.userRede = true;
    listaSuspensaProfessor.papel = "3";
    listaSuspensaProfessor.caminhoBase = caminhoGerenciadorGrupos;
    listaSuspensaProfessor.erroCallBack = tratarErroGerenciador; 



    tblListaProfessores = new Tabela('frmTabela', 'tblAplicacoes', false, new Ordenacao("modificado", true), undefined);
    tblListaProfessores.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }


}
function retornoSelecionadoProfessor(id, nome) {
    $("#professorCoordenador").show();

    $("input[name=intIdProcurado]").val(id);
    $("input[name=txtNomeProcurado]").val(nome);
    $("span.SEC02511_texto b").text(nome);

    tblListaProfessores.recarregarTabela();
}



function abrirListaAlunos() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Coordenador/ListaAlunos',
        type: "POST",
        success: function (dados, status, xhttp) { retornoAbrirListaAlunos(dados); }
    });
}
function retornoAbrirListaAlunos(dados) {
    carregando.esconder();

    if (retornoErro(dados)) {
        return;
    }

    $('#dlgAlunos').remove();
    $("#BoxListaCoordenador").html(dados);

    

    $('#dlgAlunos').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false,
        width: 885, height: 560,
        modal: true,
        position: ['center', 'center'],
        draggable: false,
        resizable: false
    });
    carregarBotoesDialog();

      
    $("#btnSelecionarProcurado").attr("href", "javascript:;").click(function () { $("#dlgAlunos").dialog("open"); });

    $("#btnClearFiltro").attr("href", "javascript:;").click(function () {
        $("#alunoCoordenador").hide();
        $("input[name=txtNomeProcurado]").val("");
        $("#txtFiltros").val("[]");
    });


    $("#txtRealizacaoInicial").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });
    $("#txtRealizacaoFinal").datepicker({
        showOn: "button",
        buttonImage: pathImgCalendario(),
        buttonImageOnly: true
    });

    dataMode.data("#txtRealizacaoInicial, #txtRealizacaoFinal");
   
    var listaSuspensaAluno;
    listaSuspensaAluno = new ListaGerenciadorUsuarios("txtNomeProcuradoAluno", "gg_listaUsuarioAluno", retornoSelecionadoAluno)
    listaSuspensaAluno.userRede = true;
    listaSuspensaAluno.papel = "1";
    listaSuspensaAluno.caminhoBase = caminhoGerenciadorGrupos;
    listaSuspensaAluno.erroCallBack = tratarErroGerenciador;   




    tblListaAlunos = new Tabela('frmTabela', 'tblRealizacoes', false, new Ordenacao("modificado", true), undefined);
    tblListaAlunos.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }

}
function retornoSelecionadoAluno(id, nome) {
    $("#alunoCoordenador").show();

    $("input[name=intIdProcurado]").val(id);
    $("input[name=txtNomeProcurado]").val(nome);
    $("span.SEC02511_texto b").text(nome);

    tblListaAlunos.recarregarTabela();
}


function carregarUsuariosTurma(valor) {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Coordenador/usuariosTurma',
        type: "POST",
        data: "valor=" + valor,
        success: function (dados, status, xhttp) { retornoCarregarUsuariosTurma(dados); }
    });
}
function retornoCarregarUsuariosTurma(dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }
    $("#selcionarAluno").html(dados);

}


function carregarBotoesDialog() {
    $("#slcEnsinoProcurado").change(function () {
        if ($(this).val() != -1) {
            $.ajax({
                url: caminhoBase + '/Coordenador/CriarListaTurmas',
                type: "POST",
                data: "strNvEnsino=" + $(this).val(),
                success: function (dados, status, xhttp) { retornoEnsinoSelecionado(dados) },
                beforeSend: function () { carregando.mostrar(); }
            });
        }
    });

    $("#slcTurmaProcurada").change(function () {
        selectTurma($(this).val());
    });

    $("#btnAlterarTurma").attr("href", "javascript:;").click(function () {
        //$("span.textoTurma b").hide();  
        //$("#slcTurmaPopUp").show();
    });

    $("#btnCancelarAlunos").attr("href", "javascript:;").click(function () {
        $('#dlgAlunos').dialog("close");
    });

    $("#btnSelecionarAlunos").attr("href", "javascript:;").click(function () {
        if ($("#selcionarAluno input:checked").val() != undefined) {
            retornoSelecionadoAluno($("#selcionarAluno input:checked").val(), $("#selcionarAluno input:checked").parent("li").find("div").text());
            $('#dlgAlunos').dialog("close");
        } else {
            var dados = mensagem.htmlTemplate("Avaliações", true, RecursosJS["msg003"], 'alerta');
            mensagem.exibir($(dados));
        }
    });
}
function retornoEnsinoSelecionado(dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }
    $("#slcTurmaProcurada").find("option").each(function () {$(this).remove() });
    var option;
    $.each(dados.itens, function (i, obj) {
        option = $("<option>");
        if (obj.Selected) {
            option.attr("selected", "selected");
        }
        option.val(obj.Value).text(obj.Text).appendTo("#slcTurmaProcurada");
    });
}
function selectTurma(valor) {

    if (valor != 0) {
        carregarUsuariosTurma(valor);
    }
}


function functionCss() {

}
function setBtnAtivo(obj) {
    $("ul.coordenadorOpcoes a").removeClass("ativo");
    if (obj != undefined) {
        obj.addClass("ativo");
    } 
}
function ViewProva(id) {
    window.open(caminhoBase + '/Agendamento/VisualizacaoProva/' + id, 'VisualizaProva', 'width=800, height=600, scrollbars=1');
}

function ViewProvaRealizada(id) {
    window.open(caminhoBase + '/Realizacao/VisualizarRealizada/' + id, 'VisualizaProva', 'width=800, height=600, scrollbars=1');
}

function ViewResumoAplicacao(id) {
    carregando.mostrar();

    var load = document.createElement("div");
    load.className = "carregando";

    $("#formResumoAgendamento .popupConteudo").html($(load));

    $.ajax({
        url: $("#formResumoAgendamento").attr("action") + "/" + id,
        cache: false,
        type: "GET",
        success: function (dados, status, xhttp) { retornoResumoAplicacao(dados); }
    });

    $("#dlgResumoAplicacao").dialog('open');
}

function ViewResumoAplicacaoParalela(id, idConfig) {
    carregando.mostrar();

    var load = document.createElement("div");
    load.className = "carregando";

    $("#formResumoAgendamento .popupConteudo").html($(load));

    $.ajax({
        url: $("#formResumoAgendamento").attr("action") + "/" + id + "/" + idConfig,
        cache: false,
        type: "GET",
        success: function (dados, status, xhttp) { retornoResumoAplicacao(dados); }
    });

    $("#dlgResumoAplicacao").dialog('open');
}

function retornoResumoAplicacao(dados) {

    carregando.esconder();

    if (retornoErro(dados)) {
        $("#dlgResumoAplicacao").dialog('close');
        return;
    }
    $("#formResumoAgendamento .popupConteudo").html(dados);

    criarBotaoExpandirArea('#btnConfigAvancada', '.configAvancadas');

    $(".statusProva input[type=radio]").attr("disabled", "disabled");
}




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

function NovoRelatorio(id) {
    window.open(caminhoBase + '/Relatorio/VisualizaAgendamento/' + id, '', 'width=1020, height=600, scrollbars=1');
}