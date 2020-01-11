<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.ValueObjects.NoVO>>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>

<ul>
<%
    foreach (NoVO no in Model.Nos)
    {
        NoHabilidadeVO noH = (NoHabilidadeVO)no;
%>
    <li>
        <input type="checkbox" title="<%=no.Id %>" id="<%= no.Ids %>" <%=no.Selecionado ? "checked=\"checked\"" : ""  %> value="<%=noH.NomeSigla%>" />

        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Questoes/Classificacao/Habilidade/ArvoreSelecionavel", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel));
        %>

    </li>
<% } %>
</ul>