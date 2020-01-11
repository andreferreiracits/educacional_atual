var FUNCAO_VAZIA = 'javascript:void(0)';
var proximaTela = "";
var aba, mensagem, confirm;
var formVez;
var tblPermissaoQuestao, tblPermissaoProva, tblPermissaoAplicacao;
var listaSuspensaQuestao, listaSuspensaProva, listaSuspensaAplicacao;

function tratarErroGerenciador(codMsg, strMensagem, tipo) {
    if (!tipo || Number(tipo) == 3) {
        var dados = mensagem.htmlTemplate("Error", true, "Usuário deslogado", "sessao");
        mensagem.exibir(dados, undefined, undefined);
    }
}

function inicializar() {
    aba = new Aba('menuNavegacaoAdministracao', carregarTela);
    mensagem = new Mensagem("alerta");
    confirm = new Confirm("alerta");

    $('#frmAdministracao').submit(function (e) {

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
            success: function (dados, status, xhttp) { retornoAdministracao(dados); }
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
    $('#frmAdministracao').submit();
}

function trocarTela(tela) {
    aba.selecionar(tela);

    switch (tela) {
        case 'configuracao':
            $("#cxaConfiguracao").show();
            hideBoxArea("#cxaUsuario");
            hideBoxArea("#cxaConfirmacao");
            inicializarConfiguracao();
            break;
        case 'usuarios':
            hideBoxArea("#cxaConfiguracao");
            $("#cxaUsuario").show();
            hideBoxArea("#cxaConfirmacao");
            inicializarUsuario();
            break;
        case 'confirmacao':
            hideBoxArea("#cxaConfiguracao");
            hideBoxArea("#cxaUsuario");
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

function retornoAdministracao(dados) {

    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }

    switch (proximaTela) {
        case 'configuracao': carregarConfiguracao(); break;
        case 'usuarios': carregarUsuarios(); break;
        case 'confirmacao': carregarConfirmacao(); break;
    }

}

/**** Configuracao ***/
function carregarConfiguracao() {
    $.ajax({
        url: caminhoBase + '/Administracao/Configuracao/',
        data: $(this).serialize() + '&' + $('#frmAdministracao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoConfiguracao(dados); }
    });
}
function retornoConfiguracao(dados) {
    if (!retornoErro(dados))
        $("div#cxaConfiguracao").html($(dados));

    
    trocarTela('configuracao');
}
function inicializarConfiguracao() {
    carregando.esconder();

    acaoSubmitSalvar($("#frmConfiguracaoBanco"));

    $('#btnAvancarConfiguracao').click(function () { carregarTela('usuarios'); });
}

/**** Usuarios ***/
function carregarUsuarios() {
    $.ajax({
        url: caminhoBase + '/Administracao/Usuarios/',
        data: $(this).serialize() + '&' + $('#frmAdministracao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoUsuarios(dados); }
    });
}
function retornoUsuarios(dados) {

    if (!retornoErro(dados)) {
        $("div#cxaUsuario").html($(dados));
    }
    
    trocarTela('usuarios');
}

function inicializarUsuario() {
    carregando.esconder();

    $('#btnVoltarUsuario').click(function () { carregarTela('configuracao'); });
    $('#btnAvancarUsuario').click(function () { carregarTela('confirmacao'); });


    tblPermissaoQuestao = new Tabela('frmUsuariosQuestao', 'tblUsuariosQuestao', false, false, retornarAcaoTabelaQuestao, '#frmAdministracao');
    tblPermissaoQuestao.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }
        $("#tblUsuariosQuestao input[name^='chkQuestaoCadastro']").click(function () {
            salvarPermissao(tblPermissaoQuestao, "#frmUsuariosQuestao", "criar", retornarAcaoTabelaQuestao)
        });
        $("#tblUsuariosQuestao input[name^='chkQuestaoRevisor']").click(function () {
            salvarPermissao(tblPermissaoQuestao, "#frmUsuariosQuestao", "revisar", retornarAcaoTabelaQuestao)
        });

        $("#tblUsuariosQuestao input[name^='chkQuestaoPublicar']").click(function () {
            salvarPermissao(tblPermissaoQuestao, "#frmUsuariosQuestao", "publicar", retornarAcaoTabelaQuestao)
        });

        checkCabecalhos()
    }
    tblPermissaoQuestao.recarregarTabela();

    tblPermissaoProva = new Tabela('frmUsuariosProva', 'tblUsuariosProva', false, false, retornarAcaoTabelaProva, '#frmAdministracao');
    tblPermissaoProva.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }
        $("#frmUsuariosProva input[name^='chkProvaCadastro']").click(function () {
            salvarPermissao(tblPermissaoProva, "#frmUsuariosProva", "criar", retornarAcaoTabelaProva)
        });
        $("#frmUsuariosProva input[name^='chkProvaRevisor']").click(function () {
            salvarPermissao(tblPermissaoProva, "#frmUsuariosProva", "revisar", retornarAcaoTabelaProva)
        });

        $("#frmUsuariosProva input[name^='chkProvaPublicar']").click(function () {
            salvarPermissao(tblPermissaoProva, "#frmUsuariosProva", "publicar", retornarAcaoTabelaProva)
        });

        checkCabecalhos()
    }
    tblPermissaoProva.recarregarTabela();

    tblPermissaoAplicacao = new Tabela('frmUsuariosAplicacao', 'tblUsuariosAplicacao', false, false, retornarAcaoTabelaAplicacao, '#frmAdministracao');
    tblPermissaoAplicacao.retornoCarregarTabela = function (dados) {
        if (retornoErro(dados)) {
            return;
        }
        $("#frmUsuariosAplicacao input[name^='chkAplicacaoCadastro']").click(function () {
            salvarPermissao(tblPermissaoAplicacao, "#frmUsuariosAplicacao", "criar", retornarAcaoTabelaAplicacao)
        });

        $("#frmUsuariosAplicacao input[name^='chkAplicacaoPublicar']").click(function () {
            salvarPermissao(tblPermissaoAplicacao, "#frmUsuariosAplicacao", "publicar", retornarAcaoTabelaAplicacao)
        });

        checkCabecalhos()
    }
    tblPermissaoAplicacao.recarregarTabela();

    //acao para os botoes de adicionar do debug
    $("#btnAdicionarUsuarioQuestao").attr('href', FUNCAO_VAZIA).click(function () {
        tblPermissaoQuestao.executarAcao("adicionar", $("#frmUsuariosQuestao").attr('action'), retornarAcaoTabelaQuestao);
    });
    $("#btnAdicionarUsuarioProva").attr('href', FUNCAO_VAZIA).click(function () {
        tblPermissaoProva.executarAcao("adicionar", $("#frmUsuariosProva").attr('action'), retornarAcaoTabelaProva);
    });
    $("#btnAdicionarUsuarioAplicacao").attr('href', FUNCAO_VAZIA).click(function () {
        tblPermissaoAplicacao.executarAcao("adicionar", $("#frmUsuariosAplicacao").attr('action'), retornarAcaoTabelaAplicacao);
    });


    /*pelo gerenciador de grupos */
        //try {
        var listaSuspensaQuestao;
        listaSuspensaQuestao = new ListaGerenciadorUsuarios("searchUsuarioQuestao", "gg_listaUsuarioQuestao", retornoSelecionadoQuestao)
        listaSuspensaQuestao.userRede = true;
        listaSuspensaQuestao.papel = "3";
        listaSuspensaQuestao.caminhoBase = caminhoGerenciadorGrupos;
        listaSuspensaQuestao.erroCallBack = tratarErroGerenciador;

        var listaSuspensaProva;
        listaSuspensaProva = new ListaGerenciadorUsuarios("searchUsuarioProva", "gg_listaUsuarioProva", retornoSelecionadoProva)
        listaSuspensaProva.userRede = true;
        listaSuspensaProva.papel = "3";
        listaSuspensaProva.caminhoBase = caminhoGerenciadorGrupos;
        listaSuspensaProva.erroCallBack = tratarErroGerenciador;

        var listaSuspensaAplicacao;
        listaSuspensaAplicacao = new ListaGerenciadorUsuarios("searchUsuarioAplicacao", "gg_listaUsuarioAplicacao", retornoSelecionadoAplicacao)
        listaSuspensaAplicacao.userRede = true;
        listaSuspensaAplicacao.papel = "3";
        listaSuspensaAplicacao.caminhoBase = caminhoGerenciadorGrupos;
        listaSuspensaAplicacao.erroCallBack = tratarErroGerenciador;
        //} catch (e) { }


        

    acaoSubmitSalvar($("#frmUsuariosBanco"));
}

function functionCss() {

}

function salvarPermissao(objTabela, form, acao, funcao) {
    objTabela.executarAcao(acao, $(form).attr('action'), funcao);
}

function retornoSelecionadoQuestao(id, nome) {
    $("#frmUsuariosQuestao #idUsuarioQuestao").val(id);
    $("#frmUsuariosQuestao input[name='searchUsuarioQuestao']").val('');
    tblPermissaoQuestao.executarAcao("adicionar", $("#frmUsuariosQuestao").attr('action'), retornarAcaoTabelaQuestao);
}
function retornarAcaoTabelaQuestao(acao, dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }

    if (acao == "adicionar" || acao == "apagar") {
        tblPermissaoQuestao.recarregarTabela();
        return;
    }
    checkCabecalhos()
}

