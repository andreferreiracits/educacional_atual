<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.ProvaGrupoView>" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>
<div id="capaAgrupamento">

    <div class="configTitle">
        <span><%= Model.Nome %></span>
    </div>

    <div class="conteudoCapaCadastro">
        <%= Model.Conteudo%>
    </div>


</div>

