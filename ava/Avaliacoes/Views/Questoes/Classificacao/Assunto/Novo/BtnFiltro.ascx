<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<%=Html.ActionLink("área e assunto", "AdicionarAssunto", "Questoes", new { @id = "btnAbrirAssunto", @class = "btn cad_classificacao" })%>
<%=Html.Hidden("lstClassificacaoTipo", null, new { @id = "lstClassificacaoTipo_" + EnumTipoClassificacao.Assunto.Id })%>
</span>

