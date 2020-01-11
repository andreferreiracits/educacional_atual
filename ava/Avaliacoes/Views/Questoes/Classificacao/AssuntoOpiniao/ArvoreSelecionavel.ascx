<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<ul>
<%
    foreach (NoVO noV in Model.Nos)
    {
        NoAssuntoOpniaoVO no = (NoAssuntoOpniaoVO)noV;//  class="editavel pertence"
%>
    <li>
        <input type="checkbox" title="<%=no.Id %>" id="<%= no.Ids %>" <%=no.Selecionado ? "checked=\"checked\"" : ""  %> class="<%=no.Editavel ? "pertence" : "" %>" value="<%=no.Nome%>" />
        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Questoes/Classificacao/AssuntoOpiniao/ArvoreSelecionavel", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel));
        %>

    </li>
<% } %>
</ul>