<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<ProvaColegiada.TabelaViews.Shared.Mensagem>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared" %>


<div class="<%= (Model.Erro) ? "erro" : "sucesso" %> <%= Model.Estilo %>" data-render="avl_msg" >
    <link rel="Stylesheet" type="text/css" href="<%= UtilView.Url("/Content/css/principal.css") %>" />
    <div id="barraSuperior">
	</div>
    <div id="conteudo">
	    <div class="caixa">
            <ul id="menuConteudo" class="abas">
                <li class="selecionado">
                    <a href="javascript:;"><%=ViewData["ErroTitulo"]%></a>
                </li>
            </ul>
            <div id="caixaConteudo" class="caixaConteudo">
                <img src="<%= UtilView.Url("/Content/imgcss/404.png") %>" class="img-right" />
                <p class="fontePadrao"  id="mensagem" title="<%=Model.Titulo %>"><%= Model.Texto %></p>
	            <!--a class="btn" href="javascript:;">Voltar</a-->
                <div class="clear"></div>
            </div>
        </div>
    </div>

</div>
