<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<%=Html.ActionLink("nível de ensino", "AdicionarNivelEnsino", "Questoes", new { @id = "btnAbrirNivelEnsino", @class = "btn cad_classificacao" })%>
<%=Html.Hidden("lstClassificacaoTipo", null, new { @id = "lstClassificacaoTipo_" + EnumTipoClassificacao.NivelEnsino.Id })%>
</span>

