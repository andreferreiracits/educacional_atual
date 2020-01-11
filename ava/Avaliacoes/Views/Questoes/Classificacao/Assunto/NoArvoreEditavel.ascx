<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ProvaColegiada.ValueObjects.NoAssuntoVO>" %>
<%@ Import Namespace="ProvaColegiada.ValueObjects" %>
<%@ Import Namespace="ProvaColegiada.TabelaViews" %>


<ul>
    <li>
        <input type="checkbox" title="<%=Model.Id %>" id="<%= Model.Ids %>" class="editavel pertence" value="<%=Model.Nome%>" />
        <%  if (Model.ERaiz)
            {  %>
            <ul>
            <li><input type="checkbox" id="<%=Model.Id %>" class="addno" value="adicionar assunto" /></li>
            </ul>
        <% } %>
    </li>

        <%  if (!Model.ERaiz)
            {  %>
            <li><input type="checkbox" id="<%=Model.Id %>" class="addno" value="adicionar assunto" /></li>
        <% } else {%>
            <li><input type="checkbox" id="0" class="addno" value="adicionar área" /></li>
         <% } %>

</ul>
  