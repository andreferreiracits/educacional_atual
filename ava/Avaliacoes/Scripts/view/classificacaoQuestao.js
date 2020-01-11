/* para a tela de lista de questões */
var filtroSPE;
function initClassificacaoListaQuestoes() {
    /* filtro principal */
    new NovaClassificacao("AreaAssunto").montarSelectFiltro("#selectAreaAssunto");
    new NovaClassificacao("NivelEnsino").montarSelectFiltro("#selectNivelEnsino");
    /* filtros para as classificações */
    new NovaClassificacao("HabilidadeCompetencia").dialogoFiltroListaQuestoes("#dlgHabilidadesFiltro", "#btnFiltroHabilidade");
    new NovaClassificacao("ProvinhaBrasil").dialogoFiltroListaQuestoes("#dlgProvinhaBrasilFiltro", "#btnFiltroProvinhaBrasil");

    new NovaClassificacao("AreaAssuntoPesquisa").dialogoFiltroListaQuestoes("#dlgAssuntoPesquisaOpniaoFiltro", "#btnFiltroAssuntoPesquisaOpniao");
    filtroSPE = new NovaClassificacao("SPE").dialogoFiltroListaQuestoes("#dlgSPEFiltro", "#btnFiltroSPE");
    classHabile = new NovaClassificacao("Habile").dialogoFiltroListaQuestoes("#dlgHabileFiltro", "#btnFiltroHabile");
    new NovaClassificacao("Enem").dialogoFiltroListaQuestoes("#dlgEnemFiltro", "#btnFiltroEnem");
}

function retornoEdicacaoRapidaClassificacao() {

    new NovaClassificacao("HabilidadeCompetencia").dialogoAdicionarClassificacao("#dlgHabilidadesAdicionar", "#edicaorapida #btnAdicionarHabilidade", "#edicaorapida #frmEdicaoRapida");
    new NovaClassificacao("ProvinhaBrasil").dialogoAdicionarClassificacao("#dlgProvinhaBrasilAdicionar", "#edicaorapida #btnAdicionarProvinhaBrasil", "#edicaorapida #frmEdicaoRapida");


    new NovaClassificacao("AreaAssunto").dialogoAdicionarClassificacao("#dlgAssunto", "#edicaorapida #btnAdicionarAssunto", "#edicaorapida #frmEdicaoRapida");
    new NovaClassificacao("AreaAssuntoPesquisa").dialogoAdicionarClassificacao("#dlgAssuntoPesquisaAdicionar", "#edicaorapida #btnAdicionarAssuntoPesquisaOpniao", "#edicaorapida #frmEdicaoRapida");
    new NovaClassificacao("NivelEnsino").dialogoAdicionarClassificacao("#dlgNivelEnsino", "#edicaorapida #btnAdicionarNivelEnsino", "#edicaorapida #frmEdicaoRapida");

    new NovaClassificacao("SPE").dialogoAdicionarClassificacao("#dlgSPEAdicionar", "#edicaorapida #btnAdicionarSPE", "#edicaorapida #frmEdicaoRapida");
    new NovaClassificacao("Habile").dialogoAdicionarClassificacao("#dlgHabileAdicionar", "#edicaorapida #btnAdicionarHabile", "#edicaorapida #frmEdicaoRapida");
    new NovaClassificacao("Enem").dialogoAdicionarClassificacao("#dlgEnemAdicionar", "#edicaorapida #btnAdicionarEnem", "#edicaorapida #frmEdicaoRapida");
}
function ajusteFiltroClassificacao() {

    filtroSPE.ajusteFiltroSPE(function () {
        tblLista.executarNovoFiltro();
    });
    //Filtro Habile
    classHabile.ajusteFiltroHabile(function () {
        tblLista.executarNovoFiltro();
    });
    //
}

/* para o cadastro de questões */
var classHabilidade;
var classProvinhaBrasil;
var classAssunto;
var classNivel;
var classPesquisa;
var classSPE;
var classHabile;
var classEnem;

