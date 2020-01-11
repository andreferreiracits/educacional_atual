<%@ Page Language="C#" ValidateRequest="false" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="head" runat="server">
    <title>Avaliação</title>
    <base id="baseAvaliacao" href="<%= UtilView.UrlCompleta(Request) %>" />
     <base id="baseGerenciadoGrupos" href="<%= UtilView.PathGerenciadorGrupos("") %>" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/mceView.css") %>" /> 
    <!--link href="< %= UtilView.Url("/Content/css/questao.css") %>" rel="stylesheet" type="text/css" /-->
    <link href="<%= UtilView.PathGerenciadorGrupos("/Content/css/gerenciadorgrupos-1.0.1.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/carregando.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/realizacao.css") %>" rel="stylesheet" type="text/css" />
    <link href="<%= UtilView.Url("/Content/css/timePicker.css") %>" rel="stylesheet" type="text/css" />

    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/jquery-ui-1.8.4.custom.css") %>" />
    
    <!-- link href="< %= UtilView.Url("/Content/css/principal.css") %>" rel="stylesheet" type="text/css" /-->
    <link href="<%= UtilView.Url("/Content/css/aplicacao_Quick.css") %>" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/jquery-1.6.2.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery-ui-1.8.5.custom.min.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/util/jquery.tmpl.min.js") %>"></script>

    <script src="<%= UtilView.Url("/Scripts/util/jquery.timePicker.min.js") %>" type="text/javascript"></script>
    <script src="<%= UtilView.Url("/Scripts/util/jquery.ui.datepicker-pt-BR.js") %>" type="text/javascript"></script>

    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Msg.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Confirmacao.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Carregando3.0.0.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/class/Realizacao.js") %>"></script>
    <script type="text/javascript" src="<%= UtilView.PathGerenciadorGrupos("/Scripts/view/GerenciadorGrupos1.0.1.js")%>"></script>
    <script type="text/javascript" src="<%= UtilView.Url("/Scripts/view/avaliacoes.quickaplicacao-1.0.1.js") %>"></script>
    <script type="text/javascript" language="javascript">
        
        var bolGerenciador = true;

        var opcoesView = {
                'idProva': <%=ViewData["idProva"]%>,
                'modo' : 'view'
            };
        

        $(document).ready(function () {
            $("#caixaConteudoAvaliacoes").avaliacoesQuickAplicacao(opcoesView);
            
        });


    </script>
</head>
<body>
    
    <div id="conteudo">
        <div id="caixaConteudoAvaliacoes">
        </div>
    </div>
</body>
</html>
