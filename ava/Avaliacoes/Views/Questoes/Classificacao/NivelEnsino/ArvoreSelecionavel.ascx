<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<ul>
<%
    foreach (NoVO noV in Model.Nos)
    {
        NoNivelEnsinoVO no = (NoNivelEnsinoVO)noV;//  class="editavel pertence"

        if (no.RepresentaRaiz)
            continue;
%>
    <li>
        <input type="checkbox" title="<%=no.IdNivel %>" id="<%= no.IdsComRaiz %>" <%=no.NivelSelecionado ? "checked=\"checked\"" : ""  %> class="<%=no.Editavel ? "pertence" : "" %> <%=no.RaizSelect %> <%=no.TemFilhosRaizSelect ? "": "semfilhos" %>" value="<%=no.Nome%>" />
        <% 
        if (no.TemFilhosRaizSelect)
                Html.RenderPartial("../Questoes/Classificacao/NivelEnsino/ArvoreSelecionavel", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel));
        %>

    </li>
<% } %>
</ul>