function initClassificacaoQuestao() {

    classProvinhaBrasil = new NovaClassificacao("ProvinhaBrasil").dialogoAdicionarClassificacao("#dlgProvinhaBrasilAdicionar", "#btnAdicionarProvinhaBrasil", "#frmQuestao");
    var tblProvinhaBrasil = new NovaClassificacao("HabilidadeCompetencia").tabelaClassificacao('tblListProvinhaBrasil', 'frmClassificacaoProvinhaBrasil', "#frmQuestao");
    classProvinhaBrasil.onAdicionou = function () {
        tblProvinhaBrasil.atualizarTabela();
    }


    classHabilidade = new NovaClassificacao("HabilidadeCompetencia").dialogoAdicionarClassificacao("#dlgHabilidadesAdicionar", "#btnAdicionarHabilidade", "#frmQuestao");
    var tblHabilidade = new NovaClassificacao("HabilidadeCompetencia").tabelaClassificacao('tblListHabilidade', 'frmClassificacaoHabilidade', "#frmQuestao");

    classHabilidade.onAdicionou = function () {
        tblHabilidade.atualizarTabela();
    }
    classAssunto = new NovaClassificacao("AreaAssunto").dialogoAdicionarClassificacao("#dlgAssunto", "#btnAdicionarAssunto", "#frmQuestao", true);
    var tblAssunto = new NovaClassificacao("AreaAssunto").tabelaClassificacao('tblListAssunto', 'frmClassificacaoAssunto', "#frmQuestao");
    classAssunto.onAdicionou = function () {
        tblAssunto.atualizarTabela();
    }

    classNivel = new NovaClassificacao("NivelEnsino").dialogoAdicionarClassificacao("#dlgNivelEnsino", "#btnAdicionarNivelEnsino", "#frmQuestao", true);
    var tblNivel = new NovaClassificacao("NivelEnsino").tabelaClassificacao('tblListNivelEnsino', 'frmClassificacaoNivelEnsino', "#frmQuestao");
    classNivel.onAdicionou = function () {
        tblNivel.atualizarTabela();
    }

    classPesquisa = new NovaClassificacao("AreaAssuntoPesquisa").dialogoAdicionarClassificacao("#dlgAssuntoPesquisaAdicionar", "#btnAdicionarAssuntoPesquisaOpniao", "#frmQuestao", true);
    var tblPesquisa = new NovaClassificacao("AreaAssuntoPesquisa").tabelaClassificacao('tblListAssuntoPesquisaOpniao', 'frmClassificacaoAssuntoPesquisaOpniao', "#frmQuestao");
    classPesquisa.onAdicionou = function () {
        tblPesquisa.atualizarTabela();
    }

    classSPE = new NovaClassificacao("SPE").dialogoAdicionarClassificacao("#dlgSPEAdicionar", "#btnAdicionarSPE", "#frmQuestao", false);
    var tblSPE = new NovaClassificacao("SPE").tabelaClassificacao('tblListSPE', 'frmClassificacaoSPE', "#frmQuestao");
    classSPE.onAdicionou = function () {
        tblSPE.atualizarTabela();
    }

    classHabile = new NovaClassificacao("Habile").dialogoAdicionarClassificacao("#dlgHabileAdicionar", "#btnAdicionarHabile", "#frmQuestao", true);
    var tblHabile = new NovaClassificacao("Habile").tabelaClassificacao('tblListHabile', 'frmClassificacaoHabile', "#frmQuestao");
    classHabile.onAdicionou = function () {
        tblHabile.atualizarTabela();
    }

    classEnem = new NovaClassificacao("Enem").dialogoAdicionarClassificacao("#dlgEnemAdicionar", "#btnAdicionarEnem", "#frmQuestao");
    var tblEnem = new NovaClassificacao("Enem").tabelaClassificacao('tblListEnem', 'frmClassificacaoEnem', "#frmQuestao");

    classEnem.onAdicionou = function () {
        tblEnem.atualizarTabela();
    }
}

function destroyDialogoClassificacao() {
    if (classProvinhaBrasil) {
        classProvinhaBrasil.destroyDialog();
    }
    if (classHabilidade) {
        classHabilidade.destroyDialog();
    }
    if (classAssunto) {
        classAssunto.destroyDialog();
    }
    if (classNivel) {
        classNivel.destroyDialog();
    }
    if (classPesquisa) {
        classPesquisa.destroyDialog();
    }
    if (classSPE) {
        classSPE.destroyDialog();
    }

    if (classHabile) {
        classHabile.destroyDialog();
    }

    if (classEnem) {
        classEnem.destroyDialog();
    }
}

/* para a busca de provas */
var classBuscaHabilidade, classBuscaProvinhaBrasil, classBuscaAssunto, classBuscaNivel, classBuscaAssuntoPesquisa, classBuscaSPE, classBuscaHabile, classBuscaEnem;

