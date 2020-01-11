var FUNCAO_VAZIA = 'javascript:void(0)';
var proximaTela = "";
var aba, mensagem, instrucao, tblAdicionar, popupImagem, confirm, dataMode, ajuda;
var formVez;
var Templates = [];
var tblListaQuestoes;
var lnkBusca;

function tratarErroGerenciador(codMsg, strMensagem, tipo) {
    if (!tipo || Number(tipo) == 3) {
        var dados = mensagem.htmlTemplate("Error", true, "Usuário deslogado", "sessao");
        mensagem.exibir(dados, undefined, undefined);
    }
}

function inicializar() {
    aba = new Aba('menuNavegacaoAplicacao', carregarTela);
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");
    dataMode = new DataMode(mensagem);
    ajuda = new Ajuda();

    $('#frmAplicacao').submit(function (e) {

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
            success: function (dados, status, xhttp) { retornoAplicacao(dados); }
        });
        e.preventDefault();
    });

    criarBotaoExpandirArea('#btnOcultarHistorico', '#contentHistorico');

    carregarTela('estrutura');
}

function acaoSubmitSalvar(form2) {
    formVez = form2;
}

function carregarTela(tela) {
    proximaTela = tela;
    $('#frmAplicacao').submit();
}

function trocarTela(tela) {
    aba.selecionar(tela);
    
    switch (tela) {
        case 'estrutura':
            $("#cxaEstrutura").show();
            hideBoxArea("#cxaParticipantes");
            hideBoxArea("#cxaConfiguracao");
            hideBoxArea("#cxaConfirmacao");
            inicializarEstrutura();
            break;
        case 'participantes':
            hideBoxArea("#cxaEstrutura");
            $("#cxaParticipantes").show();
            hideBoxArea("#cxaConfiguracao");
            hideBoxArea("#cxaConfirmacao");

            inicializarParticipantes();
            break;
        case 'configuracao':
            hideBoxArea("#cxaEstrutura");
            hideBoxArea("#cxaParticipantes");
            $("#cxaConfiguracao").show();
            hideBoxArea("#cxaConfirmacao"); 

            inicializarConfiguracao();
            break;
        case 'confirmacao':
            hideBoxArea("#cxaEstrutura");
            hideBoxArea("#cxaParticipantes");
            hideBoxArea("#cxaConfiguracao");
            $("#cxaConfirmacao").show();

            inicializarConfirmacao();
            break;
    }
    
    $(window).scrollTop(0);
}

function hideBoxArea(sBox) {
    $(sBox).html('');
    $(sBox).hide();
}

function retornoAplicacao(dados) {

    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (proximaTela) {
        case 'estrutura': carregarEstrutura(); break;
        case 'participantes': carregarParticipantes(); break;
        case 'configuracao': carregarConfiguracao(); break;
        case 'confirmacao': carregarConfirmacao(); break;
    }

}
/* ******************** Estrutura ******************** */
function carregarEstrutura() {
    $.ajax({
        url: caminhoBase + '/Agendamento/Estrutura/',
        data: $(this).serialize() + '&' + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoEstrutura(dados); }
    });
}
function retornoEstrutura(dados) {
    if (!retornoErro(dados)){
        $('div#cxaConfirmacao').empty();
        $('div.popup').remove();
        $("div#cxaEstrutura").html($(dados));
    }
    trocarTela('estrutura');
}
function inicializarEstrutura() {
    carregando.esconder();

    acaoSubmitSalvar($("#frmEstruturaAplicacao"));

    ajuda.criar("helEstruturaAgendamento", "helEstruturaAgendamentoCaixa", RecursosJS["msg025"]);

    lnkBusca = $('#btnAdicionarProvaBusca').attr('href');
    tblAdicionar = new Tabela('frmTabelaBusca', 'tblBusca', false, new Ordenacao("nome", true), retornarTabelaBuscaProva);
    tblAdicionar.retornoCarregarTabela = function (dados) {
        retornoErro(dados);
    }

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
    

    $("input#txtModificadoBuscaInicial, input#txtModificadoBuscaFinal").datepicker({
        showOn: "button",
        buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
        buttonImageOnly: true
    });
    dataMode.data("input#txtModificadoBuscaInicial, input#txtModificadoBuscaFinal");


    $('#btnCancelarProvaBusca').attr('href', FUNCAO_VAZIA).click(cancelarBusca);
    $('#btnAdicionarProvaBusca').attr('href', FUNCAO_VAZIA).click(function () { salvarBusca(lnkBusca); });

    $('#btnAdicionarProva').attr('href', FUNCAO_VAZIA).click(abrirProvaBusca);

    inicializarItemProva($('#listaProvas > div').last());
    atualizarBtnAdicione();

    $('#btnAvancarProva').click(function () { carregarTela('participantes'); });

    //carregar a prova selecionada
    tblListaQuestoes = new Tabela("#frmTabelaQuestoes", 'tblQuestoes', false, new Ordenacao("modificado", true), undefined, "#frmAplicacao");
    tblListaQuestoes.retornoCarregarTabela = retornoCarregarTabelaQuestoes

    $('#btnFecharVisualizar').attr('href', FUNCAO_VAZIA).click(fecharVisualizarQuestoes);

    $('#btnOcultarQuestoes').attr('href', FUNCAO_VAZIA).click(ocultarQuestoesProva);

    $('#btnBuscarProvas').click(function () {
        $('#frmTabelaBusca').submit();
    });

}

function carregarPopupImagem(field, url, type, win) {
    var wMaxImageResize = 500;
    var hMaxImageResize = 375;
    var wenv;
    var data = new Date().getDate();
    var id = $("#txtIdAplicacao").val();

    popupImagem = { 'field': field, 'win': win };

    wenv = window.open(caminhoBase + "/Agendamento/AnexarImagem/" + id, "wndEnviar_" + data, "height=190,width=380");
    wenv.focus();
}

