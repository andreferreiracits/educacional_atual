<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Index</title>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/jquery-1.7.min.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.ui.combo.js") %>"></script>

    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.meio.mask.js") %>"></script>

    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.timePicker.min.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.ui.datepicker-pt-BR.js") %>"></script>

    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/util/jquery.textareaCounter.plugin.js") %>"></script>
	<%--<script src="<%= UtilView.Url("/Scripts/util/jquery.cluetip.js") %>" type="text/javascript"></script>--%>



    <script type="text/javascript" src="/Recursos/GerenciadorGrupos/Scripts/view/GerenciadorGrupos5.1.1.js"></script>

    <link rel="stylesheet" type="text/css" href="/Recursos/GerenciadorGrupos/Content/css/gerenciadorgrupos-1.0.1.css"/>
    <link rel="stylesheet" type="text/css" href="/Recursos/GerenciadorGrupos/Content/css/PersonalizarGrupo.css"/>
    <link rel="stylesheet" type="text/css" href="/Recursos/GerenciadorGrupos/Content/css/ListaGerenciadorUsuarios.css"/>


    <script type="text/javascript">
        var baseAnoMax = "2013";
        var baseAnoMin = "1900";
        var caminhoBase = '/ava/avaliacoes';
        var caminhoGerenciadorGrupos = '/Recursos/GerenciadorGrupos';
        var FUNCAO_VAZIA = 'javascript:;';
    </script>

    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/NovaArvore2.0.0.js") %>"></script> 

    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/NovaClassificacao.js") %>"></script>

    <script type="text/javascript">
    /* para avaliacaoRapida */
    var AVclassBuscaAssunto, AVclassBuscaNivel;

    function initBuscaQuestaoAvaliacaoRapida() {
        AVclassBuscaNivel   = new NovaClassificacao("NivelEnsino").montarSelectFiltro("#selectNivelEnsino");
        AVclassBuscaAssunto = new NovaClassificacao("AreaAssunto").montarSelectFiltro("#selectAreaAssunto");
    }

    //function limparFiltroBuscaQuestao() {
    //    tblAdicionar.limparFiltroNovo();
    //}

    //function ajusteFiltroBuscaQuestao() {
    //}

    //function destroyBuscaQuestaoProva() {
    //    classBuscaAssunto = undefined;
    //    classBuscaNivel = undefined;
    //}
    </script>

    <%--<script src="/AVA/avaliacoes/Scripts/util/tiny_mce/tinymce/tiny_mce.js" type="text/javascript"></script>--%>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/tiny_mce/tinymce/tiny_mce.js") %>"></script>
	<script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/util/tiny_mce/jquery.tinymce.js") %>"></script>   
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/view/format.tyne.1.0.1.js") %>"></script>
    
    <%--<script src="<%= Html.ConteudoPath("/Scripts/view/format.tyne.debug.1.0.1.js") %>" type="text/javascript"></script>--%>

    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/view/recursosJs.js") %>"></script>
    
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/class/Mensagem3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/class/Carregando3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/class/DataMode1.0.0.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/class/Ordenacao.js") %>"></script>
    <script type="text/javascript" src="<%=Html.ConteudoPath("Scripts/class/Tabela1.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= Html.ConteudoPath("Scripts/class/QuestaoResumo.js") %>"></script>
    
    <script type="text/javascript" src="<%=Html.ConteudoPath("Areas/AvaliacaoRapida/Scripts/avaliacoes.avaliacaorapida-1.0.0.js") %>"></script>
    
        
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Areas/AvaliacaoRapida/Content/principal.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/carregando.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/questaoresumo.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/arvore.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/form.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/ajudaView2.0.0.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/tabela.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Areas/AvaliacaoRapida/Content/avaliacoes.avaliacaorapida-1.0.0.css") %>" />

    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/jquery-ui-1.8.4.custom.css") %>" />
    <link rel="stylesheet" type="text/css" href="<%=Html.ConteudoPath("Content/css/timePicker.css") %>" />

    <script type="text/javascript">
        $(document).ready(function () {
            $("#start").click(function () {
                //$("#sec025AvRapida").avaliacaorapida({'caminhoBase':caminhoBase, 'CodigoOrigem':'SEC02511', 'fClose': function () { $("#sec025AvRapida").empty(); } , 'caminhoGerenciadorGrupos': caminhoGerenciadorGrupos});
                $("#sec025AvRapida").avaliacaorapida({ 'CodigoOrigem': 'TesteDev', 'fClose': function () { $("#sec025AvRapida").empty(); } });
            });
        });
    </script>

</head>
<body>
    <div>
        Teste da index!! <%:ViewData["data"] %>
        <br />
        Bancos : <%:ViewData["bancoEscrita"]%>
        <br />
        <button id="start">Abrir Avaliação Rápida</button>

    </div>


    <div id="sec025AvRapida"></div>

</body>
</html>
