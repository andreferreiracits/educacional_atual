<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.Models.NoArvore>>" %>
<ul>
<%
    foreach (ProvaColegiada.Models.NoArvore no in Model.Nos)
    {
%>
    <li><a title="<%=no.Id %>"><%=no.Nome%></a><% 
        if (no.TemFilhos)
            Html.RenderPartial("Arvore", new ProvaColegiada.TabelaViews.Arvore<ProvaColegiada.Models.NoArvore>(no.Filhos, Model.Editavel, Model.Selecionavel));
%></li>
<% } %>
</ul>