function carregarCaminhoImagem(caminho) {
    
    popupImagem.win.document.forms[0].elements[popupImagem.field].value = caminho;
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

            $('#listaProvas').append($(dados));

            inicializarItemProva($('#listaProvas > div').last());
            carregando.esconder();
            atualizarBtnAdicione();

            $('#dlgSelecionarProva').dialog("close");

            break;
    }
    
}
function confirmaProva() {
    carregando.mostrar();
    tblAdicionar.executarAcaoExterna("adicionar", lnkBusca, "bolConfirmTipo=1");
}
function atualizarBtnAdicione() {
    if ($('div.itemProva').size() > 0) {
        $('#caixaAdicionar').hide();
    } else {
        $('#caixaAdicionar').show();
    }
}

/* Questoes busca */
function abrirProvaBusca() {
    $('#dlgSelecionarProva').dialog('open');
}

function salvarBusca(link) {
    carregando.mostrar();
    tblAdicionar.executarAcaoExterna("adicionar", link);
}

function cancelarBusca() {
    $('#dlgSelecionarProva').dialog('close');
}

function inicializarItemProva(objeto) {

    instrucao = new Instrucao("txtInstrucao");

    $('a.btnRemover', objeto).attr('href', FUNCAO_VAZIA).click(function () { removerProva(); });

    $('#btnVisualizarQuestao').attr('href', FUNCAO_VAZIA).click(abrirVisualizarQuestoes);

    


}

function removerProva() {
    carregando.mostrar();
    $.ajax({
        url: caminhoBase + '/Agendamento/RemoverProva/',
        data: $(this).serialize() + '&' + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            retornoRemoverProva(dados);
        }
    });
}

function retornoRemoverProva(dados) {
    carregando.esconder();
    if (retornoErro(dados)){
        return;
    }
    $('div.itemProva').remove();
    atualizarBtnAdicione();
    
}

/* Visualizar Questões */


function abrirVisualizarQuestoes() {

    tblListaQuestoes.recarregarTabela()
    $('#dlgVisualizarQuestoes').dialog('open');

}
function ocultarQuestoesProva() {

    $.ajax({
        url: caminhoBase + '/Agendamento/OcultarQuestoes/',
        data: $("#frmTabelaQuestoes").serialize() + "&" + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoOcultarQuestoesProva(dados); }
    });
}
function retornoVisualizarQuestoes(dados) {
    if (retornoErro(dados)) {
        return;
    }
    $("#frmTabelaQuestoes .popupConteudo").html(dados);

}
function retornoOcultarQuestoesProva(dados) {
    if (retornoErro(dados)) {
        return;
    }
    $('#dlgVisualizarQuestoes').dialog('close');
}
function fecharVisualizarQuestoes() {
    $('#dlgVisualizarQuestoes').dialog('close');
}



/* ********************** Participantes ********************** */
function carregarParticipantes() {
    $.ajax({
        url: caminhoBase + '/Agendamento/Participantes/',
        data: $(this).serialize() + '&' + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoParticipantes(dados); }
    });
}

function retornoParticipantes(dados) {
    if (!retornoErro(dados)) {
        $('div.popup').remove();
        $("div#cxaParticipantes").html($(dados));
    }
    trocarTela('participantes');
}
var controleIncluirUsuario;
var controleListaUsuario;
function inicializarParticipantes() {
    acaoSubmitSalvar(undefined);

    ajuda.criar("helpParticipantesAvaliacao", "helpParticipantesAvaliacaoCaixa", RecursosJS["msg026"]);

    carregando.esconder();
    
    $('#dlgGrupos').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });
    $('#dlgGruposDebug').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });
    $('#dlgUsuarioDebug').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });
    $('#dlgUsuario').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });
    $('#dlgPortal').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });


    $('#btnAdicioneGrupos').attr('href', FUNCAO_VAZIA).click(function () { abrirAdicionarGrupos(); });
    $('#btnAdicionePortal').attr('href', FUNCAO_VAZIA).click(function () { abrirAdicionarPortais(); });
    $('#btnAdicioneUsuarioDebug').attr('href', FUNCAO_VAZIA).click(function () { abrirAdicionarUsuario(); });

    var lstIdsUsuarios = [];
    $('#tblUsuarios input[name="idParticipanteUsuario"]').each(function () {
        lstIdsUsuarios.push(this.value);
    });


    if (  !$('#dlgGruposDebug').length > 0 ) {

        var listaSuspensaUsuarios;
        listaSuspensaUsuarios = new ListaGerenciadorUsuarios("strBuscaUsuario", "gg_listaUsuarioAluno", retornoSelecionadoAluno)
        listaSuspensaUsuarios.userRede = true;
        listaSuspensaUsuarios.papel = "0";
        listaSuspensaUsuarios.caminhoBase = caminhoGerenciadorGrupos;
        listaSuspensaUsuarios.erroCallBack = tratarErroGerenciador;

        controleIncluirUsuario = new ListaPersonalizarGrupo('conteudoDialogoUsuarios', caminhoGerenciadorGrupos, 'btnAdicionarUsuario', function (ret) { retornoUsuariosSelecionados(ret) }, lstIdsUsuarios.join(','), function (load) { if (load) { carregando.mostrar(); } else { carregando.esconder(); } }, tratarErroGerenciador);

    }
    
    $('#btnAdicioneUsuario').attr('href', FUNCAO_VAZIA).click(function () { abrirAdicionarUsuario(); });
    inicializarAdicionar();
    inicializarItemParticipantes($('#listaPortais > tr'));
    inicializarItemParticipantes($('#listaGrupos > tr'));
    inicializarItemParticipantes($('#listaUsuario > tr'));

    $('#btnVoltarParticipante').click(function () { carregarTela('estrutura'); });
    $('#btnAvancarParticipante').click(function () { carregarTela('configuracao'); });



}

