<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<IList<ProvaColegiada.ValueObjects.UsuarioRealizouVO>>" %>
<%@ Import namespace="ProvaColegiada.ValueObjects" %>

<%

    if (Model.Count > 0)
    {
    %>
    <ul>

        <li><a href="0" class="ativo">Todos</a></li>
    <%
        foreach (UsuarioRealizouVO u in Model)
        {
%>
            <li><a href="<%=u.IdRealizacao%>"><%=u.Nome %></a></li>
  <%          
        }
            
    %>
    </ul>
    <%
    }
    else
    {
    %>

Ninguém respondeu.

    <%
 
    }

%>
