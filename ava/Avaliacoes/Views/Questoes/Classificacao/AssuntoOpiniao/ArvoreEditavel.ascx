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
        <input type="checkbox" title="<%=no.Id %>" id="<%= no.Ids %>" <%=no.Selecionado ? "checked=\"checked\"" : ""  %> class="<%=no.Editavel ? "editavel pertence" : "naopertence" %>" value="<%=no.Nome%>" />

        <% 
            if (no.TemFilhos)
                Html.RenderPartial("../Questoes/Classificacao/AssuntoOpiniao/ArvoreEditavel", new Arvore<NoVO>(no.Filhos, Model.Editavel, Model.Selecionavel, no.Id));
        %>
        <%  if (!no.TemFilhos && no.ERaiz) { %>
        <ul>
            <li>
                <input type="checkbox" id="<%=no.Id %>" class="addno" value="adicionar assunto" />
            </li>
        </ul>
        <% }  %>
    </li>
        
<% } %>
    
    
    <li>
        <%  if (Model.Id == 0)
            {  %>
            <input type="checkbox" id="<%=Model.Id %>" class="addno" value="adicionar área" />
        <% }
            else
            {  %>
            <input type="checkbox" id="<%=Model.Id %>" class="addno" value="adicionar assunto" />
        <% }%>
    </li>
</ul>