function inicializarAdicionar() {


    $('#frmSalvarParticipantesPortais').submit(function (e) {
        carregando.mostrar();
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornarAcao('adicionarportal', dados); }
        });
        e.preventDefault();
    });

    $('#frmSalvarParticipantesGrupos').submit(function (e) {
        carregando.mostrar();
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornarAcao('adicionargrupos', dados); }
        });
        e.preventDefault();
    });

    $('#frmSalvarParticipantesUsuario').submit(function (e) {
        carregando.mostrar();
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornarAcao('adicionarusuario', dados); }
        });
        e.preventDefault();
    });

    $('#btnCancelarGrupos').attr('href', FUNCAO_VAZIA).click(fecharAdicionarGrupos);
    $('#btnAdicionarGrupos').attr('href', FUNCAO_VAZIA).click(function () { salvarAdicionarGrupos() });
    $("#btnContinuarGrupos").attr('href', FUNCAO_VAZIA).click(cancelarCriarGrupos).hide();
    $("#btnSalvarGrupos").attr('href', FUNCAO_VAZIA).click(salvarGrupos).hide();

    $("#btnVoltarGrupos").attr('href', FUNCAO_VAZIA).click(voltarCriarGrupos).hide();

    $('#btnCancelarPortais').attr('href', FUNCAO_VAZIA).click(fecharAdicionarPortais);
    $('#btnAdicionarPortais').attr('href', FUNCAO_VAZIA).click(function () { salvarAdicionarPortais() });

    $('#btnCancelarUsuario').attr('href', FUNCAO_VAZIA).click(fecharAdicionarUsuario);
    $('#btnAdicionarUsuarioDebug').attr('href', FUNCAO_VAZIA).click(function () { salvarAdicionarUsuario() });

    //$('#btnAdicionarUsuario').attr('href', FUNCAO_VAZIA).click(function () { alert('aqui') });


}

function retornarAcao(acao, dados) {
    carregando.esconder(); 
    if (retornoErro(dados)) {
        return;
    }

    switch (acao.toLowerCase()) {
        case 'apagar':
        case 'excluir':
            mensagem.exibir($(dados));
            break;
        case 'adicionargrupos': carregarGrupos($(dados)); break;
        case 'adicionarportal':
            carregarPortais($(dados));
            break;
        case 'adicionarusuario':
            carregarUsuario($(dados));
            break;
    }

    
}
function inicializarItemParticipantes(objetos) {
    objetos.each(function () {
        var tr = $(this);
        var remover = $('td > div > a.btnExcluir', this)
        var link = remover.attr('href');

        var editar = $('td > div > a.btnEditar', this);
        var visualizar = $('td > div > a.btnVisualizar', this);
        var linkEditar = editar.attr('href');
        var linkVisualizar = visualizar.attr('href');

        editar.attr('href', FUNCAO_VAZIA).click(function () { abrirEditarParticipante(linkEditar); });
        visualizar.attr('href', FUNCAO_VAZIA).click(function () { abrirVisualizarParticipantes(linkVisualizar); });
        remover.attr('href', FUNCAO_VAZIA).click(function () { removerParticipantes(tr, link); });

        $('td', this).hover(function () {
            $('div.botoes', this).css('display', 'block');
        }, function () {
            $('div.botoes', this).css('display', 'none');
        });
    });
}
function abrirVisualizarParticipantes(realizador) {
    abrirVisualizarGrupo(realizador);
}
function abrirEditarParticipante(realizador) {

    $('#dlgGrupos').dialog('open');
    $('#dlgGrupos .popupConteudo').html("");
    $('#dlgGrupos').dialog({ 'title': 'Editar Grupo' });

    boxGerenciador = $('#dlgGrupos .popupConteudo');
    carregarGerenciadorEditarGrupo(realizador);

    $('#dlgGrupos').find("#btnAdicionarGrupos").hide();
    $('#dlgGrupos').find("#btnContinuarGrupos").hide();
    $('#dlgGrupos').find("#btnSalvarGrupos").text("Alterar").show();
    $('#dlgGrupos').find("#btnVoltarGrupos").hide();    
   
   // boxGerenciador = $('#dlgGrupos .popupConteudo');
    // carregarGerenciadorEditarGrupo(realizador);
    function ConcluidoEdicaoGrupo() {
        $('#dlgGrupos').dialog('close');
    }
    function erroInterno() {
        $('#dlgGrupos').find("#btnSalvarGrupos").hide();
    }
    function carregarGerenciadorEditarGrupo(realizador) {
        var opcoesGerenciador = {
            'inicializacao': 'editarGrupo',
            'GrupoEditar': realizador,
            'retornoConcluir': ConcluidoEdicaoGrupo,
            'showBtnConcluir': false,
            'concluirReiniciar': false,
            'showNavegacao': true,
            'caminhoBase': caminhoGerenciadorGrupos,
            'erroInterno': erroInterno,
            'fLoaderExterno': function (load) { if (load) { carregando.mostrar(); } else { carregando.esconder(); } },
            'retornoRedirectLogin': tratarErroGerenciador
        };
        boxGerenciador.gerenciadorgrupos(opcoesGerenciador);
    }

}

 

