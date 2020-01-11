<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<%=Html.ActionLink("Categorias de pesquisa", "AdicionarAssunto", "Questoes", new { @id = "btnAbrirAssuntoPesquisaOpniao", @class = "btn" })%>
<%=Html.Hidden("lstClassificacaoTipo", null, new { @id = "lstClassificacaoTipo_" + EnumTipoClassificacao.AssuntoPesquisaOpniao.Id })%>
</span>