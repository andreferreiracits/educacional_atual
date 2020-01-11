<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<int>>" %>
<%@ Import namespace="ProvaColegiada.Models.Classificacao" %>
<%@ Import namespace="ProvaColegiada.TabelaViews" %>

<span class="cad_classificacao">
<%=Html.ActionLink("spe", "CarregarArvoreFiltro", "SPE", new { @id = "btnFiltroSPE", @class = "btn" })%>
<% foreach(int i in Model){ %>
    <input type="hidden" class="notsend" name="bancoPertence" value="<%=i %>" />
<% } %>

</span>