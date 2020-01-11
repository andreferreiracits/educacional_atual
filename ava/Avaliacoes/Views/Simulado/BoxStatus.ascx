<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.SimuladoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>

<div class="statusProva">
    <% Html.RenderPartial("ComentarioEstado"); %>
    <% foreach (SelectListItem estado in Model.listaSelectStatus) { %>
            <%=Html.RadioButton("rdoStatus", estado.Value, estado.Selected, new { @id = "rdoStatus" + estado.Value.ToString() })%>
            <label for="rdoStatus<%=estado.Value.ToString()%>"><%=estado.Text %></label>
    <% } %>

</div>