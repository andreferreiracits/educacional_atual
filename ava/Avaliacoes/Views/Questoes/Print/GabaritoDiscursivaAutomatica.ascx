<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.QuestaoPrint>" %>

<%@ Import namespace="ProvaColegiada.TabelaViews" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews.Shared "%>

<br />
<span class="gabaritoLetra">Resposta(s):</span>

<div>
    <% foreach (AlternativaView alternativa in Model.Alternativas) { %>
        <div> - <%=alternativa.Texto.TextoView%></div>
    <% } %>
</div>