function retornoSelecionadoProva(id, nome) {
    $("#frmUsuariosProva #idUsuarioProva").val(id);
    $("#frmUsuariosProva input[name='searchUsuarioProva']").val('');
    tblPermissaoProva.executarAcao("adicionar", $("#frmUsuariosProva").attr('action'), retornarAcaoTabelaProva);
}
function retornarAcaoTabelaProva(acao, dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }

    if (acao == "adicionar" || acao == "apagar") {
        tblPermissaoProva.recarregarTabela();
        return;
    }

    checkCabecalhos()
}

function retornoSelecionadoAplicacao(id, nome) {
    $("#frmUsuariosAplicacao #idUsuarioAplicacao").val(id);
    $("#frmUsuariosAplicacao input[name='searchUsuarioAplicacao']").val('');
    tblPermissaoAplicacao.executarAcao("adicionar", $("#frmUsuariosAplicacao").attr('action'), retornarAcaoTabelaAplicacao);
}
function retornarAcaoTabelaAplicacao(acao, dados) {
    carregando.esconder();
    if (retornoErro(dados)) {
        return;
    }

    if (acao == "adicionar" || acao == "apagar") {
        tblPermissaoAplicacao.recarregarTabela();
        return;
    }

    checkCabecalhos()
}
function checkCabecalhos() {
    checkItemCabecalho("#tblUsuariosQuestao", "chkQuestaoCadastro")
    checkItemCabecalho("#tblUsuariosQuestao", "chkQuestaoRevisor")
    checkItemCabecalho("#tblUsuariosQuestao", "chkQuestaoPublicar")

    checkItemCabecalho("#tblUsuariosProva", "chkProvaCadastro")
    checkItemCabecalho("#tblUsuariosProva", "chkProvaRevisor")
    checkItemCabecalho("#tblUsuariosProva", "chkProvaPublicar")

    checkItemCabecalho("#tblUsuariosAplicacao", "chkAplicacaoCadastro")
    checkItemCabecalho("#tblUsuariosAplicacao", "chkAplicacaoPublicar")
}