function initBuscaQuestaoProva() {

    classBuscaAssunto = new NovaClassificacao("AreaAssunto").montarSelectFiltro("#selectAreaAssunto");
    classBuscaNivel = new NovaClassificacao("NivelEnsino").montarSelectFiltro("#selectNivelEnsino");

    classBuscaProvinhaBrasil = new NovaClassificacao("ProvinhaBrasil").dialogoFiltroListaQuestoes("#dlgProvinhaBrasilFiltro", "#btnFiltroProvinhaBrasil");

    classBuscaHabilidade = new NovaClassificacao("HabilidadeCompetencia").dialogoFiltroListaQuestoes("#dlgHabilidadesFiltro", "#btnFiltroHabilidade");
    classBuscaAssuntoPesquisa = new NovaClassificacao("AreaAssuntoPesquisa").dialogoFiltroListaQuestoes("#dlgAssuntoPesquisaOpniaoFiltro", "#btnFiltroAssuntoPesquisaOpniao");
    classBuscaSPE = new NovaClassificacao("SPE").dialogoFiltroListaQuestoes("#dlgSPEFiltro", "#btnFiltroSPE");
    classBuscaHabile = new NovaClassificacao("Habile").dialogoFiltroListaQuestoes("#dlgHabileFiltro", "#btnFiltroHabile");
    classBuscaEnem = new NovaClassificacao("Enem").dialogoFiltroListaQuestoes("#dlgEnemFiltro", "#btnFiltroEnem");
}

function limparFiltroBuscaQuestao() {
    tblAdicionar.limparFiltroNovo();
    classBuscaSPE.limparFiltroSPE();
    classBuscaHabile.limparFiltroHabile(); //Filtro Habile
}

function ajusteFiltroBuscaQuestao() {

    classBuscaSPE.ajusteFiltroSPE(function () {
        tblAdicionar.executarNovoFiltro();
    });
    //Filtro Habile
    classBuscaHabile.ajusteFiltroHabile(function () {
        tblAdicionar.executarNovoFiltro();
    });
    //
}

function destroyBuscaQuestaoProva() {
    if (classBuscaProvinhaBrasil)
        classBuscaProvinhaBrasil.destroyDialogFiltro()
    if (classBuscaSPE)
        classBuscaSPE.destroyDialogFiltro()
    if (classBuscaHabilidade)
        classBuscaHabilidade.destroyDialogFiltro()
    if (classBuscaAssuntoPesquisa)
        classBuscaAssuntoPesquisa.destroyDialogFiltro()
    if (classBuscaHabile)
        classBuscaHabile.destroyDialogFiltro()
    if (classBuscaEnem)
        classBuscaEnem.destroyDialogFiltro()

    classBuscaHabilidade = undefined;
    classBuscaAssunto = undefined;
    classBuscaNivel = undefined;
    classBuscaAssuntoPesquisa = undefined;
    classBuscaSPE = undefined;
    classBuscaHabile = undefined;
    classBuscaEnem = undefined;
    classBuscaProvinhaBrasil = undefined;
}

var classCriterioHabilidade, classCriterioProvinhaBrasil, classCriterioAssunto, classCriterioNivel, classCriterioHabile;

function initCriterioProva() {

    if (!classCriterioProvinhaBrasil)
        classCriterioProvinhaBrasil = new NovaClassificacao("ProvinhaBrasil").buscaCriterioProva("#frmCriterioProvinhaBrasil", "#frmProva");
    else
        classCriterioProvinhaBrasil.carregarConteudoCriterio();



    if (!classCriterioHabilidade)
        classCriterioHabilidade = new NovaClassificacao("HabilidadeCompetencia").buscaCriterioProva("#frmCriterioHabilidade", "#frmProva");
    else
        classCriterioHabilidade.carregarConteudoCriterio();

    if (!classCriterioAssunto)
        classCriterioAssunto = new NovaClassificacao("AreaAssunto").buscaCriterioProva("#frmCriterioAssunto", "#frmProva");
    else
        classCriterioAssunto.carregarConteudoCriterio();

    if (!classCriterioNivel)
        classCriterioNivel = new NovaClassificacao("NivelEnsino").buscaCriterioProva("#frmCriterioNivelEnsino", "#frmProva");
    else
        classCriterioNivel.carregarConteudoCriterio();

    if (!classCriterioHabile)
        classCriterioHabile = new NovaClassificacao("Habile").buscaCriterioProva("#frmCriterioHabile", "#frmProva");
    else
        classCriterioHabile.carregarConteudoCriterio();
}
function destroyBuscaCriterioProva() {
    NovaClassificacao.listaCriterio = {};
    NovaClassificacao.listaCriterioRef = [];

    classCriterioProvinhaBrasil = undefined;
    classCriterioHabilidade = undefined;
    classCriterioAssunto = undefined;
    classCriterioNivel = undefined;
    classCriterioHabile = undefined;
}
