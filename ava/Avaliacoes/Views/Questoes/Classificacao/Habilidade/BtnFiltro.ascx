<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<%=Html.ActionLink("competências e habilidades", "AdicionarHabilidade", "Questoes", new { @id = "btnAbrirHabilidade", @class = "btn" })%>
<%=Html.Hidden("lstClassificacaoTipo", null, new { @id = "lstClassificacaoTipo_" + EnumTipoClassificacao.Habilidade.Id })%>
</span>