function removerParticipantes(objeto, link, objeto2) {

    $.ajax({
        url: link,
        data: $(this).serialize() + '&' + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            retornoRemoverParticipantes(dados, objeto);
        }
    });
}
function retornoRemoverParticipantes(dados, objeto) {
    if (retornoErro(dados)){
        return;
    }
    //se deve atualizar a lista de remover
    var bolAtualizarUser = false;
    if (objeto.find('input[name="idParticipanteUsuario"]').length > 0) {
        bolAtualizarUser = true;
    }

    objeto.remove();

    //atualizar se for necessário
    var lstIdsUsuarios = [];
    $('#tblUsuarios input[name="idParticipanteUsuario"]').each(function () {
        lstIdsUsuarios.push(this.value);
    });
    controleIncluirUsuario.eleSelecionados = lstIdsUsuarios;
}
/* Grupos */
function carregarGrupos(objeto) {

    var tbody = $('#listaGrupos');
    var linhas = $('tr', objeto);

    //if ($('#listaGrupos tr td').is('.vazio'))
    tbody.empty();

    $('#listaGrupos').append(linhas);

    inicializarItemParticipantes(linhas);

    fecharAdicionarGrupos();
}
var boxGerenciador;
function abrirAdicionarGrupos() {
    carregando.mostrar();
    
    if ($('#dlgGruposDebug').length > 0) {
        $('#dlgGruposDebug').dialog('open');

        $('#dlgGruposDebug .popupConteudo').html('');


        $.ajax({
            url: caminhoBase + '/Agendamento/CarregarParticipantesDialogo',
            data: $('#frmSalvarParticipantesGrupos').serialize(),
            type: "POST",
            success: function (dados, status, xhttp) {
                if (retornoErro(dados)) {
                    return;
                }
                $('#dlgGruposDebug .popupConteudo').html(dados);
                carregando.esconder();
            }
        });

        return;
    }

    $('#dlgGrupos').dialog({ 'title': 'Adicionar Grupos' });
    $('#dlgGrupos .popupConteudo').html("");

    //carregando.mostrar();
    //verifica se foi setado o caminho
    if (!caminhoGerenciadorGrupos) {
        throw "é preciso setar o caminho para o gerenciador de grupos em 'caminhoGerenciadorGrupos'.";
    }
    //$('#frmSalvarParticipantesGrupos input[name="chkRealizador"]').remove();
    $('#dlgGrupos').dialog('open');
    $('#frmSalvarParticipantesGrupos input[name="chkRealizador"]').remove();
    boxGerenciador = $('#dlgGrupos .popupConteudo');
    $.ajax({
        url: caminhoBase + '/Agendamento/CarregarParticipantesDialogo',
        data: $('#frmSalvarParticipantesGrupos').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                return;
            }
            $('#dlgGrupos #frmSalvarParticipantesGrupos').append(dados);
            carregarGerenciador();
        }
    });

    function carregarGerenciador() {
        var lstIds = [];
        $('#frmSalvarParticipantesGrupos input[name="chkRealizador"]').each(function () {
            lstIds.push(this.value);
        });
        var opcoesGerenciador = {
            'retornoSelecionar': retornoSelecionar,
            'idsSelecionados': lstIds,
            'retornoAbriu': retornoGerenciadorAbriu,
            'retornoAbriuEdicao': retornoAbriuEdicao,
            'retornoAbriuCriar': retornoGerenciadorAbriuCriar,
            'retornoAbriuEditar': retornoAbriuEditar,
            'showBtnCriar': true,
            'showBtnCancelar': false,
            'showBtnSelecionar': false,
            'showBtnConcluir': false,
            'showBtnModeEdicao': true,
            'showNavegacao': true,
            'mensagemInicial': "Selecione um ou mais grupos que participarão desta atividade",
            'showMensagemInicial': true,
            'caminhoBase': caminhoGerenciadorGrupos,
            'showRedeGrupos': true,
            'fLoaderExterno': function (load) { if (load) { carregando.mostrar(); } else { carregando.esconder(); } },
            'retornoRedirectLogin': tratarErroGerenciador
        };


        boxGerenciador.gerenciadorgrupos(opcoesGerenciador);
    }
    function retornoSelecionar(ids) {

        $("#frmSalvarParticipantesGrupos input[name='chkRealizador']").remove();
        var listaGrupoLoc = [];
        if (ids != null) {
            for (var i = 0; i < ids.length; i++) {
                if ($.trim(ids[i]) > 0) {
                    var input = $(document.createElement('input')).attr({
                        type: 'hidden',
                        name: 'chkRealizador',
                        value: ids[i]
                    });
                    $(input).appendTo($('#frmSalvarParticipantesGrupos'));
                }
            }
        }

        $('#frmSalvarParticipantesGrupos').submit();

    }
    function retornoGerenciadorAbriu() {
        $('#dlgGrupos').find("#btnVoltarGrupos").hide();
        $('#dlgGrupos').find("#btnSalvarGrupos").hide();
        $('#dlgGrupos').find("#btnAdicionarGrupos").show();
        $('#dlgGrupos').find("#btnContinuarGrupos").hide();
        carregando.esconder();
    }
    function retornoAbriuEdicao() {
        
        $('#dlgGrupos').find("#btnSalvarGrupos").hide();
        $('#dlgGrupos').find("#btnVoltarGrupos").hide();
        $('#dlgGrupos').find("#btnAdicionarGrupos").hide();
        $('#dlgGrupos').find("#btnContinuarGrupos").show();
    }
    
    function retornoGerenciadorAbriuCriar() {
        
        $('#dlgGrupos').find("#btnAdicionarGrupos").hide();
        $('#dlgGrupos').find("#btnContinuarGrupos").hide();
        $('#dlgGrupos').find("#btnSalvarGrupos").text("Gravar").show();
        $('#dlgGrupos').find("#btnVoltarGrupos").show();
    }
    function retornoAbriuEditar() {
        
        $('#dlgGrupos').find("#btnAdicionarGrupos").hide();
        $('#dlgGrupos').find("#btnContinuarGrupos").hide();
        $('#dlgGrupos').find("#btnSalvarGrupos").text("Alterar").show();
        $('#dlgGrupos').find("#btnVoltarGrupos").show();
    }
    function cancelarCriarGrupos() {
        $('#dlgGrupos').find("#btnContinuarGrupos").hide();
        boxGerenciador.gerenciadorgrupos('iniciar', 'cancelar');
    }
    function voltarCriarGrupos() {
        $('#dlgGrupos').find("#btnContinuarGrupos").hide();
        boxGerenciador.gerenciadorgrupos('iniciar', 'edicao');
    }
    function salvarGrupos() {
        boxGerenciador.gerenciadorgrupos('iniciar', 'concluir');
    }

    //abrir o gerenciador de grupos
}
function selecionarGrupos() {
    boxGerenciador.gerenciadorgrupos('iniciar', 'selecionar');
}
function cancelarCriarGrupos() {
    $('#dlgGrupos').find("#btnContinuarGrupos").hide();
    boxGerenciador.gerenciadorgrupos('iniciar', 'cancelar');
}
function salvarGrupos() {
    boxGerenciador.gerenciadorgrupos('iniciar', 'concluir');
}
function voltarCriarGrupos() {
    $('#dlgGrupos').find("#btnContinuarGrupos").hide();
    boxGerenciador.gerenciadorgrupos('iniciar', 'edicao');
}
function salvarAdicionarGrupos() {

    if ($('#dlgGruposDebug').length > 0) {

        $("#dlgGruposDebug .popupConteudo input[name='chkRealizador']:checked").each(function () {

            $('#frmSalvarParticipantesGrupos').append('<input type="hidden" name="chkRealizador" value="' + $(this).val() + '" />');
           
        });
        
        $('#frmSalvarParticipantesGrupos').submit();
        return;
    }
    selecionarGrupos();
}

