<%@ Control Language="C#"  Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.AgendamentoView>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.Models.Exam"%>
<%@ Import Namespace="ProvaColegiada.Models.Question.Correcao"%>

<div class="statusProva">
    <% Html.RenderPartial(Model.ComentarioEstadoView); %>
    <% foreach (SelectListItem estado in Model.listaSelectStatus) { %>
            <%=Html.RadioButton("rdoStatus", estado.Value, estado.Selected, new { @id = "rdoStatus" + estado.Value.ToString() })%>
            <label for="rdoStatus<%=estado.Value.ToString()%>"><%=estado.Text %></label>
    <% } %>

    <!--label>
        <input type="radio" id="rdoStatusElaboracao" name="rdoStatus" checked="checked" value="< %= Convert.ToInt32(EstadoAplicacao.EmElaboracao) %>" < %=Model.CheckEmElaboracao%> />
        <strong>Em elaboração</strong>
    </label>
    <label>
        <input type="radio" id="rdoStatusPublicada" name="rdoStatus" value="< %= Convert.ToInt32(EstadoAplicacao.Publicada) %>" < %=Model.CheckPublicada%> />
        <strong>Publicada</strong>
    </label-->
</div>