function checkItemCabecalho(strTbl, strCheck) {
    if ($(strTbl + " input[name='" + strCheck + ".Checked'][type='checkbox']").length ==
          $(strTbl + " input[name='" + strCheck + ".Checked'][type='checkbox']:checked").length) {

        $(strTbl + " input[name='" + strCheck + "']").attr("checked", true);
    } else {
        $(strTbl + " input[name='" + strCheck + "']").removeAttr("checked");
    }
}
/**** Confirmacao ***/
function carregarConfirmacao() {
    $.ajax({
        url: caminhoBase + '/Administracao/Confirmacao/',
        data: $(this).serialize() + '&' + $('#frmAdministracao').serialize(),
        type: "POST",
        success: function (dados, status, xhttp) { retornoConfirmacao(dados); }
    });
}
function retornoConfirmacao(dados) {

    if (!retornoErro(dados)) {
        $("div#cxaConfirmacao").html($(dados));
    }

    trocarTela('confirmacao');
}
function inicializarConfirmacao() {
    carregando.esconder();

    $('#btnVoltarConfirmacao').click(function () { carregarTela('usuarios'); });
    $('#btnSalvarConfirmacao').click(salvarConfirmacao);

    $('.btnConfirmacaoEditarConfiguracao').click(function () { carregarTela('configuracao'); });
    $('.btnConfirmacaoEditarUsuario').click(function () { carregarTela('usuarios'); });

    $('form#frmConfirmacaoBanco').submit(function (e) {
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize() + "&" + $("#frmAdministracao").serialize(),
            type: "POST",
            success: function (dados, status, xhttp) { retornoSalvarConfirmacao(dados); }
        });
        e.preventDefault();
    });

    acaoSubmitSalvar($("#frmConfirmacaoBanco"));
}

function salvarConfirmacao() {
    carregando.mostrar();

    $('form#frmConfirmacaoBanco').submit();
}

function retornoSalvarConfirmacao(dados) {

    if (retornoErro(dados)) {
        carregando.esconder();
        return;
    }
    location.href = $(dados).text();
}