function fecharAdicionarGrupos() {
    if ($('#dlgGruposDebug').length > 0) {
        $('#dlgGruposDebug').dialog('close');
        return;
    }
    $('#dlgGrupos').dialog('close');
}



/* portais */
function abrirAdicionarPortais() {
    $('#dlgPortal').dialog('open');
    $('#dlgPortal .popupConteudo').html('');

    carregando.mostrar();

    $.ajax({
        url: caminhoBase + '/Agendamento/CarregarParticipantesDialogo',
        data: $('#frmSalvarParticipantesPortais').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) {
            if (retornoErro(dados)) {
                return;
            }
            $('#dlgPortal .popupConteudo').html(dados);
            carregando.esconder();
        }
    });

   

}
function fecharAdicionarPortais() {
    $('#dlgPortal').dialog('close');
}

function salvarAdicionarPortais() {
    $('#frmSalvarParticipantesPortais').submit();

}
function carregarPortais(objeto) {
    var tbody = $('#listaPortais');
    var linhas = $('tr', objeto);

    tbody.empty();

    $('#listaPortais').append(linhas);

    inicializarItemParticipantes(linhas);

    fecharAdicionarPortais();
}

//usuarios
function abrirVisualizarGrupo(idGrupo) {
    if ($('#dlgUsuarioDebug').length > 0) {
        return;
    }

    controleIncluirUsuario.idGrupoInicio = idGrupo;
    controleIncluirUsuario.MostrarLista  = false;
    controleIncluirUsuario.Editavel      = false;
    controleIncluirUsuario.BotaoResposta = false;
    controleIncluirUsuario.Carregar();

    $('#dlgUsuario').dialog('open');
    $('#dlgUsuario').dialog({ 'title': "Visualizar grupo" });
}
function abrirAdicionarUsuario() {
    if ($('#dlgUsuarioDebug').length > 0) {
        abrirAdicionarUsuarioDebug();
        return;
    }

    controleIncluirUsuario.idGrupoInicio = 0;
    controleIncluirUsuario.MostrarLista  = true;
    controleIncluirUsuario.Editavel      = true;
    controleIncluirUsuario.BotaoResposta = true;
    controleIncluirUsuario.Carregar();

    $('#dlgUsuario').dialog('open');
    $('#dlgUsuario').dialog({ 'title': "Adicionar usuários" });
    //new ListaPersonalizarGrupo('#dlgUsuarioDebug .popupConteudo', b, c, d, e, f, g, h);
}
function abrirAdicionarUsuarioDebug() {
    if ($('#dlgUsuarioDebug').length > 0) {
        $('#dlgUsuarioDebug').dialog('open');
        $('#dlgUsuarioDebug .popupConteudo').html('');

        carregando.mostrar();

        $.ajax({
            url: caminhoBase + '/Agendamento/CarregarParticipantesDialogo',
            data: $('#frmSalvarParticipantesUsuario').serialize(),
            type: "POST",
            success: function (dados, status, xhttp) {
                if (retornoErro(dados)) {
                    return;
                }
                $('#dlgUsuarioDebug .popupConteudo').html(dados);
                carregando.esconder();
            }
        });
    }


}
function fecharAdicionarUsuario() {
    $('#dlgUsuarioDebug').dialog('close');
    $('#dlgUsuario').dialog('close');
}
function retornoUsuariosSelecionados(ret) {

    $('#frmSalvarParticipantesUsuario input[name="chkRealizador"]').remove();
    for (var i = 0; i < ret.length; i++) {
        /*if ($('#tblUsuarios input[name="idParticipanteUsuario"][value="' + ret[i] + '"]').length > 0)
            continue;*/
        var input = $('<input type="hidden" name="chkRealizador" value="' + ret[i] + '" />');
        $('#frmSalvarParticipantesUsuario').append(input);
    }
    salvarAdicionarUsuario();

}
function retornoSelecionadoAluno(id, nome) {
    //verifica se já foi adicionado
    if ($('#tblUsuarios input[name="idParticipanteUsuario"][value="' + id + '"]').length > 0)
        return;

    incluirUsuariosAdicionar()

    var input = $('<input type="hidden" name="chkRealizador" value="' + id + '" />');
    $('#frmSalvarParticipantesUsuario').append(input);
    salvarAdicionarUsuario();
}
function incluirUsuariosAdicionar() {
    $('#frmSalvarParticipantesUsuario input[name="chkRealizador"]').remove();
    $('#tblUsuarios input[name="idParticipanteUsuario"]').each(function () {

        var input = $('<input type="hidden" name="chkRealizador" value="' + $(this).val() + '" />');
        $('#frmSalvarParticipantesUsuario').append(input);
    });
}
function salvarAdicionarUsuario() {
    $('#frmSalvarParticipantesUsuario').submit();
}
function carregarUsuario(objeto) {
    var tbody = $('#listaUsuario');
    var linhas = $('tr', objeto);

    tbody.empty();

    $('#listaUsuario').append(linhas);

    inicializarItemParticipantes(linhas);

    fecharAdicionarUsuario();

    //atualizar o objeto
    //eleSelecionados
    var lstIdsUsuarios = [];

    $('#tblUsuarios input[name="idParticipanteUsuario"]').each(function () {
        lstIdsUsuarios.push(this.value);
    });
    
    controleIncluirUsuario.eleSelecionados = lstIdsUsuarios;
}

/* ********************** Configuração ********************** */
function carregarConfiguracao() {
    $.ajax({
        url: caminhoBase + '/Agendamento/Configuracao/',
        data: $(this).serialize() + '&' + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoConfiguracao(dados); }
    });
}

function retornoConfiguracao(dados) {
    if (!retornoErro(dados)) {
        $('div.popup').remove();
        $("div#cxaConfiguracao").html($(dados));
    }
    trocarTela('configuracao');
}

