<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<int>>" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<!--%=Html.ActionLink("competências e habilidades", "CarregarArvoreFiltro", "HabilidadeCompetencia", new { @id = "btnAbrirHabilidade", @class = "btn" })%-->
<a id="btnFiltroHabilidade" class="btn">competências e habilidades</a>
<% foreach(int i in Model){ %>
    <input type="hidden" class="notsend" name="bancoPertence" value="<%=i %>" />
<% } %>

</span>