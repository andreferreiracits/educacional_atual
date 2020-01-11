<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<%=Html.ActionLink("SPE", "CarregarConteudoFiltro", "SPE", new { @id = "btnAbrirSPE", @class = "btn cad_classificacao" })%>
<!--%=Html.Hidden("lstClassificacaoTipo", null, new { @id = "lstClassificacaoTipo_" + EnumTipoClassificacao.SPE.Id })%-->
</span>