function inicializarConfiguracao() {
    acaoSubmitSalvar($("#frmConfiguracaoAplicacao"));
    carregando.esconder();


    criarBotaoExpandirArea("#btnConfigAvancada", ".configAvancadas");


    $("input#txtDataRealizacaoInicio.habilitado, " +
      "input#txtDataRealizacaoFinal, " +
      "input#txtDataConferir, " +
      "input#txtDataCorrecao, " +
      "input#txtDataGabarito").datepicker({
          showOn: "button",
          buttonImage: caminhoBase + "/" + "Content/images/calendar.gif",
          buttonImageOnly: true
      });
      dataMode.data("input#txtDataRealizacaoInicio, input#txtDataRealizacaoFinal, input#txtDataConferir, input#txtDataCorrecao, input#txtDataGabarito");

      $("input#txtHoraRealizacaoInicio.habilitado, " +
      "input#txtHoraRealizacaoFinal, " +
      "input#txtHoraConferir, " +
      "input#txtHrCorrecao, " +
      "input#txtHoraGabarito").timePicker();

    dataMode.hora("input#txtHoraRealizacaoInicio, input#txtHoraRealizacaoFinal, input#txtHoraConferir, input#txtHrCorrecao, input#txtHoraGabarito");

    

    $('#btnVoltarConfiguracao').click(function () { carregarTela('participantes'); });
    $('#btnAvancarConfiguracao').click(function () { carregarTela('confirmacao'); });

    $('#ckdUpLow').click(testLowUp);

    testLowUp();
    //referente aos templates
    testarTemplates();

    $("input[name='rdoCorrecao'], "+
      "input[name='rdoGabarito'], "+
      "input[name='rdoDivulgaNota'], " +
      "input[name='rdoAgendamento'], " +
      "input[name='rdoDicas'],"+
      "input[name='rdoEmbaralharQuestoes']").click(testarTemplates);

    $("input[name='rdoTemplate']").click(function () {
        escolherTemplate(this.value);
    });

    /* conflito entre parametros */
    $("input[name='rdoAgendamento']").change(testAgendamento).change(testTentativasGabaritoAgendamento);
    $("input[name='rdoTentativa']").change(testTentativas).change(testTentativasGabaritoAgendamento);
    $("input[name='rdoCorrecao']").change(testCorrecao);
    $("input[name='checkCorrecao']").change(testCorrecao);
    $("input[name='rdoGabarito']").change(testGabarito);
    $("input[name='rdoDicas']").change(testDica);
    $("#txtNumeroTentativa").blur(testTentativasGabaritoAgendamento).blur(function () {
        if (this.value <= 0) {
            if ($('#rdoTentativaSim').is(":checked")) {
                this.value = 1;
            }
        }
    });
    $("#txtNumeroTentativaDica").blur(function () {
        if (this.value <= 0) {
            if ($('#rdoDicasSim').is(":checked")) {
                this.value = 1;
            }
        }
    });
    testAgendamento();
    testTentativas();
    testCorrecao()
    testGabarito();
    testDica();
    testTentativasGabaritoAgendamento();
    /*mascara para os campos*/
    $("input[name='txtNumeroTentativa']").setMask({
        mask: '99'
    })
    $("input[name='txtNumeroTentativaDica']").setMask({
        mask: '99', autoTab: 'false'
    })

    $("input#txtDataRealizacaoInicio.desabilitado, input#txtHoraRealizacaoInicio.desabilitado").attr('disabled', 'disabled');
}

/* regras de "conflitos" de configuraçoes */
function testAgendamento() {
    if ($('.indeterminado #rdoAgendamentoNao').is(":checked")) {
        if ($('#rdoCorrecaoAgendamento').is(":checked")) {
            $('#rdoCorrecaoSem').click();
        }
        if ($('#rdoGabaritoAgendamento').is(":checked")) {
            $('#rdoGabaritoSem').click();
        }
    }
    genericTestCheckBox("#rdoAgendamentoNao", '#boxAgendamento', true);
    genericDesativaRadio(".indeterminado #rdoAgendamentoNao", "#caixaCorrecao", "#rdoCorrecaoAgendamento", true);
    genericDesativaRadio(".indeterminado #rdoAgendamentoNao", "#caixaDivulgacaoGabarito", "#rdoGabaritoAgendamento", true);
    
}
function testTentativas() {
    genericTestCheckBox("#rdoTentativaNao", '#boxTentativas', true);
    if ($('#rdoTentativaSim').is(":checked")) {
        if ($("#txtNumeroTentativa").val() <= 0) {
            $("#txtNumeroTentativa").val(3)
        }
    } else {
        $("#txtNumeroTentativa").val(0)
    }

}


function testTentativasGabaritoAgendamento() {
    if ($('#rdoAgendamentoSim').is(":checked") && $('#rdoTentativaSim').is(":checked") && $("#txtNumeroTentativa").val() > 1) {
        $('#rdoGabaritoEncerrar').attr('disabled', 'disabled')
        $('#rdoGabaritoEncerrar').parent().addClass('desabilitado');
    } else {
        $('#rdoGabaritoEncerrar').removeAttr('disabled');
        $('#rdoGabaritoEncerrar').parent().removeClass('desabilitado');
        $('#rdoGabaritoSem').change();
    }
}
function testCorrecao() {
    //se tiver checado desabilita
    if ($('#checkCorrecao').is(':checked')) {
        if (!$('#rdoCorrecaoEncerrar').is(':checked')) {
            $('#rdoCorrecaoEncerrar').click();
        }
    } else {
        if (!$('#rdoDicasNao').is(':checked')) {
            $('#rdoDicasNao').click();
        }
    }

    genericDesativaRadio("#checkCorrecao", "#caixaCorrecao", 'input[name="rdoCorrecao"]', true);
    genericDesativaRadio("#rdoCorrecaoSem", "#caixaCorrecao", 'input[name="rdoDivulgaNota"]', true);


    if ($('#rdoCorrecaoSem').is(':checked')) {
        $('input[name="rdoDivulgaNota"]').removeAttr('checked');
    } else {
        if ($('input[name="rdoDivulgaNota"]:checked').length <= 0) {
            $('#rdoDivulgaNotaTodas').attr('checked','checked');
        }
    }
    genericTestCheckBox("#rdoCorrecaoData", '#boxDataCorrecao', false);
}
function testGabarito() {
    genericTestCheckBox("#rdoGabaritoData", '#boxDataGabarito', false);
    genericDesativaRadio("#rdoGabaritoSem", "#caixaDivulgacaoGabarito", "#rdoComentarioNao", true);
    genericDesativaRadio("#rdoGabaritoSem", "#caixaDivulgacaoGabarito", "#rdoComentarioSim", true);
}

