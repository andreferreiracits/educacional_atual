<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AbstractProvaView>" %>

<div class="nomeCapa"><%= Html.Encode(Model.Capa.Nome) %></div>
<div class="conteudoCapa"><%= Model.Capa.Conteudo %></div>
