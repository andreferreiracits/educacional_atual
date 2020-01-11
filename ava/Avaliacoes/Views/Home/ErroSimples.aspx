<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Avaliações</title>
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/principal.css") %>" />
</head>
<body class="bodyAvaliacoes">
    <div id="barraSuperior">
	</div>
    <div id="conteudo">
	    <div class="caixa">
            <ul id="menuConteudo" class="abas">
                <li class="selecionado">
                    <a href="#"><%= ViewData["ErroTitulo"] %></a>
                </li>
            </ul>
            <div id="caixaConteudo" class="caixaConteudo">
                <img src="<%= UtilView.Url("/Content/imgcss/404.png") %>" class="img-right" />
                <p class="fontePadrao"><%= ViewData["Erro"] %></p>
	            <br />
                <div class="clear"></div>
            </div>
        </div>
    </div>
</body>
</html>