function testDica() {
    if ($('#rdoDicasSim').is(':checked')) {
        if (!$('#checkCorrecao').is(':checked')) {
            $('#checkCorrecao').click();
        }
    }
    

    genericTestCheckBox("#rdoDicasNao", '#boxTentativaDica', true);
    if ($('#rdoDicasSim').is(":checked")) {
        if ($("#txtNumeroTentativaDica").val() <= 0) {
            $("#txtNumeroTentativaDica").val(3)
        }
    } else {
        $("#txtNumeroTentativaDica").val(0)
    }
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

/* templates */
function escolherTemplate(idTemplate) {
    if (idTemplate == 0) {
        if ($(".configAvancadas:visible").length <= 0) {
            $("#btnConfigAvancada").click();
        }
        testarTemplates(true)
    } else {
        for (var i = 0; i < Templates.length; i++) {
            if (Templates[i].id == idTemplate) {
                Templates[i].AplicarTemplate();
                return;
            }
        }
    }
}

var timerTest = undefined;
function testarTemplates(bolPersonalizado) {
    /*if (timerTest)
        return;*/

    var idAtivo = 0;
    
    /*timerTest = */setTimeout(function () {
        for (var i = 0; i < Templates.length; i++) {
            if (Templates[i].TemplateEmUso()) {
                idAtivo = Templates[i].id;
                break;
            }
        }

        if (bolPersonalizado == true) {
            idAtivo = 0;
        }
        $("input[name='rdoTemplate']").removeAttr("checked");
        $(".templatesConfiguracao .ativo").removeClass("ativo");
        if (!$("input[name='rdoTemplate'][value='" + idAtivo + "']").is(":checked")) {
            $("input[name='rdoTemplate'][value='" + idAtivo + "']").attr("checked", "checked");
            $("input[name='rdoTemplate'][value='" + idAtivo + "']").parent().parent().addClass("ativo");
        }
        /*clearTimeout(timerTest);
        timerTest = undefined;*/
    }, 100);
    

}



function retornoAlterarModelos(dados) {
    if ($(dados).attr('class') && $(dados).attr('class').indexOf("erro") > -1) {
        mensagem.exibir($(dados));
    } else {
        var linhas = $(' > div', dados);
        $("#listaModelos").empty().html(linhas);
    }
    carregando.esconder();
}


/* ********************** Confirmação ********************** */
function carregarConfirmacao() {
    $.ajax({
        url: caminhoBase + '/Agendamento/Confirmacao/',
        data: $(this).serialize() + '&' + $('#frmAplicacao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoConfirmacao(dados); }
    });
}

function retornoConfirmacao(dados) {

    if (!retornoErro(dados)) {
        $('div#cxaProva').empty();
        $('div.popup').remove();
        $("div#cxaConfirmacao").html($(dados));
    }
    trocarTela('confirmacao');
}

function inicializarConfirmacao() {
    acaoSubmitSalvar(undefined);
    carregando.esconder();

    criarBotaoExpandirArea("#btnConfigAvancada", ".configAvancadas");

    $('form#frmConfirmacaoAplicacao').submit(function (e) {
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize() + "&" + $("#frmAplicacao").serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoSalvarConfirmacao(dados); }
        });
        e.preventDefault();
    });

    $('#btnVoltarConfirmacao').attr('href', FUNCAO_VAZIA).click(function () { carregarTela('configuracao'); });
    $('#btnSalvarConfirmacao').attr('href', FUNCAO_VAZIA).click(function () { salvarConfirmacao(); });

    $('#dlgVisualizarQuestoesResumo').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 580,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });

    $('#btnVisualizarQuestao').attr('href', FUNCAO_VAZIA).click(abrirVisualizarQuestoesResumo);

    $('#btnFecharVisualizar').attr('href', FUNCAO_VAZIA).click(fecharVisualizarQuestoesResumo);

    tblListaQuestoes = new Tabela("#frmTabelaQuestoesResumo", 'tblQuestoes', false, new Ordenacao("modificado", true), undefined, "#frmAplicacao");
    tblListaQuestoes.retornoCarregarTabela = retornoCarregarTabelaQuestoes





    /*Confirmação visualizaçãoi grupo*/
    $('#dlgUsuario').dialog({ dialogClass: 'SEC025_DIALOG',
        autoOpen: false, modal: true,
        width: 885, height: 560,
        position: ['center', 'center'],
        draggable: false, resizable: false
    });
    controleIncluirUsuario = new ListaPersonalizarGrupo('conteudoDialogoUsuarios', caminhoGerenciadorGrupos, 'btnAdicionarUsuario', function (ret) { }, "", function (bolCarr) { }, tratarErroGerenciador);
    inicializarItemParticipantes($('#listaGrupos > tr'));
    $('#btnCancelarUsuario').attr('href', FUNCAO_VAZIA).click(function () { $('#dlgUsuario').dialog('close') });
    /**/
}

/* Visualizar Questões */
function abrirVisualizarQuestoesResumo() {
    tblListaQuestoes.recarregarTabela()
    $('#dlgVisualizarQuestoesResumo').dialog('open');

}

function retornoVisualizarQuestoesResumo(dados) {
    if (retornoErro(dados)) {
        return;
    }
    $("#frmTabelaQuestoesResumo .popupConteudo").html(dados);

}

function fecharVisualizarQuestoesResumo() {
    $('#dlgVisualizarQuestoesResumo').dialog('close');
}

function salvarConfirmacao() {
    carregando.mostrar();

    $('form#frmConfirmacaoAplicacao').submit();
}

function retornoSalvarConfirmacao(dados) {
    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    location.href = $(dados).text();
    
}



function TemplateAgendamento(opcoes) {
    var tmpA = this;
    this.id = opcoes.idTemplate;

    this.bolAgendamento = opcoes.bolAgendamento;

    this.bolTentativas = opcoes.bolTentativas;
    this.intTentativas = opcoes.intTentativas;

    this.bolEmbaralhar = opcoes.bolEmbaralhar;

    this.intCorrecao = opcoes.intCorrecao;
    this.intGabarito = opcoes.intGabarito;
    this.intNota = opcoes.intNota;
    this.bolAutoEstudo = opcoes.bolAutoEstudo;
    this.intAutoEstudo = opcoes.intAutoEstudo;

    this.etapasAplicadas = 0;
    this.timer = undefined;

    this.AplicarTemplate = function () {
        this.timer = setInterval(tmpA.AplicarTemplateEtapas, 10);
    };

    this.AplicarTemplateEtapas = function () {

        tmpA.etapasAplicadas++;

        switch (tmpA.etapasAplicadas) {
            case 1:
                //$("input[name='rdoAgendamento'][value='" + (tmpA.bolAgendamento ? 1 : 0) + "']").click();
                //                if (tmpA.bolAgendamento) {
                //                    $("input[name='rdoAgendamento'][value='1']").click();
                //                } else {
                //                    if ($("input[name='rdoAgendamento'][value='0']").length != 0) {
                //                        $("input[name='rdoAgendamento'][value='0']").click();
                //                    } else {
                //                        $("input[name='rdoAgendamento'][value='2']").click();
                //                    }
                //                }
                break;
            case 2:
                $("input[name='rdoTentativa'][value='" + (tmpA.bolTentativas ? 1 : 0) + "']").prop("checked", "checked").change();
                break;
            case 3:
                $("input[name='txtNumeroTentativa']").val(tmpA.intTentativas);
                break;
            case 4:
                $("input[name='rdoEmbaralharQuestoes'][value='" + (tmpA.bolEmbaralhar ? 1 : 0) + "']").click();
                break;
            case 5:
                if (tmpA.intCorrecao == 1) {
                    if (!$("input[type='checkbox'][name='checkCorrecao']").is(":checked")) {
                        $("input[type='checkbox'][name='checkCorrecao']").prop("checked", "checked").change();
                    }
                } else {
                    if ($("input[type='checkbox'][name='checkCorrecao']").is(":checked")) {
                        $("input[type='checkbox'][name='checkCorrecao']").removeAttr("checked").change();
                    }
                    $("input[name='rdoCorrecao'][value='" + tmpA.intCorrecao + "']").prop("checked", "checked").change();
                }
                break;
            case 6:
                $("input[name='rdoGabarito'][value='" + tmpA.intGabarito + "']").prop("checked", "checked").change();
                break;
            case 7:
                $("input[name='rdoDivulgaNota'][value='" + tmpA.intNota + "']").click();
                break;
            case 8:
                $("input[name='rdoAutoEstudo'][value='" + tmpA.intAutoEstudo + "']").click();
                break;
            case 9:
                $("input[name='rdoTemplate'][value='" + tmpA.id + "']").attr("checked", "checked");
                break;
            default:
                tmpA.etapasAplicadas = 0;
                clearInterval(tmpA.timer);
        }

    }

    this.TemplateEmUso = function () {

        //        //        if (  $("input[name='rdoAgendamento']:checked").val() != (this.bolAgendamento ? 1 : 0) ) {
        //        //            return false;
        //        //        }

        //        alert( $("input[name='rdoTentativa']:checked").val() != (this.bolTentativas ? 1 : 0)  );
        
        if ($("input[name='rdoTentativa']:checked").val() != (this.bolTentativas ? 1 : 0)) {
            return false;
        }

        if ($("input[name='rdoEmbaralharQuestoes']").length > 0) {
            if ($("input[name='rdoEmbaralharQuestoes']:checked").val() != (this.bolEmbaralhar ? 1 : 0)) {
                return false;
            }
        }


        if ($("input[name='checkCorrecao']").is(":checked")) {
            if (this.intCorrecao != 1) {
                return false;
            }
        } else {
            if ($("input[name='rdoCorrecao']:checked").val() != this.intCorrecao) {
                return false;
            }
        }

        if ($("input[name='rdoGabarito']:checked").val() != this.intGabarito) {
            return false;
        }


        if ($("input[name='rdoDivulgaNota']:checked").val() != this.intNota) {
            return false;
        }

        if ($("input[name='rdoAutoEstudo']:checked").val() != (this.bolAutoEstudo ? 1 : 0)) {
            return false;
        }

        return true;
    }
}


Templates[0] = new TemplateAgendamento({
    idTemplate: 1,
    bolAgendamento: true,
    bolTentativas: false,
    intTentativas: 0,
    bolEmbaralhar: true,
    intCorrecao: 3,
    intGabarito: 2,
    intNota: 1,
    bolAutoEstudo: false,
    intAutoEstudo: 0
});
Templates[1] = new TemplateAgendamento({
    idTemplate: 2,
    bolAgendamento: true,
    bolTentativas: true,
    intTentativas: 3,
    bolEmbaralhar: true,
    intCorrecao: 2,
    intGabarito: 2,
    intNota: 1,
    bolAutoEstudo: false,
    intAutoEstudo: 0
});
Templates[2] = new TemplateAgendamento({
    idTemplate: 3,
    bolAgendamento: false,
    bolTentativas: true,
    intTentativas: 3,
    bolEmbaralhar: true,
    intCorrecao: 1,
    intGabarito: 1,
    intNota: 1,
    bolAutoEstudo: true,
    intAutoEstudo: 1
});



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


/* TABELA de questões */

function retornoCarregarTabelaQuestoes(dados) {
    if(retornoErro(dados)){
        return;
    }
    new QuestaoResumo("#tblQuestoes", "a.tooltip", erroRetornoQuestaoResumo).aplicarBotaoExtra("a.tooltipextra"); ;

}
function erroRetornoQuestaoResumo(dados) {
    retornoErro(dados);
}
